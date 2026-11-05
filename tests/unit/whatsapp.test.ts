import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  customOrderMessage,
  normalizePhone,
  orderMessage,
  whatsappLink,
} from '../../src/lib/whatsapp.ts';

test('normalises phone numbers and adds the default country code', () => {
  assert.equal(normalizePhone('+91 98765 43210'), '919876543210');
  assert.equal(normalizePhone('98765 43210'), '919876543210');
  assert.equal(normalizePhone('098765 43210'), '919876543210');
  assert.equal(normalizePhone('+44 7700 900123'), '447700900123');
});

test('rejects numbers that cannot be real', () => {
  assert.equal(normalizePhone(''), '');
  assert.equal(normalizePhone('12345'), '');
  assert.equal(normalizePhone('1'.repeat(16)), '');
});

test('builds an encoded wa.me link', () => {
  assert.equal(
    whatsappLink('+91 98765 43210', "Hi! I'd like to order the Biscoff Brownie box"),
    "https://wa.me/919876543210?text=Hi!%20I'd%20like%20to%20order%20the%20Biscoff%20Brownie%20box",
  );
  assert.equal(whatsappLink('', 'Hi'), null);
});

test('order message names the product', () => {
  assert.equal(
    orderMessage('Biscoff Brownie box'),
    "Hi! I'd like to order the Biscoff Brownie box",
  );
});

test('custom order message lists only filled-in fields', () => {
  const message = customOrderMessage({
    occasion: 'Birthday',
    date: '2026-12-05',
    size: '  ',
    message: 'Happy 30th, Asha',
  });
  assert.equal(
    message,
    "Hi! I'd like to place a custom order.\nOccasion: Birthday\nNeeded on: 2026-12-05\nMessage on the cake: Happy 30th, Asha",
  );
  assert.equal(customOrderMessage({}), "Hi! I'd like to place a custom order.");
});
