---
name: cross-browser-test
description: Cross-browser smoke test — Chrome, Firefox, Safari, Chrome Android, Safari iOS.
---

# /cross-browser-test

Invokes `qa-lead`. Owns the testing matrix in `docs/test-matrix.md`.

## Matrix

| Browser | Desktop | Mobile |
| --- | --- | --- |
| Chrome / Chromium | latest, latest-2 | Android latest |
| Firefox | latest | (skip mobile — marginal share) |
| Safari | latest | iOS latest, latest-1 |
| Edge | latest | (Chromium — covered) |

## Per target

- [ ] Loads without console errors
- [ ] Main menu interactive
- [ ] Can start a match
- [ ] Audio plays (after first gesture on iOS)
- [ ] Touch controls work on mobile
- [ ] Orientation change handled on mobile
- [ ] Back button doesn't nuke state on Android
- [ ] PWA install flow works

## Tooling

- **BrowserStack / LambdaTest / Sauce Labs** for real-device coverage
- **Playwright** for scripted tests across Chromium / Firefox / WebKit
- Manual iOS Safari test on real device — simulators lie

## Output

Table in `docs/test-matrix.md`: browser × build × pass/fail/notes.
