import type { PageData } from '../cms/schemas';
import { isHomeId, pageIdToPath } from './page-paths.ts';

export interface NavItem {
  label: string;
  href: string;
}

type NavPage = { id: string; data: Pick<PageData, 'title' | 'navigation'> };

/**
 * Top-level pages set to appear in one menu, by menu order and then title.
 * The home page and nested pages are never listed. Nested pages are reached from their parent.
 */
export function selectNavigation(pages: NavPage[], placement: PageData['navigation']['placement']) {
  return pages
    .filter(
      (page) =>
        !isHomeId(page.id) &&
        !page.id.includes('/') &&
        page.data.navigation.placement === placement,
    )
    .sort(
      (a, b) =>
        a.data.navigation.order - b.data.navigation.order ||
        a.data.title.localeCompare(b.data.title),
    )
    .map((page): NavItem => ({ label: page.data.title, href: pageIdToPath(page.id) }));
}
