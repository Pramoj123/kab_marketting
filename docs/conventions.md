# Conventions

The exact rules live in `scripts/conventions.mjs`. Git hooks, Claude Code hooks, CI and tests all import that file, so this page and the enforcement cannot drift apart.

## Files and folders

| What                                                 | Rule                                                                                  | Example                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------ |
| Folders                                              | kebab-case                                                                            | `src/components/ui`, `src/cms/keystatic`   |
| Components (`.astro`, `.tsx`)                        | PascalCase, no extra extensions                                                       | `Button.astro`, `BlockRenderer.astro`      |
| Everything else in `src`, `scripts`, `tests`, `docs` | kebab-case                                                                            | `seo.ts`, `check-styles.mjs`               |
| Allowed middle extensions                            | `test`, `spec`, `config`, `d`, `variants`, `schema`                                   | `seo.test.ts`, `button.variants.ts`        |
| Routes in `src/pages`                                | kebab-case, `[param]` and `[...rest]` allowed, endpoints may use `txt`, `xml`, `json` | `[...slug].astro`, `robots.txt.ts`         |
| Content files                                        | kebab-case slugs, nested folders for nested URLs                                      | `src/content/pages/services/overview.yaml` |
| Public assets                                        | kebab-case                                                                            | `public/images/hero-image.jpg`             |
| Claude skills and agents                             | kebab-case folder or file, `SKILL.md` inside a skill                                  | `.claude/skills/new-section/SKILL.md`      |

Dotfiles and `public/_redirects` style names are exempt. Check with `pnpm check:naming`.

## Code naming

- Variables and functions `camelCase`, types and components `PascalCase`, module-level constants `SCREAMING_SNAKE_CASE`.
- Named exports only. Import with the `@/` alias for anything under `src/`, never `../../..`.
- One component per file. Props typed with an `interface Props`.

## Styles: nothing repeats

1. Raw colors, sizes and fonts exist only in the `@theme` block of `src/styles/global.css`.
2. Every visual pattern is a component in `src/components/ui/`, with its classes in a `*.variants.ts` file built with `tv()` from `tailwind-variants`.
3. Sections, layouts and pages compose ui components. They do not hold long class lists.
4. Need a new look? Add a variant to the existing component before creating a new one.

`pnpm check:styles` fails on: inline `style`, color literals outside tokens, arbitrary values like `w-[342px]`, two identical class lists anywhere, and more than 6 inline classes outside `src/components/ui`. A justified exception takes a `check-styles-ignore` comment on the line or the line above.

## Logic: reuse first

- Logic lives in `src/lib/*.ts` as small pure functions. Astro frontmatter only wires props to them.
- Shared CMS fields live in `src/cms/keystatic/fields.ts`. Shared schemas live in `src/cms/schemas.ts`.
- Before writing a helper, search `src/lib`, `src/cms` and `src/components/ui`.
- `pnpm check:dup` (jscpd) fails on copied blocks of 6 or more lines.

## Commits

Format: `<type>(<scope>): <subject>`. The scope is optional. Add `!` before the colon for a breaking change.

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `content`, `revert`.
- Scopes: `ui`, `sections`, `layouts`, `pages`, `cms`, `content`, `seo`, `styles`, `forms`, `analytics`, `config`, `deps`, `ci`, `tests`, `docs`, `claude`, `scripts`.
- Subject: imperative, starts lowercase, no trailing period. The whole first line is 72 characters or fewer.
- Use the body to explain why. Reference issues in a footer.
- `content` is for changes made through the CMS. It never touches code.

```
feat(ui): add button variants
fix(seo): escape angle brackets in json-ld
content(content): publish pricing page
refactor(sections)!: rename hero props
```

## Branches

Format: `<type>/<kebab-description>`, with an optional ticket number first. 60 characters or fewer.

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `content`, `hotfix`.
- `content/...` branches are the only ones the CMS lists, so editors never see code branches.
- `main` is protected. Nobody commits or pushes to it directly. Every change is a pull request.

```
feat/add-pricing-section
fix/123-broken-nav
content/spring-campaign
```

## Where each rule is enforced

| Rule                            | Claude Code hook                                 | Git hook                 | CI                     |
| ------------------------------- | ------------------------------------------------ | ------------------------ | ---------------------- |
| Commit format                   | before `git commit`                              | `commit-msg`, `pre-push` | every commit in the PR |
| Branch name, no commits on main | before `git commit`, `git switch -c` and similar | `pre-commit`, `pre-push` | PR branch name         |
| File names                      | after every Write or Edit                        | `pre-commit`             | `pnpm verify`          |
| Styles                          | after every Write or Edit                        | `pre-commit`             | `pnpm verify`          |
| Formatting                      | auto-fixed after every Write or Edit             | `pre-commit` check       | `pnpm verify`          |
| Duplicate logic                 | -                                                | -                        | `pnpm verify`          |

Hooks are installed by `pnpm install` (`prepare` sets `core.hooksPath` to `.githooks`). Never bypass them with `--no-verify`.
