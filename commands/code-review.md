---
name: code-review
description: Code review by lead-programmer against architecture, rules, and patterns.
---

# /code-review

Invokes `lead-programmer`. May delegate to specialists (`security-engineer` for network code, `performance-analyst` for hot paths).

## Rubric

- [ ] Follows dependency direction (core ← gameplay ← rendering/ui/networking)
- [ ] Obeys path-scoped rules in `.claude/rules/`
- [ ] No magic numbers (check `assets/data/*.json`)
- [ ] No direct DOM from gameplay
- [ ] No state outside the store
- [ ] Error paths handled
- [ ] Tests added or updated
- [ ] No dead code, no commented-out blocks
- [ ] Comments explain *why*, not *what*
- [ ] No new deps without `technical-director` sign-off
- [ ] File < 400 lines, functions < 50 lines

## Output

Written review: what to merge, what to fix, what to discuss. Include concrete refactor suggestions when blocking.
