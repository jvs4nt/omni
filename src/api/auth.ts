import { apiFetch } from './client';
import type { AuthMeResponse, LoginResponse } from '../types/api';

export const authApi = {
  login: (usuario: string, senha: string) =>
    apiFetch<LoginResponse>('/auth/login.php', {
      method: 'POST',
      body: JSON.stringify({ usuario, senha }),
    }),

  logout: () =>
    apiFetch<{ success: boolean }>('/auth/logout.php', { method: 'POST' }),

  me: () => apiFetch<AuthMeResponse>('/auth/me.php'),

  status: () =>
    apiFetch<{ success: boolean; expirado?: boolean; message?: string }>(
      '/auth/status.php'
    ),
};
