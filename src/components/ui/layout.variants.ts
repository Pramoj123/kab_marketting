import { tv, type VariantProps } from './tv';

// The content box is max-w-page wide with the gutter outside it, so every section shares one edge.
export const container = tv({
  base: 'mx-auto box-content px-gutter',
  variants: {
    width: {
      page: 'max-w-page',
      narrow: 'max-w-narrow',
    },
  },
  defaultVariants: { width: 'page' },
});

// Grounds: flat by default. aurora is for the hero only, band for at most one brand band a page.
export const section = tv({
  base: 'pt-section-top pb-section-bottom',
  variants: {
    tone: {
      default: 'bg-surface',
      blush: 'bg-blush',
      mist: 'bg-mist',
      aurora: 'bg-aurora',
      band: 'bg-aurora-band',
    },
  },
  defaultVariants: { tone: 'default' },
});

export const stack = tv({
  base: 'flex flex-col',
  variants: {
    gap: { sm: 'gap-2', md: 'gap-4', lg: 'gap-stack' },
    align: { start: 'items-start', center: 'items-center text-center' },
  },
  defaultVariants: { gap: 'md', align: 'start' },
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
    },
  },
  defaultVariants: { columns: 3 },
});

export type ContainerVariants = VariantProps<typeof container>;
export type SectionVariants = VariantProps<typeof section>;
export type StackVariants = VariantProps<typeof stack>;
export type RowVariants = VariantProps<typeof row>;
export type GridVariants = VariantProps<typeof grid>;
