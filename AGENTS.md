# AGENTS.md — movie-feed-nuxt

## Stack

- **Nuxt 4** (app directory layout, `app/` not `pages/`)
- **TypeScript** strict, `typeCheck: true`
- **pnpm** 10 (workspace config in `pnpm-workspace.yaml`)
- No test framework, no pre-commit hooks, no formatter besides ESLint

## Commands

| Command                                         | What it does                                                                   |
| ----------------------------------------------- | ------------------------------------------------------------------------------ |
| `pnpm install`                                  | Installs deps + runs `nuxt prepare` (generates `.nuxt/` types via postinstall) |
| `pnpm dev`                                      | Dev server at `http://localhost:3000`                                          |
| `pnpm build` / `pnpm generate` / `pnpm preview` | Standard Nuxt build/deploy commands                                            |
| `pnpm lint`                                     | Runs `eslint` **then** `nuxt typecheck` (order matters)                        |
| `pnpm lint:js`                                  | ESLint only                                                                    |
| `pnpm lint:ts`                                  | `nuxt typecheck` only                                                          |

CI runs `pnpm lint` + `pnpm build` — no test or deploy step. Node version pinned via `.nvmrc` (`v24`).

## Layout

- `app/` — Nuxt app layer (pages, components, composables, layouts, utils, assets)
- `server/api/v1/` — Nitro server routes
  - `programmes.get.ts` — list endpoint (SSR, returns enriched movie data without details)
  - `programmes/[mainId].get.ts` — detail endpoint (lazy, cached 1h)
- `shared/types/` — TypeScript types shared between app and server
- `public/` — PWA icons, manifest, favicon, robots.txt
- `app/config.ts` — API URIs, channel map, caching headers
- `app/utils/api/` — API client helpers; `app/composables/` — composables
- `app/utils/slugifyTitle.ts` — wrapper around `@sindresorhus/slugify` with custom replacements for deep links

The `@/` path alias resolves to `app/` (Nuxt 4 default).

## Architecture

- **SSR for list**: `index.vue` fetches `/api/v1/programmes` with `useFetch` (no `server: false`). The page renders both day-columns immediately with title, time, channel logo — no detail data.
- **Lazy details**: Clicking a movie fires `@open` on the Accordion → `MovieCardContent` calls `$fetch('/api/v1/programmes/:mainId')`. Details render on arrival with a loading state in between.
- List endpoint uses `defineCachedEventHandler` (30 min, stale-while-revalidate); detail endpoint caches 1h.
- **Route rules** in `nuxt.config.ts` add Cache-Control headers and SWR caching for `/`, `/api/**`, `/_nuxt/**`, `/assets/**`.

## Notable

- **ESLint is the sole formatter** (`@antfu/eslint-config` with `formatters: true`, `vue: true`). VSCode: `editor.formatOnSave: false`, `source.fixAll.eslint` on save.
- **No `.env.example`** exists; `.env` files are gitignored but none committed.
- **No tests** anywhere in the repo.
- **Deployed on Vercel**; no deploy config in-repo.
- External API: `https://json.tvgids.nl` (TVgids.nl JSON, Dutch TV listings).
- `typescript` is on **v6** — check peer dep compatibility if adding new TS tooling.
