# Known Issues

## src/core/game-loop.js — initialization edge case

`if (last === 0) last = now` — if `now === 0` on first frame, the next frame
loses its first delta (last gets reset to current frame's now).

**Impact:** First frame after start may produce zero ticks if `now === 0`.
**Workaround:** Browser's `requestAnimationFrame` typically passes `now` > 0
(it's `performance.now()` which is monotonic from page load). So this rarely
manifests in production.

**Fix proposal:** Use a separate `started` boolean instead of `last === 0`
sentinel:
```js
let started = false;
// ...
if (!started) { started = true; last = now; }
```

Status: Documented but not patched (low impact in browser; tests work around it).
