/**
 * POST /api/gallery/publish — add a piece to the caller's gallery.
 * Body: { uuid, name, nick, width, height, grid } (grid = editor's
 * (string|null)[][] rows of Mardiy ids).
 *
 * Slot economy (2026-11-03): an author starts with 1 slot; likes received
 * from others credit a wallet, and 100 credits unlock one more slot (cap 5,
 * see slot.ts). A publish with a free slot INSERTs a new piece; with none
 * it answers 409 slot-full (client points at the expand/delete actions).
 * Rate limit: 3 publishes per device per UTC hour.
 */
import { encodeCells, hourBucket, newPieceId, validatePublish } from './_kernel';
import type { Ctx } from './_shared';
import { deviceHash, json, readJson } from './_shared';

const PUBLISH_LIMIT = 3;

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const body = await readJson(ctx.request);
  const parsed = validatePublish(body as never);
  if (!parsed.ok) return json({ error: parsed.reason }, 400);

  const db = ctx.env.GALLERY_DB;
  const hash = await deviceHash(ctx.env, body.uuid as string);

  // rate limit — INSERT .. ON CONFLICT .. WHERE keeps changes at 0 past the cap
  const lim = await db
    .prepare(
      `INSERT INTO publish_log (device_hash, hour, count) VALUES (?, ?, 1)
       ON CONFLICT(device_hash, hour) DO UPDATE SET count = count + 1 WHERE count < ${PUBLISH_LIMIT}`,
    )
    .bind(hash, hourBucket())
    .run();
  if ((lim.meta?.changes ?? 0) === 0) return json({ error: 'rate-limited' }, 429);

  const slotRow = await db
    .prepare('SELECT slots FROM authors WHERE device_hash = ?')
    .bind(hash)
    .first<{ slots: number }>();
  const slots = slotRow?.slots ?? 1;
  const used = await db
    .prepare('SELECT COUNT(*) AS n FROM creations WHERE device_hash = ?')
    .bind(hash)
    .first<{ n: number }>();
  if ((used?.n ?? 0) >= slots) return json({ error: 'slot-full' }, 409);

  const now = Date.now();
  const id = newPieceId();
  await db
    .prepare(
      `INSERT INTO creations (device_hash, piece_id, name, nick, width, height, cells, likes, flagged, hidden, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, ?)`,
    )
    .bind(hash, id, parsed.name, parsed.nick, parsed.width, parsed.height, encodeCells(parsed.cells), now, now)
    .run();

  return json({ id, likes: 0, used: (used?.n ?? 0) + 1, slots });
}
