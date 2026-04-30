# DESIGN_RULES.md — The Rules of Good Game Design

These are principles agents use when reviewing or proposing design. They are drawn from MDA, Self-Determination Theory, Flow, and hard-won web-game specifics.

## The three questions

Before any feature ships, it must answer:

1. **Mechanics** — what the player does (the verbs)
2. **Dynamics** — what emerges from the player doing it (the situations)
3. **Aesthetics** — how it feels (the experience)

If you can't answer all three, it's not ready.

## Player motivation (SDT)

A web game must deliver on at least two of the three:

- **Autonomy** — meaningful choice, not just button variety
- **Competence** — clear feedback that you're getting better
- **Relatedness** — connection (to characters, to other players, to the world)

"Do X because the game says to" is not autonomy. "Press buttons faster" is not competence. Cosmetics alone are not relatedness.

## Flow

Keep the player on the challenge/skill diagonal:

```
         high skill
         ↑
  boring │  ★FLOW★
         │
         │ anxious
         └──────────→ high challenge
```

- New mechanic → low difficulty, teach it
- Ramp difficulty as skill grows
- Give the player a break after every hard beat
- Let skill expression compound (double-jump → dash → wall-slide)

## First 30 seconds rule

Web games are played on a tab. You have **30 seconds** before the player closes it.

- Second 0–5: visible on screen, understandable at a glance
- Second 5–15: first meaningful interaction
- Second 15–30: first success / first reward / first surprise

If your intro requires a tutorial screen before the player acts, rewrite it.

## Accessibility is a rule, not a nice-to-have

Every design is evaluated against:

- **Keyboard-only playable** (no action requires mouse/touch-only)
- **Colorblind-safe** (never rely on red/green alone)
- **Reduced motion** (respect `prefers-reduced-motion`)
- **Text contrast** ≥ 4.5:1 against its background
- **Min touch target** 44×44 CSS pixels
- **Audio-optional** (no required audio cues without a visual twin)
- **Captions** for spoken content
- **Pause** works everywhere except strict competitive multiplayer

Bartle Player Types → don't build only for one. Most games skew toward one but shouldn't ignore the others:

- **Achiever** — wants to complete / master
- **Explorer** — wants to discover
- **Socializer** — wants to connect
- **Killer** — wants to dominate

## Economy & balance

- Every resource has a source and a sink
- Every sink has a purpose the player wants
- Inflation is a bug; deflation is a bug
- Rewards are front-loaded early, back-loaded late
- No pay-to-win in any form if the game is a pure product
- Grind should be optional, not mandatory for completion

Formulas live in `design/gdd/economy.md`. Numbers live in `assets/data/economy.json`. Never in code.

## Difficulty

- Difficulty is a designed experience, not a numeric slider
- "Hard mode" that just multiplies enemy HP is lazy
- Think in terms of what the player must do differently, not what the enemy has more of
- Always provide:
  - An easier way to progress (mercy mechanic, skip, assist)
  - A harder way to play for those who want it (optional challenge)

## UX for web games

- Loading screen with actual progress (not fake spinners)
- Save on every meaningful action (IndexedDB)
- Remember settings across sessions
- Handle tab-hidden: pause, don't crash
- Handle tab-return: resume, don't rubber-band
- Handle orientation change on mobile
- Handle connection drop in multiplayer — show state, offer reconnect

## The "one session" test

A player should be able to:

- Load the game
- Play a meaningful session
- Stop at a natural point
- Leave satisfied

…all in **one browser tab, one hand free, 10 minutes or less**, if they want. Longer sessions should reward but never require.

## Monetization (if applicable)

Honest monetization only:

- One-time purchase
- Cosmetics
- Time-saver for already-attainable content (carefully)
- Ads between sessions, never during

Not this:
- Loot boxes
- Energy systems that block play
- Pay-to-win
- Dark patterns
- Manipulative FOMO

## Playtesting

Every new feature is validated by:

1. One internal playtest (you + someone else)
2. One external playtest (stranger, recorded)
3. Metrics check (analytics events fired correctly)

If a feature can't be validated, it is not ready.

## Writing

- Show, don't tell
- One voice per speaker
- Diegetic UI when possible
- Translate-able strings (no concatenation in code)
- Read every line aloud before committing

## Sound

- No sound effect louder than the hero sound it accompanies
- Music loops seamlessly
- Audio unlocks on first user gesture (iOS Safari)
- Mute is always one click / one key away
- Max volume caps at 85% of peak possible

## When a design conflicts with these rules

1. Write an ADR explaining why
2. Get `creative-director` or `game-designer` sign-off
3. Document the trade-off in the GDD

Rules are guidance. The user decides. But the user should decide knowing what they're overriding.
