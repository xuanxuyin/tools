/**
 * GET /api/coloring/list?limit=100&d=<uuid>&slug=<piece-slug>
 * Ranked colored artwork (likes desc, first published first), the caller's
 * own pieces in any state, and their wallet (shared credits + the coloring
 * slot pool). Optional slug filters everything to one base piece.
 * Same fail-soft rules as the perler list: a pre-migration DB must never
 * take the public ranking down.
 */
import type { Ctx, D1Db } from './_shared';
import { deviceHash, json } from './_shared';

interface Row {
  piece_id: string;
  slug: string;
  name: string;
  nick: string;
  colors: string;
  likes: number;
  hidden: number;
  created_at: number;
  updated_at: number;
}

const COLUMNS = 'piece_id, slug, name, nick, colors, likes, hidden, created_at, updated_at';

// colors stays encoded here — the island renders rings from the base payload
// and overlays this string; decoding server-side would just re-encode it.
function piece(r: Row) {
  return {
    id: r.piece_id,
    slug: r.slug,
    name: r.name,
    nick: r.nick,
    colors: r.colors,
    likes: r.likes,
    hidden: r.hidden === 1,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

export async function onRequestGet(ctx: Ctx): Promise<Response> {
  const url = new URL(ctx.request.url);
  const limitRaw = Number(url.searchParams.get('limit') ?? '100');
  const limit = Math.min(100, Math.max(1, Number.isFinite(limitRaw) ? Math.round(limitRaw) : 100));
  const slug = (url.searchParams.get('slug') ?? '').replace(/[^a-z0-9-]/g, '');
  const db: D1Db = ctx.env.GALLERY_DB;

  const bySlug = slug ? ' AND slug = ?' : '';
  const bind: unknown[] = slug ? [slug, limit] : [limit];
  const ranked = await db
    .prepare(
      `SELECT ${COLUMNS} FROM coloring_creations WHERE hidden = 0${bySlug} ORDER BY likes DESC, created_at ASC LIMIT ?`,
    )
    .bind(...bind)
    .all<Row>();
  const pieces = (ranked.results ?? []).map(piece);

  let mine: ReturnType<typeof piece>[] = [];
  let wallet: { credits: number; coloringSlots: number } | null = null;
  const d = url.searchParams.get('d');
  if (d && typeof d === 'string' && d.length >= 8 && d.length <= 64) {
    const hash = await deviceHash(ctx.env, d);
    try {
      const own = await db
        .prepare(`SELECT ${COLUMNS} FROM coloring_creations WHERE device_hash = ? ORDER BY created_at DESC`)
        .bind(hash)
        .all<Row>();
      mine = (own.results ?? []).map(piece);
    } catch {
      mine = [];
    }
    try {
      const w = await db
        .prepare('SELECT credits, coloring_slots FROM authors WHERE device_hash = ?')
        .bind(hash)
        .first<{ credits: number; coloring_slots: number }>();
      if (w) wallet = { credits: w.credits, coloringSlots: w.coloring_slots };
    } catch {
      wallet = null; // pre-migration DB — the wallet UI simply stays hidden
    }
  }

  return json({ pieces, mine, wallet });
}
