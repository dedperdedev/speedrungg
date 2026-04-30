# Speedrungg

Two-studio AI team for browser game development. A Claude Code plugin.

**44 agents · 62 knowledge skills · 26 slash commands · 9 hooks · 8 MCP integrations.**

## Install

### From this repo as a marketplace

```bash
# In Claude Code
/plugin marketplace add <github-owner>/speedrungg
/plugin install speedrungg@speedrungg-marketplace
```

### Local install for testing

```bash
git clone <this-repo>
cd speedrungg
# In Claude Code
/plugin marketplace add .
/plugin install speedrungg@speedrungg-marketplace
```

After install: in Claude Code run `/start` to begin a new game project.

## What you get

| Component | Count | Where |
|---|---|---|
| Agents | 44 | `agents/` (3 directors, 9 leads, 19 specialists, 6 engine specialists, 7 research) |
| Skills | 62 | `skills/<name>/SKILL.md` — auto-loaded by Claude when relevant |
| Slash commands | 26 | `commands/` — `/start`, `/sprint-plan`, `/release-checklist`, etc. |
| Hooks | 9 | `hooks/hooks.json` — session lifecycle, PreCompact, supply-chain audit |
| MCP servers | 8 | `.mcp.json` — GitHub, ClickUp, Notion, Obsidian, Figma, Phaser, Playwright, Sentry |

## Project setup (after plugin install)

The plugin gives you the **AI team** but doesn't include game starter code. To start a project:

1. **Create a project directory** for your game
2. **Copy starter code** from `templates/starter/` (deterministic core, tests, GDD scaffolding)
3. **Copy project rules** from `templates/.claude/` (path-scoped rules, agent memory)
4. **Open in Claude Code** and run `/start` — the bootstrap agent will guide you through the foundational interview

Or if you want just the AI team without starter code, skip step 2.

## Key features

- **Deep interview by default** — agent refuses defaults; ~25 questions in 6 blocks before any code
- **Hard guardrails against bluffing** — calibration labels (`[CONFIRMED]/[LIKELY]/[UNCERTAIN]`) + source labels (`[USER]/[EVIDENCE]/[HYPOTHESIS]/[PATTERN]/[UNKNOWN]`)
- **Two parallel studios** — Main Studio (37 agents) builds the game, Research Hub (7 agents) studies audience/market/competitors independently
- **Plan Mode wrappers** on expensive commands (`/start`, `/sprint-plan`, `/prototype`, `/deploy`, `/release-checklist`, `/brainstorm`)
- **Model tiering** — Opus for vision (5 agents), Sonnet default, Haiku for high-volume (qa-tester, analytics-engineer)
- **Hard caps** — max retrieval cycles=3, max tool retries=3, context warnings 70/85/90%
- **Verification requirements** — every "shipped" claim needs artifact (tests pass, screenshot, Lighthouse, npm audit, axe-core)
- **Supply-chain audit** — `pre-install-audit.sh` hook scans new skills/MCP servers for malicious patterns

## Integrations

8 MCP servers ready to enable. Edit `.mcp.json` (`enabled: true`) and configure tokens in your `.env`:

| Server | Purpose | Trust level |
|---|---|---|
| **GitHub** | Issues, PRs, releases | First-party |
| **Playwright** | Browser automation for QA verification | First-party |
| **Phaser Editor** | Phaser scene/sprite/animation (Jan 2026) | First-party |
| **Obsidian** | Local-first design notes / zettelkasten | First-party (via filesystem MCP) |
| **Notion** | Tasks AND notes in one tool | First-party |
| **ClickUp** | Sprint / task management | Third-party |
| **Figma** | Design-to-code; design tokens | Vendor |
| **Sentry** | Error tracking / production triage | Vendor |

## Engines supported

- **Phaser 4** (final May 2025) + auto-import of 28 official skills + Phaser MCP
- **PixiJS v8** (current April 2026; opt-in WebGPU)
- **Three.js r170+** (production WebGPURenderer with WebGL2 fallback)
- **Babylon.js 8** (March 2025; WGSL native shaders, new audio engine)
- **Vanilla Canvas / WebGL** for size-constrained
- **Web platform** (HTML/CSS/SVG/DOM) for non-canvas games

## How the studio thinks

### Two studios, one session — and why they're separated

The Research Hub is **not a department of the main studio**. Research and development have different rhythms (sprints vs longitudinal monitoring), different fail-modes (shipping the wrong thing vs biased findings), and different ethics (serving the product vs serving the truth). Mixing them breaks both. So: parallel mini-studios, peer directors, escalation through leadership, never direct.

### How market, competitor, uniqueness, and monetization work

Earlier studio templates refused to touch these because the model bluffs. Speedrungg has agents for each, but with hard guardrails:

- **`market-analyst`** — structures market knowledge; doesn't invent stats; sources every claim; asks the user first.
- **`competitor-analyst`** — analyzes competitors the user names (or web-search finds); never invents sentiment; always cites.
- **`creative-strategist`** — runs the Uniqueness Interview; excavates the user's voice instead of inventing it.
- **`monetization-strategist`** — knows the *shape* of every model; refuses to claim current rates; refuses dark patterns.
- **`marketing-lead`**, **`community-manager`**, **`growth-marketer`** — strategy, voice, conversion. None of them post on the user's behalf — only draft.

### Calibration is mandatory

Every non-trivial claim wears two labels: confidence (`[CONFIRMED]`/`[LIKELY]`/`[UNCERTAIN]`) + source (`[USER]`/`[EVIDENCE]`/`[HYPOTHESIS]`/`[PATTERN]`/`[UNKNOWN]`). Unlabeled = fake confidence. The `calibration-vocabulary` skill is the binding reference.

### Humans still own (this is forever)

Final creative calls when two good options are both valid · ethical/tonal red lines · personal voice · whether to trust a piece of evidence · what "good enough" means.

## Cost notes

- The studio caches the system prompt + tool definitions + path-scoped rules on every call (cache reads ~10% of standard input rate).
- Overnight async work (competitor watch, market scanning) can use the Batch API for 50% off.
- 1M context window is now standard pricing on Opus 4.6 / Sonnet 4.6 / Opus 4.7 — no long-context surcharge.
- **Opus 4.7 tokenizer warning:** up to 35% more tokens for the same text vs prior models — real cost rises even though the sticker price is unchanged.
- Hard caps (`hardCaps` block in `settings.example.json`) are what actually bound runaway sessions. Merge them into `~/.claude/settings.json` to enforce.

## Why "Speedrungg"?

Two gaming references in one name:
- **speedrun** — fast iteration, ship games quickly
- **gg** — "good game", the gesture of respect after a match

The plugin's job: speedrun your dev cycle, ship the game, gg.

## License

MIT. See LICENSE.
