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

/** Left-right mirrored photo: symmetric gradient, integer channels — mirror
 *  cells are pixel-identical, so a symmetric pipeline must stay symmetric. */
function mirrored(w: number, h: number): SampleImage {
  const data = new Uint8ClampedArray(w * h * 4);
  const half = Math.floor(w / 2);
  const table: { r: number; g: number; b: number }[] = [];
  for (let i = 0; i < half; i++) {
    table.push({ r: Math.round((i / Math.max(1, half - 1)) * 255), g: 0, b: 255 });
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
    // 50% black / 50% white photo: the board's mean must stay near mid-gray
    const out = photoToPattern(split(60, 60, '#000000', '#ffffff'), {
      cols: 30,
      mode: 'dither',
    });
    const black = nearestBead('#000000').id;
    const whites = out.cells.filter((id) => id === black).length;
    expect(whites / out.cells.length).toBeGreaterThan(0.4);
    expect(whites / out.cells.length).toBeLessThan(0.6);
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
    const out = photoToPattern(solid(40, 40, '#808080'), { cols: 20, mode: 'dither' });
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
      const out = photoToPattern(solid(40, 40, hex), { cols: 20, mode: 'dither' });
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
    const out = photoToPattern(mirrored(40, 20), { cols: 20, mode: 'smooth' });
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
});
