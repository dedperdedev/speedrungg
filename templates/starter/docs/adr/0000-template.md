# ADR-0000: Use Architecture Decision Records

- Status: Accepted
- Date: 2026-04-24

## Context

We need a lightweight way to record significant technical and product decisions so future contributors (human and AI) understand why the code looks the way it does.

## Decision

Every significant decision goes in `docs/adr/NNNN-title.md` using the template at `docs/templates/adr.md`.

## Consequences

- Easier onboarding
- Decisions are revisitable
- Slight overhead per decision (mitigated by keeping ADRs short)

## Alternatives considered

- Wiki — drifts from code, nobody updates it
- Commit messages only — too easily lost
- Long design docs — too heavy for routine decisions
