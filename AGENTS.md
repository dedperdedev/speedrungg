# AGENTS.md — The Agent Workflow Contract

This file defines how any coding agent (Claude Code, Cursor, Codex, etc.) must behave when working in this repo. If you are an AI agent reading this — these rules are binding.

## The 5-Phase Protocol

Every non-trivial change follows these phases in order. Do not skip.

### 1. Understand

- Read `CLAUDE.md`, `ARCHITECTURE.md`, `DESIGN_RULES.md`
- Read the relevant section of `design/gdd/`
- Read path-scoped rules for the files you'll touch (`.claude/rules/`)
- Identify which agent role fits this task (design? gameplay? ui? rendering? networking?)

### 2. Plan

- State the task in one sentence
- Identify files that will change
- Check against `ARCHITECTURE.md` and path-scoped rules
- **If a rule is violated → STOP, warn the user, propose alternatives**
- List 2–4 options when the approach is ambiguous; show trade-offs

### 3. Propose

- Present the plan to the user
- Wait for explicit approval
- If the user changes direction — update the plan, re-propose

### 4. Execute

- Write the code / doc / asset
- Stay inside your agent's domain
- Use existing patterns (no new architectures without `technical-director` sign-off)
- Update or add tests

### 5. Verify

- Run relevant tests (`tests/index.html` in browser, or `npm test`)
- Self-review against the path rules
- Update `design/` docs if behavior changed
- Log the change in `production/session-state/`

## Guard behavior (non-negotiable)

Before writing any code, check against:

- `ARCHITECTURE.md` — state management, event dispatch, file boundaries
- `DESIGN_RULES.md` — balance, progression, UX, accessibility
- `.claude/rules/<matching-path>.md` — path-scoped coding standards

**If your proposed change would violate a rule:**

1. Do NOT write the code
2. Show the user: which rule, which line, why it conflicts
3. Propose 2–3 alternatives that respect the rule
4. Let the user decide (they can override — rules are guidance, user is sovereign)

Never silently bypass a rule. Never assume "this case is an exception."

## Domain boundaries

Each agent has a lane. Stay in it.

| Agent tier | May edit | Must delegate |
| --- | --- | --- |
| Directors | `CLAUDE.md`, `design/vision/`, `production/`, `docs/adr/` | Anything in `src/`, `assets/`, `tests/` |
| Leads | Their department's docs + coordination files | Implementation details |
| Specialists | Files in their scoped path only | Cross-department changes |
| Engine specialists | `src/rendering/**`, engine configs, shader files | Core store, gameplay logic |

Cross-cutting changes go through `producer`.

## Collaboration protocol

- **Ask before assuming.** If a design decision isn't documented, ask.
- **Present options.** When there are multiple valid approaches, show 2–4 with trade-offs.
- **Wait for the user.** Never "just go ahead."
- **Draft before finalizing.** Show the change, get approval, then write.
- **Log decisions.** Every non-trivial decision goes in `docs/adr/` as an ADR.

## Coding conventions

- **JavaScript / TypeScript:** ES2022, modules, no CommonJS
- **Formatting:** 2-space indent, single quotes, semicolons, trailing commas
- **File size:** hard cap 400 lines — split if bigger
- **Function size:** hard cap 50 lines — extract if bigger
- **Naming:** `kebab-case` for files, `camelCase` for vars/functions, `PascalCase` for classes, `SCREAMING_SNAKE_CASE` for constants
- **No `any` in TypeScript** without a comment explaining why
- **No `@ts-ignore`** without a comment explaining why
- **No globals on `window`** except one entry point object
- **No heavy dependencies** without `technical-director` approval (check bundle budget)

## Testing expectations

- New game system → at least one integration test in `tests/`
- Store mutation → unit test for the event handler
- New UI flow → manual smoke test documented in `tests/smoke/`
- Breaking change → update all affected tests before merging

## Git conventions

- Branch: `<type>/<short-description>` — e.g. `feat/dash-ability`, `fix/audio-unlock-safari`
- Commit: `<type>(<scope>): <description>` — e.g. `feat(gameplay): add dash ability with 400ms cooldown`
- Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `style`
- No secrets, no `.env`, no large binaries

## When to escalate to the user

- Design-level question not answered by `design/gdd/`
- Architecture change (new pattern, new dependency, new layer)
- Cross-department cut that needs the `producer`
- Performance budget at risk
- Accessibility regression
- Anything marked `// TODO(human)` or `// DECISION-NEEDED`

## When NOT to ask

If the answer is already in:
- `design/gdd/`
- `ARCHITECTURE.md`
- `DESIGN_RULES.md`
- `.claude/rules/`

…just follow it. Don't re-ask every time.

## Session start & end

- Start: read `production/session-state/latest.md` for current context
- End: write a session summary to `production/session-state/` with: what was done, what's next, what's blocked

That's the contract. Now go build something good.
