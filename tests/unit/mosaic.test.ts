import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mosaicLayout, mosaicShapes, shapeCells } from '../../src/lib/mosaic.ts';

test('one shape per item', () => {
  for (let count = 0; count <= 20; count++) assert.equal(mosaicShapes(count).length, count);
});

test('every count fills whole 4-column rows', () => {
  for (let count = 1; count <= 20; count++) {
    const cells = mosaicShapes(count).reduce((sum, shape) => sum + shapeCells(shape), 0);
    assert.equal(cells % 4, 0, `${count} items leave a gap`);
  }
});

test('groups start with a feature tile', () => {
  assert.deepEqual(mosaicShapes(3), ['feature', 'tall', 'tall']);
  assert.deepEqual(mosaicShapes(5), ['feature', 'tile', 'tile', 'tile', 'tile']);
  assert.deepEqual(mosaicShapes(6), ['feature', 'tall', 'tall', 'feature', 'tall', 'tall']);
  assert.deepEqual(mosaicShapes(1), ['wide']);
});

test('every second group of three mirrors its feature to the right', () => {
  assert.deepEqual(
    mosaicLayout(3, 0).map((tile) => tile.last),
    [false, false, false],
  );
  assert.deepEqual(
    mosaicLayout(3, 1).map((tile) => tile.last),
    [true, false, false],
  );
  // Other sizes never mirror: moving their feature would leave a gap.
  assert.ok(mosaicLayout(5, 1).every((tile) => !tile.last));
});
