import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ACORN_MULTIPLICATION,
  MAPLE_LEAF_ADDITION,
  PIE_MULTIPLICATION,
  PLACEMAT_SCRAMBLES,
  PUMPKIN_ADDITION_TG,
  THANKSGIVING_WORDS_EASY,
  THANKSGIVING_WORDS_HARD,
  TURKEY_ADDITION,
  thanksgivingPages,
  usedKeys,
} from './thanksgiving';
import type { PaintArt } from './halloween';
import { factsFor, GHOST_MULTIPLICATION } from './halloween';
import { DIRS_EASY, findWord, generateWordSearch } from '../lib/wordSearch';

// The five CBN editions on the page (2026-10-29 expansion) — the dist guard
// derives its expectations from these instead of a hand-typed key list.
const ADD_ARTS: PaintArt[] = [TURKEY_ADDITION, PUMPKIN_ADDITION_TG, MAPLE_LEAF_ADDITION];
const MUL_ARTS: PaintArt[] = [PIE_MULTIPLICATION, ACORN_MULTIPLICATION];

/**
 * Thanksgiving cluster guards (10/25 batch, PLAN §3 #19). Data-level tests
 * pin the word lists, the seeded puzzles, the color-by-number art and the
 * placemat scrambles; dist-level tests run after `npm run build` and pin the
 * five new URLs, the hub mesh and the printed legend/fact output.
 */

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');

/** The exact specs thanksgiving-word-search.astro renders — keep in sync. */
const EASY_SPEC = { rows: 12, cols: 12, seed: 20261126 } as const;
const HARD_SPEC = { rows: 13, cols: 13, seed: 20261127, hard: true } as const;

const easyPuzzle = generateWordSearch(THANKSGIVING_WORDS_EASY, { ...EASY_SPEC });
const hardPuzzle = generateWordSearch(THANKSGIVING_WORDS_HARD, { ...HARD_SPEC });

describe('thanksgiving word lists', () => {
  it.each([
    ['easy', THANKSGIVING_WORDS_EASY],
    ['hard', THANKSGIVING_WORDS_HARD],
  ])('%s list holds 10-12 lowercase alpha words with no duplicates', (_, words) => {
    expect(words.length).toBeGreaterThanOrEqual(10);
    expect(words.length).toBeLessThanOrEqual(12);
    expect(new Set(words).size).toBe(words.length);
    for (const w of words) expect(w).toMatch(/^[a-z]+$/);
  });

  it('easy words fit a 12x12 forwards-only grid', () => {
    expect(Math.max(...THANKSGIVING_WORDS_EASY.map((w) => w.length))).toBeLessThanOrEqual(12);
  });

  it('hard words fit a 13x13 grid', () => {
    expect(Math.max(...THANKSGIVING_WORDS_HARD.map((w) => w.length))).toBeLessThanOrEqual(13);
  });

  it('no word is hidden inside another word of the same list', () => {
    for (const list of [THANKSGIVING_WORDS_EASY, THANKSGIVING_WORDS_HARD]) {
      for (const w of list) {
        for (const other of list) {
          if (w !== other) expect(other.includes(w), `${w} inside ${other}`).toBe(false);
        }
      }
    }
  });

  it('the two difficulty lists are disjoint', () => {
    const easy = new Set(THANKSGIVING_WORDS_EASY);
    for (const w of THANKSGIVING_WORDS_HARD) expect(easy.has(w)).toBe(false);
  });
});

describe('thanksgiving word search (fixed seeds)', () => {
  it('every easy word is placed exactly once and findable, forwards only', () => {
    expect(easyPuzzle.placements.map((p) => p.word.toLowerCase()).sort()).toEqual(
      [...THANKSGIVING_WORDS_EASY].sort(),
    );
    for (const word of THANKSGIVING_WORDS_EASY) {
      expect(findWord(easyPuzzle.grid, word).length, `${word} findable`).toBeGreaterThan(0);
    }
    const easyDirs = new Set(DIRS_EASY.map((d) => d.join(',')));
    for (const p of easyPuzzle.placements) {
      expect(easyDirs.has(p.dir.join(',')), `${p.word} direction ${p.dir}`).toBe(true);
    }
  });

  it('every hard word is placed exactly once and findable (eight directions)', () => {
    expect(hardPuzzle.placements.map((p) => p.word.toLowerCase()).sort()).toEqual(
      [...THANKSGIVING_WORDS_HARD].sort(),
    );
    for (const word of THANKSGIVING_WORDS_HARD) {
      expect(findWord(hardPuzzle.grid, word).length, `${word} findable`).toBeGreaterThan(0);
    }
  });

  it('is deterministic for the shipped seeds (stable build output)', () => {
    expect(generateWordSearch(THANKSGIVING_WORDS_EASY, { ...EASY_SPEC })).toEqual(easyPuzzle);
    expect(generateWordSearch(THANKSGIVING_WORDS_HARD, { ...HARD_SPEC })).toEqual(hardPuzzle);
  });

  it('grids are fully letter-filled at the advertised sizes', () => {
    for (const puzzle of [easyPuzzle, hardPuzzle]) {
      for (const row of puzzle.grid) {
        expect(row.length).toBe(puzzle.cols);
        for (const cell of row) expect(cell).toMatch(/^[A-Z]$/);
      }
      expect(puzzle.grid.length).toBe(puzzle.rows);
    }
  });
});

describe('thanksgiving color-by-number art', () => {
  it.each([
    ['turkey (addition)', TURKEY_ADDITION],
    ['pumpkin pie (multiplication)', PIE_MULTIPLICATION],
  ])('%s: rectangular grid, every used key has palette + legend', (_, art) => {
    const width = art.cells[0]!.length;
    expect(art.cells.length).toBeGreaterThanOrEqual(11);
    for (const row of art.cells) expect(row.length).toBe(width);
    for (const key of usedKeys(art)) {
      expect(art.palette[key], `palette for key ${key}`).toBeDefined();
      expect(art.legend[key], `legend name for key ${key}`).toBeDefined();
    }
  });

  it('addition keys are sums from 2 to 12 with non-empty fact pools', () => {
    for (const key of usedKeys(TURKEY_ADDITION)) {
      expect(key).toBeGreaterThanOrEqual(2);
      expect(key).toBeLessThanOrEqual(12);
      expect(factsFor(key, 'add').length).toBeGreaterThan(0);
    }
  });

  it('multiplication keys are products to 12 with non-empty fact pools', () => {
    for (const key of usedKeys(PIE_MULTIPLICATION)) {
      expect(key).toBeLessThanOrEqual(12);
      expect(factsFor(key, 'mul').length).toBeGreaterThan(0);
    }
  });

  it('the (row*cols+col) rotation only ever emits facts that equal their key', () => {
    for (const [art, mode] of [
      [TURKEY_ADDITION, 'add'],
      [PIE_MULTIPLICATION, 'mul'],
    ] as const) {
      const cols = art.cells[0]!.length;
      art.cells.forEach((row, r) => {
        row.forEach((key, c) => {
          if (key === 0) return;
          const pool = factsFor(key, mode);
          expect(pool.length, `pool for key ${key} must not be empty`).toBeGreaterThan(0);
          const fact = pool[(r * cols + c) % pool.length]!;
          expect(mode === 'add' ? fact.a + fact.b : fact.a * fact.b).toBe(key);
        });
      });
    }
  });

  it('usedKeys filters legend colors the art never prints (halloween ghost regression)', () => {
    // Ghost declares purple (12) but no cell uses it — the legend must drop it.
    expect(usedKeys(GHOST_MULTIPLICATION)).toEqual([6, 10]);
    expect(Object.keys(GHOST_MULTIPLICATION.legend)).toContain('12');
  });
});

describe('placemat word scramble', () => {
  it('holds 4-6 words, each a true permutation that never equals its answer', () => {
    expect(PLACEMAT_SCRAMBLES.length).toBeGreaterThanOrEqual(4);
    expect(PLACEMAT_SCRAMBLES.length).toBeLessThanOrEqual(6);
    for (const { word, scrambled } of PLACEMAT_SCRAMBLES) {
      expect(word).toMatch(/^[a-z]+$/);
      expect(scrambled).not.toBe(word);
      expect([...scrambled].sort().join(''), `${scrambled} perm of ${word}`).toBe(
        [...word].sort().join(''),
      );
    }
  });

  it('scramble words come from the thanksgiving vocabulary', () => {
    const vocab = new Set([...THANKSGIVING_WORDS_EASY, ...THANKSGIVING_WORDS_HARD]);
    for (const { word } of PLACEMAT_SCRAMBLES) expect(vocab.has(word)).toBe(true);
  });
});

describe('thanksgiving PageDefs', () => {
  const SLUGS = [
    'thanksgiving-word-search',
    'thanksgiving-color-by-number',
    'i-am-thankful-for-worksheet',
    'thanksgiving-placemat-printable',
  ];

  it('defines exactly the four printable pages, all owned by the thanksgiving hub', () => {
    expect(thanksgivingPages.map((p) => p.slug).sort()).toEqual([...SLUGS].sort());
    for (const def of thanksgivingPages) expect(def.hub).toBe('thanksgiving');
  });

  it('every page carries target keywords in title and a <=160 char description', () => {
    expect(thanksgivingPages[0]!.metaTitle).toContain('Thanksgiving Word Search');
    expect(thanksgivingPages[1]!.metaTitle).toContain('Thanksgiving Color by Number');
    expect(thanksgivingPages[2]!.metaTitle).toContain('I Am Thankful For Worksheet');
    expect(thanksgivingPages[3]!.metaTitle).toContain('Thanksgiving Placemat');
    for (const def of thanksgivingPages) {
      expect(def.metaDescription.length).toBeLessThanOrEqual(160);
      expect(def.faqs.length).toBeGreaterThanOrEqual(4);
      expect(def.faqs.length).toBeLessThanOrEqual(7);
      expect(def.tips.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every page links back to the hub and into the cluster (no orphan pages)', () => {
    for (const def of thanksgivingPages) {
      const hrefs = def.related.map((r) => r.href);
      expect(hrefs, `${def.slug} hub link`).toContain('/thanksgiving-printables/');
      expect(hrefs.filter((h) => h.startsWith('/thanksgiving') || h === '/i-am-thankful-for-worksheet/').length,
        `${def.slug} cluster links`).toBeGreaterThanOrEqual(2);
    }
  });
});

/* ------------------------------------------------------------------ */
/* Dist guards — run after `npm run build` (release order: build first) */
/* ------------------------------------------------------------------ */

const NEW_URLS = [
  'thanksgiving-word-search',
  'thanksgiving-color-by-number',
  'i-am-thankful-for-worksheet',
  'thanksgiving-placemat-printable',
  'thanksgiving-printables',
];
const allBuilt = NEW_URLS.every((u) => existsSync(resolve(DIST, u, 'index.html')));

describe.skipIf(!allBuilt)('thanksgiving dist guards (real dist)', () => {
  it('the sitemap carries all five new URLs', () => {
    const xml = readFileSync(resolve(DIST, 'sitemap-0.xml'), 'utf8');
    for (const u of NEW_URLS) {
      expect(xml, `${u} in sitemap`).toContain(`<loc>https://chartglade.com/${u}/</loc>`);
    }
  });

  it('each new page self-canonicalizes', () => {
    for (const u of NEW_URLS) {
      const html = readFileSync(resolve(DIST, u, 'index.html'), 'utf8');
      expect(html, `${u} canonical`).toContain(`rel="canonical" href="https://chartglade.com/${u}/"`);
    }
  });

  it('the hub links every cluster page and only to built pages', () => {
    const html = readFileSync(resolve(DIST, 'thanksgiving-printables', 'index.html'), 'utf8');
    const hrefs = [...html.matchAll(/href="(\/[a-z-]+\/)"/g)].map((m) => m[1]!);
    for (const page of NEW_URLS.filter((u) => u !== 'thanksgiving-printables')) {
      expect(hrefs, `hub → /${page}/`).toContain(`/${page}/`);
    }
    expect(hrefs).toContain('/halloween/'); // seasonal siblings stay linked
    for (const href of hrefs) {
      expect(existsSync(resolve(DIST, href.slice(1), 'index.html')), `${href} must be built`).toBe(true);
    }
  });

  it('the word search page prints both word lists in full', () => {
    const html = readFileSync(resolve(DIST, 'thanksgiving-word-search', 'index.html'), 'utf8');
    expect(html).toContain('Easy Thanksgiving Word Search');
    expect(html).toContain('Hard Thanksgiving Word Search');
    for (const word of [...THANKSGIVING_WORDS_EASY, ...THANKSGIVING_WORDS_HARD]) {
      expect(html, `word list prints ${word}`).toContain(`<li>${word}</li>`);
    }
  });

  it('color by number legend shows exactly the used keys, and every printed fact answers to one', () => {
    const html = readFileSync(resolve(DIST, 'thanksgiving-color-by-number', 'index.html'), 'utf8');
    const legendKeys = [...html.matchAll(/(?:sum|product) <strong>(\d+)<\/strong>/g)].map((m) =>
      Number(m[1]),
    );
    expect([...legendKeys].sort((a, b) => a - b)).toEqual(
      [...ADD_ARTS, ...MUL_ARTS].flatMap((art) => usedKeys(art)).sort((a, b) => a - b),
    );

    const addKeys = new Set(ADD_ARTS.flatMap((art) => usedKeys(art)));
    const mulKeys = new Set(MUL_ARTS.flatMap((art) => usedKeys(art)));
    const facts = [...html.matchAll(/class="cbn-fact">(\d+)([+×])(\d+)</g)];
    expect(facts.length).toBeGreaterThan(80);
    for (const [, a, op, b] of facts) {
      const x = Number(a);
      const y = Number(b);
      const answer = op === '+' ? x + y : x * y;
      expect(answer).toBeLessThanOrEqual(12);
      expect(op === '+' ? addKeys : mulKeys).toContain(answer);
    }
  });

  it('the thankful worksheet prints its starter, four frames and the draw-it box', () => {
    const html = readFileSync(resolve(DIST, 'i-am-thankful-for-worksheet', 'index.html'), 'utf8');
    expect(html).toContain('Trace your starter');
    expect(html).toContain('I am thankful for my family because they read with me every night.');
    expect(html).toContain('Draw a picture of one thing you are thankful for');
    expect(html.match(/class="tf-frame"/g)!.length).toBe(4); // four numbered sentence frames
    expect(html.match(/class="tf-cue">because</g)!.length).toBe(4); // every frame keeps its because half
  });

  it('the placemat prints all scrambles, boards and the answer key', () => {
    const html = readFileSync(resolve(DIST, 'thanksgiving-placemat-printable', 'index.html'), 'utf8');
    for (const { word, scrambled } of PLACEMAT_SCRAMBLES) {
      expect(html).toContain(`>${scrambled}<`);
      expect(html).toContain(word);
    }
    // CSS is inlined into the page HTML, so count class attributes, not selectors
    expect(html.match(/class="pm-ttt-cell"/g)!.length).toBe(18); // two 3x3 boards
    expect(html).toContain('Draw your Thanksgiving feast');
    expect(html).toContain('Answers:');
  });
});
