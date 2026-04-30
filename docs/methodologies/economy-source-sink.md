# Source-Sink Theory — Virtual Economies

For any in-game currency or resource, you have **sources** (where it enters the economy) and **sinks** (where it exits). If they're not balanced, the economy breaks.

## The basic principle

```
SOURCES                     SINKS
- enemies drop gold         - shop purchases
- quests reward gold        - upgrade costs
- daily bonus               - repair costs
- selling items             - taxes / fees
                            - consumables
```

For a stable economy: **total source rate ≈ total sink rate** at the player population scale.

## The two failure modes

### Inflation (sources > sinks)
- Currency accumulates indefinitely
- Prices rise relative to player wealth
- Long-time players can buy anything; new players can't keep up
- Fix: add sinks (luxury items, time-limited cosmetics, repair costs, taxes)

### Deflation (sinks > sources)
- Currency dries up
- Players hoard, refuse to spend
- New players walled off from progression
- Fix: add sources (better drops, easier quests, daily bonus)

## Designing sinks

A good sink is:

1. **Optional but desirable** — players choose to spend
2. **Producing endogenous value** (Schell L7) — what you buy matters in this game
3. **Recurring or capped** — repeats over time, OR finite to avoid hoarding goal
4. **Visible** — player understands the cost

Bad sinks:
- Mandatory (turns into a tax, not a choice)
- Boring (HP potions you have to buy because the game punishes lack of them)
- Inflationary (cost scales with wealth, but the wealth keeps growing)

## Designing sources

A good source is:

1. **Tied to engagement** — earn while playing, not while waiting
2. **Bounded** — diminishing returns prevent grinding to infinity
3. **Variable** — some predictability (income), some surprise (rare drops)
4. **Honest** — earn rate visible to player

Bad sources:
- Daily logins as primary (game becomes a habit, not a play experience)
- Hidden RNG drops with no shown rates (loot box pattern)
- Multiplier exploits (one mechanic dominates earning)

## Multi-currency systems

Use SEPARATE currencies for SEPARATE purposes:

| Currency | Source | Use |
|---|---|---|
| Soft (gold, coins) | Earned through play | Common purchases, frequent |
| Hard (gems, premium) | Bought / rare reward | Cosmetics, time-saves, premium |
| Specialty (event tokens) | Time-limited events | Event-only items |

Don't merge these. Players need clear mental models.

## Modeling before launch

Build a spreadsheet (or simulation script):

- Player at hour 1, 10, 50, 100
- For each: total earned (from average path), total spent (planned progression)
- Ratio should oscillate around 1.0–1.2 (slight surplus is fine)
- Look for monotonic divergence — that's your inflation/deflation flag

Run with high-skill, average-skill, low-skill profiles. Compare.

## Anti-patterns

- Single currency doing 5 jobs (consumables, upgrades, cosmetics, premium, prestige)
- Currency that can't be lost — pure stock, no spending pressure
- Pricing by gut feel, never modeled
- Refusing to retune after launch (economies need tuning post-launch always)
- Pay-to-win disguised as time-saving (clear ethical line)

## Cross-reference

`systems-thinking-loops.md` for deeper mechanics. `monetization-ethical-floor.md` for what we won't build.
