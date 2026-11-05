// The one `tv` every *.variants.ts file imports, configured with the theme's custom token names.
import { createTV } from 'tailwind-variants';
import { THEME_TOKENS } from './theme-tokens.ts';

const toArray = (values: readonly string[]) => [...values];

export const tv = createTV({
  twMergeConfig: {
    extend: {
      theme: {
        text: toArray(THEME_TOKENS.text),
        spacing: toArray(THEME_TOKENS.spacing),
        radius: toArray(THEME_TOKENS.radius),
        container: toArray(THEME_TOKENS.container),
      },
    },
  },
});

export type { VariantProps } from 'tailwind-variants';
