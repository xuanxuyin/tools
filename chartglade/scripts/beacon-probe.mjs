/**
 * CF Web Analytics beacon probe (2026-09-20): fetches raw response HTML via
 * real headless Edge for both prod sites. CF auto-inject is fingerprint-gated
 * as of Sept 2026 — curl (even with browser UA + Accept) gets NO beacon, so
 * curl-based checks are invalid; this probe is the standard verdict tool.
 * Also reports the build-time GA4 gtag as a control.
 *
 * Run from chartglade/:  node scripts/beacon-probe.mjs
 */
import { chromium } from 'playwright-core';

const URLS = [
  'https://chartglade.com/',
  'https://chartglade.com/cursive/a/',
  'https://tintbrew.com/',
  'https://tintbrew.com/mix/red-blue/',
];

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
for (const url of URLS) {
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const html = await resp.text();
    const beacon = /cloudflareinsights|beacon\.min\.js/i.test(html);
    const token = html.match(/data-cf-beacon="([^"]{0,60})/)?.[1] ?? '';
    const gtag = /googletagmanager\.com\/gtag\/js/.test(html);
    console.log(`${url} -> status=${resp.status()} beacon=${beacon} gtag=${gtag} ${token}`);
  } catch (e) {
    console.log(`${url} -> ERROR ${e.message}`);
  }
}
await browser.close();
