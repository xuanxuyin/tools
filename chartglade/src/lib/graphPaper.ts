/**
 * Graph-paper geometry engine — pure functions shared by the SSR printable
 * component and the customizer island on /graph-paper/.
 *
 * Units: hundredths of an inch, so the SVG viewBox maps 1:1 onto physical
 * print size (viewBox 760 x 1010 = 7.6in x 10.1in = the letter-portrait
 * content box at the site-wide 0.45in print margins). A 1/4" grid is
 * therefore exactly 25 units — what prints is what the keyword promises.
 */

export type GridStyle = 'squares' | 'dots' | 'iso';

export interface GridSpec {
  style: GridStyle;
  /** Distance between minor lines/dots, in inches. */
  spacingIn: number;
  /** Draw a heavier line every N minors (0 = uniform weight). */
  majorEvery: number;
}

export type GraphPaperVariantId = 'quarter-inch' | 'half-inch' | 'one-cm' | 'five-mm' | 'dots' | 'iso';

export const GRID_COLORS: Record<string, { label: string; hex: string }> = {
  blue: { label: 'Blue', hex: '#9db6d3' },
  gray: { label: 'Gray', hex: '#9d9d9d' },
  green: { label: 'Green', hex: '#96bba6' },
  dark: { label: 'Black', hex: '#4a4a4a' },
};

/** Letter-portrait content box in 1/100in units. */
export const PAGE_W = 760;
export const PAGE_H = 1010;
const INSET = 8;

export interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export const gridBox = (): Box => ({ x0: INSET, y0: INSET, x1: PAGE_W - INSET, y1: PAGE_H - INSET });

/** One axis position generator: centered grid, first/last line may fall short of the box edge. */
export function axisPositions(spacingUnits: number, min: number, max: number): number[] {
  const span = max - min;
  const count = Math.floor(span / spacingUnits); // number of gaps that fit
  const used = count * spacingUnits;
  const start = min + (span - used) / 2;
  const out: number[] = [];
  for (let i = 0; i <= count; i++) out.push(round2(start + i * spacingUnits));
  return out;
}

export interface Seg {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface LineSets {
  minor: Seg[];
  major: Seg[];
}

/** Square grid: vertical + horizontal lines, majors on every Nth position. */
export function squareLines(spec: GridSpec, box: Box): LineSets {
  const s = spec.spacingIn * 100;
  const minor: Seg[] = [];
  const major: Seg[] = [];
  const xs = axisPositions(s, box.x0, box.x1);
  const ys = axisPositions(s, box.y0, box.y1);
  const isMajor = (i: number) => spec.majorEvery > 0 && i % spec.majorEvery === 0;
  xs.forEach((x, i) => {
    const seg = { x1: x, y1: box.y0, x2: x, y2: box.y1 };
    (isMajor(i) ? major : minor).push(seg);
  });
  ys.forEach((y, i) => {
    const seg = { x1: box.x0, y1: y, x2: box.x1, y2: y };
    (isMajor(i) ? major : minor).push(seg);
  });
  return { minor, major };
}

export interface Pt {
  x: number;
  y: number;
}

/** Dot grid: one dot per lattice intersection. */
export function dotPoints(spacingIn: number, box: Box): Pt[] {
  const s = spacingIn * 100;
  const pts: Pt[] = [];
  for (const x of axisPositions(s, box.x0, box.x1)) {
    for (const y of axisPositions(s, box.y0, box.y1)) pts.push({ x, y });
  }
  return pts;
}

/** Clip infinite line y = m·x + b to the box; null when they never meet. */
export function clipLine(m: number, b: number, box: Box): Seg | null {
  const px: number[] = [];
  if (m !== 0) {
    const xAtY0 = (box.y0 - b) / m;
    const xAtY1 = (box.y1 - b) / m;
    if (xAtY0 > box.x0 && xAtY0 < box.x1) px.push(xAtY0);
    if (xAtY1 > box.x0 && xAtY1 < box.x1) px.push(xAtY1);
  }
  px.push(box.x0, box.x1);
  const yAt = (x: number) => m * x + b;
  let lo = Infinity;
  let hi = -Infinity;
  for (const x of px) {
    const y = yAt(x);
    if (y >= box.y0 - 1e-6 && y <= box.y1 + 1e-6) {
      lo = Math.min(lo, x);
      hi = Math.max(hi, x);
    }
  }
  if (lo === Infinity) return null;
  return { x1: round2(lo), y1: round2(yAt(lo)), x2: round2(hi), y2: round2(yAt(hi)) };
}

const SQRT3 = Math.sqrt(3);

/**
 * Isometric (equilateral triangle) grid — three line families:
 * horizontal rows spaced side·(√3/2), plus diagonals at ±60°.
 */
export function isoLines(spacingIn: number, box: Box): Seg[] {
  const s = spacingIn * 100;
  const rowH = (s * SQRT3) / 2;
  const segs: Seg[] = [];
  for (const y of axisPositions(rowH, box.y0, box.y1)) {
    segs.push({ x1: box.x0, y1: y, x2: box.x1, y2: y });
  }
  // Diagonal families y = ±√3·x + b, anchored on the box's top row at the same
  // s-spaced lattice x's as the horizontals — perpendicular spacing comes out
  // at the triangle altitude (s·√3/2), which is what makes them equilateral.
  // Range widened by the page height so off-page anchors still cross the box.
  const anchors = axisPositions(s, box.x0 - PAGE_H, box.x1 + PAGE_H);
  for (const sign of [SQRT3, -SQRT3]) {
    for (const ax of anchors) {
      const b = box.y0 - sign * ax;
      const seg = clipLine(sign, b, box);
      if (seg) segs.push(seg);
    }
  }
  return segs;
}

export interface VariantInfo {
  id: GraphPaperVariantId;
  spec: GridSpec;
  /** Human name, e.g. '1/4" Graph Paper'. */
  label: string;
  /** One-line card blurb for the hub. */
  blurb: string;
  /** How the spacing reads on paper, e.g. '1/4 inch squares'. */
  sizeLabel: string;
}

export const GRAPH_PAPER_VARIANTS: Record<GraphPaperVariantId, VariantInfo> = {
  'quarter-inch': {
    id: 'quarter-inch',
    spec: { style: 'squares', spacingIn: 0.25, majorEvery: 4 },
    label: '1/4" Graph Paper',
    blurb: 'The standard grid for math homework — four squares to the inch, inch lines slightly darker.',
    sizeLabel: '1/4 inch squares, heavier line every inch',
  },
  'half-inch': {
    id: 'half-inch',
    spec: { style: 'squares', spacingIn: 0.5, majorEvery: 2 },
    label: 'Half-Inch Graph Paper',
    blurb: 'Big half-inch squares for K-3: block letters, bar graphs, area models, counting.',
    sizeLabel: '1/2 inch squares, heavier line every inch',
  },
  'one-cm': {
    id: 'one-cm',
    spec: { style: 'squares', spacingIn: 0.393701, majorEvery: 0 },
    label: '1 cm Graph Paper',
    blurb: 'Centimeter squares for metric measurement and science labs — uniform weight lines.',
    sizeLabel: '1 centimeter squares, uniform lines',
  },
  'five-mm': {
    id: 'five-mm',
    spec: { style: 'squares', spacingIn: 0.19685, majorEvery: 2 },
    label: '5mm Graph Paper',
    blurb: 'Fine 5-millimeter grid — engineering-style precision with a darker line every centimeter.',
    sizeLabel: '5 millimeter squares, heavier line every cm',
  },
  dots: {
    id: 'dots',
    spec: { style: 'dots', spacingIn: 0.19685, majorEvery: 0 },
    label: 'Dot Grid Paper',
    blurb: 'Dots instead of lines — the gentler grid for sketching, journaling and coordinate art.',
    sizeLabel: '5 millimeter dot spacing',
  },
  iso: {
    id: 'iso',
    spec: { style: 'iso', spacingIn: 0.25, majorEvery: 0 },
    label: 'Isometric Graph Paper',
    blurb: 'Equilateral triangles for 3D drawing — cubes, buildings, geometry volume work.',
    sizeLabel: '1/4 inch triangle sides',
  },
};

const MINOR_W = 0.55;
const MAJOR_W = 1.25;
const DOT_R = 1.35;

const r = (n: number) => Math.round(n * 100) / 100;

function segAttrs(s: Seg): string {
  return `x1="${r(s.x1)}" y1="${r(s.y1)}" x2="${r(s.x2)}" y2="${r(s.y2)}"`;
}

/**
 * Full <svg> markup for one variant — the single render path for SSR sheets
 * and the live customizer preview (same function, same geometry).
 */
export function renderGraphSvg(variantId: GraphPaperVariantId, colorId: string): string {
  const { spec } = GRAPH_PAPER_VARIANTS[variantId];
  const hex = (GRID_COLORS[colorId] ?? GRID_COLORS.blue).hex;
  const box = gridBox();
  const inner: string[] = [];
  if (spec.style === 'squares') {
    const { minor, major } = squareLines(spec, box);
    inner.push(
      `<g stroke="${hex}" stroke-width="${MINOR_W}" shape-rendering="crispEdges">` +
        minor.map((s) => `<line ${segAttrs(s)}/>`).join('') +
        `</g>`,
    );
    if (major.length) {
      inner.push(
        `<g stroke="${hex}" stroke-width="${MAJOR_W}" shape-rendering="crispEdges">` +
          major.map((s) => `<line ${segAttrs(s)}/>`).join('') +
          `</g>`,
      );
    }
  } else if (spec.style === 'dots') {
    const pts = dotPoints(spec.spacingIn, box);
    inner.push(
      `<g fill="${hex}">` +
        pts.map((p) => `<circle cx="${r(p.x)}" cy="${r(p.y)}" r="${DOT_R}"/>`).join('') +
        `</g>`,
    );
  } else {
    const segs = isoLines(spec.spacingIn, box);
    inner.push(
      `<g stroke="${hex}" stroke-width="${MINOR_W}">` + segs.map((s) => `<line ${segAttrs(s)}/>`).join('') + `</g>`,
    );
  }
  return (
    `<svg class="graph-sheet" viewBox="0 0 ${PAGE_W} ${PAGE_H}" width="${PAGE_W / 100}in" height="${PAGE_H / 100}in" ` +
    `role="img" aria-label="${ariaFor(variantId)}">${inner.join('')}</svg>`
  );
}

function ariaFor(variantId: GraphPaperVariantId): string {
  const v = GRAPH_PAPER_VARIANTS[variantId];
  return `${v.label} — full letter sheet, ${v.sizeLabel}`;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
