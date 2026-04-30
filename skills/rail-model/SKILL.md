---
name: rail-model
description: "Use when setting performance budgets. RAIL model: Response < 100ms, Animation < 16ms, Idle ≤ 50ms, Load < 5s on 3G."
---

# RAIL Model — Web Performance Budgets

Google's RAIL model. Targets, not aspirations.

## The four parts

| Letter | What | Budget | Why |
|---|---|---|---|
| **R**esponse | Tap → response | < 100ms | Feels instantaneous |
| **A**nimation | Frame produced | < 16ms (60fps) | Smooth motion threshold |
| **I**dle | Background work | ≤ 50ms chunks | Don't block input |
| **L**oad | Time to interactive | < 5s 3G, < 2s WiFi | Engagement falls off cliff |

## Why these specific numbers

- **100ms** — perception threshold; below this, action and reaction feel linked
- **16ms** — 60Hz refresh rate (some monitors 144Hz, but 60 is web baseline)
- **50ms** — fits between user inputs without delaying response
- **2-5s** — measured: most web users abandon if they wait longer

## RAIL applied to a web game

### Response (R) — input latency
- Click/tap to first visual feedback: < 100ms
- Includes: input handler runtime + state update + first paint of feedback
- Watch: heavy work in input handlers (e.g., parsing, layout thrash)
- Tool: Chrome DevTools Performance, "Interactions" track

### Animation (A) — gameplay framerate
- 60fps target on desktop, 30fps minimum on mobile
- Every frame ≤ 16ms (or 33ms for 30fps)
- Watch: GC pauses, layout, expensive draw calls, bad culling
- Tool: Chrome DevTools, browser FPS overlay

### Idle (I) — background tasks
- Use `requestIdleCallback` for non-critical work (analytics, prefetch, asset processing)
- Cap chunks at 50ms — must yield often
- Don't run idle work during gameplay when input is happening
- Tool: Performance recorder, look for "Idle" track usage

### Load (L) — time to interactive
- First meaningful paint: < 1s
- Time to interactive (game playable): < 2s desktop, < 4s mid-mobile
- Bundle budget: 300 KB initial, defer the rest
- Tool: Lighthouse, WebPageTest, real-device test

## Operational checklist

For every change, ask:

- [ ] Does this affect Response (input latency)?
- [ ] Does this affect Animation (frame budget)?
- [ ] Is the work properly classified as Idle or Critical?
- [ ] Does this slow the Load path? (New dep, new asset, new fetch?)

If yes to any, profile before merging.

## Diagnosis cheat sheet

Symptom: "feels laggy"

| Where | Cause | Tool |
|---|---|---|
| On input | R violation | Performance, Interactions track |
| During movement | A violation | Performance, Frames track |
| On scroll | A violation (layout thrash) | Performance, Layout shifts |
| First load | L violation | Lighthouse, network waterfall |
| Random pauses | GC (allocation in loop) | Performance, Memory track |

## Anti-patterns

- "Optimize later" — performance debt compounds
- Mobile-last testing — mobile is the harshest budget
- Average FPS instead of frame distribution — one 200ms hitch = bad UX even at "60fps avg"
- Ignoring the long tail (p99 frame time)
