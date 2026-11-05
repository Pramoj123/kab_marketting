import { getCollection } from 'astro:content';
import { isPublished } from './publishing';

export async function getPublishedPages() {
  const pages = await getCollection('pages');
  return pages.filter((page) => isPublished(page.data));
}
