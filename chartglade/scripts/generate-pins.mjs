/**
 * Generates Pinterest pin images (1000×1500 @2x) into pins-output/:
 * screenshots the live .printable element from the local dist/ build,
 * composites it onto the brand card (deep-green gradient + Arial Black
 * headline + mint sub), renders via headless Edge (system channel —
 * no browser download), exports PNG.
 *
 * Run: npm run pins   (requires a fresh `npm run build` in dist/)
 */
import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');
const OUT = resolve(ROOT, 'pins-output');

// Copy lives in docs/chartglade/DISTRIBUTION.md §1.3 — keep the two in sync.
const PINS = [
  {
    file: 'pin-1-cursive-alphabet',
    page: 'cursive-alphabet',
    lines: ['FREE', 'Cursive Alphabet', 'Chart'],
    sub: 'Print in one click',
  },
  {
    file: 'pin-2-place-value',
    page: 'place-value-chart',
    lines: ['FREE', 'Place Value Chart'],
    sub: 'Ones to millions, one page',
  },
  {
    file: 'pin-3-multiplication',
    page: 'multiplication-chart',
    lines: ['Multiplication', 'Chart 1-12'],
    sub: 'Free & printable',
  },
  {
    file: 'pin-4-sight-words',
    page: 'kindergarten-sight-words',
    lines: ['Kindergarten', 'Sight Words'],
    sub: 'Full list, printable',
  },
  {
    file: 'pin-5-cursive-f',
    page: 'cursive/f',
    lines: ['Cursive F', 'How to Write It'],
    sub: 'Free practice sheet',
  },
];

function pinHtml({ lines, sub, shotB64 }) {
  const headline = lines
    .map(
      (l) =>
        `<div class="line${l === 'FREE' ? ' free' : ''}">${l}</div>`,
    )
    .join('');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 1000px; height: 1500px; overflow: hidden; }
    body {
      font-family: 'Arial Black', Arial, sans-serif;
      background: linear-gradient(180deg, #12301e 0%, #2f7d4f 78%, #2f7d4f 100%);
      color: #fff;
      display: flex; flex-direction: column; align-items: center;
      padding: 64px 56px 48px;
    }
    .mark { font-size: 26px; letter-spacing: 10px; color: rgba(255,255,255,.82); }
    .head { margin-top: 54px; text-align: center; line-height: 1.04; }
    .line { font-size: ${lines.length >= 3 ? 94 : 108}px; letter-spacing: -1px; }
    .line.free { color: #7ddba3; font-size: 64px; letter-spacing: 6px; margin-bottom: 10px; }
    .sub {
      margin-top: 26px; font-family: Arial, sans-serif; font-weight: bold;
      font-size: 27px; letter-spacing: 4px; text-transform: uppercase;
      color: #7ddba3;
    }
    .card {
      margin-top: 44px; flex: 1; width: 100%;
      background: #fff; border-radius: 22px; padding: 16px;
      box-shadow: 0 24px 60px rgba(0,0,0,.35);
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
    }
    .card img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .site { margin-top: 34px; font-family: Arial, sans-serif; font-size: 25px; color: rgba(255,255,255,.9); }
  </style></head><body>
    <div class="mark">CHARTGLADE</div>
    <div class="head">${headline}</div>
    <div class="sub">${sub}</div>
    <div class="card"><img src="data:image/png;base64,${shotB64}"></div>
    <div class="site">chartglade.com</div>
  </body></html>`;
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });
mkdirSync(OUT, { recursive: true });

try {
  for (const pin of PINS) {
    // 1) shoot the printable from the dist build (2x for sharpness)
    const shootCtx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 2,
    });
    const shootPage = await shootCtx.newPage();
    await shootPage.goto(
      `file://${resolve(DIST, pin.page, 'index.html').replace(/\\/g, '/')}`,
    );
    await shootPage.waitForSelector('.printable');
    await shootPage.waitForTimeout(400); // let fonts/interact settle
    const el = await shootPage.$('.printable');
    const shot = await el.screenshot();
    await shootCtx.close();

    // 2) composite onto the pin card at 1000×1500 @2x
    const pinCtx = await browser.newContext({
      viewport: { width: 1000, height: 1500 },
      deviceScaleFactor: 2,
    });
    const pinPage = await pinCtx.newPage();
    await pinPage.setContent(pinHtml({ ...pin, shotB64: shot.toString('base64') }));
    await pinPage.waitForTimeout(200); // decode the embedded shot
    const out = await pinPage.screenshot({ clip: { x: 0, y: 0, width: 1000, height: 1500 } });
    await pinCtx.close();

    const file = resolve(OUT, `${pin.file}.png`);
    writeFileSync(file, out);
    console.log(`wrote ${file} (2000x3000)`);
  }
} finally {
  await browser.close();
}
