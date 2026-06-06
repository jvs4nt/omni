import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ComingSoonModal } from '../../components/ComingSoonModal';
import { OmniLogo } from '../../components/OmniLogo';
import '../../assets/styles/global.css';
import '../../assets/styles/comprar.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.classList.add('auth-active');
    return () => document.body.classList.remove('auth-active');
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="auth-page">
      <div className="register-container glass-card">
        <OmniLogo className="logo-wrap font-syne" showText textClassName="" onClick={() => navigate('/')} />
        <div className="header-text">
          <h1 className="font-syne">Login</h1>
          <p>Entre com seu usuário e senha para acessar a plataforma.</p>
        </div>
        <form id="formLogin" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Usuário</label>
            <input type="text" name="usuario" className="input-field" placeholder="Digite seu usuário..." required />
          </div>
          <div className="input-group">
            <label className="input-label">Senha</label>
            <input type="password" name="senha" className="input-field" placeholder="Digite sua senha..." required />
          </div>
          <div className="remember-wrap">
            <input type="checkbox" id="lembrar" />
            <label htmlFor="lembrar">Lembrar minha senha</label>
          </div>
          <div className="auth-actions">
            <button className="btn btn-secondary" type="button" onClick={() => navigate('/comprar')}>Registrar</button>
            <button className="btn btn-primary" type="submit">Entrar</button>
          </div>
        </form>
        <p style={{ marginTop: 20, fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
          Não tem uma conta?{' '}
          <Link to="/comprar" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Criar Conta</Link>
        </p>
        <p style={{ marginTop: 12 }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', textDecoration: 'none' }}>← Voltar para Home</Link>
        </p>
      </div>
      <ComingSoonModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
