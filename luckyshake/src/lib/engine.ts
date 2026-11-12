/**
 * Pure draw engine — all randomness flows through here.
 * SSR uses date-seeded streams (deterministic per day); interactive islands
 * use Math.random-based streams. Pure functions only: no DOM, no Date.now inside.
 */
import { SIGNS, SIGN_COUNT, signById, type Sign } from '../data/signs';
import { EIGHT_BALL, type EightAnswer } from '../data/eightball';

export type Rand = () => number;

/** Standard seeded PRNG (mulberry32) — same seed, same sequence. */
export function mulberry32(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stable string hash for date strings. */
export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function liveRand(): Rand {
  return Math.random;
}

/** Draw a fortune stick (uniform over the library). */
export function drawSign(rand: Rand): Sign {
  const idx = Math.floor(rand() * SIGN_COUNT) % SIGN_COUNT;
  return SIGNS[idx];
}

/** Three random digits 0-9 (the Number Oracle roll). */
export function rollDigits(rand: Rand): [number, number, number] {
  const d = () => Math.floor(rand() * 10) % 10;
  return [d(), d(), d()];
}

/**
 * Number Oracle mapping (prototype rule, per docs/fortune-draw/PRODUCT.md):
 * first two digits pick the sign (00-99 mapped over the library),
 * all three digits double as the lucky numbers.
 * 👤 11/08 (100-sign deck): 1-based intuition — "47" IS sign No. 47,
 * and 00 wraps to No. 100 (the deck now covers 00-99 exactly).
 */
export function signForDigits(digits: [number, number, number]): Sign {
  const [d1, d2] = digits;
  const n = d1 * 10 + d2;
  const idx = n === 0 ? SIGN_COUNT - 1 : (n - 1) % SIGN_COUNT;
  return SIGNS[idx];
}

/**
 * Inverse of signForDigits — deep-link digits that select exactly this sign
 * (No.47 → [4,7,7], No.100 → [0,0,0]). The third digit is free; we reuse the
 * sign's own last digit so the lucky numbers still feel tied to the fortune.
 * Used by /signs/{slug}/ pages ("roll these digits to draw this fortune").
 */
export function digitsForSign(id: number): [number, number, number] {
  const n = id === SIGN_COUNT ? 0 : id;
  return [Math.floor(n / 10), n % 10, id % 10];
}

/** Deterministic daily draw: same date -> same sign + digits, forever. */
export function dailyDraw(dateStr: string): { sign: Sign; digits: [number, number, number] } {
  const rand = mulberry32(hashString('fortunewillow-daily-' + dateStr));
  const digits = rollDigits(rand);
  return { sign: signForDigits(digits), digits };
}

/** Magic 8-Ball answer (classic 20). */
export function eightBall(rand: Rand): EightAnswer {
  return EIGHT_BALL[Math.floor(rand() * EIGHT_BALL.length) % EIGHT_BALL.length];
}

/* ---------- Yes / No (three-layer lite) ---------- */

const YES_WHY = [
  'You already know this is right — the question was really about permission.',
  'The downside is survivable and the upside is not. That asymmetry is your answer.',
  'Every signal you have collected for weeks points the same way.',
  'The cost of another week of waiting is higher than the cost of being wrong.',
];
const NO_WHY = [
  'You are asking because a part of you already flagged the problem. Listen to it.',
  'The only thing pulling you toward yes is sunk cost. Sunk costs are not reasons.',
  'The version of this you can actually afford right now does not exist yet.',
  'Your gut said no first and has not moved since. That consistency means something.',
];
const YES_NEXT = [
  'Do the irreversible-looking first step today — it is more reversible than it feels.',
  'Tell one person you are doing it, so tomorrow-you cannot quietly back out.',
  'Set a date. Undated yeses decay into maybes.',
];
const NO_NEXT = [
  'Write down what a real yes would require. Then decide if you are willing to build that.',
  'Give yourself a clean no instead of a slow maybe — send the message today.',
  'Bank the energy you just saved and spend it on the plan B you keep sketching.',
];

export interface YesNoResult {
  answer: 'Yes' | 'No';
  why: string;
  next: string;
}

export function yesNo(rand: Rand): YesNoResult {
  const yes = rand() < 0.5;
  const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length) % arr.length];
  return yes
    ? { answer: 'Yes', why: pick(YES_WHY), next: pick(YES_NEXT) }
    : { answer: 'No', why: pick(NO_WHY), next: pick(NO_NEXT) };
}

/** Coin flip: Heads = Yes, Tails = No. */
export function coinFlip(rand: Rand): { side: 'Heads' | 'Tails'; answer: 'Yes' | 'No' } {
  const heads = rand() < 0.5;
  return heads ? { side: 'Heads', answer: 'Yes' } : { side: 'Tails', answer: 'No' };
}

/** Fortune cookie: a headline fortune + the 3 digits that point to its full reading. */
export function cookieFortune(rand: Rand): { sign: Sign; digits: [number, number, number] } {
  const digits = rollDigits(rand);
  return { sign: signForDigits(digits), digits };
}

export { SIGNS, SIGN_COUNT, signById };
export type { Sign };
