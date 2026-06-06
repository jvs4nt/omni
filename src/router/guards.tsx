import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute() {
  const { isLoading, isAuthenticated, isExpired } = useAuth();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (isExpired) return <Navigate to="/renovar" replace />;
  return <Outlet />;
}

export function ExpiredRoute() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function AdminRoute() {
  const { isLoading, isAuthenticated, isAdmin, isExpired } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (isExpired) return <Navigate to="/renovar" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

export function GuestRoute() {
  const { isLoading, isAuthenticated, isExpired } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated && !isExpired) return <Navigate to="/dashboard" replace />;
  if (isAuthenticated && isExpired) return <Navigate to="/renovar" replace />;
  return <Outlet />;
}
