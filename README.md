# 📚 Booknook — Client

The frontend of **Booknook**, a library / book-borrowing app. Built with **Next.js 16** (App Router, React 19) and styled with **Tailwind CSS v4** and **shadcn/ui** (base-nova).

This repo is one half of a two-repo application:

| Repo | Role |
|------|------|
| `booknook-client` (this repo) | Next.js frontend + auth (better-auth) |
| `../booknook-server` | Express 5 + MongoDB API on `http://localhost:8000` |

> ⚠️ The client cannot show book or borrow data unless the sibling `booknook-server` repo is running (`node index.js`).

## Commands

```bash
npm run dev     # Development server (Turbopack) → http://localhost:3000
npm run build   # Production build (typechecks + compiles)
npm run lint    # ESLint (next/core-web-vitals + typescript)
npm run start   # Serve the production build
```

No test suite is configured.

## Architecture

- **Next.js 16 / React 19** with the **React Compiler** enabled (`next.config.ts`) — manual memoization (`useMemo`, `useCallback`, `React.memo`) is handled automatically, so avoid it in app code.
- **Tailwind v4** — no `tailwind.config.js`; all theme tokens live in `src/app/globals.css` (`@theme inline` + CSS variables). Dark mode is class-based (`.dark`).
- **shadcn/ui** (~60 pre-installed components in `src/components/ui/`) — add more with `npx shadcn@latest add <name>`. Path alias: `@/*` → `./src/*`.
- **Data fetching is client-side** via `fetch` to a hardcoded `http://localhost:8000` (books, borrows, upload-image — ~12 call sites across `src/app/*` and `src/components/books/BorrowButton.tsx`). Pages are `"use client"` components that fetch in `useEffect` — not RSC / server actions.

## Auth

Auth is hosted **in this repo** using [better-auth](https://www.better-auth.com):

- **Server:** `src/lib/auth.ts` — better-auth with the `@better-auth/mongo-adapter` (db `booknook`), email + password, Google OAuth, and the `jwt()` plugin with a 7-day JWT cookie-cache session. Served via the catch-all route `src/app/api/auth/[...all]/route.ts`.
- **Client:** `src/lib/auth-client.ts` — exports `signIn`, `signUp`, and `useSession` for use in components.
- **Verification:** the Express API server validates these JWTs via `jose` + JWKS.

## Getting Started

1. Start MongoDB (or point `MONGODB_URI` at your instance).
2. Start the API server from the sibling repo:

   ```bash
   cd ../booknook-server
   node index.js   # serves on http://localhost:8000
   ```

3. Create a `.env` file in this repo (gitignored, **required** for dev):

   ```dotenv
   BETTER_AUTH_SECRET=...
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URI=...
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Key Routes / Pages

- `/` — home (hero banner, featured content)
- `/books`, `/add-book` — browse and add books
- `/my-books`, `/my-borrows` — personal library and borrow history
- `/login`, `/register`, `/my-profile` — auth & profile pages
- `/api/auth/*` — better-auth endpoints

## Gotchas

- The `localhost:8000` API base URL is **not env-configurable yet** — if backend URLs change, both repos are involved.
- `next/font` loads `Inter_Tight`, but the CSS variable is `--font-geist-sans` — keep them aligned when changing fonts.
- Turbopack is used in dev; Tailwind is wired through a `turbopack.rules` CSS loader in `next.config.ts` — keep that wiring when touching build config.
- `next.config.ts` allows images from **any** https host (`remotePatterns: hostname: "**"`) because cover images come from arbitrary URLs.
- Strict TypeScript (`noEmit: true`) — type errors block `npm run build`. Domain types live in `src/lib/type/`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Compiler](https://react.dev/learn/react-compiler)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [better-auth](https://www.better-auth.com)
