import { tv, type VariantProps } from './tv';

// Numbered steps: a large pink numeral over a short title and one line.
export const stepList = tv({
  slots: {
    root: 'grid gap-8 sm:grid-cols-2',
    item: 'flex flex-col gap-3 border-t border-line pt-6',
    number: 'font-display text-h2 text-accent-600',
  },
  variants: {
    columns: {
      3: { root: 'lg:grid-cols-3' },
      4: { root: 'lg:grid-cols-4' },
    },
  },
  defaultVariants: { columns: 3 },
});

// Questions and answers shown in full, each row closed by a hairline. No accordion.
export const definitionList = tv({
  slots: {
    root: 'flex flex-col',
    row: 'flex flex-col gap-2 border-b border-line py-6 first:pt-0',
    term: 'font-display text-h3 text-ink',
    detail: 'max-w-measure text-ink-muted',
  },
});

export type StepListVariants = VariantProps<typeof stepList>;
