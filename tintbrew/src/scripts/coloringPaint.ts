/**
 * Coloring paint island — takes over the canvas on /coloring/[slug]/.
 *
 * Layers: region fills painted on a canvas, the official line art drawn on
 * top with 'multiply' (white = transparent, ink stays). Hit-testing uses an
 * offscreen ID map: each ring rasterized once as a unique RGB color, so a
 * tap is a single pixel lookup — exact, no point-in-polygon loops.
 *
 * State: one palette index per ring ('.' = empty, gallery kernel encoding),
 * persisted per slug in localStorage. Every fill re-renders, autosaves, and
 * checks completion; a completed piece POSTs /api/coloring/complete once and
 * unlocks Publish (dialog → POST publish with a client-rendered WebP
 * preview, stored server-side so the gallery never needs the payload).
 */
import { t, tArgs } from './i18n';
import type { UiKey } from '../data/uiStrings';
import { galleryUuid } from './deviceId';
import { decodeColors, encodeColors } from '../../functions/api/coloring/_kernel';

interface Payload {
  w: number;
  h: number;
  bg: string;
  pal: string[];
  r: string[];
  rc: number[];
}

function saveKey(slug: string): string {
  return `tb-coloring:save:${slug}`;
}
function pubKey(slug: string): string {
  return `tb-coloring:published:${slug}`;
}

class PaintIsland {
  private root: HTMLElement;
  private slug: string;
  private regions: number;
  private canvas: HTMLCanvasElement;
  private frame: HTMLElement;
  private toolbar: HTMLElement;
  private paletteEl: HTMLElement;
  private filledEl: HTMLElement;
  private statusEl: HTMLElement;
  private loadNote: HTMLElement | null;
  private undoBtn: HTMLButtonElement;
  private redoBtn: HTMLButtonElement;
  private resetBtn: HTMLButtonElement;
  private pubBtn: HTMLButtonElement;
  private donePill: HTMLElement | null;
  private lineArt: HTMLImageElement;

  private payload: Payload | null = null;
  private ringPaths: Path2D[] = [];
  private idData: Uint32Array | null = null;
  private idW = 0;
  private colors: (number | null)[] = [];
  private undoStack: string[] = [];
  private redoStack: string[] = [];
  private tool: 'brush' | 'erase' = 'brush';
  private selected = 1;
  private completeSent = false;
  private publishedId: string | null = null;
  private line: number = 0;
  private total: number = 0;

  constructor(root: HTMLElement) {
    this.root = root;
    this.slug = root.dataset.slug ?? '';
    this.regions = Number(root.dataset.regions ?? '0');
    this.canvas = root.querySelector('[data-col-canvas]') as HTMLCanvasElement;
    this.frame = root.querySelector('.col-frame') as HTMLElement;
    this.toolbar = root.querySelector('[data-col-toolbar]') as HTMLElement;
    this.paletteEl = root.querySelector('[data-col-palette]') as HTMLElement;
    this.filledEl = root.querySelector('[data-col-filled]') as HTMLElement;
    this.statusEl = root.querySelector('[data-col-status]') as HTMLElement;
    this.loadNote = root.querySelector('[data-col-loadnote]');
    this.undoBtn = root.querySelector('[data-col-undo]') as HTMLButtonElement;
    this.redoBtn = root.querySelector('[data-col-redo]') as HTMLButtonElement;
    this.resetBtn = root.querySelector('[data-col-reset]') as HTMLButtonElement;
    this.pubBtn = root.querySelector('[data-col-publish]') as HTMLButtonElement;
    this.donePill = document.querySelector('[data-col-donepill]');
    this.lineArt = root.querySelector('.col-lineart') as HTMLImageElement;

    // restore the last gallery piece id for this base page (re-publish path)
    try {
      this.publishedId = localStorage.getItem(pubKey(this.slug));
    } catch {
      this.publishedId = null;
    }

    this.frame.addEventListener('click', (e) => this.onTap(e as MouseEvent));
    this.paletteEl.addEventListener('click', (e) => this.onPick(e));
    this.undoBtn.addEventListener('click', () => this.undo());
    this.redoBtn.addEventListener('click', () => this.redo());
    this.resetBtn.addEventListener('click', () => this.reset());
    this.pubBtn.addEventListener('click', () => this.openPublish());
    // brush / eraser tool toggle
    root.querySelectorAll<HTMLButtonElement>('[data-col-tool]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.tool = btn.dataset.tool === 'erase' ? 'erase' : 'brush';
        root.querySelectorAll('[data-col-tool]').forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
      });
    });

    void this.boot();
  }

  private status(msg: string): void {
    this.statusEl.textContent = msg;
    this.statusEl.hidden = !msg;
  }

  /** Fetch the unlock-gated payload; 403 → honest locked message. */
  private async boot(): Promise<void> {
    try {
      const res = await fetch(
        `/api/coloring/asset?slug=${encodeURIComponent(this.slug)}&d=${encodeURIComponent(galleryUuid())}`,
      );
      if (res.status === 403) {
        if (this.loadNote) this.loadNote.textContent = t('col.p.lockedMsg');
        else this.status(t('col.p.lockedMsg'));
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      this.payload = (await res.json()) as Payload;
    } catch {
      // DEV ONLY: localhost testing opens every page by fetching the payload
      // from the gitignored static folder (public/coloring/payload/). Never
      // shipped — production keeps the unlock gate.
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        try {
          const dev = await fetch(`/coloring/payload/${this.slug}.json`);
          if (dev.ok) {
            this.payload = (await dev.json()) as Payload;
          }
        } catch {
          /* fall through to the locked message below */
        }
      }
      if (!this.payload) {
        if (this.loadNote) this.loadNote.textContent = t('col.p.loadFail');
        else this.status(t('col.p.loadFail'));
        return;
      }
    }

    // saved fills — but never trust a stale save with a different ring count
    let saved: (number | null)[] | null = null;
    try {
      const raw = localStorage.getItem(saveKey(this.slug));
      if (raw) {
        const decoded = decodeColors(raw);
        if (decoded.length === this.payload.r.length) saved = decoded;
      }
    } catch {
      saved = null;
    }
    this.colors = saved ?? this.payload.r.map(() => null);
    this.completeSent = this.colors.every((c) => c !== null); // don't re-POST

    this.prepare();
    await this.warmLineArt();
    this.buildPalette();
    this.render();
    this.frame.classList.add('is-live');
    if (this.loadNote) this.loadNote.hidden = true;
    this.toolbar.hidden = false;
    this.refreshMeta();
  }

  /** Rasterize each ring with an exact scanline fill (pixel-center sampling,
   *  no canvas antialiasing to blend neighbours into wrong ids) into one
   *  Uint32Array lookup table; build Path2Ds for draws. */
  private prepare(): void {
    const p = this.payload as Payload;
    this.canvas.width = p.w;
    this.canvas.height = p.h;
    this.canvas.hidden = false;

    const ids = new Uint32Array(p.w * p.h); // 0 = "no ring"
    for (let i = 0; i < p.r.length; i++) {
      this.ringPaths.push(new Path2D(p.r[i].startsWith('M') ? p.r[i] : this.toPath(p.r[i])));
      const id = i + 1;
      const pts = p.r[i].split(' ').map((s) => s.split(',').map(Number));
      // crossings per scanline at pixel centers (y + 0.5)
      const xs: number[] = [];
      for (let y = 0; y < p.h; y++) {
        const yc = y + 0.5;
        xs.length = 0;
        let prev = pts[pts.length - 1];
        for (let k = 0; k < pts.length; k++) {
          const cur = pts[k];
          const y1 = prev[1];
          const y2 = cur[1];
          if ((y1 <= yc && y2 > yc) || (y2 <= yc && y1 > yc)) {
            xs.push(prev[0] + ((yc - y1) / (y2 - y1)) * (cur[0] - prev[0]));
          }
          prev = cur;
        }
        if (xs.length < 2) continue;
        xs.sort((a, b) => a - b);
        for (let k = 0; k + 1 < xs.length; k += 2) {
          const x0 = Math.max(0, Math.ceil(xs[k] - 0.5));
          const x1 = Math.min(p.w - 1, Math.floor(xs[k + 1] - 0.5));
          const row = y * p.w;
          for (let x = x0; x <= x1; x++) ids[row + x] = id;
        }
      }
    }
    this.idData = ids;
    this.idW = p.w;
  }

  /** "x,y x,y ..." → SVG path data (payload coords are already canvas space). */
  private toPath(spec: string): string {
    const pts = spec.split(' ');
    const d: string[] = [];
    for (let i = 0; i < pts.length; i++) {
      const [x, y] = pts[i].split(',');
      d.push(`${i === 0 ? 'M' : 'L'}${x} ${y}`);
    }
    return d.join(' ') + ' Z';
  }

  /** Decode the line art WebP (also fires the printable <img> above). */
  private warmLineArt(): Promise<void> {
    if (this.lineArt.complete && this.lineArt.naturalWidth) return Promise.resolve();
    return new Promise((resolve) => {
      if (this.lineArt.complete) return resolve();
      this.lineArt.addEventListener('load', () => resolve(), { once: true });
      this.lineArt.addEventListener('error', () => resolve(), { once: true });
    });
  }

  private buildPalette(): void {
    const p = this.payload as Payload;
    const frag = document.createDocumentFragment();
    p.pal.forEach((hex, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'col-swatch';
      btn.style.background = hex;
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-checked', String(i === this.selected));
      btn.setAttribute('aria-label', hex);
      btn.dataset.pal = String(i);
      frag.appendChild(btn);
    });
    this.paletteEl.appendChild(frag);
  }

  private onPick(e: MouseEvent): void {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.col-swatch');
    if (!btn) return;
    this.selected = Number(btn.dataset.pal ?? '1');
    // picking a color implies the brush (the eraser toggle stays put otherwise)
    if (this.tool === 'erase') {
      this.tool = 'brush';
      this.root.querySelectorAll('[data-col-tool]').forEach((b) => {
        const active = (b as HTMLElement).dataset.tool !== 'erase';
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
    }
    this.paletteEl.querySelectorAll('.col-swatch').forEach((el) => {
      el.setAttribute('aria-checked', String(el === btn));
    });
  }

  /** Canvas tap → id lookup → fill + repaint + persist + completion check. */
  private onTap(e: MouseEvent): void {
    if (!this.payload || !this.idData) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * this.canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * this.canvas.height);
    if (x < 0 || y < 0 || x >= this.canvas.width || y >= this.canvas.height) return;
    const id = this.idData[y * this.idW + x];
    if (id === 0) return;
    const ring = id - 1;
    const next = this.tool === 'erase' ? null : this.selected; // eraser clears
    if (this.colors[ring] === next) return;

    this.pushUndo();
    this.colors[ring] = next;
    this.render();
    this.persist();
    this.refreshMeta();
    this.maybeComplete();
  }

  private render(): void {
    const p = this.payload as Payload;
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = p.bg;
    ctx.fillRect(0, 0, p.w, p.h);
    for (let i = 0; i < this.ringPaths.length; i++) {
      const c = this.colors[i];
      if (c === null) continue;
      ctx.fillStyle = p.pal[c] ?? '#cccccc';
      ctx.fill(this.ringPaths[i]);
    }
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(this.lineArt, 0, 0, p.w, p.h);
    ctx.globalCompositeOperation = 'source-over';
  }

  private persist(): void {
    try {
      localStorage.setItem(saveKey(this.slug), encodeColors(this.colors));
    } catch {
      /* private mode — fills last for the session only */
    }
  }

  private refreshMeta(): void {
    const filled = this.colors.reduce((n, c) => (c !== null ? n + 1 : n), 0);
    this.line = filled;
    this.total = this.colors.length;
    this.filledEl.textContent = tArgs('col.p.filled' as UiKey, {
      n: String(filled),
      total: String(this.total),
    });
    this.undoBtn.disabled = this.undoStack.length === 0;
    this.redoBtn.disabled = this.redoStack.length === 0;
    const done = filled === this.total;
    this.pubBtn.disabled = !done;
    if (this.regions && filled !== this.regions) {
      // SSR count disagrees with the payload (edge drift) — payload wins
      this.regions = this.total;
    }
    const regionsEl = document.querySelector('[data-col-regions]');
    if (regionsEl && this.total) {
      regionsEl.textContent = tArgs('col.regions' as UiKey, { n: String(this.total) });
    }
  }

  private maybeComplete(): void {
    if (this.completeSent || this.colors.some((c) => c === null)) return;
    this.completeSent = true;
    this.status(t('col.p.complete'));
    void fetch('/api/coloring/complete', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug: this.slug, d: galleryUuid() }),
    }).catch(() => {
      /* completion is also implied by a publish; stay quiet on failure */
    });
    if (this.donePill) this.donePill.hidden = false;
  }

  private pushUndo(): void {
    this.undoStack.push(encodeColors(this.colors));
    if (this.undoStack.length > 50) this.undoStack.shift();
    this.redoStack.length = 0; // a new edit kills the redo branch
  }

  private undo(): void {
    const prev = this.undoStack.pop();
    if (!prev) return;
    this.redoStack.push(encodeColors(this.colors));
    this.colors = decodeColors(prev);
    this.render();
    this.persist();
    this.refreshMeta();
  }

  private redo(): void {
    const nxt = this.redoStack.pop();
    if (!nxt) return;
    this.undoStack.push(encodeColors(this.colors));
    this.colors = decodeColors(nxt);
    this.render();
    this.persist();
    this.refreshMeta();
  }

  private reset(): void {
    if (!window.confirm(t('col.p.resetConfirm'))) return;
    this.pushUndo();
    this.colors = this.colors.map(() => null);
    this.completeSent = false;
    this.render();
    this.persist();
    this.refreshMeta();
    this.status('');
  }

  // ---- publish ------------------------------------------------------------

  private openPublish(): void {
    if (this.pubBtn.disabled) return;
    const dlg = document.createElement('div');
    dlg.className = 'col-dialog';
    dlg.innerHTML =
      `<div class="col-dialog-box" role="dialog" aria-modal="true" aria-label="${t('col.p.pubTitle')}">` +
      `<h2>${t('col.p.pubTitle')}</h2>` +
      `<p class="col-autonote">${t('col.p.pubNote')}</p>` +
      `<label><span data-i18n="gal.pubName">${t('gal.pubName')}</span>` +
      `<input type="text" maxlength="40" data-col-pubname placeholder="${t('gal.pubNamePh')}" /></label>` +
      `<label><span data-i18n="gal.pubNick">${t('gal.pubNick')}</span>` +
      `<input type="text" maxlength="20" data-col-pubnick placeholder="${t('col.p.nickPh')}" /></label>` +
      `<div class="col-actions">` +
      `<button type="button" class="btn" data-col-pubcancel data-i18n="gal.pubCancel">${t('gal.pubCancel')}</button>` +
      `<button type="button" class="btn btn-primary" data-col-pubsubmit data-i18n="gal.pubSubmit">${t('gal.pubSubmit')}</button>` +
      `</div></div>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target === dlg || target.closest('[data-col-pubcancel]')) dlg.remove();
      const submit = target.closest<HTMLButtonElement>('[data-col-pubsubmit]');
      if (submit) void this.submitPublish(dlg, submit);
    });
    dlg.querySelector('input')?.focus();
  }

  private async previewDataUrl(): Promise<string | null> {
    try {
      const p = this.payload as Payload;
      const scale = 512 / p.w;
      const off = document.createElement('canvas');
      off.width = 512;
      off.height = Math.round(p.h * scale);
      const ctx = off.getContext('2d') as CanvasRenderingContext2D;
      ctx.drawImage(this.canvas, 0, 0, off.width, off.height);
      const blob = await new Promise<Blob | null>((res) => off.toBlob(res, 'image/webp', 0.8));
      if (!blob) return null;
      const buf = await blob.arrayBuffer();
      let bin = '';
      const bytes = new Uint8Array(buf);
      for (let i = 0; i < bytes.length; i += 0x8000) {
        bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      }
      return `data:image/webp;base64,${btoa(bin)}`;
    } catch {
      return null; // preview is optional — publish still works without it
    }
  }

  private async submitPublish(dlg: HTMLElement, submit: HTMLButtonElement): Promise<void> {
    const name = (dlg.querySelector('[data-col-pubname]') as HTMLInputElement).value.trim();
    const nick = (dlg.querySelector('[data-col-pubnick]') as HTMLInputElement).value.trim();
    if (!nick) {
      this.status(t('gal.errNick'));
      return;
    }
    submit.disabled = true;
    const preview = await this.previewDataUrl();
    try {
      const res = await fetch('/api/coloring/publish', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          uuid: galleryUuid(),
          slug: this.slug,
          name: name || t('gal.pubNamePh'),
          nick,
          colors: encodeColors(this.colors),
          preview,
          ...(this.publishedId ? { pieceId: this.publishedId } : {}),
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { id: string };
        this.publishedId = data.id;
        try {
          localStorage.setItem(pubKey(this.slug), data.id);
        } catch {
          /* private mode */
        }
        dlg.remove();
        this.status(t('col.p.publishDone'));
      } else if (res.status === 409) {
        dlg.remove();
        this.status(t('gal.slotFull'));
        submit.disabled = false;
      } else if (res.status === 429) {
        dlg.remove();
        this.status(t('gal.errRate'));
        submit.disabled = false;
      } else {
        this.status(t('gal.errInvalid'));
        submit.disabled = false;
      }
    } catch {
      this.status(t('col.errNetwork'));
      submit.disabled = false;
    }
  }
}

// formatColDate lives in coloringCards (the gallery is the only consumer);
// the paint page itself shows no dates.

document
  .querySelectorAll<HTMLElement>('[data-coloring-paint]')
  .forEach((el) => new PaintIsland(el));
