/**
 * Photo → bead-pattern island. The SSR page ships the upload controls and
 * the how-to content; this script adds the play: pick (or drag) a picture,
 * and it's sampled onto a full bead board — every cell snapped to the
 * nearest real bead by Oklab distance, so gradients survive. The rendered
 * board reuses the cv-cell DOM contract, then hands itself to PaintCanvas:
 * the brush, eraser, mirror, custom-color snapping and the live materials
 * list all work on the converted pattern with zero new interaction code.
 * Everything stays in the browser — the photo is never uploaded anywhere.
 */
import { photoToPattern, type PhotoMode, type PhotoPattern, type SampleImage } from '../lib/photoToPattern';
import { BEAD_COLORS, beadById } from '../lib/beadPalette';
import { PaintCanvas } from './beadPaint';

const U = 10; // viewBox units per cell — matches BeadCanvas.astro
const G = 16; // coordinate gutter (viewBox units)
const MAX_SCALE = 1.25; // rendered-width cap, same idea as the blank canvas
const SVG_NS = 'http://www.w3.org/2000/svg';
const DECODE_CAP = 1600; // sampling beyond this only burns memory; at the
// 116-wide board option it still feeds every cell ~13 source pixels

export class PhotoStudio {
  private source: SampleImage | null = null;
  private sourceUrl: string | null = null; // blob URL for the source photo preview

  constructor(private root: HTMLElement) {
    const fileInput = root.querySelector<HTMLInputElement>('[data-photo-file]')!;
    const dropZone = root.querySelector<HTMLElement>('[data-photo-drop]')!;

    fileInput.addEventListener('change', () => {
      const file = fileInput.files?.[0];
      if (file) void this.load(file);
    });
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('keydown', (e) => {
      // the drop zone carries role="button" — keys must reach it too
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

    root.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('[data-photo-convert]')) this.convert();
      // print lives with the touch-up tools (not the upload controls) —
      // users print after editing, and the print CSS keeps the board, the
      // bead list and the source photo while the tool panel hides
      if ((e.target as HTMLElement).closest('[data-photo-print]')) window.print();
    });
    // an option change re-converts immediately — no dead "Convert" clicks
    root.addEventListener('change', (e) => {
      const t = e.target as HTMLElement;
      if (t.matches('[data-photo-size], [data-photo-mode], [data-photo-colors]') && this.source) {
        this.convert();
      }
    });
  }

  private status(): HTMLElement {
    return this.root.querySelector('[data-photo-status]')!;
  }

  private opts(): { cols: number; mode: PhotoMode; maxColors: number } {
    const sel = (key: string) =>
      Number((this.root.querySelector<HTMLSelectElement>(key))?.value ?? 0);
    const mode = (this.root.querySelector<HTMLSelectElement>('[data-photo-mode]'))?.value;
    return {
      cols: sel('[data-photo-size]') || 29,
      mode: mode === 'dither' ? 'dither' : 'smooth',
      maxColors: sel('[data-photo-colors]') || BEAD_COLORS.length,
    };
  }

  private async load(file: File): Promise<void> {
    const status = this.status();
    if (!file.type.startsWith('image/')) {
      status.textContent = 'That file is not an image — pick a JPG, PNG or WebP.';
      return;
    }
    // release the previous blob URL so we don't leak one per upload
    if (this.sourceUrl) URL.revokeObjectURL(this.sourceUrl);
    this.sourceUrl = URL.createObjectURL(file);
    status.textContent = 'Reading your photo…';
    try {
      this.source = await this.decode(file);
      this.convert();
    } catch {
      status.textContent = 'Could not read that image — try a different file.';
    }
  }

  /** File → RGBA pixels. Decodes locally; nothing leaves the browser. */
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
    // bead conversion wants the colors that are IN the source: smoothing
    // would blur a large cartoon's outlines into mid-tones before the
    // engine ever samples them. Nearest keeps hard edges hard; the engine
    // averages per cell where averaging is right (smooth photo gradients)
    ctx.imageSmoothingEnabled = false;
    draw(ctx);
    // a 12MP phone photo decodes to ~48MB of bitmap memory — release it
    // the moment it's on the canvas instead of waiting for GC
    bmp?.close();
    const img = ctx.getImageData(0, 0, cw, ch);
    return { data: img.data, width: cw, height: ch };
  }

  /** Feed pixels directly — the UI path goes through load/decode. */
  convertSample(sample: SampleImage): void {
    this.source = sample;
    this.convert();
  }

  private convert(): void {
    if (!this.source) return;
    const status = this.status();
    let pattern: PhotoPattern;
    try {
      pattern = photoToPattern(this.source, this.opts());
    } catch {
      status.textContent = 'Conversion failed — try another photo.';
      return;
    }
    if (!pattern.cells.length) {
      status.textContent = 'Conversion failed — try another photo.';
      return;
    }
    this.render(pattern);
    status.textContent = `${pattern.cols} × ${pattern.rows} board — ${pattern.cells.length.toLocaleString('en-US')} beads. Paint over any cell you want to change, then print.`;
    this.root
      .querySelector('[data-photo-stage]')
      ?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  }

  /** Build the editable board: same cv-cell contract as BeadCanvas.astro,
   *  pre-filled with the converted colors, then handed to PaintCanvas. */
  private render(p: PhotoPattern): void {
    const stage = this.root.querySelector<HTMLElement>('[data-photo-stage]')!;
    stage.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'paint-card';
    card.setAttribute('data-bead-paint', '');

    const body = document.createElement('div');
    body.className = 'paint-body';

    const figure = document.createElement('figure');
    figure.className = 'fig-card';
    const caption = document.createElement('figcaption');
    const capTitle = document.createElement('span');
    capTitle.textContent = 'Your pattern';
    const capHint = document.createElement('span');
    capHint.className = 'hint';
    capHint.textContent = `${p.cols} × ${p.rows} — tap a bead to fix it`;
    caption.append(capTitle, capHint);

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'bead-fig');
    svg.setAttribute('data-bead-canvas', '');
    svg.setAttribute('data-cols', String(p.cols));
    svg.setAttribute('data-rows', String(p.rows));
    svg.setAttribute('viewBox', `0 0 ${p.cols * U + G} ${p.rows * U + G}`);
    svg.style.maxWidth = `${Math.round((p.cols * U + G) * MAX_SCALE)}px`;
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Your photo converted to a bead pattern — every cell is editable');

    const coords = document.createElementNS(SVG_NS, 'g');
    coords.setAttribute('class', 'cv-coords');
    coords.setAttribute('aria-hidden', 'true');
    for (let c = 5; c <= p.cols; c += 5) {
      const t = document.createElementNS(SVG_NS, 'text');
      t.setAttribute('class', 'cv-label');
      t.setAttribute('x', String(G + c * U - U / 2));
      t.setAttribute('y', String(G / 2));
      t.textContent = String(c);
      coords.appendChild(t);
    }
    for (let r = 5; r <= p.rows; r += 5) {
      const t = document.createElementNS(SVG_NS, 'text');
      t.setAttribute('class', 'cv-label');
      t.setAttribute('x', String(G / 2));
      t.setAttribute('y', String(G + r * U - U / 2));
      t.textContent = String(r);
      coords.appendChild(t);
    }
    svg.appendChild(coords);

    for (let y = 0; y < p.rows; y++) {
      for (let x = 0; x < p.cols; x++) {
        const bead = beadById(p.cells[y * p.cols + x]!);
        if (!bead) continue;
        // region underlay: a low-opacity tint under every cell. Painted
        // cells cover it completely; erase or Clear all makes the cell
        // transparent and the region tint shows through — an emptied board
        // still tells you where each color area was (and prints as a
        // fill-it-yourself template)
        const ghost = document.createElementNS(SVG_NS, 'rect');
        ghost.setAttribute('class', 'cv-ghost');
        ghost.setAttribute('x', String(x * U + G + 0.8));
        ghost.setAttribute('y', String(y * U + G + 0.8));
        ghost.setAttribute('width', String(U - 1.6));
        ghost.setAttribute('height', String(U - 1.6));
        ghost.setAttribute('rx', '2.6');
        ghost.setAttribute('fill', bead.hex);
        const rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttribute('class', 'cv-cell colored');
        rect.setAttribute('data-cx', String(x));
        rect.setAttribute('data-cy', String(y));
        rect.setAttribute('x', String(x * U + G + 0.8));
        rect.setAttribute('y', String(y * U + G + 0.8));
        rect.setAttribute('width', String(U - 1.6));
        rect.setAttribute('height', String(U - 1.6));
        rect.setAttribute('rx', '2.6');
        rect.setAttribute('fill', bead.hex);
        svg.appendChild(ghost);
        svg.appendChild(rect);
      }
    }

    figure.append(caption, svg);

    // Tool panel mirrors BeadCanvas.astro's markup — PaintCanvas binds to
    // these data-* hooks, so the converted board is instantly editable.
    const tools = document.createElement('div');
    tools.className = 'paint-tools no-print';
    tools.innerHTML = `
      <h3>Touch it up</h3>
      <p class="side-note">
        Wrong bead somewhere? The brush repaints any cell, the eraser wipes it
        back to white, and <strong>Mirror</strong> paints both halves at once.
        The list below counts exactly what your board uses.
      </p>
      <div class="tool-row" role="group" aria-label="Paint tools">
        <button type="button" class="btn tool-btn active" data-cv-tool="brush" aria-pressed="true">Brush</button>
        <button type="button" class="btn tool-btn" data-cv-tool="eraser" aria-pressed="false">Eraser</button>
        <button type="button" class="btn tool-btn" data-cv-mirror aria-pressed="false" title="Every stroke lands on the mirrored cell too">Mirror</button>
        <button type="button" class="btn tool-btn" data-cv-clear>Clear all</button>
        <button type="button" class="btn tool-btn" data-photo-print>Print pattern</button>
      </div>
      <div class="cv-palette" role="group" aria-label="Bead colors">
        ${BEAD_COLORS.map(
          (b) =>
            `<button type="button" class="cv-swatch${b.id === 'black' ? ' active' : ''}" data-cv-color="${b.id}" style="background:${b.hex}" title="${b.name}" aria-label="Paint with ${b.name}" aria-pressed="${b.id === 'black'}"></button>`,
        ).join('')}
      </div>
      <label class="cv-custom">custom color
        <input type="color" data-cv-custom aria-label="Custom paint color, snapped to the nearest bead" />
        <span class="cv-custom-hint">snapped to the nearest bead</span>
      </label>
    `;

    // the bead list is a sibling of the tools, NOT inside them — the tools
    // panel hides in print, and the shopping list is half the print output
    const listCard = document.createElement('div');
    listCard.className = 'cv-list-card';
    const listTitle = document.createElement('h3');
    listTitle.textContent = 'Bead list';
    const list = document.createElement('ul');
    list.className = 'bead-list cv-list';
    list.setAttribute('data-cv-list', '');
    const listEmpty = document.createElement('li');
    listEmpty.className = 'cv-empty';
    listEmpty.textContent = 'Nothing painted yet — your bead list builds as you draw.';
    list.appendChild(listEmpty);
    listCard.append(listTitle, list);

    // source photo thumbnail — so the user can compare the original to the
    // bead board. The URL is only set via the real upload path; the test
    // shortcut (convertSample) has no URL and skips the preview.
    if (this.sourceUrl) {
      const sourceCard = document.createElement('div');
      sourceCard.className = 'source-photo';
      const sourceLabel = document.createElement('p');
      sourceLabel.className = 'source-label';
      sourceLabel.textContent = 'Your source photo';
      const sourceImg = document.createElement('img');
      sourceImg.src = this.sourceUrl;
      sourceImg.alt = 'Your uploaded photo — use it as a reference while editing the bead board';
      sourceImg.className = 'source-img';
      sourceImg.loading = 'lazy';
      sourceCard.append(sourceLabel, sourceImg);
      body.append(sourceCard, figure, tools, listCard);
    } else {
      body.append(figure, tools, listCard);
    }
    card.appendChild(body);
    stage.appendChild(card);
    // erased cells go transparent so the region underlay shows through
    new PaintCanvas(card, { erasedFill: 'transparent' });
  }
}

for (const el of document.querySelectorAll<HTMLElement>('[data-photo-bead]')) {
  new PhotoStudio(el);
}
