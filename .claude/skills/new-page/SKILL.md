---
name: new-page
description: Add a new marketing page as CMS content, with correct slug, status and SEO fields. Use when asked to add, draft or publish a page. No code change is needed unless a new section type is required.
argument-hint: <url-path> [purpose]
---

# New page

Pages are content, not code. One catch-all route, `src/pages/[...slug].astro`, renders every published page.

## Steps

1. **Choose the slug.** Lowercase kebab-case, `/` for nesting: `pricing`, `services/web-design`. The home page is `home`. The file is `src/content/pages/<slug>.yaml`. Nested slugs create nested folders.
2. **Check sections.** Read `src/content/pages/home.yaml` for the stored shape and `src/cms/schemas.ts` for available block types. If a needed block does not exist, use the `new-section` skill first.
3. **Write the file** with:
   - `title`, `status: draft` (publish only when asked), optional `publishDate: 'YYYY-MM-DD'`
   - `seo`: `title` (60 characters or fewer), `description` (160 or fewer), `ogImage`, `canonical`, `noindex`, `schemaType`. Leave title and description empty only if the fallbacks are acceptable (page title with the site template, first hero subheadline).
   - `blocks`: ordered list of `{ discriminant, value }`
4. **Build:** `pnpm build`. The page appears under `dist/client/<slug>/index.html` only when `status: published` and the publish date has passed. Drafts do not build.
5. **Run `seo-check`** on the result.

## Notes

- Navigation lists published top-level pages automatically. Nested pages are reached from their parent.
- Renaming or deleting a published page needs a redirect. Redirects are planned for the growth phase, so tell the user rather than silently breaking the old URL.
- Editors normally create pages in the CMS at `/keystatic`. This skill is for when Claude does it directly.
