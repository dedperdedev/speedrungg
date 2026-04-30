---
name: balance-check
description: Review economy and difficulty balance against live data or simulated sessions.
---

# /balance-check

Invokes `economy-designer` + `game-designer` + (if data exists) `research-analyst`.

## Two modes

### Mode A — Pre-launch (no real data yet)
- Build spreadsheet / sim script in `tools/balance/`
- Run N simulated sessions with varying player skill profiles
- Check: earn/spend curves, time-to-upgrade, inflation/deflation, soft walls
- Adjust `assets/data/economy.json`
- Re-sim, iterate

### Mode B — Post-launch (analytics exists)
- `research-analyst` queries analytics
- Cohort: earn rate, spend rate, currency balance distribution at day 1/7/30
- Flag: hoarders (earn > spend forever), broke players (spend > earn, can't progress)
- Check completion rate vs intended difficulty curve
- Propose adjustments with confidence level

## Output

- Adjusted numbers in `assets/data/economy.json`
- Report in `docs/balance-reports/<date>.md`: before → after, rationale, expected effect
- Analytics events to watch post-change

## Anti-patterns

- Balancing by gut after one playthrough
- Changing numbers without simulating first
- Ignoring the long tail (endgame balance that only whales ever see)
