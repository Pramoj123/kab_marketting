import { tv, type VariantProps } from './tv';

// Fields are 48px tall with 16px text (no zoom on phones) and 13px labels. Focus ring comes from global.css.
export const field = tv({
  slots: {
    root: 'flex flex-col gap-2',
    label: 'text-label font-medium text-ink',
    control:
      'w-full rounded-control border border-line-strong bg-surface-raised px-4 text-body text-ink transition-colors placeholder:text-ink-muted hover:border-ink',
    hint: 'text-small text-ink-muted',
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

export type FieldVariants = VariantProps<typeof field>;
