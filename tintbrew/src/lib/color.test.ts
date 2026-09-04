import { describe, expect, it } from 'vitest';
import {
  cmykToRgb,
  colorMixSnippet,
  contrastRatio,
  formatCss,
  hexToRgb,
  hslToRgb,
  mixSteps,
  normalizeHex,
  normalizeWeights,
  oklabMix,
  oklabToRgb,
  readableLabel,
  rgbMix,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  rgbToOklab,
} from './color';
import { nearestColorName } from './colorName';

const RED = { r: 255, g: 0, b: 0 };
const BLUE = { r: 0, g: 0, b: 255 };
const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };

describe('normalizeHex', () => {
  it.each(['abc', '#abc', 'ABC', '#AABBCC', 'aabbcc'])('accepts %s', (v) => {
    expect(normalizeHex(v)).toMatch(/^#[0-9a-f]{6}$/);
  });
  it.each(['xyz', '#12345', '#12345zz', '', '#1234567', 'red'])('rejects %s', (v) => {
    expect(normalizeHex(v)).toBeNull();
  });
  it('expands 3-digit correctly', () => {
    expect(normalizeHex('#f0a')).toBe('#ff00aa');
  });
});

describe('hex/rgb round trips', () => {
  it('hexToRgb parses #ff0000', () => {
    expect(hexToRgb('#ff0000')).toEqual(RED);
  });
  it('rgbToHex lowercases and pads', () => {
    expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000ff');
  });
  it('round trips a set of colors exactly', () => {
    for (const hex of ['#ff0000', '#00ff00', '#0af', '#6a0dad', '#fafaf9', '#111111']) {
      expect(rgbToHex(hexToRgb(hex))).toBe(normalizeHex(hex));
    }
  });
});

describe('Oklab conversions', () => {
  it('round trips in-gamut colors within ±1 per channel', () => {
    for (const hex of ['#ff0000', '#00ff00', '#0000ff', '#6a0dad', '#f5deb3', '#36454f']) {
      const rgb = hexToRgb(hex);
      const back = oklabToRgb(rgbToOklab(rgb));
      for (const ch of ['r', 'g', 'b'] as const) {
        expect(Math.abs(back[ch] - rgb[ch])).toBeLessThanOrEqual(1);
      }
    }
  });
  it('clamps out-of-gamut Oklab back into sRGB range', () => {
    const extreme = oklabToRgb({ L: 1, a: 0.4, b: 0.4 });
    for (const ch of ['r', 'g', 'b'] as const) {
      expect(extreme[ch]).toBeGreaterThanOrEqual(0);
      expect(extreme[ch]).toBeLessThanOrEqual(255);
    }
    expect(oklabToRgb({ L: 0, a: 0, b: 0 })).toEqual(BLACK);
  });
});

describe('normalizeWeights', () => {
  it('normalizes to sum 1', () => {
    expect(normalizeWeights([1, 3])).toEqual([0.25, 0.75]);
  });
  it('all-zero → equal weights', () => {
    expect(normalizeWeights([0, 0, 0])).toEqual([1 / 3, 1 / 3, 1 / 3]);
  });
  it('empty → empty', () => {
    expect(normalizeWeights([])).toEqual([]);
  });
  it('non-finite treated as zero weight', () => {
    expect(normalizeWeights([Number.NaN, 2])).toEqual([0, 1]);
  });
});

describe('oklabMix', () => {
  it('red + blue 50/50 lands in the violet hue range (not muddy)', () => {
    const mixed = oklabMix([RED, BLUE], [1, 1]);
    const { h, s } = rgbToHsl(mixed);
    expect(h).toBeGreaterThanOrEqual(250);
    expect(h).toBeLessThanOrEqual(300);
    expect(s).toBeGreaterThan(30);
  });
  it('white + black 50/50 is a perceptual mid gray', () => {
    const mixed = oklabMix([WHITE, BLACK], [1, 1]);
    expect(mixed.r).toBe(mixed.g);
    expect(mixed.g).toBe(mixed.b);
    // Oklab L=0.5 is perceptual mid — darker than sRGB's arithmetic 128.
    for (const ch of ['r', 'g', 'b'] as const) {
      expect(mixed[ch]).toBeGreaterThan(85);
      expect(mixed[ch]).toBeLessThan(115);
    }
  });
  it('weighting pulls toward the heavier color', () => {
    const towardRed = oklabMix([RED, BLUE], [9, 1]);
    const towardBlue = oklabMix([RED, BLUE], [1, 9]);
    expect(towardRed.r).toBeGreaterThan(towardBlue.r);
    expect(towardBlue.b).toBeGreaterThan(towardRed.b);
  });
  it('mixing a color with itself is identity', () => {
    const mixed = oklabMix([RED, RED], [3, 7]);
    expect(mixed.r).toBeCloseTo(255, 0);
    expect(mixed.g).toBe(0);
    expect(mixed.b).toBe(0);
  });
  it('degenerate weights fall back to equal mix', () => {
    const mixed = oklabMix([WHITE, BLACK], [0, 0]);
    expect(mixed.r).toBeGreaterThan(0);
  });
});

describe('rgbMix (naive mode)', () => {
  it('white + black = mid gray 128', () => {
    expect(rgbMix([WHITE, BLACK], [1, 1])).toEqual({ r: 128, g: 128, b: 128 });
  });
});

describe('mixSteps', () => {
  it('returns steps samples with endpoints preserved (±1)', () => {
    const steps = mixSteps([RED, BLUE], 5);
    expect(steps).toHaveLength(5);
    expect(Math.abs(steps[0]!.r - 255)).toBeLessThanOrEqual(1);
    expect(Math.abs(steps[4]!.b - 255)).toBeLessThanOrEqual(1);
  });
  it('monotonic lightness-ish path', () => {
    const steps = mixSteps([BLACK, WHITE], 7);
    const lum = steps.map((c) => c.r);
    for (let i = 1; i < lum.length; i++) {
      expect(lum[i]!).toBeGreaterThanOrEqual(lum[i - 1]!);
    }
  });
});

describe('HSL / CMYK conversions', () => {
  it('red → hsl(0,100%,50%)', () => {
    expect(rgbToHsl(RED)).toEqual({ h: 0, s: 100, l: 50 });
  });
  it('hsl round trip within quantization (±2)', () => {
    const rgb = hexToRgb('#6a0dad');
    const back = hslToRgb(rgbToHsl(rgb));
    for (const ch of ['r', 'g', 'b'] as const) {
      expect(Math.abs(back[ch] - rgb[ch])).toBeLessThanOrEqual(2);
    }
  });
  it('red → cmyk(0,100,100,0)', () => {
    expect(rgbToCmyk(RED)).toEqual({ c: 0, m: 100, y: 100, k: 0 });
  });
  it('cmyk round trip', () => {
    const rgb = hexToRgb('#36454f');
    expect(cmykToRgb(rgbToCmyk(rgb))).toEqual(rgb);
  });
});

describe('contrast & formatting', () => {
  it('black vs white = 21:1', () => {
    expect(contrastRatio(BLACK, WHITE)).toBeCloseTo(21, 0);
  });
  it('readableLabel picks white on black', () => {
    expect(readableLabel(BLACK)).toBe('#ffffff');
    expect(readableLabel(WHITE)).toBe('#111111');
  });
  it('formatCss emits expected strings', () => {
    expect(formatCss('rgb', RED)).toBe('rgb(255, 0, 0)');
    expect(formatCss('hsl', RED)).toBe('hsl(0, 100%, 50%)');
  });
  it('colorMixSnippet is exact', () => {
    expect(colorMixSnippet('#ff0000', '#0000ff', 50)).toBe(
      'color-mix(in oklab, #ff0000 50%, #0000ff)',
    );
  });
});

describe('nearestColorName', () => {
  it('names a purple-ish mix in the blue-violet family', () => {
    // Pure #ff0000 + #0000ff perceptually lands near slate blue / blue violet.
    // Matrix page headlines use hand-tuned resultName; this is advisory.
    const name = nearestColorName(oklabMix([RED, BLUE], [1, 1])).name;
    expect(name).toMatch(/purple|violet|mauve|slate/i);
  });
  it('names exact hits exactly', () => {
    expect(nearestColorName(hexToRgb('#ffa500')).name).toBe('Orange');
  });
});
