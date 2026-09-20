/**
 * Name tracing generator — pure functions shared by the SSR sheet (default
 * name "Emma", fully printable without JS) and the live island (input +
 * print/cursive style). Rows follow the classic worksheet format: one model
 * row in dark ink, trace rows in light gray, then blank guided rows.
 */

export type TraceStyle = 'print' | 'cursive';

export const DEFAULT_NAME = 'Emma';
export const MAX_NAME_CHARS = 12;

const NAME_ALLOWED = /[^A-Za-z' -]/g;

/** Letters/space/hyphen/apostrophe only, trimmed, capped, first letter capitalized. */
export function sanitizeName(raw: string): string {
  const cleaned = raw.replace(NAME_ALLOWED, '').replace(/\s+/g, ' ').trim().slice(0, MAX_NAME_CHARS);
  if (!cleaned) return '';
  return cleaned[0].toUpperCase() + cleaned.slice(1);
}

/** How many times the name repeats across one row — longer names, fewer reps. */
export function repetitions(name: string): number {
  const len = name.length;
  if (len <= 5) return 4;
  if (len <= 8) return 3;
  return 2;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(cells: string, cls: string): string {
  return `<div class="name-row ${cls}" aria-hidden="${cls === 'empty' ? 'true' : 'false'}">${cells}</div>`;
}

/**
 * The full row stack for one name. Empty name → guide lines only (still a
 * usable blank handwriting sheet).
 */
export function renderNameSheetHtml(name: string, style: TraceStyle): string {
  const reps = name ? repetitions(name) : 4;
  const cols = `style="grid-template-columns:repeat(${reps},1fr)"`;
  const safe = escapeHtml(name);

  const filledRow = (cls: string) => {
    const cells = Array.from(
      { length: reps },
      () => `<div class="name-cell"><span class="glyph">${safe}</span></div>`,
    ).join('');
    return `<div class="name-row ${cls}" ${cols}>${cells}</div>`;
  };
  const emptyRow = () => {
    const cells = Array.from({ length: reps }, () => '<div class="name-cell"></div>').join('');
    return row(cells, 'empty');
  };

  const parts: string[] = [];
  if (name) {
    parts.push(filledRow('model'));
    for (let i = 0; i < 5; i++) parts.push(filledRow('trace'));
  }
  parts.push(emptyRow());
  parts.push(emptyRow());
  return parts.join('');
}
