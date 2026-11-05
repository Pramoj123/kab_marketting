import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { THEME_TOKENS } from '../../src/components/ui/theme-tokens.ts';
import { tv } from '../../src/components/ui/tv.ts';

const css = readFileSync(new URL('../../src/styles/global.css', import.meta.url), 'utf8');

// Collects `--<namespace>-<name>:` declarations, ignoring companions like `--text-h1--line-height`.
const declared = (namespace: string) =>
  [...css.matchAll(new RegExp(`--${namespace}-([a-z0-9-]+?):`, 'g'))]
    .map((match) => match[1])
    .filter((name) => name !== '*' && !name.includes('--'));

test('merge config lists every custom token in global.css', () => {
  for (const [namespace, names] of Object.entries(THEME_TOKENS)) {
    assert.deepEqual([...names].sort(), declared(namespace).sort(), `--${namespace}-* tokens`);
  }
});

test('custom font sizes survive next to text colours', () => {
  const label = tv({ base: 'text-label font-medium text-ink' });
  assert.equal(label(), 'text-label font-medium text-ink');
});

test('a later token of the same group still wins', () => {
  const control = tv({ base: 'h-control-sm', variants: { size: { md: 'h-control' } } });
  assert.equal(control({ size: 'md' }), 'h-control');
});
