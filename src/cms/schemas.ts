// Zod schemas for CMS content. Source of truth for what the site accepts at build time.
// Keep in sync with src/cms/keystatic/*. A mismatch fails `pnpm build`.
import { z } from 'astro/zod';
import { optionValues } from './options';
import { NAV_PLACEMENTS } from './page-options';
import {
  PRODUCT_AVAILABILITY,
  PRODUCT_CATEGORIES,
  PRODUCT_DIETS,
  PRODUCT_FILTERS,
} from './product-options';

const text = z.string().default('');

export const linkSchema = z.object({ label: text, href: text });

export const seoSchema = z
  .object({
    title: text,
    description: text,
    ogImage: z.string().nullish(),
    canonical: z.string().nullish(),
    noindex: z.boolean().default(false),
    schemaType: z.enum(['WebPage', 'Service', 'AboutPage', 'ContactPage']).default('WebPage'),
  })
  .prefault({});

const heroSchema = z.object({
  notice: text,
  headline: z.string(),
  subheadline: text,
  primaryCta: linkSchema,
  secondaryCta: linkSchema,
  image: z.string().nullish(),
  imageAlt: text,
  size: z.enum(['full', 'compact']).default('compact'),
});

const featuresSchema = z.object({
  heading: z.string(),
  intro: text,
  items: z.array(z.object({ title: z.string(), description: text })).default([]),
});

const ctaSchema = z.object({ heading: z.string(), body: text, cta: linkSchema });

const faqSchema = z.object({
  heading: z.string(),
  items: z.array(z.object({ question: z.string(), answer: text })).default([]),
});

const productGridSchema = z.object({
  heading: z.string(),
  intro: text,
  category: z.enum(optionValues(PRODUCT_FILTERS)).default('all'),
  featuredOnly: z.boolean().default(false),
  link: linkSchema.prefault({}),
});

const stepsSchema = z.object({
  heading: z.string(),
  intro: text,
  items: z
    .array(z.object({ title: z.string(), description: text }))
    .max(4)
    .default([]),
});

const customOrderSchema = z.object({ heading: z.string(), intro: text, note: text });

const contactSchema = z.object({ heading: z.string(), intro: text, hours: text });

export const blockSchema = z.discriminatedUnion('discriminant', [
  z.object({ discriminant: z.literal('hero'), value: heroSchema }),
  z.object({ discriminant: z.literal('productGrid'), value: productGridSchema }),
  z.object({ discriminant: z.literal('customOrder'), value: customOrderSchema }),
  z.object({ discriminant: z.literal('contact'), value: contactSchema }),
  z.object({ discriminant: z.literal('features'), value: featuresSchema }),
  z.object({ discriminant: z.literal('cta'), value: ctaSchema }),
  z.object({ discriminant: z.literal('faq'), value: faqSchema }),
  z.object({ discriminant: z.literal('steps'), value: stepsSchema }),
]);

const navigationSchema = z
  .object({
    placement: z.enum(optionValues(NAV_PLACEMENTS)).default('header'),
    order: z.number().int().default(0),
  })
  .prefault({});

export const pageSchema = z.object({
  title: z.string(),
  status: z.enum(['draft', 'published']).default('draft'),
  publishDate: z.string().nullish(),
  navigation: navigationSchema,
  seo: seoSchema,
  blocks: z.array(blockSchema).default([]),
});

export const productSchema = z.object({
  name: z.string(),
  category: z.enum(optionValues(PRODUCT_CATEGORIES)),
  status: z.enum(['draft', 'published']).default('draft'),
  summary: text,
  photo: z.string().nullish(),
  photoAlt: text,
  flavours: z.array(z.string()).default([]),
  sizes: z.array(z.string()).default([]),
  diet: z.enum(optionValues(PRODUCT_DIETS)).default('egg'),
  customisable: z.boolean().default(false),
  leadTimeDays: z.number().int().min(0).default(0),
  availability: z.enum(optionValues(PRODUCT_AVAILABILITY)).default('available'),
  availabilityNote: text,
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const siteSettingsSchema = z.object({
  siteName: z.string(),
  titleTemplate: z.string().default('%s | Site'),
  defaultDescription: text,
  defaultOgImage: z.string().nullish(),
  logo: z.string().nullish(),
  socialProfiles: z.array(z.string()).default([]),
  whatsappNumber: text,
  allergenNotice: text,
});

export type Link = z.infer<typeof linkSchema>;
export type Block = z.infer<typeof blockSchema>;
export type HeroProps = z.infer<typeof heroSchema>;
export type FeaturesProps = z.infer<typeof featuresSchema>;
export type CtaProps = z.infer<typeof ctaSchema>;
export type FaqProps = z.infer<typeof faqSchema>;
export type ProductGridProps = z.infer<typeof productGridSchema>;
export type CustomOrderProps = z.infer<typeof customOrderSchema>;
export type ContactProps = z.infer<typeof contactSchema>;
export type StepsProps = z.infer<typeof stepsSchema>;
export type PageData = z.infer<typeof pageSchema>;
export type ProductData = z.infer<typeof productSchema>;
export type SiteSettingsData = z.infer<typeof siteSettingsSchema>;
