// Dev runner: rasterize one category, print audits, write per-pattern SVGs
// and a contact sheet to tmp/beadgen/ for visual QA.
//   node scripts/beadgen/run.mjs animals|food|christmas|halloween|minis
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { generate, svg } from './engine.mjs';

const CATS = {
  animals: () => import('./animals.mjs').then((m) => m.ANIMALS),
  food: () => import('./food.mjs').then((m) => m.FOOD),
  christmas: () => import('./christmas.mjs').then((m) => m.CHRISTMAS),
  halloween: () => import('./halloween.mjs').then((m) => m.HALLOWEEN),
  minis: () => import('./minis.mjs').then((m) => m.MINIS),
};

const cat = process.argv[2];
if (!CATS[cat]) {
  console.error('usage: node scripts/beadgen/run.mjs <category>');
  process.exit(1);
}
const defs = await CATS[cat]();
mkdirSync('tmp/beadgen', { recursive: true });

let hard = 0;
const cards = [];
for (const def of defs) {
  const { rows, counts, audit } = generate(def);
  const flag = audit.problems.length ? 'FAIL' : 'ok';
  if (audit.problems.length) hard++;
  console.log(`\n=== ${def.slug} (${def.W}x${rows.length}, ${audit.total} beads) ${flag}`);
  if (audit.problems.length) console.log('  PROBLEMS: ' + audit.problems.join(' | '));
  if (audit.notes.length) console.log('  notes: ' + audit.notes.join(' | '));
  console.log('  ' + [...counts.entries()].map(([z, n]) => `${z}:${n}`).join(' '));
  const s = svg(def, rows);
  writeFileSync(`tmp/beadgen/${def.slug}.svg`, s);
  cards.push(`<figure><div class="card">${s}</div><figcaption>${def.slug} · ${audit.total} beads</figcaption></figure>`);
}

const sheet = `<!doctype html><html><head><meta charset="utf-8"><style>
body{background:#fbfaf7;font-family:system-ui;margin:24px}
h1{font-size:18px}
.grid{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-start}
figure{margin:0;text-align:center}
.card svg{width:auto;height:340px;display:block;margin:0 auto}
figcaption{font-size:12px;color:#555;margin-top:4px}
</style></head><body><h1>tintbrew beadgen — ${cat} (${defs.length})</h1>
<div class="grid">${cards.join('\n')}</div></body></html>`;
writeFileSync(`tmp/beadgen/sheet-${cat}.html`, sheet);
console.log(`\n${hard === 0 ? 'ALL OK' : hard + ' FAILED'} → tmp/beadgen/sheet-${cat}.html`);

// unicorn port check: generated rows must equal the rows in src/data/beadAnimals.ts
if (cat === 'animals') {
  const uni = defs.find((d) => d.slug === 'unicorn');
  if (uni) {
    const src = readFileSync('src/data/beadAnimals.ts', 'utf8');
    const block = src.slice(src.indexOf("slug: 'unicorn'"));
    const rowsMatch = block.match(/rows: \[([\s\S]*?)\]/);
    const current = rowsMatch ? [...rowsMatch[1].matchAll(/'([^']*)'/g)].map((m) => m[1]) : [];
    const { rows } = generate(uni);
    const same = current.length === rows.length && current.every((r, i) => r === rows[i]);
    console.log(`unicorn port vs beadAnimals.ts: ${same ? 'IDENTICAL' : `DIFFERS (file ${current.length} rows vs gen ${rows.length})`}`);
    if (!same) {
      rows.forEach((r, i) => { if (r !== current[i]) console.log(`  r${i}: file=${current[i]}\n       gen =${r}`); });
    }
  }
}
