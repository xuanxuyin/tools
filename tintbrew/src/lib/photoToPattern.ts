/**
 * Photo → fuse-bead pattern engine, rebuilt on the source-site converter's
 * pipeline (user call, 2026-10-29: same settings must land the same fidelity
 * as theirs). Pure functions, no DOM.
 *
 *  1. Area-weighted resample: every board cell covers a float rectangle of
 *     source pixels; each pixel contributes by its exact intersecting area,
 *     weighted by alpha. Cells whose average alpha lands under 24 become
 *     empty pegboard — transparent PNG backgrounds vanish for free.
 *  2. Full-palette match, per cell, in Oklab plus a chroma guard (the
 *     source-site distance): gray cells can't be stolen by vivid beads, and
 *     sibling shades keep their saturation relationships.
 *  3. Shade merge (Keep/Balanced/Bold): while the closest pair of used beads
 *     sits under the threshold, the less chromatic one folds into the more
 *     chromatic one. Nothing is pre-clustered — every cell keeps its global
 *     best match, which is where the fidelity lives.
 *  4. Color-count cap: while over the limit, drop the used bead with the
 *     smallest count × distance-to-its-nearest-neighbor — rare-but-redundant
 *     dies first, rare-but-unique survives — then re-match the whole board
 *     against the survivors. Dark outline reserves one seat for the darkest
 *     bead by capping the palette one lower.
 *  5. Remove background: the border ring's dominant bead flood-fills inward
 *     through beads within RGB 36 of it; interior islands of the same color
 *     survive.
 *  6. Dark outline: non-empty cells touching an empty one get the palette's
 *     darkest bead — the silhouette stays crisp even where edge sampling
 *     lightened the rim.
 *
 * 'dither' keeps a Floyd–Steinberg pipeline (Oklab error, serpentine scan)
 * for gradient-heavy pictures; the converter UI ships 'smooth'.
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

/** Color-simplification levels — the merge threshold between used beads:
 *  Keep shades merges nothing, Bold collapses whole color families. */
export type PhotoSimplify = 'keep' | 'balanced' | 'bold';

export interface PhotoOpts {
  /** Board width in beads; height follows the photo's aspect ratio */
  cols: number;
  mode: PhotoMode;
  /** 1..16; defaults to the full palette */
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

const PALETTE: BeadEntry[] = BEAD_COLORS.map((b) => {
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

/**
 * Area-weighted resample, the source-site way: cell (x, y) covers the float
 * rectangle [x·w/cols, (x+1)·w/cols) × [y·h/rows, (y+1)·h/rows) of source
 * pixels. Every pixel contributes by its exact intersecting area times its
 * alpha, so upscaling and awkward ratios stay unbiased — no pixel is dropped
 * (nearest-neighbor decode does) and none is double-counted. The cell color
 * is the alpha-weighted sRGB mean; cells averaging under 24 alpha are empty.
 */
function resampleCells(img: SampleImage, cols: number, rows: number): Cell[][] {
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
      let r = 0;
      let g = 0;
      let b = 0;
      let aWeight = 0;
      let area = 0;
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
          r += data[i]! * a * w;
          g += data[i + 1]! * a * w;
          b += data[i + 2]! * a * w;
          aWeight += a * w;
          area += w;
        }
      }
      const alpha = area === 0 ? 0 : (aWeight / area) * 255;
      if (aWeight === 0 || alpha < EMPTY_ALPHA) {
        row.push({ rgb: [0, 0, 0], lab: { L: 0, a: 0, b: 0 }, empty: true });
        continue;
      }
      const rgb: [number, number, number] = [
        Math.round(r / aWeight),
        Math.round(g / aWeight),
        Math.round(b / aWeight),
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

export function photoToPattern(img: SampleImage, opts: PhotoOpts): PhotoPattern {
  if (!img.width || !img.height || img.data.length < img.width * img.height * 4) {
    return { cols: 0, rows: 0, cells: [] };
  }
  const cols = Math.max(MIN_COLS, Math.min(MAX_COLS, Math.round(opts.cols)));
  const rows = Math.max(1, Math.min(MAX_ROWS, Math.round((img.height / img.width) * cols)));

  const cellGrid = resampleCells(img, cols, rows);

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
  const before = usesOf(grid);
  let uses = mergeShades(before, MERGE_T[opts.simplify ?? 'balanced']);
  const limit = opts.maxColors ?? BEAD_COLORS.length;
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
