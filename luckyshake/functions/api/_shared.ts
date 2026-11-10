/**
 * Shared helpers for LuckyShake Pages Functions (deployed as /api/*).
 * Files starting with "_" are not routed.
 *
 * Local/dev: `npx wrangler pages dev` (needs a D1 binding named DB).
 * Production: Cloudflare Pages project → Settings → Bindings → D1 (DB) +
 * env vars GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET. See schema.sql.
 */

export interface D1Result {
  results?: unknown[];
  success?: boolean;
}
export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<D1Result>;
}
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
export interface Env {
  DB?: D1Database;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
}

export const SESSION_COOKIE = 'ls_session';
export const SESSION_TTL_DAYS = 30;

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export function readCookie(request: Request, name: string): string | null {
  const raw = request.headers.get('Cookie');
  if (!raw) return null;
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}

export function randomToken(bytes = 32): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Current user for a request, or null (sessions table join users). */
export async function currentUser(env: Env, request: Request): Promise<{ id: string; email: string | null; name: string | null; picture: string | null } | null> {
  if (!env.DB) return null;
  const token = readCookie(request, SESSION_COOKIE);
  if (!token) return null;
  return env.DB
    .prepare(
      `SELECT u.id, u.email, u.name, u.picture
       FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token = ?1 AND s.expires_at > datetime('now')`,
    )
    .bind(token)
    .first<{ id: string; email: string | null; name: string | null; picture: string | null }>();
}
