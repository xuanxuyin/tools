-- Fortune Willow D1 schema (global draw counter + Google-OAuth accounts + reading history + merit box)
-- Apply: npx wrangler d1 execute fortunewillow --remote --file=./schema.sql  (drop --remote for local dev)
-- Pages binding: project → Settings → Bindings → D1, binding name `DB` → database `fortunewillow`.
CREATE TABLE IF NOT EXISTS counters (
  tool  TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS users (
  id         TEXT PRIMARY KEY,
  google_sub TEXT UNIQUE NOT NULL,
  email      TEXT,
  name       TEXT,
  picture    TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS history (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    TEXT NOT NULL REFERENCES users(id),
  tool       TEXT NOT NULL,
  sign_id    INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_history_user ON history (user_id, id DESC);

-- Communal merit-box counter (single row, lifetime total, never reset — 👤 2026-11-11)
CREATE TABLE IF NOT EXISTS merit_box (
  id    INTEGER PRIMARY KEY CHECK (id = 1),
  total INTEGER NOT NULL DEFAULT 0
);
