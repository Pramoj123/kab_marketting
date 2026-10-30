import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { pageSchema, siteSettingsSchema } from './cms/schemas';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/pages' }),
  schema: pageSchema,
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/settings' }),
  schema: siteSettingsSchema,
});

export const collections = { pages, settings };
