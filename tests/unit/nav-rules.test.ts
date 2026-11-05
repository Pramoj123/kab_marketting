import assert from 'node:assert/strict';
import { test } from 'node:test';
import { selectNavigation } from '../../src/lib/nav-rules.ts';
import { pageIdToPath, pageIdToSlug } from '../../src/lib/page-paths.ts';

const page = (id: string, title: string, placement: 'header' | 'footer' | 'hidden', order = 0) => ({
  id,
  data: { title, navigation: { placement, order } },
});

const pages = [
  page('home', 'Home', 'header'),
  page('menu', 'Menu', 'header', 1),
  page('faq', 'FAQ and delivery', 'header', 3),
  page('custom-order', 'Custom orders', 'header', 2),
  page('brownies', 'Brownies', 'footer'),
  page('brookies', 'Brookies', 'footer'),
  page('menu/specials', 'Specials', 'header'),
  page('secret', 'Secret', 'hidden'),
];

test('header lists top-level pages by order, leaving out home, nested and hidden pages', () => {
  assert.deepEqual(
    selectNavigation(pages, 'header').map((item) => item.label),
    ['Menu', 'Custom orders', 'FAQ and delivery'],
  );
});

test('equal order falls back to title, and links use trailing slashes', () => {
  assert.deepEqual(selectNavigation(pages, 'footer'), [
    { label: 'Brookies', href: '/brookies/' },
    { label: 'Brownies', href: '/brownies/' },
  ]);
});

test('home serves the root path', () => {
  assert.equal(pageIdToPath('home'), '/');
  assert.equal(pageIdToSlug('home'), undefined);
  assert.equal(pageIdToPath('menu'), '/menu/');
});
