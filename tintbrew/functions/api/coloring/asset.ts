/**
 * GET /api/coloring/asset?slug=&d= — the vector payload for one piece, served
 * ONLY when the device has unlocked it. Public pages never embed payloads;
 * locked cards show the watermarked thumb instead.
 */
import { deviceHash, json } from './_shared';
import type { Ctx } from './_shared';

interface AssetRow {
  ord: number;
  data: string;
}

export async function onRequestGet(ctx: Ctx): Promise<Response> {
  const url = new URL(ctx.request.url);
  const uuid = url.searchParams.get('d') ?? '';
  const slug = (url.searchParams.get('slug') ?? '').replace(/[^a-z0-9-]/g, '');
  if (!uuid || !slug) return json({ error: 'bad-request' }, 400);

  const hash = await deviceHash(ctx.env, uuid);
  const prog = await ctx.env.GALLERY_DB.prepare(
    'SELECT unlocked FROM coloring_progress WHERE device_hash = ?',
  )
    .bind(hash)
    .first<{ unlocked: number }>();
  const unlocked = prog?.unlocked ?? 1;

  const row = await ctx.env.GALLERY_DB.prepare(
    'SELECT ord, data FROM coloring_assets WHERE slug = ?',
  )
    .bind(slug)
    .first<AssetRow>();
  if (!row) return json({ error: 'not-found' }, 404);
  if (row.ord >= unlocked) return json({ error: 'locked' }, 403);

  return new Response(row.data, {
    status: 200,
    headers: {
      'content-type': 'application/json',
      // per-device data: revalidatable, not shared-cacheable
      'cache-control': 'private, max-age=86400',
    },
  });
}
