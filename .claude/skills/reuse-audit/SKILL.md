---
name: reuse-audit
description: Find and remove repeated styles and duplicated logic, then extract shared components or helpers. Use after adding several sections or pages, before a pull request, or when asked to clean up duplication.
---

# Reuse audit

## Steps

1. **Run the detectors:** `pnpm check:styles` and `pnpm check:dup`. Fix every finding.
2. **Fixing repeated classes** (`no-duplicate-classes`, `extract-component`): add or extend a component in `src/components/ui/` using the `new-component` skill, then replace each occurrence with the component.
3. **Fixing duplicated code blocks** (jscpd output lists both locations): move the shared part to a function in `src/lib/` (or `src/cms/keystatic/fields.ts` for CMS fields), import it in both places, add a unit test in `tests/unit/` if it holds logic.
4. **Look for what the tools miss:**
   - similar but not identical class lists across sections: compare them, they usually want one variant
   - the same fallback or filter logic in two components: belongs in `src/lib`
   - the same Keystatic field shape twice: add a builder to `src/cms/keystatic/fields.ts`
   - the same Zod shape twice: extract a named schema in `src/cms/schemas.ts`
5. **Verify:** `pnpm verify`. Behavior must be unchanged, so also compare `pnpm build` output pages before and after if sections changed.

Do not silence a finding with `check-styles-ignore` or by raising jscpd limits. Those are for justified exceptions, not for avoiding the extraction.
