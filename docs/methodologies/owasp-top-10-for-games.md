# OWASP Top 10 — Adapted for Web Games

OWASP Top 10 was written for web apps. Web games have specific extensions. Here's the practical mapping.

## A01: Broken Access Control

Web-game version: **Server trusts client.**

- Client claims it killed the boss → server believes → client gives self loot
- Client modifies score before submitting → leaderboard corrupted
- Client claims it owns DLC → server unlocks

**Defense:**
- Server-authoritative for any state that affects other players or revenue
- Validate every message against schema
- Check authority on every state-affecting operation

## A02: Cryptographic Failures

Web-game version: **Secrets in client bundle.**

- API key in `process.env.VITE_API_KEY` — that's PUBLIC
- "Encrypted" save files using a key in client code — anyone can extract
- JWT signing secret in client — game over

**Defense:**
- Scan bundle before every release: `grep -ri "key\|secret\|token" dist/`
- Use environment variables only on the server
- Never roll your own crypto

## A03: Injection

Web-game version: **User-generated content.**

- Player name with `<script>` in chat / leaderboard
- Custom level data deserialized without validation
- SQL injection via username on backend

**Defense:**
- Render user content with `textContent`, not `innerHTML`
- Validate user-generated levels with strict schema
- Parameterized queries on backend

## A04: Insecure Design

Web-game version: **Anti-cheat as afterthought.**

- Multiplayer scoring with no server validation
- Currency stored only client-side
- High-score submission with no replay verification

**Defense:**
- Threat-model from day 1
- Authority on server, client renders
- Replay verification for top scores (event log + seeded RNG = deterministic verification)

## A05: Security Misconfiguration

Web-game version: **Defaults left on.**

- CORS `*` — any site can call your API
- Source maps exposed in production
- Verbose error messages leaking stack traces
- HTTP headers missing (CSP, HSTS, X-Frame-Options)

**Defense:**
- Production build flags strict
- Source maps uploaded to monitoring tool, not served publicly (unless you want code readable)
- Security headers in deploy config

## A06: Vulnerable and Outdated Components

Web-game version: **npm dependency hell.**

- Library deprecated, has known CVE, still in lockfile
- Transitive dep with malware (recent npm supply-chain attacks)
- Engine version 2 years old, missing security fixes

**Defense:**
- Dependabot / Renovate enabled
- `npm audit --production` in CI, fail on high/critical
- Pin versions, review updates

## A07: Identification and Authentication Failures

Web-game version: **Weak account systems.**

- Passwords (vs SSO/magic-link)
- No rate limiting on login
- Sessions don't expire
- "Remember me" forever

**Defense:**
- Prefer SSO (Google/Apple) or magic-link over passwords
- Rate limit auth endpoints
- HttpOnly + Secure + SameSite=Strict cookies
- Session expiry + refresh

## A08: Software and Data Integrity Failures

Web-game version: **Auto-updates, integrity checks.**

- Auto-update from CDN with no SRI
- User-uploaded saves trusted blindly
- Service worker accepts new bundle without verification

**Defense:**
- SRI hashes on external scripts
- Validate user uploads
- Service worker version bump enforces new fetch

## A09: Security Logging and Monitoring Failures

Web-game version: **You won't know you're under attack.**

- No login attempt logs
- Suspicious traffic invisible
- Cheating not detected for weeks

**Defense:**
- Server logs structured (auth attempts, score submissions, suspicious activity)
- Anomaly alerts (login storm, score outlier)
- Privacy-respecting (no PII unless needed)

## A10: Server-Side Request Forgery (SSRF)

Web-game version: **User-controlled URLs.**

- "Import level from URL" — fetches from anywhere your server can reach (including internal services)
- Avatar URL — fetches anything

**Defense:**
- Allowlist domains for user-supplied URLs
- Don't proxy arbitrary URLs through server
- Network egress controls on backend

## Web-game extensions (beyond OWASP)

### Anti-cheat strategies (in order of effort/return)
1. **Server-authoritative state** — biggest win, do this
2. **Schema validation** — every message validated
3. **Rate limiting** — limit per session, per IP, per account
4. **Replay verification** — for high-stakes (top scores)
5. **Obfuscation** — hours of friction, not a real defense
6. **Anti-debug** — avoid; punishes legit debuggers, breaks accessibility tools

### Privacy / GDPR

- Default to collecting nothing
- Opt-in for analytics in EU
- Privacy-first analytics (Plausible, Umami) — not GA
- Honor Do Not Track
- Clear retention policy

## Cross-reference

`secure-multiplayer-protocol.md` for protocol details. `web-game-supply-chain.md` for npm hygiene.
