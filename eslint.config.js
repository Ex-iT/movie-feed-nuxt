import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
}, {
  rules: {

    'vue/singleline-html-element-content-newline': ['error', {
      ignores: ['NuxtLink'],
    }],
    'unused-imports/no-unused-vars': ['error', {
      caughtErrorsIgnorePattern: '^_',
    }],
  },
})
