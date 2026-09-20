import { describe, expect, it } from 'vitest';
import {
  GRAPH_PAPER_VARIANTS,
  axisPositions,
  clipLine,
  dotPoints,
  gridBox,
  isoLines,
  renderGraphSvg,
  squareLines,
  type GraphPaperVariantId,
} from './graphPaper';

const box = gridBox();

describe('axisPositions', () => {
  it('lays out a centered quarter-inch axis over the letter box', () => {
    const xs = axisPositions(25, box.x0, box.x1);
    // 744-unit span fits 29 gaps of 25 → 30 lines
    expect(xs).toHaveLength(30);
    expect(xs[1] - xs[0]).toBeCloseTo(25, 5);
    // centered: leftover span split evenly on both sides
    const leftGap = xs[0] - box.x0;
    const rightGap = box.x1 - xs[xs.length - 1];
    expect(leftGap).toBeGreaterThanOrEqual(rightGap - 1e-6);
    expect(leftGap - rightGap).toBeLessThan(25);
  });

  it('keeps every position inside the box', () => {
    for (const x of axisPositions(19.685, box.x0, box.x1)) {
      expect(x).toBeGreaterThanOrEqual(box.x0 - 1e-9);
      expect(x).toBeLessThanOrEqual(box.x1 + 1e-9);
    }
  });
});

describe('squareLines', () => {
  it('quarter-inch grid: 30 vertical + 40 horizontal, majors every 4th', () => {
    const { minor, major } = squareLines(GRAPH_PAPER_VARIANTS['quarter-inch'].spec, box);
    const vMinor = minor.filter((s) => s.x1 === s.x2).length;
    const hMinor = minor.filter((s) => s.y1 === s.y2).length;
    const vMajor = major.filter((s) => s.x1 === s.x2).length;
    const hMajor = major.filter((s) => s.y1 === s.y2).length;
    expect(vMinor).toBe(30 - Math.ceil(30 / 4));
    expect(hMinor).toBe(40 - Math.ceil(40 / 4));
    expect(vMajor).toBe(Math.ceil(30 / 4));
    expect(hMajor).toBe(Math.ceil(40 / 4));
    expect(minor.length + major.length).toBe(30 + 40);
  });

  it('uniform grids (majorEvery 0) put everything in minor', () => {
    const { minor, major } = squareLines(GRAPH_PAPER_VARIANTS['one-cm'].spec, box);
    expect(major).toHaveLength(0);
    expect(minor.length).toBeGreaterThan(0);
  });
});

describe('dotPoints', () => {
  it('5mm dots: 38 columns x 51 rows on the letter box', () => {
    const pts = dotPoints(GRAPH_PAPER_VARIANTS.dots.spec.spacingIn, box);
    expect(pts).toHaveLength(38 * 51);
    for (const p of pts) {
      expect(p.x).toBeGreaterThanOrEqual(box.x0);
      expect(p.x).toBeLessThanOrEqual(box.x1);
    }
  });
});

describe('clipLine', () => {
  it('clips a diagonal to the box edges', () => {
    const seg = clipLine(1, 0, box);
    expect(seg).not.toBeNull();
    expect(seg!.x1).toBe(box.x0);
    expect(seg!.x2).toBe(box.x1);
  });

  it('returns null for a line that misses the box entirely', () => {
    expect(clipLine(0, -5000, box)).toBeNull();
  });
});

describe('isoLines', () => {
  const segs = isoLines(GRAPH_PAPER_VARIANTS.iso.spec.spacingIn, box);

  it('produces all three line families', () => {
    const horizontal = segs.filter((s) => s.y1 === s.y2);
    const up = segs.filter((s) => s.y2 > s.y1);
    const down = segs.filter((s) => s.y2 < s.y1);
    expect(horizontal.length).toBeGreaterThan(20);
    expect(up.length).toBeGreaterThan(20);
    expect(down.length).toBeGreaterThan(20);
  });

  it('diagonals run at exactly ±60° (slope √3)', () => {
    for (const s of segs) {
      if (s.y1 === s.y2) continue;
      const slope = (s.y2 - s.y1) / (s.x2 - s.x1);
      expect(Math.abs(Math.abs(slope) - Math.sqrt(3))).toBeLessThan(0.01);
    }
  });

  it('keeps every segment inside the box', () => {
    for (const s of segs) {
      expect(s.x1).toBeGreaterThanOrEqual(box.x0 - 0.01);
      expect(s.x2).toBeLessThanOrEqual(box.x1 + 0.01);
      expect(Math.min(s.y1, s.y2)).toBeGreaterThanOrEqual(box.y0 - 0.01);
      expect(Math.max(s.y1, s.y2)).toBeLessThanOrEqual(box.y1 + 0.01);
    }
  });

  it('line spacing is the triangle altitude (s·√3/2), not denser', () => {
    const hs = segs
      .filter((s) => s.y1 === s.y2)
      .map((s) => s.y1)
      .sort((a, b) => a - b);
    const altitude = (25 * Math.sqrt(3)) / 2;
    for (let i = 1; i < hs.length; i++) {
      expect(hs[i] - hs[i - 1]).toBeCloseTo(altitude, 1);
    }
  });
});

describe('renderGraphSvg', () => {
  it('renders a full SVG at letter-print size for every variant', () => {
    for (const id of Object.keys(GRAPH_PAPER_VARIANTS) as GraphPaperVariantId[]) {
      const svg = renderGraphSvg(id, 'blue');
      expect(svg).toContain('viewBox="0 0 760 1010"');
      expect(svg).toContain('width="7.6in"');
      expect(svg).toContain('role="img"');
      expect(svg).toMatch(/<line|<circle/);
    }
  });

  it('applies the chosen color', () => {
    expect(renderGraphSvg('dots', 'green')).toContain('#96bba6');
    expect(renderGraphSvg('quarter-inch', 'dark')).toContain('#4a4a4a');
  });

  it('emits the dot count as circles', () => {
    expect(renderGraphSvg('dots', 'blue')).toMatch(/<circle/g);
    const circles = renderGraphSvg('dots', 'blue').match(/<circle/g)!;
    expect(circles).toHaveLength(38 * 51);
  });
});
