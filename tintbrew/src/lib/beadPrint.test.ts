/**
 * Per-pegboard print pages (P1, 2026-11-02): the board cutter's page
 * arithmetic — single-board passthrough, edge boards shrinking to the
 * pattern's true remainder, row-major page order — and the assembled
 * print DOM in happy-dom (cover sheet with the bead tally, per-board
 * sheets with coordinates and page counters, structure intact even where
 * the 2d context is unavailable).
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { Window } from 'happy-dom';
import { boardPages, buildBoardPrintPages, type BeadTally } from './beadPrint';
import { BOARD_SIZE } from './beadBoardRender';

describe('boardPages', () => {
  it('a single-pegboard pattern cuts to exactly one page', () => {
    expect(boardPages(29, 29)).toEqual([
      { bx: 0, by: 0, x0: 0, y0: 0, cols: 29, rows: 29, page: 1 },
    ]);
  });

  it('sub-board patterns still get their one full page', () => {
    expect(boardPages(13, 9)[0]).toEqual({ bx: 0, by: 0, x0: 0, y0: 0, cols: 13, rows: 9, page: 1 });
  });

  it('58 × 58 cuts to four pages in row-major order', () => {
    const pages = boardPages(58, 58);
    expect(pages.map((p) => [p.bx, p.by])).toEqual([
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ]);
    expect(pages.map((p) => p.page)).toEqual([1, 2, 3, 4]);
    for (const p of pages) {
      expect(p.cols).toBe(BOARD_SIZE);
      expect(p.rows).toBe(BOARD_SIZE);
    }
  });

  it('edge boards carry the true remainder, offsets follow the seam grid', () => {
    // 60 = 29 + 29 + 2; 31 = 29 + 2
    const pages = boardPages(60, 31);
    expect(pages).toHaveLength(6);
    expect(pages[1]).toMatchObject({ bx: 1, by: 0, x0: 29, y0: 0, cols: 29, rows: 29 });
    expect(pages[2]).toMatchObject({ bx: 2, by: 0, x0: 58, y0: 0, cols: 2, rows: 29 });
    expect(pages[4]).toMatchObject({ bx: 1, by: 1, x0: 29, y0: 29, cols: 29, rows: 2 });
    expect(pages[5]).toMatchObject({ bx: 2, by: 1, x0: 58, y0: 29, cols: 2, rows: 2 });
  });

  it('a custom board size reshapes the grid (116 is 2×2 of 58)', () => {
    expect(boardPages(116, 116, 58)).toHaveLength(4);
  });
});

describe('buildBoardPrintPages', () => {
  let win: Window;
  let doc: Document;

  const tally: BeadTally[] = [
    { code: 'P4', hex: '#ffffff', count: 12 },
    { code: 'H7', hex: '#1c1c1c', count: 5 },
  ];

  beforeEach(() => {
    win = new Window({ url: 'https://tintbrew.com/photo-to-perler-bead-pattern/' });
    doc = win.document as unknown as Document;
    (globalThis as Record<string, unknown>).document = doc;
  });

  it('mounts a cover sheet plus one sheet per board, hidden on screen', () => {
    const wrap = buildBoardPrintPages({
      cols: 58,
      rows: 29,
      cellAt: () => null,
      tally,
      labels: { cover: '58 × 29 beads — 2 pegboards', coverList: 'Beads required per color', board: () => '' },
    });
    expect(wrap.getAttribute('data-print-boards')).toBe('');
    expect(wrap.style.display).toBe('none');
    const pages = wrap.querySelectorAll('.board-page');
    expect(pages).toHaveLength(3); // cover + 2 boards
    expect(wrap.querySelector('.board-cover')).toBeTruthy();
  });

  it('the cover sheet carries the heading, the list heading and every tally row', () => {
    const wrap = buildBoardPrintPages({
      cols: 29,
      rows: 29,
      cellAt: () => null,
      tally,
      labels: { cover: '29 × 29 beads — 1 pegboard', coverList: 'Beads required per color', board: () => '' },
    });
    const cover = wrap.querySelector('.board-cover')!;
    expect(cover.querySelector('.bp-cover-title')?.textContent).toBe('29 × 29 beads — 1 pegboard');
    expect(cover.querySelector('.bp-cover-list')?.textContent).toBe('Beads required per color');
    const rows = [...cover.querySelectorAll('.bp-row')];
    expect(rows).toHaveLength(2);
    expect(rows[0]!.querySelector('.bp-swatch')?.getAttribute('style')).toContain('#ffffff');
    expect(rows[0]!.querySelector('.bp-label')?.textContent).toBe('P4 (#ffffff)');
    expect(rows[0]!.querySelector('.bp-count')?.textContent).toBe('12');
  });

  it('board sheets are labelled with coordinates and a page counter, in order', () => {
    const seen: { bx: number; by: number; page: number }[] = [];
    const wrap = buildBoardPrintPages({
      cols: 58,
      rows: 58,
      cellAt: () => null,
      tally: [],
      labels: {
        cover: '',
        coverList: '',
        board: (p) => {
          seen.push({ bx: p.bx, by: p.by, page: p.page });
          return `Board ${p.bx + 1} × ${p.by + 1} — page ${p.page}`;
        },
      },
    });
    const boards = [...wrap.querySelectorAll('.board-page')].filter((p) => !p.classList.contains('board-cover'));
    expect(boards).toHaveLength(4);
    expect(seen.map((s) => [s.bx, s.by])).toEqual([
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ]);
    boards.forEach((b, i) => {
      expect(b.getAttribute('data-bp-page')).toBe(String(i + 1));
      expect(b.getAttribute('data-bp-total')).toBe('4');
      expect(b.querySelector('.bp-board-head')?.textContent).toContain(`page ${i + 1}`);
    });
  });

  it('without a 2d context the sheets keep their structure and cellAt is never asked', () => {
    // happy-dom canvas.getContext('2d') → null: renderBoardCanvas bails
    // before drawing, so the cellAt wrapper must not be touched either
    let asked = 0;
    const wrap = buildBoardPrintPages({
      cols: 30, // 2 boards across
      rows: 29,
      cellAt: () => {
        asked++;
        return null;
      },
      tally: [],
      labels: { cover: '', coverList: '', board: () => '' },
    });
    expect(asked).toBe(0);
    expect(wrap.querySelectorAll('.board-page').length).toBe(3); // cover + 2 boards
    expect(wrap.querySelector('.board-page canvas')).toBeNull();
    expect(wrap.querySelectorAll('.bp-board-head').length).toBe(2);
  });
});
