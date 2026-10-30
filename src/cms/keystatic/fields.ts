// Reusable Keystatic field builders. Add shared fields here, never copy them between schemas.
import { fields } from '@keystatic/core';

const UPLOAD_DIRECTORY = 'public/images/uploads';
const UPLOAD_PUBLIC_PATH = '/images/uploads/';

export const imageField = (label: string) =>
  fields.image({ label, directory: UPLOAD_DIRECTORY, publicPath: UPLOAD_PUBLIC_PATH });

export const linkField = (label: string) =>
  fields.object(
    { label: fields.text({ label: 'Label' }), href: fields.text({ label: 'URL or path' }) },
    { label },
  );

export const statusField = () =>
  fields.select({
    label: 'Status',
    description: 'Only published pages are built and listed in the sitemap.',
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Published', value: 'published' },
    ],
    defaultValue: 'draft',
  });

export const seoField = () =>
  fields.object(
    {
      title: fields.text({
        label: 'Meta title',
        description: 'Up to 60 characters. Leave empty to use the page title.',
        validation: { length: { max: 60 } },
      }),
      description: fields.text({
        label: 'Meta description',
        description: 'Up to 160 characters. Leave empty to use the first section summary.',
        multiline: true,
        validation: { length: { max: 160 } },
      }),
      ogImage: imageField('Social sharing image'),
      canonical: fields.url({ label: 'Canonical URL override' }),
      noindex: fields.checkbox({ label: 'Hide from search engines', defaultValue: false }),
      schemaType: fields.select({
        label: 'Structured data type',
        options: [
          { label: 'Web page', value: 'WebPage' },
          { label: 'Service', value: 'Service' },
          { label: 'About page', value: 'AboutPage' },
          { label: 'Contact page', value: 'ContactPage' },
        ],
        defaultValue: 'WebPage',
      }),
    },
    { label: 'SEO' },
  );
