// regenerate src/data/coloring.ts from the seg output (order + regions + dims),
// preserving title/game from the existing file
// Usage: node scripts/coloring-seg/gencat.mjs <segOutDir>   (same dir as seg.mjs wrote)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const OUT = process.argv[2];
if (!OUT) {
  console.error('usage: node gencat.mjs <segOutDir>');
  process.exit(1);
}
const SRC = join(dirname(fileURLToPath(import.meta.url)), '../../src/data/coloring.ts');
const idx = JSON.parse(readFileSync(`${OUT}/index.json`, 'utf8'));
idx.sort((a, b) => a.rings - b.rings || (a.slug < b.slug ? -1 : 1));
const cur = readFileSync(SRC, 'utf8');
const re = /\{ slug: '((?:[^'\\]|\\.)*)', title: '((?:[^'\\]|\\.)*)', game: '(story|mandala)', regions: \d+, w: \d+, h: \d+ \}/g;
const old = new Map();
for (const m of cur.matchAll(re)) old.set(m[1], { title: m[2], game: m[3] });
if (old.size !== 210) throw new Error(`parsed ${old.size} old entries, expected 210`);
const lines = [];
for (const e of idx) {
  const p = JSON.parse(readFileSync(`${OUT}/data/${e.slug}.json`, 'utf8'));
  const o = old.get(e.slug);
  if (!o) throw new Error(`unknown slug ${e.slug}`);
  lines.push(`  { slug: '${e.slug}', title: '${o.title}', game: '${o.game}', regions: ${p.r.length}, w: ${p.w}, h: ${p.h} },`);
}
const first = idx[0];
const last = idx[idx.length - 1];
const header = `/**
 * Coloring catalog: 210 pieces from the two source games, ordered by
 * player difficulty: payload region count ascending = the daily unlock order.
 * Index 0 ("${first.slug}", ${first.rings} regions) is the easiest page;
 * regions = tap-to-fill areas = what a player reads as difficulty.
 *
 * Vector payloads (region polygons, with hole subpaths for annular bands)
 * are NOT in this file — they live in the coloring_assets D1 table and are
 * served by /api/coloring/asset only after the unlock check, so unlocked art
 * can't be scraped from public pages. Line art WebP (public/coloring/line/)
 * and thumbs (thumb/) are static public assets.
 *
 * Order must equal the D1 \`ord\` (scripts/coloring-d1/generate.mjs sorts
 * identically) — do not hand-edit the order.
 */
export interface ColoringPieceDef {
  slug: string;
  title: string;
  /** story = contour-sourced art; mandala = official line art segmentation */
  game: 'story' | 'mandala';
  /** region count (tap-to-fill areas) */
  regions: number;
  w: number;
  h: number;
}

export const COLORING_PIECES: ColoringPieceDef[] = [
${lines.join('\n')}
];
`;
writeFileSync(SRC, header);
console.log('written', lines.length, 'pieces; first:', first.slug, first.rings, '| last:', last.slug, last.rings);
const i = idx.findIndex((e) => e.slug === 'ag015-palette');
console.log('ag015 pos', i, 'next:', idx[i + 1]?.slug, idx[i + 1]?.rings);
