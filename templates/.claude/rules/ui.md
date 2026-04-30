# Rules: src/ui/**

Scope: `src/ui/**` — DOM, HUD, menus, overlays.

## Non-negotiable

- **Owns no game state.** Only UI-local state (hover, focus, animation progress).
- **Reads state via `store.subscribe`.** Dispatches events on input.
- **Keyboard-navigable.** Tab order defined. Enter/Space activates. Esc closes.
- **a11y labels.** `aria-label` on icon-only controls. `role` on custom widgets.
- **Respects `prefers-reduced-motion`.**
- **i18n-ready.** Every string via `t('key')`.
- **Contrast ≥ 4.5:1** against game background.
- **Min touch target 44×44 CSS px** on mobile.

## Required

- Animated properties: transform / opacity only
- Focus management: first interactive element gets focus on open
- Modal traps focus; top-level UI does not trap
- Cleanup: `mount()` returns `unmount()` that removes listeners and nodes

## Refuse

- Storing game state in DOM attributes / textContent
- Reading mouse position inside gameplay code
- Icon-only buttons without labels
- Color-only status indicators
- Inline English strings
