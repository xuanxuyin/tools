/**
 * /color-mixing-chart/ wiring against real dist markup: full matrix, linked
 * cells for every pair page, and engine-correct spot-check hexes.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { colors } from '../data/colors';
import { mixes } from '../data/mixes';
import { hexToRgb, oklabMix, rgbToHex } from './color';

const html = readFileSync(
  resolve(fileURLToPath(import.meta.url), '../../../dist/color-mixing-chart/index.html'),
  'utf8',
);

describe('color mixing chart (real dist markup)', () => {
  it('renders the full n×n matrix with headers', () => {
    const cells = html.match(/<td/g)?.length ?? 0;
    expect(cells).toBe(colors.length * colors.length);
    for (const c of colors) expect(html).toContain(c.name);
  });

  it('links both symmetric cells for every pair page (data-order slug)', () => {
    for (const m of mixes) {
      const links = html.match(new RegExp(`href="/mix/${m.a}-${m.b}/"`, 'g'))?.length ?? 0;
      expect(links, `${m.a}-${m.b}`).toBe(2);
    }
  });

  it('cell hexes match the engine (spot: red+blue benchmark)', () => {
    const bench = rgbToHex(oklabMix([hexToRgb('#ff0000'), hexToRgb('#0000ff')], [1, 1]));
    expect(bench).toBe('#8c53a2');
    expect(html).toContain('8c53a2');
  });
});
