import { describe, expect, it } from 'vitest';
import { multiplicationPages } from './multiplication';
import { graphPaperPages } from './graphPaper';
import { loosePages } from './loose';
import { axisPositions, gridBox } from '../lib/graphPaper';

/**
 * Math-claim guards: the printable pages make numeric claims in their teaching
 * notes (fact counts, stroke counts, squares per sheet). Every claim a reader
 * can check is anchored here to the engine or to arithmetic — audited
 * 2026-10-12 after an external reviewer flagged math errors in the notes
 * (rossant/awesome-math PR #198; two real ones found and fixed).
 */
describe('teaching-note math claims (audited 2026-10-12)', () => {
  it('6 × 7 vs 6 × 8 is six apart (48 − 42), never "one less"', () => {
    const page = multiplicationPages.find((p) => p.slug === 'multiplication-chart')!;
    const tips = page.tips!.map((t) => t.body).join(' ');
    expect(tips).toContain('6 × 7 six less than 6 × 8');
    expect(tips).not.toContain('6 × 7 one less than 6 × 8');
  });

  it('isometric cube stroke count matches the described sequence (2 + 3 + 2)', () => {
    const page = graphPaperPages.find((p) => p.slug === 'isometric-graph-paper')!;
    const faq = page.faqs!.find((f) => f.q.startsWith('How do you draw a cube'))!;
    // two top diagonals + a vertical from each end and one from the point
    // between (3 verticals) + two bottom diagonals = 7 strokes.
    expect(faq.a).toContain('seven strokes total');
  });

  it('fact-count claims match unique-fact arithmetic C(n,2) + n', () => {
    const mult = JSON.stringify(multiplicationPages);
    const add = JSON.stringify(loosePages);
    for (const [n, unique, total] of [
      [12, 78, 144],
      [13, 91, 169],
      [20, 210, 400],
    ] as const) {
      expect((n * (n - 1)) / 2 + n).toBe(unique);
      expect(n * n).toBe(total);
    }
    expect(mult).toContain('144');
    expect(mult).toContain('210 unique');
    expect(add).toContain('169');
  });

  it('squares-per-sheet claims match the geometry engine', () => {
    const box = gridBox();
    const gaps = (spacingIn: number, axis: 'x' | 'y') =>
      axisPositions(
        spacingIn * 100,
        axis === 'x' ? box.x0 : box.y0,
        axis === 'x' ? box.x1 : box.y1,
      ).length - 1;
    // quarter-inch page copy: "29 columns by 39 rows"
    expect(gaps(0.25, 'x')).toBe(29);
    expect(gaps(0.25, 'y')).toBe(39);
    // half-inch: "14 columns by 19 rows"
    expect(gaps(0.5, 'x')).toBe(14);
    expect(gaps(0.5, 'y')).toBe(19);
    // one-cm: "18 columns by 25 rows"
    expect(gaps(0.393701, 'x')).toBe(18);
    expect(gaps(0.393701, 'y')).toBe(25);
    // dot grid copy counts lattice points (gaps + 1): "38 columns by 51 rows"
    expect(gaps(0.19685, 'x') + 1).toBe(38);
    expect(gaps(0.19685, 'y') + 1).toBe(51);
  });
});
