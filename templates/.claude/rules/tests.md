# Rules: tests/**

## Structure

```
tests/
├── unit/           Pure functions, reducers, math
├── integration/    Multi-module: store + systems
├── smoke/          Browser-based: loads, basic flow
└── fixtures/       Shared test data (JSON)
```

## Required

- Every store event handler has at least one unit test
- Every system has at least one integration test
- Smoke test covers: load → main menu → start match → first meaningful state change

## Patterns

- **Arrange / Act / Assert** — not stream-of-consciousness tests
- Use fixtures in `tests/fixtures/` for shared state
- Test names describe the behavior: `playerMoves_rightInputApplied_positionIncreases`
- No shared mutable state between tests

## Refuse

- Tests that depend on timing (`setTimeout` races)
- Tests that hit the network
- Tests that read `Date.now()` directly (use clock injection)
- Snapshot tests without diffs reviewed
