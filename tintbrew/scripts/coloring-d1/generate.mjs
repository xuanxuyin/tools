/**
 * Pack <segOutDir>/data/*.json into D1 INSERT SQL for coloring_assets.
 * Ported from generate.py (no Python on the dev box). Order = payload ring
 * count ascending (regions = player-perceived difficulty = the daily unlock
 * order), tie-break slug asc — this MUST stay identical to the sort used to
 * regenerate COLORING_PIECES in src/data/coloring.ts, because row `ord` is
 * what the unlock gate checks against the catalog index.
 *
 * D1 caps one SQL statement at ~100KB, but payloads with hole subpaths run
 * 100-300KB — each row is emitted as an INSERT (first slice) plus chained
 * `UPDATE ... SET data = data || '...'` statements, every statement <90KB.
 *
 * Usage: node scripts/coloring-d1/generate.mjs <segOutDir>
 * Emits  scripts/coloring-d1/001.sql ... (chunked <900KB per file)
 */
import { readFileSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = process.argv[2];
if (!OUT) {
  console.error('usage: node generate.mjs <segOutDir>');
  process.exit(1);
}

const DST = HERE; // 001.sql ... written next to this script
for (const f of readdirSync(DST)) if (/^\d+\.sql$/.test(f)) unlinkSync(resolve(DST, f));

const idx = JSON.parse(readFileSync(resolve(OUT, 'index.json'), 'utf8'));
idx.sort((a, b) => a.rings - b.rings || (a.slug < b.slug ? -1 : 1));

const q = (s) => "'" + s.replace(/'/g, "''") + "'";
const STMT_CAP = 90_000;

/** Longest data[:n] whose escaped literal fits `budget` chars (binary search). */
function longestPrefix(data, budget) {
  let lo = 0;
  let hi = data.length;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (q(data.slice(0, mid)).length <= budget) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

let chunk = [];
let size = 0;
let n = 0;
function flush() {
  if (!chunk.length) return;
  n += 1;
  writeFileSync(resolve(DST, `${String(n).padStart(3, '0')}.sql`), chunk.join(''), 'utf8');
  chunk = [];
  size = 0;
}
function emit(stmt) {
  if (size + stmt.length > 900_000 && chunk.length) flush();
  chunk.push(stmt);
  size += stmt.length;
}

for (let ord = 0; ord < idx.length; ord++) {
  const e = idx[ord];
  const data = readFileSync(resolve(OUT, 'data', `${e.slug}.json`), 'utf8');
  const payload = JSON.parse(data);
  if (payload.r.length !== e.rings) throw new Error(`${e.slug}: ${payload.r.length} rings vs index ${e.rings}`);
  const head = `INSERT OR REPLACE INTO coloring_assets (slug, ord, rings, data) VALUES (${q(e.slug)}, ${ord}, ${e.rings}, `;
  let cut = longestPrefix(data, STMT_CAP - head.length - 4); // -4: `);\n` + slack
  emit(`${head}${q(data.slice(0, cut))});\n`);
  let rest = data.slice(cut);
  while (rest.length) {
    const part = rest.slice(0, longestPrefix(rest, STMT_CAP - 80));
    rest = rest.slice(part.length);
    emit(`UPDATE coloring_assets SET data = data || ${q(part)} WHERE slug = ${q(e.slug)};\n`);
  }
}
flush();

let total = 0;
let maxStmt = 0;
let rows = 0;
for (const f of readdirSync(DST).filter((f) => /^\d+\.sql$/.test(f)).sort()) {
  total += readFileSync(resolve(DST, f), 'utf8').length;
  for (const line of readFileSync(resolve(DST, f), 'utf8').split('\n')) {
    if (line.trim()) {
      maxStmt = Math.max(maxStmt, line.length);
      if (line.startsWith('INSERT')) rows++;
    }
  }
}
console.log(`${rows} rows -> ${n} files, ${(total / 1e6).toFixed(1)}MB total, max stmt ${(maxStmt / 1024).toFixed(0)}KB`);
