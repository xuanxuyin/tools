/**
 * Generates the in-page content preview images (public/images/) for the
 * Google Images channel: screenshots the .printable element straight from
 * the local dist/ build at 2x. The printable sheet IS the image — the same
 * channel the incumbents run (Superstar declares ~23 images per page in its
 * sitemap; we start with the pillar pages).
 *
 * Serves dist/ over a throwaway http server (not file://) so self-hosted
 * woff2 fonts render in the shot.
 *
 * Run: npm run sheet-images   (requires a fresh `npm run build` in dist/)
 * Keep SHOTS in sync with the sheetImage fields in src/data/*.ts — the
 * dimensions logged here are what those fields must declare.
 */
import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');
const OUT = resolve(ROOT, 'public', 'images');

const SHOTS = [
  // Wave 1 (2026-09-18, the five pillar pages) is NOT re-shot: its PNGs are on
  // disk and their pages have since gained in-page islands whose DOM order
  // could shift the first .printable. Only wave 2 (PLAN #32, the 2026-10-29
  // benchmark batch: math cluster + halloween + the 26-letter matrix) runs.
  { page: 'multiplication-chart-blank', file: 'blank-multiplication-chart-printable' },
  { page: 'multiplication-chart-1-15', file: 'multiplication-chart-1-15-printable' },
  { page: 'multiplication-chart-1-20', file: 'multiplication-chart-1-20-printable' },
  { page: 'decimal-place-value-chart', file: 'decimal-place-value-chart-printable' },
  { page: 'place-value-anchor-chart', file: 'place-value-anchor-chart-printable' },
  { page: 'place-value-chart-printable', file: 'place-value-chart-printable-blank' },
  { page: 'hundred-chart', file: 'hundred-chart-printable' },
  { page: 'number-line-printable', file: 'number-line-printable' },
  { page: 'addition-chart', file: 'addition-chart-printable' },
  { page: 'fraction-chart', file: 'fraction-strips-printable' },
  { page: 'halloween-word-search', file: 'halloween-word-search-printable' },
  { page: 'halloween-color-by-number', file: 'halloween-color-by-number-printable' },
  { page: 'halloween-cursive-practice', file: 'halloween-cursive-practice-printable' },
  ...'abcdefghijklmnopqrstuvwxyz'.split('').map((l) => ({
    page: `cursive/${l}`,
    file: `cursive-letter-${l}-worksheet`,
  })),
];

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const server = createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname.endsWith('/')) pathname += 'index.html';
  const file = resolve(DIST, `.${pathname}`);
  try {
    const data = readFileSync(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({ channel: 'msedge', headless: true });
mkdirSync(OUT, { recursive: true });

try {
  const dims = {};
  for (const { page, file } of SHOTS) {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 1000 },
      deviceScaleFactor: 2,
    });
    const p = await ctx.newPage();
    await p.goto(`${base}/${page}/`);
    await p.waitForSelector('.printable');
    await p.waitForTimeout(500); // let fonts/interact settle
    const el = await p.$('.printable');
    const shot = await el.screenshot();
    await ctx.close();

    const out = resolve(OUT, `${file}.png`);
    writeFileSync(out, shot);
    const png = PNG.sync.read(readFileSync(out));
    dims[file] = { width: png.width, height: png.height };
    console.log(`wrote ${file}.png  ${png.width}x${png.height}  ${Math.round(shot.length / 1024)} KB`);
  }
  console.log('// paste into the sheetImage fields:');
  console.log(JSON.stringify(dims, null, 2));
} finally {
  await browser.close();
  server.close();
}
