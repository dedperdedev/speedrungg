---
name: refactoring-ui-principles
description: "Use when designing UI / HUD — Wathan + Schoger principles: hierarchy via weight not size, grayscale for importance, whitespace as weapon. Skip when the work is feedback/juice polish (defer to juice-it-or-lose-it / juice-vs-clarity), menu/scene transitions (defer to view-transitions-game-ui), or design-token extraction from Figma (defer to figma-mcp-workflow)."
---

# Refactoring UI — Key Principles

Distilled from Adam Wathan and Steve Schoger's book/course. UI design rules that work even if you're not a designer.

## Hierarchy isn't size — it's everything

To create visual hierarchy, you have these tools:

- **Size** (most obvious, also overused)
- **Color contrast** (light gray for secondary, near-black for primary text)
- **Weight** (regular vs semibold vs bold)
- **Letter spacing** (tighter for headings, looser for caps)
- **Position** (above/before = more important)
- **Whitespace** (more space around = more important)

Don't reach for size first. Most amateur UIs have one big heading and identical body. Pros use 5-8 levels of subtle hierarchy.

## Use grayscale, not color, to denote importance

Color is a hue. Importance is **value** (light/dark).

- Primary text: very dark gray (almost black, but not pure)
- Secondary text: medium gray
- Disabled text: light gray
- Borders / dividers: very light gray
- Background: nearly white (or nearly black for dark theme)

This works because the eye reads importance from contrast against background. Color is for emotional accent, not hierarchy.

## Small text needs higher contrast

12px gray-500 is unreadable. 16px gray-500 is fine. Smaller text = darker required.

WCAG AA: 4.5:1 contrast for body text, 3:1 for large text. (See `wcag-game-checklist.md`.)

## Make whitespace your weapon

- Tight whitespace between related items
- Loose whitespace between groups
- Use this to imply structure without lines

A common amateur tell: lots of dividers / boxes / borders. Pros use whitespace.

## Avoid pure black, pure white, fully saturated colors

These look harsh. Use:

- "Black": `#1a1a1a` or similar
- "White": `#fafafa` or `#f5f5f5`
- Saturated colors: dial saturation back ~10–20%

Your eye knows when a color is "off"; this is why the harsh ones look amateur.

## Typography

- Pick ONE typeface family for the whole interface (or two: one display, one body)
- Use weight, size, color for variation, not multiple typefaces
- Body text: 16-18px on web (smaller = unreadable on mobile)
- Line-height: 1.5 for body, 1.2 for headings
- Line length: ~50-75 chars per line for readability

## Game-specific notes

- Game UI lives ON TOP OF varying gameplay backgrounds
- Black/white text alone won't work — you need:
  - Solid background panels (with rounded corners, slight shadow)
  - Or text shadows (subtle, not gaudy outline)
- Pixel-art games: use bitmap fonts at native resolution, no anti-aliasing
- Otherwise: system-ui font stack: `system-ui, -apple-system, sans-serif`

## Buttons hierarchy

In any context, you have:

- **Primary** action (1 max, sometimes 0): solid fill, brand color
- **Secondary** action (1-3): outline, no fill
- **Tertiary** action (n): text-only, smaller, lower contrast

If you have 3 "primary" buttons, 2 of them are wrong — demote them.

## Forms

- Labels above inputs, not floating inside
- Error messages below input, in red, with icon
- Required fields marked clearly (`*` is fine if explained)
- Disabled state: grayed out + cursor-not-allowed

## Don't design from scratch — start from a baseline

Use a design system or component library as your starting point:

- shadcn/ui (React)
- DaisyUI (Tailwind)
- Pico CSS (vanilla)

Then adjust for your game's identity. Custom-design only the elements that are gameplay-critical.

## Anti-patterns

- 5 different font families
- Pure black on pure white text
- Identical body and heading sizes
- Boxes inside boxes inside boxes
- Color hierarchy doing the work of value hierarchy
- "Friendly" rounded everything ($GROUP$ aesthetic) without taste
- Game UI floating on the canvas with no bg panel (illegible)
