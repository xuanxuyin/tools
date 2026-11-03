/**
 * Shared plumbing for the coloring Pages Functions. Re-exports the gallery
 * helpers (same device identity, same wallet) so both galleries always agree.
 */
export { json, readJson, deviceHash } from '../gallery/_shared';
export type { Env, Ctx, D1Db } from '../gallery/_shared';

/** The per-device coloring row, creating it on first touch. */
export async function ensureProgress(
  env: Env,
  deviceHash: string,
  now: number,
): Promise<{ unlocked: number; last_unlock_date: string | null }> {
  const row = await env.GALLERY_DB.prepare(
    'SELECT unlocked, last_unlock_date FROM coloring_progress WHERE device_hash = ?',
  )
    .bind(deviceHash)
    .first<{ unlocked: number; last_unlock_date: string | null }>();
  if (row) return row;
  await env.GALLERY_DB.prepare(
    'INSERT INTO coloring_progress (device_hash, unlocked, last_unlock_date, updated_at) VALUES (?, 1, NULL, ?)',
  )
    .bind(deviceHash, now)
    .run();
  return { unlocked: 1, last_unlock_date: null };
}
