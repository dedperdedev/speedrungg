---
name: loading-screens-that-work
description: "Use when implementing loading screens. Honest progress bars, front-loaded visible work, productive loading patterns."
---

# Loading Screens That Work

Loading is unavoidable. Bad loading = bounce. Good loading = engagement.

## Three principles

### 1. Honest progress, not fake spinners

A spinner says "we're working" but not "how much longer." Players bail at unknown delays.

A progress bar shows: 0% → 70% → 95% → done. Players wait at unknown duration but stay if they see progression.

### 2. Front-load the visible work

Show something quickly, even if not playable yet:

```
00:00 - Black screen
00:01 - Logo
00:02 - "Loading..." with progress
00:03 - 25% — main background loaded
00:05 - 50% — sprites loaded
00:08 - 80% — audio loaded
00:10 - 100% — interactive
```

If the player sees something at 1 second, they're patient through 10 seconds. If they see nothing for 3 seconds, they're already gone.

### 3. Make load feel productive

While loading, give players something to do:

- Tutorial / lore text (reading time = perceived faster load)
- Mini-game during load (Bayonetta, Crash Bandicoot)
- Cinematic intro
- Settings menu (let them tweak while loading)

Best: load completes during their interaction; they never "wait."

## Web-game specific

### Critical resource priority

```
PRIORITY 1: HTML, initial JS bundle (300 KB max)
PRIORITY 2: First scene assets (logo, menu)
PRIORITY 3: Gameplay assets
PRIORITY 4: Audio
PRIORITY 5: Optional content (later levels, animations)
```

Render the loading screen with PRIORITY 1. Then progressively load others, updating the bar.

### Streaming model

```js
// Load critical first, render loading screen
await loadCritical();
showLoadingScreen();

// Load main menu while showing progress
const menuPromise = loadMainMenuAssets({
  onProgress: (pct) => updateLoadingBar(pct * 0.5),  // first 50%
});

// Load gameplay in parallel
const gamePromise = loadGameplayAssets({
  onProgress: (pct) => updateLoadingBar(0.5 + pct * 0.5),  // next 50%
});

await menuPromise;
showMainMenu();  // playable
await gamePromise;  // background
```

### Service worker pre-cache

After first load, service worker caches everything. Second load = instant.

### Mobile considerations

- Slow network is the default — design for 3G
- Wake-lock during load (so screen doesn't dim)
- Connection lost mid-load → show retry, don't restart from 0%

## What NOT to do

- Indeterminate spinner with no text
- "Loading..." with no progress bar
- Full-screen logo for 5 seconds before any interaction
- Force a video intro that can't be skipped
- Show progress bar that goes 0 → 100 instantly (fake)
- Show progress bar that hits 99% and sits there (also fake)

## Cross-reference

`bundle-budget-strategy.md` for what to prioritize. `first-30-seconds-rule.md` for what comes after loading.
