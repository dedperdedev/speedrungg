---
name: view-transitions-game-ui
description: "Use when implementing menu transitions, scene swaps, or HUD state changes. Native View Transitions API patterns; replaces hand-rolled CSS animation."
---

# View Transitions API — Game UI

Same-document View Transitions API became Baseline (all browsers) in October 2025. Cross-document transitions stable in Chrome. **A native, GPU-accelerated, declarative way to animate state changes** — perfect for game menus, scene transitions, inventory swaps, and pause/resume animations.

## What it does

Replaces "manual animation gymnastics" with a single API:

```javascript
document.startViewTransition(() => {
  // Update DOM however you want — this can be sync or return a Promise
  showMenu('settings');
});
// Browser captures before-state, applies after-state, animates transition
```

Browser handles the visual interpolation. Default: cross-fade. Customizable via CSS pseudo-elements.

## Browser support (April 2026)

- **Same-document** transitions: **Baseline** since Oct 2025 — Chrome, Firefox, Safari all stable
- **Cross-document** transitions: Chrome stable; others in progress
- **React `<ViewTransition>` component**: experimental as of April 2025

## Why it matters for game UI

Game menus traditionally either:
1. Snap-cut (jarring, no continuity)
2. Hand-rolled animation (CSS transitions + JS state, fragile)
3. Engine-rendered transitions (works but couples UI to engine)

View Transitions give you option 4: declarative, GPU-accelerated, browser-native.

## Common game UI patterns

### Menu screen swap (main → settings)

```javascript
function navigate(to) {
  if (!document.startViewTransition) {
    // Fallback for unsupported browsers
    showScreen(to);
    return;
  }
  document.startViewTransition(() => showScreen(to));
}
```

### Inventory item drag-drop

```css
.inventory-slot {
  view-transition-name: var(--slot-id);
}
```

```javascript
function moveItem(fromSlot, toSlot) {
  document.startViewTransition(() => {
    // Update DOM: item moves from fromSlot to toSlot
    // Browser animates the visual move automatically
    fromSlot.removeChild(item);
    toSlot.appendChild(item);
  });
}
```

### Pause / resume overlay

```javascript
function togglePause() {
  document.startViewTransition(() => {
    document.body.classList.toggle('paused');
  });
}
```

```css
::view-transition-old(root) { animation: fade-out 0.2s both; }
::view-transition-new(root) { animation: fade-in 0.2s both; }
```

### Scene transition (game state changing)

```javascript
async function transitionToLevel(levelId) {
  await document.startViewTransition(async () => {
    // Async transition: browser waits for the callback to resolve
    await loadLevel(levelId);
    renderLevel(levelId);
  }).finished;
}
```

## Customizing transitions

Each named element gets a pair of pseudo-elements: `::view-transition-old(name)` and `::view-transition-new(name)`. Style them with regular CSS animations:

```css
.health-bar {
  view-transition-name: health-bar;
}

::view-transition-old(health-bar) {
  animation: slide-out 0.3s ease-out;
}

::view-transition-new(health-bar) {
  animation: slide-in 0.3s ease-out;
}
```

For full sequence control, use `view-transition-class` and CSS `@keyframes`.

## What NOT to use it for

- **Frame-by-frame gameplay animation** — use the engine's animation system, not View Transitions (which fire once per state change)
- **Continuous indicators** (animated health bar, charging meter) — CSS transitions / Web Animations API are right
- **In-game world events** — they belong in canvas, not DOM

View Transitions is for **DOM-based UI state changes**: menus, HUD overlays, modal dialogs, inventory.

## Reduce-motion respect

Always honor `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

Without this, users with vestibular sensitivity get nauseous.

## Performance

- **GPU-accelerated** — runs on compositor thread, doesn't block main thread
- **Snapshots taken at transition start / end** — no continuous re-render cost
- **Cheap** for typical UI transitions; can scale to complex layouts

## Honest cautions

- **Single transition at a time** — calling `startViewTransition` while another is in progress: the new one waits or interrupts (browser-dependent)
- **Async callbacks** — if your transition callback takes too long, browser may show a fallback or skip the animation
- **`view-transition-name` must be unique within the page at any moment** — collisions cause silent failures
- **DOM-only** — doesn't apply to canvas/WebGL/SVG-rendered UI

## Cross-reference

- `refactoring-ui-principles.md` — visual hierarchy + transition discipline
- `juice-vs-clarity.md` — transitions are juice; balance against clarity
- `wcag-game-checklist.md` — reduce-motion respect mandatory
- `critical-rendering-path.md` — composite layer interactions

## Sources

- developer.mozilla.org/en-US/docs/Web/API/ViewTransition
- developer.chrome.com/blog/view-transitions-in-2025 — 2025 state-of-the-art
- react.dev/blog/2025/04/23 — React experimental component
- web.dev/articles/view-transitions
