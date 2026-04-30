---
name: sprint-retro
description: Sprint retrospective — what worked, what didn't, one thing to change.
---

# /sprint-retro

Invokes `project-manager`.

## Structure

`production/sprint/<start-date>/retro.md`:

```markdown
# Sprint Retro <date>

## Goal (set at start)
<the single-sentence goal>

## Goal met?
Yes / Partially / No — with evidence

## Delivered
- [x] <task> (owner)

## Not delivered
- [ ] <task> (owner) — reason

## What went well
- <specific, concrete>

## What didn't
- <specific, concrete — not "communication could be better">

## Root cause (for the biggest miss)
- Five-whys if useful

## One change for next sprint
- <single, specific action>

## Metrics
- Tasks planned / delivered
- Blockers encountered / resolved
- Capacity planned vs actual
```

## Anti-patterns

- Multi-item change lists (pick one)
- Vague observations ("we should communicate better")
- Skipping root cause for the biggest miss
- No metrics — no learning loop
