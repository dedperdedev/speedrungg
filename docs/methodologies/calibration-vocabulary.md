# Calibration Vocabulary

Two label systems, used together. Every non-trivial claim wears one of each.

## Confidence labels (3 levels)

| Label | Meaning | When to use |
|---|---|---|
| **`[CONFIRMED]`** | Verified fact / standard / specification | Cite a spec section, a benchmark, a measured number, a regulation |
| **`[LIKELY]`** | Strong inference from evidence or established pattern | "Based on X, this should hold" — you'd bet on it but haven't measured |
| **`[UNCERTAIN]`** | Hypothesis, guess, or weakly supported | Mark anything where you're not confident — and surface what would resolve it |

**Rule:** if you cannot label a claim `[CONFIRMED]` or `[LIKELY]`, label it `[UNCERTAIN]` and explain what evidence would upgrade it.

## Source labels (where the claim came from)

| Label | Meaning |
|---|---|
| **`[USER]`** | The user told us this in conversation or a doc |
| **`[EVIDENCE]`** | Backed by data the user provided OR by a web search this session |
| **`[HYPOTHESIS]`** | Agent's pattern-match — needs testing |
| **`[PATTERN]`** | Common in the genre / codebase / industry — may not apply here |
| **`[UNKNOWN]`** | We don't know and need to find out |

## Combining the two

Examples of well-labeled claims:

- `[CONFIRMED][EVIDENCE]` — "Phaser 3 supports texture atlases natively (per their docs, dated 2025-11)"
- `[LIKELY][PATTERN]` — "Object pooling reduces GC pauses in WebGL games (commonly observed pattern, no measurement here yet)"
- `[UNCERTAIN][HYPOTHESIS]` — "This mechanic might appeal to the cozy-game audience (agent guess; would need playtest to confirm)"
- `[UNCERTAIN][UNKNOWN]` — "Current 2026 ad CPMs in the casual web-game segment — we don't know, need to research"

## Forbidden combinations

- `[CONFIRMED][HYPOTHESIS]` — these are mutually exclusive. Hypothesis can't be confirmed without data.
- `[CONFIRMED]` without a citable source — "I'm confirmed sure" is not a citation.

## Rule for agents

If a sentence carries a non-trivial claim and has no labels — that's a violation of the protocol. The user should be able to skim a report and instantly see what's certain vs guessed.

## Reader's quick guide

- See `[CONFIRMED]` → trust and act
- See `[LIKELY]` → trust enough to act, but verify before high-stakes decisions
- See `[UNCERTAIN]` → don't make irreversible decisions on this alone
