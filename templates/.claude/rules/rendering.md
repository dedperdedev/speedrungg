# Rules: src/rendering/**

Scope: `src/rendering/**` — engine-specific rendering.

## Non-negotiable

- **No game state ownership.** Rendering reads state, never mutates.
- **One adapter per engine** — implements the common interface in `adapter.js`.
- **Respect DPR cap** (2x on mobile, prevents overkill on retina displays).
- **Respect `prefers-reduced-motion`** — no camera shake, no parallax, no particle explosions.
- **Culling enforced** — offscreen entities must not render.

## Required

- Dispose rule — every created resource (texture, geometry, material) has a matching `.dispose()` call
- Pool reusable objects (sprites, particles, meshes)
- Pre-compile / pre-load hot-path materials at init, not on first use
- Budget: max N draw calls per frame documented per engine (in that engine's specialist agent)

## Refuse

- Reading from stores without an explicit subscription
- Writing to state
- Creating geometries / meshes / sprites in the render loop
- Inline shader strings > 20 lines (move to `assets/shaders/`)
