---
name: start
description: Bootstrap entry point — figures out where you are in the project lifecycle and routes you to the right workflow.
---

# /start

> **Plan Mode required.** This command makes durable, hard-to-reverse decisions. Before any execution:
> 1. Gather context (read referenced files; ask clarifying questions; label hypotheses)
> 2. Present a numbered, calibrated plan with [CONFIRMED]/[LIKELY]/[UNCERTAIN] labels
> 3. Wait for explicit user approval ("yes", "ok", "go") — silence is NOT approval
> 4. Only then execute, one step at a time, reporting deltas
> 
> If at any point a [LIKELY] or [UNCERTAIN] becomes blocking, stop and re-plan.


Before anything else: read `INTERVIEW_PROTOCOL.md`. The default stance is **deep interview** — refuse defaults, label hypotheses, dig with Five Whys.

Your first question to the user:

> Where are you right now?
> 1. **No idea** — I want to make a web game but don't know what
> 2. **Vague concept** — I have a fuzzy pitch, need to shape it
> 3. **Clear design** — I know what I'm building, need to start coding
> 4. **Existing code** — I have a project and want the studio's help

## Route

- **1** → `/brainstorm` to generate concepts (interview-driven), then `/start` again
- **2** → invoke `creative-director` for the Foundational Interview (~25 questions, 6 blocks). Then `creative-strategist` runs the Uniqueness Interview. Then `marketing-lead` runs Positioning. Then `monetization-strategist` runs Monetization. THEN `technical-director` for engine recommendation → `/setup-engine`.
- **3** → still run a *condensed* interview to validate the design wasn't built on hidden assumptions. Then `technical-director` → `/setup-engine`.
- **4** → analyze repo, map existing code to studio structure, run a "current state" interview, propose incremental adoption plan.

## In all cases

- Read `CLAUDE.md`, `INTERVIEW_PROTOCOL.md`, `AGENTS.md`, `ARCHITECTURE.md`, `DESIGN_RULES.md` before proposing anything
- Confirm `production/interview-mode.txt` setting (`deep` / `standard` / `fast`)
- Confirm `production/review-mode.txt` setting (`full` / `lean` / `solo`)
- Confirm engines they want enabled
- Ask about Tailwind: needed or not?
- Set up `production/session-state/latest.md` for this session

## What NOT to do

- Don't start coding before the Foundational Brief exists
- Don't pick defaults for the user when uniqueness is at stake
- Don't skip the interview to "save time" — it's the most valuable hour of the project
