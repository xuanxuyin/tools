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
