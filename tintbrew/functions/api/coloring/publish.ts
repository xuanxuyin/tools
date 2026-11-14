/**
 * POST /api/coloring/publish — save a colored piece into the coloring
 * gallery. Body: { uuid, slug, name, nick, colors, pieceId? }.
 * colors = one base36 char per ring (palette index, '.' = empty), length
 * must equal the piece's ring count in coloring_assets. Since the paint
 * island went freehand (2026-11-13) the island ships dots-only — the
 * artwork itself travels as the client-rendered WebP preview; the ring
 * encoding is kept only for schema compatibility.
 *
 * A publish also marks the piece done (coloring_done): with no fill
 * counter any more, publishing IS the completion event that gates
 * unlocking the next page.
 *
 * Same slot economy as the perler gallery but a separate pool
 * (authors.coloring_slots): 1 slot to start, likes-from-others credit the
 * shared wallet, 100 credits = one more slot (cap 5, slot.ts). A publish
 * with pieceId that you own UPDATES it in place (re-publish refreshes
 * updated_at; created_at keeps the original gallery date). Rate limit:
 * 3 publishes per device per UTC hour (shared publish_log).
 */
import { hourBucket, newPieceId } from '../gallery/_kernel';
import type { Ctx } from './_shared';
import { deviceHash, json, readJson } from './_shared';
import { COLORING_ECONOMY, validateColoringPublish } from './_kernel';

const PUBLISH_LIMIT = 3;

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const body = await readJson(ctx.request);
  const uuid = typeof body.uuid === 'string' ? body.uuid : '';
  const slug = typeof body.slug === 'string' ? body.slug.replace(/[^a-z0-9-]/g, '') : '';
  if (uuid.length < 8 || uuid.length > 64 || !slug) return json({ error: 'bad-request' }, 400);

  const db = ctx.env.GALLERY_DB;
  const hash = await deviceHash(ctx.env, uuid);

  // the device must actually have unlocked this piece before publishing it
  const asset = await db
    .prepare('SELECT ord, rings FROM coloring_assets WHERE slug = ?')
    .bind(slug)
    .first<{ ord: number; rings: number }>();
  if (!asset) return json({ error: 'not-found' }, 404);
  const prog = await db
    .prepare('SELECT unlocked FROM coloring_progress WHERE device_hash = ?')
    .bind(hash)
    .first<{ unlocked: number }>();
  if ((prog?.unlocked ?? 1) <= asset.ord) return json({ error: 'locked' }, 403);

  const parsed = validateColoringPublish(body.name, body.nick, body.colors, asset.rings);
  if ('error' in parsed) return json({ error: parsed.error }, 400);

  // optional gallery thumbnail: the island renders its own canvas at publish
  // time and ships a WebP dataURL. Stored base64-only; /api/coloring/preview
  // serves it back with the right content-type.
  let preview: string | null = null;
  if (typeof body.preview === 'string' && body.preview.length > 0) {
    const m = /^data:image\/webp;base64,([A-Za-z0-9+/=]+)$/.exec(body.preview);
    if (!m || m[1].length > 200_000) return json({ error: 'bad-preview' }, 400);
    preview = m[1];
  }

  // rate limit — shared with the perler gallery's publish budget
  const lim = await db
    .prepare(
      `INSERT INTO publish_log (device_hash, hour, count) VALUES (?, ?, 1)
       ON CONFLICT(device_hash, hour) DO UPDATE SET count = count + 1 WHERE count < ${PUBLISH_LIMIT}`,
    )
    .bind(hash, hourBucket())
    .run();
  if ((lim.meta?.changes ?? 0) === 0) return json({ error: 'rate-limited' }, 429);

  const now = Date.now();
  // publish = done (2026-11-13): the freehand-brush island no longer counts
  // filled regions, so this insert is what lets the next page unlock —
  // only on successful paths (a 409/429 must not mark the piece done)
  const markDone = () =>
    db
      .prepare('INSERT INTO coloring_done (device_hash, slug, done_at) VALUES (?, ?, ?) ON CONFLICT DO NOTHING')
      .bind(hash, slug, now)
      .run();

  const repieceId = typeof body.pieceId === 'string' ? body.pieceId : '';
  if (repieceId && /^[0-9a-z]{4,24}$/.test(repieceId)) {
    // re-publish: refresh the artwork in place, keep the original date
    const upd = await db
      .prepare(
        `UPDATE coloring_creations SET name = ?, nick = ?, colors = ?, preview = COALESCE(?, preview), updated_at = ?
         WHERE piece_id = ? AND device_hash = ?`,
      )
      .bind(parsed.name, parsed.nick, parsed.colors, preview, now, repieceId, hash)
      .run();
    if ((upd.meta?.changes ?? 0) > 0) {
      await markDone();
      return json({ id: repieceId, updated: true });
    }
  }

  const slotRow = await db
    .prepare('SELECT coloring_slots FROM authors WHERE device_hash = ?')
    .bind(hash)
    .first<{ coloring_slots: number }>()
    .catch(() => null);
  const slots = slotRow?.coloring_slots ?? 1;
  const used = await db
    .prepare('SELECT COUNT(*) AS n FROM coloring_creations WHERE device_hash = ?')
    .bind(hash)
    .first<{ n: number }>();
  if ((used?.n ?? 0) >= slots) return json({ error: 'slot-full' }, 409);

  const id = newPieceId();
  await db
    .prepare(
      `INSERT INTO coloring_creations (device_hash, piece_id, slug, name, nick, colors, preview, likes, flagged, hidden, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, ?)`,
    )
    .bind(hash, id, slug, parsed.name, parsed.nick, parsed.colors, preview, now, now)
    .run();
  await markDone();

  return json({ id, likes: 0, used: (used?.n ?? 0) + 1, slots });
}
