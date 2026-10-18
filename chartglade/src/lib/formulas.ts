/**
 * Formula-sheet content (V1.7 math cluster). The sheet IS the printable, so
 * the data doubles as the page content and the guard-test anchor: every
 * `formula` string and every `example` below is pinned in
 * src/data/formulaGuards.test.ts, where each worked example is re-derived
 * with independent arithmetic (the site's math-claims discipline — audited
 * after the awesome-math PR flag). Formulas use plain Unicode (², ½, π, √,
 * ±, subscript digits) so nothing here needs a font download or MathJax.
 *
 * Scope follows US course conventions (grades 6-12):
 *  - geometry: grade 6-8 area/perimeter, grade 5-7 volume, grade 8 the
 *    Pythagorean theorem.
 *  - algebra: Algebra 1 (grade 8-9) — lines, quadratics, coordinate
 *    geometry, exponent laws, binomial products and factoring patterns.
 */

export interface FormulaRow {
  /** Shape or rule name, e.g. 'Rectangle' or 'Product rule'. */
  name: string;
  /** What the row measures, e.g. 'Area', 'Volume', 'Roots'. */
  measure: string;
  /** The formula exactly as printed on the sheet. */
  formula: string;
  /** One worked example with real arithmetic — every number is guarded. */
  example: string;
}

export interface FormulaSection {
  id: string;
  heading: string;
  /** Hand-written when-to-use note under the heading (anti-thin-content). */
  note: string;
  rows: FormulaRow[];
}

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

export const GEOMETRY_SECTIONS: FormulaSection[] = [
  {
    id: 'geo-2d',
    heading: 'Perimeter and Area (2-D figures)',
    note: 'Perimeter walks around the outside — think fencing a garden. Area covers the inside — think carpeting it. On a test the units hand you the answer: plain units (ft, in, cm) mean perimeter, square units (sq ft) mean area.',
    rows: [
      {
        name: 'Rectangle',
        measure: 'Perimeter',
        formula: 'P = 2(l + w)',
        example: 'l = 5 ft, w = 3 ft → P = 2(5 + 3) = 16 ft',
      },
      {
        name: 'Rectangle',
        measure: 'Area',
        formula: 'A = lw',
        example: 'l = 4 ft, w = 3 ft → A = 4 × 3 = 12 sq ft',
      },
      {
        name: 'Square',
        measure: 'Perimeter',
        formula: 'P = 4s',
        example: 's = 6 in → P = 4 × 6 = 24 in',
      },
      {
        name: 'Square',
        measure: 'Area',
        formula: 'A = s²',
        example: 's = 6 in → A = 6² = 36 sq in',
      },
      {
        name: 'Triangle',
        measure: 'Area',
        formula: 'A = ½bh',
        example: 'b = 10 cm, h = 4 cm → A = ½ × 10 × 4 = 20 sq cm',
      },
      {
        name: 'Parallelogram',
        measure: 'Area',
        formula: 'A = bh',
        example: 'b = 8 cm, h = 5 cm → A = 8 × 5 = 40 sq cm',
      },
      {
        name: 'Trapezoid',
        measure: 'Area',
        formula: 'A = ½(b₁ + b₂)h',
        example: 'b₁ = 6 in, b₂ = 10 in, h = 4 in → A = ½(6 + 10) × 4 = 32 sq in',
      },
      {
        name: 'Circle',
        measure: 'Circumference',
        formula: 'C = 2πr',
        example: 'r = 3 in → C = 6π ≈ 18.85 in',
      },
      {
        name: 'Circle',
        measure: 'Area',
        formula: 'A = πr²',
        example: 'r = 3 in → A = 9π ≈ 28.27 sq in',
      },
    ],
  },
  {
    id: 'geo-3d',
    heading: 'Surface Area and Volume (3-D figures)',
    note: 'Volume fills — how much water the shape holds. Surface area wraps — how much paper covers it. The prism and cylinder formulas are worth deriving once with a cereal box (unfold it) instead of memorizing: the "2 of" pieces in SA = 2(lw + lh + wh) are the three pairs of opposite faces.',
    rows: [
      {
        name: 'Rectangular prism',
        measure: 'Volume',
        formula: 'V = lwh',
        example: '5 × 3 × 2 → V = 30 cu in',
      },
      {
        name: 'Rectangular prism',
        measure: 'Surface area',
        formula: 'SA = 2(lw + lh + wh)',
        example: '2(15 + 10 + 6) = 62 sq in',
      },
      {
        name: 'Cylinder',
        measure: 'Volume',
        formula: 'V = πr²h',
        example: 'r = 2, h = 5 → V = 20π ≈ 62.83 cu in',
      },
      {
        name: 'Cylinder',
        measure: 'Surface area',
        formula: 'SA = 2πr² + 2πrh',
        example: 'r = 2, h = 5 → SA = 28π ≈ 87.96 sq in',
      },
      {
        name: 'Cone',
        measure: 'Volume',
        formula: 'V = ⅓πr²h',
        example: 'r = 3, h = 6 → V = 18π ≈ 56.55 cu in',
      },
      {
        name: 'Sphere',
        measure: 'Volume',
        formula: 'V = (4/3)πr³',
        example: 'r = 3 → V = 36π ≈ 113.10 cu in',
      },
      {
        name: 'Sphere',
        measure: 'Surface area',
        formula: 'SA = 4πr²',
        example: 'r = 2 → SA = 16π ≈ 50.27 sq in',
      },
    ],
  },
  {
    id: 'geo-pythag',
    heading: 'Right Triangles (Pythagorean theorem)',
    note: 'Only right triangles get the theorem, and c is always the hypotenuse — the side across from the right angle, and the longest side. The triples 3-4-5, 5-12-13 and 8-15-17 show up everywhere; recognizing them on sight saves the arithmetic.',
    rows: [
      {
        name: 'Right triangle',
        measure: 'Hypotenuse',
        formula: 'a² + b² = c²',
        example: 'legs 3 and 4 → 9 + 16 = 25 → c = 5',
      },
      {
        name: 'Right triangle',
        measure: 'Missing leg',
        formula: 'a² = c² − b²',
        example: 'c = 13, b = 5 → 169 − 25 = 144 → a = 12',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Algebra                                                             */
/* ------------------------------------------------------------------ */

export const ALGEBRA_SECTIONS: FormulaSection[] = [
  {
    id: 'alg-lines',
    heading: 'Slope and Equations of a Line',
    note: 'Slope is rise over run — how far up per step right. Use slope-intercept (y = mx + b) when a graph or the y-intercept is given; use point-slope when all you have is one point and the slope — it skips the algebra of hunting down b.',
    rows: [
      {
        name: 'Slope',
        measure: 'Through two points',
        formula: 'm = (y₂ − y₁)/(x₂ − x₁)',
        example: '(0, 1), (2, 5) → m = (5 − 1)/(2 − 0) = 2',
      },
      {
        name: 'Slope-intercept form',
        measure: 'Equation of a line',
        formula: 'y = mx + b',
        example: 'm = 2, b = 1 → y = 2x + 1 (at x = 4, y = 9)',
      },
      {
        name: 'Point-slope form',
        measure: 'Through a point with slope m',
        formula: 'y − y₁ = m(x − x₁)',
        example: 'm = 2, (3, 7) → y − 7 = 2(x − 3), which is y = 2x + 1',
      },
    ],
  },
  {
    id: 'alg-quadratics',
    heading: 'Quadratics',
    note: 'The quadratic formula solves any quadratic — factoring is faster when it works, the formula always works. Check the discriminant first: it tells you how many real roots exist before you compute anything.',
    rows: [
      {
        name: 'Quadratic formula',
        measure: 'Roots of ax² + bx + c = 0',
        formula: 'x = (−b ± √(b² − 4ac))/(2a)',
        example: 'x² − 5x + 6 = 0 → x = (5 ± 1)/2 → x = 2 or x = 3',
      },
      {
        name: 'Discriminant',
        measure: 'Number of real roots',
        formula: 'D = b² − 4ac',
        example: 'x² − 4x + 4 → D = 16 − 16 = 0 → one real root (x = 2)',
      },
    ],
  },
  {
    id: 'alg-coordinate',
    heading: 'Coordinate Geometry',
    note: 'The distance formula is the Pythagorean theorem wearing coordinates — the two legs of the right triangle are the horizontal and vertical gaps. The midpoint is just averaging: x with x, y with y.',
    rows: [
      {
        name: 'Distance',
        measure: 'Between two points',
        formula: 'd = √((x₂ − x₁)² + (y₂ − y₁)²)',
        example: '(1, 2), (4, 6) → √(3² + 4²) = √25 = 5',
      },
      {
        name: 'Midpoint',
        measure: 'Between two points',
        formula: 'M = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
        example: '(1, 2), (4, 6) → M = (2.5, 4)',
      },
    ],
  },
  {
    id: 'alg-exponents',
    heading: 'Exponent Laws',
    note: 'Every law below needs the same base to apply. The memory hook: multiplying adds exponents, dividing subtracts them, a power raised to a power multiplies them — and a negative exponent never makes the value negative, it flips the factor to the bottom.',
    rows: [
      {
        name: 'Product rule',
        measure: 'Same base, multiply',
        formula: 'xᵃ · xᵇ = xᵃ⁺ᵇ',
        example: '2³ · 2⁴ = 2⁷ = 128',
      },
      {
        name: 'Quotient rule',
        measure: 'Same base, divide',
        formula: 'xᵃ / xᵇ = xᵃ⁻ᵇ',
        example: '2⁵ / 2² = 2³ = 8',
      },
      {
        name: 'Power of a power',
        measure: 'Raise a power to a power',
        formula: '(xᵃ)ᵇ = xᵃᵇ',
        example: '(2³)² = 2⁶ = 64',
      },
      {
        name: 'Power of a product',
        measure: 'Exponent distributes',
        formula: '(xy)ᵃ = xᵃyᵃ',
        example: '(2 · 5)² = 2² · 5² = 100',
      },
      {
        name: 'Zero exponent',
        measure: 'Any nonzero base',
        formula: 'x⁰ = 1 (x ≠ 0)',
        example: '7⁰ = 1',
      },
      {
        name: 'Negative exponent',
        measure: 'Flip, do not negate',
        formula: 'x⁻ⁿ = 1/xⁿ',
        example: '2⁻³ = 1/2³ = 1/8',
      },
    ],
  },
  {
    id: 'alg-factoring',
    heading: 'Multiplying Binomials and Factoring',
    note: 'FOIL is how you expand; the three patterns below are how you factor — running FOIL backwards on sight. The one mistake worth drilling out: (a + b)² is a perfect square, not a² + b² — check with numbers, (1 + 2)² = 9 but 1² + 2² = 5.',
    rows: [
      {
        name: 'FOIL',
        measure: 'Multiply two binomials',
        formula: '(a + b)(c + d) = ac + ad + bc + bd',
        example: '(x + 3)(x + 2) = x² + 5x + 6',
      },
      {
        name: 'Square of a sum',
        measure: 'Perfect-square trinomial',
        formula: '(a + b)² = a² + 2ab + b²',
        example: '(x + 3)² = x² + 6x + 9',
      },
      {
        name: 'Square of a difference',
        measure: 'Perfect-square trinomial',
        formula: '(a − b)² = a² − 2ab + b²',
        example: '(x − 4)² = x² − 8x + 16',
      },
      {
        name: 'Difference of squares',
        measure: 'Factor on sight',
        formula: 'a² − b² = (a + b)(a − b)',
        example: 'x² − 9 = (x + 3)(x − 3)',
      },
    ],
  },
];
