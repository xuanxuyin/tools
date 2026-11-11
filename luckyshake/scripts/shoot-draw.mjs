// TEMP probe shooter: real-time CDP so rAF-driven 3D animation actually runs.
// Usage: node .shots/shoot.mjs <path-suffix> <out-name>
import puppeteer from 'puppeteer-core';

const which = process.argv[2] ?? 'en';
const out = process.argv[3] ?? 'shot';
const url = which === 'zh' ? 'http://localhost:4322/zh/fortune-stick/' : 'http://localhost:4322/fortune-stick/';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--disable-gpu', '--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 560, height: 1400 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
// wait until the 3D jar booted (photo poster removed)
await page.waitForSelector('[data-jar3d] .jar-poster', { hidden: true, timeout: 30000 });
await page.screenshot({ path: `.shots/${out}-idle.png` });
await page.click('[data-shake]');
// real time: shake 0.9s -> pop -> flight ~0.75s -> bounce -> focus at +0.95s
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: `.shots/${out}-mid.png` });
await new Promise((r) => setTimeout(r, 3000));
await page.screenshot({ path: `.shots/${out}-draw.png` });
await browser.close();
console.log('done', out);
