/**
 * Snapshot of src/data/colors.ts + mixes.ts + scenario hero values, consumed
 * by generate-og.mjs (Node can't import the TS data). Regenerate by hand when
 * the data changes — src/lib/og.test.ts fails the suite on any drift, so a
 * stale snapshot can never ship silently.
 */

export const COLORS = {
  red: '#ff0000',
  blue: '#0000ff',
  yellow: '#ffff00',
  green: '#008000',
  orange: '#ffa500',
  purple: '#800080',
  pink: '#ff69b4',
  brown: '#a52a2a',
  black: '#000000',
  white: '#ffffff',
  gold: '#d8982d',
};

/** Hue-test card band — 8 stops of the Oklab hue ring at the game's L/C
 *  (lib/hueTest.ts hueToHex at k·45°). Parity-locked by src/lib/og.test.ts. */
export const HUE_ARC = [
  '#c07089',
  '#c17755',
  '#a58938',
  '#709a58',
  '#2ba18f',
  '#3299bc',
  '#7389cc',
  '#a478b8',
];

/** 25 pairs as [a, b] color ids — order matches data/mixes.ts. */
export const PAIRS = [
  ['red', 'blue'],
  ['blue', 'yellow'],
  ['red', 'yellow'],
  ['red', 'green'],
  ['blue', 'green'],
  ['yellow', 'green'],
  ['purple', 'pink'],
  ['red', 'pink'],
  ['blue', 'purple'],
  ['black', 'white'],
  ['red', 'white'],
  ['blue', 'white'],
  ['yellow', 'white'],
  ['orange', 'yellow'],
  ['orange', 'red'],
  ['pink', 'white'],
  ['brown', 'white'],
  ['green', 'white'],
  ['black', 'red'],
  ['blue', 'black'],
  ['orange', 'white'],
  ['purple', 'red'],
  ['yellow', 'black'],
  ['green', 'black'],
  ['yellow', 'brown'],
];

/** 14 scenario/chart pages: source swatches + the computed hero answer. */
export const SCENARIOS = [
  { slug: 'what-colors-make-brown', swatches: ['#ff0000', '#008000'], resultHex: '#6b4423' },
  { slug: 'what-colors-make-purple', swatches: ['#ff0000', '#0000ff'], resultHex: '#8c53a2' },
  { slug: 'what-colors-make-green', swatches: ['#0000ff', '#ffff00'], resultHex: '#008000' },
  { slug: 'what-colors-make-orange', swatches: ['#ff0000', '#ffff00'], resultHex: '#ffa000' },
  { slug: 'how-to-make-black-frosting', swatches: ['#2e1c12', '#141418'], resultHex: '#1d1713' },
  { slug: 'how-to-make-brown-icing', swatches: ['#fffbf4', '#5b3a1e'], resultHex: '#6f4a2c' },
  { slug: 'icing-color-chart', swatches: ['#fffbf4', '#d91d3c'], resultHex: '#fed5ce' },
  { slug: 'buttercream-color-chart', swatches: ['#fff2d8', '#1554c0'], resultHex: '#fdcdb8' },
  { slug: 'what-colors-make-blue', swatches: ['#800080', '#008000'], resultHex: '#0000ff' },
  { slug: 'what-colors-make-red', swatches: ['#ff69b4', '#ffa500'], resultHex: '#ff0000' },
  { slug: 'what-colors-make-black', swatches: ['#ff0000', '#008000', '#0000ff'], resultHex: '#70697c' },
  { slug: 'what-colors-make-maroon', swatches: ['#ff0000', '#a52a2a'], resultHex: '#ad1a19' },
  { slug: 'what-colors-make-peach', swatches: ['#ffa500', '#ffffff'], resultHex: '#ffdab9' },
  { slug: 'what-colors-make-turquoise', swatches: ['#0000ff', '#008000', '#ffffff'], resultHex: '#40e0d0' },
];

/** 4 outfit-pairing pages (V2.2): the anchor color + the first combo's
 *  partners — mirrors outfitContents[].heroStrip. */
export const OUTFITS = [
  { slug: 'what-colors-go-with-brown', swatches: ['#6b4423', '#f5f2ec', '#5b3a2e'] },
  { slug: 'what-colors-go-with-green', swatches: ['#386641', '#f4f2ec', '#b98f56'] },
  { slug: 'what-colors-go-with-purple', swatches: ['#6f4a8c', '#f4f2ec', '#a7a9b0'] },
  { slug: 'what-colors-go-with-burgundy', swatches: ['#6d2a35', '#ece3d2', '#5b3a2e'] },
];
