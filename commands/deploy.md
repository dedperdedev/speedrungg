---
name: deploy
description: Deploy to GitHub Pages / Netlify / Vercel / Cloudflare Pages / itch.io.
---

# /deploy

> **Plan Mode required.** This command makes durable, hard-to-reverse decisions. Before any execution:
> 1. Gather context (read referenced files; ask clarifying questions; label hypotheses)
> 2. Present a numbered, calibrated plan with [CONFIRMED]/[LIKELY]/[UNCERTAIN] labels
> 3. Wait for explicit user approval ("yes", "ok", "go") — silence is NOT approval
> 4. Only then execute, one step at a time, reporting deltas
> 
> If at any point a [LIKELY] or [UNCERTAIN] becomes blocking, stop and re-plan.


Invokes `release-manager` + `build-engineer`.

## Pre-flight

- [ ] `/release-checklist` passed
- [ ] QA sign-off (`qa-lead`)
- [ ] Security sign-off (`security-engineer`)
- [ ] Accessibility sign-off (`accessibility-specialist`)
- [ ] Performance under budget

## Flow

1. **Confirm target** — which host?
2. **Bump version** — SemVer (`package.json`)
3. **Update CHANGELOG** — `docs/release/CHANGELOG.md`
4. **Bump service worker version** — cache bust
5. **Build** — `npm run build`
6. **Smoke test** — local preview: `npm run preview`
7. **Deploy** — `tools/deploy/deploy-<host>.sh`
8. **Verify live URL** — 200, correct asset hash, sw registered
9. **Tag** — `git tag v1.2.3 && git push --tags`
10. **Record** — `production/releases.md` with SHA, URL, rollback cmd

## If anything fails

Stop. Don't partial-deploy. Roll back if already pushed.
