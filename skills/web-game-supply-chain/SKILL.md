---
name: web-game-supply-chain
description: "Use when adding npm dependencies or auditing supply chain. Lockfile, audit, Dependabot, SRI, CSP. Critical given 2024-2025 npm attack patterns."
---

# Web Game Supply Chain Hygiene

Every npm dep is a potential attacker. Recent supply-chain attacks (left-pad, event-stream, ua-parser-js, multiple in 2024-2025) prove it.

## The threat

- Malicious dep published / updated to steal credentials
- Compromised maintainer's account pushes update
- Typo-squatting (`reactt`, `lodahs`)
- Transitive: your direct dep is fine, dep-of-dep is malicious

## Defense in layers

### 1. Lockfile committed
`package-lock.json` (npm) or `pnpm-lock.yaml` (pnpm) MUST be in version control. Without it, you don't know what code shipped.

### 2. Pinned versions
- `^1.2.3` allows minor + patch updates → controlled drift
- `~1.2.3` allows patch only → tighter
- `1.2.3` exact pin → strictest, manual updates

For a web game: `^` is fine for non-critical, exact pin for crypto / security-critical libs.

### 3. Audit before adding
Before `npm install foo-pkg`:

- Check `bundlephobia.com` — size?
- Check `socket.dev` or `npmjs.com/package/foo` — recent activity? maintainer?
- Last commit in repo within 12 months?
- Issues responded to?
- Stars / downloads (low = niche, high = target)
- License compatible?

If yes, install. If anything red-flag, look for alternative or write it yourself.

### 4. Dependabot / Renovate
Auto-PR on dep updates. Configure:

- Auto-merge patch updates
- Manual review for minor/major
- Security updates always auto-PR

```yml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

### 5. CI audit
```bash
npm audit --audit-level=high --production
```

Fail build on high/critical. `--production` = ignore dev deps (less critical, but still update).

### 6. SRI for external scripts
Subresource Integrity hashes for any script loaded from CDN:

```html
<script src="https://cdn.example.com/library.js"
        integrity="sha384-abc123..."
        crossorigin="anonymous"></script>
```

If the CDN is compromised, browser refuses to execute.

### 7. CSP header
Content Security Policy locks down what your page can load:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-...' https://cdn.trusted.com; ...
```

Even if attacker injects `<script src="evil.com">`, browser blocks.

### 8. Privacy-first analytics
Avoid Google Analytics — supply-chain risk + GDPR / CCPA risk. Use:

- Plausible (self-hostable, EU)
- Umami (self-hostable)
- Fathom

## Incident response

If a dep is compromised:

1. **Audit immediately** — `npm ls <pkg>` to find what depends on it
2. **Pin to known-safe version**
3. **Rotate secrets** — if dep had access to env vars, those are compromised
4. **Rebuild and redeploy**
5. **Audit logs** for any malicious activity
6. **Public disclosure** if user data was at risk

## Anti-patterns

- "I don't have time to audit deps" — npm is the supply chain
- Auto-updating production builds without review
- Ignoring Dependabot alerts
- Inline scripts from random CDNs without SRI
- Skipping `npm audit` because "all the warnings are dev deps"
- Cargo-culting deps from tutorials without checking they're maintained

## Cross-reference

`owasp-top-10-for-games.md` covers broader security. This file is npm-specific.
