/**
 * Palette invariants. The palette is the official 103-color Perler line
 * (P1–P103, community-measured hexes — see the beadPalette.ts header), so
 * these guards check line integrity rather than hand-tuned spacing: codes
 * form the full P1..P103 set with no duplicates, ids/hexes stay unique, and
 * the color-space sweep stays honest — every photo-plausible cell within
 * 0.18 Oklab of some bead. The old 48-color guards (≥ 0.04 min spacing,
 * whole 8-swatch rows) retired with the hand-tuned palette: a real
 * commercial assortment carries legitimate near-duplicates (Charcoal ↔
 * Dark Grey 0.020, Sand ↔ Orange Cream 0.021) because both beads exist in
 * shops, and 103 does not divide into even rows.
 */
import { describe, expect, it } from 'vitest';
import { hexToRgb, rgbToOklab, type Oklab } from './color';
import { BEAD_COLORS, nearestBead } from './beadPalette';

const lab = (hex: string): Oklab => rgbToOklab(hexToRgb(hex));

function distance(a: string, b: string): number {
  const x = lab(a);
  const y = lab(b);
  return Math.hypot(x.L - y.L, x.a - y.a, x.b - y.b);
}

/** h 0..360, s/l 0..100 → hex */
function hsl(h: number, s: number, l: number): string {
  const sat = s / 100;
  const lig = l / 100;
  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hp < 1) { r = c; g = x; }
  else if (hp < 2) { g = c; r = x; }
  else if (hp < 3) { g = c; b = x; }
  else if (hp < 4) { b = c; g = x; }
  else if (hp < 5) { b = c; r = x; }
  else { r = c; b = x; }
  const m = lig - c / 2;
  const to255 = (v: number) => Math.round(Math.max(0, Math.min(1, v + m)) * 255);
  return `#${[r, g, b].map((v) => to255(v).toString(16).padStart(2, '0')).join('')}`;
}

describe('bead palette', () => {
  it('is the official Perler line: 103 unique colors, codes P1–P103', () => {
    expect(BEAD_COLORS).toHaveLength(103);
    expect(new Set(BEAD_COLORS.map((b) => b.id)).size).toBe(103);
    expect(new Set(BEAD_COLORS.map((b) => b.hex.toLowerCase())).size).toBe(103);
    const codes = BEAD_COLORS.map((b) => Number(b.code.slice(1))).sort((a, b) => a - b);
    expect(codes).toEqual(Array.from({ length: 103 }, (_, i) => i + 1));
  });

  it('near-duplicates are the real assortment, not drift (Charcoal ↔ Dark Grey)', () => {
    // pins the closest measured pair so a future hex correction that would
    // visually merge two shop-distinct beads gets caught deliberately
    expect(distance('#4f595a', '#585c61')).toBeLessThan(0.03);
    expect(
      BEAD_COLORS.filter((b) => ['charcoal', 'dark-grey'].includes(b.id)),
    ).toHaveLength(2);
  });

  it('photo anchors map to the right Perler family', () => {
    // [photo color, expected bead id] — computed against the 103-color line
    // 2026-10-28. If a future palette edit flips one of these, it must be a
    // deliberate retune, not an accident.
    const anchors: [string, string][] = [
      ['#000000', 'dark-spruce'], // darkest bead in the line — Black sits a touch lighter
      ['#ff0000', 'tangerine'], // pure display red — Perler sells no pure red
      ['#ff8b2a', 'orange'], // bright cartoon orange
      ['#d96426', 'spice'], // burnt/pumpkin orange
      ['#fa8072', 'brick'], // salmon pink
      ['#f78fb3', 'blush'],
      ['#0000ff', 'neon-blue'],
      ['#1e90ff', 'light-blue'],
      ['#7cfc00', 'sour-apple'],
      ['#ffff00', 'lemon'],
      ['#8b0000', 'cherry'], // dark red
      ['#ff00ff', 'fuchsia'],
      ['#33ff99', 'sour-apple'], // spring green
      ['#2eb8a1', 'light-green'], // mid teal
      ['#000099', 'dark-blue'], // dark vivid indigo
      ['#998000', 'fern'], // dark goldenrod
      ['#bf00e6', 'fuchsia'], // violet-magenta
      ['#bf80ff', 'lavender'], // light purple
    ];
    for (const [hex, id] of anchors) {
      expect(nearestBead(hex).id, hex).toBe(id);
    }
  });

  it('full color-space sweep: every photo-plausible cell within 0.18 of a bead', () => {
    // 36 hues × saturations 40–100 × lightness 30–90 = 720 samples. The
    // 0.18 ceiling is set by the vivid violet-magenta corner (#9900e6 →
    // Fuchsia, 0.173) — the one region where the Perler line simply sells
    // no saturated bead. Inventing a color there would put an unpurchasable
    // bead on shopping lists; honest nearest-match is the better trade.
    for (let h = 0; h < 360; h += 10) {
      for (const s of [100, 80, 60, 40]) {
        for (const l of [30, 45, 60, 75, 90]) {
          const hex = hsl(h, s, l);
          const bead = nearestBead(hex);
          expect(distance(hex, bead.hex), `${hex} → ${bead.name}`).toBeLessThanOrEqual(0.18);
        }
      }
    }
  });
});
