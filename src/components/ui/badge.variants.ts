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

export type BadgeVariants = VariantProps<typeof badge>;
