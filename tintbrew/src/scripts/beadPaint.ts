/**
 * Free-paint island for the blank bead canvas. The SSR figure already
 * carries the paintable cells (the pattern silhouette, all white) and the
 * peg holes; this script adds the play: a brush and an eraser, pointer
 * drag interpolated with an 8-connected line so fast or diagonal strokes
 * leave no gaps, the 32 real bead colors (custom input snapped to the
 * nearest bead, same Oklab engine as everywhere else), clear-all, and a
 * live materials list built from the painted cells alone.
 */
import { normalizeHex } from '../lib/color';
import { beadById, nearestBead } from '../lib/beadPalette';
import { paintLine, type PaintCell } from '../lib/beadPaint';

const WHITE_HEX = '#f5f4ef';

class PaintCanvas {
  private svg: SVGSVGElement;
  private list: HTMLElement;
  private cells = new Map<number, SVGRectElement>();
  private painted = new Map<number, string>(); // cell index -> bead id
  private tool: 'brush' | 'eraser' = 'brush';
  private beadId = 'black';
  private hex = beadById('black')!.hex;
  private drawing = false;
  private last: PaintCell | null = null;
  private listQueued = false;
  private badge: HTMLDivElement | null = null;

  constructor(private root: HTMLElement) {
    this.svg = root.querySelector<SVGSVGElement>('[data-bead-canvas]')!;
    this.list = root.querySelector<HTMLElement>('[data-cv-list]')!;
    const cols = Number(this.svg.dataset.cols);

    for (const el of this.svg.querySelectorAll<SVGRectElement>('.cv-cell')) {
      const idx = Number(el.dataset.cy) * cols + Number(el.dataset.cx);
      this.cells.set(idx, el);
    }

    root.addEventListener('click', (e) => this.onClick(e));
    root.addEventListener('input', (e) => this.onInput(e));

    this.svg.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.svg.setPointerCapture?.(e.pointerId);
      this.drawing = true;
      this.trackCursor(e);
      const cell = this.cellAt(e);
      if (cell) this.paintCell(cell);
      this.last = cell;
    });
    this.svg.addEventListener('pointermove', (e) => {
      this.trackCursor(e); // hover or drag — the readout follows either way
      if (!this.drawing || !this.last) return;
      const cell = this.cellAt(e);
      if (!cell) return;
      for (const c of paintLine(this.last, cell)) this.paintCell(c);
      this.last = cell;
    });
    this.svg.addEventListener('pointerleave', () => this.hideBadge());
    const stop = () => {
      this.drawing = false;
      this.last = null;
    };
    this.svg.addEventListener('pointerup', stop);
    this.svg.addEventListener('pointercancel', stop);
  }

  private onClick(e: Event) {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const clear = target.closest<HTMLButtonElement>('[data-cv-clear]');
    if (clear) {
      this.clearAll();
      return;
    }

    const toolBtn = target.closest<HTMLButtonElement>('[data-cv-tool]');
    if (toolBtn) {
      this.setTool(toolBtn.dataset.cvTool === 'eraser' ? 'eraser' : 'brush');
      return;
    }

    const swatch = target.closest<HTMLButtonElement>('[data-cv-color]');
    if (swatch) {
      const bead = beadById(swatch.dataset.cvColor!);
      if (bead) {
        this.beadId = bead.id;
        this.hex = bead.hex;
        this.setTool('brush'); // picking a color always means painting
        this.markActiveSwatch(swatch);
      }
      return;
    }
  }

  /** native color input fires continuously — snap on every tick */
  private onInput(e: Event) {
    const input = (e.target as HTMLElement).closest<HTMLInputElement>('[data-cv-custom]');
    if (!input) return;
    const hex = normalizeHex(input.value);
    if (!hex) return;
    const bead = nearestBead(hex);
    this.beadId = bead.id;
    this.hex = bead.hex;
    this.setTool('brush');
    this.markActiveSwatch(null);
    const hint = this.root.querySelector('.cv-custom-hint');
    if (hint) {
      hint.textContent =
        bead.hex === hex ? `exact match: ${bead.name}` : `nearest bead: ${bead.name}`;
    }
  }

  private setTool(tool: 'brush' | 'eraser') {
    this.tool = tool;
    for (const btn of this.root.querySelectorAll<HTMLButtonElement>('[data-cv-tool]')) {
      const active = btn.dataset.cvTool === tool;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  private markActiveSwatch(swatch: HTMLButtonElement | null) {
    for (const s of this.root.querySelectorAll<HTMLButtonElement>('[data-cv-color]')) {
      const active = s === swatch;
      s.classList.toggle('active', active);
      s.setAttribute('aria-pressed', active ? 'true' : 'false');
    }
  }

  /**
   * Floating readout: the grid cell under the pointer, in the same 1-based
   * numbers as the printed edge labels, shown while hovering or painting.
   */
  private trackCursor(e: PointerEvent) {
    const pos = this.gridAt(e);
    if (!pos) {
      this.hideBadge();
      return;
    }
    if (!this.badge) {
      this.badge = document.createElement('div');
      this.badge.className = 'cv-cursor';
      this.badge.setAttribute('aria-hidden', 'true');
      this.root.appendChild(this.badge);
    }
    this.badge.textContent = `${pos.x + 1}, ${pos.y + 1}`;
    const r = this.root.getBoundingClientRect();
    const overRight = e.clientX - r.left > r.width - 64;
    this.badge.style.left = `${e.clientX - r.left + (overRight ? -58 : 14)}px`;
    this.badge.style.top = `${e.clientY - r.top - 30}px`;
    this.badge.classList.add('on');
  }

  private hideBadge() {
    this.badge?.classList.remove('on');
  }

  /** Pointer position → grid coordinates, or null when outside the grid. */
  private gridAt(e: PointerEvent): PaintCell | null {
    const rect = this.svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const cols = Number(this.svg.dataset.cols);
    const rows = Number(this.svg.dataset.rows);
    const U = 10; // viewBox units per cell, matches BeadCanvas.astro
    // The viewBox is a square coordinate gutter plus the cell grid itself —
    // derive both from the attribute so the math tracks any gutter size.
    const vb = (this.svg.getAttribute('viewBox') ?? '').trim().split(/\s+/).map(Number);
    const vbW = vb[2] || cols * U;
    const scale = rect.width / vbW;
    const gutter = vbW - cols * U;
    const x = Math.floor(((e.clientX - rect.left) / scale - gutter) / U);
    const y = Math.floor(((e.clientY - rect.top) / scale - gutter) / U);
    if (x < 0 || y < 0 || x >= cols || y >= rows) return null;
    return { x, y };
  }

  /** Map a pointer event onto a paintable cell, or null when off-board. */
  private cellAt(e: PointerEvent): PaintCell | null {
    const pos = this.gridAt(e);
    if (!pos) return null;
    const cols = Number(this.svg.dataset.cols);
    return this.cells.has(pos.y * cols + pos.x) ? pos : null;
  }

  private paintCell(cell: PaintCell) {
    const cols = Number(this.svg.dataset.cols);
    const idx = cell.y * cols + cell.x;
    const el = this.cells.get(idx);
    if (!el) return;

    if (this.tool === 'brush') {
      el.setAttribute('fill', this.hex);
      el.classList.add('colored');
      this.painted.set(idx, this.beadId);
    } else {
      el.setAttribute('fill', WHITE_HEX);
      el.classList.remove('colored');
      this.painted.delete(idx);
    }
    this.queueList();
  }

  private clearAll() {
    for (const el of this.cells.values()) {
      el.setAttribute('fill', WHITE_HEX);
      el.classList.remove('colored');
    }
    this.painted.clear();
    this.queueList();
  }

  /** pointermove fires fast — coalesce list rebuilds into one per frame */
  private queueList() {
    if (this.listQueued) return;
    this.listQueued = true;
    requestAnimationFrame(() => {
      this.listQueued = false;
      this.renderList();
    });
  }

  private renderList() {
    this.list.innerHTML = '';
    const counts = new Map<string, number>();
    for (const beadId of this.painted.values()) {
      counts.set(beadId, (counts.get(beadId) ?? 0) + 1);
    }

    const total = document.createElement('li');
    total.className = 'cv-total';
    total.textContent = `${this.painted.size} of ${this.cells.size} beads painted`;
    this.list.appendChild(total);

    if (counts.size === 0) {
      const empty = document.createElement('li');
      empty.className = 'cv-empty';
      empty.textContent = 'Nothing painted yet — your bead list builds as you draw.';
      this.list.appendChild(empty);
      return;
    }

    const entries = [...counts.entries()]
      .map(([id, count]) => ({ bead: beadById(id), count }))
      .filter((e): e is { bead: NonNullable<ReturnType<typeof beadById>>; count: number } =>
        Boolean(e.bead),
      )
      .sort((a, b) => b.count - a.count);

    for (const { bead, count } of entries) {
      const li = document.createElement('li');
      const swatch = document.createElement('span');
      swatch.className = 'cv-item-swatch';
      swatch.style.background = bead.hex;
      const text = document.createElement('span');
      text.textContent = `${bead.name} ×${count}`;
      li.appendChild(swatch);
      li.appendChild(text);
      this.list.appendChild(li);
    }
  }
}

for (const el of document.querySelectorAll<HTMLElement>('[data-bead-paint]')) {
  new PaintCanvas(el);
}
