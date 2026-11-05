import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  categoryLabel,
  describeProduct,
  formatLeadTime,
  groupByCategory,
  isOrderable,
  selectProducts,
  sortProducts,
} from '../../src/lib/product-rules.ts';
import { isPublished } from '../../src/lib/publishing.ts';

const product = (name: string, category: 'brownies' | 'cupcakes', order = 0) => ({
  name,
  category,
  order,
});

test('category labels, with a fallback to the raw value', () => {
  assert.equal(categoryLabel('mini-cookies'), 'Mini cookies');
  assert.equal(categoryLabel('bento-cakes'), 'Bento cakes');
});

test('only available products can be ordered', () => {
  assert.equal(isOrderable({ availability: 'available' }), true);
  assert.equal(isOrderable({ availability: 'sold-out' }), false);
  assert.equal(isOrderable({ availability: 'paused' }), false);
});

test('lead time wording', () => {
  assert.equal(formatLeadTime(0), '');
  assert.equal(formatLeadTime(1), 'Order 1 day ahead');
  assert.equal(formatLeadTime(2), 'Order 2 days ahead');
});

test('sorts by order then name without changing the input', () => {
  const input = [
    product('Zesty', 'brownies', 1),
    product('Fudge', 'brownies', 1),
    product('Nutty', 'brownies', 0),
  ];
  assert.deepEqual(
    sortProducts(input).map((item) => item.name),
    ['Nutty', 'Fudge', 'Zesty'],
  );
  assert.equal(input[0]?.name, 'Zesty');
});

test('groups in menu order and skips empty categories', () => {
  const groups = groupByCategory([
    product('Vanilla cupcake', 'cupcakes'),
    product('Fudge', 'brownies', 2),
    product('Walnut', 'brownies', 1),
  ]);
  assert.deepEqual(
    groups.map((group) => group.label),
    ['Brownies', 'Cupcakes'],
  );
  assert.deepEqual(
    groups[0]?.products.map((item) => item.name),
    ['Walnut', 'Fudge'],
  );
});

test('selects by category and featured flag', () => {
  const items = [
    { name: 'A', category: 'brownies' as const, featured: true },
    { name: 'B', category: 'brownies' as const, featured: false },
    { name: 'C', category: 'cupcakes' as const, featured: true },
  ];
  const names = (filter: Parameters<typeof selectProducts>[1]) =>
    selectProducts(items, filter).map((item) => item.name);
  assert.deepEqual(names({ category: 'all', featuredOnly: false }), ['A', 'B', 'C']);
  assert.deepEqual(names({ category: 'brownies', featuredOnly: false }), ['A', 'B']);
  assert.deepEqual(names({ category: 'all', featuredOnly: true }), ['A', 'C']);
  assert.deepEqual(names({ category: 'cupcakes', featuredOnly: true }), ['C']);
});

test('describes a product for its card', () => {
  const base = {
    diet: 'eggless' as const,
    leadTimeDays: 2,
    flavours: ['Biscoff', 'Nutella'],
    sizes: [],
    availability: 'available' as const,
    availabilityNote: '',
  };
  const card = describeProduct(base);
  assert.deepEqual(card.tags, [
    { label: 'Eggless', tone: 'neutral' },
    { label: 'Order 2 days ahead', tone: 'brand' },
  ]);
  assert.deepEqual(card.details, [{ label: 'Flavours', value: 'Biscoff, Nutella' }]);
  assert.equal(card.statusLabel, '');
});

test('status label for unavailable products includes the note', () => {
  const base = {
    diet: 'egg' as const,
    leadTimeDays: 0,
    flavours: [],
    sizes: [],
    availabilityNote: '',
  };
  assert.equal(describeProduct({ ...base, availability: 'sold-out' }).statusLabel, 'Sold out');
  assert.equal(
    describeProduct({ ...base, availability: 'paused', availabilityNote: ' Back on Friday ' })
      .statusLabel,
    'Paused. Back on Friday',
  );
  assert.equal(describeProduct({ ...base, availability: 'sold-out' }).tags.length, 1);
});

test('published means status published and not scheduled for later', () => {
  const now = new Date('2026-06-01');
  assert.equal(isPublished({ status: 'draft' }, now), false);
  assert.equal(isPublished({ status: 'published' }, now), true);
  assert.equal(isPublished({ status: 'published', publishDate: '2026-05-01' }, now), true);
  assert.equal(isPublished({ status: 'published', publishDate: '2026-07-01' }, now), false);
});
