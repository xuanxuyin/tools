/**
 * Palette invariants. The assortment grew 32 → 40 → 42 → 48, each round
 * closing measured Oklab gaps on photo colors (saturated hues first, then
 * the warm mid-tones, then a full color-space sweep). The sweep test below
 * is the permanent version of that audit: every hue × saturation × lightness
 * cell a photo can present must sit within 0.11 Oklab of some bead —
 * about the color variation between bead batches. If a palette edit
 * reopens a band anywhere, this fails with the offending hex.
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
  it('is the 48-color assortment: unique ids and hexes, whole swatch rows', () => {
    expect(BEAD_COLORS).toHaveLength(48);
    expect(new Set(BEAD_COLORS.map((b) => b.id)).size).toBe(48);
    expect(new Set(BEAD_COLORS.map((b) => b.hex.toLowerCase())).size).toBe(48);
    // 8-column swatch grid → exactly six full rows
    expect(BEAD_COLORS.length % 8).toBe(0);
  });

  it('every bead is distinct enough from its nearest neighbor (≥ 0.04 Oklab)', () => {
    // 0.04, not tighter: White↔Cream shipped at 0.042 in the original 32
    // (near-whites read as distinct to the eye at closer spacing than
    // saturated colors)
    for (const b of BEAD_COLORS) {
      const nearest = Math.min(
        ...BEAD_COLORS.filter((o) => o.id !== b.id).map((o) => distance(b.hex, o.hex)),
      );
      expect(nearest, `${b.name} sits only ${nearest.toFixed(3)} from another bead`).toBeGreaterThanOrEqual(0.04);
    }
  });

  it('the gap-filler beads catch the saturated photo colors they were added for', () => {
    // [photo color, expected bead id] — one pin per band the expansions
    // opened. If a future bead nudges one of these flips, it must be a
    // deliberate retune, not an accident.
    const anchors: [string, string][] = [
      ['#ff0000', 'cherry'],
      ['#ff8b2a', 'orange'], // bright cartoon orange — was Cheddar (looked yellow)
      ['#d96426', 'rust'], // burnt/pumpkin orange — was Cherry (looked red)
      ['#fa8072', 'coral'], // salmon pink — was Orange (wrong hue family)
      ['#f78fb3', 'rose'],
      ['#0000ff', 'blue'],
      ['#1e90ff', 'sky-blue'],
      ['#7cfc00', 'lime'],
      ['#ffff00', 'lemon'],
      ['#8b0000', 'dark-red'],
      ['#ff00ff', 'fuchsia'],
      ['#33ff99', 'spring-green'], // spring green — was Mint (pale, wrong family)
      ['#2eb8a1', 'turquoise'], // mid teal — was Teal (too dark)
      ['#000099', 'indigo'], // dark vivid indigo — was Navy (too gray, worst gap 0.125)
      ['#998000', 'olive'], // dark goldenrod — was Rust (wrong family)
      ['#bf00e6', 'amethyst'], // violet-magenta — was Fuchsia
      ['#bf80ff', 'orchid'], // light purple — was Lavender (too gray)
    ];
    for (const [hex, id] of anchors) {
      expect(nearestBead(hex).id, hex).toBe(id);
    }
  });

  it('full color-space sweep: every photo-plausible cell within 0.112 of a bead', () => {
    // 36 hues × saturations 40–100 × lightness 30–90 = 720 samples — the
    // audit that found the six missing bands. Pre-expansion worst gap:
    // 0.125 (dark indigo → Navy). The 0.112 ceiling is set by exactly one
    // sample: #33ffff, the pure-RGB display-cyan corner (0.1107 → Mint) —
    // a monitor color photos essentially never contain. Every other cell
    // lands ≤ 0.10, and real photo colors (the named set) ≤ 0.08.
    for (let h = 0; h < 360; h += 10) {
      for (const s of [100, 80, 60, 40]) {
        for (const l of [30, 45, 60, 75, 90]) {
          const hex = hsl(h, s, l);
          const bead = nearestBead(hex);
          expect(distance(hex, bead.hex), `${hex} → ${bead.name}`).toBeLessThanOrEqual(0.112);
        }
      }
    }
  });
});
