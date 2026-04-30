---
name: perf-profile
description: Performance profile — FPS, memory, main-thread work, rendering cost.
---

# /perf-profile

Invokes `performance-analyst`. Non-guessing — uses measurements.

## Protocol

1. **Define scenario.** "Loaded main menu," "10 minutes into match," etc.
2. **Capture.** Chrome DevTools Performance tab, 10-second recording.
3. **Identify top flame.** Biggest time cost on the main thread.
4. **Analyze.** Why? GC? Layout thrash? Expensive function? Rendering overdraw?
5. **Propose fix.** Specific, scoped to one change.
6. **Re-measure.** Confirm delta.
7. **Stop when under budget** from `production/budgets.md`.

## Budgets (default)

| Metric | Desktop | Mobile |
| --- | --- | --- |
| FPS | 60 | 30 |
| Main-thread long task | < 50ms | < 50ms |
| Memory | 256 MB | 128 MB |

## Output

`docs/perf-reports/<date>.md`: scenario, before numbers, identified issue, fix applied, after numbers.
