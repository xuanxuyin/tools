/**
 * OG generator drift guards + dist wiring. The generator runs on plain-JS
 * ports (scripts/og-color.mjs, scripts/og-data.mjs) because a one-shot Node
 * script can't import the TS engine — these tests lock the ports to the
 * source of truth, so a stale snapshot or a divergent mix function can
 * never ship silently.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { colors } from '../data/colors';
import { mixes } from '../data/mixes';
import { hexToRgb, oklabMix, rgbToHex } from './color';
import { scenarioContents } from './scenarioContent';
import { COLORS as OG_COLORS, PAIRS, SCENARIOS } from '../../scripts/og-data.mjs';
import { mixHex } from '../../scripts/og-color.mjs';

const distRoot = resolve(fileURLToPath(import.meta.url), '../../../dist');

describe('og-data.mjs snapshot parity', () => {
  it('colors match data/colors.ts', () => {
    expect(OG_COLORS).toEqual(Object.fromEntries(colors.map((c) => [c.id, c.hex])));
  });

  it('pairs match data/mixes.ts in order', () => {
    expect(PAIRS).toHaveLength(mixes.length);
    for (let i = 0; i < mixes.length; i++) {
      expect(PAIRS[i]).toEqual([mixes[i]!.a, mixes[i]!.b]);
    }
  });

  it('scenarios match computed hero values', () => {
    expect(SCENARIOS).toHaveLength(scenarioContents.length);
    for (let i = 0; i < scenarioContents.length; i++) {
      const c = scenarioContents[i]!;
      expect(SCENARIOS[i]).toEqual({
        slug: c.def.slug,
        swatches: c.def.mixerColors,
        resultHex: c.heroHex,
      });
    }
  });
});

describe('og-color.mjs math parity', () => {
  it('port matches the engine for every pair', () => {
    for (const [a, b] of PAIRS) {
      const engine = rgbToHex(
        oklabMix([hexToRgb(OG_COLORS[a]), hexToRgb(OG_COLORS[b])], [1, 1]),
      );
      expect(mixHex(OG_COLORS[a], OG_COLORS[b]), `${a}+${b}`).toBe(engine);
    }
  });

  it('known benchmark: red + blue = #8c53a2', () => {
    expect(mixHex('#ff0000', '#0000ff')).toBe('#8c53a2');
  });
});

describe('og wiring (real dist markup)', () => {
  const ogImageOf = (html: string): string => {
    const m = /property="og:image" content="([^"]+)"/.exec(html);
    return m ? m[1]! : '';
  };

  it('every mix page points at its own card and the file exists', () => {
    for (const m of mixes) {
      // page slug is data order (getStaticPaths), NOT the sorted mixSlug
      const slug = `${m.a}-${m.b}`;
      const html = readFileSync(resolve(distRoot, `mix/${slug}/index.html`), 'utf8');
      expect(ogImageOf(html), slug).toBe(`https://tintbrew.com/og/mix-${slug}.png`);
      expect(existsSync(resolve(distRoot, `og/mix-${slug}.png`)), slug).toBe(true);
    }
  });

  it('every scenario page points at its own card and the file exists', () => {
    for (const c of scenarioContents) {
      const html = readFileSync(resolve(distRoot, `${c.def.slug}/index.html`), 'utf8');
      expect(ogImageOf(html), c.def.slug).toBe(`https://tintbrew.com/og/${c.def.slug}.png`);
      expect(existsSync(resolve(distRoot, `og/${c.def.slug}.png`)), c.def.slug).toBe(true);
    }
  });

  it('brand default card still exists for tool/remaining pages', () => {
    expect(existsSync(resolve(distRoot, 'og-default.png'))).toBe(true);
  });
});
