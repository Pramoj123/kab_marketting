import { tv, type VariantProps } from './tv';

// Headlines use the display face at weight 400. Size and tracking come from the --text-* tokens.
export const heading = tv({
  base: 'font-display font-normal text-balance',
  variants: {
    size: {
      display: 'text-display',
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
    },
    // inverse: light text on a photograph or the banner.
    tone: {
      default: 'text-ink',
      inverse: 'text-on-brand',
    },
  },
  defaultVariants: { size: 'h2', tone: 'default' },
});

export type HeadingVariants = VariantProps<typeof heading>;
