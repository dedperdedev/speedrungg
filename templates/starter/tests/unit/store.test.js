import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStore } from '../../src/core/store.js';

test('dispatch with a string-typed event applies reducer', () => {
  const store = createStore({ n: 0 }, (state, event) => {
    if (event.type === 'INC') return { n: state.n + 1 };
    return state;
  });
  store.dispatch({ type: 'INC' });
  store.dispatch({ type: 'INC' });
  assert.equal(store.getState().n, 2);
});

test('subscribers receive new state', () => {
  const store = createStore({ n: 0 }, (s, e) => e.type === 'INC' ? { n: s.n + 1 } : s);
  let seen = 0;
  store.subscribe(s => { seen = s.n; });
  store.dispatch({ type: 'INC' });
  assert.equal(seen, 1);
});

test('replay reproduces state from event log', () => {
  const reducer = (s, e) => e.type === 'INC' ? { n: s.n + 1 } : s;
  const store = createStore({ n: 0 }, reducer);
  store.dispatch({ type: 'INC' });
  store.dispatch({ type: 'INC' });
  store.dispatch({ type: 'INC' });
  const replayed = store.replay({ n: 0 }, store.getEventLog());
  assert.deepEqual(replayed, store.getState());
});

test('event without string type throws', () => {
  const store = createStore({}, s => s);
  assert.throws(() => store.dispatch({}), /string type/);
});
