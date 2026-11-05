import { tv, type VariantProps } from 'tailwind-variants';

export const productCard = tv({
  slots: {
    root: 'flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-sm',
    media: 'aspect-4/3 w-full object-cover',
    placeholder:
      'flex aspect-4/3 w-full items-center justify-center bg-accent-50 text-sm text-ink-muted',
    body: 'flex flex-1 flex-col gap-3 p-5',
    tags: 'flex flex-wrap gap-2',
    actions: 'mt-auto flex flex-wrap gap-2 pt-2',
  },
  variants: {
    unavailable: {
      true: { media: 'opacity-60 grayscale' },
    },
  },
  defaultVariants: { unavailable: false },
});

export type ProductCardVariants = VariantProps<typeof productCard>;
