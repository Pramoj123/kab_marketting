import { tv, type VariantProps } from './tv';

// Numbered steps: a large pink numeral over a short title and one line.
export const stepList = tv({
  slots: {
    root: 'grid w-full gap-8 sm:grid-cols-2',
    item: 'flex flex-col gap-3 border-t border-line pt-6',
    number: 'font-display text-h2 text-accent-600',
  },
  variants: {
    columns: {
      3: { root: 'lg:grid-cols-3' },
      4: { root: 'lg:grid-cols-4' },
    },
    // inverse: frosted cards on the dark ground, the numeral in a lighter pink.
    tone: {
      default: {},
      inverse: {
        item: 'rounded-tile border-0 bg-on-brand/5 p-6 ring-1 ring-on-brand/10 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:bg-on-brand/10 sm:p-8',
        number: 'text-display text-accent-300',
      },
    },
  },
  defaultVariants: { columns: 3, tone: 'default' },
});

// Questions and answers shown in full, each row closed by a hairline. No accordion.
export const definitionList = tv({
  slots: {
    root: 'flex flex-col',
    row: 'flex flex-col gap-2 border-b border-line py-6 first:pt-0',
    index: 'hidden',
    term: 'font-display text-h3 text-ink',
    detail: 'max-w-measure text-ink-muted',
  },
  variants: {
    // numbered: each pair is a raised card with its number in pink, like the FAQ.
    numbered: {
      true: {
        root: 'gap-4',
        row: 'grid grid-cols-1 gap-x-6 gap-y-2 rounded-tile border-0 bg-surface-raised p-6 ring-1 ring-line transition duration-500 first:pt-6 hover:-translate-y-0.5 hover:ring-line-strong sm:grid-cols-(--grid-numbered) sm:p-8',
        index: 'block font-display text-h2 text-accent-600 sm:row-span-2',
      },
    },
  },
  defaultVariants: { numbered: false },
});

export type StepListVariants = VariantProps<typeof stepList>;
