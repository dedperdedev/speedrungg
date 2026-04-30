# NEXT_ITERATION_PROMPT.md — Subsequent Iterations

Use this template for every change after the first implementation.

---

```
Read production/session-state/latest.md for current context.

I want to: [DESCRIBE THE CHANGE — new feature, tweak, bug fix, refactor].

Before touching code:
 1. Identify which agent(s) own this change.
 2. Check the change against ARCHITECTURE.md and DESIGN_RULES.md.
 3. Check path-scoped rules for the files you'll edit.
 4. Update design/gdd/ if the design is changing.
 5. Propose a plan with 2–4 options and trade-offs.
 6. Wait for my approval.

For balance tweaks: change values in assets/data/*.json, not in code.
For new systems: write the ADR first (docs/adr/), design second, code third.
For bug fixes: reproduce with a test before fixing.

After execution:
 - Update tests
 - Update docs if behavior changed
 - Run /code-review
 - Log the change in production/session-state/
```

---

## Common iteration types

### New feature

- Check `DESIGN_RULES.md` → does it fit the pillars?
- Check `docs/adr/` → any relevant prior decisions?
- Producer coordinates if it crosses departments
- Write an ADR if it changes architecture

### Balance tweak

- Change numbers in `assets/data/*.json`
- Run `/balance-check`
- Playtest — use `/playtest-report` to structure feedback

### Bug fix

- Reproduce with a failing test first
- Fix
- Confirm the test now passes
- Look for related bugs in the same subsystem

### Mechanic removal

- Write an ADR explaining why (future-you will forget)
- Update the GDD
- Remove the code
- Remove the assets (or archive if they may return)
- Remove the analytics events

### Refactor

- Never refactor and add a feature in the same commit
- Tests must pass before and after
- If tests are missing, add them BEFORE refactoring

### Performance pass

- Run `/perf-profile` first to get a baseline
- Fix the single biggest bottleneck
- Re-profile
- Repeat until budgets are met or returns diminish
