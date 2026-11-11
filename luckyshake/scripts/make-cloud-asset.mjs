/**
 * One-shot asset prep: turns docs/cloud.png (AI-generated xiangyun art with a
 * bottom-right watermark on a pure-white ground) into the shipped cut-out
 * public/img/xiangyun.png used by the jar skin texture.
 *
 *   node scripts/make-cloud-asset.mjs
 *
 * Steps: ① crop to the cloud's bounding box (ignores the watermark corner,
 * so it never ships) ② key the white ground to transparent while keeping the
 * cream highlight curls (distance-from-white alpha ramp) ③ trim + resize.
 * The watermarked source never enters dist/ — only the cleaned cut-out does.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'D:/dev/tools/docs/cloud.png';
const OUT = 'public/img/xiangyun.png';

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// --- ① subject bbox, ignoring the bottom-right watermark zone -------------
const W = info.width;
const H = info.height;
let minX = W, minY = H, maxX = 0, maxY = 0;
const nearWhite = (i) => {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const d = Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
  return d < 24; // background + antialias fringe
};
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    if (x > W * 0.7 && y > H * 0.86) continue; // watermark corner — skip
    if (!nearWhite(i)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const m = 14; // breathing margin
minX = Math.max(0, minX - m); minY = Math.max(0, minY - m);
maxX = Math.min(W - 1, maxX + m); maxY = Math.min(H - 1, Math.max(maxY, minY + 10) + m);
console.log(`subject bbox ${maxX - minX}x${maxY - minY} at (${minX},${minY})`);

// --- ② crop, then key white→transparent (keep cream #FFF3E0 curls) --------
const img = sharp(SRC).extract({
  left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1,
});
const cut = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const px = cut.data;
const cw = cut.info.width;
for (let i = 0; i < px.length; i += 4) {
  const r = px[i], g = px[i + 1], b = px[i + 2];
  const d = Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
  // pure white (d≈0) → gone; cream curl (d≈33) → kept solid
  let a = (d - 6) / 20;
  a = Math.max(0, Math.min(1, a));
  px[i + 3] = Math.round(px[i + 3] * a);
}

mkdirSync('public/img', { recursive: true });

// --- ③ recolor: red-on-red vanishes against the lacquer jar. Map the
// relief's luminance onto a gold ramp — 描金 clouds on red lacquer, with
// the cream highlight curls becoming pale gold crests.
const RAMP = [
  [0.0, 70, 32, 10], // deepest recess → bronze shadow
  [0.3, 176, 116, 36], // mid red → rich gold
  [0.5, 246, 192, 74], // bright red → bright gold
  [0.75, 255, 228, 140], // light tones → light gold
  [1.0, 255, 246, 205], // cream highlights → pale gold crest
];
for (let i = 0; i < px.length; i += 4) {
  if (px[i + 3] === 0) continue;
  const L = (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
  let a = RAMP[0], b = RAMP[RAMP.length - 1];
  for (let k = 0; k < RAMP.length - 1; k++) {
    if (L >= RAMP[k][0] && L <= RAMP[k + 1][0]) { a = RAMP[k]; b = RAMP[k + 1]; break; }
  }
  const t = b[0] === a[0] ? 0 : (L - a[0]) / (b[0] - a[0]);
  px[i] = Math.round(a[1] + (b[1] - a[1]) * t);
  px[i + 1] = Math.round(a[2] + (b[2] - a[2]) * t);
  px[i + 2] = Math.round(a[3] + (b[3] - a[3]) * t);
}

const out = await sharp(px, { raw: { width: cw, height: cut.info.height, channels: 4 } })
  .png()
  .toBuffer({ resolveWithObject: true });
await sharp(out.data)
  .resize({ width: 1024, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`wrote ${OUT}: ${meta.width}x${meta.height}, ${(meta.size / 1024).toFixed(0)} KB`);
