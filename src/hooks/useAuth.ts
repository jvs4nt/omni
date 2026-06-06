import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api/auth';

export function useAuth() {
  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.me,
    retry: false,
    staleTime: 30_000,
  });

  const data = query.data;
  const isAuthenticated = data?.success === true;
  const isExpired = data?.expirado === true;
  const isAdmin = data?.nivel === 1 || data?.role === 'admin';

  return {
    ...query,
    user: isAuthenticated
      ? {
          usuario: data.usuario!,
          dias: data.dias_restantes ?? data.dias ?? 0,
          creditos: data.creditos ?? 0,
          nivel: data.nivel ?? 0,
          role: data.role ?? 'usuario',
          expirado: data.expirado ?? false,
          expira_em: data.expira_em,
        }
      : null,
    isAuthenticated,
    isExpired,
    isAdmin,
  };
}
