export interface ColorDef {
  /** kebab id used in slugs and pairing */
  id: string;
  /** Display name */
  name: string;
  hex: string;
  kind: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  blurb: string;
}

/** The 10 colors used across the 24 mix pages. */
export const colors: ColorDef[] = [
  {
    id: 'red',
    name: 'Red',
    hex: '#ff0000',
    kind: 'primary',
    blurb: 'A primary of both light and paint — the color of blood, stop signs, and urgency.',
  },
  {
    id: 'blue',
    name: 'Blue',
    hex: '#0000ff',
    kind: 'primary',
    blurb: 'A primary of both light and paint, sitting between cyan and violet on the wheel.',
  },
  {
    id: 'yellow',
    name: 'Yellow',
    hex: '#ffff00',
    kind: 'primary',
    blurb: 'The lightest primary — in paint, the warm primary that makes oranges and greens.',
  },
  {
    id: 'green',
    name: 'Green',
    hex: '#008000',
    kind: 'secondary',
    blurb: 'Blue plus yellow in paint; the color the human eye can distinguish the most shades of.',
  },
  {
    id: 'orange',
    name: 'Orange',
    hex: '#ffa500',
    kind: 'secondary',
    blurb: 'Red and yellow combined — the color of sunsets, citrus, and warning cones.',
  },
  {
    id: 'purple',
    name: 'Purple',
    hex: '#800080',
    kind: 'secondary',
    blurb: 'Red and blue combined — historically the color of royalty because dye was rare.',
  },
  {
    id: 'pink',
    name: 'Pink',
    hex: '#ff69b4',
    kind: 'tertiary',
    blurb: 'A tint of red — red lightened with white, from blush pastels to hot magenta.',
  },
  {
    id: 'brown',
    name: 'Brown',
    hex: '#a52a2a',
    kind: 'tertiary',
    blurb: 'A dark, desaturated orange — mix orange with black or its opposite, blue.',
  },
  {
    id: 'black',
    name: 'Black',
    hex: '#000000',
    kind: 'neutral',
    blurb: 'The absence of light on a screen; in paint, the darkest pigment that shades every mix.',
  },
  {
    id: 'white',
    name: 'White',
    hex: '#ffffff',
    kind: 'neutral',
    blurb: 'All visible wavelengths of light at once; in paint, the tint that lightens every mix.',
  },
];

export const colorById: Record<string, ColorDef> = Object.fromEntries(
  colors.map((c) => [c.id, c]),
);
