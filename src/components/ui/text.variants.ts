import { tv, type VariantProps } from 'tailwind-variants';

export const text = tv({
  base: 'text-pretty',
  variants: {
    tone: {
      default: 'text-ink',
      muted: 'text-ink-muted',
    },
    size: {
      base: 'text-base leading-7',
      lead: 'text-lg leading-8 sm:text-xl',
    },
  },
  defaultVariants: { tone: 'muted', size: 'base' },
});

export type TextVariants = VariantProps<typeof text>;
