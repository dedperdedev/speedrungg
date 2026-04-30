# Screen Reader Patterns for Games

Most games are visual. But many can be accessible to screen-reader users with effort. Here's how.

## Reality check

A pure-action 60Hz reflex shooter — probably can't be made screen-reader accessible. Don't pretend.

But:

- Turn-based games: very accessible
- Strategy: yes
- Narrative / adventure: yes
- Puzzle: usually yes
- Even some action: with audio cues + slow modes (see Last of Us 2)

## The fundamentals

### 1. The canvas problem
Screen readers don't see canvas content. Solution: maintain a parallel, hidden DOM representation.

```html
<canvas id="game" aria-hidden="true"></canvas>
<div id="game-state" aria-live="polite" class="sr-only">
  <p>Player at row 3, column 5. Enemy 2 squares east.</p>
</div>
```

The `sr-only` class hides visually but keeps it in the accessibility tree.

### 2. Live regions for dynamic state
Use `aria-live="polite"` for non-critical updates, `assertive` for urgent.

- Score change: polite
- Player took damage: assertive
- Game over: assertive

### 3. State change announcements
When key state changes, update the live region:

```js
function announce(text, urgent = false) {
  const region = document.getElementById(urgent ? 'announce-urgent' : 'announce-polite');
  region.textContent = text;
  // Clear after announcement so same text re-announces if needed
  setTimeout(() => region.textContent = '', 1000);
}
```

### 4. Menu accessibility
Menus should be plain HTML, not canvas-rendered, with proper roles:

```html
<nav role="navigation">
  <button>Play</button>
  <button>Settings</button>
  <button>Quit</button>
</nav>
```

## Pattern: Turn-based game

Each turn, narrate state:

```
"Your turn. Player health: 50. Enemy health: 30. Available actions: Attack, Defend, Item."
```

User selects via keyboard. After action:

```
"You attacked for 12 damage. Enemy health: 18. Enemy's turn."
[delay for SR to read]
"Enemy attacked for 5 damage. Your health: 45. Your turn..."
```

## Pattern: Real-time game (limited)

For games with persistent state and discrete events:

- Spatial audio for object positions (left/right/distance)
- Periodic state polling: user presses a key, gets a summary
- Slow-time mode: pauses or slows for SR users to evaluate

## Pattern: Puzzle game

Describe the board state on demand:

```js
function describeGrid() {
  // For a 3x3 puzzle grid
  return `
    Row 1: ${row1.join(', ')}.
    Row 2: ${row2.join(', ')}.
    Row 3: ${row3.join(', ')}.
  `;
}
```

User can press a hotkey to re-hear the description.

## Don't do

- Auto-announcing every frame ("Player at 100, 200... Player at 100, 201...")
- Long uninterrupted descriptions (SR users will lose patience too)
- Burying critical info in flowery language
- Forgetting to test with an actual screen reader

## Testing

Mandatory:
- **NVDA** (Windows, free) — used by majority of SR users
- **VoiceOver** (macOS, built-in) — Mac SR users
- **TalkBack** (Android, built-in) — mobile

Don't ship blind to your own product. 30 minutes of SR testing reveals more than any docs.

## Cross-reference

`wcag-game-checklist.md`, `gameaccessibilityguidelines.md`. The combo defines the baseline.
