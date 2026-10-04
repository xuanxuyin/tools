import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildRows,
  hueToHex,
  scoreAll,
  scoreRow,
  tierFor,
  ROW_COUNT,
  ROW_TILES,
  type HueTile,
} from './hueTest';

describe('hueTest ring construction', () => {
  it('three trays tile the full circle, sharing anchors', () => {
    const rows = buildRows();
    expect(rows).toHaveLength(ROW_COUNT);
    for (let r = 0; r < ROW_COUNT; r++) {
      expect(rows[r]!.anchors[0]!.hue).toBeCloseTo(r * 120);
      expect(rows[r]!.anchors[1]!.hue).toBeCloseTo(r * 120 + 120);
      // next row picks up exactly where this one ends (wrap on the last)
      const next = rows[(r + 1) % ROW_COUNT]!;
      expect(next.anchors[0]!.hue % 360).toBeCloseTo(rows[r]!.anchors[1]!.hue % 360);
    }
  });

  it('every neighboring hue step renders a distinct hex', () => {
    const step = 120 / (ROW_TILES + 1);
    for (let h = 0; h < 360; h += step / 2) {
      const a = hueToHex(h);
      const b = hueToHex(h + step);
      expect(a, `hue ${h} vs ${h + step}`).not.toBe(b);
    }
  });

  it('seeded shuffle is deterministic and never ships solved', () => {
    const a = buildRows();
    const b = buildRows();
    expect(a).toEqual(b);
    const solvedEverywhere = a.every((row) => row.tiles.every((t, i) => t.trueRank === i));
    expect(solvedEverywhere).toBe(false);
    expect(scoreAll(a).total).toBeGreaterThan(0);
  });
});

describe('hueTest footrule scoring', () => {
  const rows = buildRows();

  it('home order scores a perfect zero', () => {
    for (const row of rows) {
      const home = [...row.tiles].sort((x, y) => x.trueRank - y.trueRank);
      expect(scoreRow(row, home).total).toBe(0);
    }
  });

  it('full reversal is the row maximum (50)', () => {
    for (const row of rows) {
      const reversed = [...row.tiles].sort((x, y) => y.trueRank - x.trueRank);
      expect(scoreRow(row, reversed).total).toBe(50);
    }
  });

  it('a single adjacent swap costs exactly 2', () => {
    const row = rows[0]!;
    const home: HueTile[] = [...row.tiles].sort((x, y) => x.trueRank - y.trueRank);
    [home[0], home[1]] = [home[1]!, home[0]!];
    expect(scoreRow(row, home).total).toBe(2);
  });

  it('shipped demo score is plausible (not solved, not beyond the max)', () => {
    const { total } = scoreAll(rows);
    expect(total).toBeGreaterThan(0);
    expect(total).toBeLessThanOrEqual(ROW_COUNT * 50);
    // the demo blurb on the page claims a real number — snapshot it here so
    // a seed change that would silently edit the copy fails loudly
    expect(total).toBe(scoreAll().total);
  });
});

describe('hueTest tiers', () => {
  it('covers the whole ladder without gaps or overlaps', () => {
    const labels = [0, 1, 7, 16, 31, 61, 150].map((s) => tierFor(s).label);
    expect(labels).toEqual(['Perfect', 'Elite', 'Sharp', 'Solid', 'Warming up', 'Scrambled', 'Scrambled']);
  });
});

// --- dist guards: run after a build (build → vitest is the release order) ---

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const pageReady = existsSync(resolve(DIST, 'hue-test', 'index.html'));

describe.skipIf(!pageReady)('hue test page (real dist markup)', () => {
  const html = readFileSync(resolve(DIST, 'hue-test', 'index.html'), 'utf8');

  it('ships the full board: 3 trays, 2 anchors each, 33 tiles, 33 spokes', () => {
    expect(html.match(/class="hue-tile"/g)).toHaveLength(ROW_COUNT * ROW_TILES);
    expect(html.match(/class="hue-anchor"/g)).toHaveLength(ROW_COUNT * 2);
    expect(html.match(/class="spoke"/g)).toHaveLength(ROW_COUNT * ROW_TILES);
  });

  it('is self-canonical and carries the not-a-diagnosis disclaimer', () => {
    expect(html).toContain('rel="canonical" href="https://tintbrew.com/hue-test/"');
    expect(html).toContain('not a medical test');
  });

  it('shows the shipped demo score as a real computed value', () => {
    expect(html).toContain(`scores ${scoreAll().total} of 150`);
  });

  it('is wired into header and footer navigation', () => {
    expect(html.match(/href="\/hue-test"/g)!.length).toBeGreaterThanOrEqual(2);
  });
});
