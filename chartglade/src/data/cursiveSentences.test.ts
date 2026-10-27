import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CURSIVE_SENTENCES, cursiveSentencesPage } from './cursiveSentences';

/**
 * Cursive-sentences guards (Nov pre-dev wave 1): data-level tests pin the
 * eight-sentence set, its one-row length budget and the public-domain
 * guarantee (every author died before 1930); dist-level tests (after
 * `npm run build`) pin the URL, the hub/footer mesh and the printed
 * trace/hollow/blank row stack.
 */

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');

/* --------------------------- data guards --------------------------- */

describe('cursive-sentences PageDef', () => {
  it('targets the keyword and belongs to the cursive hub', () => {
    expect(cursiveSentencesPage.slug).toBe('cursive-sentences');
    expect(cursiveSentencesPage.hub).toBe('cursive');
    expect(cursiveSentencesPage.metaTitle).toContain('Cursive Sentences');
    expect(cursiveSentencesPage.metaDescription.length).toBeLessThanOrEqual(160);
  });

  it('carries full anti-thin-content depth', () => {
    expect(cursiveSentencesPage.intro.length).toBeGreaterThanOrEqual(3);
    for (const p of cursiveSentencesPage.intro) expect(p.length).toBeGreaterThan(200);
    expect(cursiveSentencesPage.extraSection!.paras.length).toBeGreaterThanOrEqual(2);
    expect(cursiveSentencesPage.tips.length).toBeGreaterThanOrEqual(3);
    expect(cursiveSentencesPage.faqs.length).toBeGreaterThanOrEqual(4);
  });

  it('explains the three-row system and links its how-to sibling', () => {
    const hrefs = cursiveSentencesPage.related.map((r) => r.href);
    expect(hrefs).toContain('/how-to-write-in-cursive/');
    expect(hrefs).toContain('/cursive-alphabet/');
    expect(hrefs).toContain('/cursive/');
    const faq = cursiveSentencesPage.faqs.map((f) => f.q.toLowerCase()).join(' ');
    expect(faq).toContain('trace');
    expect(faq).toContain('public domain');
  });
});

describe('the eight practice sentences', () => {
  it('holds eight sentences, each fitting one practice row (28-62 chars)', () => {
    expect(CURSIVE_SENTENCES.length).toBe(8);
    for (const s of CURSIVE_SENTENCES) {
      expect(s.text.length, `"${s.text}" length`).toBeGreaterThanOrEqual(28);
      expect(s.text.length).toBeLessThanOrEqual(62);
    }
  });

  it('uses plain typeable text (no smart quotes to break fonts or tests)', () => {
    for (const s of CURSIVE_SENTENCES) {
      expect(s.text).toMatch(/^[A-Za-z ,.'-]+$/);
    }
  });

  it('is all unique sentences and unique facts', () => {
    expect(new Set(CURSIVE_SENTENCES.map((s) => s.text)).size).toBe(8);
    expect(new Set(CURSIVE_SENTENCES.map((s) => s.fact)).size).toBe(8);
  });

  it('every author is public domain: died before 1930 (razor guarantee)', () => {
    for (const s of CURSIVE_SENTENCES) {
      expect(s.deathYear, `${s.author} must predate 1930`).toBeLessThan(1930);
    }
  });

  it('flags honestly which quotes are attributed rather than sourced', () => {
    const attributed = CURSIVE_SENTENCES.filter((s) => s.author.includes('(attributed)'));
    expect(attributed.length).toBeGreaterThanOrEqual(2);
    for (const s of attributed) expect(s.fact.toLowerCase()).toContain('attributed');
  });

  it('each sentence carries a razor one-line background fact', () => {
    for (const s of CURSIVE_SENTENCES) {
      expect(s.fact.length).toBeGreaterThanOrEqual(40);
      expect(s.fact.length).toBeLessThanOrEqual(160);
    }
  });
});

/* --------------------------- dist guards --------------------------- */

const built = existsSync(resolve(DIST, 'cursive-sentences', 'index.html'));

describe.skipIf(!built)('cursive-sentences dist guards (real dist)', () => {
  it('is in the sitemap with a trailing slash and self-canonicalizes', () => {
    const xml = readFileSync(resolve(DIST, 'sitemap-0.xml'), 'utf8');
    expect(xml).toContain('<loc>https://chartglade.com/cursive-sentences/</loc>');
    const html = readFileSync(resolve(DIST, 'cursive-sentences', 'index.html'), 'utf8');
    expect(html).toContain('rel="canonical" href="https://chartglade.com/cursive-sentences/"');
  });

  it('the cursive hub links both new pages, and the two pages interlink', () => {
    const hub = readFileSync(resolve(DIST, 'cursive', 'index.html'), 'utf8');
    expect(hub).toContain('href="/how-to-write-in-cursive/"');
    expect(hub).toContain('href="/cursive-sentences/"');
    const howTo = readFileSync(resolve(DIST, 'how-to-write-in-cursive', 'index.html'), 'utf8');
    const sentences = readFileSync(resolve(DIST, 'cursive-sentences', 'index.html'), 'utf8');
    expect(howTo).toContain('href="/cursive-sentences/"');
    expect(sentences).toContain('href="/how-to-write-in-cursive/"');
  });

  it('prints every sentence in all three row modes, split over two pages', () => {
    const raw = readFileSync(resolve(DIST, 'cursive-sentences', 'index.html'), 'utf8');
    // Astro entity-encodes apostrophes (&#39;) — decode before matching quote text
    const html = raw.replace(/&#39;/g, "'");
    for (const s of CURSIVE_SENTENCES) {
      expect(html, `sentence text "${s.text}"`).toContain(s.text);
    }
    expect(raw.match(/sent-row trace/g)!.length).toBe(CURSIVE_SENTENCES.length);
    expect(raw.match(/sent-row hollow/g)!.length).toBe(CURSIVE_SENTENCES.length);
    expect(raw.match(/sent-row blank/g)!.length).toBe(CURSIVE_SENTENCES.length);
    expect(raw).toContain('sheet-break');
  });

  it('ships FAQPage + BreadcrumbList JSON-LD', () => {
    const html = readFileSync(resolve(DIST, 'cursive-sentences', 'index.html'), 'utf8');
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
  });
});
