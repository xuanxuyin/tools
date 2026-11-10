/**
 * GET /api/auth/logout — delete the session row, clear the cookie, go home.
 */
import { readCookie, SESSION_COOKIE, type Env } from '../_shared';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const token = readCookie(request, SESSION_COOKIE);
  if (token && env.DB) {
    await env.DB.prepare('DELETE FROM sessions WHERE token = ?1').bind(token).run().catch(() => {});
  }
  const res = Response.redirect(new URL(request.url).origin + '/', 302);
  const withCookie = new Response(res.body, res);
  withCookie.headers.append(
    'Set-Cookie',
    `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
  );
  return withCookie;
};
