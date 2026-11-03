/**
 * POST /api/coloring/unlock {slug, d} — unlock the next piece in order.
 * Gates (checkUnlock in _kernel): must be exactly next; previous piece
 * completed; max one new unlock per UTC day.
 */
import { deviceHash, ensureProgress, json, readJson } from './_shared';
import { checkUnlock, todayUtc } from './_kernel';
import type { Ctx } from './_shared';

export async function onRequestPost(ctx: Ctx): Promise<Response> {
  const body = await readJson(ctx.request);
  const uuid = typeof body.d === 'string' ? body.d : '';
  const slug = typeof body.slug === 'string' ? body.slug.replace(/[^a-z0-9-]/g, '') : '';
  if (!uuid || !slug) return json({ error: 'bad-request' }, 400);

  const row = await ctx.env.GALLERY_DB.prepare(
    'SELECT ord FROM coloring_assets WHERE slug = ?',
  )
    .bind(slug)
    .first<{ ord: number }>();
  if (!row) return json({ error: 'not-found' }, 404);

  const hash = await deviceHash(ctx.env, uuid);
  const now = Date.now();
  const prog = await ensureProgress(ctx.env, hash, now);
  const prevSlug = await ctx.env.GALLERY_DB.prepare(
    'SELECT slug FROM coloring_assets WHERE ord = ?',
  )
    .bind(row.ord - 1)
    .first<{ slug: string }>();
  const prevDone = !prevSlug
    ? true
    : !!(await ctx.env.GALLERY_DB.prepare(
        'SELECT 1 AS x FROM coloring_done WHERE device_hash = ? AND slug = ?',
      )
        .bind(hash, prevSlug.slug)
        .first());

  const verdict = checkUnlock(
    { unlocked: prog.unlocked, lastUnlockDate: prog.last_unlock_date },
    { ord: row.ord, rings: 0 },
    prevDone,
    todayUtc(),
  );
  if (!verdict.ok) return json({ error: verdict.reason }, 409);

  const unlocked = prog.unlocked + 1;
  await ctx.env.GALLERY_DB.prepare(
    'UPDATE coloring_progress SET unlocked = ?, last_unlock_date = ?, updated_at = ? WHERE device_hash = ?',
  )
    .bind(unlocked, todayUtc(), now, hash)
    .run();
  return json({ unlocked });
}
