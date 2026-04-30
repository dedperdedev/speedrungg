---
name: behavioral-economics-for-games
description: "Use when discussing player psychology, persuasion, or monetization design — cognitive biases (anchoring, loss aversion, etc.) with the ethical/exploitative line. Skip when the question is concrete monetization hard-rules (defer to monetization-ethical-floor) or EU regulatory constraints (defer to digital-fairness-act-watch)."
---

# Behavioral Economics for Games — With Ethical Guardrails

The cognitive patterns games can leverage. **Some serve the player. Some exploit them.** This file marks the line.

## The principles (and their dual nature)

### Anchoring
First number sets the reference. Subsequent prices judged against it.

✅ ETHICAL: Price comparison ("compare to standalone purchase: $30, this bundle: $20") — informative.
❌ EXPLOITATIVE: Fake "original price" / "65% off!" — manipulative.

### Loss aversion
People feel losses ~2x more strongly than equivalent gains.

✅ ETHICAL: Save state preservation ("you'll lose your progress if you quit") — accurate warning.
❌ EXPLOITATIVE: "Don't lose your streak — pay $1 to recover" — manipulating loss aversion to extract money.

### Endowment effect
People value things they own more than things they could acquire.

✅ ETHICAL: Personalization (let players name pets, customize avatars) — they invest, they care.
❌ EXPLOITATIVE: Free trial that auto-converts to paid before they really decide — using endowment to lock in.

### Sunk cost fallacy
People continue investing because they've already invested.

✅ ETHICAL: Long campaigns where the journey is rewarding — players naturally complete.
❌ EXPLOITATIVE: "You've come this far, complete the quest with $2" — directly exploiting the fallacy.

### Variable reward (Skinner box)
Unpredictable rewards are more engaging than predictable ones.

✅ ETHICAL: Procedural generation, random combat outcomes — game variety.
❌ EXPLOITATIVE: Slot-machine UI for loot drops with low odds and pity timers — gambling mechanics.

### Reciprocity
Giving creates desire to give back.

✅ ETHICAL: Generous tutorial, free demo, post-purchase support — relationship building.
❌ EXPLOITATIVE: "Free gift!" that initiates an in-app purchase flow — manipulating reciprocity for sales.

### Social proof
People do what others do.

✅ ETHICAL: "1.2 million players" on store page (if true) — informative.
❌ EXPLOITATIVE: "Player X just bought the premium pack!" pop-ups in your game — fake urgency.

### Scarcity
Limited supply increases perceived value.

✅ ETHICAL: Genuinely limited content (one-time event with real reason) — creates moments.
❌ EXPLOITATIVE: Fake countdown timers, "only 3 left!" of a digital good — pure manipulation.

### Default effect
People accept defaults.

✅ ETHICAL: Sensible defaults that serve the player (volume slider at 70%, not 100%) — respect.
❌ EXPLOITATIVE: Default-opt-in to subscription with hidden uncheck — dark pattern.

### Mental accounting
People treat money differently based on its label / source.

✅ ETHICAL: Clear pricing in real currency — respect cognition.
❌ EXPLOITATIVE: Premium currency that obscures dollar cost — designed to break mental accounting.

## The line

For each principle:

**Ethical use:** Aligns with player interest. Helps them get what they wanted. Doesn't manipulate against their conscious values.

**Exploitative use:** Extracts value from cognitive biases the player would rather not have exploited. Creates value for the developer at cost to the player.

## Test for any monetization mechanic

- If the player understood EXACTLY what was happening psychologically, would they still consent?
- If yes → it's a fair design choice
- If no → it's a dark pattern, refuse

## Why this matters

Cognitive biases are universal. Mobile gaming (especially F2P) industry weaponized them, leading to:

- Documented harm in vulnerable players
- Regulatory backlash (loot box laws)
- Reputational damage to gaming
- Player burnout, churn, reviews like "feels like a slot machine"

For long-term success: align design with the player's interests, not against them.

## Where to apply ethically

- **Onboarding** — reciprocity (give value first), endowment (personalization)
- **Tutorial** — defaults that work, sensible anchors
- **Reward systems** — variable reward (with disclosed odds)
- **Pricing** — clear anchors based on real comparisons

## Cross-reference

`monetization-ethical-floor.md` for the hard refusals. `economy-source-sink.md` for the honest-design alternative to dark patterns.
