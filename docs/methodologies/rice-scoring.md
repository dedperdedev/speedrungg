# RICE Scoring — Prioritization Framework

Reach × Impact × Confidence ÷ Effort. The most defensible way to prioritize features.

## The formula

```
RICE = (Reach × Impact × Confidence) / Effort
```

Higher = ship sooner. Compare RICE scores across all backlog items.

## Each component

### Reach (per time period)
How many players will this affect?

- 0: nobody (spec / internal)
- 1: a few (hardcore tier)
- 5: 1/3 of players
- 10: most players

Time period must be consistent (per month, per quarter).

### Impact (per affected player)
How big is the effect on that player?

| Score | Meaning |
|---|---|
| 0.25 | Minimal effect |
| 0.5 | Low effect |
| 1 | Medium effect |
| 2 | High effect |
| 3 | Massive (e.g., game-changing) |

### Confidence
Your honesty about how sure you are.

| Score | Meaning |
|---|---|
| 50% | "I think so" — gut |
| 80% | Strong inference |
| 100% | Measured / proven |

If you're tempted to write 100% — be honest, you usually shouldn't.

### Effort
Person-weeks (or sprint points if you prefer).

Don't underestimate. Multiply your gut by 1.5x for delivery realism.

## Worked example

| Feature | Reach | Impact | Confidence | Effort | RICE |
|---|---|---|---|---|---|
| Add tutorial | 100 (all) | 2 | 80% | 2 | 80 |
| Add multiplayer | 30 | 3 | 50% | 12 | 3.75 |
| Polish opening 30s | 100 | 1 | 100% | 1 | 100 |
| Localize EN→FR | 20 | 1.5 | 90% | 3 | 9 |
| Achievement system | 60 | 0.5 | 80% | 4 | 6 |

Polish opening (100) beats tutorial (80) beats achievements (6).

## When RICE breaks down

### Strategic-not-tactical bets
"This feature defines our identity." Identity isn't on RICE. Don't ROI-score core identity decisions.

### Compound effects
"Tutorial + onboarding + tooltip" only valuable together. Bundle them in one item, score the bundle.

### Discovery features
Polish that lets player FIND the game in the first place. Lead-gen features have weird Reach (potential players, not current).

### Tech debt
RICE undervalues fixing infrastructure. Pay that tax separately.

## Anti-patterns

- Confidence at 100% reflexively (be honest)
- Effort underestimated (multiply gut by 1.5)
- Reach for entire user base when realistic reach is much smaller
- Comparing RICE across very different time horizons
- Strategy disguised as RICE — when leadership has decided X must ship, don't pretend RICE supports it

## Cross-reference

`opportunity-solution-tree.md` for problem-first prioritization. `jobs-to-be-done.md` for understanding what reach means.
