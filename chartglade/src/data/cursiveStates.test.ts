import { describe, expect, it } from 'vitest';
import { cursiveStates, statesPage } from './cursiveStates';

/**
 * #16 link-bait guards: the 50-state tracker lives or dies on completeness
 * and internal consistency — every count claimed in the page copy must match
 * the data, and every law/standards row must carry a source.
 */

const EXPECTED_TIERS = { law: 19, standards: 8, none: 23 };

describe('states that require cursive (#16)', () => {
  it('covers exactly 50 states, no duplicates', () => {
    expect(cursiveStates).toHaveLength(50);
    expect(new Set(cursiveStates.map((s) => s.name)).size).toBe(50);
  });

  it('tier counts match the numbers claimed in the page copy', () => {
    for (const [tier, count] of Object.entries(EXPECTED_TIERS)) {
      expect(cursiveStates.filter((s) => s.tier === tier)).toHaveLength(count);
    }
  });

  it('every law and standards row carries a citation, year and source', () => {
    for (const s of cursiveStates.filter((s) => s.tier !== 'none')) {
      expect(s.citation, `${s.name} citation`).toBeTruthy();
      expect(s.year, `${s.name} year`).toBeTypeOf('number');
      expect(s.sources.length, `${s.name} sources`).toBeGreaterThan(0);
      for (const u of s.sources) expect(() => new URL(u)).not.toThrow();
    }
  });

  it('the two commonly-mislabeled states are correctly tiered none', () => {
    const maine = cursiveStates.find((s) => s.name === 'Maine')!;
    const indiana = cursiveStates.find((s) => s.name === 'Indiana')!;
    const idaho = cursiveStates.find((s) => s.name === 'Idaho')!;
    expect(maine.tier).toBe('none');
    expect(indiana.tier).toBe('none');
    expect(idaho.tier).toBe('law');
  });

  it('SEO copy standards', () => {
    expect(statesPage.hub).toBe('cursive');
    expect(statesPage.metaTitle).toContain('ChartGlade');
    expect(statesPage.metaDescription.length).toBeLessThanOrEqual(155);
    expect(statesPage.printNote).toContain('letter page');
    expect(statesPage.tips.length).toBeGreaterThanOrEqual(4);
    expect(statesPage.faqs.length).toBeGreaterThanOrEqual(4);
    expect(statesPage.related.some((r) => r.href === '/cursive/')).toBe(true);
  });

  it('copy tier counts agree with the data (no drift between prose and table)', () => {
    expect(statesPage.metaDescription).toContain('19 states');
    expect(statesPage.metaDescription).toContain('8 more');
    const howMany = statesPage.faqs.find((f) => /how many states/i.test(f.q))!;
    expect(howMany.a).toContain('19 states by statute and 8 more');
  });
});
