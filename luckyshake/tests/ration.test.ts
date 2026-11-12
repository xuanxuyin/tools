import { describe, it, expect } from 'vitest';
import {
  MERIT_CAP,
  MERIT_COST,
  HOUR_MS,
  freshState,
  pendingMerit,
  claim,
  donateRest,
  donateOne,
  consumeDraw,
  status,
  todayLocal,
  type RationState,
} from '../src/lib/ration';

const T0 = new Date('2026-11-11T09:00:00');
const hoursLater = (h: number) => new Date(T0.getTime() + h * HOUR_MS);

describe('todayLocal', () => {
  it('formats the device-local day as YYYY-MM-DD', () => {
    expect(todayLocal(new Date('2026-11-11T23:59:59'))).toBe('2026-11-11');
    expect(todayLocal(new Date('2026-01-02T00:00:01'))).toBe('2026-01-02');
  });
});

describe('accrual', () => {
  it('fresh state carries a 1h grace so the first claim lands +1', () => {
    const s = freshState(T0);
    expect(pendingMerit(s, T0)).toBe(1);
  });

  it('accrues 1 per full hour', () => {
    // claim away the grace hour first so the accrual window starts exactly at T0
    const s = claim(freshState(T0), T0).state;
    expect(pendingMerit(s, hoursLater(2.5))).toBe(2);
    expect(pendingMerit(s, hoursLater(10))).toBe(10);
  });

  it('never exceeds the cap', () => {
    const s = freshState(T0);
    expect(pendingMerit(s, hoursLater(500))).toBe(MERIT_CAP);
  });

  it('claim banks accrued merit and restarts the window', () => {
    let s: RationState = claim(freshState(T0), T0).state;
    const r1 = claim(s, hoursLater(3));
    s = r1.state;
    expect(r1.claimed).toBe(3);
    expect(s.merit).toBe(4); // 3 accrued + the 1h grace banked during normalization
    // right after claiming: nothing pending
    expect(pendingMerit(s, hoursLater(3.2))).toBe(0);
    // one hour later: one more
    expect(pendingMerit(s, hoursLater(4.2))).toBe(1);
  });

  it('hours while the box sits full are not kept', () => {
    let s: RationState = freshState(T0);
    s = claim(s, hoursLater(30)).state;
    expect(s.merit).toBe(MERIT_CAP);
    // a day passes while full, then user spends 8 on a ticket
    s = donateRest(s).state;
    expect(s.merit).toBe(MERIT_CAP - MERIT_COST);
    // accrual resumes from the last full-box claim, not the idle day
    expect(pendingMerit(s, hoursLater(30.5))).toBe(0);
    expect(pendingMerit(s, hoursLater(31.5))).toBe(1);
  });
});

describe('donateRest', () => {
  it('banks one extra draw for 8 merit from a fresh cycle', () => {
    const s: RationState = { ...freshState(T0), merit: 10, donated: 0 };
    const r = donateRest(s);
    expect(r.ok).toBe(true);
    expect(r.state.merit).toBe(10 - MERIT_COST);
    expect(r.state.extras).toBe(1);
    expect(r.state.donated).toBe(0);
  });

  it('merit already dropped at the home box counts toward the ticket', () => {
    const s: RationState = { ...freshState(T0), merit: 9, donated: 3 };
    const r = donateRest(s);
    expect(r.ok).toBe(true);
    expect(r.state.merit).toBe(9 - (MERIT_COST - 3)); // pays only the remainder
    expect(r.state.extras).toBe(1);
    expect(r.state.donated).toBe(0);
  });

  it('refuses when the balance cannot cover the remainder', () => {
    const s: RationState = { ...freshState(T0), merit: 4, donated: 3 };
    const r = donateRest(s);
    expect(r.ok).toBe(false);
    expect(r.state.merit).toBe(4);
    expect(r.state.extras).toBe(0);
    expect(r.state.donated).toBe(3);
  });

  it('(8 - donated) single drops land where one donateRest() lands', () => {
    const start: RationState = { ...freshState(T0), merit: 9, donated: 3 };
    let s = start;
    for (let i = 0; i < MERIT_COST - start.donated; i++) s = donateOne(s).state;
    const batch = donateRest(start).state;
    expect(s.merit).toBe(batch.merit);
    expect(s.extras).toBe(batch.extras);
    expect(s.donated).toBe(batch.donated);
  });
});

describe('donateOne', () => {
  it('drops one merit per click and counts the cycle', () => {
    const s: RationState = { ...freshState(T0), merit: 3, donated: 2 };
    const r = donateOne(s);
    expect(r.ok).toBe(true);
    expect(r.banked).toBe(false);
    expect(r.state.merit).toBe(2);
    expect(r.state.donated).toBe(3);
    expect(r.state.extras).toBe(0);
  });

  it('banks a ticket on the 8th drop and starts a fresh cycle', () => {
    const s: RationState = { ...freshState(T0), merit: 2, donated: MERIT_COST - 1 };
    const r = donateOne(s);
    expect(r.ok).toBe(true);
    expect(r.banked).toBe(true);
    expect(r.state.merit).toBe(1);
    expect(r.state.donated).toBe(0);
    expect(r.state.extras).toBe(1);
  });

  it('refuses when the balance is empty', () => {
    const s: RationState = { ...freshState(T0), merit: 0, donated: 4 };
    const r = donateOne(s);
    expect(r.ok).toBe(false);
    expect(r.state.merit).toBe(0);
    expect(r.state.donated).toBe(4);
    expect(r.state.extras).toBe(0);
  });
});

describe('consumeDraw', () => {
  it('the first draw of the day is free, on any tool', () => {
    let s = freshState(T0);
    const r1 = consumeDraw(s, T0);
    expect(r1.access).toBe('free');
    s = r1.state;
    // a different tool later the same day shares the same ration
    const r2 = consumeDraw(s, hoursLater(1));
    expect(r2.access).toBe('blocked');
  });

  it('rolls over to the free draw the next day', () => {
    let s = freshState(T0);
    s = consumeDraw(s, T0).state;
    const nextDay = new Date(T0.getTime() + 24 * HOUR_MS + HOUR_MS / 2);
    expect(consumeDraw(s, nextDay).access).toBe('free');
  });

  it('spends a banked ticket before blocking', () => {
    let s: RationState = { ...freshState(T0), day: todayLocal(T0), extras: 2 };
    const r = consumeDraw(s, T0);
    expect(r.access).toBe('ticket');
    expect(r.state.extras).toBe(1);
    expect(consumeDraw(r.state, T0).access).toBe('ticket');
    const r3 = consumeDraw({ ...r.state, extras: 0 }, T0);
    expect(r3.access).toBe('blocked');
  });
});

describe('status', () => {
  it('reports the whole picture', () => {
    const norm = claim(freshState(T0), T0).state;
    const s: RationState = { ...norm, merit: 6, extras: 1 };
    const st = status(s, hoursLater(2.5));
    expect(st).toEqual({ merit: 6, extras: 1, pending: 2, canFree: true, canDonate: true });
    // one click drops one merit — any balance above zero can donate
    const broke: RationState = { ...norm, day: todayLocal(T0), merit: 0, extras: 0 };
    expect(status(broke, hoursLater(1)).canDonate).toBe(false);
    expect(status({ ...broke, merit: 1 }, hoursLater(1)).canDonate).toBe(true);
  });
});
