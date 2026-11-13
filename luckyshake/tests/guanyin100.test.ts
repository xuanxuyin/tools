import { describe, it, expect } from 'vitest';
import { GUANYIN_LOTS, getGuanyinLot, guanyinNumZh, GUANYIN_PALACES } from '../src/data/guanyin100';

/** known mojibake chars from the source zip — none may survive into the corpus */
const MOJIBAKE = /[蝘銝撠憿頧靘瑼嚗瘥堨冺痏甈閰瘜擃蝝撣]/;

const allStrings = (v: unknown): string[] => {
  if (typeof v === 'string') return [v];
  if (Array.isArray(v)) return v.flatMap(allStrings);
  if (v && typeof v === 'object') return Object.values(v).flatMap(allStrings);
  return [];
};

describe('guanyin100 corpus', () => {
  it('has exactly lots 1..100, unique and in order', () => {
    expect(GUANYIN_LOTS).toHaveLength(100);
    expect(GUANYIN_LOTS.map((l) => l.n)).toEqual(Array.from({ length: 100 }, (_, i) => i + 1));
  });

  it('grades: 上24 / 中58 / 下18, all graded', () => {
    const g = { 上: 0, 中: 0, 下: 0 };
    for (const l of GUANYIN_LOTS) {
      expect(['上', '中', '下']).toContain(l.grade);
      g[l.grade]++;
    }
    expect(g).toEqual({ 上: 24, 中: 58, 下: 18 });
  });

  it('every lot has a palace from the twelve branches', () => {
    expect(GUANYIN_PALACES).toHaveLength(12);
    for (const l of GUANYIN_LOTS) {
      expect(GUANYIN_PALACES).toContain(l.palace);
    }
  });

  it('poems: edition A always 4 lines, edition B 4 lines or absent', () => {
    for (const l of GUANYIN_LOTS) {
      expect(l.poemA, `lot${l.n} poemA`).toHaveLength(4);
      expect([0, 4]).toContain(l.poemB.length);
      for (const line of [...l.poemA, ...l.poemB]) {
        expect(line.length, `lot${l.n} line ${line}`).toBeGreaterThanOrEqual(3);
        expect(line.length).toBeLessThanOrEqual(20);
        expect(line).not.toMatch(/[：;。，]/); // 诗句无行内标点(标点是编辑注的信号)
      }
    }
  });

  it('詩意 and 解曰 present on every lot', () => {
    for (const l of GUANYIN_LOTS) {
      expect(l.shiyi.length, `lot${l.n} shiyi`).toBeGreaterThan(4);
      expect(l.jieyue.length, `lot${l.n} jieyue`).toBeGreaterThan(4);
    }
  });

  it('聖意: 14-item table everywhere except the 4 從缺 lots + lot 100 prose', () => {
    const absent: number[] = [];
    for (const l of GUANYIN_LOTS) {
      if (l.shengyi === undefined) absent.push(l.n);
      else {
        expect(l.shengyi.length, `lot${l.n} shengyi`).toBeGreaterThanOrEqual(12);
        expect(l.shengyi.some((s) => s.item === '家宅'), `lot${l.n} has 家宅 row`).toBe(true);
        for (const s of l.shengyi) expect(s.item.length).toBe(2); // 项目恒两字
      }
    }
    // 84/86/90/91 從缺 in the source; 100 keeps its prose note instead of a table
    expect(absent.sort((a, b) => a - b)).toEqual([84, 86, 90, 91, 100]);
    expect(GUANYIN_LOTS.find((l) => l.n === 100)?.shengyiProse).toContain('滿籤');
    for (const l of GUANYIN_LOTS) {
      if (l.n !== 100) expect(l.shengyiProse).toBeUndefined();
    }
  });

  it('stories: at least one per lot; totals 15 single / 79 double / 6 triple', () => {
    const counts = { 1: 0, 2: 0, 3: 0 } as Record<number, number>;
    for (const l of GUANYIN_LOTS) {
      expect(l.stories.length, `lot${l.n} stories`).toBeGreaterThanOrEqual(1);
      expect(l.stories.length).toBeLessThanOrEqual(3);
      counts[l.stories.length]++;
      for (const s of l.stories) {
        expect(s.title.length).toBeGreaterThan(1);
        // lot42 story 1 (15 chars) points to the Mulian story; lot45 story 3 (7
        // chars) is the source's own 此故事尚未尋得 — short pointers kept verbatim
        expect(s.text.length, `lot${l.n} story ${s.title}`).toBeGreaterThan(5);
      }
    }
    expect(counts).toEqual({ 1: 15, 2: 79, 3: 6 });
  });

  it('no source mojibake or site boilerplate survives anywhere in the corpus', () => {
    for (const l of GUANYIN_LOTS) {
      for (const s of allStrings(l)) {
        expect(s, `lot${l.n}`).not.toMatch(MOJIBAKE);
        expect(s).not.toMatch(/資料來源/); // stripped source-URL labels
        // chance.org.tw's own signature blocks + the editorial remarks that
        // followed them (chnace 提醒您 / chance 研究室 …) — never publish
        expect(s, `lot${l.n}`).not.toMatch(/chnace|chance|提醒您|研究室/);
      }
    }
  });

  it('known repair + spot values hold', () => {
    const l1 = getGuanyinLot(1)!;
    expect(l1.grade).toBe('上');
    expect(l1.palace).toBe('子宮');
    expect(l1.poemA[0]).toBe('天開地闢結良緣');
    expect(l1.stories[0].title).toBe('鍾離成道');
    // lot82 詩意 was mojibake in the zip — repaired from the temples.tw text
    expect(getGuanyinLot(82)!.shiyi).toBe('此卦火裏生蓮之象。凡事似險非險也。');
    expect(getGuanyinLot(2)!.poemA[0]).toBe('鯨魚未化守江湖');
    expect(getGuanyinLot(101)).toBeUndefined();
  });

  it('guanyinNumZh renders the traditional labels', () => {
    expect(guanyinNumZh(1)).toBe('一');
    expect(guanyinNumZh(10)).toBe('十');
    expect(guanyinNumZh(12)).toBe('十二');
    expect(guanyinNumZh(20)).toBe('二十');
    expect(guanyinNumZh(48)).toBe('四十八');
    expect(guanyinNumZh(100)).toBe('一百');
  });
});
