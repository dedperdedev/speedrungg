---
name: lighthouse-check
description: Run Lighthouse audit — performance, accessibility, best practices, SEO, PWA.
---

# /lighthouse-check

Invokes `performance-analyst` + `accessibility-specialist`.

## How

Run against a production build (local preview or staging URL):

```
npx lighthouse https://staging.example.com \
  --preset=desktop \
  --output=html --output=json \
  --output-path=./docs/perf-reports/lighthouse-desktop-$(date +%F)
```

Run twice: `--preset=desktop` and mobile (default). Mobile targets are stricter — that's the point.

## Targets

| Category | Minimum | Target |
| --- | --- | --- |
| Performance | 80 | 95 |
| Accessibility | 90 | 100 |
| Best Practices | 90 | 100 |
| PWA | 90 | 100 (if shipping as PWA) |

## Triage

- **Performance < 80** → invoke `performance-analyst`
- **Accessibility issues** → invoke `accessibility-specialist`
- **PWA < 90** → invoke `web-platform-specialist`
- **Best practices < 90** → likely a security issue, invoke `security-engineer`

## Output

HTML report saved under `docs/perf-reports/`. Summary of regressions vs last run.
