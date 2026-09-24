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
};

/** 24 pairs as [a, b] color ids — order matches data/mixes.ts. */
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
];

/** 8 scenario/chart pages: source swatches + the computed hero answer. */
export const SCENARIOS = [
  { slug: 'what-colors-make-brown', swatches: ['#ff0000', '#008000'], resultHex: '#6b4423' },
  { slug: 'what-colors-make-purple', swatches: ['#ff0000', '#0000ff'], resultHex: '#8c53a2' },
  { slug: 'what-colors-make-green', swatches: ['#0000ff', '#ffff00'], resultHex: '#008000' },
  { slug: 'what-colors-make-orange', swatches: ['#ff0000', '#ffff00'], resultHex: '#ffa000' },
  { slug: 'how-to-make-black-frosting', swatches: ['#2e1c12', '#141418'], resultHex: '#1d1713' },
  { slug: 'how-to-make-brown-icing', swatches: ['#fffbf4', '#5b3a1e'], resultHex: '#6f4a2c' },
  { slug: 'icing-color-chart', swatches: ['#fffbf4', '#d91d3c'], resultHex: '#fed5ce' },
  { slug: 'buttercream-color-chart', swatches: ['#fff2d8', '#1554c0'], resultHex: '#fdcdb8' },
];
