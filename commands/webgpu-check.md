---
name: webgpu-check
description: Probe runtime WebGPU capability vs WebGL fallback for the user's target device(s); recommend renderer choice per webgpu-readiness skill.
---

# /webgpu-check

Run runtime feature detection and capability probe to recommend WebGL vs WebGPU for a specific device profile.

## What you do

1. **Read** the `webgpu-readiness` Skill for the decision framework.
2. **Identify** the target device(s) from the user (or current session: desktop dev / mid-range mobile / etc.).
3. **Generate** a feature-detection script that:
   - Checks `navigator.gpu` presence
   - Requests an adapter
   - Reports adapter info (vendor, architecture, limits)
   - Falls back to WebGL2 capability check
4. **Recommend**: per-engine renderer choice based on results + the `webgpu-readiness` decision tree.
5. **Output**: a written recommendation with calibration labels, plus the feature-detection script saved to `tools/webgpu-probe.html`.

## Output template

```
## WebGPU readiness for <project name>

Target device(s): <profile>

### Detection results
- WebGPU available: [CONFIRMED yes/no]
- Adapter: <vendor / architecture>
- Limits: <max texture size, etc.>
- WebGL2 fallback: [CONFIRMED yes/no]

### Recommendation
Engine: <phaser-4 | pixijs-8 | threejs | babylonjs-8 | ...>
Renderer: <WebGL primary / WebGPU primary / WebGPU opt-in>
Reasoning: <2-3 sentences with [CONFIRMED]/[LIKELY]/[UNCERTAIN] labels>

### Caveats
- WebGPU is not always faster — per webgpu-readiness skill, three.js shows 2-4× regressions in some scenes
- Babylon 8 is the strongest WebGPU candidate (WGSL native shaders)
- WebGL2 fallback is essential for any production game (~25-30% of audience as of early 2026)

### Next step
- Save probe script to: tools/webgpu-probe.html
- Run on representative devices: <list>
- Benchmark before defaulting to WebGPU
```

## Probe script template (saves to tools/webgpu-probe.html)

The script renders a small page that:
1. Prints WebGPU detection result
2. Prints adapter info if available
3. Renders a benchmark scene (1k sprites → 100k sprites) on both renderers
4. Reports FPS p50/p95/p99 + frame time consistency
5. Saves results to localStorage for cross-session comparison

User opens this on each target device; you read the results and refine the recommendation.

## Cross-reference

- `webgpu-readiness` Skill — the decision framework
- `bundle-budget-strategy` Skill — WebGPU may add shader weight
- `loaf-instrumentation` Skill — measuring jank regardless of renderer
