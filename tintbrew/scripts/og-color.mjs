/**
 * Plain-JS port of src/lib/color.ts for the OG generator (Node can't import
 * the TS engine from an .mjs one-shot). FAITHFUL COPY of the math — constants,
 * clamping and rounding included. src/lib/og.test.ts locks this port against
 * the engine (data parity + mix-math parity), so any drift fails the suite.
 */

export function normalizeHex(input) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(input.trim());
  if (!m) return null;
  const h = m[1].toLowerCase();
  if (h.length === 3) {
    return `#${h[0]}${h[0]}${h[1]}${h[1]}${h[2]}${h[2]}`;
  }
  return `#${h}`;
}

export function hexToRgb(hex) {
  const h = normalizeHex(hex) ?? '#000000';
  return {
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
  };
}

export function rgbToHex({ r, g, b }) {
  const to2 = (n) =>
    Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
  return `#${to2(r)}${to2(g)}${to2(b)}`;
}

export function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function linearToSrgb(c) {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export function rgbToOklab({ r, g, b }) {
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

export function oklabToRgb(ok) {
  const l_ = ok.L + 0.3963377774 * ok.a + 0.2158037573 * ok.b;
  const m_ = ok.L - 0.1055613458 * ok.a - 0.0638541728 * ok.b;
  const s_ = ok.L - 0.0894841775 * ok.a - 1.291485548 * ok.b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const lr = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const q = (lin) =>
    Math.round(Math.min(1, Math.max(0, linearToSrgb(lin))) * 255);
  return { r: q(lr), g: q(lg), b: q(lb) };
}

export function normalizeWeights(weights) {
  const n = weights.length;
  if (n === 0) return [];
  const clean = weights.map((w) => (Number.isFinite(w) && w > 0 ? w : 0));
  const sum = clean.reduce((acc, w) => acc + w, 0);
  if (sum <= 0) return new Array(n).fill(1 / n);
  return clean.map((w) => w / sum);
}

export function oklabMix(colors, weights) {
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

/** 50/50 perceptual blend of two hex strings — what every mix page shows. */
export function mixHex(hexA, hexB) {
  return rgbToHex(oklabMix([hexToRgb(hexA), hexToRgb(hexB)], [1, 1]));
}
