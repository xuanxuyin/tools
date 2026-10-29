/**
 * Paint-by-math rendering pipeline (port of tintbrew's BeadFigure approach,
 * user call 2026-10-29): the art is a pure number matrix, and one matrix
 * renders two ways from the same code —
 *
 *  - worksheet: white rounded cells with the math fact in each; the printed
 *    page never leaks a legend color, so the only way to know the color is
 *    to solve the fact
 *  - reference: contiguous full-color cells, the finished picture (screen
 *    only — it IS the answer key)
 *
 * Output is a verbatim SVG string (set:html), so no framework attribute
 * injection touches it — the dist guards regex `class="cbn-fact">` directly.
 */

export interface PaintArt {
  name: string;
  /** rows of legend keys; 0 means the cell stays blank */
  cells: number[][];
  /** key -> CSS color the printed swatch shows */
  palette: Record<number, string>;
  /** key -> color name as printed in the legend */
  legend: Record<number, string>;
}

/** Facts for a legend key so every cell shows a fresh-but-checkable problem. */
export function factsFor(key: number, mode: 'add' | 'mul'): { a: number; b: number }[] {
  if (mode === 'add') {
    const facts: { a: number; b: number }[] = [];
    for (let a = 1; a < key; a++) facts.push({ a, b: key - a });
    return facts;
  }
  const facts: { a: number; b: number }[] = [];
  for (let a = 1; a <= key; a++) {
    if (key % a === 0) facts.push({ a, b: key / a });
  }
  return facts;
}

export interface PaintedFact {
  key: number;
  a: number;
  b: number;
}

/** (null = blank cell) Same cell index picks the same fact every build. */
export type FactGrid = (PaintedFact | null)[][];

export function buildFactGrid(art: PaintArt, mode: 'add' | 'mul'): FactGrid {
  const cols = art.cells[0]?.length ?? 0;
  return art.cells.map((row, r) =>
    row.map((key, c) => {
      if (key === 0) return null;
      const pool = factsFor(key, mode);
      const fact = pool[(r * cols + c) % pool.length]!;
      return { key, ...fact };
    }),
  );
}

/* ------------------------------------------------------------------ */
/* SVG builders — presentation attributes only, no CSS dependency      */
/* (prints identically everywhere, screenshots identically too)        */
/* ------------------------------------------------------------------ */

const U = 10; // viewBox units per cell, same scale as tintbrew's pegboard
const FONT = "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif";

/** Conservative glyph width (em fraction) so estimated text width is an
 *  upper bound on real system-font rendering (user-caught bug 2026-10-29:
 *  4-char facts like `10×1` overflowed the cell at the old fixed sizes). */
export function estFactWidth(text: string, size: number): number {
  let w = 0;
  for (const ch of text) w += (ch >= '0' && ch <= '9' ? 0.62 : 0.55) * size;
  return w;
}

/** Largest font size (capped at 4.6) whose estimated width fits the cell's
 *  inner width — long facts shrink instead of spilling over the border. */
function fittedFactSize(text: string): number {
  const maxW = U - 1.9; // cell is U-0.8 wide; keep breathing room either side
  let size = 4.6;
  while (size > 2.2 && estFactWidth(text, size) > maxW) size -= 0.1;
  return Math.round(size * 10) / 10;
}

function svgOpen(art: PaintArt, label: string): string {
  const cols = art.cells[0]?.length ?? 0;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols * U} ${art.cells.length * U}"` +
    ` role="img" aria-label="${label}" style="width:100%;height:auto;display:block">`
  );
}

/**
 * The printable worksheet: white rounded cells, hairline borders, the fact
 * centered in each. Contains zero palette colors — the answer stays secret
 * until the student solves for it.
 */
export function worksheetSvg(art: PaintArt, grid: FactGrid, op: '+' | '×'): string {
  const body: string[] = [];
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (!cell) return;
      const x = (c + 0.5) * U;
      const y = (r + 0.5) * U;
      const text = `${cell.a}${op}${cell.b}`;
      const size = fittedFactSize(text);
      body.push(
        `<rect x="${(c * U + 0.4).toFixed(1)}" y="${(r * U + 0.4).toFixed(1)}" width="${U - 0.8}" height="${U - 0.8}" rx="1.5" fill="#ffffff" stroke="#b8b8b8" stroke-width="0.45"/>` +
          `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-family="${FONT}" font-size="${size}" font-weight="600" fill="#2b2b2b" class="cbn-fact">${text}</text>`,
      );
    });
  });
  return svgOpen(art, `${art.name} color by number worksheet — solve each fact, then color`) + body.join('') + '</svg>';
}

/**
 * The finished picture: contiguous full-color cells, no gaps or rounding, so
 * the color areas read as one solid image (tintbrew's reference mode).
 */
export function referenceSvg(art: PaintArt): string {
  const body: string[] = [];
  art.cells.forEach((row, r) => {
    row.forEach((key, c) => {
      if (key === 0) return;
      body.push(
        `<rect x="${c * U}" y="${r * U}" width="${U}" height="${U}" fill="${art.palette[key]}"/>`,
      );
    });
  });
  return svgOpen(art, `${art.name} color by number, finished picture`) + body.join('') + '</svg>';
}
