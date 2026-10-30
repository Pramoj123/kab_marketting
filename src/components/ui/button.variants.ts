import { tv, type VariantProps } from 'tailwind-variants';

export const button = tv({
  base: 'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
  variants: {
    intent: {
      primary: 'bg-brand-600 text-on-brand hover:bg-brand-700',
      secondary: 'border border-line bg-surface text-ink hover:bg-surface-muted',
      ghost: 'text-brand-600 hover:bg-brand-50',
    },
    size: {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-5 text-base',
      lg: 'h-12 px-6 text-lg',
    },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
});

export type ButtonVariants = VariantProps<typeof button>;
