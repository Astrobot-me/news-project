# Copilot Instructions

## Build, lint, and test commands

Run commands from the repository root (`news-project`).

### Frontend (`frontend/`)

```bash
cd frontend
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

### Backend (`backend/`)

```bash
cd backend
npm install
npm run devbuild   # TypeScript build only
npm run dev        # Build + run with nodemon (dist/index)
npm run build      # Installs TypeScript (if needed) + builds
```

### Tests

```bash
cd backend
npm test
```

- `backend` has a placeholder `npm test` script that exits with `Error: no test specified`.
- `frontend` currently has no test script in `package.json`.
- A single-test command is **not available yet** in this repository because no test runner is configured.

## High-level architecture

This repo is a full-stack TypeScript project split into two independently runnable apps:

1. `backend/`: Express + MongoDB (Mongoose) API.
2. `frontend/`: Vite + React + Redux Toolkit SPA.

Backend request flow:

- `src/index.ts` loads env vars, connects MongoDB, and starts Express.
- `src/app.ts` wires middleware (CORS, JSON body parsing, cookies, rate limiter, auth middleware) and mounts routers under `/api/*`.
- Route modules map to controllers:
  - `auth.route.ts` -> login/register/refresh/logout
  - `article.route.ts` -> Guardian API fetch endpoints
  - `user.route.ts` -> save/read article list management
  - `ai.route.ts` -> Gemini summary generation

Frontend app flow:

- `src/main.tsx` defines router structure and wraps the app with Redux `Provider`.
- Protected app routes live under `/app/*` and are gated by `AuthChecker` (`src/components/ProtectedRoute.tsx`).
- `src/App.tsx` performs session rehydration via `/api/auth/refresh` before rendering `Layout`.
- Feature pages call backend APIs for headlines, article content, saved/read lists, and AI summary.

## Key conventions in this codebase

- **Auth/session model is split token + cookie**:
  - Access token is returned in JSON and stored in Redux auth state.
  - Refresh token is an HTTP-only cookie.
  - Frontend API clients use `withCredentials: true` (see `src/lib/axiosConfig.ts`) so refresh-cookie auth works.

- **Use the two axios clients intentionally**:
  - `simpleAxios`: unauthenticated or refresh/auth bootstrap calls.
  - `modifiedAxios` via `useAxiosMod`: attaches `Authorization: Bearer <token>` and retries once after refresh.

- **All non-auth backend API groups are protected** in `backend/src/app.ts` (`/api/articles`, `/api/user`, `/api/ai` use `protect` middleware).

- **Article content from Guardian is treated as untrusted HTML**:
  - Parse/render through `parseHtml` -> `sanitizeHtml` (`DOMPurify`) before UI rendering.

- **Frontend imports use `@/` aliases** mapped to `frontend/src` (`vite.config.ts`, `tsconfig.app.json`).

- **Article IDs are URL-encoded in the frontend route and decoded in backend controllers** (`/app/article/id/:id` and `getArticleById` / remove handlers).

## MCP server guidance

- **Playwright MCP is recommended** for this repo’s UI work (routing, auth redirects, and page-level regressions).
- Run apps before MCP-driven browser checks:

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

- Target flows for Playwright MCP sessions:
  - Auth flow (`/auth/sign-in`, `/auth/sign-up`)
  - Protected route behavior under `/app/*`
  - News list -> article details -> save/mark-read actions

