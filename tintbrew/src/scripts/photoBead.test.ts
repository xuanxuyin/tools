/**
 * Photo→pattern island tests against the real SSR markup from `astro build`
 * (the converter page, source-site layout). Runs the compiled island in
 * happy-dom with synthetic pixels fed straight through convertSample — no
 * canvas decode needed: the static preview board renders with pegboard
 * seams, the three panels and the per-color bead list carry the Mardiy codes,
 * pill changes re-convert, and "Edit in editor" hands the board to the
 * editor page through sessionStorage.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Window } from 'happy-dom';
import { MARD_COLORS, type MardColor } from '../lib/mardPalette';
import { hexToRgb, rgbToOklab } from '../lib/color';

const htmlPath = resolve(
  fileURLToPath(import.meta.url),
  '../../../dist/photo-to-perler-bead-pattern/index.html',
);

/** Plain-Oklab nearest Mardiy bead for #ff0000 — the board-fill baseline.
 *  (The engine's matcher adds a chroma guard; for this saturated primary
 *  it lands on the same bead — if this pin ever breaks, read the pick off
 *  the board and re-pin rather than weakening the assertion.) */
function nearestMard(hex: string): MardColor {
  const lab = rgbToOklab(hexToRgb(hex));
  let best = MARD_COLORS[0]!;
  let bestD = Infinity;
  for (const b of MARD_COLORS) {
    const l = rgbToOklab(hexToRgb(b.hex));
    const d = Math.hypot(lab.L - l.L, lab.a - l.a, lab.b - l.b);
    if (d < bestD) {
      bestD = d;
      best = b;
    }
  }
  return best;
}

const RED_BEAD = nearestMard('#ff0000');

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
  // flush the settings debounce synchronously — pill clicks convert at once
  (window as unknown as { setTimeout: typeof setTimeout }).setTimeout = ((
    cb: TimerHandler,
    _ms?: number,
    ...rest: unknown[]
  ) => {
    (cb as () => void)();
    return 0;
  }) as typeof setTimeout;
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

/** The custom-width field re-converts on 'input' (source-site timing). */
function fireInput(window: Window, el: Element) {
  el.dispatchEvent(
    new (window as unknown as { Event: typeof Event }).Event('input', { bubbles: true }),
  );
}

/** The preview board svg — [data-photo-result] .photo-preview. */
const board = (host: HTMLElement) => host.querySelector('.photo-preview');

const rowText = (host: HTMLElement) =>
  [...host.querySelectorAll('[data-photo-color-list] .bead-row')].map((r) => r.textContent).join(' | ');

describe('photo bead island (real SSR markup)', () => {
  let ctx: Awaited<ReturnType<typeof loadPage>>;

  beforeEach(async () => {
    ctx = await loadPage();
  });

  it('the SSR shell ships the two-column layout, the setting groups, the empty stage and the how-to content', () => {
    // the page is complete without JS: upload row, pills, checks, status, placeholder
    expect(ctx.host.querySelector('.pm-grid')).toBeTruthy();
    expect(ctx.host.querySelector('[data-photo-drop]')).toBeTruthy();
    expect(ctx.host.querySelector('[data-photo-file]')).toBeTruthy();
    expect(ctx.host.querySelector('[data-photo-filename]')?.textContent).toContain('No image selected yet.');
    // source-photo slot: between the upload row and the settings, ahead of
    // the auto-apply note and the status line, with a visible placeholder
    // before any upload (user-pinned source-site order, 2026-10-29)
    const slot = ctx.host.querySelector('[data-photo-source]')!;
    expect(slot.querySelector('.source-empty')).toBeTruthy();
    expect(slot.textContent).toContain('preview will appear here');
    expect(slot.previousElementSibling?.matches('input[data-photo-file]')).toBe(true);
    const note = slot.nextElementSibling!;
    expect(note.classList.contains('auto-note')).toBe(true);
    const status = note.nextElementSibling!;
    expect(status.matches('[data-photo-status]')).toBe(true);
    expect(status.nextElementSibling?.classList.contains('settings')).toBe(true);
    expect(ctx.host.querySelector('[data-photo-stage] .stage-empty')).toBeTruthy();
    expect(ctx.host.querySelector('[data-photo-colors] > button.active')?.getAttribute('data-value')).toBe('12');
    // five color-count pills now: 8 / 12 / 16 / 24 / all-291 (user call,
    // 2026-10-29 — the lost 24 and All seats came back, widened to the line)
    expect(ctx.host.querySelectorAll('[data-photo-colors] > button')).toHaveLength(5);
    expect(
      [...ctx.host.querySelectorAll('[data-photo-colors] > button')].some((b) =>
        b.getAttribute('data-value') === 'all'),
    ).toBe(true);
    expect(ctx.host.querySelector('[data-photo-simplify] > button.active')?.getAttribute('data-value')).toBe('balanced');
    expect(ctx.host.querySelector('[data-photo-size] > button.active')?.getAttribute('data-value')).toBe('auto');
    // bead width ships as TWO options: Presets pills (no Custom among them)
    // + a separate Custom entry with its own input (user call, 2026-10-29)
    expect(ctx.host.querySelectorAll('[data-photo-size] > button')).toHaveLength(5);
    expect(
      [...ctx.host.querySelectorAll('[data-photo-size] > button')].some((b) =>
        b.getAttribute('data-value') === 'custom'),
    ).toBe(false);
    expect(ctx.host.querySelector('[data-photo-custom-toggle]')).toBeTruthy();
    const custom = ctx.host.querySelector('[data-photo-custom-width]') as HTMLInputElement;
    expect(custom.min).toBe('10');
    expect(custom.max).toBe('200');
    // both post-passes ship checked, like the source site
    expect((ctx.host.querySelector('[data-photo-bg]') as HTMLInputElement).checked).toBe(true);
    expect((ctx.host.querySelector('[data-photo-outline]') as HTMLInputElement).checked).toBe(true);
    expect(ctx.host.querySelector('[data-photo-custom-row]')?.classList.contains('hidden')).toBe(true);
    expect(ctx.document.querySelector('h1')?.textContent).toContain('Photo to Perler Bead Pattern');
  });

  it('convertSample renders the preview board and all three panels from tick one', () => {
    // background removal is on by default and a solid photo is ALL
    // background — uncheck it so the board itself is the subject
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-bg]')!);
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    const svg = board(ctx.host)!;
    expect(svg.getAttribute('viewBox')).toBe('0 0 290 290');
    const cells = ctx.host.querySelectorAll('.pv-cell');
    expect(cells.length).toBe(29 * 29);
    for (const c of cells) expect(c.getAttribute('fill')).toBe(RED_BEAD.hex);
    expect(ctx.host.querySelectorAll('.pv-peg').length).toBe(0);
    // pattern summary + conversion panels with the source-site copy
    const panels = ctx.host.querySelector('[data-photo-result]')!.textContent!;
    expect(panels).toContain('Pattern summary');
    expect(panels).toContain('29 × 29 beads');
    expect(panels).toContain('1 pegboard — 1 × 1');
    expect(panels).toContain('841 beads');
    expect(panels).toContain('1 color');
    expect(panels).toContain('Conversion');
    expect(panels).toContain('Matched to the real 291-color bead line');
    expect(panels).toContain('Auto: 29 beads');
    // status line reports the board
    expect(ctx.host.querySelector('[data-photo-status]')?.textContent).toContain('29 × 29');
  });

  it('the bead list rows lead with the Mardiy code, hex and count', () => {
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-bg]')!);
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    const rows = ctx.host.querySelectorAll('[data-photo-color-list] .bead-row');
    expect(rows.length).toBe(1);
    const row = rows[0]!;
    expect(row.querySelector('strong')?.textContent).toMatch(/^[A-Z]{1,2}\d+$/);
    expect(row.textContent).toContain(RED_BEAD.code);
    expect(row.textContent).toContain(RED_BEAD.hex);
    expect(row.textContent).toContain('841');
  });

  it('the 24 / All-291 color pills re-convert and take the active seat', () => {
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-bg]')!);
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-colors] > [data-value="24"]')!);
    expect(
      ctx.host.querySelector('[data-photo-colors] > button.active')?.getAttribute('data-value'),
    ).toBe('24');
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-colors] > [data-value="all"]')!);
    expect(
      ctx.host.querySelector('[data-photo-colors] > button.active')?.getAttribute('data-value'),
    ).toBe('all');
    // a solid photo stays its one bead under every cap
    for (const c of ctx.host.querySelectorAll('.pv-cell')) {
      expect(c.getAttribute('fill')).toBe(RED_BEAD.hex);
    }
  });

  it('a wide photo maps onto fewer rows (aspect follows the picture)', () => {
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-bg]')!);
    ctx.studio.convertSample(solid(40, 20, 255, 0, 0)); // 2:1 wide
    expect(board(ctx.host)!.getAttribute('viewBox')).toBe('0 0 290 150');
    expect(ctx.host.querySelectorAll('.pv-cell').length).toBe(29 * 15);
  });

  it('a size pill click re-converts without a second upload', () => {
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-bg]')!);
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-size] > [data-value="58"]')!);
    expect(
      ctx.host.querySelector('[data-photo-size] > button.active')?.getAttribute('data-value'),
    ).toBe('58');
    expect(board(ctx.host)!.getAttribute('viewBox')).toBe('0 0 580 580');
    expect(ctx.host.querySelectorAll('.pv-cell').length).toBe(58 * 58);
    // one seam per direction on a 58-wide board — pegboard edges visible
    expect(ctx.host.querySelectorAll('.pv-seam').length).toBe(2);
  });

  it('custom width: the separate Custom option converts, invalid input holds the last board', () => {
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-bg]')!);
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    // click Custom — its OWN option, outside the Presets box: the input row
    // appears with the SSR default of 58 and converts right away
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-custom-toggle]')!);
    expect(ctx.host.querySelector('[data-photo-custom-row]')?.classList.contains('hidden')).toBe(false);
    expect(board(ctx.host)!.getAttribute('viewBox')).toBe('0 0 580 580');
    // out-of-range width: error shows, previous board stays
    const input = ctx.host.querySelector('[data-photo-custom-width]') as HTMLInputElement;
    input.value = '5';
    fireInput(ctx.window, input);
    expect(ctx.host.querySelector('[data-photo-width-error]')?.classList.contains('hidden')).toBe(false);
    expect(board(ctx.host)!.getAttribute('viewBox')).toBe('0 0 580 580');
    // valid width converts
    input.value = '40';
    fireInput(ctx.window, input);
    expect(ctx.host.querySelector('[data-photo-width-error]')?.classList.contains('hidden')).toBe(true);
    expect(board(ctx.host)!.getAttribute('viewBox')).toBe('0 0 400 400');
    // back to a preset pill: Custom deactivates, its row hides again
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-size] > [data-value="29"]')!);
    expect(
      ctx.host.querySelector('[data-photo-custom-toggle]')?.classList.contains('active'),
    ).toBe(false);
    expect(ctx.host.querySelector('[data-photo-custom-row]')?.classList.contains('hidden')).toBe(true);
    expect(board(ctx.host)!.getAttribute('viewBox')).toBe('0 0 290 290');
  });

  it('remove background (shipped default) empties a solid photo completely', () => {
    // a solid color IS the background — every cell becomes an empty peg and
    // the bead list drops to nothing
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    expect(ctx.host.querySelectorAll('.pv-cell').length).toBe(0);
    expect(ctx.host.querySelectorAll('.pv-peg').length).toBe(29 * 29);
    expect(ctx.host.querySelector('[data-photo-status]')?.textContent).toContain('0 beads');
    expect(ctx.host.querySelectorAll('[data-photo-color-list] .bead-row').length).toBe(0);
  });

  it('Edit in editor hands the whole board to the editor page', () => {
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-bg]')!);
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-edit]')!);
    const raw = ctx.window.sessionStorage.getItem('bead-editor:handoff');
    expect(raw).toBeTruthy();
    const hand = JSON.parse(raw!) as { width: number; height: number; grid: (string | null)[][] };
    expect(hand.width).toBe(29);
    expect(hand.height).toBe(29);
    expect(hand.grid).toHaveLength(29);
    expect(hand.grid[10]![10]).toBe(RED_BEAD.id);
    expect(ctx.window.location.href).toContain('/bead-editor/');
  });

  it('autoColCols math: ≥2.2 source pixels per cell, clamped to [29, 116]', () => {
    expect(ctx.PhotoStudio.autoCols(1600, 1200)).toBe(116); // any real photo caps out
    expect(ctx.PhotoStudio.autoCols(1200, 1600)).toBe(116); // portrait too
    expect(ctx.PhotoStudio.autoCols(387, 254)).toBe(115); // the busy web scene → near cap
    expect(ctx.PhotoStudio.autoCols(320, 240)).toBe(109); // small web image, no ladder snap
    expect(ctx.PhotoStudio.autoCols(300, 200)).toBe(91); // sticker-sized scales down
    expect(ctx.PhotoStudio.autoCols(60, 40)).toBe(29); // never below one pegboard
  });

  it('the action row carries Print pattern and it opens the print dialog', () => {
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-bg]')!);
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    const actions = ctx.host.querySelector('.photo-actions')!;
    expect(actions.querySelector('[data-photo-edit]')?.textContent).toContain('Edit in editor');
    expect(actions.querySelector('[data-photo-png]')?.textContent).toContain('Download PNG');
    const btn = actions.querySelector('[data-photo-print]') as HTMLElement;
    expect(btn.textContent).toContain('Print');
    const printSpy = vi.fn();
    (ctx.window as unknown as { print: () => void }).print = printSpy;
    fireClick(ctx.window, btn);
    expect(printSpy).toHaveBeenCalledOnce();
  });
});
