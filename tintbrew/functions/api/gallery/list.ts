/**
 * GET /api/gallery/list?limit=100&d=<uuid>
 * Ranked list (likes desc, tie-break: first published ranks first), the
 * caller's gallery (every piece, any state — hidden ones show "under
 * review" to their author), and their wallet (credits/slots). Cells come
 * back decoded so the island renders directly; corrupt rows degrade to
 * nulls instead of failing the list.
 */
import { decodeCells } from './_kernel';
import type { Ctx, D1Db } from './_shared';
import { deviceHash, json } from './_shared';

interface Row {
  piece_id: string;
  name: string;
  nick: string;
  width: number;
  height: number;
  cells: string;
  likes: number;
  hidden: number;
  created_at: number;
  updated_at: number;
}

const COLUMNS = 'piece_id, name, nick, width, height, cells, likes, hidden, created_at, updated_at';

function piece(r: Row) {
  return {
    id: r.piece_id,
    name: r.name,
    nick: r.nick,
    width: r.width,
    height: r.height,
    cells: decodeCells(r.cells),
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
  const db: D1Db = ctx.env.GALLERY_DB;

  const ranked = await db
    .prepare(`SELECT ${COLUMNS} FROM creations WHERE hidden = 0 ORDER BY likes DESC, created_at ASC LIMIT ?`)
    .bind(limit)
    .all<Row>();
  const pieces = (ranked.results ?? []).map(piece);

  // mine: every piece in any state + the like-economy wallet (credits and
  // gallery slots). Absent uuid → null wallet, empty gallery. Each lookup
  // fails soft: a pre-migration DB (no authors table) must never take the
  // public ranking down with it — the ranking above renders regardless.
  let mine: ReturnType<typeof piece>[] = [];
  let wallet: { credits: number; slots: number } | null = null;
  const d = url.searchParams.get('d');
  if (d && typeof d === 'string' && d.length >= 8 && d.length <= 64) {
    const hash = await deviceHash(ctx.env, d);
    try {
      const own = await db
        .prepare(`SELECT ${COLUMNS} FROM creations WHERE device_hash = ? ORDER BY created_at DESC`)
        .bind(hash)
        .all<Row>();
      mine = (own.results ?? []).map(piece);
    } catch {
      mine = [];
    }
    try {
      const w = await db
        .prepare('SELECT credits, slots FROM authors WHERE device_hash = ?')
        .bind(hash)
        .first<{ credits: number; slots: number }>();
      if (w) wallet = { credits: w.credits, slots: w.slots };
    } catch {
      wallet = null; // pre-migration DB — the wallet UI simply stays hidden
    }
  }

  return json({ pieces, mine, wallet });
}
