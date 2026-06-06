import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth';
import { useAudioFeedback } from '../../hooks/useAudioFeedback';
import { useAuth } from '../../hooks/useAuth';
import { useCategoryProximity } from '../../hooks/useCategoryProximity';
import { useExpiryPoll } from '../../hooks/useExpiryPoll';
import { useMouseGradient } from '../../hooks/useMouseGradient';
import '../../assets/styles/dashboard.css';

const CATEGORIES = [
  'veiculares', 'dados pessoais', 'fotos', 'documentos', 'endereços',
  'financeiro', 'telefonia', 'imóveis', 'empresarial', 'judicial',
];

const MODULES = [
  { title: 'Omni CPF', subtitle: 'Documentos e endereços', slug: 'cpf' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  useExpiryPoll(true);
  useMouseGradient(true);
  const categoriesRef = useRef<HTMLDivElement>(null);
  useCategoryProximity(categoriesRef);

  const { soundEnabled, toggleSound, playTypingSound, playClickSound, playOpenSound, playCloseSound } = useAudioFeedback();

  const [loaderHidden, setLoaderHidden] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [visibleModules, setVisibleModules] = useState(MODULES);

  useEffect(() => {
    document.body.classList.add('dashboard-active');
    const t = setTimeout(() => setLoaderHidden(true), 1000);
    return () => {
      clearTimeout(t);
      document.body.classList.remove('dashboard-active');
    };
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('omni_welcomed')) {
      localStorage.setItem('omni_welcomed', '1');
      const t = setTimeout(() => {
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 4000);
      }, 1800);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setVisibleModules(
      MODULES.filter(
        (m) => m.title.toLowerCase().includes(q) || m.subtitle.toLowerCase().includes(q)
      )
    );
  }, [searchQuery]);

  const handleTyping = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) playTypingSound();
  };

  const toggleSearch = () => {
    if (searchActive) {
      playCloseSound();
      setSearchActive(false);
      setSearchQuery('');
    } else {
      playOpenSound();
      setSearchActive(true);
    }
  };

  const filterByCategory = (category: string) => {
    playClickSound();
    setSearchQuery(category);
    if (!searchActive) setSearchActive(true);
  };

  const navigateModule = (slug: string) => {
    if (window.navigator.vibrate) setTimeout(() => window.navigator.vibrate(50), 120);
    playClickSound();
    navigate(`/dashboard/consultar/${slug}`);
  };

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/login');
  };

  const diasLabel = user && user.dias < 2 ? `${user.dias} Dia` : `${user?.dias ?? 0} Dias`;

  return (
    <>
      <div id="loader" className={loaderHidden ? 'hide' : ''} style={loaderHidden ? { display: 'none' } : undefined}>
        <div className="gemini-glow" />
      </div>

      <div id="welcomeToast" className={`${showWelcome ? 'show' : ''}${!showWelcome && localStorage.getItem('omni_welcomed') ? ' wave-out' : ''}`}>
        <div className="toast-gradient-bg" />
        <div className="toast-icon">
          <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" /></svg>
        </div>
        <div className="toast-body">
          <strong>Bem-vindo ao OMNI! 👋</strong>
          <span>Seu painel está pronto.<br />Explore os módulos abaixo.</span>
        </div>
        <div className="toast-bar" />
      </div>

      <div className="sidebar">
        <svg className="logo-icon" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" fill="none" /></svg>
        <svg className="nav-icon active" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
        <svg className="nav-icon" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
        <svg className="nav-icon" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" /></svg>
        <div className={`nav-icon audio-icon${soundEnabled ? '' : ' muted'}`} onClick={toggleSound} role="button" tabIndex={0}>
          <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 863 898"><path d="M416 46.4244C397.086 48.9078 377.971 49.4822 359 52.4244" /></svg>
          <span>OMNI</span>
          <div className="header-right">
            <div style={{ position: 'relative' }}>
              <button type="button" className="icon-btn" onClick={() => { playClickSound(); setShowNotifications(!showNotifications); setShowWallet(false); }}>
                <svg viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.93 6 11v5l-2 2v1h16v-1l-2-2z" /></svg>
                <span className="notification-badge">3</span>
              </button>
              <div className={`notifications-dropdown${showNotifications ? ' show' : ''}`}>
                <div className="notification-header">Notificações</div>
                <div className="notification-item unread">
                  <div className="notification-title">Bem-vindo ao Omni!</div>
                  <div className="notification-desc">Seu painel está pronto para uso.</div>
                  <div className="notification-time">Agora</div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <button type="button" className="icon-btn" onClick={() => { playClickSound(); setShowWallet(!showWallet); setShowNotifications(false); }}>
                <svg viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /></svg>
              </button>
              <div className={`wallet-dropdown${showWallet ? ' show' : ''}`}>
                <div className="wallet-header">
                  <div className="wallet-balance">R$ {user?.creditos ?? 0},<small>00</small></div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 5 }}>Saldo disponível</div>
                </div>
                <button type="button" className="wallet-button" onClick={() => { playClickSound(); alert('Redirecionando para adicionar créditos...'); }}>Adicionar Créditos</button>
              </div>
            </div>
          </div>
        </div>

        <div className="top-nav">
          <div className="nav-links">
            <Link to="/">Home</Link>
            <button type="button" onClick={handleLogout}>Logout</button>
            <Link to="/mudar-senha">Trocar Senha</Link>
            {isAdmin && <Link to="/admin">Admin</Link>}
            <div className="search-wrapper">
              <button type="button" className="search-btn" onClick={toggleSearch}>Buscar</button>
              <div id="searchGlass" className={`search-glass${searchActive ? ' active' : ''}`}>
                <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                <input id="inputPesquisa" value={searchQuery} onChange={(e) => handleTyping(e.target.value)} placeholder="Pesquisar módulos, CPF, documentos..." autoComplete="off" />
              </div>
            </div>
          </div>
        </div>

        <div className="categories-section" id="categoriesSection">
          <div className="morphism-card" id="categoriesCard" ref={categoriesRef}>
            <div className="categories-grid" id="categoriesGrid">
              {CATEGORIES.map((cat) => (
                <button key={cat} type="button" className="category-link" onClick={() => filterByCategory(cat)}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="fatherCon">
          <div className="containerConsultas">
            {visibleModules.map((mod) => (
              <div key={mod.slug} className="btnCon" onClick={() => navigateModule(mod.slug)} onMouseDown={playClickSound} role="button" tabIndex={0}>
                <div className="svgCont">
                  <div>
                    <svg viewBox="0 0 30 30"><path d="M24,2H4v26h20c1.105,0,2-0.895,2-2V4C26,2.895,25.105,2,24,2z M9,21c0-3.792,4-2.708,4.5-4.333v-1.083c-0.225-0.121-0.868-0.951-0.936-1.599c-0.177-0.015-0.455-0.191-0.537-0.886c-0.044-0.373,0.131-0.583,0.237-0.649c0,0-0.264-0.602-0.264-1.199C12,9.474,12.879,8,15,8c1.145,0,1.5,0.812,1.5,0.812c1.023,0,1.5,1.122,1.5,2.438c0,0.656-0.264,1.199-0.264,1.199c0.106,0.066,0.281,0.276,0.237,0.649c-0.082,0.695-0.36,0.871-0.537,0.886c-0.068,0.648-0.711,1.478-0.936,1.599v1.083C17,18.292,21,17.208,21,21H9z" /></svg>
                  </div>
                </div>
                <h1>{mod.title.replace(' ', ' ')}</h1>
                <h1>{mod.subtitle}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="DadosUserPill">
        <div id="svgFoto">
          <svg viewBox="0 0 30 30"><path d="M14.5,23.084L13.361,21h1.613h1.665L15.5,23.084L16.695,27H27c0-7-8-5-9-8v-2c0.45-0.223,1.737-1.755,1.872-2.952" /></svg>
        </div>
        <div id="textDadosUser">
          <span>Seu plano acaba em: {diasLabel}</span>
          <span>Usuário: {user?.usuario}</span>
        </div>
      </div>
    </>
  );
}
