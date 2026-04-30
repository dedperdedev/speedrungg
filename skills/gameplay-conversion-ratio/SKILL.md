---
name: gameplay-conversion-ratio
description: "Use when optimizing for portal distribution (Poki, CrazyGames). 73% target metric: load time + first screen + first 30 seconds + tech basics."
---

# Gameplay Conversion Ratio

The single most important metric for portal-distributed web games. **Industry benchmark (CrazyGames, top quartile): ~73% gameplay conversion** — players who click "Play Now" and stay engaged for ≥1 minute.

## The metric

```
Gameplay Conversion = (Sessions ≥1 min) / (Play Now clicks)
```

Why this matters:
- Portals algorithmically promote games with high conversion (more revenue per slot)
- Low conversion = portal stops featuring your game = traffic dies
- Even Poki/CrazyGames partnership-grade games are continuously evaluated

A game that loads slow, confuses on first screen, or fails to communicate "what is this and why play" within 10 seconds will hemorrhage conversion.

## What kills conversion

### Load time
- ≥3 seconds to interactive: 30%+ bounce
- ≥5 seconds: 50%+ bounce
- ≥7 seconds: most players gone

Target: ≤2 seconds TTI on mid-range mobile (4G connection, mid-tier Android).

### First-screen confusion
Player clicks Play Now, sees:
- Loading screen with no progress: -10%
- Title screen with multiple buttons: -15% (decision fatigue, unclear primary action)
- Lore text or cutscene: -20%+ (player came to PLAY)
- Settings menu: -25%

### First 30 seconds of play
- No clear goal in 5 seconds: -15%
- No interactive moment in 10 seconds: -20%
- First failure with no recovery: -25%
- Tutorial wall of text: -30%

See `first-30-seconds-rule.md` for the full discipline.

### Tech failures
- Audio doesn't unlock on iOS Safari: -10% (silent game = "broken")
- Touch controls feel laggy: -20%
- Frame drops in first 30s: -30%
- White screen / blank page: -90% (catastrophic)

## Diagnostics

If conversion < 50%, the problem is almost always one of:
1. **Load time** — measure with Lighthouse on slow 4G
2. **First-screen confusion** — watch 5 first-time players (no instructions); where do they bounce?
3. **First 30 seconds** — same playtest; do they take a meaningful action?

If conversion < 30%, the game is structurally broken for this distribution channel. Either fix or pivot platform.

## Optimization recipe

### Step 1: Measure baseline
- Before optimizing, get current conversion from portal analytics (Poki/CrazyGames provide)
- Or instrument: `play_now_clicked` and `gameplay_engaged_60s` events

### Step 2: Fix load time
- Bundle ≤2 MB initial (see `bundle-budget-strategy.md`)
- Critical assets first; rest streamed
- Show progress visually from second 1
- Measure with Lighthouse, throttled to slow 4G

### Step 3: Fix first screen
- Single primary action visible immediately
- No multi-step menus before play
- Lore/tutorial deferred to after first interaction
- Test: hand the URL to someone who's never seen it; do they play within 10 seconds?

### Step 4: Fix first 30 seconds
- See `first-30-seconds-rule.md`
- Goal clear in 5 seconds
- First interactive moment by 10 seconds
- First success / reward by 30 seconds

### Step 5: Fix tech basics
- iOS audio unlock (see `web-audio-procedural.md`)
- Touch input parity with keyboard
- 30+ FPS on mid-range mobile
- No white-screen errors

### Step 6: Iterate
- Each fix: measure conversion delta
- Goal: monotonic improvement toward 73%
- Plateau → next bottleneck

## Cohort analysis

Conversion varies by:
- **Source** (organic search vs portal carousel vs social)
- **Device** (desktop vs mobile vs tablet)
- **Session time** (first-time vs return)

Always segment. A 60% overall conversion might be 80% on desktop and 35% on mobile — fix mobile.

## Per-platform benchmarks

| Platform | Top quartile conversion | Notes |
|---|---|---|
| CrazyGames | ~73% | Stated benchmark |
| Poki | ~70%+ | Inferred from partnership requirements |
| itch.io HTML5 | ~50% | Audience self-selected; lower bounce |
| Aggregator portals | 30-50% | Wide variance by source |

Don't compare across platforms; the audience and click intent differ.

## Honest cautions

- **Conversion is a portal-side metric, not a player-experience metric.** A game can have 80% conversion and bad retention. Fix conversion to keep the portal happy; fix retention to make the game good. Both matter.
- **High conversion on a derivative game** is often easier than on a novel game. Player knows what they're getting → quick judgment → engaged. Novel games have higher exploration cost. This doesn't mean you should make derivative games — it means measure novel-game conversion against novel-game baselines, not derivative ones.
- **The 73% number** is from CrazyGames public guidance; specific games will land in 30%–80% range based on genre, audience match, and execution quality.

## Cross-reference

- `first-30-seconds-rule.md` — what to put in those critical seconds
- `bundle-budget-strategy.md` — how to hit 2-second TTI
- `loading-screens-that-work.md` — perceived performance
- `web-audio-procedural.md` — iOS audio unlock requirement
- `web-game-portal-comparison.md` — which portals use this metric
