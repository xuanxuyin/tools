/**
 * Gallery core — pure, dependency-light helpers shared by the Pages
 * Functions (functions/api/gallery/*), the client island (scripts/gallery.ts,
 * beadEditor.ts publish flow) and the tests. Kept free of any page-data
 * imports so it can bundle into a Workers function and a browser island alike.
 *
 * Storage shape for a gallery piece's cells: the editor grid is Mardiy ids,
 * which we store compactly as two base36 chars per cell (palette index) with
 * '.' for an empty peg — 29×29 ≈ 1.7 KB vs ≈ 5 KB as raw JSON ids.
 */
import { MARD_COLORS } from './mardPalette';

export interface GalleryPiece {
  id: string;
  name: string;
  nick: string;
  width: number;
  height: number;
  /** decoded cells, row-major, palette id or null */
  cells: (string | null)[];
  likes: number;
  createdAt: number;
  updatedAt: number;
}

export const GALLERY_LIMITS = {
  minDim: 8,
  maxDim: 160,
  maxCells: 160 * 160,
  maxName: 40,
  maxNick: 20,
} as const;

// ------------------------------------------------------------ palette ----

const INDEX_BY_ID = new Map(MARD_COLORS.map((b, i) => [b.id, i]));
const BASE36 = '0123456789abcdefghijklmnopqrstuvwxyz';
/** two fixed-width base36 chars cover indexes 0..1295 — palette is 291 */
const WIDTH = 2;

/** Encode cells ('.' per null, 2 base36 chars per bead) — row-major. */
export function encodeCells(cells: (string | null)[]): string {
  let out = '';
  for (const c of cells) {
    if (c === null) {
      out += '.';
      continue;
    }
    const i = INDEX_BY_ID.get(c);
    if (i === undefined) throw new Error(`unknown bead id: ${c}`);
    let s = '';
    let n = i;
    do {
      s = BASE36[n % 36] + s;
      n = Math.floor(n / 36);
    } while (n > 0);
    out += s.padStart(WIDTH, '0');
  }
  return out;
}

/** Decode back to cells; unknown or corrupt cells become null (defensive —
 * a truncated row must not break the whole list render). */
export function decodeCells(encoded: string): (string | null)[] {
  const cells: (string | null)[] = [];
  for (let i = 0; i < encoded.length; ) {
    const ch = encoded[i];
    if (ch === '.') {
      cells.push(null);
      i += 1;
      continue;
    }
    const chunk = encoded.slice(i, i + WIDTH);
    i += WIDTH;
    if (chunk.length < WIDTH) {
      // truncated tail — one stray char is corruption, not a bead index
      cells.push(null);
      break;
    }
    const idx = parseInt(chunk, 36);
    const bead = MARD_COLORS[idx];
    cells.push(bead ? bead.id : null);
  }
  return cells;
}

// ----------------------------------------------------------- validate ----

export type PublishInput = {
  uuid: unknown;
  name: unknown;
  nick: unknown;
  width: unknown;
  height: unknown;
  grid: unknown;
};

/** Server-side validation for a publish payload. Returns normalized cells
 *  or an error reason — the Function layer maps reasons to HTTP codes. */
export function validatePublish(
  input: PublishInput,
): { ok: true; name: string; nick: string; width: number; height: number; cells: (string | null)[] } | { ok: false; reason: string } {
  if (typeof input.uuid !== 'string' || input.uuid.length < 8 || input.uuid.length > 64) {
    return { ok: false, reason: 'bad-uuid' };
  }
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const nick = typeof input.nick === 'string' ? input.nick.trim() : '';
  if (!name || name.length > GALLERY_LIMITS.maxName) return { ok: false, reason: 'bad-name' };
  if (!nick || nick.length > GALLERY_LIMITS.maxNick) return { ok: false, reason: 'bad-nick' };
  if (/[<>]/.test(name) || /[<>]/.test(nick)) return { ok: false, reason: 'bad-chars' };

  const width = typeof input.width === 'number' ? Math.round(input.width) : NaN;
  const height = typeof input.height === 'number' ? Math.round(input.height) : NaN;
  if (!Number.isFinite(width) || !Number.isFinite(height)) return { ok: false, reason: 'bad-size' };
  if (width < GALLERY_LIMITS.minDim || width > GALLERY_LIMITS.maxDim) return { ok: false, reason: 'bad-size' };
  if (height < GALLERY_LIMITS.minDim || height > GALLERY_LIMITS.maxDim) return { ok: false, reason: 'bad-size' };

  if (!Array.isArray(input.grid) || input.grid.length !== height) return { ok: false, reason: 'bad-grid' };
  for (const row of input.grid) {
    if (!Array.isArray(row) || row.length !== width) return { ok: false, reason: 'bad-grid' };
    if (row.some((c) => c !== null && !INDEX_BY_ID.has(c as string))) return { ok: false, reason: 'bad-bead' };
  }

  const cells: (string | null)[] = [];
  for (const row of input.grid as (string | null)[][]) cells.push(...row);
  if (cells.every((c) => c === null)) return { ok: false, reason: 'empty' };

  return { ok: true, name, nick, width, height, cells };
}

/** Random-enough public id — collisions are astronomically unlikely at
 *  toy scale and the column is UNIQUE anyway. */
export function newPieceId(): string {
  let s = '';
  for (let i = 0; i < 12; i++) s += BASE36[Math.floor(Math.random() * 36)];
  return s;
}

/** UTC hour bucket used by both the vote limit and the publish rate limit. */
export function hourBucket(now = Date.now()): string {
  return new Date(now).toISOString().slice(0, 13);
}
