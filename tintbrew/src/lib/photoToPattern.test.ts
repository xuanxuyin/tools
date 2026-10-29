/**
 * Photo→pattern engine guards. Images are hand-built (solid halves,
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

  it('composites transparency onto white (transparent photo → white beads)', () => {
    const out = photoToPattern(solid(10, 10, '#ff0000', 0), { cols: 10, mode: 'smooth' });
    const white = nearestBead('#ffffff').id;
    for (const id of out.cells) expect(id).toBe(white);
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

  it('a mirrored photo converts to a mirrored board (region pipeline symmetry)', () => {
    // the old per-cell snapping let sampling asymmetries flip mirror cells
    // to different beads; the region pipeline must hold mirror equality
    // for every cell, not just on average
    const out = photoToPattern(mirrored(40, 20), {
      cols: 20,
      mode: 'smooth',
      simplify: 'keep', // region-pipeline symmetry, not the merge pass
    });
    for (let y = 0; y < out.rows; y++) {
      for (let x = 0; x < out.cols; x++) {
        expect(
          out.cells[y * out.cols + x],
          `cell ${x},${y}`,
        ).toBe(out.cells[y * out.cols + (out.cols - 1 - x)]);
      }
    }
    // and the mirror image isn't degenerate — a gradient yields ≥3 regions
    expect(new Set(out.cells).size).toBeGreaterThanOrEqual(3);
  });

  it('an isolated off-color pixel is absorbed by its region (despeckle)', () => {
    // one far-off pixel (yellow in a blue field) becomes its own cluster
    // center, but the 3×3 majority vote eats it back into the region
    const img = solid(20, 20, '#3366cc');
    const i = (10 * 20 + 10) * 4;
    img.data[i] = 255;
    img.data[i + 1] = 255;
    img.data[i + 2] = 0;
    const out = photoToPattern(img, { cols: 20, mode: 'smooth' });
    expect(out.cells[10 * 20 + 10]).toBe(out.cells[0]);
    expect(new Set(out.cells).size).toBe(1);
  });

  it('a noisy flat photo yields no confetti — zero isolated cells', () => {
    // regression pin (button_city repro): JPEG/anti-aliasing jitter at a few
    // source pixels per cell used to flip scattered cells to sibling beads —
    // the "很花" board. The bead merge + majority votes + isolated adoption
    // must leave not one cell whose 8 neighbors all wear a different bead.
    const w = 96;
    const data = new Uint8ClampedArray(w * w * 4);
    let seed = 12345; // deterministic LCG — same board every run
    const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff - 0.5);
    for (let p = 0; p < w * w; p++) {
      const n = rnd() * 24; // ±12 per channel: bucket-crossing noise
      data[p * 4] = 51 + n;
      data[p * 4 + 1] = 102 + n;
      data[p * 4 + 2] = 204 + n;
      data[p * 4 + 3] = 255;
    }
    const out = photoToPattern({ data, width: w, height: w }, {
      cols: 29,
      mode: 'smooth',
    });
    let isolated = 0;
    for (let y = 0; y < out.rows; y++) {
      for (let x = 0; x < out.cols; x++) {
        const id = out.cells[y * out.cols + x]!;
        let same = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (!dx && !dy) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= out.cols || ny < 0 || ny >= out.rows) continue;
            if (out.cells[ny * out.cols + nx] === id) same++;
          }
        }
        if (same === 0) isolated++;
      }
    }
    expect(isolated, `${isolated} isolated cells on a flat noisy field`).toBe(0);
    expect(new Set(out.cells).size).toBeLessThanOrEqual(3);
  });

  it('edge cells take their dominant color, not the mean (no outline mud)', () => {
    // every 4×4 pixel block carries exactly 1 black outline pixel (spaced
    // so no edge line of the image is uniform white — the margin trim has
    // nothing to grab). The mean (L≈0.94) is fine here, but the same
    // dominant-color rule is what keeps a real 50/50 outline cell off the
    // muddy Light Gray the mean would pick.
    const w = 32;
    const data = new Uint8ClampedArray(w * w * 4);
    for (let y = 0; y < w; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const black = x % 4 === 2 && y % 4 === 2;
        data[i] = black ? 0 : 255;
        data[i + 1] = black ? 0 : 255;
        data[i + 2] = black ? 0 : 255;
        data[i + 3] = 255;
      }
    }
    const out = photoToPattern({ data, width: w, height: w }, { cols: 8, mode: 'smooth' });
    const white = nearestBead('#ffffff').id;
    expect(new Set(out.cells)).toEqual(new Set([white]));
  });

  it('trims a uniform screenshot margin so the art fills the board', () => {
    // 40×40 white page with a 20×20 red card centered: the board must be
    // the card, not a fifth-size card floating in white beads
    const w = 40;
    const data = new Uint8ClampedArray(w * w * 4).fill(255);
    for (let y = 10; y < 30; y++) {
      for (let x = 10; x < 30; x++) {
        const i = (y * w + x) * 4;
        data[i] = 255;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
    }
    const out = photoToPattern({ data, width: w, height: w }, { cols: 8, mode: 'smooth' });
    expect(out.rows).toBe(8); // square art on a square board after trim
    const red = nearestBead('#ff0000').id;
    const white = nearestBead('#ffffff').id;
    expect(new Set(out.cells)).toEqual(new Set([red]));
    expect(red).not.toBe(white);
  });

  it('a contested ring is content, not a margin — no trim on a half-split image', () => {
    // half black / half white: the ring is 50/50, so no side may lose
    // pixels even though the left columns are uniformly black
    const out = photoToPattern(split(60, 60, '#000000', '#ffffff'), {
      cols: 12,
      mode: 'smooth',
    });
    expect(out.cols).toBe(12);
    expect(out.rows).toBe(12);
    const black = nearestBead('#000000').id;
    const white = nearestBead('#ffffff').id;
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
   *  4×4 block in the corner — big enough to own its cells (a single pixel
   *  would be outvoted at cell sampling) and to keep every trim row/column
   *  under the ≥99%-borderline, so the trim pass stays out of the way. */
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
    // the board is subject + corner block + holes, no stray background ids
    expect(new Set(cells)).toEqual(new Set([red, null, nearestBead('#000000').id]));
  });

  it('removeBackground stays off without the flag — same board, zero nulls', () => {
    const out = photoToPattern(subjectOnWhite(), {
      cols: 20,
      mode: 'smooth',
      simplify: 'keep',
    });
    expect(out.cells.some((c) => c === null)).toBe(false);
  });

  it('darkOutline traces every empty-adjacent cell with the darkest bead on the board', () => {
    const out = photoToPattern(subjectOnWhite(), {
      cols: 20,
      mode: 'smooth',
      simplify: 'keep',
      removeBackground: true,
      darkOutline: true,
    });
    const cells = out.cells as (string | null)[];
    const ids = [...new Set(cells.filter((c): c is string => c !== null))];
    // darkest on board = min Oklab L
    const darkest = ids.reduce((dk, id) => {
      const l = rgbToOklab(hexToRgb(BEAD_COLORS.find((b) => b.id === id)!.hex)).L;
      const lDk = rgbToOklab(hexToRgb(BEAD_COLORS.find((b) => b.id === dk)!.hex)).L;
      return l < lDk ? id : dk;
    });
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
});
