import { tv, type VariantProps } from './tv';

// No shadows anywhere: surfaces separate by ground and a hairline.
export const card = tv({
  base: 'rounded-card border border-line bg-surface-raised p-6',
  variants: {
    // A card that is a link lifts 2px on hover.
    interactive: {
      true: 'transition hover:-translate-y-0.5 hover:border-line-strong',
    },
  },
});

export const media = tv({ base: 'h-auto w-full rounded-card object-cover' });

// The current page gets a 2px pink bar under it, the one place pink marks the interface.
export const navLink = tv({
  base: 'py-2 text-body font-medium whitespace-nowrap underline-offset-8 transition-colors hover:text-ink',
  variants: {
    current: {
      true: 'text-ink underline decoration-accent-500 decoration-2',
      false: 'text-ink-muted',
    },
  },
  defaultVariants: { current: false },
});

export const disclosure = tv({
  slots: {
    root: 'rounded-panel border border-line bg-surface-raised px-6 py-5',
    summary: 'cursor-pointer text-lead font-medium text-ink',
    body: 'mt-3 max-w-measure text-ink-muted',
  },
});

export type CardVariants = VariantProps<typeof card>;
