---
name: new-section
description: Add a new page section type that editors can use in the CMS. Touches the Zod schema, the Keystatic block, the section component and the block renderer together. Use when the site needs a new kind of page block such as pricing, testimonials or logos.
argument-hint: <section-name> [fields]
---

# New CMS section

A section exists in four places that must stay in sync. Do all four in one change.

## Steps

1. **Check for reuse.** Read `src/components/sections/` and `src/cms/schemas.ts`. Can an existing section do this with different content? If so, stop and use it.
2. **Zod schema** in `src/cms/schemas.ts`:
   - add `<name>Schema` (reuse `linkSchema`, `text`, existing shapes)
   - add `z.object({ discriminant: z.literal('<name>'), value: <name>Schema })` to `blockSchema`
   - export `type <Name>Props = z.infer<typeof <name>Schema>`
3. **Keystatic block** in `src/cms/keystatic/blocks.ts`: add the same key to `pageBlocks` with `label`, `itemLabel` and an `fields.object`. Build it from helpers in `src/cms/keystatic/fields.ts` (`linkField`, `imageField`). Field names and shapes must match the Zod schema exactly.
4. **Component** `src/components/sections/<Name>.astro` (PascalCase) with `type Props = <Name>Props`. Compose ui components only (`Section`, `Container`, `Stack`, `Grid`, `Heading`, `Text`, `Card`, `Button`). If you need a new visual pattern, use the `new-component` skill first.
5. **Renderer:** import it in `src/components/sections/BlockRenderer.astro` and add a `case '<name>'`.
6. **Seed content:** add one block to `src/content/pages/home.yaml` so the build exercises it. Stored shape is `{ discriminant: <name>, value: { ... } }`.
7. **Verify:** `pnpm check && pnpm build`. A schema mismatch fails the build with the offending file and field.

## Pitfalls

- Empty Keystatic text fields are stored as `''`, empty links as `{ label: '', href: '' }`. Components must check `label && href` before rendering a button.
- Images are stored as a public path string or `null`.
- Never put markup logic in the component frontmatter that another section also needs. Move it to `src/lib/`.
