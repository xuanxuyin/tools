/**
 * Pure pairing math shared by two sides:
 *  - build time: lib/outfitContent.ts renders the static read + ladder
 *  - run time: scripts/outfit.ts recomputes them when a visitor swaps a color
 *
 * It lives in its own module (not outfitContent.ts) because importing the
 * page generator from the browser would drag the whole outfitPalettes data
 * file into the client bundle. A parity test locks the two paths together.
 */
import { hexToRgb, mixSteps, rgbToHex, rgbToOklab, type RGB } from './color';
import { nearestColorName } from './colorName';

export function oklabHue(hex: string): number {
  const { a, b } = rgbToOklab(hexToRgb(hex));
  return (Math.atan2(b, a) * 180) / Math.PI;
}

export function oklabChroma(hex: string): number {
  const { a, b } = rgbToOklab(hexToRgb(hex));
  return Math.hypot(a, b);
}

export function oklabLightness(hex: string): number {
  return rgbToOklab(hexToRgb(hex)).L;
}

function hueDistance(h1: number, h2: number): number {
  const d = Math.abs(h1 - h2) % 360;
  return d > 180 ? 360 - d : d;
}

/** Fashion-worded hue relation between an anchor and a partner. */
export function pairingRelation(anchorHex: string, partnerHex: string): string {
  const neutral = 0.04; // below this chroma a color reads as a neutral
  if (oklabChroma(anchorHex) < neutral || oklabChroma(partnerHex) < neutral) {
    return 'a neutral anchoring the color';
  }
  const dh = hueDistance(oklabHue(anchorHex), oklabHue(partnerHex));
  if (dh <= 40) return 'a same-family hue echo';
  if (dh >= 130) return 'an opposite-hue contrast';
  return 'a balanced mid-wheel contrast';
}

function gapWord(gap: number): string {
  if (gap >= 0.3) return 'high';
  if (gap >= 0.15) return 'medium';
  return 'low';
}

/**
 * The one-sentence "why it works" line: anchor vs its furthest partner in
 * lightness. Accepts bare hex strings (client island) or `{ hex }` items
 * (build-time combo data) so both sides share one implementation.
 */
export function comboReadHexes(items: readonly ({ hex: string } | string)[]): string {
  const hexOf = (x: { hex: string } | string) => (typeof x === 'string' ? x : x.hex);
  const anchor = hexOf(items[0]!);
  let partner = items.length > 1 ? hexOf(items[1]!) : anchor;
  let maxGap = -1;
  for (const it of items.slice(1)) {
    const gap = Math.abs(oklabLightness(anchor) - oklabLightness(hexOf(it)));
    if (gap > maxGap) {
      maxGap = gap;
      partner = hexOf(it);
    }
  }
  const la = oklabLightness(anchor);
  const lp = oklabLightness(partner);
  const lower = (hex: string) => nearestColorName(hexToRgb(hex)).name.toLowerCase();
  return (
    `Oklab read: ${lower(anchor)} (L ${la.toFixed(2)}) vs ${lower(partner)} (L ${lp.toFixed(2)}) — ` +
    `a ${maxGap.toFixed(2)} lightness gap (${gapWord(maxGap)} contrast), ${pairingRelation(anchor, partner)}.`
  );
}

/** 9-step Oklab ladder through the first three colors of a set. */
export function ladderFrom(colors: string[], steps = 9): string[] {
  const rgbs: RGB[] = colors.slice(0, 3).map((h) => hexToRgb(h));
  return mixSteps(rgbs, steps).map(rgbToHex);
}
