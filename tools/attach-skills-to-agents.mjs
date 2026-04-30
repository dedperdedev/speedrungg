#!/usr/bin/env node
// Add skill references to agents that should use them.
// Targets the "## Methodologies you apply" section of each agent file.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AGENTS_DIR = path.join(__dirname, '../.claude/agents');

// Skill → list of agent files that should reference it
const ATTACHMENTS = {
  'cozy-game-design': [
    'leads/game-designer.md',
    'directors/creative-director.md',
    'specialists/creative-strategist.md',
  ],
  'storylets-quality-based-narrative': [
    'leads/game-designer.md',
    'specialists/writer.md',
    'specialists/systems-designer.md',
  ],
  'cognitive-load-game': [
    'specialists/ux-designer.md',
    'specialists/ui-programmer.md',
    'specialists/accessibility-specialist.md',
  ],
  'cvaa-communications': [
    'specialists/accessibility-specialist.md',
    'specialists/network-programmer.md',
  ],
  'digital-fairness-act-watch': [
    'specialists/monetization-strategist.md',
    'leads/game-designer.md',
  ],
  'direct-traffic-arbitrage': [
    'leads/marketing-lead.md',
    'specialists/growth-marketer.md',
  ],
  'eaa-baseline': [
    'specialists/accessibility-specialist.md',
    'leads/qa-lead.md',
    'leads/release-manager.md',
  ],
  'gameplay-conversion-ratio': [
    'leads/marketing-lead.md',
    'specialists/growth-marketer.md',
    'leads/game-designer.md',
    'specialists/performance-analyst.md',
  ],
  'hypothesis-labels': [
    'research/research-director.md',
    'research/research-analyst.md',
    'research/audience-researcher.md',
    'research/market-analyst.md',
    'research/competitor-analyst.md',
    'research/social-media-researcher.md',
    'research/trends-analyst.md',
  ],
  'loaf-instrumentation': [
    'specialists/performance-analyst.md',
    'leads/technical-director.md',
  ],
  'view-transitions-game-ui': [
    'specialists/ui-programmer.md',
    'specialists/ux-designer.md',
  ],
  'web-game-portal-comparison': [
    'leads/marketing-lead.md',
    'specialists/monetization-strategist.md',
    'leads/release-manager.md',
    'specialists/growth-marketer.md',
  ],
  // Bonus: some new skills should also enrich existing agents
  'audio-worklet-modern': [
    'specialists/sound-designer.md',
    'leads/audio-director.md',
  ],
  'webgpu-readiness': [
    'leads/technical-director.md',
    'specialists/performance-analyst.md',
    'specialists/technical-artist.md',
  ],
  'clickup-mcp-workflow': [
    'directors/project-manager.md',
    'leads/release-manager.md',
    'leads/qa-lead.md',
  ],
  'obsidian-mcp-workflow': [
    'specialists/writer.md',
    'leads/game-designer.md',
    'research/research-analyst.md',
    'research/research-director.md',
    'directors/creative-director.md',
  ],
  'notion-mcp-workflow': [
    'directors/project-manager.md',
    'research/research-analyst.md',
    'directors/creative-director.md',
  ],
  'github-mcp-workflow': [
    'leads/release-manager.md',
    'leads/qa-lead.md',
    'directors/project-manager.md',
    'specialists/community-manager.md',
    'specialists/build-engineer.md',
  ],
  'figma-mcp-workflow': [
    'specialists/ux-designer.md',
    'specialists/ui-programmer.md',
    'leads/art-director.md',
  ],
  'payment-processor-risk': [
    'leads/marketing-lead.md',
    'leads/release-manager.md',
    'specialists/monetization-strategist.md',
    'specialists/growth-marketer.md',
  ],
};

function addSkillToAgent(agentPath, skillName) {
  const fullPath = path.join(AGENTS_DIR, agentPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠ Agent not found: ${agentPath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Skip if already references the skill
  if (content.includes('`' + skillName + '`') || content.includes(`\`${skillName}.md\``)) {
    return false; // already there
  }

  // Find the "## Methodologies you apply" section
  const methodsHeader = '## Methodologies you apply';
  const idx = content.indexOf(methodsHeader);

  if (idx === -1) {
    // No section — add one before the last section or at end
    const skillLine = `\n\n## Methodologies you apply\n\n- \`${skillName}\` — see skill description for triggers\n`;
    content = content.trimEnd() + skillLine;
    fs.writeFileSync(fullPath, content);
    return true;
  }

  // Find the end of the methodologies section (next ## header or EOF)
  const sectionStart = idx + methodsHeader.length;
  let sectionEnd = content.indexOf('\n## ', sectionStart);
  if (sectionEnd === -1) sectionEnd = content.length;

  // Insert a new bullet at the end of the section
  const beforeSection = content.slice(0, sectionEnd).trimEnd();
  const afterSection = content.slice(sectionEnd);
  const newBullet = `\n- \`${skillName}\` — see skill description for triggers`;

  content = beforeSection + newBullet + afterSection;
  fs.writeFileSync(fullPath, content);
  return true;
}

let totalAdded = 0;
let totalSkipped = 0;

for (const [skill, agents] of Object.entries(ATTACHMENTS)) {
  for (const agent of agents) {
    if (addSkillToAgent(agent, skill)) {
      totalAdded++;
    } else {
      totalSkipped++;
    }
  }
}

console.log(`✓ Added ${totalAdded} skill references`);
console.log(`  Skipped ${totalSkipped} (already present or agent missing)`);
