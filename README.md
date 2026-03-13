# Trog Project

Aplicação React para gerenciamento de usuários com duas fontes de dados: uma API externa e armazenamento local em memória.

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** — build e dev server
- **Tailwind CSS** — estilização
- **TanStack Query (React Query)** — cache e requisições
- **Zustand** — estado global para usuários locais
- **React Hook Form** + **Zod** — formulários e validação
- **Axios** — chamadas HTTP
- **shadcn/ui** (Radix UI, Base UI) — componentes
- **Lucide React** — ícones
- **Sonner** — toasts

## Funcionalidades

- **Usuários (API)**: lista de usuários via [DummyJSON](https://dummyjson.com) com busca e paginação
- **Usuários locais**: CRUD em memória (Zustand), com criar, editar e excluir
- **Validação de e-mail**: impede cadastro ou edição com e-mail já existente (no modal de edição, o próprio e-mail do usuário é permitido)
- Busca em tempo real com debounce
- Alternância entre tema claro/escuro
- Interface responsiva com componentes do shadcn/ui

## Como executar

### Pré-requisitos

- Node.js 18+
- npm ou pnpm

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

## Estrutura do projeto

```
src/
├── components/       # Componentes React
│   ├── ui/          # Componentes de UI (shadcn)
│   ├── theme/       # Provider e toggle de tema
│   └── ...          # CardTable, modais, etc.
├── hooks/           # Hooks customizados (useDebounce, useGetUsers, etc.)
├── lib/             # Utilitários, api, query-client
├── pages/           # Páginas da aplicação
├── schemas/         # Schemas Zod para formulários
├── services/        # Serviços de API
├── stores/          # Stores Zustand
└── types/           # Tipos TypeScript
```

## API

A aplicação consome a API do [DummyJSON](https://dummyjson.com) para a aba de usuários:

- `GET /users` — lista paginada
- `GET /users/search?q=` — busca por nome

## Scripts disponíveis

| Script   | Descrição           |
|----------|---------------------|
| `npm run dev`    | Inicia o servidor de desenvolvimento |
| `npm run build`  | Gera a build de produção            |
| `npm run preview`| Pré-visualiza a build de produção  |

## Licença

Projeto privado.
