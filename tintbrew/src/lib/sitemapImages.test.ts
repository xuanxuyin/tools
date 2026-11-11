import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Image sitemap parity guard (2026-11-11, chartglade #37 sibling batch):
 * every product image a built page declares as its og:image must also be
 * declared under that page's <url> in dist/sitemap-images.xml. The
 * expectation is re-derived from the built HTML itself — NOT from the TS
 * data — so a future family that adds og cards (or thumbs) gets its
 * declaration asserted here automatically, and a declaration whose image
 * does not exist on disk fails as broken.
 *
 * Dist guard: order in the release flow is build → vitest.
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');
const PUBLIC = resolve(ROOT, 'public');
const SITEMAP_IMAGES = resolve(DIST, 'sitemap-images.xml');
const ready = existsSync(SITEMAP_IMAGES) && existsSync(resolve(DIST, 'index.html'));

function* walkIndexHtml(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (statSync(p).isDirectory()) yield* walkIndexHtml(p);
    else if (entry.name === 'index.html') yield p;
  }
}

describe.skipIf(!ready)('image sitemap parity with built pages', () => {
  const xml = readFileSync(SITEMAP_IMAGES, 'utf8');
  const origin = new URL(xml.match(/<loc>([^<]+)<\/loc>/)![1]).origin;
  const blockByLoc = new Map<string, string>();
  for (const b of xml.match(/<url>[\s\S]*?<\/url>/g) ?? []) {
    const loc = b.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
    blockByLoc.set(loc, (blockByLoc.get(loc) ?? '') + b);
  }

  it('the urlset carries the sitemap image namespace', () => {
    expect(xml).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"');
  });

  it('every product og:image page is declared with exactly its own image', () => {
    let checked = 0;
    for (const file of walkIndexHtml(DIST)) {
      const html = readFileSync(file, 'utf8');
      const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
      if (!og || og === `${origin}/og-default.png`) continue; // brand card excluded
      const parts = relative(DIST, file).split(/[\\/]/).slice(0, -1);
      const pageUrl = parts.length ? `${origin}/${parts.join('/')}/` : `${origin}/`;
      const block = blockByLoc.get(pageUrl);
      expect(block, `${pageUrl} carries product og:image ${og} but has no <url> in sitemap-images.xml`).toBeDefined();
      expect(block, `${pageUrl}: must declare ${og}`).toContain(`<image:loc>${og}</image:loc>`);
      checked++;
    }
    expect(checked, 'the product-og:image page inventory must not silently empty out').toBeGreaterThanOrEqual(150);
  });

  it('every declared image resolves to a real file on disk', () => {
    for (const m of xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) {
      const url = m[1];
      expect(url.startsWith(`${origin}/`), `${url} off-origin`).toBe(true);
      expect(existsSync(resolve(PUBLIC, url.slice(origin.length + 1))), `${url} missing from public/`).toBe(true);
    }
  });

  it('no declared <url> points at a page that was not built', () => {
    const built = new Set<string>();
    for (const file of walkIndexHtml(DIST)) {
      const parts = relative(DIST, file).split(/[\\/]/).slice(0, -1);
      built.add(parts.length ? `${origin}/${parts.join('/')}/` : `${origin}/`);
    }
    for (const loc of blockByLoc.keys()) {
      expect(built.has(loc), `${loc} declared in sitemap-images.xml but no dist page`).toBe(true);
    }
  });

  it('the brand OG card is never declared', () => {
    expect(xml).not.toContain('og-default');
  });

  it('spot checks: a mix matrix card and a head-word card are declared with titles', () => {
    expect(blockByLoc.get(`${origin}/mix/red-blue/`)).toContain(
      '<image:loc>https://tintbrew.com/og/mix-red-blue.png</image:loc>',
    );
    expect(blockByLoc.get(`${origin}/mix/red-blue/`)).toContain('<image:title>');
    expect(blockByLoc.get(`${origin}/what-colors-make-brown/`)).toContain(
      '<image:loc>https://tintbrew.com/og/what-colors-make-brown.png</image:loc>',
    );
    expect(blockByLoc.get(`${origin}/color-mixer/`)).toContain(
      '<image:loc>https://tintbrew.com/og/color-mixer.png</image:loc>',
    );
  });
});
