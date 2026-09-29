# AGENTS.md — movie-feed-nuxt

## Stack

- **Nuxt 4** (app directory layout, `app/` not `pages/`)
- **TypeScript** strict, `typeCheck: true`
- **pnpm** 11 (workspace config in `pnpm-workspace.yaml`)
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
  - `programmes/[mainId].get.ts` — detail endpoint (lazy, cached 24 hr), validates `mainId` is numeric
- `server/routes/` — Nitro top-level routes
  - `rss.get.ts` — RSS 2.0 feed (today's movies only, cached 30 min SWR)
- `shared/types/` — TypeScript types shared between app and server
- `public/` — PWA icons, manifest, favicon, robots.txt
- `app/config.ts` — API URIs, channel map, tick interval, site URL, cache duration constants
- `app/utils/api/` — API client helpers; `app/composables/` — composables (incl. `useNow.ts`, the shared clock, and `useProgress.ts`, a computed over it)
- `app/utils/slugifyTitle.ts` — wrapper around `@sindresorhus/slugify` with custom replacements for deep links
- `app/utils/stripHtml.ts` — strips HTML tags from strings (used for API synopsis data)
- `app/utils/parseEpoch.ts` — parses epoch string to `Date | null`, returns `null` for invalid/missing input
- `app/utils/formatTime.ts` — formats `Date | number` to `HH:mm` (nl-NL, Europe/Amsterdam), returns `''` for invalid input
- `app/utils/formatDate.ts` — formats `Date | number` to weekday + day + month (nl-NL, Europe/Amsterdam), e.g. `dinsdag 29 september`, returns `''` for invalid input
- `app/assets/css/tokens.css` — design tokens (`:root` custom properties: colors, elevation, gradients, typography, spacing, radii, motion); imported first in `nuxt.config.ts` `css` array
- `app/components/MovieDetailModal.vue` — full-screen modal using `<dialog>` element for shareable deep links
- `app/components/Card/CardItem.vue` — list item wrapper; owns the ticking `passed` state via an optional `pe` prop

The `@/` path alias resolves to `app/` (Nuxt 4 default).

## Architecture

- **SSR for list**: `index.vue` fetches `/api/v1/programmes` with `useFetch` (no `server: false`, no `default` option — uses `pageData.value ?? fallback` in computed to avoid hydration mismatch). The page renders both day-columns immediately with title, time, channel logo — no detail data.
- **Lazy details**: Clicking a movie fires `@open` on the Accordion → `MovieCardContent` calls `$fetch('/api/v1/programmes/:mainId')`. Details render on arrival with a loading state in between. Concurrent fetches for the same `main_id` are deduplicated in a module-level `pendingRequests` map, and each card has its own `AbortController` aborted on unmount.
- **Shareable deep links**: `/?movie=<mainId>&ch=<ch_id>&ps=<epoch>&pe=<epoch>` opens a `MovieDetailModal` on top of the main page. The modal is controlled by the `movie` query param in `index.vue` (a watcher keyed on `main_id` drives the detail fetch, guarded by a sequence counter + `AbortController` so switching/closing ignores stale or late responses). Closing pushes `/` to history so back-button restores the modal. The `Sharer` component generates these app URLs (not external TVgids links). The detail API response includes `linear[]` (upcoming broadcasts) which the modal filters by configured channels to show the next upcoming airing. The modal header shows the full broadcast date (`formatDate`); broadcasts that already ended get the `past` class (lighter text), computed once post-mount via an `isMounted`-gated check against `pe` — unlike the list's ticking `passed` state below.
- **Caching**: Route rules in `nuxt.config.ts` set SWR values (`/rss` 30 min, `/api/v1/programmes/**` 24 hr). `/_nuxt/**` (content-hashed bundles) gets immutable cache headers; `/assets/**` (verbatim `public/` files, never hashed) gets `max-age=0, must-revalidate` so file updates aren't pinned for a year. The `/api/v1/programmes` list endpoint has no caching — always fetches fresh from the external API. Detail and RSS endpoints use `defineCachedEventHandler` with `maxAge`/`staleMaxAge` values — no redundant `setHeader` calls. On Vercel, the edge cache controls freshness — there is no persistent disk cache between serverless invocations. The home page (`/`) and `/api/v1/programmes` use explicit `Cache-Control: no-store` in both route rules and the handler to prevent Vercel edge from persisting stale ISR entries across deployments. Locally, Nitro uses memory-only cache (`nitro.devStorage` in `nuxt.config.ts`) so stale data doesn't persist across dev server restarts.
- **Security headers**: A `/**` catch-all routeRule sets `Permissions-Policy` to `camera=(), display-capture=(), fullscreen=(), geolocation=(), microphone=()`. `vercel.json` sets the same value at Vercel's edge, replacing the `attribution-reporting=()` header Vercel injects platform-wide — routeRules alone can't override that.
- **Error handling**: API utils (`getMovies`, `getDetails`) throw `Error` on failure (not returning `{ ok: false }`). `getProgrammes` uses `Promise.allSettled`, so one failed day still returns the other day's list — but with `log.success: false`, at which point `Card` shows its error state with a retry button instead of the list. `Card` shows a separate empty state when both days are empty. The RSS route lets upstream failures propagate (5xx) instead of serving an empty feed.
- **Passed state**: The `passed` CSS class is computed reactively in `Card/CardItem.vue` from a shared clock (`useNow` composable: module-scope ref + a single `rAF`/`setTimeout` chain, paused on `visibilitychange`), not from the server-provided `is_passed`. `CardItem` takes an optional `pe` prop and only reads the clock when it is present, so only the cards that care re-render each tick (Vue 3.5 stable computed propagation) — the page, the modal, and non-airing cards stay untouched. An `isMounted` ref (set in `onMounted`) gates the clock read so SSR and hydration both return `false`, preventing a hydration mismatch. `useProgress` is a `computed` over the same shared clock, activated by `updateProgress` on mount, and no longer mutates `programme.is_passed`.

## Notable

- **ESLint is the sole formatter** (`@antfu/eslint-config` with `formatters: true`, `vue: true`). VSCode: `editor.formatOnSave: false`, `source.fixAll.eslint` on save.
- **No `.env.example`** exists; `.env` files are gitignored but none committed.
- **No tests** anywhere in the repo.
- **Deployed on Vercel**; `vercel.json` overrides Vercel-edge `Permissions-Policy` header.
- External API: `https://json.tvgids.nl` (TVgids.nl JSON, Dutch TV listings).
- `typescript` is on **v6** — check peer dep compatibility if adding new TS tooling.
