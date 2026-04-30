# Methodology Library — Index

Reusable frameworks, principles, and proven patterns. Agents reference these instead of duplicating in every contract.

> **Rule:** every agent's contract has a `## Methodologies you apply` section listing relevant files here. Agent reads them when invoked.
>
> **Note (v1.0):** As of v1.0, the methodology library is also exposed as Claude Code Skills in `.claude/agent-skills/<name>/SKILL.md` with YAML frontmatter triggers. The model loads skills on-demand when relevant. This `methodologies/` directory remains as the human-readable source.

## Calibration & honesty

- `calibration-vocabulary.md` — 3-level confidence (`[CONFIRMED]` / `[LIKELY]` / `[UNCERTAIN]`) + source labels
- `hypothesis-labels.md` — When to use which label and how

## Game design

- `mda-framework.md` — Mechanics → Dynamics → Aesthetics
- `flow-state-design.md` — Csikszentmihalyi's flow applied to games
- `four-types-of-fun.md` — Hard / Easy / People / Serious fun (Lazzaro)
- `juice-it-or-lose-it.md` — Game-feel patterns (Jonasson + Purho)
- `lenses-summary.md` — Schell's deck of lenses (curated subset)
- `bartle-types-revisited.md` — Player taxonomy with critique + 6-type update
- `costikyan-choice-taxonomy.md` — Anatomy of a meaningful choice
- `cozy-game-design.md` — Project Horseshoe 3-pillar framework (Safety/Abundance/Softness)
- `storylets-quality-based-narrative.md` — Short + Kreminski storylet taxonomy
- `cognitive-load-game.md` — Sweller 3-load model for gameplay
- `difficulty-and-mercy.md` — Ramp design + assist mechanics + DDA skepticism (2024-2025 research)

## Game systems

- `systems-thinking-loops.md` — Positive / negative feedback loops, stocks & flows
- `economy-source-sink.md` — Faucet-drain virtual economy patterns
- `progression-curves.md` — Linear / exponential / logistic, when to use which

## Code & architecture

- `deterministic-game-loop.md` — Fixed timestep + variable render
- `mutable-udf-store.md` — Single mutable store + event log + replay
- `object-pooling.md` — Anti-GC discipline for hot loops
- `pure-reducers.md` — Same input → same output discipline

## Performance

- `rail-model.md` — RAIL budget (Response/Animation/Idle/Load)
- `critical-rendering-path.md` — Browser pipeline; Layout vs Paint vs Composite
- `loaf-instrumentation.md` — Long Animation Frames API production patterns (2025-2026)
- `long-animation-frames.md` — *(Superseded by loaf-instrumentation.md)*
- `bundle-budget-strategy.md` — 2026 numbers (Poki ≤2MB, ≤2s TTI mobile)

## Web platform

- `view-transitions-game-ui.md` — Native View Transitions API for UI state
- `audio-worklet-modern.md` — AudioWorklet replacing deprecated ScriptProcessorNode
- `webgpu-readiness.md` — Per-engine WebGL vs WebGPU decision framework

## Accessibility

- `wcag-game-checklist.md` — WCAG 2.1 AA mapped to game patterns
- `gameaccessibilityguidelines.md` — Game-industry 3-tier framework (Basic/Intermediate/Advanced)
- `screen-reader-game-patterns.md` — Canvas-game screen reader support
- `eaa-baseline.md` — European Accessibility Act minimum (micro-enterprise carve-out)
- `cvaa-communications.md` — US chat accessibility (FCC 2025 guidance)

## Security

- `owasp-top-10-for-games.md` — OWASP Top 10 adapted for web games
- `secure-multiplayer-protocol.md` — Server-authoritative, schema validation, replay verification
- `web-game-supply-chain.md` — Lockfile, audit, Dependabot, SRI, CSP
- `digital-fairness-act-watch.md` — EU forward-looking constraints (loot box ban for minors)

## Audio

- `web-audio-procedural.md` — SFX recipes; iOS audio unlock; ZzFX
- `dynamic-music-systems.md` — Reactive game music (vertical/horizontal layering)

## UI / UX

- `refactoring-ui-principles.md` — Wathan + Schoger; hierarchy, weight, whitespace
- `juice-vs-clarity.md` — When juice helps, when it hurts; reduce-motion respect
- `loading-screens-that-work.md` — Honest progress, productive loading
- `first-30-seconds-rule.md` — Web-game opening discipline

## Research methodology

- `interview-protocols.md` — 5-whys, hypothesis labels, anti-leading
- `thematic-coding.md` — Open coding → themes → bias guards
- `statistical-floor.md` — Sample size, effect size, p-value caveats
- `survivorship-bias.md` — What's invisible in your data

## Strategy & prioritization

- `rice-scoring.md` — Reach × Impact × Confidence ÷ Effort
- `opportunity-solution-tree.md` — Outcome → opportunities → solutions → experiments (Torres)
- `jobs-to-be-done.md` — Christensen JTBD applied to games
- `positioning-frameworks.md` — Pitch refinement; 2025-2026 marketing reality (TikTok collapse)
- `monetization-ethical-floor.md` — Hard refusals (loot boxes, P2W, dark patterns)
- `behavioral-economics-for-games.md` — Cognitive biases; ethical/exploitative line

## Distribution & monetization

- `web-game-portal-comparison.md` — Poki vs CrazyGames vs Y8 vs Newgrounds vs itch.io
- `gameplay-conversion-ratio.md` — CrazyGames 73% benchmark + optimization recipe
- `direct-traffic-arbitrage.md` — Poki 100% off-platform revenue strategy
- `payment-processor-risk.md` — itch.io 2025 case study; diversification discipline

## Tooling integrations (MCP workflows)

- `clickup-mcp-workflow.md` — ClickUp integration for sprint/task management
- `obsidian-mcp-workflow.md` — Obsidian vault integration for design notes / zettelkasten
- `notion-mcp-workflow.md` — Notion integration for tasks AND notes in one tool
- `github-mcp-workflow.md` — GitHub integration (issues, PRs, releases) — most universal
- `figma-mcp-workflow.md` — Figma integration for design-to-code workflows

---

## How agents reference these

In an agent contract:

```yaml
## Methodologies you apply

- `mda-framework.md` — for mechanic design
- `flow-state-design.md` — for difficulty calibration
- `cozy-game-design.md` — if cozy game
- ...
```

The agent reads these files at the start of substantive work and cites them when explaining decisions.

## Adding a new methodology

1. Write `.claude/methodologies/<name>.md` with content
2. Add metadata entry in `tools/migrate-methodologies-to-skills.mjs` SKILL_META map (description for trigger)
3. Run `node tools/migrate-methodologies-to-skills.mjs` to generate Skill
4. Add agent attachment entry in `tools/attach-skills-to-agents.mjs` ATTACHMENTS map
5. Run `node tools/attach-skills-to-agents.mjs` to wire to relevant agents
6. Update this INDEX

Total: 63 methodologies (1 superseded, 62 active in agent-skills/).
