import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CHRISTMAS_WORDS_EASY,
  CHRISTMAS_WORDS_HARD,
  SNOWMAN_MULTIPLICATION,
  TREE_ADDITION,
  christmasPages,
  usedKeys,
} from './christmas';
import { factsFor } from './halloween';
import { DIRS_EASY, findWord, generateWordSearch } from '../lib/wordSearch';

/**
 * Christmas cluster guards (11/29 batch). Data-level tests pin the word
 * lists, the seeded puzzles and the color-by-number art; dist-level tests
 * run after `npm run build` and pin the four new URLs, the hub mesh and the
 * printed legend/fact/frame output.
 */

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIST = resolve(ROOT, 'dist');

/** The exact specs christmas-word-search.astro renders — keep in sync. */
const EASY_SPEC = { rows: 12, cols: 12, seed: 20261225 } as const;
const HARD_SPEC = { rows: 13, cols: 13, seed: 20261226, hard: true } as const;

const easyPuzzle = generateWordSearch(CHRISTMAS_WORDS_EASY, { ...EASY_SPEC });
const hardPuzzle = generateWordSearch(CHRISTMAS_WORDS_HARD, { ...HARD_SPEC });

describe('christmas word lists', () => {
  it.each([
    ['easy', CHRISTMAS_WORDS_EASY],
    ['hard', CHRISTMAS_WORDS_HARD],
  ])('%s list holds 10-12 lowercase alpha words with no duplicates', (_, words) => {
    expect(words.length).toBeGreaterThanOrEqual(10);
    expect(words.length).toBeLessThanOrEqual(12);
    expect(new Set(words).size).toBe(words.length);
    for (const w of words) expect(w).toMatch(/^[a-z]+$/);
  });

  it('easy words fit a 12x12 forwards-only grid', () => {
    expect(Math.max(...CHRISTMAS_WORDS_EASY.map((w) => w.length))).toBeLessThanOrEqual(12);
  });

  it('hard words fit a 13x13 grid', () => {
    expect(Math.max(...CHRISTMAS_WORDS_HARD.map((w) => w.length))).toBeLessThanOrEqual(13);
  });

  it('no word is hidden inside another word of the same list', () => {
    for (const list of [CHRISTMAS_WORDS_EASY, CHRISTMAS_WORDS_HARD]) {
      for (const w of list) {
        for (const other of list) {
          if (w !== other) expect(other.includes(w), `${w} inside ${other}`).toBe(false);
        }
      }
    }
  });

  it('the two difficulty lists are disjoint', () => {
    const easy = new Set(CHRISTMAS_WORDS_EASY);
    for (const w of CHRISTMAS_WORDS_HARD) expect(easy.has(w)).toBe(false);
  });

  it('carries no trademarked character names (IP red line)', () => {
    const banned = [
      'grinch', 'frosty', 'rudolph', 'elf on the shelf', 'polar express', 'mickey',
      'snoopy', 'nutcracker', 'scrooge',
    ];
    const all = [...CHRISTMAS_WORDS_EASY, ...CHRISTMAS_WORDS_HARD].map((w) => w.toLowerCase());
    for (const b of banned) expect(all, `${b} must stay out`).not.toContain(b);
  });
});

describe('christmas word search (fixed seeds)', () => {
  it('every easy word is placed exactly once and findable, forwards only', () => {
    expect(easyPuzzle.placements.map((p) => p.word.toLowerCase()).sort()).toEqual(
      [...CHRISTMAS_WORDS_EASY].sort(),
    );
    for (const word of CHRISTMAS_WORDS_EASY) {
      expect(findWord(easyPuzzle.grid, word).length, `${word} findable`).toBeGreaterThan(0);
    }
    const easyDirs = new Set(DIRS_EASY.map((d) => d.join(',')));
    for (const p of easyPuzzle.placements) {
      expect(easyDirs.has(p.dir.join(',')), `${p.word} direction ${p.dir}`).toBe(true);
    }
  });

  it('every hard word is placed exactly once and findable (eight directions)', () => {
    expect(hardPuzzle.placements.map((p) => p.word.toLowerCase()).sort()).toEqual(
      [...CHRISTMAS_WORDS_HARD].sort(),
    );
    for (const word of CHRISTMAS_WORDS_HARD) {
      expect(findWord(hardPuzzle.grid, word).length, `${word} findable`).toBeGreaterThan(0);
    }
  });

  it('is deterministic for the shipped seeds (stable build output)', () => {
    expect(generateWordSearch(CHRISTMAS_WORDS_EASY, { ...EASY_SPEC })).toEqual(easyPuzzle);
    expect(generateWordSearch(CHRISTMAS_WORDS_HARD, { ...HARD_SPEC })).toEqual(hardPuzzle);
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

describe('christmas color-by-number art', () => {
  it.each([
    ['christmas tree (addition)', TREE_ADDITION],
    ['snowman (multiplication)', SNOWMAN_MULTIPLICATION],
  ])('%s: rectangular grid, every used key has palette + legend', (_, art) => {
    const width = art.cells[0]!.length;
    expect(art.cells.length).toBeGreaterThanOrEqual(11);
    for (const row of art.cells) {
      expect(row.length).toBe(width);
      for (const key of row) expect(key).toBe(Math.floor(key)); // pure number matrix
    }
    for (const key of usedKeys(art)) {
      expect(art.palette[key], `palette for key ${key}`).toBeDefined();
      expect(art.legend[key], `legend name for key ${key}`).toBeDefined();
    }
  });

  it('addition keys are sums from 2 to 12 with non-empty fact pools', () => {
    for (const key of usedKeys(TREE_ADDITION)) {
      expect(key).toBeGreaterThanOrEqual(2);
      expect(key).toBeLessThanOrEqual(12);
      expect(factsFor(key, 'add').length).toBeGreaterThan(0);
    }
  });

  it('multiplication keys are products to 12 with non-empty fact pools', () => {
    for (const key of usedKeys(SNOWMAN_MULTIPLICATION)) {
      expect(key).toBeLessThanOrEqual(12);
      expect(factsFor(key, 'mul').length).toBeGreaterThan(0);
    }
  });

  it('the (row*cols+col) rotation only ever emits facts that equal their key', () => {
    for (const [art, mode] of [
      [TREE_ADDITION, 'add'],
      [SNOWMAN_MULTIPLICATION, 'mul'],
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

  it('usedKeys filters legend colors the art never prints (tree declares gold 11)', () => {
    // The tree declares gold (11) in its legend but no cell paints it — the
    // printed legend must drop it, same guard as the halloween ghost purple.
    expect(usedKeys(TREE_ADDITION)).toEqual([4, 6, 9, 10, 12]);
    expect(Object.keys(TREE_ADDITION.legend)).toContain('11');
    expect(usedKeys(SNOWMAN_MULTIPLICATION)).toEqual([4, 6, 8, 12]);
  });
});

describe('christmas PageDefs', () => {
  const SLUGS = ['christmas-word-search', 'christmas-color-by-number', 'letter-to-santa'];

  it('defines exactly the three printable pages, all owned by the christmas hub', () => {
    expect(christmasPages.map((p) => p.slug).sort()).toEqual([...SLUGS].sort());
    for (const def of christmasPages) expect(def.hub).toBe('christmas');
  });

  it('every page carries target keywords in title and a <=160 char description', () => {
    expect(christmasPages[0]!.metaTitle).toContain('Christmas Word Search');
    expect(christmasPages[1]!.metaTitle).toContain('Christmas Color by Number');
    expect(christmasPages[2]!.metaTitle).toContain('Letter to Santa');
    for (const def of christmasPages) {
      expect(def.metaDescription.length).toBeLessThanOrEqual(160);
      expect(def.faqs.length).toBeGreaterThanOrEqual(4);
      expect(def.faqs.length).toBeLessThanOrEqual(7);
      expect(def.tips.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('every page links back to the hub and into the cluster (no orphan pages)', () => {
    for (const def of christmasPages) {
      const hrefs = def.related.map((r) => r.href);
      expect(hrefs, `${def.slug} hub link`).toContain('/christmas-printables/');
      expect(
        hrefs.filter((h) => h.startsWith('/christmas') || h === '/letter-to-santa/').length,
        `${def.slug} cluster links`,
      ).toBeGreaterThanOrEqual(2);
    }
  });
});

/* ------------------------------------------------------------------ */
/* Dist guards — run after `npm run build` (release order: build first) */
/* ------------------------------------------------------------------ */

const NEW_URLS = [
  'christmas-word-search',
  'christmas-color-by-number',
  'letter-to-santa',
  'christmas-printables',
];
const allBuilt = NEW_URLS.every((u) => existsSync(resolve(DIST, u, 'index.html')));

describe.skipIf(!allBuilt)('christmas dist guards (real dist)', () => {
  it('the sitemap carries all four new URLs', () => {
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
    const html = readFileSync(resolve(DIST, 'christmas-printables', 'index.html'), 'utf8');
    const hrefs = [...html.matchAll(/href="(\/[a-z-]+\/)"/g)].map((m) => m[1]!);
    for (const page of NEW_URLS.filter((u) => u !== 'christmas-printables')) {
      expect(hrefs, `hub → /${page}/`).toContain(`/${page}/`);
    }
    expect(hrefs).toContain('/halloween/'); // seasonal siblings stay linked
    expect(hrefs).toContain('/thanksgiving-printables/');
    for (const href of hrefs) {
      expect(existsSync(resolve(DIST, href.slice(1), 'index.html')), `${href} must be built`).toBe(true);
    }
  });

  it('the word search page prints both word lists in full', () => {
    const html = readFileSync(resolve(DIST, 'christmas-word-search', 'index.html'), 'utf8');
    expect(html).toContain('Easy Christmas Word Search');
    expect(html).toContain('Hard Christmas Word Search');
    for (const word of [...CHRISTMAS_WORDS_EASY, ...CHRISTMAS_WORDS_HARD]) {
      expect(html, `word list prints ${word}`).toContain(`<li>${word}</li>`);
    }
  });

  it('color by number legend shows exactly the used keys, and every printed fact answers to one', () => {
    const html = readFileSync(resolve(DIST, 'christmas-color-by-number', 'index.html'), 'utf8');
    const legendKeys = [...html.matchAll(/(?:sum|product) <strong>(\d+)<\/strong>/g)].map((m) =>
      Number(m[1]),
    );
    expect([...legendKeys].sort((a, b) => a - b)).toEqual(
      [...usedKeys(TREE_ADDITION), ...usedKeys(SNOWMAN_MULTIPLICATION)].sort((a, b) => a - b),
    );
    expect(legendKeys, 'declared-but-unused gold 11 must not print').not.toContain(11);

    const addKeys = new Set(usedKeys(TREE_ADDITION));
    const mulKeys = new Set(usedKeys(SNOWMAN_MULTIPLICATION));
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

  it('the letter to santa page prints its greeting, frames, signoff and drawing box', () => {
    const html = readFileSync(resolve(DIST, 'letter-to-santa', 'index.html'), 'utf8');
    expect(html).toContain('Dear Santa,');
    expect(html).toContain('For Christmas, I would like');
    expect(html).toContain('because');
    expect(html).toContain('This year I am proud that');
    expect(html).toContain('One question I have for you is');
    expect(html).toContain('Love,');
    expect(html).toContain('Draw something for Santa');
    // CSS is inlined into the page HTML, so count class attributes, not selectors
    expect(html.match(/class="santa-line/g)!.length).toBe(5); // 4 frame lines + signature
  });
});
