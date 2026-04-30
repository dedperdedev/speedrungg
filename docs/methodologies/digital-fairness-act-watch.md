# Digital Fairness Act — Watch List

The EU Digital Fairness Act (DFA) is in active drafting as of late 2025 / early 2026. **Not yet law**, but the trajectory is clear enough to design defensively. The European Parliament's Internal Market and Consumer Protection committee voted 32–5–9 in November 2025 in favor of a package targeting:

- **Loot box bans for minors**
- **Auto-renewing subscriptions** without easy cancellation
- **Infinite scrolling, autoplay, disappearing-stories** for minors
- **Dark patterns** generally
- **AI-powered deceptive chatbots**

The European Commission is expected to formally propose in 2026; member-state transposition will follow. Realistic enforcement for indie web games: 2027–2028. **Design defensively now.**

## Forward-looking design constraints

Until the DFA is finalized, the template treats these as STRONG SOFT REFUSALS — we won't help build them, even if technically still legal in your jurisdiction:

### Loot boxes / random rewards
- Already on the `monetization-ethical-floor.md` refusal list
- DFA tightens: explicit ban for minors expected
- **Don't ship random-monetary-reward mechanics in any game that could plausibly be played by under-18s** (which is most web games)
- Cosmetic-only "lucky draws" with disclosed odds + pity timer remain ethically marginal; avoid for games with broad audience

### Subscriptions
- Auto-renew without prominent warning before first charge: refused
- Multi-step cancellation flow: refused
- "Pause subscription" instead of "cancel subscription" pattern: refused
- **Always offer one-click cancellation matching the one-click signup flow**
- **Renewal warnings** at least 7 days before charge

### Engagement-trap UI
- Infinite scroll without pause: caution; usually unnecessary in games
- Autoplay videos with sound: refused
- "Disappearing" content that creates FOMO (24-hour stories style): refused for under-18 audience
- "Streak loss" mechanics: already refused per `monetization-ethical-floor.md`

### Dark patterns
- Confirmshaming ("Are you sure? You'll miss out on...") — refused
- Fake urgency ("only 3 left!") on digital goods — refused
- Hidden costs (buy gems → buy items): refused per `monetization-ethical-floor.md`
- Pre-checked opt-ins: refused
- Roach motel (easy in, hard out): refused

### AI chatbots
- AI-powered NPCs are fine
- AI chatbots that pretend to be human: refused
- AI chatbots that manipulate (fake friendship, romance) for monetization: hard refused

## Loot box jurisprudence (the trajectory)

Recent national-level rulings show the direction:

- **Austrian Styria court (2025)** — Counter-Strike loot boxes ruled unlicensed gambling; ~€14K refund ordered
- **Belgian LS v. Apple (Jan 2025)** — ~€67K refund pursued
- **Netherlands** — Council of State 2022 blocked national gambling-law approach; Minister Beljaarts (Dec 2024) committed to push EU-level ban via DFA
- **UK** — Loot Box Code of Conduct; voluntary but with regulatory pressure

These are scattered now; DFA would unify and strengthen.

## What this means for the user

Whether you, a Ukrainian solo indie, are technically subject to DFA depends on:
- Where your players are (EU citizens trigger consumer-protection law regardless of dev location)
- Where your game is distributed (EU-based platforms must enforce)
- Your business size (micro-enterprise carve-outs may apply, similar to EAA)

**Practical advice: design ethically by default.** The template's `monetization-ethical-floor.md` already covers the major refusals. DFA mostly codifies what's already there.

## Operational checklist (apply during design + pre-release)

For any new system involving money, time, or engagement:

- [ ] Could this be argued as "loot box" by a regulator? If yes → cut it
- [ ] Does cancellation match signup in difficulty? If no → fix
- [ ] Are renewal warnings prominent? If no → add
- [ ] Are children plausibly playing? If yes → assume DFA applies
- [ ] Would a screenshot of this UI in a regulator's slide deck be embarrassing? If yes → redesign
- [ ] Are claims (price, time, scarcity) all true and verifiable? If no → cut

## Honest cautions

- **DFA isn't law yet.** As of April 2026, the EP committee voted; the Commission is drafting; transposition is years away. Specific provisions WILL change before final.
- **The directional consensus is stable.** Loot box restriction for minors, dark pattern enforcement, and subscription transparency are not going away. Whatever specific mechanism survives, the underlying principles will.
- **Member states already moving** independently — Netherlands, Belgium, Austria all have national-level activity. Don't wait for DFA to harmonize; the harshest national regime sets the practical floor for cross-border distribution.
- **Most ethical-floor decisions are good business too.** Players notice manipulation; reputation damage outlives regulatory penalty.

## Sources

- europarl.europa.eu Press 20251013IPR30892 (Oct 2025) — EP committee vote
- esportslegal.news Dec 2025 — EU loot box regulatory comparison
- franssentolboom.nl 2024–2025 — loot box jurisprudence overview
- medianama.com Mar 2025 — Star Stable EU probe analysis

## Cross-reference

- `monetization-ethical-floor.md` — primary refusal list (mostly aligned with DFA direction)
- `behavioral-economics-for-games.md` — line between ethical persuasion and manipulation
- `eaa-baseline.md` — current accessibility regulation (already in force)
- `web-game-supply-chain.md` — broader compliance posture
