import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Sitemap image declarations (PLAN #37, 2026-11-11): every product sheet PNG
 * that a built page declares as its og:image must also appear as an
 * <image:image> entry on that page's <url> block in dist/sitemap-0.xml —
 * the incumbent Google Images channel pattern (Superstar's 21k declarations,
 * perlerbeadpatterns.org's per-URL multi-image sitemap).
 *
 * scripts/inject-sitemap-images.mjs does the injection during `npm run build`;
 * this guard re-derives the expectation from the built HTML itself (NOT from
 * the TS data files), so the two sides cannot drift: a future batch that adds
 * a sheet PNG gets its sitemap declaration asserted here automatically, and a
 * declaration without a matching og:image fails as an orphan.
 *
 * Dist guard: order in the release flow is build → vitest.
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');
const SITEMAP = resolve(DIST, 'sitemap-0.xml');
const sitemapReady = existsSync(SITEMAP) && existsSync(resolve(DIST, 'index.html'));

function* walkIndexHtml(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (statSync(p).isDirectory()) yield* walkIndexHtml(p);
    else if (entry.name === 'index.html') yield p;
  }
}

/** meta content arrives HTML-escaped (named AND numeric forms) — mirror the injection script's pipeline exactly */
const unescapeHtml = (s: string) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => {
      const cp = parseInt(h, 16);
      return Number.isFinite(cp) && cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : _;
    })
    .replace(/&#(\d+);/g, (_, d) => {
      const cp = parseInt(d, 10);
      return Number.isFinite(cp) && cp > 0 && cp <= 0x10ffff ? String.fromCodePoint(cp) : _;
    })
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&(?:apos|#0?39);/g, "'")
    .replace(/&amp;/g, '&');
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** page URL → og:image, re-derived from the built HTML (source of truth) */
function expectedImageDeclarations(): Map<string, { img: string; title: string }> {
  const origin = new URL(readFileSync(SITEMAP, 'utf8').match(/<loc>([^<]+)<\/loc>/)![1]).origin;
  const map = new Map<string, { img: string; title: string }>();
  for (const file of walkIndexHtml(DIST)) {
    const html = readFileSync(file, 'utf8');
    const img = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    if (!img || !img.startsWith(`${origin}/images/`) || !img.endsWith('.png')) continue; // brand OG cards excluded
    const title = html.match(/property="og:title" content="([^"]+)"/)?.[1] ?? '';
    const parts = relative(DIST, file).split(/[\\/]/).slice(0, -1);
    map.set(parts.length ? `${origin}/${parts.join('/')}/` : `${origin}/`, {
      img: unescapeHtml(img),
      title: unescapeHtml(title),
    });
  }
  return map;
}

describe.skipIf(!sitemapReady)('sitemap image:image declarations (PLAN #37)', () => {
  const xml = readFileSync(SITEMAP, 'utf8');
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  const blockByLoc = new Map(
    blocks.map((b) => [b.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '', b] as const),
  );
  const expected = expectedImageDeclarations();

  it('the urlset carries the sitemap image namespace', () => {
    expect(xml).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
  });

  it('every product-sheet og:image page has exactly its own declaration (no gaps, no orphans)', () => {
    expect(expected.size).toBeGreaterThanOrEqual(100); // sanity: the image program must not silently empty out
    for (const [url, { img, title }] of expected) {
      const block = blockByLoc.get(url);
      expect(block, `${url} missing from sitemap`).toBeDefined();
      expect(block, `${url}: no <image:image> declared`).toContain('<image:image>');
      expect(block, `${url}: declared image must equal the page og:image`).toContain(
        `<image:loc>${esc(img)}</image:loc>`,
      );
      expect(block, `${url}: declaration must carry a non-empty <image:title>`).toContain(
        `<image:title>${esc(title)}</image:title>`,
      );
    }
    // no orphan declarations: every <image:loc> in the file belongs to an expected page
    const declared = [...blockByLoc].filter(([, b]) => b.includes('<image:image>'));
    expect(declared.map(([url]) => url).sort()).toEqual([...expected.keys()].sort());
  });

  it('every declared image resolves to a real PNG on disk under /images/', () => {
    const origin = new URL([...blockByLoc.keys()][0]).origin;
    for (const loc of xml.match(/<image:loc>([^<]+)<\/loc>/g) ?? []) {
      const url = loc.replace(/<\/?image:loc>/g, '');
      expect(url.startsWith(`${origin}/images/`)).toBe(true);
      expect(url.endsWith('.png')).toBe(true);
      expect(existsSync(resolve(DIST, url.slice(origin.length + 1))), `${url} missing`).toBe(true);
    }
  });

  it('the brand OG card is never declared (homepage carries no image entry)', () => {
    const origin = new URL([...blockByLoc.keys()][0]).origin;
    const home = blockByLoc.get(`${origin}/`);
    expect(home).toBeDefined();
    expect(home!, 'homepage og:image is the brand card, not a product sheet').not.toContain('<image:image>');
  });

  it('spot checks: cursive letter matrix and the hand-built teaching calendar are declared', () => {
    const origin = new URL([...blockByLoc.keys()][0]).origin;
    // title pinned end-to-end: og:title stores "&" as the NUMERIC entity &#38;
    // (Astro attribute escaper) — the title must decode to a single "&" in XML.
    // This is the regression test for the 2026-11-11 production bug where the
    // title went out as literal "&amp;#38;".
    expect(blockByLoc.get(`${origin}/cursive/a/`)).toContain(
      '<image:loc>https://chartglade.com/images/cursive-letter-a-worksheet.png</image:loc>',
    );
    expect(blockByLoc.get(`${origin}/cursive/a/`)).toContain(
      '<image:title>Cursive A — Capital &amp; Lowercase, Free Printable | ChartGlade</image:title>',
    );
    expect(blockByLoc.get(`${origin}/teaching-calendar/`)).toContain(
      '<image:loc>https://chartglade.com/images/teaching-calendar-year-index.png</image:loc>',
    );
  });

  it('no declaration carries a double-escaped or unresolved entity in its title', () => {
    for (const b of blocks.filter((x) => x.includes('<image:image>'))) {
      expect(b).not.toContain('&amp;amp;');
      expect(b, 'numeric entity leaked through decoding').not.toMatch(/&(?:amp;)?#\d+;/);
      expect(b).not.toContain('&amp;lt;');
      expect(b).not.toContain('&amp;gt;');
    }
  });
});
