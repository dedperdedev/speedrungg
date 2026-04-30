#!/usr/bin/env node
// Convert methodology files to Claude Code Skills format.
// Each methodology becomes a Skill with YAML frontmatter + the original content.
// Skills are model-invoked on-demand based on the description, dramatically
// reducing context bloat compared to static loading.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const METHODOLOGY_DIR = path.join(__dirname, '../.claude/methodologies');
const SKILLS_DIR = path.join(__dirname, '../.claude/agent-skills');

// Skill descriptions hand-written for trigger quality.
// Format: { skill-name: { name, description, triggers (when model should load) } }
const SKILL_META = {
  'calibration-vocabulary': {
    description: 'Use when an agent needs to label a claim with confidence ([CONFIRMED]/[LIKELY]/[UNCERTAIN]) and source ([USER]/[EVIDENCE]/[HYPOTHESIS]/[PATTERN]/[UNKNOWN]). The 3-level confidence + source-label system that prevents bluffing.',
  },
  'hypothesis-labels': {
    description: 'Use when deciding which source label to apply to a claim. Decision flowchart for [USER]/[EVIDENCE]/[HYPOTHESIS]/[PATTERN]/[UNKNOWN].',
  },
  'mda-framework': {
    description: 'Use when designing or reviewing a game mechanic. The Mechanics-Dynamics-Aesthetics framework separates what the designer builds from what the player feels.',
  },
  'flow-state-design': {
    description: 'Use when calibrating game difficulty, challenge curves, or session pacing. Csikszentmihalyi flow theory adapted to games with operational checklists and difficulty curve patterns.',
  },
  'four-types-of-fun': {
    description: 'Use when defining what kind of fun the game serves. Lazzaro 4 Keys to Fun (Hard/Easy/People/Serious) for creative direction and audience targeting.',
  },
  'juice-it-or-lose-it': {
    description: 'Use when adding game-feel polish. Jonasson + Purho juice patterns: visual, audio, haptic, procedural feedback layers with clarity test.',
  },
  'lenses-summary': {
    description: 'Use during /design-review for design critique. Curated subset of Schell deck of lenses (L4 Surprise, L7 Endogenous Value, L33 Meaningful Choices, etc.) for focused review.',
  },
  'bartle-types-revisited': {
    description: 'Use when defining audience segments by play motivation. Bartle MUD taxonomy with critique and modern 6-type expansion (Achiever/Explorer/Socializer/Competitor/Creator/Cozy).',
  },
  'costikyan-choice-taxonomy': {
    description: 'Use when designing player choices. Costikyan anatomy of a meaningful choice: 4 criteria (Awareness/Information/Consequence/Reminder) and 6 choice types.',
  },
  'systems-thinking-loops': {
    description: 'Use when designing game systems with feedback loops. Lewin/Forrester/Meadows applied to games — stocks, flows, reinforcing/balancing loops, common system failure modes.',
  },
  'economy-source-sink': {
    description: 'Use when designing virtual economies, currencies, or resource flows. Source-sink theory for stable economies; inflation/deflation diagnosis; multi-currency design.',
  },
  'progression-curves': {
    description: 'Use when tuning XP, gold, levels, or any growth curve. Linear vs exponential vs logistic curves with selection cheat sheet by game type.',
  },
  'difficulty-and-mercy': {
    description: 'Use when designing difficulty levels, mercy mechanics, or assist features. Includes 2024-2025 DDA skepticism — be cautious about dynamic difficulty adjustment.',
  },
  'deterministic-game-loop': {
    description: 'Use when implementing the game loop. Fixed-timestep simulation with variable-rate render; spiral-of-death prevention; replay-able pattern.',
  },
  'mutable-udf-store': {
    description: 'Use when implementing state management. Single mutable store + event log + replay pattern for deterministic, multiplayer-ready games.',
  },
  'object-pooling': {
    description: 'Use when allocation in tight loops causes GC pauses (bullets, particles, damage numbers). Pooling pattern with common bugs and web-game specifics.',
  },
  'pure-reducers': {
    description: 'Use when writing or reviewing gameplay reducers. Pure function discipline: same input same output, no side effects, no mutation, no async.',
  },
  'rail-model': {
    description: 'Use when setting performance budgets. RAIL model: Response < 100ms, Animation < 16ms, Idle ≤ 50ms, Load < 5s on 3G.',
  },
  'critical-rendering-path': {
    description: 'Use when diagnosing render performance issues. Browser rendering pipeline: what triggers Layout vs Paint vs Composite; layout-thrash patterns.',
  },
  'long-animation-frames': {
    description: 'Use for theoretical understanding of LoAF API. For instrumentation, prefer loaf-instrumentation.md.',
  },
  'loaf-instrumentation': {
    description: 'Use for production performance monitoring with Long Animation Frames API. Practical patterns for jank detection and production sampling.',
  },
  'bundle-budget-strategy': {
    description: 'Use when reviewing bundle size or load time. 2026 numbers: ≤2MB initial for Poki, ≤2s TTI on mobile, per-engine baselines, dep audit checklist.',
  },
  'wcag-game-checklist': {
    description: 'Use when implementing or auditing accessibility. WCAG 2.1 AA mapped to game patterns: contrast, keyboard, motion, audio, customization.',
  },
  'gameaccessibilityguidelines': {
    description: 'Use when targeting accessibility tier (Basic/Intermediate/Advanced). Game-industry-standard 3-tier framework with selection guide by project type.',
  },
  'screen-reader-game-patterns': {
    description: 'Use when adding screen reader support to a canvas-based game. Live regions, hidden DOM mirror, turn-based vs real-time patterns.',
  },
  'owasp-top-10-for-games': {
    description: 'Use during security review or threat modeling. OWASP Top 10 adapted for web games: client trust, secrets in bundle, anti-cheat, supply chain.',
  },
  'secure-multiplayer-protocol': {
    description: 'Use when designing multiplayer or leaderboard protocols. Server-authoritative, schema validation, rate limiting, replay verification.',
  },
  'web-game-supply-chain': {
    description: 'Use when adding npm dependencies or auditing supply chain. Lockfile, audit, Dependabot, SRI, CSP. Critical given 2024-2025 npm attack patterns.',
  },
  'web-audio-procedural': {
    description: 'Use when implementing SFX procedurally with Web Audio API. Recipes for blip/coin/jump/boom; iOS audio unlock; ZzFX option.',
  },
  'dynamic-music-systems': {
    description: 'Use when implementing reactive game music. Vertical layered, horizontal sequencing, stinger insertion, adaptive tempo.',
  },
  'audio-worklet-modern': {
    description: 'Use when ScriptProcessorNode would have been the answer (deprecated). AudioWorklet patterns + Wasm Audio Worklet for high-perf DSP.',
  },
  'refactoring-ui-principles': {
    description: 'Use when designing UI / HUD. Wathan + Schoger principles: hierarchy via weight not size, grayscale for importance, whitespace as weapon.',
  },
  'juice-vs-clarity': {
    description: 'Use when adding visual/audio juice. The clarity tradeoff: 3-tier juice budget, mute test, reduce-motion respect.',
  },
  'loading-screens-that-work': {
    description: 'Use when implementing loading screens. Honest progress bars, front-loaded visible work, productive loading patterns.',
  },
  'first-30-seconds-rule': {
    description: 'Use when designing game opening / onboarding. The web-game opening seconds discipline: visible identity by 5s, interactive by 10s, success moment by 30s.',
  },
  'view-transitions-game-ui': {
    description: 'Use when implementing menu transitions, scene swaps, or HUD state changes. Native View Transitions API patterns; replaces hand-rolled CSS animation.',
  },
  'interview-protocols': {
    description: 'Use when interviewing audiences, playtesters, or the project owner. Open-ended questions, 5-whys drilling, follow-up patterns, anti-leading.',
  },
  'thematic-coding': {
    description: 'Use when analyzing playtest transcripts or interview data. Open coding → themes → counts → representative quotes; bias guards.',
  },
  'statistical-floor': {
    description: 'Use when interpreting research findings or survey data. Sample size, effect size vs p-value, multiple comparisons, A/B testing rules.',
  },
  'survivorship-bias': {
    description: 'Use when interpreting any sample data. Your sample contains survivors; the dropouts are invisible and informative. Defenses: track funnel.',
  },
  'rice-scoring': {
    description: 'Use during /sprint-plan or backlog prioritization. Reach × Impact × Confidence ÷ Effort with worked example.',
  },
  'opportunity-solution-tree': {
    description: 'Use when planning quarter-level work. Teresa Torres: outcome → opportunities → solutions → experiments. Prevents feature-factory thinking.',
  },
  'jobs-to-be-done': {
    description: 'Use when defining audience or game positioning. Christensen JTBD applied to games: when [situation], I want to [motivation], so I can [outcome].',
  },
  'positioning-frameworks': {
    description: 'Use when defining game positioning, store page, or marketing. Trout/Lochhead frameworks; 7-word pitch test; 2025-2026 marketing reality (TikTok collapse).',
  },
  'monetization-ethical-floor': {
    description: 'Use when discussing monetization, IAP, or business model. Hard refusals (loot boxes, P2W, dark patterns) and allowed alternatives.',
  },
  'behavioral-economics-for-games': {
    description: 'Use when discussing player psychology, persuasion, or monetization design. Cognitive biases (anchoring, loss aversion, etc.) with ethical/exploitative line.',
  },
  'cozy-game-design': {
    description: 'Use when designing or reviewing a cozy game. Project Horseshoe 3-pillar framework (Safety/Abundance/Softness) with cross-cultural notes.',
  },
  'storylets-quality-based-narrative': {
    description: 'Use when designing branching narrative. Storylets and QBN architecture beats branching trees for replay value and post-launch content adds.',
  },
  'cognitive-load-game': {
    description: 'Use when diagnosing UX confusion or designing tutorials. Sweller 3-load model (intrinsic/extraneous/germane) applied to games.',
  },
  'web-game-portal-comparison': {
    description: 'Use when choosing distribution channel for a web game. Honest comparison: Poki, CrazyGames, Y8, Newgrounds, itch.io, aggregators.',
  },
  'gameplay-conversion-ratio': {
    description: 'Use when optimizing for portal distribution (Poki, CrazyGames). 73% target metric: load time + first screen + first 30 seconds + tech basics.',
  },
  'direct-traffic-arbitrage': {
    description: 'Use when planning Poki distribution. Off-platform traffic generates 100% revenue; landing page + social + press strategies for arbitrage.',
  },
  'eaa-baseline': {
    description: 'Use when reviewing accessibility for EU distribution. European Accessibility Act baseline; micro-enterprise exemption guidance.',
  },
  'digital-fairness-act-watch': {
    description: 'Use when designing monetization or engagement mechanics. EU Digital Fairness Act forward-looking constraints: loot box ban for minors, dark patterns.',
  },
  'cvaa-communications': {
    description: 'Use when implementing chat features (text/voice/video). CVAA US compliance: visual indicators, mute/block, captions, FCC 2025 guidance.',
  },
  'webgpu-readiness': {
    description: 'Use when choosing renderer (WebGL vs WebGPU). Per-engine decision framework; benchmarking discipline; WebGPU is not always faster.',
  },
  'payment-processor-risk': {
    description: 'Use when planning distribution and revenue. itch.io 2025 case study; diversification discipline; what to do if payouts freeze.',
  },
  'clickup-mcp-workflow': {
    description: 'Use when integrating with ClickUp via MCP for task / sprint management. Setup, sync patterns, agent workflows, bidirectional sync discipline.',
  },
  'obsidian-mcp-workflow': {
    description: 'Use when integrating with an Obsidian vault via MCP for design notes / research / zettelkasten. Setup, vault structure, scope/privacy.',
  },
  'notion-mcp-workflow': {
    description: 'Use when integrating with Notion via MCP for tasks AND notes in one tool. Setup, database schemas matching template calibration, scope.',
  },
  'github-mcp-workflow': {
    description: 'Use when integrating with GitHub via MCP for issues, PR review, releases. Most universal integration; simplest task management option (Issues + Milestones).',
  },
  'figma-mcp-workflow': {
    description: 'Use when integrating with Figma via MCP for design-to-code workflows. Token extraction, layout reference, what NOT to auto-generate.',
  },
};

function readMethodology(name) {
  const filePath = path.join(METHODOLOGY_DIR, `${name}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

function buildSkill(name, content, meta) {
  const description = meta.description.replace(/\n/g, ' ').trim();
  // Strip the original H1 title since we'll have one in the SKILL.md
  // and add the YAML frontmatter
  return `---
name: ${name}
description: ${JSON.stringify(description)}
---

${content.trim()}
`;
}

function migrate() {
  if (!fs.existsSync(METHODOLOGY_DIR)) {
    console.error('Methodology dir not found:', METHODOLOGY_DIR);
    process.exit(1);
  }

  if (!fs.existsSync(SKILLS_DIR)) {
    fs.mkdirSync(SKILLS_DIR, { recursive: true });
  }

  const files = fs.readdirSync(METHODOLOGY_DIR).filter(f => f.endsWith('.md') && f !== 'INDEX.md');

  let migrated = 0;
  let skipped = 0;

  for (const file of files) {
    const name = file.replace(/\.md$/, '');
    const meta = SKILL_META[name];
    if (!meta) {
      console.warn(`  ⚠ no meta for ${name}, skipping`);
      skipped++;
      continue;
    }
    const content = readMethodology(name);
    if (!content) {
      console.warn(`  ⚠ no content for ${name}`);
      skipped++;
      continue;
    }
    const skillDir = path.join(SKILLS_DIR, name);
    if (!fs.existsSync(skillDir)) fs.mkdirSync(skillDir, { recursive: true });
    const skillContent = buildSkill(name, content, meta);
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent);
    migrated++;
  }

  console.log(`✓ Migrated ${migrated} methodologies to Skills`);
  console.log(`  Skipped ${skipped}`);
}

migrate();
