import { describe, expect, it } from 'vitest';
import { cursiveLetters } from './cursiveLetters';

const LOWERCASE = [...'abcdefghijklmnopqrstuvwxyz'];

describe('cursive single-letter matrix', () => {
  it('covers all 26 letters, a through z, in order', () => {
    expect(cursiveLetters.map((l) => l.slug)).toEqual(LOWERCASE);
  });

  it('keeps each letter definition self-consistent', () => {
    for (const def of cursiveLetters) {
      expect(def.sheet.lower).toBe(def.slug);
      expect(def.sheet.capital).toBe(def.slug.toUpperCase());
      expect(def.hub).toBe('cursive');
    }
  });

  it('gives every letter real stroke content (anti-thin-content)', () => {
    for (const def of cursiveLetters) {
      expect(def.sheet.capitalSteps.length).toBeGreaterThanOrEqual(3);
      expect(def.sheet.lowerSteps.length).toBeGreaterThanOrEqual(3);
      expect(def.sheet.pitfall.length).toBeGreaterThan(20);
      expect(def.intro.length).toBeGreaterThanOrEqual(2);
      expect(def.tips.length).toBeGreaterThanOrEqual(3);
      expect(def.faqs.length).toBeGreaterThanOrEqual(3);
      // the money FAQ: "How do you write a capital X" must exist on every page
      expect(def.faqs.some((f) => f.q.toLowerCase().includes(`capital ${def.slug}`))).toBe(true);
    }
  });

  it('has unique meta titles/descriptions across all 26 pages', () => {
    const titles = new Set(cursiveLetters.map((l) => l.metaTitle));
    const descs = new Set(cursiveLetters.map((l) => l.metaDescription));
    expect(titles.size).toBe(26);
    expect(descs.size).toBe(26);
  });

  it('links every page back to the alphabet chart + hub', () => {
    for (const def of cursiveLetters) {
      const hrefs = def.related.map((r) => r.href);
      expect(hrefs).toContain('/cursive-alphabet/');
      expect(hrefs).toContain('/cursive/');
    }
  });
});
