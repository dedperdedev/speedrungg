# MDA Framework — Mechanics, Dynamics, Aesthetics

Hunicke / LeBlanc / Zubek (2004). The most useful design lens for separating *what you build* from *what the player feels*.

## The three layers

```
DESIGNER ──► Mechanics ──► Dynamics ──► Aesthetics ──► PLAYER
              (rules)      (emergence)   (experience)
```

- **Mechanics** — rules, actions, state transitions. The verbs and the math.
- **Dynamics** — runtime behavior emerging from mechanics + player input. Patterns that arise during play.
- **Aesthetics** — emotional response. Why the player keeps playing.

Designer reads left-to-right. **Player reads right-to-left.** They feel the aesthetic; they discover the dynamics; they reverse-engineer the mechanics.

## The 8 aesthetics (LeBlanc's taxonomy)

When pitching a game's "fun," name 1–3 of these explicitly. "Fun" alone is meaningless.

1. **Sensation** — game as sense-pleasure (visual, audio, kinetic)
2. **Fantasy** — game as make-believe (worlds, roles)
3. **Narrative** — game as story
4. **Challenge** — game as obstacle course
5. **Fellowship** — game as social framework
6. **Discovery** — game as exploration
7. **Expression** — game as self-discovery
8. **Submission** — game as time-killer / pastime / cozy

Most successful games hit 2–4 strongly and 1–2 weakly. Trying to hit all 8 = mediocre everything.

## Applied checklist (use when designing or reviewing a feature)

- [ ] Which 1–3 aesthetics is this feature serving?
- [ ] What dynamic does it produce when players play?
- [ ] What's the minimum mechanic that creates the dynamic?
- [ ] If the dynamic doesn't appear in playtesting, the mechanic is broken — what would we change?
- [ ] Are we adding mechanics that produce dynamics nobody asked for? (Cut.)

## Common misuse

- Listing mechanics and calling it a design doc — without the dynamic + aesthetic, it's just a feature list
- Claiming an aesthetic ("this game is about discovery") without a mechanic that creates it
- Designing aesthetics top-down ("make it feel epic") without the mechanic-dynamic chain
- Treating "fun" as monolithic — it's not

## When to invoke this lens

- Feature design (the GDD ask)
- Design reviews (`/design-review`)
- Playtest analysis (which aesthetics did players actually feel?)
- Cutting scope (remove anything not serving an aesthetic)
