import { tv, type VariantProps } from './tv';

// Full width up to max-w-page (content plus gutters), so every section shares one edge,
// including inside flex and grid parents.
export const container = tv({ base: 'mx-auto w-full max-w-page px-gutter' });

// Grounds: flat by default. aurora is for the hero only, band for at most one brand band a page.
export const section = tv({
  base: '',
  variants: {
    // default: the section rhythm. compact: a short page hero. hero: fills the first screen.
    space: {
      default: 'pt-section-top pb-section-bottom',
      compact: 'pt-16 pb-12',
      hero: 'flex min-h-hero flex-col justify-center py-16',
    },
    tone: {
      default: 'bg-surface',
      blush: 'bg-blush',
      mist: 'bg-mist',
      aurora: 'bg-aurora',
      band: 'bg-aurora-band',
      // The dark ground with drifting glows: one section a page, words in the inverse tone.
      ink: 'animate-drift bg-aurora-ink text-on-brand',
    },
  },
  defaultVariants: { tone: 'default', space: 'default' },
});

export const stack = tv({
  base: 'flex flex-col',
  variants: {
    gap: { sm: 'gap-2', md: 'gap-4', lg: 'gap-stack' },
    align: { start: 'items-start', center: 'items-center text-center' },
    // narrow: a full-width block capped at the narrow measure, on the page's left edge.
    width: { auto: '', narrow: 'w-full max-w-narrow' },
  },
  defaultVariants: { gap: 'md', align: 'start', width: 'auto' },
});

export const row = tv({
  base: 'flex flex-wrap items-center',
  variants: {
    gap: { sm: 'gap-2', md: 'gap-4', lg: 'gap-8' },
    justify: { start: 'justify-start', center: 'justify-center', between: 'justify-between' },
  },
  defaultVariants: { gap: 'md', justify: 'start' },
});

export const grid = tv({
  base: 'grid gap-6',
  variants: {
    columns: {
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-2 lg:grid-cols-3',
      // Up to four short cards in one row from tablet width, so none is left alone on a row.
      row: 'md:auto-cols-fr md:grid-flow-col',
      // Product mosaic: tiles take shapes from src/lib/mosaic.ts; rows are one tile tall.
      mosaic:
        'w-full grid-flow-dense gap-4 sm:auto-rows-(--spacing-tile) sm:grid-cols-2 lg:grid-cols-4',
    },
  },
  defaultVariants: { columns: 3 },
});

// Text beside one picture; stacks text first on small screens.
export const split = tv({ base: 'grid items-center gap-10 md:grid-cols-2 lg:gap-16' });

export type SectionVariants = VariantProps<typeof section>;
export type StackVariants = VariantProps<typeof stack>;
export type RowVariants = VariantProps<typeof row>;
export type GridVariants = VariantProps<typeof grid>;

// A section with a photograph behind its words: the photo settles in, a scrim keeps text readable.
export const banner = tv({
  slots: {
    root: 'relative isolate flex flex-col justify-center overflow-hidden bg-ink',
    media: 'absolute inset-0 -z-20 size-full animate-hero-zoom object-cover',
    scrim: 'absolute inset-0 -z-10 bg-scrim-side',
  },
  variants: {
    size: {
      full: { root: 'min-h-hero py-24' },
      compact: { root: 'py-24 lg:py-32' },
      // A rounded photo panel inside the page width, like a large product tile.
      panel: { root: 'rounded-tile px-6 py-16 sm:px-12 sm:py-24' },
    },
  },
  defaultVariants: { size: 'compact' },
});

export type BannerVariants = VariantProps<typeof banner>;
