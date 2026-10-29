// Internal link graph audit: every same-site href in every dist page must
// resolve to a built file; sitemap URLs must match built files both ways.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

function htmlFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = dir + '/' + e;
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (e === 'index.html') out.push(p);
  }
  return out;
}
const DIST = 'dist';
const SEP = String.fromCharCode(92);
const pages = htmlFiles(DIST);
const built = new Set(pages.map((p) => '/' + p.slice(DIST.length + 1).split(SEP).join('/').replace(/index\.html$/, '')));
const problems = [];
for (const f of pages) {
  const slug = '/' + f.slice(DIST.length + 1).split(SEP).join('/').replace(/index\.html$/, '');
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/href="(https?:\/\/chartglade\.com[^"]*|\/[^"]+)"/g)) {
    let href = m[1].replace('https://chartglade.com', '');
    if (href.includes('#')) href = href.slice(0, href.indexOf('#'));
    if (/\.(css|js|png|svg|xml|ico|txt|woff2)$/.test(href)) continue;
    if (!built.has(href)) problems.push(`${slug} -> ${href} (404)`);
  }
}
// sitemap both ways
const sm = readFileSync(DIST + '/sitemap-index.xml', 'utf8');
const smFile = sm.match(/<loc>[^<]*sitemap([^<]*)\.xml<\/loc>/)?.[1];
const urls = [...readFileSync(DIST + '/sitemap' + (smFile ?? '-0') + '.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace('https://chartglade.com', ''));
const smSet = new Set(urls);
for (const u of smSet) if (!built.has(u)) problems.push(`sitemap has ${u} but not built`);
for (const b of built) if (!smSet.has(b) && b !== '/404/') problems.push(`built ${b} missing from sitemap`);
console.log(`${pages.length} pages, ${problems.length} problems`);
problems.forEach((p) => console.log(p));
