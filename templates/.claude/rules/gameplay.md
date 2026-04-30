# Rules: src/gameplay/**

Scope: `src/gameplay/**` — game logic built on the core store.

## Non-negotiable

- **No DOM access.** No `document`, `window`, or canvas.
- **No rendering engine imports.** No `phaser`, `three`, `pixi`, `babylon`.
- **Delta-time movement.** `pos += velocity * dt`, never `pos += velocity`.
- **Tunables from JSON.** Load via `src/core/tunables.js`.
- **Pure functions.** Take state + event + dt → return state.
- **Seeded RNG.** From `state.rng`.

## Required

- Every system is testable in Node (no browser globals)
- New systems ship with an integration test
- Tunable names use dot-notation: `player.moveSpeed`, `enemy.spawnRate.wave1`

## Refuse

- `Math.random()`
- `Date.now()` / `performance.now()`
- Direct subscription to store (dispatch events; let `core` manage state)
- Hardcoded numbers (use tunables)
- Imports from `ui/` or `rendering/`
