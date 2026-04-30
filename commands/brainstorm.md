---
name: brainstorm
description: Structured idea exploration when the user has no game concept yet.
---

# /brainstorm

> **Plan Mode required.** This command makes durable, hard-to-reverse decisions. Before any execution:
> 1. Gather context (read referenced files; ask clarifying questions; label hypotheses)
> 2. Present a numbered, calibrated plan with [CONFIRMED]/[LIKELY]/[UNCERTAIN] labels
> 3. Wait for explicit user approval ("yes", "ok", "go") — silence is NOT approval
> 4. Only then execute, one step at a time, reporting deltas
> 
> If at any point a [LIKELY] or [UNCERTAIN] becomes blocking, stop and re-plan.


Invoke `creative-director` + `game-designer` jointly. Run a constrained ideation process — constraints beat blank canvas.

## Protocol

**Step 1 — Gather constraints.** Ask the user 5 questions:
1. Favorite games (as reference, not to clone)
2. Available dev time per week
3. Target session length (30s? 5min? 30min?)
4. Team — solo, pair, bigger?
5. Any absolute non-goals (no multiplayer, no gore, no grind...)

**Step 2 — Propose seeds.** Generate 3 pitches via constraint combination. Each pitch has:
- Core verb (what the player does)
- One-line hook
- Pillars (3)
- Reference inspiration — but novel twist
- Rough scope estimate (weeks)

**Step 3 — User picks or rejects.** If rejected, understand *why* — wrong tone? wrong genre? wrong effort? — and regenerate.

**Step 4 — Hand off.** Once the user picks, `creative-director` drafts the `design/vision/pitch.md` and escalates to `product-owner` for the 7-questions interview.

## Important

- Do NOT claim any pitch is "trending" or "hot" — you don't know the 2026 market.
- Constraints come from the user; if the user gives none, ask. Don't default to "fantasy RPG."
- One pitch in the set should be deliberately weird — constraints produce boring pitches if every option plays safe.
