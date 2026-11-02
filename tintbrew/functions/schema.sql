-- Gallery schema — run once in the Cloudflare dashboard (D1 console) or via
-- wrangler d1 execute <db> --remote --file=functions/schema.sql
-- 👤 步骤见 docs/tintbrew/PLAN.md 当日时间线。

CREATE TABLE IF NOT EXISTS creations (
  device_hash TEXT PRIMARY KEY,   -- one creation per device ("one person, one piece")
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
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_creations_rank ON creations (hidden, likes DESC, updated_at DESC);

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
