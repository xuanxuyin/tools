/**
 * Photo → fuse-bead pattern engine. Pure functions, no DOM: takes decoded
 * pixel data (any ImageData-shaped object) and turns it into a bead board.
 * Matching runs in Oklab — the same perceptual metric the color-name engine
 * uses — so photos keep their character instead of drifting the way
 * RGB-distance converters let them.
 *
 * Two pipelines:
 *  - 'smooth' (default): scan → cluster cell colors into regions → one bead
 *    per region → majority-vote away speckles. Clean area maps: a logo or
 *    cartoon stays crisp, and a symmetric photo comes out symmetric.
 *  - 'dither': Floyd–Steinberg error diffusion over the full palette with a
 *    serpentine scan — trades a little texture for much richer gradients
 *    (sunsets, skies) at small board sizes.
 * maxColors caps the color count so the shopping list fits the beads people
 * actually own. Photo boards are always full — every cell gets a bead.
 */
import { rgbToOklab, hexToRgb, type Oklab } from './color';
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
  /** 1..48; defaults to the full palette */
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

/** Oklab of pure white — alpha-composite target, precomputed. */
const WHITE_LAB = rgbToOklab({ r: 255, g: 255, b: 255 });

/** Box mean over a pixel rectangle, computed in Oklab. Averaging sRGB
 *  channel values directly is the classic gamma mistake: sRGB numbers are
 *  not linear light, so a 50/50 mix of black and white averages to 128
 *  instead of the perceptual mid-gray 188 — every soft gradient came out
 *  darker and muddier than the photo, and the board followed. Semi-
 *  transparent pixels composite onto white (a bead board has no
 *  transparency; pegboard white reads as a white bead). */
function boxMeanLab(
  img: SampleImage,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Oklab {
  const { data, width } = img;
  let L = 0;
  let a = 0;
  let b = 0;
  let n = 0;
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * width + x) * 4;
      const al = data[i + 3]! / 255;
      const px = rgbToOklab({ r: data[i]!, g: data[i + 1]!, b: data[i + 2]! });
      L += px.L * al + WHITE_LAB.L * (1 - al);
      a += px.a * al + WHITE_LAB.a * (1 - al);
      b += px.b * al + WHITE_LAB.b * (1 - al);
      n++;
    }
  }
  if (!n) return WHITE_LAB;
  return { L: L / n, a: a / n, b: b / n };
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

/** Minimum Oklab distance between two cluster centers — closer colors are
 *  one region, not two beads. Kept tight (0.04) so detail colors survive. */
const MERGE_T = 0.04;
/** A cell farther than this from EVERY region center is "detail" — an eye,
 *  a highlight, a thin edge — and snaps to the full palette on its own
 *  instead of being dragged into the surrounding region. */
const OUTLIER_T = 0.1;
/** Oklab components are bucketed at 1/12 steps for the color histogram —
 *  coarse pre-merge, deterministic, and symmetry-preserving (mirror cells
 *  quantize into the same bucket, so a symmetric photo stays symmetric). */
const BUCKET = 12;

/**
 * The region pipeline: scan every cell's color, merge them into buckets,
 * pick well-separated centers by frequency, and give each region one bead.
 * Per-cell independent snapping (the old behavior) lets JPEG noise and soft
 * gradients flip neighboring cells to different beads — this groups first,
 * colors second, which is how a human reads a pattern.
 */
function clusterCells(labs: Oklab[], maxColors: number): string[] {
  const buckets = new Map<string, { n: number; L: number; a: number; b: number }>();
  for (const lab of labs) {
    const key = `${Math.round(lab.L * BUCKET)},${Math.round(lab.a * BUCKET)},${Math.round(lab.b * BUCKET)}`;
    let bkt = buckets.get(key);
    if (!bkt) {
      bkt = { n: 0, L: 0, a: 0, b: 0 };
      buckets.set(key, bkt);
    }
    bkt.n++;
    bkt.L += lab.L;
    bkt.a += lab.a;
    bkt.b += lab.b;
  }
  // frequency desc, key asc — a fixed order for identical inputs
  const sorted = [...buckets.entries()].sort(
    (x, y) => y[1].n - x[1].n || (x[0] < y[0] ? -1 : x[0] > y[0] ? 1 : 0),
  );
  const centers: Oklab[] = [];
  const cap = Math.max(1, maxColors);
  for (const [, bkt] of sorted) {
    if (centers.length >= cap) break;
    const c: Oklab = { L: bkt.L / bkt.n, a: bkt.a / bkt.n, b: bkt.b / bkt.n };
    if (centers.every((k) => Math.hypot(c.L - k.L, c.a - k.a, c.b - k.b) > MERGE_T)) {
      centers.push(c);
    }
  }
  // two centers may snap to the same bead — that merge is free and correct
  const centerBeads = centers.map((c) => nearestBeadLab(c, null).id);
  return labs.map((lab) => {
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < centers.length; i++) {
      const k = centers[i]!;
      const d = Math.hypot(lab.L - k.L, lab.a - k.a, lab.b - k.b);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    // far from every region = a detail cell (eye, highlight, thin edge);
    // it picks the closest bead among the regions' beads instead of just
    // following its spatially-nearest region — sharper detail, and the
    // color budget stays closed (no bead beyond the chosen regions)
    if (bestD > OUTLIER_T) {
      const subset = new Set(centerBeads);
      return nearestBeadLab(lab, subset).id;
    }
    return centerBeads[best]!;
  });
}

/** One 3×3 majority-vote pass: a cell whose 8 neighbors hold ≥7 of one bead
 *  switches to it — kills fully-surrounded speckles without eroding real
 *  detail (a 2×2 eye or an edge line never reaches the threshold). */
function despeckle(cells: string[], cols: number, rows: number): string[] {
  const out = cells.slice();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      const counts = new Map<string, number>();
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
          const id = cells[ny * cols + nx]!;
          counts.set(id, (counts.get(id) ?? 0) + 1);
        }
      }
      for (const [id, n] of counts) {
        if (n >= 7 && id !== cells[i]) {
          out[i] = id;
          break;
        }
      }
    }
  }
  return out;
}

export function photoToPattern(img: SampleImage, opts: PhotoOpts): PhotoPattern {
  if (!img.width || !img.height || img.data.length < img.width * img.height * 4) {
    return { cols: 0, rows: 0, cells: [] };
  }
  const cols = Math.max(MIN_COLS, Math.min(MAX_COLS, Math.round(opts.cols)));
  // aspect-following height; capped, so extreme panoramas compress rather
  // than mint an unbuildable board
  const rows = Math.max(MIN_COLS, Math.min(MAX_ROWS, Math.round((img.height / img.width) * cols)));

  // per-cell box-mean sampled once — both pipelines share it
  const labs: Oklab[] = new Array(cols * rows);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const { x0, y0, x1, y1 } = cellRect(img, cols, rows, x, y);
      labs[y * cols + x] = boxMeanLab(img, x0, y0, x1, y1);
    }
  }

  const max = opts.maxColors ?? BEAD_COLORS.length;
  let cells: string[];

  if (opts.mode === 'dither') {
    // gradient pipeline: Floyd–Steinberg over the full palette, serpentine
    // scan (even rows left→right, odd rows right→left) so error diffusion
    // doesn't drag every picture to one side
    cells = new Array(cols * rows);
    const err: (Oklab | undefined)[] = new Array(cols * rows);
    for (let y = 0; y < rows; y++) {
      const ltr = y % 2 === 0;
      for (let k = 0; k < cols; k++) {
        const x = ltr ? k : cols - 1 - k;
        const i = y * cols + x;
        const base = labs[i]!;
        const e = err[i];
        const target: Oklab = e
          ? { L: base.L + e.L, a: base.a + e.a, b: base.b + e.b }
          : base;
        const bead = nearestBeadLab(target, null);
        cells[i] = bead.id;
        // classic FS: the residual is target − bead, so incoming error is
        // conserved through the board instead of being absorbed per cell
        const d: Oklab = {
          L: target.L - bead.lab.L,
          a: target.a - bead.lab.a,
          b: target.b - bead.lab.b,
        };
        const fwd = ltr ? x + 1 : x - 1;
        const back = ltr ? x - 1 : x + 1;
        spread(err, cols, rows, fwd, y, d, 7 / 16);
        spread(err, cols, rows, back, y + 1, d, 3 / 16);
        spread(err, cols, rows, x, y + 1, d, 5 / 16);
        spread(err, cols, rows, fwd, y + 1, d, 1 / 16);
      }
    }
    // palette cap: keep the most-used beads, re-snap the rest onto them
    if (max > 0 && max < BEAD_COLORS.length) {
      const counts = new Map<string, number>();
      for (const id of cells) counts.set(id, (counts.get(id) ?? 0) + 1);
      const keep = new Set(
        [...counts.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, Math.max(1, max))
          .map(([id]) => id),
      );
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
  } else {
    // region pipeline: scan → cluster into color regions → one bead per
    // region → majority-vote away the speckles
    cells = despeckle(clusterCells(labs, max), cols, rows);
  }

  return { cols, rows, cells };
}
