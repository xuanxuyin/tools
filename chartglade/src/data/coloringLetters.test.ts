import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { coloringLetters } from './coloringLetters';

const LOWERCASE = [...'abcdefghijklmnopqrstuvwxyz'];
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');

describe('coloring letter matrix', () => {
  it('covers all 26 letters, a through z, in order', () => {
    expect(coloringLetters.map((l) => l.slug)).toEqual(LOWERCASE);
  });

  it('keeps each letter definition self-consistent', () => {
    for (const def of coloringLetters) {
      expect(def.sheet.lower).toBe(def.slug);
      expect(def.sheet.capital).toBe(def.slug.toUpperCase());
      expect(def.hub).toBe('coloring');
      expect(def.h1).toBe(`Letter ${def.sheet.capital} Coloring Page`);
    }
  });

  it('has three beginning-sound words per letter, all unique across the matrix', () => {
    const seen = new Map<string, string>();
    for (const def of coloringLetters) {
      expect(def.sheet.words).toHaveLength(3);
      for (const w of def.sheet.words) {
        // x mixes in ending-sound words (fox, box); every other letter is pure
        // beginning-sound — the whole phonics point of the word row.
        if (def.slug !== 'x') {
          expect(w[0].toLowerCase(), `${w} on letter ${def.slug}`).toBe(def.slug);
        } else {
          expect('xfb'.includes(w[0].toLowerCase()), `${w} on letter x`).toBe(true);
        }
        expect(seen.has(w.toLowerCase()), `${w} duplicated on ${seen.get(w.toLowerCase())} and ${def.slug}`).toBe(false);
        seen.set(w.toLowerCase(), def.slug);
        expect(def.sheet.wordNote.length).toBeGreaterThan(30);
        expect(def.sheet.drawPrompt.length).toBeGreaterThan(15);
      }
    }
  });

  it('gives every letter real content (anti-thin)', () => {
    for (const def of coloringLetters) {
      expect(def.lead.length).toBeGreaterThan(80);
      expect(def.intro.length).toBeGreaterThanOrEqual(2);
      for (const p of def.intro) expect(p.length).toBeGreaterThan(250);
      expect(def.tips).toHaveLength(3);
      for (const t of def.tips) {
        expect(t.title.length).toBeGreaterThanOrEqual(8);
        expect(t.body.length).toBeGreaterThan(80);
      }
      expect(def.faqs.length).toBe(4);
      for (const f of def.faqs) {
        expect(f.q.length).toBeGreaterThan(15);
        expect(f.a.length).toBeGreaterThan(80);
      }
    }
  });

  it('has unique meta titles/descriptions and intro headings across all 26 pages', () => {
    const titles = new Set(coloringLetters.map((l) => l.metaTitle));
    const descs = new Set(coloringLetters.map((l) => l.metaDescription));
    const leads = new Set(coloringLetters.map((l) => l.lead));
    const headings = new Set(coloringLetters.map((l) => l.introHeading));
    expect(titles.size).toBe(26);
    expect(descs.size).toBe(26);
    expect(leads.size).toBe(26);
    expect(headings.size).toBe(26);
    // meta titles carry the "letter x coloring page" head pattern
    for (const def of coloringLetters) {
      expect(def.metaTitle.toLowerCase()).toContain(`letter ${def.slug} coloring page`);
    }
  });

  it('links every page back to the hub + both letter neighbors', () => {
    for (const [i, def] of coloringLetters.entries()) {
      const hrefs = def.related.map((r) => r.href);
      expect(hrefs).toContain('/coloring/');
      expect(hrefs).toContain(`/coloring/letters/${LOWERCASE[(i + 25) % 26]}/`);
      expect(hrefs).toContain(`/coloring/letters/${LOWERCASE[(i + 1) % 26]}/`);
    }
  });

  it('declares a uniform sheet image for every letter', () => {
    for (const def of coloringLetters) {
      expect(def.sheetImage?.src).toBe(`/images/letter-${def.slug}-coloring-page.png`);
      expect(def.sheetImage?.width).toBe(2016);
      expect(def.sheetImage?.height).toBe(1334);
      expect(def.sheetImage?.alt).toContain(`letter ${def.sheet.capital} coloring page`);
      expect(existsSync(resolve(ROOT, 'public', `images/letter-${def.slug}-coloring-page.png`))).toBe(true);
    }
  });
});

const distReady = existsSync(resolve(DIST, 'coloring', 'letters', 'a', 'index.html'));

describe.skipIf(!distReady)('coloring letters dist guards (real dist)', () => {
  it('builds all 26 pages with sheet, A-Z strip and hub cross-links', () => {
    for (const def of coloringLetters) {
      const html = readFileSync(resolve(DIST, 'coloring', 'letters', def.slug, 'index.html'), 'utf8');
      expect(html).toContain(`<h1>Letter ${def.sheet.capital} Coloring Page</h1>`);
      expect(html).toContain('Download PNG');
      expect(html).toContain(`/images/letter-${def.slug}-coloring-page.png`);
      for (const w of def.sheet.words) {
        expect(html).toContain(`>${w}</span>`);
      }
      // the A-Z strip links all 26 siblings
      expect(html).toContain('/coloring/letters/z/');
      expect(html).toContain('href="/coloring/"');
    }
  });

  it('hub page lists all 26 letters and the holiday CBN cross-links', () => {
    const html = readFileSync(resolve(DIST, 'coloring', 'index.html'), 'utf8');
    for (const def of coloringLetters) {
      expect(html).toContain(`/coloring/letters/${def.slug}/`);
    }
    expect(html).toContain('/christmas-color-by-number/');
    expect(html).toContain('/thanksgiving-color-by-number/');
    expect(html).toContain('/halloween-color-by-number/');
  });
});
