---
name: systems-thinking-loops
description: "Use when designing game systems with feedback loops. Lewin/Forrester/Meadows applied to games — stocks, flows, reinforcing/balancing loops, common system failure modes."
---

# Systems Thinking — Loops, Stocks, Flows

Lewin / Forrester / Meadows applied to games. The toolkit for designing systems that aren't immediately broken.

## Core concepts

### Stock
A quantity that accumulates. (Player HP, gold, XP, ammo.)

### Flow
A rate of change in/out of a stock. (HP regen, gold per minute, damage per second.)

### Feedback loop
A flow that changes based on the stock it affects.

## Two loop types

### Reinforcing (positive) loop
Stock increases → flow accelerates → stock increases faster.

```
Gold ↑ → can afford better tools → harvest more efficiently → Gold ↑↑↑
```

**Risk:** runaway acceleration, snowball victories, rich-get-richer.

### Balancing (negative) loop
Stock increases → flow slows → stock stabilizes.

```
Gold ↑ → prices rise → can afford less → Gold stabilizes
```

**Risk:** stagnation, inability to progress past a plateau.

## Healthy systems

Most well-designed game systems pair both:

- **Early game:** strong reinforcing loops (let the player grow)
- **Mid game:** balancing loops introduce friction (challenge appears)
- **Late game:** new reinforcing loops (master mechanics, new strategies)
- **End game:** balancing dominates (true mastery is asymptotic)

## Diagnosing your system

For each system in the GDD, draw it on paper:

- Stocks (boxes)
- Flows (arrows)
- Loops (circles with R or B labels)

Ask:

- Are there ONLY reinforcing loops? → Snowball problem.
- Are there ONLY balancing loops? → Stagnation problem.
- Where does the player input enter? Where does it leave?
- What happens if a stock goes to 0? To infinity?

## Examples

### RPG combat
- Reinforcing: kill mobs → XP → level → stronger → kill mobs faster
- Balancing: stronger mobs spawn at higher levels → keeps challenge
- Failure mode: if balancing too weak, late game trivializes

### Strategy game economy
- Reinforcing: more workers → more resources → more workers
- Balancing: cap on workers, finite resource nodes, supply costs
- Failure mode: if balancing too weak, early-rush dominates

### Idle/incremental
- Stack of reinforcing loops at increasing scales (gold → upgrades → gold-per-second × 10 → upgrade tier 2 → ...)
- Balancing comes from cost-curves outpacing earning at each tier
- Failure mode: cost curves too gentle = no friction; too steep = wall

## Cross-reference

Pairs with `economy-source-sink.md` (specific to virtual economies) and `progression-curves.md` (mathematical shape of growth).
