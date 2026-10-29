// Render every imported pattern to a full-resolution webp card thumbnail.
// Card positions used to inline a decimated SVG (f×f majority vote, ≤40
// beads wide) to stay under Cloudflare's 25 MiB single-file cap — the loss
// read as "rough, nobody wants to click" next to the source site's crisp
// bitmaps (user call, 2026-10-29). Thumbnails are now real image files with
// the same rendering as the detail-page figures: contiguous bead squares on
// a gray pegboard with round peg holes.
// Rerun after any import change, right after build.mjs. Also deletes stale
// thumbs (a dropped pattern must not leave its file behind).
import { mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import sharp from 'sharp';

// hexes from the source of truth — palette.mjs's snapshot covers only the
// hand-drawn subset and the flight-imported set uses the whole 103 line
const HEX = new Map(
  [...readFileSync('src/lib/beadPalette.ts', 'utf8').matchAll(
    /\{[^{}]*?id:\s*'([^']+)'[^{}]*?hex:\s*'(#[0-9a-fA-F]{6})'[^{}]*?\}/g,
  )].map((m) => [m[1], m[2].toLowerCase()]),
);

const OUT = 'public/pattern-thumbs';
mkdirSync(OUT, { recursive: true });

const seen = new Set();
for (const bucket of ['animals', 'characters', 'food', 'halloween', 'minis']) {
  const mod = await import(`./imported-${bucket}.mjs`);
  for (const def of mod[`IMPORTED_${bucket.toUpperCase()}`]) {
    seen.add(def.slug);
    const zoneHex = {};
    for (const [L, z] of Object.entries(def.zones)) {
      const hex = HEX.get(z.color);
      if (!hex) throw new Error(`${def.slug}: bead id "${z.color}" missing from src/lib/beadPalette.ts`);
      zoneHex[L] = hex;
    }
    // ≥10 px per bead, and never narrower than 200 px, so minis stay crisp
    // when cards scale them up
    const px = Math.max(10, Math.ceil(200 / def.W));
    let pegs = '';
    let cells = '';
    def.rows.forEach((row, y) => {
      for (let x = 0; x < def.W; x++) {
        const ch = row[x] ?? '.';
        if (ch === '.') {
          pegs += `<circle cx="${x * px + px / 2}" cy="${y * px + px / 2}" r="${(px * 0.16).toFixed(2)}" fill="rgba(0,0,0,0.15)"/>`;
        } else {
          cells += `<rect x="${x * px}" y="${y * px}" width="${px}" height="${px}" fill="${zoneHex[ch]}"/>`;
        }
      }
    });
    const w = def.W * px;
    const h = def.H * px;
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
      `<rect width="${w}" height="${h}" fill="#e2e4df"/>${pegs}${cells}</svg>`;
    await sharp(Buffer.from(svg)).webp({ lossless: true }).toFile(`${OUT}/${def.slug}.webp`);
  }
}

let removed = 0;
for (const f of readdirSync(OUT)) {
  const slug = f.replace(/\.webp$/, '');
  if (!seen.has(slug)) {
    rmSync(`${OUT}/${f}`);
    removed++;
  }
}
console.log(`${seen.size} thumbnails → ${OUT} (lossless webp)${removed ? `, removed ${removed} stale` : ''}`);
