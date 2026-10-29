/**
 * Photo→pattern engine guards, rebuilt for the source-site pipeline
 * (2026-10-29 fidelity pass). Images are hand-built (solid halves,
 * gradients, transparent) — no canvas needed anywhere.
 */
import { describe, expect, it } from 'vitest';
import { photoToPattern, type SampleImage } from './photoToPattern';
import { BEAD_COLORS, nearestBead } from './beadPalette';
import { hexToRgb, rgbToOklab } from './color';

function solid(w: number, h: number, hex: string, alpha = 255): SampleImage {
  const { r, g, b } = hexToRgb(hex);
  const data = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    data[i * 4] = r;
    data[i * 4 + 1] = g;
    data[i * 4 + 2] = b;
    data[i * 4 + 3] = alpha;
  }
  return { data, width: w, height: h };
}

/** Left half one hex, right half another. */
function split(w: number, h: number, left: string, right: string): SampleImage {
  const l = hexToRgb(left);
  const rr = hexToRgb(right);
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = x < w / 2 ? l : rr;
      const i = (y * w + x) * 4;
      data[i] = c.r;
      data[i + 1] = c.g;
      data[i + 2] = c.b;
      data[i + 3] = 255;
    }
  }
  return { data, width: w, height: h };
}

/** Left-right mirrored photo: symmetric blue→green gradient, integer
 *  channels — mirror cells are pixel-identical, so a symmetric pipeline must
 *  stay symmetric. The gradient runs through a palette corridor the Perler
 *  line covers well (cobalt → teal → green → sour apple); the previous
 *  blue→magenta ramp crosses the vivid-violet gap where Perler sells no
 *  bead, which honestly collapses it to two zones (see the beadPalette
 *  sweep guard) — that tested palette coverage, not pipeline symmetry. */
function mirrored(w: number, h: number): SampleImage {
  const data = new Uint8ClampedArray(w * h * 4);
  const half = Math.floor(w / 2);
  const table: { r: number; g: number; b: number }[] = [];
  for (let i = 0; i < half; i++) {
    const t = Math.round((i / Math.max(1, half - 1)) * 255);
    table.push({ r: 0, g: t, b: 255 - t });
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = x < half ? table[x]! : table[w - 1 - x]!;
      const i = (y * w + x) * 4;
      data[i] = c.r;
      data[i + 1] = c.g;
      data[i + 2] = c.b;
      data[i + 3] = 255;
    }
  }
  return { data, width: w, height: h };
}

describe('photoToPattern', () => {
  it('fills a solid photo with the nearest single bead', () => {
    const img = solid(40, 40, '#ff0000');
    const out = photoToPattern(img, { cols: 29, mode: 'smooth' });
    expect(out.cols).toBe(29);
    expect(out.rows).toBe(29);
    expect(out.cells).toHaveLength(29 * 29);
    const expected = nearestBead('#ff0000').id;
    for (const id of out.cells) expect(id).toBe(expected);
  });

  it('keeps aspect ratio: a wide photo maps to fewer rows than cols', () => {
    const out = photoToPattern(solid(20, 10, '#008000'), { cols: 20, mode: 'smooth' });
    expect(out.cols).toBe(20);
    expect(out.rows).toBe(10);
  });

  it('clamps the board width to [8, 200] like the source site', () => {
    expect(photoToPattern(solid(20, 20, '#008000'), { cols: 4, mode: 'smooth' }).cols).toBe(8);
    expect(photoToPattern(solid(20, 20, '#008000'), { cols: 500, mode: 'smooth' }).cols).toBe(200);
  });

  it('splits a half-and-half photo into exactly two bead columns', () => {
    const out = photoToPattern(split(40, 20, '#ff0000', '#0000ff'), {
      cols: 20,
      mode: 'smooth',
    });
    const red = nearestBead('#ff0000').id;
    const blue = nearestBead('#0000ff').id;
    expect(red).not.toBe(blue);
    for (let y = 0; y < out.rows; y++) {
      for (let x = 0; x < out.cols; x++) {
        expect(out.cells[y * out.cols + x]).toBe(x < out.cols / 2 ? red : blue);
      }
    }
  });

  it('area resampling lands exact splits — pixel-aligned cells stay pure', () => {
    // 16px wide photo, 8 cells wide: each cell covers exactly two pixels
    // with integer boundaries — left column pure red, right column pure
    // blue, no float spill across the split
    const out = photoToPattern(split(16, 16, '#ff0000', '#0000ff'), {
      cols: 8,
      mode: 'smooth',
      simplify: 'keep',
    });
    const red = nearestBead('#ff0000').id;
    const blue = nearestBead('#0000ff').id;
    for (let y = 0; y < out.rows; y++) {
      expect(out.cells[y * out.cols]).toBe(red);
      expect(out.cells[y * out.cols + 7]).toBe(blue);
    }
  });

  it('caps the palette: maxColors=1 collapses the board to one bead', () => {
    const out = photoToPattern(split(40, 20, '#ff0000', '#0000ff'), {
      cols: 20,
      mode: 'smooth',
      maxColors: 1,
    });
    expect(new Set(out.cells).size).toBe(1);
  });

  it('maxColors=16 keeps the number of distinct beads within 16', () => {
    // a smooth blue→green gradient quantizes to many beads when uncapped
    const w = 64;
    const data = new Uint8ClampedArray(w * w * 4);
    for (let y = 0; y < w; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        data[i] = 0;
        data[i + 1] = Math.round((x / (w - 1)) * 255);
        data[i + 2] = Math.round(255 - (x / (w - 1)) * 255);
        data[i + 3] = 255;
      }
    }
    const out = photoToPattern({ data, width: w, height: w }, {
      cols: 32,
      mode: 'smooth',
      maxColors: 16,
    });
    expect(new Set(out.cells).size).toBeLessThanOrEqual(16);
  });

  it('fitLimit drops the redundant sibling shade, never the far color', () => {
    // 1:1 mapping (20px wide photo, 20 cells): red field + blue field, then
    // a lone yellow column and a lone orange column sitting next to each
    // other. Capped at 3: yellow/orange are mutual nearest neighbors, so
    // the smaller count×distance kills one of them — but red and blue, the
    // picture's actual colors, must both survive
    const w = 20;
    const h = 10;
    const colors = { red: '#ff0000', blue: '#0000ff', yellow: '#ffff00', orange: '#ff8000' };
    const data = new Uint8ClampedArray(w * h * 4);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const hex = x <= 12 ? colors.red : x <= 15 ? colors.blue : x === 16 ? colors.yellow : x === 17 ? colors.orange : colors.blue;
        const c = hexToRgb(hex);
        const i = (y * w + x) * 4;
        data[i] = c.r;
        data[i + 1] = c.g;
        data[i + 2] = c.b;
        data[i + 3] = 255;
      }
    }
    const out = photoToPattern({ data, width: w, height: h }, {
      cols: w,
      mode: 'smooth',
      simplify: 'keep',
      maxColors: 3,
    });
    const ids = new Set(out.cells);
    expect(ids.size, [...ids].join(',')).toBe(3);
    expect(ids.has(nearestBead(colors.red).id)).toBe(true);
    expect(ids.has(nearestBead(colors.blue).id)).toBe(true);
  });

  it('dither mode preserves the photo average color within a small error', () => {
    // 50% black / 50% white photo: Floyd–Steinberg must conserve the board's
    // mean luminance. Measured against the reachable mean (nearest dark bead
    // + nearest white bead, 50/50) — no bead hits pure 0 or 1, and the
    // 103-color line splits the black half between its two darkest beads
    // (Dark Spruce / Cocoa), so counting one bead's share is no longer the
    // conservation signal; the mean is.
    const out = photoToPattern(split(60, 60, '#000000', '#ffffff'), {
      cols: 30,
      mode: 'dither',
      simplify: 'keep', // this test pins FS conservation, not the merge pass
    });
    const lab = (hex: string) => rgbToOklab(hexToRgb(hex)).L;
    const dark = nearestBead('#000000');
    const white = nearestBead('#ffffff');
    const reachable = (lab(dark.hex) + lab(white.hex)) / 2;
    const beadHex = new Map(BEAD_COLORS.map((b) => [b.id, b.hex]));
    const mean = out.cells.reduce((s, id) => s + lab(beadHex.get(id)!), 0) / out.cells.length;
    expect(mean).toBeGreaterThan(reachable - 0.06);
    expect(mean).toBeLessThan(reachable + 0.06);
    // both halves stay real: white keeps its half, dark-family beads theirs
    const whiteShare = out.cells.filter((id) => id === white.id).length / out.cells.length;
    expect(whiteShare).toBeGreaterThan(0.4);
    expect(whiteShare).toBeLessThan(0.6);
  });

  it('a transparent photo becomes empty pegboard — no white padding', () => {
    // source-site behavior (2026-10-29): cells averaging under 24 alpha are
    // empty pegboard, so transparent PNG cut-outs keep their shape instead
    // of gaining a white bead rectangle
    const out = photoToPattern(solid(10, 10, '#ff0000', 0), { cols: 10, mode: 'smooth' });
    expect(out.cells.every((id) => id === null)).toBe(true);
  });

  it('faint-but-present alpha (100) still converts to its bead', () => {
    const out = photoToPattern(solid(10, 10, '#ff0000', 100), { cols: 10, mode: 'smooth' });
    expect(out.cells.every((id) => id === nearestBead('#ff0000').id)).toBe(true);
  });

  it('returns an empty board for degenerate input instead of throwing', () => {
    const out = photoToPattern({ data: new Uint8ClampedArray(0), width: 0, height: 0 }, {
      cols: 29,
      mode: 'smooth',
    });
    expect(out.cells).toHaveLength(0);
  });

  it('dither preserves the mean: a gray photo averages back to gray', () => {
    // FS trades per-cell accuracy for mean accuracy — individual cells may
    // borrow chromatic neighbors, but the board's average must return to
    // the source gray (the diffusion-conservation guarantee)
    const out = photoToPattern(solid(40, 40, '#808080'), {
      cols: 20,
      mode: 'dither',
      simplify: 'keep', // mean conservation is a dither property — no merging
    });
    const src = rgbToOklab({ r: 128, g: 128, b: 128 });
    let L = 0;
    let a = 0;
    let b = 0;
    for (const id of out.cells) {
      const hex = BEAD_COLORS.find((x) => x.id === id)?.hex ?? '#000000';
      const lab = rgbToOklab(hexToRgb(hex));
      L += lab.L;
      a += lab.a;
      b += lab.b;
    }
    const n = out.cells.length;
    expect(Math.abs(L / n - src.L)).toBeLessThan(0.05);
    expect(Math.hypot(a / n, b / n)).toBeLessThan(0.04);
  });

  it('dither conserves every mid tone — no tone squeezing (classic FS)', () => {
    // regression pin: the residual must be target − bead. Diffusing
    // base − bead instead absorbed the incoming error per cell and
    // squeezed different grays onto the same mix (drift up to 0.038 L);
    // classic FS holds every tone within 0.01
    for (const level of [64, 128, 192]) {
      const hex = `#${level.toString(16).padStart(2, '0').repeat(3)}`;
      const out = photoToPattern(solid(40, 40, hex), {
        cols: 20,
        mode: 'dither',
        simplify: 'keep', // FS tone conservation — merging shades would blur it
      });
      const src = rgbToOklab({ r: level, g: level, b: level });
      let L = 0;
      for (const id of out.cells) {
        const bead = BEAD_COLORS.find((x) => x.id === id)?.hex ?? '#000000';
        L += rgbToOklab(hexToRgb(bead)).L;
      }
      expect(Math.abs(L / out.cells.length - src.L), `gray ${level}`).toBeLessThan(0.01);
    }
  });

  it('a mirrored photo converts to a mirrored board (pipeline symmetry)', () => {
    // mirror cells are pixel-identical, so resampling + matching must hold
    // mirror equality for every cell, not just on average
    const out = photoToPattern(mirrored(40, 20), {
      cols: 20,
      mode: 'smooth',
      simplify: 'keep', // pipeline symmetry, not the merge pass
    });
    for (let y = 0; y < out.rows; y++) {
      for (let x = 0; x < out.cols; x++) {
        expect(
          out.cells[y * out.cols + x],
          `cell ${x},${y}`,
        ).toBe(out.cells[y * out.cols + (out.cols - 1 - x)]);
      }
    }
    // and the mirror image isn't degenerate — a gradient yields ≥3 beads
    expect(new Set(out.cells).size).toBeGreaterThanOrEqual(3);
  });

  it('a 1:1 photo stays faithful: an off-color pixel keeps its own cell', () => {
    // the source-site pipeline has no despeckle — at native grid size every
    // cell IS one pixel, so a stray yellow pixel in a blue field stays
    // yellow on the board (faithfulness beats smoothing; the bead editor
    // handles deliberate fixes)
    const img = solid(20, 20, '#3366cc');
    const i = (10 * 20 + 10) * 4;
    img.data[i] = 255;
    img.data[i + 1] = 255;
    img.data[i + 2] = 0;
    const out = photoToPattern(img, { cols: 20, mode: 'smooth', simplify: 'keep' });
    expect(out.cells[10 * 20 + 10]).toBe(nearestBead('#ffff00').id);
    // the field around it is untouched blue
    expect(out.cells[0]).toBe(nearestBead('#3366cc').id);
    expect(out.cells[10 * 20 + 11]).toBe(nearestBead('#3366cc').id);
  });

  it('a noisy flat photo stays one bead family — area averaging eats the jitter', () => {
    // ±12/channel JPEG-style noise on a flat field: every cell averages
    // ~11 source pixels, so the jitter lands inside one bead's basin and
    // the board reads as a single clean color
    const w = 96;
    const data = new Uint8ClampedArray(w * w * 4);
    let seed = 12345; // deterministic LCG — same board every run
    const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff - 0.5);
    for (let p = 0; p < w * w; p++) {
      const n = rnd() * 24; // ±12 per channel
      data[p * 4] = 51 + n;
      data[p * 4 + 1] = 102 + n;
      data[p * 4 + 2] = 204 + n;
      data[p * 4 + 3] = 255;
    }
    const out = photoToPattern({ data, width: w, height: w }, {
      cols: 29,
      mode: 'smooth',
    });
    expect(new Set(out.cells).size, [...new Set(out.cells)].join(',')).toBeLessThanOrEqual(3);
  });

  it('a half-and-half image keeps both halves — no trim, no ring rule', () => {
    // the source-site pipeline never crops: the board is the photo's full
    // frame at the requested width. The black half's bead is read off the
    // board itself — under the chroma-guard distance a pure-gray source
    // picks the palette's no-chroma black, which need not be the bead the
    // plain-Oklab nearestBead() would name
    const out = photoToPattern(split(60, 60, '#000000', '#ffffff'), {
      cols: 12,
      mode: 'smooth',
    });
    expect(out.cols).toBe(12);
    expect(out.rows).toBe(12);
    const black = out.cells[0]!;
    const white = nearestBead('#ffffff').id;
    expect(black).not.toBe(white);
    for (let y = 0; y < out.rows; y++) {
      for (let x = 0; x < out.cols; x++) {
        expect(out.cells[y * out.cols + x]).toBe(x < out.cols / 2 ? black : white);
      }
    }
  });

  // ── source-site post-processing passes (user call, 2026-10-29) ─────────

  it('simplify levels order: keep ≥ balanced ≥ bold distinct colors', () => {
    // the blue→green gradient quantizes to many sibling shades; each level
    // may only merge further, never split
    const w = 64;
    const data = new Uint8ClampedArray(w * w * 4);
    for (let y = 0; y < w; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        data[i] = 0;
        data[i + 1] = Math.round((x / (w - 1)) * 255);
        data[i + 2] = Math.round(255 - (x / (w - 1)) * 255);
        data[i + 3] = 255;
      }
    }
    const img = { data, width: w, height: w };
    const count = (simplify: 'keep' | 'balanced' | 'bold') =>
      new Set(photoToPattern(img, { cols: 32, mode: 'smooth', simplify }).cells).size;
    expect(count('keep')).toBeGreaterThan(count('balanced'));
    expect(count('balanced')).toBeGreaterThanOrEqual(count('bold'));
  });

  /** Shared bg-removal fixture: white field, red subject centered, a black
   *  4×4 block in the corner — big enough to own its cells at 2px/cell and
   *  distinct enough to survive as its own bead. */
  function subjectOnWhite(): SampleImage {
    const w = 40;
    const data = new Uint8ClampedArray(w * w * 4).fill(255);
    for (let y = 12; y < 28; y++) {
      for (let x = 12; x < 28; x++) {
        const i = (y * w + x) * 4;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        const i = (y * w + x) * 4;
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }
    return { data, width: w, height: w };
  }

  it('removeBackground clears the edge-connected background to null, keeps the subject', () => {
    const out = photoToPattern(subjectOnWhite(), {
      cols: 20,
      mode: 'smooth',
      simplify: 'keep',
      removeBackground: true,
    });
    const cells = out.cells as (string | null)[];
    // background became empty pegs — nulls exist and outnumber the subject
    const nulls = cells.filter((c) => c === null).length;
    expect(nulls).toBeGreaterThan(0);
    // the subject survived intact in bead red
    const red = nearestBead('#ff0000').id;
    expect(cells.filter((c) => c === red).length).toBeGreaterThan(0);
    // the board is subject + corner block + holes, no stray background ids.
    // The corner block's bead is read off cell (0,0) — under the
    // chroma-guard distance pure black maps to the palette's no-chroma
    // black bead, not necessarily plain-Oklab nearestBead()'s pick
    const corner = cells[0] as string;
    expect(corner).toBeTruthy();
    expect(new Set(cells)).toEqual(new Set([red, null, corner]));
  });

  it('removeBackground stays off without the flag — same board, zero nulls', () => {
    const out = photoToPattern(subjectOnWhite(), {
      cols: 20,
      mode: 'smooth',
      simplify: 'keep',
    });
    expect(out.cells.some((c) => c === null)).toBe(false);
  });

  it('a same-color island inside the subject survives background removal', () => {
    // white field, red ring subject, white eye in the middle: the eye is
    // white too, but it never touches the border — flood fill from the
    // edges must leave it standing
    const w = 40;
    const data = new Uint8ClampedArray(w * w * 4).fill(255);
    for (let y = 8; y < 32; y++) {
      for (let x = 8; x < 32; x++) {
        const i = (y * w + x) * 4;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }
    for (let y = 18; y < 22; y++) {
      for (let x = 18; x < 22; x++) {
        const i = (y * w + x) * 4;
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      }
    }
    const out = photoToPattern({ data, width: w, height: w }, {
      cols: 20,
      mode: 'smooth',
      simplify: 'keep',
      removeBackground: true,
    });
    const cells = out.cells as (string | null)[];
    // the eye sits at source pixels 18..21 → cells (9..10, 9..10)
    const eyeIdx = 9 * out.cols + 9;
    expect(cells[eyeIdx]).toBe(nearestBead('#ffffff').id);
    // the outer ring of the same white went empty
    expect(cells[0]).toBe(null);
  });

  it('darkOutline traces every empty-adjacent cell with the palette-global darkest bead', () => {
    const out = photoToPattern(subjectOnWhite(), {
      cols: 20,
      mode: 'smooth',
      simplify: 'keep',
      removeBackground: true,
      darkOutline: true,
    });
    const cells = out.cells as (string | null)[];
    // source-site rule: the outline bead is the PALETTE's darkest, fixed —
    // not whatever the photo happened to place on the board
    const darkest = BEAD_COLORS.reduce((dk, b) => {
      const l = (p: string) => {
        const c = hexToRgb(p);
        return (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255;
      };
      return l(b.hex) < l(BEAD_COLORS.find((x) => x.id === dk)!.hex) ? b.id : dk;
    }, BEAD_COLORS[0]!.id);
    for (let y = 0; y < out.rows; y++) {
      for (let x = 0; x < out.cols; x++) {
        const id = cells[y * out.cols + x];
        if (id === null) continue;
        const adjNull = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
          const nx = x + dx;
          const ny = y + dy;
          return nx >= 0 && ny >= 0 && nx < out.cols && ny < out.rows && cells[ny * out.cols + nx] === null;
        });
        if (adjNull) expect(id, `cell ${x},${y} borders a hole`).toBe(darkest);
      }
    }
    // the outline actually fired somewhere (subject edges exist)
    expect(cells.filter((c) => c === darkest).length).toBeGreaterThan(0);
  });

  it('darkOutline reserves a seat: effective cap is maxColors − 1', () => {
    // two strong fields + outline on, cap 2: the picture gets 1 bead and
    // the outline owns the other seat — board shows ≤2 ids total
    const out = photoToPattern(split(40, 20, '#ff0000', '#0000ff'), {
      cols: 20,
      mode: 'smooth',
      maxColors: 2,
      darkOutline: true,
    });
    // no empties without removeBackground → outline paints nothing, but the
    // palette still capped one lower: exactly one picture bead remains
    const ids = new Set(out.cells);
    expect(ids.size).toBe(1);
    expect(out.cells.every((c) => c !== null)).toBe(true);
  });
});
