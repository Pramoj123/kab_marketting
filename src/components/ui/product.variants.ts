import { tv, type VariantProps } from './tv';

// A product tile: the photograph is the card. Name and labels sit on a scrim at its foot.
// Tapping it opens the product sheet with the choices and the order button.
export const productTile = tv({
  slots: {
    root: 'group relative isolate flex aspect-4/5 flex-col justify-end overflow-hidden rounded-tile bg-ink transition duration-500 hover:-translate-y-1 has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-brand-600 sm:aspect-auto',
    // The name's button stretches over the whole tile, so any tap opens the sheet.
    trigger:
      'cursor-pointer text-left after:absolute after:inset-0 after:z-10 focus-visible:outline-none',
    media:
      'absolute inset-0 -z-10 size-full object-cover transition duration-700 group-hover:scale-106',
    placeholder: 'absolute inset-0 -z-10 bg-aurora',
    scrim: 'absolute inset-0 -z-10 bg-scrim-bottom',
    labels: 'absolute inset-x-4 top-4 flex flex-wrap gap-2',
    body: 'flex flex-col gap-2 p-5 sm:p-6',
    name: 'font-display text-h3 text-on-brand',
    summary: 'line-clamp-2 max-w-measure text-small text-on-brand/80',
    cue: 'mt-2 flex items-center gap-3 text-small font-medium text-on-brand',
    arrow:
      'grid size-9 place-items-center rounded-full bg-on-brand/15 ring-1 ring-on-brand/30 backdrop-blur-md transition duration-500 group-hover:-rotate-45 group-hover:bg-on-brand group-hover:text-ink',
  },
  variants: {
    shape: {
      feature: { root: 'sm:col-span-2 sm:row-span-2', name: 'lg:text-h2' },
      tall: { root: 'sm:row-span-2' },
      tile: { summary: 'sm:hidden' },
      wide: { root: 'sm:col-span-2 lg:col-span-4' },
    },
    unavailable: {
      true: { media: 'grayscale' },
    },
    // Mirrored groups: the feature tile goes after the tall ones (right side, or below on tablet).
    last: {
      true: { root: 'sm:order-last' },
    },
  },
  defaultVariants: { shape: 'tile', unavailable: false, last: false },
});

// The product sheet: a bottom sheet on phones, a centred two-column panel from tablet up.
export const productSheet = tv({
  slots: {
    root: 'mx-0 mt-auto mb-0 max-h-sheet w-full max-w-none overflow-y-auto rounded-t-tile bg-surface p-0 text-ink backdrop:bg-ink/60 backdrop:backdrop-blur-sm open:animate-sheet-up sm:m-auto sm:max-w-sheet sm:rounded-tile',
    layout: 'grid sm:grid-cols-2',
    frame: 'relative aspect-4/3 overflow-hidden bg-blush sm:aspect-auto sm:min-h-full',
    media: 'absolute inset-0 size-full object-cover',
    body: 'flex flex-col gap-5 p-6 sm:p-8',
    head: 'flex items-start justify-between gap-4',
    tags: 'flex flex-wrap gap-2',
    detailLabel: 'font-medium text-ink',
    // Phones: the order button stays pinned to the sheet's foot while the choices scroll.
    actions:
      'sticky bottom-0 -mx-6 mt-auto -mb-6 flex flex-col items-start gap-3 border-t border-line bg-surface px-6 pt-4 pb-6 sm:static sm:m-0 sm:border-0 sm:p-0 sm:pt-2',
  },
});

export type ProductTileVariants = VariantProps<typeof productTile>;
