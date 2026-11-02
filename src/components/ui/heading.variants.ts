import { tv, type VariantProps } from 'tailwind-variants';

export const heading = tv({
  base: 'font-bold tracking-tight text-balance text-ink',
  variants: {
    size: {
      display: 'text-5xl sm:text-6xl',
      h1: 'text-4xl sm:text-5xl',
      h2: 'text-3xl',
      h3: 'text-xl',
    },
  },
  defaultVariants: { size: 'h2' },
});

export type HeadingVariants = VariantProps<typeof heading>;
