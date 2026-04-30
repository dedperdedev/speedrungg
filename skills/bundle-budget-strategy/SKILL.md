---
name: bundle-budget-strategy
description: "Use when reviewing bundle size or load time. 2026 numbers: ≤2MB initial for Poki, ≤2s TTI on mobile, per-engine baselines, dep audit checklist."
---

# Bundle Budget Strategy

The 300 KB initial budget for web games is achievable. Here's how.

## The budget targets

| Target | Limit | Notes |
|---|---|---|
| Initial bundle (gzip) | 300 KB | First paint should not need more |
| Total game (gzip) | 1 MB desktop / 500 KB mobile | Lazy-loaded chunks |
| Hero asset (sprite/texture) | 200 KB | First sprite player sees |
| First chunk after start | 500 KB | Loaded after main menu |

## The strategy: split aggressively

### Initial bundle (300 KB max)
- Game engine (Phaser/Pixi/Three) — pick smallest viable
- Boot scene (loading screen)
- Asset loader logic
- Manifest of what to load

That's it. NO gameplay code yet.

### Lazy-loaded chunks
- Gameplay scenes (one per scene type)
- Audio (loaded as needed, not all-at-once)
- Heavy shaders / advanced features

```js
// boot.js - in initial bundle
async function startGame() {
  showLoadingScreen();
  const { startMainMenu } = await import('./scenes/main-menu.js');
  await startMainMenu();
}
```

## Engine sizes (gzipped, 2026)

| Engine | Approx size |
|---|---|
| Phaser 3 (full) | 200 KB |
| Phaser 3 (custom build, gameplay-only) | 80–120 KB |
| PixiJS (core) | 80 KB |
| Three.js (tree-shaken) | 100–200 KB depending on features |
| Babylon.js (tree-shaken modular) | 200–500 KB |
| Vanilla Canvas/WebGL | 0 KB |

If you're at the engine size already, every other dep needs to be tiny.

## Audit tools

- **`rollup-plugin-visualizer`** — what's in your bundle?
- **`bundlephobia.com`** — check size of any dep before adding
- **`size-limit`** — fail CI if over budget

## Common bloat sources

| Library | Gzip | Replace with |
|---|---|---|
| Moment.js | 70 KB | `date-fns` (4 KB tree-shaken) or native `Intl.DateTimeFormat` |
| Lodash (full) | 25 KB | `lodash-es` tree-shaken (1–3 KB) or native |
| Axios | 15 KB | Native `fetch` |
| jQuery | 30 KB | Native DOM |
| Polyfills | 30+ KB | Targeted polyfills only, drop browsers you don't support |

## Tree-shaking checklist

- [ ] Using ES modules (`import`, not `require`)
- [ ] Bundler in production mode
- [ ] No `import * as X from 'lib'` (defeats tree-shaking)
- [ ] Side-effect-free packages (`"sideEffects": false` in package.json where true)

## Compression

Beyond minification:
- **Gzip** — ubiquitous, ~70% reduction
- **Brotli** — better, ~75% reduction, supported by all modern browsers
- Configure CDN / host to serve Brotli when available

## Dynamic imports for content

```js
// Don't bundle all levels in initial chunk
async function loadLevel(id) {
  const { level } = await import(`./levels/${id}.js`);
  return level;
}
```

## When to break the budget

ADR-required. Document:

- Which budget breached
- By how much
- Why (with measurement)
- Mitigation plan
- Sign-off from technical-director

Every dep over 20 KB needs justification.

## Anti-patterns

- "It works on my fiber connection"
- Compiling polyfills for IE11 in 2026
- Importing the whole library for one function
- `require('lodash')` in any new code
- Skipping bundle CI checks
- Optimizing late (debt compounds)

## 2026 numbers (real portal data)

Updated benchmarks from real portal-distributed games:

| Target | Limit | Source / context |
|---|---|---|
| Initial bundle (Poki spec) | ≤ 2 MB | Poki partnership requirement |
| TTI (mid-range mobile, 4G) | ≤ 2 seconds | Poki + CrazyGames effective requirement |
| Total game (typical successful indie portal) | 30-50 MB | Rainbow Obby, Die in the Dungeon scale |
| Hero asset (sprite/texture) | ≤ 200 KB | First sprite player sees |
| Audio total | ≤ 5 MB | Music streamed; SFX bundled |
| Critical chunk | ≤ 300 KB gzipped | Fits in initial 2 MB after compression |

Web sessions on portals are short and unfocused. Players bounce at ≥3s load (30%+) and ≥5s (50%+). The 2-second target is not aspirational — it's the floor for portal viability.

## Per-engine baseline

Engine-only (no game code) gzipped size, April 2026:

| Engine | Base | Custom build |
|---|---|---|
| Phaser 4 (full) | ~250 KB | ~100 KB tree-shaken |
| Phaser 3 (legacy) | ~200 KB | ~80-120 KB |
| PixiJS v8 (core) | ~80 KB | — |
| Three.js (tree-shaken) | ~100-200 KB | depends on features |
| Babylon.js 8 (tree-shaken) | ~200-500 KB | ~2× smaller than v7 with WebGPU thanks to WGSL native |
| Vanilla Canvas/WebGL | 0 KB | — |

After engine, every other dep needs to fit in remaining budget.

## Web Worker / Wasm budget

If using WebAssembly (e.g., Wasm Audio Worklet, custom physics):
- Wasm binaries compress poorly — count uncompressed weight
- Lazy-load non-critical Wasm
- Consider whether the perf gain justifies the bundle cost

## Cross-reference (additions)

- `web-game-portal-comparison.md` — portal-specific requirements
- `gameplay-conversion-ratio.md` — load time directly affects conversion
- `webgpu-readiness.md` — WebGPU may add shader weight
