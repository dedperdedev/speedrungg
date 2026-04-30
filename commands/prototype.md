---
name: prototype
description: Build a throwaway prototype in /prototypes to validate a mechanic quickly.
---

# /prototype

> **Plan Mode required.** This command makes durable, hard-to-reverse decisions. Before any execution:
> 1. Gather context (read referenced files; ask clarifying questions; label hypotheses)
> 2. Present a numbered, calibrated plan with [CONFIRMED]/[LIKELY]/[UNCERTAIN] labels
> 3. Wait for explicit user approval ("yes", "ok", "go") — silence is NOT approval
> 4. Only then execute, one step at a time, reporting deltas
> 
> If at any point a [LIKELY] or [UNCERTAIN] becomes blocking, stop and re-plan.


Usage: `/prototype "<one-sentence mechanic pitch>"`

## Protocol

1. **Single file, isolated.** Prototype lives in `prototypes/<slug>/index.html` — standalone, no integration with main game.
2. **24-hour rule.** If it takes > 1 day of work, it's not a prototype — escalate to `product-owner` for proper scoping.
3. **Validate one question.** "Is this fun to control?" or "Does this mechanic read at a glance?" — one claim, testable.
4. **No polish.** Ugly rectangles are fine. No assets pipeline. No sound. Zero deps if possible.
5. **Write the learning.** After playing, `prototypes/<slug>/FINDINGS.md`: did it answer the question? Next step?
6. **Do NOT merge into main game.** Prototype validates; real implementation is a separate task.

## What to use

- For 2D feel: pure Canvas 2D
- For 3D feel: minimal Three.js
- For physics feel: inline Matter.js

## Anti-patterns

- Spending 3 days on a "prototype"
- Prototype that tries to answer 5 questions at once
- Prototype with a full art style — you've wandered into implementation
