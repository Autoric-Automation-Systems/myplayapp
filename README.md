# MyPlayApp

Aplicativo web para montar, organizar e compartilhar repertórios de música.

Cada **repertório** contém **blocos** (momentos do show, por exemplo) e cada bloco contém **músicas**
com tom, BPM, estilo e letra. O dono do repertório pode torná-lo público e compartilhar um link de
leitura.

## Stack

- Next.js 16 (App Router, Server Components, Server Actions)
- React 19 e TypeScript
- Tailwind CSS 4
- NextAuth v5 com login via Google
- Neon Postgres (`@neondatabase/serverless`)
- Zod para validação de entrada

## Arquitetura

```
app/                      Rotas e layouts
  (private)/              Área autenticada (dashboard, list, profile, infoApp)
  (public)/               Área aberta (landing, login, termos, privacidade, /view/[id])
  api/auth/[...nextauth]/ Handlers do NextAuth

components/               UI (client e server components)
  ui/                     Primitivos: Button, Modal, form, useAction, Message...
  list/ block/ track/     Componentes por domínio

server/                   Toda a lógica de servidor
  db.ts                   Cliente Neon
  auth.ts                 Configuração do NextAuth
  session.ts              Sessão atual (cacheada por request)
  authz.ts                Regras de autorização por dono
  schemas/                Validação Zod
  repositories/           SQL puro, sem regra de negócio
  services/               Casos de uso + autorização
  actions/                Server Actions ("use server")

db/migrations/            SQL versionado
scripts/migrate.mjs       Executor de migrations
proxy.ts                  Guarda de rotas privadas antes da renderização
```

Fluxo de uma mutação:

```
Componente (client)
  → server/actions/*        valida entrada com Zod
  → server/services/*       exige sessão e confere o dono do recurso
  → server/repositories/*   executa o SQL
```

Nenhuma camada confia em IDs recebidos do cliente para autorização: o vínculo
`repertório → usuário` é sempre resolvido no banco antes de qualquer escrita.

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie o arquivo de variáveis de ambiente:

   ```bash
   cp .env.example .env.local
   ```

3. Preencha `DATABASE_URL`, `AUTH_SECRET`, `AUTH_GOOGLE_ID` e `AUTH_GOOGLE_SECRET`.
   No Google Cloud Console, cadastre `http://localhost:3000/api/auth/callback/google`
   como URI de redirecionamento.

4. Aplique o schema no banco:

   ```bash
   npm run db:migrate
   ```

5. Suba o ambiente de desenvolvimento:

   ```bash
   npm run dev
   ```

## Scripts

| Comando            | Descrição                                        |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Servidor de desenvolvimento                      |
| `npm run build`    | Build de produção                                |
| `npm start`        | Servidor de produção                             |
| `npm run typecheck`| Checagem de tipos sem emitir arquivos            |
| `npm run lint`     | ESLint                                            |
| `npm run db:migrate` | Aplica as migrations pendentes em `db/migrations` |

## Modelo de acesso

- Rotas privadas (`/dashboard`, `/list`, `/profile`, `/infoApp`) são bloqueadas por `proxy.ts`
  e novamente por `requireUser()` em cada serviço.
- Toda operação em repertório, bloco ou música passa por
  `requireListOwner`, `requireBlockOwner` ou `requireTrackOwner`.
- Repertórios públicos ficam disponíveis em `/view/[id]` somente para leitura.
- Usuários só podem excluir a própria conta.

## Banco de dados

As migrations são idempotentes e controladas pela tabela `schema_migrations`.
Para criar uma nova alteração, adicione um arquivo `db/migrations/0002_*.sql` e rode
`npm run db:migrate`.
