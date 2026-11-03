-- 👤 one-shot D1 setup for tintbrew-gallery (2026-11-03).
-- Wipes the old perler gallery tables (user-approved: old data is disposable)
-- and creates every table at the current shape, including the coloring set.
-- Run in the CF dashboard D1 console, or:
--   npx wrangler d1 execute tintbrew-gallery --remote --file scripts/coloring-d1/000-setup.sql

-- ---- drop old-shape tables (publish/vote logs too — fresh start)
DROP TABLE IF EXISTS creations;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS vote_log;
DROP TABLE IF EXISTS publish_log;

-- ---- perler gallery
CREATE TABLE creations (
  device_hash TEXT NOT NULL,
  piece_id   TEXT UNIQUE NOT NULL,
  name       TEXT NOT NULL,
  nick       TEXT NOT NULL,
  width      INTEGER NOT NULL,
  height     INTEGER NOT NULL,
  cells      TEXT NOT NULL,
  likes      INTEGER NOT NULL DEFAULT 0,
  flagged    INTEGER NOT NULL DEFAULT 0,
  hidden     INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (device_hash, piece_id)
);
CREATE INDEX idx_creations_rank ON creations (hidden, likes DESC, created_at ASC);

CREATE TABLE vote_log (
  device_hash TEXT NOT NULL,
  hour        TEXT NOT NULL,
  piece_id    TEXT NOT NULL,
  PRIMARY KEY (device_hash, hour)
);

CREATE TABLE publish_log (
  device_hash TEXT NOT NULL,
  hour        TEXT NOT NULL,
  count       INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (device_hash, hour)
);

CREATE TABLE authors (
  device_hash    TEXT PRIMARY KEY,
  credits        INTEGER NOT NULL DEFAULT 0,
  slots          INTEGER NOT NULL DEFAULT 1,
  coloring_slots INTEGER NOT NULL DEFAULT 1,
  created_at     INTEGER NOT NULL
);

-- ---- coloring gallery
CREATE TABLE coloring_assets (
  slug  TEXT PRIMARY KEY,
  ord   INTEGER NOT NULL,
  rings INTEGER NOT NULL,
  data  TEXT NOT NULL
);
CREATE TABLE coloring_progress (
  device_hash      TEXT PRIMARY KEY,
  unlocked         INTEGER NOT NULL DEFAULT 1,
  last_unlock_date TEXT,
  updated_at       INTEGER NOT NULL
);
CREATE TABLE coloring_done (
  device_hash TEXT NOT NULL,
  slug        TEXT NOT NULL,
  done_at     INTEGER NOT NULL,
  PRIMARY KEY (device_hash, slug)
);
CREATE TABLE coloring_creations (
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
CREATE INDEX idx_coloring_creations_rank ON coloring_creations (hidden, likes DESC, created_at ASC);
CREATE INDEX idx_coloring_creations_slug ON coloring_creations (slug, hidden, likes DESC);
CREATE TABLE coloring_vote_log (
  device_hash TEXT NOT NULL,
  hour        TEXT NOT NULL,
  piece_id    TEXT NOT NULL,
  PRIMARY KEY (device_hash, hour)
);
