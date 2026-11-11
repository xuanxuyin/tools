// Sitemap image declarations (PLAN #37, 2026-11-11): post-process dist/sitemap-0.xml
// to declare each built page's product PNG as <image:image> — the incumbent
// pattern from the 2026-10/11 teardowns (Superstar's 21k declarations,
// perlerbeadpatterns.org's per-URL multi-image sitemap = the Google Images
// channel's front door). We shipped 51+ sheet PNGs with page-level og:image
// but never declared them in the sitemap; this closes that gap.
//
// Source of truth = the built dist HTML (og:image), NOT the TS data files
// (Node ESM cannot import TS), so any future batch that adds a sheet PNG
// enters the declarations with zero script changes. Brand OG cards (anything
// outside /images/*.png, e.g. /og-default.png) are skipped — every declaration
// must be a product sheet.
//
// @astrojs/sitemap already emits the xmlns:image namespace on <urlset>; this
// script only injects the <image:image> elements. Runs as part of
// `npm run build` (astro build && this) so CF Pages picks it up unchanged.
//
// Usage: node scripts/inject-sitemap-images.mjs   (after astro build)
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITEMAP = join(DIST, 'sitemap-0.xml');

if (!existsSync(SITEMAP)) {
  console.error('[sitemap-images] dist/sitemap-0.xml not found — run astro build first');
  process.exit(1);
}

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// meta content arrives HTML-escaped (og:title "A &amp; B") — decode before
// re-escaping as XML, or entities get double-escaped
const unescapeHtml = (s) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&(?:apos|#0?39);/g, "'")
    .replace(/&amp;/g, '&');

function* walkIndexHtml(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkIndexHtml(p);
    else if (entry.name === 'index.html') yield p;
  }
}

const xml = readFileSync(SITEMAP, 'utf8');
const firstLoc = xml.match(/<loc>([^<]+)<\/loc>/)?.[1];
if (!firstLoc) {
  console.error('[sitemap-images] no <loc> found in sitemap — nothing to do');
  process.exit(1);
}
const origin = new URL(firstLoc).origin;

// page URL → { img, title } from each built page's og:image / og:title
const pages = new Map();
let skippedBrand = 0;
for (const file of walkIndexHtml(DIST)) {
  const html = readFileSync(file, 'utf8');
  const img = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  if (!img) continue;
  if (!img.startsWith(`${origin}/images/`) || !img.endsWith('.png')) {
    skippedBrand++;
    continue;
  }
  const title = html.match(/property="og:title" content="([^"]+)"/)?.[1] ?? '';
  const rel = relative(DIST, file); // e.g. "place-value-chart\index.html" or "index.html"
  const parts = rel.split(/[\\/]/).slice(0, -1); // drop index.html
  const pageUrl = parts.length ? `${origin}/${parts.join('/')}/` : `${origin}/`;
  pages.set(pageUrl, { img: unescapeHtml(img), title: unescapeHtml(title) });
}

let injected = 0;
let inSitemap = 0;
const out = xml.replace(/<url>([\s\S]*?)<\/url>/g, (whole, inner) => {
  const loc = inner.match(/<loc>([^<]+)<\/loc>/)?.[1];
  if (!loc) return whole;
  if (inner.includes('<image:image>')) return whole; // idempotent on re-run
  const page = pages.get(loc);
  if (!page) return whole;
  inSitemap++;
  injected++;
  // inject INSIDE the <url> block — whole ends with '</url>', append before it
  const decl = `<image:image><image:loc>${esc(page.img)}</image:loc><image:title>${esc(page.title)}</image:title></image:image>`;
  return whole.slice(0, -'</url>'.length) + decl + '</url>';
});

writeFileSync(SITEMAP, out);
console.log(
  `[sitemap-images] injected ${injected} <image:image> declarations ` +
    `(sitemap urls: ${inSitemap} matched, ${skippedBrand} non-product og:image skipped)`,
);
