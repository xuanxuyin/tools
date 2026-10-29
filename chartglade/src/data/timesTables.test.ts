import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { timesTablePages } from './timesTables';

/**
 * The single times-table matrix (PLAN #29): 12 dynamic-route pages under
 * /times-table/<n>/ plus a hub. Every fact list is computed from n; the
 * strategy prose is hand-written per table, so uniqueness across the 12
 * pages is the anti-thin-content line under test.
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');

describe('timesTablePages data', () => {
  it('is exactly tables 1-12 at /times-table/<n>/', () => {
    expect(timesTablePages).toHaveLength(12);
    expect(timesTablePages.map((p) => p.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    for (const p of timesTablePages) {
      expect(p.slug).toBe(`times-table-${p.n}`);
      expect(p.path).toBe(`/times-table/${p.n}`);
      expect(p.hub).toBe('charts');
      expect(p.h1).toBe(`${p.n} Times Table`);
    }
  });

  it('carries unique SEO content per table (no template pages)', () => {
    for (const field of ['metaTitle', 'metaDescription', 'lead', 'introHeading'] as const) {
      const values = timesTablePages.map((p) => p[field]);
      expect(new Set(values).size, `${field} must be unique`).toBe(12);
    }
    const introPairs = timesTablePages.map((p) => p.intro.join('|'));
    expect(new Set(introPairs).size).toBe(12);
    const tipTitles = timesTablePages.flatMap((p) => p.tips.map((t) => t.title));
    expect(new Set(tipTitles).size).toBe(tipTitles.length); // 48 distinct tips
  });

  it('computes every fact list and skip-count from n', () => {
    for (const p of timesTablePages) {
      const expected = Array.from({ length: 12 }, (_, i) => (i + 1) * p.n).join(', ');
      // FAQ #1 is the generated fact list; extraSection paras quote the skip count
      expect(p.faqs[0]!.a).toContain(expected);
      expect(p.extraSection!.paras[0]).toContain(expected);
      // the self-check paragraph names n×6 and its wrong neighbor
      expect(p.extraSection!.paras[1]).toContain(`${p.n} × 6`);
    }
  });

  it('meets the content floor: 4 tips, 4-5 FAQs, related into the hub and pillar', () => {
    for (const p of timesTablePages) {
      expect(p.tips).toHaveLength(4);
      expect(p.faqs.length).toBeGreaterThanOrEqual(4);
      expect(p.faqs.length).toBeLessThanOrEqual(5);
      expect(p.metaDescription.length).toBeLessThanOrEqual(160);
      const hrefs = p.related.map((r) => r.href);
      expect(hrefs).toContain('/multiplication-chart/');
      expect(hrefs).toContain('/times-table/');
      // neighbor links chain the matrix: 1→2, …, 11→12
      if (p.n > 1) expect(hrefs).toContain(`/times-table/${p.n - 1}/`);
      if (p.n < 12) expect(hrefs).toContain(`/times-table/${p.n + 1}/`);
    }
  });
});

const distReady = existsSync(resolve(DIST, 'times-table', '1', 'index.html'));

describe.skipIf(!distReady)('times tables dist guards (real dist)', () => {
  it('builds all 12 table pages plus the hub, each self-canonical', () => {
    for (const p of timesTablePages) {
      const html = readFileSync(resolve(DIST, 'times-table', String(p.n), 'index.html'), 'utf8');
      expect(html).toContain(`<link rel="canonical" href="https://chartglade.com/times-table/${p.n}/">`);
      expect(html).toContain(`${p.n} Times Table`);
    }
    expect(existsSync(resolve(DIST, 'times-table', 'index.html'))).toBe(true);
  });

  it('prints the computed facts on the sheet — spot check 3, 7 and 12', () => {
    for (const n of [3, 7, 12]) {
      const html = readFileSync(resolve(DIST, 'times-table', String(n), 'index.html'), 'utf8');
      expect(html).toContain(`1 × ${n} = ${n}`);
      expect(html).toContain(`6 × ${n} = ${6 * n}`);
      expect(html).toContain(`12 × ${n} = ${12 * n}`);
      // practice strip repeats the question with the answer blanked
      expect(html.match(new RegExp(`\\d+ × ${n} = <`, 'g'))!.length).toBeGreaterThanOrEqual(12);
    }
  });

  it('lands in the sitemap and the site links to the hub', () => {
    const sitemap = readFileSync(resolve(DIST, 'sitemap-0.xml'), 'utf8');
    for (let n = 1; n <= 12; n++) {
      expect(sitemap).toContain(`https://chartglade.com/times-table/${n}/`);
    }
    expect(sitemap).toContain('https://chartglade.com/times-table/');

    const pillar = readFileSync(resolve(DIST, 'multiplication-chart', 'index.html'), 'utf8');
    expect(pillar).toContain('href="/times-table/"');
    const home = readFileSync(resolve(DIST, 'index.html'), 'utf8');
    expect(home).toContain('href="/times-table/"'); // footer carries it on every page
  });

  it('the hub links every table page and the sibling nav runs 1-12', () => {
    const hub = readFileSync(resolve(DIST, 'times-table', 'index.html'), 'utf8');
    for (let n = 1; n <= 12; n++) {
      expect(hub).toContain(`href="/times-table/${n}/"`);
    }
    const page7 = readFileSync(resolve(DIST, 'times-table', '7', 'index.html'), 'utf8');
    for (let n = 1; n <= 12; n++) {
      if (n === 7) continue;
      expect(page7).toContain(`href="/times-table/${n}/"`);
    }
  });
});
