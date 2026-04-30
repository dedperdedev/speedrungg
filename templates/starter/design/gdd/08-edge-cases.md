# 08 — Edge Cases

> What happens when things go wrong?
> Pre-release: every edge case has a documented behavior, not a crash.

## Network edge cases (if multiplayer or save sync)

- Network drop mid-action: <expected behavior>
- Server unavailable on game start: <expected behavior>
- Out-of-order messages: <expected behavior>

## Save / state edge cases

- Save during quit: <expected behavior>
- Corrupted save file: <expected behavior>
- Save on incompatible version: <expected behavior>
- Browser tab killed: <expected behavior>

## Input edge cases

- Multiple inputs same frame: <expected behavior>
- Disconnected gamepad mid-game: <expected behavior>
- Keyboard layout: AZERTY / QWERTZ / Dvorak: tested?

## Browser edge cases

- iOS Safari audio unlock: tested
- Safari private browsing (no localStorage): expected behavior?
- Browser back button mid-game: expected behavior?
- Tab refresh: state preserved?
- Tab background / foreground: pause behavior?
- Window resize: layout still works?
- Zoom 200%: still readable?

## Accessibility edge cases

- Screen reader on canvas game: per `screen-reader-game-patterns`
- High contrast mode: still legible?
- Reduce-motion preference: animations disabled?
- 200% zoom: layout intact?

## Cross-references

- `secure-multiplayer-protocol` skill — network edge cases
- `wcag-game-checklist` skill — a11y edge cases
- `eaa-baseline` skill — EU compliance edge cases
- `mutable-udf-store` skill — state machine edge cases
