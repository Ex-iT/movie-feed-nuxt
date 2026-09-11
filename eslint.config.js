import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
}, {
  files: ['**/*.vue'],
  rules: {
    'vue/singleline-html-element-content-newline': ['error', {
      ignores: ['NuxtLink', 'time', 'span', 'strong', 'template'],
    }],
  },
}, {
  rules: {
    'unused-imports/no-unused-vars': ['error', {
      caughtErrorsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_',
    }],
  },
}, {
  files: ['pnpm-workspace.yaml'],
  rules: {
    'pnpm/yaml-enforce-settings': 'off',
  },
})
