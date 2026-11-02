/**
 * Shared plumbing for the gallery Pages Functions. Filenames starting with
 * `_` are ignored by the Pages file router — this module only exports helpers.
 *
 * No @cloudflare/workers-types dependency: the minimal D1 surface used here
 * is declared below; CF's real runtime satisfies it.
 */

export interface Env {
  /** D1 binding — configured in the Pages dashboard (see PLAN). */
  GALLERY_DB: D1Db;
  /** Optional secret mixed into the device hash; set in Pages settings. */
  DEVICE_SALT?: string;
}

export interface D1Db {
  prepare(query: string): {
    bind(...values: unknown[]): {
      first<T = Record<string, unknown>>(): Promise<T | null>;
      all<T = Record<string, unknown>>(): Promise<{ results?: T[] }>;
      run(): Promise<{ meta?: { changes?: number } }>;
    };
  };
}

export type Ctx = { request: Request; env: Env };

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/** SHA-256(salt|uuid) — server-side device identity. The uuid never lands
 *  in the DB and the salt keeps precomputed tables useless. IP is
 *  deliberately NOT mixed in: a home connection that changes its address
 *  would fork the identity and silently break "one person, one piece"
 *  (the replace-on-publish UPSERT would insert a second row instead). */
export async function deviceHash(env: Env, uuid: string): Promise<string> {
  const data = new TextEncoder().encode(`${env.DEVICE_SALT ?? ''}|${uuid}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}
