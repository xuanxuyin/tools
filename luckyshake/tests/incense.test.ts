import { describe, it, expect } from 'vitest';
import {
  claimIncense,
  lightStick,
  offerStick,
  burnRatio,
  INCENSE_PER_DAY,
  type IncenseState,
} from '../src/lib/incense';
import { todayLocal } from '../src/lib/ration';

const T0 = new Date('2026-11-12T09:00:00');
const minsLater = (m: number) => new Date(T0.getTime() + m * 60_000);

const claimed = (): IncenseState => claimIncense(T0);

describe('claimIncense', () => {
  it('issues exactly three raw sticks stamped with today', () => {
    const s = claimed();
    expect(s.day).toBe(todayLocal(T0));
    expect(s.sticks.length).toBe(INCENSE_PER_DAY);
    expect(s.sticks.every((st) => st.phase === 'raw')).toBe(true);
  });
});

describe('lightStick', () => {
  it('turns a raw stick lit and stamps the moment', () => {
    const s = lightStick(claimed(), 0, minsLater(1));
    expect(s.sticks[0].phase).toBe('lit');
    expect(s.sticks[0].litTs).toBe(minsLater(1).getTime());
    expect(s.sticks[1].phase).toBe('raw');
  });

  it('refuses to light a stick that is not raw', () => {
    const lit = lightStick(claimed(), 2, minsLater(1));
    expect(lightStick(lit, 2, minsLater(2))).toBe(lit); // double-light no-op
    const out = lightStick(lit, 9, minsLater(2)); // out of range
    expect(out).toBe(lit);
    expect(out.sticks[2].litTs).toBe(minsLater(1).getTime());
  });

  it('does not mutate the state it was given', () => {
    const s = claimed();
    lightStick(s, 1, minsLater(1));
    expect(s.sticks[1].phase).toBe('raw');
  });
});

describe('offerStick', () => {
  it('moves a lit stick into the censer, keeping its lit stamp', () => {
    const lit = lightStick(claimed(), 1, minsLater(1));
    const r = offerStick(lit, 1, minsLater(2));
    expect(r.ok).toBe(true);
    expect(r.state.sticks[1].phase).toBe('burning');
    expect(r.state.sticks[1].offerTs).toBe(minsLater(2).getTime());
    expect(r.state.sticks[1].litTs).toBe(minsLater(1).getTime());
  });

  it('refuses to offer a stick that was never lit', () => {
    const s = claimed();
    const r = offerStick(s, 0, minsLater(1));
    expect(r.ok).toBe(false);
    expect(r.state.sticks[0].phase).toBe('raw');
  });

  it('refuses out-of-range and re-offering a burning stick', () => {
    const lit = lightStick(claimed(), 0, minsLater(1));
    const burning = offerStick(lit, 0, minsLater(2)).state;
    expect(offerStick(burning, 0, minsLater(3)).ok).toBe(false);
    expect(offerStick(burning, 5, minsLater(3)).ok).toBe(false);
  });
});

describe('burnRatio', () => {
  const offeredAt = (m: number): IncenseState => {
    const lit = lightStick(claimed(), 0, T0);
    return offerStick(lit, 0, minsLater(m)).state;
  };

  it('runs 0 → 1 over the burn window and clamps past it', () => {
    const s = offeredAt(1);
    expect(burnRatio(s.sticks[0], minsLater(1))).toBe(0); // just offered
    expect(burnRatio(s.sticks[0], minsLater(16))).toBeCloseTo(0.5);
    expect(burnRatio(s.sticks[0], minsLater(31))).toBe(1);
    expect(burnRatio(s.sticks[0], minsLater(90))).toBe(1); // clamped
  });

  it('sticks not yet in the censer have no burn progress', () => {
    const lit = lightStick(claimed(), 0, T0);
    expect(burnRatio(lit.sticks[0], minsLater(30))).toBe(0);
    expect(burnRatio(claimed().sticks[0], minsLater(30))).toBe(0);
  });
});
