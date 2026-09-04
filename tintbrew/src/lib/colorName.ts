/**
 * Nearest-name lookup: given any RGB, find the closest named color by
 * Oklab distance (a cheap ΔE approximation). Advisory only — hand-tuned
 * `resultName` values in data/mixes.ts always win for page headlines.
 */
import { rgbToOklab, type RGB } from './color';

export interface NamedColor {
  name: string;
  hex: string;
}

// CSS named colors (values are the standard CSS4 set) plus a few painterly
// terms people actually search for. Display names are title-cased.
const NAMED: readonly NamedColor[] = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Red', hex: '#ff0000' },
  { name: 'Green', hex: '#008000' },
  { name: 'Blue', hex: '#0000ff' },
  { name: 'Yellow', hex: '#ffff00' },
  { name: 'Orange', hex: '#ffa500' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Pink', hex: '#ffc0cb' },
  { name: 'Brown', hex: '#a52a2a' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Cyan', hex: '#00ffff' },
  { name: 'Magenta', hex: '#ff00ff' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Lime', hex: '#00ff00' },
  { name: 'Indigo', hex: '#4b0082' },
  { name: 'Violet', hex: '#ee82ee' },
  { name: 'Silver', hex: '#c0c0c0' },
  { name: 'Gold', hex: '#ffd700' },
  { name: 'Turquoise', hex: '#40e0d0' },
  { name: 'Salmon', hex: '#fa8072' },
  { name: 'Coral', hex: '#ff7f50' },
  { name: 'Tomato', hex: '#ff6347' },
  { name: 'Crimson', hex: '#dc143c' },
  { name: 'Firebrick', hex: '#b22222' },
  { name: 'Dark Red', hex: '#8b0000' },
  { name: 'Orange Red', hex: '#ff4500' },
  { name: 'Dark Orange', hex: '#ff8c00' },
  { name: 'Chocolate', hex: '#d2691e' },
  { name: 'Saddle Brown', hex: '#8b4513' },
  { name: 'Sienna', hex: '#a0522d' },
  { name: 'Peru', hex: '#cd853f' },
  { name: 'Tan', hex: '#d2b48c' },
  { name: 'Rosy Brown', hex: '#bc8f8f' },
  { name: 'Goldenrod', hex: '#daa520' },
  { name: 'Dark Goldenrod', hex: '#b8860b' },
  { name: 'Khaki', hex: '#f0e68c' },
  { name: 'Yellow Green', hex: '#9acd32' },
  { name: 'Olive Drab', hex: '#6b8e23' },
  { name: 'Lime Green', hex: '#32cd32' },
  { name: 'Lawn Green', hex: '#7cfc00' },
  { name: 'Chartreuse', hex: '#7fff00' },
  { name: 'Green Yellow', hex: '#adff2f' },
  { name: 'Spring Green', hex: '#00ff7f' },
  { name: 'Medium Spring Green', hex: '#00fa9a' },
  { name: 'Forest Green', hex: '#228b22' },
  { name: 'Sea Green', hex: '#2e8b57' },
  { name: 'Medium Sea Green', hex: '#3cb371' },
  { name: 'Dark Green', hex: '#006400' },
  { name: 'Dark Olive Green', hex: '#556b2f' },
  { name: 'Dark Sea Green', hex: '#8fbc8f' },
  { name: 'Light Green', hex: '#90ee90' },
  { name: 'Pale Green', hex: '#98fb98' },
  { name: 'Mint', hex: '#f5fffa' },
  { name: 'Dark Cyan', hex: '#008b8b' },
  { name: 'Light Sea Green', hex: '#20b2aa' },
  { name: 'Cadet Blue', hex: '#5f9ea0' },
  { name: 'Dark Turquoise', hex: '#00ced1' },
  { name: 'Medium Turquoise', hex: '#48d1cc' },
  { name: 'Pale Turquoise', hex: '#afeeee' },
  { name: 'Sky Blue', hex: '#87ceeb' },
  { name: 'Light Sky Blue', hex: '#87cefa' },
  { name: 'Deep Sky Blue', hex: '#00bfff' },
  { name: 'Dodger Blue', hex: '#1e90ff' },
  { name: 'Royal Blue', hex: '#4169e1' },
  { name: 'Cornflower Blue', hex: '#6495ed' },
  { name: 'Steel Blue', hex: '#4682b4' },
  { name: 'Medium Blue', hex: '#0000cd' },
  { name: 'Dark Blue', hex: '#00008b' },
  { name: 'Midnight Blue', hex: '#191970' },
  { name: 'Slate Blue', hex: '#6a5acd' },
  { name: 'Medium Slate Blue', hex: '#7b68ee' },
  { name: 'Light Slate Blue', hex: '#8470ff' },
  { name: 'Dark Slate Blue', hex: '#483d8b' },
  { name: 'Lavender', hex: '#e6e6fa' },
  { name: 'Thistle', hex: '#d8bfd8' },
  { name: 'Plum', hex: '#dda0dd' },
  { name: 'Violet Purple', hex: '#9400d3' },
  { name: 'Blue Violet', hex: '#8a2be2' },
  { name: 'Dark Orchid', hex: '#9932cc' },
  { name: 'Dark Violet', hex: '#9400d3' },
  { name: 'Medium Orchid', hex: '#ba55d3' },
  { name: 'Medium Purple', hex: '#9370db' },
  { name: 'Medium Violet Red', hex: '#c71585' },
  { name: 'Pale Violet Red', hex: '#db7093' },
  { name: 'Deep Pink', hex: '#ff1493' },
  { name: 'Hot Pink', hex: '#ff69b4' },
  { name: 'Light Pink', hex: '#ffb6c1' },
  { name: 'Orchid', hex: '#da70d6' },
  { name: 'Mauve', hex: '#e0b0ff' },
  { name: 'Rebecca Purple', hex: '#663399' },
  { name: 'Fuchsia', hex: '#ff00ff' },
  { name: 'Dark Magenta', hex: '#8b008b' },
  { name: 'Dark Salmon', hex: '#e9967a' },
  { name: 'Light Salmon', hex: '#ffa07a' },
  { name: 'Light Coral', hex: '#f08080' },
  { name: 'Indian Red', hex: '#cd5c5c' },
  { name: 'Dark Khaki', hex: '#bdb76b' },
  { name: 'Dim Gray', hex: '#696969' },
  { name: 'Dark Gray', hex: '#a9a9a9' },
  { name: 'Light Gray', hex: '#d3d3d3' },
  { name: 'Gainsboro', hex: '#dcdcdc' },
  { name: 'Light Slate Gray', hex: '#778899' },
  { name: 'Slate Gray', hex: '#708090' },
  { name: 'Dark Slate Gray', hex: '#2f4f4f' },
  { name: 'Charcoal', hex: '#36454f' },
  { name: 'Burgundy', hex: '#800020' },
  { name: 'Sage', hex: '#9caf88' },
  { name: 'Terracotta', hex: '#e2725b' },
  { name: 'Cream', hex: '#fffdd0' },
  { name: 'Beige', hex: '#f5f5dc' },
  { name: 'Linen', hex: '#faf0e6' },
  { name: 'Wheat', hex: '#f5deb3' },
  { name: 'Ivory', hex: '#fffff0' },
];

/** Oklab Euclidean distance between two RGB colors. */
export function oklabDistance(a: RGB, b: RGB): number {
  const oa = rgbToOklab(a);
  const ob = rgbToOklab(b);
  return Math.hypot(oa.L - ob.L, oa.a - ob.a, oa.b - ob.b);
}

let cached: { name: string; lab: { L: number; a: number; b: number }; hex: string }[] | null = null;

function table() {
  if (!cached) {
    cached = NAMED.map((n) => {
      const r = parseInt(n.hex.slice(1, 3), 16);
      const g = parseInt(n.hex.slice(3, 5), 16);
      const b = parseInt(n.hex.slice(5, 7), 16);
      return { name: n.name, hex: n.hex, lab: rgbToOklab({ r, g, b }) };
    });
  }
  return cached;
}

/** Closest named color to any RGB by Oklab distance. */
export function nearestColorName(rgb: RGB): NamedColor {
  const target = rgbToOklab(rgb);
  let best = table()[0]!;
  let bestD = Infinity;
  for (const entry of table()) {
    const d = Math.hypot(
      target.L - entry.lab.L,
      target.a - entry.lab.a,
      target.b - entry.lab.b,
    );
    if (d < bestD) {
      bestD = d;
      best = entry;
    }
  }
  return { name: best.name, hex: best.hex };
}

export { NAMED as namedColors };
