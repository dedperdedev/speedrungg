---
name: security-audit
description: Security review by security-engineer — secrets, XSS, anti-cheat, privacy, dependencies.
---

# /security-audit

Invokes `security-engineer`. Automatic gate before every release.

## Checks

### Secrets
- [ ] No API keys / tokens / secrets in bundle (`grep` dist/)
- [ ] No secrets in git history (`git log -p | grep -i "secret\|api_key\|password"`)
- [ ] `.env*` in `.gitignore`
- [ ] CI secrets via GitHub Actions Secrets, not hardcoded
- [ ] No `VITE_SECRET_*` / `NEXT_PUBLIC_SECRET_*` (those are public)

### Injection
- [ ] User input rendered with `textContent`, not `innerHTML`
- [ ] CSP header set and tested
- [ ] SRI on all external scripts (CDN)
- [ ] No `eval` / `new Function` / `document.write`

### Network / multiplayer
- [ ] Server validates every client message
- [ ] Rate limits configured
- [ ] Protocol versioned
- [ ] No client-side trust for score / inventory / currency

### Privacy
- [ ] Privacy policy present
- [ ] EU cookie/analytics consent
- [ ] No fingerprinting
- [ ] Analytics opt-in honored
- [ ] No PII in events

### Dependencies
- [ ] `npm audit --production` — no high/critical
- [ ] Dependabot / Renovate enabled
- [ ] SBOM generated for production build

### Transport
- [ ] HTTPS enforced (HSTS)
- [ ] Security headers present (see `security-engineer` spec)

## Output

`docs/security-audits/<date>.md`:
- Findings by severity (S0/S1/S2/S3)
- Remediation plan
- Sign-off or block
