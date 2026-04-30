---
name: playtest-report
description: Structure raw playtest notes into an actionable report.
---

# /playtest-report

Invokes `research-analyst`. Turns raw session notes into structured findings.

## Input expected

User provides:
- Build version played
- Participants (N, rough demographics)
- Session recording or notes
- Verbal feedback / survey responses

Agent does NOT invent participants or data.

## Structure

```
docs/playtest-reports/<YYYY-MM-DD>-<build>.md

## Context
- N participants, skill levels, session length, tasks

## Observed behavior (not interpretation yet)
- Participant 1: died 4 times on level 2, quit
- Participant 2: completed level 2 first try, asked "what's that button?"
...

## Quotes (direct, attributed)
- P1: "I don't know why I died, it felt cheap"
- P3: "I loved when the screen shook on the hit"

## Patterns across participants
- 3 / 5 couldn't find the pause menu
- 4 / 5 praised the dash feel

## Hypotheses (labeled as hypotheses)
- H1: pause menu location isn't discoverable — requires UI change
- H2: level 2 difficulty spike is unintentional — data needed

## Recommendations (with confidence)
- Strong: move pause menu to top-right (H1 backed by 3/5 participants)
- Medium: review level 2 enemy placement (H2 — hypothesis, needs more data)

## Open questions
- Would tutorial cue fix pause issue, or does it need UI change?
```

## Anti-patterns

- Conclusions from 1 playtester
- "Players love this" without quote evidence
- Mixing observation and interpretation in the same section
