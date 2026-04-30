---
name: release-checklist
description: Full gate before shipping a release.
---

# /release-checklist

> **Plan Mode required.** Release is the most expensive operation. Before any execution:
> 1. Gather context (read all referenced files; check current state of release deliverables)
> 2. Present a numbered, calibrated checklist with [CONFIRMED]/[LIKELY]/[UNCERTAIN] labels
> 3. Wait for explicit user approval ("yes", "ok", "go") — silence is NOT approval
> 4. Only then execute, one step at a time, reporting deltas
> 
> If at any point a [LIKELY] or [UNCERTAIN] becomes blocking, stop and re-plan.


Coordinated by `release-manager`. Each gate owned by the relevant agent.

## Gates

### QA (qa-lead)
- [ ] Smoke test on all target browsers
- [ ] Regression test suite green
- [ ] No S0/S1 open bugs
- [ ] No P0 open bugs

### Performance (performance-analyst)
- [ ] Bundle under budget
- [ ] Lighthouse scores within target
- [ ] No main-thread tasks > 50ms
- [ ] Memory within budget on mobile

### Accessibility (accessibility-specialist)
- [ ] WCAG 2.1 AA pass
- [ ] Keyboard-only playable
- [ ] Screen-reader smoke
- [ ] Colorblind check
- [ ] Reduced-motion respected

### Security (security-engineer)
- [ ] `/security-audit` passed
- [ ] No secrets in bundle
- [ ] Dependabot clean on high/critical
- [ ] Security headers present

### Product (product-owner)
- [ ] Release notes reflect player-visible changes
- [ ] Success metrics identified
- [ ] Rollback plan tested

### Release management (release-manager)
- [ ] Version bumped
- [ ] CHANGELOG updated
- [ ] Service worker version bumped
- [ ] Tag ready
- [ ] Rollback command documented

## Output

`docs/release/checklists/<version>.md` with sign-offs.
