/**
 * POST /api/coloring/like — one vote per device per UTC hour across BOTH
 * galleries (vote_log is shared; coloring votes land in coloring_vote_log,
 * same composite-PK dedup). Body: { uuid, pieceId }.
 *
 * Same like economy as the perler gallery: every vote bumps likes; a vote
 * from someone else also credits the author's shared wallet (+1). Self-votes
 * count but never mint credits.
 */
import { hourBucket } from '../gallery/_kernel';
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

  const vote = await db
    .prepare(
      'INSERT INTO coloring_vote_log (device_hash, hour, piece_id) VALUES (?, ?, ?) ON CONFLICT(device_hash, hour) DO NOTHING',
    )
    .bind(hash, hourBucket(), pieceId)
    .run();
  if ((vote.meta?.changes ?? 0) === 0) return json({ error: 'one-per-hour' }, 429);

  const target = await db
    .prepare('SELECT device_hash FROM coloring_creations WHERE piece_id = ? AND hidden = 0')
    .bind(pieceId)
    .first<{ device_hash: string }>();
  if (!target) return json({ error: 'not-found' }, 404);

  const bump = await db
    .prepare('UPDATE coloring_creations SET likes = likes + 1 WHERE piece_id = ? AND hidden = 0')
    .bind(pieceId)
    .run();
  if ((bump.meta?.changes ?? 0) === 0) return json({ error: 'not-found' }, 404);

  // a like from someone else credits the author's shared wallet (self-votes
  // don't mint credits — that inflow guard is what keeps credits honest)
  if (target.device_hash !== hash) {
    await db
      .prepare(
        `INSERT INTO authors (device_hash, credits, slots, created_at) VALUES (?, 1, 1, ?)
         ON CONFLICT(device_hash) DO UPDATE SET credits = credits + 1`,
      )
      .bind(target.device_hash, Date.now())
      .run();
  }

  return json({ ok: true });
}
