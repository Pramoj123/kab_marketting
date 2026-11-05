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
- Dev shows `undefined` for a field the build has (stale content cache after a schema change): `astro dev stop`, `rm -rf .astro node_modules/.astro`, start again.

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

## Design skills

Third-party design skills live in `.agents/skills/` and are symlinked into `.claude/skills/`. `.agents/` is git-ignored (about 38 MB); `skills-lock.json` records their sources so they can be reinstalled.

- `design-taste-frontend` (tasteskill): load it before any visual, layout, section or copy work on public pages.
- `claude`: editorial restraint (ivory ground, near-black ink, emphasis by type, not colour) and the structure for writing design guidance.

The theme and its rules: `docs/design-system.md`. Overrides that win over the skills in this repo:

- Take the skills' rules, never their kit. Do not copy `assets/`, `system.css`, `system.js` or `starter.html` into the project. Translate a rule into a token in `src/styles/global.css` or a variant in `src/components/ui/*.variants.ts`.
- Site kind is **product, site-kind other** (an online-only home bakery): photographs lead, flat grounds, no shader effects, scenes, moments, card loops or dark grounds.
- One deliberate exception: the aurora gradient (`bg-aurora`, `bg-aurora-band`), only in the hero and in one brand band per page.
- Fonts are Instrument Serif and Instrument Sans through the Astro Fonts API. Never use the Anthropic fonts or branding named in the `claude` skill.
- The skills' browser checkers (`consistency.mjs`, `check.mjs`, `shoot.mjs`) need Chrome, which this container does not have. Ask before adding it.

## Definition of done

`pnpm verify` passes and the change has been viewed in the running site.
