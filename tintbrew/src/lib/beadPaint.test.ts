/**
 * Drag-stroke geometry for the free-paint canvas. The contract: a stroke
 * from A to B paints a chain of 8-connected cells — every horizontal,
 * vertical and diagonal drag leaves no gaps, so the brush "carries the
 * color along" the whole drag path.
 */
import { describe, expect, it } from 'vitest';
import { isEightAdjacent, paintLine, type PaintCell } from './beadPaint';

function expectConnectedChain(cells: PaintCell[], from: PaintCell, to: PaintCell) {
  expect(cells[0]).toEqual(from);
  expect(cells[cells.length - 1]).toEqual(to);
  expect(new Set(cells.map((c) => `${c.x},${c.y}`)).size).toBe(cells.length); // no repeats
  for (let i = 1; i < cells.length; i++) {
    expect(isEightAdjacent(cells[i - 1]!, cells[i]!), `step ${i - 1}→${i}`).toBe(true);
  }
}

describe('paintLine', () => {
  it('single tap paints exactly one cell', () => {
    expect(paintLine({ x: 4, y: 7 }, { x: 4, y: 7 })).toEqual([{ x: 4, y: 7 }]);
  });

  it('horizontal drag paints every cell left to right', () => {
    expect(paintLine({ x: 2, y: 3 }, { x: 6, y: 3 })).toEqual([
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 5, y: 3 },
      { x: 6, y: 3 },
    ]);
  });

  it('vertical drag paints every cell top to bottom', () => {
    const stroke = paintLine({ x: 0, y: 1 }, { x: 0, y: 4 });
    expect(stroke.map((c) => c.y)).toEqual([1, 2, 3, 4]);
  });

  it('perfect diagonal drags paint the diagonal — no staircase', () => {
    const stroke = paintLine({ x: 1, y: 1 }, { x: 5, y: 5 });
    expect(stroke).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 4 },
      { x: 5, y: 5 },
    ]);
  });

  it('anti-diagonal drag stays 8-connected', () => {
    expectConnectedChain(paintLine({ x: 0, y: 5 }, { x: 5, y: 0 }), { x: 0, y: 5 }, { x: 5, y: 0 });
  });

  it('shallow slope advances one column per step', () => {
    const stroke = paintLine({ x: 0, y: 0 }, { x: 5, y: 2 });
    expect(stroke).toHaveLength(6);
    for (let i = 0; i < stroke.length; i++) {
      expect(stroke[i]!.x).toBe(i); // no column ever skipped
    }
    expectConnectedChain(stroke, { x: 0, y: 0 }, { x: 5, y: 2 });
  });

  it('steep slope advances one row per step', () => {
    const stroke = paintLine({ x: 2, y: 1 }, { x: 3, y: 6 });
    expect(stroke).toHaveLength(6);
    for (let i = 0; i < stroke.length; i++) {
      expect(stroke[i]!.y).toBe(i + 1); // no row ever skipped
    }
    expectConnectedChain(stroke, { x: 2, y: 1 }, { x: 3, y: 6 });
  });

  it('drags work in all four directions', () => {
    expectConnectedChain(paintLine({ x: 8, y: 6 }, { x: 3, y: 2 }), { x: 8, y: 6 }, { x: 3, y: 2 });
    expectConnectedChain(paintLine({ x: 5, y: 9 }, { x: 5, y: 0 }), { x: 5, y: 9 }, { x: 5, y: 0 });
  });
});
