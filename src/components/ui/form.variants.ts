import { tv, type VariantProps } from 'tailwind-variants';

export const field = tv({
  slots: {
    root: 'flex flex-col gap-2',
    label: 'text-sm font-semibold text-ink',
    control:
      'w-full rounded-md border border-line bg-surface px-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
    hint: 'text-sm text-ink-muted',
  },
  variants: {
    kind: {
      text: { control: 'h-11' },
      date: { control: 'h-11' },
      select: { control: 'h-11' },
      textarea: { control: 'py-2' },
    },
  },
  defaultVariants: { kind: 'text' },
});

export type FieldVariants = VariantProps<typeof field>;
