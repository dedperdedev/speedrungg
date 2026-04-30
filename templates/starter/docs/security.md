# Security — Threat Model & Policies

Owned by `security-engineer`. Reviewed at every release.

## Trust boundaries

| Boundary | What crosses | Trust level |
| --- | --- | --- |
| Browser ↔ User input | Keys, mouse, touch, gamepad | UNTRUSTED |
| Browser ↔ Server (WS/HTTP) | Game messages | UNTRUSTED both ways — both sides validate |
| Browser ↔ IndexedDB | Save data | UNTRUSTED if multiplayer-relevant |
| Server ↔ Database | Player records | TRUSTED if the server validated upstream |
| Build pipeline ↔ Bundle | Compiled JS | TRUSTED — but scanned for secrets |

## Threat model summary

See `security-engineer` agent for the full operating procedure. Top concerns for a typical web game:

1. **Secret leakage in bundle** — automated grep in CI
2. **XSS in user-generated content** (names, chat, custom levels) — sanitized output
3. **Client trust in multiplayer** — server-authoritative state
4. **Supply chain (dependencies)** — Dependabot + audit
5. **Privacy compliance** — GDPR/CCPA opt-in, no fingerprinting
6. **CSP / SRI / HTTPS** — headers locked down

## Policies

- No secrets in client-side code, ever
- All external scripts via SRI hashes
- CSP `default-src 'self'` minimum
- Dependabot enabled with auto-merge for patch updates
- Privacy policy linked from main menu in every region
- Account deletion request → 30-day completion

## Incident response

1. Detect (alert, user report, audit)
2. Contain (rotate keys, take down endpoint, ship hotfix)
3. Investigate (logs, timeline)
4. Communicate (users, stakeholders, regulators if PII)
5. Post-mortem (`docs/security-incidents/<date>.md`)

Fill in once a real game exists here. Template above is the starting point.
