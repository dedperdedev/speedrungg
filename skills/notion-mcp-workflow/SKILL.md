---
name: notion-mcp-workflow
description: "Use when integrating with Notion via MCP for tasks AND notes in one tool. Setup, database schemas matching template calibration, scope."
---

# Notion MCP Workflow

How agents integrate with Notion for projects that already live there. Covers task management, design docs, research databases. Used as alternative to ClickUp+Obsidian for users whose existing workflow is Notion-centric.

## When to use

- User's existing project is in Notion (don't migrate just for Claude)
- Team workflow where Notion is shared source of truth
- Want a single tool for tasks AND notes (Notion does both)

## When NOT to use

- User doesn't use Notion — don't impose
- Sensitive content — Notion is cloud + AI-trained-on; treat as semi-public
- Solo dev who prefers local-first — use Obsidian instead

## Setup

1. Create Notion integration: notion.so → Settings → Integrations → New integration
2. Get integration token (starts with `secret_`)
3. **Share specific pages/databases with integration** (not entire workspace — minimum scope)
4. Add to `.env`:
   ```
   NOTION_API_TOKEN=secret_xxx
   ```
5. Enable in `.claude/mcp.json`
6. In Claude Code: `/mcp` → verify `notion` connected

## Critical: scope minimization

Notion integrations have access only to pages explicitly shared. **Share narrowly:**
- ✓ Share only the project workspace
- ✓ Share specific databases (Backlog, Research)
- ✗ Don't share entire personal workspace
- ✗ Don't share company-wide pages

If you accidentally share too much: revoke integration, re-share narrowly.

## Database structure recommendation

For game-dev work in Notion, recommended databases:

### Backlog (database)
- Title (text)
- Status (select: Open / In Progress / Review / Done / Blocked)
- Priority (select: P0 / P1 / P2 / P3)
- Owner (person)
- Due (date)
- Type (multi-select: Feature / Bug / Research / Polish)
- Notes (page, for rich content)
- Linked design docs (relation to Design DB)

### Design Docs (database)
- Title
- Status (Draft / Reviewed / Approved / Deprecated)
- Owner
- Last reviewed (date)
- Pillars (multi-select)
- Page content (rich)

### Research (database)
- Source (text)
- Date captured
- Audience segment (multi-select)
- Themes (multi-select)
- Confidence ([CONFIRMED]/[LIKELY]/[UNCERTAIN])
- Source label ([USER]/[EVIDENCE]/[HYPOTHESIS]/[PATTERN]/[UNKNOWN])
- Notes (page)

### Decisions (ADRs as pages)
- Number / Title / Status / Date / Outcome / Rationale

## What agents do with Notion access

### `project-manager` workflow

`/sprint-plan`:
1. Queries Backlog database for `Status = Open AND Priority IN [P0, P1]`
2. Cross-references with `production/sprint/current.md`
3. Presents calibrated sprint plan
4. Updates Notion entries: marks selected items as `In Progress`, sets Due dates

### `research-analyst` workflow

`/research-digest`:
1. Queries Research database for entries since last digest
2. Groups by Theme
3. Drafts digest as new Notion page in Research/Digests
4. Links back to source entries

### `creative-director` workflow

`/design-review`:
1. Reads relevant Design Doc pages
2. Reads ADR Decisions for past rationale
3. Validates new proposal against existing decisions
4. Drafts new ADR if proposal is novel decision

## Calibration in Notion

Use **multi-select properties** for calibration labels:
- Confidence (single-select): CONFIRMED / LIKELY / UNCERTAIN
- Source (single-select): USER / EVIDENCE / HYPOTHESIS / PATTERN / UNKNOWN

This makes filtering trivial: "show me all UNCERTAIN claims about audience"

## Anti-patterns

- **Massive Notion workspaces shared at root** — security risk, performance pain
- **Mixing personal + project content in shared scope**
- **Letting Claude create pages without "Draft" prefix** — easy to lose track
- **Skipping the Database structure** — Notion shines with structured data, not free-text only
- **Real-time collaboration concerns**: Notion's edit conflict handling is sloppy. If multiple agents/humans edit same page simultaneously: someone's edit wins, others lose. Use page locking or owner-only-edit conventions.

## Cost note

Notion API has rate limits (~3 requests/second). For large research digestion (50+ entries), batch carefully — don't fire 200 reads in 10 seconds.

## Operational checklist

- [ ] Integration created in Notion
- [ ] Token in `.env`, scoped narrowly
- [ ] Shared only project-relevant databases (not entire workspace)
- [ ] Database schemas align with template's calibration vocabulary
- [ ] Agents use database queries, not full-text search (more reliable)

## Cross-reference

- `clickup-mcp-workflow` — alternative for task-only setup
- `obsidian-mcp-workflow` — alternative for local-first
- `calibration-vocabulary` — applies in Notion same as markdown
- `thematic-coding` — research database design
