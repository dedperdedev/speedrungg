---
name: audience-deep-dive
description: Run a structured deep-dive on one audience segment.
---

# /audience-deep-dive

Run by `audience-researcher`, coordinated by `research-director`.

Usage:
- `/audience-deep-dive` — run on the configured primary segment
- `/audience-deep-dive <segment-id>` — run on a specific segment
- `/audience-deep-dive --intake` — first-time setup, define a segment from scratch via intake interview

## Intake mode (first-time setup)

If `audience-segments.json` has a placeholder primary segment, run `--intake` first. Asks the user:

1. **Who is this segment?** (One specific person, not a demographic.)
2. **Why this segment, why now?** (User's rationale — not invented.)
3. **Where do they congregate?** (Subreddits, Discord servers, YouTube channels — populates `sources.json`.)
4. **Roughly how many of them are there?** (User estimate, flag as `[USER-ESTIMATE]`.)
5. **What do we need to learn about them?** (Becomes the segment's `key_questions`.)
6. **Are there secondary segments?** (Recommend ≤ 2.)
7. **Are there anti-segments?** (Players we will NOT build for — documents scope.)

Updates `audience-segments.json` with intake results. User reviews and approves before any actual research begins.

## Protocol (deep-dive itself)

1. Confirm segment with leadership — which one (from `audience-segments.json`)
2. Define the question — what do we want to learn that we don't know?
3. Choose method(s) — interviews / survey / behavioral observation / mixed
4. Plan recruitment — user-driven (their network), playtest pool, paid panel
5. Execute (user runs interviews; agent provides guide and analyzes transcripts)
6. Code findings — themes, quotes, patterns
7. Update / create persona doc
8. Surface 3-5 strongest insights for leadership

## Output

`docs/research/audience/<segment>/deep-dive-<YYYY-MM>.md`:

```markdown
# Audience Deep Dive — <segment> — <YYYY-MM>

## Question
<what we wanted to learn>

## Method
<interview guide, sample, methodology>

## Findings
- Insight 1 (strong/medium/weak): <description> [evidence: P3, P5, P7]
- Insight 2: ...

## Quotes (real, attributed)
- P3: "<quote>"
- P5: "<quote>"

## Implications
- For game design: <hypothesis>
- For marketing: <hypothesis>
- For monetization: <hypothesis>

## What we still don't know
- <next question this raises>

## Confidence
<level + caveats>
```

## Anti-patterns

- Running deep-dive without a clear question
- Single-interview "deep dives"
- Generalizing across segments
- Inventing quotes
- Designing the interview to confirm a hypothesis
