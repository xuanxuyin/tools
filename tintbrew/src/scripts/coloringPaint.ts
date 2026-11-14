/**
 * Coloring paint island — freehand brush edition (user call 2026-11-13):
 * no region hit-testing, no fill counter, no completion gate. Pick a color
 * and a brush size, then drag across the picture; Publish is always armed —
 * the player decides when the page is done. A publish now marks the piece
 * done server-side (functions/api/coloring/publish.ts), which is what
 * feeds the daily unlock chain.
 *
 * Layers: strokes live on an offscreen paint canvas (transparent); the
 * visible canvas composites bg + paint + the official line art with
 * 'multiply' (white = transparent, ink stays visible), so paint always
 * sits UNDER the ink no matter how a stroke crosses lines.
 *
 * State: nothing persists (user call 2026-11-14) — painting is a
 * single-visit activity and Publish is the only save. Undo/redo are
 * in-memory full-resolution dataURL snapshots (20 deep). The unlock-gated
 * payload still supplies bg + palette; its ring count is only needed
 * because the publish schema validates a per-ring colors string — the
 * island ships dots (the gallery renders the client-made WebP preview,
 * never the ring encoding).
 */
import { t, tArgs } from './i18n';
import type { UiKey } from '../data/uiStrings';
import { galleryUuid } from './deviceId';

interface Payload {
  w: number;
  h: number;
  bg: string;
  pal: string[];
  r: string[];
  rc: number[];
}

// No paint persistence (user call 2026-11-14): with region tracking gone a
// half-painted page is no longer worth storing — painting is a single-visit
// activity and publishing is the only way a page survives. localStorage now
// keeps exactly one coloring key: the re-publish piece id below (unlock
// progress lives server-side in coloring_progress/coloring_done). The sweep
// clears every older tb-coloring:* key — v4 ring-encoded saves, v4 published
// ids (migrated on boot first), and yesterday's v5 raster saves.
const PUB_KEY = 'tb-coloring:pub:';
function pubKey(slug: string): string {
  return `${PUB_KEY}${slug}`;
}
/** The tap-to-fill era (production, v4) kept the piece id under a versioned
 *  key — read it back once so visitors who published then still get
 *  in-place re-publishes after this deploy. */
function legacyPubKey(slug: string): string {
  return `tb-coloring:v4:published:${slug}`;
}
function sweepLegacyKeys(): void {
  try {
    const legacy: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('tb-coloring:') && !k.startsWith(PUB_KEY)) legacy.push(k);
    }
    legacy.forEach((k) => localStorage.removeItem(k));
  } catch {
    /* storage unavailable — nothing to sweep */
  }
}

const UNDO_DEPTH = 20; // full-res dataURLs — deep enough for a session, bounded memory

type Pt = { x: number; y: number };

class PaintIsland {
  private root: HTMLElement;
  private slug: string;
  private canvas: HTMLCanvasElement;
  private frame: HTMLElement;
  private toolbar: HTMLElement;
  private paletteEl: HTMLElement;
  private statusEl: HTMLElement;
  private loadNote: HTMLElement | null;
  private undoBtn: HTMLButtonElement;
  private redoBtn: HTMLButtonElement;
  private resetBtn: HTMLButtonElement;
  private pubBtn: HTMLButtonElement;
  private lineArt: HTMLImageElement;

  private payload: Payload | null = null;
  private paint = document.createElement('canvas'); // the visitor's strokes only
  private pctx = this.paint.getContext('2d') as CanvasRenderingContext2D;
  private undoStack: string[] = [];
  private redoStack: string[] = [];
  private tool: 'brush' | 'erase' = 'brush';
  private size: 's' | 'm' | 'l' = 'm';
  private selected = 1;
  private publishedId: string | null = null;
  private loadNoteKey: UiKey | null = null;
  private painting = false;
  private last: Pt | null = null;
  private raf = 0;

  constructor(root: HTMLElement) {
    this.root = root;
    this.slug = root.dataset.slug ?? '';
    this.canvas = root.querySelector('[data-col-canvas]') as HTMLCanvasElement;
    this.frame = root.querySelector('.col-frame') as HTMLElement;
    this.toolbar = root.querySelector('[data-col-toolbar]') as HTMLElement;
    this.paletteEl = root.querySelector('[data-col-palette]') as HTMLElement;
    this.statusEl = root.querySelector('[data-col-status]') as HTMLElement;
    this.loadNote = root.querySelector('[data-col-loadnote]');
    this.undoBtn = root.querySelector('[data-col-undo]') as HTMLButtonElement;
    this.redoBtn = root.querySelector('[data-col-redo]') as HTMLButtonElement;
    this.resetBtn = root.querySelector('[data-col-reset]') as HTMLButtonElement;
    this.pubBtn = root.querySelector('[data-col-publish]') as HTMLButtonElement;
    this.lineArt = root.querySelector('.col-lineart') as HTMLImageElement;

    // restore the last gallery piece id for this base page (re-publish path)
    try {
      this.publishedId =
        localStorage.getItem(pubKey(this.slug)) ?? localStorage.getItem(legacyPubKey(this.slug));
    } catch {
      this.publishedId = null;
    }

    // freehand strokes — pointer events + capture keep the stroke alive
    // across the element edge; touch-action:none (page CSS) makes touch
    // drags paint instead of scrolling
    this.canvas.addEventListener('pointerdown', (e) => this.strokeStart(e));
    this.canvas.addEventListener('pointermove', (e) => this.strokeMove(e));
    this.canvas.addEventListener('pointerup', () => this.strokeEnd());
    this.canvas.addEventListener('pointercancel', () => this.strokeEnd());
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
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
    // small / medium / large brush width
    root.querySelectorAll<HTMLButtonElement>('[data-col-size]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const s = btn.dataset.colSize;
        this.size = s === 's' || s === 'l' ? s : 'm';
        root.querySelectorAll('[data-col-size]').forEach((b) => {
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

    await this.warmLineArt(); // the multiply layer below needs the decoded image
    this.prepare();
    this.buildPalette();
    this.render();
    this.frame.classList.add('is-live');
    this.loadNoteKey = null;
    if (this.loadNote) this.loadNote.hidden = true;
    this.toolbar.hidden = false;
    this.syncButtons();
    this.regionsLine();
    // the regions line is runtime t() text — repaint on language switch
    document.addEventListener('tb:langchange', () => {
      if (this.payload) this.regionsLine();
      if (this.loadNoteKey && this.loadNote && !this.loadNote.hidden) {
        this.loadNote.textContent = t(this.loadNoteKey);
      }
    });
  }

  /** Size both canvases; the paint layer always matches the art resolution. */
  private prepare(): void {
    sweepLegacyKeys();
    const p = this.payload as Payload;
    this.canvas.width = p.w;
    this.canvas.height = p.h;
    this.paint.width = p.w;
    this.paint.height = p.h;
    this.canvas.hidden = false;
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

  /** Load a raster dataURL (save or undo snapshot) into the paint layer. */
  private loadRaster(url: string): Promise<void> {
    const p = this.payload as Payload;
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.pctx.clearRect(0, 0, p.w, p.h);
        this.pctx.drawImage(img, 0, 0, p.w, p.h);
        resolve();
      };
      img.onerror = () => resolve(); // unreadable snapshot → keep what's there
      img.src = url;
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

  // ---- freehand painting ---------------------------------------------------

  private pt(e: PointerEvent): Pt {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * this.canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * this.canvas.height,
    };
  }

  /** Brush width in art pixels, scaled off the payload width so sizes are
   *  consistent across 768-wide story art and ~1100-wide mandalas.
   *  2026-11-14 user call "最细都有点粗": ladder brought down — fine ≈ a
   *  thin marker (detail eyes/small areas), medium ≈ a crayon, large stays
   *  a wash brush. */
  private brushWidth(): number {
    const w = (this.payload as Payload).w;
    const f = this.size === 's' ? 0.008 : this.size === 'l' ? 0.06 : 0.024;
    return Math.max(4, Math.round(w * f));
  }

  /** One round-capped segment on the paint layer (a==b stamps a dot).
   *  The eraser runs destination-out so it only ever removes paint. */
  private dab(a: Pt, b: Pt): void {
    const p = this.payload as Payload;
    this.pctx.save();
    if (this.tool === 'erase') this.pctx.globalCompositeOperation = 'destination-out';
    this.pctx.strokeStyle = p.pal[this.selected] ?? '#cccccc';
    this.pctx.lineWidth = this.brushWidth();
    this.pctx.lineCap = 'round';
    this.pctx.lineJoin = 'round';
    this.pctx.beginPath();
    this.pctx.moveTo(a.x, a.y);
    this.pctx.lineTo(b.x, b.y);
    this.pctx.stroke();
    this.pctx.restore();
  }

  private strokeStart(e: PointerEvent): void {
    if (!this.payload || this.painting) return;
    e.preventDefault();
    try {
      this.canvas.setPointerCapture(e.pointerId);
    } catch {
      /* dead pointer (synthetic events) — paint the segment anyway */
    }
    this.pushUndo();
    this.painting = true;
    this.last = this.pt(e);
    this.dab(this.last, this.last);
    this.scheduleRender();
  }

  private strokeMove(e: PointerEvent): void {
    if (!this.painting || !this.last) return;
    // coalesced events keep fast strokes smooth on browsers that queue them
    const evs =
      typeof e.getCoalescedEvents === 'function' && e.getCoalescedEvents().length
        ? e.getCoalescedEvents()
        : [e];
    for (const ev of evs) {
      const p = this.pt(ev);
      this.dab(this.last, p);
      this.last = p;
    }
    this.scheduleRender();
  }

  private strokeEnd(): void {
    if (!this.painting) return;
    this.painting = false;
    this.last = null;
    this.syncButtons();
  }

  private scheduleRender(): void {
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      this.render();
    });
  }

  /** bg + paint + ink: 'multiply' keeps the line art visible over strokes. */
  private render(): void {
    const p = this.payload as Payload;
    const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = p.bg;
    ctx.fillRect(0, 0, p.w, p.h);
    ctx.drawImage(this.paint, 0, 0);
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(this.lineArt, 0, 0, p.w, p.h);
    ctx.globalCompositeOperation = 'source-over';
  }

  // ---- history (session only — nothing persists; publish is the save) ------

  /** Full-resolution snapshot for undo/redo (1:1 restore, no resampling). */
  private snapshot(): string {
    return this.paint.toDataURL('image/webp', 0.85);
  }

  private pushUndo(): void {
    this.undoStack.push(this.snapshot());
    if (this.undoStack.length > UNDO_DEPTH) this.undoStack.shift();
    this.redoStack.length = 0; // a new edit kills the redo branch
  }

  private syncButtons(): void {
    this.undoBtn.disabled = this.undoStack.length === 0;
    this.redoBtn.disabled = this.redoStack.length === 0;
  }

  private undo(): void {
    const snap = this.undoStack.pop();
    if (!snap) return;
    this.redoStack.push(this.snapshot());
    void this.applyRaster(snap);
  }

  private redo(): void {
    const snap = this.redoStack.pop();
    if (!snap) return;
    this.undoStack.push(this.snapshot());
    void this.applyRaster(snap);
  }

  private async applyRaster(url: string): Promise<void> {
    await this.loadRaster(url);
    this.render();
    this.syncButtons();
  }

  private reset(): void {
    const p = this.payload as Payload;
    if (!p || !window.confirm(t('col.p.resetConfirm'))) return;
    this.pushUndo();
    this.pctx.clearRect(0, 0, p.w, p.h);
    this.render();
    this.syncButtons();
    this.status('');
  }

  /** The "{n} areas to color" hero line, localized (SSR ships English). */
  private regionsLine(): void {
    const n = this.root.dataset.regions ?? '';
    const el = document.querySelector('[data-col-regions]');
    if (el && n) el.textContent = tArgs('col.regions', { n });
  }

  // ---- publish ------------------------------------------------------------

  private openPublish(): void {
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
    const p = this.payload as Payload;
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
          // the schema validates one char per ring; with freehand painting
          // there are no ring colors any more — dots are the honest value,
          // the gallery renders the preview image above
          colors: '.'.repeat(p.r.length),
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

document
  .querySelectorAll<HTMLElement>('[data-coloring-paint]')
  .forEach((el) => new PaintIsland(el));
