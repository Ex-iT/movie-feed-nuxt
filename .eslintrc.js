module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  rules: {
    camelcase: [
      'error',
      { allow: ['_', 'ch_id', 'deep_link', 'channel_label'] },
    ],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['error'],
      },
    ],
  },
}
