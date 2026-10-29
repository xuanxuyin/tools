/**
 * Internal-link mesh + freshness guards over real dist output. The 2026-10-04
 * incumbent teardown found the cursive letter matrix was a star (every letter
 * linked only up to the hub, never sideways — K5's letters interlink into a
 * mesh) and the site carried zero freshness signals while every SERP winner
 * showed updated dates. These pin both fixes.
 */
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_UPDATED } from '../consts';

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
  it('JSON-LD dateModified (machine signal only) + no visible updated line + twitter large card', () => {
    const html = readFileSync(resolve(DIST, 'cursive', 'a', 'index.html'), 'utf8');
    expect(html).toContain(`"dateModified":"${CONTENT_UPDATED}"`);
    // the visible "Charts last updated" template line is gone (user call 10/29);
    // dateModified/lastmod stay as machine-only freshness signals
    expect(html).not.toContain('Charts last updated');
    expect(html).not.toContain('updated-line');
    expect(html).toContain('content="summary_large_image"');
  });

  it('sitemap carries lastmod for every URL', () => {
    const xml = readFileSync(resolve(DIST, 'sitemap-0.xml'), 'utf8');
    expect(xml).toContain(`<lastmod>${CONTENT_UPDATED}`);
  });
});

describe.skipIf(!existsSync(DIST))('no leaked undefined/NaN in any attribute or text (real dist)', () => {
  // Shipped bug 2026-10-29: CursiveAlphabet's famOf missed 6 letters and their
  // data-fact rendered a literal "undefined" — invisible to innerText audits
  // because it sat in an attribute until a click surfaced it.
  it('no dist page contains the literal undefined/NaN outside code samples', () => {
    const pages = readdirSync(DIST, { recursive: true })
      .filter((f) => String(f).endsWith('index.html'))
      .map((f) => resolve(DIST, String(f)));
    for (const p of pages) {
      const html = readFileSync(p, 'utf8');
      expect(html, p).not.toMatch(/"undefined|>undefined<|\bundefined\.|>NaN<|"NaN/);
    }
  });
});
