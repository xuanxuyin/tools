/**
 * Daily incense offering (👤 2026-11-12 "每天领取三支香…用户可以先点香，
 * 然后上香，上完后香就在香炉里面烧着" — 放在抽签左侧,问事前的一段祈福流程):
 *  - three sticks a day, claimed once (领香);
 *  - two taps per stick — light it (点香), then offer it into the censer (上香);
 *  - offered sticks keep burning in the censer (visual burn-down over
 *    INCENSE_BURN_MS, an ash stub remains for the rest of the day).
 *
 * All state is local to the browser (localStorage `fw_incense`) — same posture
 * as `fw_ration`: no server, no account, resets at the local calendar day.
 */
import { todayLocal } from './ration';

export const INCENSE_PER_DAY = 3;
/** one stick burns for ~30 minutes of wall-clock time */
export const INCENSE_BURN_MS = 30 * 60_000;

export type StickPhase = 'raw' | 'lit' | 'burning';

export interface IncenseStick {
  phase: StickPhase;
  /** epoch ms — when the stick was lit (raw sticks: undefined) */
  litTs?: number;
  /** epoch ms — when the stick entered the censer (burning sticks) */
  offerTs?: number;
}

export interface IncenseState {
  /** local YYYY-MM-DD the sticks were claimed on ('' = not claimed today) */
  day: string;
  /** exactly INCENSE_PER_DAY entries once claimed; empty before the claim */
  sticks: IncenseStick[];
}

/* ---- pure state transitions ---- */

export function claimIncense(now: Date): IncenseState {
  return {
    day: todayLocal(now),
    sticks: Array.from({ length: INCENSE_PER_DAY }, () => ({ phase: 'raw' as const })),
  };
}

export function lightStick(s: IncenseState, i: number, now: Date): IncenseState {
  const st = s.sticks[i];
  if (!st || st.phase !== 'raw') return s;
  const sticks = s.sticks.slice();
  sticks[i] = { phase: 'lit', litTs: now.getTime() };
  return { ...s, sticks };
}

export function offerStick(s: IncenseState, i: number, now: Date): { state: IncenseState; ok: boolean } {
  const st = s.sticks[i];
  if (!st || st.phase !== 'lit') return { state: s, ok: false };
  const sticks = s.sticks.slice();
  sticks[i] = { phase: 'burning', litTs: st.litTs, offerTs: now.getTime() };
  return { state: { ...s, sticks }, ok: true };
}

/** 0 → just offered; 1 → burned down to the stub. */
export function burnRatio(st: IncenseStick, now: Date): number {
  if (st.phase !== 'burning' || !st.offerTs) return 0;
  return Math.max(0, Math.min(1, (now.getTime() - st.offerTs) / INCENSE_BURN_MS));
}

/* ---- localStorage adapter (best-effort; a new calendar day wipes the claim) ---- */

const KEY = 'fw_incense';

const PHASES: StickPhase[] = ['raw', 'lit', 'burning'];

function normalizeStick(v: unknown): IncenseStick {
  const o = (v ?? {}) as Partial<IncenseStick>;
  const phase: StickPhase = PHASES.includes(o.phase as StickPhase) ? (o.phase as StickPhase) : 'raw';
  const num = (x: unknown) => (typeof x === 'number' && Number.isFinite(x) && x > 0 ? x : undefined);
  return { phase, litTs: num(o.litTs), offerTs: num(o.offerTs) };
}

export function loadIncense(now: Date): IncenseState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { day: '', sticks: [] };
    const o = JSON.parse(raw) as Partial<IncenseState>;
    if (o.day !== todayLocal(now)) return { day: '', sticks: [] };
    const sticks = Array.isArray(o.sticks)
      ? o.sticks.slice(0, INCENSE_PER_DAY).map(normalizeStick)
      : [];
    return { day: o.day, sticks };
  } catch {
    return { day: '', sticks: [] };
  }
}

export function saveIncense(s: IncenseState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable — the incense just resets each visit */
  }
}
