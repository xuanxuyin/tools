/**
 * Local full-stack preview — fills the hole `astro preview` leaves behind
 * (no Pages Functions there, so /api/merit folds away and 👤 can't see the
 * communal total while reviewing the zh layer).
 *
 *   node scripts/dev-server.mjs            → http://localhost:4399
 *
 * Serves dist/ statically and implements the two anonymous Functions with the
 * SAME SQL as their production counterparts (functions/api/merit.ts, count.ts)
 * on a local file DB (.fw-dev.db, git-ignored):
 *   GET/POST /api/merit  — communal merit box total
 *   GET/POST /api/count  — global free-draw counter
 * Everything else under /api/ → 404 (the client libs swallow that).
 * Rebuild first: npm run build. Wrangler replacement for the 11-13 "write EOF" regression.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const DB_FILE = fileURLToPath(new URL('../.fw-dev.db', import.meta.url));
const PORT = Number(process.env.PORT || 4399);

const db = new DatabaseSync(DB_FILE);
db.exec(`
  CREATE TABLE IF NOT EXISTS merit_box (id INTEGER PRIMARY KEY, total INTEGER NOT NULL DEFAULT 0);
  CREATE TABLE IF NOT EXISTS counters (tool TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0);
`);

const TOOLS = new Set([
  'fortune-stick', 'number-oracle', 'fortune-cookie',
  'magic-8-ball', 'coin-flip', 'yes-no', 'daily-fortune',
]);

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json',
};

const json = (body, status = 200) =>
  [status, { 'Content-Type': 'application/json' }, JSON.stringify(body)];

async function api(req, body) {
  if (req.url === '/api/merit') {
    if (req.method === 'GET') {
      const row = db.prepare('SELECT total FROM merit_box WHERE id = 1').get();
      return json({ total: row?.total ?? 0 });
    }
    if (req.method === 'POST') {
      const amount = Number(body?.amount);
      if (!Number.isInteger(amount) || amount < 1 || amount > 8) return json({ error: 'bad amount' }, 400);
      const row = db.prepare(
        'INSERT INTO merit_box (id, total) VALUES (1, ?1) ON CONFLICT(id) DO UPDATE SET total = total + ?1 RETURNING total',
      ).get(amount);
      return json({ ok: true, total: row.total });
    }
  }
  if (req.url === '/api/count') {
    if (req.method === 'GET') {
      const rows = db.prepare('SELECT tool, count FROM counters').all();
      const out = { total: 0 };
      for (const r of rows) { out[r.tool] = r.count; out.total += r.count; }
      return json(out);
    }
    if (req.method === 'POST') {
      if (!TOOLS.has(String(body?.tool ?? ''))) return json({ error: 'unknown tool' }, 400);
      db.prepare(
        'INSERT INTO counters (tool, count) VALUES (?1, 1) ON CONFLICT(tool) DO UPDATE SET count = count + 1',
      ).run(String(body.tool));
      return json({ ok: true });
    }
  }
  return json({ error: 'not found' }, 404);
}

createServer(async (req, res) => {
  try {
    if (req.url.startsWith('/api/')) {
      let body = null;
      if (req.method === 'POST') {
        const chunks = [];
        for await (const c of req) chunks.push(c);
        try { body = JSON.parse(Buffer.concat(chunks).toString() || '{}'); } catch { /* api() rejects */ }
      }
      const [status, headers, payload] = await api(req, body);
      res.writeHead(status, headers).end(payload);
      return;
    }
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = join(DIST, normalize(path).replace(/^([/\\])+/, ''));
    const tryFiles = extname(file) ? [file] : [join(file, 'index.html'), file + '.html'];
    let found = null;
    for (const f of tryFiles) {
      try { if ((await stat(f)).isFile()) { found = f; break; } } catch { /* next */ }
    }
    if (!found) found = join(DIST, '404.html');
    const data = await readFile(found);
    res.writeHead(200, { 'Content-Type': MIME[extname(found)] || 'application/octet-stream' }).end(data);
  } catch (e) {
    res.writeHead(500).end(String(e));
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`full-stack preview → http://localhost:${PORT}/  (dist + /api/merit + /api/count, db: .fw-dev.db)`);
});
