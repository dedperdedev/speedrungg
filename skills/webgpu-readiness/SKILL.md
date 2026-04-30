---
name: webgpu-readiness
description: "Use when choosing renderer (WebGL vs WebGPU) — per-engine decision framework, benchmarking discipline, WebGPU is not always faster. Skip when the work is render-pipeline jank diagnosis (defer to critical-rendering-path), bundle/load budgets (defer to bundle-budget-strategy), or RAIL perf thresholds (defer to rail-model)."
---

# WebGPU Readiness — Per-Engine Decision Framework

WebGPU crossed ~70% global browser support after Safari 26 (Sep 2025) and Firefox 141/145 (Jul–Oct 2025). It's no longer "experimental" — it's production for many use cases. **But WebGPU is not automatically faster than WebGL.** The right answer depends on engine, scene type, and target audience.

## Browser support snapshot (April 2026)

| Browser | WebGPU status | Notes |
|---|---|---|
| Chrome / Edge | Stable since 113 (May 2023) | First production browser |
| Safari macOS Tahoe / iOS / iPadOS / visionOS | Stable since Safari 26 (Sep 2025) | Apple Silicon best |
| Firefox Windows | Stable 141 (Jul 2025) | |
| Firefox macOS Apple Silicon | Stable 145 (Oct 2025) | |
| Firefox other | 147+ broader | Linux/Android still in progress |
| Linux | Behind flag in most browsers | Mozilla expects 2026 GA |
| Android Firefox | Behind flag | Mozilla expects 2026 |

**Global coverage ~70-77% per Can I Use early 2026.** Any production game must feature-detect and fall back to WebGL.

## When WebGPU clearly wins

### Compute-shader-heavy workloads
- Particle systems with thousands of agents (compute shaders > vertex shaders for state updates)
- ML inference (WebGPU + WebNN integration)
- Procedural generation on GPU
- Physics simulation (cloth, fluid)

### Render-bundle-heavy scenes
- Babylon 8 reports ~10× wins on render-bundle-heavy scenes
- Many similar objects with shared shaders (sprite atlases, instanced geometry)
- Modern indirect-draw pipelines

### Million-scale data
- 1M sprites in single draw call (Phaser 4 SpriteGPULayer)
- Large data visualization

## When WebGPU does NOT win (or loses)

### Many tiny draws
- Three.js community reports show **2–4× regressions** vs WebGL r170 in some scenes
- Bundle-many-small-things workloads can be slower

### Forward-rendered classic 3D
- Standard Phong/PBR scenes often don't benefit
- WebGL2 implementations are mature and optimized

### Older devices
- WebGPU Compatibility Mode is in development; mainstream older device support is fragile
- iOS pre-26 / older Android devices = WebGL fallback essential

### Shader debug needs
- Shader tooling for WebGPU is improving but still less mature than WebGL
- For development velocity: consider WebGL primary, WebGPU as opt-in optimization

## Per-engine readiness (April 2026)

### Phaser 4 (final May 2025)
- **Status:** Ground-up WebGL rewrite with new "Beam" renderer; WebGPU integration in roadmap
- **SpriteGPULayer:** 1M sprites in single draw call (uses GPU compute)
- **Recommendation:** Use Beam (WebGL); WebGPU specifics still settling. Watch upstream for updates.

### PixiJS v8.x (current April 2026)
- **Status:** Async renderer init; WebGPU + WebGL backends; v8.1.0 reverted *default* to WebGL after browser inconsistency reports
- **Recommendation:** **Default WebGL.** Opt into WebGPU explicitly via `preference: 'webgpu'` after benchmarking specific scene
- **Migration cost:** v7→v8 has breaking changes (single-package import, async init)

### Three.js r170+
- **Status:** Production WebGPURenderer with zero-config WebGL2 fallback; TSL (Three Shading Language) for cross-backend shaders
- **r182 caveat:** Community reports 2-4× regressions vs WebGL r170 in some scenes; WebGPU is not automatically better
- **Recommendation:** Default WebGL2; WebGPU opt-in only when scene benefits documented (compute, instancing, post-processing chains)

### Babylon.js 8 (March 2025)
- **Status:** All core shaders rewritten in native WGSL; ~2× smaller for WebGPU targets; new audio engine; IBL shadows; Area Lights; Node Render Graph; Gaussian Splat
- **Recommendation:** Babylon 8 is the best-positioned for WebGPU primary. Their wins on render-bundle scenes are documented. Default WebGPU when supported, WebGL fallback.

### Vanilla Canvas / WebGL
- **Status:** Still the leanest option for size-constrained or simple games (js13k, embed)
- **Recommendation:** Stay WebGL. WebGPU adds complexity not justified at this scale.

### Web Platform (HTML/CSS/SVG)
- **Status:** No WebGPU dependency
- **Recommendation:** N/A

## Decision tree

```
Need 3D with PBR / IBL / advanced lighting?
├── Yes → Babylon 8 with WebGPU primary, WebGL fallback
└── No
    ├── Need 2D with millions of sprites?
    │   └── Phaser 4 with SpriteGPULayer (Beam)
    ├── Need 2D with custom rendering?
    │   └── PixiJS v8 — default WebGL, opt-in WebGPU after benchmark
    ├── Need general 3D?
    │   └── Three.js r170+ — default WebGL2, opt-in WebGPU after benchmark
    ├── Need lean / size-constrained?
    │   └── Vanilla Canvas/WebGL
    └── DOM / SVG / CSS-driven?
        └── Web Platform
```

## Feature detection pattern

```javascript
async function detectGPU() {
  if (!('gpu' in navigator)) {
    return { mode: 'webgl', reason: 'webgpu-not-available' };
  }
  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      return { mode: 'webgl', reason: 'webgpu-no-adapter' };
    }
    return { mode: 'webgpu', adapter };
  } catch (e) {
    return { mode: 'webgl', reason: `webgpu-error: ${e.message}` };
  }
}
```

## Benchmarking discipline

Before defaulting to WebGPU:

1. **Build both renderers** for the same scene
2. **Test on representative devices** — not just dev machine
   - Mid-range Android (e.g., Pixel 5a or older)
   - iPhone 12-class
   - Mid-range Mac
   - Mid-range Windows + integrated graphics
3. **Measure**: FPS p50/p95/p99, frame time consistency, GPU memory usage, load time
4. **Compare against WebGL2 baseline** — WebGPU must beat it meaningfully (20%+ improvement) to justify the complexity

If WebGPU is not clearly better: ship WebGL primary, keep WebGPU as opt-in for power users / future.

## Distribution implications

**Poki, CrazyGames, Y8** — most users on mid-range mobile + various browsers. **WebGL fallback is essential.** A WebGPU-only game blocks ~25-30% of audience as of early 2026.

**itch.io** — audience tends to be more technical / desktop-leaning. WebGPU acceptable but still feature-detect.

**Self-hosted with own audience** — depends on your audience's device profile.

## Honest cautions

- **Performance benchmarks change weekly** — engine teams ship improvements continuously
- **The 70-77% support figure is global average** — your audience may differ significantly (e.g., heavy iOS = lower number; tech-savvy desktop = higher)
- **WebGPU shader tooling is improving but less mature** — factor in dev experience
- **WebGPU Compatibility Mode** (in development) targets older devices; mostly works in three.js with mipmap fixes; watch for stable

## Sources

- github.com/gpuweb/gpuweb/wiki/Implementation-Status — official status tracker
- web.dev/blog/webgpu-supported-major-browsers
- caniuse.com/webgpu
- blogs.windows.com 27 Mar 2025 — Babylon 8 launch
- discourse.threejs.org — WebGPU performance reports
- byteiota.com — WebGPU benchmark analysis

## Cross-reference

- `bundle-budget-strategy.md` — WebGPU may not increase initial bundle but adds shader weight
- `rail-model.md` — WebGPU's frame-time benefits are workload-specific
- `loaf-instrumentation.md` — measure jank regardless of renderer choice
- `critical-rendering-path.md` — composition pipeline same either way
