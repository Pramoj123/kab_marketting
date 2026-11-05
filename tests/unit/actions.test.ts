import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  MAIN_ACTION_LABEL,
  MENU_ACTION,
  isExternal,
  mainAction,
  orderAction,
  resolveLink,
  resolveActions,
} from '../../src/lib/actions.ts';

const NUMBER = '+91 98765 43210';

test('main action opens WhatsApp when a number is set', () => {
  const action = mainAction(NUMBER);
  assert.equal(action.label, MAIN_ACTION_LABEL);
  assert.ok(action.href.startsWith('https://wa.me/919876543210?text='));
});

test('main action falls back to the menu without a number', () => {
  assert.deepEqual(mainAction(''), MENU_ACTION);
});

test('CMS links: blanks dropped, whatsapp resolved, repeats removed', () => {
  const links = [
    { label: 'Order on WhatsApp', href: 'whatsapp' },
    { label: 'See the menu', href: '/menu/' },
    { label: '', href: '' },
  ];
  assert.deepEqual(resolveActions(links, ''), [MENU_ACTION]);
  const withNumber = resolveActions(links, NUMBER);
  assert.equal(withNumber.length, 2);
  assert.equal(withNumber[0].label, MAIN_ACTION_LABEL);
  assert.equal(withNumber[1].href, '/menu/');
});

test('order action exists only once a number is set', () => {
  assert.equal(orderAction(''), null);
  assert.equal(orderAction(NUMBER)?.label, MAIN_ACTION_LABEL);
});

test('a single CMS link resolves the whatsapp keyword or is dropped when blank', () => {
  assert.equal(resolveLink({ label: '', href: '' }, NUMBER), null);
  assert.deepEqual(resolveLink({ label: 'Order now', href: 'whatsapp' }, ''), MENU_ACTION);
  assert.deepEqual(resolveLink({ label: 'Menu', href: '/menu/' }, ''), {
    label: 'Menu',
    href: '/menu/',
  });
});

test('external links are detected', () => {
  assert.ok(isExternal('https://wa.me/1'));
  assert.ok(!isExternal('/menu/'));
});
