# Juice It or Lose It — Game Feel

Martin Jonasson + Petri Purho talk (2012). Foundation of modern indie game-feel.

## The principle

Two games can have identical mechanics. The juiced one feels good and ships; the dry one feels broken and dies in playtests.

**Juice = secondary feedback layered on every primary action.**

## Juice ingredients (additive)

For each player action, ask: how many of these are firing?

### Visual
- Squash & stretch on hit/jump
- Screen shake (small, situational)
- Particle burst at impact / pickup
- Hit-stop / freeze frames (3–6 frames at strike)
- Color flash on damage
- Trail behind fast-moving objects
- Camera punch on big events
- Background pulse to music
- Tween easing (never linear except for projectiles)

### Audio
- Layered SFX (attack + body + tail)
- Pitch variance ±5% per trigger to avoid fatigue
- Ducking music when SFX plays
- Reactive music (combat layer kicks in when fight starts)

### Haptic (where supported)
- Vibration on impact (Gamepad API)
- Mobile haptic on UI confirm

### Procedural
- Random rotation/scale on particles
- Rumble decay
- Damage numbers floating up

## The taste rule

Juice is additive, but **clarity is subtractive**. After adding juice:

- [ ] Can the player still read the game state?
- [ ] Does juice confuse what's happening (hit vs miss vs death)?
- [ ] Can someone with motion sensitivity play (reduced-motion respected)?
- [ ] Does it look juicy at 60fps AND 30fps?

If juice obscures clarity, **juice loses**.

## Anti-patterns

- Screen shake on every hit (player gets motion-sick)
- Particles so dense they hide hitboxes
- Hit-stop > 8 frames (feels laggy, not impactful)
- Hit-flash that looks identical to invulnerability state
- "More juice" reflex when the real problem is bad fundamentals (movement, hit detection)
- Juice without `prefers-reduced-motion` fallback

## Web-game specifics

- Particle counts matter — 1000 particles on iPhone SE is GPU death
- Use object pools (see `object-pooling.md`)
- Test on mid-range Android, not Macbook Pro
- Audio juice has iOS unlock requirement (see `web-audio-procedural.md`)

## When to add vs cut juice

Add juice when: playtest says "it feels okay but not great" AND mechanics are solid.

Cut juice when: playtest says "I can't tell what's happening" OR "the game makes me dizzy" OR "I had to mute it."
