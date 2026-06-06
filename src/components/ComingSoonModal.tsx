import '../assets/styles/comprar.css';

interface ComingSoonModalProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export function ComingSoonModal({
  open,
  onClose,
  message = 'Login e registro serão implementados em breve...',
}: ComingSoonModalProps) {
  if (!open) return null;

  return (
    <div className="modal-pix" style={{ display: 'flex' }} onClick={onClose} role="presentation">
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="coming-soon-title">
        <h2 id="coming-soon-title" className="font-syne">Em breve</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.6 }}>{message}</p>
        <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: 24 }} onClick={onClose}>
          Entendi
        </button>
      </div>
    </div>
  );
}
