export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Films vandaag op de Nederlandse Televisie | IsHetAlDonderdag.nl',
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
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/base'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxt/http', '@nuxt/image'],

  // nuxt/http module options: https://http.nuxtjs.org/API/options
  http: {
    serverTimeout: 10000,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  serverMiddleware: [
    {
      path: '/api/v1',
      handler: '~/api/v1/index.ts',
    },
  ],
}
