---
name: competitor-watch
description: Set up or refresh ongoing monitoring of a specific competitor.
---

# /competitor-watch

Run by `competitor-analyst`, coordinated by `research-director`.

## Two modes

### Set up watch (one-time)
1. User confirms competitor name + Steam/itch/Poki URL + any social presence
2. Build initial profile (`docs/research/competitors/<slug>.md`)
3. Add to `.claude/research/sources.json` for tracked Steam reviews etc.
4. Schedule light weekly check + quarterly full audit

### Light weekly check (recurring)
1. Have they shipped anything? (release notes, blog posts, dev tweets)
2. Has Steam review velocity changed? (recent reviews vs prior week)
3. Has sentiment shifted? (sample 20 most recent reviews)
4. Have they responded to any criticism publicly?
5. Add findings to weekly digest if material

### Quarterly full audit
- Re-read everything they've shipped this quarter
- Re-survey their community sentiment
- Identify what they've learned that we should learn
- Update profile

## Output

Profile lives at `docs/research/competitors/<slug>.md`. Updates timestamped.

## Anti-patterns

- Watching too many competitors (5-7 max — beyond that signal-to-noise drops)
- Watching competitors who pivoted away from your niche
- Ignoring small competitors with cult followings (often more relevant than market leaders)
- Defining "competitor" too narrowly (include attention-competitors, not just feature-competitors)
