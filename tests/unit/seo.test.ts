import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyTitleTemplate, buildSeo, serializeJsonLd, type SeoInput } from '../../src/lib/seo.ts';

const site: SeoInput['site'] = {
  siteName: 'Acme',
  titleTemplate: '%s | Acme',
  defaultDescription: 'Default description',
  defaultOgImage: '/images/default.png',
  logo: null,
  socialProfiles: [],
};

const emptySeo = { title: '', description: '', noindex: false, schemaType: 'WebPage' as const };

const input = (overrides: Partial<SeoInput> = {}): SeoInput => ({
  site,
  page: { title: 'About', seo: emptySeo, blocks: [] },
  path: '/about/',
  siteUrl: 'https://example.com',
  isProduction: true,
  ...overrides,
});

test('title template and fallbacks', () => {
  assert.equal(applyTitleTemplate('About', '%s | Acme'), 'About | Acme');
  assert.equal(applyTitleTemplate('About', 'Acme'), 'About | Acme');
  const seo = buildSeo(input());
  assert.equal(seo.title, 'About | Acme');
  assert.equal(seo.description, 'Default description');
  assert.equal(seo.canonical, 'https://example.com/about/');
  assert.equal(seo.openGraph.image, 'https://example.com/images/default.png');
});

test('home page uses the site name and skips breadcrumbs', () => {
  const seo = buildSeo(input({ path: '/' }));
  assert.equal(seo.title, 'Acme');
  assert.ok(!seo.jsonLd.some((entry) => entry['@type'] === 'BreadcrumbList'));
});

test('editor overrides win', () => {
  const page = {
    title: 'About',
    seo: {
      ...emptySeo,
      title: 'Custom',
      description: 'Custom description',
      canonical: 'https://example.com/x/',
    },
    blocks: [],
  };
  const seo = buildSeo(input({ page }));
  assert.equal(seo.title, 'Custom');
  assert.equal(seo.description, 'Custom description');
  assert.equal(seo.canonical, 'https://example.com/x/');
});

test('robots: noindex when flagged or outside production', () => {
  assert.equal(buildSeo(input()).robots, 'index, follow');
  assert.equal(buildSeo(input({ isProduction: false })).robots, 'noindex, nofollow');
  const page = { title: 'About', seo: { ...emptySeo, noindex: true }, blocks: [] };
  assert.equal(buildSeo(input({ page })).robots, 'noindex, nofollow');
});

test('description falls back to the hero subheadline', () => {
  const link = { label: '', href: '' };
  const hero = {
    discriminant: 'hero' as const,
    value: {
      headline: 'H',
      subheadline: 'From hero',
      primaryCta: link,
      secondaryCta: link,
      imageAlt: '',
    },
  };
  const page = { title: 'About', seo: emptySeo, blocks: [hero] };
  assert.equal(buildSeo(input({ page })).description, 'From hero');
});

test('FAQ blocks produce FAQPage structured data', () => {
  const faq = {
    discriminant: 'faq' as const,
    value: { heading: 'FAQ', items: [{ question: 'Q?', answer: 'A.' }] },
  };
  const page = { title: 'About', seo: emptySeo, blocks: [faq] };
  assert.ok(buildSeo(input({ page })).jsonLd.some((entry) => entry['@type'] === 'FAQPage'));
});

test('JSON-LD cannot close the script tag', () => {
  assert.ok(!serializeJsonLd({ name: '</script><script>alert(1)</script>' }).includes('<'));
});
