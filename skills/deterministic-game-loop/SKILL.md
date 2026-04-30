---
name: deterministic-game-loop
description: "Use when implementing the game loop — fixed-timestep simulation with variable-rate render, spiral-of-death prevention, replay-able pattern. Skip when the work is reducer purity (defer to pure-reducers), state-store architecture (defer to mutable-udf-store), or networked authority (defer to secure-multiplayer-protocol)."
---

# Deterministic Game Loop

Fixed-timestep simulation + variable-rate render. The pattern that makes games replay-able, testable, and multiplayer-ready.

## Why it matters

- Determinism = replay (record inputs, replay produces identical state)
- Determinism = testing (same inputs, same outputs, no flake)
- Determinism = lockstep multiplayer (clients agree without sending state)
- Determinism = save anywhere (save = inputs + seed)

## The pattern

```
const dt = 1000 / simulationHz;     // e.g. 16.67ms at 60Hz
let accumulator = 0;
let last = 0;

function frame(now) {
  let delta = Math.min(now - last, maxFrameMs);  // cap to prevent spiral-of-death
  last = now;
  accumulator += delta;

  while (accumulator >= dt) {
    onTick(dt / 1000);    // SIMULATION — fixed step
    accumulator -= dt;
  }

  const alpha = accumulator / dt;  // 0..1 interpolation factor
  onRender(alpha);                  // RENDER — variable, with interpolation

  requestAnimationFrame(frame);
}
```

## Three things to never do

- **`setInterval` for game logic** — drifts, browser throttles when tab inactive
- **Variable-step simulation** (`update(dt)` where dt = real frame time) — physics goes to hell, no determinism
- **Render at simulation rate** — drops to 60fps cap when monitor is 144Hz

## Determinism rules

Inside the simulation tick:

- No `Math.random()` — use seeded RNG from store
- No `Date.now()` / `performance.now()` — use injected clock
- No floating-point order-of-operation surprises (sum arrays in deterministic order)
- No iteration over `Set` / `Map` order assumptions across browsers
- No async/await mid-tick — finish the tick synchronously

## Spiral of death

If a tick takes longer than its budget:

```
tick takes 30ms (budget 16.67ms)
→ next frame, accumulator has 30ms backlog
→ try to run 2 ticks to catch up
→ 60ms work
→ even more behind
→ death spiral
```

Prevention: cap delta (`maxFrameMs` ≈ 250). Better to drop ticks than spiral.

## Web-specific gotchas

- Tab-hidden → `requestAnimationFrame` pauses, time skips
- Tab-revealed → huge delta, would spiral if not capped
- iOS Safari throttles RAF aggressively when low-power mode
- Always pause game on `visibilitychange` → `document.hidden`

## Testing

```js
// Deterministic test:
const replay = (initialState, inputs, seed) => {
  let state = createInitialState(seed);
  for (const input of inputs) {
    state = reduce(state, input);
  }
  return state;
};

// Same inputs → same state → assert
expect(replay(initial, inputs, 42)).toEqual(expectedFinalState);
```
