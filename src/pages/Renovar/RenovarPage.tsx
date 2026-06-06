import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentsApi } from '../../api/payments';
import { ModalPix } from '../../components/ModalPix';
import { getNotyf } from '../../components/NotyfProvider';
import { OmniLogo } from '../../components/OmniLogo';
import { useQueryClient } from '@tanstack/react-query';
import '../../assets/styles/global.css';
import '../../assets/styles/comprar.css';

export default function RenovarPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tipo, setTipo] = useState('Mensal');
  const [showPix, setShowPix] = useState(false);
  const [qrBase64, setQrBase64] = useState('');
  const [qrCode, setQrCode] = useState('');
  const ticketUrlRef = useRef('');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    document.body.classList.add('auth-active');
    return () => document.body.classList.remove('auth-active');
  }, []);

  const handlePix = async () => {
    const notyf = getNotyf();
    try {
      const res = await paymentsApi.createPix({
        pix: true,
        valor: tipo,
        renew: true,
      });
      if (res.transaction_data) {
        setQrBase64(res.transaction_data.qr_code_base64);
        setQrCode(res.transaction_data.qr_code);
        ticketUrlRef.current = res.transaction_data.ticket_url;
        setShowPix(true);

        if (pollRef.current) clearInterval(pollRef.current);
        pollRef.current = setInterval(async () => {
          try {
            const verify = await paymentsApi.renew({ collection_id: ticketUrlRef.current, valor: tipo });
            if (verify.success) {
              if (pollRef.current) clearInterval(pollRef.current);
              notyf.success('Pagamento aprovado! Acesso renovado.');
              await queryClient.invalidateQueries({ queryKey: ['auth'] });
              setTimeout(() => navigate('/dashboard'), 2000);
            }
          } catch { /* pending */ }
        }, 5000);
      }
    } catch {
      notyf.error('Erro ao gerar pagamento.');
    }
  };

  return (
    <div className="auth-page">
      <div className="register-container glass-card">
        <OmniLogo className="logo-wrap font-syne" showText onClick={() => navigate('/dashboard')} />
        <div className="header-text">
          <h1 className="font-syne">Renovar Acesso</h1>
          <p>Seu tempo de acesso expirou ou está acabando. Escolha um novo plano para continuar consultando.</p>
        </div>
        <div className="input-group">
          <label className="input-label">Selecione o Plano</label>
          <select className="input-field" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="Mensal">Mensal — R$ 50,00</option>
            <option value="Semanal">Semanal — R$ 30,00</option>
            <option value="Diario">Diário — R$ 15,00</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10 }}>
          <button type="button" className="btn btn-primary" onClick={handlePix}>Pagar com PIX</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>Voltar ao Início</button>
        </div>
      </div>
      <ModalPix
        open={showPix}
        qrBase64={qrBase64}
        qrCode={qrCode}
        onCopy={() => { navigator.clipboard.writeText(qrCode); getNotyf().success('Código copiado!'); }}
        onCancel={() => { if (pollRef.current) clearInterval(pollRef.current); setShowPix(false); }}
        title="Pagamento PIX"
        subtitle="Escaneie o código abaixo para renovar seu plano"
      />
    </div>
  );
}
