/**
 * Word-search puzzle engine (Halloween cluster). Pure functions, seeded RNG,
 * so the SSG build emits a stable puzzle every time and the vitest suite can
 * assert on exact output. Longest words go in first; letters may overlap when
 * they match (real crossword-style crossings); empty cells fill from the
 * puzzle's own letter pool so accidental near-misses look deliberate.
 */

/** [row step, col step] for one placement direction. */
export type Dir = readonly [number, number];

/** K-2: forwards only — right, down, down-right. */
export const DIRS_EASY: readonly Dir[] = [
  [0, 1],
  [1, 0],
  [1, 1],
] as const;

/** 3-5: all eight, including backwards and up. */
export const DIRS_HARD: readonly Dir[] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [0, -1],
  [-1, 0],
  [-1, 1],
  [1, -1],
  [-1, -1],
] as const;

export interface Placement {
  word: string;
  row: number;
  col: number;
  dir: Dir;
}

export interface Puzzle {
  rows: number;
  cols: number;
  grid: string[][];
  placements: Placement[];
}

/** mulberry32 — small, fast, seedable; good enough for worksheet layout. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function canPlace(grid: string[][], word: string, row: number, col: number, dir: Dir): boolean {
  const [dr, dc] = dir;
  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    const cell = grid[r]?.[c];
    if (cell === undefined) return false; // ran off the edge
    if (cell !== '' && cell !== word[i]) return false; // crossing letters must match
  }
  return true;
}

function place(grid: string[][], word: string, row: number, col: number, dir: Dir): void {
  const [dr, dc] = dir;
  for (let i = 0; i < word.length; i++) {
    grid[row + dr * i][col + dc * i] = word[i]!;
  }
}

export interface PuzzleOptions {
  rows: number;
  cols: number;
  seed: number;
  /** All eight directions (grade 3-5). Default: easy three directions. */
  hard?: boolean;
}

export function generateWordSearch(words: string[], opts: PuzzleOptions): Puzzle {
  const { rows, cols, seed, hard = false } = opts;
  const dirs = hard ? DIRS_HARD : DIRS_EASY;
  // Longest first is the classic heuristic: awkward long words get first pick.
  const ordered = [...words].sort((a, b) => b.length - a.length);
  const upper = ordered.map((w) => w.toUpperCase());

  for (let attempt = 0; attempt < 200; attempt++) {
    const rand = rng(seed + attempt * 1013);
    const grid: string[][] = Array.from({ length: rows }, () => Array<string>(cols).fill(''));
    const placements: Placement[] = [];
    let ok = true;

    for (const word of upper) {
      let done = false;
      // Give every word a bounded number of random (start, direction) tries;
      // crossings are allowed because canPlace only rejects mismatched letters.
      for (let tries = 0; tries < 300 && !done; tries++) {
        const row = Math.floor(rand() * rows);
        const col = Math.floor(rand() * cols);
        const dir = dirs[Math.floor(rand() * dirs.length)]!;
        if (canPlace(grid, word, row, col, dir)) {
          place(grid, word, row, col, dir);
          placements.push({ word, row, col, dir });
          done = true;
        }
      }
      if (!done) {
        ok = false;
        break;
      }
    }

    if (!ok) continue;

    // Fill blanks from the words' own letters: nearby look-alikes make the
    // search honest instead of obvious, without ever hiding a real word.
    const pool = upper.join('');
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r]![c] === '') {
          grid[r]![c] = pool[Math.floor(rand() * pool.length)]!;
        }
      }
    }
    return { rows, cols, grid, placements };
  }

  // Grid too small for the word list — caller bug, not a runtime situation.
  throw new Error(`word search did not converge for ${words.length} words in ${rows}x${cols}`);
}

/** All ways `word` appears in the grid along any of the eight directions. */
export function findWord(grid: string[][], word: string): Dir[] {
  const target = word.toUpperCase();
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const found: Dir[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const dir of DIRS_HARD) {
        const [dr, dc] = dir;
        let match = true;
        for (let i = 0; i < target.length; i++) {
          if (grid[r + dr * i]?.[c + dc * i] !== target[i]) {
            match = false;
            break;
          }
        }
        if (match) found.push(dir);
      }
    }
  }
  return found;
}
