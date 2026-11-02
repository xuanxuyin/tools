/**
 * POST /api/gallery/report — flag a piece; the 3rd flag auto-hides it.
 * No auth: worst case someone burns flags on a good piece, which costs them
 * three devices for one hide and shows up in the weekly PLAN review.
 * Body: { pieceId }.
 */
import type { Ctx } from './_shared';
import { json, readJson } from './_shared';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const body = await readJson(ctx.request);
  const pieceId = typeof body.pieceId === 'string' ? body.pieceId : '';
  if (!/^[0-9a-z]{4,24}$/.test(pieceId)) return json({ error: 'bad-request' }, 400);

  const db = ctx.env.GALLERY_DB;
  const res = await db
    .prepare(
      `UPDATE creations SET
         flagged = flagged + 1,
         hidden = CASE WHEN flagged + 1 >= 3 THEN 1 ELSE hidden END
       WHERE piece_id = ?`,
    )
    .bind(pieceId)
    .run();
  if ((res.meta?.changes ?? 0) === 0) return json({ error: 'not-found' }, 404);
  return json({ ok: true });
}
