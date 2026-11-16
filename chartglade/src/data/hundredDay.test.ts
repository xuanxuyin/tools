import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hundredDayPages } from './hundredDay';
import { loosePages } from './loose';

/**
 * 100th Day of School cluster guards (11/16 batch). Data-level tests pin
 * the cluster shape, the word-focus discipline (one primary word per page
 * title) and the family gallery; dist-level tests run after
 * `npm run build` and pin the five URLs, the hub mesh, the print sheets
 * and the JSON-LD output.
 */

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');

describe('hundred-day cluster shape', () => {
  it('holds exactly the four seasonal printables', () => {
    expect(hundredDayPages.map((p) => p.slug).sort()).toEqual(
      ['100th-day-certificate', '100th-day-glasses', 'roll-to-100', 'when-i-am-100-writing-prompt'].sort(),
    );
  });

  it('every page hangs off the hundred-day hub', () => {
    for (const p of hundredDayPages) expect(p.hub).toBe('hundred-day');
  });

  it('every page carries a hand-written anti-thin layer: 2 intro paragraphs, 4 tips, 4 faqs', () => {
    for (const p of hundredDayPages) {
      expect(p.intro.length, `${p.slug} intro`).toBe(2);
      for (const para of p.intro) expect(para.length, `${p.slug} intro thin`).toBeGreaterThan(200);
      expect(p.tips.length, `${p.slug} tips`).toBe(4);
      expect(p.faqs.length, `${p.slug} faqs`).toBe(4);
    }
  });

  it('one primary word per page title (word-focus discipline), no stuffed titles', () => {
    const primaries = [
      ['100th-day-glasses', '100th Day of School Glasses'],
      ['roll-to-100', 'Roll to 100'],
      ['when-i-am-100-writing-prompt', 'When I Am 100 Years Old'],
      ['100th-day-certificate', '100th Day of School Certificate'],
    ] as const;
    for (const [slug, start] of primaries) {
      const p = hundredDayPages.find((d) => d.slug === slug)!;
      expect(p.metaTitle.startsWith(start), `${slug} title: ${p.metaTitle}`).toBe(true);
    }
  });

  it('meta descriptions are distinct, meaty, and name the sheet form', () => {
    const descs = hundredDayPages.map((p) => p.metaDescription);
    expect(new Set(descs).size).toBe(descs.length);
    for (const d of descs) {
      expect(d.length).toBeGreaterThan(80);
      expect(d.length).toBeLessThan(160);
      expect(d.toLowerCase()).toMatch(/printable|print/);
    }
  });

  it('family gallery: every sibling card blurb is hand-written and distinct', () => {
    for (const p of hundredDayPages) {
      expect(p.variants!.length, `${p.slug} gallery`).toBe(3);
      const blurbs = p.variants!.map((v) => v.blurb);
      expect(new Set(blurbs).size).toBe(blurbs.length);
      for (const b of blurbs) expect(b.length).toBeGreaterThan(40);
    }
  });

  it('related links stay inside the site and the cluster cross-links its siblings', () => {
    const allHrefs = new Set<string>([
      ...hundredDayPages.map((p) => `/${p.slug}/`),
      '/hundred-chart/',
      '/number-line-printable/',
      '/name-tracing/',
      '/cootie-catcher/',
      '/charts/',
      '/sight-words/',
      '/cursive/',
      '/100th-day-of-school/',
    ]);
    for (const p of hundredDayPages) {
      for (const r of p.related) {
        expect(allHrefs.has(r.href), `${p.slug} → ${r.href} (stale or off-site)`).toBe(true);
      }
    }
    const glasses = hundredDayPages.find((p) => p.slug === '100th-day-glasses')!;
    expect(glasses.related.some((r) => r.href === '/roll-to-100/')).toBe(true);
  });

  it('the reference hundred chart links back into the game (two-way mesh)', () => {
    const hundred = loosePages.find((p) => p.slug === 'hundred-chart')!;
    expect(hundred.related.some((r) => r.href === '/roll-to-100/')).toBe(true);
  });

  it('no IP-template language (banned brand/character names)', () => {
    const banned = ['smarty', 'smarties', 'candy brand', 'disney', 'paw patrol', 'peppa'];
    const allText = hundredDayPages
      .map((p) => [p.h1, p.lead, p.metaDescription, ...p.intro, ...p.tips.map((t) => t.title + t.body), ...p.faqs.map((f) => f.q + f.a)].join(' '))
      .join(' ')
      .toLowerCase();
    for (const b of banned) expect(allText).not.toContain(b);
  });
});

/* ------------------------------------------------------------------ */
/* Dist guards — run after `npm run build` (release order: build first) */
/* ------------------------------------------------------------------ */

const hubBuilt = existsSync(resolve(DIST, '100th-day-of-school', 'index.html'));

describe.skipIf(!hubBuilt)('hundred-day dist guards (real dist)', () => {
  const HUB = resolve(DIST, '100th-day-of-school', 'index.html');
  const pageFiles = new Map(
    hundredDayPages.map((p) => [p.slug, resolve(DIST, p.slug, 'index.html')] as const),
  );

  it('all five URLs build with trailing-slash canonicals and land in the sitemap', () => {
    const xml = readFileSync(resolve(DIST, 'sitemap-0.xml'), 'utf8');
    for (const href of ['/100th-day-of-school/', ...hundredDayPages.map((p) => `/${p.slug}/`)]) {
      expect(xml, `sitemap missing ${href}`).toContain(`<loc>https://chartglade.com${href}</loc>`);
    }
    const hub = readFileSync(HUB, 'utf8');
    expect(hub).toContain('rel="canonical" href="https://chartglade.com/100th-day-of-school/"');
    for (const [slug, file] of pageFiles) {
      const html = readFileSync(file, 'utf8');
      expect(html, slug).toContain(`rel="canonical" href="https://chartglade.com/${slug}/"`);
    }
  });

  it('the hub card wall links all four printables and they breadcrumb back', () => {
    const hub = readFileSync(HUB, 'utf8');
    for (const p of hundredDayPages) expect(hub, `hub → ${p.slug}`).toContain(`href="/${p.slug}/"`);
    for (const [slug, file] of pageFiles) {
      const html = readFileSync(file, 'utf8');
      expect(html, `${slug} breadcrumb hub link`).toContain('href="/100th-day-of-school/"');
    }
  });

  it('each printable ships the sheet, a print button and JSON-LD (Breadcrumb + FAQ)', () => {
    for (const [slug, file] of pageFiles) {
      const html = readFileSync(file, 'utf8');
      expect(html, `${slug} printable block`).toContain('class="printable');
      expect(html.match(/data-print/g)!.length, slug).toBeGreaterThanOrEqual(2);
      expect(html, `${slug} BreadcrumbList`).toContain('"@type":"BreadcrumbList"');
      expect(html, `${slug} FAQPage`).toContain('"@type":"FAQPage"');
    }
  });

  it('the certificate page declares landscape printing; the others stay portrait', () => {
    const cert = readFileSync(pageFiles.get('100th-day-certificate')!, 'utf8');
    expect(cert).toContain('printable landscape');
    for (const slug of ['100th-day-glasses', 'roll-to-100', 'when-i-am-100-writing-prompt']) {
      const html = readFileSync(pageFiles.get(slug)!, 'utf8');
      expect(html, slug).not.toContain('printable landscape');
    }
  });

  it('the glasses sheet carries the 100 frame geometry (numeral, two lens holes, fold tabs)', () => {
    const html = readFileSync(pageFiles.get('100th-day-glasses')!, 'utf8');
    expect(html).toContain('glasses-frame');
    // two lens holes + two fold lines + two arm strips: the cut/fold contract
    // (attribute form only — the scoped <style> block also names the classes)
    expect((html.match(/class="hole-cut"/g) ?? []).length).toBe(2);
    expect((html.match(/class="fold-line"/g) ?? []).length).toBe(2);
    expect((html.match(/ARM STRIP/g) ?? []).length).toBe(2);
  });

  it('the game board ships the rules and a full 1-100 grid', () => {
    const html = readFileSync(pageFiles.get('roll-to-100')!, 'utf8');
    expect(html).toContain('Version A');
    expect(html).toContain('Version B');
    for (const probe of ['>1<', '>37<', '>100<']) expect(html, `grid cell ${probe}`).toContain(probe);
  });

  it('the writing prompt ships the portrait box and five sentence starters', () => {
    const html = readFileSync(pageFiles.get('when-i-am-100-writing-prompt')!, 'utf8');
    expect(html).toContain('Draw yourself at 100');
    expect((html.match(/w100-model/g) ?? []).length).toBeGreaterThanOrEqual(5);
  });

  it('the certificate ships the rainbow headline, confetti and signature rows', () => {
    const html = readFileSync(pageFiles.get('100th-day-certificate')!, 'utf8');
    expect(html).toContain('100 Days Smarter'); // page lead
    expect(html).toContain('cert-days'); // rainbow headline block
    expect(html).toContain('SMARTER'); // spaced caps line
    expect(html).toContain('cert-congrats');
    expect((html.match(/cert-confetti/g) ?? []).length).toBeGreaterThanOrEqual(24);
    expect(html).toContain('#ef4444'); // a rainbow hex survives to the sheet
    expect(html).toContain('cert-sig-line');
    expect(html).not.toContain('medal-number'); // incumbent recon: no corporate seals
  });

  it('zero CJK leakage on the five new pages', () => {
    for (const [, file] of pageFiles) {
      const html = readFileSync(file, 'utf8');
      expect(html, file).not.toMatch(/[一-鿿]/);
    }
    const hub = readFileSync(HUB, 'utf8');
    expect(hub).not.toMatch(/[一-鿿]/);
  });

  it('the fresh pages carry the site freshness signal (dateModified)', () => {
    const html = readFileSync(pageFiles.get('100th-day-glasses')!, 'utf8');
    expect(html).toContain('"dateModified"');
  });
});
