-- Gallery schema — run once in the Cloudflare dashboard (D1 console) or via
-- wrangler d1 execute <db> --remote --file=functions/schema.sql
-- 👤 步骤见 docs/tintbrew/PLAN.md 当日时间线。
-- 2026-11-03 like-economy update: existing installs must ALSO run the
-- migration block at the bottom (creations rebuild for multi-piece).

CREATE TABLE IF NOT EXISTS creations (
  device_hash TEXT NOT NULL,
  piece_id   TEXT UNIQUE NOT NULL,
  name       TEXT NOT NULL,
  nick       TEXT NOT NULL,
  width      INTEGER NOT NULL,
  height     INTEGER NOT NULL,
  cells      TEXT NOT NULL,       -- compact palette encoding (lib/gallery.ts encodeCells)
  likes      INTEGER NOT NULL DEFAULT 0,
  flagged    INTEGER NOT NULL DEFAULT 0,
  hidden     INTEGER NOT NULL DEFAULT 0,  -- auto-hidden at 3 flags, or mod via UPDATE
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (device_hash, piece_id)  -- multi-piece: one author, N pieces (slots)
);

-- ranking scan: likes desc, tie-break first-published-first (created_at asc)
CREATE INDEX IF NOT EXISTS idx_creations_rank ON creations (hidden, likes DESC, created_at ASC);

-- one vote per device per UTC hour, whatever the target piece
CREATE TABLE IF NOT EXISTS vote_log (
  device_hash TEXT NOT NULL,
  hour        TEXT NOT NULL,
  piece_id    TEXT NOT NULL,
  PRIMARY KEY (device_hash, hour)
);

-- publish rate limit: 3 publishes per device per UTC hour (covers replacing)
CREATE TABLE IF NOT EXISTS publish_log (
  device_hash TEXT NOT NULL,
  hour        TEXT NOT NULL,
  count       INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (device_hash, hour)
);

-- like-economy wallet: credits earned from likes OTHERS leave on your
-- pieces; their single use is buying extra gallery slots.
CREATE TABLE IF NOT EXISTS authors (
  device_hash TEXT PRIMARY KEY,
  credits     INTEGER NOT NULL DEFAULT 0,
  slots       INTEGER NOT NULL DEFAULT 1,
  created_at  INTEGER NOT NULL
);

-- ---------------------------------------------------------------------------
-- 👤 MIGRATION for installs created before 2026-11-03 (run once, in order).
-- SQLite cannot alter a PRIMARY KEY, so creations is rebuilt. No data loss:
-- every row is copied, piece_id stays UNIQUE, the ranking index is recreated.
--
--   CREATE TABLE creations_new (
--     device_hash TEXT NOT NULL,
--     piece_id   TEXT UNIQUE NOT NULL,
--     name       TEXT NOT NULL,
--     nick       TEXT NOT NULL,
--     width      INTEGER NOT NULL,
--     height     INTEGER NOT NULL,
--     cells      TEXT NOT NULL,
--     likes      INTEGER NOT NULL DEFAULT 0,
--     flagged    INTEGER NOT NULL DEFAULT 0,
--     hidden     INTEGER NOT NULL DEFAULT 0,
--     created_at INTEGER NOT NULL,
--     updated_at INTEGER NOT NULL,
--     PRIMARY KEY (device_hash, piece_id)
--   );
--   INSERT INTO creations_new SELECT device_hash, piece_id, name, nick, width, height, cells, likes, flagged, hidden, created_at, updated_at FROM creations;
--   DROP TABLE creations;
--   ALTER TABLE creations_new RENAME TO creations;
--   CREATE INDEX IF NOT EXISTS idx_creations_rank ON creations (hidden, likes DESC, created_at ASC);
--   CREATE TABLE IF NOT EXISTS authors (device_hash TEXT PRIMARY KEY, credits INTEGER NOT NULL DEFAULT 0, slots INTEGER NOT NULL DEFAULT 1, created_at INTEGER NOT NULL);

-- ===========================================================================
-- Coloring gallery (2026-11-03) — 210 pieces, sequential daily unlock.
-- Payloads live in coloring_assets (NOT public static files): /api/coloring/
-- asset serves them only after the unlock check, so unlocked art can't be
-- scraped from the public pages. Line art PNGs stay public (SEO content).
-- ===========================================================================

-- vector payloads: {w,h,bg,pal,r:["x,y x,y ..."],rc:[palIdx]} as compact JSON.
-- ord = complexity order (index in the catalog, 0-based); rings = ring count
-- (publish validation + display). The endpoints read ord/rings from here
-- instead of importing src/data/ (Pages bundler limitation).
CREATE TABLE IF NOT EXISTS coloring_assets (
  slug  TEXT PRIMARY KEY,
  ord   INTEGER NOT NULL,
  rings INTEGER NOT NULL,
  data  TEXT NOT NULL
);

-- per-device unlock state: unlocked = count of accessible pieces (1-based
-- count of the ordered catalog); one NEW unlock per UTC day.
CREATE TABLE IF NOT EXISTS coloring_progress (
  device_hash      TEXT PRIMARY KEY,
  unlocked         INTEGER NOT NULL DEFAULT 1,
  last_unlock_date TEXT,                -- 'YYYY-MM-DD' UTC of last unlock
  updated_at       INTEGER NOT NULL
);

-- completion marks (gate for unlocking the next piece in order)
CREATE TABLE IF NOT EXISTS coloring_done (
  device_hash TEXT NOT NULL,
  slug        TEXT NOT NULL,
  done_at     INTEGER NOT NULL,
  PRIMARY KEY (device_hash, slug)
);

-- published colored artwork. colors = ringIdx->palIdx compact string, one
-- char per ring (base36 palette index). preview = base64 WebP thumbnail the
-- client renders at publish time (~10-30 KB) — the gallery serves it via
-- /api/coloring/preview without ever exposing the vector payload (that
-- stays unlock-gated in coloring_assets). Publish dates visible on gallery
-- cards: created_at = first publish, updated_at = last re-publish.
CREATE TABLE IF NOT EXISTS coloring_creations (
  device_hash TEXT NOT NULL,
  piece_id    TEXT UNIQUE NOT NULL,
  slug        TEXT NOT NULL,
  name        TEXT NOT NULL,
  nick        TEXT NOT NULL,
  colors      TEXT NOT NULL,
  preview     TEXT,
  likes       INTEGER NOT NULL DEFAULT 0,
  flagged     INTEGER NOT NULL DEFAULT 0,
  hidden      INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL,
  PRIMARY KEY (device_hash, piece_id)
);
CREATE INDEX IF NOT EXISTS idx_coloring_creations_rank
  ON coloring_creations (hidden, likes DESC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_coloring_creations_slug
  ON coloring_creations (slug, hidden, likes DESC);

-- one vote per device per UTC hour, shared shape with the perler gallery
CREATE TABLE IF NOT EXISTS coloring_vote_log (
  device_hash TEXT NOT NULL,
  hour        TEXT NOT NULL,
  piece_id    TEXT NOT NULL,
  PRIMARY KEY (device_hash, hour)
);

-- 👤 MIGRATION for installs created before 2026-11-03: shared wallet gains a
-- separate slot pool for the coloring gallery (same credits balance).
--   ALTER TABLE authors ADD COLUMN coloring_slots INTEGER NOT NULL DEFAULT 1;
