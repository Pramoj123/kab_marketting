import { getCollection } from 'astro:content';
import type { PageData } from '../cms/schemas';

const HOME_ID = 'home';

export function isPublished(page: Pick<PageData, 'status' | 'publishDate'>, now = new Date()) {
  if (page.status !== 'published') return false;
  return !page.publishDate || new Date(page.publishDate) <= now;
}

export async function getPublishedPages() {
  const pages = await getCollection('pages');
  return pages.filter((page) => isPublished(page.data));
}

/** Content id to route param. The home page has no param, so it serves "/". */
export const pageIdToSlug = (id: string) => (id === HOME_ID ? undefined : id);

export const pageIdToPath = (id: string) => (id === HOME_ID ? '/' : `/${id}/`);
