import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryApi } from '../../api/query';
import { useExpiryPoll } from '../../hooks/useExpiryPoll';
import { renderCpfResults } from './cpfRender';
import './cpf.css';

export default function CpfPage() {
  const navigate = useNavigate();
  useExpiryPoll(true);
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [resultsHtml, setResultsHtml] = useState('');
  const [modal, setModal] = useState<{ title: string; msg: string; type: string } | null>(null);

  const performSearch = async () => {
    const clean = cpf.replace(/\D/g, '');
    if (clean.length !== 11) {
      setModal({ title: 'CPF Inválido', msg: 'Por favor, insira os 11 números do CPF.', type: 'error' });
      return;
    }

    setShowWelcome(false);
    setResultsHtml('');
    setLoading(true);
    setProgress(10);
    setTimeout(() => setProgress(60), 500);

    try {
      const res = await queryApi.search('cpf', clean) as { success?: boolean; message?: string; data?: unknown };
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        if (res.success === false) {
          setModal({ title: 'Erro na API', msg: res.message || 'Cidadão não encontrado.', type: 'error' });
          setShowWelcome(true);
        } else {
          setResultsHtml(renderCpfResults(res));
        }
      }, 300);
    } catch {
      setLoading(false);
      setShowWelcome(true);
      setModal({ title: 'Falha Crítica', msg: 'Ocorreu um erro ao processar a consulta no servidor.', type: 'error' });
    }
  };

  return (
    <div className="cpf-page min-h-screen flex flex-col relative z-10" style={{ background: '#04050a', color: '#f0f4ff' }}>
      <header className="py-4 px-8 flex justify-between items-center sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(4,5,10,0.8)' }}>
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/dashboard')} role="button" tabIndex={0}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xs">CPF</span>
          </div>
          <div>
            <h1 className="font-syne text-xl tracking-tighter">OMNI<span className="text-blue-500 font-black text-xs align-top ml-0.5">CPF</span></h1>
            <p className="text-[10px] opacity-50 font-bold uppercase tracking-widest">Central de Dados</p>
          </div>
        </div>
        <button type="button" onClick={() => navigate('/dashboard')} className="px-5 py-2 glass rounded-xl text-xs font-bold">Voltar ao Início</button>
      </header>

      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <div className="glass p-12 rounded-[2.5rem] mb-10 text-center shadow-sm relative overflow-hidden">
          <h2 className="font-syne text-3xl mb-2">Consulta Avançada</h2>
          <p className="opacity-50 text-sm mb-8">Insira o documento para varredura completa nos sistemas</p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && performSearch()}
                placeholder="000.000.000-00"
                className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none font-mono text-lg text-white"
              />
              <button type="button" onClick={performSearch} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest">Buscar</button>
            </div>
            {loading && (
              <div className="mt-6 h-1 bg-white/10 rounded overflow-hidden">
                <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>
        </div>

        {resultsHtml && (
          <div className="space-y-6" dangerouslySetInnerHTML={{ __html: resultsHtml }} />
        )}

        {showWelcome && !resultsHtml && (
          <div className="text-center py-24">
            <h3 className="opacity-40 font-medium text-sm italic">Aguardando entrada de dados...</h3>
          </div>
        )}
      </main>

      {modal && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50" onClick={() => setModal(null)}>
          <div className="bg-[#0a0c14] border border-white/10 max-w-md w-full rounded-3xl p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-syne text-2xl mb-2">{modal.title}</h3>
            <p className="text-slate-400 text-sm mb-8">{modal.msg}</p>
            <button type="button" onClick={() => setModal(null)} className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-white">ENTENDI</button>
          </div>
        </div>
      )}
    </div>
  );
}
