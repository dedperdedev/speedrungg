# Rules: .github/workflows/**

## Required jobs

- `lint` — ESLint + Prettier
- `typecheck` — `tsc --noEmit` (if TS)
- `test` — `npm test`
- `build` — `npm run build`
- `bundle-size` — fail if gzip > budget
- `lighthouse` — fail if scores drop > 5 points
- `audit` — `npm audit --production`, fail on high/critical
- `deploy-preview` — every PR gets a URL
- `deploy-prod` — only on tagged release to `main`

## Secrets handling

- Only via GitHub Actions Secrets
- Never logged (`set -x` → use `set +x` around sensitive blocks)
- Rotated on schedule (quarterly minimum)

## Matrix

- Test on Node 20 + 22 minimum
- Test on Ubuntu latest minimum (macOS/Windows if devs use them)

## Refuse

- Secrets in plain text
- Git push from CI without `[skip ci]` safeguard
- Installing dev tools in prod deploy step
- No concurrency limit (waste of minutes)
