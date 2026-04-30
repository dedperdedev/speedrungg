---
name: opportunity-solution-tree
description: "Use when planning quarter-level work — Teresa Torres outcome → opportunities → solutions → experiments, preventing feature-factory thinking. Skip when the work is sprint-level backlog scoring (defer to rice-scoring), audience job framing (defer to jobs-to-be-done), or interpreting experiment results (defer to statistical-floor)."
---

# Opportunity Solution Tree

Teresa Torres' framework. Prevents the trap of "we have a list of features to build" instead of "we have a goal to reach."

## The structure

```
                          OUTCOME
                  (the goal that matters)
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   OPPORTUNITY 1   OPPORTUNITY 2   OPPORTUNITY 3
   (player problem) (player problem) (player problem)
        │              │              │
   ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
   │         │    │         │    │         │
SOLUTION  SOLUTION  SOLUTION  SOLUTION  SOLUTION
   │         │    │         │    │         │
EXPERIMENT  EXPERIMENT  EXPERIMENT  EXPERIMENT  ...
```

## Walking the tree

### Outcome
What metric or goal? Specific. Measurable.

❌ "Make it better"
✅ "Increase D7 retention from 6% to 12%"

### Opportunities (player problems)
Each opportunity is a player pain point or unmet need that, if solved, moves the outcome.

Source: research, playtests, analytics, your own observation.

### Solutions
For each opportunity, multiple possible solutions.

❌ "Make a new feature"
✅ "Add a 1-click resume from where you left off"

### Experiments
For each solution, the smallest test that would tell you if the solution works.

❌ "Build it and see"
✅ "Add resume button to top of menu, A/B test for 1 week, measure D2 return"

## Why this matters

Most teams jump from outcome to solution, skipping opportunity. Result: features that don't move the metric, because they didn't actually solve a player problem.

Example:

```
Outcome: increase retention.
Wrong: "Let's add achievements!" (skipped opportunity)
Right: Why are players churning?
       → They forget the game between sessions
       → Solutions: notification, resume button, daily reminder, streak system
       → Pick smallest experiment to test the assumption
```

## Sizing the tree

For a quarter of work:
- 1-2 outcomes
- 3-5 opportunities per outcome
- 2-3 solutions per opportunity (only the most promising)
- 1-2 experiments per solution

Don't try to walk every branch. You're choosing which branches to invest in.

## Pruning

After every experiment:

- If it moved the outcome → solution validated, ship + scale
- If it didn't → solution invalidated, try next solution under same opportunity
- If multiple solutions in an opportunity all fail → opportunity is wrong (or harder than expected)

## Anti-patterns

### Feature factory
Solutions list with no opportunities → you're just building, not solving.

### Vanity outcomes
"Make players happy." Not measurable.

### One-and-done experiments
You ran one test, it didn't move the needle, you abandoned the opportunity. Try other solutions first.

### Skipping experiments
"This solution will obviously work." Then ship it and watch it fail. Experiment, even small ones.

## Cross-reference

`rice-scoring.md` for prioritizing branches. `jobs-to-be-done.md` for finding opportunities.
