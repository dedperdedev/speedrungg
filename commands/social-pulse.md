---
name: social-pulse
description: Quick read on current sentiment / discourse in the niche's communities.
---

# /social-pulse

Run by `social-media-researcher`. For when leadership wants a fast snapshot, not a deep report.

## Protocol

1. Check active sources from `.claude/research/sources.json`
2. Sample top posts/threads from last 7 days per source
3. Identify dominant themes (positive, negative, neutral)
4. Surface the 3 strongest signals + 2 quietest-but-interesting
5. Output to `docs/research/social/pulse-<YYYY-MM-DD>.md`

## Format

```markdown
# Social Pulse — <date>

## Tone right now
<one sentence>

## What people are talking about
- Theme 1: ... [evidence: 3 links]
- Theme 2: ...
- Theme 3: ...

## Surprises (low-volume but interesting)
- ...

## Threats / opportunities
- ...

## What I sampled
- <source>: N items, date range
```

## Anti-patterns

- "The community thinks..." — name the community, name the thread
- Reading only the top 3 hottest posts
- Mixing English and other languages without flagging
- Calling a single thread "a trend"
