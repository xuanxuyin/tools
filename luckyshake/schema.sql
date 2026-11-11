-- LuckyShake D1 schema (global draw counter + Google-OAuth accounts + reading history)
-- Apply: npx wrangler d1 execute luckyshake --file=./schema.sql  (or --local for dev)
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
