// Pure SEO builder. Every field has a fallback so editors only override what they need.
import type { Block, PageData, SiteSettingsData } from '../cms/schemas';

export interface SeoInput {
  site: SiteSettingsData;
  page: Pick<PageData, 'title' | 'seo' | 'blocks'>;
  path: string;
  siteUrl: string;
  isProduction: boolean;
}

export interface SeoData {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  openGraph: { title: string; description: string; url: string; image?: string; siteName: string };
  jsonLd: Record<string, unknown>[];
}

const clean = (value?: string | null) => value?.trim() || undefined;

export const absoluteUrl = (path: string, siteUrl: string) => new URL(path, siteUrl).toString();

export function applyTitleTemplate(title: string, template: string) {
  return template.includes('%s') ? template.replace('%s', title) : `${title} | ${template}`;
}

function summaryFromBlocks(blocks: Block[]) {
  const hero = blocks.find((block) => block.discriminant === 'hero');
  return hero?.discriminant === 'hero' ? clean(hero.value.subheadline) : undefined;
}

function breadcrumbs(path: string, title: string, siteUrl: string) {
  const segments = path.split('/').filter(Boolean);
  const items = segments.map((segment, index) => ({
    '@type': 'ListItem',
    position: index + 2,
    name: index === segments.length - 1 ? title : segment.replace(/-/g, ' '),
    item: absoluteUrl(`/${segments.slice(0, index + 1).join('/')}/`, siteUrl),
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/', siteUrl) },
      ...items,
    ],
  };
}

function faqPage(blocks: Block[]) {
  const questions = blocks.flatMap((block) =>
    block.discriminant === 'faq'
      ? block.value.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        }))
      : [],
  );
  return questions.length > 0
    ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: questions }
    : undefined;
}

export function buildSeo({ site, page, path, siteUrl, isProduction }: SeoInput): SeoData {
  const isHome = path === '/';
  const title =
    clean(page.seo.title) ??
    (isHome ? site.siteName : applyTitleTemplate(page.title, site.titleTemplate));
  const description =
    clean(page.seo.description) ?? summaryFromBlocks(page.blocks) ?? site.defaultDescription;
  const canonical = clean(page.seo.canonical) ?? absoluteUrl(path, siteUrl);
  const imagePath = clean(page.seo.ogImage) ?? clean(site.defaultOgImage);
  const hidden = page.seo.noindex || !isProduction;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.siteName,
      url: absoluteUrl('/', siteUrl),
      ...(clean(site.logo) && { logo: absoluteUrl(site.logo as string, siteUrl) }),
      ...(site.socialProfiles.length > 0 && { sameAs: site.socialProfiles }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.siteName,
      url: absoluteUrl('/', siteUrl),
    },
    {
      '@context': 'https://schema.org',
      '@type': page.seo.schemaType,
      name: page.title,
      url: canonical,
      description,
    },
    ...(isHome ? [] : [breadcrumbs(path, page.title, siteUrl)]),
    ...[faqPage(page.blocks)].filter((entry) => entry !== undefined),
  ];

  return {
    title,
    description,
    canonical,
    robots: hidden ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title,
      description,
      url: canonical,
      image: imagePath && absoluteUrl(imagePath, siteUrl),
      siteName: site.siteName,
    },
    jsonLd,
  };
}

/** Serializes JSON-LD for a script tag. Escapes "<" so editor content cannot close the tag. */
export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
