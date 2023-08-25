/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  rules: {
    'no-console': 'warn',
    'vue/require-v-for-key': 'off',
    'vue/v-on-event-hyphenation': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
