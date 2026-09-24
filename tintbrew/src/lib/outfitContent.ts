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
import { hexToRgb, oklabMix, rgbToHex } from './color';
import { nearestColorName } from './colorName';
import { comboReadHexes, ladderFrom } from './pairingRead';
import { SITE } from '../consts';

export { oklabHue, oklabChroma, oklabLightness, pairingRelation } from './pairingRead';

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
/* Build                                                                */
/* ------------------------------------------------------------------ */

export function buildOutfit(def: OutfitDef): OutfitView {
  const combos: ComboView[] = def.combos.map((c) => ({
    ...c,
    items: c.items.map((it) => ({ ...it, name: nearestColorName(hexToRgb(it.hex)).name })),
    read: comboReadHexes(c.items),
    ladder: ladderFrom(c.items.map((it) => it.hex)),
  }));

  const decor: DecorView[] = def.decor.map((d) => ({
    ...d,
    ladder: ladderFrom(d.colors.map((c) => c.hex)),
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
