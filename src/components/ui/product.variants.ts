import { tv, type VariantProps } from './tv';

export const productCard = tv({
  slots: {
    root: 'group flex flex-col overflow-hidden rounded-card border border-line bg-surface-raised',
    // The frame clips the photo so its hover zoom stays inside.
    frame: 'aspect-4/3 overflow-hidden bg-blush',
    media: 'size-full object-cover transition duration-500 group-hover:scale-103',
    placeholder: 'flex size-full items-center justify-center text-small text-ink-muted',
    body: 'flex flex-1 flex-col gap-3 p-6',
    tags: 'flex flex-wrap gap-2',
    detailLabel: 'font-medium text-ink',
    actions: 'mt-auto flex flex-col items-start gap-3 pt-2',
  },
  variants: {
    unavailable: {
      true: { media: 'opacity-60 grayscale' },
    },
  },
  defaultVariants: { unavailable: false },
});

export type ProductCardVariants = VariantProps<typeof productCard>;
