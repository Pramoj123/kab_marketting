import type { ProductData } from '../cms/schemas';
import { PRODUCT_AVAILABILITY, PRODUCT_CATEGORIES, PRODUCT_DIETS } from '../cms/product-options.ts';

type Category = ProductData['category'];

export function categoryLabel(category: Category) {
  return PRODUCT_CATEGORIES.find((option) => option.value === category)?.label ?? category;
}

export const isOrderable = (product: Pick<ProductData, 'availability'>) =>
  product.availability === 'available';

/** "Order 2 days ahead", or an empty string when no notice is needed. */
export function formatLeadTime(days: number) {
  if (days <= 0) return '';
  return `Order ${days} ${days === 1 ? 'day' : 'days'} ahead`;
}

/** Lower `order` first, then by name. Does not change the input. */
export function sortProducts<T extends Pick<ProductData, 'name' | 'order'>>(products: T[]) {
  return [...products].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export const productsInCategory = <T extends Pick<ProductData, 'category'>>(
  products: T[],
  category: Category,
) => products.filter((product) => product.category === category);

export function selectProducts<T extends Pick<ProductData, 'category' | 'featured'>>(
  products: T[],
  filter: { category: Category | 'all'; featuredOnly: boolean },
) {
  return products.filter(
    (product) =>
      (filter.category === 'all' || product.category === filter.category) &&
      (!filter.featuredOnly || product.featured),
  );
}

const optionLabel = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

type Describable = Pick<
  ProductData,
  'diet' | 'leadTimeDays' | 'flavours' | 'sizes' | 'availability' | 'availabilityNote'
>;

/** Egg choice offered when a product is made both ways. */
export const DIET_CHOICES = ['Eggless', 'With egg'] as const;

/**
 * The choices a customer makes on a card. Two or more options become a picker;
 * a single option is shown as a plain detail line.
 */
export function productChoices(product: Pick<ProductData, 'flavours' | 'sizes' | 'diet'>) {
  const groups = [
    { name: 'size', label: 'Size', options: product.sizes },
    { name: 'flavour', label: 'Flavour', options: product.flavours },
    {
      name: 'diet',
      label: 'Egg or eggless',
      options: product.diet === 'both' ? [...DIET_CHOICES] : [],
    },
  ];
  return {
    pickers: groups.filter((group) => group.options.length > 1),
    details: groups
      .filter((group) => group.options.length === 1)
      .map((group) => ({ label: group.label, value: group.options[0] })),
  };
}

/** What a product card shows besides the name, photo and summary. */
export function describeProduct(product: Describable) {
  const leadTime = formatLeadTime(product.leadTimeDays);
  const availability = optionLabel(PRODUCT_AVAILABILITY, product.availability);
  const note = product.availabilityNote.trim();

  return {
    tags: [
      { label: optionLabel(PRODUCT_DIETS, product.diet), tone: 'neutral' as const },
      ...(leadTime ? [{ label: leadTime, tone: 'brand' as const }] : []),
    ],
    ...productChoices(product),
    statusLabel: isOrderable(product) ? '' : note ? `${availability}. ${note}` : availability,
  };
}

/** Groups in menu order. Categories with no products are left out. */
export function groupByCategory<T extends Pick<ProductData, 'name' | 'order' | 'category'>>(
  products: T[],
) {
  return PRODUCT_CATEGORIES.map((option) => ({
    category: option.value,
    label: option.label,
    products: sortProducts(productsInCategory(products, option.value)),
  })).filter((group) => group.products.length > 0);
}
