import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  { ignores: ['dist/', '.astro/', '.wrangler/', 'node_modules/', 'src/content/'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-duplicate-imports': 'error',
    },
  },
  { files: ['scripts/**', 'tests/**'], rules: { 'no-console': 'off' } },
  // Astro generates its types through a triple-slash reference.
  { files: ['src/env.d.ts'], rules: { '@typescript-eslint/triple-slash-reference': 'off' } },
);
