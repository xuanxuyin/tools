/**
 * POST /api/gallery/publish — create or replace the caller's single piece.
 * Body: { uuid, name, nick, width, height, grid } (grid = editor's
 * (string|null)[][] rows of Mardiy ids). Replacing resets likes/flags —
 * a new piece starts fresh, and the author saw the confirm dialog client-side.
 * Rate limit: 3 publishes per device per UTC hour (covers a replace).
 */
import { encodeCells, hourBucket, newPieceId, validatePublish } from '../../../../src/lib/gallery';
import type { Ctx } from './_shared';
import { deviceHash, json, readJson } from './_shared';

const PUBLISH_LIMIT = 3;

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const body = await readJson(ctx.request);
  const parsed = validatePublish(body as never);
  if (!parsed.ok) return json({ error: parsed.reason }, 400);

  const db = ctx.env.GALLERY_DB;
  const hash = await deviceHash(ctx.request, ctx.env, body.uuid as string);

  // rate limit — INSERT .. ON CONFLICT .. WHERE keeps changes at 0 past the cap
  const lim = await db
    .prepare(
      `INSERT INTO publish_log (device_hash, hour, count) VALUES (?, ?, 1)
       ON CONFLICT(device_hash, hour) DO UPDATE SET count = count + 1 WHERE count < ${PUBLISH_LIMIT}`,
    )
    .bind(hash, hourBucket())
    .run();
  if ((lim.meta?.changes ?? 0) === 0) return json({ error: 'rate-limited' }, 429);

  const existing = await db.prepare('SELECT 1 AS x FROM creations WHERE device_hash = ?').bind(hash).first();
  const replaced = existing !== null;
  const now = Date.now();
  const id = newPieceId();

  await db
    .prepare(
      `INSERT INTO creations (device_hash, piece_id, name, nick, width, height, cells, likes, flagged, hidden, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, ?)
       ON CONFLICT(device_hash) DO UPDATE SET
         piece_id = excluded.piece_id, name = excluded.name, nick = excluded.nick,
         width = excluded.width, height = excluded.height, cells = excluded.cells,
         likes = 0, flagged = 0, hidden = 0, updated_at = excluded.updated_at`,
    )
    .bind(hash, id, parsed.name, parsed.nick, parsed.width, parsed.height, encodeCells(parsed.cells), now, now)
    .run();

  return json({ id, likes: 0, replaced });
}
