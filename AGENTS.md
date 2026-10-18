<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# MyPlayApp — guia para agentes

## Comandos

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run build        # build de produção
npm run db:migrate   # aplica db/migrations via Neon
```

O projeto usa **npm**. Não crie lockfiles de outros gerenciadores.

## Domínio

`Repertório (lists) → Bloco (blocks) → Música (tracks)`. Usuário autenticado via Google
(NextAuth v5) é dono dos seus repertórios.

## Estrutura obrigatória

- `app/` — rotas. `(private)` exige sessão; `(public)` é aberta.
- `components/` — UI. Componentes com estado usam `'use client'`.
- `server/actions/` — Server Actions com `'use server'`; validam com Zod e delegam.
- `server/services/` — regra de negócio e autorização.
- `server/repositories/` — SQL com template `sql` do Neon; sem regra de negócio.
- `server/schemas/` — schemas Zod.
- `db/migrations/` — SQL versionado; nunca altere uma migration já aplicada, crie a próxima.

## Regras de código

- Toda ação que lê ou escreve dados de um repertório precisa passar por
  `requireListOwner`, `requireBlockOwner` ou `requireTrackOwner` (`server/authz.ts`).
- Nunca use IDs recebidos da UI como prova de permissão. O dono é resolvido no banco.
- Server Actions retornam `ActionResult` (`server/action-result.ts`) e usam `withMessage`
  para mensagens de sucesso; não redirecione manualmente dentro do serviço.
- `unstable_rethrow` em `actionError` mantém `redirect()`/`notFound()` funcionando
  quando lançados dentro de um `try/catch`.
- Datas vindas do driver são `Date | string` (`server/types.ts`).
- Repertório público (`is_public`) é somente leitura em `/view/[id]`.
- Depois de qualquer escrita, revalide o path afetado com `revalidatePath`.

## Estilo

- TypeScript estrito; sem `any` desnecessário.
- Textos de interface em português (pt-BR).
- Tailwind CSS v4 com tokens em `app/globals.css` (`bg-surface`, `bg-surface-deep`,
  `border-surface-line`).

## Responsividade

A maioria dos acessos é mobile; comece o layout pelo menor breakpoint.

- Use `dvh` (não `vh`) em alturas que dependem da viewport: barra do navegador móvel
  muda o `vh`.
- Alvos de toque com no mínimo 40x40 px (`IconButton` size `sm` já aplica isso no mobile).
- Painéis e modais viram bottom sheet abaixo de `sm`/`lg` e respeitam
  `env(safe-area-inset-bottom)`.
- Evite tabelas com colunas fixas no mobile: empilhe metadados em uma segunda linha
  (ver `components/track/Track.tsx`) e esconda colunas secundárias com `hidden sm:block`.
- Bloqueie o scroll do `body` enquanto modal/painel estiver aberto (`useBodyScrollLock`).
- Verificação rápida de overflow: nenhum elemento deve passar de `document.scrollWidth`.
