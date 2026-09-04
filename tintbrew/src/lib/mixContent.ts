/**
 * Matrix page content generation. Every value shown is computed by the color
 * engine at build time; hand-written facts (resultName, additiveNote) come
 * from data/mixes.ts. Three prose variants rotate by stable slug hash so the
 * 24 pages don't read as one template.
 */
import { colorById, type ColorDef } from '../data/colors';
import { mixes, type MixDef } from '../data/mixes';
import { colorMixSnippet, hexToRgb, oklabMix, rgbToHex } from './color';
import { slugHash } from './slug';
import { nearestColorName } from './colorName';

export interface RatioRow {
  pctA: number;
  pctB: number;
  hex: string;
  name: string;
}

export interface MixContent {
  def: MixDef;
  a: ColorDef;
  b: ColorDef;
  /** slug-sorted pair (slug is `{first}-{second}`); ratios and snippets use this order */
  first: ColorDef;
  second: ColorDef;
  slug: string;
  question: string;
  metaTitle: string;
  metaDescription: string;
  answer: string;
  resultHex: string;
  resultName: string;
  shortResult: string;
  nearestName: string;
  snippet: string;
  ratioRows: RatioRow[];
  tintsShades: { label: string; hex: string }[];
  related: { slug: string; a: ColorDef; b: ColorDef; resultHex: string; text: string }[];
  faqs: { q: string; a: string }[];
  variant: number;
}

function named(rgb: { r: number; g: number; b: number }): string {
  return nearestColorName(rgb).name;
}

function mixHex(aHex: string, bHex: string, wA: number, wB: number): string {
  return rgbToHex(oklabMix([hexToRgb(aHex), hexToRgb(bHex)], [wA, wB]));
}

/** "purple (a muted violet)" → "purple" for short headline uses */
function shortResultOf(resultName: string): string {
  return resultName.split(/[,(]/)[0]!.trim().toLowerCase();
}

export function buildMixContent(def: MixDef): MixContent {
  const a = colorById[def.a]!;
  const b = colorById[def.b]!;
  // Canonical slug = authored order (how people phrase the question, e.g.
  // "red and blue"). Reversed orders are 301'd via vercel.json; uniqueness
  // of the underlying pair is enforced by the sorted-key test.
  const slug = `${def.a}-${def.b}`;
  const variant = slugHash(slug) % 3;

  const first = a;
  const second = b;

  const resultHex = mixHex(a.hex, b.hex, 1, 1);
  const resultRgb = hexToRgb(resultHex);
  const nearestName = named(resultRgb);
  const shortResult = shortResultOf(def.resultName);
  const question = `What color does ${a.name.toLowerCase()} and ${b.name.toLowerCase()} make?`;

  const pctFirst75 = mixHex(first.hex, second.hex, 3, 1);
  const pctFirst25 = mixHex(first.hex, second.hex, 1, 3);
  const ratioRows: RatioRow[] = [
    { pctA: 75, pctB: 25, hex: pctFirst75, name: named(hexToRgb(pctFirst75)) },
    { pctA: 50, pctB: 50, hex: resultHex, name: nearestName },
    { pctA: 25, pctB: 75, hex: pctFirst25, name: named(hexToRgb(pctFirst25)) },
  ];

  const tint50 = mixHex(resultHex, '#ffffff', 1, 1);
  const tint25 = mixHex(resultHex, '#ffffff', 3, 1);
  const shade50 = mixHex(resultHex, '#000000', 1, 1);
  const shade25 = mixHex(resultHex, '#000000', 3, 1);
  const tintsShades = [
    { label: 'Lighter', hex: tint25 },
    { label: 'Tint', hex: tint50 },
    { label: '50/50 mix', hex: resultHex },
    { label: 'Shade', hex: shade50 },
    { label: 'Darker', hex: shade25 },
  ];

  const snippet = colorMixSnippet(first.hex, second.hex, 50);

  const hexName = `${resultHex} (${nearestName})`;
  const answers = [
    `Mixing ${a.name.toLowerCase()} and ${b.name.toLowerCase()} in equal parts gives ${hexName} — ${def.resultName}. That's the perceptual (Oklab) midpoint: the shade your eye treats as the true halfway point between the two colors.`,
    `The short answer: ${a.name.toLowerCase()} and ${b.name.toLowerCase()} make ${def.resultName}. Blended 50/50 you land on ${hexName}, with heavier ratios leaning back toward whichever color you push — try the sliders in the mixer above.`,
    `Equal parts ${a.name.toLowerCase()} and ${b.name.toLowerCase()} produce ${def.resultName} (${hexName}). The blend is computed in the Oklab color space, so the steps between the two colors look evenly spaced to your eye rather than to the raw channel math.`,
  ];

  const related = mixes
    .filter(
      (m) =>
        m !== def &&
        (m.a === def.a || m.b === def.a || m.a === def.b || m.b === def.b),
    )
    .sort((m1, m2) => Number(m2.popular ?? false) - Number(m1.popular ?? false))
    .slice(0, 6)
    .map((m) => {
      const ma = colorById[m.a]!;
      const mb = colorById[m.b]!;
      return {
        slug: `${m.a}-${m.b}`,
        a: ma,
        b: mb,
        resultHex: mixHex(ma.hex, mb.hex, 1, 1),
        text: `What ${ma.name.toLowerCase()} and ${mb.name.toLowerCase()} make`,
      };
    });

  const paintVsLight =
    def.additiveNote ??
    `On a screen, colors blend by adding light; with paint, pigments subtract light and the result is usually darker and duller. This page's values are the perceptual blend of the two colors — the closest digital equivalent to what mixed paint looks like.`;

  const faqs = [
    {
      q: `Does ${a.name.toLowerCase()} and ${b.name.toLowerCase()} make ${shortResult}?`,
      a: `Yes — equal parts give ${def.resultName}, around ${resultHex}. The exact shade depends on your ratio: ${first.name.toLowerCase()}-heavy mixes lean toward ${pctFirst75} and ${second.name.toLowerCase()}-heavy mixes toward ${pctFirst25}.`,
    },
    {
      q: `What is the HEX code for ${a.name.toLowerCase()} and ${b.name.toLowerCase()} mixed?`,
      a: `A 50/50 perceptual mix is ${hexName}. If you need it in CSS, the mixer above generates a ready-to-paste color-mix() snippet: ${snippet}.`,
    },
    {
      q: `What does ${a.name.toLowerCase()} and ${b.name.toLowerCase()} make in paint vs. on a screen?`,
      a: paintVsLight,
    },
    {
      q: `How do I make the ${shortResult} mix lighter or darker?`,
      a: `Mix the result with white to tint it — 50% white gives about ${tint50} — or with black to shade it, where 50% black gives about ${shade50}. The strip above shows the full run from lighter to darker.`,
    },
  ];

  const metaTitle = `${question[0]!.toUpperCase()}${question.slice(1, -1)} | TintBrew`;
  const metaDescription = trim155(
    `${a.name} and ${b.name} make ${def.resultName}: a 50/50 mix is ${resultHex} (${nearestName}). See 75/25 and 25/75 blends and mix your own ratio live.`,
  );

  return {
    def,
    a,
    b,
    first,
    second,
    slug,
    question,
    metaTitle,
    metaDescription,
    answer: answers[variant]!,
    resultHex,
    resultName: def.resultName,
    shortResult,
    nearestName,
    snippet,
    ratioRows,
    tintsShades,
    related,
    faqs,
    variant,
  };
}

function trim155(s: string): string {
  return s.length <= 155 ? s : `${s.slice(0, 152)}...`;
}
