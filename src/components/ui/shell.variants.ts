import { tv } from './tv';

// The page shell: header, phone menu sheet, phone action bar and footer.
// One opaque header with a hairline, no blur or shrink. Nothing else is fixed except the phone bar.
export const shell = tv({
  slots: {
    skip: 'sr-only rounded-full bg-surface-raised px-5 py-3 text-body font-medium text-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-30',
    header: 'sticky top-0 z-20 border-b border-line bg-surface',
    bar: 'flex min-h-nav items-center justify-between gap-6',
    nav: 'hidden items-center gap-8 lg:flex',
    end: 'flex items-center gap-3',
    headerAction: 'hidden sm:inline-flex',
    menuButton: 'lg:hidden',
  },
});

export const logo = tv({
  slots: {
    root: 'flex shrink-0 items-center gap-3 text-ink',
    mark: 'size-11 rounded-full mix-blend-multiply sm:size-12',
    name: 'font-display text-h3 whitespace-nowrap',
  },
});

// A full-screen sheet on the native <dialog>: Esc closes it and the page behind is inert.
export const menuSheet = tv({
  slots: {
    root: 'm-0 size-full max-h-none max-w-none bg-surface text-ink backdrop:bg-ink/30',
    top: 'flex min-h-nav items-center justify-between',
    list: 'flex flex-col pt-4 pb-8',
    link: 'flex min-h-14 items-center border-b border-line font-display text-h3 text-ink transition-colors hover:text-brand-700',
    group: 'pt-8 pb-2 text-label font-medium text-ink-muted',
  },
});

export const actionBar = tv({
  slots: {
    spacer: 'h-bar sm:hidden',
    bar: 'fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface px-gutter pt-3 pb-safe sm:hidden',
  },
});

export const footer = tv({
  slots: {
    // The dark close of the page, matching the dark hero that opens it.
    root: 'bg-aurora-ink text-on-brand',
    close:
      'flex flex-col items-start gap-6 border-b border-on-brand/15 py-section-bottom md:flex-row md:items-end md:justify-between',
    columns: 'grid gap-10 py-12 sm:grid-cols-3',
    column: 'flex flex-col items-start gap-1',
    title: 'pb-2 text-label font-medium text-accent-300',
    legal: 'flex flex-col gap-4 border-t border-on-brand/15 py-8 sm:flex-row sm:justify-between',
  },
});
