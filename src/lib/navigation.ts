import { selectNavigation } from './nav-rules';
import { getPublishedPages } from './pages';

export type { NavItem } from './nav-rules';

export const getPrimaryNavigation = async () =>
  selectNavigation(await getPublishedPages(), 'header');

export const getFooterNavigation = async () =>
  selectNavigation(await getPublishedPages(), 'footer');
