[![ci](https://github.com/Ex-iT/movie-feed-nuxt/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Ex-iT/movie-feed-nuxt/actions/workflows/ci.yml)
[![Vercel](https://vercelbadge.vercel.app/api/ex-it/movie-feed-nuxt)](https://moviefeed.ex-it.nl/)

# Moviefeed

Daily overview of movies on Dutch TV. Lists today's and tomorrow's films from the major Dutch channels, sourced from [TVgids.nl](https://www.tvgids.nl/). Works as a PWA — installable on mobile, supports native sharing via the Web Share API.

## Stack

| Layer     | Technology                                         |
| --------- | -------------------------------------------------- |
| Framework | [Nuxt 4](https://nuxt.com/) with Nitro server      |
| Language  | TypeScript (strict, `typeCheck: true`)             |
| Bundler   | Vite                                               |
| Server    | Nitro 2 (runs on Vercel)                           |
| UI        | Vue 3, CSS custom properties                       |
| Images    | `@nuxt/image` (optimized via tvgidsassets CDN)     |
| Linting   | ESLint via `@antfu/eslint-config` (sole formatter) |

## Architecture

Movie listings are **server-side rendered** (SSR) — the page arrives with both columns of movies, titles, times, and channel logos already in the HTML. No client fetch needed for the initial view.

Clicking a movie title triggers a lazy fetch for the detail data (description, image, rating, metadata, kijkwijzer). The accordion shows a loading state while it arrives.

### API endpoints

| Route                            | Caching    | Purpose                                                         |
| -------------------------------- | ---------- | --------------------------------------------------------------- |
| `GET /api/v1/programmes`         | 30 min SWR | Enriched list (no details). Called from `useFetch` during SSR.  |
| `GET /api/v1/programmes/:mainId` | 1h SWR     | Single movie details. Called on-demand from `MovieCardContent`. |
| `GET /rss`                       | 1h SWR     | RSS 2.0 feed of today's movies.                                |

## Features

- **Today / tomorrow** split into two side-by-side columns (stacked on mobile)
- **Channel logos** from TVgids assets CDN
- **Live progress bar** on currently-airing movies
- **Lazy details** with loading state — synopsis, year, rating, kijkwijzer icons, IMDb / YouTube links
- **PWA** — installable, works offline (cached via Vite)
- **Native share** via Web Share API (Android/iOS)
- **Dutch language** UI (nl-NL locale, Europe/Amsterdam timezone)

## Development

```bash
pnpm run install      # install deps + generate .nuxt/ types
pnpm run dev          # http://localhost:3000
```

### Production build

```bash
pnpm run build        # production build
pnpm run generate     # static generation
pnpm run preview      # preview production build
```

### Linting

```bash
pnpm run lint         # eslint → nuxt typecheck
pnpm run lint:js      # eslint only
pnpm run lint:ts      # nuxt typecheck only
```

CI runs `pnpm run lint` only (no test or deploy step).
