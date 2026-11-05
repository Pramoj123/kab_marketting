import { tv, type VariantProps } from './tv';

// Fields are 48px tall with 16px text (no zoom on phones) and 13px labels. Focus ring comes from global.css.
export const field = tv({
  slots: {
    root: 'flex flex-col gap-2',
    label: 'text-label font-medium text-ink',
    optional: 'ml-1 font-normal text-ink-muted',
    control:
      'w-full rounded-control border border-line-strong bg-surface-raised px-4 text-body text-ink transition-colors placeholder:text-ink-muted hover:border-ink aria-invalid:border-danger',
    hint: 'text-small text-ink-muted',
    error: 'text-small font-medium text-danger',
  },
  variants: {
    kind: {
      text: { control: 'h-control' },
      date: { control: 'h-control' },
      select: { control: 'h-control' },
      textarea: { control: 'py-3' },
    },
  },
  defaultVariants: { kind: 'text' },
});

export const fieldset = tv({
  slots: {
    root: 'flex w-full min-w-0 flex-col gap-6',
    legend: 'mb-6 font-display text-h3 text-ink',
  },
});

// Choices on a product card: radios drawn as pills. The checked pill fills with ink.
export const choiceGroup = tv({
  slots: {
    root: 'flex min-w-0 flex-col gap-2',
    legend: 'mb-2 text-label font-medium text-ink',
    options: 'flex flex-wrap gap-2',
    option:
      'inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line-strong px-4 text-small text-ink transition-colors hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-on-brand has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600',
    input: 'sr-only',
  },
});

export type FieldVariants = VariantProps<typeof field>;
