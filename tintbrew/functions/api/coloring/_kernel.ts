/**
 * Coloring core — pure helpers shared by the coloring Pages Functions and the
 * client island (scripts/coloring.ts). Same split as the gallery kernel: no
 * src/ imports (the Pages bundler stages functions/ outside the checkout),
 * so the piece catalog it needs lives in the coloring_assets D1 table
 * (slug -> ord, rings, data), uploaded from D:/tmp/coloring_out.
 *
 * Save shape for a colored piece: one base36 char per ring (palette index),
 * '.' for not-yet-filled. Axolotl's 1634 rings ≈ 1.6 KB per publish.
 */

export const COLORING_LIMITS = {
  maxName: 40,
  maxNick: 20,
} as const;

/** economy: same credits balance as the perler gallery, separate slot pool */
export const COLORING_ECONOMY = {
  slotCost: 100,
  maxSlots: 5,
} as const;

export interface ColoringPieceState {
  ord: number;
  rings: number;
}

/** ringIdx -> palette index, one base36 char per ring, '.' = empty */
export function encodeColors(colors: (number | null)[]): string {
  return colors
    .map((c) => (c === null || c < 0 || c > 35 ? '.' : c.toString(36)))
    .join('');
}

export function decodeColors(s: string): (number | null)[] {
  return [...s].map((ch) => (ch === '.' ? null : parseInt(ch, 36)));
}

/** UTC calendar day, the unlock-rate bucket */
export function todayUtc(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export interface UnlockState {
  unlocked: number; // count of accessible pieces (index < unlocked)
  lastUnlockDate: string | null;
}

/** Pure unlock decision: piece must be exactly next in order, previous piece
 *  completed (ord 0 is free), and no earlier unlock today (UTC). */
export function checkUnlock(
  state: UnlockState,
  target: ColoringPieceState,
  previousDone: boolean,
  today = todayUtc(),
): { ok: boolean; reason?: 'not-next' | 'not-done' | 'daily-limit' } {
  if (target.ord !== state.unlocked) return { ok: false, reason: 'not-next' };
  if (target.ord > 0 && !previousDone) return { ok: false, reason: 'not-done' };
  if (state.lastUnlockDate === today) return { ok: false, reason: 'daily-limit' };
  return { ok: true };
}

export function validateColoringPublish(
  name: unknown,
  nick: unknown,
  colors: unknown,
  rings: number,
): { name: string; nick: string; colors: string } | { error: string } {
  const n = typeof name === 'string' ? name.trim() : '';
  const k = typeof nick === 'string' ? nick.trim() : '';
  const c = typeof colors === 'string' ? colors : '';
  if (!n || n.length > COLORING_LIMITS.maxName) return { error: 'bad-name' };
  if (k.length > COLORING_LIMITS.maxNick) return { error: 'bad-nick' };
  if (!c || c.length !== rings) return { error: 'bad-colors' };
  if (!/^[.0-9a-z]+$/.test(c)) return { error: 'bad-colors' };
  return { name: n, nick: k, colors: c };
}
