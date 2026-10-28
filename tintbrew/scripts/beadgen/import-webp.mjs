// Raster-effect images (rendered bead boards, e.g. perlerbeadpatterns.org
// webp exports) → beadgen defs. The source is NOT flat pixel art — every
// bead carries highlight/shade/antialiasing — so this:
//   1. detects the bead grid from run-length periodicity,
//   2. samples each cell's center window (mean),
//   3. calls empty pegboard cells '.', snaps everything else to the
//      official 103-color Perler line (Oklab nearest — same metric as
//      src/lib/beadPalette.ts, whose table is regex-extracted so this file
//      never drifts from the shipped palette),
//   4. emits { zones, rows } defs that build.mjs consumes verbatim — no
//      vector draw() step, which is why imported defs bypass rasterize().
// Zone letters follow the label-equals-color-word convention of the
// hand-authored defs.
//
// A second source shape rides the same pipeline: the community site's
// /editor/<slug> pages ship the pattern verbatim in RSC flight data (a
// width×height matrix of palette indices). Those skip the raster machinery
// entirely — each source hex just Oklab-snaps onto the Perler line — and
// land in the manifest under `_editor` (bucket key = editor HTML stem).
// Designs that genuinely use fewer than 4 colors carry zonesMin so the
// engine audit doesn't hold them to the hand-authored 4-zone floor.
//
//   node scripts/beadgen/import-webp.mjs <img...>         → def JSON to stdout
//   node scripts/beadgen/import-webp.mjs --svg <out.png> <img>  → preview png
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

// ---------- palette: extracted from the shipped lib, single source ----------
const palSrc = readFileSync(new URL('../../src/lib/beadPalette.ts', import.meta.url), 'utf8');
const LINE = [...palSrc.matchAll(/\{ id: '([\w-]+)', name: (?:'([^']+)'|"([^"]+)"), code: '(P\d+)', hex: '(#[0-9a-f]{6})' \}/g)]
  .map((m) => ({ id: m[1], name: m[2] ?? m[3], code: m[4], hex: m[5] }));
if (LINE.length !== 103) throw new Error(`palette extract got ${LINE.length}, expected 103`);

// ---------- oklab (same transform as src/lib/color.ts) ----------
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
function oklab(r, g, b) {
  const R = lin(r), G = lin(g), B = lin(b);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}
const LINE_LAB = LINE.map((b) => {
  const r = parseInt(b.hex.slice(1, 3), 16), g = parseInt(b.hex.slice(3, 5), 16), bl = parseInt(b.hex.slice(5, 7), 16);
  return { ...b, lab: oklab(r, g, bl) };
});
function nearestBead(r, g, b) {
  const t = oklab(r, g, b);
  let best = LINE_LAB[0], bd = Infinity;
  for (const c of LINE_LAB) {
    const d = Math.hypot(t.L - c.lab.L, t.a - c.lab.a, t.b - c.lab.b);
    if (d < bd) { bd = d; best = c; }
  }
  return { bead: best, d: bd };
}

// ---------- grid detection: iterative-threshold median run length ----------
// The bead pitch is the median horizontal run length of same-bucket pixels
// over central rows. Fine interior texture (a parrot's feathers) mints
// thousands of 5–7 px runs that bury that median — so when the median comes
// out under a real bead pitch (<10 px), the run floor rises to 1.8× it and
// the median recomputes, which washes texture out and floats the bead-run
// plateau. Clean boards return on the first pass, untouched.
const bucketOf = (r, g, b) => `${r >> 4},${g >> 4},${b >> 4}`;
function detectGrid(data, W, H) {
  let floor = 5;
  let g = 0;
  for (let hop = 0; hop < 4; hop++) {
    const lens = [];
    for (let y = Math.floor(H * 0.25); y < H * 0.75; y += 3) {
      let run = 1;
      let prev = bucketOf(data[(y * W) * 4], data[(y * W) * 4 + 1], data[(y * W) * 4 + 2]);
      for (let x = 1; x < W; x++) {
        const i = (y * W + x) * 4;
        const b = bucketOf(data[i], data[i + 1], data[i + 2]);
        if (b === prev) run++;
        else { if (run >= floor) lens.push(run); run = 1; prev = b; }
      }
    }
    if (lens.length < 10) throw new Error('not enough runs to detect a grid');
    lens.sort((a, b) => a - b);
    g = lens[Math.floor(lens.length / 2)];
    if (g >= 10) break;
    floor = Math.ceil(g * 1.8);
  }
  const N = Math.round(W / g);
  const M = Math.round(H / (W / N));
  if (N < 8 || N > 130) throw new Error(`grid ${N}x${M} out of range (g=${g.toFixed(1)})`);
  return { N, M, g: W / N };
}

// ---------- per-cell sampling ----------
// pegboard empty-cell color across the source renders (measured: ~#f4efe9)
const PEG_R = 243, PEG_G = 239, PEG_B = 233;
const PEG_LAB = oklab(PEG_R, PEG_G, PEG_B);
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

// Every rendered bead carries a highlight on ~25% of its face plus a shade
// rim — a window MEAN drifts toward the highlight and splits one bead into
// two Oklab neighbors (measured: 28–33 colors per board). The per-channel
// MEDIAN of the FULL cell ignores both, and stays correct even when the
// detected grid phase is off by a third of a cell (the window still lands
// mostly on bead face). Diagnosed 2026-10-28, scripts/beadgen/diag-import.temp.mjs.
function cellMedian(data, W, H, cx, cy, half) {
  const rs = [], gs = [], bs = [];
  for (let y = Math.floor(cy - half); y <= Math.ceil(cy + half); y++) {
    for (let x = Math.floor(cx - half); x <= Math.ceil(cx + half); x++) {
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const i = (y * W + x) * 4;
      rs.push(data[i]); gs.push(data[i + 1]); bs.push(data[i + 2]);
    }
  }
  if (!rs.length) return [PEG_R, PEG_G, PEG_B];
  const med = (a) => { a.sort((p, q) => p - q); return a[a.length >> 1]; };
  return [med(rs), med(gs), med(bs)];
}

// Empty-vs-bead is a nearest-neighbor contest, not a fixed RGB threshold:
// the White bead (#fdfcf9-ish) sits barely 42 L1 away from the pegboard
// tint (243,239,233), so a hard cutoff eats a white Samoyed's whole coat
// (measured: 390 beads on a 39×49 board). The pegboard "virtual bead" only
// wins a cell when it's clearly closer than the best real bead — shaded
// empty cells stay empty, white fur stays White.
const PEG_MARGIN = 0.85;
function classify(r, gg, b) {
  const t = oklab(r, gg, b);
  const dPeg = Math.hypot(t.L - PEG_LAB.L, t.a - PEG_LAB.a, t.b - PEG_LAB.b);
  const { bead, d } = nearestBead(r, gg, b);
  return dPeg < d * PEG_MARGIN ? '.' : bead.id;
}

function sample(data, W, H, { N, M, g }) {
  const grid = [];
  for (let my = 0; my < M; my++) {
    const row = [];
    for (let mx = 0; mx < N; mx++) {
      const [r, gg, b] = cellMedian(data, W, H, (mx + 0.5) * g, (my + 0.5) * g, g / 2);
      row.push(classify(r, gg, b));
    }
    grid.push(row);
  }
  return grid;
}

// 3×3 majority vote, ≥7 of 8: kills isolated sampling speckles without
// eating real detail (a 2×2 eye highlight never reaches the threshold).
// Same policy as src/lib/photoToPattern.ts despeckle().
function despeckle(grid) {
  const M = grid.length, N = grid[0].length;
  const out = grid.map((r) => r.slice());
  for (let y = 0; y < M; y++) {
    for (let x = 0; x < N; x++) {
      const counts = new Map();
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const ny = y + dy, nx = x + dx;
          if (ny < 0 || ny >= M || nx < 0 || nx >= N) continue;
          const id = grid[ny][nx];
          if (id === '.') continue;
          counts.set(id, (counts.get(id) ?? 0) + 1);
        }
      }
      for (const [id, n] of counts) {
        if (n >= 7 && id !== grid[y][x]) { out[y][x] = id; break; }
      }
    }
  }
  return out;
}

// Cap the palette at the K most-used beads; the rest re-snap onto the
// survivors (Oklab nearest). Keeps shopping lists buildable — the same
// reason photoToPattern caps maxColors.
function capColors(grid, K) {
  const counts = new Map();
  for (const row of grid) for (const c of row) if (c !== '.') counts.set(c, (counts.get(c) ?? 0) + 1);
  const keep = new Set([...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, K).map(([id]) => id));
  const snap = new Map();
  return grid.map((row) => row.map((c) => {
    if (c === '.' || keep.has(c)) return c;
    let to = snap.get(c);
    if (!to) {
      let best = null, bd = Infinity;
      for (const k of keep) {
        const bead = LINE_LAB.find((b) => b.id === k);
        const from = LINE_LAB.find((b) => b.id === c);
        const d = Math.hypot(bead.lab.L - from.lab.L, bead.lab.a - from.lab.a, bead.lab.b - from.lab.b);
        if (d < bd) { bd = d; best = bead; }
      }
      to = best.id;
      snap.set(c, to);
    }
    return to;
  }));
}

// ---------- editor source: /editor/<slug> RSC flight carries the pattern
// grid verbatim (palette-index matrix, 0 = empty peg). No raster pipeline —
// each source hex snaps once onto the Perler line. Two source hexes can
// snap onto the same bead (a 3-gray heart → 2 grays); those merge into one
// zone so a def never ships the same Perler color twice.
const EDITOR_DIR = process.env.PBP_EDITOR_DIR ?? 'D:/tmp/pbp-crawl';
function parseEditorPattern(htmlPath) {
  const html = readFileSync(htmlPath, 'utf8');
  const chunks = [...html.matchAll(/self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g)]
    .map((m) => JSON.parse(`"${m[1]}"`));
  const all = chunks.join('');
  const start = all.indexOf('"pattern":{');
  if (start < 0) throw new Error(`no pattern in flight data of ${htmlPath}`);
  let depth = 0;
  let end = -1;
  for (let j = all.indexOf('{', start); j < all.length; j++) {
    if (all[j] === '{') depth++;
    else if (all[j] === '}') { depth--; if (!depth) { end = j + 1; break; } }
  }
  return JSON.parse(all.slice(all.indexOf('{', start), end));
}
function editorCells(p, htmlPath) {
  const snap = p.colors.map((hex) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return nearestBead(r, g, b).bead.id;
  });
  // dedup snapped ids: source index (1-based) → first index with same bead
  const remap = new Map();
  snap.forEach((id, k) => {
    const first = snap.findIndex((other) => other === id);
    remap.set(k + 1, first + 1);
  });
  const cells = p.grid.map((row) => row.map((v) => {
    const src = remap.get(v);
    if (v !== 0 && src === undefined) throw new Error(`grid index ${v} outside palette in ${htmlPath}`);
    return v === 0 ? '.' : snap[src - 1];
  }));
  return { cells, W: p.width, H: p.height, name: p.name };
}

// ---------- driver ----------
const argv = process.argv.slice(2);
let svgOut = null;
let outDir = null;
let manifestPath = null;
let maxColors = 16;
const IMG_DIR = process.env.PBP_IMAGES ?? 'D:/tmp/pbp-crawl/images';
// image path + explicit overrides: { path, slug, category }
const jobs = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--svg') svgOut = argv[++i];
  else if (argv[i] === '--out-dir') outDir = argv[++i];
  else if (argv[i] === '--manifest') manifestPath = argv[++i];
  else if (argv[i] === '--max-colors') maxColors = Number(argv[++i]);
  else jobs.push({ path: argv[i] });
}

// resolve a crawl stem to whichever file exists (.webp or .png)
function stemFile(stem) {
  for (const ext of ['webp', 'png']) {
    const p = `${IMG_DIR}/${stem}.${ext}`;
    if (existsSync(p)) return p;
  }
  throw new Error(`no image for "${stem}" under ${IMG_DIR}`);
}

// manifest mode: import-manifest.json maps crawl stems → { slug?, category? }
// (IP characters are genericized there); the bucket key is the default
// category. Output splits per category into imported-<cat>.mjs modules.
// The `_editor` bucket is the flight-data source: keys name editor-<key>.html
// files under EDITOR_DIR instead of images.
if (manifestPath) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  for (const [bucket, entries] of Object.entries(manifest)) {
    if (bucket.startsWith('_')) continue;
    for (const [stem, over] of Object.entries(entries)) {
      jobs.push({
        path: stemFile(stem),
        slug: over.slug ?? stem,
        category: over.category ?? bucket,
      });
    }
  }
  for (const [stem, over] of Object.entries(manifest._editor ?? {})) {
    if (stem.startsWith('_')) continue;
    const path = `${EDITOR_DIR}/editor-${stem}.html`;
    if (!existsSync(path)) throw new Error(`no editor page for "${stem}" under ${EDITOR_DIR}`);
    jobs.push({ editor: path, slug: over.slug ?? stem, category: over.category ?? 'animals' });
  }
}

// bead pitch is 5 mm — matches lib/beadContent beadSizeInches()
const inchesOf = (n) => ((n * 5) / 25.4).toFixed(1);

const defs = [];
for (const job of jobs) {
  let cells, W, H, name;
  if (job.editor) {
    const p = parseEditorPattern(job.editor);
    ({ cells, W, H, name } = editorCells(p, job.editor));
  } else {
    const { data, info } = await sharp(job.path).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const grid = detectGrid(data, info.width, info.height);
    cells = despeckle(sample(data, info.width, info.height, grid));
    if (maxColors > 0) cells = capColors(cells, maxColors);
    W = grid.N; H = grid.M;
  }
  // grid → lettered rows + zone map (letters ordered by bead count so the
  // most-used colors get A, B, C… and the map is stable across reruns)
  const counts = new Map();
  for (const row of cells) for (const c of row) if (c !== '.') counts.set(c, (counts.get(c) ?? 0) + 1);
  const order = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
  const zones = {}; // bead id -> letter
  order.forEach((id, i) => { zones[id] = LETTERS[i]; });
  const rows = cells.map((row) => row.map((c) => (c === '.' ? '.' : zones[c])).join(''));
  const slug = job.slug ?? job.path.split(/[\\/]/).pop().replace(/\.(webp|png)$/i, '');
  if (!job.editor) name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const category = job.category ?? 'animals';
  const zoneMap = {};
  for (const [id, L] of Object.entries(zones)) {
    const bead = LINE.find((b) => b.id === id);
    zoneMap[L] = { label: bead.name.toLowerCase(), color: id };
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0);
  const top2 = order.slice(0, 2).map((id) => LINE.find((b) => b.id === id).name.toLowerCase());
  // data-driven copy: facts only (sizes, counts, dominant colors), rotated
  // per-slug so gallery cards don't read as one template
  const taglines = [
    `A ${W} × ${H} board in ${order.length} colors — ${top2[0]} does the heavy lifting.`,
    `${total.toLocaleString('en-US')} beads, ${order.length} colors, mostly ${top2[0]} and ${top2[1]}.`,
    `Built on ${top2[0]} and ${top2[1]} — ${total.toLocaleString('en-US')} beads across a ${W}-wide board.`,
  ];
  const tagline = taglines[slug.length % taglines.length];
  const blurb =
    `The ${name} spans ${W} × ${H} beads — about ${inchesOf(W)} inches wide on the board — ` +
    `${total.toLocaleString('en-US')} beads across ${order.length} colors, every one counted in the list below. ` +
    `Print the grid for the pegboard, or place it here in the browser and repaint any color before you commit.`;
  defs.push({
    slug, name, category,
    difficulty: W <= 30 ? 'easy' : 'medium',
    W, H, zones: zoneMap, rows, tagline, blurb,
    // genuinely-N-color community designs opt out of the 4-zone floor
    ...(order.length < 4 ? { zonesMin: order.length } : {}),
  });
  const countsStr = order.map((id) => `${LINE.find((b) => b.id === id).name} ${counts.get(id)}`).join(', ');
  console.log(`${category}/${slug}: ${W}x${H}, ${order.length} colors, ${total} beads — ${countsStr.slice(0, 80)}`);
}

function moduleOf(cat, catDefs) {
  const q = (s) => `'${String(s).replaceAll("'", "\\'")}'`;
  const body = catDefs.map((d) =>
    '  {\n' +
    `    slug: ${q(d.slug)},\n    name: ${q(d.name)},\n    category: ${q(d.category)},\n` +
    `    difficulty: ${q(d.difficulty)},\n    W: ${d.W},\n    H: ${d.H},\n    mirror: false,\n` +
    (d.zonesMin ? `    zonesMin: ${d.zonesMin},\n` : '') +
    `    tagline: ${q(d.tagline)},\n    blurb: ${q(d.blurb)},\n` +
    `    zones: {\n${Object.entries(d.zones).map(([L, z]) => `      ${L}: { label: ${q(z.label)}, color: ${q(z.color)} },`).join('\n')}\n    },\n` +
    `    rows: [\n${d.rows.map((r) => `      ${q(r)},`).join('\n')}\n    ],\n  },`,
  ).join('\n');
  return (
    `// GENERATED by scripts/beadgen/import-webp.mjs from community bead renders\n` +
    `// (${new Date().toISOString().slice(0, 10)}) — do not hand-edit; rerun the importer\n` +
    `// with scripts/beadgen/import-manifest.json.\n` +
    `export const IMPORTED_${cat.toUpperCase()} = [\n${body}\n];\n`
  );
}

if (outDir) {
  const byCat = new Map();
  for (const d of defs) {
    if (!byCat.has(d.category)) byCat.set(d.category, []);
    byCat.get(d.category).push(d);
  }
  for (const [cat, catDefs] of byCat) {
    const p = `${outDir}/imported-${cat}.mjs`;
    writeFileSync(p, moduleOf(cat, catDefs));
    console.log(`${catDefs.length} defs → ${p}`);
  }
}

if (svgOut) {
  // 10px-per-bead SVG preview of the first def for visual QA
  const d = defs[0];
  const cells = d.rows.flatMap((r, y) => [...r].map((c, x) =>
    c === '.' ? null : `<rect x="${x * 10}" y="${y * 10}" width="9" height="9" rx="2" fill="${LINE.find((b) => b.id === d.zones[c].color).hex}"/>`).filter(Boolean)).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${d.W * 10}" height="${d.H * 10}">${cells}</svg>`;
  writeFileSync(svgOut, svg);
  await sharp(Buffer.from(svg)).png().toFile(svgOut.replace(/\.svg$/, '.png'));
  console.log(`preview → ${svgOut}.png`);
}
