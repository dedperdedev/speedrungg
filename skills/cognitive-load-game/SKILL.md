---
name: cognitive-load-game
description: "Use when diagnosing UX confusion or designing tutorials. Sweller 3-load model (intrinsic/extraneous/germane) applied to games."
---

# Cognitive Load — Applied to Games

Sweller's Cognitive Load Theory (1988, refined 2010s) divides mental load into three types. Game UX, tutorials, and HUD design all live or die by managing these. Most "this game feels confusing" complaints map to a specific load type.

## The three load types

### 1. Intrinsic load — inherent complexity of the task

The actual difficulty of what the player is being asked to do. Cannot be reduced without changing the task itself.

- Learning a chess opening: high intrinsic
- Pressing a button to jump: low intrinsic

**Design implication:** Match intrinsic load to player skill. Beginners learn a simpler version; advanced players access full complexity.

### 2. Extraneous load — load imposed by HOW the task is presented

The waste. Bad UI, confusing tutorials, irrelevant decoration, ambiguous icons. **Always reducible by better design.**

- Tutorial presented as wall of text: high extraneous
- Same lesson taught through level design: low extraneous
- HUD with 12 icons, 8 of which are decorative: high extraneous
- Controls scheme that conflicts with platform conventions: high extraneous

**Design implication:** Hunt this down. Every extraneous load reduction lets the player handle more intrinsic load.

### 3. Germane load — productive effort building skill / understanding

The "good tired" feeling. Player working through a real challenge that builds long-term mastery.

- First time learning to combo in a fighting game: germane
- Same pattern fired on autopilot in 100th match: not germane (automated)

**Design implication:** This is what we want. After reducing extraneous and matching intrinsic, the remaining mental effort goes to germane.

## The total load equation

```
Total cognitive load = Intrinsic + Extraneous + Germane
```

Working memory has finite capacity (~4-7 items). When total > capacity → player overwhelmed → bounces. When total < capacity → bored.

The design job is **hold extraneous near zero, calibrate intrinsic to skill, and give germane room to grow.**

## Diagnosis cheat sheet

Player feedback → likely load type:

| Player says | Load type | Fix |
|---|---|---|
| "I don't know what to do" | Extraneous (goal unclear) | Surface goal in UI; remove distractions |
| "I don't know how to do it" | Extraneous (control unclear) | Tutorial at first encounter; remap |
| "It's too hard" | Intrinsic too high | Lower difficulty; simplify mechanics |
| "It's too easy" | Intrinsic too low | Raise difficulty; add layers |
| "It's confusing" | Extraneous (signal/noise bad) | Cut UI elements; clearer visual hierarchy |
| "I felt like a genius when I got it" | Germane achieved | Don't change |
| "I had to read a wall of text" | Extraneous (forced reading) | Show, don't tell; level design teaches |

## Web game specifics

Browser sessions are typically short and unfocused (player is in a tab, possibly distracted):

- **Even lower extraneous tolerance** than console/mobile games
- **Faster goal communication required** (see `first-30-seconds-rule.md`)
- **Each new mechanic = 1 working memory slot**; introduce serially, not in parallel
- **HUD should be minimal**; player attention is shared with browser chrome

## Working memory budget

Treat working memory as a budget:

- ~4 items if task is novel
- ~7 if items are familiar (chunked from long-term memory)

So a new player can hold:
- The current goal
- Their position
- The threat
- The control mapping

That's 4. Add a 5th and something falls out — usually the goal.

After playing a few sessions, "control mapping" and "position" chunk into long-term memory, freeing slots for tactics and strategy.

**This is why tutorials work best when they introduce ONE thing at a time, give time for chunking, then add the next.**

## Reducing extraneous load — concrete moves

### UI
- Remove every UI element that doesn't communicate a current decision
- Use grayscale / value hierarchy (see `refactoring-ui-principles.md`)
- Iconography should match platform conventions (don't reinvent the save icon)
- Tooltips on demand, not always-visible

### Tutorial
- Show, don't tell — let the level teach
- Introduce one mechanic per encounter
- Don't gate progression on reading
- Allow tutorial replay

### Audio
- Don't pile audio cues on top of each other for unrelated events
- Distinct sounds for distinct meanings
- Music shouldn't compete with critical SFX

### Controls
- Match platform conventions (WASD on web; gamepad mapping standard)
- Allow rebinding (also accessibility win — see `wcag-game-checklist.md`)
- One action = one input where possible

## Calibrating intrinsic load — concrete moves

### Difficulty options
- Multi-axis difficulty, not single slider (see `difficulty-and-mercy.md`)
- Adaptive options: aim assist, slow-mo on choice, generous timers
- "Learning levels" before "real levels"

### Mechanic introduction
- New mechanic: present in safe environment first
- Practice a few times with no consequence
- Then test in real context
- Stack with previous mechanics over time

### Information hiding
- Show only relevant info for current decision
- Reveal complexity as player demonstrates readiness
- "Compass mode" vs "map mode" — same data, different load

## Measurement

- **Behavioral**: time to complete tutorial, count of unsuccessful attempts at first challenge, dropout rate at each scene
- **Self-report**: NASA-TLX subset (mental demand, frustration) in playtest interviews
- **In-game proxies**: pause frequency, menu re-opens, retry without input changes
- **Physiological**: pupil dilation, skin conductance (lab only, rarely worth it for indie)

For most indie web games, behavioral + light interview is enough.

## Anti-patterns

- "More HUD icons = more information = better" (extraneous bloat)
- Tutorial that explains controls AND lore AND systems all at once
- Difficulty as single-slider HP multiplier (see `difficulty-and-mercy.md`)
- Hiding important info "for atmosphere" — atmospheric ≠ unreadable
- Adding flavor text to UI buttons (extraneous)
- Designing for the team (who knows the game) instead of for new players (who don't)
- Confusing extraneous-load reduction with "dumbing down" — they're opposite

## Sources

- Sweller, J. (1988, 2010) — Cognitive Load Theory foundational papers
- "Measuring Cognitive Load Using In-Game Metrics," Frontiers in Psychology 2021 (PMC8024627)
- "Cognitive Load In Game Design," Emre Bugday LinkedIn industry write-up

## Cross-reference

- `flow-state-design.md` — Flow requires matched intrinsic load
- `refactoring-ui-principles.md` — Visual hierarchy reduces extraneous load
- `juice-vs-clarity.md` — Juice can add extraneous load if not balanced
- `first-30-seconds-rule.md` — Web games have especially tight extraneous budget
- `wcag-game-checklist.md` — Accessibility features often reduce extraneous load for everyone
