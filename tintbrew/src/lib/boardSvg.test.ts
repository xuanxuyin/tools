/**
 * Board-SVG renderer tests — rect/peg counting against the grid, seam lines
 * every 29 cells, unknown-id tolerance (renders as an empty peg, never
 * throws) and the user-text escaping that guards innerHTML injection.
 */
import { describe, expect, it } from 'vitest';
import { MARD_COLORS } from './mardPalette';
import { buildBoardSvg, escapeHtml } from './boardSvg';

describe('buildBoardSvg', () => {
  it('renders one rect per bead and one peg per empty cell', () => {
    const beads = [MARD_COLORS[0]!.id, null, null, MARD_COLORS[5]!.id];
    const svg = buildBoardSvg({ cols: 2, rows: 2, cells: beads });
    expect(svg.match(/class="gb-cell"/g)).toHaveLength(2);
    expect(svg.match(/class="gb-peg"/g)).toHaveLength(2);
    expect(svg).toContain(`fill="${MARD_COLORS[0]!.hex}"`);
  });

  it('sizes the viewBox to cols/rows × 10 units', () => {
    const svg = buildBoardSvg({ cols: 29, rows: 16, cells: new Array(29 * 16).fill(null) });
    expect(svg).toContain('viewBox="0 0 290 160"');
  });

  it('draws seams every 29 cells — one vertical seam on a 30-wide board, two on 59', () => {
    const one = buildBoardSvg({ cols: 30, rows: 10, cells: new Array(300).fill(null) });
    expect(one.match(/stroke="#c9c4bd" stroke-width="1"><\/line>/g)).toHaveLength(1);
    const two = buildBoardSvg({ cols: 59, rows: 10, cells: new Array(590).fill(null) });
    expect(two.match(/<line /g)).toHaveLength(2);
  });

  it('treats unknown bead ids as empty pegs — palette drift never breaks a card', () => {
    const svg = buildBoardSvg({ cols: 2, rows: 1, cells: ['ghost-id', MARD_COLORS[3]!.id] });
    expect(svg.match(/class="gb-peg"/g)).toHaveLength(1);
    expect(svg.match(/class="gb-cell"/g)).toHaveLength(1);
  });
});

describe('escapeHtml', () => {
  it('neutralizes angle brackets and quotes in user text', () => {
    expect(escapeHtml('<img src=x onerror=alert(1)>')).toBe('&lt;img src=x onerror=alert(1)&gt;');
    expect(escapeHtml('a & b "c"')).toBe('a &amp; b &quot;c&quot;');
  });
});
