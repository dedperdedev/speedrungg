# Juice vs Clarity — The Tension

Juice (game-feel) and clarity (readability) pull in opposite directions. Both are necessary. Neither is more important.

## What pulls them apart

Adding juice:
- More particles → harder to see hitboxes
- Screen shake → spatial reference shifts
- Hit-stop → game pauses momentarily
- Damage numbers → screen clutter
- Color flashes → distinguishability of states drops

Each "juice ingredient" reduces clarity by a small amount. Stack 8 juice effects on every action and the game becomes unreadable.

## When clarity wins

- New player tutorial — clarity must dominate juice
- Critical state communication — "you took damage" must be unmissable
- Multiplayer where misreading = unfair
- High-frequency events (every step, every shot) — juice fatigues fast
- Long sessions — juice is exhausting; clarity sustains

## When juice wins

- Cinematic moments (boss kills, level clears) — juice over clarity
- One-time events — juice celebrates the moment
- Reward feedback — juice = feels good = positive reinforcement
- Marketing material (gif, trailer) — juice sells the game
- Short sessions — quick burst of juice doesn't fatigue

## The 3-tier juice budget

Categorize every action by tier:

### Tier 1: ambient / frequent
Footsteps, idle ticks, ambient particles. **Minimal juice.** Otherwise overwhelming.

### Tier 2: regular feedback
Every shot, every pickup. **Subtle juice.** Pitch variance, small particle. Repeats often, can't be loud.

### Tier 3: meaningful events
Hit, kill, level up, boss appear. **Big juice.** Screen shake, freeze frame, particle storm. Rare enough to land.

If everything is Tier 3, nothing is Tier 3. Promote sparingly.

## The 5-frame test

For every animation:

- 1st frame: clear silhouette of state
- 2nd-3rd frame: motion blur / smear / squash
- 4th-5th frame: settle into next state

If the 1st frame is unreadable due to particles or shake — too much juice. Reduce.

## The mute test

Play a session with audio muted. Does the game still feel responsive?

- Yes → audio juice was decoration, you're fine
- No → audio juice was load-bearing → add visual equivalents (accessibility too)

## Reduce-motion mode

Always implement. When `prefers-reduced-motion: reduce`:

- No screen shake
- No camera punch
- No flashing (unless gameplay-critical, in which case offer alternative)
- Particle counts capped or off
- Animations cut to instant or shortened

This isn't a 1% accessibility feature — many players prefer it.

## Anti-patterns

- "Juice everything to 11" reflex — fatigues fast
- Cutting juice when clarity issue is actually bad fundamentals (movement, hit detection)
- One juice level for everything, no tiering
- No reduce-motion fallback
- Hit-flash that looks like the player's "invulnerable" state — mistaking states is a clarity failure caused by juice
