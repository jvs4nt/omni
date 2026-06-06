import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api/client';
import { getNotyf } from '../../components/NotyfProvider';
import { OmniLogo } from '../../components/OmniLogo';
import '../../assets/styles/painel.css';

export default function MudarSenhaPage() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const trocar = async () => {
    const notyf = getNotyf();
    if (!senha) {
      notyf.error('Informe uma senha.');
      return;
    }
    setLoading(true);
    try {
      const res = await apiFetch<{ success: boolean; message?: string }>('/user/password.php', {
        method: 'POST',
        body: JSON.stringify({ senha }),
      });
      if (res.success) {
        notyf.success('Senha trocada com Sucesso!');
        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        notyf.error(res.message || 'Erro ao trocar senha.');
      }
    } catch {
      notyf.error('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="header" style={{ padding: 20 }}>
        <OmniLogo showText />
        <div className="botoes" style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          <Link to="/dashboard" style={{ color: '#94a3b8' }}>home</Link>
          <Link to="/login" style={{ color: '#94a3b8' }} onClick={async (e) => { e.preventDefault(); await fetch('/api/auth/logout.php', { method: 'POST', credentials: 'include' }); navigate('/login'); }}>logout</Link>
        </div>
      </div>
      <div className="fatherCenter" style={{ height: '50vh', justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '2rem', width: '80%', textAlign: 'center' }}>Trocar senha</h1>
        <br />
        <input className="comprarInputs" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Nova Senha" style={{ padding: 12, borderRadius: 8, width: 280, marginTop: 16 }} />
        <br />
        <button id="realizar" type="button" onClick={trocar} disabled={loading} style={{ marginTop: 16, padding: '12px 32px', background: '#3d6bff', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer' }}>
          {loading ? 'Salvando...' : 'Trocar'}
        </button>
      </div>
      <style>{`
        body { background: radial-gradient(circle at top, #111827, #000000 70%) !important; }
        .fatherCenter { background: rgba(13,16,24,0.88); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; backdrop-filter: blur(12px); max-width: 480px; margin: 40px auto; padding: 40px; }
        .comprarInputs { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; }
      `}</style>
    </div>
  );
}
