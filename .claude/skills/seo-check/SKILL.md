---
name: seo-check
description: Audit built pages for SEO problems (title, description, canonical, robots, headings, structured data, sitemap). Use after adding or changing pages, sections or SEO fields, and before a release.
---

# SEO check

SEO is driven from CMS fields with fallbacks, built by `src/lib/seo.ts` and rendered by `src/components/layout/Seo.astro`.

## Steps

1. `pnpm build`. Output is in `dist/client/`.
2. For every built `index.html` verify:
   - exactly one `<title>`, unique across the site, about 60 characters or fewer
   - one `meta name="description"`, 160 characters or fewer, not the site default on every page
   - `link rel="canonical"` is an absolute URL using `SITE_URL`
   - `meta name="robots"` is `index, follow` in production and `noindex, nofollow` otherwise or when `seo.noindex` is set
   - exactly one `<h1>`, and heading levels do not skip
   - `og:title`, `og:description`, `og:url`, and `og:image` when an image exists
   - JSON-LD scripts parse as JSON and match the page: Organization, WebSite, the page type, BreadcrumbList on non-home pages, FAQPage when an FAQ section exists
   - images have meaningful `alt`
3. `dist/client/sitemap-index.xml` lists every published, indexable page and no drafts. `robots.txt` points at the sitemap in production and disallows all otherwise.
4. Report findings per page with the field to change (a CMS field, or code in `src/lib/seo.ts`). Fix code problems. For content problems, tell the user which entry and field.
5. If you repeat a check by hand more than once, add it as a test in `tests/unit/`.

## Known gaps

- The sitemap does not yet exclude `noindex` pages. Handle this in the growth phase.
- Redirects and generated social images are not implemented yet.
