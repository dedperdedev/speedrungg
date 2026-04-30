---
name: thematic-coding
description: "Use when analyzing playtest transcripts or interview data. Open coding → themes → counts → representative quotes; bias guards."
---

# Thematic Coding — Analyzing Interview Transcripts

The standard qualitative research method for finding patterns across N interviews. Adapted to be lightweight.

## Process

### 1. Read once, no notes
Read all transcripts straight through. Goal: get a feel.

### 2. Open coding
Read again, this time tagging quotes with short labels.

```
"I felt lost in the menu" → CODE: navigation, confusion
"The colors were really nice" → CODE: visual, positive
"I died like 5 times before getting it" → CODE: difficulty, learning, persistence
```

Codes are short (1-3 words). Don't worry about perfection.

### 3. Group codes into themes
After coding, see which codes appear repeatedly. Group similar codes:

```
THEME: Onboarding friction
  - navigation confusion (P1, P3, P5)
  - tutorial unclear (P3, P5)
  - first death anger (P2, P3)
```

### 4. Count
For each theme, count how many participants mentioned it. This separates patterns from anecdotes.

```
Onboarding friction: 5/7 participants
Visual praise: 6/7 participants
Difficulty complaints: 3/7 participants (split: 2 too easy, 1 too hard)
```

### 5. Pull representative quotes
For each theme, find 2-3 quotes that best illustrate it. These are gold for the report.

## Coding schemes — start broad, narrow later

### First pass (broad)
- Positive
- Negative
- Surprising
- Confusing
- Question

### Second pass (specific)
Within "confusing":
- Onboarding
- UI navigation
- Mechanics
- Story

Within "negative":
- Difficulty
- Audio
- Pacing
- Visual

## Bias guard

You will pattern-match to what you expected. Counter-measures:

### Re-code by someone else
Hand transcripts to a second person. Have them code blind. Compare. Disagreements are interesting.

### Go back to disconfirmation
After identifying a theme, look for evidence AGAINST it. "5 of 7 said onboarding was confusing — what did the other 2 say?"

### Quote literally
When in doubt, use the participant's exact words. "Players found it intuitive" is your interpretation. "P3 said 'I figured it out instantly'" is data.

## Output format (for reports)

```markdown
## Theme: Onboarding friction

**Strength:** Strong (5/7 participants)
**Severity:** Medium (caused 2 to almost quit)

**Pattern:** Players struggle to navigate the main menu.

**Key quotes:**
- P1: "I clicked Play but nothing happened."
- P3: "Why is Settings hidden under that gear icon?"
- P5: "I thought I was supposed to read the tutorial first but it wasn't obvious."

**Hypothesis:** The main menu's visual hierarchy doesn't communicate primary action.

**Recommended next steps:**
- A/B test menu layout (current vs. simplified)
- Watch 5 more new-user sessions specifically for menu navigation
```

## Anti-patterns

- "Most players hated it" — define "most." Number it.
- Cherry-picking quotes that fit your hypothesis
- Coding so finely you have 50 codes and no themes
- Coding so loosely everything is "general feedback"
- Skipping the count step (anecdote vs pattern)
- Burying contradictory evidence

## Cross-reference

`interview-protocols.md` for collecting transcripts. `survivorship-bias.md` for who you're missing.
