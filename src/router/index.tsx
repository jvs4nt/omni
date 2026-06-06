import { createBrowserRouter } from 'react-router-dom';
import { AdminRoute, ExpiredRoute, GuestRoute, ProtectedRoute } from './guards';
import LandingPage from '../pages/Landing/LandingPage';
import LoginPage from '../pages/Login/LoginPage';
import ComprarPage from '../pages/Comprar/ComprarPage';
import TermosPage from '../pages/Termos/TermosPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import CpfPage from '../pages/Cpf/CpfPage';
import SearchPage from '../pages/Search/SearchPage';
import RenovarPage from '../pages/Renovar/RenovarPage';
import MudarSenhaPage from '../pages/MudarSenha/MudarSenhaPage';
import AdminPage from '../pages/Admin/AdminPage';

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/termos', element: <TermosPage /> },
  {
    element: <GuestRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/comprar', element: <ComprarPage /> },
    ],
  },
  {
    element: <ExpiredRoute />,
    children: [{ path: '/renovar', element: <RenovarPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/dashboard/consultar/cpf', element: <CpfPage /> },
      { path: '/dashboard/search', element: <SearchPage /> },
      { path: '/mudar-senha', element: <MudarSenhaPage /> },
    ],
  },
  {
    element: <AdminRoute />,
    children: [{ path: '/admin', element: <AdminPage /> }],
  },
]);
