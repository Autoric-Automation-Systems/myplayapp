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
npm run test         # vitest run (tests/)
npm run build        # build de produção
npm run db:migrate   # aplica db/migrations via Neon
```

Para rodar `npm run build` sem banco/credenciais reais, exporte valores de mentira:
`DATABASE_URL=postgresql://u:p@localhost/db AUTH_SECRET=x AUTH_GOOGLE_ID=x AUTH_GOOGLE_SECRET=x`.
`lib/env.ts` valida no import e derruba o build sem eles — de propósito.

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
- Repertório nasce público (`is_public` default `true`); o dono pode torná-lo privado.
- Repertório público (`is_public`) é somente leitura em `/view/[id]` e exibe nome e foto
  do dono, nunca o e-mail.
- Depois de qualquer escrita, revalide o path afetado com `revalidatePath`.
- Ordenação de blocos/músicas usa `moveInSequence` (`lib/reorder.ts`); o repositório
  regrava a sequência inteira dentro de uma transação.
- Variáveis de ambiente passam por `env()` (`lib/env.ts`), nunca por `process.env.X!`.
- Erros inesperados são logados com `logError` (`lib/logger.ts`), em JSON de uma linha.

## Compartilhamento de links

- O texto que aparece no preview (WhatsApp, Telegram, redes) vem de `app/layout.tsx`:
  `infoAPP.tagline` alimenta `description` e `openGraph`; mantenha sem jargão técnico.
  `infoAPP.description` é a ficha técnica e fica só na tela Sobre o App.
- `app/opengraph-image.png` (1200x630) é a imagem de preview de todas as rotas.
- Páginas com metadata própria usam `pageMetadata()` (`lib/seo.ts`), que herda o
  `openGraph` do layout. `openGraph` definido numa página substitui o do layout inteiro:
  sem herdar, o link perde imagem, site e locale.
- `robots.ts` bloqueia `/view/`, `/list/`, `/dashboard` e `/profile`: link compartilhado
  é para quem recebeu, não para o índice do Google.

## Doações

- `lib/pix.ts` monta o BR Code (TLV + CRC16) a partir da chave Pix; não invente payload
  à mão. `components/pix/PixCard.tsx` gera o QR no servidor com `qrcode` (SVG, sem JS
  no cliente).

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
