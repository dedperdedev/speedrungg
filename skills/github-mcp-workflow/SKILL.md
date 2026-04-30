---
name: github-mcp-workflow
description: "Use when integrating with GitHub via MCP for issues, PR review, releases. Most universal integration; simplest task management option (Issues + Milestones)."
---

# GitHub MCP Workflow

How agents integrate with GitHub for issue tracking, PR review, release management. Most universally useful integration for any developer who hosts code on GitHub.

## When to use

- Code is on GitHub (the common case)
- You want issue-driven dev workflow
- You want Claude to read PRs, suggest changes, comment
- Release tagging and milestone tracking

## When NOT to use

- Code on GitLab / Codeberg / self-hosted — use their MCP equivalents
- Pure local development (no remote yet) — overhead until you push
- Sensitive proprietary repo — verify integration permissions match risk

## Setup

1. Create GitHub Personal Access Token: github.com → Settings → Developer settings → Personal access tokens
2. **Minimum scope**:
   - `repo` — for private repos
   - `public_repo` only — for public repos (smaller blast radius)
3. Add to `.env`:
   ```
   GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx
   ```
4. Enable in `.claude/mcp.json`
5. Verify with `/mcp` in Claude Code

## What agents do with GitHub access

### `release-manager` workflow

During `/release-checklist`:
1. Queries open issues tagged `release-blocker`
2. Verifies each blocker resolved
3. Drafts release notes from merged PRs since last tag
4. Creates release tag (with user approval)
5. Posts release notes to GitHub Release

### `qa-lead` workflow

During `/code-review` or sprint planning:
1. Lists open PRs
2. Reviews each against `DESIGN_RULES.md` and `ARCHITECTURE.md`
3. Posts review comments via MCP
4. Approves or requests changes

### `project-manager` workflow

Sprint sync (alternative to ClickUp/Notion):
1. Treats GitHub Issues as backlog
2. Uses Milestones for sprints
3. Uses Projects (v2) for kanban view
4. `/sprint-plan` creates milestone, assigns issues

This is the lightest-weight task-management option — no extra service.

### `community-manager` workflow

`/social-pulse`:
1. Reads recent issues/PRs to gauge user sentiment
2. Drafts response to bug reports
3. Identifies trending complaints

## GitHub Issues as backlog (the simple path)

For solo indie devs, **GitHub Issues alone is often enough**:

| Need | GitHub Issues feature |
|---|---|
| Backlog | Open issues, labeled |
| Sprint | Milestone with due date |
| Priority | Labels: `P0`, `P1`, `P2`, `P3` |
| Owner | Assignee |
| Type | Labels: `bug`, `feature`, `polish`, `research` |
| Discussion | Issue comments |
| Decisions | Issues tagged `ADR`, locked when decided |

No ClickUp, no Notion needed. Code + Issues + Releases on GitHub = full project hosting.

## PR review discipline

When agents review PRs via MCP:

- **Read changed files**, not just the diff hunk (context matters)
- **Check against `DESIGN_RULES.md` and path-scoped rules**
- **Run tests mentally** — does this break determinism? performance budget? a11y?
- **Comment specific lines**, not vague summaries
- **Approval requires verification** — see `verification` requirements in CLAUDE.md

## Release workflow with GitHub MCP

```
1. /release-checklist (releases-manager agent)
   ├── Query: open issues tagged release-blocker
   ├── Run: bundle-analyze, lighthouse-check, security-audit, a11y-audit
   ├── Verify: all green
   └── Plan tagged release vX.Y.Z

2. User approves

3. Agent (with user approval per Plan Mode):
   ├── git tag vX.Y.Z
   ├── git push origin vX.Y.Z
   ├── Create GitHub Release with auto-generated notes from merged PRs
   ├── Update CHANGELOG.md
   └── Post release announcement to docs/release/
```

## Token security

- **Never commit** `GITHUB_PERSONAL_ACCESS_TOKEN`
- **Rotate quarterly** at minimum
- **Use fine-grained tokens** (newer GitHub feature) for scope minimization
- **Different tokens per project** if you have many — easier to revoke
- **Review usage** in GitHub Settings periodically

## Anti-patterns

- **Token with `admin:org` scope** when you only need `repo` — over-privileged
- **Letting Claude auto-merge PRs** — always require human review for non-trivial changes
- **Auto-closing issues** based on Claude's heuristics — false closes lose signal
- **Mass issue creation** — review the batch; don't trust 50 auto-created issues
- **Sensitive secrets in issue descriptions or PR diffs** — Claude reading these = exposure

## Operational checklist

- [ ] Token created with minimum scope
- [ ] Token in `.env`, gitignored
- [ ] Token rotation reminder (quarterly)
- [ ] Issue label scheme documented
- [ ] Milestone-as-sprint convention agreed
- [ ] Release process documented in `docs/release/`

## Cross-reference

- `clickup-mcp-workflow` — alternative if you need cross-team task mgmt
- `notion-mcp-workflow` — alternative for richer docs
- `obsidian-mcp-workflow` — pair with GitHub for code+notes split
- `web-game-supply-chain` — GitHub also lets you audit dep PRs (Dependabot)
- `playwright-mcp-workflow` — pair for QA verification before merge
