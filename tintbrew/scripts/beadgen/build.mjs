// Generates src/data/bead*.ts from the defs in scripts/beadgen/.
// This is the single source of truth step: defs → rasterize → typed data.
// Two def shapes flow in:
//   - vector defs (draw()) → rasterize() supersamples them onto the grid
//   - imported defs (rows already quantized, from import-webp.mjs) →
//     rows pass straight through; only the audit still runs
//   node scripts/beadgen/build.mjs
// Guards: refuses to write if any audit fails, and refuses to touch
// beadAnimals.ts unless the generated unicorn rows are byte-identical to
// the file already on disk (the shipped v5 pilot must never drift).
import { readFileSync, writeFileSync } from 'node:fs';
import { audit, rasterize } from './engine.mjs';

const q = (s) => `'${String(s).replaceAll("'", "\\'")}'`;

// letter → bead count, straight off quantized rows (audit's input shape)
function tally(rows) {
  const m = new Map();
  for (const r of rows) for (const c of r) if (c !== '.') m.set(c, (m.get(c) ?? 0) + 1);
  return m;
}

const CATS = [
  {
    key: 'animals', file: 'beadAnimals.ts', constName: 'BEAD_ANIMALS',
    imported: 'imported-animals',
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
    imported: 'imported-food',
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
    imported: 'imported-halloween',
    header:
      '/**\n' +
      ' * Halloween patterns (6) — vector-authored in scripts/beadgen/*.mjs and\n' +
      ' * rasterized by the beadgen engine. The spooky motifs stay generic\n' +
      ' * (ghost, bat, skull…) — no horror-IP anywhere near.\n' +
      ' */',
  },
  {
    key: 'minis', file: 'beadMinis.ts', constName: 'BEAD_MINIS',
    imported: 'imported-minis',
    header:
      '/**\n' +
      ' * Mini patterns — quick makes from community designs, imported by\n' +
      ' * scripts/beadgen/import-webp.mjs. The smallest tier stays smallest\n' +
      ' * (6-22 wide): keychain-size, as few as 2 colors where the source\n' +
      ' * design genuinely uses two.\n' +
      ' */',
  },
  {
    key: 'characters', file: 'beadCharacters.ts', constName: 'BEAD_CHARACTERS',
    imported: 'imported-characters',
    header:
      '/**\n' +
      ' * Character patterns — imported wholesale from community bead renders\n' +
      ' * by scripts/beadgen/import-webp.mjs (import-manifest.json genericizes\n' +
      ' * IP names: lightning-mouse, blue-alien, crayon-kid…). No hand-authored\n' +
      ' * defs yet.\n' +
      ' */',
  },
];

for (const cat of CATS) {
  const mod = await import(`./${cat.key}.mjs`);
  const defs = [...mod[Object.keys(mod)[0]]];
  // imported defs (quantized rows straight off community bead renders)
  // append to the hand-authored set — same category file, same pages
  if (cat.imported) {
    try {
      const imp = await import(`./${cat.imported}.mjs`);
      defs.push(...imp[Object.keys(imp)[0]]);
    } catch { /* no imported module for this category yet */ }
  }
  const out = [];
  let beads = 0;
  for (const def of defs) {
    const { rows, counts } = def.rows
      ? { rows: def.rows, counts: tally(def.rows) }
      : rasterize(def);
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
