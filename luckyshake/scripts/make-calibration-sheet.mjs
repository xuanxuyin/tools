/**
 * 校准工作底稿生成器 —— 只做摘录整理，不做任何内容生成。
 * 把每签的源牌分域断语（黄大仙仙机 / 关帝圣意 / 观音诗意解曰）
 * 与我们的 loveZh/moneyZh/careerZh 并排输出，供逐签人工对读校准。
 * 输出: D:/dev/tools/docs/luckyshake/calibration-sheet.md
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { SIGNS } from '../src/data/signs.ts';

const ROOT = 'D:/dev/tools';
const DECK_FILES = {
  黄大仙: ROOT + '/docs/fortune-draw/signs-wongtaisin.md',
  关帝: ROOT + '/docs/fortune-draw/signs-guandi.md',
  观音: ROOT + '/docs/fortune-draw/signs-guanyin.md',
};

function parseDeck(text) {
  const lots = {};
  for (const block of text.split(/^## /m)) {
    const head = block.match(/^第\s*(\d+)\s*签/);
    if (!head) continue;
    const no = Number(head[1]);
    const get = (key) => {
      const keyEsc = key.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
      const m = block.match(new RegExp('- ' + keyEsc + '：([^\\n]+)'));
      return m ? m[1].trim() : '';
    };
    lots[no] = {
      grade: get('吉凶'),
      story: get('典故'),
      xianji: get('仙机'),
      shengyi: get('圣意'),
      jieyue: get('解曰'),
      shiyi: get('诗意/解曰'),
    };
  }
  return lots;
}

const decks = Object.fromEntries(
  Object.entries(DECK_FILES).map(([name, path]) => [name, parseDeck(readFileSync(path, 'utf8'))]),
);

const signSrc = readFileSync(ROOT + '/luckyshake/src/data/signs.ts', 'utf8');
const srcComments = [...signSrc.matchAll(/\/\/ 源: (黄大仙|关帝|观音)第(\d+)签[^\n]*/g)].map((m) => ({
  deck: m[1],
  no: Number(m[2]),
  line: m[0].replace('// 源: ', ''),
}));
if (srcComments.length !== SIGNS.length) {
  console.error(`源注释 ${srcComments.length} 条 ≠ 签数 ${SIGNS.length} —— 映射断裂，中止`);
  process.exit(1);
}

const cut = (s, n) => (s.length > n ? s.slice(0, n) + '…' : s || '（源料缺此栏）');

let out = [
  '# 逐签源料校准底稿（机器摘录 · 人工对读）',
  '',
  '- 生成: ' + new Date().toISOString().slice(0, 10) + '，由 scripts/make-calibration-sheet.mjs 摘录，内容未改写',
  '- 用法: 逐签核对【仙机/圣意/诗意解曰】中 婚姻/婚(感情)、求财/财/利/交易(财运)、功名/名/谋望(事业) 的断语方向，',
  '  是否与我们的三条镜头一致；不一致处回 signs.ts 手工改写。',
  '',
].join('\n');

for (let i = 0; i < SIGNS.length; i++) {
  const s = SIGNS[i];
  const src = srcComments[i];
  const lot = decks[src.deck][src.no];
  if (!lot) {
    out += `\n## #${String(s.id).padStart(2, '0')} 【映射失联】${src.line}\n`;
    continue;
  }
  out += `\n## #${String(s.id).padStart(2, '0')} [${s.grade}] ${s.nameZh} ← ${src.deck}第${src.no}签 ${lot.grade} · ${lot.story}\n`;
  if (src.deck === '黄大仙') {
    out += `- 仙机: ${cut(lot.xianji, 220)}\n`;
    out += `- 解曰: ${cut(lot.jieyue, 180)}\n`;
  } else if (src.deck === '关帝') {
    out += `- 圣意: ${cut(lot.shengyi, 200)}\n`;
    out += `- 解曰: ${cut(lot.jieyue, 180)}\n`;
  } else {
    out += `- 诗意/解曰: ${cut(lot.shiyi, 200)}\n`;
  }
  out += `- 我们的感情: ${s.loveZh}\n`;
  out += `- 我们的财运: ${s.moneyZh}\n`;
  out += `- 我们的事业: ${s.careerZh}\n`;
}

mkdirSync(ROOT + '/docs/luckyshake', { recursive: true });
writeFileSync(ROOT + '/docs/luckyshake/calibration-sheet.md', out, 'utf8');
console.log(`OK: ${SIGNS.length} 签摘录完成 -> docs/luckyshake/calibration-sheet.md`);
for (const [name, lots] of Object.entries(decks)) console.log(`  ${name}: 解析到 ${Object.keys(lots).length} 签`);
