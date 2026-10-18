import { describe, expect, it } from 'vitest';
import { GEOMETRY_SECTIONS, ALGEBRA_SECTIONS, type FormulaSection } from '../lib/formulas';

/**
 * Formula-sheet guards (V1.7). The site has been bitten by wrong math in
 * print (awesome-math PR #198), and formula pages are pure math claims, so
 * this pins three things:
 *   1. structure — the sheet carries the full expected inventory per section;
 *   2. formulas  — the exact formula strings can't silently change or drop;
 *   3. examples — every worked example is re-derived here with independent
 *      arithmetic (computed, then checked that the printed example string
 *      contains the result). Nothing below trusts the data file's own math.
 */

function findRow(sections: FormulaSection[], id: string, name: string, measure: string) {
  const row = sections
    .find((s) => s.id === id)!
    .rows.find((r) => r.name === name && r.measure === measure)!;
  return row;
}

const allFormulas = (sections: FormulaSection[]) => sections.flatMap((s) => s.rows.map((r) => r.formula));

describe('formula sheet structure', () => {
  it('geometry: 2-D (9) + 3-D (7) + Pythagorean (2) = 18 formulas', () => {
    expect(GEOMETRY_SECTIONS.find((s) => s.id === 'geo-2d')!.rows.length).toBe(9);
    expect(GEOMETRY_SECTIONS.find((s) => s.id === 'geo-3d')!.rows.length).toBe(7);
    expect(GEOMETRY_SECTIONS.find((s) => s.id === 'geo-pythag')!.rows.length).toBe(2);
    expect(GEOMETRY_SECTIONS.reduce((n, s) => n + s.rows.length, 0)).toBe(18);
  });

  it('algebra: lines (3) + quadratics (2) + coordinate (2) + exponents (6) + factoring (4) = 17', () => {
    expect(ALGEBRA_SECTIONS.find((s) => s.id === 'alg-lines')!.rows.length).toBe(3);
    expect(ALGEBRA_SECTIONS.find((s) => s.id === 'alg-quadratics')!.rows.length).toBe(2);
    expect(ALGEBRA_SECTIONS.find((s) => s.id === 'alg-coordinate')!.rows.length).toBe(2);
    expect(ALGEBRA_SECTIONS.find((s) => s.id === 'alg-exponents')!.rows.length).toBe(6);
    expect(ALGEBRA_SECTIONS.find((s) => s.id === 'alg-factoring')!.rows.length).toBe(4);
    expect(ALGEBRA_SECTIONS.reduce((n, s) => n + s.rows.length, 0)).toBe(17);
  });

  it('every row has a formula and a worked example with at least one digit', () => {
    for (const row of [...GEOMETRY_SECTIONS, ...ALGEBRA_SECTIONS].flatMap((s) => s.rows)) {
      expect(row.formula.length).toBeGreaterThan(3);
      expect(row.example, `${row.name} (${row.measure})`).toMatch(/\d/);
    }
  });
});

describe('geometry formula strings (anchored)', () => {
  it('carries every 2-D formula', () => {
    for (const f of [
      'P = 2(l + w)',
      'A = lw',
      'P = 4s',
      'A = s²',
      'A = ½bh',
      'A = bh',
      'A = ½(b₁ + b₂)h',
      'C = 2πr',
      'A = πr²',
    ]) {
      expect(allFormulas(GEOMETRY_SECTIONS)).toContain(f);
    }
  });

  it('carries every 3-D and triangle formula', () => {
    for (const f of [
      'V = lwh',
      'SA = 2(lw + lh + wh)',
      'V = πr²h',
      'SA = 2πr² + 2πrh',
      'V = ⅓πr²h',
      'V = (4/3)πr³',
      'SA = 4πr²',
      'a² + b² = c²',
      'a² = c² − b²',
    ]) {
      expect(allFormulas(GEOMETRY_SECTIONS)).toContain(f);
    }
  });
});

describe('algebra formula strings (anchored)', () => {
  it('carries line, quadratic and coordinate formulas', () => {
    for (const f of [
      'm = (y₂ − y₁)/(x₂ − x₁)',
      'y = mx + b',
      'y − y₁ = m(x − x₁)',
      'x = (−b ± √(b² − 4ac))/(2a)',
      'D = b² − 4ac',
      'd = √((x₂ − x₁)² + (y₂ − y₁)²)',
      'M = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
    ]) {
      expect(allFormulas(ALGEBRA_SECTIONS)).toContain(f);
    }
  });

  it('carries the six exponent laws and four binomial patterns', () => {
    for (const f of [
      'xᵃ · xᵇ = xᵃ⁺ᵇ',
      'xᵃ / xᵇ = xᵃ⁻ᵇ',
      '(xᵃ)ᵇ = xᵃᵇ',
      '(xy)ᵃ = xᵃyᵃ',
      'x⁰ = 1 (x ≠ 0)',
      'x⁻ⁿ = 1/xⁿ',
      '(a + b)(c + d) = ac + ad + bc + bd',
      '(a + b)² = a² + 2ab + b²',
      '(a − b)² = a² − 2ab + b²',
      'a² − b² = (a + b)(a − b)',
    ]) {
      expect(allFormulas(ALGEBRA_SECTIONS)).toContain(f);
    }
  });
});

describe('geometry worked examples (independent arithmetic)', () => {
  const geo = (name: string, measure: string) => {
    const section = GEOMETRY_SECTIONS.find((s) =>
      s.rows.some((r) => r.name === name && r.measure === measure),
    )!;
    return section.rows.find((r) => r.name === name && r.measure === measure)!;
  };

  it('2-D perimeter and area', () => {
    expect(2 * (5 + 3)).toBe(16);
    expect(geo('Rectangle', 'Perimeter').example).toContain('16 ft');
    expect(4 * 3).toBe(12);
    expect(geo('Rectangle', 'Area').example).toContain('12 sq ft');
    expect(4 * 6).toBe(24);
    expect(geo('Square', 'Perimeter').example).toContain('24 in');
    expect(6 ** 2).toBe(36);
    expect(geo('Square', 'Area').example).toContain('36 sq in');
    expect(0.5 * 10 * 4).toBe(20);
    expect(geo('Triangle', 'Area').example).toContain('20 sq cm');
    expect(8 * 5).toBe(40);
    expect(geo('Parallelogram', 'Area').example).toContain('40 sq cm');
    expect(0.5 * (6 + 10) * 4).toBe(32);
    expect(geo('Trapezoid', 'Area').example).toContain('32 sq in');
  });

  it('circle examples use π correctly (2-decimal rounding)', () => {
    expect((2 * Math.PI * 3).toFixed(2)).toBe('18.85');
    expect(geo('Circle', 'Circumference').example).toContain('18.85 in');
    expect((Math.PI * 3 ** 2).toFixed(2)).toBe('28.27');
    expect(geo('Circle', 'Area').example).toContain('28.27 sq in');
  });

  it('3-D volume and surface area', () => {
    expect(5 * 3 * 2).toBe(30);
    expect(geo('Rectangular prism', 'Volume').example).toContain('30 cu in');
    expect(2 * (5 * 3 + 5 * 2 + 3 * 2)).toBe(62);
    expect(geo('Rectangular prism', 'Surface area').example).toContain('62 sq in');
    expect((Math.PI * 2 ** 2 * 5).toFixed(2)).toBe('62.83');
    expect(geo('Cylinder', 'Volume').example).toContain('62.83 cu in');
    expect((2 * Math.PI * 2 ** 2 + 2 * Math.PI * 2 * 5).toFixed(2)).toBe('87.96');
    expect(geo('Cylinder', 'Surface area').example).toContain('87.96 sq in');
    expect(((1 / 3) * Math.PI * 3 ** 2 * 6).toFixed(2)).toBe('56.55');
    expect(geo('Cone', 'Volume').example).toContain('56.55 cu in');
    expect(((4 / 3) * Math.PI * 3 ** 3).toFixed(2)).toBe('113.10');
    expect(geo('Sphere', 'Volume').example).toContain('113.10 cu in');
    expect((4 * Math.PI * 2 ** 2).toFixed(2)).toBe('50.27');
    expect(geo('Sphere', 'Surface area').example).toContain('50.27 sq in');
  });

  it('Pythagorean theorem both directions', () => {
    expect(3 ** 2 + 4 ** 2).toBe(5 ** 2); // 9 + 16 = 25
    expect(Math.sqrt(3 ** 2 + 4 ** 2)).toBe(5);
    expect(findRow(GEOMETRY_SECTIONS, 'geo-pythag', 'Right triangle', 'Hypotenuse').example).toContain('c = 5');
    expect(13 ** 2 - 5 ** 2).toBe(144); // 169 − 25
    expect(Math.sqrt(144)).toBe(12);
    expect(findRow(GEOMETRY_SECTIONS, 'geo-pythag', 'Right triangle', 'Missing leg').example).toContain('a = 12');
  });
});

describe('algebra worked examples (independent arithmetic)', () => {
  it('slope and line forms all describe the same example line y = 2x + 1', () => {
    expect((5 - 1) / (2 - 0)).toBe(2); // slope through (0,1) and (2,5)
    expect(findRow(ALGEBRA_SECTIONS, 'alg-lines', 'Slope', 'Through two points').example).toContain('= 2');
    expect(2 * 4 + 1).toBe(9); // y = 2x + 1 at x = 4
    expect(findRow(ALGEBRA_SECTIONS, 'alg-lines', 'Slope-intercept form', 'Equation of a line').example).toContain('y = 9');
    // y − 7 = 2(x − 3) simplifies to y = 2x + 1 because 2·3 = 7 − 1
    expect(2 * 3).toBe(7 - 1);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-lines', 'Point-slope form', 'Through a point with slope m').example).toContain('y = 2x + 1');
  });

  it('quadratic formula example: x² − 5x + 6 = 0 really has roots 2 and 3', () => {
    const [a, b, c] = [1, -5, 6];
    const disc = b * b - 4 * a * c;
    expect(disc).toBe(1); // 25 − 24
    expect((-b + Math.sqrt(disc)) / (2 * a)).toBe(3);
    expect((-b - Math.sqrt(disc)) / (2 * a)).toBe(2);
    // both roots satisfy the equation
    expect(3 * 3 - 5 * 3 + 6).toBe(0);
    expect(2 * 2 - 5 * 2 + 6).toBe(0);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-quadratics', 'Quadratic formula', 'Roots of ax² + bx + c = 0').example).toContain('x = 2 or x = 3');
  });

  it('discriminant example: x² − 4x + 4 has D = 0 and root x = 2', () => {
    const [a, b, c] = [1, -4, 4];
    expect(b * b - 4 * a * c).toBe(0); // 16 − 16
    expect(2 * 2 - 4 * 2 + 4).toBe(0);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-quadratics', 'Discriminant', 'Number of real roots').example).toContain('one real root (x = 2)');
  });

  it('distance and midpoint for (1,2) and (4,6)', () => {
    expect(Math.hypot(4 - 1, 6 - 2)).toBe(5); // √(9 + 16) = √25
    expect(findRow(ALGEBRA_SECTIONS, 'alg-coordinate', 'Distance', 'Between two points').example).toContain('= 5');
    expect([(1 + 4) / 2, (2 + 6) / 2]).toEqual([2.5, 4]);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-coordinate', 'Midpoint', 'Between two points').example).toContain('(2.5, 4)');
  });

  it('exponent laws', () => {
    expect(2 ** 3 * 2 ** 4).toBe(2 ** 7); // 128
    expect(2 ** 7).toBe(128);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-exponents', 'Product rule', 'Same base, multiply').example).toContain('128');
    expect(2 ** 5 / 2 ** 2).toBe(2 ** 3); // 8
    expect(findRow(ALGEBRA_SECTIONS, 'alg-exponents', 'Quotient rule', 'Same base, divide').example).toContain('= 8');
    expect((2 ** 3) ** 2).toBe(2 ** 6); // 64
    expect((2 ** 6)).toBe(64);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-exponents', 'Power of a power', 'Raise a power to a power').example).toContain('64');
    expect((2 * 5) ** 2).toBe(2 ** 2 * 5 ** 2); // 100
    expect(2 ** 2 * 5 ** 2).toBe(100);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-exponents', 'Power of a product', 'Exponent distributes').example).toContain('100');
    expect(7 ** 0).toBe(1);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-exponents', 'Zero exponent', 'Any nonzero base').example).toContain('7⁰ = 1');
    expect(2 ** -3).toBe(1 / 8);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-exponents', 'Negative exponent', 'Flip, do not negate').example).toContain('1/8');
  });

  it('binomial patterns hold as identities (checked at a sample x)', () => {
    // FOIL: (x + 3)(x + 2) = x² + 5x + 6 at x = 1 → 12 = 12
    expect((1 + 3) * (1 + 2)).toBe(1 + 5 + 6);
    expect(3 + 2).toBe(5);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-factoring', 'FOIL', 'Multiply two binomials').example).toContain('x² + 5x + 6');
    // (x + 3)² = x² + 6x + 9 at x = 2 → 25 = 25
    expect((2 + 3) ** 2).toBe(4 + 12 + 9);
    expect(2 * 3 * 2).toBe(12);
    expect(findRow(ALGEBRA_SECTIONS, 'alg-factoring', 'Square of a sum', 'Perfect-square trinomial').example).toContain('x² + 6x + 9');
    // (x − 4)² = x² − 8x + 16 at x = 5 → 1 = 1
    expect((5 - 4) ** 2).toBe(25 - 40 + 16);
    expect(2 * 4).toBe(8); // middle coefficient −2ab = −2x·4 → |−8| checks out
    expect(findRow(ALGEBRA_SECTIONS, 'alg-factoring', 'Square of a difference', 'Perfect-square trinomial').example).toContain('x² − 8x + 16');
    // x² − 9 = (x + 3)(x − 3) at x = 4 → 7 = 7
    expect(4 ** 2 - 9).toBe((4 + 3) * (4 - 3));
    expect(findRow(ALGEBRA_SECTIONS, 'alg-factoring', 'Difference of squares', 'Factor on sight').example).toContain('(x + 3)(x − 3)');
  });
});
