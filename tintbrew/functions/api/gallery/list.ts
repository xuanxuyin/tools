/**
 * GET /api/gallery/list?limit=100&d=<uuid>
 * Ranked list (likes desc, then most recent) + the caller's own piece if
 * the uuid matches one. Cells come back decoded so the island renders
 * directly; corrupt rows degrade to nulls instead of failing the list.
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
    .prepare(`SELECT ${COLUMNS} FROM creations WHERE hidden = 0 ORDER BY likes DESC, updated_at DESC LIMIT ?`)
    .bind(limit)
    .all<Row>();
  const pieces = (ranked.results ?? []).map(piece);

  // mine: any state (hidden pieces still show as "under review" to their author)
  let mine: ReturnType<typeof piece> | null = null;
  const d = url.searchParams.get('d');
  if (d && typeof d === 'string' && d.length >= 8 && d.length <= 64) {
    const hash = await deviceHash(ctx.env, d);
    const own = await db
      .prepare(`SELECT ${COLUMNS} FROM creations WHERE device_hash = ?`)
      .bind(hash)
      .first<Row>();
    if (own) mine = piece(own);
  }

  return json({ pieces, mine });
}
