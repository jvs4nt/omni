import { apiFetch } from './client';

export const queryApi = {
  search: (module: string, query: string) =>
    apiFetch<Record<string, unknown>>(
      `/query.php?module=${encodeURIComponent(module)}&query=${encodeURIComponent(query)}`
    ),
};
