import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
}, {
  files: ['**/*.vue'],
  rules: {
    'vue/singleline-html-element-content-newline': ['error', {
      ignores: ['NuxtLink'],
    }],
  },
}, {
  rules: {
    'unused-imports/no-unused-vars': ['error', {
      caughtErrorsIgnorePattern: '^_',
    }],
  },
})
