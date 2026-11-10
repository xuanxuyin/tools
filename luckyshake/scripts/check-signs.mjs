/**
 * 内容校验（只查不改）：
 *  1) 跨签 trigram Jaccard > 0.30 视为重复
 *  2) 同签内两条镜头 bigram Jaccard >= 0.25 视为孪生
 *  3) 中文字段混入拉丁字符（白名单外）
 *  4) 长度下限（EN 镜头 >15，中文镜像 >8）
 */
import { SIGNS } from '../src/data/signs.ts';

const tri = (s) => {
  const t = new Set();
  const c = [...s];
  for (let i = 0; i + 3 <= c.length; i++) t.add(c.slice(i, i + 3).join(''));
  return t;
};
const bi = (s) => {
  const t = new Set();
  const c = [...s];
  for (let i = 0; i + 2 <= c.length; i++) t.add(c.slice(i, i + 2).join(''));
  return t;
};
const jac = (a, b) => {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
};

let bad = 0;

// 1) cross-sign zh lens trigram dedup
const zhLens = SIGNS.flatMap((s) =>
  ['loveZh', 'moneyZh', 'careerZh'].map((f) => ({ id: s.id, f, text: s[f] })),
);
const triCache = zhLens.map((x) => ({ ...x, t: tri(x.text) }));
for (let i = 0; i < triCache.length; i++) {
  for (let j = i + 1; j < triCache.length; j++) {
    const s = jac(triCache[i].t, triCache[j].t);
    if (s > 0.3) {
      console.log(`跨签重复 ${s.toFixed(2)}: #${triCache[i].id}${triCache[i].f} vs #${triCache[j].id}${triCache[j].f}`);
      bad++;
    }
  }
}

// 2) same-sign zh lens twins
for (const s of SIGNS) {
  const pair = [
    ['loveZh', s.loveZh],
    ['moneyZh', s.moneyZh],
    ['careerZh', s.careerZh],
  ];
  const sets = pair.map(([f, t]) => ({ f, t: bi(t) }));
  for (let i = 0; i < 3; i++)
    for (let j = i + 1; j < 3; j++) {
      const v = jac(sets[i].t, sets[j].t);
      if (v >= 0.25) {
        console.log(`同签孪生 ${v.toFixed(2)}: #${s.id} ${sets[i].f} vs ${sets[j].f}`);
        bad++;
      }
    }
}

// 3) zh stray latin
const WL = /^(app|vs|B|X|OK|PPT|K)$/;
for (const s of SIGNS) {
  for (const f of ['titleZh', 'storyZh', 'overallZh', 'loveZh', 'moneyZh', 'careerZh', 'actionZh']) {
    const latin = s[f].match(/[A-Za-z]+/g) ?? [];
    for (const w of latin)
      if (!WL.test(w)) {
        console.log(`中文混拉丁: #${s.id} ${f} -> "${w}"`);
        bad++;
      }
  }
}

// 4) lengths
for (const s of SIGNS) {
  for (const f of ['love', 'money', 'career', 'action']) {
    if (s[f].length <= 15) {
      console.log(`EN 镜头过短: #${s.id} ${f}`);
      bad++;
    }
    if (s[f + 'Zh'].length <= 8) {
      console.log(`ZH 镜头过短: #${s.id} ${f}Zh`);
      bad++;
    }
  }
}

console.log(bad === 0 ? '内容校验：全部通过 ✓' : `内容校验：${bad} 处待修`);
process.exit(bad === 0 ? 0 : 1);
