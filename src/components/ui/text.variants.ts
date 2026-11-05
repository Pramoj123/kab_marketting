import { tv, type VariantProps } from './tv';

export const text = tv({
  base: 'text-pretty',
  variants: {
    tone: {
      default: 'text-ink',
      muted: 'text-ink-muted',
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
  defaultVariants: { tone: 'muted', size: 'base', measure: true },
});

export type TextVariants = VariantProps<typeof text>;
