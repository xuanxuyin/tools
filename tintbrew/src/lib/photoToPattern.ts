/**
 * Photo → fuse-bead pattern engine. Pure functions, no DOM: takes decoded
 * pixel data (any ImageData-shaped object) and maps every board cell onto
 * the nearest real bead by Oklab distance — the same perceptual metric the
 * color-name engine uses — so photos keep their gradients instead of
 * drifting the way RGB-distance converters let them.
 *
 * Two modes: 'smooth' (box-average per cell, the calm look) and 'dither'
 * (Floyd–Steinberg error diffusion carried out in Oklab, which trades a
 * little noise for far richer gradients at small board sizes).
 * maxColors caps the palette so the shopping list fits the beads people
 * actually own: the most-used beads stay, everything else re-snaps onto
 * them. Photo boards are always full — every cell gets a bead, no pegs.
 */
import { rgbToOklab, hexToRgb, type Oklab, type RGB } from './color';
import { BEAD_COLORS } from './beadPalette';

export interface SampleImage {
  /** RGBA, 4 bytes per pixel, row-major — ImageData shaped */
  data: Uint8ClampedArray | number[];
  width: number;
  height: number;
}

export type PhotoMode = 'smooth' | 'dither';

export interface PhotoOpts {
  /** Board width in beads; height follows the photo's aspect ratio */
  cols: number;
  mode: PhotoMode;
  /** 1..32; defaults to the full palette */
  maxColors?: number;
}

export interface PhotoPattern {
  cols: number;
  rows: number;
  /** cells[y * cols + x] = bead id — a full board, no empty cells */
  cells: string[];
}

const MIN_COLS = 8;
const MAX_COLS = 120;
const MAX_ROWS = 120;

/** Bead Lab cache — every pass shares it, hexes are constant at build time. */
const BEAD_LAB: { id: string; lab: Oklab }[] = BEAD_COLORS.map((b) => ({
  id: b.id,
  lab: rgbToOklab(hexToRgb(b.hex)),
}));

/** Closest bead by Oklab distance, optionally restricted to a subset. */
function nearestBeadLab(target: Oklab, subset: Set<string> | null): { id: string; lab: Oklab } {
  let best = BEAD_LAB[0]!;
  let bestD = Infinity;
  for (const b of BEAD_LAB) {
    if (subset && !subset.has(b.id)) continue;
    const d = Math.hypot(target.L - b.lab.L, target.a - b.lab.a, target.b - b.lab.b);
    if (d < bestD) {
      bestD = d;
      best = b;
    }
  }
  return best;
}

/** Pixel rectangle covered by board cell (x, y). Round-based boundaries
 *  keep symmetric photos symmetric: cell x and cell cols-1-x cover the
 *  same pixel width. Edges overlap by a pixel when the photo doesn't
 *  divide evenly — box means are approximations. */
function cellRect(
  img: SampleImage,
  cols: number,
  rows: number,
  x: number,
  y: number,
): { x0: number; y0: number; x1: number; y1: number } {
  const x0 = Math.round((x * img.width) / cols);
  const y0 = Math.round((y * img.height) / rows);
  const x1raw = Math.round(((x + 1) * img.width) / cols);
  const y1raw = Math.round(((y + 1) * img.height) / rows);
  return {
    x0: Math.min(x0, img.width - 1),
    y0: Math.min(y0, img.height - 1),
    x1: Math.max(x0 + 1, Math.min(x1raw, img.width)),
    y1: Math.max(y0 + 1, Math.min(y1raw, img.height)),
  };
}

/** Box mean over a pixel rectangle. Semi-transparent pixels composite onto
 *  white — a bead board has no transparency, and pegboard-white reads as a
 *  white bead. Returns float channels; Oklab is happier unrounded. */
function boxMean(img: SampleImage, x0: number, y0: number, x1: number, y1: number): RGB {
  const { data, width } = img;
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * width + x) * 4;
      const a = data[i + 3]! / 255;
      r += data[i]! * a + 255 * (1 - a);
      g += data[i + 1]! * a + 255 * (1 - a);
      b += data[i + 2]! * a + 255 * (1 - a);
      n++;
    }
  }
  if (!n) return { r: 255, g: 255, b: 255 };
  return { r: r / n, g: g / n, b: b / n };
}

function spread(
  err: (Oklab | undefined)[],
  cols: number,
  rows: number,
  x: number,
  y: number,
  d: Oklab,
  w: number,
): void {
  if (x < 0 || x >= cols || y < 0 || y >= rows) return;
  const i = y * cols + x;
  const cur = err[i];
  if (cur) {
    cur.L += d.L * w;
    cur.a += d.a * w;
    cur.b += d.b * w;
  } else {
    err[i] = { L: d.L * w, a: d.a * w, b: d.b * w };
  }
}

export function photoToPattern(img: SampleImage, opts: PhotoOpts): PhotoPattern {
  if (!img.width || !img.height || img.data.length < img.width * img.height * 4) {
    return { cols: 0, rows: 0, cells: [] };
  }
  const cols = Math.max(MIN_COLS, Math.min(MAX_COLS, Math.round(opts.cols)));
  // aspect-following height; capped, so extreme panoramas compress rather
  // than mint an unbuildable board
  const rows = Math.max(MIN_COLS, Math.min(MAX_ROWS, Math.round((img.height / img.width) * cols)));
  const cells: string[] = new Array(cols * rows);

  if (opts.mode === 'dither') {
    const err: (Oklab | undefined)[] = new Array(cols * rows);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const { x0, y0, x1, y1 } = cellRect(img, cols, rows, x, y);
        const base = rgbToOklab(boxMean(img, x0, y0, x1, y1));
        const e = err[y * cols + x];
        const target: Oklab = e
          ? { L: base.L + e.L, a: base.a + e.a, b: base.b + e.b }
          : base;
        const bead = nearestBeadLab(target, null);
        cells[y * cols + x] = bead.id;
        // classic FS: the residual is target − bead, so incoming error is
        // conserved through the board instead of being absorbed per cell
        const d: Oklab = {
          L: target.L - bead.lab.L,
          a: target.a - bead.lab.a,
          b: target.b - bead.lab.b,
        };
        spread(err, cols, rows, x + 1, y, d, 7 / 16);
        spread(err, cols, rows, x - 1, y + 1, d, 3 / 16);
        spread(err, cols, rows, x, y + 1, d, 5 / 16);
        spread(err, cols, rows, x + 1, y + 1, d, 1 / 16);
      }
    }
  } else {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const { x0, y0, x1, y1 } = cellRect(img, cols, rows, x, y);
        cells[y * cols + x] = nearestBeadLab(rgbToOklab(boxMean(img, x0, y0, x1, y1)), null).id;
      }
    }
  }

  const max = opts.maxColors ?? BEAD_COLORS.length;
  if (max > 0 && max < BEAD_COLORS.length) {
    const counts = new Map<string, number>();
    for (const id of cells) counts.set(id, (counts.get(id) ?? 0) + 1);
    const keep = new Set(
      [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, Math.max(1, max))
        .map(([id]) => id),
    );
    // off-palette beads re-snap onto the kept set; one memo per discarded id
    const snap = new Map<string, string>();
    for (let i = 0; i < cells.length; i++) {
      const id = cells[i]!;
      if (keep.has(id)) continue;
      let mapped = snap.get(id);
      if (!mapped) {
        const from = BEAD_LAB.find((b) => b.id === id)!;
        mapped = nearestBeadLab(from.lab, keep).id;
        snap.set(id, mapped);
      }
      cells[i] = mapped;
    }
  }

  return { cols, rows, cells };
}
