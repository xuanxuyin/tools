import type { PageDef, VariantCard } from './pageTypes';

/**
 * Shared family-gallery builder (image-density batch, 2026-11-07). A gallery
 * card is derived from a sibling PageDef: its own URL, its h1 as the card
 * title, its sheetImage as the preview — only the one-line "why a teacher
 * picks this version" blurb stays hand-written per family (anti-template
 * discipline: blurbs must differ per sibling, not per family template).
 */
export const defHref = (p: PageDef): string => `${p.path ?? `/${p.slug}`}/`;

export const familyGallery = (
  pages: PageDef[],
  ownHref: string,
  blurbs: Record<string, string>,
): VariantCard[] =>
  pages
    .filter((p) => defHref(p) !== ownHref)
    .map((p) => ({
      href: defHref(p),
      title: p.h1,
      blurb: blurbs[p.slug]!,
      img: p.sheetImage!,
      // tall multi-sheet packs (h/w ≥ 1.6) shrink to a sliver in a contain
      // box — preview the top sheet instead, exactly like the batch-1 cards
      ...(p.sheetImage!.height / p.sheetImage!.width >= 1.6 ? { fit: 'cover' as const } : {}),
    }));
