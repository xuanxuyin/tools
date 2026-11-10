/**
 * Coloring paint island — takes over the canvas on /coloring/[slug]/.
 *
 * Layers: region fills painted on a canvas, the official line art drawn on
 * top with 'multiply' (white = transparent, ink stays). Hit-testing uses an
 * offscreen ID map built by lib/coloringIdMap.ts (scanline even-odd fill +
 * ink-line attribution), so a tap is a single pixel lookup — exact, no
 * point-in-polygon loops, and taps on a region's outline select that region.
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
import { buildColoringIdMap } from '../lib/coloringIdMap';

interface Payload {
  w: number;
  h: number;
  bg: string;
  pal: string[];
  r: string[];
  rc: number[];
}

// v2 (2026-11-04): payloads were fully re-segmented, so every pre-v2 save is
// stale even when its ring count happens to match — new prefix + a one-time
// sweep of unversioned keys gives returning visitors a clean slate.
const STORE_V = 'v4'; // v4: speck/crack merges (2026-11-06 二轮) — ring indices shifted again, old saves misalign
function saveKey(slug: string): string {
  return `tb-coloring:${STORE_V}:save:${slug}`;
}
function pubKey(slug: string): string {
  return `tb-coloring:${STORE_V}:published:${slug}`;
}
function sweepLegacyKeys(): void {
  try {
    const legacy: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('tb-coloring:') && !k.includes(`:${STORE_V}:`)) legacy.push(k);
    }
    legacy.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* storage unavailable — nothing to sweep */
  }
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
  private bgRing = -1; // payload ring spanning the whole canvas — untappable paper white
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
  private loadNoteKey: UiKey | null = null;

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
        this.tool = btn.dataset.colTool === 'erase' ? 'erase' : 'brush';
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
        this.loadNoteKey = 'col.p.lockedMsg';
        if (this.loadNote) this.loadNote.textContent = t(this.loadNoteKey);
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
        this.loadNoteKey = 'col.p.loadFail';
        if (this.loadNote) this.loadNote.textContent = t(this.loadNoteKey);
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

    await this.warmLineArt(); // ink mask below needs the decoded line art
    this.prepare();
    this.buildPalette();
    this.render();
    this.frame.classList.add('is-live');
    this.loadNoteKey = null;
    if (this.loadNote) this.loadNote.hidden = true;
    this.toolbar.hidden = false;
    this.refreshMeta();
    // filled counter / regions line are runtime t() text — repaint on switch
    document.addEventListener('tb:langchange', () => {
      if (this.payload) this.refreshMeta();
      if (this.loadNoteKey && this.loadNote && !this.loadNote.hidden) {
        this.loadNote.textContent = t(this.loadNoteKey);
      }
    });
  }

  /** Rasterize each ring into the id-map lookup table (pure lib: scanline
   *  even-odd fill + ink-line attribution, see coloringIdMap.ts); build
   *  Path2Ds for draws. */
  private prepare(): void {
    sweepLegacyKeys();
    const p = this.payload as Payload;
    this.canvas.width = p.w;
    this.canvas.height = p.h;
    this.canvas.hidden = false;

    for (const spec of p.r) {
      this.ringPaths.push(new Path2D(spec.startsWith('M') ? spec : this.toPath(spec)));
    }
    const { ids, bgRing } = buildColoringIdMap(p.r, p.w, p.h, this.buildInkMask(p.w, p.h));
    this.bgRing = bgRing;
    this.idData = ids;
    this.idW = p.w;
  }

  /** Dark pixels of the line art at payload resolution → 1 in the mask.
   *  Feeds the ink-line ownership pass of the id map (taps on a drawn line
   *  select the shape it belongs to). Null-safe: if the image or canvas
   *  2D context is unavailable we degrade to boundary stamps only. */
  private buildInkMask(w: number, h: number): Uint8Array | null {
    const img = this.lineArt;
    if (!img.complete || !img.naturalWidth) return null;
    try {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D | null;
      if (!ctx) return null;
      ctx.drawImage(img, 0, 0, w, h);
      const d = ctx.getImageData(0, 0, w, h).data;
      const mask = new Uint8Array(w * h);
      for (let i = 0; i < w * h; i++) {
        const lum = 0.299 * d[i * 4]! + 0.587 * d[i * 4 + 1]! + 0.114 * d[i * 4 + 2]!;
        if (lum < 140) mask[i] = 1;
      }
      return mask;
    } catch {
      return null; // tainted canvas or stubbed DOM — stamps-only behavior
    }
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
        const active = (b as HTMLElement).dataset.colTool !== 'erase';
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
      // even-odd — the same rule the hit-test id map uses, so the painted
      // area always matches the tappable area (holes/self-intersections
      // included; nonzero would paint over them)
      ctx.fill(this.ringPaths[i], 'evenodd');
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
    // bgRing stays permanently null (paper white, untappable) — exclude it
    // from both the filled count and the total so completion is reachable
    const countable = this.bgRing >= 0 ? this.colors.filter((_, i) => i !== this.bgRing) : this.colors;
    const filled = countable.reduce((n, c) => (c !== null ? n + 1 : n), 0);
    this.line = filled;
    this.total = countable.length;
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
    if (this.completeSent || this.colors.some((c, i) => i !== this.bgRing && c === null)) return;
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
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') dlg.remove();
      if (!dlg.isConnected) document.removeEventListener('keydown', onKey);
    };
    document.addEventListener('keydown', onKey);
    // remembered nickname — same key the bead gallery uses, typed once
    let saved = '';
    try {
      saved = localStorage.getItem('tb-gallery:nick') ?? '';
    } catch {
      /* private mode — ask every time */
    }
    const nickInput = dlg.querySelector<HTMLInputElement>('[data-col-pubnick]');
    if (nickInput && saved) nickInput.value = saved;
    (saved ? dlg.querySelector<HTMLInputElement>('[data-col-pubname]') : nickInput)?.focus();
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
          localStorage.setItem('tb-gallery:nick', nick);
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
