---
name: loaf-instrumentation
description: "Use for production performance monitoring with Long Animation Frames API. Practical patterns for jank detection and production sampling."
---

# Long Animation Frames (LoAF) — Instrumentation

The Long Animation Frames API shipped Chrome 123 (Mar 2024) and is now in production use via web-vitals.js v4 with INP attribution. **It's the modern jank diagnostic** — far more useful than the older Long Tasks API for game performance analysis. Replace `long-animation-frames.md` (theory) with this practical instrumentation guide.

## What LoAF gives you

For every animation frame > 50ms (the "long frame" threshold), browser provides:

```javascript
{
  duration: 67.4,                  // total frame time, ms
  renderStart: 53.2,               // when rendering started
  styleAndLayoutStart: 53.5,
  blockingDuration: 14.1,          // input-blocking time
  startTime: 12345.6,              // when frame began
  scripts: [                       // which scripts ran
    {
      name: 'gameLoop',
      duration: 12.3,
      forcedStyleAndLayoutDuration: 0.5,
      pauseDuration: 0,
      sourceLocation: '...',
    },
    // ... more scripts
  ]
}
```

Compared to the old Long Tasks API (which only said "something took >50ms somewhere"), LoAF tells you **what specific script** caused the jank.

## Browser support (April 2026)

- **Chrome / Edge** — Stable since 123 (Mar 2024)
- **Safari** — In development; partial in some 17.x versions
- **Firefox** — In development

For game perf monitoring, Chrome instrumentation alone is enough — most jank repros across engines.

## Basic instrumentation

```javascript
// Subscribe in dev mode (and optionally sampled in production)
if (typeof PerformanceObserver !== 'undefined') {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        recordJank(entry);
      }
    });
    observer.observe({ type: 'long-animation-frame', buffered: true });
  } catch (e) {
    // LoAF not supported; fall back to long-tasks
  }
}

function recordJank(entry) {
  const culprit = entry.scripts
    .sort((a, b) => b.duration - a.duration)[0];
  console.warn('Long frame:', {
    duration: entry.duration,
    blocking: entry.blockingDuration,
    worstScript: culprit?.name || 'unknown',
    worstScriptDuration: culprit?.duration,
  });
}
```

## In-game integration

For a deterministic-loop web game (per `deterministic-game-loop.md`):

```javascript
// In gameDebug subsystem
class JankRecorder {
  constructor() {
    this.frames = [];
    this.maxFrames = 100;
  }

  init() {
    if (!window.PerformanceObserver) return;
    try {
      const obs = new PerformanceObserver((list) => {
        for (const e of list.getEntries()) this.record(e);
      });
      obs.observe({ type: 'long-animation-frame', buffered: true });
    } catch (e) {
      console.warn('LoAF not supported in this browser');
    }
  }

  record(entry) {
    this.frames.push({
      time: entry.startTime,
      duration: entry.duration,
      blocking: entry.blockingDuration,
      scripts: entry.scripts.map(s => ({
        name: s.name,
        duration: s.duration,
        forcedLayout: s.forcedStyleAndLayoutDuration,
      })),
    });
    if (this.frames.length > this.maxFrames) this.frames.shift();
  }

  worstFrames(n = 10) {
    return [...this.frames]
      .sort((a, b) => b.duration - a.duration)
      .slice(0, n);
  }
}
```

Surface `worstFrames()` in a dev overlay or log to console.

## Production sampling

Don't observe LoAF on every session — small overhead. Sample 1-2% of sessions, log only the worst frames:

```javascript
const SAMPLE_RATE = 0.02;
if (Math.random() < SAMPLE_RATE && window.PerformanceObserver) {
  // Set up observer; report top 5 worst frames at session end
}
```

Build a "p99 frame time" metric over time. Alert when p99 degrades.

## Integration with web-vitals.js v4

If you're already using web-vitals.js for INP/LCP measurement:

```javascript
import { onINP } from 'web-vitals/attribution';

onINP((metric) => {
  console.log('INP:', metric.value);
  console.log('Attribution:', metric.attribution);
  // metric.attribution.longAnimationFrameEntries gives you the LoAF entries
  // for the frame that contained the INP interaction
});
```

This connects user-perceived input latency (INP) to the underlying frame breakdown.

## Common patterns to detect

### Allocation-driven GC
Symptom: long frame with no obvious script culprit; "scripts" array shows multiple short entries.
Fix: object pooling (see `object-pooling.md`).

### Layout thrash
Symptom: `forcedStyleAndLayoutDuration` > 50% of script duration.
Fix: batch reads, then writes (see `critical-rendering-path.md`).

### Sync I/O
Symptom: long frame with single dominant script entry; often before/after asset load.
Fix: defer to async, use `requestIdleCallback`.

### State recompute
Symptom: long frame triggered by big game event (level start, save, multiplayer sync).
Fix: incremental updates, partial diff, defer non-essential work.

### Render expensive
Symptom: `renderStart` to `duration` end is most of the frame.
Fix: reduce draw calls, simplify shaders, cull aggressively.

## What LoAF can't tell you

- **GPU-side performance** — for compositor / GPU work, use `requestAnimationFrame` callback timing or browser performance panel
- **Network jank** — network requests are async; use Resource Timing API
- **Memory** — use `performance.memory` (Chromium-only)

## Browser DevTools complement

LoAF programmatic API is for production / RUM. For dev:

- Chrome DevTools → Performance → record gameplay
- Look for "Long Animation Frames" track
- Click any long frame → see script breakdown matching LoAF data
- "Memory" tab → see GC pauses, heap growth

## Cross-reference

- `rail-model.md` — Animation budget < 16ms (60fps) or < 33ms (30fps)
- `object-pooling.md` — common GC fix
- `critical-rendering-path.md` — layout thrash fix
- `deterministic-game-loop.md` — game loop pattern that LoAF measures
- `long-animation-frames.md` — the older theoretical write-up (kept for reference; this file supersedes for instrumentation)

## Sources

- developer.chrome.com/docs/web-platform/long-animation-frames — official Chrome docs
- developer.chrome.com/blog/loaf-has-shipped (Mar 2024)
- developer.mozilla.org/en-US/docs/Web/API/Performance_API/Long_animation_frame_timing
- requestmetrics.com/web-performance/long-animation-frame-loaf
- web-vitals.js v4 release notes
