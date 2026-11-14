/**
 * POST /api/coloring/complete {slug, d} — legacy completion endpoint from
 * the tap-to-fill era: old clients still running cached JS call it when
 * every ring was filled. Since 2026-11-13 publish.ts marks pieces done on
 * publish, so new clients never POST here; both paths stay idempotent.
 * The done set gates unlocking the next piece.
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
