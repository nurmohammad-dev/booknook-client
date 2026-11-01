<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## Project Overview

**booknook-client** — Next.js 16 (React 19) app with shadcn/ui (base-nova style), Tailwind CSS v4, and React Compiler.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build (typechecks + compiles) |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint (Next.js core-web-vitals + TS rules) |

**No test suite configured.** Add tests if needed.

---

## Key Configurations

- **TypeScript**: Strict mode, path alias `@/*` → `./src/*`, `noEmit: true` (Next.js handles emission)
- **Tailwind v4**: CSS-first config in `src/app/globals.css` (uses `@import "tailwindcss"`, `tw-animate-css`, `shadcn/tailwind.css`)
- **React Compiler**: Enabled in `next.config.ts` (`reactCompiler: true`)
- **Turbopack**: Enabled for dev, configured for Tailwind CSS loading
- **ESLint**: Flat config extending `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`

---

## Architecture & Conventions

- **App Router** only (`src/app/`), RSC enabled by default
- **shadcn/ui** components in `src/components/ui/` — 50+ pre-installed (see `components.json`)
- **Aliases** (from `components.json` & `tsconfig.json`):
  - `@/components` → `src/components`
  - `@/components/ui` → `src/components/ui`
  - `@/lib` → `src/lib`
  - `@/hooks` → `src/hooks`
  - `@/lib/utils` → `src/lib/utils.ts` (provides `cn()` helper)
- **Fonts**: `Inter_Tight` from `next/font/google` (variable `--font-geist-sans`)
- **Dark mode**: Class-based (`.dark` on root), CSS variables in `globals.css`

---

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

Uses `components.json` config (style: `base-nova`, RSC: true, icons: lucide). Components land in `src/components/ui/`.

---

## Gotchas

- **React Compiler** is on — avoid `useMemo`/`useCallback`/`React.memo` unless profiling shows need; Compiler handles it.
- **Turbopack** in dev — some webpack loaders/plugins won't work; check `next.config.ts` turbopack rules if adding loaders.
- **Tailwind v4** — no `tailwind.config.js`; all config in `globals.css` via `@theme inline` and CSS variables.
- **Strict TS** — `strict: true`, `noEmit: true`; type errors block `npm run build`.
- **No tests** — if adding tests, configure Vitest/Jest + React Testing Library separately.
- **`next/font` variable** — uses `--font-geist-sans` but loads `Inter_Tight`; update variable name if changing fonts.

---

## File Structure Highlights

```
src/
├── app/
│   ├── layout.tsx       # Root layout, font, globals.css
│   ├── page.tsx         # Home page (placeholder)
│   └── globals.css      # Tailwind v4 + shadcn theme + CSS variables
├── components/
│   └── ui/              # 50+ shadcn components (accordion, button, dialog, etc.)
├── hooks/               # Custom hooks (use-mobile, use-highlighted-code)
└── lib/
    ├── utils.ts         # cn() helper
    └── highlighter.tsx  # Shiki-based code highlighting
```

---

## Environment

- Node.js 20+ (per `@types/node`)
- Package manager: npm (lockfile present)
- No `.env*` files committed — create `.env.local` for local secrets if needed