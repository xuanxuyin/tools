/**
 * POST /api/gallery/like — one vote per device per UTC hour, whatever the
 * target. vote_log's composite PK does the dedup: a conflict leaves
 * meta.changes at 0 → 429. Body: { uuid, pieceId }.
 */
import { hourBucket } from './_kernel';
import type { Ctx } from './_shared';
import { deviceHash, json, readJson } from './_shared';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const body = await readJson(ctx.request);
  const uuid = typeof body.uuid === 'string' ? body.uuid : '';
  const pieceId = typeof body.pieceId === 'string' ? body.pieceId : '';
  if (uuid.length < 8 || uuid.length > 64 || !/^[0-9a-z]{4,24}$/.test(pieceId)) {
    return json({ error: 'bad-request' }, 400);
  }

  const db = ctx.env.GALLERY_DB;
  const hash = await deviceHash(ctx.request, ctx.env, uuid);

  const vote = await db
    .prepare('INSERT INTO vote_log (device_hash, hour, piece_id) VALUES (?, ?, ?) ON CONFLICT(device_hash, hour) DO NOTHING')
    .bind(hash, hourBucket(), pieceId)
    .run();
  if ((vote.meta?.changes ?? 0) === 0) return json({ error: 'one-per-hour' }, 429);

  const bump = await db
    .prepare('UPDATE creations SET likes = likes + 1 WHERE piece_id = ? AND hidden = 0')
    .bind(pieceId)
    .run();
  if ((bump.meta?.changes ?? 0) === 0) return json({ error: 'not-found' }, 404);

  return json({ ok: true });
}
