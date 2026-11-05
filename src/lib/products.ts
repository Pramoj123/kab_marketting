import { getCollection } from 'astro:content';
import { isPublished } from './publishing';
import { sortProducts } from './product-rules';

export async function getPublishedProducts() {
  const entries = await getCollection('products');
  const published = entries.filter((entry) => isPublished(entry.data));
  return sortProducts(published.map((entry) => ({ id: entry.id, ...entry.data })));
}
