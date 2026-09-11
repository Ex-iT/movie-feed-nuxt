import { DAY_SEC, HALF_HOUR_SEC } from './app/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-08-16',
  devtools: { enabled: false },
  telemetry: false,

  app: {
    head: {
      title: 'Films vandaag op de Nederlandse Televisie - MovieFeed',
      htmlAttrs: {
        lang: 'nl',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Overzicht van de films van vandaag en morgen op TV',
        },
        {
          name: 'theme-color',
          content: '#000000',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preconnect',
          href: 'https://tvgidsassets.nl',
        },
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'MovieFeed RSS',
          href: '/rss',
        },
      ],
    },
  },

  css: ['@/assets/css/main.css'],

  modules: ['@nuxt/image'],

  nitro: {
    devStorage: {
      cache: {
        driver: 'memory',
      },
    },
  },

  routeRules: {
    '/**': {
      headers: {
        'Permissions-Policy': 'camera=(), display-capture=(), fullscreen=(), geolocation=(), microphone=()',
      },
    },
    '/': { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    '/rss': { swr: HALF_HOUR_SEC, headers: { 'content-type': 'application/rss+xml; charset=utf-8' } },
    '/api/v1/programmes': { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    '/api/v1/programmes/**': { swr: DAY_SEC },
    '/_nuxt/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
    '/assets/**': { headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } },
  },

  typescript: {
    typeCheck: true,
    strict: true,
  },
})
