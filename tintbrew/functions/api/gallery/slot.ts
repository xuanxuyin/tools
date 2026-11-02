/**
 * POST /api/gallery/slot — spend credits to unlock one more gallery slot
 * (ECONOMY.slotCost per slot, hard-capped at ECONOMY.maxSlots).
 * Body: { uuid }. Returns the refreshed wallet.
 */
import { ECONOMY } from './_kernel';
import type { Ctx } from './_shared';
import { deviceHash, json, readJson } from './_shared';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const body = await readJson(ctx.request);
  const uuid = typeof body.uuid === 'string' ? body.uuid : '';
  if (uuid.length < 8 || uuid.length > 64) return json({ error: 'bad-request' }, 400);

  const db = ctx.env.GALLERY_DB;
  const hash = await deviceHash(ctx.env, uuid);

  const guarded = await db
    .prepare(
      `UPDATE authors SET credits = credits - ${ECONOMY.slotCost}, slots = slots + 1
       WHERE device_hash = ? AND credits >= ${ECONOMY.slotCost} AND slots < ${ECONOMY.maxSlots}`,
    )
    .bind(hash)
    .run();
  if ((guarded.meta?.changes ?? 0) === 0) {
    const w = await db
      .prepare('SELECT credits, slots FROM authors WHERE device_hash = ?')
      .bind(hash)
      .first<{ credits: number; slots: number }>();
    if (!w || w.credits < ECONOMY.slotCost) return json({ error: 'no-credits' }, 402);
    return json({ error: 'slot-max' }, 409);
  }

  const w = await db
    .prepare('SELECT credits, slots FROM authors WHERE device_hash = ?')
    .bind(hash)
    .first<{ credits: number; slots: number }>();
  return json({ ok: true, credits: w?.credits ?? 0, slots: w?.slots ?? 1 });
}
