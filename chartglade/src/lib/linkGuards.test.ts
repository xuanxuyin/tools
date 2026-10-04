/**
 * Internal-link mesh + freshness guards over real dist output. The 2026-10-04
 * incumbent teardown found the cursive letter matrix was a star (every letter
 * linked only up to the hub, never sideways — K5's letters interlink into a
 * mesh) and the site carried zero freshness signals while every SERP winner
 * showed updated dates. These pin both fixes.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');

describe.skipIf(!existsSync(DIST))('cursive internal-link mesh (real dist)', () => {
  it('every letter page links all 26 letters via the A-Z strip', () => {
    for (const l of LETTERS) {
      const html = readFileSync(resolve(DIST, 'cursive', l, 'index.html'), 'utf8');
      for (const other of LETTERS) {
        expect(html, `cursive/${l} → cursive/${other}`).toContain(`href="/cursive/${other}/"`);
      }
    }
  });

  it('the cursive-alphabet chart page carries the strip too', () => {
    const html = readFileSync(resolve(DIST, 'cursive-alphabet', 'index.html'), 'utf8');
    expect(html.match(/href="\/cursive\/[a-z]\/"/g)!.length).toBeGreaterThanOrEqual(26);
  });
});

describe.skipIf(!existsSync(DIST))('freshness signals (real dist)', () => {
  it('JSON-LD dateModified + visible updated line + twitter large card', () => {
    const html = readFileSync(resolve(DIST, 'cursive', 'a', 'index.html'), 'utf8');
    expect(html).toContain('"dateModified":"2026-10-04"');
    expect(html).toContain('Charts last updated');
    expect(html).toContain('content="summary_large_image"');
  });

  it('sitemap carries lastmod for every URL', () => {
    const xml = readFileSync(resolve(DIST, 'sitemap-0.xml'), 'utf8');
    expect(xml).toContain('<lastmod>2026-10-04');
  });
});
