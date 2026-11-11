/**
 * Image sitemap (user call, 2026-10-29: "make our patterns real image URLs —
 * the competitor's AITDK image tab lists 39, ours lists none"). Google Images
 * only indexes pictures that exist as crawlable URLs; the detail-page boards
 * are inline SVG, so the prebuilt webp thumbs are the site's real image
 * inventory. This file declares every thumb under its owning page — one
 * <url> per pattern detail page, one per category landing (the Superstar
 * 21,118-declaration pattern from chartglade's incumbent teardown).
 * robots.txt lists it alongside the @astrojs/sitemap index.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../consts';
import {
  patternContents,
  easyPatterns,
  cutePatterns,
  smallPatterns,
  CATEGORY_BASE,
} from '../lib/beadContent';
import { COLORING_PIECES } from '../data/coloring';
import { mixes } from '../data/mixes';
import { buildMixContent } from '../lib/mixContent';
import { scenarioContents } from '../lib/scenarioContent';
import { outfitContents } from '../lib/outfitContent';

export const GET: APIRoute = async () => {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const img = (loc: string, title?: string) =>
    `<image:image><image:loc>${esc(loc)}</image:loc>${title ? `<image:title>${esc(title)}</image:title>` : ''}</image:image>`;

  const urls: string[] = [];

  // every pattern detail page carries its own thumb
  for (const v of patternContents) {
    urls.push(
      `<url><loc>${SITE.url}${v.url}</loc>${img(
        `${SITE.url}/pattern-thumbs/${v.def.slug}.webp`,
        v.def.name,
      )}</url>`,
    );
  }

  // category landing pages declare all their thumbs (several categories share
  // a base page — those merge naturally in the map)
  const byBase = new Map<string, { loc: string; title: string }[]>();
  for (const v of patternContents) {
    const base = CATEGORY_BASE[v.def.category];
    const list = byBase.get(base) ?? [];
    list.push({ loc: `${SITE.url}/pattern-thumbs/${v.def.slug}.webp`, title: v.def.name });
    byBase.set(base, list);
  }
  for (const [base, thumbs] of byBase) {
    urls.push(
      `<url><loc>${SITE.url}${base}</loc>${thumbs.map((t) => img(t.loc, t.title)).join('')}</url>`,
    );
  }

  // the easy-patterns filter page gets its own declaration set
  urls.push(
    `<url><loc>${SITE.url}/easy-perler-bead-patterns/</loc>${easyPatterns
      .map((v) => img(`${SITE.url}/pattern-thumbs/${v.def.slug}.webp`, v.def.name))
      .join('')}</url>`,
  );

  // collection landings (2026-10-29) declare the thumbs they render — the
  // letters page renders inline SVG glyphs, so it has no webp to declare
  for (const [path, views] of [
    ['/cute-perler-bead-patterns/', cutePatterns],
    ['/small-perler-bead-patterns/', smallPatterns],
  ] as const) {
    urls.push(
      `<url><loc>${SITE.url}${path}</loc>${views
        .map((v) => img(`${SITE.url}/pattern-thumbs/${v.def.slug}.webp`, v.def.name))
        .join('')}</url>`,
    );
  }
  // coloring channel (2026-11-03): each detail page declares its own line-art
  // thumb, and the hub declares the whole watermarked set — same per-page +
  // per-hub split the bead patterns use
  for (const p of COLORING_PIECES) {
    urls.push(
      `<url><loc>${SITE.url}/coloring/${p.slug}/</loc>${img(
        `${SITE.url}/coloring/line/${p.slug}.webp`,
        p.title,
      )}</url>`,
    );
  }
  urls.push(
    `<url><loc>${SITE.url}/coloring/</loc>${COLORING_PIECES.map((p) =>
      img(`${SITE.url}/coloring/thumb/${p.slug}.webp`, p.title),
    ).join('')}</url>`,
  );

  // the fuse synonym landing renders the full catalog — every thumb under it
  urls.push(
    `<url><loc>${SITE.url}/fuse-bead-patterns/</loc>${patternContents
      .map((v) => img(`${SITE.url}/pattern-thumbs/${v.def.slug}.webp`, v.def.name))
      .join('')}</url>`,
  );

  // OG-card declarations (2026-11-11, chartglade #37 sibling batch): the mix
  // matrix, scenario/head-word, outfit and tool pages carry per-page branded
  // OG cards in public/og/ — 46 images that were the last product pictures on
  // the site with no sitemap declaration. One <url> per page, card as image.
  // Titles come from the same defs the page templates render (no drift), and
  // the parity guard in src/lib/sitemapImages.test.ts re-derives the whole
  // expectation from built dist HTML so future families cannot slip through.
  const ogCardUrls = [
    ...mixes.map((def) => {
      const c = buildMixContent(def);
      return {
        path: `/mix/${def.a}-${def.b}/`,
        image: `/og/mix-${def.a}-${def.b}.png`,
        title: `${c.a.name} and ${c.b.name} make ${def.resultName}`,
      };
    }),
    ...scenarioContents.map((s) => ({
      path: `/${s.def.slug}/`,
      image: `/og/${s.def.slug}.png`,
      title: s.def.metaTitle,
    })),
    ...outfitContents.map((o) => ({
      path: `/${o.def.slug}/`,
      image: `/og/${o.def.slug}.png`,
      title: o.def.metaTitle,
    })),
    { path: '/color-mixer/', image: '/og/color-mixer.png', title: 'Online color mixer — blend two colors' },
    { path: '/color-mixing-chart/', image: '/og/color-mixing-chart.png', title: 'Color mixing chart' },
    { path: '/hue-test/', image: '/og/hue-test.png', title: 'Hue test — check your color vision' },
  ];
  for (const u of ogCardUrls) {
    urls.push(`<url><loc>${SITE.url}${u.path}</loc>${img(`${SITE.url}${u.image}`, u.title)}</url>`);
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    `${urls.join('\n')}\n` +
    `</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
