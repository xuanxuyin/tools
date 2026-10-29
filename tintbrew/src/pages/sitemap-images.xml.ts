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
import { patternContents, easyPatterns, CATEGORY_BASE } from '../lib/beadContent';

export const GET: APIRoute = async () => {
  const img = (loc: string, title?: string) =>
    `<image:image><image:loc>${loc}</image:loc>${title ? `<image:title>${title}</image:title>` : ''}</image:image>`;

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

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    `${urls.join('\n')}\n` +
    `</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
