import { apiFetch } from './client';
import type { AdminModule, AdminStats, AdminUser } from '../types/api';

export const adminApi = {
  getStats: () => apiFetch<AdminStats>('/admin/index.php?action=get_stats'),
  getUsers: () => apiFetch<AdminUser[]>('/admin/index.php?action=get_users'),
  getModules: () => apiFetch<AdminModule[]>('/admin/index.php?action=get_modules'),
  saveModule: (data: Partial<AdminModule>) =>
    apiFetch('/admin/index.php?action=save_module', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  createUser: (data: Record<string, unknown>) =>
    apiFetch('/admin/index.php?action=create_user', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  deleteModule: (id: number) =>
    apiFetch(`/admin/index.php?action=delete_module&id=${id}`),
  updateUserDays: (id: number, days: number) =>
    apiFetch('/admin/index.php?action=update_user_days', {
      method: 'POST',
      body: JSON.stringify({ id, days }),
    }),
  addUserCredits: (id: number, amount: number) =>
    apiFetch('/admin/index.php?action=add_user_credits', {
      method: 'POST',
      body: JSON.stringify({ id, amount }),
    }),
  setUserRole: (id: number, role: string) =>
    apiFetch('/admin/index.php?action=set_user_role', {
      method: 'POST',
      body: JSON.stringify({ id, role }),
    }),
  deleteUser: (id: number) =>
    apiFetch(`/admin/index.php?action=delete_user&id=${id}`),
};
