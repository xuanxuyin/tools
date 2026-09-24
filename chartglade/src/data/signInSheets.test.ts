import { describe, expect, it } from 'vitest';
import { signInSheetPages, SHEET_LAYOUTS } from './signInSheets';

/**
 * V1.8 family guards: five pages, each with a layout that physically fits a
 * letter page, copy that meets the site's SEO standards, and an in-family
 * related list ending at the hub.
 */
const EXPECTED = [
  'sign-in-sheet',
  'open-house-sign-in-sheet',
  'parent-teacher-conference-sign-in-sheet',
  'field-trip-sign-in-sheet',
  'volunteer-sign-in-sheet',
];

describe('sign-in sheet family (V1.8)', () => {
  it('exactly five pages, all owned by the sign-in-sheets hub', () => {
    expect(signInSheetPages.map((d) => d.slug).sort()).toEqual([...EXPECTED].sort());
    expect(signInSheetPages.every((d) => d.hub === 'sign-in-sheets')).toBe(true);
  });

  for (const def of signInSheetPages) {
    it(`${def.slug}: layout exists and fits one letter page`, () => {
      const sheet = SHEET_LAYOUTS[def.slug];
      expect(sheet, 'layout config missing in SHEET_LAYOUTS').toBeDefined();
      expect(sheet.columns.length).toBeGreaterThanOrEqual(3);
      expect(sheet.columns.length).toBeLessThanOrEqual(5);
      expect(sheet.metaFields.length).toBeGreaterThanOrEqual(3);
      // rows: enough to be useful, few enough to stay on one printed page
      expect(sheet.rows).toBeGreaterThanOrEqual(14);
      expect(sheet.rows).toBeLessThanOrEqual(28);
      expect(new Set(sheet.columns).size).toBe(sheet.columns.length);
    });

    it(`${def.slug}: SEO copy standards`, () => {
      expect(def.metaDescription.length).toBeLessThanOrEqual(155);
      expect(def.metaTitle).toContain('ChartGlade');
      expect(def.h1).toMatch(/Sign-In/i);
      expect(def.tips.length).toBeGreaterThanOrEqual(4);
      expect(def.faqs.length).toBeGreaterThanOrEqual(4);
      expect(def.printNote).toContain('letter page');
      expect(def.related.some((r) => r.href === '/sign-in-sheets/')).toBe(true);
      // every related link stays inside the family or points at the hub
      expect(def.related.every((r) => r.href === '/sign-in-sheets/' || EXPECTED.includes(r.href.slice(1, -1)))).toBe(true);
    });
  }
});
