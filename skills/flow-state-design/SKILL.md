---
name: flow-state-design
description: "Use when calibrating game difficulty, challenge curves, or session pacing — Csikszentmihalyi flow theory adapted to games with operational checklists. Skip when the work is concrete difficulty-level / mercy mechanics (defer to difficulty-and-mercy), XP/level growth-curve tuning (defer to progression-curves), or cozy / low-stakes design (defer to cozy-game-design)."
---

# Flow State Design

Csikszentmihalyi's flow theory adapted to games. Practical, not just theoretical.

## The flow channel

```
       ↑ skill
       │
   B   │   FLOW
   O   │  ╱
   R   │ ╱
   E   │╱
   D   ╱
       ╱│
      ╱ │   ANXIETY
       │
       └────────────► challenge
```

Player must stay diagonally between boredom and anxiety. As skill grows, challenge grows.

## 8 conditions for flow (Csikszentmihalyi)

1. Clear goals at every moment
2. Immediate, unambiguous feedback
3. Challenge matched to skill (the diagonal)
4. Action and awareness merge (autotelic)
5. Distractions removed from consciousness
6. Worry of failure suspended
7. Self-consciousness disappears
8. Time perception distorts

A game design that breaks #1, #2, or #3 will not produce flow. You cannot fake your way to #4–8.

## Operational checklist

For every system in the game:

- [ ] Does the player know what to do RIGHT NOW? (Goal clarity)
- [ ] Does the player know if they're succeeding within 250ms? (Feedback latency)
- [ ] Is challenge matched to demonstrated skill? (Adaptive or curated difficulty)
- [ ] Can the player play without reading menus mid-action? (Distraction-free)

## Difficulty curve patterns

Three working approaches:

### A. Stepped curve (most platformers, puzzles)
New mechanic → low pressure → ramp → twist → mastery → next mechanic. Repeat.

### B. Adaptive curve (rhythm games, racers)
Game watches player performance, adjusts. Risk: too aggressive = feels patronizing.

### C. Player-chosen difficulty
Difficulty is in the design space (paths, optional challenges, self-imposed limits). Risk: needs deep design space.

## Anti-patterns

- Difficulty that ramps with stat-bloat (HP × 2 = "harder") — players resent it
- Tutorial that breaks flow (mandatory mid-play modal) — design tutorial as the first level instead
- "Difficulty mode" sliders that just multiply numbers — designer cop-out
- Long unskippable cinematics (kills #4 — action/awareness merge)

## Mercy mechanics (always include)

Players who can't reach flow at standard difficulty deserve a path. Options:

- Assist mode (more health, slower enemies, generous timers)
- Practice mode (no consequences)
- Skip mechanic (after N failures)
- Difficulty adjustment mid-session

These are NOT a tax on "real" players — they're how you keep flow accessible to a wider audience.
