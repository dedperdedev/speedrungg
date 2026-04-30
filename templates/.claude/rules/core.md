# Rules: src/core/**

Scope: `src/core/**` — the engine-agnostic heart of the game.

## Non-negotiable

- **Zero external deps.** Node built-ins only in tooling, nothing at runtime.
- **Zero imports from other src/ directories.** `core` depends on nothing inside the project.
- **Pure functions.** Reducers are `(state, event) → state`. No I/O. No mutation.
- **Deterministic.** Same input → same output. Always.
- **Seeded RNG only.** Use `state.rng`. Never `Math.random()`.
- **Injected clock.** Never `Date.now()` or `performance.now()` in reducers.
- **Serializable state.** JSON-round-trippable. No DOM nodes, no engine objects, no functions.

## Required

- Every new event type documented in `src/core/events.md`
- Every store mutation covered by a unit test
- Store history cap configurable (default 1000 events for debug, 0 for prod)
- Event-log serialization format versioned

## Refuse

- Direct DOM references
- `console.log` in shipped code (use the event logger)
- `async` reducers
- Side effects of any kind
