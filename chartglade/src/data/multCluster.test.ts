import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { multiplicationPages } from './multiplication';
import { multTable } from '../lib/mathCharts';

/**
 * November pre-dev wave 2 guards: the multiplication cluster grew from 4 to 6
 * pages (multiplication-chart-printable + times-table-chart). Pins the
 * anti-thin-content contract, the numeric claims in the new copy (anchored to
 * the multTable engine, same discipline as mathClaims.test.ts), and the
 * 6-page internal-link mesh (the cursive A-Z fix, applied to this cluster).
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');

const CLUSTER = [
  'multiplication-chart',
  'multiplication-chart-color',
  'multiplication-chart-printable',
  'multiplication-chart-blank',
  'multiplication-chart-1-15',
  'multiplication-chart-1-20',
  'times-table-chart',
] as const;

const byslug = (slug: string) => multiplicationPages.find((p) => p.slug === slug)!;

describe('multiplication cluster — data level', () => {
  it('is exactly the seven expected pages, slugs unique, all on the charts hub', () => {
    expect(multiplicationPages.map((p) => p.slug)).toEqual([...CLUSTER]);
    for (const p of multiplicationPages) {
      expect(p.hub).toBe('charts');
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('both new pages carry the full anti-thin-content contract and stay content pages', () => {
    for (const slug of ['multiplication-chart-printable', 'times-table-chart'] as const) {
      const def = byslug(slug);
      expect(def.intro.length).toBeGreaterThanOrEqual(2);
      expect(def.tips.length).toBe(4);
      expect(def.faqs.length).toBeGreaterThanOrEqual(5);
      expect(def.printNote.length).toBeGreaterThan(20);
      // these are print/content pages, not tools: no WebApplication claim
      // (wave 4 gave both pages a sheetImage PNG — guarded in sheetImages.test.ts)
      expect(def.interactive).toBeUndefined();
    }
  });

  it('the printable page absorbs the printable/free/PDF question family', () => {
    const faqs = byslug('multiplication-chart-printable').faqs.map((f) => f.q).join(' ');
    expect(faqs).toContain('free');
    expect(faqs).toContain('PDF');
    expect(faqs).toContain('color or black and white');
  });

  it('the times-table page absorbs memorize / which-first / vs-chart questions', () => {
    const faqs = byslug('times-table-chart').faqs.map((f) => f.q).join(' ');
    expect(faqs).toContain('memorize');
    expect(faqs).toContain('learn first');
    expect(faqs).toContain('same as a multiplication chart');
  });

  it('numeric claims in the new copy stay anchored to the engine', () => {
    const grid = multTable(12);
    expect(grid[6][7]).toBe(56); // "7 × 8 = 56" cited in the times-table FAQ
    expect(grid[11][11]).toBe(144); // "Same 144 answers"
    expect(12 * 12).toBe(144);
    // "6 × 8 becomes 5 × 8 plus one more 8" — 40 + 8 = 48
    expect(grid[4][7]).toBe(40);
    expect(grid[5][7]).toBe(48);
    expect(grid[4][7] + 8).toBe(grid[5][7]);
    // one-digit core behind the Common Core claim: 9 × 9 = 81
    expect(grid[8][8]).toBe(81);
    for (const slug of ['multiplication-chart-printable', 'times-table-chart'] as const) {
      expect(JSON.stringify(byslug(slug))).toContain('144');
    }
  });

  it('the Common Core and learning-order claims are pinned wording', () => {
    const printable = byslug('multiplication-chart-printable');
    expect(printable.intro.join(' ')).toContain('3.OA.C.7');
    expect(printable.intro.join(' ')).toContain('two one-digit numbers');
    const timesTable = byslug('times-table-chart');
    const intro = timesTable.intro.join(' ');
    expect(intro).toContain('2s, 5s and 10s');
    expect(intro).toContain('3s and 4s');
    expect(intro).toContain('6s, 7s and 8s');
    expect(intro).toContain('9s, 11s and 12s');
  });

  it('every cluster page related-links all six siblings (data-level mesh)', () => {
    for (const slug of CLUSTER) {
      const hrefs = byslug(slug).related.map((r) => r.href);
      for (const other of CLUSTER) {
        if (other === slug) continue;
        expect(hrefs, `${slug} → ${other}`).toContain(`/${other}/`);
      }
    }
  });
});

describe.skipIf(!existsSync(resolve(DIST, 'times-table-chart', 'index.html')))(
  'multiplication cluster — real dist',
  () => {
    const read = (...parts: string[]) => readFileSync(resolve(DIST, ...parts), 'utf8');

    it('both new pages render FAQPage + BreadcrumbList and no WebApplication claim', () => {
      for (const slug of ['multiplication-chart-printable', 'times-table-chart'] as const) {
        const html = read(slug, 'index.html');
        expect(html).toContain('"@type":"FAQPage"');
        expect(html).toContain('"@type":"BreadcrumbList"');
        expect(html).toContain(`"item":"https://chartglade.com/${slug}/"`);
        expect(html).not.toContain('"@type":"WebApplication"');
        expect(html).toContain('data-print');
      }
    });

    it('the printable page is three sheets: filled grid, 144 blank cells, 12 list strips', () => {
      const html = read('multiplication-chart-printable', 'index.html');
      expect((html.match(/class="sheet-break"/g) ?? []).length).toBe(2);
      expect(html).toContain('Multiplication Chart 1-12 (Filled)');
      expect(html).toContain('Blank Multiplication Chart 1-12');
      expect(html).toContain('Every Times Table as a List');
      // the blank grid is exactly 144 empty fill-in cells (12 × 12)
      expect((html.match(/class="[^"]*\bfill-in\b[^"]*"/g) ?? []).length).toBe(144);
    });

    it('both list sheets carry all 144 equations straight from the engine', () => {
      const grid = multTable(12);
      for (const slug of ['multiplication-chart-printable', 'times-table-chart'] as const) {
        const html = read(slug, 'index.html');
        const strips = [...html.matchAll(/<p class="strip-facts">([\s\S]*?)<\/p>/g)].map((m) => m[1]);
        expect(strips.length, `${slug}: 12 strips`).toBe(12);
        strips.forEach((strip, i) => {
          for (let c = 0; c < 12; c++) {
            expect(strip, `${slug}: strip ${i + 1}`).toContain(
              `${i + 1} × ${c + 1} = ${grid[i][c]}`,
            );
          }
        });
      }
    });

    it('the times-table page is two sheets: grid first, list second', () => {
      const html = read('times-table-chart', 'index.html');
      expect((html.match(/class="sheet-break"/g) ?? []).length).toBe(1);
      expect(html).toContain('Times Table Chart 1-12');
      expect(html.indexOf('Times Table Chart 1-12')).toBeLessThan(html.indexOf('Every Times Table as a List'));
    });

    it('the in-content related section of every cluster page links all five siblings', () => {
      for (const slug of CLUSTER) {
        const html = read(slug, 'index.html');
        const related = /<ul class="related-list">([\s\S]*?)<\/ul>/.exec(html)?.[1] ?? '';
        expect(related.length, `${slug}: related list must render`).toBeGreaterThan(0);
        for (const other of CLUSTER) {
          if (other === slug) continue;
          expect(related, `${slug} → ${other} (in-content)`).toContain(`href="/${other}/"`);
        }
      }
    });

    it('the charts hub lists both new pages, and the sitemap carries both URLs', () => {
      const hub = read('charts', 'index.html');
      expect(hub).toContain('href="/multiplication-chart-printable/"');
      expect(hub).toContain('href="/times-table-chart/"');
      const sitemap = read('sitemap-0.xml');
      expect(sitemap).toContain('<loc>https://chartglade.com/multiplication-chart-printable/</loc>');
      expect(sitemap).toContain('<loc>https://chartglade.com/times-table-chart/</loc>');
    });
  },
);
