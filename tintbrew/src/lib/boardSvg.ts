/**
 * Client-side board rendering for gallery pieces — {cols, rows, cells} →
 * inline SVG string. Mirrors the visual language of BeadFigure (10 units per
 * cell, peg circles for empty cells, seams every BOARD_SIZE) but takes
 * Mardiy ids directly, so the editor/publisher pipeline and the gallery
 * island share one renderer. Pure string output, no DOM dependency.
 */
import { mardById } from './mardPalette';

const SVG_NS = 'http://www.w3.org/2000/svg';
const U = 10;
const SEAM_EVERY = 29;

export interface BoardLike {
  cols: number;
  rows: number;
  cells: (string | null)[];
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Build the SVG markup for a board. Unknown ids render as empty pegs
 *  (defensive against palette drift — never throws). */
export function buildBoardSvg(board: BoardLike): string {
  const w = board.cols * U;
  const h = board.rows * U;
  const parts: string[] = [];
  parts.push(`<svg xmlns="${SVG_NS}" viewBox="0 0 ${w} ${h}" class="board-svg" role="img" aria-label="bead board">`);

  for (let y = 0; y < board.rows; y++) {
    for (let x = 0; x < board.cols; x++) {
      const cell = board.cells[y * board.cols + x];
      const bead = cell ? mardById(cell) : undefined;
      if (!bead) {
        // empty peg
        parts.push(`<circle class="gb-peg" cx="${x * U + U / 2}" cy="${y * U + U / 2}" r="3.2" fill="#e2e4df"></circle>`);
        continue;
      }
      parts.push(`<rect class="gb-cell" x="${x * U + 0.5}" y="${y * U + 0.5}" width="${U - 1}" height="${U - 1}" rx="2.4" fill="${bead.hex}"></rect>`);
    }
  }

  // pegboard seams every SEAM_EVERY cells, then a light outer border
  const seam = `stroke="#c9c4bd" stroke-width="1"`;
  for (let x = SEAM_EVERY; x < board.cols; x += SEAM_EVERY) {
    parts.push(`<line x1="${x * U}" y1="0" x2="${x * U}" y2="${h}" ${seam}></line>`);
  }
  for (let y = SEAM_EVERY; y < board.rows; y += SEAM_EVERY) {
    parts.push(`<line x1="0" y1="${y * U}" x2="${w}" y2="${y * U}" ${seam}></line>`);
  }
  parts.push(`<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" fill="none" stroke="#c9c4bd" stroke-width="1"></rect>`);
  parts.push('</svg>');
  return parts.join('');
}

/** Escape user-entered text (name/nick) before any innerHTML injection. */
export { esc as escapeHtml };
