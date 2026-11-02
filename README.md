# KAB Marketing

Marketing website. Astro 7, Keystatic (content stored as files in this repo), Tailwind CSS v4, Cloudflare Workers.

## Setup

```bash
source "$NVM_DIR/nvm.sh" && nvm use   # Node from .nvmrc
pnpm install                          # also installs the git hooks
cp .env.example .env
pnpm dev                              # site at http://localhost:4321, CMS at /keystatic
```

## Everyday commands

| Command                       | What it does                                                              |
| ----------------------------- | ------------------------------------------------------------------------- |
| `pnpm dev`                    | Dev server with the CMS in local mode                                     |
| `pnpm build` / `pnpm preview` | Production build, then serve it                                           |
| `pnpm verify`                 | Format, lint, naming, styles, duplicates, tests, types, build. Same as CI |

## Content

Pages and site settings are edited in the CMS at `/keystatic` and saved as YAML under `src/content/`. A page with `status: published` gets its URL on the next build. In production the CMS commits to branches that start with `content/`.

## Working on the code

Read `docs/conventions.md` first. In short: branch as `<type>/<description>`, commit as `<type>(<scope>): <subject>`, put every style in a ui component variant, and reuse before writing new code. Hooks check all of this.

Using Claude Code? The repo ships skills (`/new-section`, `/new-page`, `/commit`, `/seo-check` and more) and hooks in `.claude/`.
