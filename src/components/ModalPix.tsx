import '../assets/styles/comprar.css';

interface ModalPixProps {
  open: boolean;
  qrBase64: string;
  qrCode: string;
  onCopy: () => void;
  onCancel: () => void;
  title?: string;
  subtitle?: string;
}

export function ModalPix({
  open,
  qrBase64,
  qrCode,
  onCopy,
  onCancel,
  title = 'Pagamento PIX',
  subtitle = 'Escaneie o código abaixo para ativar seu plano',
}: ModalPixProps) {
  if (!open) return null;

  return (
    <div className="modal-pix" style={{ display: 'flex' }}>
      <div className="modal-content glass-card">
        <h2 className="font-syne">{title}</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 10 }}>{subtitle}</p>
        <div className="qr-code">
          {qrBase64 && (
            <img src={`data:image/jpeg;base64,${qrBase64}`} style={{ width: '100%', height: '100%' }} alt="QR Code" />
          )}
        </div>
        <textarea className="input-field" readOnly value={qrCode} style={{ fontFamily: 'monospace', fontSize: '0.75rem', height: 80, resize: 'none', textAlign: 'center', marginBottom: 20 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button type="button" className="btn btn-primary" onClick={onCopy}>Copiar Código</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
        <p style={{ marginTop: 20, fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          A liberação é automática após a confirmação do banco.
        </p>
      </div>
    </div>
  );
}
