/**
 * 签卡生成器：public/img/sticks/sign-{1..100}.png（1200×630 分享卡）
 *  - 数据源 = src/data/signs.ts（SIGNS）+ src/data/signverses? 否：SIGN_VERSES 在 src/data/signVerses.ts
 *  - 三张样卡 sign-1/61/73（11-11 提交 9e8661d）为设计基准：深紫底 + 奶油卡面 +
 *    Pinyon Script 签名 + EB Garamond 诗句；字体 TTF 入库 scripts/fonts/（OFL）
 *  - og:image / 分享功能共用这批 PNG（signs/[slug] 页 + 抽签揭示的分享卡）
 *  - 跑法：node scripts/make-sign-cards.mjs [--only=1,61]（本机需 Chrome；
 *    puppeteer-core 不带浏览器，executablePath 走 CHROME_PATH 或默认安装位）
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import puppeteer from 'puppeteer-core';
import { SIGNS } from '../src/data/signs.ts';
import { SIGN_VERSES } from '../src/data/signVerses.ts';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const outDir = join(root, 'public', 'img', 'sticks');
mkdirSync(outDir, { recursive: true });

const font = (f) => 'file:///' + join(here, 'fonts', f).replace(/\\/g, '/');
const only = process.argv.find((a) => a.startsWith('--only='));
const wanted = only ? only.slice(7).split(',').map(Number) : null;

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const GRADE = {
  blessing: { label: 'BLESSING', bg: '#15803d' },
  nudge: { label: 'NUDGE', bg: '#3f5edc' },
  'gentle-warning': { label: 'GENTLE WARNING', bg: '#b3622a' },
};

const page = ({ no, name, grade, verse }) => `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face { font-family: 'Pinyon'; src: url('fonts/PinyonScript-Regular.ttf'); }
  @font-face { font-family: 'Garamond'; font-weight: 400; src: url('fonts/EBGaramond-Regular.ttf'); }
  @font-face { font-family: 'Garamond'; font-weight: 600; src: url('fonts/EBGaramond-SemiBold.ttf'); }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    background:
      radial-gradient(1100px 500px at 78% -8%, rgba(120,96,180,.16), transparent 60%),
      radial-gradient(900px 480px at 12% 108%, rgba(150,60,60,.10), transparent 55%),
      #241f3d;
    font-family: 'Garamond', Georgia, serif;
    position: relative;
  }
  .card {
    position: absolute; left: 88px; top: 70px; width: 1024px; height: 438px;
    background: #f7efdd; border: 2px solid #d94a35; border-radius: 30px;
    box-shadow: 0 18px 44px rgba(0,0,0,.45);
    display: flex; flex-direction: column; align-items: center;
  }
  .inner {
    position: absolute; inset: 9px; border: 1px solid rgba(176,141,73,.55); border-radius: 21px;
    pointer-events: none;
  }
  .kicker {
    margin-top: 38px; font-weight: 600; font-size: 17px; letter-spacing: .42em;
    text-indent: .42em; color: #b3542c;
  }
  .pills { display: flex; gap: 12px; margin-top: 14px; }
  .pill {
    color: #fdf8ea; font-weight: 600; font-size: 17.5px; letter-spacing: .1em;
    padding: 5px 17px 6px; border-radius: 999px;
  }
  .pill.no { background: #d94a35; letter-spacing: .02em; }
  .name {
    font-family: 'Pinyon', cursive; font-size: 64px; line-height: 1.05;
    color: #2a2444; margin-top: 10px; text-align: center; max-width: 900px; white-space: nowrap;
  }
  .divider { display: flex; align-items: center; gap: 12px; margin-top: 10px; }
  .divider .line { width: 118px; height: 1.6px; background: #d4a017; }
  .divider .gem { width: 9px; height: 9px; background: #d4a017; transform: rotate(45deg); }
  .verse { margin-top: 16px; text-align: center; }
  .verse div { font-size: 28px; line-height: 1.5; color: #3b3456; white-space: nowrap; }
  .foot { position: absolute; left: 0; right: 0; top: 531px; text-align: center;
    color: #d9d2c0; font-size: 19px; }
  .foot b { font-weight: 600; letter-spacing: .04em; }
  .foot i { color: #8f89a0; font-size: 16px; }
</style>
<div class="card">
  <div class="inner"></div>
  <div class="kicker">THE 100 FORTUNES</div>
  <div class="pills">
    <span class="pill no">No. ${no}</span>
    <span class="pill grade" style="background:${GRADE[grade].bg}">${GRADE[grade].label}</span>
  </div>
  <div class="name" id="name">${esc(name)}</div>
  <div class="divider"><span class="line"></span><span class="gem"></span><span class="line"></span></div>
  <div class="verse" id="verse">${verse.map((l) => `<div>${esc(l)}</div>`).join('')}</div>
</div>
<div class="foot"><b>Fortune Willow</b> &nbsp;·&nbsp; <i>fortune-stick reading</i></div>
<script>
  // 长诗句/长签名自适应：超宽整体降字号（100 签里行长不齐）
  const fit = (el, cap, max, min, base) => {
    const w = el.getBoundingClientRect().width;
    if (w > max) el.style.fontSize = Math.max(min, Math.floor(base * max / w)) + 'px';
  };
  fit(document.getElementById('name'), 64, 880, 44, 64);
  const lines = [...document.querySelectorAll('#verse div')];
  const widest = Math.max(...lines.map((l) => l.getBoundingClientRect().width));
  if (widest > 880) {
    const fs = Math.max(20, Math.floor(28 * 880 / widest));
    lines.forEach((l) => (l.style.fontSize = fs + 'px'));
  }
</script>
`;

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath:
    process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  args: ['--no-proxy-server'],
});
const page_ = await browser.newPage();
await page_.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

// HTML 必须以 file:// 打开(放在 scripts/ 下,模板里的相对 fonts/ 才能解析;
// setContent 的 about:blank 会被拦 file:// 字体——首测踩过)
const tmpHtml = join(here, '.card-tmp.html');
let made = 0;
for (const s of SIGNS) {
  if (wanted && !wanted.includes(s.id)) continue;
  const v = SIGN_VERSES[s.id];
  if (!v) { console.error(`no verse for sign ${s.id}, skipped`); continue; }
  writeFileSync(tmpHtml, page({ no: s.id, name: s.name, grade: s.grade, verse: v.en }));
  await page_.goto('file:///' + tmpHtml.replace(/\\/g, '/'));
  await page_.evaluate(() => document.fonts.ready);
  await page_.screenshot({ path: join(outDir, `sign-${s.id}.png`) });
  made++;
}
await browser.close();
rmSync(tmpHtml);
console.log(`made ${made} cards -> ${outDir}`);
