/**
 * Bead-family content layer: everything numeric on the pages — padded grids,
 * per-zone bead counts, default bead lists, finished size — is computed here
 * at build time, so no two pattern pages share the same numbers (the
 * anti-thin-content rule). The browser island imports only lib/beadPalette;
 * this module stays server-side because it pulls the full catalog.
 */
import { BEAD_PATTERNS } from '../data/beadPatterns';
import type { BeadCategory, BeadPatternDef } from './beadTypes';
import { beadById, beadListFrom, type BeadListEntry } from './beadPalette';
import { SITE } from '../consts';

/** Standard 5mm fuse bead → inches, for the "finished size" line. */
export function beadSizeInches(n: number): string {
  return `${((n * 5) / 25.4).toFixed(1)} in`;
}

export interface RegionView {
  key: string;
  label: string;
  beadId: string;
  beadName: string;
  hex: string;
  count: number;
}

export interface PatternView {
  def: BeadPatternDef;
  /** Rows padded to `width`; '.' = no bead. */
  grid: string[];
  regions: RegionView[];
  totalBeads: number;
  widthIn: string;
  heightIn: string;
  /** Default-color bead list, count-sorted. */
  beadList: BeadListEntry[];
  url: string;
}

/** Detail-page base per category: own gallery for the three SEO categories,
 *  hub path for halloween + minis (they live as hub sections). */
export const CATEGORY_BASE: Record<BeadCategory, string> = {
  animals: '/perler-bead-animals/',
  food: '/perler-bead-food/',
  christmas: '/christmas-perler-bead-patterns/',
  halloween: '/perler-bead-patterns/',
  minis: '/perler-bead-patterns/',
};

export const CATEGORY_LABEL: Record<BeadCategory, string> = {
  animals: 'Animals',
  food: 'Food',
  christmas: 'Christmas',
  halloween: 'Halloween',
  minis: 'Minis',
};

export function patternUrl(p: BeadPatternDef): string {
  return `${CATEGORY_BASE[p.category]}${p.slug}/`;
}

export function buildPattern(def: BeadPatternDef): PatternView {
  const grid = def.rows.map((r) => r.padEnd(def.width, '.'));

  const counts = new Map<string, number>();
  for (const row of grid) {
    for (const ch of row) {
      if (ch === '.') continue;
      counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
  }

  const regions: RegionView[] = Object.entries(def.regions).map(([key, r]) => {
    const bead = beadById(r.color);
    return {
      key,
      label: r.label,
      beadId: r.color,
      beadName: bead?.name ?? r.color,
      hex: bead?.hex ?? '#888888',
      count: counts.get(key) ?? 0,
    };
  });

  const beadList = beadListFrom(regions.map((r) => ({ hex: r.hex, count: r.count })));

  return {
    def,
    grid,
    regions,
    totalBeads: regions.reduce((s, r) => s + r.count, 0),
    widthIn: beadSizeInches(def.width),
    heightIn: beadSizeInches(grid.length),
    beadList,
    url: patternUrl(def),
  };
}

export const patternContents: PatternView[] = BEAD_PATTERNS.map(buildPattern);

export function patternBySlug(slug: string): PatternView | undefined {
  return patternContents.find((p) => p.def.slug === slug);
}

export function patternsByCategory(cat: BeadCategory): PatternView[] {
  return patternContents.filter((p) => p.def.category === cat);
}

export const easyPatterns: PatternView[] = patternContents.filter(
  (p) => p.def.difficulty === 'easy',
);

export const categoryCounts: Record<BeadCategory, number> = {
  animals: patternsByCategory('animals').length,
  food: patternsByCategory('food').length,
  christmas: patternsByCategory('christmas').length,
  halloween: patternsByCategory('halloween').length,
  minis: patternsByCategory('minis').length,
};

export const totalPatternCount = patternContents.length;

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

export function beadCrumbItems(view: PatternView): { name: string; item: string }[] {
  return [
    { name: 'Home', item: SITE.url },
    { name: 'Perler Bead Patterns', item: `${SITE.url}/perler-bead-patterns/` },
    {
      name: CATEGORY_LABEL[view.def.category],
      item: `${SITE.url}${CATEGORY_BASE[view.def.category]}`,
    },
    { name: view.def.name, item: `${SITE.url}${view.url}` },
  ];
}

/** Pegboard guidance by grid width (standard boards: 16×16 small, 29×29 large
 *  interlocking — the sizes real US crafters already own). */
export function pegboardsFor(w: number): string {
  if (w <= 16) return 'a single small square pegboard (16×16)';
  if (w <= 29) return 'a single large interlocking pegboard (29×29)';
  if (w <= 58) return 'two large interlocking pegboards side by side';
  return 'three large interlocking pegboards (or two large plus one small square)';
}

/** Breadcrumb + per-pattern FAQ whose answers embed the computed counts. */
export function patternFaqs(view: PatternView): { q: string; a: string }[] {
  return [
    {
      q: `How many beads does the ${view.def.name} pattern need?`,
      a: `${view.totalBeads} beads total: ${view.beadList
        .map((b) => `${b.bead.name} ×${b.count}`)
        .join(', ')}. The finished piece measures about ${view.widthIn} wide.`,
    },
    {
      q: `Is the ${view.def.name} pattern good for beginners?`,
      a:
        view.def.difficulty === 'easy'
          ? `Yes — it is marked easy: ${view.regions.length} color zones and no fiddly single-bead details beyond the standard ones. Most first-timers finish it in one sitting.`
          : `It is a medium design: ${view.regions.length} color zones and a few single-bead details. Comfortable after one or two easy patterns.`,
    },
    {
      q: `What pegboard size does the ${view.def.name} use?`,
      a: `The grid is ${view.def.width} beads wide by ${view.grid.length} tall — plan on ${pegboardsFor(view.def.width)}.`,
    },
  ];
}

export function patternJsonLd(view: PatternView): Record<string, unknown>[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: beadCrumbItems(view).map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: patternFaqs(view).map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];
}
