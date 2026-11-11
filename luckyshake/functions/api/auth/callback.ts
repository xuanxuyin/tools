/**
 * GET /api/auth/callback — Google OAuth callback: verify state, exchange the
 * code, upsert the user, open a 30-day session cookie, land on /account/.
 * The id_token arrives straight from Google over TLS in exchange for the
 * one-time code, so decoding the payload (rather than verifying a signature)
 * follows the standard authorization-code flow.
 */
import { json, randomToken, readCookie, SESSION_COOKIE, SESSION_TTL_DAYS, type Env } from '../_shared';

interface GoogleClaims {
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
}

function decodeJwtPayload(idToken: string): GoogleClaims {
  const part = idToken.split('.')[1] ?? '';
  const b64 = part.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
  return JSON.parse(atob(padded)) as GoogleClaims;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB || !env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    return new Response('Sign-in ships with the live site (not configured).', { status: 503 });
  }
  const url = new URL(request.url);
  const code = url.searchParams.get('code') ?? '';
  const state = url.searchParams.get('state') ?? '';
  const expected = readCookie(request, 'ls_oauth_state');
  if (!code || !state || !expected || state !== expected) {
    return new Response('Bad OAuth state — start again from the sign-in button.', { status: 400 });
  }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${url.origin}/api/auth/callback`,
      grant_type: 'authorization_code',
    }),
  });
  if (!tokenRes.ok) return new Response('Google token exchange failed — try signing in again.', { status: 502 });
  const tokens = (await tokenRes.json()) as { id_token?: string };
  if (!tokens.id_token) return new Response('Google returned no identity — try again.', { status: 502 });
  const claims = decodeJwtPayload(tokens.id_token);
  if (!claims.sub) return new Response('Google identity incomplete — try again.', { status: 502 });

  const userId = 'u_' + claims.sub.slice(0, 24);
  await env.DB
    .prepare(
      `INSERT INTO users (id, google_sub, email, name, picture)
       VALUES (?1, ?2, ?3, ?4, ?5)
       ON CONFLICT(google_sub) DO UPDATE SET email = ?3, name = ?4, picture = ?5`,
    )
    .bind(userId, claims.sub, claims.email ?? null, claims.name ?? null, claims.picture ?? null)
    .run();

  const token = randomToken(32);
  await env.DB
    .prepare(`INSERT INTO sessions (token, user_id, expires_at) VALUES (?1, ?2, datetime('now', '+${SESSION_TTL_DAYS} days'))`)
    .bind(token, userId)
    .run();

  const res = Response.redirect(`${url.origin}/account/`, 302);
  const withCookie = new Response(res.body, res);
  withCookie.headers.append(
    'Set-Cookie',
    `${SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_DAYS * 86400}`,
  );
  withCookie.headers.append('Set-Cookie', 'ls_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0');
  return withCookie;
};

export const onRequestPost: PagesFunction<Env> = async () => json({ error: 'GET only' }, 405);
