/**
 * POST /api/coloring/complete {slug, d} — mark a piece done (every ring
 * filled, verified client-side against the payload the device already has).
 * The done set gates unlocking the next piece. Idempotent.
 */
import { deviceHash, json, readJson } from './_shared';
import type { Ctx } from './_shared';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const body = await readJson(ctx.request);
  const uuid = typeof body.d === 'string' ? body.d : '';
  const slug = typeof body.slug === 'string' ? body.slug.replace(/[^a-z0-9-]/g, '') : '';
  if (!uuid || !slug) return json({ error: 'bad-request' }, 400);

  const hash = await deviceHash(ctx.env, uuid);
  await ctx.env.GALLERY_DB.prepare(
    'INSERT INTO coloring_done (device_hash, slug, done_at) VALUES (?, ?, ?) ON CONFLICT DO NOTHING',
  )
    .bind(hash, slug, Date.now())
    .run();
  return json({ ok: true });
}
