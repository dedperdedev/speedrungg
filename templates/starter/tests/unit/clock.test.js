import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createClock, advanceClock } from '../../src/core/clock.js';

test('clock starts at 0', () => {
  const c = createClock();
  assert.equal(c.now, 0);
});

test('advanceClock returns new clock with incremented time', () => {
  const c1 = createClock();
  const c2 = advanceClock(c1, 0.5);
  assert.equal(c2.now, 0.5);
  // Original is unchanged (immutable)
  assert.equal(c1.now, 0);
});

test('advanceClock chains correctly', () => {
  let c = createClock();
  c = advanceClock(c, 0.1);
  c = advanceClock(c, 0.2);
  c = advanceClock(c, 0.3);
  // Use tolerance for floating point
  assert.ok(Math.abs(c.now - 0.6) < 0.0001, `expected ~0.6, got ${c.now}`);
});

test('clock is deterministic - same advances → same result', () => {
  const c1 = advanceClock(advanceClock(createClock(), 0.5), 0.5);
  const c2 = advanceClock(advanceClock(createClock(), 0.5), 0.5);
  assert.equal(c1.now, c2.now);
});
