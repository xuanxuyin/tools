import { describe, expect, it } from 'vitest';
import { mixes } from './mixes';
import { colors, colorById } from './colors';
import { buildMixContent } from '../lib/mixContent';
import { mixSlug } from '../lib/slug';

describe('mix data integrity', () => {
  it('has 24 pairs, all slugs unique', () => {
    const slugs = mixes.map((m) => mixSlug(m.a, m.b));
    expect(slugs).toHaveLength(24);
    expect(new Set(slugs).size).toBe(24);
  });

  it('references only defined colors', () => {
    for (const m of mixes) {
      expect(colorById[m.a], m.a).toBeDefined();
      expect(colorById[m.b], m.b).toBeDefined();
      expect(m.a).not.toBe(m.b);
    }
  });

  it('every pair has a hand-tuned resultName and 7 pairs are popular', () => {
    for (const m of mixes) expect(m.resultName.length).toBeGreaterThan(2);
    expect(mixes.filter((m) => m.popular)).toHaveLength(7);
  });

  it('defines all 10 colors used by pairs', () => {
    const used = new Set(mixes.flatMap((m) => [m.a, m.b]));
    for (const c of colors) expect(used.has(c.id), c.id).toBe(true);
    expect(used.size).toBe(colors.length);
  });
});

describe('buildMixContent', () => {
  const contents = mixes.map(buildMixContent);

  it('meta descriptions fit 155 chars and mention the answer', () => {
    for (const c of contents) {
      expect(c.metaDescription.length).toBeLessThanOrEqual(155);
      expect(c.metaDescription).toContain(c.resultHex);
    }
  });

  it('titles are the question with brand suffix', () => {
    const c = contents.find((x) => x.slug === 'red-blue')!;
    expect(c.metaTitle).toBe('What color does red and blue make | TintBrew');
  });

  it('computes three ratio rows whose hexes differ by direction', () => {
    for (const c of contents) {
      expect(c.ratioRows).toHaveLength(3);
      const [r75, r50, r25] = c.ratioRows;
      expect(r50!.hex).toBe(c.resultHex);
      // 75/25 and 25/75 must differ unless the pair is symmetric (e.g. black+white is NOT)
      expect(r75!.hex).not.toBe(r25!.hex);
    }
  });

  it('tints are lighter and shades darker than the base mix', () => {
    for (const c of contents) {
      const lum = (hex: string) => parseInt(hex.slice(1, 3), 16) + parseInt(hex.slice(3, 5), 16) + parseInt(hex.slice(5, 7), 16);
      const base = c.tintsShades.find((s) => s.label === '50/50 mix')!;
      const tint = c.tintsShades.find((s) => s.label === 'Tint')!;
      const shade = c.tintsShades.find((s) => s.label === 'Shade')!;
      expect(lum(tint.hex)).toBeGreaterThan(lum(base.hex));
      expect(lum(shade.hex)).toBeLessThan(lum(base.hex));
    }
  });

  it('related mixes share a color, max 6, never self', () => {
    for (const c of contents) {
      expect(c.related.length).toBeGreaterThan(0);
      expect(c.related.length).toBeLessThanOrEqual(6);
      for (const r of c.related) {
        const shares = [r.a.id, r.b.id].includes(c.a.id) || [r.a.id, r.b.id].includes(c.b.id);
        expect(shares, `${c.slug} → ${r.slug}`).toBe(true);
        expect(r.slug).not.toBe(c.slug);
      }
    }
  });

  it('provides 4 FAQs and the answer names the computed hex', () => {
    for (const c of contents) {
      expect(c.faqs).toHaveLength(4);
      expect(c.answer).toContain(c.resultHex);
      expect(c.faqs[0]!.q).toContain(c.shortResult);
    }
  });

  it('red+blue headline stays honest to the computed mix', () => {
    const c = contents.find((x) => x.slug === 'red-blue')!;
    expect(c.resultHex).toBe('#8c53a2'); // engine-pinned regression value (pure #ff0000 + #0000ff)
    expect(c.shortResult).toBe('purple');
  });
});
