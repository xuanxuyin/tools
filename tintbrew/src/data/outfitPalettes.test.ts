import { describe, expect, it } from 'vitest';
import { outfitPages, type OutfitDef } from './outfitPalettes';
import { HEX_RE } from '../lib/scenarioContent';
import { oklabChroma, oklabHue, pairingRelation } from '../lib/outfitContent';

/**
 * V2.2 outfit-family guards: four pages, each with ten complete outfits
 * (the figure template requires top + pants + shoes on every combo), valid
 * anchor placement, in-family related lists, and copy that meets the site's
 * SEO standards.
 */
const EXPECTED = [
  'what-colors-go-with-brown',
  'what-colors-go-with-green',
  'what-colors-go-with-purple',
  'what-colors-go-with-burgundy',
];

const KNOWN_RELATED = [
  ...EXPECTED.map((s) => `/${s}/`),
  '/what-colors-make-brown/',
  '/what-colors-make-purple/',
  '/what-colors-make-green/',
  '/what-colors-make-orange/',
  '/color-guides/',
  '/color-mixer/',
];

function hueDistance(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

describe('outfit pairing family (V2.2)', () => {
  it('exactly four pages, expected slugs', () => {
    expect(outfitPages.map((d) => d.slug).sort()).toEqual([...EXPECTED].sort());
  });

  for (const def of outfitPages as OutfitDef[]) {
    it(`${def.slug}: SEO copy standards`, () => {
      expect(def.metaDescription.length).toBeLessThanOrEqual(155);
      expect(def.metaTitle).toContain('TintBrew');
      expect(def.h1).toMatch(/What Colors Go With /i);
      expect(def.tips.length).toBeGreaterThanOrEqual(4);
      expect(def.faqs.length).toBeGreaterThanOrEqual(5);
      expect(def.intro.length).toBeGreaterThanOrEqual(2);
      expect(def.mixerColors.length).toBeGreaterThanOrEqual(2);
      def.mixerColors.forEach((c) => expect(c).toMatch(HEX_RE));
    });

    it(`${def.slug}: ten complete outfits the figure can draw`, () => {
      expect(def.combos.length).toBe(10);
      for (const c of def.combos) {
        const roles = c.items.map((i) => i.role);
        expect(new Set(roles).size, `${def.slug}/${c.name} duplicate roles`).toBe(roles.length);
        expect(roles, `${def.slug}/${c.name} missing base layers`).toContain('top');
        expect(roles).toContain('pants');
        expect(roles).toContain('shoes');
        expect(c.items.length).toBeGreaterThanOrEqual(3);
        expect(c.items.length).toBeLessThanOrEqual(5);
        expect(c.note.length).toBeGreaterThan(40);
        c.items.forEach((i) => expect(i.hex, `${def.slug}/${i.label}`).toMatch(HEX_RE));
      }
    });

    it(`${def.slug}: items[0] anchors on the page's color family`, () => {
      for (const c of def.combos) {
        const anchor = c.items[0]!;
        const nearNeutral = oklabChroma(anchor.hex) < 0.05;
        const sameFamily = hueDistance(oklabHue(anchor.hex), oklabHue(def.baseHex)) <= 45;
        expect(
          nearNeutral || sameFamily,
          `${def.slug}/${c.name}: anchor ${anchor.label} is off-family`,
        ).toBe(true);
      }
    });

    it(`${def.slug}: decor, avoid, and related lists are complete and valid`, () => {
      expect(def.decor.length).toBe(4);
      def.decor.forEach((d) => {
        expect(d.colors.length).toBeGreaterThanOrEqual(3);
        d.colors.forEach((c) => expect(c.hex).toMatch(HEX_RE));
      });
      expect(def.avoid.length).toBe(3);
      def.avoid.forEach((a) => {
        expect(a.hex).toMatch(HEX_RE);
        expect(a.why.length).toBeGreaterThan(40);
      });
      // sibling link to the make-X family, never orphaned
      expect(def.related.some((r) => r.href.startsWith('/what-colors-m'))).toBe(true);
      def.related.forEach((r) =>
        expect(
          KNOWN_RELATED.includes(r.href) || r.href.startsWith('/mix/'),
          `${def.slug}: unknown related href ${r.href}`,
        ).toBe(true),
      );
    });
  }

  it('relation buckets are stable for known anchors', () => {
    expect(pairingRelation('#6b4423', '#ece3d2')).toContain('neutral');
    expect(pairingRelation('#6b4423', '#b05a2f')).toContain('same-family');
  });
});
