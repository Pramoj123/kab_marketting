import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  validateBranchName,
  validateCommitHeader,
  validateFilePath,
} from '../../scripts/conventions.mjs';

const passes = (validate, values) =>
  values.forEach((value) => assert.deepEqual(validate(value), [], `expected "${value}" to pass`));
const fails = (validate, values) =>
  values.forEach((value) =>
    assert.notDeepEqual(validate(value), [], `expected "${value}" to fail`),
  );

test('commit headers', () => {
  passes(validateCommitHeader, [
    'feat(ui): add button variants',
    'fix: handle empty slug',
    'content(content): publish pricing page',
    'refactor(sections)!: rename hero props',
    'Merge branch "main" into feat/x',
  ]);
  fails(validateCommitHeader, [
    'added a button',
    'feature(ui): add button',
    'feat(unknown): add button',
    'feat(ui): Add button',
    'feat(ui): add button.',
    `feat(ui): ${'x'.repeat(70)}`,
  ]);
});

test('branch names', () => {
  passes(validateBranchName, [
    'main',
    'feat/add-pricing-section',
    'fix/123-broken-nav',
    'content/spring-campaign',
  ]);
  fails(validateBranchName, ['feature/add-x', 'feat/Add-X', 'feat/add_x', 'add-pricing', 'feat/']);
});

test('file naming', () => {
  passes(validateFilePath, [
    'src/components/ui/Button.astro',
    'src/components/ui/button.variants.ts',
    'src/components/sections/Hero.astro',
    'src/pages/[...slug].astro',
    'src/pages/404.astro',
    'src/pages/robots.txt.ts',
    'src/lib/seo.ts',
    'src/env.d.ts',
    'src/content.config.ts',
    'tests/unit/seo.test.ts',
    'public/_redirects',
    'public/images/hero-image.jpg',
    '.claude/skills/new-component/SKILL.md',
    '.claude/agents/reviewer.md',
    'README.md',
  ]);
  fails(validateFilePath, [
    'src/components/ui/button.astro',
    'src/components/ui/Button.test.astro',
    'src/components/Ui/Button.astro',
    'src/lib/SeoHelpers.ts',
    'src/lib/seo_helpers.ts',
    'src/lib/seo.helpers.ts',
    'src/lib/robots.txt.ts',
    'src/pages/AboutUs.astro',
    'public/images/Hero.jpg',
    '.claude/skills/NewComponent/SKILL.md',
  ]);
});
