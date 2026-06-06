# OMNI Frontend

Migração gradual do painel OMNI para Vite + React + TypeScript.

## Desenvolvimento

```bash
cd omni-frontend
npm install
npm run dev
```

O Vite roda em `http://localhost:5173` e faz proxy de `/api` para `http://localhost:8080`.

### Servidor PHP

Na raiz do projeto, sirva `public_html` com PHP:

```bash
cd public_html
php -S localhost:8080
```

## Rotas

| Rota | Página |
|------|--------|
| `/` | Landing |
| `/login` | Login |
| `/comprar` | Cadastro + PIX |
| `/termos` | Termos |
| `/dashboard` | Painel principal |
| `/dashboard/consultar/cpf` | Consulta CPF |
| `/dashboard/search` | Busca genérica |
| `/renovar` | Renovação |
| `/mudar-senha` | Trocar senha |
| `/admin` | Painel admin |

## API PHP

Endpoints em `public_html/api/`:

- `auth/login.php`, `auth/logout.php`, `auth/me.php`, `auth/status.php`
- `query.php`
- `payments/pix.php`, `payments/verify.php`, `payments/renew.php`
- `user/password.php`
- `admin/index.php`

## Build

```bash
npm run build
```

Saída em `dist/`. Deploy manual para `public_html/` quando pronto.

## Responsividade

Breakpoints preservados do projeto original:

- Landing: 680px, 900px
- Dashboard: 768px, 480px
- Admin: 768px
- CPF / Comprar: 480px
