import { getPublishedPages, pageIdToPath } from './pages';

export interface NavItem {
  label: string;
  href: string;
}

/** Top-level published pages, in alphabetical order. Nested pages are reachable from their parent. */
export async function getPrimaryNavigation(): Promise<NavItem[]> {
  const pages = await getPublishedPages();
  return pages
    .filter((page) => page.id !== 'home' && !page.id.includes('/'))
    .map((page) => ({ label: page.data.title, href: pageIdToPath(page.id) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}
