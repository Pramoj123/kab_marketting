---
name: commit
description: Create a git commit that follows the repo format and passes the hooks. Use whenever asked to commit or save work to git.
argument-hint: [optional summary hint]
---

# Commit

Rules: `docs/conventions.md` (Commits). Exact types and scopes: `scripts/conventions.mjs`.

## Steps

1. `git status` and `git diff` to see what is changing. Never use `git add -A` blindly: stage specific files, skip anything that looks like a secret or build output.
2. **Branch check.** If on `main`, stop and use the `new-branch` skill first. The hooks block commits on `main`.
3. **Run the checks** that fit the change: `pnpm verify` for broad changes, otherwise at least `pnpm check:styles && pnpm check:naming && pnpm test`.
4. **One logical change per commit.** If the diff mixes a refactor and a feature, split it.
5. **Write the header:** `<type>(<scope>): <subject>`
   - type from: feat, fix, docs, style, refactor, perf, test, build, ci, chore, content, revert
   - scope from: ui, sections, layouts, pages, cms, content, seo, styles, forms, analytics, config, deps, ci, tests, docs, claude, scripts (optional)
   - subject: imperative, lowercase start, no period, header 72 characters or fewer
   - `!` before the colon for a breaking change, with a `BREAKING CHANGE:` footer
6. **Body** (optional): explain why, not what.
7. Commit with the message via a heredoc. End with the attribution trailer when the session provides one.
8. If a hook fails, fix the cause and make a new commit. Never use `--no-verify`, never amend a commit that failed its hook.

## Type picker

- `feat` new capability visible to users or editors, `fix` bug fix
- `refactor` no behavior change, `perf` faster, `style` formatting only
- `content` changes made through the CMS only, `docs`, `test`, `build` (deps, bundler), `ci`, `chore`
