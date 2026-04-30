# Performance Budgets

Owned by `technical-director`. Enforced in CI by `build-engineer`. Profiled by `performance-analyst`.

## Bundle

| Metric | Limit | Notes |
| --- | --- | --- |
| Initial JS (gzip) | 300 KB | First paint should not need more |
| Total JS (gzip) | 1 MB desktop / 500 KB mobile | Lazy-load the rest |
| Initial CSS (gzip) | 30 KB | Inline critical CSS in `<head>` |
| Hero asset | 200 KB | First sprite/model the player sees |

## Runtime

| Metric | Desktop | Mobile |
| --- | --- | --- |
| Target FPS | 60 | 30 |
| Memory ceiling | 256 MB | 128 MB |
| Main-thread long task | < 50 ms | < 50 ms |
| Time to interactive | < 2 s | < 4 s |
| Time to first render | < 1 s | < 2 s |

## Lighthouse

| Category | Minimum | Target |
| --- | --- | --- |
| Performance | 80 | 95 |
| Accessibility | 90 | 100 |
| Best Practices | 90 | 100 |
| PWA | 90 | 100 |

## Going over

Going over a budget requires an ADR in `docs/adr/` justifying the trade-off. Document:

- Which budget is breached
- By how much
- Why (with measurement)
- Mitigation plan
- Sign-off from `technical-director`

## Process

1. CI runs bundle-size check on every PR — fails if over budget
2. CI runs Lighthouse on staging — fails if score drops > 5 points vs baseline
3. Manual perf profile (`/perf-profile`) every milestone
4. Mobile real-device check (`/cross-browser-test`) every release
