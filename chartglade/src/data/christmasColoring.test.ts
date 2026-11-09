import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { christmasStockingPage } from './christmasColoring';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');

describe('christmas stocking coloring page (Phase B #35)', () => {
  it('keeps the PageDef self-consistent', () => {
    expect(christmasStockingPage.slug).toBe('christmas-stocking-coloring-page');
    expect(christmasStockingPage.hub).toBe('christmas');
    expect(christmasStockingPage.h1).toMatch(/Christmas Stocking Coloring Pages/i);
    expect(christmasStockingPage.metaTitle.toLowerCase()).toContain('christmas stocking coloring');
    expect(christmasStockingPage.intro.length).toBeGreaterThanOrEqual(2);
    expect(christmasStockingPage.tips).toHaveLength(3);
    expect(christmasStockingPage.faqs).toHaveLength(4);
    // the tradition FAQ — the page's unique angle vs plain outline sheets
    expect(christmasStockingPage.faqs.some((f) => /hang stockings/i.test(f.q))).toBe(true);
    const hrefs = christmasStockingPage.related.map((r) => r.href);
    expect(hrefs).toContain('/christmas-printables/');
    expect(hrefs).toContain('/coloring/');
  });

  it('declares a sheet image that exists on disk', () => {
    expect(christmasStockingPage.sheetImage?.src).toBe('/images/christmas-stocking-coloring-page.png');
    expect(existsSync(resolve(ROOT, 'public', 'images/christmas-stocking-coloring-page.png'))).toBe(true);
  });

  it('cross-links from both hubs (built HTML)', () => {
    const page = readFileSync(resolve(DIST, 'christmas-stocking-coloring-page', 'index.html'), 'utf8');
    expect(page).toContain('<h1>Christmas Stocking Coloring Pages</h1>');
    expect(page).toContain('Download PNG');
    expect(page).toContain('/images/christmas-stocking-coloring-page.png');
    const coloringHub = readFileSync(resolve(DIST, 'coloring', 'index.html'), 'utf8');
    expect(coloringHub).toContain('/christmas-stocking-coloring-page/');
    const christmasHub = readFileSync(resolve(DIST, 'christmas-printables', 'index.html'), 'utf8');
    expect(christmasHub).toContain('/christmas-stocking-coloring-page/');
    const home = readFileSync(resolve(DIST, 'index.html'), 'utf8');
    expect(home).toContain('/christmas-stocking-coloring-page/');
  });
});
