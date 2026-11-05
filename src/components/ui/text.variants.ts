import { tv, type VariantProps } from './tv';

export const text = tv({
  base: 'text-pretty',
  variants: {
    tone: {
      default: 'text-ink',
      muted: 'text-ink-muted',
      inverse: 'text-on-brand/85',
    },
    size: {
      label: 'text-label font-medium',
      small: 'text-small',
      base: 'text-body',
      lead: 'text-lead',
    },
    // Caps the line length at the comfortable measure. Off only for text that must fill its box.
    measure: {
      true: 'max-w-measure',
    },
  },
  defaultVariants: { tone: 'default', size: 'base', measure: true },
});

// Inline text link: brand blue with an underline that strengthens on hover.
export const textLink = tv({
  base: 'font-medium text-brand-600 underline decoration-brand-600/30 underline-offset-4 transition-colors hover:text-brand-700 hover:decoration-brand-700',
});

export type TextVariants = VariantProps<typeof text>;
