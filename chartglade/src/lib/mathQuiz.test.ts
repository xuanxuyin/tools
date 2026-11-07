import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  QUIZ_TRACKS,
  QUESTIONS_PER_LEVEL,
  generateLevelQuestions,
  isCorrect,
  starsFor,
  levelUnlocked,
  trackPassed,
  trackStars,
  parseProgress,
  emptyProgress,
  QUIZ_STORAGE_KEY,
  type QuizQuestion,
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
      // progress stays local — the promise is on the page
      expect(html).toContain('nothing leaves the browser');
    });

    it('the mad-minute island is untouched', () => {
      const html = readFileSync(resolve(DIST, 'multiplication-chart', 'index.html'), 'utf8');
      expect(html).toContain('id="mad-minute-sheet"');
      expect(html).toContain('id="mad-op"');
    });
  },
);
