import { oklabToRgb, rgbToHex } from './color';

/**
 * Hue arrangement test (V2.2 batch B) — a web mini-tribute to the
 * Farnsworth–Munsell 100 Hue Test. Three trays, each with fixed end anchors
 * and ten shuffled tiles; grading is a Spearman-footrule error per tile,
 * drawn as a polar fan in the page. Everything here is a pure function so
 * the build can pre-render a complete, scored demo with zero JavaScript.
 *
 * Hue ring = Oklab hue at constant L/C — the same perceptual engine the
 * mixer uses, which is the honest version of "evenly spaced colors".
 */

/** Lightness / chroma of every tile. Chosen to stay inside sRGB for the
 *  whole ring (edges clamp only slightly) while keeping steps visible. */
export const HUE_L = 0.64;
export const HUE_C = 0.105;
export const ROW_COUNT = 3;
export const ROW_TILES = 10; // movable tiles per row (anchors excluded)
/** Fixed seed → the shipped shuffle (and its demo score) are build-stable. */
export const HUE_SEED = 0x1a4c7;

export function hueToHex(hueDeg: number): string {
  const rad = (hueDeg * Math.PI) / 180;
  return rgbToHex(
    oklabToRgb({ L: HUE_L, a: HUE_C * Math.cos(rad), b: HUE_C * Math.sin(rad) }),
  );
}

/** mulberry32 — small seeded PRNG so dist output never moves between builds. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface HueTile {
  /** Stable id: r<row>-<trueRank>, e.g. "r0-3" */
  id: string;
  row: number;
  /** This tile's home position on the full 360° ring. */
  hue: number;
  hex: string;
  /** Home slot within the row, 0..ROW_TILES-1 (anchors excluded). */
  trueRank: number;
}

export interface HueRowDef {
  row: number;
  anchors: [{ hue: number; hex: string }, { hue: number; hex: string }];
  /** Display order = the shuffled order the page ships in. */
  tiles: HueTile[];
}

/** Row r covers the arc [r·120°, (r+1)·120°]; anchors sit on the ends and
 *  ten tiles cut the inside into eleven even steps. */
export function buildRows(seed: number = HUE_SEED): HueRowDef[] {
  const rand = mulberry32(seed);
  return Array.from({ length: ROW_COUNT }, (_, row) => {
    const start = row * (360 / ROW_COUNT);
    const step = 120 / (ROW_TILES + 1);
    const homeOrder: HueTile[] = Array.from({ length: ROW_TILES }, (_, k) => {
      const hue = start + (k + 1) * step;
      return { id: `r${row}-${k}`, row, hue, hex: hueToHex(hue), trueRank: k };
    });
    // Fisher–Yates on a copy — homeOrder stays sorted for scoring callers.
    const tiles = [...homeOrder];
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j]!, tiles[i]!];
    }
    return {
      row,
      anchors: [
        { hue: start, hex: hueToHex(start) },
        { hue: start + 120, hex: hueToHex(start + 120) },
      ],
      tiles,
    };
  });
}

export interface TileError {
  id: string;
  hue: number;
  hex: string;
  /** |home slot − current slot| for this tile, 0..ROW_TILES-1. */
  error: number;
}

export interface RowScore {
  row: number;
  /** Sum of tile errors, 0..50 (complete reversal). */
  total: number;
  errors: TileError[];
}

/** Footrule scoring: each tile's error is how many slots it sits from home.
 *  Zero = perfect; a single adjacent swap costs exactly 2. */
export function scoreRow(row: HueRowDef, order: HueTile[] = row.tiles): RowScore {
  const errors: TileError[] = order.map((tile, slot) => ({
    id: tile.id,
    hue: tile.hue,
    hex: tile.hex,
    error: Math.abs(slot - tile.trueRank),
  }));
  return { row: row.row, total: errors.reduce((acc, e) => acc + e.error, 0), errors };
}

export function scoreAll(rows: HueRowDef[] = buildRows()): { total: number; rows: RowScore[] } {
  const scored = rows.map((r) => scoreRow(r));
  return { total: scored.reduce((acc, r) => acc + r.total, 0), rows: scored };
}

export interface HueTier {
  label: string;
  blurb: string;
}

/** Tiers are footrule-based, so they're strict: pure random play lands
 *  around ~100 of 150. Each adjacent swap costs 2 — the ladder is honest. */
export function tierFor(total: number): HueTier {
  if (total <= 0) return { label: 'Perfect', blurb: 'Every tile home. Professional color-vision territory.' };
  if (total <= 6) return { label: 'Elite', blurb: 'At most three adjacent swaps away from perfect — a sharp eye for hue steps.' };
  if (total <= 15) return { label: 'Sharp', blurb: 'Mostly ordered with a few local slips — the range most designers land in.' };
  if (total <= 30) return { label: 'Solid', blurb: 'The big arcs are right; neighboring hues are blending for you.' };
  if (total <= 60) return { label: 'Warming up', blurb: 'Some rows came together, others scattered — lighting and screen calibration matter here.' };
  return { label: 'Scrambled', blurb: 'The hues ran circles around you. Try brighter lighting, check your screen, and run it again.' };
}
