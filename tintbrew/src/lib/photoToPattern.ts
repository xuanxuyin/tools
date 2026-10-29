/**
 * Photo → fuse-bead pattern engine. Pure functions, no DOM: takes decoded
 * pixel data (any ImageData-shaped object) and turns it into a bead board.
 * Matching runs in Oklab — the same perceptual metric the color-name engine
 * uses — so photos keep their character instead of drifting the way
 * RGB-distance converters let them.
 *
 * Before any of that: uniform screenshot/scan margins around the art are
 * trimmed (they would eat a fifth of the board), and each cell samples as
 * mean-if-uniform / dominant-color-if-it-straddles-an-edge, so cartoon
 * outlines stay crisp instead of averaging into muddy mid-tones.
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

/** Color-simplification levels, same semantics as the source-site converter:
 *  "Keep shades" preserves sibling palette colors, "Bold" collapses whole
 *  families into one bead. Balanced is the default look. */
export type PhotoSimplify = 'keep' | 'balanced' | 'bold';

export interface PhotoOpts {
  /** Board width in beads; height follows the photo's aspect ratio */
  cols: number;
  mode: PhotoMode;
  /** 1..48; defaults to the full palette */
  maxColors?: number;
  /** Near-duplicate shade merging strength; defaults to 'balanced' */
  simplify?: PhotoSimplify;
  /** Strip the edge-connected background: its cells become empty pegboard
   *  and drop out of the bead count. Defaults to false (engine layer);
   *  the converter UI ships it checked, like the source site. */
  removeBackground?: boolean;
  /** Trace the subject's edge with the darkest bead on the board so the
   *  silhouette stays crisp even where sampling lightened it. */
  darkOutline?: boolean;
}

export interface PhotoPattern {
  cols: number;
  rows: number;
  /** cells[y * cols + x] = bead id, or null for an empty pegboard cell
   *  (removed background). Boards without background removal are full. */
  cells: (string | null)[];
}

const MIN_COLS = 8;
const MAX_COLS = 120;
const MAX_ROWS = 120;

/** Bead Lab cache — every pass shares it, hexes are constant at build time. */
const BEAD_LAB: { id: string; lab: Oklab }[] = BEAD_COLORS.map((b) => ({
  id: b.id,
  lab: rgbToOklab(hexToRgb(b.hex)),
}));
/** Lightness by bead id, for the darker-wins tie-breaks. */
const BEAD_L = new Map(BEAD_LAB.map((b) => [b.id, b.lab.L]));

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
 *  divide evenly — cell colors are approximations. */
function cellRect(
  img: SampleImage,
  rect: { x0: number; y0: number; x1: number; y1: number },
  cols: number,
  rows: number,
  x: number,
  y: number,
): { x0: number; y0: number; x1: number; y1: number } {
  const w = rect.x1 - rect.x0;
  const h = rect.y1 - rect.y0;
  const x0 = rect.x0 + Math.round((x * w) / cols);
  const y0 = rect.y0 + Math.round((y * h) / rows);
  const x1raw = rect.x0 + Math.round(((x + 1) * w) / cols);
  const y1raw = rect.y0 + Math.round(((y + 1) * h) / rows);
  return {
    x0: Math.min(x0, rect.x1 - 1),
    y0: Math.min(y0, rect.y1 - 1),
    x1: Math.max(x0 + 1, Math.min(x1raw, rect.x1)),
    y1: Math.max(y0 + 1, Math.min(y1raw, rect.y1)),
  };
}

/** Oklab of pure white — alpha-composite target, precomputed. */
const WHITE_LAB = rgbToOklab({ r: 255, g: 255, b: 255 });

/** Oklab-axis range below which a cell's pixels count as one color — the
 *  mean is exact there (and stays gamma-correct: averaging sRGB channel
 *  values directly is the classic mid-gray-too-dark mistake). A wider
 *  range means the cell straddles an edge — cartoon outline, object
 *  boundary — and averaging then invents a mid-tone the source never had
 *  (black outline × white suit → muddy gray-brown beads along every
 *  edge). Edge cells take their dominant color instead: the color that
 *  actually occupies most of the cell, which flat art and photos both
 *  keep honest. */
const TIGHT_T = 0.08;

/** Per-pixel Oklab, alpha composited onto white (a bead board has no
 *  transparency; pegboard white reads as a white bead). */
function pixelLab(img: SampleImage, i: number): Oklab {
  const al = img.data[i + 3]! / 255;
  const c = rgbToOklab({ r: img.data[i]!, g: img.data[i + 1]!, b: img.data[i + 2]! });
  return {
    L: c.L * al + WHITE_LAB.L * (1 - al),
    a: c.a * al + WHITE_LAB.a * (1 - al),
    b: c.b * al + WHITE_LAB.b * (1 - al),
  };
}

/** Coarse Oklab bucket key — pixels closer than a bead's distinction land
 *  in the same bucket, so flat-color noise merges while distinct colors
 *  stay apart. Same quantization the cluster histogram uses. */
function bucketKey(px: Oklab): string {
  return `${Math.round(px.L * BUCKET)},${Math.round(px.a * 10)},${Math.round(px.b * 10)}`;
}

/** Color of one cell: mean when the pixels are tight, dominant bucket's
 *  mean when they straddle an edge. */
function cellColor(
  img: SampleImage,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
): Oklab {
  const { data, width } = img;
  let mL = 0;
  let ma = 0;
  let mb = 0;
  let n = 0;
  let minL = Infinity;
  let maxL = -Infinity;
  let minA = Infinity;
  let maxA = -Infinity;
  let minB = Infinity;
  let maxB = -Infinity;
  const buckets = new Map<string, { n: number; L: number; a: number; b: number }>();
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const px = pixelLab(img, (y * width + x) * 4);
      mL += px.L;
      ma += px.a;
      mb += px.b;
      n++;
      if (px.L < minL) minL = px.L;
      if (px.L > maxL) maxL = px.L;
      if (px.a < minA) minA = px.a;
      if (px.a > maxA) maxA = px.a;
      if (px.b < minB) minB = px.b;
      if (px.b > maxB) maxB = px.b;
      const key = bucketKey(px);
      let bkt = buckets.get(key);
      if (!bkt) {
        bkt = { n: 0, L: 0, a: 0, b: 0 };
        buckets.set(key, bkt);
      }
      bkt.n++;
      bkt.L += px.L;
      bkt.a += px.a;
      bkt.b += px.b;
    }
  }
  if (!n) return WHITE_LAB;
  if (Math.max(maxL - minL, maxA - minA, maxB - minB) < TIGHT_T) {
    return { L: mL / n, a: ma / n, b: mb / n };
  }
  // dominant bucket; exact ties (a cell split 50/50 by an edge line) take
  // the darker color — the line reads as the crisp outline a cartoon has
  let bestK = '';
  let bestN = -1;
  let bestL = Infinity;
  for (const [k, bkt] of buckets) {
    if (bkt.n > bestN || (bkt.n === bestN && bkt.L / bkt.n < bestL)) {
      bestN = bkt.n;
      bestK = k;
      bestL = bkt.L / bkt.n;
    }
  }
  const m = buckets.get(bestK)!;
  return { L: m.L / m.n, a: m.a / m.n, b: m.b / m.n };
}

interface Rect {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

/** Oklab distance a pixel still counts as "border-colored". */
const BORDER_T = 0.05;
/** A row/column trims when ≥99% of its pixels are border-colored — the
 *  dashed frame inside a trading card doesn't qualify, the screenshot
 *  margin around the card does. */
const BORDER_COVER = 0.99;
/** The frame's dominant color must hold this share of the whole ring
 *  before trimming engages at all. A half-black/half-white image has a
 *  contested ring (50/50) — that's content at the edges, not a margin. */
const BORDER_SHARE = 0.6;
/** Trim gives up if it would leave under a quarter of either side — that's
 *  a near-uniform image (a swatch scan), not a bordered design. */
const TRIM_KEEP = 0.25;

/**
 * Screenshots and scans arrive with a plain margin around the actual art
 * (webpage white behind a card, scanner lid gray). Converted as-is, that
 * margin eats a fifth of the board and the design comes out smaller than
 * the one the user sees. This walks each side inward while it is ≥99% the
 * frame's dominant color and hands the pipeline the art-only rectangle.
 */
function trimUniformBorder(img: SampleImage): Rect {
  const full: Rect = { x0: 0, y0: 0, x1: img.width, y1: img.height };
  if (img.width < 8 || img.height < 8) return full;

  // dominant quantized color of the outermost pixel ring
  const edge = new Map<string, number>();
  const tally = (x: number, y: number): void => {
    const key = bucketKey(pixelLab(img, (y * img.width + x) * 4));
    edge.set(key, (edge.get(key) ?? 0) + 1);
  };
  for (let x = 0; x < img.width; x++) {
    tally(x, 0);
    tally(x, img.height - 1);
  }
  for (let y = 0; y < img.height; y++) {
    tally(0, y);
    tally(img.width - 1, y);
  }
  let borderK = '';
  let borderN = -1;
  let ring = 0;
  for (const [k, n] of edge) {
    ring += n;
    if (n > borderN) {
      borderN = n;
      borderK = k;
    }
  }
  if (borderN / ring < BORDER_SHARE) return full;
  const [bL, ba, bb] = borderK.split(',').map(Number);
  const border = { L: bL! / BUCKET, a: ba! / 10, b: bb! / 10 };

  const isBorder = (x: number, y: number): boolean => {
    const px = pixelLab(img, (y * img.width + x) * 4);
    return Math.hypot(px.L - border.L, px.a - border.a, px.b - border.b) < BORDER_T;
  };
  const rowBorder = (y: number): boolean => {
    let hits = 0;
    for (let x = 0; x < img.width; x++) if (isBorder(x, y)) hits++;
    return hits / img.width >= BORDER_COVER;
  };
  const colBorder = (x: number): boolean => {
    let hits = 0;
    for (let y = 0; y < img.height; y++) if (isBorder(x, y)) hits++;
    return hits / img.height >= BORDER_COVER;
  };

  let top = 0;
  let bot = 0;
  let left = 0;
  let right = 0;
  while (top < img.height / 2 && rowBorder(top)) top++;
  while (bot < img.height / 2 && rowBorder(img.height - 1 - bot)) bot++;
  while (left < img.width / 2 && colBorder(left)) left++;
  while (right < img.width / 2 && colBorder(img.width - 1 - right)) right++;

  const w = img.width - left - right;
  const h = img.height - top - bot;
  if (w < img.width * TRIM_KEEP || h < img.height * TRIM_KEEP) return full;
  return { x0: left, y0: top, x1: img.width - right, y1: img.height - bot };
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
/** Minimum Oklab distance between two *beads* before they count as the same
 *  color. Fuse-bead palettes carry sibling shades (three creams, five browns)
 *  that soft shading splits a region across — neighboring cells then flip
 *  between family members and the board reads as confetti. Centers whose
 *  beads land closer than this collapse into the more frequent one. */
const BEAD_MERGE_T = 0.06;
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
  // two centers may snap to the same bead — that merge is free and correct.
  // Beyond that, drop centers whose beads are siblings (creams vs sand,
  // toothpaste vs lagoon): soft shading loves to split one region across a
  // near-duplicate family, and the board turns to confetti. Frequency order
  // decides who survives — `centers` is sorted by bucket count.
  const keptCenters: Oklab[] = [];
  const keptBeads: { id: string; lab: Oklab }[] = [];
  for (const c of centers) {
    const bead = nearestBeadLab(c, null);
    const sibling = keptBeads.find(
      (k) =>
        k.id === bead.id ||
        Math.hypot(bead.lab.L - k.lab.L, bead.lab.a - k.lab.a, bead.lab.b - k.lab.b) < BEAD_MERGE_T,
    );
    if (!sibling) {
      keptCenters.push(c);
      keptBeads.push(bead);
    }
  }
  const centersFinal = keptCenters.length ? keptCenters : centers;
  const centerBeads = keptBeads.length
    ? keptBeads.map((b) => b.id)
    : centersFinal.map((c) => nearestBeadLab(c, null).id);
  return labs.map((lab) => {
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < centersFinal.length; i++) {
      const k = centersFinal[i]!;
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

/** One 3×3 majority-vote pass: a cell whose 8 neighbors hold ≥t of one bead
 *  switches to it. t=7 kills fully-surrounded speckles only; the follow-up
 *  t=6 pass also clears 2-cell flecks along shading boundaries. Real detail
 *  survives both — a 2×2 eye has 5 background neighbors at most, an edge
 *  line 4 — while conversion noise (anti-aliased edges, soft gradients)
 *  almost always sits inside a 6+ unanimous pocket. */
function despeckle(cells: string[], cols: number, rows: number, t: number): string[] {
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
        if (n >= t && id !== cells[i]) {
          out[i] = id;
          break;
        }
      }
    }
  }
  return out;
}

/** Last mopping pass for boundary stragglers: a cell with zero same-bead
 *  neighbors is unreadable as detail at board scale — it is an edge cell
 *  whose sampled color landed on a third bead (anti-aliasing mid-tones do
 *  this constantly). When one neighbor color holds ≥4 of the 8, the cell
 *  joins it; exact ties join the darker bead, the same side-taking bias
 *  cellColor gives edge pixels. Cells with even one same-bead neighbor keep
 *  their color — that is a detail (an eye, a snow dot), not noise. */
function adoptIsolated(cells: string[], cols: number, rows: number): string[] {
  const out = cells.slice();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      const counts = new Map<string, number>();
      let same = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
          const id = cells[ny * cols + nx]!;
          counts.set(id, (counts.get(id) ?? 0) + 1);
          if (id === cells[i]) same++;
        }
      }
      if (same > 0) continue;
      let best = '';
      let bestN = 0;
      let bestL = Infinity;
      for (const [id, n] of counts) {
        const L = BEAD_L.get(id) ?? Infinity;
        if (n > bestN || (n === bestN && L < bestL)) {
          best = id;
          bestN = n;
          bestL = L;
        }
      }
      if (bestN >= 4 && best !== cells[i]) out[i] = best;
    }
  }
  return out;
}

/** Oklab distance under which two bead colors on the board count as one
 *  shade for the Color-simplification setting. Balanced (0.08) merges the
 *  sibling shades soft shading splits across; Bold (0.14) collapses whole
 *  families; Keep (0.03) only folds exact near-duplicates. */
const SIMPLIFY_T: Record<PhotoSimplify, number> = { keep: 0.03, balanced: 0.08, bold: 0.14 };

/** id → full Oklab, for the post-quantize passes. */
const BEAD_LAB_BY_ID = new Map(BEAD_LAB.map((b) => [b.id, b.lab]));

/**
 * Color simplification, source-site style: while the closest pair of colors
 * actually on the board sits under the threshold, the lighter bead absorbs
 * the darker one's cells (ties keep the more frequent). Runs on the finished
 * board so it also cleans up what edge sampling scattered.
 */
function simplifyShades(cells: (string | null)[], threshold: number): void {
  for (;;) {
    const ids = [...new Set(cells.filter((c): c is string => c !== null))];
    if (ids.length < 2) return;
    let a = '';
    let b = '';
    let minD = Infinity;
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const la = BEAD_LAB_BY_ID.get(ids[i]!)!;
        const lb = BEAD_LAB_BY_ID.get(ids[j]!)!;
        const d = Math.hypot(la.L - lb.L, la.a - lb.a, la.b - lb.b);
        if (d < minD) {
          minD = d;
          a = ids[i]!;
          b = ids[j]!;
        }
      }
    }
    if (minD >= threshold || !a || !b) return;
    const counts = new Map<string, number>();
    for (const c of cells) if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
    // lighter survives — backgrounds and fill areas read lighter; exact
    // lightness ties keep the color already holding more cells
    const La = BEAD_LAB_BY_ID.get(a)!.L;
    const Lb = BEAD_LAB_BY_ID.get(b)!.L;
    const from =
      Lb < La || (Lb === La && (counts.get(b) ?? 0) <= (counts.get(a) ?? 0)) ? b : a;
    const to = from === a ? b : a;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === from) cells[i] = to;
    }
  }
}

/** Share of the border ring one bead must hold before background removal
 *  engages — a subject that touches every edge (full-bleed photo) has a
 *  contested ring, and stripping its color would gut the picture. */
const RING_SHARE = 0.5;

/**
 * Background removal: the bead that dominates the board's border ring gets
 * flood-filled from the edges — every ring-connected cell of that color
 * becomes an empty pegboard cell and leaves the bead count. Interior
 * islands of the same color (a white shirt on a white wall) survive.
 */
function removeBackgroundCells(cells: (string | null)[], cols: number, rows: number): void {
  const ring: number[] = [];
  for (let x = 0; x < cols; x++) {
    ring.push(x, (rows - 1) * cols + x);
  }
  for (let y = 0; y < rows; y++) {
    ring.push(y * cols, y * cols + cols - 1);
  }
  const counts = new Map<string, number>();
  for (const i of ring) {
    const id = cells[i];
    if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  let bg = '';
  let bgN = 0;
  for (const [id, n] of counts) {
    if (n > bgN) {
      bgN = n;
      bg = id;
    }
  }
  if (!bg || bgN / ring.length < RING_SHARE) return;
  // flood fill from every ring cell that carries the background bead
  const seen = new Uint8Array(cols * rows);
  const stack: number[] = [];
  for (const i of ring) {
    if (cells[i] === bg && !seen[i]) {
      seen[i] = 1;
      stack.push(i);
    }
  }
  while (stack.length) {
    const i = stack.pop()!;
    cells[i] = null;
    const x = i % cols;
    const y = (i - x) / cols;
    if (x > 0 && !seen[i - 1] && cells[i - 1] === bg) (seen[i - 1] = 1), stack.push(i - 1);
    if (x < cols - 1 && !seen[i + 1] && cells[i + 1] === bg) (seen[i + 1] = 1), stack.push(i + 1);
    if (y > 0 && !seen[i - cols] && cells[i - cols] === bg) (seen[i - cols] = 1), stack.push(i - cols);
    if (y < rows - 1 && !seen[i + cols] && cells[i + cols] === bg)
      (seen[i + cols] = 1), stack.push(i + cols);
  }
}

/**
 * Dark outline: the darkest bead on the board repaints every cell that
 * touches an empty one, tracing the cut-out subject's silhouette — the
 * shape stays readable even where edge sampling dragged the rim light.
 */
function outlineEdges(cells: (string | null)[], cols: number, rows: number): void {
  let darkest = '';
  let minL = Infinity;
  for (const c of cells) {
    if (!c) continue;
    const L = BEAD_L.get(c) ?? Infinity;
    if (L < minL) {
      minL = L;
      darkest = c;
    }
  }
  if (!darkest) return;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      if (!cells[i]) continue;
      const touchesEmpty =
        (x > 0 && cells[i - 1] === null) ||
        (x < cols - 1 && cells[i + 1] === null) ||
        (y > 0 && cells[i - cols] === null) ||
        (y < rows - 1 && cells[i + cols] === null);
      if (touchesEmpty) cells[i] = darkest;
    }
  }
}

export function photoToPattern(img: SampleImage, opts: PhotoOpts): PhotoPattern {
  if (!img.width || !img.height || img.data.length < img.width * img.height * 4) {
    return { cols: 0, rows: 0, cells: [] };
  }
  const cols = Math.max(MIN_COLS, Math.min(MAX_COLS, Math.round(opts.cols)));
  // screenshot/scan margins go first — the board belongs to the art
  const rect = trimUniformBorder(img);
  const w = rect.x1 - rect.x0;
  const h = rect.y1 - rect.y0;
  // aspect-following height (of the trimmed art); capped, so extreme
  // panoramas compress rather than mint an unbuildable board
  const rows = Math.max(MIN_COLS, Math.min(MAX_ROWS, Math.round((h / w) * cols)));

  // per-cell color sampled once — both pipelines share it
  const labs: Oklab[] = new Array(cols * rows);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const { x0, y0, x1, y1 } = cellRect(img, rect, cols, rows, x, y);
      labs[y * cols + x] = cellColor(img, x0, y0, x1, y1);
    }
  }

  const max = opts.maxColors ?? BEAD_COLORS.length;
  let cells: (string | null)[];

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
    // region (near-duplicate beads merged) → majority-vote passes →
    // boundary stragglers join their strongest neighbor
    cells = adoptIsolated(
      despeckle(despeckle(clusterCells(labs, max), cols, rows, 7), cols, rows, 6),
      cols,
      rows,
    );
  }

  // source-site post passes, in their order: merge near shades, then strip
  // the edge-connected background, then trace the cut-out's edge dark — the
  // outline needs the empties background removal produces
  simplifyShades(cells, SIMPLIFY_T[opts.simplify ?? 'balanced']);
  if (opts.removeBackground) removeBackgroundCells(cells, cols, rows);
  if (opts.darkOutline) outlineEdges(cells, cols, rows);

  return { cols, rows, cells };
}
