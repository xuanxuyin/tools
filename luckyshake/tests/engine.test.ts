import { describe, it, expect } from 'vitest';
import {
  mulberry32,
  hashString,
  dailyDraw,
  drawSign,
  rollDigits,
  signForDigits,
  digitsForSign,
  eightBall,
  yesNo,
  coinFlip,
  cookieFortune,
  SIGNS,
  SIGN_COUNT,
} from '../src/lib/engine';
import { EIGHT_BALL } from '../src/data/eightball';
import { EIGHT_BALL_ZH, YES_WHY_ZH, NO_WHY_ZH, YES_NEXT_ZH, NO_NEXT_ZH } from '../src/data/i18n-zh';
import { renderReading, drawnBanner, renderFocusedReading } from '../src/lib/reading';
import { focusPanelHTML } from '../src/lib/focusFlow';
import { focusForQuestion } from '../src/lib/classify';
import { escapeHtml, youAsked } from '../src/lib/ask';
import { SIGN_VERSES, SIGN_VERSE_COUNT } from '../src/data/signVerses';
import { SIGN_SLIPS } from '../src/data/signClassical';

describe('fortune library integrity', () => {
  it('has continuous ids 1..N with no gaps', () => {
    const ids = SIGNS.map((s) => s.id).sort((a, b) => a - b);
    expect(ids).toEqual(Array.from({ length: SIGN_COUNT }, (_, i) => i + 1));
  });

  it('every sign has all nine fields non-empty', () => {
    for (const s of SIGNS) {
      expect(s.slug.length, `slug of sign ${s.id}`).toBeGreaterThan(3);
      // 👤 11/08: a proper NAME — tarot-style EN coinage, source 典故名 ZH
      expect(s.name.length, `name of sign ${s.id}`).toBeGreaterThan(5);
      expect(s.name.length, `name of sign ${s.id} too long for a tag`).toBeLessThanOrEqual(30);
      expect(s.nameZh.length, `nameZh of sign ${s.id}`).toBeGreaterThan(2);
      expect(s.title.length, `title of sign ${s.id}`).toBeGreaterThan(20);
      expect(s.story.length, `story of sign ${s.id}`).toBeGreaterThan(10);
      expect(s.overall.length, `overall of sign ${s.id}`).toBeGreaterThan(40);
      for (const field of ['love', 'money', 'career', 'action'] as const) {
        expect(s[field].length, `${field} of sign ${s.id}`).toBeGreaterThan(15);
      }
      expect(['blessing', 'nudge', 'gentle-warning']).toContain(s.grade);
    }
  });

  it('keeps the tone red lines: no temple/deity vocabulary, no doom language', () => {
    const banned = /\b(temple|deity|taoist|daoist|god|goddess|pray|prayer|damn|cursed|doom|hell)\b/i;
    for (const s of SIGNS) {
      const all = [s.name, s.title, s.story, s.overall, s.love, s.money, s.career, s.action].join(' ');
      expect(banned.test(all), `sign ${s.id} leaked banned vocabulary`).toBe(false);
    }
  });

  it('slugs are unique', () => {
    const slugs = new Set(SIGNS.map((s) => s.slug));
    expect(slugs.size).toBe(SIGN_COUNT);
  });

  it('sign names are unique', () => {
    const names = new Set(SIGNS.map((s) => s.name));
    expect(names.size).toBe(SIGN_COUNT);
  });

  it('review-only zh mirrors: every sign has all seven zh fields non-empty', () => {
    for (const s of SIGNS) {
      expect(s.titleZh.length, `titleZh of sign ${s.id}`).toBeGreaterThan(10);
      expect(s.storyZh.length, `storyZh of sign ${s.id}`).toBeGreaterThan(5);
      expect(s.overallZh.length, `overallZh of sign ${s.id}`).toBeGreaterThan(20);
      for (const field of ['loveZh', 'moneyZh', 'careerZh', 'actionZh'] as const) {
        expect(s[field].length, `${field} of sign ${s.id}`).toBeGreaterThan(8);
      }
    }
  });
});

describe('engine purity', () => {
  it('same seed -> identical sequence', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    for (let i = 0; i < 20; i++) expect(a()).toBe(b());
  });

  it('hashString is stable and distinguishes dates', () => {
    expect(hashString('2026-11-07')).toBe(hashString('2026-11-07'));
    expect(hashString('2026-11-07')).not.toBe(hashString('2026-11-08'));
  });

  it('dailyDraw is deterministic per date and differs across most dates', () => {
    const d1 = dailyDraw('2026-11-07');
    const d1b = dailyDraw('2026-11-07');
    expect(d1.sign.id).toBe(d1b.sign.id);
    expect(d1.digits).toEqual(d1b.digits);
    // over 30 consecutive days at least 5 distinct signs appear (sanity, not pigeonhole-proof)
    const ids = new Set(
      Array.from({ length: 30 }, (_, i) => dailyDraw(`2026-11-${String(i + 1).padStart(2, '0')}`).sign.id),
    );
    expect(ids.size).toBeGreaterThanOrEqual(5);
  });

  it('digits are in 0..9 and signForDigits covers the whole library', () => {
    const rand = mulberry32(7);
    for (let i = 0; i < 200; i++) {
      const d = rollDigits(rand);
      for (const x of d) expect(x).toBeGreaterThanOrEqual(0), expect(x).toBeLessThanOrEqual(9);
    }
    const seen = new Set<number>();
    for (let n = 0; n < 1000; n++) {
      const digits: [number, number, number] = [Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
      seen.add(signForDigits(digits).id);
    }
    expect(seen.size).toBe(SIGN_COUNT);
    // 👤 11/08: 1-based intuition — "47" is No. 47, "00" wraps to the last sign
    expect(signForDigits([4, 7, 2]).id).toBe(47);
    expect(signForDigits([0, 0, 0]).id).toBe(SIGN_COUNT);
  });

  it('drawSign over many draws hits every sign at least once', () => {
    const rand = mulberry32(1234);
    const seen = new Set<number>();
    for (let i = 0; i < 2000; i++) seen.add(drawSign(rand).id);
    expect(seen.size).toBe(SIGN_COUNT);
  });
});

describe('8-ball / yes-no / coin / cookie', () => {
  it('has exactly the 20 classic answers with glosses', () => {
    expect(EIGHT_BALL.length).toBe(20);
    for (const a of EIGHT_BALL) expect(a.gloss.length).toBeGreaterThan(20);
    const texts = new Set(EIGHT_BALL.map((a) => a.text));
    expect(texts.size).toBe(20);
  });

  it('eightBall only returns library answers', () => {
    const rand = mulberry32(99);
    const texts = new Set(EIGHT_BALL.map((a) => a.text));
    for (let i = 0; i < 100; i++) expect(texts.has(eightBall(rand).text)).toBe(true);
  });

  it('yesNo returns both answers with why and next', () => {
    const rand = mulberry32(5);
    const answers = new Set<string>();
    for (let i = 0; i < 200; i++) {
      const r = yesNo(rand);
      answers.add(r.answer);
      expect(r.why.length).toBeGreaterThan(15);
      expect(r.next.length).toBeGreaterThan(15);
    }
    expect(answers).toEqual(new Set(['Yes', 'No']));
  });

  it('coinFlip returns both sides, mapped to yes/no', () => {
    const rand = mulberry32(11);
    const sides = new Set<string>();
    for (let i = 0; i < 200; i++) {
      const r = coinFlip(rand);
      sides.add(r.side);
      expect(r.answer).toBe(r.side === 'Heads' ? 'Yes' : 'No');
    }
    expect(sides).toEqual(new Set(['Heads', 'Tails']));
  });

  it('cookieFortune digits resolve consistently at the oracle', () => {
    const rand = mulberry32(21);
    for (let i = 0; i < 50; i++) {
      const { sign, digits } = cookieFortune(rand);
      expect(signForDigits(digits).id).toBe(sign.id);
    }
  });
});

describe('reading renderer', () => {
  it('renders the six pieces for every sign', () => {
    for (const s of SIGNS) {
      const html = renderReading(s, [4, 7, 2]);
      expect(html).toContain(s.title);
      expect(html).toContain(s.love);
      expect(html).toContain(s.money);
      expect(html).toContain(s.career);
      expect(html).toContain(s.action);
      expect(html).toContain('One small step');
      expect(html).toContain('Your lucky numbers');
      expect(html).toContain('chip');
    }
  });

  it('zh mode renders the Chinese six-piece for every sign', () => {
    for (const s of SIGNS) {
      const html = renderReading(s, [4, 7, 2], { lang: 'zh' });
      expect(html).toContain(`第 ${String(s.id).padStart(2, '0')} 签`);
      expect(html).toContain(s.titleZh);
      expect(html).toContain(s.loveZh);
      expect(html).toContain(s.moneyZh);
      expect(html).toContain(s.careerZh);
      expect(html).toContain(s.actionZh);
      expect(html).toContain('感情');
      expect(html).toContain('财运');
      expect(html).toContain('事业');
      expect(html).toContain('今天的一小步');
      expect(html).toContain('你的幸运数字');
    }
  });

  it('luckyLabel overrides the lucky-number label without breaking defaults', () => {
    const s = SIGNS[0];
    expect(renderReading(s, [4, 7, 2])).toContain('Your lucky numbers');
    expect(renderReading(s, [4, 7, 2], { lang: 'zh' })).toContain('你的幸运数字');
    expect(renderReading(s, [4, 7, 2], { luckyLabel: 'Today’s lucky numbers' })).toContain('Today’s lucky numbers');
    expect(renderReading(s, [4, 7, 2], { lang: 'zh', luckyLabel: '今日幸运数字' })).toContain('今日幸运数字');
  });
});

describe('sign pages deep links', () => {
  it('digitsForSign selects exactly that sign for all 100', () => {
    for (const s of SIGNS) {
      expect(signForDigits(digitsForSign(s.id)).id).toBe(s.id);
    }
  });
});

describe('review-only zh data layer', () => {
  it('8-ball zh mirrors the 20 classics with glosses', () => {
    expect(EIGHT_BALL_ZH.length).toBe(20);
    const texts = new Set(EIGHT_BALL_ZH.map((a) => a.text));
    expect(texts.size).toBe(20);
    for (const a of EIGHT_BALL_ZH) expect(a.gloss.length).toBeGreaterThan(10);
  });

  it('yes-no zh arrays mirror the english shape', () => {
    expect(YES_WHY_ZH.length).toBe(4);
    expect(NO_WHY_ZH.length).toBe(4);
    expect(YES_NEXT_ZH.length).toBe(3);
    expect(NO_NEXT_ZH.length).toBe(3);
    for (const x of [...YES_WHY_ZH, ...NO_WHY_ZH, ...YES_NEXT_ZH, ...NO_NEXT_ZH]) {
      expect(x.length).toBeGreaterThan(8);
    }
  });
});

describe('question-first ritual (ask.ts)', () => {
  it('escapes html in user questions before innerHTML', () => {
    expect(escapeHtml('<img src=x onerror=alert(1)>')).toBe(
      '&lt;img src=x onerror=alert(1)&gt;',
    );
    expect(escapeHtml(`a"b'c&d`)).toBe('a&quot;b&#39;c&amp;d');
  });

  it('echoes the question with quotes, empty question echoes nothing', () => {
    const en = youAsked('Should I take the job?');
    expect(en).toContain('You asked');
    expect(en).toContain('“Should I take the job?”');
    expect(en.startsWith('<p class="you-asked">')).toBe(true);
    const zh = youAsked('该接这份工作吗', 'zh');
    expect(zh).toContain('你的问题');
    expect(zh).toContain('「该接这份工作吗」');
    expect(youAsked('')).toBe('');
    expect(youAsked('   ')).toBe('');
    // injection attempt is neutralized: no raw angle brackets from user input
    const evil = youAsked('<script>alert(1)</script>');
    expect(evil).not.toContain('<script');
    expect(evil).toContain('&lt;script&gt;');
  });
});

describe('focus flow (流程规范 v1.2: draw → name ONE lens → that answer)', () => {
  const s = SIGNS[3];

  it('drawn banner = EN-forward slip (👤 11/09 定版 + 11/10 seal): STICK NO. + grade seal + EN name + translated verdict — no poem, no zh verdict, no gloss', () => {
    const html = drawnBanner(s);
    const slip = SIGN_SLIPS[s.id];
    const verse = SIGN_VERSES[s.id];
    // EN slip: stick number, grade seal (decorative zh stamp, color by grade),
    // EN name leads, source 典故名 as sub accent, hand-written EN verdict
    expect(html).toContain(`STICK NO. ${String(s.id).padStart(2, '0')}`);
    expect(html).toContain(`seal seal--${s.grade}`);
    expect(html).toContain(slip.gradeZh);
    expect(html).toContain(s.name);
    expect(html).toContain(s.nameZh);
    expect(html).toContain('The verdict');
    expect(html).toContain(slip.verdictEn.slice(0, 24));
    // no poem, no zh verdict text, no old gloss on the EN slip
    expect(html).not.toContain(slip.verdictZh);
    expect(html).not.toContain(verse.zh[0]);
    expect(html).not.toContain('FORTUNE NO.');
    expect(html).not.toContain(s.title);
    expect(html).not.toContain(s.story);
    expect(html).not.toContain(s.love);
    expect(html).not.toContain(s.money);
    expect(html).not.toContain(s.career);
    // zh review layer keeps the full classical slip: 第X签 + seal + poem + 断语
    const zh = drawnBanner(s, 'zh');
    expect(zh).toContain(`第 ${String(s.id).padStart(2, '0')} 签`);
    expect(zh).toContain(s.nameZh);
    expect(zh).toContain(slip.gradeZh);
    expect(zh).toContain(verse.zh[0]);
    expect(zh).toContain(slip.verdictZh.slice(0, 12));
    expect(zh).not.toContain(s.storyZh);
    expect(zh).not.toContain(s.loveZh);
    // the story is revealed with the focused answer, not before
    const focused = renderFocusedReading(s, 'love', undefined, { lang: 'en' });
    expect(focused).toContain(s.story);
    expect(focused).toContain(s.title);
    const focusedZh = renderFocusedReading(s, 'own', undefined, { lang: 'zh' });
    expect(focusedZh).toContain(s.storyZh);
    expect(focusedZh).toContain(s.titleZh);
  });

  it('focus panel offers exactly three lenses plus one own-words box', () => {
    const html = focusPanelHTML();
    expect(html).toContain('data-focus="love"');
    expect(html).toContain('data-focus="money"');
    expect(html).toContain('data-focus="career"');
    expect(html).not.toContain('data-focus="own"');
    expect(html).toContain('data-reveal');
    expect(html).toContain('data-answer');
    const zh = focusPanelHTML('zh');
    expect(zh).toContain('感情');
    expect(zh).toContain('财运');
    expect(zh).toContain('事业');
    expect(zh).toContain('只能选一样');
  });

  it('each lens renders only that verdict plus the action step', () => {
    const love = renderFocusedReading(s, 'love');
    expect(love).toContain(s.love);
    expect(love).toContain(s.action);
    expect(love).not.toContain(s.money);
    expect(love).not.toContain(s.career);
    expect(love).not.toContain(s.overall);
    expect(love).toContain('>Love<');

    const money = renderFocusedReading(s, 'money');
    expect(money).toContain(s.money);
    expect(money).not.toContain(s.love);

    const career = renderFocusedReading(s, 'career');
    expect(career).toContain(s.career);
    expect(career).not.toContain(s.love);
  });

  it('own-question focus echoes the question (escaped) and gives the overall reading', () => {
    const html = renderFocusedReading(s, 'own', [4, 7, 2], { echo: 'Should I ask for a raise?' });
    expect(html).toContain('“Should I ask for a raise?”');
    expect(html).toContain(s.overall);
    expect(html).toContain(s.action);
    expect(html).toContain('Your lucky numbers');
    expect(html).not.toContain(s.love);
    // injection through the echo is escaped
    const evil = renderFocusedReading(s, 'own', undefined, { echo: '<script>x</script>' });
    expect(evil).not.toContain('<script');
    expect(evil).toContain('&lt;script&gt;');
  });

  it('zh focus renders Chinese labels and the focused zh verdict', () => {
    const zh = renderFocusedReading(s, 'career', undefined, { lang: 'zh', echo: '该跳槽吗' });
    expect(zh).toContain('「该跳槽吗」');
    expect(zh).toContain(s.careerZh);
    expect(zh).toContain('事业');
    expect(zh).toContain('今天的一小步');
    expect(zh).not.toContain(s.loveZh);
    const zhOwn = renderFocusedReading(s, 'own', undefined, { lang: 'zh' });
    expect(zhOwn).toContain('整体签文');
    expect(zhOwn).toContain(s.overallZh);
  });
});

describe('custom-question routing (classify.ts: nearest lens, own as fallback)', () => {
  it('routes the visitor\'s own example: lottery -> money', () => {
    expect(focusForQuestion('我今天可以买彩票吗')).toBe('money');
    expect(focusForQuestion('Should I buy a lottery ticket?')).toBe('money');
    expect(focusForQuestion('Should I buy a house?')).toBe('money');
    expect(focusForQuestion('该把存款投进基金吗')).toBe('money');
  });

  it('routes love questions, even when they contain transaction words', () => {
    expect(focusForQuestion('Should I text him back?')).toBe('love');
    expect(focusForQuestion('Should I buy flowers for my girlfriend?')).toBe('love');
    expect(focusForQuestion('该向前任低头吗')).toBe('love');
    expect(focusForQuestion('喜欢的人有对象了还要表白吗')).toBe('love');
  });

  it('routes career questions; love/career beat money on mixed wording', () => {
    expect(focusForQuestion('Should I take the new job offer?')).toBe('career');
    expect(focusForQuestion('该跳槽吗')).toBe('career');
    expect(focusForQuestion('该给老板提加薪吗')).toBe('career');
    expect(focusForQuestion('Should I quit and start a business?')).toBe('career');
  });

  it('falls back to the overall reading when nothing matches', () => {
    expect(focusForQuestion('What is life?')).toBe('own');
    expect(focusForQuestion('今天穿什么颜色好')).toBe('own');
    expect(focusForQuestion('')).toBe('own');
  });

  it('english words match on boundaries, not inside other words', () => {
    expect(focusForQuestion('How do I network at the meetup?')).toBe('own');
    expect(focusForQuestion('How do I get more work done this week?')).toBe('career');
  });
});

describe('verse layer (👤 11/08 签诗层)', () => {
  it('covers all 100 signs with a 4-line zh + en verse', () => {
    expect(SIGN_VERSE_COUNT).toBe(SIGN_COUNT);
    for (const s of SIGNS) {
      const v = SIGN_VERSES[s.id];
      expect(v, `verse of sign ${s.id}`).toBeTruthy();
      expect(v.zh).toHaveLength(4);
      expect(v.en).toHaveLength(4);
      for (const l of v.en) expect(l.length, `en line of sign ${s.id}`).toBeGreaterThan(10);
    }
  });

  it('keeps the EN verse on the tone red lines', () => {
    const banned = /\b(temple|deity|taoist|daoist|god|goddess|pray|prayer|damn|cursed|doom|hell)\b/i;
    for (const s of SIGNS) {
      const text = SIGN_VERSES[s.id].en.join(' ');
      expect(banned.test(text), `verse red line of sign ${s.id}: ${text}`).toBe(false);
    }
  });

  it('renders the verse block into full and focused readings', () => {
    const full = renderReading(SIGNS[0]);
    expect(full).toContain('verse-block');
    expect(full).toContain('The verse on this stick');
    const focused = renderFocusedReading(SIGNS[0], 'love');
    expect(focused).toContain('verse-line');
    const zh = renderReading(SIGNS[0], undefined, { lang: 'zh' });
    expect(zh).toContain('签诗');
    expect(zh).toContain(SIGN_VERSES[1].zh[0]);
  });
});
