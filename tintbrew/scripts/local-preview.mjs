/**
 * Local preview server — browse the built site with EVERY coloring piece
 * unlocked, without wrangler/miniflare (workerd fails to start on some
 * Windows boxes) and without touching any real D1: /api/coloring/asset is
 * served from the packed SQL files in scripts/coloring-d1/, progress is a
 * stub, and complete/publish succeed without persisting anything.
 *
 * Usage: node scripts/local-preview.mjs   (build first: npm run build)
 * Then open http://localhost:4321/coloring/
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { readdirSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const DIST = join(ROOT, 'dist');
const PORT = Number(process.env.PORT ?? 4321);

// ---- load payloads from the packed SQL (INSERT slice + chained UPDATEs) ----
const payloads = new Map(); // slug -> { ord, rings, data }
const sqlDir = join(ROOT, 'scripts', 'coloring-d1');
const unq = (s) => s.replace(/''/g, "'");
for (const f of readdirSync(sqlDir).filter((f) => /^\d+\.sql$/.test(f)).sort()) {
  const sql = await readFile(join(sqlDir, f), 'utf8');
  for (const line of sql.split('\n')) {
    let m = line.match(
      /^INSERT OR REPLACE INTO coloring_assets \(slug, ord, rings, data\) VALUES \('([^']+)', (\d+), (\d+), '(.*)'\);$/,
    );
    if (m) {
      payloads.set(m[1], { ord: +m[2], rings: +m[3], data: unq(m[4]) });
      continue;
    }
    m = line.match(/^UPDATE coloring_assets SET data = data \|\| '(.*?)' WHERE slug = '([^']+)';$/);
    if (m) {
      const row = payloads.get(m[2]);
      if (!row) throw new Error(`${f}: UPDATE before INSERT for ${m[2]}`);
      row.data += unq(m[1]);
    }
  }
}
console.log(`local-preview: ${payloads.size} payloads from SQL packs`);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json' },
  });

createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const q = url.searchParams;

    // ---- API stubs (nothing persists; test away freely) ----
    if (url.pathname === '/api/coloring/progress') {
      if (!q.get('d')) return void res.writeHead(400).end('{"error":"bad-request"}');
      return void res.writeHead(200, { 'content-type': 'application/json' }).end(
        JSON.stringify({ unlocked: 9999, lastUnlockDate: null, done: [] }),
      );
    }
    if (url.pathname === '/api/coloring/asset') {
      const slug = (q.get('slug') ?? '').replace(/[^a-z0-9-]/g, '');
      if (!q.get('d') || !slug) return void res.writeHead(400).end('{"error":"bad-request"}');
      const row = payloads.get(slug);
      if (!row) return void res.writeHead(404).end('{"error":"not-found"}');
      return void res.writeHead(200, { 'content-type': 'application/json' }).end(row.data);
    }
    if (url.pathname.startsWith('/api/')) {
      // complete / publish / like / unlock … — always succeed, never store
      return void res.writeHead(200, { 'content-type': 'application/json' }).end('{"ok":true}');
    }

    // ---- static from dist/ (traversal-safe) ----
    let path = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\])+/, '');
    let file = join(DIST, path);
    if (!file.startsWith(DIST)) return void res.writeHead(403).end('forbidden');
    try {
      if (statSync(file).isDirectory()) file = join(file, 'index.html');
    } catch {
      file = join(DIST, '404.html'); // Astro emits a 404 page
    }
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(500).end('local-preview error');
  }
}).listen(PORT, () => {
  console.log(`local-preview: http://localhost:${PORT}/coloring/  (all 210 pieces unlocked)`);
});
