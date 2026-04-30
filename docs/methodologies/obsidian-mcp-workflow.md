# Obsidian MCP Workflow

How agents (especially `writer`, `game-designer`, `research-analyst`) integrate with an Obsidian vault for design notes, research zettelkasten, and devlog drafts. Best for users who already live in Obsidian and want Claude to read/cross-reference their notes without leaving the workflow.

## When to use

- User has an existing Obsidian vault with research notes / design ideas / devlog
- Project is private / solo / sensitive — local-first beats cloud
- Zettelkasten-style cross-referencing is part of the workflow
- User wants Claude to suggest links between notes

## When NOT to use

- User doesn't use Obsidian — don't impose a tool
- Multi-person collaboration — Obsidian is local-first; team sync is friction
- Quick prototype — overhead not justified

## Setup options

### Option A — Filesystem MCP (read-only, recommended)

Use the official Anthropic filesystem MCP server pointed at your vault:

```json
{
  "obsidian": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "/Users/you/Documents/ObsidianVault"
    ],
    "enabled": true
  }
}
```

This gives Claude **read** access to your vault — it can browse, search, link.
**No write access** — Claude can't accidentally modify your notes.

### Option B — Obsidian Local REST API + community MCP (read-write)

If you need write (for example, devlog drafts):

1. Install Obsidian's "Local REST API" plugin
2. Use a community MCP server like `@takuya0301/mcp-obsidian` against the REST API
3. Configure with API key from the plugin

**Caveat:** Bidirectional access means Claude can modify notes. Scope carefully — point it at a specific subfolder, not the whole vault.

### Option C — Custom (most control)

Write a tiny MCP shim that exposes only the operations you trust:
- `read_note(path)`
- `search_notes(query)`
- `link_notes(from, to)` [optional]
- `create_devlog_draft(content)` [scoped to /Drafts/ folder only]

About 100 lines of TypeScript. Worth it if you have specific scope concerns.

## What agents do with Obsidian access

### `research-analyst` workflow

When digesting research:
1. Reads `Research/Sources/<source>.md` notes you've highlighted
2. Cross-references with `Research/Themes/<theme>.md`
3. Surfaces gaps: themes referenced once vs many times
4. Drafts new digest as `Research/Digests/YYYY-MM-DD.md` (with permission)

### `writer` workflow

When drafting narrative or devlog:
1. Reads `Worldbuilding/<entity>.md` for canonical character/setting details
2. Reads `Style/voice-guide.md` for tone consistency
3. Drafts new content matching established voice
4. Links to existing notes via `[[wikilink]]` syntax

### `game-designer` workflow

During `/design-review`:
1. Reads `Design/Pillars.md` and `Design/Vision.md`
2. Pulls related decisions from `Decisions/ADR-*.md`
3. Validates new design choice against existing constraints
4. Surfaces inconsistencies as `[UNCERTAIN]` items

## Vault structure recommendation

Suggested folders for game-dev work:

```
ObsidianVault/
├── Design/
│   ├── Vision.md
│   ├── Pillars.md
│   ├── Mechanics/
│   └── Levels/
├── Research/
│   ├── Sources/         # one note per source, with quotes + link
│   ├── Themes/          # cross-cut themes that emerge
│   ├── Audiences/
│   ├── Competitors/
│   └── Digests/         # weekly synthesis
├── Worldbuilding/       # writer's domain
├── Decisions/           # ADRs
├── Devlog/              # public drafts
└── Inbox/               # daily capture; sort weekly
```

This mirrors the template's `docs/research/` structure. Helps Claude orient quickly.

## Wikilinks discipline

Obsidian's killer feature is `[[note title]]` linking. Train agents to:
- Use wikilinks when referring to your own notes (not full paths)
- Suggest new links when concepts cross-cut
- Note "broken" wikilinks (target doesn't exist) as opportunities

## Privacy boundary

- **Don't point Claude at vaults containing PII or secrets**
- **Don't sync MCP-access vault to public Git** without `.mcpignore` style filtering
- **Vault is your second brain** — be deliberate about what Claude reads

## Anti-patterns

- Letting Claude write to vault root (clutter)
- Not setting read-only mode for filesystem MCP (accident risk)
- Pointing at iCloud/Dropbox-synced vault while Claude is mid-edit (sync conflicts)
- Mixing project notes with personal journal in same vault scope

## Operational checklist

- [ ] Vault path configured in `.claude/mcp.json`
- [ ] Read-only by default (or explicit subfolder write scope)
- [ ] `.gitignore` excludes vault contents from public repos
- [ ] Folder structure documented for agent orientation
- [ ] Sensitive vaults excluded entirely

## Cross-reference

- `thematic-coding` — when reading research notes, apply this discipline
- `interview-protocols` — capture interview output to vault, not just markdown
- `clickup-mcp-workflow` — alternative for task management
- `notion-mcp-workflow` — alternative if user prefers Notion
