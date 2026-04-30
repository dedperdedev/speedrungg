# Test Plan

Owned by `qa-lead`. Lives alongside the GDD — when GDD changes, this updates.

## Layers

1. **Unit** (`tests/unit/`) — pure functions, reducers, math, schemas
2. **Integration** (`tests/integration/`) — multi-module flows, store + systems
3. **Smoke** (`tests/smoke/`) — browser-based, loads + main loop
4. **Cross-browser** — manual matrix per `/cross-browser-test`
5. **Accessibility** — manual + axe-core per `/a11y-audit`

## Coverage targets

- Unit: 80% of `src/core/`, 60% of `src/gameplay/`
- Integration: every documented event has at least one test
- Smoke: every entry-point screen reachable

## Gates

| Phase | Test types required |
| --- | --- |
| Pre-commit | Unit |
| PR | Unit + integration |
| Pre-release | All layers + cross-browser + a11y |
