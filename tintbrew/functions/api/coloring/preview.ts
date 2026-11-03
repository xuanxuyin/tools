/**
 * GET /api/coloring/preview?piece=<id> — the client-rendered WebP thumbnail
 * of a published colored piece (base64 in coloring_creations.preview, no
 * vector data: the payload itself stays unlock-gated). Long cache — a
 * re-publish bumps updated_at, and the island cache-busts with ?v=.
 */
import type { Ctx } from './_shared';
import { json } from './_shared';

export async function onRequestGet(ctx: Ctx): Promise<Response> {
  const url = new URL(ctx.request.url);
  const pieceId = (url.searchParams.get('piece') ?? '').replace(/[^a-z0-9]/g, '');
  if (!/^[0-9a-z]{4,24}$/.test(pieceId)) return json({ error: 'bad-request' }, 400);

  const row = await ctx.env.GALLERY_DB.prepare(
    'SELECT preview, updated_at FROM coloring_creations WHERE piece_id = ? AND hidden = 0',
  )
    .bind(pieceId)
    .first<{ preview: string | null; updated_at: number }>();
  if (!row?.preview) return json({ error: 'not-found' }, 404);

  const bytes = Uint8Array.from(atob(row.preview), (ch) => ch.charCodeAt(0));
  return new Response(bytes, {
    status: 200,
    headers: {
      'content-type': 'image/webp',
      'cache-control': 'public, max-age=86400',
    },
  });
}
