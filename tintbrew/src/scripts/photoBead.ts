/**
 * Photo → bead-pattern island, laid out like the source-site pattern maker
 * (user call, 2026-10-29): photo and settings in the left column, the
 * converted board in the right one, so the original and the pattern sit
 * side by side for direct comparison. Upload is a compact Choose-image row;
 * bead width comes as two separate options — Presets pills and a Custom
 * entry with its own number input (10 to 200). Background removal and the
 * dark outline ship checked, like the source site. The preview is a crisp
 * non-editable board with pegboard seams every 29 cells; fixing a stray
 * bead happens one click away in the editor (sessionStorage handoff).
 * Everything stays in the browser — the photo is never uploaded anywhere.
 */
import { photoToPattern, type PhotoPattern, type PhotoSimplify, type SampleImage } from '../lib/photoToPattern';
import { mardById } from '../lib/mardPalette';
import { BOARD_SIZE, downloadBoardPng } from '../lib/beadBoardRender';

const U = 10; // viewBox units per cell
const HANDOFF_KEY = 'bead-editor:handoff';
/** Source-site timings: presets land near-instantly, the custom number
 *  field waits for the typing to settle before re-converting. */
const DEBOUNCE_PRESET_MS = 80;
const DEBOUNCE_CUSTOM_MS = 260;
const DECODE_CAP = 2048;
const MIN_CUSTOM = 10;
const MAX_CUSTOM = 200;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

/** Width presets — same ladder as the source site; Custom is a separate
 *  option (its own card + number input), not a seventh pill. */
export const WIDTH_PRESETS: { value: string; label: string }[] = [
  { value: 'auto', label: 'Auto' },
  { value: '29', label: '29 · Compact' },
  { value: '58', label: '58 · Balanced' },
  { value: '87', label: '87 · Detailed' },
  { value: '116', label: '116 · Extra detailed' },
];

/** The width pills span two containers (Presets box + Custom box) — one
 *  mutually exclusive group across both. */
const WIDTH_PILL_SEL = '[data-photo-size] > button, [data-photo-custom-toggle]';

export class PhotoStudio {
  private source: SampleImage | null = null;
  private pattern: PhotoPattern | null = null;
  private sourceUrl: string | null = null;
  private timer: number | undefined;

  constructor(private root: HTMLElement) {
    const fileInput = root.querySelector<HTMLInputElement>('[data-photo-file]')!;
    const dropZone = root.querySelector<HTMLElement>('[data-photo-drop]')!;

    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (file) void this.load(file);
      fileInput.value = '';
    });
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('over');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('over'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('over');
      const file = e.dataTransfer?.files?.[0];
      if (file) void this.load(file);
    });
    // a drop that misses the zone makes the browser navigate to the image —
    // which throws away the converted board. Swallow stray drags page-wide.
    window.addEventListener('dragover', (e) => e.preventDefault());
    window.addEventListener('drop', (e) => e.preventDefault());

    root.addEventListener('click', (e) => this.onClick(e));
    // every setting re-converts on its own — no Convert button to hunt for
    root.addEventListener('change', (e) => {
      const t = e.target as HTMLElement;
      if (t.matches('[data-photo-bg], [data-photo-outline]')) {
        this.scheduleConvert(DEBOUNCE_PRESET_MS);
      }
    });
    root.addEventListener('input', (e) => {
      const t = e.target as HTMLElement;
      if (t.matches('[data-photo-custom-width]')) {
        this.scheduleConvert(DEBOUNCE_CUSTOM_MS);
      }
    });
  }

  private onClick(e: Event): void {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const pill = target.closest<HTMLButtonElement>(
      '[data-photo-colors] > button, [data-photo-simplify] > button, [data-photo-size] > button, [data-photo-custom-toggle]',
    );
    if (pill) {
      const group = pill.closest('[data-photo-colors]')
        ? '[data-photo-colors] > button'
        : pill.closest('[data-photo-simplify]')
          ? '[data-photo-simplify] > button'
          : WIDTH_PILL_SEL; // width pills: Presets box + Custom toggle, one group
      this.root.querySelectorAll(group).forEach((b) => {
        b.classList.toggle('active', b === pill);
        b.setAttribute('aria-checked', b === pill ? 'true' : 'false');
      });
      this.updateCustomRow();
      this.scheduleConvert(DEBOUNCE_PRESET_MS);
      return;
    }
    if (target.closest('[data-photo-print]')) {
      window.print();
      return;
    }
    if (target.closest('[data-photo-png]')) {
      const p = this.pattern;
      if (p) {
        downloadBoardPng(
          p.cols,
          p.rows,
          (y, x) => mardById(p.cells[y * p.cols + x] ?? '')?.hex ?? null,
          'tintbrew-bead-pattern.png',
        );
      }
      return;
    }
    if (target.closest('[data-photo-edit]')) this.openInEditor();
  }

  private isCustomMode(): boolean {
    return this.root
      .querySelector('[data-photo-custom-toggle]')
      ?.classList.contains('active') === true;
  }

  /** The custom-width input only makes sense on the Custom option. */
  private updateCustomRow(): void {
    const row = this.root.querySelector('[data-photo-custom-row]');
    if (!row) return;
    row.classList.toggle('hidden', !this.isCustomMode());
  }

  private status(): HTMLElement {
    return this.root.querySelector('[data-photo-status]')!;
  }

  private groupValue(sel: string): string {
    return this.root.querySelector(`${sel}.active`)?.getAttribute('data-value') ?? '';
  }

  private opts(): {
    cols: number;
    mode: 'smooth' | 'dither';
    maxColors: number;
    simplify: PhotoSimplify;
    removeBackground: boolean;
    darkOutline: boolean;
  } {
    const custom = Number(
      (this.root.querySelector<HTMLInputElement>('[data-photo-custom-width]')?.value ?? '').trim(),
    );
    const error = this.root.querySelector('[data-photo-width-error]');
    let cols: number;
    if (this.isCustomMode()) {
      if (!Number.isFinite(custom) || custom < MIN_CUSTOM || custom > MAX_CUSTOM) {
        error?.classList.remove('hidden');
        cols = -1; // signal: hold the last board until the input is valid
      } else {
        error?.classList.add('hidden');
        cols = Math.round(custom);
      }
    } else {
      error?.classList.add('hidden');
      const sizeVal = this.groupValue('[data-photo-size] > button');
      cols =
        sizeVal === 'auto' || !sizeVal
          ? this.source
            ? PhotoStudio.autoCols(this.source.width, this.source.height)
            : BOARD_SIZE
          : Number(sizeVal) || BOARD_SIZE;
    }
    const simplifyVal = this.groupValue('[data-photo-simplify] > button');
    const bg = this.root.querySelector<HTMLInputElement>('[data-photo-bg]');
    const outline = this.root.querySelector<HTMLInputElement>('[data-photo-outline]');
    const colorsVal = this.groupValue('[data-photo-colors] > button');
    return {
      cols,
      mode: 'smooth',
      // 'all' = the full 291-color line, uncapped; numbers cap as themselves
      maxColors: colorsVal === 'all' ? 291 : Number(colorsVal) || 12,
      simplify: simplifyVal === 'keep' || simplifyVal === 'bold' ? simplifyVal : 'balanced',
      removeBackground: bg ? bg.checked : true,
      darkOutline: outline ? outline.checked : true,
    };
  }

  /** Filename truncation for the compact upload row — cap keeps the row on
   *  one line; the full name rides along as the title. */
  private setFilename(name: string | null): void {
    const el = this.root.querySelector('[data-photo-filename]');
    if (!el) return;
    if (!name) {
      el.textContent = 'No image selected yet.';
      el.removeAttribute('title');
      return;
    }
    el.textContent = name.length > 28 ? `${name.slice(0, 27)}…` : name;
    el.setAttribute('title', name);
  }

  /** The source photo preview lives in the LEFT column, between the
   *  settings and the auto-apply note — the source-site position. The slot
   *  ships with a dashed placeholder; the upload swaps it for the photo. */
  private showSource(): void {
    const slot = this.root.querySelector('[data-photo-source]');
    if (!slot || !this.sourceUrl) return;
    slot.innerHTML = '';
    const label = document.createElement('p');
    label.className = 'source-label';
    label.textContent = 'Your source photo';
    const img = document.createElement('img');
    img.src = this.sourceUrl;
    img.alt = 'Your uploaded photo — compare it with the converted pattern';
    img.className = 'source-img';
    img.loading = 'lazy';
    slot.append(label, img);
  }

  private async load(file: File): Promise<void> {
    const status = this.status();
    if (!file.type.startsWith('image/')) {
      status.textContent = 'That file is not an image — pick a JPG, PNG or WebP.';
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      status.textContent = 'That image is over 10 MB — shrink it a little and try again.';
      return;
    }
    if (this.sourceUrl) URL.revokeObjectURL(this.sourceUrl);
    this.sourceUrl = URL.createObjectURL(file);
    status.textContent = 'Reading your photo…';
    try {
      this.source = await this.decode(file);
      this.setFilename(file.name);
      this.showSource();
      // a fresh photo resets the width to Auto, like the source site
      const auto = this.root.querySelector<HTMLButtonElement>('[data-photo-size] > [data-value="auto"]');
      auto?.click();
      this.convert();
    } catch {
      status.textContent = 'Could not read that image — try a different file.';
    }
  }

  /** Board width that keeps the photo's structure readable: ≥2.2 source
   *  pixels per cell on the short edge, clamped to [29, 116]. */
  static autoCols(width: number, height: number): number {
    return Math.min(116, Math.max(29, Math.round(Math.min(width, height) / 2.2)));
  }

  /** File → RGBA pixels. Decodes locally; nothing leaves the browser.
   *  Downscale to 2048 on the long edge with smoothing on — nearest-drop
   *  throws away pixels and costs the converter detail (source-site
   *  behavior, 2026-10-29 fidelity pass). */
  private async decode(file: File): Promise<SampleImage> {
    let w = 0;
    let h = 0;
    let draw: (ctx: CanvasRenderingContext2D) => void;
    let bmp: ImageBitmap | null = null;

    if (typeof createImageBitmap === 'function') {
      bmp = await createImageBitmap(file);
      w = bmp.width;
      h = bmp.height;
      draw = (ctx) => ctx.drawImage(bmp!, 0, 0);
    } else {
      const url = URL.createObjectURL(file);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('decode failed'));
        img.src = url;
      });
      w = img.naturalWidth;
      h = img.naturalHeight;
      draw = (ctx) => ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
    }

    const scale = Math.min(1, DECODE_CAP / Math.max(w, h));
    const cw = Math.max(1, Math.round(w * scale));
    const ch = Math.max(1, Math.round(h * scale));
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('no 2d context');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    draw(ctx);
    bmp?.close();
    const img = ctx.getImageData(0, 0, cw, ch);
    return { data: img.data, width: cw, height: ch };
  }

  /** Feed pixels directly — the UI path goes through load/decode. */
  convertSample(sample: SampleImage): void {
    this.source = sample;
    this.convert();
  }

  /** Debounced re-convert — settings changes arrive in bursts while a user
   *  walks the pills; one conversion per settle keeps the page responsive. */
  private scheduleConvert(ms: number): void {
    if (!this.source) return;
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.convert(), ms);
  }

  private convert(): void {
    if (!this.source) return;
    const opts = this.opts();
    if (opts.cols < 1) return; // custom width mid-edit — keep the last board
    const status = this.status();
    let pattern: PhotoPattern;
    try {
      pattern = photoToPattern(this.source, opts);
    } catch {
      status.textContent = 'Conversion failed — try another photo.';
      return;
    }
    if (!pattern.cells.length) {
      status.textContent = 'Conversion failed — try another photo.';
      return;
    }
    this.pattern = pattern;
    this.render(pattern, opts);
    const beads = pattern.cells.filter(Boolean).length;
    const colors = new Set(pattern.cells.filter(Boolean)).size;
    status.textContent = `Pattern generated — ${pattern.cols} × ${pattern.rows}, ${beads.toLocaleString('en-US')} beads in ${colors} ${colors === 1 ? 'color' : 'colors'}. Open it in the editor to fix any bead.`;
    if (window.matchMedia('(max-width: 980px)').matches) {
      this.root
        .querySelector('[data-photo-stage]')
        ?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
    }
  }

  /** The result column: the crisp preview board with its actions, the
   *  summary and conversion panels, and the per-color bead list with
   *  P-codes. The source photo stays in the left column. */
  private render(p: PhotoPattern, opts: { cols: number; maxColors: number; simplify: string }): void {
    const stage = this.root.querySelector<HTMLElement>('[data-photo-stage]')!;
    stage.innerHTML = '';
    const beads = p.cells.filter(Boolean).length;
    const colors = new Set(p.cells.filter(Boolean));
    const bw = Math.ceil(p.cols / BOARD_SIZE);
    const bh = Math.ceil(p.rows / BOARD_SIZE);
    const suggested = this.source ? PhotoStudio.autoCols(this.source.width, this.source.height) : p.cols;
    const overwiden = opts.cols > suggested;
    const sizeLabel = this.isCustomMode()
      ? `Custom bead width: ${opts.cols}`
      : this.groupValue('[data-photo-size] > button') === 'auto'
        ? `Auto: ${opts.cols} beads — the detail this photo carries`
        : `Preset width: ${opts.cols} beads`;

    const card = document.createElement('div');
    card.className = 'paint-card';
    card.setAttribute('data-photo-result', '');

    const actions = document.createElement('div');
    actions.className = 'photo-actions no-print';
    actions.innerHTML = `
      <button type="button" class="btn act-primary" data-photo-edit>Edit in editor</button>
      <button type="button" class="btn" data-photo-png>Download PNG</button>
      <button type="button" class="btn" data-photo-print>Print pattern</button>
    `;

    const figure = document.createElement('figure');
    figure.className = 'fig-card';
    const caption = document.createElement('figcaption');
    const capTitle = document.createElement('span');
    capTitle.textContent = 'Pattern preview';
    const capHint = document.createElement('span');
    capHint.className = 'hint';
    capHint.textContent = `${p.cols} × ${p.rows} beads — seams mark the pegboards`;
    caption.append(capTitle, capHint);
    figure.append(caption, this.buildBoard(p));

    const summary = document.createElement('div');
    summary.className = 'panel-grid';
    summary.innerHTML = `
      <div class="panel-card">
        <p class="panel-label">Pattern summary</p>
        <div class="panel-lines">
          <p class="strong">${p.cols} × ${p.rows} beads</p>
          <p>${bw * bh} ${bw * bh === 1 ? 'pegboard' : 'pegboards'} — ${bw} × ${bh}</p>
          <p>${beads.toLocaleString('en-US')} ${beads === 1 ? 'bead' : 'beads'}</p>
          <p>${colors.size} ${colors.size === 1 ? 'color' : 'colors'}</p>
        </div>
      </div>
      <div class="panel-card">
        <p class="panel-label">Conversion</p>
        <div class="panel-lines">
          <p>Matched to the real 291-color bead line</p>
          <p>${sizeLabel}</p>
          ${overwiden ? `<p class="warn">This photo carries about ${suggested} beads of detail — Auto (${suggested} wide) prints cleaner.</p>` : ''}
        </div>
      </div>
    `;

    const counts = new Map<string, number>();
    for (const id of p.cells) if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
    const rows = [...counts.entries()]
      .map(([id, count]) => ({ bead: mardById(id)!, count }))
      .sort((a, b) => b.count - a.count);

    const listCard = document.createElement('div');
    listCard.className = 'panel-card beads-card';
    const listTitle = document.createElement('p');
    listTitle.className = 'panel-title';
    listTitle.textContent = 'Beads required per color';
    const list = document.createElement('div');
    list.className = 'bead-rows';
    list.setAttribute('data-photo-color-list', '');
    for (const { bead, count } of rows) {
      const row = document.createElement('div');
      row.className = 'bead-row';
      row.title = `${bead.code} (${bead.hex})`;
      const swatch = document.createElement('span');
      swatch.className = 'row-swatch';
      swatch.style.background = bead.hex;
      const label = document.createElement('span');
      label.className = 'row-label';
      const code = document.createElement('strong');
      code.textContent = bead.code;
      label.append(code, ` (${bead.hex})`);
      const n = document.createElement('span');
      n.className = 'row-count';
      n.textContent = String(count);
      row.append(swatch, label, n);
      list.appendChild(row);
    }
    listCard.append(listTitle, list);

    card.append(figure, actions, summary, listCard);
    stage.appendChild(card);
  }

  /** Static preview board in the source-site editor's look: paper base,
   *  solid bead cells, white pegs on empties, seams every 29 cells. */
  private buildBoard(p: PhotoPattern): SVGSVGElement {
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const w = p.cols * U;
    const h = p.rows * U;
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'bead-fig photo-preview');
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', `Converted bead pattern preview, ${p.cols} by ${p.rows} beads`);
    svg.style.maxWidth = `${Math.round(w * 1.25)}px`;
    for (let y = 0; y < p.rows; y++) {
      for (let x = 0; x < p.cols; x++) {
        const id = p.cells[y * p.cols + x];
        if (id) {
          const bead = mardById(id)!;
          const rect = document.createElementNS(SVG_NS, 'rect');
          rect.setAttribute('class', 'pv-cell');
          rect.setAttribute('x', String(x * U));
          rect.setAttribute('y', String(y * U));
          rect.setAttribute('width', String(U));
          rect.setAttribute('height', String(U));
          rect.setAttribute('fill', bead.hex);
          svg.appendChild(rect);
        } else {
          const c = document.createElementNS(SVG_NS, 'circle');
          c.setAttribute('class', 'pv-peg');
          c.setAttribute('cx', String(x * U + U / 2));
          c.setAttribute('cy', String(y * U + U / 2));
          c.setAttribute('r', String(U * 0.28));
          svg.appendChild(c);
        }
      }
    }
    for (let x = BOARD_SIZE; x < p.cols; x += BOARD_SIZE) {
      const l = document.createElementNS(SVG_NS, 'line');
      l.setAttribute('class', 'pv-seam');
      l.setAttribute('x1', String(x * U));
      l.setAttribute('y1', '0');
      l.setAttribute('x2', String(x * U));
      l.setAttribute('y2', String(h));
      svg.appendChild(l);
    }
    for (let y = BOARD_SIZE; y < p.rows; y += BOARD_SIZE) {
      const l = document.createElementNS(SVG_NS, 'line');
      l.setAttribute('class', 'pv-seam');
      l.setAttribute('x1', '0');
      l.setAttribute('y1', String(y * U));
      l.setAttribute('x2', String(w));
      l.setAttribute('y2', String(y * U));
      svg.appendChild(l);
    }
    const border = document.createElementNS(SVG_NS, 'rect');
    border.setAttribute('class', 'pv-border');
    border.setAttribute('x', '0.5');
    border.setAttribute('y', '0.5');
    border.setAttribute('width', String(w - 1));
    border.setAttribute('height', String(h - 1));
    svg.appendChild(border);
    return svg;
  }

  /** Hand the converted board to the editor page — the source site's
   *  sessionStorage handoff, same key shape our editor reads. */
  private openInEditor(): void {
    const p = this.pattern;
    if (!p) return;
    const grid: (string | null)[][] = [];
    for (let y = 0; y < p.rows; y++) {
      grid.push(Array.from({ length: p.cols }, (_, x) => p.cells[y * p.cols + x] ?? null));
    }
    try {
      window.sessionStorage.setItem(HANDOFF_KEY, JSON.stringify({ width: p.cols, height: p.rows, grid }));
      window.location.href = '/bead-editor/';
    } catch {
      // storage blocked — the editor still opens, just empty
      window.location.href = '/bead-editor/';
    }
  }
}

for (const el of document.querySelectorAll<HTMLElement>('[data-photo-bead]')) {
  new PhotoStudio(el);
}
