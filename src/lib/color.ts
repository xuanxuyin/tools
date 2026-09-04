/**
 * TintBrew color engine — pure functions, no DOM.
 *
 * Mixing happens in Oklab, a perceptually uniform color space: equal numeric
 * steps correspond to equal perceived changes, so weighted blends match what
 * mixing paint *looks like* far better than naive channel averaging.
 * Matrices from Björn Ottosson's Oklab spec (https://bottosson.github.io/posts/oklab/).
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
} // 0–255 integers
export interface Oklab {
  L: number;
  a: number;
  b: number;
} // L 0–1, a/b ≈ -0.4…0.4
export interface HSL {
  h: number;
  s: number;
  l: number;
} // h 0–360, s/l 0–100
export interface HSV {
  h: number;
  s: number;
  v: number;
} // h 0–360, s/v 0–100
export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
} // 0–100

/* ------------------------------------------------------------------ */
/* Parsing & formatting                                                */
/* ------------------------------------------------------------------ */

/** Accepts 'abc', '#abc', 'aabbcc', '#AABBCC' → '#aabbcc', else null. */
export function normalizeHex(input: string): string | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(input.trim());
  if (!m) return null;
  const h = m[1].toLowerCase();
  if (h.length === 3) {
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
  }
  return `#${h}`;
}

export function hexToRgb(hex: string): RGB {
  const h = normalizeHex(hex) ?? '#000000';
  return {
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const to2 = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
  return `#${to2(r)}${to2(g)}${to2(b)}`;
}

/* ------------------------------------------------------------------ */
/* sRGB ↔ linear ↔ Oklab                                               */
/* ------------------------------------------------------------------ */

export function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export function rgbToOklab({ r, g, b }: RGB): Oklab {
  const lr = srgbToLinear(r / 255);
  const lg = srgbToLinear(g / 255);
  const lb = srgbToLinear(b / 255);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  };
}

/** Back to sRGB. Channels leaving the [0,1] gamut are clamped — visually
 *  indistinguishable for in-gamut blends; a full chroma-reduction gamut
 *  mapper is the upgrade path if we ever need it. */
export function oklabToRgb(ok: Oklab): RGB {
  const l_ = ok.L + 0.3963377774 * ok.a + 0.2158037573 * ok.b;
  const m_ = ok.L - 0.1055613458 * ok.a - 0.0638541728 * ok.b;
  const s_ = ok.L - 0.0894841775 * ok.a - 1.291485548 * ok.b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const q = (lin: number) =>
    Math.round(Math.min(1, Math.max(0, linearToSrgb(lin))) * 255);
  return { r: q(lr), g: q(lg), b: q(lb) };
}

/* ------------------------------------------------------------------ */
/* Mixing                                                              */
/* ------------------------------------------------------------------ */

/** Normalize weights to sum 1. Degenerate input (empty, all-zero, NaN) →
 *  equal weights, so callers never see NaN. */
export function normalizeWeights(weights: number[]): number[] {
  const n = weights.length;
  if (n === 0) return [];
  const clean = weights.map((w) => (Number.isFinite(w) && w > 0 ? w : 0));
  const sum = clean.reduce((acc, w) => acc + w, 0);
  if (sum <= 0) return new Array<number>(n).fill(1 / n);
  return clean.map((w) => w / sum);
}

/** Perceptual weighted blend in Oklab. */
export function oklabMix(colors: RGB[], weights: number[]): RGB {
  const w = normalizeWeights(weights.slice(0, colors.length));
  let L = 0;
  let a = 0;
  let b = 0;
  colors.forEach((c, i) => {
    const ok = rgbToOklab(c);
    L += ok.L * w[i];
    a += ok.a * w[i];
    b += ok.b * w[i];
  });
  return oklabToRgb({ L, a, b });
}

/** Naive channel-average blend (for the comparison toggle). */
export function rgbMix(colors: RGB[], weights: number[]): RGB {
  const w = normalizeWeights(weights.slice(0, colors.length));
  let r = 0;
  let g = 0;
  let b = 0;
  colors.forEach((c, i) => {
    r += c.r * w[i];
    g += c.g * w[i];
    b += c.b * w[i];
  });
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

/** N evenly spaced samples walking through the color list (Oklab). */
export function mixSteps(colors: RGB[], steps: number): RGB[] {
  if (steps <= 1 || colors.length === 0) return colors.slice(0, Math.max(steps, 0));
  const segs = colors.length - 1;
  const out: RGB[] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / (steps - 1)) * segs;
    const seg = Math.min(segs - 1, Math.floor(t));
    const local = t - seg;
    out.push(oklabMix([colors[seg], colors[seg + 1]], [1 - local, local]));
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* HSL / HSV / CMYK conversions                                         */
/* ------------------------------------------------------------------ */

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const hn = ((h % 360) + 360) % 360;
  const sn = Math.min(100, Math.max(0, s)) / 100;
  const ln = Math.min(100, Math.max(0, l)) / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (hn < 60) [r, g, b] = [c, x, 0];
  else if (hn < 120) [r, g, b] = [x, c, 0];
  else if (hn < 180) [r, g, b] = [0, c, x];
  else if (hn < 240) [r, g, b] = [0, x, c];
  else if (hn < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function rgbToHsv({ r, g, b }: RGB): HSV {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
        break;
      case gn:
        h = ((bn - rn) / d + 2) * 60;
        break;
      default:
        h = ((rn - gn) / d + 4) * 60;
    }
  }
  return { h: Math.round(h), s: Math.round(max === 0 ? 0 : (d / max) * 100), v: Math.round(max * 100) };
}

export function hsvToRgb({ h, s, v }: HSV): RGB {
  const hn = ((h % 360) + 360) % 360;
  const sn = Math.min(100, Math.max(0, s)) / 100;
  const vn = Math.min(100, Math.max(0, v)) / 100;
  const c = vn * sn;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = vn - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (hn < 60) [r, g, b] = [c, x, 0];
  else if (hn < 120) [r, g, b] = [x, c, 0];
  else if (hn < 180) [r, g, b] = [0, c, x];
  else if (hn < 240) [r, g, b] = [0, x, c];
  else if (hn < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

export function rgbToCmyk({ r, g, b }: RGB): CMYK {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - rn - k) / (1 - k)) * 100),
    m: Math.round(((1 - gn - k) / (1 - k)) * 100),
    y: Math.round(((1 - bn - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

export function cmykToRgb({ c, m, y, k }: CMYK): RGB {
  const q = (v: number) => Math.round(255 * (1 - v / 100) * (1 - k / 100));
  return { r: q(c), g: q(m), b: q(y) };
}

/* ------------------------------------------------------------------ */
/* Contrast & CSS snippets                                             */
/* ------------------------------------------------------------------ */

export function relativeLuminance({ r, g, b }: RGB): number {
  return (
    0.2126 * srgbToLinear(r / 255) +
    0.7152 * srgbToLinear(g / 255) +
    0.0722 * srgbToLinear(b / 255)
  );
}

export function contrastRatio(a: RGB, b: RGB): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la >= lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Pick readable label color (white or near-black) for text on a swatch. */
export function readableLabel(bg: RGB): string {
  return contrastRatio(bg, { r: 255, g: 255, b: 255 }) >=
    contrastRatio(bg, { r: 17, g: 17, b: 17 })
    ? '#ffffff'
    : '#111111';
}

export function formatCss(kind: 'rgb' | 'hsl' | 'hsv' | 'cmyk', rgb: RGB): string {
  switch (kind) {
    case 'rgb':
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case 'hsl': {
      const { h, s, l } = rgbToHsl(rgb);
      return `hsl(${h}, ${s}%, ${l}%)`;
    }
    case 'hsv': {
      const { h, s, v } = rgbToHsv(rgb);
      return `hsv(${h}, ${s}%, ${v}%)`;
    }
    case 'cmyk': {
      const { c, m, y, k } = rgbToCmyk(rgb);
      return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
    }
  }
}

/** CSS-native snippet mirroring our perceptual mix of two colors. */
export function colorMixSnippet(a: string, b: string, pctA: number): string {
  const p = Math.round(Math.min(100, Math.max(0, pctA)));
  return `color-mix(in oklab, ${a} ${p}%, ${b})`;
}
