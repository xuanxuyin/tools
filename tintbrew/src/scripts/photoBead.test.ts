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
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
    // crop row + crop editor follow the slot (P2, 2026-11-02), both hidden
    // until a photo lands; the auto-apply note comes after them
    const cropBtns = slot.nextElementSibling!;
    expect(cropBtns.matches('[data-photo-crop-btns]')).toBe(true);
    expect(cropBtns.classList.contains('hidden')).toBe(true);
    const cropLayer = cropBtns.nextElementSibling!;
    expect(cropLayer.matches('[data-photo-crop-layer]')).toBe(true);
    expect(cropLayer.classList.contains('hidden')).toBe(true);
    expect(cropLayer.querySelector('[data-photo-crop-box]')).toBeTruthy();
    expect(cropLayer.querySelectorAll('.crop-h')).toHaveLength(8);
    const note = cropLayer.nextElementSibling!;
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
    // both post-passes ship unchecked (user call, 2026-10-29): the photo
    // passes through as-is until the user opts in
    expect((ctx.host.querySelector('[data-photo-bg]') as HTMLInputElement).checked).toBe(false);
    expect((ctx.host.querySelector('[data-photo-outline]') as HTMLInputElement).checked).toBe(false);
    expect(ctx.host.querySelector('[data-photo-custom-row]')?.classList.contains('hidden')).toBe(true);
    expect(ctx.document.querySelector('h1')?.textContent).toContain('Photo to Perler Bead Pattern');
  });

  it('convertSample renders the preview board and all three panels from tick one', () => {
    // both post-passes are off by default now — a solid photo IS the subject
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
    ctx.studio.convertSample(solid(40, 20, 255, 0, 0)); // 2:1 wide
    expect(board(ctx.host)!.getAttribute('viewBox')).toBe('0 0 290 150');
    expect(ctx.host.querySelectorAll('.pv-cell').length).toBe(29 * 15);
  });

  it('a size pill click re-converts without a second upload', () => {
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

  it('checking Remove background empties a solid photo completely', () => {
    // a solid color IS the background — opt in, and every cell becomes an
    // empty peg while the bead list drops to nothing
    fireClick(ctx.window, ctx.host.querySelector('[data-photo-bg]')!);
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    expect(ctx.host.querySelectorAll('.pv-cell').length).toBe(0);
    expect(ctx.host.querySelectorAll('.pv-peg').length).toBe(29 * 29);
    expect(ctx.host.querySelector('[data-photo-status]')?.textContent).toContain('0 beads');
    expect(ctx.host.querySelectorAll('[data-photo-color-list] .bead-row').length).toBe(0);
  });

  it('Edit in editor hands the whole board to the editor page', () => {
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

  it('clampRect keeps crops inside the image, at least MIN_CROP, as integers', () => {
    const clamp = ctx.PhotoStudio.clampRect;
    // negative origin snaps to the corner, sub-min sizes lift to 32
    expect(clamp({ x: -10, y: -5, w: 4, h: 4 }, 300, 200)).toEqual({ x: 0, y: 0, w: 32, h: 32 });
    // oversize dims clamp to the image itself
    expect(clamp({ x: 0, y: 0, w: 999, h: 999 }, 300, 200)).toEqual({ x: 0, y: 0, w: 300, h: 200 });
    // origin pulled back so the rect never spills past the right/bottom edge
    expect(clamp({ x: 290, y: 190, w: 32, h: 32 }, 300, 200)).toEqual({ x: 268, y: 168, w: 32, h: 32 });
    // floats round
    expect(clamp({ x: 10.6, y: 5.2, w: 32.4, h: 33.7 }, 300, 200)).toEqual({ x: 11, y: 5, w: 32, h: 34 });
  });

  it('crop narrows the conversion to the framed region and Reset brings the whole photo back', { timeout: 30_000 }, () => {
    // left half red, right half blue — the crop frame takes the red half
    const w = 160;
    const h = 120;
    const data = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const [r, g, b] = x < w / 2 ? [255, 0, 0] : [0, 0, 255];
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = 255;
      }
    }
    ctx.studio.convertSample({ data, width: w, height: h });
    // crop to the left (red) half — Apply drives a reconvert through the
    // same path, so re-running convertSample after setting the crop rect
    // exercises the identical code path
    const s = ctx.studio as unknown as {
      cropRect: { x: number; y: number; w: number; h: number } | null;
    };
    s.cropRect = { x: 0, y: 0, w: 80, h: 120 };
    ctx.studio.convertSample({ data, width: w, height: h });
    const svg = board(ctx.host)!;
    // Auto width follows the cropped frame: 80/2.2 → 36 wide, aspect keeps 54 rows
    expect(svg.getAttribute('viewBox')).toBe('0 0 360 540');
    expect(ctx.host.querySelectorAll('.pv-cell').length).toBeGreaterThan(0);
    for (const c of ctx.host.querySelectorAll<HTMLSpanElement>('.pv-cell'))
      expect(c.getAttribute('fill')).toBe(RED_BEAD.hex);
    // reset clears the crop and rebuilds the full board (both halves back;
    // the seam column averages to a blend bead, so ≥2 colors with red+blue)
    s.cropRect = null;
    ctx.studio.convertSample({ data, width: w, height: h });
    const fills = new Set(
      [...ctx.host.querySelectorAll<HTMLSpanElement>('.pv-cell')].map((c) => c.getAttribute('fill')),
    );
    expect(fills.has(RED_BEAD.hex)).toBe(true);
    expect(fills.size).toBeGreaterThanOrEqual(2);
  });

  it('Print boards: hidden on a single pegboard, offered past one, and it mounts the print sheets', () => {
    // 29 × 29 — one pegboard, no boards button
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    expect(ctx.host.querySelector('[data-photo-print-boards]')).toBeNull();
    expect(ctx.document.querySelector('[data-print-boards]')).toBeNull();

    // the 58 pill → 58 × 29, two boards across; the button appears and
    // clicking mounts the cover sheet + board sheets at the end of <main>
    const w = 60;
    const h = 30;
    const data = new Uint8ClampedArray(w * h * 4);
    for (let i = 0; i < w * h; i++) {
      data[i * 4] = 255;
      data[i * 4 + 1] = 0;
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 255;
    }
    ctx.studio.convertSample({ data, width: w, height: h });
    const pill = ctx.host.querySelector('[data-photo-size] > [data-value="58"]') as HTMLElement;
    fireClick(ctx.window, pill);
    const boardsBtn = ctx.host.querySelector('[data-photo-print-boards]') as HTMLElement;
    expect(boardsBtn).toBeTruthy();
    const root = document.documentElement;
    root.dataset.printZone = 'boards';
    fireClick(ctx.window, boardsBtn);
    const sheets = ctx.document.querySelector('[data-print-boards]')!;
    expect(sheets.parentElement?.tagName.toLowerCase()).toBe('main');
    const pages = sheets.querySelectorAll('.board-page');
    expect(pages.length).toBe(3); // cover + 2 boards (29 rows tall → one row of boards)
    expect(pages[0]!.classList.contains('board-cover')).toBe(true);
    expect(pages[0]!.querySelector('.bp-cover-title')?.textContent).toContain('2 pegboards');
    expect(pages[1]!.querySelector('.bp-board-head')?.textContent).toContain('Board 1 of 2');
    expect(pages[1]!.getAttribute('data-bp-page')).toBe('1');
    expect(pages[2]!.getAttribute('data-bp-page')).toBe('2');
    // the cover list mirrors the single-color tally
    expect(pages[0]!.querySelectorAll('.bp-row').length).toBe(1);
    delete root.dataset.printZone;
    // a re-print replaces the old sheets instead of stacking them
    fireClick(ctx.window, boardsBtn);
    expect(ctx.document.querySelectorAll('[data-print-boards]')).toHaveLength(1);
  });

  it('the crop buttons row wakes up on upload and Reset hides until a crop applies', () => {
    // no photo yet → the row stays hidden
    expect(ctx.host.querySelector('[data-photo-crop-btns]')?.classList.contains('hidden')).toBe(true);
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    // convertSample skips the upload path — simulate the visible state it drives
    const s = ctx.studio as unknown as { sourceUrl: string | null; updateCropButtons(): void };
    s.sourceUrl = 'blob:photo';
    s.updateCropButtons();
    const row = ctx.host.querySelector('[data-photo-crop-btns]')!;
    expect(row.classList.contains('hidden')).toBe(false);
    // no crop applied → Reset stays hidden
    expect(row.querySelector('[data-photo-crop-reset]')?.classList.contains('hidden')).toBe(true);
  });
});

describe('publish to gallery from the converter (shared flow)', () => {
  let ctx: Awaited<ReturnType<typeof loadPage>>;

  beforeEach(async () => {
    ctx = await loadPage();
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({ id: 'photo000001' }),
        } as Response),
      ),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('no pattern yet → Publish is absent; after a conversion the button opens the panel', () => {
    expect(ctx.host.querySelector('[data-ed-publish]')).toBeNull();
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    const pub = ctx.host.querySelector('[data-ed-publish]') as HTMLElement;
    expect(pub).toBeTruthy();
    fireClick(ctx.window, pub);
    const panel = ctx.host.querySelector('[data-ed-publish-panel]') as HTMLElement;
    expect(panel.classList.contains('hidden')).toBe(false);
  });

  it('the photo filename prefills the piece name; submit posts the converted grid', async () => {
    // the upload path names the piece — drive setFilename directly (load()
    // is the only caller, and it also needs a File object)
    const s = ctx.studio as unknown as { setFilename(n: string | null): void };
    s.setFilename('sunny_cat.png');
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));

    fireClick(ctx.window, ctx.host.querySelector('[data-ed-publish]') as Element);
    const panel = ctx.host.querySelector('[data-ed-publish-panel]') as HTMLElement;
    expect((panel.querySelector('[data-ed-publish-name]') as HTMLInputElement).value).toBe('sunny_cat');
    (panel.querySelector('[data-ed-publish-nick]') as HTMLInputElement).value = 'Tester';

    fireClick(ctx.window, panel.querySelector('[data-ed-publish-submit]') as Element);
    await new Promise((r) => setTimeout(r, 0));

    const call = vi.mocked(globalThis.fetch).mock.calls[0]!;
    expect(String(call[0])).toBe('/api/gallery/publish');
    const body = JSON.parse((call[1] as RequestInit).body as string);
    expect(body.name).toBe('sunny_cat');
    expect(body.nick).toBe('Tester');
    expect(body.width).toBeGreaterThan(0);
    expect(body.grid).toHaveLength(body.height);
    const ids = new Set(MARD_COLORS.map((b) => b.id));
    for (const row of body.grid as (string | null)[])
      for (const cell of row) if (cell !== null) expect(ids.has(cell)).toBe(true);
    expect(ctx.window.localStorage.getItem('tb-gallery:piece-id')).toBe('photo000001');
  });

  it('a null board (no conversion yet) is unreachable — the button only exists after one', () => {
    // defensive pin: the action row that carries the Publish button is
    // rebuilt inside render(), which only runs on a successful conversion
    ctx.studio.convertSample(solid(30, 30, 255, 0, 0));
    expect(ctx.host.querySelector('.photo-actions [data-ed-publish]')).toBeTruthy();
    // and after every re-conversion the button survives the rebuild
    ctx.studio.convertSample(solid(40, 20, 255, 0, 0));
    expect(ctx.host.querySelector('.photo-actions [data-ed-publish]')).toBeTruthy();
  });
});
