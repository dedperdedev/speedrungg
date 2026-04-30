---
name: payment-processor-risk
description: "Use when planning distribution and revenue. itch.io 2025 case study; diversification discipline; what to do if payouts freeze."
---

# Payment Processor Risk

A real risk for indie web game devs: your distribution platform's payment processor can shut down or freeze your payouts. The itch.io 2025 case study is the canonical warning.

## The itch.io 2025 incident (factual)

**Timeline:**
- **July 2025**: Stripe (itch.io's payment processor) suspended 18+ adult content processing globally; itch.io mass-deindexed NSFW content as compliance response
- **September 2025**: Reports of 100+ day payout delays for sellers using "collected by itch.io" payout model
- **Late 2025**: Payouts gradually resumed with new compliance terms
- **April 2026 status**: Operating but with continued compliance constraints

Source: en.wikipedia.org/wiki/Itch.io, grokipedia, itch.io official blog Aug 31 2025.

**What sellers experienced:**
- Money already earned, sitting in itch.io's account, inaccessible for 3+ months
- No predictable recovery date
- Communication from itch.io was honest but offered no recourse
- Sellers with rent due in those months had real cash-flow problems

## Why this matters generally

Single-platform payout dependency is a **business continuity risk** that indie devs systematically underestimate. Risks include:

- **Payment processor change** (Stripe → some other; can disrupt existing sellers)
- **Regulatory action** (FTC, EU consumer protection, sanctions affecting cross-border)
- **Platform business model change** ("we now take 30% on top of processor fees")
- **Platform shutdown** (rare but happens; remember Adobe Flash distribution)
- **Account freeze** (algorithmic suspension, hard to appeal)
- **Bank-side issues** (your own bank rejects the wire)

## Diversification discipline

For any indie web game with revenue:

### Have ≥2 distribution paths
- Primary: Poki / CrazyGames / your portal of choice
- Secondary: itch.io / direct sale / Steam parallel
- This isn't double work — it's insurance

### Keep operating runway separate from latest payout
- Don't depend on this month's payout for this month's rent
- Aim for 3-month buffer before treating payout as "expected income"
- Use a separate bank account for game revenue (clarity + protection)

### Diversify currency exposure (where applicable)
- USD payouts in a USD-denominated account
- EUR if EU portal-heavy
- Avoid forced conversion at platform-set rates

### Audit your platforms quarterly
- Read updated ToS and payout terms
- Note any "we may withhold for X days" language
- Note minimum payout thresholds — if increased, you wait longer
- Subscribe to platform status pages / changelog

### Document everything
- Save invoices, payout records, communication
- If a freeze happens, you'll need this for tax / legal / business continuity

## Structural advice for solo Ukrainian indies

Specific to your context:

- **Cross-border payouts** to non-EU countries face additional friction (some platforms restrict; some delay)
- **Bank routing for Ukrainian devs**: Wise / Payoneer common alternatives; verify each platform supports them
- **Sanctions exposure**: avoid platforms that may restrict payouts to your jurisdiction
- **Tax**: Ukrainian sole-proprietor (ФОП) tax treatment of digital revenue differs by source country — consult local accountant
- **Stable backup**: keep ability to receive direct sales (Itch.io direct, Gumroad, your own Stripe account) as fallback if primary breaks

## Operational checklist (apply pre-launch)

For any new game with revenue:

- [ ] Identified primary distribution path
- [ ] Identified secondary distribution path (≠ primary)
- [ ] Verified each platform supports your payout method
- [ ] Read each platform's payout terms (cadence, minimum, hold periods)
- [ ] Set up separate bank account / accounting category for game revenue
- [ ] Documented platform contacts for support escalation
- [ ] Calculated 3-month runway independent of latest payout
- [ ] Subscribed to platform status / changelog feeds

## When platforms freeze — response playbook

If your payout is frozen / delayed:

1. **Don't panic-react** — most freezes resolve within weeks
2. **Document the timeline** — when, how, what platform said
3. **Contact platform support** — formal channel, written record
4. **Check community** — if many sellers affected, it's structural; if just you, it's an account-level issue
5. **Activate diversification** — push secondary distribution harder while primary is frozen
6. **Don't make scenes publicly** before talking to platform — public escalation can hurt resolution
7. **Consult legal if > 60 days** — at some point this is debt recovery, not customer service

## Honest cautions

- **Diversification has costs** — listing on multiple platforms is real work; sometimes contradicts exclusivity terms
- **The big platforms (Poki, CrazyGames) have not had documented freezes** like itch.io did, but assume they could
- **Past stability ≠ future stability** — Stripe's 18+ policy change wasn't predictable
- **For solo devs specifically**: small revenue means small platform leverage; you have less recourse than a 10-person studio. Insurance via diversification matters more.

## Sources

- en.wikipedia.org/wiki/Itch.io — incident chronology
- grokipedia.com/page/Itch.io — community-curated timeline
- itch.io blog Aug 31 2025 — official statement
- Stripe support documentation (verify current terms before relying)

## Cross-reference

- `web-game-portal-comparison` — distribution channel options
- `monetization-ethical-floor` — what we ship; affects payout exposure
- `direct-traffic-arbitrage` — owning a landing page = own audience = portable
- `eaa-baseline` — EU regulation may affect EU platform compliance posture
