---
name: progression-curves
description: "Use when tuning XP, gold, levels, or any growth curve. Linear vs exponential vs logistic curves with selection cheat sheet by game type."
---

# Progression Curves — Linear, Exponential, Logistic

The math of how players grow. Choose the curve intentionally.

## The three shapes

### Linear
`reward = base + level × increment`

```
   ↑
   │      ╱
   │    ╱
   │  ╱
   │╱
   └────────► time
```

- Predictable, fair
- No "rich get richer"
- Boring at scale (level 100 ≈ level 50 in feel)
- **Use:** simple games, cozy progression, where mastery isn't the point

### Exponential
`reward = base × multiplier^level`

```
   ↑           ╱
   │          /
   │         /
   │       _/
   │_____/
   └────────► time
```

- Big payoffs late
- Cool late game ("number go big")
- Trivializes early content
- **Use:** idle games, RPG damage, anything where compound growth is the point

### Logistic (S-curve)
`reward = max / (1 + e^(-(level - midpoint)))`

```
   ↑       ___
   │      ╱
   │     ╱
   │    ╱
   │___/
   └────────► time
```

- Slow → fast → slow
- "Mastery feel" — early growth feels earned, late growth caps
- Most natural for skill curves
- **Use:** skill expression, content tiers, anything with a "mastery ceiling"

## Diminishing returns

For sinks (costs to buy upgrades): cost curves should generally OUTPACE earn curves.

```
earn:  linear or logistic
cost:  exponential
```

This naturally creates progression: early upgrades cheap, late upgrades cost the world. Player never quite "finishes" the system.

## Curve selection cheat sheet

| Game type | Earn | Cost |
|---|---|---|
| Idle / incremental | Exponential | Exponential (steeper) |
| RPG | Logistic | Exponential |
| Roguelike (per-run) | Linear | Linear |
| Roguelike (meta) | Logistic | Exponential |
| Casual / cozy | Linear | Linear (or capped) |
| Sports / racing skill | Logistic | n/a (skill-based) |

## Pitfalls

### Curves that cross
If `earn(t)` ever exceeds `cost(t)`, the player can buy infinite stuff = economy collapse. Always math out: cost(t) > earn(t) for all t > some point.

### Pre-launch curve tuning
You will get the numbers wrong. Plan to retune in week 1 of launch based on real data. Build a feature flag system around economy values from day 1.

### Hidden curves
If players can't tell whether they're progressing fast or slow, they'll bounce. Surface the curve via UI: "you've done 65% of available progression."

## Web-game specifics

- Web sessions are short (30s–10min typically)
- Curves need to deliver a "growth moment" within first session
- Save state across sessions or progression resets feel cruel
- Mobile players especially — design for resumability
