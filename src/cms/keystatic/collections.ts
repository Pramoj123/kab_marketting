import { collection, fields, singleton } from '@keystatic/core';
import { PRODUCT_AVAILABILITY, PRODUCT_CATEGORIES, PRODUCT_DIETS } from '../product-options';
import { pageBlocks } from './blocks';
import { imageField, navigationField, seoField, statusField } from './fields';

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
    navigation: navigationField(),
    seo: seoField(),
    blocks: pageBlocks,
  },
});

const textList = (label: string, description: string) =>
  fields.array(fields.text({ label: 'Name' }), {
    label,
    description,
    itemLabel: (props) => props.value,
  });

export const products = collection({
  label: 'Products',
  path: 'src/content/products/*',
  slugField: 'name',
  format: { data: 'yaml' },
  schema: {
    name: fields.slug({ name: { label: 'Product name', validation: { isRequired: true } } }),
    status: statusField('products'),
    category: fields.select({
      label: 'Category',
      options: [...PRODUCT_CATEGORIES],
      defaultValue: 'brownies',
    }),
    summary: fields.text({
      label: 'Short description',
      description: 'One or two sentences shown on the product card.',
      multiline: true,
    }),
    photo: imageField('Photo'),
    photoAlt: fields.text({
      label: 'Photo description',
      description: 'Say what is in the photo, for people using screen readers.',
    }),
    flavours: textList('Flavours', 'Add each flavour you offer.'),
    sizes: textList('Sizes and packs', 'For example "Box of 4", "Box of 6".'),
    diet: fields.select({
      label: 'Egg or eggless',
      options: [...PRODUCT_DIETS],
      defaultValue: 'egg',
    }),
    customisable: fields.checkbox({
      label: 'Can be customised',
      description: 'Shows a custom order button, for example bento cake messages and designs.',
      defaultValue: false,
    }),
    leadTimeDays: fields.integer({
      label: 'Days of notice needed',
      description: 'How many days ahead customers must order. Use 0 for none.',
      defaultValue: 0,
      validation: { min: 0 },
    }),
    availability: fields.select({
      label: 'Availability',
      description: 'Sold out and paused products stay visible but cannot be ordered.',
      options: [...PRODUCT_AVAILABILITY],
      defaultValue: 'available',
    }),
    availabilityNote: fields.text({
      label: 'Availability note',
      description:
        'Optional, shown with sold out or paused products. For example "Back on Friday".',
    }),
    featured: fields.checkbox({
      label: 'Show on the home page',
      defaultValue: false,
    }),
    order: fields.integer({
      label: 'Sort order',
      description: 'Lower numbers appear first. Products with the same number sort by name.',
      defaultValue: 0,
    }),
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
    whatsappNumber: fields.text({
      label: 'WhatsApp number',
      description:
        'Every Order button opens a chat with this number. Include the country code, for example +91 98765 43210.',
    }),
    allergenNotice: fields.text({
      label: 'Allergen notice',
      description: 'Shown in the footer on every page. Say what your kitchen handles.',
      multiline: true,
    }),
  },
});
