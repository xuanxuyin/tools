/**
 * Per-pegboard print pages, shared by the photo converter and the bead
 * editor (2026-11-02 P1). "Print pattern" squeezes the whole board onto
 * one sheet — fine within a single pegboard, unreadable past it: a 116-wide
 * pattern puts 58+ beads per printed inch. The boards view cuts the pattern
 * along the 29-cell seams instead: a cover sheet (dimensions + the bead
 * list, so the pull-beads-and-place loop works off one printout) then one
 * full-size sheet per physical pegboard, each with its board coordinates
 * and a page counter. Pure DOM assembly; the print CSS that shows it lives
 * in each page's global @media print block, keyed on
 * html[data-print-zone='boards'].
 */
import { BOARD_SIZE, renderBoardCanvas } from './beadBoardRender';

/** One printed sheet: a single physical pegboard's worth of beads. */
export interface BoardPage {
  /** board column / row index, 0-based */
  bx: number;
  by: number;
  /** bead offset of this board inside the full pattern */
  x0: number;
  y0: number;
  /** beads of the pattern on this page (≤ BOARD_SIZE; edge boards shrink) */
  cols: number;
  rows: number;
  /** 1-based page number — the cover sheet is not counted */
  page: number;
}

/** Cut a pattern into pegboard pages, row-major (across first, then down —
 *  the order hands get placed on the table). Every page is drawn as a full
 *  BOARD_SIZE sheet: edge boards keep their empty pegs, matching the real
 *  pegboard the user snaps together. */
export function boardPages(cols: number, rows: number, boardSize = BOARD_SIZE): BoardPage[] {
  const pages: BoardPage[] = [];
  const bw = Math.max(1, Math.ceil(cols / boardSize));
  const bh = Math.max(1, Math.ceil(rows / boardSize));
  let page = 0;
  for (let by = 0; by < bh; by++) {
    for (let bx = 0; bx < bw; bx++) {
      pages.push({
        bx,
        by,
        x0: bx * boardSize,
        y0: by * boardSize,
        cols: Math.min(boardSize, cols - bx * boardSize),
        rows: Math.min(boardSize, rows - by * boardSize),
        page: ++page,
      });
    }
  }
  return pages;
}

/** One bead list row of the cover sheet. */
export interface BeadTally {
  code: string;
  hex: string;
  count: number;
}

export interface BoardPrintInput {
  cols: number;
  rows: number;
  cellAt: (y: number, x: number) => string | null;
  /** cover-sheet bead list, sorted by the caller (count desc is the useful order) */
  tally: BeadTally[];
  /** Pre-localized strings — the helper stays out of the i18n module. */
  labels: {
    /** cover heading line, e.g. "58 × 58 beads — 4 pegboards" */
    cover: string;
    /** cover list heading, e.g. "Beads required per color" */
    coverList: string;
    /** per-board heading under each sheet's canvas */
    board: (p: BoardPage) => string;
  };
}

/**
 * Assemble the print DOM: a cover sheet with the dimensions and bead list,
 * then one page per pegboard. Screen CSS keeps the container hidden
 * (display:none inline); the pages' global print blocks un-hide it under
 * html[data-print-zone='boards']. A missing 2d context (tests, very old
 * browsers) drops the canvas but keeps every other node — the structure is
 * what the DOM tests pin.
 */
export function buildBoardPrintPages(input: BoardPrintInput): HTMLDivElement {
  const wrap = document.createElement('div');
  wrap.setAttribute('data-print-boards', '');
  wrap.style.display = 'none';

  const cover = document.createElement('div');
  cover.className = 'board-page board-cover';
  const h1 = document.createElement('p');
  h1.className = 'bp-cover-title';
  h1.textContent = input.labels.cover;
  const h2 = document.createElement('p');
  h2.className = 'bp-cover-list';
  h2.textContent = input.labels.coverList;
  const list = document.createElement('div');
  list.className = 'bp-rows';
  for (const { code, hex, count } of input.tally) {
    const row = document.createElement('div');
    row.className = 'bp-row';
    const swatch = document.createElement('span');
    swatch.className = 'bp-swatch';
    swatch.style.background = hex;
    const label = document.createElement('span');
    label.className = 'bp-label';
    label.append(code, ` (${hex})`);
    const n = document.createElement('span');
    n.className = 'bp-count';
    n.textContent = String(count);
    row.append(swatch, label, n);
    list.appendChild(row);
  }
  cover.append(h1, h2, list);
  wrap.appendChild(cover);

  const pages = boardPages(input.cols, input.rows);
  const total = pages.length;
  for (const p of pages) {
    const page = document.createElement('div');
    page.className = 'board-page';
    const canvas = renderBoardCanvas(BOARD_SIZE, BOARD_SIZE, (y, x) => {
      const gy = p.y0 + y;
      const gx = p.x0 + x;
      if (gy >= input.rows || gx >= input.cols) return null;
      return input.cellAt(gy, gx);
    });
    if (canvas) page.appendChild(canvas);
    const head = document.createElement('p');
    head.className = 'bp-board-head';
    head.textContent = input.labels.board(p);
    page.appendChild(head);
    page.setAttribute('data-bp-page', String(p.page));
    page.setAttribute('data-bp-total', String(total));
    wrap.appendChild(page);
  }
  return wrap;
}
