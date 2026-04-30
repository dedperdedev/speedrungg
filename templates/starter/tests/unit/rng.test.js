import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRng } from '../../src/core/rng.js';

test('same seed → same sequence (determinism)', () => {
  const a = createRng(42);
  const b = createRng(42);
  for (let i = 0; i < 100; i++) {
    assert.equal(a.next(), b.next());
  }
});

test('different seeds → different sequences', () => {
  const a = createRng(1);
  const b = createRng(2);
  let same = 0;
  for (let i = 0; i < 100; i++) {
    if (a.next() === b.next()) same++;
  }
  assert.ok(same < 5, 'expected few collisions, got ' + same);
});

test('int respects min/max', () => {
  const r = createRng(1);
  for (let i = 0; i < 1000; i++) {
    const n = r.int(5, 10);
    assert.ok(n >= 5 && n < 10);
  }
});
