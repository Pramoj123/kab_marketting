// Option lists for pages. Plain data with no imports.

/** Where a page is linked from. Hidden pages are reachable only by their URL or other links. */
export const NAV_PLACEMENTS = [
  { value: 'header', label: 'Header' },
  { value: 'footer', label: 'Footer' },
  { value: 'hidden', label: 'Not in menus' },
] as const;
