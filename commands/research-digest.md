---
name: research-digest
description: Generate the weekly digest from the Research Hub — what changed across audience, market, competitors, social, trends.
---

# /research-digest

Run by `research-director`. Synthesizes outputs from all hub agents into one weekly summary for leadership.

## Protocol

1. Read each hub agent's recent output (last 7 days) from `docs/research/`
2. Identify cross-dimension patterns (e.g. trend + social signal point same direction)
3. Sort by impact-on-project, not by recency
4. Limit to ~10 items total — anything more dilutes signal
5. Write to `docs/research/digests/<YYYY-WW>.md`
6. Notify creative-director, product-owner, project-manager

## Format

```markdown
# Research Digest — Week <YYYY-WW>

## Summary (3 sentences max)
<headline-level: what should leadership know in 30 seconds>

## Highest impact (act-this-week candidates)
- <item> — implication: ... [from <agent>, source: ...]

## Worth knowing (no action needed yet)
- <item> [from <agent>]

## Watching
- <item> — what would escalate this

## What stayed quiet
- <area where no significant change — sometimes more important than change>

## Open requests outstanding
- <items in flight from /research-request>
```

## Anti-patterns

- Listing everything found (curate ruthlessly)
- Burying the lede
- Citing without source links
- Optimizing for "looking productive" instead of being useful
- Skipping the "what stayed quiet" section
