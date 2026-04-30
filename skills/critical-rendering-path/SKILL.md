---
name: critical-rendering-path
description: "Use when diagnosing render performance issues — browser rendering pipeline (what triggers Layout vs Paint vs Composite) and layout-thrash patterns. Skip when the work is bundle/load-time budgets (defer to bundle-budget-strategy), main-thread frame jank measurement (defer to loaf-instrumentation/long-animation-frames), or perf budget thresholds (defer to rail-model)."
---

# Critical Rendering Path

How the browser turns HTML/CSS/JS into pixels. Where the bottlenecks live.

## The pipeline

```
HTML       →  DOM
CSS        →  CSSOM
DOM + CSSOM → Render Tree
Render Tree → Layout (geometry)
Layout     →  Paint (rasterize)
Paint      →  Composite (final pixels)
```

For each frame at runtime, the browser may need to redo Layout, Paint, or Composite.

## What triggers each phase

| Change | What re-runs |
|---|---|
| `transform: translate(...)` | Composite only ✅ (cheap) |
| `opacity` | Composite only ✅ |
| `background-color` | Paint + Composite |
| `width`, `height`, `top`, `left` | Layout + Paint + Composite ❌ (expensive) |
| `display`, `position` | Layout + Paint + Composite ❌ |
| Adding/removing DOM nodes | Layout + Paint + Composite ❌ |

## Rules for game UI (DOM HUD)

- **Animate `transform` and `opacity` only.** Everything else triggers layout.
- **Use `will-change: transform`** on elements that animate frequently — promotes to its own composite layer.
- **Avoid layout thrash:** don't read layout property + write style + read again in the same loop. Batch reads, then writes.
- **Don't use width/height/top/left for animation.** Use translate(x, y) and scale.
- **Avoid `box-shadow` and `filter` on heavily animated elements** — paints are expensive.

## Layout thrash example

### Bad
```js
for (const el of elements) {
  el.style.left = `${el.offsetLeft + 10}px`;  // read offsetLeft (forces layout) → write style → next iteration forces layout again
}
```

### Good
```js
const positions = elements.map(el => el.offsetLeft);  // batch reads
elements.forEach((el, i) => el.style.transform = `translateX(${positions[i] + 10}px)`);  // batch writes
```

## Canvas/WebGL games — different rules

Inside a `<canvas>`, the rendering is YOUR pipeline (engine-managed). Critical Rendering Path applies to the DOM HUD AROUND the canvas, not the canvas itself.

But the canvas DOES participate in compositing. So:

- The canvas should be in its own composite layer (most engines do this automatically)
- HUD overlays should also be promoted (composite layer)
- Avoid stacking semi-transparent overlays — each composite step adds GPU cost

## Tools

- **Chrome DevTools → Performance**: see Layout, Paint, Composite phases
- **Chrome DevTools → Rendering panel**: highlight paint regions, layout shifts
- **`performance.measure`**: time your own pipeline phases

## Checklist

- [ ] All UI animations use `transform` / `opacity`
- [ ] No layout-triggering properties animated
- [ ] No layout thrash in input handlers
- [ ] Canvas is its own composite layer
- [ ] HUD overlays are minimal layered
