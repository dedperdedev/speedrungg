---
name: deep-interview
description: Run a structured deep-interview at a major decision point. Use when the user faces a fork that will shape the game's identity.
---

# /deep-interview

Invokes whichever agent owns the current question (creative-director for vision, marketing-lead for positioning, monetization-strategist for monetization, etc.) — but enforces the full interview protocol from `INTERVIEW_PROTOCOL.md`.

## When to run

- Start of a new game (Foundational Interview — long, ~25 questions)
- Before defining the unique angle (`creative-strategist`)
- Before positioning (`marketing-lead`)
- Before choosing monetization (`monetization-strategist`)
- Before locking the art style (`art-director`)
- At pre-launch (re-validate Foundational Brief)
- Post-launch after first cohort data
- Whenever the user says "I'm not sure" — instead of guessing, run this

## Protocol

1. **Confirm scope.** Which decision? Which agent leads?
2. **Set mode.** Default `deep` from `production/interview-mode.txt`. User can override per command.
3. **Ask in batches.** Read `production/questions-per-round.txt` (default 6 in `deep`, 4 in `standard`, 2 in `fast`). Wait for answers between batches.
4. **Apply Five Whys.** When user gives a thin answer, dig.
5. **Use hypothesis labels.** `[HYPOTHESIS]` / `[PATTERN]` / `[USER]` / `[EVIDENCE]` / `[DECIDED]`.
6. **Refuse defaults.** If user has no answer to something that matters — surface as open question, do not pick.
7. **Distill into a doc.** Output goes to the appropriate `design/vision/*.md` or `docs/research/*.md`.
8. **User reviews and approves** before any downstream work.

## Output template

```markdown
# Interview: <topic> — <date>

## Mode
deep / standard / fast

## Lead agent
<agent-name>

## Questions and answers
1. Q: ...
   A: <user>

2. Q: ... [follow-up: why?]
   A: <user>

...

## Distilled findings
- ...

## Open questions (do NOT default — bring back to user)
- ...

## Decisions locked in this interview
- [DECIDED] ...
```

## Anti-patterns

- Asking everything in one wall of text
- Skipping the Five Whys to "save the user time" (they hate decisions later more than questions now)
- Offering defaults when the user said "I don't know"
- Distilling without showing the user the distillation for approval
- Treating the interview output as immutable — it's a snapshot, can be re-run
