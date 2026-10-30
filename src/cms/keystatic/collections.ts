import { collection, fields, singleton } from '@keystatic/core';
import { pageBlocks } from './blocks';
import { imageField, seoField, statusField } from './fields';

// Slugs may contain "/" for nested URLs, for example "services/overview".
const NESTED_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/;

export const pages = collection({
  label: 'Pages',
  path: 'src/content/pages/**',
  slugField: 'title',
  format: { data: 'yaml' },
  schema: {
    title: fields.slug({
      name: { label: 'Title' },
      slug: {
        label: 'URL path',
        description: 'Use "home" for the home page. Use "services/overview" for nested pages.',
        validation: {
          pattern: {
            regex: NESTED_SLUG,
            message: 'Lowercase letters, numbers and hyphens, with "/" between levels.',
          },
        },
      },
    }),
    status: statusField(),
    publishDate: fields.date({
      label: 'Publish date',
      description: 'Optional. The page is built only on or after this date.',
    }),
    seo: seoField(),
    blocks: pageBlocks,
  },
});

export const siteSettings = singleton({
  label: 'Site settings',
  path: 'src/content/settings/site',
  format: { data: 'yaml' },
  schema: {
    siteName: fields.text({ label: 'Site name', validation: { isRequired: true } }),
    titleTemplate: fields.text({
      label: 'Title template',
      description: 'Use %s for the page title, for example "%s | Brand".',
      defaultValue: '%s | Brand',
    }),
    defaultDescription: fields.text({ label: 'Default meta description', multiline: true }),
    defaultOgImage: imageField('Default social sharing image'),
    logo: imageField('Logo'),
    socialProfiles: fields.array(fields.url({ label: 'Profile URL' }), {
      label: 'Social profiles',
      itemLabel: (props) => props.value ?? '',
    }),
  },
});
