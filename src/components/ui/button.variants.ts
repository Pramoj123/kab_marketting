import { tv, type VariantProps } from './tv';

// One button pair for the whole site: a filled primary for the main action, an outlined secondary.
// Hover steps up 1px, press settles back and scales down slightly. Focus ring comes from global.css.
export const button = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition hover:-translate-y-px active:translate-y-0 active:scale-98',
  variants: {
    intent: {
      primary: 'bg-brand-600 text-on-brand hover:bg-brand-700 active:bg-brand-800',
      secondary: 'border border-line-strong text-ink hover:border-ink hover:bg-surface-raised',
    },
    size: {
      sm: 'h-control-sm px-5 text-small',
      md: 'h-control px-6 text-body',
      lg: 'h-control-lg px-8 text-body',
    },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
});

export type ButtonVariants = VariantProps<typeof button>;
