import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ComingSoonModal } from '../../components/ComingSoonModal';
import { OmniLogo } from '../../components/OmniLogo';
import '../../assets/styles/global.css';
import '../../assets/styles/comprar.css';

export default function ComprarPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.classList.add('auth-active');
    return () => document.body.classList.remove('auth-active');
  }, []);

  return (
    <div className="auth-page">
      <div className="register-container glass-card">
        <OmniLogo className="logo-wrap font-syne" showText textClassName="" onClick={() => navigate('/')} />
        <div className="header-text">
          <h1 className="font-syne">Criar Conta</h1>
          <p>Escolha seu plano e comece a consultar em instantes. Seu acesso será liberado após o pagamento.</p>
        </div>
        <form id="formRegistro">
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Usuário</label>
              <input type="text" id="user" className="input-field" placeholder="Usuário" required />
            </div>
            <div className="input-group">
              <label className="input-label">Senha</label>
              <input type="password" id="pass" className="input-field" placeholder="Senha" required />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" id="email" className="input-field" placeholder="seu@email.com" required />
          </div>
          <div className="input-group">
            <label className="input-label">Plano de Acesso</label>
            <select id="tipo" className="input-field" defaultValue="Mensal">
              <option value="Mensal">Mensal — R$ 50,00</option>
              <option value="Semanal">Semanal — R$ 30,00</option>
              <option value="Diario">Diário — R$ 15,00</option>
            </select>
          </div>
          <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: 10 }} onClick={() => setShowModal(true)}>
            Assinar Agora
          </button>
          <p style={{ marginTop: 20, fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
            Já tem uma conta? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Faça Login</Link>
          </p>
        </form>
      </div>
      <ComingSoonModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
