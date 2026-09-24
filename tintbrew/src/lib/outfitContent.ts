/**
 * Outfit-pairing page content generation (V2.2). Mirrors lib/scenarioContent.ts:
 * hand-written pairing knowledge stays in data/outfitPalettes.ts; everything
 * numeric shown on the page — nearest-name sublabels, the Oklab "why it works"
 * read, and the gradient ladders — is computed here at build time.
 *
 * The why-line is the anti-thin-content layer: no two combos produce the same
 * numbers, and every claim on the page traces to engine output.
 */
import {
  outfitPages,
  type AvoidColor,
  type DecorPalette,
  type OutfitCombo,
  type OutfitDef,
  type OutfitItem,
} from '../data/outfitPalettes';
import { hexToRgb, mixSteps, oklabMix, rgbToHex, rgbToOklab, type RGB } from './color';
import { nearestColorName } from './colorName';
import { SITE } from '../consts';

export interface ItemView extends OutfitItem {
  /** Engine-computed nearest name, e.g. 'Tan' — advisory sublabel. */
  name: string;
}

export interface ComboView extends OutfitCombo {
  items: ItemView[];
  /** One computed sentence: lightness gap + hue relation between the anchor
   *  piece and its furthest partner. */
  read: string;
  /** 9-step Oklab ladder through the first three pieces of the combo. */
  ladder: string[];
}

export interface DecorView extends DecorPalette {
  ladder: string[];
}

export interface OutfitView {
  def: OutfitDef;
  combos: ComboView[];
  decor: DecorView[];
  avoid: AvoidColor[];
  /** [base, partner, partner, partner] — hub swatch strip + OG card. */
  heroStrip: string[];
}

/* ------------------------------------------------------------------ */
/* Oklab geometry                                                       */
/* ------------------------------------------------------------------ */

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

function ladder(colors: string[], steps = 9): string[] {
  const rgbs: RGB[] = colors.slice(0, 3).map((h) => hexToRgb(h));
  return mixSteps(rgbs, steps).map(rgbToHex);
}

/* ------------------------------------------------------------------ */
/* Build                                                                */
/* ------------------------------------------------------------------ */

const lower = (hex: string) => nearestColorName(hexToRgb(hex)).name.toLowerCase();

function comboRead(items: OutfitItem[]): string {
  const anchor = items[0]!;
  // The pairing story is anchor vs its furthest partner in lightness.
  let partner = items[1] ?? anchor;
  let maxGap = -1;
  for (const it of items.slice(1)) {
    const gap = Math.abs(oklabLightness(anchor.hex) - oklabLightness(it.hex));
    if (gap > maxGap) {
      maxGap = gap;
      partner = it;
    }
  }
  const la = oklabLightness(anchor.hex);
  const lp = oklabLightness(partner.hex);
  return (
    `Oklab read: ${lower(anchor.hex)} (L ${la.toFixed(2)}) vs ${lower(partner.hex)} (L ${lp.toFixed(2)}) — ` +
    `a ${maxGap.toFixed(2)} lightness gap (${gapWord(maxGap)} contrast), ${pairingRelation(anchor.hex, partner.hex)}.`
  );
}

export function buildOutfit(def: OutfitDef): OutfitView {
  const combos: ComboView[] = def.combos.map((c) => ({
    ...c,
    items: c.items.map((it) => ({ ...it, name: nearestColorName(hexToRgb(it.hex)).name })),
    read: comboRead(c.items),
    ladder: ladder(c.items.map((it) => it.hex)),
  }));

  const decor: DecorView[] = def.decor.map((d) => ({
    ...d,
    ladder: ladder(d.colors.map((c) => c.hex)),
  }));

  return {
    def,
    combos,
    decor,
    avoid: def.avoid,
    heroStrip: [
      def.baseHex,
      ...combos[0]!.items.slice(1).map((it) => it.hex),
    ],
  };
}

export const outfitContents: OutfitView[] = outfitPages.map(buildOutfit);

export function outfitBySlug(slug: string): OutfitView | undefined {
  return outfitContents.find((o) => o.def.slug === slug);
}

/** Average Oklab blend of a page's hero strip — the hub card accent. */
export function heroBlend(strip: string[]): string {
  return rgbToHex(oklabMix(strip.map((h) => hexToRgb(h)), strip.map(() => 1)));
}

/** JSON-LD shared by every outfit page (breadcrumb + FAQ). */
export function outfitJsonLd(v: OutfitView): Record<string, unknown>[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Color Guides', item: `${SITE.url}/color-guides/` },
        { '@type': 'ListItem', position: 3, name: v.def.h1, item: `${SITE.url}/${v.def.slug}/` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: v.def.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];
}
