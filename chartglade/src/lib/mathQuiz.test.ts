import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  QUIZ_TRACKS,
  QUESTIONS_PER_LEVEL,
  generateLevelQuestions,
  generateLevelPool,
  generateDailySet,
  pullTierQuestion,
  startTier,
  tierAfter,
  hashStr,
  isCorrect,
  starsFor,
  levelUnlocked,
  trackPassed,
  trackStars,
  parseProgress,
  emptyProgress,
  QUIZ_STORAGE_KEY,
  typesetRadicals,
  type QuizQuestion,
  type TierState,
} from './mathQuiz';

/**
 * #36 guards: seeded determinism, structural contracts for every one of
 * the 100 levels (every question must carry a worked solution — the
 * "Show me how" promise), arithmetic re-derivation wherever a prompt is
 * symbolic, answer-mode parsing (fractions and clock times), and the
 * localStorage progress rules. The last block guards the real dist:
 * the multiplication chart page must ship the island mount plus the
 * full SSR level catalog with JS off.
 */

const OP_VALUE = (a: number, op: string, b: number): number => {
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b === 0 ? NaN : a / b;
    default: return NaN;
  }
};

describe('seeded output', () => {
  it('fixed seed reproduces the exact same level set', () => {
    const a = generateLevelQuestions('g3', 0, 20261107);
    const b = generateLevelQuestions('g3', 0, 20261107);
    expect(a).toEqual(b);
    expect(a.length).toBe(QUESTIONS_PER_LEVEL);
  });

  it('different seeds and levels produce different sets', () => {
    const a = generateLevelQuestions('g3', 0, 20261107);
    expect(generateLevelQuestions('g3', 0, 1)).not.toEqual(a);
    expect(generateLevelQuestions('g3', 1, 20261107)).not.toEqual(a);
  });

  it('unknown track or level throws', () => {
    expect(() => generateLevelQuestions('nope', 0, 1)).toThrow();
    expect(() => generateLevelQuestions('g3', 99, 1)).toThrow();
  });
});

describe('structure: every question in all 100 levels', () => {
  const seeds = [7, 2026, 999983];

  it('has 10 levels per track, 10 tracks, 100 total', () => {
    expect(QUIZ_TRACKS.length).toBe(10);
    for (const t of QUIZ_TRACKS) expect(t.levels.length).toBe(10);
  });

  it('every question: prompt, mode-legal answer, non-empty steps, valid figure', () => {
    for (const track of QUIZ_TRACKS) {
      for (let level = 0; level < track.levels.length; level++) {
        for (const seed of seeds) {
          for (const q of generateLevelQuestions(track.id, level, seed)) {
            expect(q.display.length, `${track.id} L${level} ${q.kind}`).toBeGreaterThan(3);
            expect(Number.isFinite(q.answer), `${track.id} L${level} ${q.kind}`).toBe(true);
            expect(q.steps.length, `${track.id} L${level} ${q.kind} steps`).toBeGreaterThanOrEqual(1);
            for (const s of q.steps) expect(s.length).toBeGreaterThan(2);
            if (q.figure) {
              expect(q.figure.startsWith('<svg')).toBe(true);
              expect(q.figure.endsWith('</svg>')).toBe(true);
            } else {
              // symbolic prompts mark the blank; figure prompts ask in words
              expect(q.display).toContain('___');
            }
            if (q.mode === 'int' || q.mode === 'time') {
              expect(Number.isInteger(q.answer)).toBe(true);
            }
          }
        }
      }
    }
  });

  it('symbolic arithmetic prompts re-derive to their stated answer', () => {
    const symbolic = /^(−?\d+(?:\.\d+)?) ([+\-−×÷]) (−?\d+(?:\.\d+)?) = ___$/;
    let checked = 0;
    for (const track of QUIZ_TRACKS) {
      for (let level = 0; level < track.levels.length; level++) {
        for (const q of generateLevelQuestions(track.id, level, 42)) {
          const m = q.display.match(symbolic);
          if (!m) continue;
          const val = OP_VALUE(Number(m[1]!.replace('−', '-')), m[2]!, Number(m[3]!.replace('−', '-')));
          expect(Math.abs(val - q.answer), `${q.display}`).toBeLessThan(1e-6);
          checked++;
        }
      }
    }
    expect(checked).toBeGreaterThan(300); // the parser actually matched real prompts
  });
});

describe('visual generators (figures + non-numeric answers)', () => {
  const collect = (kind: string, trackId: string, count = 40): QuizQuestion[] => {
    const track = QUIZ_TRACKS.find((t) => t.id === trackId)!;
    const out: QuizQuestion[] = [];
    for (let level = 0; level < track.levels.length; level++) {
      for (const q of generateLevelQuestions(trackId, level, 20261107)) {
        if (q.kind === kind) out.push(q);
        if (out.length >= count) return out;
      }
    }
    for (const q of generateLevelQuestions(trackId, 0, 5, 200)) if (q.kind === kind && out.length < count) out.push(q);
    return out;
  };

  it('clock questions answer as minutes and parse h:mm', () => {
    const qs = collect('clock', 'g1');
    expect(qs.length).toBeGreaterThan(0);
    for (const q of qs) {
      expect(q.figure).toBeTruthy();
      expect(q.answerLabel).toMatch(/^\d{1,2}:\d{2}$/);
      const [h, m] = q.answerLabel!.split(':').map(Number);
      expect(q.answer).toBe(h * 60 + m);
      expect([0, 30]).toContain(m);
      expect(isCorrect(q, q.answerLabel!)).toBe(true);
      expect(isCorrect(q, q.answerLabel!.replace(':', ''))).toBe(true);
      expect(isCorrect(q, `${h}:${m === 0 ? 30 : 0}`)).toBe(false);
    }
  });

  it('shaded fraction questions answer as k/d and parse a/b', () => {
    const qs = collect('shadedFraction', 'g3');
    expect(qs.length).toBeGreaterThan(0);
    for (const q of qs) {
      expect(q.figure).toBeTruthy();
      expect(q.answerLabel).toMatch(/^\d+\/\d+$/);
      const [k, d] = q.answerLabel!.split('/').map(Number);
      expect(k).toBeLessThan(d);
      expect(q.answer).toBeCloseTo(k / d, 9);
      expect(isCorrect(q, q.answerLabel!)).toBe(true);
      expect(isCorrect(q, `${k * 2}/${d * 2}`)).toBe(true); // equivalent fraction
      expect(isCorrect(q, `${k}/${d + 1}`)).toBe(false);
    }
  });

  it('K/elementary visuals stay in kid-sized ranges', () => {
    for (const q of collect('countDots', 'k')) expect(q.answer).toBeGreaterThanOrEqual(2);
    for (const q of collect('shapeSides', 'k')) expect([3, 4, 5, 6]).toContain(q.answer);
    for (const q of collect('numberLine', 'g2')) {
      expect(q.answer).toBeGreaterThan(0);
      expect(Number.isInteger(q.answer)).toBe(true);
    }
    for (const q of collect('barGraph', 'g2')) expect(q.answer).toBeGreaterThan(0);
    for (const q of collect('areaRect', 'g4')) expect(q.answer).toBeGreaterThan(0);
    for (const q of collect('perimRect', 'g4')) expect(q.answer % 2).toBe(0); // 2(l+w)
    for (const q of collect('coordPoint', 'g5')) expect(Math.abs(q.answer)).toBeLessThanOrEqual(4);
  });

  it('slope and pythag figures stay inside their grids', () => {
    const slopes = collect('slope', 'g8');
    expect(slopes.length).toBeGreaterThan(0);
    for (const q of slopes) {
      const m = q.display.match(/\((−?\d+), (−?\d+)\) and \((−?\d+), (−?\d+)\)/);
      expect(m).toBeTruthy();
      const [x1, y1, x2, y2] = m!.slice(1).map((s) => Number(s.replace('−', '-')));
      expect(x2 - x1).toBeGreaterThan(0);
      expect((y2 - y1) / (x2 - x1)).toBe(q.answer);
      for (const v of [x1!, x2!]) expect(Math.abs(v)).toBeLessThanOrEqual(9);
      for (const v of [y1!, y2!]) expect(Math.abs(v)).toBeLessThanOrEqual(9);
    }
    for (const q of collect('pythag', 'g8')) {
      expect(q.figure).toBeTruthy();
      const [p1, p2] = q.ops as [number, number];
      if (q.display.includes('hypotenuse =')) {
        expect(p1 * p1 + p2 * p2).toBe(q.answer * q.answer); // both legs given
      } else {
        expect(p1 * p1 + q.answer * q.answer).toBe(p2 * p2); // leg + hyp given
      }
    }
  });

  it('function-eval solution steps re-derive arithmetically (sign audit)', () => {
    // regression for "16 − 16 = 32": the step's operator must follow the
    // product b×x, not the coefficient b
    const re = /^Then (−?\d+) ([+−]) (\d+) = (−?\d+)\.$/;
    let audited = 0;
    for (const seed of [7, 42, 991, 20261107, 5, 12345, 777, 31337]) {
      for (const q of generateLevelQuestions('alg1', 7, seed)) {
        if (q.kind !== 'funcEval') continue;
        for (const s of q.steps) {
          const m = s.match(re);
          if (!m) continue;
          const a = Number(m[1]!.replace('−', '-'));
          const c = Number(m[4]!.replace('−', '-'));
          const want = m[2] === '+' ? a + Number(m[3]) : a - Number(m[3]);
          expect(want, `${q.display} — "${s}"`).toBe(c);
          audited++;
        }
      }
    }
    expect(audited).toBeGreaterThan(40);
  });

  it('every arithmetic chain in solution text re-derives (bank-wide audit)', () => {
    // second layer of the sign audit: sweep all 100 levels, pull EVERY
    // arithmetic chain out of steps (and any display with no blank to
    // fill) and evaluate it. Chains are multi-equality ("A op B = C op D
    // = E" — the distributive steps write them that way), so each
    // '='-separated segment is evaluated on its own and all segments
    // must agree. A chain only fails if BOTH left-to-right (the steps'
    // convention) and standard precedence disagree.
    const SUPMAP: Record<string, string> = { '²': '^2', '³': '^3', '⁴': '^4', '⁵': '^5' };
    const clean = (s: string): string =>
      s
        .replace(/[$%,°]/g, '')
        .replace(/(\d),(\d{3})(?!\d)/g, '$1$2')
        .replace(/blank = /g, '') // narrative lead-in, not arithmetic ("→ blank = 140 ÷ 28 = 5")
        .replace(/[²³⁴⁵]/g, (c) => SUPMAP[c] ?? '');
    const OP = String.raw`[+−×÷]`;
    const BASE = String.raw`(?:\(−?\d+(?:\.\d+)?\)|−?\d+(?:\.\d+)?)`; // plain number, maybe signed or wrapped
    // operand: a number, a one-level parenthesized group like "(12 × 7)" or
    // "(−4)", the "blank" placeholder, or an exponent from ²/³ conversion
    const NUM = `(?:\\(${BASE}(?:\\s*${OP}\\s*${BASE})*\\)|${BASE}|blank)(?:\\^\\d)?`;
    const SEG = `${NUM}(?:\\s*${OP}\\s*${NUM})*`;
    const CHAIN = new RegExp(`${SEG}(?:\\s*=\\s*${SEG})+`, 'g');
    const val = (tok: string): number => {
      const em = tok.match(/\^(\d)$/);
      const body = em ? tok.slice(0, tok.length - em[0].length) : tok;
      // walk BASE|OP tokens in order — a bare op-scan would count the minus
      // sign OF "−9" as an operator and misalign numbers with ops
      const bare = body.replace(/^\(/, '').replace(/\)$/, '');
      const toks = [...bare.matchAll(new RegExp(`${BASE}|${OP}`, 'g'))].map((x) => x[0]);
      const inner: number[] = [];
      const innerOps: string[] = [];
      toks.forEach((t, i) =>
        i % 2 === 0 ? inner.push(Number(t.replace(/[()]/g, '').replace(/−/g, '-'))) : innerOps.push(t),
      );
      const x = innerOps.length > 0 ? innerOps.reduce((acc, op, i) => (op === '+' ? acc + inner[i + 1]! : op === '−' ? acc - inner[i + 1]! : op === '×' ? acc * inner[i + 1]! : acc / inner[i + 1]!), inner[0]!) : (inner[0] ?? NaN);
      return em ? x ** Number(em[1]) : x;
    };
    const apply = (a: number, op: string, b: number): number =>
      op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : a / b;
    const l2r = (nums: number[], ops: string[]): number => ops.reduce((acc, op, i) => apply(acc, op, nums[i + 1]!), nums[0]!);
    const prec = (nums: number[], ops: string[]): number => {
      const ns = [...nums];
      const os = [...ops];
      for (let i = 0; i < os.length; ) {
        if (os[i] === '×' || os[i] === '÷') {
          ns[i] = apply(ns[i]!, os[i]!, ns[i + 1]!);
          ns.splice(i + 1, 1);
          os.splice(i, 1);
        } else i++;
      }
      return l2r(ns, os);
    };
    const failures: string[] = [];
    let audited = 0;
    for (const track of QUIZ_TRACKS) {
      for (let level = 0; level < track.levels.length; level++) {
        for (const seed of [3, 42, 991, 20261107, 777]) {
          for (const q of generateLevelQuestions(track.id, level, seed)) {
            const texts = [...q.steps];
            if (!q.display.includes('___')) texts.push(q.display);
            for (const raw of texts) {
              for (const m of clean(raw).matchAll(CHAIN)) {
                const chain = m[0];
                const segs = chain.split('=').map((sg) => sg.trim());
                // walk NUM|OP tokens in order — a bare op-scan would count
                // the minus sign OF "−9" as an operator and misalign
                const numsArr: number[][] = [];
                const opsArr: string[][] = [];
                for (const sg of segs) {
                  const toks = [...sg.matchAll(new RegExp(`${NUM}|${OP}`, 'g'))].map((x) => x[0]);
                  const nums: number[] = [];
                  const ops: string[] = [];
                  toks.forEach((t, i) => (i % 2 === 0 ? nums.push(val(t)) : ops.push(t)));
                  numsArr.push(nums);
                  opsArr.push(ops);
                }
                // unit words ("8 tens × 2") and percent shorthand ("50% = 88")
                // leave bare "A = B" matches with no arithmetic to check —
                // skip those; a real worked step always carries an operator
                if (!opsArr.some((o) => o.length > 0)) continue;
                // chains still holding a "blank" placeholder state no values
                if (numsArr.some((ns) => ns.some((v) => Number.isNaN(v)))) continue;
                const agree = (f: (i: number) => number): boolean => {
                  const first = f(0);
                  return segs.every((_, i) => Math.abs(f(i) - first) < 1e-6 * Math.max(1, Math.abs(first)));
                };
                const l2rOk = agree((i) => l2r(numsArr[i]!, opsArr[i]!));
                const precOk = agree((i) => prec(numsArr[i]!, opsArr[i]!));
                if (!(l2rOk || precOk)) {
                  failures.push(`${track.id} L${level + 1} "${raw}" → "${chain}"`);
                }
                audited++;
              }
            }
          }
        }
      }
    }
    console.log(`[audit] ${audited} arithmetic chains checked`);
    expect(failures.slice(0, 20), `${failures.length} broken chains (of ${audited})`).toEqual([]);
    expect(audited).toBeGreaterThan(1000);
  });

  it('no duplicate questions inside a level (tiny kindergarten pools excepted)', () => {
    for (const track of QUIZ_TRACKS) {
      for (let level = 0; level < track.levels.length; level++) {
        for (const seed of [3, 20261107, 987]) {
          const qs = generateLevelQuestions(track.id, level, seed);
          const keys = qs.map((q) => `${q.display}|${q.answer}`);
          const dupes = keys.length - new Set(keys).size;
          // K pools are genuinely tiny (4 shapes, 5 doubles) — repetition
          // is fine there; everywhere else a dupe is a generation bug
          expect(dupes, `${track.id} L${level} seed ${seed}`).toBeLessThanOrEqual(track.id === 'k' ? 6 : 2);
        }
      }
    }
  });

  it('difficulty ramps inside a level; percent-inverse re-derives', () => {
    const qs = generateLevelQuestions('g6', 0, 20261107);
    expect(qs.length).toBe(10);
    qs.forEach((q, i) => {
      const m = q.display.match(/^(\d+)% of (\d+) = ___$/);
      if (!m) return;
      const base = Number(m[2]);
      if (i < 3) expect(base, `slot ${i}: ${q.display}`).toBeLessThanOrEqual(80); // tier 1
      if (i >= 7) expect(base, `slot ${i}: ${q.display}`).toBeLessThanOrEqual(600); // tier 3 ceiling
    });
    const inv = qs.filter((q) => q.kind === 'percentInverse');
    expect(inv.length).toBeGreaterThan(0);
    for (const q of inv) {
      const [part, base] = q.ops as [number, number];
      expect([10, 20, 25, 50, 75]).toContain(q.answer);
      expect(part / base).toBeCloseTo(q.answer / 100, 9);
    }
    // pythag opens on the classic triples, closes on the big ones
    const py = generateLevelQuestions('g8', 7, 20261107);
    expect(py.every((q) => q.kind === 'pythag')).toBe(true);
    py.forEach((q, i) => {
      const maxSide = Math.max(...(q.ops as number[]), q.answer);
      if (i < 3) expect(maxSide).toBeLessThanOrEqual(13); // tier 1: 3-4-5 family
      else expect(maxSide).toBeLessThanOrEqual(29);
    });
  });

  it('circle and triangle geometry re-derives from the figure labels', () => {
    for (const q of collect('circleCirc', 'g7')) {
      expect(q.figure).toBeTruthy();
      expect(q.display).toContain('3.14'); // the π convention is stated in the prompt
      const [v] = q.ops as [number];
      const fromD = q.figure!.includes('d = ');
      expect(q.mode).toBe('dec');
      expect(q.answer).toBe(Math.round((fromD ? 3.14 * v : 2 * 3.14 * v) * 100) / 100);
    }
    for (const q of collect('circleArea', 'g7')) {
      const [v] = q.ops as [number];
      const rad = q.figure!.includes('d = ') ? v / 2 : v;
      expect(q.answer).toBe(Math.round(3.14 * rad * rad * 100) / 100);
    }
    for (const q of collect('triangleArea', 'g6')) {
      const [b, h] = q.ops as [number, number];
      expect(b % 2).toBe(0); // even base → whole-number areas for the int mode
      expect(q.answer).toBe((b * h) / 2);
      expect(Number.isInteger(q.answer)).toBe(true);
    }
    for (const q of collect('triAngles', 'g8')) {
      const [a, b] = q.ops as [number, number];
      expect(a + b + q.answer).toBe(180);
      expect(q.answer).toBeGreaterThanOrEqual(20);
      expect(q.answer).toBeLessThanOrEqual(130);
    }
  });
});

describe('answer parsing by mode', () => {
  const base = { kind: 'test', steps: [], ops: [] } as unknown as QuizQuestion;

  it('int/dec: tolerant numeric compare, true minus accepted', () => {
    expect(isCorrect({ ...base, answer: 0.5, mode: 'dec' }, '0.5')).toBe(true);
    expect(isCorrect({ ...base, answer: 0.5, mode: 'dec' }, '.5')).toBe(true);
    expect(isCorrect({ ...base, answer: 0.5, mode: 'dec' }, '0.50')).toBe(true);
    expect(isCorrect({ ...base, answer: -3, mode: 'int' }, '−3')).toBe(true);
    expect(isCorrect({ ...base, answer: -3, mode: 'int' }, '3')).toBe(false);
    expect(isCorrect({ ...base, answer: 4, mode: 'int' }, '')).toBe(false);
    expect(isCorrect({ ...base, answer: 4, mode: 'int' }, 'abc')).toBe(false);
  });

  it('frac: glyphs and decimal equivalents accepted, wrong fraction rejected', () => {
    const q = { ...base, answer: 3 / 4, mode: 'frac' } as QuizQuestion;
    expect(isCorrect(q, '3/4')).toBe(true);
    expect(isCorrect(q, '¾')).toBe(true);
    expect(isCorrect(q, '0.75')).toBe(true);
    expect(isCorrect(q, '3 / 4')).toBe(true);
    expect(isCorrect(q, '4/3')).toBe(false);
    expect(isCorrect(q, '3/0')).toBe(false);
  });

  it('time: h:mm, hmm, and padded forms', () => {
    const q = { ...base, answer: 3 * 60 + 30, mode: 'time' } as QuizQuestion;
    expect(isCorrect(q, '3:30')).toBe(true);
    expect(isCorrect(q, '330')).toBe(true);
    expect(isCorrect(q, '3:31')).toBe(false);
    expect(isCorrect(q, '30:30')).toBe(false);
    expect(isCorrect(q, '3.5')).toBe(false);
  });
});

describe('radical typesetting (the √ vinculum)', () => {
  it('wraps √/∛ radicands in bar spans, leaves other text untouched', () => {
    expect(typesetRadicals('√144 = ___')).toBe(
      '<span class="mq-rad">√<span class="mq-radicand">144</span></span> = ___',
    );
    expect(typesetRadicals('∛125 = ___')).toContain('<span class="mq-radicand">125</span>');
    expect(typesetRadicals('7 × 8 = ___')).toBe('7 × 8 = ___');
    // prose punctuation after the radicand stays outside the bar
    expect(typesetRadicals('and √625 = 25.')).toContain('mq-radicand">625</span></span> = 25.');
  });

  it('every radical in displays, steps and level focuses is followed by digits', () => {
    // any √/∛ not followed by a number would silently lose its bar
    for (const track of QUIZ_TRACKS) {
      const texts = [...track.levels.map((l) => l.focus)];
      for (let level = 0; level < track.levels.length; level++) {
        for (const q of generateLevelQuestions(track.id, level, 11)) {
          texts.push(q.display, ...q.steps);
        }
      }
      for (const s of texts) {
        for (const seg of s.split(/[√∛]/).slice(1)) {
          expect(seg[0], `${track.id}: …${s}`).toMatch(/^\d/);
        }
      }
    }
  });
});

describe('adaptive tiers, class sets, daily challenge, CCSS (2026-11-07 batch)', () => {
  it('tierAfter: two in a row steps the tier, capped at 1..3', () => {
    let s = startTier();
    expect(s.tier).toBe(1);
    s = tierAfter(s, true);
    expect(s.tier).toBe(1); // one right is not enough
    s = tierAfter(s, true);
    expect(s.tier).toBe(2);
    s = tierAfter(s, true);
    s = tierAfter(s, true);
    expect(s.tier).toBe(3);
    s = tierAfter(s, true);
    s = tierAfter(s, true);
    expect(s.tier).toBe(3); // capped at the ceiling
    s = tierAfter(s, false);
    expect(s.tier).toBe(3); // one wrong is not enough
    s = tierAfter(s, false);
    expect(s.tier).toBe(2);
    // alternating answers never move the tier
    let a = startTier();
    for (let i = 0; i < 12; i++) a = tierAfter(a, i % 2 === 0);
    expect(a.tier).toBe(1);
    // from tier 2, two wrongs floor at 1
    let f: TierState = { tier: 2, streak: 0 };
    f = tierAfter(f, false);
    f = tierAfter(f, false);
    expect(f.tier).toBe(1);
  });

  it('generateLevelPool: 4 per tier; the adaptive run never starves', () => {
    // big-domain levels dedupe cleanly across all three pools
    for (const [track, level] of [
      ['g7', 4],
      ['g6', 0],
      ['g3', 6],
    ] as const) {
      const pools = generateLevelPool(track, level, 20261107);
      expect(pools.t1.length, `${track} L${level}`).toBe(4);
      expect(pools.t2.length, `${track} L${level}`).toBe(4);
      expect(pools.t3.length, `${track} L${level}`).toBe(4);
      const keys = [...pools.t1, ...pools.t2, ...pools.t3].map((q) => `${q.display}|${q.answer}`);
      expect(new Set(keys).size, `${track} L${level}`).toBe(keys.length);
    }
    // tiny kindergarten domains still fill all pools (dupes tolerated there)
    const k = generateLevelPool('k', 0, 5);
    expect(k.t1.length + k.t2.length + k.t3.length).toBe(12);
    // 12 pooled questions ≥ 10 asked, whatever the tier wander — then dry
    const pools = generateLevelPool('g6', 2, 42);
    for (let i = 0; i < 12; i++) {
      expect(pullTierQuestion(pools, ((i % 3) + 1) as 1 | 2 | 3)).not.toBeNull();
    }
    for (const t of [1, 2, 3] as const) expect(pullTierQuestion(pools, t)).toBeNull();
  });

  it('pullTierQuestion serves the wanted tier, borrows from a neighbor when empty', () => {
    const pools = generateLevelPool('g3', 6, 7);
    pools.t2 = [];
    const got = pullTierQuestion(pools, 2)!;
    expect(got.from).not.toBe(2);
    expect(got.q).toBeTruthy();
  });

  it('generateDailySet: date-keyed — same date, same set for everyone', () => {
    const a = generateDailySet('2026-11-07');
    const b = generateDailySet('2026-11-07');
    expect(a.length).toBe(10);
    expect(a.map((q) => q.display)).toEqual(b.map((q) => q.display));
    const c = generateDailySet('2026-11-08');
    expect(a.some((q, i) => q.display !== c[i]!.display)).toBe(true);
  });

  it('hashStr is stable and separates inputs', () => {
    expect(hashStr('set:abc:g3:0')).toBe(hashStr('set:abc:g3:0'));
    expect(hashStr('set:abc:g3:0')).not.toBe(hashStr('set:abc:g3:1'));
  });

  it('every one of the 100 levels carries a well-formed CCSS code', () => {
    // cluster (and standard number) may be omitted for whole-domain review levels (e.g. '8.EE')
    const re = /^(K|[1-8])\.[A-Z]{1,3}(\.[A-Z](\.\d+)?)?$|^[A-Z]-[A-Z]{2,3}\.[A-Z](\.\d+)?$/;
    let count = 0;
    for (const t of QUIZ_TRACKS) {
      expect(t.levels.length, t.id).toBe(10);
      for (const l of t.levels) {
        expect(l.ccss, `${t.id} — ${l.title}`).toMatch(re);
        count++;
      }
    }
    expect(count).toBe(100);
    // spot anchors — the marquee levels teachers search by
    expect(QUIZ_TRACKS.find((t) => t.id === 'g7')!.levels[6]!.ccss).toBe('7.G.B.4');
    expect(QUIZ_TRACKS.find((t) => t.id === 'g8')!.levels[7]!.ccss).toBe('8.G.B.7');
    expect(QUIZ_TRACKS.find((t) => t.id === 'g6')!.levels[7]!.ccss).toBe('6.G.A.1');
    expect(QUIZ_TRACKS.find((t) => t.id === 'alg1')!.levels[7]!.ccss).toBe('F-IF.A.2');
  });
});

describe('progress (localStorage, device-local)', () => {
  it('round-trips through JSON and rejects garbage', () => {
    const p = emptyProgress();
    p.tracks['g3'] = { '0': { stars: 2, best: 9 } };
    p.name = 'Ava';
    expect(parseProgress(JSON.stringify(p))).toEqual(p);
    expect(parseProgress(null)).toBeNull();
    expect(parseProgress('not json')).toBeNull();
    expect(parseProgress('{"v":2,"tracks":{}}')).toBeNull();
    expect(QUIZ_STORAGE_KEY).toBe('cg-math-quiz-v1');
  });

  it('level 0 open, next level opens only after a pass, stars tiered', () => {
    const p = emptyProgress();
    expect(levelUnlocked(p, 'g3', 0)).toBe(true);
    expect(levelUnlocked(p, 'g3', 1)).toBe(false);
    p.tracks['g3'] = { '0': { stars: 1, best: 8 } };
    expect(levelUnlocked(p, 'g3', 1)).toBe(true);
    expect(levelUnlocked(p, 'g3', 2)).toBe(false);
    expect(starsFor(8)).toBe(1);
    expect(starsFor(9)).toBe(2);
    expect(starsFor(10)).toBe(3);
    expect(starsFor(7)).toBe(0);
  });

  it('track passes only when all 10 levels have results; stars sum', () => {
    const p = emptyProgress();
    p.tracks['k'] = {};
    for (let i = 0; i < 10; i++) p.tracks['k']![String(i)] = { stars: i < 9 ? 3 : 0, best: 10 };
    expect(trackPassed(p, 'k')).toBe(false);
    p.tracks['k']!['9'] = { stars: 2, best: 9 };
    expect(trackPassed(p, 'k')).toBe(true);
    expect(trackStars(p, 'k')).toBe(29);
    expect(trackPassed(p, 'g3')).toBe(false);
  });
});

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', 'dist');

describe.skipIf(!existsSync(resolve(DIST, 'multiplication-chart', 'index.html')))(
  'no-JS content (real dist)',
  () => {
    it('the mult chart page ships the arena mount plus the full SSR catalog', () => {
      const html = readFileSync(resolve(DIST, 'multiplication-chart', 'index.html'), 'utf8');
      expect(html).toContain('id="math-quiz"');
      expect(html).toContain('data-mq-app');
      expect(html).toContain('Level Up: math practice from kindergarten to Algebra 1');
      // the SSR catalog: all three groups and one title per band of tracks
      expect(html).toContain('Elementary');
      expect(html).toContain('Middle school');
      expect(html).toContain('Algebra 1');
      expect(html).toContain('Telling time');
      expect(html).toContain('Shaded fractions');
      expect(html).toContain('Coordinate plane');
      expect(html).toContain('Pythagorean theorem');
      // the geometry batch (2026-11-07): circles and triangles as the subject
      expect(html).toContain('Area of triangles');
      expect(html).toContain('Circles: circumference &amp; area');
      expect(html).toContain('Triangle angle sum');
      // progress stays local — the promise is on the page
      expect(html).toContain('nothing leaves the browser');
      // SSR catalog focus entries ship the radical vinculum markup
      expect(html).toContain('mq-radicand');
      // the 2026-11-07 batch: CCSS anchors on every catalog entry
      expect(html).toContain('CCSS ');
      expect(html).toContain('CCSS 7.G.B.4');
      expect(html).toContain('CCSS F-IF.A.2');
    });

    it('the mad-minute island is untouched', () => {
      const html = readFileSync(resolve(DIST, 'multiplication-chart', 'index.html'), 'utf8');
      expect(html).toContain('id="mad-minute-sheet"');
      expect(html).toContain('id="mad-op"');
    });
  },
);
