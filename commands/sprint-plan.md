---
name: sprint-plan
description: Plan the next 1-2 week sprint.
---

# /sprint-plan

> **Plan Mode required.** This command makes durable, hard-to-reverse decisions. Before any execution:
> 1. Gather context (read referenced files; ask clarifying questions; label hypotheses)
> 2. Present a numbered, calibrated plan with [CONFIRMED]/[LIKELY]/[UNCERTAIN] labels
> 3. Wait for explicit user approval ("yes", "ok", "go") — silence is NOT approval
> 4. Only then execute, one step at a time, reporting deltas
> 
> If at any point a [LIKELY] or [UNCERTAIN] becomes blocking, stop and re-plan.


Invokes `project-manager` with input from `product-owner`.

## Protocol

1. **Close previous sprint.** Run `/sprint-retro` if not done.
2. **Pull from backlog.** `product-owner` presents top N items from `production/backlog.md`.
3. **Size each task.** S (<1 day), M (1–3 days), L (3–5 days). No XL.
4. **Capacity check.** Based on last 3 sprints' delivery, not ambition.
5. **Dependencies.** Sequence correctly. One item unblocks another.
6. **One sprint goal.** Single sentence summarizing what this sprint delivers.
7. **One risk.** The thing most likely to blow up. Have a fallback.
8. **Reserve 20%** for unplanned work.
9. **Write `production/sprint/<start-date>/plan.md`** with sprint goal, tasks, owners, sizes, risk.

## Rules

- No XL tasks allowed in a sprint (split or defer)
- Every task has an owner (a named agent)
- Every task has acceptance criteria
- Cross-department work gets `production/sprint/<start-date>/cross-cuts.md`
