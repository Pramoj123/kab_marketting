import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { scanStyles } from '../../scripts/check-styles.mjs';

function scan(files) {
  const root = mkdtempSync(join(tmpdir(), 'styles-'));
  try {
    for (const [path, content] of Object.entries(files)) {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), content);
    }
    return scanStyles(root).map((issue) => issue.rule);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('flags inline styles, color literals and arbitrary values', () => {
  const rules = scan({
    'src/components/sections/Bad.astro':
      '<div style="color: red" class="w-[342px] bg-[#fff]">x</div>\n<p class="text-[#123456]">y</p>',
    'src/styles/global.css': '@theme { --color-x: #123456; }',
  });
  assert.ok(rules.includes('no-inline-style'));
  assert.ok(rules.includes('no-arbitrary-value'));
  assert.ok(rules.includes('no-color-literal'));
});

test('flags identical class lists in two places', () => {
  const rules = scan({
    'src/components/sections/One.astro': '<div class="flex gap-4 p-4">a</div>',
    'src/components/sections/Two.astro': '<div class="p-4 flex gap-4">b</div>',
  });
  assert.equal(rules.filter((rule) => rule === 'no-duplicate-classes').length, 2);
});

test('flags long inline class lists outside ui', () => {
  const longClasses = 'a1 a2 a3 a4 a5 a6 a7';
  assert.ok(
    scan({ 'src/pages/long.astro': `<div class="${longClasses}">x</div>` }).includes(
      'extract-component',
    ),
  );
  assert.ok(
    !scan({ 'src/components/ui/Long.astro': `<div class="${longClasses}">x</div>` }).includes(
      'extract-component',
    ),
  );
});

test('allows token utilities, short lists and ignore comments', () => {
  const rules = scan({
    'src/components/sections/Ok.astro':
      '<div class="mt-4 text-ink">a</div>\n<!-- check-styles-ignore -->\n<div style="--x: 1">b</div>',
  });
  assert.deepEqual(rules, []);
});
