import { getEntry } from 'astro:content';

export async function getSiteSettings() {
  const entry = await getEntry('settings', 'site');
  if (!entry)
    throw new Error('Missing site settings. Create src/content/settings/site.yaml in the CMS.');
  return entry.data;
}

export const isProduction = () => import.meta.env.PUBLIC_SITE_ENV === 'production';
