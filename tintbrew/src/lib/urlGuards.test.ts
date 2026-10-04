/**
 * Site-wide canonical/og:url guards over the real dist output. A page that
 * passes a trailing-slash path to SeoHead used to mint canonicals like
 * /color-mixing-chart// (fixed 2026-10-04) — this walks every built page so
 * any future regression of that shape fails the release gate, not GSC.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = resolve(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name === 'index.html') out.push(p);
  }
  return out;
}

describe.skipIf(!existsSync(DIST))('canonical / og:url guards (real dist)', () => {
  it('every page self-canonicalizes to its exact slashed URL, and og:url matches', () => {
    const pages = walk(DIST);
    expect(pages.length).toBeGreaterThan(90); // ~104 real pages; guard against an empty/partial build
    for (const file of pages) {
      const rel = file.slice(DIST.length + 1, -'index.html'.length).replace(/\\/g, '/');
      const expected = rel === '' ? 'https://tintbrew.com/' : `https://tintbrew.com/${rel}`;
      const html = readFileSync(file, 'utf8');
      const canonical = /rel="canonical" href="([^"]+)"/.exec(html)?.[1] ?? '';
      const ogUrl = /property="og:url" content="([^"]+)"/.exec(html)?.[1] ?? '';
      expect(canonical, `${rel || 'homepage'} canonical`).toBe(expected);
      expect(ogUrl, `${rel || 'homepage'} og:url`).toBe(expected);
    }
  });
});
