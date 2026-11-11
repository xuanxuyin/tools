/**
 * GET /api/auth/google — start Google OAuth (sign-in is OPTIONAL: every tool
 * works without an account; signing in only syncs reading history across
 * devices — flipsimu pattern, privacy line kept).
 * Requires env GOOGLE_CLIENT_ID and a registered redirect URI:
 *   https://<final-domain>/api/auth/callback
 */
import { randomToken, type Env } from '../_shared';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.GOOGLE_CLIENT_ID) {
    return new Response('Sign-in ships with the live site (Google OAuth not configured).', { status: 503 });
  }
  const url = new URL(request.url);
  const state = randomToken(16);
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', env.GOOGLE_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', `${url.origin}/api/auth/callback`);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('prompt', 'select_account');
  const res = Response.redirect(authUrl.toString(), 302);
  const withCookie = new Response(res.body, res);
  withCookie.headers.append(
    'Set-Cookie',
    `ls_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
  );
  return withCookie;
};
