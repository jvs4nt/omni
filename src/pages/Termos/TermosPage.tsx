import { Link } from 'react-router-dom';
import '../../assets/styles/global.css';

export default function TermosPage() {
  return (
    <div className="container" style={{ maxWidth: 800, margin: '80px auto', padding: 40 }}>
      <h1 className="font-syne" style={{ marginBottom: 30, fontSize: '2.5rem', textAlign: 'center' }}>Termos de Uso</h1>
      <div className="content-box glass-card" style={{ padding: 40, lineHeight: 1.8, color: 'var(--text-muted)' }}>
        <p>Bem-vindo ao OMNI. Ao acessar nossa plataforma, você concorda com os termos e condições descritos abaixo. Leia-os atentamente.</p>
        <h2 className="font-syne" style={{ color: 'white', margin: '30px 0 15px', fontSize: '1.25rem' }}>1. Uso da Plataforma</h2>
        <p>O OMNI é uma ferramenta de consulta de dados para fins informativos e profissionais. O usuário compromete-se a utilizar os dados obtidos de forma ética e em conformidade com as leis vigentes, incluindo a LGPD (Lei Geral de Proteção de Dados).</p>
        <h2 className="font-syne" style={{ color: 'white', margin: '30px 0 15px', fontSize: '1.25rem' }}>2. Responsabilidade do Usuário</h2>
        <p>O usuário é inteiramente responsável pelo sigilo de suas credenciais de acesso e por qualquer atividade realizada em sua conta. É proibido o compartilhamento de login com terceiros.</p>
        <h2 className="font-syne" style={{ color: 'white', margin: '30px 0 15px', fontSize: '1.25rem' }}>3. Planos e Assinaturas</h2>
        <p>O acesso é liberado mediante o pagamento do plano escolhido. Reservamo-nos o direito de alterar valores e funcionalidades mediante aviso prévio.</p>
        <h2 className="font-syne" style={{ color: 'white', margin: '30px 0 15px', fontSize: '1.25rem' }}>4. Limitação de Responsabilidade</h2>
        <p>Embora busquemos a máxima precisão, não garantimos a infalibilidade total dos dados, uma vez que dependemos de fontes externas e APIs de terceiros.</p>
        <h2 className="font-syne" style={{ color: 'white', margin: '30px 0 15px', fontSize: '1.25rem' }}>5. Alterações nos Termos</h2>
        <p>Estes termos podem ser atualizados a qualquer momento para refletir mudanças na plataforma ou na legislação.</p>
      </div>
      <Link to="/" className="back-link" style={{ display: 'block', textAlign: 'center', marginTop: 40, color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>← Voltar para a Home</Link>
    </div>
  );
}
