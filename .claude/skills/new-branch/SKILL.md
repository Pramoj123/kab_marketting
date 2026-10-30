---
name: new-branch
description: Start work on a correctly named branch. Use before making changes when on main, when starting a new task, or when asked to create a branch.
argument-hint: <type> <short description>
---

# New branch

Format: `<type>/<kebab-description>`, optional ticket number first (`fix/123-broken-nav`). 60 characters or fewer.

## Steps

1. `git status`. If there are uncommitted changes that belong to other work, stop and ask.
2. Pick the type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, content, hotfix.
   - `content/...` is for CMS edits only. Keystatic lists only branches with this prefix.
3. Make the description 2 to 5 words, lowercase, hyphen separated, saying what the change does: `add-pricing-section`, not `updates` or `my-branch`.
4. Create it from an up-to-date main: `git switch main && git pull --ff-only` (skip if there is no remote), then `git switch -c <type>/<description>`.
5. Never push to `main`. Open a pull request from the branch.

The pre-bash hook rejects invalid names with the expected format, so a rejection tells you what to change.
