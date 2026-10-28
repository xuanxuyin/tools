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
import { BEAD_CATEGORY_SEO, BEAD_HUB_SEO } from '../data/beadSeo';
import { BEAD_COLORS } from './beadPalette';
import {
  beadSizeInches,
  categoryCounts,
  easyPatterns,
  patternContents,
  patternUrl,
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
  it('106 patterns across six categories with locked minimums', () => {
    // all-imported catalog since 2026-10-28: the 46 vector-authored designs
    // went offline; community bead renders are the whole set now
    expect(BEAD_PATTERNS).toHaveLength(106);
    expect(patternContents).toHaveLength(106);
    expect(categoryCounts).toEqual({
      animals: 52,
      food: 1,
      christmas: 0,
      halloween: 11,
      minis: 1,
      characters: 41,
    });
    expect(easyPatterns.length).toBe(13);
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
        expect(p.regions.length, `${p.def.slug} zones`).toBeGreaterThanOrEqual(4);
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
    expect(patternUrl(BEAD_PATTERNS[0]!)).toBe('/perler-bead-animals/corgi-looking-up/');
    const ghost = patternContents.find((p) => p.def.slug === 'spooky-ghost')!;
    expect(ghost.url).toBe('/perler-bead-patterns/spooky-ghost/');
    // food's gallery retired with the hand-drawn set — its one imported
    // pattern lives under the hub base now
    const apple = patternContents.find((p) => p.def.slug === 'apple-fuji-scene')!;
    expect(apple.url).toBe('/perler-bead-patterns/apple-fuji-scene/');
    const heart = patternContents.find((p) => p.def.slug === 'finger-heart-hand')!;
    expect(heart.url).toBe('/perler-bead-patterns/finger-heart-hand/');
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
    ].join('\n').toLowerCase();
    for (const banned of BANNED) {
      expect(haystacks.includes(banned), `no "${banned}"`).toBe(false);
    }
  });
});

describe('bead pages in real dist markup', () => {
  it('hub + all three galleries ship figures, zone-divided templates and JSON-LD', () => {
    // food + christmas galleries retired 2026-10-28 (301 → hub)
    const pages = [
      '/perler-bead-patterns/index.html',
      '/perler-bead-animals/index.html',
      '/perler-bead-characters/index.html',
      '/easy-perler-bead-patterns/index.html',
    ];
    for (const page of pages) {
      const html = readFileSync(resolve(distRoot, page.slice(1)), 'utf8');
      expect(html).toContain('bead-fig');
      expect(html).toContain('FAQPage');
      expect(html).toContain('BreadcrumbList');
      expect(html).toMatch(/data-bead-mode="reference"/);
      expect((html.match(/data-bead-mode="reference"/g) ?? []).length).toBeGreaterThanOrEqual(6);
    }
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
      // free-paint canvas: silhouette cells white + peg holes, tools present
      expect(html).toContain('data-bead-canvas');
      expect(html).toContain('data-cv-tool="brush"');
      expect(html).toContain('data-cv-tool="eraser"');
      expect(html).toContain('data-cv-clear');
      expect(html).toContain('data-cv-custom');
      expect((html.match(/class="cv-cell/g) ?? []).length).toBe(p.totalBeads);
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
    for (const s of [BEAD_HUB_SEO, ...Object.values(BEAD_CATEGORY_SEO)]) {
      expect(footer).toContain(s!.path);
    }
    const sm = readFileSync(resolve(distRoot, 'sitemap-index.xml'), 'utf8');
    expect(sm).toContain('<sitemap>');
  });

  it('sitemap file lists all 106 pattern URLs', () => {
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

  it('hub links the converter; footer carries it under the bead family', () => {
    const hub = readFileSync(resolve(distRoot, 'perler-bead-patterns/index.html'), 'utf8');
    expect(hub).toContain('href="/photo-to-perler-bead-pattern/"');
    const footer = readFileSync(resolve(distRoot, 'index.html'), 'utf8');
    expect(footer).toContain('/photo-to-perler-bead-pattern/');
    // sitemap picks it up automatically
    const sm0 = resolve(distRoot, 'sitemap-0.xml');
    const raw = readFileSync(sm0);
    const xml = raw.subarray(0, 2).equals(Buffer.from([0x1f, 0x8b]))
      ? gunzipSync(raw).toString('utf8')
      : raw.toString('utf8');
    expect(xml).toContain('/photo-to-perler-bead-pattern/');
  });
});
