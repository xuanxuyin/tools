import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HOW_TO_STEPS, howToCursivePage, type HowToDrill } from './howToCursive';

/**
 * How-to-write-in-cursive guards (Nov pre-dev wave 1): data-level tests pin
 * the six classroom-ordered steps, the four basic strokes, the full 26-letter
 * coverage of the family drills and the real learner FAQs; dist-level tests
 * (after `npm run build`) pin the URL, the 26 letter-page links and the
 * printed stroke drills.
 */

type LettersDrill = Extract<HowToDrill, { kind: 'letters' }>;
type JoinsDrill = Extract<HowToDrill, { kind: 'joins' }>;
type WordsDrill = Extract<HowToDrill, { kind: 'words' }>;

describe('how-to-write-in-cursive PageDef', () => {
  it('is the cursive hub front door with the target keyword in title and h1', () => {
    expect(howToCursivePage.slug).toBe('how-to-write-in-cursive');
    expect(howToCursivePage.hub).toBe('cursive');
    expect(howToCursivePage.h1).toBe('How to Write in Cursive');
    expect(howToCursivePage.metaTitle).toContain('How to Write in Cursive');
  });

  it('carries full anti-thin-content depth', () => {
    expect(howToCursivePage.metaDescription.length).toBeLessThanOrEqual(160);
    expect(howToCursivePage.intro.length).toBeGreaterThanOrEqual(3);
    for (const p of howToCursivePage.intro) expect(p.length).toBeGreaterThan(200);
    expect(howToCursivePage.extraSection!.paras.length).toBeGreaterThanOrEqual(2);
    expect(howToCursivePage.tips.length).toBeGreaterThanOrEqual(4);
    expect(howToCursivePage.faqs.length).toBeGreaterThanOrEqual(6);
  });

  it('answers the real learner questions (how long / left-handed / adults)', () => {
    const qs = howToCursivePage.faqs.map((f) => f.q.toLowerCase()).join(' ');
    expect(qs).toContain('how long');
    expect(qs).toContain('left-handed');
    expect(qs).toContain('adult');
  });

  it('links the cluster: sentences pair, chart, hub (no orphan page)', () => {
    const hrefs = howToCursivePage.related.map((r) => r.href);
    expect(hrefs).toContain('/cursive-sentences/');
    expect(hrefs).toContain('/cursive-alphabet/');
    expect(hrefs).toContain('/cursive/');
  });
});

describe('the six-step lesson structure', () => {
  it('is exactly six steps, numbered 1-6, in the classroom order', () => {
    expect(HOW_TO_STEPS.length).toBe(6);
    expect(HOW_TO_STEPS.map((s) => s.n)).toEqual([1, 2, 3, 4, 5, 6]);
    const titles = HOW_TO_STEPS.map((s) => s.title.toLowerCase()).join(' ');
    for (const stage of ['sit tall', 'basic strokes', 'lowercase', 'joining', 'words', 'sentences']) {
      expect(titles, `step covering "${stage}"`).toContain(stage);
    }
  });

  it('gives every step real teaching points (anti-thin-content)', () => {
    for (const step of HOW_TO_STEPS) {
      expect(step.points.length).toBeGreaterThanOrEqual(2);
      for (const p of step.points) expect(p.length).toBeGreaterThan(30);
    }
  });

  it('drills exactly the four basic strokes', () => {
    const strokes = HOW_TO_STEPS[1]!.drills!
      .filter((d): d is Extract<HowToDrill, { kind: 'strokes' }> => d.kind === 'strokes')
      .map((d) => d.stroke);
    expect(strokes.sort()).toEqual(['downcurve', 'overcurve', 'slant', 'undercurve']);
  });

  it('letter-family drills cover all 26 lowercase letters exactly once each', () => {
    const families = HOW_TO_STEPS[2]!.drills!.filter(
      (d): d is LettersDrill => d.kind === 'letters',
    );
    // family rows repeat their letters (cadgqcadgq); the unique set must be all 26
    const letters = [...new Set(families.flatMap((d) => [...d.letters]))];
    expect(letters.sort().join('')).toBe('abcdefghijklmnopqrstuvwxyz');
  });

  it('match the chart page stroke families (cadgq / ituvw / lhbkf / nmvxyz)', () => {
    const families = HOW_TO_STEPS[2]!.drills!.filter(
      (d): d is LettersDrill => d.kind === 'letters',
    );
    expect([...new Set([...families[0]!.letters])].join('')).toBe('cadgq');
    expect([...new Set([...families[1]!.letters])].join('')).toBe('ituvw');
    expect([...new Set([...families[2]!.letters])].join('')).toBe('lhbkf');
    expect([...new Set([...families[3]!.letters])].join('')).toBe('nmvxyz');
  });

  it('join and word drills are lowercase-first practice material', () => {
    const joins = HOW_TO_STEPS[3]!.drills!.filter((d): d is JoinsDrill => d.kind === 'joins');
    for (const row of joins) {
      expect(row.joins.length).toBeGreaterThanOrEqual(4);
      for (const j of row.joins) expect(j).toMatch(/^[a-z]{2}$/);
    }
    const words = HOW_TO_STEPS[4]!.drills!.filter((d): d is WordsDrill => d.kind === 'words');
    for (const row of words) {
      expect(row.words.length).toBeGreaterThanOrEqual(4);
      for (const w of row.words) expect(w).toMatch(/^[A-Za-z]{2,6}$/);
    }
  });
});

/* ---------------- dist guards (run after `npm run build`) ---------------- */

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');
const built = existsSync(resolve(DIST, 'how-to-write-in-cursive', 'index.html'));

describe.skipIf(!built)('how-to-write-in-cursive dist guards (real dist)', () => {
  it('is in the sitemap with a trailing slash and self-canonicalizes', () => {
    const xml = readFileSync(resolve(DIST, 'sitemap-0.xml'), 'utf8');
    expect(xml).toContain('<loc>https://chartglade.com/how-to-write-in-cursive/</loc>');
    const html = readFileSync(resolve(DIST, 'how-to-write-in-cursive', 'index.html'), 'utf8');
    expect(html).toContain('rel="canonical" href="https://chartglade.com/how-to-write-in-cursive/"');
  });

  it('links all 26 letter pages (the A-to-Z strip)', () => {
    const html = readFileSync(resolve(DIST, 'how-to-write-in-cursive', 'index.html'), 'utf8');
    for (const l of 'abcdefghijklmnopqrstuvwxyz') {
      expect(html, `letter link /cursive/${l}/`).toContain(`href="/cursive/${l}/"`);
    }
  });

  it('prints the four stroke drills, the six steps and the two-page split', () => {
    const html = readFileSync(resolve(DIST, 'how-to-write-in-cursive', 'index.html'), 'utf8');
    expect(html.match(/class="ht-stroke-cell"/g)!.length).toBe(24); // 4 strokes x 6 cells
    for (let n = 1; n <= 6; n++) {
      expect(html).toContain(`Step ${n} —`);
    }
    expect(html).toContain('sheet-break');
  });

  it('ships FAQPage + BreadcrumbList JSON-LD', () => {
    const html = readFileSync(resolve(DIST, 'how-to-write-in-cursive', 'index.html'), 'utf8');
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
  });
});
