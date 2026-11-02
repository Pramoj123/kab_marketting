import { tv } from 'tailwind-variants';

export const card = tv({ base: 'rounded-card border border-line bg-surface p-6 shadow-sm' });

export const media = tv({ base: 'h-auto w-full rounded-card object-cover' });

export const navLink = tv({
  base: 'text-sm font-medium transition-colors hover:text-brand-600',
  variants: {
    current: { true: 'text-brand-600', false: 'text-ink-muted' },
  },
  defaultVariants: { current: false },
});

export const disclosure = tv({
  slots: {
    root: 'rounded-card border border-line bg-surface px-5 py-4',
    summary: 'cursor-pointer font-semibold text-ink',
    body: 'mt-3 text-ink-muted',
  },
});
