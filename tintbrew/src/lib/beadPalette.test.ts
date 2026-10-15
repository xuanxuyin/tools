/**
 * Palette invariants. The assortment grew 32 → 40 → 42 because muted-only
 * hexes left Oklab gaps of 0.11–0.18 on saturated photo colors (pure blue,
 * lawn green, pure yellow, dark red, magenta), and the first expansion left
 * the warm band thin: bright orange read as yellow Cheddar, burnt orange as
 * red Cherry, salmon pink as Orange. These tests pin the result: the gap
 * fillers must exist, stay distinct, actually catch the colors they were
 * added for, and no common saturated color may drift further than the worst
 * acceptable gap (0.11, set by indigo→grape).
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

describe('bead palette', () => {
  it('is the 42-color assortment with unique ids and hexes', () => {
    expect(BEAD_COLORS).toHaveLength(42);
    expect(new Set(BEAD_COLORS.map((b) => b.id)).size).toBe(42);
    expect(new Set(BEAD_COLORS.map((b) => b.hex.toLowerCase())).size).toBe(42);
  });

  it('every bead is distinct enough from its nearest neighbor (≥ 0.04 Oklab)', () => {
    // 0.04, not tighter: White↔Cream shipped at 0.042 in the original 32
    // (near-whites read as distinct to the eye at closer spacing than
    // saturated colors). The 8 gap fillers all clear 0.058.
    for (const b of BEAD_COLORS) {
      const nearest = Math.min(
        ...BEAD_COLORS.filter((o) => o.id !== b.id).map((o) => distance(b.hex, o.hex)),
      );
      expect(nearest, `${b.name} sits only ${nearest.toFixed(3)} from another bead`).toBeGreaterThanOrEqual(0.04);
    }
  });

  it('the gap-filler beads catch the saturated photo colors they were added for', () => {
    // [photo color, expected bead id] — the gaps that drove the two
    // expansions. The warm row matters most: bright orange must land on
    // Orange (not yellow Cheddar), burnt orange on Rust (not red Cherry),
    // salmon pink on Coral (not Orange), mid pink on Rose.
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
    ];
    for (const [hex, id] of anchors) {
      expect(nearestBead(hex).id, hex).toBe(id);
    }
  });

  it('no common saturated color drifts more than 0.11 Oklab from its nearest bead', () => {
    // saturated colors people actually photograph — toys, skies, grass,
    // flowers. Pre-expansion worst gap here was 0.178 (lime → kiwi)
    const refs = [
      '#ff0000', '#dc143c', '#8b0000', '#ff8000', '#f28500', '#ffff00',
      '#ffe135', '#7cfc00', '#00ff00', '#00ff7f', '#00a651', '#228b22',
      '#40e0d0', '#00c5d9', '#87ceeb', '#1e90ff', '#0000ff', '#0047ab',
      '#4b0082', '#8a2be2', '#ee82ee', '#ff00ff', '#ff69b4', '#ff7f50',
      '#fa8072', '#ffcf9e', '#ffd700',
    ];
    for (const hex of refs) {
      const bead = nearestBead(hex);
      expect(distance(hex, bead.hex), `${hex} → ${bead.name}`).toBeLessThanOrEqual(0.11);
    }
  });
});
