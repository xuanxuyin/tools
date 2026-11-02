/**
 * Photo → fuse-bead pattern engine, rebuilt on the source-site converter's
 * pipeline (user call, 2026-10-29: same settings must land the same fidelity
 * as theirs). Pure functions, no DOM.
 *
 *  1. Identify-first quantization (smooth mode): up to 32 k-means clusters
 *     group the photo's real colors, each cluster snaps to its nearest
 *     palette bead, every pixel inherits its cluster's bead. Transparent
 *     pixels (alpha < 32) carry no bead.
 *  2. Area-weighted resample: every board cell covers a float rectangle of
 *     source pixels; each pixel contributes by its exact intersecting area,
 *     weighted by alpha. Smooth mode takes the cell's MAJORITY bead —
 *     discrete identification, no invented mix colors. Dither mode keeps
 *     the linear-light mean as Floyd–Steinberg's continuous input. Cells
 *     whose average alpha lands under 24 become empty pegboard —
 *     transparent PNG backgrounds vanish for free.
 *  3. Full-palette match, per cell, in Oklab plus a chroma guard (the
 *     source-site distance): gray cells can't be stolen by vivid beads, and
 *     sibling shades keep their saturation relationships. Majority cells
 *     already carry a bead's own Oklab, so this pass is a no-op for them.
 *  4. Shade merge (Keep/Balanced/Bold): while the closest pair of used beads
 *     sits under the threshold, the less chromatic one folds into the more
 *     chromatic one. Nothing is pre-clustered — every cell keeps its global
 *     best match, which is where the fidelity lives.
 *  5. Color-count cap: while over the limit, drop the used bead with the
 *     smallest count × distance-to-its-nearest-neighbor — rare-but-redundant
 *     dies first, rare-but-unique survives — then re-match the whole board
 *     against the survivors. Dark outline reserves one seat for the darkest
 *     bead by capping the palette one lower.
 *  6. Remove background: the border ring's dominant bead flood-fills inward
 *     through beads within RGB 36 of it; interior islands of the same color
 *     survive.
 *  7. Dark outline: non-empty cells touching an empty one get the palette's
 *     darkest bead — the silhouette stays crisp even where edge sampling
 *     lightened the rim.
 *
 * 'dither' keeps a Floyd–Steinberg pipeline (Oklab error, serpentine scan)
 * for gradient-heavy pictures; the converter UI ships 'smooth'.
 */
import { rgbToOklab, hexToRgb, srgbToLinear, linearToSrgb, type Oklab } from './color';
import { MARD_COLORS } from './mardPalette';

export interface SampleImage {
  /** RGBA, 4 bytes per pixel, row-major — ImageData shaped */
  data: Uint8ClampedArray | number[];
  width: number;
  height: number;
}

export type PhotoMode = 'smooth' | 'dither';

/** Color-simplification levels — the merge threshold between used beads:
 *  Keep shades merges nothing, Bold collapses whole color families. */
export type PhotoSimplify = 'keep' | 'balanced' | 'bold';

export interface PhotoOpts {
  /** Board width in beads; height follows the photo's aspect ratio */
  cols: number;
  mode: PhotoMode;
  /** 1..291; defaults to the full palette (no cap) */
  maxColors?: number;
  /** Near-duplicate shade merging strength; defaults to 'balanced' */
  simplify?: PhotoSimplify;
  /** Strip the edge-connected background: its cells become empty pegboard
   *  and drop out of the bead count. Defaults to false (engine layer);
   *  the converter UI ships it checked, like the source site. */
  removeBackground?: boolean;
  /** Trace the subject's edge with the palette's darkest bead so the
   *  silhouette stays crisp even where sampling lightened it. */
  darkOutline?: boolean;
}

export interface PhotoPattern {
  cols: number;
  rows: number;
  /** cells[y * cols + x] = bead id, or null for an empty pegboard cell
   *  (removed background or transparent source pixel). */
  cells: (string | null)[];
}

const MIN_COLS = 8;
const MAX_COLS = 200;
const MAX_ROWS = 200;

/** Bead cache — rgb, Oklab, luma and chroma precomputed once per load. */
interface BeadEntry {
  id: string;
  rgb: [number, number, number];
  lab: Oklab;
  luma: number;
  chroma: number;
}

const PALETTE: BeadEntry[] = MARD_COLORS.map((b) => {
  const rgb = hexToRgb(b.hex);
  const lab = rgbToOklab(rgb);
  return {
    id: b.id,
    rgb: [rgb.r, rgb.g, rgb.b],
    lab,
    luma: (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255,
    chroma: Math.hypot(lab.a, lab.b),
  };
});

const PALETTE_BY_ID = new Map(PALETTE.map((b) => [b.id, b]));

/** The palette's darkest bead by luma — the dark-outline tracer. Fixed, so
 *  the silhouette color never depends on what the photo happened to use. */
const DARKEST = PALETTE.reduce((a, b) => (b.luma < a.luma ? b : a));

/** The source-site matching distance: plain Oklab, plus a chroma guard —
 *  any chroma gap is penalized 0.35×, and a low-chroma (gray) source cell
 *  punishes vivid candidates hard (0.75× their extra chroma) so shadows and
 *  grays don't come out cartoon-saturated. */
function matchDistance(src: Oklab, srcChroma: number, cand: BeadEntry): number {
  const d = Math.hypot(src.L - cand.lab.L, src.a - cand.lab.a, src.b - cand.lab.b);
  const gap = Math.abs(srcChroma - cand.chroma);
  const vivid = Math.max(0, cand.chroma - srcChroma);
  return d + 0.35 * gap + 0.75 * (srcChroma < 0.12 ? vivid : 0.35 * vivid);
}

function nearestBead(lab: Oklab, subset: Set<string> | null): BeadEntry {
  const chroma = Math.hypot(lab.a, lab.b);
  let best: BeadEntry | null = null;
  let bestD = Infinity;
  for (const b of PALETTE) {
    if (subset && !subset.has(b.id)) continue;
    const d = matchDistance(lab, chroma, b);
    if (d < bestD) {
      bestD = d;
      best = b;
    }
  }
  return best ?? PALETTE[0]!;
}

/** One resampled cell. `empty` cells never enter matching or counting. */
interface Cell {
  rgb: [number, number, number];
  lab: Oklab;
  empty: boolean;
}

/** Average alpha (0..255) under which a cell counts as pegboard, not bead —
 *  the source-site cutoff for transparent backgrounds. */
const EMPTY_ALPHA = 24;

/** sRGB 0..255 → linear light, precomputed — every resampled pixel walks
 *  this table, so gamma-correct averaging costs one array read per channel. */
const LINEAR = (() => {
  const t = new Float64Array(256);
  for (let i = 0; i < 256; i++) t[i] = srgbToLinear(i / 255);
  return t;
})();

/* --------------------- identify-first quantization --------------------- */

/** Quantization budget: k-means centers over a sampled pixel subset, and
 *  the serpentine cap on iterations. 32 clusters absorb real photos' color
 *  variety while staying far below the 291-bead palette. */
const QUANT_K = 32;
const QUANT_SAMPLES = 24000;
const QUANT_ITERS = 16;

/** Sentinel palette index: pixel too transparent to carry a bead. */
const NO_BEAD = 0xffff;

/** Pixel (RGBA at data offset i) → Oklab triple written flat into `o`.
 *  Object-free on purpose: quantization walks millions of pixels, and a
 *  `{…}` per pixel is GC churn. Same math as color.ts rgbToOklab. */
function pixelLab(data: ArrayLike<number>, i: number, o: Float64Array, oi: number): void {
  const lr = LINEAR[data[i]!]!;
  const lg = LINEAR[data[i + 1]!]!;
  const lb = LINEAR[data[i + 2]!]!;
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  o[oi] = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  o[oi + 1] = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  o[oi + 2] = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
}

const IDX_OF_BEAD = new Map(PALETTE.map((b, i) => [b, i]));

/**
 * Identify-first quantization (user call, 2026-11-02: "依然会有杂色…
 * 识别的区域和原图有差异…颜色也有误差 — 寻找更精确的解决方案").
 *
 * Averaging colors across a cell INVENTS colors the picture never had; the
 * precise order is identify first, count second. Up to 32 k-means clusters
 * (Oklab space, deterministic farthest-point init — no RNG, so the same
 * photo always converts to the same board) group the photo's real colors;
 * every cluster snaps to its nearest palette bead; every pixel inherits
 * its cluster's bead identity. The resampler then takes each cell's
 * MAJORITY bead — a discrete count of real identifications — so a seam
 * cell can't birth a third color, and a region's beads are the beads its
 * pixels actually are. Transparent pixels (alpha < 32) carry NO_BEAD and
 * drop out of every tally.
 */
function quantizeBeads(img: SampleImage): Uint16Array {
  const { data, width, height } = img;
  const n = width * height;
  const out = new Uint16Array(n).fill(NO_BEAD);

  // sample opaque pixels (stride-subsampled) into a flat Oklab pool
  const step = Math.max(1, Math.floor(n / QUANT_SAMPLES));
  const pool = new Float64Array(Math.ceil(n / step) * 3);
  let m = 0;
  const scratch = new Float64Array(3);
  for (let i = 0; i < n; i += step) {
    if (data[i * 4 + 3]! < 32) continue;
    pixelLab(data, i * 4, scratch, 0);
    pool[m * 3] = scratch[0]!;
    pool[m * 3 + 1] = scratch[1]!;
    pool[m * 3 + 2] = scratch[2]!;
    m++;
  }
  if (m === 0) return out;
  const k = Math.min(QUANT_K, m);

  const centers = new Float64Array(k * 3);
  // farthest-point init: c0 is sample 0; each next center is the sample
  // whose distance to its nearest chosen center is largest. Fully
  // deterministic (a seeded RNG could wobble the whole board).
  centers[0] = pool[0]!;
  centers[1] = pool[1]!;
  centers[2] = pool[2]!;
  const near = new Float64Array(m).fill(Infinity);
  for (let c = 1; c < k; c++) {
    const p = (c - 1) * 3;
    let best = -1;
    let bestD = -1;
    for (let i = 0; i < m; i++) {
      const dL = pool[i * 3]! - centers[p]!;
      const da = pool[i * 3 + 1]! - centers[p + 1]!;
      const db = pool[i * 3 + 2]! - centers[p + 2]!;
      const d = dL * dL + da * da + db * db;
      if (d < near[i]!) near[i] = d;
      if (near[i]! > bestD) {
        bestD = near[i]!;
        best = i;
      }
    }
    const q = c * 3;
    if (best < 0 || bestD <= 0) {
      // degenerate (identical samples): reuse center 0 — the empty-cluster
      // guard below keeps the extra centers from stealing pixels
      centers[q] = centers[0]!;
      centers[q + 1] = centers[1]!;
      centers[q + 2] = centers[2]!;
    } else {
      centers[q] = pool[best * 3]!;
      centers[q + 1] = pool[best * 3 + 1]!;
      centers[q + 2] = pool[best * 3 + 2]!;
    }
  }

  // Lloyd iterations
  const sums = new Float64Array(k * 3);
  const counts = new Uint32Array(k);
  for (let it = 0; it < QUANT_ITERS; it++) {
    sums.fill(0);
    counts.fill(0);
    for (let i = 0; i < m; i++) {
      let best = 0;
      let bestD = Infinity;
      for (let c = 0; c < k; c++) {
        const dL = pool[i * 3]! - centers[c * 3]!;
        const da = pool[i * 3 + 1]! - centers[c * 3 + 1]!;
        const db = pool[i * 3 + 2]! - centers[c * 3 + 2]!;
        const d = dL * dL + da * da + db * db;
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      sums[best * 3] += pool[i * 3]!;
      sums[best * 3 + 1] += pool[i * 3 + 1]!;
      sums[best * 3 + 2] += pool[i * 3 + 2]!;
      counts[best]++;
    }
    for (let c = 0; c < k; c++) {
      if (counts[c] === 0) {
        // re-seed an empty cluster on the sample farthest from its center
        let far = 0;
        let farD = -1;
        for (let i = 0; i < m; i++) {
          let nd = Infinity;
          for (let c2 = 0; c2 < k; c2++) {
            const dL = pool[i * 3]! - centers[c2 * 3]!;
            const da = pool[i * 3 + 1]! - centers[c2 * 3 + 1]!;
            const db = pool[i * 3 + 2]! - centers[c2 * 3 + 2]!;
            const d = dL * dL + da * da + db * db;
            if (d < nd) nd = d;
          }
          if (nd > farD) {
            farD = nd;
            far = i;
          }
        }
        centers[c * 3] = pool[far * 3]!;
        centers[c * 3 + 1] = pool[far * 3 + 1]!;
        centers[c * 3 + 2] = pool[far * 3 + 2]!;
      } else {
        centers[c * 3] = sums[c * 3]! / counts[c]!;
        centers[c * 3 + 1] = sums[c * 3 + 1]! / counts[c]!;
        centers[c * 3 + 2] = sums[c * 3 + 2]! / counts[c]!;
      }
    }
  }

  // snap each center to its bead, then stamp every pixel with it
  const centerBead = new Uint16Array(k);
  for (let c = 0; c < k; c++) {
    const bead = nearestBead({ L: centers[c * 3]!, a: centers[c * 3 + 1]!, b: centers[c * 3 + 2]! }, null);
    centerBead[c] = IDX_OF_BEAD.get(bead)!;
  }
  for (let i = 0; i < n; i++) {
    if (data[i * 4 + 3]! < 32) continue;
    pixelLab(data, i * 4, scratch, 0);
    let best = 0;
    let bestD = Infinity;
    for (let c = 0; c < k; c++) {
      const dL = scratch[0]! - centers[c * 3]!;
      const da = scratch[1]! - centers[c * 3 + 1]!;
      const db = scratch[2]! - centers[c * 3 + 2]!;
      const d = dL * dL + da * da + db * db;
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    out[i] = centerBead[best]!;
  }
  return out;
}

/**
 * Area-weighted resample: cell (x, y) covers the float rectangle
 * [x·w/cols, (x+1)·w/cols) × [y·h/rows, (y+1)·h/rows) of source pixels,
 * each pixel contributing by its exact intersecting area times its alpha —
 * no pixel dropped (nearest-neighbor decode does), none double-counted.
 *
 * Two flavors:
 *  • smooth (`beadIdx` given): the cell takes the MAJORITY bead of its
 *    pixels — discrete identification beats averaging, which invents
 *    colors. A dead-even tie falls to the left neighbor's bead (then the
 *    top's), so a hard seam snaps to one side instead of sprouting a
 *    phantom band; the linear-light mean decides only where no neighbor
 *    exists. Cells averaging under 24 alpha are empty.
 *  • dither (no `beadIdx`): the classic linear-light mean — gamma-plain
 *    sRGB numbers average dark and muddy (half white + half black is
 *    #BCBCBC in light, not #808080) — because Floyd–Steinberg wants a
 *    continuous tone to diffuse error against.
 */
/** Per-cell bead histogram, shared across cells. Float64 on purpose: the
 *  tallies are fractional (alpha × pixel-area weights), and an integer
 *  array silently truncates 0.386 → 0 — a whole cell of real beads then
 *  reads as "no votes" (that was the phantom-black-bead bug). */
const HIST = new Float64Array(PALETTE.length);

function resampleCells(img: SampleImage, cols: number, rows: number, beadIdx?: Uint16Array): Cell[][] {
  const { data, width, height } = img;
  const grid: Cell[][] = [];
  for (let y = 0; y < rows; y++) {
    const row: Cell[] = [];
    const y0 = (y * height) / rows;
    const y1 = ((y + 1) * height) / rows;
    const py0 = Math.floor(y0);
    const py1 = Math.ceil(y1);
    for (let x = 0; x < cols; x++) {
      const x0 = (x * width) / cols;
      const x1 = ((x + 1) * width) / cols;
      const px0 = Math.floor(x0);
      const px1 = Math.ceil(x1);
      let lr = 0;
      let lg = 0;
      let lb = 0;
      let aWeight = 0;
      let area = 0;
      HIST.fill(0);
      for (let py = py0; py < py1; py++) {
        if (py < 0 || py >= height) continue;
        const wy = Math.min(y1, py + 1) - Math.max(y0, py);
        if (wy <= 0) continue;
        for (let px = px0; px < px1; px++) {
          if (px < 0 || px >= width) continue;
          const wx = Math.min(x1, px + 1) - Math.max(x0, px);
          if (wx <= 0) continue;
          const w = wx * wy;
          const i = (py * width + px) * 4;
          const a = data[i + 3]! / 255;
          lr += LINEAR[data[i]!] * a * w;
          lg += LINEAR[data[i + 1]!] * a * w;
          lb += LINEAR[data[i + 2]!] * a * w;
          aWeight += a * w;
          area += w;
          if (beadIdx) {
            const bi = beadIdx[py * width + px]!;
            if (bi !== NO_BEAD) HIST[bi] += a * w;
          }
        }
      }
      const alpha = area === 0 ? 0 : (aWeight / area) * 255;
      if (aWeight === 0 || alpha < EMPTY_ALPHA) {
        row.push({ rgb: [0, 0, 0], lab: { L: 0, a: 0, b: 0 }, empty: true });
        continue;
      }
      if (beadIdx) {
        // majority bead, tie → left neighbor, tie → top neighbor, tie → mean
        let best = -1;
        let bestN = 0;
        for (let c = 0; c < HIST.length; c++) {
          if (HIST[c]! > bestN) {
            bestN = HIST[c]!;
            best = c;
          }
        }
        let bead: BeadEntry;
        if (best < 0) {
          // every pixel was too transparent for a bead yet the cell averages
          // ≥24 alpha (the 24..32 gray zone): fall back to the cell's mean
          const rgb: [number, number, number] = [
            Math.round(linearToSrgb(lr / aWeight) * 255),
            Math.round(linearToSrgb(lg / aWeight) * 255),
            Math.round(linearToSrgb(lb / aWeight) * 255),
          ];
          bead = nearestBead(rgbToOklab({ r: rgb[0], g: rgb[1], b: rgb[2] }), null);
        } else {
          let tied = false;
          for (let c = 0; c < HIST.length; c++) {
            if (c !== best && HIST[c] === bestN) {
              tied = true;
              break;
            }
          }
          const left = x > 0 ? row[x - 1] : undefined;
          const top = y > 0 ? grid[y - 1]![x] : undefined;
          const neighbor = left && !left.empty ? left : top && !top.empty ? top : null;
          if (!tied) {
            bead = PALETTE[best]!;
          } else if (neighbor) {
            // a neighbor cell's lab IS a bead's lab (majority cells carry
            // their bead's color), so nearest match returns that same bead
            bead = nearestBead(neighbor.lab, null);
          } else {
            const rgb: [number, number, number] = [
              Math.round(linearToSrgb(lr / aWeight) * 255),
              Math.round(linearToSrgb(lg / aWeight) * 255),
              Math.round(linearToSrgb(lb / aWeight) * 255),
            ];
            bead = nearestBead(rgbToOklab({ r: rgb[0], g: rgb[1], b: rgb[2] }), null);
          }
        }
        row.push({ rgb: bead.rgb, lab: bead.lab, empty: false });
        continue;
      }
      const rgb: [number, number, number] = [
        Math.round(linearToSrgb(lr / aWeight) * 255),
        Math.round(linearToSrgb(lg / aWeight) * 255),
        Math.round(linearToSrgb(lb / aWeight) * 255),
      ];
      row.push({ rgb, lab: rgbToOklab({ r: rgb[0], g: rgb[1], b: rgb[2] }), empty: false });
    }
    grid.push(row);
  }
  return grid;
}

/** Shade-merge thresholds between used beads, straight from the source
 *  site: Keep merges nothing, Balanced folds sibling shades, Bold collapses
 *  color families. */
const MERGE_T: Record<PhotoSimplify, number> = { keep: 0, balanced: 0.1, bold: 0.14 };

interface ColorUse {
  bead: BeadEntry;
  count: number;
}

/** While the closest pair of used beads sits under the threshold, the less
 *  chromatic (then less frequent) one folds into the other — saturation
 *  survives, mud doesn't. */
function mergeShades(uses: ColorUse[], threshold: number): ColorUse[] {
  const out = uses.map((u) => ({ ...u }));
  for (;;) {
    if (out.length < 2) return out;
    let ia = -1;
    let ib = -1;
    let minD = Infinity;
    for (let i = 0; i < out.length; i++) {
      for (let j = i + 1; j < out.length; j++) {
        const la = out[i]!.bead.lab;
        const lb = out[j]!.bead.lab;
        const d = Math.hypot(la.L - lb.L, la.a - lb.a, la.b - lb.b);
        if (d < minD) {
          minD = d;
          ia = i;
          ib = j;
        }
      }
    }
    if (minD >= threshold) return out;
    const a = out[ia]!;
    const b = out[ib]!;
    const keep =
      a.bead.chroma > b.bead.chroma ||
      (a.bead.chroma === b.bead.chroma && a.count >= b.count)
        ? a
        : b;
    const drop = keep === a ? b : a;
    keep.count += drop.count;
    out.splice(out.indexOf(drop), 1);
  }
}

/** Cap the palette: while over the limit, drop the bead whose
 *  count × distance-to-nearest-surviving-neighbor is smallest. A bead that
 *  is rare but far from everything else stays — it's a real color the
 *  picture needs; a rare bead sitting next to a popular one goes first. */
function fitLimit(uses: ColorUse[], limit: number): ColorUse[] {
  const out = uses.map((u) => ({ ...u }));
  while (out.length > Math.max(0, limit)) {
    let victim = 0;
    let worst = Infinity;
    for (let i = 0; i < out.length; i++) {
      let nearest = Infinity;
      for (let j = 0; j < out.length; j++) {
        if (i === j) continue;
        const la = out[i]!.bead.lab;
        const lb = out[j]!.bead.lab;
        const d = Math.hypot(la.L - lb.L, la.a - lb.a, la.b - lb.b);
        if (d < nearest) nearest = d;
      }
      const score = out[i]!.count * nearest;
      if (score < worst) {
        worst = score;
        victim = i;
      }
    }
    out.splice(victim, 1);
  }
  return out;
}

/** A bead counts as background if its RGB sits within this distance of the
 *  ring's dominant bead — near-duplicate background shades go with it. */
const BG_RGB_T = 36;

/**
 * Background removal: the bead holding the border ring's plurality
 * flood-fills from the edges through every bead within RGB 36 of it — those
 * cells become empty pegboard. Interior islands of the same color (a white
 * shirt on a white wall) survive; only the edge-connected region goes.
 */
function removeBackgroundCells(cells: (string | null)[], cols: number, rows: number): void {
  if (!cols || !rows) return;
  const counts = new Map<string, number>();
  const tally = (i: number): void => {
    const id = cells[i];
    if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
  };
  for (let x = 0; x < cols; x++) {
    tally(x);
    tally((rows - 1) * cols + x);
  }
  for (let y = 0; y < rows; y++) {
    tally(y * cols);
    tally(y * cols + cols - 1);
  }
  let bgId = '';
  let bgN = 0;
  for (const [id, n] of counts) {
    if (n > bgN) {
      bgN = n;
      bgId = id;
    }
  }
  if (!bgId) return;
  const bg = PALETTE_BY_ID.get(bgId)!;
  const isBg = (id: string | null): boolean => {
    if (!id) return true;
    const c = PALETTE_BY_ID.get(id);
    if (!c) return false;
    return Math.hypot(c.rgb[0] - bg.rgb[0], c.rgb[1] - bg.rgb[1], c.rgb[2] - bg.rgb[2]) <= BG_RGB_T;
  };
  const seen = new Uint8Array(cols * rows);
  const stack: number[] = [];
  const push = (i: number): void => {
    if (!seen[i]) {
      seen[i] = 1;
      stack.push(i);
    }
  };
  for (let x = 0; x < cols; x++) {
    push(x);
    push((rows - 1) * cols + x);
  }
  for (let y = 0; y < rows; y++) {
    push(y * cols);
    push(y * cols + cols - 1);
  }
  while (stack.length) {
    const i = stack.pop()!;
    if (!isBg(cells[i])) continue;
    cells[i] = null;
    const x = i % cols;
    const y = (i - x) / cols;
    if (x > 0) push(i - 1);
    if (x < cols - 1) push(i + 1);
    if (y > 0) push(i - cols);
    if (y < rows - 1) push(i + cols);
  }
}

/**
 * Dark outline: non-empty cells with an empty 4-neighbor take the palette's
 * darkest bead, tracing the cut-out's silhouette.
 */
function outlineEdges(cells: (string | null)[], cols: number, rows: number): void {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      if (!cells[i]) continue;
      const touchesEmpty =
        (x > 0 && cells[i - 1] === null) ||
        (x < cols - 1 && cells[i + 1] === null) ||
        (y > 0 && cells[i - cols] === null) ||
        (y < rows - 1 && cells[i + cols] === null);
      if (touchesEmpty) cells[i] = DARKEST.id;
    }
  }
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

/** Oklab distance between two palette beads (same metric as mergeShades). */
function beadDist(a: BeadEntry, b: BeadEntry): number {
  return Math.hypot(a.lab.L - b.lab.L, a.lab.a - b.lab.a, a.lab.b - b.lab.b);
}

/** Slack for the collinearity test below — the matched bead of a true mix
 *  sits ON the p1–p2 segment (palette quantization wobbles it slightly), a
 *  real third color sits far OFF it. Scale-free: works the same for a
 *  red|blue seam (d≈0.28) and a red|dark-red one (d≈0.05). */
const SEG_T = 1.25;

/**
 * Blend-band cleanup (smooth mode): the area-weighted resample turns every
 * color seam into a strip of cells whose average is neither side — those
 * then match a third bead the picture never had. A cell folds into the
 * nearer block when two block colors dominate its 8-neighborhood (the main
 * one covering ≥2 cells, so single-pixel detail can't trigger it), it isn't
 * itself one of the two, and it lies ON the p1–p2 segment: d(cur,p1) +
 * d(cur,p2) ≤ d(p1,p2)·SEG_T. The collinearity guard carries the load — a
 * mix at ANY ratio (25/75, 50/50, 90/10) stays on the segment, while a real
 * third color (outline bead, stray dot, different hue) sits far off it and
 * never qualifies. Gradients never trigger: their cells match to many
 * singleton beads, so no ≥2 block forms. Wide seams whose own color becomes
 * the majority keep themselves. The seam snaps to one side instead of
 * sprouting a phantom band.
 */
function refineBlendCells(grid: (BeadEntry | null)[][], cols: number, rows: number): void {
  const snap = grid.map((row) => row.slice());
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cur = snap[y]![x]!;
      if (!cur) continue;
      const counts = new Map<string, { bead: BeadEntry; n: number }>();
      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= rows) continue;
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = x + dx;
          if (nx < 0 || nx >= cols) continue;
          const nb = snap[ny]![nx]!;
          if (!nb) continue;
          const e = counts.get(nb.id);
          if (e) e.n++;
          else counts.set(nb.id, { bead: nb, n: 1 });
        }
      }
      let p1: { bead: BeadEntry; n: number } | null = null;
      let p2: { bead: BeadEntry; n: number } | null = null;
      for (const e of counts.values()) {
        if (!p1 || e.n > p1.n) {
          p2 = p1;
          p1 = e;
        } else if (!p2 || e.n > p2.n) {
          p2 = e;
        }
      }
      if (!p1 || !p2 || p1.n < 2 || p2.n < 1) continue;
      if (cur.id === p1.bead.id || cur.id === p2.bead.id) continue;
      const d1 = beadDist(cur, p1.bead);
      const d2 = beadDist(cur, p2.bead);
      if (d1 + d2 > beadDist(p1.bead, p2.bead) * SEG_T) continue;
      grid[y]![x] = d1 <= d2 ? p1.bead : p2.bead;
    }
  }
}

export function photoToPattern(img: SampleImage, opts: PhotoOpts): PhotoPattern {
  if (!img.width || !img.height || img.data.length < img.width * img.height * 4) {
    return { cols: 0, rows: 0, cells: [] };
  }
  const cols = Math.max(MIN_COLS, Math.min(MAX_COLS, Math.round(opts.cols)));
  const rows = Math.max(1, Math.min(MAX_ROWS, Math.round((img.height / img.width) * cols)));

  // smooth identifies first (quantize → majority); dither keeps the
  // continuous mean as FS error-diffusion input
  const beadIdx = opts.mode === 'smooth' ? quantizeBeads(img) : null;
  const cellGrid = resampleCells(img, cols, rows, beadIdx ?? undefined);

  // first pass: every cell matched against the full palette
  let grid: (BeadEntry | null)[][] = cellGrid.map((row) =>
    row.map((c) => (c.empty ? null : nearestBead(c.lab, null))),
  );

  const usesOf = (g: (BeadEntry | null)[][]): ColorUse[] => {
    const m = new Map<string, ColorUse>();
    for (const row of g) {
      for (const c of row) {
        if (!c) continue;
        const u = m.get(c.id);
        if (u) u.count++;
        else m.set(c.id, { bead: c, count: 1 });
      }
    }
    return [...m.values()];
  };

  if (opts.mode === 'dither') {
    // gradient pipeline: Floyd–Steinberg over the full palette, serpentine
    // scan (even rows left→right, odd rows right→left) so error diffusion
    // doesn't drag every picture to one side
    grid = cellGrid.map((row) => row.map(() => null));
    const err: (Oklab | undefined)[] = new Array(cols * rows);
    for (let y = 0; y < rows; y++) {
      const ltr = y % 2 === 0;
      for (let k = 0; k < cols; k++) {
        const x = ltr ? k : cols - 1 - k;
        const cell = cellGrid[y]![x]!;
        if (cell.empty) continue;
        const i = y * cols + x;
        const e = err[i];
        const target: Oklab = e
          ? { L: cell.lab.L + e.L, a: cell.lab.a + e.a, b: cell.lab.b + e.b }
          : cell.lab;
        const bead = nearestBead(target, null);
        grid[y]![x] = bead;
        // classic FS: the residual is target − bead, so incoming error is
        // conserved through the board instead of being absorbed per cell
        const d: Oklab = { L: target.L - bead.lab.L, a: target.a - bead.lab.a, b: target.b - bead.lab.b };
        const fwd = ltr ? x + 1 : x - 1;
        const back = ltr ? x - 1 : x + 1;
        spread(err, cols, rows, fwd, y, d, 7 / 16);
        spread(err, cols, rows, back, y + 1, d, 3 / 16);
        spread(err, cols, rows, x, y + 1, d, 5 / 16);
        spread(err, cols, rows, fwd, y + 1, d, 1 / 16);
      }
    }
  }

  // shade merge, then the color cap — anything changed re-matches the whole
  // board against the survivors, so no cell keeps a bead that left the list
  if (opts.mode !== 'dither') refineBlendCells(grid, cols, rows);
  const before = usesOf(grid);
  let uses = mergeShades(before, MERGE_T[opts.simplify ?? 'balanced']);
  const limit = opts.maxColors ?? MARD_COLORS.length;
  // dark outline spends a bead outside the picture's budget — cap one lower
  const effective = opts.darkOutline ? Math.max(1, limit - 1) : limit;
  if (uses.length > effective) uses = fitLimit(uses, effective);
  if (uses.length !== before.length) {
    const subset = new Set(uses.map((u) => u.bead.id));
    grid = grid.map((row) => row.map((c) => (c ? nearestBead(c.lab, subset) : null)));
  }

  const cells: (string | null)[] = new Array(cols * rows).fill(null);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) cells[y * cols + x] = grid[y]![x]?.id ?? null;
  }

  // source-site post passes, in their order: strip the edge-connected
  // background first — the outline needs the empties it produces
  if (opts.removeBackground) removeBackgroundCells(cells, cols, rows);
  if (opts.darkOutline) outlineEdges(cells, cols, rows);

  return { cols, rows, cells };
}
