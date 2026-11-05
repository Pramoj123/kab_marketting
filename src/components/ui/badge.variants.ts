import { tv, type VariantProps } from 'tailwind-variants';

export const badge = tv({
  base: 'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
  variants: {
    tone: {
      neutral: 'bg-surface-muted text-ink-muted',
      accent: 'bg-accent-50 text-ink',
      brand: 'bg-brand-50 text-brand-700',
    },
  },
  defaultVariants: { tone: 'neutral' },
});

export type BadgeVariants = VariantProps<typeof badge>;
