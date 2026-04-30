---
name: eaa-baseline
description: "Use when reviewing accessibility for EU distribution — European Accessibility Act baseline and micro-enterprise exemption guidance. Skip when the work is concrete WCAG/A11y implementation (defer to wcag-game-checklist or gameaccessibilityguidelines), chat-feature compliance (defer to cvaa-communications), or canvas screen-reader patterns (defer to screen-reader-game-patterns)."
---

# European Accessibility Act — Baseline

The European Accessibility Act (Directive 2019/882) became enforceable **28 June 2025**. Solo indie developers usually qualify for the micro-enterprise exemption, but the smart play is to design as if compliant — both for future-proofing and because the EAA's accessibility requirements largely overlap with `wcag-game-checklist.md` and `gameaccessibilityguidelines.md` you should already follow.

## Are you in scope?

The EAA applies to "e-commerce services" defined broadly. **A web game is in scope if any of:**
- It's sold via e-commerce (paid or with paid features)
- It includes text/voice/video chat (communication services)
- It operates as a digital distribution platform (your site sells other devs' games)
- It's a supporting website for any of the above

**Pure-ad-supported web games** without IAP, chat, or commerce may be out of scope, but this is jurisdiction-dependent — Member States implement EAA differently. Don't trust this analysis as legal advice.

## Micro-enterprise exemption

You're exempt from EAA's *substantive* requirements (but still subject to general consumer law) if:
- **Fewer than 10 staff**, AND
- **Less than €2 million annual turnover OR balance sheet total**

A solo Ukrainian indie dev qualifies. **Do NOT assume this is permanent** — if you grow past either threshold, you have one year to comply. Design for compliance now to avoid scramble later.

## Minimum baseline (do this regardless of exemption status)

These are also good design practice; treat them as table stakes for any web game:

### Visual
- [ ] **Color contrast** ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI controls (WCAG 2.1 AA)
- [ ] **Don't rely on color alone** to communicate state (use icon + color + text)
- [ ] **Respect `prefers-reduced-motion`** — disable screen shake, particles, big animations when set
- [ ] **Resizable text** — don't break at 200% browser zoom
- [ ] **Color-blind safe palette** OR alternative indicators (shape, position, label)

### Audio
- [ ] **Subtitles** for all spoken content
- [ ] **Visual equivalents** for gameplay-critical sounds (e.g., damage indicator, not just hurt sound)
- [ ] **Independent volume sliders** (master, music, SFX, voice/UI minimum)
- [ ] **Mono output option** if any audio is stereo-positional

### Input
- [ ] **All controls remappable**
- [ ] **Keyboard equivalent for every action** (no mouse-only mechanics without alternative)
- [ ] **Hold actions** can be toggled (configurable)
- [ ] **Touch hitboxes** at least 44×44px on mobile

### Cognitive / pacing
- [ ] **Pause anywhere** in single-player contexts
- [ ] **Settings persist** across sessions
- [ ] **Tutorial replayable**
- [ ] **No flashing > 3 Hz** (seizure risk)
- [ ] **Plain language** in UI (avoid jargon for new players)

### Communications (if your game has chat)
- [ ] **Text chat** available alongside any voice chat
- [ ] **Mute / block** functionality
- [ ] **Captions for voice** (especially in multiplayer voice chat)

### E-commerce (if you sell anything)
- [ ] **Accessible checkout flow** — labels, error messages, keyboard navigation
- [ ] **Clear pricing** before purchase confirmation
- [ ] **Cancel / refund flow** as accessible as the purchase flow

## What changes if you EXCEED micro-enterprise threshold

Once you're over 10 staff or €2M turnover, you have additional obligations:

- **Self-assessment documentation** — prove you considered EAA in design
- **Accessibility statement** on your site — what you support, known gaps, contact for issues
- **Conformity to EN 301 549** (the EU's harmonized standard, effectively WCAG + ETSI extensions)
- **Member State enforcement** — you can be reported to the relevant authority in any EU country where you sell

This is meaningful work. **Solo devs planning to grow should bake the baseline in now.**

## What this template enforces

By default, the template's `wcag-game-checklist.md` + `gameaccessibilityguidelines.md` + this file together hit the minimum baseline. The qa-lead and accessibility-specialist agents enforce these as release gates.

If you explicitly opt out (e.g., game-jam quick prototype not for distribution), that's your call — log it.

## Honest cautions

- **This is not legal advice.** Each EU Member State implements EAA differently. If you're scaling past micro-enterprise, get actual legal counsel.
- **Enforcement is patchy as of early 2026** — the directive entered force June 2025, but practical enforcement varies wildly by country. Don't assume nobody will check.
- **Future regulations are tightening** — the upcoming Digital Fairness Act adds more (see `digital-fairness-act-watch.md`). Designing for accessibility + ethical commerce now reduces future scramble.
- **Compliance ≠ accessibility.** Real accessibility is testing with disabled players, not checklist completion. The checklist catches the obvious; user research catches the rest.

## Sources

- Directive (EU) 2019/882 (European Accessibility Act)
- EN 301 549 (harmonized accessibility standard)
- twobirds.com 2026 — gaming impact analysis
- levelaccess.com EAA guide
- playerresearch.com EAA games guide June 2025
- commission.europa.eu — official EAA portal

## Cross-reference

- `wcag-game-checklist.md` — WCAG 2.1 AA mapped to game patterns (covers most EAA technical requirements)
- `gameaccessibilityguidelines.md` — game-industry-standard 3-tier framework
- `screen-reader-game-patterns.md` — for chat/UI screen reader support
- `digital-fairness-act-watch.md` — coming next regulatory wave
- `cvaa-communications.md` — US equivalent for chat features
