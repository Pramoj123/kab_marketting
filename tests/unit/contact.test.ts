import assert from 'node:assert/strict';
import { test } from 'node:test';
import { instagramProfile } from '../../src/lib/contact.ts';

test('prefers the Instagram profile, then the first, then nothing', () => {
  const insta = 'https://www.instagram.com/kookiesandbrookies';
  assert.equal(instagramProfile(['https://facebook.com/x', insta]), insta);
  assert.equal(instagramProfile(['https://facebook.com/x']), 'https://facebook.com/x');
  assert.equal(instagramProfile([]), undefined);
});
