/**
 * Outfit content engine guards + dist wiring. The template's anti-thin-content
 * layer is the computed Oklab read: these tests pin its shape, the ladders,
 * and that the real built pages carry all ten reads server-side (no-JS SEO
 * bottom line, same contract as the mix/scenario families).
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { outfitContents } from './outfitContent';
import { HEX_RE } from './scenarioContent';

const distRoot = resolve(fileURLToPath(import.meta.url), '../../../dist');

describe('outfitContent computed layer', () => {
  it('every page computes ten reads, ladders, and named swatches', () => {
    expect(outfitContents).toHaveLength(4);
    for (const v of outfitContents) {
      expect(v.combos).toHaveLength(10);
      for (const c of v.combos) {
        expect(c.read).toMatch(/^Oklab read: /);
        expect(c.read).toContain('lightness gap');
        expect(c.read).toContain('contrast');
        expect(c.read).toMatch(/\(L 0\.\d\d\)/);
        for (const it of c.items) {
          expect(it.name.length).toBeGreaterThan(2);
        }
        expect(c.ladder).toHaveLength(9);
        c.ladder.forEach((h) => expect(h).toMatch(HEX_RE));
      }
      for (const d of v.decor) {
        expect(d.ladder).toHaveLength(9);
      }
      expect(v.heroStrip.length).toBe(v.combos[0]!.items.length);
      v.heroStrip.forEach((h) => expect(h).toMatch(HEX_RE));
    }
  });

  it('reads are unique within a page (no template-swallowed combos)', () => {
    for (const v of outfitContents) {
      const reads = v.combos.map((c) => c.read);
      expect(new Set(reads).size).toBe(reads.length);
    }
  });
});

describe('outfit pages in real dist markup', () => {
  it('each page ships all ten computed reads and its figure SVG', () => {
    for (const v of outfitContents) {
      const html = readFileSync(resolve(distRoot, `${v.def.slug}/index.html`), 'utf8');
      const reads = html.match(/Oklab read:/g) ?? [];
      expect(reads.length, v.def.slug).toBe(10);
      expect(html).toContain('outfit-figure');
      expect(html).toContain('FAQPage');
      expect(html).toContain('BreadcrumbList');
      // print stylesheet is the tear-off payload
      expect(html).toContain('@media print');
      expect(html).toContain('window.print()');
    }
  });
});
