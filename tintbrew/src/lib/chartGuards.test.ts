/**
 * Ratio-strip + freshness guards over real dist output. The 2026-10-04 batch
 * A upgraded every chart cell to a 5-stop ratio walk and added site-wide
 * freshness signals — these pin both against the built pages.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { colors, colorById } from '../data/colors';
import { hexToRgb, oklabMix, rgbToHex } from './color';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');

describe.skipIf(!existsSync(DIST))('ratio strips (real dist)', () => {
  const html = readFileSync(resolve(DIST, 'color-mixing-chart', 'index.html'), 'utf8');

  it('every off-diagonal cell carries a 5-stop strip', () => {
    // `<span class=` only matches real elements — the scoped-<style> block
    // spells the class as `.cell-strip[data-astro-cid-…]` and never matches
    const strips = html.match(/<span class="cell-strip"/g) ?? [];
    // 11 colors → 11×10 = 110 off-diagonal cells
    expect(strips.length).toBe(colors.length * (colors.length - 1));
    // 5 ratio spans per strip
    const spans = html.match(/<span style="background:#/g) ?? [];
    expect(spans.length).toBe(strips.length * 5);
  });

  it('the printed hex under each cell is the 50/50 engine blend', () => {
    // scoped attrs sit between class and >, and the strip spans widen the gap
    const re = /<span class="cell-strip"[\s\S]{0,900}?<span class="cell-hex"[^>]*>([0-9a-f]{6})</g;
    const found = [...html.matchAll(re)].map((m) => m[1]);
    expect(found.length).toBe(colors.length * (colors.length - 1));
    const rb = rgbToHex(oklabMix([hexToRgb(colorById.red!.hex), hexToRgb(colorById.blue!.hex)], [1, 1]));
    expect(found).toContain(rb.slice(1));
    expect(rb).toBe('#8c53a2'); // engine benchmark, locked
  });
});

describe.skipIf(!existsSync(DIST))('freshness signals (real dist)', () => {
  it('JSON-LD dateModified (never on BreadcrumbList) + visible updated line', () => {
    const page = readFileSync(resolve(DIST, 'color-mixer', 'index.html'), 'utf8');
    expect(page).toContain('"dateModified":"2026-10-04"');
    expect(page.match(/"dateModified":"2026-10-04"/g)!.length).toBeGreaterThanOrEqual(2); // WebApplication + FAQPage
    expect(page).not.toContain('BreadcrumbList","dateModified');
    expect(page).toContain('Color tools last updated');
  });

  it('sitemap carries lastmod for every URL', () => {
    const xml = readFileSync(resolve(DIST, 'sitemap-0.xml'), 'utf8');
    expect(xml).toContain('<lastmod>2026-10-04');
  });
});
