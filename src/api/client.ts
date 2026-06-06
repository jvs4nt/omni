const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

export async function apiFetch<T = unknown>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options?.headers,
    },
  });

  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(text || 'Erro na requisição');
  }
}
