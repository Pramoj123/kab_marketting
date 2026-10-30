---
name: conventions
description: Naming, styling, reuse, commit and branch rules for this repo. Use before creating any file, folder, component, branch or commit, or when a hook reports a convention violation.
---

# Repo conventions

Full reference: `docs/conventions.md`. Exact rules: `scripts/conventions.mjs`. Do not restate or invent rules, read those files.

## Before creating anything

1. Search for an existing thing first: `src/components/ui`, `src/lib`, `src/cms/keystatic/fields.ts`, `src/cms/schemas.ts`.
2. Name it correctly: folders kebab-case, components PascalCase (`Button.astro`), everything else kebab-case (`seo.ts`, `button.variants.ts`).
3. Styles go in a `*.variants.ts` file next to a ui component. Colors, sizes and fonts only come from tokens in `src/styles/global.css`.
4. Logic goes in `src/lib/*.ts` as a small pure function, with a unit test in `tests/unit/`.

## Hooks you will meet

- After every Write or Edit, the post-edit hook formats the file and checks its name and styles. Exit message lists what to fix. Fix the cause, do not add `check-styles-ignore` unless the exception is justified and commented.
- Before `git commit`, `git switch -c` and similar, the pre-bash hook validates the message and branch name and blocks commits on `main`.

## Quick answers

- Commit: `<type>(<scope>): <subject>`, for example `feat(ui): add button variants`. Use the `commit` skill.
- Branch: `<type>/<kebab-description>`, for example `feat/add-pricing-section`. Use the `new-branch` skill.
- Import with `@/`, named exports only.
