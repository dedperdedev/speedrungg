---
name: hypothesis-labels
description: "Use when deciding which source label to apply to a claim. Decision flowchart for [USER]/[EVIDENCE]/[HYPOTHESIS]/[PATTERN]/[UNKNOWN]."
---

# Hypothesis Labels — When to Use Which

Quick reference. See `calibration-vocabulary.md` for the full system.

## Decision flowchart

```
Did the user say this?
├── Yes → [USER]
└── No
    ├── Did I see it in real data (analytics, web search, document)?
    │   └── Yes → [EVIDENCE] + cite source + date
    └── No
        ├── Is this a common pattern I'm pattern-matching?
        │   └── Yes → [PATTERN] + flag confidence
        ├── Is this my guess that needs testing?
        │   └── Yes → [HYPOTHESIS]
        └── Don't know? → [UNKNOWN] + state what would answer
```

## Then add confidence

- Verifiable / measurable / cited spec → `[CONFIRMED]`
- Strong inference → `[LIKELY]`
- Anything else → `[UNCERTAIN]`

## Common mistakes

- Citing memory as `[EVIDENCE]` (it's not — your training data is stale)
- Using `[CONFIRMED]` for industry "common knowledge" (it's a `[PATTERN]` until proven otherwise)
- Skipping the label entirely on important claims
- Cherry-picking evidence to justify a label upgrade
