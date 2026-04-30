---
name: pure-reducers
description: "Use when writing or reviewing gameplay reducers. Pure function discipline: same input same output, no side effects, no mutation, no async."
---

# Pure Reducers — The Discipline

Pure functions are the foundation of determinism, testability, and replay. Every reducer in `src/gameplay/**` must be pure.

## Definition

A reducer is **pure** if and only if:

1. **Same input → same output** every time
2. **No side effects** (no console.log, no I/O, no DOM, no audio, no network, no random)
3. **Doesn't mutate inputs** (returns new state, doesn't modify the passed-in state)
4. **Doesn't depend on external state** (no globals, no `Date.now()`, no `Math.random()`)

## Forbidden in reducers

```js
// ALL of these break purity:
function badReducer(state, event) {
  console.log(event);                       // side effect
  audio.play('hit');                        // side effect
  state.score += 10;                        // mutation
  const r = Math.random();                  // non-deterministic
  const t = Date.now();                     // non-deterministic
  fetch('/api/save').then(...);             // async + side effect + mutation
  document.querySelector('#hp').textContent = state.hp;  // DOM
  return state;
}
```

## How to do each forbidden thing correctly

### Logging
- Don't log inside reducer. Log in a subscription.
- ```js
  store.subscribe((state, event) => {
    if (DEBUG) console.log('event:', event);
  });
  ```

### Audio
- Don't play in reducer. Subscribe and play.
- ```js
  store.subscribe((state, event) => {
    if (event?.type === 'COIN_PICKED') audio.play('coin');
  });
  ```

### Random
- Use seeded RNG from state.
- ```js
  function spawnEnemy(state, event) {
    const [rng, x] = state.rng.range(0, 800);
    const [rng2, y] = rng.range(0, 600);
    return {
      ...state,
      rng: rng2,
      enemies: [...state.enemies, { x, y }],
    };
  }
  ```

### Time
- Use `state.clock.now`, advanced by the game loop.
- ```js
  function advanceClock(state, event) {
    if (event.type !== 'TICK') return state;
    return {
      ...state,
      clock: { now: state.clock.now + event.payload.dt },
    };
  }
  ```

### Network
- Async result becomes an event. Reducer is sync.
- ```js
  // outside reducer
  fetch('/api/save').then((res) =>
    store.dispatch({ type: 'SAVE_COMPLETED', payload: res })
  );
  ```

## Mutation vs reference equality

JavaScript reducers can either:

### A. Strict immutability (verbose, allocations)
```js
return { ...state, player: { ...state.player, x: state.player.x + 1 } };
```

### B. Mutable-but-disciplined (faster, requires care)
```js
const next = state;  // mutate the same object
next.player.x += 1;
return next;         // same reference, but state.player changed
```

For high-perf web games, **B is acceptable IF**:

- Subscribers diff what they care about (don't rely on `===` to detect change)
- Event log captures events, not state snapshots
- You never hold references to inner state (reads must go through `getState()`)

For most web games, mix: B for hot paths, A everywhere else.

## Testing pure reducers

Trivial:

```js
test('damage reduces hp', () => {
  const initial = { player: { hp: 100 } };
  const event = { type: 'DAMAGE_DEALT', payload: { amount: 30 } };
  const next = applyDamage(initial, event);
  expect(next.player.hp).toBe(70);
});
```

No mocks. No setup. No async. **This is the payoff.**
