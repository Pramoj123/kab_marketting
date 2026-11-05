import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { pageSchema, productSchema, siteSettingsSchema } from './cms/schemas';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/pages' }),
  schema: pageSchema,
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/products' }),
  schema: productSchema,
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/settings' }),
  schema: siteSettingsSchema,
});

export const collections = { pages, products, settings };
