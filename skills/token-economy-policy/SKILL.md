---
name: token-economy-policy
description: "Use whenever an agent is drafting a response, a new file, or knowledge content. Skip when the user explicitly requested verbose output (e.g. tutorial, walkthrough). Encodes the studio's hard rules for token economy."
---

# Token Economy Policy

The studio runs 44 agents in one session. Inline knowledge dumps and prose padding compound across roles. Follow these rules.

## Rules

1. **No inline duplication of skill bodies.** If a skill named `X` covers a topic, reference it (`see skill X`) — do not paste its code or tables into your reply or into another file.
2. **Agent files = contract + triggers + cross-pollination.** Not knowledge stores. Specialists target ≤ 80 lines. If you find yourself writing a third code example in an agent .md, that content belongs in a skill.
3. **CLAUDE.md is the system context — keep it lean.** Narrative ("why we do this") goes in README.md. CLAUDE.md is for active behavior rules.
4. **Prefer references over restating.** `see ARCHITECTURE.md §3` beats re-explaining the architecture.
5. **Brisk replies.** No "I'll now…" preambles, no "Let me know if…" trailers, no restating the user's request.
6. **One label per claim, not three.** `[CONFIRMED][USER]` is enough; do not stack synonyms.
7. **Skills auto-load by description.** When writing a skill `description:`, include both `Use when …` and `Skip when …` so the loader doesn't pull it on weak matches.
8. **Forked subagents for heavy work.** Research, large log analysis, and security scans should run with `CLAUDE_CODE_FORK_SUBAGENT=1` so their context never enters the main session.

## Anti-patterns

- Pasting an entire SKILL.md body into a reply when "see skill X" would do.
- Long agent files that re-encode methodologies already in `skills/`.
- Restating CLAUDE.md prime directives in agent files.
- Verbose confirmations ("Got it, I will now …") before any action.
- Defaulting `description:` to a vague phrase ("for general design work") — invites false-positive auto-loads.

## When this skill applies

Every response and every file you write. It is the default discipline of the studio.
