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
  return { window, document: document as unknown as Document, host, studio };
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
});
