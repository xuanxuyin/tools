/**
 * The daily draw ration + merit economy (👤 2026-11-11 "每个用户每天只有一次机会，
 * 多个道具公用一次…功德值每一小时可以领取一点…捐献八点功德值获得一次机会"):
 *  - one free draw per day, shared across the whole tool family;
 *  - merit collects 1 per hour (claim to bank it), capped at 24;
 *  - donating merit to the box banks one extra draw per 8 donated — dropped
 *    one merit per click (👤 2026-11-12 "点击一下少一个，捐赠一个，飘一个功德+1"),
 *    or 8 at once from the blocked panel; both feed the same counter.
 *
 * All state is local to the browser (localStorage `fw_ration`) — same posture as
 * the sign-library unlock. The communal donation counter lives server-side
 * (functions/api/merit.ts → D1 `merit_daily`), reset daily at midnight ET.
 */

export const MERIT_COST = 8;
export const MERIT_CAP = 24;
export const HOUR_MS = 3_600_000;

export interface RationState {
  /** local YYYY-MM-DD of the day the free draw was last used */
  day: string;
  /** banked merit (claimed), 0..MERIT_CAP */
  merit: number;
  /** epoch ms — hourly accrual is measured from here */
  accrueTs: number;
  /** extra draws banked at the merit box */
  extras: number;
  /** merit already dropped this cycle toward the next ticket, 0..MERIT_COST-1 */
  donated: number;
}

/** Local (device) calendar day, YYYY-MM-DD. */
export function todayLocal(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/**
 * First-visit state. accrueTs starts one hour back so the very first claim
 * lands +1 — the collect mechanic should work the moment you meet it.
 */
export function freshState(now: Date): RationState {
  return { day: '', merit: 0, accrueTs: now.getTime() - HOUR_MS, extras: 0, donated: 0 };
}

/** Merit waiting to be claimed right now (0 when the box is full).
 *  👤 11/12 倒计时模型定稿:满 1 小时 → 恰好 1 枚待领;不领取,下一枚的倒计时
 *  不开始(停在 1,不会攒成 +2/+3)——领取那一刻(accrueTs=now)才重开 1 小时。 */
export function pendingMerit(s: RationState, now: Date): number {
  if (s.merit >= MERIT_CAP) return 0;
  return now.getTime() - s.accrueTs >= HOUR_MS ? 1 : 0;
}

/** Bank whatever has accrued. Hours while the box sits full are not kept. */
export function claim(s: RationState, now: Date): { state: RationState; claimed: number } {
  const claimed = pendingMerit(s, now);
  return {
    state: { ...s, merit: s.merit + claimed, accrueTs: now.getTime() },
    claimed,
  };
}

/**
 * Drop ONE merit into the box (the balance number is the button). Every
 * MERIT_COST dropped banks an extra draw and starts a fresh cycle.
 */
export function donateOne(s: RationState): { state: RationState; ok: boolean; banked: boolean } {
  if (s.merit < 1) return { state: s, ok: false, banked: false };
  const donated = s.donated + 1;
  const banked = donated >= MERIT_COST;
  return {
    state: {
      ...s,
      merit: s.merit - 1,
      donated: banked ? 0 : donated,
      extras: s.extras + (banked ? 1 : 0),
    },
    ok: true,
    banked,
  };
}

/**
 * Complete the current ticket in one go (blocked panel's "buy a draw"): pay
 * the remainder (MERIT_COST - donated) from the balance, bank the ticket,
 * reset the cycle. With donated = 0 this is the classic 8-at-once donation;
 * the merit already dropped at the home box counts toward this ticket.
 */
export function donateRest(s: RationState): { state: RationState; ok: boolean } {
  const need = MERIT_COST - s.donated;
  if (s.merit < need) return { state: s, ok: false };
  return { state: { ...s, merit: s.merit - need, extras: s.extras + 1, donated: 0 }, ok: true };
}

export type DrawAccess = 'free' | 'ticket' | 'blocked';

/** Spend the daily free draw first, then a banked ticket, else blocked. */
export function consumeDraw(s: RationState, now: Date): { state: RationState; access: DrawAccess } {
  const today = todayLocal(now);
  if (s.day !== today) return { state: { ...s, day: today }, access: 'free' };
  if (s.extras > 0) return { state: { ...s, extras: s.extras - 1 }, access: 'ticket' };
  return { state: s, access: 'blocked' };
}

export interface RationStatus {
  merit: number;
  extras: number;
  pending: number;
  /** free draw of the day still available */
  canFree: boolean;
  /** can afford a donation right now */
  canDonate: boolean;
}

export function status(s: RationState, now: Date): RationStatus {
  const pending = pendingMerit(s, now);
  return {
    merit: s.merit,
    extras: s.extras,
    pending,
    canFree: s.day !== todayLocal(now),
    /** can drop at least one merit right now (one click = one merit) */
    canDonate: s.merit >= 1,
  };
}

/* ---- localStorage adapter (best-effort, same posture as unlock.ts) ---- */

const KEY = 'fw_ration';

export function loadRation(now: Date): RationState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return freshState(now);
    const o = JSON.parse(raw) as Partial<RationState>;
    const merit = clampInt(o.merit, 0, MERIT_CAP);
    const accrueTs =
      typeof o.accrueTs === 'number' && Number.isFinite(o.accrueTs) && o.accrueTs > 0
        ? o.accrueTs
        : now.getTime();
    return {
      day: typeof o.day === 'string' ? o.day : '',
      merit,
      accrueTs,
      extras: clampInt(o.extras, 0, 999),
      donated: clampInt(o.donated, 0, MERIT_COST - 1),
    };
  } catch {
    return freshState(now);
  }
}

export function saveRation(s: RationState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable — the ration just resets each visit */
  }
}

function clampInt(v: unknown, lo: number, hi: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? Math.max(lo, Math.min(hi, Math.floor(v))) : lo;
}
