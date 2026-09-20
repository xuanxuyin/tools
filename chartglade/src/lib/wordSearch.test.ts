import { describe, expect, it } from 'vitest';
import {
  DIRS_EASY,
  DIRS_HARD,
  findWord,
  generateWordSearch,
} from './wordSearch';

const EASY_WORDS = ['bat', 'cat', 'hat', 'moon', 'ghost', 'candy', 'witch', 'spooky'];
const HARD_WORDS = ['pumpkin', 'october', 'costume', 'skeleton', 'spider', 'broom'];

describe('generateWordSearch', () => {
  it('places every word so it can be found in the grid', () => {
    const puzzle = generateWordSearch(EASY_WORDS, {
      rows: 12,
      cols: 12,
      seed: 7,
    });
    expect(puzzle.rows).toBe(12);
    expect(puzzle.cols).toBe(12);
    for (const word of EASY_WORDS) {
      expect(findWord(puzzle.grid, word).length, `word ${word} findable`).toBeGreaterThan(0);
    }
  });

  it('is deterministic for a given seed (stable SSR output)', () => {
    const a = generateWordSearch(EASY_WORDS, { rows: 12, cols: 12, seed: 42 });
    const b = generateWordSearch(EASY_WORDS, { rows: 12, cols: 12, seed: 42 });
    expect(a.grid).toEqual(b.grid);
    expect(a.placements).toEqual(b.placements);
  });

  it('different seeds give different filler (puzzles are not copies)', () => {
    const a = generateWordSearch(EASY_WORDS, { rows: 12, cols: 12, seed: 1 });
    const b = generateWordSearch(EASY_WORDS, { rows: 12, cols: 12, seed: 2 });
    expect(a.grid).not.toEqual(b.grid);
  });

  it('easy mode only uses right/down/diagonal directions', () => {
    const puzzle = generateWordSearch(EASY_WORDS, { rows: 12, cols: 12, seed: 3 });
    const easyKeys = new Set(DIRS_EASY.map((d) => d.join(',')));
    for (const p of puzzle.placements) {
      expect(easyKeys.has(p.dir.join(',')), `${p.word} direction ${p.dir}`).toBe(true);
    }
  });

  it('hard mode may use all eight directions', () => {
    const puzzle = generateWordSearch(HARD_WORDS, {
      rows: 13,
      cols: 13,
      seed: 5,
      hard: true,
    });
    const hardKeys = new Set(DIRS_HARD.map((d) => d.join(',')));
    for (const p of puzzle.placements) {
      expect(hardKeys.has(p.dir.join(','))).toBe(true);
    }
    for (const word of HARD_WORDS) {
      expect(findWord(puzzle.grid, word).length, `word ${word} findable`).toBeGreaterThan(0);
    }
  });

  it('fills every empty cell with a letter', () => {
    const puzzle = generateWordSearch(EASY_WORDS, { rows: 12, cols: 12, seed: 9 });
    for (const row of puzzle.grid) {
      for (const cell of row) {
        expect(cell).toMatch(/^[A-Z]$/);
      }
    }
  });
});

describe('findWord', () => {
  it('locates a word placed horizontally and reports the line', () => {
    const grid = [
      ['A', 'B', 'C'],
      ['D', 'E', 'F'],
      ['G', 'H', 'I'],
    ];
    expect(findWord(grid, 'ABC').length).toBe(1);
    expect(findWord(grid, 'ZZZ').length).toBe(0);
  });
});
