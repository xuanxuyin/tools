/**
 * Paint-canvas island tests against the real SSR markup from `astro build`
 * (the corgi-butt-peek page — a small 17-wide grid, easy on happy-dom).
 * The board ships preloaded with the pattern's own colors (data-bead per
 * cell); interactive tests clear it first, then run the compiled island:
 * tap paints one bead, a drag paints the whole 8-connected stroke and
 * skips empty peg holes, eraser wipes back to white, clear-all resets, and
 * the live list counts exactly what was placed.
 * All stroke targets are found from the built DOM (longest runs, gaps,
 * diagonals), so swapping the fixture pattern never breaks the geometry.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';

const htmlPath = resolve(
  fileURLToPath(import.meta.url),
  '../../../dist/perler-bead-animals/corgi-butt-peek/index.html',
);

const CELL_PX = 20; // stubbed layout: COLS × 20px wide board
const GUTTER = 16; // coordinate gutter in viewBox units (BeadCanvas.astro)
const BLACK = '#323234'; // default brush bead hex
const WHITE = '#eaefee'; // erased fill — an unpainted cell

/** Geometry read off the built page: which grid positions carry a cell. */
interface Grid {
  cols: number;
  rows: number;
  has: (x: number, y: number) => boolean;
  /** longest horizontal run of cells, length ≥5 */
  run: { y: number; x0: number; x1: number };
  /** two cell runs on one row separated by ≥1 peg hole */
  gap: { y: number; a: number; b: number };
  /** longest ↘ staircase of cells, length ≥4 */
  diag: { x0: number; y0: number; len: number };
  /** a row where x and cols-1-x are both cells, with a 3+ run at x */
  mirrorRun: { y: number; x: number; len: number };
  /** a second, distinct mirror pair on another row (for the mirror-off tap) */
  mirrorSolo: { x: number; y: number };
}

function readGrid(doc: Document): Grid {
  const set = new Set<string>();
  let cols = 0;
  let rows = 0;
  for (const c of doc.querySelectorAll('.cv-cell')) {
    const x = Number(c.getAttribute('data-cx'));
    const y = Number(c.getAttribute('data-cy'));
    set.add(`${x},${y}`);
    cols = Math.max(cols, x + 1);
    rows = Math.max(rows, y + 1);
  }
  const has = (x: number, y: number) => set.has(`${x},${y}`);

  let run = { y: 0, x0: 0, x1: -1 };
  let gap = { y: 0, a: 0, b: -1 };
  let mirrorRun = { y: -1, x: 0, len: 0 };
  let mirrorSolo: { x: number; y: number } | null = null;
  for (let y = 0; y < rows; y++) {
    // runs of consecutive cells on this row
    const runs: [number, number][] = [];
    let x0 = -1;
    for (let x = 0; x <= cols; x++) {
      const cell = x < cols && has(x, y);
      if (cell && x0 < 0) x0 = x;
      if (!cell && x0 >= 0) {
        runs.push([x0, x - 1]);
        x0 = -1;
      }
    }
    for (const [a, b] of runs) {
      if (b - a > run.x1 - run.x0) run = { y, x0: a, x1: b };
    }
    // first row where two runs are split by at least one hole
    if (gap.b < 0 && runs.length >= 2 && runs[1]![0] - runs[0]![1] >= 2) {
      gap = { y, a: runs[0]![1], b: runs[1]![0] };
    }
    // mirror candidate: a 3+ run whose mirror cells also exist
    for (let x = 0; x < Math.floor(cols / 2); x++) {
      let len = 0;
      while (has(x + len, y) && has(cols - 1 - (x + len), y)) len++;
      if (len >= 3 && len > mirrorRun.len) mirrorRun = { y, x, len };
    }
    // a mirror pair on some other row, outside the mirrorRun stretch
    if (!mirrorSolo) {
      for (let x = 0; x < Math.floor(cols / 2); x++) {
        if (has(x, y) && has(cols - 1 - x, y) && y !== mirrorRun.y) {
          mirrorSolo = { x, y };
          break;
        }
      }
    }
  }

  let diag = { x0: 0, y0: 0, len: 0 };
  for (const key of set) {
    const [sx, sy] = key.split(',').map(Number);
    let len = 0;
    while (has(sx + len, sy + len)) len++;
    if (len > diag.len) diag = { x0: sx, y0: sy, len };
  }
  return {
    cols,
    rows,
    has,
    run,
    gap,
    diag,
    mirrorRun,
    mirrorSolo: mirrorSolo ?? { x: mirrorRun.x, y: mirrorRun.y },
  };
}

const PPU = (grid: Grid) => (grid.cols * CELL_PX) / (grid.cols * 10 + GUTTER);

async function loadPage() {
  const html = readFileSync(htmlPath, 'utf8');
  const window = new Window({ url: 'https://tintbrew.com/perler-bead-animals/corgi-butt-peek/' });
  const { document } = window;
  document.write(html);
  (globalThis as Record<string, unknown>).document = document;
  (globalThis as Record<string, unknown>).window = window;
  // flush list rebuilds synchronously — no frame scheduler in happy-dom
  (globalThis as Record<string, unknown>).requestAnimationFrame = (cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  };
  vi.resetModules();
  await import('./beadPaint');
  return { window, document: document as unknown as Document, grid: readGrid(document) };
}

function stubBoard(doc: Document, grid: Grid) {
  const svg = doc.querySelector('[data-bead-canvas]') as unknown as SVGSVGElement & {
    getBoundingClientRect: () => DOMRect;
  };
  svg.getBoundingClientRect = () =>
    ({
      left: 0,
      top: 0,
      right: grid.cols * CELL_PX,
      bottom: grid.rows * CELL_PX,
      width: grid.cols * CELL_PX,
      height: grid.rows * CELL_PX,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }) as DOMRect;
  return svg;
}

function firePointer(window: Window, el: Element, type: string, cx: number, cy: number) {
  const w = window as unknown as { PointerEvent?: typeof MouseEvent; MouseEvent: typeof MouseEvent };
  const Ctor = w.PointerEvent ?? w.MouseEvent;
  el.dispatchEvent(new Ctor(type, { bubbles: true, cancelable: true, clientX: cx, clientY: cy }));
}

function fireClick(el: Element) {
  el.dispatchEvent(new (el.ownerDocument!.defaultView!.MouseEvent)('click', { bubbles: true }));
}

/** client-pixel center of grid cell (col, row) under the stubbed layout */
const px = (grid: Grid, col: number, row: number) => ({
  cx: (GUTTER + col * 10 + 5) * PPU(grid),
  cy: (GUTTER + row * 10 + 5) * PPU(grid),
});

const fillOf = (doc: Document, col: number, row: number) =>
  doc
    .querySelector(`.cv-cell[data-cx="${col}"][data-cy="${row}"]`)!
    .getAttribute('fill');

const listText = (doc: Document) =>
  [...doc.querySelectorAll('[data-cv-list] li')].map((li) => li.textContent).join(' | ');

describe('paint canvas island (real SSR markup)', () => {
  let ctx: Awaited<ReturnType<typeof loadPage>>;

  beforeEach(async () => {
    ctx = await loadPage();
  });

  it('every pattern bead ships preloaded in color with peg holes around it', () => {
    const { document: doc, grid } = ctx;
    const cells = doc.querySelectorAll('.cv-cell');
    const pegs = doc.querySelectorAll('.cv-peg');
    expect(cells.length).toBeGreaterThan(100);
    expect(cells.length + pegs.length).toBe(grid.cols * grid.rows);
    // geometry probes found real structures (guards the guards)
    expect(grid.run.x1 - grid.run.x0).toBeGreaterThanOrEqual(4);
    expect(grid.diag.len).toBeGreaterThanOrEqual(4);
    expect(grid.gap.b).toBeGreaterThan(grid.gap.a);
    expect(grid.mirrorRun.len).toBeGreaterThanOrEqual(3);
    // preloaded board: colored cells tagged with their bead id, list seeded
    const mid = Math.floor((grid.run.x0 + grid.run.x1) / 2);
    const el = doc.querySelector(`.cv-cell[data-cx="${mid}"][data-cy="${grid.run.y}"]`)!;
    expect(el.classList.contains('colored')).toBe(true);
    expect(el.getAttribute('data-bead')).toBeTruthy();
    expect(fillOf(doc, mid, grid.run.y)).not.toBe(WHITE);
    expect(listText(doc)).toContain(`${cells.length} of ${cells.length} beads painted`);
    expect(doc.querySelector('[data-cv-tool="brush"]')!.classList.contains('active')).toBe(true);

    // every-5 coordinate labels along the top and left edges
    const labels = [...doc.querySelectorAll('[data-bead-canvas] .cv-label')].map((t) =>
      t.textContent?.trim(),
    );
    expect(labels).toContain('5');
    expect(labels).toContain(String(Math.floor(grid.cols / 5) * 5));
    expect(labels).toContain(String(Math.floor(grid.rows / 5) * 5));
  });

  it('a floating badge reads out the cell under the pointer while hovering', () => {
    const svg = stubBoard(ctx.document, ctx.grid);
    const { x, y } = { x: Math.floor((ctx.grid.run.x0 + ctx.grid.run.x1) / 2), y: ctx.grid.run.y };
    // hover (no button down) → 1-based coordinates, visible
    firePointer(ctx.window, svg, 'pointermove', px(ctx.grid, x, y).cx, px(ctx.grid, x, y).cy);
    const badge = ctx.document.querySelector('[data-bead-paint] .cv-cursor')!;
    expect(badge.classList.contains('on')).toBe(true);
    expect(badge.textContent).toBe(`${x + 1}, ${y + 1}`);

    // dragging keeps it live: cross into the next cell band
    firePointer(ctx.window, svg, 'pointerdown', px(ctx.grid, x, y).cx, px(ctx.grid, x, y).cy);
    firePointer(ctx.window, svg, 'pointermove', px(ctx.grid, x + 5, y).cx, px(ctx.grid, x + 5, y).cy);
    expect(badge.textContent).toBe(`${x + 6}, ${y + 1}`);

    // off the grid entirely → hidden
    const off = (GUTTER + ctx.grid.cols * 10 + 5) * PPU(ctx.grid);
    firePointer(ctx.window, svg, 'pointermove', off, off);
    expect(badge.classList.contains('on')).toBe(false);
  });

  it('tap paints one bead with the selected color', () => {
    const svg = stubBoard(ctx.document, ctx.grid);
    fireClick(ctx.document.querySelector('[data-cv-clear]')!); // empty the preloaded board first
    // first swatch chip carries its hex inline — use whatever the page ships
    const chip = ctx.document.querySelector('[data-cv-color]') as HTMLElement;
    const hex = chip.getAttribute('style')!.match(/#([0-9a-f]{6})/i)![0];
    const name = chip
      .getAttribute('data-cv-color')!
      .split('-')
      .map((w) => w[0]!.toUpperCase() + w.slice(1))
      .join(' ');
    fireClick(chip);
    const x = Math.floor((ctx.grid.run.x0 + ctx.grid.run.x1) / 2);
    const { cx, cy } = px(ctx.grid, x, ctx.grid.run.y);
    firePointer(ctx.window, svg, 'pointerdown', cx, cy);
    firePointer(ctx.window, svg, 'pointerup', cx, cy);
    expect(fillOf(ctx.document, x, ctx.grid.run.y)).toBe(hex);
    expect(listText(ctx.document)).toContain(`${name} ×1`);
    expect(listText(ctx.document)).toContain('1 of');
  });

  it('drag carries the color along the stroke and skips peg holes', () => {
    const svg = stubBoard(ctx.document, ctx.grid);
    fireClick(ctx.document.querySelector('[data-cv-clear]')!); // empty the preloaded board first
    const mid = Math.floor((ctx.grid.run.x0 + ctx.grid.run.x1) / 2);
    firePointer(ctx.window, svg, 'pointerdown', px(ctx.grid, mid, ctx.grid.run.y).cx, px(ctx.grid, mid, ctx.grid.run.y).cy);
    firePointer(ctx.window, svg, 'pointermove', px(ctx.grid, mid + 4, ctx.grid.run.y).cx, px(ctx.grid, mid + 4, ctx.grid.run.y).cy);
    firePointer(ctx.window, svg, 'pointerup', px(ctx.grid, mid + 4, ctx.grid.run.y).cx, px(ctx.grid, mid + 4, ctx.grid.run.y).cy);
    // solid run: every crossed cell painted with the default black
    for (let c = mid; c <= mid + 4; c++) {
      expect(fillOf(ctx.document, c, ctx.grid.run.y)).toBe(BLACK);
    }
    expect(listText(ctx.document)).toContain('Black ×5');

    // a stroke across a peg hole paints both sides, the hole stays a hole
    const { y, a, b } = ctx.grid.gap;
    firePointer(ctx.window, svg, 'pointerdown', px(ctx.grid, a, y).cx, px(ctx.grid, a, y).cy);
    firePointer(ctx.window, svg, 'pointermove', px(ctx.grid, b, y).cx, px(ctx.grid, b, y).cy);
    let holes = 0;
    for (let x = a + 1; x < b; x++) {
      if (!ctx.grid.has(x, y)) {
        holes++;
        expect(ctx.document.querySelector(`.cv-cell[data-cx="${x}"][data-cy="${y}"]`)).toBeNull();
      }
    }
    expect(holes).toBeGreaterThan(0);
    expect(fillOf(ctx.document, a, y)).toBe(BLACK);
    expect(fillOf(ctx.document, b, y)).toBe(BLACK);
    // 5 from the run + the newly crossed cells on the gap row
    const crossed = b - a + 1 - holes;
    expect(listText(ctx.document)).toContain(`Black ×${5 + crossed}`);
  });

  it('diagonal drag paints an 8-connected stroke with no gaps', () => {
    const svg = stubBoard(ctx.document, ctx.grid);
    fireClick(ctx.document.querySelector('[data-cv-clear]')!); // empty the preloaded board first
    const { x0, y0, len } = ctx.grid.diag;
    const x1 = x0 + len - 1;
    const y1 = y0 + len - 1;
    firePointer(ctx.window, svg, 'pointerdown', px(ctx.grid, x0, y0).cx, px(ctx.grid, x0, y0).cy);
    firePointer(ctx.window, svg, 'pointermove', px(ctx.grid, x1, y1).cx, px(ctx.grid, x1, y1).cy);
    firePointer(ctx.window, svg, 'pointerup', px(ctx.grid, x1, y1).cx, px(ctx.grid, x1, y1).cy);
    // every step of the staircase is painted
    for (let i = 0; i < len; i++) {
      expect(fillOf(ctx.document, x0 + i, y0 + i)).toBe(BLACK);
    }
    expect(listText(ctx.document)).toContain(`Black ×${len}`);
  });

  it('eraser drags beads back to white and clear-all resets the board', () => {
    const svg = stubBoard(ctx.document, ctx.grid);
    fireClick(ctx.document.querySelector('[data-cv-clear]')!); // empty the preloaded board first
    const mid = Math.floor((ctx.grid.run.x0 + ctx.grid.run.x1) / 2);
    firePointer(ctx.window, svg, 'pointerdown', px(ctx.grid, mid, ctx.grid.run.y).cx, px(ctx.grid, mid, ctx.grid.run.y).cy);
    firePointer(ctx.window, svg, 'pointermove', px(ctx.grid, mid + 4, ctx.grid.run.y).cx, px(ctx.grid, mid + 4, ctx.grid.run.y).cy);
    firePointer(ctx.window, svg, 'pointerup', px(ctx.grid, mid + 4, ctx.grid.run.y).cx, px(ctx.grid, mid + 4, ctx.grid.run.y).cy);
    expect(fillOf(ctx.document, mid + 2, ctx.grid.run.y)).toBe(BLACK);

    fireClick(ctx.document.querySelector('[data-cv-tool="eraser"]')!);
    expect(ctx.document.querySelector('[data-cv-tool="eraser"]')!.classList.contains('active')).toBe(true);
    firePointer(ctx.window, svg, 'pointerdown', px(ctx.grid, mid + 2, ctx.grid.run.y).cx, px(ctx.grid, mid + 2, ctx.grid.run.y).cy);
    firePointer(ctx.window, svg, 'pointerup', px(ctx.grid, mid + 2, ctx.grid.run.y).cx, px(ctx.grid, mid + 2, ctx.grid.run.y).cy);
    expect(fillOf(ctx.document, mid + 2, ctx.grid.run.y)).toBe(WHITE);
    expect(listText(ctx.document)).toContain('Black ×4');

    fireClick(ctx.document.querySelector('[data-cv-clear]')!);
    expect(fillOf(ctx.document, mid, ctx.grid.run.y)).toBe(WHITE);
    expect(listText(ctx.document)).toContain('0 of');
    expect(listText(ctx.document)).toContain('Nothing painted yet');
  });

  it('mirror mode paints the mirrored cell on every stroke and eraser pass', () => {
    const svg = stubBoard(ctx.document, ctx.grid);
    fireClick(ctx.document.querySelector('[data-cv-clear]')!); // empty the preloaded board first
    const { cols } = ctx.grid;
    const btn = ctx.document.querySelector('[data-cv-mirror]')!;

    fireClick(btn);
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    expect(btn.classList.contains('active')).toBe(true);

    // one tap lands on both halves (mirrorRun guarantees both sides are cells)
    const { y, x } = ctx.grid.mirrorRun;
    firePointer(ctx.window, svg, 'pointerdown', px(ctx.grid, x, y).cx, px(ctx.grid, x, y).cy);
    firePointer(ctx.window, svg, 'pointerup', px(ctx.grid, x, y).cx, px(ctx.grid, x, y).cy);
    expect(fillOf(ctx.document, x, y)).toBe(BLACK);
    expect(fillOf(ctx.document, cols - 1 - x, y)).toBe(BLACK);
    expect(listText(ctx.document)).toContain('Black ×2');

    // a drag mirrors cell by cell
    const dragLen = Math.min(3, ctx.grid.mirrorRun.len);
    firePointer(ctx.window, svg, 'pointerdown', px(ctx.grid, x, y).cx, px(ctx.grid, x, y).cy);
    firePointer(ctx.window, svg, 'pointermove', px(ctx.grid, x + dragLen - 1, y).cx, px(ctx.grid, x + dragLen - 1, y).cy);
    firePointer(ctx.window, svg, 'pointerup', px(ctx.grid, x + dragLen - 1, y).cx, px(ctx.grid, x + dragLen - 1, y).cy);
    for (let i = 0; i < dragLen; i++) {
      expect(fillOf(ctx.document, x + i, y)).toBe(BLACK);
      expect(fillOf(ctx.document, cols - 1 - (x + i), y)).toBe(BLACK);
    }
    expect(listText(ctx.document)).toContain(`Black ×${2 * dragLen}`);

    // toggle off — strokes go back to one half only (solo = a fresh pair on
    // another row, untouched by the mirrored drag above)
    fireClick(btn);
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    const solo = ctx.grid.mirrorSolo;
    firePointer(ctx.window, svg, 'pointerdown', px(ctx.grid, solo.x, solo.y).cx, px(ctx.grid, solo.x, solo.y).cy);
    firePointer(ctx.window, svg, 'pointerup', px(ctx.grid, solo.x, solo.y).cx, px(ctx.grid, solo.x, solo.y).cy);
    expect(fillOf(ctx.document, solo.x, solo.y)).toBe(BLACK);
    expect(fillOf(ctx.document, cols - 1 - solo.x, solo.y)).toBe(WHITE);
    expect(listText(ctx.document)).toContain(`Black ×${2 * dragLen + 1}`);

    // mirror + eraser wipes both halves in one pass
    fireClick(btn);
    fireClick(ctx.document.querySelector('[data-cv-tool="eraser"]')!);
    firePointer(ctx.window, svg, 'pointerdown', px(ctx.grid, solo.x, solo.y).cx, px(ctx.grid, solo.x, solo.y).cy);
    firePointer(ctx.window, svg, 'pointerup', px(ctx.grid, solo.x, solo.y).cx, px(ctx.grid, solo.x, solo.y).cy);
    expect(fillOf(ctx.document, solo.x, solo.y)).toBe(WHITE);
    expect(fillOf(ctx.document, cols - 1 - solo.x, solo.y)).toBe(WHITE);
    // the solo tap painted one cell (mirror was off) — the mirrored erase
    // wipes it and would have wiped its unpainted twin, so the count lands
    // back on the mirrored drag's total
    expect(listText(ctx.document)).toContain(`Black ×${2 * dragLen}`);
  });

  it('picking a color switches the tool back to brush', () => {
    fireClick(ctx.document.querySelector('[data-cv-tool="eraser"]')!);
    const chip = ctx.document.querySelectorAll('[data-cv-color]')[1] as HTMLElement;
    fireClick(chip);
    expect(ctx.document.querySelector('[data-cv-tool="brush"]')!.classList.contains('active')).toBe(true);
    expect(chip.classList.contains('active')).toBe(true);
  });
});
