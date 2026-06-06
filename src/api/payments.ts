import { apiFetch } from './client';
import type { PaymentVerifyResponse, PixResponse } from '../types/api';

export const paymentsApi = {
  createPix: (data: {
    pix: boolean;
    valor: string;
    usuario?: string;
    senha?: string;
    email?: string;
    renew?: boolean;
  }) =>
    apiFetch<PixResponse>('/payments/pix.php', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  verify: (data: {
    collection_id: string;
    valor: string;
    usuario: string;
    senha: string;
    email: string;
  }) =>
    apiFetch<PaymentVerifyResponse>('/payments/verify.php', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  renew: (data: { collection_id: string; valor: string }) =>
    apiFetch<PaymentVerifyResponse>('/payments/renew.php', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
