/**
 * Paint-canvas island tests against the real SSR markup from `astro build`
 * (the cat page — a full-size 56-wide grid). Runs the compiled island in
 * happy-dom: tap paints one bead, a drag paints the whole 8-connected
 * stroke and skips empty peg holes, eraser wipes back to white, clear-all
 * resets, and the live list counts exactly what was placed.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';

const htmlPath = resolve(fileURLToPath(import.meta.url), '../../../dist/perler-bead-animals/cat/index.html');

const COLS = 56; // cat grid width (v5 showpiece scale)
const ROWS = 40; // cat grid height
const CELL_PX = 20; // stubbed layout: 56 cols × 20px = 1120px wide board
const GUTTER = 16; // coordinate gutter in viewBox units (BeadCanvas.astro)
// viewBox is gutter + grid, so one cell spans (10 × PPU) stubbed pixels
const PPU = (COLS * CELL_PX) / (COLS * 10 + GUTTER);

async function loadPage() {
  const html = readFileSync(htmlPath, 'utf8');
  const window = new Window({ url: 'https://tintbrew.com/perler-bead-animals/cat/' });
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
  return { window, document: document as unknown as Document };
}

function stubBoard(doc: Document) {
  const svg = doc.querySelector('[data-bead-canvas]') as unknown as SVGSVGElement & {
    getBoundingClientRect: () => DOMRect;
  };
  svg.getBoundingClientRect = () =>
    ({ left: 0, top: 0, right: COLS * CELL_PX, bottom: ROWS * CELL_PX, width: COLS * CELL_PX, height: ROWS * CELL_PX, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;
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
const px = (col: number, row: number) => ({
  cx: (GUTTER + col * 10 + 5) * PPU,
  cy: (GUTTER + row * 10 + 5) * PPU,
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

  it('every pattern bead ships as a white paintable cell with peg holes around it', () => {
    const cells = ctx.document.querySelectorAll('.cv-cell');
    const pegs = ctx.document.querySelectorAll('.cv-peg');
    expect(cells.length).toBeGreaterThan(100);
    // cat is 56×40 = 2240 board positions
    expect(cells.length + pegs.length).toBe(COLS * ROWS);
    expect(fillOf(ctx.document, 12, 12)).toBe('#f5f4ef'); // row 12 outline bead starts white
    expect(ctx.document.querySelector('[data-cv-tool="brush"]')!.classList.contains('active')).toBe(true);

    // every-5 coordinate labels along the top and left edges
    const labels = [...ctx.document.querySelectorAll('[data-bead-canvas] .cv-label')].map(
      (t) => t.textContent?.trim(),
    );
    expect(labels).toContain('5');
    expect(labels).toContain('55'); // last top tick on the 56-wide cat
    expect(labels).toContain('40'); // last left tick on the 40-row cat
  });

  it('a floating badge reads out the cell under the pointer while hovering', () => {
    const svg = stubBoard(ctx.document);
    // hover (no button down) over cell (20, 12) → 1-based "21, 13", visible
    firePointer(ctx.window, svg, 'pointermove', px(20, 12).cx, px(20, 12).cy);
    const badge = ctx.document.querySelector('[data-bead-paint] .cv-cursor')!;
    expect(badge.classList.contains('on')).toBe(true);
    expect(badge.textContent).toBe('21, 13');

    // dragging keeps it live: cross into the next cell band
    firePointer(ctx.window, svg, 'pointerdown', px(20, 12).cx, px(20, 12).cy);
    firePointer(ctx.window, svg, 'pointermove', px(30, 12).cx, px(30, 12).cy);
    expect(badge.textContent).toBe('31, 13');

    // off the grid entirely → hidden
    const off = (GUTTER + COLS * 10 + 5) * PPU;
    firePointer(ctx.window, svg, 'pointermove', off, off);
    expect(badge.classList.contains('on')).toBe(false);
  });

  it('tap paints one bead with the selected color', () => {
    const svg = stubBoard(ctx.document);
    fireClick(ctx.document.querySelector('[data-cv-color="cherry"]')!);
    const { cx, cy } = px(20, 12); // cat row 12: solid fur band — (20,12) is a fur bead
    firePointer(ctx.window, svg, 'pointerdown', cx, cy);
    firePointer(ctx.window, svg, 'pointerup', cx, cy);
    expect(fillOf(ctx.document, 20, 12)).toBe('#d5322f');
    expect(listText(ctx.document)).toContain('Cherry ×1');
    expect(listText(ctx.document)).toContain('1 of');
  });

  it('drag carries the color along the stroke and skips peg holes', () => {
    const svg = stubBoard(ctx.document);
    firePointer(ctx.window, svg, 'pointerdown', px(20, 12).cx, px(20, 12).cy);
    firePointer(ctx.window, svg, 'pointermove', px(24, 12).cx, px(24, 12).cy);
    firePointer(ctx.window, svg, 'pointerup', px(24, 12).cx, px(24, 12).cy);
    // row 12 is a solid fur band: cols 20-24 all painted
    for (const c of [20, 21, 22, 23, 24]) {
      expect(fillOf(ctx.document, c, 12)).toBe('#232326'); // default brush = black
    }
    expect(listText(ctx.document)).toContain('Black ×5');

    // a stroke across the ear gap paints both ear sides, holes stay holes
    // row 6: '........KOOIIIIOOK.....KKKKKKKKKK.....KOOIIIIOOK........'
    firePointer(ctx.window, svg, 'pointerdown', px(15, 6).cx, px(15, 6).cy);
    firePointer(ctx.window, svg, 'pointermove', px(25, 6).cx, px(25, 6).cy);
    expect(fillOf(ctx.document, 17, 6)).toBe('#232326');
    expect(fillOf(ctx.document, 23, 6)).toBe('#232326');
    expect(ctx.document.querySelector('.cv-cell[data-cx="19"][data-cy="6"]')).toBeNull();
    expect(listText(ctx.document)).toContain('Black ×11'); // 5 fur + 3+3 across the gap
  });

  it('diagonal drag paints an 8-connected stroke with no gaps', () => {
    const svg = stubBoard(ctx.document);
    // rows 16-22 are full-width fur — drag down-right through the cheek
    firePointer(ctx.window, svg, 'pointerdown', px(20, 16).cx, px(20, 16).cy);
    firePointer(ctx.window, svg, 'pointermove', px(26, 22).cx, px(26, 22).cy);
    firePointer(ctx.window, svg, 'pointerup', px(26, 22).cx, px(26, 22).cy);
    // Bresenham on the perfect diagonal (20,16)→(26,22): every step moves +1,+1
    for (const [c, r] of [[21, 17], [22, 18], [23, 19], [24, 20], [25, 21], [26, 22]] as const) {
      expect(fillOf(ctx.document, c, r)).toBe('#232326');
    }
    expect(listText(ctx.document)).toContain('Black ×7');
  });

  it('eraser drags beads back to white and clear-all resets the board', () => {
    const svg = stubBoard(ctx.document);
    firePointer(ctx.window, svg, 'pointerdown', px(20, 12).cx, px(20, 12).cy);
    firePointer(ctx.window, svg, 'pointermove', px(24, 12).cx, px(24, 12).cy);
    firePointer(ctx.window, svg, 'pointerup', px(24, 12).cx, px(24, 12).cy);
    expect(fillOf(ctx.document, 22, 12)).toBe('#232326');

    fireClick(ctx.document.querySelector('[data-cv-tool="eraser"]')!);
    expect(ctx.document.querySelector('[data-cv-tool="eraser"]')!.classList.contains('active')).toBe(true);
    firePointer(ctx.window, svg, 'pointerdown', px(22, 12).cx, px(22, 12).cy);
    firePointer(ctx.window, svg, 'pointerup', px(22, 12).cx, px(22, 12).cy);
    expect(fillOf(ctx.document, 22, 12)).toBe('#f5f4ef');
    expect(listText(ctx.document)).toContain('Black ×4');

    fireClick(ctx.document.querySelector('[data-cv-clear]')!);
    expect(fillOf(ctx.document, 20, 12)).toBe('#f5f4ef');
    expect(listText(ctx.document)).toContain('0 of');
    expect(listText(ctx.document)).toContain('Nothing painted yet');
  });

  it('picking a color switches the tool back to brush', () => {
    fireClick(ctx.document.querySelector('[data-cv-tool="eraser"]')!);
    fireClick(ctx.document.querySelector('[data-cv-color="pink"]')!);
    expect(ctx.document.querySelector('[data-cv-tool="brush"]')!.classList.contains('active')).toBe(true);
    expect(
      ctx.document.querySelector('[data-cv-color="pink"]')!.classList.contains('active'),
    ).toBe(true);
  });
});
