# ARCHITECTURE.md — The Rules of the Codebase

This document is the law for how code is structured. Every file, every module, every mutation respects these rules.

## Core pattern: Mutable UDF + Event Log

> UDF = Uniform Data Format. One mutable root object holds all game state. All changes flow through dispatched events, which are logged for replay and debugging.

```
                ┌──────────────────────────┐
                │  User input / tick / net │
                └───────────┬──────────────┘
                            │
                   dispatch(event)
                            │
                            ▼
                ┌──────────────────────────┐
                │       Event Log          │  ← recorded for replay
                └───────────┬──────────────┘
                            │
                      reducer(state, event)
                            │
                            ▼
                ┌──────────────────────────┐
                │   Mutable state (store)  │
                └───────────┬──────────────┘
                            │
                   subscribe(state)
                            │
                            ▼
                ┌──────────────────────────┐
                │   Renderer / UI / Audio  │
                └──────────────────────────┘
```

**Why:** determinism, replay-ability, testability, time-travel debugging, multiplayer lockstep.

## Layers

```
src/
├── core/          Engine-agnostic. Store, event log, game loop, scheduler.
├── gameplay/      Game rules. Pure functions over state. No rendering.
├── rendering/     Engine-specific. Phaser/Pixi/Three/Babylon/Canvas.
├── ui/            DOM, HUD, menus. Reads state, dispatches events. No state owned.
├── networking/    WebSockets, lockstep, replication. Server-authoritative.
└── game/          Composition root. Wires everything together.
```

### Dependency direction (strict)

```
game → ui → core ← gameplay
        ↑           ↑
        └── rendering
                    ↑
               networking
```

- `core` depends on nothing
- `gameplay` depends only on `core`
- `rendering`, `ui`, `networking` depend on `core` and may read `gameplay` types
- `gameplay` NEVER imports from `rendering`, `ui`, or `networking`
- `core` NEVER imports from anywhere

**Violations of this direction are architecture violations. Refuse them.**

## The store

Location: `src/core/store.js`

```js
const store = createStore(initialState, reducer);

store.dispatch({ type: 'PLAYER_MOVED', payload: { dx: 1, dy: 0 } });
store.getState();               // read current state (immutable view)
store.subscribe(listener);      // subscribe to changes
store.getEventLog();            // retrieve event history
```

### Rules for the store

1. **Only one store per game.**
2. **All state lives in the store.** No parallel state in classes, globals, or singletons.
3. **Reducers are pure.** `(state, event) → state`. No side effects. No `Math.random()` without seeded RNG. No `Date.now()` without injected clock.
4. **Events are plain objects** with `type: string` and optional `payload`.
5. **No async reducers.** Async work happens outside, then dispatches an event with the result.
6. **State is serializable.** JSON-round-trippable. No functions, no DOM nodes, no engine objects.

## The game loop

Location: `src/core/game-loop.js`

- Fixed timestep for simulation (default: 60 Hz)
- Variable timestep for rendering (vsync)
- Interpolation between simulation ticks for smooth rendering

```js
const loop = createGameLoop({
  simulationHz: 60,
  maxFrameMs: 250,         // spiral-of-death guard
  onTick: (dt) => updateSimulation(dt),
  onRender: (alpha) => render(alpha),
});
loop.start();
```

**Never `setInterval`. Never raw `requestAnimationFrame` in gameplay code.**

## Rendering

Each engine plugs into `src/rendering/` via an adapter:

```
src/rendering/
├── adapter.js         # Common interface
├── phaser/            # Phaser adapter
├── pixi/              # PixiJS adapter
├── three/             # Three.js adapter
├── babylon/           # Babylon.js adapter
└── canvas/            # Vanilla Canvas/WebGL adapter
```

The adapter receives state snapshots and renders them. It does NOT own state.

```js
const renderer = createRenderer({ engine: 'phaser', canvas });
store.subscribe(state => renderer.render(state));
```

## UI

`src/ui/` is the HUD, menus, overlays. It:

- Reads state via `store.subscribe`
- Dispatches events on user input
- Owns no gameplay state (only local UI state: hover, focus, animation progress)
- Must be keyboard-navigable
- Must respect `prefers-reduced-motion`

## Networking (when applicable)

`src/networking/` implements:

- WebSocket client
- Lockstep or authoritative server protocol
- Versioned messages (`v: 1, type: '...'`)
- Input prediction + reconciliation (if real-time)

Server is always authoritative. Client never trusts its own state.

## Assets

`assets/` layout:

```
assets/
├── sprites/           PNG/WebP. Use texture atlases in production.
├── audio/             OGG + MP3 fallback. Max 44.1 kHz unless justified.
├── data/              JSON tunables. All balance numbers live here.
└── shaders/           GLSL. Comment every uniform.
```

All tunables (speed, damage, cooldown, spawn rate, economy coefficients) live in `assets/data/*.json`. **Zero magic numbers in gameplay code.**

## Performance budgets

Enforced by `.claude/hooks/` and `/perf-profile`:

| Budget | Desktop | Mobile |
| --- | --- | --- |
| Initial bundle (gzip) | 300 KB | 300 KB |
| Total JS (gzip) | 1 MB | 500 KB |
| Time to interactive | < 2 s | < 4 s |
| Target FPS | 60 | 30 |
| Memory ceiling | 256 MB | 128 MB |
| Main thread blocks | < 50 ms | < 50 ms |

Going over a budget requires an ADR in `docs/adr/`.

## No-go list (refuse these)

- Global mutable singletons outside the store
- Direct DOM manipulation from gameplay code
- Synchronous `XMLHttpRequest`
- `eval`, `new Function`, `innerHTML` with user data
- `document.write`
- Blocking the main thread > 50 ms
- Network requests in render loop
- Heavy libs pulled in for one function (write it yourself)
- jQuery (it is 2026)
- Frameworks for a vanilla-Canvas jam game

## ADRs

Every architectural decision goes in `docs/adr/NNNN-title.md` using the template at `docs/templates/adr.md`. This is how future-you (and future agents) understand why the code looks the way it does.
