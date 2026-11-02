/**
 * Bead-editor island tests against the real SSR markup from `astro build`
 * (the editor page). Runs the compiled island in happy-dom: the blank board
 * builds at the chosen pegboard size, the brush paints and the eraser
 * empties (cell ↔ peg swap), mirror doubles strokes, pick color lifts a
 * shade off the board, undo/reset walk changes back, the color library
 * searches by Mardiy code or hex, Simplify colors merges the closest shade
 * pair into the lighter bead, the size locks while beads are on the board,
 * and the converter's sessionStorage handoff restores a board.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';
import { MARD_COLORS, mardById } from '../lib/mardPalette';
import { rgbToOklab, hexToRgb } from '../lib/color';

const htmlPath = resolve(
  fileURLToPath(import.meta.url),
  '../../../dist/bead-editor/index.html',
);

const BLACK_HEX = mardById('mard-h7')!.hex; // H7 — the line's exact #000000

async function loadPage(url = 'https://tintbrew.com/bead-editor/') {
  const html = readFileSync(htmlPath, 'utf8');
  const window = new Window({ url });
  const { document } = window;
  document.write(html);
  (globalThis as Record<string, unknown>).document = document;
  (globalThis as Record<string, unknown>).window = window;
  // flush autosave synchronously — the draft lands in localStorage at once
  (window as unknown as { setTimeout: typeof setTimeout }).setTimeout = ((
    cb: TimerHandler,
    _ms?: number,
    ...rest: unknown[]
  ) => {
    (cb as () => void)();
    return 0;
  }) as typeof setTimeout;
  vi.resetModules();
  const { BeadEditor } = await import('./beadEditor');

  const src = document.querySelector('[data-bead-editor]')!;
  const host = document.createElement('div');
  host.innerHTML = src.innerHTML;
  document.body.appendChild(host);
  return { window, document: document as unknown as Document, host, BeadEditor };
}

type Ctx = Awaited<ReturnType<typeof loadPage>>;

function newEditor(ctx: Ctx) {
  const editor = new ctx.BeadEditor(ctx.host);
  return { editor, svg: stubSvg(ctx.host) };
}

/** Point the board's geometry at a deterministic client rect: viewBox
 *  rendered at 2px per unit. Re-run after any board rebuild. */
function stubSvg(host: HTMLElement) {
  const svg = host.querySelector('[data-ed-canvas]') as unknown as SVGSVGElement & {
    getBoundingClientRect: () => DOMRect;
  };
  const vb = (svg.getAttribute('viewBox') ?? '').trim().split(/\s+/).map(Number);
  const w = (vb[2] || 290) * 2;
  svg.getBoundingClientRect = () =>
    ({
      left: 0,
      top: 0,
      right: w,
      bottom: w,
      width: w,
      height: w,
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

function fireClick(window: Window, el: Element) {
  el.dispatchEvent(
    new (window as unknown as { MouseEvent: typeof MouseEvent }).MouseEvent('click', {
      bubbles: true,
    }),
  );
}

function fireChange(window: Window, el: Element) {
  el.dispatchEvent(
    new (window as unknown as { Event: typeof Event }).Event('change', { bubbles: true }),
  );
}

/** client-pixel center of cell (col,row) under the 2px/unit stub */
const px = (col: number, row: number) => ({ cx: (col * 10 + 5) * 2, cy: (row * 10 + 5) * 2 });

const cellAt = (host: HTMLElement, col: number, row: number) =>
  host.querySelector(`.pv-cell[data-ex="${col}"][data-ey="${row}"]`);

const listText = (host: HTMLElement) =>
  [...host.querySelectorAll('[data-ed-list] li')].map((li) => li.textContent).join(' | ');

const statsText = (host: HTMLElement) =>
  host.querySelector('[data-ed-stats]')?.textContent ?? '';

describe('bead editor island (real SSR markup)', () => {
  let ctx: Ctx;

  beforeEach(async () => {
    ctx = await loadPage();
  });

  it('the SSR shell ships the size controls, tools, color search, stats and actions', () => {
    const { host, document: doc } = ctx;
    expect(doc.querySelector('h1')?.textContent).toContain('Design Your Own Perler Bead Patterns');
    const sel = host.querySelector('[data-ed-size]') as HTMLSelectElement;
    expect([...sel.options].map((o) => o.value)).toEqual([
      '29x29', '58x58', '87x58', '58x87', '87x87', '116x116', 'custom',
    ]);
    expect(host.querySelector('[data-ed-custom-row]')?.classList.contains('hidden')).toBe(true);
    for (const tool of ['brush', 'eraser', 'pick']) {
      expect(host.querySelector(`[data-ed-tool="${tool}"]`)).toBeTruthy();
    }
    expect(host.querySelector('[data-ed-undo]')).toBeTruthy();
    expect(host.querySelector('[data-ed-mirror]')).toBeTruthy();
    expect(host.querySelector('[data-ed-reset]')).toBeTruthy();
    expect(host.querySelector('[data-ed-search]')).toBeTruthy();
    expect(host.querySelector('[data-ed-custom]')).toBeTruthy();
    expect(host.querySelector('[data-ed-simplify]')).toBeTruthy();
    expect(host.querySelector('[data-ed-png]')).toBeTruthy();
    expect(host.querySelector('[data-ed-print]')).toBeTruthy();
    expect(host.querySelector('[data-ed-canvas-host]')).toBeTruthy();
  });

  it('boots as a blank 29 × 29 pegboard with zero beads and empty stats', () => {
    const { svg } = newEditor(ctx);
    expect(svg.getAttribute('data-cols')).toBe('29');
    expect(svg.getAttribute('viewBox')).toBe('0 0 290 290');
    expect(ctx.host.querySelectorAll('.pv-peg').length).toBe(29 * 29);
    expect(ctx.host.querySelectorAll('.pv-cell').length).toBe(0);
    expect(statsText(ctx.host)).toBe('1 pegboard (1 × 1) · 0 beads · 0 colors');
    expect(listText(ctx.host)).toContain('Start drawing');
  });

  it('the color library ships all 291 Mardiy beads and filters by code or hex', () => {
    newEditor(ctx);
    expect(ctx.host.querySelectorAll('[data-ed-color]').length).toBe(MARD_COLORS.length);
    const search = ctx.host.querySelector('[data-ed-search]') as HTMLInputElement;
    search.value = 'H7';
    search.dispatchEvent(
      new (ctx.window as unknown as { Event: typeof Event }).Event('input', { bubbles: true }),
    );
    expect(ctx.host.querySelectorAll('[data-ed-color]').length).toBe(1);
    expect(ctx.host.querySelector('[data-ed-color]')?.getAttribute('title')).toContain('H7');
    search.value = '#FAF4C8';
    search.dispatchEvent(
      new (ctx.window as unknown as { Event: typeof Event }).Event('input', { bubbles: true }),
    );
    expect(ctx.host.querySelectorAll('[data-ed-color]').length).toBe(1); // A1
    search.value = 'zzz-no-such-color';
    search.dispatchEvent(
      new (ctx.window as unknown as { Event: typeof Event }).Event('input', { bubbles: true }),
    );
    expect(ctx.host.querySelector('[data-ed-library] .cv-empty')).toBeTruthy();
  });

  it('a brush tap paints one bead, updates stats and list, and autosaves the draft', () => {
    const { svg } = newEditor(ctx);
    firePointer(ctx.window, svg, 'pointerdown', px(5, 5).cx, px(5, 5).cy);
    firePointer(ctx.window, svg, 'pointerup', px(5, 5).cx, px(5, 5).cy);
    const cell = cellAt(ctx.host, 5, 5)!;
    expect(cell.getAttribute('fill')).toBe(BLACK_HEX);
    expect(statsText(ctx.host)).toBe('1 pegboard (1 × 1) · 1 bead · 1 color');
    expect(listText(ctx.host)).toContain('H7 (#000000) ×1');
    const draft = JSON.parse(ctx.window.localStorage.getItem('bead-editor:draft')!) as {
      width: number;
      height: number;
      grid: (string | null)[][];
    };
    expect(draft.width).toBe(29);
    expect(draft.grid[5]![5]).toBe('mard-h7');
  });

  it('a drag paints the whole stroke via 8-connected interpolation', () => {
    const { svg } = newEditor(ctx);
    firePointer(ctx.window, svg, 'pointerdown', px(2, 2).cx, px(2, 2).cy);
    firePointer(ctx.window, svg, 'pointermove', px(6, 2).cx, px(6, 2).cy);
    firePointer(ctx.window, svg, 'pointerup', px(6, 2).cx, px(6, 2).cy);
    for (let c = 2; c <= 6; c++) {
      expect(cellAt(ctx.host, c, 2)?.getAttribute('fill')).toBe(BLACK_HEX);
    }
    expect(listText(ctx.host)).toContain('H7 (#000000) ×5');
  });

  it('the eraser turns a bead back into an empty peg', () => {
    const { svg } = newEditor(ctx);
    firePointer(ctx.window, svg, 'pointerdown', px(4, 4).cx, px(4, 4).cy);
    firePointer(ctx.window, svg, 'pointerup', px(4, 4).cx, px(4, 4).cy);
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-tool="eraser"]')!);
    firePointer(ctx.window, svg, 'pointerdown', px(4, 4).cx, px(4, 4).cy);
    firePointer(ctx.window, svg, 'pointerup', px(4, 4).cx, px(4, 4).cy);
    expect(cellAt(ctx.host, 4, 4)).toBeNull();
    expect(ctx.host.querySelectorAll(`.pv-peg[data-ex="4"][data-ey="4"]`).length).toBe(1);
    expect(listText(ctx.host)).toContain('Start drawing');
  });

  it('mirror mode lands every stroke on both halves', () => {
    const { svg } = newEditor(ctx);
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-mirror]')!);
    firePointer(ctx.window, svg, 'pointerdown', px(2, 3).cx, px(2, 3).cy);
    firePointer(ctx.window, svg, 'pointerup', px(2, 3).cx, px(2, 3).cy);
    expect(cellAt(ctx.host, 2, 3)?.getAttribute('fill')).toBe(BLACK_HEX);
    expect(cellAt(ctx.host, 26, 3)?.getAttribute('fill')).toBe(BLACK_HEX);
    expect(listText(ctx.host)).toContain('H7 (#000000) ×2');
  });

  it('pick color lifts a shade off the board and switches back to brush', () => {
    const { host, window } = ctx;
    const { svg } = newEditor(ctx);
    // paint with F8 (the line's red), then pick it back off the board
    fireClick(window, host.querySelector('[data-ed-color="mard-f8"]')!);
    const redHex = mardById('mard-f8')!.hex;
    firePointer(window, svg, 'pointerdown', px(3, 3).cx, px(3, 3).cy);
    firePointer(window, svg, 'pointerup', px(3, 3).cx, px(3, 3).cy);
    fireClick(window, host.querySelector('[data-ed-tool="pick"]')!);
    firePointer(window, svg, 'pointerdown', px(3, 3).cx, px(3, 3).cy);
    firePointer(window, svg, 'pointerup', px(3, 3).cx, px(3, 3).cy);
    expect(host.querySelector('[data-ed-tool="brush"]')?.getAttribute('aria-pressed')).toBe('true');
    expect((host.querySelector('[data-ed-active]') as HTMLElement).style.background).toBe(redHex);
    // the lifted color is now the brush — the next tap paints red
    firePointer(window, svg, 'pointerdown', px(9, 9).cx, px(9, 9).cy);
    firePointer(window, svg, 'pointerup', px(9, 9).cx, px(9, 9).cy);
    expect(cellAt(host, 9, 9)?.getAttribute('fill')).toBe(redHex);
  });

  it('undo walks a paint back; extra undos on an empty stack are safe', () => {
    const { host, window } = ctx;
    const { svg } = newEditor(ctx);
    firePointer(window, svg, 'pointerdown', px(1, 1).cx, px(1, 1).cy);
    firePointer(window, svg, 'pointerup', px(1, 1).cx, px(1, 1).cy);
    fireClick(window, host.querySelector('[data-ed-undo]')!);
    const rebuilt = stubSvg(host); // undo rebuilds the board
    expect(cellAt(host, 1, 1)).toBeNull();
    expect(listText(host)).toContain('Start drawing');
    fireClick(window, host.querySelector('[data-ed-undo]')!); // empty stack — no throw
    expect(rebuilt).toBeTruthy();
  });

  it('Reset (after confirm) clears the board and unlocks the size', () => {
    const { host, window } = ctx;
    (window as unknown as { confirm: () => boolean }).confirm = () => true;
    const { svg } = newEditor(ctx);
    firePointer(window, svg, 'pointerdown', px(2, 2).cx, px(2, 2).cy);
    firePointer(window, svg, 'pointerup', px(2, 2).cx, px(2, 2).cy);
    expect(host.querySelector('[data-ed-locked]')?.classList.contains('hidden')).toBe(false);
    fireClick(window, host.querySelector('[data-ed-reset]')!);
    stubSvg(host);
    expect(cellAt(host, 2, 2)).toBeNull();
    expect(host.querySelector('[data-ed-locked]')?.classList.contains('hidden')).toBe(true);
    expect(statsText(host)).toBe('1 pegboard (1 × 1) · 0 beads · 0 colors');
  });

  it('board presets and custom sizes rebuild the canvas while it is empty', () => {
    const { host, window } = ctx;
    newEditor(ctx);
    const sel = host.querySelector('[data-ed-size]') as HTMLSelectElement;
    sel.value = '58x58';
    fireChange(window, sel);
    fireClick(window, host.querySelector('[data-ed-apply]')!);
    let svg = stubSvg(host);
    expect(svg.getAttribute('viewBox')).toBe('0 0 580 580');
    expect(host.querySelectorAll('.pv-peg').length).toBe(58 * 58);
    // Custom… reveals the width/height inputs
    sel.value = 'custom';
    fireChange(window, sel);
    expect(host.querySelector('[data-ed-custom-row]')?.classList.contains('hidden')).toBe(false);
    (host.querySelector('[data-ed-w]') as HTMLInputElement).value = '30';
    (host.querySelector('[data-ed-h]') as HTMLInputElement).value = '20';
    fireClick(window, host.querySelector('[data-ed-apply]')!);
    svg = stubSvg(host);
    expect(svg.getAttribute('viewBox')).toBe('0 0 300 200');
    expect(statsText(host)).toContain('2 pegboards (2 × 1)');
    // out-of-range custom size is refused with the note
    (host.querySelector('[data-ed-w]') as HTMLInputElement).value = '5';
    fireClick(window, host.querySelector('[data-ed-apply]')!);
    expect(host.querySelector('[data-ed-note]')?.textContent).toContain('8 to 160');
    expect(svg.getAttribute('viewBox')).toBe('0 0 300 200');
  });

  it('the size locks while beads are on the board', () => {
    const { host, window } = ctx;
    const { svg } = newEditor(ctx);
    firePointer(window, svg, 'pointerdown', px(4, 4).cx, px(4, 4).cy);
    firePointer(window, svg, 'pointerup', px(4, 4).cx, px(4, 4).cy);
    const sel = host.querySelector('[data-ed-size]') as HTMLSelectElement;
    sel.value = '58x58';
    fireChange(window, sel);
    fireClick(window, host.querySelector('[data-ed-apply]')!);
    const after = stubSvg(host);
    expect(after.getAttribute('viewBox')).toBe('0 0 290 290'); // unchanged
    expect(host.querySelector('[data-ed-note]')?.textContent).toContain('locked');
    expect(host.querySelector('[data-ed-locked]')?.classList.contains('hidden')).toBe(false);
  });

  it('Simplify colors merges the closest shade pair into the lighter bead (undoable)', () => {
    // closest pair in the real palette — fuse lines always carry siblings
    // skip the table's duplicate-hex pair (#FFEBFA ×2): a merge of two
    // identical hexes can't show up as two fills after undo
    let a = MARD_COLORS[0]!;
    let b = MARD_COLORS[1]!;
    let minD = Infinity;
    for (let i = 0; i < MARD_COLORS.length; i++) {
      for (let j = i + 1; j < MARD_COLORS.length; j++) {
        if (MARD_COLORS[i]!.hex === MARD_COLORS[j]!.hex) continue;
        const la = rgbToOklab(hexToRgb(MARD_COLORS[i]!.hex));
        const lb = rgbToOklab(hexToRgb(MARD_COLORS[j]!.hex));
        const d = Math.hypot(la.L - lb.L, la.a - lb.a, la.b - lb.b);
        if (d < minD) {
          minD = d;
          a = MARD_COLORS[i]!;
          b = MARD_COLORS[j]!;
        }
      }
    }
    expect(minD).toBeLessThan(0.08); // the merge threshold, or the test is vacuous
    const lighter =
      rgbToOklab(hexToRgb(a.hex)).L >= rgbToOklab(hexToRgb(b.hex)).L ? a : b;

    // hand the editor an 8×8 board carrying both shades
    const grid: (string | null)[][] = Array.from({ length: 8 }, () => Array(8).fill(null));
    for (let i = 0; i < 8; i++) grid[i]![2] = a.id;
    grid[3]![5] = b.id;
    ctx.window.sessionStorage.setItem(
      'bead-editor:handoff',
      JSON.stringify({ width: 8, height: 8, grid }),
    );
    const editor = new ctx.BeadEditor(ctx.host);
    expect(ctx.host.querySelectorAll('.pv-cell').length).toBe(9);
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-simplify]')!);
    expect(ctx.host.querySelectorAll('.pv-cell').length).toBe(9);
    expect(listText(ctx.host)).toContain(`${lighter.code} (${lighter.hex}) ×9`);
    expect(listText(ctx.host).split(' | ').filter((r) => r.includes('×')).length).toBe(1);
    // undo brings both shades back
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-undo]')!);
    const ids = new Set(
      [...ctx.host.querySelectorAll('.pv-cell')].map((c) => c.getAttribute('fill')),
    );
    expect(ids.size).toBe(2);
    expect(editor).toBeTruthy();
  });

  it('the converter handoff restores the board and consumes the key', () => {
    const grid: (string | null)[][] = Array.from({ length: 8 }, () => Array(8).fill(null));
    grid[1]![1] = 'mard-f8';
    ctx.window.sessionStorage.setItem(
      'bead-editor:handoff',
      JSON.stringify({ width: 8, height: 8, grid }),
    );
    newEditor(ctx);
    const svg = ctx.host.querySelector('[data-ed-canvas]')!;
    expect(svg.getAttribute('viewBox')).toBe('0 0 80 80');
    expect(cellAt(ctx.host, 1, 1)?.getAttribute('fill')).toBe(mardById('mard-f8')!.hex);
    expect(statsText(ctx.host)).toContain('1 bead · 1 color');
    // one-way ticket — the key is consumed so a refresh starts clean
    expect(ctx.window.sessionStorage.getItem('bead-editor:handoff')).toBeNull();
    expect(ctx.host.querySelector('[data-ed-note]')?.textContent).toContain('converter');
    expect(ctx.host.querySelector('[data-ed-locked]')?.classList.contains('hidden')).toBe(false);
  });

  it('a saved draft restores on reload with the welcome-back note', () => {
    const grid: (string | null)[][] = Array.from({ length: 10 }, () => Array(10).fill(null));
    grid[7]![7] = 'mard-h7';
    ctx.window.localStorage.setItem(
      'bead-editor:draft',
      JSON.stringify({ width: 10, height: 10, grid }),
    );
    newEditor(ctx);
    expect(ctx.host.querySelector('[data-ed-canvas]')!.getAttribute('viewBox')).toBe('0 0 100 100');
    expect(cellAt(ctx.host, 7, 7)?.getAttribute('fill')).toBe(BLACK_HEX);
    expect(ctx.host.querySelector('[data-ed-note]')?.textContent).toContain('Welcome back');
  });

  it('zoom steps the board and reports the percentage; Fit recenters it', () => {
    newEditor(ctx);
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-zoom-in]')!);
    expect(ctx.host.querySelector('[data-ed-zoom-label]')?.textContent).toBe('125%');
    const svg = ctx.host.querySelector('[data-ed-canvas]') as unknown as SVGElement & { style: CSSStyleDeclaration };
    expect(svg.style.width).toBe('362.5px');
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-fit]')!);
    expect(ctx.host.querySelector('[data-ed-zoom-label]')?.textContent).toBe('100%');
  });

  it('Print pattern opens the print dialog', () => {
    newEditor(ctx);
    const printSpy = vi.fn();
    (ctx.window as unknown as { print: () => void }).print = printSpy;
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-print]')!);
    expect(printSpy).toHaveBeenCalledOnce();
  });

  it('Print boards stays hidden while the board fits one pegboard', () => {
    // blank 29 × 29 boot — a single sheet needs no per-board slicing
    newEditor(ctx);
    expect(ctx.host.querySelector('[data-ed-print-boards]')?.classList.contains('hidden')).toBe(true);
  });

  it('a 58 × 58 handoff offers Print boards; clicking mounts cover + sheets in <main>', () => {
    // every instance binds the host root — one editor per test keeps the
    // click path single-fire (see newEditor)
    const grid = Array.from({ length: 58 }, () => Array<string | null>(58).fill('mard-h7'));
    ctx.window.sessionStorage.setItem(
      'bead-editor:handoff',
      JSON.stringify({ width: 58, height: 58, grid }),
    );
    newEditor(ctx);
    const btn = ctx.host.querySelector('[data-ed-print-boards]') as HTMLElement;
    expect(btn.classList.contains('hidden')).toBe(false);
    // printZone tags <html> with the boards zone for the print CSS and
    // clears it right after the (synchronous) dialog — capture it in-flight
    let zoneDuringPrint: string | undefined;
    const printSpy = vi.fn(() => {
      zoneDuringPrint = (globalThis as unknown as { document: Document }).document.documentElement.dataset.printZone;
    });
    (ctx.window as unknown as { print: () => void }).print = printSpy;
    fireClick(ctx.window, btn);
    expect(printSpy).toHaveBeenCalledOnce();
    expect(zoneDuringPrint).toBe('boards');
    // afterprint cleanup ran — the zone tag never leaks into a later print
    expect((globalThis as unknown as { document: Document }).document.documentElement.dataset.printZone).toBeUndefined();
    const sheets = ctx.document.querySelector('[data-print-boards]')!;
    expect(sheets.parentElement?.tagName.toLowerCase()).toBe('main');
    const pages = sheets.querySelectorAll('.board-page');
    expect(pages.length).toBe(5); // cover + 4 boards
    expect(pages[0]!.querySelector('.bp-cover-title')?.textContent).toContain('4 pegboards');
    expect(pages[1]!.querySelector('.bp-board-head')?.textContent).toContain('Board 1 of 2');
    expect(pages[1]!.getAttribute('data-bp-page')).toBe('1');
    expect(pages[4]!.getAttribute('data-bp-page')).toBe('4');
    expect(pages[4]!.getAttribute('data-bp-total')).toBe('4');
  });
});

describe('publish to community gallery (UGC flow)', () => {
  let ctx: Ctx;

  beforeEach(async () => {
    ctx = await loadPage();
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ id: 'abc123def456' }),
        } as Response),
      ),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  /** paint one bead at (x,y) with the default black brush */
  function paint(x: number, y: number) {
    const { svg } = newEditor(ctx);
    firePointer(ctx.window, svg, 'pointerdown', px(x, y).cx, px(x, y).cy);
    firePointer(ctx.window, svg, 'pointerup', px(x, y).cx, px(x, y).cy);
    return svg;
  }

  it('the Publish button stays hidden on an empty board and reveals once beads land', () => {
    const pub = ctx.host.querySelector('[data-ed-publish]') as HTMLElement;
    expect(pub.classList.contains('hidden')).toBe(true);
    paint(2, 2);
    expect(pub.classList.contains('hidden')).toBe(false);
  });

  it('clicking Publish opens the panel; empty nickname shows the validation note', () => {
    paint(2, 2);
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-publish]') as Element);
    const panel = ctx.host.querySelector('[data-ed-publish-panel]') as HTMLElement;
    expect(panel.classList.contains('hidden')).toBe(false);

    fireClick(ctx.window, panel.querySelector('[data-ed-publish-submit]') as Element);
    const status = ctx.host.querySelector('[data-ed-publish-status]')!.textContent ?? '';
    expect(status).toContain('nickname');
    expect(vi.mocked(globalThis.fetch)).not.toHaveBeenCalled();
  });

  it('a filled form posts grid+name+nick and stores the returned piece id', async () => {
    paint(2, 2);
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-publish]') as Element);
    const panel = ctx.host.querySelector('[data-ed-publish-panel]') as HTMLElement;
    const name = panel.querySelector('[data-ed-publish-name]') as HTMLInputElement;
    const nick = panel.querySelector('[data-ed-publish-nick]') as HTMLInputElement;
    name.value = 'My star';
    nick.value = 'Tester';

    fireClick(ctx.window, panel.querySelector('[data-ed-publish-submit]') as Element);
    await new Promise((r) => setTimeout(r, 0));

    const call = vi.mocked(globalThis.fetch).mock.calls[0]!;
    expect(String(call[0])).toBe('/api/gallery/publish');
    const body = JSON.parse((call[1] as RequestInit).body as string);
    expect(body.name).toBe('My star');
    expect(body.nick).toBe('Tester');
    expect(body.width).toBe(29);
    expect(body.height).toBe(29);
    expect(body.grid).toHaveLength(29);
    expect(body.uuid).toMatch(/^[0-9a-f-]{36}$/);
    expect(ctx.window.localStorage.getItem('tb-gallery:piece-id')).toBe('abc123def456');
    expect(ctx.host.querySelector('[data-ed-publish-status]')!.textContent).toContain('Published!');
    const link = ctx.host.querySelector('[data-ed-publish-status] a') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe('/gallery/');
  });

  it('republishing asks before overwriting, and a declined confirm never posts', async () => {
    ctx.window.localStorage.setItem('tb-gallery:piece-id', 'existing000001');
    (ctx.window as unknown as { confirm: (s?: string) => boolean }).confirm = () => false;
    paint(3, 3);
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-publish]') as Element);
    (ctx.host.querySelector('[data-ed-publish-nick]') as HTMLInputElement).value = 'Tester';
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-publish-submit]') as Element);
    await new Promise((r) => setTimeout(r, 0));
    expect(vi.mocked(globalThis.fetch)).not.toHaveBeenCalled();
  });

  it('a 429 publish shows the rate-limit note; a network error shows the generic one', async () => {
    paint(1, 1);
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-publish]') as Element);
    (ctx.host.querySelector('[data-ed-publish-nick]') as HTMLInputElement).value = 'Tester';
    vi.mocked(globalThis.fetch).mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 429, json: async () => ({ error: 'rate-limited' }) } as Response),
    );
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-publish-submit]') as Element);
    await new Promise((r) => setTimeout(r, 0));
    expect(ctx.host.querySelector('[data-ed-publish-status]')!.textContent).toContain('Too many publishes');

    vi.mocked(globalThis.fetch).mockImplementationOnce(() => Promise.reject(new Error('down')));
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-publish-submit]') as Element);
    await new Promise((r) => setTimeout(r, 0));
    expect(ctx.host.querySelector('[data-ed-publish-status]')!.textContent).toContain('Couldn’t reach');
  });
});

describe('template picker (build-time catalog)', () => {
  let ctx: Ctx;

  const catalog = {
    groups: [
      {
        cat: 'animals',
        items: [
          { slug: 'bear', name: 'Bear', cat: 'animals', w: 16, h: 2, rows: ['aaaa............', '................'], pal: { a: 'mard-h7' } },
        ],
      },
      {
        cat: 'halloween',
        items: [
          { slug: 'ghost', name: 'Ghost', cat: 'halloween', w: 12, h: 2, rows: ['bbbb........', '............'], pal: { b: 'mard-h13' } },
        ],
      },
    ],
  };

  function stubFetch() {
    vi.stubGlobal(
      'fetch',
      vi.fn((input: string | URL | Request) => {
        const url = String(input);
        if (url.includes('editor-templates.json')) {
          return Promise.resolve({ ok: true, status: 200, json: async () => catalog } as Response);
        }
        return Promise.resolve({ ok: true, status: 200, json: async () => ({ id: 'x' }) } as Response);
      }),
    );
  }

  beforeEach(async () => {
    ctx = await loadPage();
    stubFetch();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('the Templates button opens the panel; chips render grouped by category', async () => {
    newEditor(ctx);
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-tpl]') as Element);
    const panel = ctx.host.querySelector('[data-ed-tpl-panel]') as HTMLElement;
    expect(panel.classList.contains('hidden')).toBe(false);
    await new Promise((r) => setTimeout(r, 0));

    const groups = [...panel.querySelectorAll('.ed-tpl-group h4')].map((h) => h.textContent);
    expect(groups.length).toBe(2);
    const chips = [...panel.querySelectorAll('.tpl-chip')];
    expect(chips).toHaveLength(2);
    expect(chips[0]!.getAttribute('data-ed-tpl-slug')).toBe('bear');
    expect(chips[0]!.textContent).toContain('Bear');
    expect(chips[0]!.textContent).toContain('16×2');
  });

  it('clicking a chip loads it onto the empty board without a confirm and notes the size', async () => {
    newEditor(ctx);
    const confirmSpy = vi.fn(() => true);
    (ctx.window as unknown as { confirm: (s?: string) => boolean }).confirm = confirmSpy;
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-tpl]') as Element);
    await new Promise((r) => setTimeout(r, 0));
    const chip = ctx.host.querySelector('[data-ed-tpl-slug="bear"]') as HTMLElement;
    fireClick(ctx.window, chip);
    await new Promise((r) => setTimeout(r, 0));

    // empty board → no confirm gate; the board rebuilds at 16×16 with beads
    expect(confirmSpy).not.toHaveBeenCalled();
    const svg = ctx.host.querySelector('[data-ed-canvas]')!;
    expect(svg.getAttribute('viewBox')).toBe('0 0 160 20');
    expect(ctx.host.querySelectorAll('[data-ed-canvas] [fill="#000000"]').length).toBeGreaterThan(0);
    const note = ctx.host.querySelector('[data-ed-note]')!;
    expect(note.classList.contains('hidden')).toBe(false);
    expect(note.textContent).toContain('Bear');
    expect(note.textContent).toContain('16×2');
    // panel closes after a successful load
    expect((ctx.host.querySelector('[data-ed-tpl-panel]') as HTMLElement).classList.contains('hidden')).toBe(true);
  });

  it('a chip click with beads already on the board asks first; declining keeps the board', async () => {
    const confirmSpy = vi.fn(() => false);
    (ctx.window as unknown as { confirm: (s?: string) => boolean }).confirm = confirmSpy;
    const { svg } = newEditor(ctx);
    firePointer(ctx.window, svg, 'pointerdown', px(5, 5).cx, px(5, 5).cy);
    firePointer(ctx.window, svg, 'pointerup', px(5, 5).cx, px(5, 5).cy);

    fireClick(ctx.window, ctx.host.querySelector('[data-ed-tpl]') as Element);
    await new Promise((r) => setTimeout(r, 0));
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-tpl-slug="bear"]') as Element);
    await new Promise((r) => setTimeout(r, 0));

    expect(confirmSpy).toHaveBeenCalledOnce();
    // still 29×29 — nothing replaced
    expect(ctx.host.querySelector('[data-ed-canvas]')!.getAttribute('viewBox')).toBe('0 0 290 290');
  });

  it('a failed catalog fetch shows the fail note and an empty list', async () => {
    newEditor(ctx);
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('down'))),
    );
    fireClick(ctx.window, ctx.host.querySelector('[data-ed-tpl]') as Element);
    await new Promise((r) => setTimeout(r, 0));
    const status = ctx.host.querySelector('[data-ed-tpl-status]')!;
    expect(status.textContent).toContain('Couldn’t load');
    expect(ctx.host.querySelectorAll('.tpl-chip')).toHaveLength(0);
  });
});

describe('remix entry (?from=<pieceId>)', () => {
  let ctx: Ctx;

  const piece = {
    pieces: [
      {
        id: 'remix000001',
        name: 'Ghost by a friend',
        nick: 'BeadFan42',
        width: 12,
        height: 12,
        cells: Array.from({ length: 144 }, (_, i) => (i % 9 === 0 ? 'mard-h13' : null)),
      },
    ],
  };

  beforeEach(async () => {
    ctx = await loadPage('https://tintbrew.com/bead-editor/?from=remix000001');
    vi.stubGlobal(
      'fetch',
      vi.fn((input: string | URL | Request) =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: async () => (String(input).includes('/api/gallery/list') ? piece : { id: 'x' }),
        } as Response),
      ),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('an empty board loads the linked piece straight away and credits the author', async () => {
    const editor = new ctx.BeadEditor(ctx.host);
    stubSvg(ctx.host);
    await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => setTimeout(r, 0));

    const svg = ctx.host.querySelector('[data-ed-canvas]')!;
    expect(svg.getAttribute('viewBox')).toBe('0 0 120 120');
    expect(ctx.host.querySelectorAll('[data-ed-canvas] [fill]').length).toBeGreaterThan(0);
    const note = ctx.host.querySelector('[data-ed-note]')!;
    expect(note.textContent).toContain('Ghost by a friend');
    expect(note.textContent).toContain('BeadFan42');
    void editor;
  });

  it('a board with beads asks before replacing; declining keeps the draft', async () => {
    const confirmSpy = vi.fn(() => false);
    (ctx.window as unknown as { confirm: (s?: string) => boolean }).confirm = confirmSpy;
    const editor = new ctx.BeadEditor(ctx.host);
    const svg = stubSvg(ctx.host);
    // paint before the async load resolves — the confirm gate must trigger
    firePointer(ctx.window, svg, 'pointerdown', px(5, 5).cx, px(5, 5).cy);
    firePointer(ctx.window, svg, 'pointerup', px(5, 5).cx, px(5, 5).cy);
    await new Promise((r) => setTimeout(r, 0));
    await new Promise((r) => setTimeout(r, 0));

    expect(confirmSpy).toHaveBeenCalledOnce();
    expect(svg.getAttribute('viewBox')).toBe('0 0 290 290');
    void editor;
  });
});
