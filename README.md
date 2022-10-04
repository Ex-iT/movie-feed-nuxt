# Moviefeed

Daily listing of movies on Dutch TV using the [TVgids.nl](https://www.tvgids.nl/) API. This web app is suitable to be 'installed' on a mobile device which allows native sharing.

This is a [NuxtJS](https://nuxtjs.org/) with [TypeScript](https://www.typescriptlang.org/) project bootstrapped with [`create-nuxt-app`](https://nuxtjs.org/docs/get-started/installation/).

## Development

First, install dependencies:

```bash
yarn install
```

Copy `.env.example` to `.env` in the root of the project and update the `API_SECRET_KEY`.

And run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production

To create a production build run:

```bash
yarn build
```

Make sure the `API_SECRET_KEY` is set as an environment variable.
