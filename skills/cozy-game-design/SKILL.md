---
name: cozy-game-design
description: "Use when designing or reviewing a cozy game — Project Horseshoe 3-pillar framework (Safety/Abundance/Softness) with cross-cultural notes. Skip when the genre is competitive/challenging (defer to difficulty-and-mercy or flow-state-design) or the question is broader audience segmentation (defer to bartle-types-revisited or four-types-of-fun)."
---

# Cozy Game Design — Safety, Abundance, Softness

The most rigorously studied design framework for cozy games. Project Horseshoe 2017 (Tanya X. Short et al.) established three pillars that remain the canonical reference. Empirical 2025 research (DiGRA, Sago) confirms cross-cultural variance.

## The three pillars

### 1. Safety — the player cannot lose anything they care about

- **No permadeath, no time pressure, no hostile players**
- **Failure resets to "try again," not "you lost progress"**
- **Mistakes are reversible** (undo, rollback, save anywhere)
- **Threats, when present, are predictable and avoidable**
- **No surprise antagonism from the world or other players**

Test: Could a player put the controller down for an hour mid-session and return to find nothing destroyed? If yes — Safety is intact.

### 2. Abundance — the world generously provides what the player needs

- **Resources regrow, refill, regenerate** (no scarcity anxiety)
- **Multiple valid solutions** to any problem
- **Surprises are gifts, not threats** (random events = bonus, not trap)
- **NPCs welcome, not gatekeep**
- **Progress isn't gated behind grinding**

Test: When the player wants to do X, are there ≥3 ways to get there, each pleasant? If yes — Abundance is intact.

### 3. Softness — every interaction has a gentle surface

- **Visual: rounded shapes, warm palette, no harsh contrast**
- **Audio: low dynamic range, no jump-scares, music that loops without anxiety**
- **Animation: easing, no snap-cuts, motion has weight + bounce**
- **UI: forgiving hitboxes, generous tolerance, no precision required**
- **Language: warm, polite, never mocking**
- **Failure feedback: gentle ("try again?") not punishing ("YOU DIED")**

Test: If a stranger sat down to play, would they feel *invited* in the first 10 seconds? If yes — Softness is intact.

## Cross-cultural cozy variance (Sago 2025 omnibus, US/UK/FR/ES/DE)

The "cozy reset" job-to-be-done is universal but the interpretation varies sharply:

| Region | Cozy emphasis |
|---|---|
| **France / Germany** | Quality + quiet productivity. Want craft, depth, calm — not whimsy. |
| **Spain** | Flexible session length. Cozy must work in 5min OR 2hr without penalty. |
| **UK / US** | Daily-login + episodic content. Streaks, seasons, soft progression hooks. |
| **Universal** | Emotional reset from work/life stress is the JTBD across all 5 markets. |

If your audience is multi-region, design **both** "deep craft" and "daily nibble" loops.

## Cozy ≠ trivial

The most common misconception: cozy = shallow. Empirical evidence (Stardew, Cozy Grove, Animal Crossing, Slime Rancher, A Short Hike) shows the opposite. **Cozy games can have:**

- Complex systems (farming sims, simulation depth)
- Long progression curves (Stardew: 100+ hours mainline)
- Difficult creative challenges (Animal Crossing island design, decoration)
- Meaningful narrative (Spiritfarer, Wytchwood)

What they CANNOT have without breaking the cozy contract:

- Time pressure that creates anxiety
- Loss of progress
- Hostile competition
- Required skill execution under threat

## Web-game cozy advantages

The browser is an *unusually good* delivery medium for cozy:

- **Sessions naturally bound** by tab context (matches "5-min reset" JTBD)
- **No download friction** = lower commitment cost = lower anxiety to try
- **Shareable URL** = social cozy (send a link to a friend)
- **Persistent state via localStorage / cloud sync** = continuity without commitment
- **Gentle aesthetic** flatters web's CSS-friendly soft-render style

## Operational checklist (use during `/design-review`)

For each system in the GDD:

- [ ] **Safety**: What can the player lose here? Is loss reversible? Do they know in advance?
- [ ] **Abundance**: How many paths exist? Are they all viable? Is any path forced?
- [ ] **Softness**: Visual / audio / animation / language / failure all soft?
- [ ] **Session bounds**: Can the player put it down at any moment without penalty?
- [ ] **Anxiety**: Where could the player feel rushed, threatened, or compared?

If any answer breaks the contract, redesign or move to "not cozy" category. Don't half-cozy.

## Anti-patterns (refuse these in cozy games)

- "Cozy with a twist" where the twist is sudden hostility (breaks Safety)
- Daily-login mechanics with **streak loss** (breaks Safety + Abundance)
- "Limited time event you'll miss forever" (breaks Safety + induces FOMO)
- Soft visuals + harsh failure ("game over" screen) — pick one tone
- Cozy + leaderboards (breaks Safety; introduces hostile comparison)
- "Cozy multiplayer" without thinking through People-fun-specific cozy design (rare to get right)
- Slow grind disguised as "relaxing pacing" — actual cozy is generous, not stingy

## Cross-reference

- `four-types-of-fun.md` — Cozy primarily serves "Easy fun" (curiosity, exploration) + sometimes "Serious fun" (meaning, learning)
- `flow-state-design.md` — Cozy explicitly *rejects* high-challenge flow; design for "wide flow" (low challenge, sustained engagement)
- `jobs-to-be-done.md` — The cozy JTBD is "emotional reset" — make it explicit in your positioning
- `monetization-ethical-floor.md` — Cozy + predatory monetization is a contradiction; refuse the combination

## Sources

- Tanya X. Short et al., "Designing for Coziness," Project Horseshoe 2017
- Consalvo / Boudreau / Phelps, DiGRA 2025 "How developers talk about cozy games"
- Sago Omnibus 2025 — cross-cultural cozy research, 5-market study
