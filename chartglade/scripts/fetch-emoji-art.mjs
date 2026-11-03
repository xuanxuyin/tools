/**
 * Vendors the letter-coloring object drawings from OpenMoji's "black"
 * line-art set (https://openmoji.org, CC BY-SA 4.0) into public/images/emoji/.
 * Professional hand-drawn outlines — the quality bar the hand-coded SVG
 * library in src/lib/drawings.ts could not reach (PLAN 2026-11-03).
 *
 * Words without an OpenMoji equivalent stay on the hand-coded drawings
 * (see EMOJI_ART gaps in src/lib/drawings.ts).
 *
 * Run: node scripts/fetch-emoji-art.mjs   (needs the socks proxy for openmoji.org)
 * License: CC BY-SA 4.0 — credited in public/images/emoji/CREDITS.md and in
 * the gallery footer.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'public', 'images', 'emoji');

/** coloring word → OpenMoji codepoint (black line-art variant). */
export const EMOJI_ART = {
  apple: '1F34E',
  ant: '1F41C',
  ball: '1F3D0',
  bear: '1F43B',
  boat: '26F5',
  cat: '1F431',
  car: '1F697',
  cake: '1F382',
  dog: '1F415',
  duck: '1F985',
  door: '1F6AA',
  egg: '1F95A',
  elf: '1F9DD',
  envelope: '2709',
  fish: '1F41F',
  frog: '1F438',
  goat: '1F410',
  gift: '1F381',
  grapes: '1F347',
  hat: '1F3A9',
  hen: '1F414',
  house: '1F3E0',
  insect: '1F41B',
  jet: '1F6E9',
  jelly: '1F36E',
  juice: '1F9C3',
  kite: '1FA81',
  king: '1F451',
  queen: '1F478',
  key: '1F511',
  lion: '1F981',
  leaf: '1F342',
  moon: '1F319',
  milk: '1F95B',
  mouse: '1F42D',
  nose: '1F443',
  nut: '1F95C',
  owl: '1F989',
  octopus: '1F419',
  ox: '1F403',
  yak: '1F402',
  pig: '1F437',
  pen: '1F58A',
  pizza: '1F355',
  rain: '1F327',
  robot: '1F916',
  rocket: '1F680',
  sun: '1F31E',
  sock: '1F9E6',
  star: '2B50',
  tree: '1F333',
  train: '1F682',
  tiger: '1F42F',
  umbrella: '1F302',
  unicorn: '1F984',
  van: '1F690',
  violin: '1F3BB',
  volcano: '1F30B',
  whale: '1F40B',
  web: '1F578',
  watermelon: '1F349',
  xray: '1FA7A',
  feather: '1FAB6',
  fox: '1F98A',
  box: '1F4E6',
  yarn: '1F9F6',
  zebra: '1F993',
};

const PROXY = 'socks5h://127.0.0.1:10808';
mkdirSync(OUT, { recursive: true });

let ok = 0;
const failed = [];
for (const [obj, code] of Object.entries(EMOJI_ART)) {
  const dest = resolve(OUT, `${obj}.svg`);
  if (existsSync(dest)) {
    ok++;
    continue;
  }
  const url = `https://openmoji.org/data/black/svg/${code}.svg`;
  try {
    const svg = execFileSync(
      'curl',
      ['-sL', '--fail', '--max-time', '30', '-x', PROXY, url],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    );
    if (!svg.includes('<svg')) throw new Error('not svg');
    writeFileSync(dest, svg);
    ok++;
  } catch (e) {
    failed.push(`${obj} (${code}): ${e.message}`);
  }
}
console.log(`fetched ${ok}/${Object.keys(EMOJI_ART).length}`);
if (failed.length) {
  console.log('FAILED:');
  for (const f of failed) console.log(' -', f);
  process.exitCode = 1;
}
