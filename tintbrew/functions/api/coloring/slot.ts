/**
 * POST /api/coloring/slot — spend shared credits to unlock one more coloring
 * gallery slot (COLORING_ECONOMY.slotCost each, hard cap maxSlots). The slot
 * pool is separate from the perler pool (authors.coloring_slots); the credit
 * balance is the same wallet. Body: { uuid }. Returns the refreshed wallet.
 */
import type { Ctx } from './_shared';
import { deviceHash, json, readJson } from './_shared';
import { COLORING_ECONOMY } from './_kernel';

const { slotCost, maxSlots } = COLORING_ECONOMY;

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const body = await readJson(ctx.request);
  const uuid = typeof body.uuid === 'string' ? body.uuid : '';
  if (uuid.length < 8 || uuid.length > 64) return json({ error: 'bad-request' }, 400);

  const db = ctx.env.GALLERY_DB;
  const hash = await deviceHash(ctx.env, uuid);

  const guarded = await db
    .prepare(
      `UPDATE authors SET credits = credits - ${slotCost}, coloring_slots = coloring_slots + 1
       WHERE device_hash = ? AND credits >= ${slotCost} AND coloring_slots < ${maxSlots}`,
    )
    .bind(hash)
    .run()
    .catch(() => ({ meta: { changes: 0 } }));
  if ((guarded.meta?.changes ?? 0) === 0) {
    const w = await db
      .prepare('SELECT credits, coloring_slots FROM authors WHERE device_hash = ?')
      .bind(hash)
      .first<{ credits: number; coloring_slots: number }>()
      .catch(() => null);
    if (!w || w.credits < slotCost) return json({ error: 'no-credits' }, 402);
    return json({ error: 'slot-max' }, 409);
  }

  const w = await db
    .prepare('SELECT credits, coloring_slots FROM authors WHERE device_hash = ?')
    .bind(hash)
    .first<{ credits: number; coloring_slots: number }>();
  return json({ ok: true, credits: w?.credits ?? 0, coloringSlots: w?.coloring_slots ?? 1 });
}
