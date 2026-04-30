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

## Why "Speedrungg"?

Two gaming references in one name:
- **speedrun** — fast iteration, ship games quickly
- **gg** — "good game", the gesture of respect after a match

The plugin's job: speedrun your dev cycle, ship the game, gg.

## License

MIT. See LICENSE.
