import { describe, expect, it } from 'vitest';
import { scenarios } from '../data/scenarios';
import {
  scenarioContents,
  scenarioContentBySlug,
  scenarioJsonLd,
  chartCellHex,
} from './scenarioContent';
import { hexToRgb, oklabMix, rgbToHex, rgbToOklab } from './color';

const HEX_RE = /^#[0-9a-f]{6}$/;

describe('scenario data integrity', () => {
  it('slugs are unique, flat, and kebab-case', () => {
    const slugs = scenarios.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('every scenario passes the content floor', () => {
    for (const def of scenarios) {
      expect(def.metaDescription.length).toBeLessThanOrEqual(155);
      expect(def.metaTitle).toMatch(/ \| TintBrew$/);
      expect(def.lead.length).toBeGreaterThan(80);
      expect(def.faqs.length).toBeGreaterThanOrEqual(4);
      expect(new Set(def.faqs.map((f) => f.q)).size).toBe(def.faqs.length);
      expect(def.tips.length).toBeGreaterThanOrEqual(3);
      expect(def.mixerColors.length).toBeGreaterThanOrEqual(2);
      for (const hex of def.mixerColors) expect(hex).toMatch(HEX_RE);
      for (const r of def.related) expect(r.href.startsWith('/')).toBe(true);
    }
  });

  it('method pages carry at least three computed methods', () => {
    const methodPages = scenarios.filter((s) => s.kind === 'method');
    expect(methodPages.length).toBeGreaterThanOrEqual(2);
    for (const def of methodPages) {
      expect(def.methods!.length).toBeGreaterThanOrEqual(3);
      for (const m of def.methods!) {
        expect(m.mix.length).toBeGreaterThanOrEqual(2);
        for (const part of m.mix) {
          expect(part.hex).toMatch(HEX_RE);
          expect(part.weight).toBeGreaterThan(0);
        }
      }
    }
  });

  it('chart pages define a full gel palette with unique names', () => {
    const chartPages = scenarios.filter((s) => s.kind === 'chart');
    expect(chartPages.length).toBeGreaterThanOrEqual(2);
    for (const def of chartPages) {
      const names = def.chart!.gels.map((g) => g.name);
      expect(new Set(names).size).toBe(names.length);
      expect(names.length).toBeGreaterThanOrEqual(8);
      for (const g of def.chart!.gels) {
        expect(g.hex).toMatch(HEX_RE);
        expect(g.brand.length).toBeGreaterThan(4);
      }
    }
  });
});

describe('buildScenario', () => {
  it('computes a valid, named result for every method', () => {
    for (const c of scenarioContents) {
      for (const m of c.methods) {
        expect(m.resultHex).toMatch(HEX_RE);
        expect(m.resultName.length).toBeGreaterThan(0);
        // recompute independently from the spec
        const expected = rgbToHex(
          oklabMix(
            m.mix.map((p) => hexToRgb(p.hex)),
            m.mix.map((p) => p.weight),
          ),
        );
        expect(m.resultHex).toBe(expected);
      }
    }
  });

  it('builds one row per gel with base + one cell per drop count', () => {
    for (const c of scenarioContents) {
      if (!c.chart) continue;
      expect(c.chart.rows.length).toBe(c.def.chart!.gels.length);
      for (const row of c.chart.rows) {
        expect(row.cells.length).toBe(c.def.chart!.drops.length + 1);
        expect(row.cells[0]!.drops).toBe(0);
        expect(row.cells[0]!.hex).toBe(c.def.chart!.baseHex);
        for (const cell of row.cells) expect(cell.hex).toMatch(HEX_RE);
      }
    }
  });

  it('chart cells darken monotonically as drops increase', () => {
    for (const c of scenarioContents) {
      if (!c.chart) continue;
      for (const row of c.chart.rows) {
        const lightness = row.cells.map((cell) => rgbToOklab(hexToRgb(cell.hex)).L);
        for (let i = 1; i < lightness.length; i++) {
          expect(lightness[i]!).toBeLessThan(lightness[i - 1]!);
        }
      }
    }
  });

  it('chart cell hexes match the published formula', () => {
    for (const c of scenarioContents) {
      if (!c.chart) continue;
      const spec = c.def.chart!;
      const row = c.chart.rows[0]!;
      const gel = row.gel;
      for (const drops of spec.drops) {
        const cell = row.cells.find((x) => x.drops === drops)!;
        expect(cell.hex).toBe(chartCellHex(spec, gel.hex, drops));
      }
    }
  });

  it('hero is hand-set on method pages and computed on chart pages', () => {
    for (const c of scenarioContents) {
      if (c.chart) {
        const first = c.chart.rows[0]!;
        const mid = first.cells[Math.min(2, first.cells.length - 1)]!;
        expect(c.heroHex).toBe(mid.hex);
      } else {
        expect(c.heroHex).toBe(c.def.answerHex);
      }
      expect(c.heroHex).toMatch(HEX_RE);
      expect(c.heroLabel.length).toBeGreaterThan(4);
    }
  });

  it('looks up every slug and fails loudly on unknown slugs', () => {
    for (const def of scenarios) {
      const c = scenarioContentBySlug(def.slug);
      expect(c?.def.slug).toBe(def.slug);
    }
    expect(scenarioContentBySlug('nope')).toBeUndefined();
  });
});

describe('scenarioJsonLd', () => {
  it('emits breadcrumb + FAQ always, HowTo only on method pages', () => {
    for (const c of scenarioContents) {
      const types = scenarioJsonLd(c).map((o) => o['@type']);
      expect(types).toContain('BreadcrumbList');
      expect(types).toContain('FAQPage');
      const faq = scenarioJsonLd(c).find((o) => o['@type'] === 'FAQPage') as {
        mainEntity: { name: string }[];
      };
      expect(faq.mainEntity.length).toBe(c.def.faqs.length);
      if (c.methods.length > 0) {
        expect(types).toContain('HowTo');
      } else {
        expect(types).not.toContain('HowTo');
      }
    }
  });
});
