/**
 * forge-pattern.ts — turn a local image into a tintbrew bead pattern entry.
 *
 * Usage:
 *   npx tsx scripts/forge-pattern.ts <image.(png|jpg)> \
 *     --category animals|characters|halloween|minis|food|christmas \
 *     [--slug my-pattern] [--name "My Pattern"] \
 *     [--width 29] [--mode smooth|dither] [--max-colors 20] \
 *     [--simplify keep|balanced|bold] [--no-remove-bg] [--outline] \
 *     [--difficulty easy|medium] [--dry]
 *
 * Pipeline: decode (pngjs/jpeg-js) → photoToPattern (same engine the photo
 * converter ships, Oklab matching against the 291-color Mard line) → group
 * cells into recolorable regions (A = most used) → serialize a BeadPatternDef
 * and insert it at the END of the category's data array (beadAnimals.ts etc).
 *
 * After a successful run, pinned counts must be synced by hand:
 *   - src/scripts/i18n.test.ts  'All 115 patterns →' (+ zh line) — new total
 *   - src/lib/beadContent.test.ts  easyPatterns.length — if difficulty easy
 * Then: npm run build && npx vitest run.
 *
 * --dry prints the entry + stats without touching data files.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { PNG } from 'pngjs';
import jpeg from 'jpeg-js';
import { photoToPattern, type SampleImage, type PhotoSimplify, type PhotoMode } from '../src/lib/photoToPattern';
import { MARD_COLORS } from '../src/lib/mardPalette';
import type { BeadPatternDef, BeadCategory, BeadDifficulty } from '../src/lib/beadTypes';

// ---------------------------------------------------------------- CLI ----

interface Args {
  image: string;
  category: BeadCategory;
  slug?: string;
  name?: string;
  width: number;
  mode: PhotoMode;
  maxColors?: number;
  simplify: PhotoSimplify;
  removeBg: boolean;
  outline: boolean;
  difficulty?: BeadDifficulty;
  dry: boolean;
}

const CATEGORIES: BeadCategory[] = ['animals', 'characters', 'halloween', 'minis', 'food', 'christmas'];

function usage(): never {
  console.error('See the header comment in scripts/forge-pattern.ts for usage.');
  process.exit(1);
}

function parseArgs(argv: string[]): Args {
  const positional = argv.filter((a) => !a.startsWith('--'));
  const flags = new Map<string, string | boolean>();
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    if (key === 'no-remove-bg' || key === 'outline' || key === 'dry') {
      flags.set(key, true);
    } else if (next && !next.startsWith('--')) {
      flags.set(key, next);
      i++;
    } else {
      flags.set(key, 'true');
    }
  }

  const image = positional[0];
  if (!image) usage();
  const category = String(flags.get('category') ?? '') as BeadCategory;
  if (!CATEGORIES.includes(category)) {
    console.error(`--category must be one of: ${CATEGORIES.join(', ')}`);
    usage();
  }

  const num = (key: string): number | undefined => {
    const v = flags.get(key);
    if (v === undefined || v === true) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  const modeRaw = String(flags.get('mode') ?? 'smooth');
  if (modeRaw !== 'smooth' && modeRaw !== 'dither') usage();
  const simplifyRaw = String(flags.get('simplify') ?? 'balanced');
  if (!['keep', 'balanced', 'bold'].includes(simplifyRaw)) usage();

  return {
    image,
    category,
    slug: flags.has('slug') ? String(flags.get('slug')) : undefined,
    name: flags.has('name') ? String(flags.get('name')) : undefined,
    width: num('width') ?? 29,
    mode: modeRaw as PhotoMode,
    maxColors: num('max-colors'),
    simplify: simplifyRaw as PhotoSimplify,
    removeBg: !flags.has('no-remove-bg'),
    outline: flags.has('outline'),
    difficulty: flags.has('difficulty') ? (String(flags.get('difficulty')) as BeadDifficulty) : undefined,
    dry: flags.has('dry'),
  };
}

// ------------------------------------------------------------- decode ----

function decodeImage(path: string): SampleImage {
  const buf = readFileSync(path);
  const lower = path.toLowerCase();
  if (lower.endsWith('.png')) {
    const png = PNG.sync.read(buf);
    return { data: new Uint8ClampedArray(png.data), width: png.width, height: png.height };
  }
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
    const img = jpeg.decode(buf, { useTArray: true, formatAsRGBA: true });
    return { data: new Uint8ClampedArray(img.data), width: img.width, height: img.height };
  }
  console.error('Unsupported image type — use .png or .jpg (webp not supported; convert first).');
  process.exit(1);
}

// ------------------------------------------------------------- build ----

/** A..Z, then AA..ZZ — enough for the palette cap we allow. */
function regionKey(i: number): string {
  let s = '';
  let n = i;
  do {
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return s;
}

const beadById = new Map(MARD_COLORS.map((b) => [b.id, b]));

function buildDef(args: Args): BeadPatternDef {
  const img = decodeImage(resolve(args.image));
  console.error(`decoded ${basename(args.image)}: ${img.width}×${img.height}px`);

  const pattern = photoToPattern(img, {
    cols: args.width,
    mode: args.mode,
    maxColors: args.maxColors,
    simplify: args.simplify,
    removeBackground: args.removeBg,
    darkOutline: args.outline,
  });

  const counts = new Map<string, number>();
  for (const c of pattern.cells) {
    if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  if (sorted.length === 0) {
    console.error('The pattern came out empty — check the image / removeBackground settings.');
    process.exit(1);
  }
  if (sorted.length > 40) {
    console.error(`${sorted.length} colors is too many for a printable template — pass --max-colors (12–24 works well).`);
    process.exit(1);
  }

  const keyById = new Map(sorted.map(([id], i) => [id, regionKey(i)]));
  const regions: BeadPatternDef['regions'] = {};
  for (const [id] of sorted) {
    const bead = beadById.get(id);
    if (!bead) throw new Error(`unknown bead id ${id}`);
    regions[keyById.get(id)!] = { label: bead.name.toLowerCase(), color: bead.id };
  }

  const rows: string[] = [];
  for (let y = 0; y < pattern.rows; y++) {
    let row = '';
    for (let x = 0; x < pattern.cols; x++) {
      const c = pattern.cells[y * pattern.cols + x];
      row += c ? keyById.get(c) : '.';
    }
    rows.push(row);
  }

  const beads = [...counts.values()].reduce((a, b) => a + b, 0);
  const colors = sorted.length;
  const slug =
    args.slug ??
    basename(args.image)
      .toLowerCase()
      .replace(/\.(png|jpe?g)$/, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  const name = args.name ?? slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const difficulty =
    args.difficulty ?? (beads <= 200 && colors <= 3 ? 'easy' : 'medium');
  const inches = (pattern.cols * 0.2).toFixed(1);
  const top1 = beadById.get(sorted[0][0])!.name.toLowerCase();
  const top2 = sorted[1] ? beadById.get(sorted[1][0])!.name.toLowerCase() : top1;

  const def: BeadPatternDef = {
    slug,
    name,
    category: args.category,
    difficulty,
    width: pattern.cols,
    ...(colors < 4 ? { zonesMin: colors } : {}),
    tagline: `${beads} beads, ${colors} ${colors === 1 ? 'color' : 'colors'}, mostly ${top1}${sorted[1] ? ` and ${top2}` : ''}.`,
    blurb: `The ${name} spans ${pattern.cols} × ${pattern.rows} beads — about ${inches} inch${inches === '1' ? '' : 'es'} wide on the board — ${beads} beads across ${colors} ${colors === 1 ? 'color' : 'colors'}, every one counted in the list below. Print the grid for the pegboard, or place it here in the browser and repaint any color before you commit.`,
    regions,
    rows,
  };

  const label = (args.dry ? 'DRY RUN — no files written' : 'READY');
  console.error(`\n${label}: ${def.slug} (${def.category})`);
  console.error(`  ${pattern.cols} × ${pattern.rows} grid · ${beads} beads · ${colors} colors · difficulty ${difficulty}`);
  console.error(`  top colors: ${sorted.slice(0, 5).map(([id, n]) => `${id}×${n}`).join(', ')}`);

  if (!args.dry) {
    for (const [file, defSlug] of existingSlugs()) {
      if (defSlug === def.slug) {
        console.error(`\nslug "${def.slug}" already exists in ${file} — pass a different --slug.`);
        process.exit(1);
      }
    }
    insertDef(def);
  }
  return def;
}

// ------------------------------------------------------- data files ----

const FILE_MAP: Record<string, { file: string; constName: string }> = {
  animals: { file: 'src/data/beadAnimals.ts', constName: 'BEAD_ANIMALS' },
  characters: { file: 'src/data/beadCharacters.ts', constName: 'BEAD_CHARACTERS' },
  halloween: { file: 'src/data/beadHalloween.ts', constName: 'BEAD_HALLOWEEN' },
  minis: { file: 'src/data/beadMinis.ts', constName: 'BEAD_MINIS' },
  food: { file: 'src/data/beadFood.ts', constName: 'BEAD_FOOD' },
  christmas: { file: 'src/data/beadChristmas.ts', constName: 'BEAD_CHRISTMAS' },
};

function* existingSlugs(): Generator<{ file: string; slug: string }> {
  for (const { file } of Object.values(FILE_MAP)) {
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(/^\s{4}slug: '([^']+)',$/gm)) {
      yield { file, slug: m[1] };
    }
  }
}

function serializeDef(def: BeadPatternDef): string {
  const regions = Object.entries(def.regions)
    .map(([k, r]) => `      ${k}: { label: '${r.label}', color: '${r.color}' },`)
    .join('\n');
  const rows = def.rows.map((r) => `      '${r}',`).join('\n');
  const zonesMin = def.zonesMin !== undefined ? `\n    zonesMin: ${def.zonesMin},` : '';
  return `  {
    slug: '${def.slug}',
    name: '${def.name.replace(/'/g, "\\'")}',
    category: '${def.category}',
    difficulty: '${def.difficulty}',
    width: ${def.width},${zonesMin}
    tagline: '${def.tagline.replace(/'/g, "\\'")}',
    blurb:
      '${def.blurb.replace(/'/g, "\\'")}',
    regions: {
${regions}
    },
    rows: [
${rows}
    ],
  },
`;
}

function insertDef(def: BeadPatternDef): void {
  const { file, constName } = FILE_MAP[def.category];
  const text = readFileSync(file, 'utf8');
  const marker = `export const ${constName}: BeadPatternDef[] = [\n`;
  const start = text.indexOf(marker);
  if (start < 0) throw new Error(`array marker not found in ${file}`);
  const end = text.indexOf('\n];', start + marker.length);
  if (end < 0) throw new Error(`array end not found in ${file}`);
  writeFileSync(file, text.slice(0, end) + '\n' + serializeDef(def) + text.slice(end));
  console.error(`  inserted into ${file} (${constName})`);
}

// --------------------------------------------------------------- run ----

const args = parseArgs(process.argv.slice(2));
const def = buildDef(args);
if (!args.dry) {
  // insertDef already wrote the entry, so this count IS the new total
  const total = [...existingSlugs()].length;
  console.error(`
NEXT STEPS (pinned counts need syncing):
  1. src/scripts/i18n.test.ts:142 — 'All 115 patterns →' → 'All ${total} patterns →'; :144 zh line same number
  2. src/lib/beadContent.test.ts:68 easyPatterns.length — only if difficulty easy (current 48)
  3. npm run build && npx vitest run
  4. commit (image + data + tests), push via push.bat`);
}
