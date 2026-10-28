/**
 * Fuse-bead color palette + matching engine. Kept free of any page-data
 * imports so the browser island can use it without shipping the pattern
 * catalog: bead names and hexes live here, `nearestBead` maps any custom
 * color onto the closest bead (same Oklab distance the color-name engine
 * uses), and `beadListFrom` turns a region→hex assignment into the
 * shopping-style bead list both the SSR shell and the island render.
 *
 * The 103 entries are the official Perler fuse-bead line (P1–P103): `code`
 * is the P-number shoppers order by, `name` the official color name kept in
 * Perler's own spelling (Grey, Creme), and `id` its slug. Perler publishes
 * no official hexes, so hexes are the community-measured set from the
 * maxcleme/beadcolors dataset, cross-checked 2026-10-28 against the
 * trypetrelic.com 2026 revised-edition chart — they describe the screen
 * color of each bead, which is exactly what a photo converter needs.
 * Because the line is a real commercial assortment, near-duplicates exist
 * (Charcoal/Dark Grey, Sand/Orange Cream) — that is a feature: the shopping
 * list always names a bead you can actually buy.
 */
import { hexToRgb } from './color';
import { oklabDistance } from './colorName';

export interface BeadColor {
  /** kebab id referenced by pattern regions */
  id: string;
  /** Official Perler color name, e.g. 'Cheddar' */
  name: string;
  /** Perler color code shoppers order by, e.g. 'P49' */
  code: string;
  hex: string;
}

export const BEAD_COLORS: BeadColor[] = [
  { id: 'evergreen', name: 'Evergreen', code: 'P1', hex: '#305545' },
  { id: 'light-grey', name: 'Light Grey', code: 'P2', hex: '#b3bab8' },
  { id: 'lavender', name: 'Lavender', code: 'P3', hex: '#af9fce' },
  { id: 'shamrock', name: 'Shamrock', code: 'P4', hex: '#008f53' },
  { id: 'cobalt', name: 'Cobalt', code: 'P5', hex: '#0065b1' },
  { id: 'midnight', name: 'Midnight', code: 'P6', hex: '#2f3c55' },
  { id: 'robins-egg', name: "Robin's Egg", code: 'P7', hex: '#a9cdd5' },
  { id: 'flamingo', name: 'Flamingo', code: 'P8', hex: '#f2afb7' },
  { id: 'salmon', name: 'Salmon', code: 'P9', hex: '#e1747a' },
  { id: 'fawn', name: 'Fawn', code: 'P10', hex: '#c9a385' },
  { id: 'pewter', name: 'Pewter', code: 'P11', hex: '#94a19d' },
  { id: 'charcoal', name: 'Charcoal', code: 'P12', hex: '#4f595a' },
  { id: 'toasted-marshmallow', name: 'Toasted Marshmallow', code: 'P13', hex: '#dedace' },
  { id: 'orchid', name: 'Orchid', code: 'P14', hex: '#b1628e' },
  { id: 'tomato', name: 'Tomato', code: 'P15', hex: '#d14337' },
  { id: 'spice', name: 'Spice', code: 'P16', hex: '#d9593a' },
  { id: 'apricot', name: 'Apricot', code: 'P17', hex: '#f5a168' },
  { id: 'sherbet', name: 'Sherbet', code: 'P18', hex: '#d8e47c' },
  { id: 'mist', name: 'Mist', code: 'P19', hex: '#93b0bd' },
  { id: 'sky', name: 'Sky', code: 'P20', hex: '#4ac0d8' },
  { id: 'lagoon', name: 'Lagoon', code: 'P21', hex: '#00a4ac' },
  { id: 'teal', name: 'Teal', code: 'P22', hex: '#047f8a' },
  { id: 'fern', name: 'Fern', code: 'P23', hex: '#7f971a' },
  { id: 'olive', name: 'Olive', code: 'P24', hex: '#696e31' },
  { id: 'cherry', name: 'Cherry', code: 'P25', hex: '#9d2b3a' },
  { id: 'white', name: 'White', code: 'P26', hex: '#eaefee' },
  { id: 'creme', name: 'Creme', code: 'P27', hex: '#e1e2bb' },
  { id: 'yellow', name: 'Yellow', code: 'P28', hex: '#e7ce3e' },
  { id: 'orange', name: 'Orange', code: 'P29', hex: '#eb7b31' },
  { id: 'red', name: 'Red', code: 'P30', hex: '#b0353c' },
  { id: 'bubblegum', name: 'Bubblegum', code: 'P31', hex: '#d8729a' },
  { id: 'purple', name: 'Purple', code: 'P32', hex: '#684b86' },
  { id: 'dark-blue', name: 'Dark Blue', code: 'P33', hex: '#0e5092' },
  { id: 'light-blue', name: 'Light Blue', code: 'P34', hex: '#278cc9' },
  { id: 'dark-green', name: 'Dark Green', code: 'P35', hex: '#007b4e' },
  { id: 'light-green', name: 'Light Green', code: 'P36', hex: '#18c7b1' },
  { id: 'brown', name: 'Brown', code: 'P37', hex: '#674c44' },
  { id: 'grey', name: 'Grey', code: 'P38', hex: '#909497' },
  { id: 'black', name: 'Black', code: 'P39', hex: '#323234' },
  { id: 'rust', name: 'Rust', code: 'P40', hex: '#995043' },
  { id: 'light-brown', name: 'Light Brown', code: 'P41', hex: '#936848' },
  { id: 'peach', name: 'Peach', code: 'P42', hex: '#e9bfb9' },
  { id: 'tan', name: 'Tan', code: 'P43', hex: '#c5ac90' },
  { id: 'magenta', name: 'Magenta', code: 'P44', hex: '#e04284' },
  { id: 'pastel-blue', name: 'Pastel Blue', code: 'P45', hex: '#4a9ccf' },
  { id: 'pastel-green', name: 'Pastel Green', code: 'P46', hex: '#6dcc94' },
  { id: 'pastel-lavender', name: 'Pastel Lavender', code: 'P47', hex: '#937fbf' },
  { id: 'pastel-yellow', name: 'Pastel Yellow', code: 'P48', hex: '#e9e290' },
  { id: 'cheddar', name: 'Cheddar', code: 'P49', hex: '#fbb146' },
  { id: 'toothpaste', name: 'Toothpaste', code: 'P50', hex: '#96d1d4' },
  { id: 'hot-coral', name: 'Hot Coral', code: 'P51', hex: '#dd595b' },
  { id: 'plum', name: 'Plum', code: 'P52', hex: '#a75d9d' },
  { id: 'kiwi-lime', name: 'Kiwi Lime', code: 'P53', hex: '#69b845' },
  { id: 'turquoise', name: 'Turquoise', code: 'P54', hex: '#0098c5' },
  { id: 'blush', name: 'Blush', code: 'P55', hex: '#f99297' },
  { id: 'periwinkle-blue', name: 'Periwinkle Blue', code: 'P56', hex: '#6683b7' },
  { id: 'light-pink', name: 'Light Pink', code: 'P57', hex: '#e1bcce' },
  { id: 'green', name: 'Green', code: 'P58', hex: '#4dab64' },
  { id: 'pink', name: 'Pink', code: 'P59', hex: '#d45496' },
  { id: 'raspberry', name: 'Raspberry', code: 'P60', hex: '#983864' },
  { id: 'butterscotch', name: 'Butterscotch', code: 'P61', hex: '#da9964' },
  { id: 'parrot-green', name: 'Parrot Green', code: 'P62', hex: '#009188' },
  { id: 'dark-grey', name: 'Dark Grey', code: 'P63', hex: '#585c61' },
  { id: 'blueberry-creme', name: 'Blueberry Creme', code: 'P64', hex: '#85a8e3' },
  { id: 'cranapple', name: 'Cranapple', code: 'P65', hex: '#843947' },
  { id: 'prickly-pear', name: 'Prickly Pear', code: 'P66', hex: '#bbc938' },
  { id: 'sand', name: 'Sand', code: 'P67', hex: '#e5be9e' },
  { id: 'mint', name: 'Mint', code: 'P68', hex: '#b3eed5' },
  { id: 'sour-apple', name: 'Sour Apple', code: 'P69', hex: '#a3de6f' },
  { id: 'cotton-candy', name: 'Cotton Candy', code: 'P70', hex: '#f479b0' },
  { id: 'grape', name: 'Grape', code: 'P71', hex: '#503b9c' },
  { id: 'rose', name: 'Rose', code: 'P72', hex: '#d25d72' },
  { id: 'iris', name: 'Iris', code: 'P73', hex: '#4e56a3' },
  { id: 'tangerine', name: 'Tangerine', code: 'P74', hex: '#fd5918' },
  { id: 'forest', name: 'Forest', code: 'P75', hex: '#005d57' },
  { id: 'eggplant', name: 'Eggplant', code: 'P76', hex: '#6f3255' },
  { id: 'honey', name: 'Honey', code: 'P77', hex: '#da8c2c' },
  { id: 'gingerbread', name: 'Gingerbread', code: 'P78', hex: '#7e5446' },
  { id: 'thistle', name: 'Thistle', code: 'P79', hex: '#8c8ca7' },
  { id: 'slate-blue', name: 'Slate Blue', code: 'P80', hex: '#5e6d7b' },
  { id: 'denim', name: 'Denim', code: 'P81', hex: '#4c6388' },
  { id: 'sage', name: 'Sage', code: 'P82', hex: '#9aa98e' },
  { id: 'orange-cream', name: 'Orange Cream', code: 'P83', hex: '#efb79b' },
  { id: 'fruit-punch', name: 'Fruit Punch', code: 'P84', hex: '#ca3b65' },
  { id: 'fuchsia', name: 'Fuchsia', code: 'P85', hex: '#cb59b9' },
  { id: 'mulberry', name: 'Mulberry', code: 'P86', hex: '#714875' },
  { id: 'slime', name: 'Slime', code: 'P87', hex: '#c8c85c' },
  { id: 'stone', name: 'Stone', code: 'P88', hex: '#988c8c' },
  { id: 'dark-spruce', name: 'Dark Spruce', code: 'P89', hex: '#14313b' },
  { id: 'cocoa', name: 'Cocoa', code: 'P90', hex: '#392928' },
  { id: 'twilight-plum', name: 'Twilight Plum', code: 'P91', hex: '#c685b1' },
  { id: 'caribbean-sea', name: 'Caribbean Sea', code: 'P92', hex: '#6cc8ad' },
  { id: 'frosted-lilac', name: 'Frosted Lilac', code: 'P93', hex: '#cdb7c3' },
  { id: 'brick', name: 'Brick', code: 'P94', hex: '#fc9574' },
  { id: 'rich-butter', name: 'Rich Butter', code: 'P95', hex: '#f6ca69' },
  { id: 'peacock', name: 'Peacock', code: 'P96', hex: '#0090ac' },
  { id: 'carnation-pink', name: 'Carnation Pink', code: 'P97', hex: '#f8c7c9' },
  { id: 'neon-blue', name: 'Neon Blue', code: 'P98', hex: '#406ae1' },
  { id: 'sunflower', name: 'Sunflower', code: 'P99', hex: '#deba0b' },
  { id: 'lemon', name: 'Lemon', code: 'P100', hex: '#f6d901' },
  { id: 'celery', name: 'Celery', code: 'P101', hex: '#bed4a6' },
  { id: 'mocha', name: 'Mocha', code: 'P102', hex: '#c8b693' },
  { id: 'coral', name: 'Coral', code: 'P103', hex: '#ff9a8b' },
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
