/**
 * Nearest-Mardiy-bead by hex — plain Oklab distance, no chroma guard (this
 * is a brush picker / template mapper, not the photo converter's matcher,
 * which keeps its own chroma-aware distance in photoToPattern.ts). Lives in
 * lib so the editor island, the build-time template exporter and the studio
 * publish payload all map colors with the exact same rule.
 */
import { MARD_COLORS } from './mardPalette';
import { hexToRgb, rgbToOklab, type Oklab } from './color';

const LAB = new Map<string, Oklab>(
  MARD_COLORS.map((b) => [b.id, rgbToOklab(hexToRgb(b.hex))] as const),
);

export function nearestMardId(hex: string): string {
  const lab = rgbToOklab(hexToRgb(hex));
  let best = MARD_COLORS[0]!.id;
  let bestD = Infinity;
  for (const b of MARD_COLORS) {
    const l = LAB.get(b.id)!;
    const d = Math.hypot(lab.L - l.L, lab.a - l.a, lab.b - l.b);
    if (d < bestD) {
      bestD = d;
      best = b.id;
    }
  }
  return best;
}
