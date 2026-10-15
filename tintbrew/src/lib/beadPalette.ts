/**
 * Fuse-bead color palette + matching engine. Kept free of any page-data
 * imports so the browser island can use it without shipping the pattern
 * catalog: bead names and hexes live here, `nearestBead` maps any custom
 * color onto the closest bead (same Oklab distance the color-name engine
 * uses), and `beadListFrom` turns a region→hex assignment into the
 * shopping-style bead list both the SSR shell and the island render.
 *
 * Hexes are approximations of a standard 5mm fuse-bead assortment,
 * hand-tuned for the bead look on screen (slightly muted, low gloss).
 * The vivid row (pure blue, lime, lemon, fuchsia…) is deliberate: a 32-color
 * muted-only palette left Oklab gaps of 0.11–0.18 on saturated photo colors,
 * so photos with skies, grass or toys drifted to the wrong bead.
 */
import { hexToRgb } from './color';
import { oklabDistance } from './colorName';

export interface BeadColor {
  /** kebab id referenced by pattern regions */
  id: string;
  /** Display name, e.g. 'Cheddar' */
  name: string;
  hex: string;
}

export const BEAD_COLORS: BeadColor[] = [
  { id: 'black', name: 'Black', hex: '#232326' },
  { id: 'white', name: 'White', hex: '#f5f4ef' },
  { id: 'light-gray', name: 'Light Gray', hex: '#c7cbd1' },
  { id: 'gray', name: 'Gray', hex: '#8b9096' },
  { id: 'dark-gray', name: 'Dark Gray', hex: '#4c5158' },
  { id: 'cream', name: 'Cream', hex: '#fbf0cd' },
  { id: 'tan', name: 'Tan', hex: '#e3cba5' },
  { id: 'light-brown', name: 'Light Brown', hex: '#c69a6d' },
  { id: 'brown', name: 'Brown', hex: '#8a5a33' },
  { id: 'dark-brown', name: 'Dark Brown', hex: '#5a3a22' },
  { id: 'rust', name: 'Rust', hex: '#c05a1f' },
  { id: 'orange', name: 'Orange', hex: '#ff8324' },
  { id: 'cheddar', name: 'Cheddar', hex: '#f2a03d' },
  { id: 'butternut', name: 'Butternut', hex: '#f6cf85' },
  { id: 'sunshine', name: 'Sunshine', hex: '#ffd21f' },
  { id: 'lemon', name: 'Lemon', hex: '#f9ea34' },
  { id: 'peach', name: 'Peach', hex: '#f6b489' },
  { id: 'coral', name: 'Coral', hex: '#f87e73' },
  { id: 'blush', name: 'Blush', hex: '#f5b6c6' },
  { id: 'rose', name: 'Rose', hex: '#f984a8' },
  { id: 'pink', name: 'Pink', hex: '#f272ae' },
  { id: 'hot-magenta', name: 'Hot Magenta', hex: '#d94f9e' },
  { id: 'fuchsia', name: 'Fuchsia', hex: '#ec48f5' },
  { id: 'cherry', name: 'Cherry', hex: '#d5322f' },
  { id: 'dark-red', name: 'Dark Red', hex: '#8e1c26' },
  { id: 'kiwi', name: 'Kiwi', hex: '#a8c94f' },
  { id: 'lime', name: 'Lime', hex: '#93e025' },
  { id: 'bright-green', name: 'Bright Green', hex: '#3ba735' },
  { id: 'pine', name: 'Pine', hex: '#256f40' },
  { id: 'mint', name: 'Mint', hex: '#a9dfc2' },
  { id: 'teal', name: 'Teal', hex: '#2a8f8f' },
  { id: 'light-blue', name: 'Light Blue', hex: '#82c8e8' },
  { id: 'sky-blue', name: 'Sky Blue', hex: '#3f9bf2' },
  { id: 'royal-blue', name: 'Royal Blue', hex: '#2b5fb8' },
  { id: 'blue', name: 'Blue', hex: '#0f45e0' },
  { id: 'navy', name: 'Navy', hex: '#23366b' },
  { id: 'periwinkle', name: 'Periwinkle', hex: '#8f9fe0' },
  { id: 'lavender', name: 'Lavender', hex: '#c3a6e0' },
  { id: 'purple', name: 'Purple', hex: '#8e5fbf' },
  { id: 'violet', name: 'Violet', hex: '#7a3fd4' },
  { id: 'grape', name: 'Grape', hex: '#5f3a8e' },
  { id: 'plum', name: 'Plum', hex: '#8e3a62' },
];

const byId = new Map(BEAD_COLORS.map((b) => [b.id, b]));

export function beadById(id: string): BeadColor | undefined {
  return byId.get(id);
}

/** Closest bead to any hex — Oklab distance, same metric as nearestColorName. */
export function nearestBead(hex: string): BeadColor {
  const rgb = hexToRgb(hex);
  let best = BEAD_COLORS[0]!;
  let bestD = Infinity;
  for (const b of BEAD_COLORS) {
    const d = oklabDistance(rgb, hexToRgb(b.hex));
    if (d < bestD) {
      bestD = d;
      best = b;
    }
  }
  return best;
}

export interface BeadListEntry {
  bead: BeadColor;
  hex: string;
  count: number;
  /** false when the region color came from the custom picker */
  exact: boolean;
}

/**
 * Group a region assignment into the bead shopping list. Regions carry the
 * bead count of the area they fill; identical beads merge so the list reads
 * like a real materials list ("White ×64").
 */
export function beadListFrom(
  regions: readonly { hex: string; count: number }[],
): BeadListEntry[] {
  const map = new Map<string, BeadListEntry>();
  for (const r of regions) {
    if (r.count <= 0) continue;
    const bead = nearestBead(r.hex);
    const exact = bead.hex.toLowerCase() === r.hex.toLowerCase();
    const entry = map.get(bead.id);
    if (entry) {
      entry.count += r.count;
      entry.exact = entry.exact && exact;
    } else {
      map.set(bead.id, { bead, hex: r.hex, count: r.count, exact });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}
