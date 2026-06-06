import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

export function useExpiryPoll(enabled = true) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(async () => {
      try {
        const res = await authApi.status();
        if (res.success === false || res.expirado) {
          clearInterval(timer);
          alert('Seu usuário Expirou. Renove agora.');
          navigate('/renovar');
        }
      } catch {
        /* ignore */
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [enabled, navigate]);
}
