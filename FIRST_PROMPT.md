# FIRST_PROMPT.md — New Game

Copy this prompt into your Claude Code session when starting a fresh web game project.

---

```
You are the studio. Read CLAUDE.md, INTERVIEW_PROTOCOL.md, AGENTS.md,
ARCHITECTURE.md, DESIGN_RULES.md before proposing anything.

I want to build a unique web game. Help me make sure it actually IS unique
and IS mine — not a clone, not a generic template.

Run the Foundational Interview first (~25 questions across 6 blocks). Use
the Five Whys when my answers are thin. Refuse to pick defaults for me on
anything that affects identity (audience, fantasy, tone, art direction,
monetization). Use hypothesis labels: [USER] / [HYPOTHESIS] / [PATTERN] /
[EVIDENCE] / [DECIDED].

Pace yourself: respect production/questions-per-round.txt (default 6 in deep
mode), wait for my answers, then go deeper.

Do NOT write any code, scaffold any engine, or commit to any direction
until:
 1. The Foundational Brief exists in design/vision/foundation.md
 2. I have approved the brief
 3. The Uniqueness doc exists in design/vision/uniqueness.md
 4. I have approved the uniqueness angle
 5. Engine choice is made via /setup-engine
 6. Sprint 1 plan is agreed

After each director or lead speaks, summarize open questions and ask me
to decide. Don't make creative or product calls for me.

Mode: deep (from production/interview-mode.txt). Don't shortcut this.
```

---

## What to expect

1. **Foundational Interview** — `creative-director` runs 6 blocks of 3-5 questions each:
   - The person (you, your motivation, your time)
   - The taste (games you love, hate, what moves you)
   - The audience (one specific person, not a demographic)
   - The constraints (platform, time, money, deadline)
   - The unique angle (the twist, the harshest critic)
   - The non-goals

2. **Foundational Brief** — distilled into `design/vision/foundation.md`. You review and edit. Iterate until it's right.

3. **Uniqueness Interview** — `creative-strategist` runs ~13 questions to excavate your voice. Output: `design/vision/uniqueness.md`.

4. **Pillars + pitch** — `creative-director` writes `design/vision/pillars.md`, `creative-strategist` writes `design/vision/elevator-pitch.md` at three lengths.

5. **Positioning Interview** — `marketing-lead` runs 5 blocks of ~3 questions to pin down promise, shelf, hook, channels, resources.

6. **Monetization Interview** — `monetization-strategist` runs 3 blocks (~14 questions) on values, constraints, audience expectations.

7. **Engine recommendation** — `technical-director` proposes engine + stack based on everything above. You approve.

8. **`/setup-engine <choice>`** scaffolds. ADR written to `docs/adr/0001-engine-choice.md`.

9. **Sprint 1 plan** — `project-manager` proposes a 1–2 week sprint. You approve. Execution begins.

This sounds like a lot — and it is. **It's also the difference between a unique game you stand behind and a generic template that runs out of steam in week 3.** If you want to skip ahead for a prototype, set `production/interview-mode.txt` to `fast` and run `/start --interview fast`.

---

## Time budget

| Mode | Foundational Interview | Total before first code |
| --- | --- | --- |
| `deep` (default) | ~90 minutes | ~half a day across multiple sessions |
| `standard` | ~45 minutes | ~3 hours |
| `fast` | ~15 minutes | ~1 hour |

Treat the interview like an investment, not an obstacle. Every hour here saves a week of "this isn't quite working" later.
