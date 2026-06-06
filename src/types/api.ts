export interface User {
  usuario: string;
  dias: number;
  dias_restantes: number;
  creditos: number;
  nivel: number;
  role: string;
  expirado: boolean;
  expira_em: string | null;
}

export interface AuthMeResponse {
  success: boolean;
  usuario?: string;
  dias?: number;
  dias_restantes?: number;
  creditos?: number;
  nivel?: number;
  role?: string;
  expirado?: boolean;
  expira_em?: string | null;
  message?: string;
}

export interface LoginResponse {
  success: boolean;
  renovar?: boolean;
  message?: string;
}

export interface PixTransactionData {
  qr_code_base64: string;
  qr_code: string;
  ticket_url: string;
}

export interface PixResponse {
  transaction_data?: PixTransactionData;
  success?: boolean;
  message?: string;
}

export interface PaymentVerifyResponse {
  success: boolean;
  message?: string;
}

export interface AdminStats {
  users: number;
  modules: number;
  active_users: number;
}

export interface AdminUser {
  id: number;
  usuario: string;
  senha: string;
  email: string;
  dias: string;
  nivel: number;
  creditos: number;
  role?: string;
}

export interface AdminModule {
  id: number;
  nome: string;
  descricao: string;
  icone: string;
  api_url: string;
  ativo: number;
  requer_creditos: number;
  custo_creditos: number;
  imagem_url: string | null;
  manutencao: number;
}
