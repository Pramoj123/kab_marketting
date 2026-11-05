import { tv, type VariantProps } from './tv';

// Labels are 13px at 500 in sentence case. Never tracked capitals.
export const badge = tv({
  base: 'inline-flex items-center rounded-full px-3 py-1 text-label font-medium',
  variants: {
    tone: {
      neutral: 'bg-mist text-ink-muted',
      accent: 'bg-accent-100 text-ink',
      brand: 'bg-brand-100 text-brand-800',
    },
  },
  defaultVariants: { tone: 'neutral' },
});

// A link that looks like a pill, for jumping between menu categories.
export const chip = tv({
  base: 'inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-small font-medium text-ink transition-colors hover:border-ink hover:bg-surface-raised',
});

export type BadgeVariants = VariantProps<typeof badge>;
