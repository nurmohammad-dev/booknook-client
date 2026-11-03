<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

**booknook-client** — Next.js 16 (React 19) with shadcn/ui (base-nova), Tailwind v4, React Compiler. Frontend of a two-repo app:

- **API server lives in the sibling repo `D:\Projects\Booknook\booknook-server`** (Express 5 + MongoDB, entry `index.js`, run with `node index.js`). This client cannot show book/borrow data without it running.
- **All data fetching is client-side via fetch to hardcoded `http://localhost:8000`** (books, borrows, upload-image — ~12 call sites across `src/app/*` and `src/components/books/BorrowButton.tsx`). Pages are `"use client"` components fetching in `useEffect` — do not convert to RSC/server actions without also changing the data-fetch pattern. Auth lives in **this** repo, not the Express server (see below).
- If backend behavior or URLs change, both repos are involved; the `localhost:8000` base URL is not env-configurable yet.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build (typechecks + compiles) |
| `npm run lint` | ESLint (flat config: `eslint-config-next/core-web-vitals` + `/typescript`) |

No test suite configured.

## Auth (better-auth, hosted in this repo)

- Server: `src/lib/auth.ts` — better-auth with `@better-auth/mongo-adapter` (db `booknook`), email+password, Google OAuth, `jwt()` plugin, JWT cookie-cache session (7 days). Served via catch-all `src/app/api/auth/[...all]/route.ts`.
- Client: `src/lib/auth-client.ts` — ⚠️ it creates **two separate `createAuthClient` instances**: `authClient` (with `baseURL: process.env.BETTER_AUTH_URL`) and a second default-URL client that exports `signIn`, `signUp`, `useSession`. Components use both. Fixing this means changing imports across pages.
- The Express server verifies these JWTs via `jose` JWKS.

## Environment

- `.env` exists locally (gitignored) and is **required** for dev: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. The Express server needs its own `MONGODB_URI`/`PORT` (8000) in the sibling repo.

## Stack Specifics

- **React Compiler** is on (`next.config.ts`) — avoid `useMemo`/`useCallback`/`React.memo`; the Compiler handles memoization.
- **Tailwind v4** — no `tailwind.config.js`; all theme config in `src/app/globals.css` (`@theme inline` + CSS vars). Dark mode is class-based (`.dark`).
- **Strict TS** (`noEmit: true`) — type errors block `npm run build`. Domain types live in `src/lib/type/`.
- **`next/font`** — loads `Inter_Tight` but the CSS variable is `--font-geist-sans`; keep them aligned when changing fonts.
- **shadcn/ui** — add with `npx shadcn@latest add <name>`; config in `components.json` lands components in `src/components/ui/` (~60 pre-installed; don't hand-edit these). Path aliases `@/*` → `./src/*`.

## Gotchas

- Turbopack is used in dev; Tailwind is wired through a `turbopack.rules` CSS loader in `next.config.ts` — keep that wiring if touching build config.
- `next.config.ts` allows images from **any** https host (`remotePatterns: hostname: "**"`) because cover images come from arbitrary URLs.