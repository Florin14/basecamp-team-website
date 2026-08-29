/**
 * Citire din Supabase prin API-ul REST generat automat (PostgREST).
 * Nu avem backend propriu: aplicația de scraping scrie în baza de date cu
 * service key, iar site-ul citește cu cheia publică (anon), read-only prin RLS.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** Sursa live e configurată doar dacă ambele variabile există. */
export const isRemoteConfigured = Boolean(url && anonKey);

export class RemoteError extends Error {}

export async function selectFrom<T>(
  table: string,
  query = 'select=*',
  signal?: AbortSignal,
): Promise<T[]> {
  if (!url || !anonKey) throw new RemoteError('Sursa live nu este configurată');

  const response = await fetch(`${url}/rest/v1/${table}?${query}`, {
    signal,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new RemoteError(`${table}: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T[];
}
