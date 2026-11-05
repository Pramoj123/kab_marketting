// Names of the custom tokens in src/styles/global.css that tailwind-merge must know about.
// Without them it reads `text-label` as a colour and drops it next to `text-ink`.
// tests/unit/theme-tokens.test.ts fails when this list and global.css drift apart.
export const THEME_TOKENS = {
  text: ['display', 'h1', 'h2', 'h3', 'lead', 'body', 'small', 'label'],
  spacing: [
    'section-top',
    'section-bottom',
    'gutter',
    'stack',
    'nav',
    'hero',
    'safe',
    'bar',
    'control-sm',
    'control',
    'tile',
    'sheet',
  ],
  radius: ['control', 'panel', 'card', 'tile'],
  container: ['page', 'narrow', 'measure', 'sheet'],
} as const;
