---
name: a11y-audit
description: WCAG 2.1 AA accessibility audit.
---

# /a11y-audit

Invokes `accessibility-specialist`. See that agent for the full checklist.

## Automated

```
npx axe-core <url>
```

- Fails on violations tagged `wcag2aa`
- False positives acknowledged in `docs/a11y-exceptions.md` with justification

## Manual

- [ ] Tab through the whole game with keyboard
- [ ] Use screen reader (NVDA / VoiceOver) on menus
- [ ] Toggle `prefers-reduced-motion`, play through
- [ ] Simulate colorblindness (Chrome DevTools rendering tab)
- [ ] Test at 200% zoom
- [ ] Test on actual mobile with TalkBack / VoiceOver

## Output

`docs/a11y-reports/<date>.md`: findings by WCAG criterion, severity, remediation.

## Anti-patterns

- "Automated tools passed, we're good" — 30% of accessibility is manual
- Testing only with mouse
- Skipping screen reader "because it's a game"
