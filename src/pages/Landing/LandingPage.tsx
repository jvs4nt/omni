import { useEffect, useState } from 'react';
import { FileText, Home, LogIn, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CityCompanyIllustration, NeighborhoodCompanyIllustration } from '../../components/landing/CompanyIllustrations';
import { OmniLogo } from '../../components/OmniLogo';
import '../../assets/styles/landing.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-up-element');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -20px 0px' }
    );
    fadeElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="bg-gradient" />
      <div id="app">
        <div className="navbar">
          <OmniLogo className="logo" textClassName="" showText />
          <div className={`buttons${menuOpen ? ' open' : ''}`}>
            <button type="button" className="hamburguer-btn" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </button>
            {menuOpen && (
              <button type="button" className="nav-overlay" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />
            )}
            <div className="buttons-wrap">
              <Link className="nav-link active" to="/" onClick={() => setMenuOpen(false)}>
                <Home size={18} strokeWidth={2} />
                <span>Home</span>
              </Link>
              <Link className="nav-link" to="/login" onClick={() => setMenuOpen(false)}>
                <LogIn size={18} strokeWidth={2} />
                <span>Login</span>
              </Link>
              <Link className="nav-link" to="/termos" onClick={() => setMenuOpen(false)}>
                <FileText size={18} strokeWidth={2} />
                <span>Termos</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="banner">
          <span className="section-label">Plataforma de consultas</span>
          <span className="title">Um novo jeito de<br /><em>consultar.</em></span>
          <span className="description">O OMNI nasceu como um produto capaz de entregar a consulta mais rápida, eficiente e completa que você pode imaginar. Dados precisos, em tempo real, para proteger seu negócio.</span>
          <button type="button" className="banner-btn" onClick={() => navigate('/comprar')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 22 18" fill="none">
              <path d="M0 3.5C0 2.77 0.29 2.07 0.805 1.555C1.321 1.04 2.02 0.75 2.75 0.75H19.25C19.98 0.75 20.68 1.04 21.195 1.555C21.71 2.07 22 2.77 22 3.5V14.5C22 15.23 21.71 15.93 21.195 16.445C20.68 16.96 19.98 17.25 19.25 17.25H2.75C2.02 17.25 1.321 16.96 0.805 16.445C0.29 15.93 0 15.23 0 14.5V3.5ZM2.75 2.125C2.385 2.125 2.036 2.27 1.778 2.528C1.52 2.786 1.375 3.135 1.375 3.5V4.875H20.625V3.5C20.625 3.135 20.48 2.786 20.222 2.528C19.964 2.27 19.615 2.125 19.25 2.125H2.75ZM20.625 7.625H1.375V14.5C1.375 14.865 1.52 15.214 1.778 15.472C2.036 15.73 2.385 15.875 2.75 15.875H19.25C19.615 15.875 19.964 15.73 20.222 15.472C20.48 15.214 20.625 14.865 20.625 14.5V7.625Z" fill="white" />
            </svg>
            Valores e planos
          </button>
        </div>

        <div className="divider" />

        <div className="section">
          <span className="section-label">Inteligência de dados</span>
          <h2 className="section-title">Para proteger você e seus clientes.</h2>
          <p className="section-desc">Veja na prática como o OMNI entrega resultados ricos e detalhados em cada consulta realizada.</p>
        </div>

        <div className="content">
          <div className="cards-wrap">
            <div className="card big-card fade-up-element">
              <div className="line"><span className="key">Nome:</span><span className="value">João Silva</span></div>
              <div className="line"><span className="key">Data de Nascimento:</span><span className="value">01/01/1901</span></div>
              <div className="line"><span className="key">CPF:</span><span className="value">000.000.000-00</span></div>
              <div className="spacer-mini" />
              <div className="line"><span className="key">Telefones:</span></div>
              <div className="line"><span className="key">(21) 92012-0000</span><span className="value">NITERÓI - RJ</span></div>
              <div className="line"><span className="key">(34) 98013-0055</span><span className="value">UBERABA - MG</span></div>
              <div className="line"><span className="key">(21) 92078-5555</span><span className="value">NITERÓI - RJ</span></div>
              <div className="spacer-mini" />
              <div className="line"><span className="key">Emails:</span></div>
              <div className="line"><span className="key">joaosilva@exemplo.com</span></div>
              <div className="line"><span className="key">silvajoao@exemplo.com</span></div>
              <div className="line"><span className="key">joao666@exemplo.com</span></div>
              <div className="spacer-mini" />
              <div className="line"><span className="key">Parentes encontrados:</span></div>
              <div className="line"><span className="key">Maria Silva</span><span className="value">IRMÃ(o)</span></div>
              <div className="line"><span className="key">Geraldo Silva</span><span className="value">PAI</span></div>
              <div className="line"><span className="key">Enzo Silva</span><span className="value">SOBRINHO(a)</span></div>
              <div className="line"><span className="key">Sonia Silva</span><span className="value">MÃE</span></div>
              <div className="spacer-mini" />
              <div className="line"><span className="key">Endereços:</span><span className="value">...</span></div>
            </div>
            <div className="small-cards-wrap">
              <div className="card fade-up-element">
                <NeighborhoodCompanyIllustration />
                <div className="line"><span className="key">Empresa do Bairro</span></div>
                <div className="line"><span className="value">Produtos eletrônicos</span></div>
                <div className="line"><span className="key">CNPJ:</span><span className="value">98.765.432/0001-30</span></div>
                <div className="line"><span className="key">Endereço:</span><span className="value">Rua Haddock Lobo, 1240</span></div>
                <div className="line"><span className="value">Cerqueira César, São Paulo - SP</span></div>
              </div>
              <div className="card fade-up-element">
                <CityCompanyIllustration />
                <div className="line"><span className="key">Empresa da Cidade</span></div>
                <div className="line"><span className="value">Comércio varejista</span></div>
                <div className="line"><span className="key">CNPJ:</span><span className="value">12.345.678/0001-30</span></div>
                <div className="line"><span className="key">Endereço:</span><span className="value">Rua Haddock Lobo, 1240</span></div>
                <div className="line"><span className="value">Cerqueira César, São Paulo - SP</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <p>© 2025 OMNI · Inteligência de Dados · Segurança e proteção total</p>
        </div>
      </div>
    </>
  );
}
