import { getEntry } from 'astro:content';

/** Where "Customise" buttons point. The page itself is a CMS page with this slug. */
export const CUSTOM_ORDER_PATH = '/custom-order/';
/** Anchor of the custom order form, so a hero button can jump to it (`#order-form`). */
export const CUSTOM_ORDER_FORM_ID = 'order-form';

export async function getSiteSettings() {
  const entry = await getEntry('settings', 'site');
  if (!entry)
    throw new Error('Missing site settings. Create src/content/settings/site.yaml in the CMS.');
  return entry.data;
}

export const isProduction = () => import.meta.env.PUBLIC_SITE_ENV === 'production';
