import { tv, type VariantProps } from './tv';

// No shadows anywhere: surfaces separate by ground and a hairline.
export const card = tv({
  base: 'rounded-card border border-line bg-surface-raised p-6',
  variants: {
    // A card that is a link lifts 2px on hover.
    interactive: {
      true: 'transition hover:-translate-y-0.5 hover:border-line-strong',
    },
    // lg: the raised form card, rounded like the product tiles.
    size: {
      md: '',
      lg: 'rounded-tile border-0 p-6 ring-1 ring-line sm:p-10',
    },
  },
  defaultVariants: { size: 'md' },
});

export const media = tv({
  base: 'h-auto w-full rounded-card object-cover',
  variants: {
    // portrait: a tall rounded photo beside text, like a product tile.
    shape: { natural: '', portrait: 'aspect-4/5 rounded-tile' },
  },
  defaultVariants: { shape: 'natural' },
});

// The current page gets a 2px pink bar under it, the one place pink marks the interface.
export const navLink = tv({
  base: 'py-2 text-body font-medium whitespace-nowrap underline-offset-8 transition-colors hover:text-ink hover:underline hover:decoration-line-strong hover:decoration-2',
  variants: {
    current: {
      true: 'text-ink underline decoration-accent-500 decoration-2',
      false: 'text-ink-muted',
    },
    // inverse: light links on the dark footer.
    tone: {
      default: '',
      inverse: 'text-on-brand/75 hover:text-on-brand hover:decoration-on-brand/40',
    },
  },
  defaultVariants: { current: false, tone: 'default' },
});

export type CardVariants = VariantProps<typeof card>;
export type NavLinkVariants = VariantProps<typeof navLink>;
export type MediaVariants = VariantProps<typeof media>;
