/**
 * Outfit content engine guards + dist wiring. The template's anti-thin-content
 * layer is the computed Oklab read: these tests pin its shape, the ladders,
 * and that the real built pages carry all ten reads server-side (no-JS SEO
 * bottom line, same contract as the mix/scenario families).
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { outfitContents } from './outfitContent';
import { comboReadHexes, ladderFrom } from './pairingRead';
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

  it('client-side recompute path matches the server render exactly', () => {
    // scripts/outfit.ts rebuilds reads/ladders from bare hexes via
    // pairingRead; if this drifts from buildOutfit the live swap would
    // show different numbers than the static shell
    for (const v of outfitContents) {
      for (const c of v.combos) {
        const hexes = c.items.map((it) => ({ hex: it.hex }));
        expect(comboReadHexes(hexes), `${v.def.slug} ${c.name}`).toBe(c.read);
        expect(ladderFrom(c.items.map((it) => it.hex)), `${v.def.slug} ${c.name}`).toEqual(c.ladder);
      }
      for (const d of v.decor) {
        expect(ladderFrom(d.colors.map((col) => col.hex))).toEqual(d.ladder);
      }
    }
  });
});

describe('outfit pages in real dist markup', () => {
  it('each page ships all ten computed reads plus the studio card and its figure SVG', () => {
    for (const v of outfitContents) {
      const html = readFileSync(resolve(distRoot, `${v.def.slug}/index.html`), 'utf8');
      const reads = html.match(/Oklab read:/g) ?? [];
      expect(reads.length, v.def.slug).toBe(11);
      expect(html).toContain('outfit-figure');
      expect(html).toContain('FAQPage');
      expect(html).toContain('BreadcrumbList');
      // print stylesheet is the tear-off payload
      expect(html).toContain('@media print');
      expect(html).toContain('window.print()');
    }
  });

  it('swap interaction is wired: role hooks on the figure, chips are buttons, island loads', () => {
    for (const v of outfitContents) {
      const html = readFileSync(resolve(distRoot, `${v.def.slug}/index.html`), 'utf8');
      // every garment part the island recolors is tagged with its role
      for (const part of ['top', 'pants', 'shoes']) {
        expect(html).toContain(`data-part="${part}"`);
      }
      // chips are real buttons with the per-item hooks apply() reads
      // (10 combos + the 4-piece "style it yourself" studio card)
      const swaps = html.match(/data-swap/g) ?? [];
      const itemCount = v.combos.reduce((n, c) => n + c.items.length, 0);
      expect(swaps.length, `${v.def.slug} swap chips`).toBe(itemCount + 4);
      expect(html).toContain('data-index=');
      expect(html).toContain('data-role=');
      // the free-styling card is wired into the same island
      expect(html).toContain('data-studio');
      expect(html).toContain('Style it yourself');
      // the island script itself is bundled, referenced, and is the swap UI
      const srcs = Array.from(html.matchAll(/src="(\/_astro\/[^"]+\.js)"/g), (m) => m[1]!);
      const island = srcs.find((s) => {
        const file = resolve(distRoot, s.slice(1));
        return existsSync(file) && readFileSync(file, 'utf8').includes('combo-picker');
      });
      expect(island, `${v.def.slug} outfit island bundle`).toBeDefined();
    }
  });
});
