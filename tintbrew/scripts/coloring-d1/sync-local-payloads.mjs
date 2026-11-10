// Sync local dev payloads (node scripts/coloring-d1/sync-local-payloads.mjs) from the authoritative D1 slices so localhost
// testing matches production exactly (the public/ files had gone stale —
// 44 rings vs production 38 for bee — poisoning local acceptance).
//
// Dump format quirk: rows longer than ~90K were split by the export tool —
//   INSERT OR REPLACE INTO coloring_assets (…) VALUES ('slug', ord, rings, '<chunk1>');
//   UPDATE coloring_assets SET data = data || '<chunk2>' WHERE slug = 'slug';
// (possibly several UPDATEs). Quotes inside strings are SQL-escaped as ''.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';

const DIR = new URL('.', import.meta.url).pathname.slice(1);
const OUT = new URL('../../public/coloring/payload', import.meta.url).pathname.slice(1);
mkdirSync(OUT, { recursive: true });

const files = readdirSync(DIR).filter((f) => /^\d+\.sql$/.test(f)).sort();
const INSERT = /^INSERT OR REPLACE INTO coloring_assets \(slug, ord, rings, data\) VALUES \('([^']+)', (\d+), (\d+), '(.*)'\);\s*$/;
const UPDATE = /^UPDATE coloring_assets SET data = data \|\| '(.*)' WHERE slug = '([^']+)';\s*$/;

const acc = new Map(); // slug -> { rings, ord, parts: [] }
let stmts = 0;
for (const f of files) {
  for (const line of readFileSync(`${DIR}/${f}`, 'utf8').split('\n')) {
    let m;
    if ((m = line.match(INSERT))) {
      acc.set(m[1], { ord: Number(m[2]), rings: Number(m[3]), parts: [m[4]] });
      stmts++;
    } else if ((m = line.match(UPDATE))) {
      const a = acc.get(m[2]);
      if (!a) throw new Error(`${f}: UPDATE before INSERT for ${m[2]}`);
      a.parts.push(m[1]);
      stmts++;
    }
  }
}

let n = 0;
const counts = [];
for (const [slug, a] of acc) {
  const data = a.parts.join('').replace(/''/g, "'");
  const p = JSON.parse(data); // validates every payload
  if (p.r.length !== a.rings) throw new Error(`${slug}: rings header ${a.rings} != r.length ${p.r.length}`);
  writeFileSync(`${OUT}/${slug}.json`, data);
  counts.push([slug, a.rings]);
  n++;
}
counts.sort((x, y) => x[0].localeCompare(y[0]));
console.log(`parsed ${stmts} statements, synced ${n} payloads`);
const bee = counts.find(([s]) => s === 'dk019-bee');
console.log('bee rings now:', bee ? bee[1] : 'MISSING');
console.log('sample:', counts.slice(0, 8).map(([s, r]) => `${s}:${r}`).join(' '));
