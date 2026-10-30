import { tv, type VariantProps } from 'tailwind-variants';

export const container = tv({ base: 'mx-auto w-full max-w-page px-6' });

export const section = tv({
  base: 'py-section',
  variants: {
    tone: {
      default: 'bg-surface',
      muted: 'bg-surface-muted',
    },
  },
  defaultVariants: { tone: 'default' },
});

export const stack = tv({
  base: 'flex flex-col',
  variants: {
    gap: { sm: 'gap-2', md: 'gap-4', lg: 'gap-8' },
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

export type SectionVariants = VariantProps<typeof section>;
export type StackVariants = VariantProps<typeof stack>;
export type RowVariants = VariantProps<typeof row>;
export type GridVariants = VariantProps<typeof grid>;
