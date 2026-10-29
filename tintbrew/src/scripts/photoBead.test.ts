/**
 * Photo→pattern island tests against the real SSR markup from `astro build`
 * (the converter page). Runs the compiled island in happy-dom with synthetic
 * pixels fed straight through convertSample — no canvas decode needed:
 * the board renders pre-filled, the materials list starts counted, the
 * eraser edits the converted pattern, and option changes re-convert.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';

const htmlPath = resolve(
  fileURLToPath(import.meta.url),
  '../../../dist/photo-to-perler-bead-pattern/index.html',
);

const CELL_PX = 20;
const GUTTER = 16;

async function loadPage() {
  const html = readFileSync(htmlPath, 'utf8');
  const window = new Window({ url: 'https://tintbrew.com/photo-to-perler-bead-pattern/' });
  const { document } = window;
  document.write(html);
  (globalThis as Record<string, unknown>).document = document;
  (globalThis as Record<string, unknown>).window = window;
  (globalThis as Record<string, unknown>).requestAnimationFrame = (cb: FrameRequestCallback) => {
    cb(0);
    return 0;
  };
  vi.resetModules();
  const { PhotoStudio } = await import('./photoBead');

  // fresh clone of the SSR tool shell — the module-level scan already bound
  // one instance; this one belongs to the test alone
  const src = document.querySelector('[data-photo-bead]')!;
  const host = document.createElement('div');
  host.innerHTML = src.innerHTML;
  document.body.appendChild(host);
  const studio = new PhotoStudio(host);
  return { window, document: document as unknown as Document, host, studio, PhotoStudio };
}

/** Solid-color RGBA pixels, ImageData shaped. */
function solid(w: number, h: number, r: number, g: number, b: number) {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    data[i * 4] = r;
    data[i * 4 + 1] = g;
    data[i * 4 + 2] = b;
    data[i * 4 + 3] = 255;
  }
  return { data, width: w, height: h };
}

function stubBoard(doc: Document, cols: number, rows: number) {
  const svg = doc.querySelector('[data-bead-canvas]') as unknown as SVGSVGElement & {
    getBoundingClientRect: () => DOMRect;
  };
  svg.getBoundingClientRect = () =>
    ({
      left: 0,
      top: 0,
      right: cols * CELL_PX,
      bottom: rows * CELL_PX,
      width: cols * CELL_PX,
      height: rows * CELL_PX,
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

const px = (col: number, row: number) => ({
  cx: ((GUTTER + col * 10 + 5) * (29 * CELL_PX)) / (29 * 10 + GUTTER),
  cy: ((GUTTER + row * 10 + 5) * (29 * CELL_PX)) / (29 * 10 + GUTTER),
});

const listText = (doc: Document) =>
  [...doc.querySelectorAll('[data-cv-list] li')].map((li) => li.textContent).join(' | ');

const RED = '#fd5918'; // nearestBead('#ff0000') → Tangerine (lib guards pin this)

describe('photo bead island (real SSR markup)', () => {
  let ctx: Awaited<ReturnType<typeof loadPage>>;

  beforeEach(async () => {
    ctx = await loadPage();
  });

  it('the SSR shell ships the controls, the empty stage and the how-to content', () => {
    // the page is complete without JS: controls, status line, placeholder
    expect(ctx.host.querySelector('[data-photo-drop]')).toBeTruthy();
    expect(ctx.host.querySelector('[data-photo-file]')).toBeTruthy();
    expect(ctx.host.querySelector('[data-photo-stage] .stage-empty')).toBeTruthy();
    expect(ctx.document.querySelector('h1')?.textContent).toContain('Photo to Perler Bead Pattern');
  });

  it('convertSample renders a full pre-filled board with counts from tick one', () => {
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    const svg = ctx.host.querySelector('[data-bead-canvas]');
    expect(svg?.getAttribute('data-cols')).toBe('29');
    expect(svg?.getAttribute('data-rows')).toBe('29');
    const cells = ctx.host.querySelectorAll('.cv-cell');
    expect(cells.length).toBe(29 * 29);
    for (const c of cells) expect(c.getAttribute('fill')).toBe(RED);
    // pre-filled board → list already counted by PaintCanvas's seed pass
    expect(listText(ctx.document)).toContain('Tangerine ×841');
    expect(listText(ctx.document)).toContain('841 of 841 beads painted');
    // status line reports the board
    expect(ctx.host.querySelector('[data-photo-status]')?.textContent).toContain('29 × 29');
  });

  it('a wide photo maps onto fewer rows (aspect follows the picture)', () => {
    ctx.studio.convertSample(solid(40, 20, 255, 0, 0)); // 2:1 wide
    const svg = ctx.host.querySelector('[data-bead-canvas]');
    expect(svg?.getAttribute('data-cols')).toBe('29');
    expect(svg?.getAttribute('data-rows')).toBe('15'); // round(20/40 × 29)
    expect(ctx.host.querySelectorAll('.cv-cell').length).toBe(29 * 15);
  });

  it('the converted pattern is editable: eraser rewrites cells and the list', () => {
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    const svg = stubBoard(ctx.document, 29, 29);
    (ctx.host.querySelector('[data-cv-tool="eraser"]') as HTMLElement).dispatchEvent(
      new (ctx.window as unknown as { MouseEvent: typeof MouseEvent }).MouseEvent('click', {
        bubbles: true,
      }),
    );
    firePointer(ctx.window, svg, 'pointerdown', px(10, 10).cx, px(10, 10).cy);
    firePointer(ctx.window, svg, 'pointerup', px(10, 10).cx, px(10, 10).cy);
    // erased cells go transparent on this page so the region underlay shows
    expect(
      ctx.host.querySelector('.cv-cell[data-cx="10"][data-cy="10"]')?.getAttribute('fill'),
    ).toBe('transparent');
    expect(listText(ctx.document)).toContain('Tangerine ×840');
    expect(listText(ctx.document)).toContain('840 of 841 beads painted');
  });

  it('clear all empties the board but the region underlay stays', () => {
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    // one low-opacity ghost rect per cell under the painted board
    expect(ctx.host.querySelectorAll('.cv-ghost').length).toBe(29 * 29);
    expect(ctx.host.querySelector('.cv-ghost')?.getAttribute('fill')).toBe(RED);
    (ctx.host.querySelector('[data-cv-clear]') as HTMLElement).dispatchEvent(
      new (ctx.window as unknown as { MouseEvent: typeof MouseEvent }).MouseEvent('click', {
        bubbles: true,
      }),
    );
    // every cell turned transparent → the region tint shows through, so an
    // emptied board still reads as a fill-it-yourself template
    for (const c of ctx.host.querySelectorAll('.cv-cell')) {
      expect(c.getAttribute('fill')).toBe('transparent');
    }
    expect(listText(ctx.document)).not.toContain('Tangerine');
  });

  it('changing the board size re-converts without a second upload', () => {
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    const size = ctx.host.querySelector('[data-photo-size]') as unknown as HTMLSelectElement;
    size.value = '58';
    size.dispatchEvent(
      new (ctx.window as unknown as { Event: typeof Event }).Event('change', { bubbles: true }),
    );
    const svg = ctx.host.querySelector('[data-bead-canvas]');
    expect(svg?.getAttribute('data-cols')).toBe('58');
    expect(ctx.host.querySelectorAll('.cv-cell').length).toBe(58 * 58);
  });

  it('the sixteen-pegboard option converts to a 116-wide board', () => {
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    const size = ctx.host.querySelector('[data-photo-size]') as unknown as HTMLSelectElement;
    size.value = '116';
    size.dispatchEvent(
      new (ctx.window as unknown as { Event: typeof Event }).Event('change', { bubbles: true }),
    );
    const svg = ctx.host.querySelector('[data-bead-canvas]');
    expect(svg?.getAttribute('data-cols')).toBe('116'); // engine caps at 120
    expect(ctx.host.querySelectorAll('.cv-cell').length).toBe(116 * 116);
  });

  it('autoCols goes as wide as the photo can carry', () => {
    // ≥2.2 source pixels per cell on the short edge, clamped to [29, 116] —
    // structure resolution first: bigger boards measured CLEANER per cell
    // than small ones, so only genuinely tiny pictures land below the cap
    expect(ctx.PhotoStudio.autoCols(1600, 1200)).toBe(116); // any real photo caps out
    expect(ctx.PhotoStudio.autoCols(1200, 1600)).toBe(116); // portrait too
    expect(ctx.PhotoStudio.autoCols(387, 254)).toBe(115); // the busy web scene → near cap
    expect(ctx.PhotoStudio.autoCols(320, 240)).toBe(109); // small web image, no ladder snap
    expect(ctx.PhotoStudio.autoCols(300, 200)).toBe(91); // sticker-sized scales down
    expect(ctx.PhotoStudio.autoCols(60, 40)).toBe(29); // never below one pegboard
  });

  it('Auto (the shipped default) converts to the exact-fit board for the photo', () => {
    const size = ctx.host.querySelector('[data-photo-size]') as unknown as HTMLSelectElement;
    expect(size.value).toBe('auto'); // the SSR default — no photo, no stale size
    ctx.studio.convertSample(solid(200, 200, 255, 0, 0));
    const svg = ctx.host.querySelector('[data-bead-canvas]');
    expect(svg?.getAttribute('data-cols')).toBe('91'); // 200 ÷ 2.2 — no ladder snapping
    expect(ctx.host.querySelectorAll('.cv-cell').length).toBe(91 * 91);
    // hand-picking past the photo's detail still gets the heads-up
    size.value = '116';
    size.dispatchEvent(
      new (ctx.window as unknown as { Event: typeof Event }).Event('change', { bubbles: true }),
    );
    expect(ctx.host.querySelector('[data-photo-status]')?.textContent).toContain(
      'only carries about 91 beads of detail — Auto (91 wide)',
    );
  });

  it('the touch-up row carries a Print pattern button that opens the print dialog', () => {
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    const btn = ctx.host.querySelector('[data-photo-print]') as HTMLElement;
    expect(btn).toBeTruthy();
    expect(btn.textContent).toContain('Print');
    const printSpy = vi.fn();
    (ctx.window as unknown as { print: () => void }).print = printSpy;
    btn.dispatchEvent(
      new (ctx.window as unknown as { MouseEvent: typeof MouseEvent }).MouseEvent('click', {
        bubbles: true,
      }),
    );
    expect(printSpy).toHaveBeenCalledOnce();
  });
});
