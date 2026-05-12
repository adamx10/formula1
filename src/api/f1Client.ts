const CACHE_TTL = 5 * 60 * 1000;

function getCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw) as { data: T; ts: number };
    if (Date.now() - ts > CACHE_TTL) { sessionStorage.removeItem(key); return null; }
    return data;
  } catch { return null; }
}

function setCache<T>(key: string, data: T): void {
  try { sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch { /* quota */ }
}

export async function fetchF1<T>(url: string): Promise<T> {
  const cached = getCache<T>(url);
  if (cached) return cached;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`F1 API ${res.status}`);
  const data: T = await res.json();
  setCache(url, data);
  return data;
}

const BASE = 'https://api.jolpica.com/ergast/f1';

export const API = {
  driverStandings: `${BASE}/current/driverStandings.json`,
  constructorStandings: `${BASE}/current/constructorStandings.json`,
  schedule: `${BASE}/current.json`,
  lastResults: `${BASE}/current/last/results.json`,
} as const;
