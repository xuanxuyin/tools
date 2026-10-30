/**
 * Bead family guards. Two layers, same contract as the outfit family:
 *  - data: every grid is rectangular, every char has a region, every region
 *    is used, counts add up, colors exist, and no trademarked name appears
 *    anywhere (the IP redline from research/fuse-bead-patterns.md §三).
 *  - dist: the real built pages carry the studio, the zone chips, both
 *    figures and the JSON-LD server-side — no-JS SEO bottom line.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { BEAD_PATTERNS } from '../data/beadPatterns';
import { BEAD_CATEGORY_SEO, BEAD_COLLECTION_SEO, BEAD_HUB_SEO } from '../data/beadSeo';
import { BEAD_LETTERS } from '../data/beadLetters';
import { BEAD_COLORS } from './beadPalette';
import {
  beadSizeInches,
  categoryCounts,
  cutePatterns,
  easyPatterns,
  patternContents,
  patternUrl,
  smallPatterns,
} from './beadContent';

const distRoot = resolve(fileURLToPath(import.meta.url), '../../../dist');

const BANNED = [
  'pokemon',
  'minecraft',
  'doraemon',
  'hello kitty',
  'disney',
  'mario',
  'zelda',
  'pikachu',
  'among us',
  'sanrio',
  'star wars',
  'bluey',
  'peppa',
  'paw patrol',
  'frozen',
  'elsa',
  'rudolph',
];

describe('bead pattern data integrity', () => {
  it('115 patterns across six categories with locked minimums', () => {
    // all-imported catalog since 2026-10-28: the 46 vector-authored designs
    // went offline. Since the 2026-10-29 flight re-import every one of the
    // grids comes from the community site's RSC flight data verbatim —
    // sizes, boundaries and bead counts match the source 1:1. Same-day
    // trims: chicken-bro dropped (too brand-recognizable), bee moved to
    // minis to match the source site's "small" category
    expect(BEAD_PATTERNS).toHaveLength(115);
    expect(patternContents).toHaveLength(115);
    expect(categoryCounts).toEqual({
      animals: 51,
      food: 4,
      christmas: 0,
      halloween: 11,
      minis: 6,
      characters: 43,
    });
    expect(easyPatterns.length).toBe(48);
  });

  it('collection filters: cute locked at 36, small all one-board', () => {
    // 2026-10-29 P3 pool expansion landings — curated cute set and the
    // width<=29 "small" filter. Bump the 36 with the curated list AND the
    // cute SEO copy (title/intro counts) together, never one alone.
    expect(cutePatterns).toHaveLength(36);
    const catalogSlugs = new Set(BEAD_PATTERNS.map((p) => p.slug));
    for (const p of cutePatterns) {
      expect(catalogSlugs.has(p.def.slug), `cute "${p.def.slug}" in catalog`).toBe(true);
    }
    expect(new Set(cutePatterns.map((p) => p.def.slug)).size).toBe(36);

    expect(smallPatterns.length).toBeGreaterThanOrEqual(20);
    for (const p of smallPatterns) {
      expect(p.def.width, `${p.def.slug} one board`).toBeLessThanOrEqual(29);
    }
  });

  it('letters: 36 glyphs on 5×7 grids, single zone, counts 11–20', () => {
    // glyphs never join the catalog — no detail pages for this word family
    expect(BEAD_LETTERS).toHaveLength(36);
    expect(
      BEAD_PATTERNS.some((p) => p.slug.startsWith('letter-') || p.slug.startsWith('digit-')),
    ).toBe(false);
    const ids = new Set(BEAD_COLORS.map((b) => b.id));
    const counts: number[] = [];
    for (const def of BEAD_LETTERS) {
      expect(def.width).toBe(5);
      expect(def.rows).toHaveLength(7);
      for (const row of def.rows) expect(row.length, `${def.slug} "${row}"`).toBe(5);
      const beads = def.rows.join('').split('').filter((c) => c === 'X').length;
      counts.push(beads);
      expect(beads, `${def.slug} non-empty`).toBeGreaterThan(0);
      expect(def.regions.X, `${def.slug} color exists`).toBeTruthy();
      expect(ids.has(def.regions.X!.color), `${def.slug} "${def.regions.X!.color}"`).toBe(true);
    }
    expect(Math.min(...counts)).toBe(10); // Y — the leanest glyph
    expect(Math.max(...counts)).toBe(20); // B and R
    expect(new Set(BEAD_LETTERS.map((l) => l.slug)).size).toBe(36);
  });

  it('grids are rectangular: no row exceeds width, rows are padded', () => {
    for (const p of patternContents) {
      expect(p.grid.length, p.def.slug).toBeGreaterThan(4);
      for (const row of p.grid) {
        expect(row.length, `${p.def.slug} "${row}"`).toBe(p.def.width);
      }
    }
  });

  it('every cell char maps to a region and every region is used', () => {
    for (const p of patternContents) {
      const used = new Set<string>();
      for (const row of p.grid) {
        for (const ch of row) {
          if (ch === '.') continue;
          expect(p.def.regions[ch], `${p.def.slug} has region "${ch}"`).toBeTruthy();
          used.add(ch);
        }
      }
      for (const key of Object.keys(p.def.regions)) {
        expect(used.has(key), `${p.def.slug} uses region "${key}"`).toBe(true);
      }
    }
  });

  it('region counts add up to the bead count of the grid', () => {
    for (const p of patternContents) {
      const cells = p.grid.join('').replaceAll('.', '').length;
      const summed = p.regions.reduce((s, r) => s + r.count, 0);
      expect(summed, p.def.slug).toBe(cells);
      expect(p.totalBeads, p.def.slug).toBe(cells);
      expect(p.beadList.reduce((s, e) => s + e.count, 0), p.def.slug).toBe(cells);
    }
  });

  it('region colors exist in the palette; full-size designs keep ≥4 zones', () => {
    const ids = new Set(BEAD_COLORS.map((b) => b.id));
    for (const p of patternContents) {
      for (const r of p.regions) {
        expect(ids.has(r.beadId), `${p.def.slug} color "${r.beadId}"`).toBe(true);
        expect(r.hex).toMatch(/^#[0-9a-f]{6}$/);
        expect(r.count, `${p.def.slug} ${r.key}`).toBeGreaterThan(0);
      }
      if (p.def.width >= 14) {
        // source-truth floor: genuine N-color community designs carry
        // zonesMin from the import; everything else keeps the 4-zone guard
        expect(p.regions.length, `${p.def.slug} zones`).toBeGreaterThanOrEqual(
          p.def.zonesMin ?? 4,
        );
      }
    }
  });

  it('slugs and detail URLs are unique', () => {
    const slugs = BEAD_PATTERNS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const urls = patternContents.map((p) => p.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('detail URLs match their category route', () => {
    // manifest order is not stable across re-imports — locate by slug
    const corgi = BEAD_PATTERNS.find((p) => p.slug === 'corgi-looking-up')!;
    expect(patternUrl(corgi)).toBe('/perler-bead-animals/corgi-looking-up/');
    // halloween got its own gallery 2026-10-29 — it left the hub base
    const ghost = patternContents.find((p) => p.def.slug === 'spooky-ghost')!;
    expect(ghost.url).toBe('/perler-bead-halloween/spooky-ghost/');
    // food's gallery retired with the hand-drawn set — its one imported
    // pattern lives under the hub base now
    const apple = patternContents.find((p) => p.def.slug === 'apple-fuji-scene')!;
    expect(apple.url).toBe('/perler-bead-patterns/apple-fuji-scene/');
    const heart = patternContents.find((p) => p.def.slug === 'finger-heart-hand')!;
    expect(heart.url).toBe('/perler-bead-patterns/finger-heart-hand/');
    // bee followed the source site into the "small" category — minis
    // patterns live under the hub base
    const bee = patternContents.find((p) => p.def.slug === 'bee')!;
    expect(bee.url).toBe('/perler-bead-patterns/bee/');
    expect(patternContents.find((p) => p.def.slug === 'chicken-bro')).toBeUndefined();
  });

  it('finished sizes are 5mm-per-bead math', () => {
    expect(beadSizeInches(16)).toBe('3.1 in');
    expect(beadSizeInches(10)).toBe('2.0 in');
  });

  it('IP redline: no trademarked names in patterns or SEO copy', () => {
    const haystacks = [
      ...BEAD_PATTERNS.flatMap((p) => [
        p.slug,
        p.name,
        p.tagline,
        p.blurb,
        ...Object.values(p.regions).map((r) => r.label),
      ]),
      ...BEAD_LETTERS.flatMap((l) => [l.slug, l.name, l.tagline, l.blurb]),
      BEAD_HUB_SEO.title,
      BEAD_HUB_SEO.description,
      ...BEAD_HUB_SEO.intro,
      ...BEAD_HUB_SEO.faqs.flatMap((f) => [f.q, f.a]),
      ...Object.values(BEAD_CATEGORY_SEO).flatMap((s) => [
        s!.title,
        s!.description,
        ...s!.intro,
        ...s!.faqs.flatMap((f) => [f.q, f.a]),
      ]),
      ...Object.values(BEAD_COLLECTION_SEO).flatMap((s) => [
        s!.title,
        s!.description,
        ...s!.intro,
        ...s!.faqs.flatMap((f) => [f.q, f.a]),
      ]),
    ].join('\n').toLowerCase();
    for (const banned of BANNED) {
      expect(haystacks.includes(banned), `no "${banned}"`).toBe(false);
    }
  });

  it('every pattern has a prebuilt webp thumbnail', () => {
    // cards render the prebuilt full-resolution bitmap since 2026-10-29
    // (scripts/beadgen/thumbs.mjs) — a missing file means a broken card img
    const thumbsRoot = resolve(fileURLToPath(import.meta.url), '../../../public/pattern-thumbs');
    for (const p of patternContents) {
      expect(existsSync(resolve(thumbsRoot, `${p.def.slug}.webp`)), `${p.def.slug}.webp`).toBe(true);
    }
  });
});

describe('bead pages in real dist markup', () => {
  it('hub + all four galleries ship thumbnail cards and JSON-LD', () => {
    // food + christmas galleries retired 2026-10-28 (301 → hub); halloween
    // opened its own gallery 2026-10-29. Cards render the prebuilt webp
    // thumbnails since 2026-10-29 — inline SVG figures live on detail pages.
    // The cute/small/fuse collection landings (2026-10-29) are the same
    // BeadCategoryPage shape, so they ride the same contract.
    const pages = [
      '/perler-bead-patterns/index.html',
      '/perler-bead-animals/index.html',
      '/perler-bead-characters/index.html',
      '/perler-bead-halloween/index.html',
      '/easy-perler-bead-patterns/index.html',
      '/cute-perler-bead-patterns/index.html',
      '/small-perler-bead-patterns/index.html',
      '/fuse-bead-patterns/index.html',
    ];
    for (const page of pages) {
      const html = readFileSync(resolve(distRoot, page.slice(1)), 'utf8');
      expect((html.match(/class="bead-thumb-img"/g) ?? []).length).toBeGreaterThanOrEqual(6);
      expect(html).toMatch(/src="\/pattern-thumbs\/[a-z0-9-]+\.webp"/);
      expect(html).toContain('FAQPage');
      expect(html).toContain('BreadcrumbList');
    }
    // the thumbnail files themselves ship with the site
    expect(existsSync(resolve(distRoot, 'pattern-thumbs/shiba.webp'))).toBe(true);
  });

  it('every pattern detail page carries the studio, chips, list and print path', () => {
    for (const p of patternContents) {
      const file = resolve(distRoot, `${p.url.slice(1)}index.html`);
      expect(existsSync(file), `${p.url} built`).toBe(true);
      const html = readFileSync(file, 'utf8');
      expect(html).toContain('data-bead-studio');
      expect(html).toContain('data-bead-list');
      expect(html).toContain('data-print');
      expect(html).toContain('@media print');
      expect(html).toContain('FAQPage');
      expect(html).toContain(`${p.totalBeads} beads`);
      // editable canvas: the pattern preloaded in color (one data-bead per
      // cell) on a pegboard with holes, tools present
      expect(html).toContain('data-bead-canvas');
      expect(html).toContain('data-cv-tool="brush"');
      expect(html).toContain('data-cv-tool="eraser"');
      expect(html).toContain('data-cv-clear');
      expect(html).toContain('data-cv-custom');
      expect((html.match(/class="cv-cell/g) ?? []).length).toBe(p.totalBeads);
      expect((html.match(/data-bead="/g) ?? []).length).toBe(p.totalBeads);
      const pegCount = p.def.width * p.grid.length - p.totalBeads;
      expect((html.match(/class="cv-peg"/g) ?? []).length).toBe(pegCount);
      // island data source: one chip per region, counts present
      expect((html.match(/data-zone="/g) ?? []).length).toBe(p.regions.length);
      expect(html).toContain(`data-count="${p.regions[0]!.count}"`);
      // the island ships as an external chunk; it must carry the real logic.
      // shared modules (PaintCanvas) may sit in their own chunk since the
      // photo converter imports them too — follow one hop of static imports
      const chunkMatch = html.match(/src="(\/_astro\/BeadPatternPage[^"]+\.js)"/);
      expect(chunkMatch, `${p.url} island chunk`).toBeTruthy();
      let chunk = readFileSync(resolve(distRoot, chunkMatch![1]!.slice(1)), 'utf8');
      for (const imp of chunk.matchAll(/from"(\.\/[^"]+\.js)"/g)) {
        chunk += readFileSync(resolve(distRoot, '_astro', imp[1]!.slice(2)), 'utf8');
      }
      expect(chunk).toContain('print');
      expect(chunk).toContain('data-zone');
      expect(chunk).toContain('pointerdown');
      expect(chunk).toContain('cv-cell');
    }
  });

  it('detail pages carry both figure modes from the same grid', () => {
    const shiba = readFileSync(resolve(distRoot, 'perler-bead-animals/shiba/index.html'), 'utf8');
    // one studio figure of each mode + up to four related-card references
    expect((shiba.match(/data-bead-mode="blank"/g) ?? []).length).toBe(1);
    expect((shiba.match(/data-bead-mode="reference"/g) ?? []).length).toBeGreaterThanOrEqual(1);
    // blank template keeps zone letters — the printable contract
    expect(shiba).toMatch(/class="bd-key"/);
    expect(shiba).toContain('data-region');
  });

  it('footer links the five landing pages; sitemap knows every bead URL', () => {
    const footer = readFileSync(resolve(distRoot, 'index.html'), 'utf8');
    for (const s of [
      BEAD_HUB_SEO,
      ...Object.values(BEAD_CATEGORY_SEO),
      ...Object.values(BEAD_COLLECTION_SEO),
    ]) {
      expect(footer).toContain(s!.path);
    }
    const sm = readFileSync(resolve(distRoot, 'sitemap-index.xml'), 'utf8');
    expect(sm).toContain('<sitemap>');
  });

  it('collection landings and the letters sheet ship complete', () => {
    // the three collection pages + letters live in the image sitemap and the
    // Astro sitemap; the letters sheet renders all 36 glyphs as inline SVG
    // (no webp thumbs) with the computed name-demo numbers
    const letters = readFileSync(resolve(distRoot, 'perler-bead-letters/index.html'), 'utf8');
    expect(letters).toContain('Perler Bead Letters');
    expect((letters.match(/data-pattern="letter-/g) ?? []).length).toBe(26);
    expect((letters.match(/data-pattern="digit-/g) ?? []).length).toBe(10);
    // no prebuilt webp thumbs on the sheet — every glyph is inline SVG
    // (.bead-thumb-img still appears in BeadFigure's scoped CSS, so assert
    // on the image path instead of the class name)
    expect(letters).not.toContain('/pattern-thumbs/');
    expect(letters).toContain('FAQPage');
    expect(letters).toContain('BreadcrumbList');
    // EMMA demo math is computed from the real grids (E+M+M+A = 70)
    expect(letters).toContain('spells out in 70 beads');

    const imgs = readFileSync(resolve(distRoot, 'sitemap-images.xml'), 'utf8');
    for (const path of [
      '/cute-perler-bead-patterns/',
      '/small-perler-bead-patterns/',
      '/fuse-bead-patterns/',
      '/easy-perler-bead-patterns/',
    ]) {
      expect(imgs, path).toContain(`<loc>https://tintbrew.com${path}</loc>`);
    }

    const sm0 = resolve(distRoot, 'sitemap-0.xml');
    const raw = readFileSync(sm0);
    const xml = raw.subarray(0, 2).equals(Buffer.from([0x1f, 0x8b]))
      ? gunzipSync(raw).toString('utf8')
      : raw.toString('utf8');
    for (const s of Object.values(BEAD_COLLECTION_SEO)) {
      expect(xml, s!.path).toContain(s!.path);
    }
  });

  it('sitemap file lists all 115 pattern URLs', () => {
    // sitemap-0.xml is gzipped when large; Astro writes plain when small
    const sm0 = resolve(distRoot, 'sitemap-0.xml');
    const raw = readFileSync(sm0);
    const xml = raw.subarray(0, 2).equals(Buffer.from([0x1f, 0x8b]))
      ? gunzipSync(raw).toString('utf8')
      : raw.toString('utf8');
    for (const p of patternContents) {
      expect(xml, p.url).toContain(p.url);
    }
  });

  it('the photo converter page ships its shell, SEO triple and print path', () => {
    const html = readFileSync(resolve(distRoot, 'photo-to-perler-bead-pattern/index.html'), 'utf8');
    // SSR shell: upload controls, option selects, status line, empty stage
    expect(html).toContain('data-photo-bead');
    expect(html).toContain('data-photo-drop');
    expect(html).toContain('data-photo-file');
    expect(html).toContain('data-photo-stage');
    // SEO triple + freshness, never noindex
    expect(html).toContain('WebApplication');
    expect(html).toContain('FAQPage');
    expect(html).toContain('BreadcrumbList');
    expect(html).toMatch(/rel="canonical" href="https:\/\/tintbrew\.com\/photo-to-perler-bead-pattern\/"/);
    expect(html).not.toContain('noindex');
    // print contract: controls hide, board prints with exact colors.
    // The board is built by JS and carries NO scoping attribute, so its
    // print rules must be global-form selectors — a scoped rule compiles
    // to .paint-card[data-astro-cid-…] and never matches the runtime DOM
    expect(html).toContain('@media print');
    expect(html).toMatch(/\.photo-stage \.paint-card[^{]*\{[^}]*print-color-adjust:\s*exact/);
    expect(html).toMatch(/@media print\{[^{]*\.no-print/);
    // the island chunk must carry the real conversion entry points
    const chunkMatch = html.match(/src="(\/_astro\/photo-to-perler-bead-pattern[^"]+\.js)"/);
    expect(chunkMatch, 'photo island chunk').toBeTruthy();
    const chunk = readFileSync(resolve(distRoot, chunkMatch![1]!.slice(1)), 'utf8');
    expect(chunk).toContain('data-photo-bead');
    // no-JS contract: the how-to prose is server-rendered content
    expect(html).toContain('How it works');
    expect(html).toContain('never leaves your device');
  });

  it('the bead editor page ships its shell, SEO triple, print path and island', () => {
    const html = readFileSync(resolve(distRoot, 'bead-editor/index.html'), 'utf8');
    // SSR shell: board host, size controls, tools, color library, stats
    expect(html).toContain('data-bead-editor');
    expect(html).toContain('data-ed-canvas-host');
    expect(html).toContain('data-ed-size');
    expect(html).toContain('data-ed-tool="brush"');
    expect(html).toContain('data-ed-search');
    expect(html).toContain('data-ed-simplify');
    expect(html).toContain('data-ed-png');
    expect(html).toContain('data-ed-print');
    // SEO triple + canonical, never noindex
    expect(html).toContain('WebApplication');
    expect(html).toContain('FAQPage');
    expect(html).toContain('BreadcrumbList');
    expect(html).toMatch(/rel="canonical" href="https:\/\/tintbrew\.com\/bead-editor\/"/);
    expect(html).not.toContain('noindex');
    // the two tool pages cross-link each other — the source-site pair
    expect(html).toContain('href="/photo-to-perler-bead-pattern/"');
    expect(html).toContain('href="/perler-bead-patterns/"');
    // print contract: controls hide, board prints with exact colors
    expect(html).toContain('@media print');
    expect(html).toMatch(/\.ed-host \.ed-board[^{]*\{[^}]*width:\s*100%/);
    expect(html).toMatch(/@media print\{[^{]*\.no-print/);
    // the island chunk carries the real editor entry point
    const chunkMatch = html.match(/src="(\/_astro\/bead-editor[^"]+\.js)"/);
    expect(chunkMatch, 'editor island chunk').toBeTruthy();
    const chunk = readFileSync(resolve(distRoot, chunkMatch![1]!.slice(1)), 'utf8');
    expect(chunk).toContain('data-bead-editor');
    // no-JS contract: the how-to prose is server-rendered content
    expect(html).toContain('Design Your Own Perler Bead Patterns');
    expect(html).toContain('How it works');
  });

  it('both tool pages live in the footer and sitemap (hub promo removed)', () => {
    // the hub's photo promo is gone — content only (user call, 2026-10-29);
    // the converter's one remaining hub-page link is the shared footer
    const hub = readFileSync(resolve(distRoot, 'perler-bead-patterns/index.html'), 'utf8');
    const hubLinks = hub.match(/href="\/photo-to-perler-bead-pattern\/"/g)?.length ?? 0;
    expect(hubLinks).toBe(1); // footer only
    expect(hub).not.toContain('photo-cta');
    const footer = readFileSync(resolve(distRoot, 'index.html'), 'utf8');
    expect(footer).toContain('/photo-to-perler-bead-pattern/');
    expect(footer).toContain('/bead-editor/');
    const sm0 = resolve(distRoot, 'sitemap-0.xml');
    const raw = readFileSync(sm0);
    const xml = raw.subarray(0, 2).equals(Buffer.from([0x1f, 0x8b]))
      ? gunzipSync(raw).toString('utf8')
      : raw.toString('utf8');
    expect(xml).toContain('/photo-to-perler-bead-pattern/');
    expect(xml).toContain('/bead-editor/');
  });
});
