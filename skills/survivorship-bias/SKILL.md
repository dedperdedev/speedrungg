---
name: survivorship-bias
description: "Use when interpreting any sample data — your sample contains survivors and the dropouts are invisible and informative; track the funnel. Skip when the question is general statistical interpretation (defer to statistical-floor), qualitative coding of transcripts (defer to thematic-coding), or running the interview itself (defer to interview-protocols)."
---

# Survivorship Bias

Your sample contains only those who survived to be sampled. The dropouts are invisible — and often they're the most informative.

## Classic example

WWII analysts examined returning bombers, found bullet hole patterns, planned to add armor where the holes were.

Wald: armor where there are NO bullet holes. Planes hit there didn't make it back.

## Game research equivalents

### Steam reviews
You're sampling players who:
- Bought the game
- Played enough to form an opinion
- Bothered to leave a review (most don't)

You're NOT sampling: players who refunded, bounced before reviewing, or never bought.

### Playtest sign-ups
You're sampling players who:
- Saw your tweet / Discord / forum post
- Were interested enough to sign up
- Showed up

You're NOT sampling: players who never heard about it, weren't interested, or are too casual to bother.

### Discord community
You're sampling players who:
- Joined the Discord
- Stay engaged

You're NOT sampling: players who tried the game and bounced, or never tried it.

### Player feedback forms
Same problem — only the engaged answer.

## Game design implications

- **The 90% rule**: most players who download will play < 5 minutes. Your data heavily underrepresents them.
- **Tutorials**: tested with people who already understood the genre. Real new players are different.
- **Difficulty**: tuned by playtesters who self-selected for that difficulty level.
- **Retention curves**: D1 retention of 30% means 70% are gone — you're studying the 30% but the question of "why did 70% leave" is at least as interesting.

## Defenses

### Track the dropouts
Funnel analytics:

```
Visited page → 100%
Loaded game → 80%
Saw main menu → 60%
Started tutorial → 40%
Completed tutorial → 25%
Played first level → 20%
Returned next day → 6%
```

Each step has a question: WHY did people leave HERE?

### Exit interviews / surveys
For people who quit, can you reach them?

- Refund forms (Steam) — sometimes give text feedback
- Quit-game survey (cheap to add, low response rate)
- Lapsed-player email survey (if they have an email)

### Watch unmoderated playtest sessions
PlaytestCloud, Lookback. Real new users on real devices, captured. Less self-selection than recruited testers.

### Assume the worst
When data is rosy, assume that's the survivor view. Pessimistic estimates of retention, satisfaction, etc., are usually closer to reality.

## When NOT to worry

If you only care about your engaged audience (your "core 1%"), survivorship bias is FEATURE not bug. You're studying the people who matter to you.

For mass-market games, broad indie launches, etc., bias matters more — you need to understand why the average person bounced.

## Cross-reference

`statistical-floor.md` for adjacent sample biases. `interview-protocols.md` for qualitative methods.
