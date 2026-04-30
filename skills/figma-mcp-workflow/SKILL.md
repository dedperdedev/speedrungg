---
name: figma-mcp-workflow
description: "Use when integrating with Figma via MCP for design-to-code workflows. Token extraction, layout reference, what NOT to auto-generate."
---

# Figma MCP Workflow

How agents (especially `ux-designer`, `art-director`, `ui-programmer`) integrate with Figma for design-to-code workflows. Used when UI/UX is designed in Figma and needs to flow into the game's HTML/CSS/canvas implementation.

## When to use

- UI is designed in Figma before implementation
- Design tokens (colors, spacing, typography) live in Figma variables/styles
- You want Claude to extract design specs without you tabbing back and forth
- Multi-designer collaboration where Figma is canonical

## When NOT to use

- No Figma in workflow — don't impose
- Quick prototype with hand-drawn mockups — overhead not justified
- All UI is procedural / data-driven (HUD generated from game state) — Figma adds friction

## Setup

1. Create Figma personal access token: figma.com → Settings → Personal access tokens
2. **Minimum scope**: `file_content:read` for read-only; add `file_metadata:read` if you need names
3. Add to `.env`:
   ```
   FIGMA_PERSONAL_ACCESS_TOKEN=fpat_xxx
   ```
4. Enable in `.claude/mcp.json`
5. Verify with `/mcp` in Claude Code

## MCP server choice

There are multiple Figma MCP options. Pick based on need:

| Server | When to use |
|---|---|
| `@figma/code-connect-mcp` | You use Figma Code Connect to map components to code |
| `@modelcontextprotocol/server-figma` | General read access; lighter touch |
| `GLips/Figma-Context-MCP` | Community; broad capability incl. variables |

Start with the lightest one that meets your need. Add more capability only when needed.

## What agents do with Figma access

### `ux-designer` workflow

During UX review:
1. Reads Figma frame for current screen design
2. Compares with implementation in `src/ui/`
3. Surfaces drift: design says X, code does Y
4. Suggests sync direction (update code or update design)

### `art-director` workflow

During art pipeline review:
1. Reads design tokens (colors, spacing) from Figma variables
2. Compares with `src/ui/tokens.css` or equivalent
3. Generates updated token file from Figma source

### `ui-programmer` workflow

When implementing a new screen:
1. Reads Figma frame
2. Extracts:
   - Layout structure
   - Color values
   - Typography
   - Spacing scale
   - Asset URLs (icons, images)
3. Generates HTML/CSS scaffold matching the design
4. Implements interactivity (buttons, inputs) on top
5. Validates against `wcag-game-checklist` (contrast, focus, etc.)

## Design tokens → code

The most valuable Figma MCP use case for game dev. Extract once, sync many times:

```
Figma Variables → tokens.json → tokens.css/.js
```

Example workflow with agent:

```
ui-programmer: "Sync UI tokens from Figma file 'WebGame UI Library'"
[reads Figma variables: color/primary, color/danger, spacing/sm, etc.]
[generates src/ui/tokens.css with CSS custom properties]
[git diff shows updated values]
User approves → committed
```

## When NOT to auto-generate code

Figma → code via MCP can produce passable HTML/CSS for static layouts. **Don't trust it for:**

- **Game canvas content** — Figma doesn't understand canvas; output is wrong
- **Dynamic state-driven UI** — Figma is static; your code is reactive
- **Performance-critical rendering** — Figma-generated code is "first draft" quality
- **Accessibility** — Figma doesn't enforce WCAG; you must add semantics, ARIA, keyboard handlers

Use MCP for: tokens, layout reference, asset URLs, design intent. Hand-write the interactivity, semantics, and reactivity.

## Asset extraction

Figma exports as PNG/SVG/JPG. For web games:

- **Icons** → SVG (scalable, small)
- **UI background art** → PNG/WebP
- **Texture/sprite source** → PNG, post-process via `technical-artist` (atlas pack, compress)

Don't use Figma exports directly in your bundle — always go through asset pipeline. See `bundle-budget-strategy`.

## Anti-patterns

- **"Generate the whole game UI from Figma"** — produces brittle, slow, inaccessible code
- **Letting Claude write back to Figma** — keep Figma as design source of truth, code as code source of truth
- **Tokens without canonical names** — sync breaks if "primary" means different things in design vs code
- **Massive files shared with token** — Figma API has rate limits; large files = slow round-trips
- **Skipping art-director review** — generated code may not match art direction even if pixel-perfect

## Operational checklist

- [ ] Token in `.env`, scoped read-only
- [ ] Figma file URL or key documented
- [ ] Token rotation quarterly
- [ ] Token doesn't have file:write scope unless explicitly needed
- [ ] Token doesn't have organization access if not needed
- [ ] Design token naming convention agreed (Figma vs code)
- [ ] Asset pipeline applies after Figma export (don't drop raw exports into `assets/`)

## Cross-reference

- `refactoring-ui-principles` — design hierarchy that Figma should encode
- `wcag-game-checklist` — code adds accessibility Figma doesn't enforce
- `bundle-budget-strategy` — assets must fit budget regardless of source
- `view-transitions-game-ui` — code-side animation; Figma can't generate these
