---
name: bundle-analyze
description: Bundle size breakdown — what's in there, why, and what to cut.
---

# /bundle-analyze

Invokes `performance-analyst` + `build-engineer`.

## Steps

1. **Build production bundle.** `npm run build`.
2. **Generate size report.** Use `rollup-plugin-visualizer` or `vite-plugin-inspect`.
3. **Compare against budget** (`production/budgets.md`, default 300 KB gzip for initial).
4. **Identify biggest contributors.** Sort by gzipped size.
5. **For each over-budget module:**
   - Is it used on first load? If no → dynamic `import()`.
   - Is there a smaller alternative?
   - Can we tree-shake more aggressively?
6. **Propose cuts** with estimated savings.

## Red flags

- Entire library imported for one function
- Moment.js (use date-fns or Intl)
- Lodash (use native or `lodash-es` with tree-shaking)
- Polyfills for browsers you don't target
- `@babel/runtime` if targeting ES2022

## Output

`docs/perf-reports/bundle-<date>.md`: top 10 modules, total size vs budget, cut plan with estimated savings.
