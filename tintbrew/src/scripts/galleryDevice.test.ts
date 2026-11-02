/**
 * Device identity tests (2026-11-02 regression guard). The gallery's
 * "one person, one piece" promise rests on deviceHash being stable for
 * the same browser — an early build mixed the request IP into the hash,
 * so a reconnecting home connection forked the identity and a republish
 * inserted a second gallery piece instead of replacing the first. IP
 * must never participate again.
 */
import { describe, expect, it } from 'vitest';
import { deviceHash } from '../../functions/api/gallery/_shared';

const uuid = '01234567-89ab-4cdef-8901-234567890abc';

describe('deviceHash identity', () => {
  it('is stable across IPs — same uuid, same hash', async () => {
    const a = await deviceHash({ DEVICE_SALT: 's' }, uuid);
    const b = await deviceHash({ DEVICE_SALT: 's' }, uuid);
    expect(a).toBe(b);
    expect(a).toMatch(/^[0-9a-f]{32}$/);
  });

  it('differs per uuid and per salt', async () => {
    const base = await deviceHash({ DEVICE_SALT: 's' }, uuid);
    expect(await deviceHash({ DEVICE_SALT: 's' }, 'other-uuid')).not.toBe(base);
    expect(await deviceHash({ DEVICE_SALT: 't' }, uuid)).not.toBe(base);
  });

  it('works without a configured salt (local/dev default)', async () => {
    const h = await deviceHash({}, uuid);
    expect(h).toMatch(/^[0-9a-f]{32}$/);
  });
});
