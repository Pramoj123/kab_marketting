// Zod schemas for CMS content. Source of truth for what the site accepts at build time.
// Keep in sync with src/cms/keystatic/*. A mismatch fails `pnpm build`.
import { z } from 'astro/zod';

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
  headline: z.string(),
  subheadline: text,
  primaryCta: linkSchema,
  secondaryCta: linkSchema,
  image: z.string().nullish(),
  imageAlt: text,
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

export const blockSchema = z.discriminatedUnion('discriminant', [
  z.object({ discriminant: z.literal('hero'), value: heroSchema }),
  z.object({ discriminant: z.literal('features'), value: featuresSchema }),
  z.object({ discriminant: z.literal('cta'), value: ctaSchema }),
  z.object({ discriminant: z.literal('faq'), value: faqSchema }),
]);

export const pageSchema = z.object({
  title: z.string(),
  status: z.enum(['draft', 'published']).default('draft'),
  publishDate: z.string().nullish(),
  seo: seoSchema,
  blocks: z.array(blockSchema).default([]),
});

export const siteSettingsSchema = z.object({
  siteName: z.string(),
  titleTemplate: z.string().default('%s | Site'),
  defaultDescription: text,
  defaultOgImage: z.string().nullish(),
  logo: z.string().nullish(),
  socialProfiles: z.array(z.string()).default([]),
});

export type Link = z.infer<typeof linkSchema>;
export type Block = z.infer<typeof blockSchema>;
export type HeroProps = z.infer<typeof heroSchema>;
export type FeaturesProps = z.infer<typeof featuresSchema>;
export type CtaProps = z.infer<typeof ctaSchema>;
export type FaqProps = z.infer<typeof faqSchema>;
export type PageData = z.infer<typeof pageSchema>;
export type SiteSettingsData = z.infer<typeof siteSettingsSchema>;
