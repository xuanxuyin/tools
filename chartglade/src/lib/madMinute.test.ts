import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateMadMinute, renderMadMinuteHtml, MAD_DEFAULTS, MAD_RANGES, type MadOp } from './madMinute';

/**
 * Mad-minute guards (#14): seeded-output anchoring (a teacher who printed
 * the SSR sheet last week must see the same problems after a redeploy),
 * arithmetic correctness for every generated problem under every option
 * combination, and the 30/60 layout contract the print CSS relies on.
 * The last block guards the real dist: the multiplication chart page must
 * carry the island mount AND a complete printable drill with JS off.
 */

describe('seeded output (the SSR default is content, not randomness)', () => {
  it('fixed seed reproduces the exact same sheet every run', () => {
    const a = generateMadMinute(MAD_DEFAULTS);
    const b = generateMadMinute(MAD_DEFAULTS);
    expect(a).toEqual(b);
    expect(a.length).toBe(30);
    // Anchored first three problems of the default sheet (seed 20261025).
    expect(a[0]).toEqual({ a: 2, b: 5, symbol: '×', answer: 10 });
    expect(a[1]).toEqual({ a: 9, b: 12, symbol: '×', answer: 108 });
    expect(a[2]).toEqual({ a: 9, b: 2, symbol: '×', answer: 18 });
    for (const p of a) {
      expect(p.answer).toBe(p.a * p.b);
    }
  });

  it('a different seed produces a different sheet', () => {
    const a = generateMadMinute(MAD_DEFAULTS);
    const b = generateMadMinute({ ...MAD_DEFAULTS, seed: 1 });
    expect(a).not.toEqual(b);
  });
});

describe('arithmetic and range constraints (every option combination)', () => {
  const ops: MadOp[] = ['addition', 'subtraction', 'multiplication', 'mixed'];

  it('every problem is arithmetically true and inside the chosen range', () => {
    for (const op of ops) {
      for (const [min, max] of MAD_RANGES[op]) {
        for (const count of [30, 60]) {
          const problems = generateMadMinute({ op, min, max, count, seed: 42 + count });
          expect(problems.length, `${op} ${min}-${max} x${count}`).toBe(count);
          for (const p of problems) {
            expect(Math.min(p.a, p.b)).toBeGreaterThanOrEqual(min);
            expect(Math.max(p.a, p.b)).toBeLessThanOrEqual(max);
            if (p.symbol === '+') {
              expect(p.answer).toBe(p.a + p.b);
              expect(op === 'mixed' || op === 'addition').toBe(true);
            } else if (p.symbol === '−') {
              // mad-minute convention: subtraction never goes negative
              expect(p.a).toBeGreaterThanOrEqual(p.b);
              expect(p.answer).toBe(p.a - p.b);
              expect(p.answer).toBeGreaterThanOrEqual(0);
            } else {
              // multiplication facts: operands stay >= 1
              expect(p.a).toBeGreaterThanOrEqual(1);
              expect(p.b).toBeGreaterThanOrEqual(1);
              expect(p.answer).toBe(p.a * p.b);
            }
          }
          if (op === 'mixed') {
            const symbols = new Set(problems.map((p) => p.symbol));
            expect(symbols.has('+')).toBe(true);
            expect(symbols.has('−')).toBe(true);
            expect(symbols.has('×')).toBe(true);
          }
        }
      }
    }
  });

  it('subtraction swaps operands instead of going negative', () => {
    const problems = generateMadMinute({ op: 'subtraction', min: 0, max: 20, count: 60, seed: 7 });
    expect(problems.every((p) => p.a >= p.b && p.answer === p.a - p.b)).toBe(true);
    // with 60 draws over 0-20, a swap must actually have happened
    expect(problems.some((p) => p.b > 0)).toBe(true);
  });
});

describe('rendered sheet contract (SSR string = island string)', () => {
  it('30-problem sheet: 30 blanks, 30 answered items, title, name line', () => {
    const html = renderMadMinuteHtml(MAD_DEFAULTS);
    expect(html).toContain('Mad Minute — Multiplication (facts to 12)');
    expect(html.match(/= ____/g)!.length).toBe(30);
    expect(html).toContain('Answer Key');
    expect(html.match(/<strong>\d+<\/strong>/g)!.length).toBe(30);
    expect(html).toContain('Name:');
    expect(html).toContain('Score: ____ / 30');
    expect(html).toContain('grid-template-columns:repeat(3,1fr)');
  });

  it('60-problem sheet switches to four columns', () => {
    const html = renderMadMinuteHtml({ ...MAD_DEFAULTS, count: 60 });
    expect(html.match(/= ____/g)!.length).toBe(60);
    expect(html.match(/<strong>\d+<\/strong>/g)!.length).toBe(60);
    expect(html).toContain('grid-template-columns:repeat(4,1fr)');
    expect(html).toContain('Score: ____ / 60');
  });

  it('operation titles match the selected range', () => {
    expect(renderMadMinuteHtml({ ...MAD_DEFAULTS, op: 'addition', min: 0, max: 20 })).toContain(
      'Mad Minute — Addition (numbers to 20)',
    );
    expect(renderMadMinuteHtml({ ...MAD_DEFAULTS, op: 'subtraction', min: 0, max: 10 })).toContain(
      'Mad Minute — Subtraction (numbers to 10)',
    );
    expect(renderMadMinuteHtml({ ...MAD_DEFAULTS, op: 'mixed', min: 1, max: 12 })).toContain(
      'Mad Minute — Mixed Practice (numbers to 12)',
    );
  });
});

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');

describe.skipIf(!existsSync(resolve(DIST, 'multiplication-chart', 'index.html')))(
  'no-JS printability (real dist)',
  () => {
    it('the mult chart page ships the island mount plus a complete default drill', () => {
      const html = readFileSync(resolve(DIST, 'multiplication-chart', 'index.html'), 'utf8');
      expect(html).toContain('id="mad-minute-sheet"');
      expect(html).toContain('Mad Minute — Multiplication (facts to 12)');
      // the SSR drill itself: 30 printable problems with blanks. The precise
      // span pattern skips the same template string inside the island script.
      expect(html.match(/<span class="mm-q">\d+ [+\-×] \d+ = ____<\/span>/g)!.length).toBe(30);
      expect((html.match(/<span class="mm-q">\d+ [+\-×] \d+ = <strong>\d+<\/strong><\/span>/g) ?? []).length).toBe(30);
      expect(html).toContain('Answer Key');
      // the island controls (operation / range / count / new sheet)
      expect(html).toContain('id="mad-op"');
      expect(html).toContain('id="mad-range"');
      expect(html).toContain('id="mad-count"');
      expect(html).toContain('id="mad-new"');
    });

    it('the drill section starts on its own printed page (inlined CSS carries the rule)', () => {
      const html = readFileSync(resolve(DIST, 'multiplication-chart', 'index.html'), 'utf8');
      // minified inline CSS drops the space
      expect(html).toMatch(/break-before:\s?page/);
    });
  },
);
