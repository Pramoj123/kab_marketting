# KAB Marketing site

Astro 7 + Keystatic (git-based CMS) + Tailwind v4, deployed to Cloudflare Workers.
Architecture and rationale: `/home/node/.claude/plans/i-need-you-to-wiggly-umbrella.md`.
Conventions (names, styles, reuse, commits, branches): `docs/conventions.md`. Exact rules: `scripts/conventions.mjs`.

## Environment

- Node >= 22.23.4 (pinned in `.nvmrc`). In a fresh shell: `source "$NVM_DIR/nvm.sh" && nvm use`.
- Package manager: pnpm. Hooks are installed on `pnpm install`.

## Commands

- `pnpm dev` dev server (agents: `astro dev --background`, health at `/_astro/status`), CMS at `/keystatic`
- `pnpm build` production build, `pnpm preview` serve it
- `pnpm check` types and templates, `pnpm lint`, `pnpm format`
- `pnpm check:naming`, `pnpm check:styles`, `pnpm check:dup`, `pnpm test`
- `pnpm verify` runs everything CI runs

## Rules

- Never commit or push to `main`. Work on `<type>/<kebab-description>`, commit as `<type>(<scope>): <subject>`.
- No repeated styles. Classes live in `src/components/ui/*.variants.ts` (tailwind-variants). Sections, layouts and pages compose ui components. Colors, sizes and fonts come from tokens in `src/styles/global.css`.
- No repeated logic. Search `src/lib`, `src/cms` and `src/components/ui` before writing a helper. Logic goes in `src/lib/*.ts` with a test.
- Static by default. Only the Keystatic admin and API routes render on demand.
- `astro dev` runs on Node with no adapter, because Keystatic local mode needs the file system and the Cloudflare dev runtime (workerd) has none. The Cloudflare adapter applies to builds only (`astro.config.mjs`). Do not add the adapter to dev.
- A section exists in four places: `src/cms/schemas.ts`, `src/cms/keystatic/blocks.ts`, `src/components/sections/`, `BlockRenderer.astro`. Change them together.
- Never use `--no-verify`. Fix what the hook reports.
- Ask before adding dependencies.
- Library versions here are newer than model training data. Check current docs (Context7) before using an API.

## Skills

`/new-branch`, `/commit`, `/new-component`, `/new-section`, `/new-page`, `/reuse-audit`, `/seo-check`, `/conventions`. The `reviewer` agent checks a change before a pull request.

## Definition of done

`pnpm verify` passes and the change has been viewed in the running site.
