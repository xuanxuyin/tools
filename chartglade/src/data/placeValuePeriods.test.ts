import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { placeValuePages } from './placeValue';
import { readNumberWithPeriods } from '../lib/mathCharts';
import { CONTENT_UPDATED } from '../consts';

/**
 * Guards for the 2026-10-27 place-value batch (GSC 10/26: the "periods"
 * question family reached top 10). Data-level guards pin the PageDef itself
 * (unique slug, hub, the interlink mesh with the rest of the cluster, the
 * comma-naming facts the page teaches); dist-level guards pin the built page
 * (period bands present, the worked example computed by the engine, FAQ +
 * breadcrumb JSON-LD, the blank second sheet) and the decimal page's new
 * sections (tenths reference sheet + the island's SSR default, which must be
 * complete with JavaScript off).
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');

const PERIODS_SLUG = 'place-value-chart-with-periods';
const periodsDef = placeValuePages.find((p) => p.slug === PERIODS_SLUG);
const EXAMPLE = 471_930_862_505;

describe('place-value-chart-with-periods PageDef', () => {
  it('exists exactly once in the place value cluster, owned by the charts hub', () => {
    expect(placeValuePages.filter((p) => p.slug === PERIODS_SLUG)).toHaveLength(1);
    expect(periodsDef!.hub).toBe('charts');
    expect(periodsDef!.path).toBeUndefined(); // lives at /${slug}/
  });

  it('absorbs the periods question family in its FAQs', () => {
    const qs = periodsDef!.faqs.map((f) => f.q).join(' | ').toLowerCase();
    expect(qs).toContain('what is a period in place value');
    expect(qs).toContain('place value chart with periods');
    expect(qs).toContain('comma');
    expect(qs).toContain('groups of three');
    expect(periodsDef!.faqs.length).toBeGreaterThanOrEqual(6);
  });

  it('teaches the comma names and the period-vs-place distinction in prose', () => {
    const prose = [...periodsDef!.intro, ...periodsDef!.extraSection!.paras].join(' ');
    expect(prose).toContain('thousands comma');
    expect(prose).toContain('millions comma');
    expect(prose).toContain('billions comma');
    expect(prose.toLowerCase()).toContain('a period is');
    expect(prose.toLowerCase()).toContain('a place is');
  });

  it('interlinks both ways with the place value and decimal charts', () => {
    const hrefs = periodsDef!.related.map((r) => r.href);
    expect(hrefs).toContain('/place-value-chart/');
    expect(hrefs).toContain('/decimal-place-value-chart/');
    for (const other of ['place-value-chart', 'decimal-place-value-chart']) {
      const page = placeValuePages.find((p) => p.slug === other)!;
      expect(
        page.related.map((r) => r.href),
        `${other} must link back to the periods chart`,
      ).toContain(`/${PERIODS_SLUG}/`);
    }
  });

  it('every internal related link on the page resolves inside the cluster or a hub', () => {
    const known = new Set<string>([
      ...placeValuePages.map((p) => `/${p.slug}/`),
      '/geometry-formula-sheet/',
      '/fraction-chart/',
      '/hundred-chart/',
      '/charts/',
    ]);
    for (const r of periodsDef!.related) expect(known.has(r.href), r.href).toBe(true);
  });

  it('the worked example reading is engine-computed (claim anchor)', () => {
    expect(readNumberWithPeriods(EXAMPLE)).toBe(
      'four hundred seventy-one billion, nine hundred thirty million, eight hundred sixty-two thousand, five hundred five',
    );
  });
});

const pageBuilt = () => existsSync(resolve(DIST, PERIODS_SLUG, 'index.html'));

describe.skipIf(!pageBuilt())('periods page (real dist)', () => {
  const html = readFileSync(resolve(DIST, PERIODS_SLUG, 'index.html'), 'utf8');

  it('bands the chart into the four periods and shows the worked example', () => {
    for (const band of ['ones period', 'thousands period', 'millions period', 'billions period']) {
      expect(html, `band "${band}"`).toContain(band);
    }
    expect(html).toContain('471,930,862,505');
    expect(html).toContain('four hundred seventy-one billion, nine hundred thirty million, eight hundred sixty-two thousand, five hundred five');
  });

  it('carries the blank second sheet and the printable system', () => {
    expect(html).toContain('sheet-break');
    expect(html).toContain('Blank Place Value Chart With Periods');
    expect(html).toMatch(/class="btn[^"]*"[^>]*data-print/);
  });

  it('carries FAQPage + BreadcrumbList JSON-LD and freshness signals', () => {
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html).toContain(`"dateModified":"${CONTENT_UPDATED}"`);
  });

  it('links into the cluster mesh (both siblings, hub, footer parent)', () => {
    expect(html).toContain('href="/place-value-chart/"');
    expect(html).toContain('href="/decimal-place-value-chart/"');
    expect(html).toContain('href="/charts/"');
  });
});

const decimalBuilt = () => existsSync(resolve(DIST, 'decimal-place-value-chart', 'index.html'));

describe.skipIf(!decimalBuilt())('decimal page additions (real dist)', () => {
  const html = readFileSync(resolve(DIST, 'decimal-place-value-chart', 'index.html'), 'utf8');

  it('carries the one-tenth reference sheet with engine-computed examples', () => {
    expect(html).toContain('One tenth, one hundredth, one thousandth');
    expect(html).toContain('one dime');
    expect(html).toContain('0.4 + 0.07 + 0.001'); // 0.471 expanded
    expect(html).toContain('twelve and five hundredths'); // 12.05 in words
  });

  it('mounts the interactive breakdown with a complete no-JS default', () => {
    expect(html).toContain('id="decimal-input"');
    expect(html).toContain('id="decimal-breakdown"');
    expect(html).toContain('three and one hundred fifty-six thousandths'); // SSR default 3.156
    expect(html).toContain('3 + 0.1 + 0.05 + 0.006');
  });

  it('the "interactive" modifier shows up where search reads it', () => {
    expect(html).toContain('Decimal Place Value Chart (Interactive');
  });
});
