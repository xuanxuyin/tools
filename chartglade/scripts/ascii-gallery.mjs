/**
 * Dev-only visual check: downsample a letter gallery PNG to ASCII so the
 * hand-coded SVG shapes can be eyeballed without uploading anything.
 * Run: node scripts/ascii-gallery.mjs d f o u v x y z
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const letters = process.argv.slice(2).length ? process.argv.slice(2) : ['a'];
const COLS = 150;

for (const letter of letters) {
  const file = resolve(ROOT, 'public', 'images', `letter-${letter}-coloring-page.png`);
  const png = PNG.sync.read(readFileSync(file));
  const rows = Math.round((png.height / png.width) * COLS * 0.5);
  const cellW = png.width / COLS;
  const cellH = png.height / rows;
  console.log(`\n=== letter ${letter}  (${png.width}x${png.height}) ===`);
  let out = '';
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < COLS; c++) {
      let dark = 0;
      const x0 = Math.floor(c * cellW);
      const y0 = Math.floor(r * cellH);
      for (let y = y0; y < Math.min(png.height, y0 + cellH); y++) {
        for (let x = x0; x < Math.min(png.width, x0 + cellW); x++) {
          const i = (png.width * y + x) << 2;
          if (png.data[i] < 128) dark++;
        }
      }
      const density = dark / (cellW * cellH);
      line += density > 0.28 ? '@' : density > 0.12 ? '#' : density > 0.045 ? '+' : density > 0.012 ? '.' : ' ';
    }
    out += line + '\n';
  }
  console.log(out);
}
