---
name: storylets-quality-based-narrative
description: "Use when designing branching narrative. Storylets and QBN architecture beats branching trees for replay value and post-launch content adds."
---

# Storylets and Quality-Based Narrative (QBN)

A narrative architecture where the world is a database of *storylets* (small content units gated by qualities) rather than a tree of branches. The player's state — *qualities* — determines what storylets become available. Best for browser games because of save-state persistence, small-content iteration, and short sessions.

## The shape

```
QUALITIES (player state)
  ├── numeric stats (Health, Reputation, Gold)
  ├── flags (met_villager, learned_spell)
  ├── counters (times_visited_X, days_passed)
  └── tags (wanted_in_capital, knows_secret_Y)

STORYLETS (content units)
  ├── requirements: which qualities must be in which range to unlock
  ├── presentation: text + choices the player sees
  ├── consequences: how qualities change after each choice
  └── exclusions: which storylets become unavailable after this fires
```

The narrative engine checks every tick: which storylets are *eligible* now? Surface the most relevant subset. Player picks one, plays it, qualities update, world reshapes itself.

## Why QBN beats branching trees

| Branching tree | QBN / storylets |
|---|---|
| O(2^N) endings (combinatorial explosion) | Adds linearly: one storylet at a time |
| Each branch must be authored | Storylets recombine emergently |
| Choices feel "rail-switching" | Choices feel like "shaping a life" |
| Save points matter (reload to try other branch) | Replay is natural; same world, different path |
| Hard to add content post-launch | Trivial: drop a new storylet, set requirements |

For solo indies and small teams, QBN is **dramatically** more scalable.

## Five common storylet patterns (Kreminski 2018 taxonomy)

### 1. Gauntlet
A linear sequence where each storylet sets up the next. Used for tutorials, prologues, set-piece scenes. Looks like branching but is rail-driven.

### 2. Branch-and-bottleneck
Many storylets fan out, then converge on a hub storylet, then fan out again. Gives illusion of choice while controlling pacing.

### 3. Sorting-hat
Early storylets read player choices and assign tags ("ambitious", "kind"). Later storylets check tags and offer tag-aligned content. Deep personalization with low authoring cost.

### 4. Loose-leaf collection
Storylets are nearly independent — player picks any in any order. Used for "side content" sections (a city's neighborhoods, a year's seasons). Each storylet self-contained.

### 5. Crisis-and-resolution
A persistent quality (e.g., "Plot Tension") rises until a threshold; then a "crisis" storylet triggers; player resolves; tension resets. Drives long-arc pacing.

## Quality types (discipline)

### Numeric stats — for continuous variables
`{ id: 'reputation', value: 47, min: 0, max: 100 }`

### Flags — for discrete events
`{ id: 'met_villager', value: true }`

### Counters — for repeating behaviors
`{ id: 'visits_to_tavern', value: 12 }`

### Tags — for personality / status / role
`{ id: 'kind' }`, `{ id: 'wanted_in_capital' }`

Use the right type. Numeric stats invite tuning; flags invite branching; counters invite escalation; tags invite categorization. Mix carefully — confusion comes from using one type to do another's job.

## Eligibility rules

A storylet's `requirements` block:

```
{
  qualities_required: { reputation: { min: 50 }, gold: { min: 100 } },
  qualities_excluded: { is_dead: true },
  flags_required: ['met_villager'],
  cooldown_ticks: 30,
  exclusive_with: ['rival_storylet_X']
}
```

The engine evaluates eligibility every tick (or every player action). Eligible storylets surface; the player picks.

## Surfacing strategy

You almost never want to show *all* eligible storylets — that's overwhelming. Common patterns:

- **Top-N by priority**: each storylet has a `priority` quality; show top 3-5
- **Categorized**: storylets tagged by location, NPC, theme — show by category
- **Curated**: a "what's interesting now" algorithm picks 1 highlighted + a few options
- **Discovery**: hide most storylets behind a `discovered: true` quality the player must unlock

## Authoring discipline

- **Storylets are small** — 100-500 words including choices
- **Choices have meaningful, asymmetric consequences** (see `costikyan-choice-taxonomy.md`)
- **Every storylet should pay its rent** — if removing it doesn't affect the experience, cut it
- **Avoid storylet inflation** — 100 high-quality > 500 mediocre

## Existing tools (2025)

- **storylets-rs** (Rust, 2024) — minimal storylet engine, well-documented
- **Voyageur** (JS, ongoing) — TypeScript storylet runtime
- **Ink** (inkle) — supports storylet pattern via `external` knots
- **Twine + sugarcube** — manual but flexible
- **Custom**: storylets are simple enough to build in ~200 lines of vanilla JS

For web games: usually roll your own — gives full integration with the deterministic store + event log.

## Web game integration

Storylets pair perfectly with the template's `mutable-udf-store.md` pattern:

- Qualities = state in the store
- Storylet check = pure function `(state) → eligible[]`
- Player choice = dispatched event
- Consequences = pure reducer update
- Replay-able, deterministic, testable

## When to use QBN vs alternatives

| Use QBN if... | Use branching tree if... | Use simulation if... |
|---|---|---|
| Many small story moments | Few big setpiece scenes | Emergence > scripted |
| Replay value matters | Single playthrough is the point | Player tells own story |
| Add content post-launch | Story is fixed at launch | Procedural content scales |
| Browser/mobile sessions | Sit-down narrative game | Sandbox |

Examples: Fallen London, Sunless Sea/Skies, A Dark Room, Reigns, 80 Days — all browser-friendly QBN-flavored designs.

## Anti-patterns

- **Quality bloat** — defining 200 stats when 20 would do; player can't track impact
- **Storylet bloat** — many storylets, none memorable
- **Eligibility confusion** — player can't predict why options appear/disappear (ensure surfacing is legible)
- **Hidden state thrash** — the world feels arbitrary when consequences are invisible
- **Forgetting to set exclusions** — same storylet fires repeatedly, breaking immersion

## Sources

- Emily Short, "Storylets: You Want Them," 2019 (emshort.blog)
- Max Kreminski, "Sketching a Map of the Storylets Design Space," ICIDS 2018
- Failbetter Games, Fallen London + Sunless Sea/Skies (canonical implementations)

## Cross-reference

- `mutable-udf-store.md` — qualities live in the store
- `costikyan-choice-taxonomy.md` — meaningful choice tests for each storylet
- `progression-curves.md` — designing quality curves for storylet pacing
- `interview-protocols.md` — playtesting storylet eligibility legibility
