---
name: design-review
description: Director-level design critique against pillars, MDA, SDT, and session-length targets.
---

# /design-review

Invokes `creative-director` + `game-designer` jointly.

## Checklist

- [ ] Feature serves at least one pillar (from `design/vision/pillars.md`)
- [ ] Mechanic / dynamic / aesthetic articulated (MDA)
- [ ] Hits at least two of autonomy / competence / relatedness (SDT)
- [ ] Fits the session-length target
- [ ] First-30-seconds rule honored (new players understand within 30s)
- [ ] Accessibility requirements met (keyboard, colorblind, reduced-motion)
- [ ] No duplicate verb (if new mechanic overlaps with existing, justify)
- [ ] Tunables extractable to JSON
- [ ] Failure modes graceful (pause, disconnect, save, resize)
- [ ] Telemetry events identified (with `analytics-engineer`)

## Output

A written review in `docs/reviews/design-<date>-<feature>.md`:

- Verdict: **ship / iterate / redesign / cut**
- Specific issues with line references
- Suggestions (2–4 alternatives for each issue)
- Open questions for the user

If review blocks a ship, `game-designer` proposes a remediation plan and asks the user to pick.
