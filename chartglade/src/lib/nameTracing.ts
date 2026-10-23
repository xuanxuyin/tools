/**
 * Name tracing generator — pure functions shared by the SSR sheet (default
 * name "Emma", fully printable without JS) and the live island (name input +
 * letter style + tracing style). One letter per cell, three tracing styles:
 * gray letters to trace (trace), hollow outlines to fill in (hollow), and a
 * wipe-and-write fade where each practice row is fainter than the last until
 * the blank rows take over (wipe). The letter style (print vs cursive) is a
 * font class on the sheet wrapper, not part of the row markup.
 */

export type LetterStyle = 'print' | 'cursive';
export type TraceStyle = 'trace' | 'hollow' | 'wipe';

export const DEFAULT_NAME = 'Emma';
export const MAX_NAME_CHARS = 12;
/** Cells per printed row — ~0.55in boxes on letter portrait, K-sized. */
const CELLS_PER_ROW = 12;
/** Guide-only rows (empty name) still get a sane 4-column grid. */
const EMPTY_SHEET_COLS = 4;
const TRACE_ROW_COUNT = 5;
const BLANK_ROW_COUNT = 2;

const NAME_ALLOWED = /[^A-Za-z' -]/g;

/**
 * Letters/space/hyphen/apostrophe only, trimmed, capped. The first letter of
 * every word is capitalized (space- or hyphen-separated) — "mary jane"
 * becomes "Mary Jane", "smith-o'brien" becomes "Smith-O'brien" — because
 * apostrophes never start a word (O'Brien stays exactly as typed).
 */
export function sanitizeName(raw: string): string {
  const cleaned = raw
    .replace(NAME_ALLOWED, '')
    .replace(/\s+/g, ' ')
    .replace(/^[\s-]+/, '')
    .replace(/[\s-]+$/, '')
    .slice(0, MAX_NAME_CHARS)
    .trim();
  if (!cleaned) return '';
  return cleaned.replace(/(^|[ -])([a-z])/g, (_m, sep: string, ch: string) => sep + ch.toUpperCase());
}

export interface NameCell {
  char: string;
  /** First letter of a name part — earns the start marker in the model row. */
  cap: boolean;
  /** Word gap (the space in "Mary Jane") — guides only, nothing to trace. */
  gap: boolean;
}

/** One name instance as a cell sequence — one letter (or gap) per cell. */
export function nameCells(name: string): NameCell[] {
  return [...name].map((char, i) => ({
    char,
    cap: i === 0 || name[i - 1] === ' ' || name[i - 1] === '-',
    gap: char === ' ',
  }));
}

/**
 * How many times the name repeats across one row. Letters get a cell each,
 * so the repeat count scales to keep the total box count near the
 * print-friendly budget (12): short names repeat more, long names once.
 */
export function repetitions(name: string): number {
  if (!name) return EMPTY_SHEET_COLS;
  return Math.min(6, Math.max(1, Math.floor(CELLS_PER_ROW / name.length)));
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function cellHtml(c: NameCell): string {
  const cls = c.gap ? 'name-cell gap' : c.cap ? 'name-cell cap' : 'name-cell';
  const glyph = c.gap ? '' : `<span class="glyph">${escapeHtml(c.char)}</span>`;
  return `<div class="${cls}">${glyph}</div>`;
}

function rowHtml(cells: string, cls: string, cols: number, hidden: boolean): string {
  const style = ` style="grid-template-columns:repeat(${cols},1fr)"`;
  const aria = hidden ? ' aria-hidden="true"' : '';
  return `<div class="name-row ${cls}"${style}${aria}>${cells}</div>`;
}

/**
 * The full row stack for one name: one dark model row, five practice rows in
 * the chosen tracing style, then blank guided rows. Empty name → guide lines
 * only (still a usable blank handwriting sheet).
 */
export function renderNameSheetHtml(name: string, trace: TraceStyle): string {
  const cells = name ? nameCells(name) : [];
  const reps = repetitions(name);
  const cols = cells.length ? cells.length * reps : EMPTY_SHEET_COLS;

  const oneName = cells.map(cellHtml).join('');
  const filledRow = (cls: string) => rowHtml(oneName.repeat(reps), cls, cols, false);
  const emptyRow = () =>
    rowHtml('<div class="name-cell"></div>'.repeat(cols), 'empty', cols, true);

  const parts: string[] = [];
  if (name) {
    parts.push(filledRow('model'));
    for (let i = 0; i < TRACE_ROW_COUNT; i++) {
      if (trace === 'wipe') parts.push(filledRow(`fade-${i + 1}`));
      else parts.push(filledRow(trace));
    }
  }
  for (let i = 0; i < BLANK_ROW_COUNT; i++) parts.push(emptyRow());
  return parts.join('');
}
