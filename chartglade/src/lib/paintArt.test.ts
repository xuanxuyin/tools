import { describe, expect, it } from 'vitest';
import { PUMPKIN_ADDITION, GHOST_MULTIPLICATION } from '../data/halloween';
import { TREE_ADDITION, SNOWMAN_MULTIPLICATION, usedKeys } from '../data/christmas';
import { buildFactGrid, referenceSvg, worksheetSvg, type PaintArt } from './paintArt';

/**
 * The tintbrew-style rendering pipeline (user call 2026-10-29): one number
 * matrix -> worksheet SVG (facts only) and reference SVG (finished picture).
 * The hard line under test: the WORKSHEET must never leak a palette color —
 * the color is the answer, and the answer is the math.
 */
const ARTS: [string, PaintArt, 'add' | 'mul'][] = [
  ['pumpkin', PUMPKIN_ADDITION, 'add'],
  ['ghost', GHOST_MULTIPLICATION, 'mul'],
  ['tree', TREE_ADDITION, 'add'],
  ['snowman', SNOWMAN_MULTIPLICATION, 'mul'],
];

describe('buildFactGrid', () => {
  it.each(ARTS)('%s: every painted cell carries a fact that answers to its key', (_, art, mode) => {
    const grid = buildFactGrid(art, mode);
    expect(grid.length).toBe(art.cells.length);
    art.cells.forEach((row, r) => {
      row.forEach((key, c) => {
        const cell = grid[r]![c]!;
        if (key === 0) expect(cell).toBeNull();
        else {
          expect(cell.key).toBe(key);
          expect(mode === 'add' ? cell.a + cell.b : cell.a * cell.b).toBe(key);
        }
      });
    });
  });

  it('is deterministic — the same art builds the same sheet every time', () => {
    expect(buildFactGrid(PUMPKIN_ADDITION, 'add')).toEqual(buildFactGrid(PUMPKIN_ADDITION, 'add'));
  });
});

describe('worksheetSvg', () => {
  it.each(ARTS)('%s: one fact text per painted cell, class attr last so dist guards regex', (_, art, mode) => {
    const svg = worksheetSvg(art, buildFactGrid(art, mode), mode === 'mul' ? '×' : '+');
    const painted = art.cells.flat().filter((k) => k !== 0).length;
    expect(svg.match(/class="cbn-fact">/g)).toHaveLength(painted);
    expect(svg.match(/class="cbn-fact">\d+[+×]\d+<\/text>/g)).toHaveLength(painted);
    expect(svg).toContain('rx="1.5"'); // rounded cells — the polish the port is for
    const cols = art.cells[0]!.length;
    expect(svg).toContain(`viewBox="0 0 ${cols * 10} ${art.cells.length * 10}"`);
  });

  it.each(ARTS)('%s: leaks zero palette colors — the answer stays secret', (_, art, mode) => {
    const svg = worksheetSvg(art, buildFactGrid(art, mode), mode === 'mul' ? '×' : '+');
    for (const key of usedKeys(art)) {
      expect(svg, `legend color for key ${key} must not appear`).not.toContain(art.palette[key]!);
    }
    expect(svg).not.toContain('cbn-ref');
  });
});

describe('referenceSvg', () => {
  it.each(ARTS)('%s: contiguous full-color cells carry every used legend color', (_, art) => {
    const svg = referenceSvg(art);
    const painted = art.cells.flat().filter((k) => k !== 0).length;
    expect(svg.match(/<rect /g)).toHaveLength(painted);
    for (const key of usedKeys(art)) {
      expect(svg).toContain(`fill="${art.palette[key]!}"`);
    }
    expect(svg).not.toContain('cbn-fact'); // the finished picture shows no math
  });
});
