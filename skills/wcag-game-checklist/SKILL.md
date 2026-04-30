---
name: wcag-game-checklist
description: "Use when implementing or auditing accessibility — WCAG 2.1 AA mapped to game patterns: contrast, keyboard, motion, audio, customization. Skip when the question is choosing a tier (defer to gameaccessibilityguidelines), EU/CVAA regulatory scope (defer to eaa-baseline / cvaa-communications), or canvas screen-reader patterns (defer to screen-reader-game-patterns)."
---

# WCAG 2.1 AA — Game Checklist

WCAG was written for documents and apps. Games need adaptation. Here's the practical mapping.

## Perceivable

### 1.1.1 Text alternatives (A)
- [ ] Every meaningful image has alt text or aria-label
- [ ] Decorative images marked `alt=""` or `aria-hidden="true"`
- [ ] Icon-only buttons have accessible names
- Game-specific: in-canvas content needs description for screen readers (use a hidden live region)

### 1.4.3 Contrast minimum (AA)
- [ ] Text contrast ≥ 4.5:1 against background
- [ ] Large text (18pt+) ≥ 3:1
- [ ] UI components and graphical objects ≥ 3:1
- Game-specific: HUD against varying gameplay backgrounds — test against worst-case

### 1.4.11 Non-text contrast (AA)
- [ ] Active controls have visible boundaries / focus indicators
- [ ] Status changes (alive vs dead, charged vs not) distinguishable

### 1.4.13 Content on hover or focus (AA)
- Tooltips don't disappear when hovering them
- Tooltips dismissable

## Operable

### 2.1.1 Keyboard (A)
- [ ] All gameplay actions have keyboard equivalent
- [ ] No mouse-only mechanics (or alternative provided)
- [ ] Tab order logical
- Game-specific: most web games already have keyboard but check edge cases (drag-drop, mouse-look)

### 2.1.2 No keyboard trap (A)
- [ ] User can navigate AWAY from any interactive element via keyboard

### 2.2.2 Pause, Stop, Hide (A)
- [ ] Auto-playing animation longer than 5 seconds can be paused
- Game-specific: gameplay itself can pause

### 2.3.1 Three flashes or below (A)
- [ ] No flashing > 3 Hz
- [ ] Or flashing area < threshold (small enough to not trigger)
- Game-specific: hit-flash, screen flash on death — test for seizure risk

### 2.4.7 Focus visible (AA)
- [ ] Keyboard focus indicator clearly visible
- [ ] Don't disable browser default outline without replacement

## Understandable

### 3.2.4 Consistent identification (AA)
- [ ] Same icon = same meaning across the game
- [ ] Save button looks like save button everywhere

### 3.3.1 Error identification (A)
- [ ] Form errors clearly described
- Game-specific: "Invalid input" tells user what went wrong

## Robust

### 4.1.2 Name, Role, Value (A)
- [ ] All interactive elements have accessible name + role
- [ ] State changes communicated (`aria-pressed`, `aria-expanded`, etc.)
- Game-specific: custom widgets need full ARIA implementation

### 4.1.3 Status messages (AA)
- [ ] Score / health / state changes announced via live regions when meaningful

## Game-specific extensions (beyond WCAG)

### Customizable controls
- [ ] All keys remappable
- [ ] Mouse sensitivity adjustable
- [ ] Hold vs toggle option for sustained inputs

### Difficulty / pacing
- [ ] Adjustable difficulty
- [ ] Or assist mode (more health, slower enemies, generous timers)
- [ ] Pause works (non-competitive contexts)

### Visual
- [ ] Colorblind-safe palette OR alternative indicators
- [ ] Reduced motion option (respects `prefers-reduced-motion`)
- [ ] Adjustable text size
- [ ] High contrast mode

### Audio
- [ ] Independent volume sliders (master / music / SFX / voice / UI)
- [ ] Captions for spoken content
- [ ] Visual equivalent for every gameplay-critical sound

### Cognitive
- [ ] Tutorial allows replay
- [ ] Save anywhere
- [ ] Settings persist across sessions

## Testing

| Tool | What |
|---|---|
| `axe-core` | Automated WCAG scan, ~30% coverage |
| Manual keyboard pass | Tab through everything |
| Screen reader pass | NVDA + VoiceOver smoke test |
| Colorblind sim | Chrome DevTools rendering |
| Reduced motion | OS toggle, replay game |
| 200% zoom | Browser zoom, replay |

## Don't ship if

- Any A-level criterion fails
- Multiple AA-level criteria fail without alternatives
- Manual keyboard pass can't complete a game session

## Cross-reference

`gameaccessibilityguidelines.md` for game-specific guidelines beyond WCAG (Basic / Intermediate / Advanced tiers).
