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
  { page: 'multiplication-chart', file: 'multiplication-chart-1-12-printable' },
  { page: 'place-value-chart', file: 'place-value-chart-to-millions-printable' },
  { page: 'kindergarten-sight-words', file: 'kindergarten-sight-words-printable' },
  { page: 'cursive-alphabet', file: 'cursive-alphabet-chart-printable' },
  { page: 'alphabet-chart', file: 'alphabet-chart-printable' },
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
