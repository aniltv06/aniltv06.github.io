import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        // External libraries loaded via CDN
        Chart: 'readonly',
        THREE: 'readonly',
        // Analytics globals
        gtag: 'readonly',
        clarity: 'readonly',
        dataLayer: 'readonly',
        // Build-time globals
        process: 'readonly',
      },
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'dev-dist/', '*.config.js'],
  },
];
