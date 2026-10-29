// Real-browser guard for the paintArt pipeline: every .cbn-fact text bbox must
// fit its cell (CSS-vs-presentation-attribute fights are invisible to vitest —
// the 2026-10-29 spill bug shipped with 305 tests green). Run after any
// paintArt / cbn CSS change:  node scripts/cbn-visual-check.mjs
import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  try { const d = readFileSync(resolve('dist', '.' + p)); res.writeHead(200, { 'content-type': MIME[extname(p)] ?? 'application/octet-stream' }); res.end(d); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const browser = await chromium.launch({ channel: 'msedge', headless: true });
let allOk = true;
for (const u of ['thanksgiving-color-by-number', 'christmas-color-by-number', 'halloween-color-by-number']) {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}/${u}/`);
  await page.waitForSelector('.cbn-board svg');
  await page.waitForTimeout(300);
  const { total, spills } = await page.evaluate(() => {
    let total = 0; const spills = [];
    document.querySelectorAll('.cbn-board svg').forEach((svg) => {
      svg.querySelectorAll('text.cbn-fact').forEach((t) => {
        total++;
        const bb = t.getBBox();
        const halfW = bb.width / 2;
        const inner = 10 / 2 - 0.4;
        if (halfW > inner) spills.push(`${t.textContent} @${t.getAttribute('font-size')} spill=${(halfW - inner).toFixed(2)}`);
      });
    });
    return { total, spills };
  });
  console.log(`${u}: ${total} facts, ${spills.length} spilling ${spills.length ? JSON.stringify(spills.slice(0, 5)) : '✓'}`);
  if (spills.length) allOk = false;
  await page.close();
}
await browser.close(); server.close();
console.log(allOk ? 'ALL CLEAN' : 'STILL SPILLING');
