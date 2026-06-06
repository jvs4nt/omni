import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { queryApi } from '../../api/query';
import { useAuth } from '../../hooks/useAuth';
import { useExpiryPoll } from '../../hooks/useExpiryPoll';
import '../../assets/styles/search.css';

function renderGenericResults(data: Record<string, unknown>, container: HTMLElement) {
  container.innerHTML = '';
  const render = (obj: Record<string, unknown>, parent: HTMLElement, depth = 0) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      if (typeof value === 'object' && !Array.isArray(value)) {
        const group = document.createElement('div');
        group.className = 'result-group';
        group.innerHTML = `<h3>${key}</h3>`;
        const grid = document.createElement('div');
        grid.className = 'result-grid';
        group.appendChild(grid);
        parent.appendChild(group);
        render(value as Record<string, unknown>, grid, depth + 1);
      } else if (Array.isArray(value)) {
        value.forEach((item, i) => {
          if (typeof item === 'object') {
            const group = document.createElement('div');
            group.className = 'result-group';
            group.innerHTML = `<h3>${key} [${i + 1}]</h3>`;
            const grid = document.createElement('div');
            grid.className = 'result-grid';
            group.appendChild(grid);
            parent.appendChild(group);
            render(item as Record<string, unknown>, grid, depth + 1);
          }
        });
      } else {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `<span class="result-label">${key}</span><span class="result-value">${String(value)}</span>`;
        parent.appendChild(item);
      }
    });
  };
  const wrapper = document.createElement('div');
  render(data, wrapper);
  container.appendChild(wrapper);
}

export default function SearchPage() {
  const [params] = useSearchParams();
  const module = params.get('module') || 'cpf';
  const moduleName = params.get('name') || 'Consulta';
  const { user } = useAuth();
  useExpiryPoll(true);

  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const getPlaceholder = () => {
    if (module.includes('cpf')) return '000.000.000-00';
    if (module.includes('cnpj')) return '00.000.000/0000-00';
    if (module.includes('placa')) return 'ABC1234';
    if (module.includes('telefone')) return '(00) 00000-0000';
    return 'Digite o valor...';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = (form.elements.namedItem('query') as HTMLInputElement).value;
    const container = document.getElementById('resultContent');
    if (!container) return;

    setLoading(true);
    setShowResults(false);

    try {
      const response = await queryApi.search(module, query) as { success?: boolean; message?: string; data?: Record<string, unknown> };
      setLoading(false);
      if (response.success === false) {
        alert(response.message || 'Nenhuma informação encontrada.');
        return;
      }
      const data = (response.data || response) as Record<string, unknown>;
      renderGenericResults(data, container);
      setShowResults(true);
    } catch {
      setLoading(false);
      alert('Erro na comunicação com o servidor de dados.');
    }
  };

  return (
    <div className="search-layout" style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <nav style={{ padding: '16px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: 'var(--text)', textDecoration: 'none' }}>← Dashboard</Link>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>@{user?.usuario}</span>
      </nav>

      <main style={{ padding: '32px', maxWidth: 900, margin: '0 auto' }}>
        <div className="glass-card" style={{ padding: 32, marginBottom: 32 }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900 }}>{moduleName}</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-dim)', marginBottom: 24 }}>Realize sua investigação preenchendo o campo abaixo.</p>
          <form id="searchForm" onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input type="hidden" name="module" value={module} />
            <input type="text" name="query" required placeholder={getPlaceholder()} className="input-search" style={{ flex: 1, minWidth: 280, height: 56, padding: '0 16px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: '#fff' }} />
            <button type="submit" className="btn-consult" style={{ height: 56, padding: '0 40px', background: 'var(--primary)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700, cursor: 'pointer' }}>PESQUISAR</button>
          </form>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: 'var(--text-dim)' }}>Consultando bases de dados...</p>
          </div>
        )}

        {showResults && (
          <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 24 }}>RESULTADO DA INVESTIGAÇÃO</h2>
            <div id="resultContent" />
          </div>
        )}
      </main>
    </div>
  );
}
