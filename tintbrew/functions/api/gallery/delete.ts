/**
 * POST /api/gallery/delete — remove one of your own pieces, freeing its
 * gallery slot. Likes already collected do NOT refund credits (they were
 * spent or earned on the piece while it lived).
 * Body: { uuid, pieceId }.
 */
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
  const hash = await deviceHash(ctx.env, uuid);

  const del = await db
    .prepare('DELETE FROM creations WHERE piece_id = ? AND device_hash = ?')
    .bind(pieceId, hash)
    .run();
  if ((del.meta?.changes ?? 0) === 0) return json({ error: 'not-found' }, 404);

  const left = await db
    .prepare('SELECT COUNT(*) AS n FROM creations WHERE device_hash = ?')
    .bind(hash)
    .first<{ n: number }>();
  return json({ ok: true, used: left?.n ?? 0 });
}
