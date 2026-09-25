/**
 * Pure geometry for the free-paint canvas. `paintLine` is the drag stroke:
 * an 8-connected Bresenham line, so a fast or diagonal drag still paints
 * every bead it crosses instead of leaving gaps. Kept free of DOM imports
 * so the browser island and the unit tests share the exact same path.
 */
export interface PaintCell {
  x: number;
  y: number;
}

export function paintLine(from: PaintCell, to: PaintCell): PaintCell[] {
  const out: PaintCell[] = [{ x: from.x, y: from.y }];
  let x = from.x;
  let y = from.y;
  const dx = to.x - x;
  const dy = to.y - y;
  const sx = Math.sign(dx);
  const sy = Math.sign(dy);
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);
  let err = adx - ady;

  while ((x !== to.x || y !== to.y) && out.length < 512) {
    const e2 = 2 * err;
    if (e2 > -ady) {
      err -= ady;
      x += sx;
    }
    if (e2 < adx) {
      err += adx;
      y += sy;
    }
    out.push({ x, y });
  }
  return out;
}

/** True when two cells touch horizontally, vertically or diagonally. */
export function isEightAdjacent(a: PaintCell, b: PaintCell): boolean {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return dx <= 1 && dy <= 1 && dx + dy > 0;
}
