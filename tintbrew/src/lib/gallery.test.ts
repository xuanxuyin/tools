/**
 * Gallery core unit tests — compact cell encoding (roundtrip, unknown-id
 * throw, corrupt-decode tolerance), publish validation (every branch the
 * Function maps to an HTTP code), piece-id format and the UTC hour bucket
 * that both rate limits hang off.
 */
import { describe, expect, it } from 'vitest';
import { MARD_COLORS } from './mardPalette';
import { decodeCells, encodeCells, GALLERY_LIMITS, hourBucket, newPieceId, validatePublish } from './gallery';

const A1 = MARD_COLORS[0]!.id;
const B2 = MARD_COLORS[11]!.id;
const LAST = MARD_COLORS[MARD_COLORS.length - 1]!.id;

describe('encodeCells / decodeCells', () => {
  it('roundtrips ids and nulls row-major', () => {
    const cells = [null, A1, B2, null, LAST, null, null, null];
    expect(decodeCells(encodeCells(cells))).toEqual(cells);
  });

  it('encodes 2 chars per bead, 1 char per empty peg', () => {
    const out = encodeCells([A1, null, A1]);
    expect(out).toHaveLength(2 + 1 + 2);
    expect(out[2]).toBe('.');
  });

  it('covers the last palette index (padding matters)', () => {
    expect(decodeCells(encodeCells([LAST]))).toEqual([LAST]);
  });

  it('throws on an unknown id (encode side never writes garbage)', () => {
    expect(() => encodeCells(['not-a-bead'])).toThrow(/unknown bead id/);
  });

  it('decodes corrupt chunks to null instead of failing the list', () => {
    // index beyond the palette length → null; truncation → null
    const beyond = Math.pow(36, 2) - 1; // 'zz'
    expect(beyond).toBeGreaterThan(MARD_COLORS.length);
    expect(decodeCells('zz')).toEqual([null]);
    expect(decodeCells('0')).toEqual([null]); // truncated single char
    expect(decodeCells('')).toEqual([]);
  });
});

describe('validatePublish', () => {
  const grid8 = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null as string | null));
  const okInput = {
    uuid: '0123456789abcdef',
    name: 'My heart',
    nick: 'BeadFan42',
    width: 8,
    height: 8,
    grid: grid8.map((r) => [...r]),
  };

  it('accepts a valid payload and flattens cells row-major', () => {
    okInput.grid[0]![1] = A1;
    const res = validatePublish(okInput);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.cells[1]).toBe(A1);
      expect(res.cells.filter((c) => c !== null)).toHaveLength(1);
    }
  });

  it('rejects bad uuid (short/long/non-string)', () => {
    expect(validatePublish({ ...okInput, uuid: 'short' }).ok).toBe(false);
    expect(validatePublish({ ...okInput, uuid: 'x'.repeat(65) }).ok).toBe(false);
    expect(validatePublish({ ...okInput, uuid: 42 }).ok).toBe(false);
  });

  it('rejects empty, oversized or bracketed name/nick', () => {
    expect(validatePublish({ ...okInput, name: '   ' })).toMatchObject({ ok: false, reason: 'bad-name' });
    expect(validatePublish({ ...okInput, name: 'x'.repeat(GALLERY_LIMITS.maxName + 1) })).toMatchObject({
      ok: false,
      reason: 'bad-name',
    });
    expect(validatePublish({ ...okInput, nick: '' })).toMatchObject({ ok: false, reason: 'bad-nick' });
    expect(validatePublish({ ...okInput, nick: 'a'.repeat(21) })).toMatchObject({ ok: false, reason: 'bad-nick' });
    expect(validatePublish({ ...okInput, name: '<script>' })).toMatchObject({ ok: false, reason: 'bad-chars' });
    expect(validatePublish({ ...okInput, nick: 'a<b' })).toMatchObject({ ok: false, reason: 'bad-chars' });
  });

  it('rejects out-of-range or non-numeric dimensions', () => {
    expect(validatePublish({ ...okInput, width: 7 })).toMatchObject({ ok: false, reason: 'bad-size' });
    expect(validatePublish({ ...okInput, height: 161 })).toMatchObject({ ok: false, reason: 'bad-size' });
    expect(validatePublish({ ...okInput, width: '29' })).toMatchObject({ ok: false, reason: 'bad-size' });
  });

  it('rejects grids that disagree with the declared size', () => {
    expect(validatePublish({ ...okInput, grid: [] })).toMatchObject({ ok: false, reason: 'bad-grid' });
    const ragged = grid8.map((r) => [...r]);
    ragged[0] = [null, null];
    expect(validatePublish({ ...okInput, grid: ragged })).toMatchObject({ ok: false, reason: 'bad-grid' });
  });

  it('rejects unknown bead ids and fully empty boards', () => {
    const ghost = grid8.map((r) => [...r]);
    ghost[3]![3] = 'mard-zzz';
    expect(validatePublish({ ...okInput, grid: ghost })).toMatchObject({ ok: false, reason: 'bad-bead' });
    expect(validatePublish({ ...okInput, grid: grid8.map((r) => [...r]) })).toMatchObject({
      ok: false,
      reason: 'empty',
    });
  });
});

describe('ids and hour buckets', () => {
  it('piece ids are 12 lowercase base36 chars', () => {
    for (let i = 0; i < 20; i++) expect(newPieceId()).toMatch(/^[0-9a-z]{12}$/);
  });

  it('hour bucket is the first 13 chars of the ISO string (UTC)', () => {
    expect(hourBucket(Date.UTC(2026, 10, 2, 9, 31, 0))).toBe('2026-11-02T09');
    expect(hourBucket(0)).toBe('1970-01-01T00');
  });
});
