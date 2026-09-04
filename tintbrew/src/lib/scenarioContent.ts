/**
 * Scenario page content generation (V2.1). Mirrors lib/mixContent.ts: the
 * builder computes every displayed color via the engine from the specs in
 * data/scenarios.ts; the hand-written facts stay in the data file.
 */
import { scenarios, type ChartSpec, type MethodDef, type ScenarioDef } from '../data/scenarios';
import { hexToRgb, oklabMix, rgbToHex, rgbToOklab } from './color';
import { nearestColorName } from './colorName';
import { SITE } from '../consts';

export interface MethodView extends MethodDef {
  resultHex: string;
  resultName: string;
}

export interface ChartCell {
  /** 0 = the plain base swatch, otherwise the drop count */
  drops: number;
  hex: string;
  name: string;
}

export interface ChartRow {
  gel: ChartSpec['gels'][number];
  cells: ChartCell[];
}

export interface ScenarioContent {
  def: ScenarioDef;
  heroHex: string;
  heroLabel: string;
  methods: MethodView[];
  chart: (Omit<ChartSpec, 'gels'> & { rows: ChartRow[] }) | null;
}

const HEX_RE = /^#[0-9a-f]{6}$/;

function mixHex(spec: MethodDef['mix']): string {
  return rgbToHex(
    oklabMix(
      spec.map((m) => hexToRgb(m.hex)),
      spec.map((m) => m.weight),
    ),
  );
}

/** The swatch for N drops of a gel in one batch of base. */
export function chartCellHex(chart: ChartSpec, gelHex: string, drops: number): string {
  return rgbToHex(
    oklabMix(
      [hexToRgb(chart.baseHex), hexToRgb(gelHex)],
      [chart.baseWeight, drops * chart.dropStrength],
    ),
  );
}

function buildChart(chart: ChartSpec): ChartRow[] {
  return chart.gels.map((gel) => {
    const cells: ChartCell[] = [
      { drops: 0, hex: chart.baseHex, name: nearestColorName(hexToRgb(chart.baseHex)).name },
      ...chart.drops.map((d) => {
        const hex = chartCellHex(chart, gel.hex, d);
        return { drops: d, hex, name: nearestColorName(hexToRgb(hex)).name };
      }),
    ];
    return { gel, cells };
  });
}

export function buildScenario(def: ScenarioDef): ScenarioContent {
  const methods: MethodView[] = (def.methods ?? []).map((m) => {
    const resultHex = mixHex(m.mix);
    return { ...m, resultHex, resultName: nearestColorName(hexToRgb(resultHex)).name };
  });

  const chart = def.chart
    ? {
        baseName: def.chart.baseName,
        baseHex: def.chart.baseHex,
        baseBlurb: def.chart.baseBlurb,
        drops: def.chart.drops,
        baseWeight: def.chart.baseWeight,
        dropStrength: def.chart.dropStrength,
        rows: buildChart(def.chart),
      }
    : null;

  // Chart pages compute the hero from the first gel at a mid drop count;
  // method pages carry a hand-set target answer in the data.
  let heroHex = def.answerHex;
  let heroLabel = def.answerLabel;
  if (chart) {
    const first = chart.rows[0]!;
    const mid = first.cells[Math.min(2, first.cells.length - 1)]!;
    heroHex = mid.hex;
    heroLabel = mid.drops === 0 ? chart.baseName : `${mid.drops} drops of ${first.gel.name} gel in ${chart.baseName}`;
  }

  return { def, heroHex, heroLabel, methods, chart };
}

export const scenarioContents: ScenarioContent[] = scenarios.map(buildScenario);

export function scenarioContentBySlug(slug: string): ScenarioContent | undefined {
  return scenarioContents.find((s) => s.def.slug === slug);
}

/** JSON-LD shared by every scenario page (breadcrumb + FAQ; HowTo on method pages). */
export function scenarioJsonLd(c: ScenarioContent): Record<string, unknown>[] {
  const items: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Color Guides', item: `${SITE.url}/color-guides/` },
        { '@type': 'ListItem', position: 3, name: c.def.h1, item: `${SITE.url}/${c.def.slug}/` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.def.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  if (c.methods.length > 0) {
    items.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: c.def.h1,
      description: c.def.metaDescription,
      step: c.methods.map((m, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: m.name,
        text: `${m.summary} ${m.note}`,
      })),
    });
  }

  return items;
}

export { HEX_RE };
