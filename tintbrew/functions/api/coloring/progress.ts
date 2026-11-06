/**
 * GET /api/coloring/progress?d= — per-device unlock state + done slugs.
 * The hub page and the coloring page both call this on load.
 */
import { deviceHash, json } from './_shared';
import { ensureProgress } from './_shared';
import type { Ctx } from './_shared';

export async function onRequestGet(ctx: Ctx): Promise<Response> {
  const url = new URL(ctx.request.url);
  const uuid = url.searchParams.get('d') ?? '';
  if (!uuid) return json({ error: 'bad-request' }, 400);
  const hash = await deviceHash(ctx.env, uuid);
  const now = Date.now();
  const prog = await ensureProgress(ctx.env, hash, now);
  const done = await ctx.env.GALLERY_DB.prepare(
    'SELECT slug FROM coloring_done WHERE device_hash = ?',
  )
    .bind(hash)
    .all<{ slug: string }>();
  return json({
    unlocked: (ctx.env as { DEV_UNLOCK_ALL?: string }).DEV_UNLOCK_ALL
      ? 9999
      : prog.unlocked,
    lastUnlockDate: prog.last_unlock_date,
    done: (done.results ?? []).map((r) => r.slug),
  });
}
