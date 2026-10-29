/**
 * Perler bead letters — the full alphabet A–Z plus digits 0–9, each glyph a
 * 5×7 grid in one solid color (keyword family: perler bead letters 260 +
 * perler bead alphabet 110, 2026-10-29 pull). Deliberately NOT part of the
 * BEAD_PATTERNS catalog: these render inline on /perler-bead-letters/ as one
 * printable sheet (spell-a-name, classroom strips), not as 36 detail pages —
 * the word family doesn't warrant that many URLs yet. Counts (11–20 beads
 * per glyph) are computed by buildPattern at page level and locked by the
 * guard test; the SEO copy cites the same range.
 */
import type { BeadPatternDef } from '../lib/beadTypes';
import { beadById } from '../lib/beadPalette';

/** 5-wide × 7-tall glyphs; 'X' = bead, '.' = empty peg. */
const GLYPHS: Record<string, string[]> = {
  A: ['..X..', '.X.X.', 'X...X', 'X...X', 'XXXXX', 'X...X', 'X...X'],
  B: ['XXXX.', 'X...X', 'X...X', 'XXXX.', 'X...X', 'X...X', 'XXXX.'],
  C: ['.XXXX', 'X....', 'X....', 'X....', 'X....', 'X....', '.XXXX'],
  D: ['XXXX.', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', 'XXXX.'],
  E: ['XXXXX', 'X....', 'X....', 'XXXX.', 'X....', 'X....', 'XXXXX'],
  F: ['XXXXX', 'X....', 'X....', 'XXXX.', 'X....', 'X....', 'X....'],
  G: ['.XXXX', 'X....', 'X....', 'X.XXX', 'X...X', 'X...X', '.XXXX'],
  H: ['X...X', 'X...X', 'X...X', 'XXXXX', 'X...X', 'X...X', 'X...X'],
  I: ['XXXXX', '..X..', '..X..', '..X..', '..X..', '..X..', 'XXXXX'],
  J: ['..XXX', '...X.', '...X.', '...X.', '...X.', 'X..X.', '.XX..'],
  K: ['X...X', 'X..X.', 'X.X..', 'XX...', 'X.X..', 'X..X.', 'X...X'],
  L: ['X....', 'X....', 'X....', 'X....', 'X....', 'X....', 'XXXXX'],
  M: ['X...X', 'XX.XX', 'X.X.X', 'X.X.X', 'X...X', 'X...X', 'X...X'],
  N: ['X...X', 'XX..X', 'X.X.X', 'X..XX', 'X...X', 'X...X', 'X...X'],
  O: ['.XXX.', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'],
  P: ['XXXX.', 'X...X', 'X...X', 'XXXX.', 'X....', 'X....', 'X....'],
  Q: ['.XXX.', 'X...X', 'X...X', 'X...X', 'X.X.X', 'X..X.', '.XX.X'],
  R: ['XXXX.', 'X...X', 'X...X', 'XXXX.', 'X.X..', 'X..X.', 'X...X'],
  S: ['.XXXX', 'X....', 'X....', '.XXX.', '....X', '....X', 'XXXX.'],
  T: ['XXXXX', '..X..', '..X..', '..X..', '..X..', '..X..', '..X..'],
  U: ['X...X', 'X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.XXX.'],
  V: ['X...X', 'X...X', 'X...X', 'X...X', 'X...X', '.X.X.', '..X..'],
  W: ['X...X', 'X...X', 'X...X', 'X.X.X', 'X.X.X', 'XX.XX', 'X...X'],
  X: ['X...X', 'X...X', '.X.X.', '..X..', '.X.X.', 'X...X', 'X...X'],
  Y: ['X...X', 'X...X', '.X.X.', '..X..', '..X..', '..X..', '..X..'],
  Z: ['XXXXX', '....X', '...X.', '..X..', '.X...', 'X....', 'XXXXX'],
  '0': ['.XXX.', 'X...X', 'X..XX', 'X.X.X', 'XX..X', 'X...X', '.XXX.'],
  '1': ['..X..', '.XX..', '..X..', '..X..', '..X..', '..X..', 'XXXXX'],
  '2': ['.XXX.', 'X...X', '....X', '...X.', '..X..', '.X...', 'XXXXX'],
  '3': ['XXXXX', '...X.', '..X..', '...X.', '....X', 'X...X', '.XXX.'],
  '4': ['...X.', '..XX.', '.X.X.', 'X..X.', 'XXXXX', '...X.', '...X.'],
  '5': ['XXXXX', 'X....', 'XXXX.', '....X', '....X', 'X...X', '.XXX.'],
  '6': ['.XXX.', 'X....', 'X....', 'XXXX.', 'X...X', 'X...X', '.XXX.'],
  '7': ['XXXXX', '....X', '...X.', '..X..', '.X...', '.X...', '.X...'],
  '8': ['.XXX.', 'X...X', 'X...X', '.XXX.', 'X...X', 'X...X', '.XXX.'],
  '9': ['.XXX.', 'X...X', 'X...X', '.XXXX', '....X', '....X', '.XXX.'],
};

/** Bright classroom cycle — red through pink, repeating across the alphabet. */
const CYCLE = [
  'red',
  'tangerine',
  'sunflower',
  'kiwi-lime',
  'teal',
  'cobalt',
  'grape',
  'bubblegum',
] as const;

function glyphBeads(rows: string[]): number {
  return rows.join('').split('').filter((c) => c === 'X').length;
}

export const BEAD_LETTERS: BeadPatternDef[] = Object.entries(GLYPHS).map(
  ([ch, rows], i) => {
    const isDigit = ch >= '0' && ch <= '9';
    const colorId = CYCLE[i % CYCLE.length]!;
    const colorName = beadById(colorId)?.name ?? colorId;
    const beads = glyphBeads(rows);
    const name = isDigit ? `Number ${ch}` : `Letter ${ch}`;
    return {
      slug: isDigit ? `digit-${ch}` : `letter-${ch.toLowerCase()}`,
      name,
      // 'minis' parks the defs in the smallest-board category for typing only
      // — these never enter BEAD_PATTERNS, so they get no detail URL.
      category: 'minis',
      difficulty: 'easy',
      width: 5,
      tagline: `${beads} beads in ${colorName.toLowerCase()} — one color, 5 × 7 grid.`,
      blurb: `${name} on a 5 × 7 bead grid: ${beads} beads of ${colorName.toLowerCase()}, no other colors. Print the alphabet sheet and place the letters you need.`,
      regions: { X: { label: colorName.toLowerCase(), color: colorId } },
      rows,
    };
  },
);
