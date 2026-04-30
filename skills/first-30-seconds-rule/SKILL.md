---
name: first-30-seconds-rule
description: "Use when designing game opening / onboarding — the web-game opening-seconds discipline: visible identity by 5s, interactive by 10s, success moment by 30s. Skip when the question is loading-screen UX itself (defer to loading-screens-that-work), portal conversion KPI (defer to gameplay-conversion-ratio), or tutorial-load reduction (defer to cognitive-load-game)."
---

# First 30 Seconds Rule

Web games are played on a tab. You have 30 seconds before the player closes it. Plan accordingly.

## The timeline

| Second | Goal |
|---|---|
| 0–2 | Loading visible, not blocking |
| 2–5 | First visible game (menu, character, world) |
| 5–10 | First interactive moment |
| 10–20 | First success / first reward / first surprise |
| 20–30 | Player decides: keep playing or close |

If your game requires reading a tutorial screen before the player acts, you've already lost most players.

## What to put in those 30 seconds

### Second 0–5
Visual identity. Player sees what kind of game this is at a glance. Style, character, setting.

### Second 5–15
First mechanic. Player presses a button → something happens → they understand what they're doing.

### Second 15–30
First "moment." Doesn't have to be huge. Defeating first enemy, finding first item, hearing first joke, discovering first secret. SOMETHING that says "this game has more for you."

## Common failure patterns

### The cinematic intro
"Setting up the world" with 3 minutes of cutscene. Most players skip; many bounce. Save for after first session at minimum.

### The settings gauntlet
Resolution / language / volume / control mapping before first play. Default sensibly, let them tweak later.

### The tutorial wall
Modal: "Press WASD to move. Press SPACE to jump. Press SHIFT to dash..." Player skips, retains nothing.

Better: introduce mechanics one at a time through level design. Crossing the first pit teaches jump.

### The character creator
30 minutes of customization before first gameplay. Save creation for later, or make it pluggable mid-game.

### The login wall
"Create an account to play" — for anything but the most committed audience, this is a 90% bounce.

### Slow loading without feedback
See `loading-screens-that-work.md`. Show progress, give them something to do.

## What good 30 seconds look like

- Slay the Spire: load → click "Play" → in combat in ~10s, learning by doing
- Wordle: load → today's puzzle → typing first guess in ~5s
- itch.io HTML5 jam games: load → press space → playing in ~3s
- Vampire Survivors: load → walk → first XP gem in ~5s

These games respect player time. The reward is they get to keep the player.

## The exception

Long-form narrative games (Kentucky Route Zero, Disco Elysium) intentionally use slow openings to set tone.

This works because:
- Audience self-selected (knows what they're getting)
- Slow opening IS the experience
- Marketing properly set expectations

For most web games, you're not in this category. 30 seconds.

## Test for it

Hand your game to someone who's never seen it. Set a 30-second timer. Watch silently.

- Did they understand what kind of game?
- Did they take a meaningful action?
- Did they have a "moment"?

If no to any, redesign the opening.

## Cross-reference

`loading-screens-that-work.md` for the 0-5 second window. `flow-state-design.md` for what keeps them playing past 30.
