/**
 * Strips trailing slashes from sitemap URLs (except the homepage) so they
 * match the canonical tags and vercel.json `trailingSlash: false`.
 * Run after `astro build` (wired into `npm run build`).
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
let changed = 0;

for (const f of readdirSync(dist)) {
  if (!f.startsWith('sitemap-') || !f.endsWith('.xml')) continue;
  const p = resolve(dist, f);
  let xml = readFileSync(p, 'utf8');
  xml = xml.replace(/<loc>(https:\/\/tintbrew\.com[^<]*?)\/?<\/loc>/g, (_, url) => {
    if (url === 'https://tintbrew.com') return `<loc>${url}/</loc>`; // homepage keeps its slash
    changed++;
    return `<loc>${url}</loc>`;
  });
  writeFileSync(p, xml);
}

console.log(`fix-sitemap: stripped trailing slash from ${changed} URL(s)`);
