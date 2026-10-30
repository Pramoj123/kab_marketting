---
name: new-component
description: Create or extend a reusable ui component with tailwind-variants, following the no-repeated-styles rule. Use when a section, page or layout needs a visual pattern that is not covered by src/components/ui.
argument-hint: <ComponentName> [what it looks like]
---

# New ui component

Goal: no class list is ever written twice. Styles live in one variants file, components compose them.

## Steps

1. **Look first.** Read `src/components/ui/index.ts` and the `*.variants.ts` files. If an existing component covers the need, use it. If it nearly covers it, add a variant instead of a new component.
2. **Pick the variants file.** Put the new `tv()` definition in the file that fits (`layout.variants.ts`, `surface.variants.ts`) or create `<name>.variants.ts` for a larger component. Export the variants type with `VariantProps`.
3. **Use tokens only.** Utilities such as `bg-brand-600`, `text-ink-muted`, `py-section`, `rounded-card`. Missing token? Add it to the `@theme` block in `src/styles/global.css` and say so. Never a hex value, never `w-[342px]`.
4. **Create `src/components/ui/<Name>.astro`** (PascalCase) following `Button.astro`:
   - `interface Props extends <Name>Variants { class?: string }`
   - compute classes in the frontmatter with the variants function, passing `class` through so callers can extend
   - render `<slot />` for children
5. **Export it** from `src/components/ui/index.ts` (keep alphabetical).
6. **Use it** from the section or page that needed it. Callers pass props, not class lists.
7. **Verify:** `pnpm check:styles && pnpm check && pnpm check:dup`.

## Rules the hooks enforce

- No `style=`, no color literals, no arbitrary values.
- No identical class list in two places, including inside `*.variants.ts`.
- Outside `src/components/ui`, a `class` attribute holds at most 6 utilities.
- React islands live in `src/components/islands/`, reuse the same `*.variants.ts` through `className={button({ ... })}`.
