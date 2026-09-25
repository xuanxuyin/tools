// Generates src/data/bead*.ts from the vector defs in scripts/beadgen/.
// This is the single source of truth step: defs → rasterize → typed data.
//   node scripts/beadgen/build.mjs
// Guards: refuses to write if any audit fails, and refuses to touch
// beadAnimals.ts unless the generated unicorn rows are byte-identical to
// the file already on disk (the shipped v5 pilot must never drift).
import { readFileSync, writeFileSync } from 'node:fs';
import { audit, rasterize } from './engine.mjs';

const q = (s) => `'${String(s).replaceAll("'", "\\'")}'`;

const CATS = [
  {
    key: 'animals', file: 'beadAnimals.ts', constName: 'BEAD_ANIMALS',
    header:
      '/**\n' +
      ' * Animal patterns (12) — vector-authored in scripts/beadgen/*.mjs and\n' +
      ' * rasterized by the beadgen engine (12×12 supersampled majority vote plus\n' +
      ' * a black rim pass). The unicorn is the original v5 pilot, kept\n' +
      ' * byte-identical. Region keys stay fine-grained so every part recolors.\n' +
      ' */',
  },
  {
    key: 'food', file: 'beadFood.ts', constName: 'BEAD_FOOD',
    header:
      '/**\n' +
      ' * Food patterns (10) — vector-authored in scripts/beadgen/*.mjs and\n' +
      ' * rasterized by the beadgen engine. Real curves, showpiece scale.\n' +
      ' */',
  },
  {
    key: 'christmas', file: 'beadChristmas.ts', constName: 'BEAD_CHRISTMAS',
    header:
      '/**\n' +
      ' * Christmas patterns (10) — vector-authored in scripts/beadgen/*.mjs and\n' +
      ' * rasterized by the beadgen engine. Generic holiday motifs only.\n' +
      ' */',
  },
  {
    key: 'halloween', file: 'beadHalloween.ts', constName: 'BEAD_HALLOWEEN',
    header:
      '/**\n' +
      ' * Halloween patterns (6) — vector-authored in scripts/beadgen/*.mjs and\n' +
      ' * rasterized by the beadgen engine. The spooky motifs stay generic\n' +
      ' * (ghost, bat, skull…) — no horror-IP anywhere near.\n' +
      ' */',
  },
  {
    key: 'minis', file: 'beadMinis.ts', constName: 'BEAD_MINIS',
    header:
      '/**\n' +
      ' * Mini patterns (8) — vector-authored in scripts/beadgen/*.mjs and\n' +
      ' * rasterized by the beadgen engine. The smallest tier stays smallest\n' +
      ' * (14-22 wide): an-evening project, exactly four regions each.\n' +
      ' */',
  },
];

for (const cat of CATS) {
  const mod = await import(`./${cat.key}.mjs`);
  const defs = mod[Object.keys(mod)[0]];
  const out = [];
  let beads = 0;
  for (const def of defs) {
    const { rows, counts } = rasterize(def);
    const a = audit(def, rows, counts);
    if (a.problems.length) {
      console.error(`${def.slug}: AUDIT FAIL — ${a.problems.join(' | ')}`);
      process.exit(1);
    }
    beads += a.total;
    const regions = Object.entries(def.zones)
      .map(([k, z]) => `      ${k}: { label: ${q(z.label)}, color: ${q(z.color)} },`)
      .join('\n');
    out.push(
      '  {\n' +
      `    slug: ${q(def.slug)},\n` +
      `    name: ${q(def.name)},\n` +
      `    category: ${q(def.category)},\n` +
      `    difficulty: ${q(def.difficulty)},\n` +
      `    width: ${def.W},\n` +
      `    tagline: ${q(def.tagline)},\n` +
      `    blurb:\n      ${q(def.blurb)},\n` +
      `    regions: {\n${regions}\n    },\n` +
      `    rows: [\n${rows.map((r) => `      ${q(r)},`).join('\n')}\n    ],\n` +
      '  },',
    );
    if (def.slug === 'unicorn') {
      const src = readFileSync(`src/data/${cat.file}`, 'utf8');
      const block = src.slice(src.indexOf("slug: 'unicorn'"));
      const m = block.match(/rows: \[([\s\S]*?)\]/);
      const current = m ? [...m[1].matchAll(/'([^']*)'/g)].map((x) => x[1]) : [];
      const same = current.length === rows.length && current.every((r, i) => r === rows[i]);
      if (!same) {
        console.error('unicorn rows DIFFER from src/data/beadAnimals.ts — aborting before write.');
        process.exit(1);
      }
      console.log('unicorn byte-identical check: OK');
    }
  }
  const ts =
    `${cat.header}\n` +
    "import type { BeadPatternDef } from '../lib/beadTypes';\n\n" +
    `export const ${cat.constName}: BeadPatternDef[] = [\n${out.join('\n')}\n];\n`;
  writeFileSync(`src/data/${cat.file}`, ts);
  console.log(`${cat.key}: ${defs.length} patterns, ${beads} beads → src/data/${cat.file}`);
}
console.log('DONE');
