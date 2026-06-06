import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminApi } from '../../api/admin';
import { authApi } from '../../api/auth';
import type { AdminModule, AdminStats, AdminUser } from '../../types/api';
import './admin.css';

type View = 'dashboard' | 'users' | 'modules';

export default function AdminPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>('dashboard');
  const [stats, setStats] = useState<AdminStats>({ users: 0, modules: 0, active_users: 0 });
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [modules, setModules] = useState<AdminModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({ usuario: '', senha: '', role: 'usuario', creditos: 0, dias: 30 });
  const [moduleForm, setModuleForm] = useState<Partial<AdminModule>>({ nome: '', descricao: '', icone: '', api_url: '', ativo: 1, requer_creditos: 0, custo_creditos: 0, manutencao: 0 });
  const [editModuleId, setEditModuleId] = useState<number | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [s, u, m] = await Promise.all([
        adminApi.getStats(),
        adminApi.getUsers(),
        adminApi.getModules(),
      ]);
      setStats(s);
      setUsers(u);
      setModules(m);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    const res = await adminApi.createUser(newUser) as { success: boolean; error?: string };
    if (res.success) {
      setShowCreate(false);
      setNewUser({ usuario: '', senha: '', role: 'usuario', creditos: 0, dias: 30 });
      fetchData();
      alert('Usuário criado com sucesso!');
    } else {
      alert('Erro: ' + res.error);
    }
  };

  const handleSaveModule = async (e: FormEvent) => {
    e.preventDefault();
    await adminApi.saveModule({ ...moduleForm, id: editModuleId ?? 0 });
    setEditModuleId(null);
    setModuleForm({ nome: '', descricao: '', icone: '', api_url: '', ativo: 1, requer_creditos: 0, custo_creditos: 0, manutencao: 0 });
    fetchData();
  };

  const handleLogout = async () => {
    await authApi.logout();
    navigate('/login');
  };

  if (loading && view === 'dashboard') {
    return <div className="admin-page flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="admin-page flex min-h-screen">
      <aside className="admin-sidebar w-64 p-6 flex flex-col gap-2 border-r border-slate-800">
        <h2 className="font-syne text-xl text-sky-400 mb-6">OMNI Admin</h2>
        {(['dashboard', 'users', 'modules'] as View[]).map((v) => (
          <button key={v} type="button" onClick={() => setView(v)} className={`admin-nav-btn${view === v ? ' active' : ''}`}>
            {v === 'dashboard' ? 'Dashboard' : v === 'users' ? 'Usuários' : 'Módulos'}
          </button>
        ))}
        <div className="mt-auto flex flex-col gap-2">
          <Link to="/dashboard" className="admin-nav-btn text-left">← Voltar</Link>
          <button type="button" onClick={handleLogout} className="admin-nav-btn text-red-400 text-left">Logout</button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {view === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="admin-glass p-6 rounded-3xl">
                <p className="text-slate-400 text-sm uppercase">Usuários</p>
                <h3 className="text-4xl font-extrabold font-syne">{stats.users}</h3>
                <p className="text-green-400 text-xs mt-2">{stats.active_users} ativos</p>
              </div>
              <div className="admin-glass p-6 rounded-3xl">
                <p className="text-slate-400 text-sm uppercase">Módulos</p>
                <h3 className="text-4xl font-extrabold font-syne">{stats.modules}</h3>
              </div>
              <div className="admin-glass p-6 rounded-3xl border-sky-500/20">
                <p className="text-slate-400 text-sm uppercase">Status</p>
                <h3 className="text-4xl font-extrabold text-sky-400 font-syne">Online</h3>
              </div>
            </div>
            <div className="admin-glass rounded-3xl overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-800 flex justify-between">
                <h3 className="font-syne text-xl">Usuários Recentes</h3>
                <button type="button" onClick={() => setView('users')} className="text-sky-400 text-sm">Ver todos</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead><tr className="bg-slate-900/40"><th className="px-8 py-4 text-xs uppercase text-slate-500">Usuário</th><th className="px-8 py-4 text-xs uppercase text-slate-500">Créditos</th><th className="px-8 py-4 text-xs uppercase text-slate-500">Expiração</th></tr></thead>
                  <tbody>
                    {users.slice(0, 5).map((u) => (
                      <tr key={u.id} className="border-t border-slate-800/30">
                        <td className="px-8 py-4">{u.usuario}</td>
                        <td className="px-8 py-4 text-sky-400 font-bold">{u.creditos || 0}</td>
                        <td className="px-8 py-4">{new Date(u.dias).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {view === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-syne text-2xl">Gestão de Usuários</h2>
              <button type="button" onClick={() => setShowCreate(!showCreate)} className="admin-btn-primary px-6 py-2.5 rounded-xl font-bold text-sm">Novo Usuário</button>
            </div>
            {showCreate && (
              <form onSubmit={handleCreateUser} className="admin-glass p-8 rounded-3xl mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <input placeholder="Usuário" required value={newUser.usuario} onChange={(e) => setNewUser({ ...newUser, usuario: e.target.value })} className="admin-input" />
                <input type="password" placeholder="Senha" required value={newUser.senha} onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })} className="admin-input" />
                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="admin-input">
                  <option value="usuario">Usuário</option>
                  <option value="admin">Admin</option>
                </select>
                <input type="number" placeholder="Créditos" value={newUser.creditos} onChange={(e) => setNewUser({ ...newUser, creditos: Number(e.target.value) })} className="admin-input" />
                <input type="number" placeholder="Dias" value={newUser.dias} onChange={(e) => setNewUser({ ...newUser, dias: Number(e.target.value) })} className="admin-input" />
                <button type="submit" className="admin-btn-primary py-2.5 rounded-xl font-bold">Salvar</button>
              </form>
            )}
            <div className="admin-glass rounded-3xl overflow-x-auto">
              <table className="w-full text-left">
                <thead><tr className="bg-slate-900/40"><th className="px-8 py-5 text-xs uppercase text-slate-500">Usuário</th><th className="px-8 py-5 text-xs uppercase text-slate-500">Nível</th><th className="px-8 py-5 text-xs uppercase text-slate-500">Créditos</th><th className="px-8 py-5 text-xs uppercase text-slate-500">Ações</th></tr></thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t border-slate-800/30">
                      <td className="px-8 py-5 font-semibold">{u.usuario}</td>
                      <td className="px-8 py-5">{u.role === 'admin' || u.nivel === 1 ? 'ADMIN' : 'USER'}</td>
                      <td className="px-8 py-5 text-sky-400">{u.creditos || 0}</td>
                      <td className="px-8 py-5">
                        <button type="button" onClick={() => adminApi.deleteUser(u.id).then(fetchData)} className="text-red-400 text-sm">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'modules' && (
          <div>
            <h2 className="font-syne text-2xl mb-6">Gestão de Módulos</h2>
            <form onSubmit={handleSaveModule} className="admin-glass p-8 rounded-3xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Nome" required value={moduleForm.nome} onChange={(e) => setModuleForm({ ...moduleForm, nome: e.target.value })} className="admin-input" />
              <input placeholder="Descrição" required value={moduleForm.descricao} onChange={(e) => setModuleForm({ ...moduleForm, descricao: e.target.value })} className="admin-input" />
              <input placeholder="API URL" required value={moduleForm.api_url} onChange={(e) => setModuleForm({ ...moduleForm, api_url: e.target.value })} className="admin-input md:col-span-2" />
              <button type="submit" className="admin-btn-primary py-2.5 rounded-xl font-bold">{editModuleId ? 'Atualizar' : 'Criar'} Módulo</button>
            </form>
            <div className="admin-glass rounded-3xl overflow-x-auto">
              <table className="w-full text-left">
                <thead><tr className="bg-slate-900/40"><th className="px-8 py-5 text-xs uppercase text-slate-500">Nome</th><th className="px-8 py-5 text-xs uppercase text-slate-500">Ativo</th><th className="px-8 py-5 text-xs uppercase text-slate-500">Ações</th></tr></thead>
                <tbody>
                  {modules.map((m) => (
                    <tr key={m.id} className="border-t border-slate-800/30">
                      <td className="px-8 py-5">{m.nome}</td>
                      <td className="px-8 py-5">{m.ativo ? 'Sim' : 'Não'}</td>
                      <td className="px-8 py-5 flex gap-3">
                        <button type="button" onClick={() => { setEditModuleId(m.id); setModuleForm(m); }} className="text-sky-400 text-sm">Editar</button>
                        <button type="button" onClick={() => adminApi.deleteModule(m.id).then(fetchData)} className="text-red-400 text-sm">Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
