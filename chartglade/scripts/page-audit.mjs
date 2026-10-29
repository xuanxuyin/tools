// Local-only DOM audit for every built page (no network egress beyond the
// local file): broken images, horizontal overflow, empty SVGs, NaN/undefined
// text leaks, duplicate ids, missing h1, console errors. Run after build:
//   node scripts/page-audit.mjs
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'node:url';
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';
import { createServer } from 'node:http';

function htmlFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (e === 'index.html') out.push(p);
  }
  return out;
}
const DIST = resolve('dist');
const files = htmlFiles(DIST);
// Serve dist over loopback HTTP so root-absolute asset paths resolve
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'text/xml', '.txt': 'text/plain' };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  try {
    const buf = readFileSync(resolve('dist', '.' + p));
    res.setHeader('content-type', MIME[extname(p)] ?? 'application/octet-stream');
    res.end(buf);
  } catch { res.statusCode = 404; res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const problems = [];
for (const f of files) {
  const slug = f.slice(DIST.length + 1).replace(/(\\|\/)index\.html$/, '');
  const errors = [];
  const onErr = (e) => errors.push(String(e));
  page.on('pageerror', onErr);
  await page.goto(BASE + '/' + f.slice(DIST.length + 1).split('\\').join('/'), { waitUntil: 'load' });
  // scroll lazy images into view before judging them broken (false-positive
  // found 2026-10-29: multiplication-chart-1-15 flagged without scrolling)
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 800) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  await page.waitForTimeout(300);
  page.off('pageerror', onErr);
  const r = await page.evaluate(() => {
    const bad = [];
    for (const img of document.images) if (!img.complete || img.naturalWidth === 0) bad.push(img.getAttribute('src'));
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const emptySvgs = [...document.querySelectorAll('svg')].filter((s) => s.childElementCount === 0).length;
    const text = document.body.innerText;
    const leaks = ['NaN', 'undefined', '[object'].filter((k) => text.includes(k));
    const h1s = document.querySelectorAll('h1').length;
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
    const dup = ids.filter((v, i) => v && ids.indexOf(v) !== i);
    return { badImgs: bad, overflow, emptySvgs, leaks, h1s, dup: [...new Set(dup)], title: document.title };
  });
  if (r.badImgs.length) errors.push(`broken imgs: ${r.badImgs.join(',')}`);
  if (r.overflow > 1) errors.push(`h-overflow ${r.overflow}px`);
  if (r.emptySvgs) errors.push(`${r.emptySvgs} empty svg`);
  if (r.leaks.length) errors.push(`text leaks ${r.leaks.join(',')}`);
  if (r.h1s !== 1) errors.push(`h1 count ${r.h1s}`);
  if (r.dup.length) errors.push(`dup ids ${r.dup.slice(0, 3).join(',')}`);
  if (errors.length) problems.push(`/${slug}/: ${errors.join(' | ')}`);
  else console.log(`ok /${slug}/`);
}
await browser.close();
server.close();
console.log(`\n${files.length} pages, ${problems.length} with problems:`);
problems.forEach((p) => console.log(p));
