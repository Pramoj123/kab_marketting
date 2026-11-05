// Option lists for products. Plain data with no imports, so the Zod schema, the Keystatic
// fields and the helpers in src/lib can all read one source.

export const PRODUCT_CATEGORIES = [
  { value: 'brownies', label: 'Brownies' },
  { value: 'brookies', label: 'Brookies' },
  { value: 'mini-cookies', label: 'Mini cookies' },
  { value: 'bento-cakes', label: 'Bento cakes' },
  { value: 'cupcakes', label: 'Cupcakes' },
] as const;

/** What a product grid section can show: everything, or one category. */
export const PRODUCT_FILTERS = [
  { value: 'all', label: 'All products' },
  ...PRODUCT_CATEGORIES,
] as const;

export const PRODUCT_DIETS = [
  { value: 'egg', label: 'Contains egg' },
  { value: 'eggless', label: 'Eggless' },
  { value: 'both', label: 'Egg and eggless available' },
] as const;

export const PRODUCT_AVAILABILITY = [
  { value: 'available', label: 'Available' },
  { value: 'sold-out', label: 'Sold out' },
  { value: 'paused', label: 'Paused' },
] as const;

/** What a visitor can ask for on the custom order form. Categories first, then special orders. */
export const CUSTOM_ORDER_TYPES = [
  ...PRODUCT_CATEGORIES.map((option) => option.label),
  'Gift hamper',
  'Bulk or corporate order',
  'Something else',
] as const;
