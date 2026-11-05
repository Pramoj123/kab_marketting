export interface Publishable {
  status: 'draft' | 'published';
  publishDate?: string | null;
}

/** Published, and not scheduled for a later date. */
export function isPublished(item: Publishable, now = new Date()) {
  if (item.status !== 'published') return false;
  return !item.publishDate || new Date(item.publishDate) <= now;
}
