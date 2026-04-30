---
name: gameaccessibilityguidelines
description: "Use when targeting accessibility tier (Basic/Intermediate/Advanced). Game-industry-standard 3-tier framework with selection guide by project type."
---

# Game Accessibility Guidelines — Three Tiers

Industry-standard guidelines specifically for games. Created by accessibility advocates and validated by disabled players. Three tiers — pick the highest your project can hit.

Source: gameaccessibilityguidelines.com (live document, check for updates)

## Basic — should hit 100% of these

These are easy wins. Failing any is unacceptable for a serious project.

### Visual
- [ ] Use solid backgrounds for text
- [ ] Use easily distinguishable color palette
- [ ] Don't rely on color alone

### Audio
- [ ] Provide subtitles for all important speech
- [ ] Provide separate volume controls
- [ ] Provide captions for important non-speech sound

### Input
- [ ] Allow controls to be remapped
- [ ] Ensure controls are simple and uncluttered
- [ ] Allow gameplay to be fine-tuned (sensitivity, timing)

### Motor
- [ ] Avoid simultaneous button presses
- [ ] Allow toggles for hold actions

### Cognitive
- [ ] Use simple language
- [ ] Use easy-to-read fonts
- [ ] Use a high-contrast text/background

## Intermediate — aim for 80%+

These take more design effort but seriously expand audience.

### Visual
- [ ] Provide HUD scaling
- [ ] Allow key visual elements to be customized
- [ ] Provide an option to turn off / reduce screen shake
- [ ] Avoid flickering / strobing > 3Hz

### Audio
- [ ] Allow audio cues to be replayed
- [ ] Visual indicator for off-screen audio

### Input
- [ ] Allow complex inputs to be skipped / simplified
- [ ] Support most common input devices
- [ ] Don't require complex gestures

### Motor
- [ ] Don't require precise timing
- [ ] Provide camera control options
- [ ] Allow camera sensitivity adjustment

### Cognitive
- [ ] Provide a clear introduction to game concepts
- [ ] Mark interactive objects clearly
- [ ] Allow players to skip non-interactive content
- [ ] Provide tutorials and help that can be re-accessed

## Advanced — best-in-class

These are the gold standard. Most AAA games hit some, very few hit all.

### Visual
- [ ] Allow color blindness simulation modes (protanopia, deuteranopia, tritanopia)
- [ ] Provide screen reader support for menus AND in-game HUD
- [ ] Provide audio descriptions for cutscenes
- [ ] Allow text size scaling on all UI

### Audio
- [ ] Allow ducking/balancing of audio elements
- [ ] Mono audio output option

### Input
- [ ] Allow eye-tracking, switch controls, etc.
- [ ] Provide difficulty levels affecting cognitive AND motor load
- [ ] Cooperative play option (one player handles dexterity, another handles strategy)

### Cognitive
- [ ] Adaptive difficulty
- [ ] Practice / sandbox modes
- [ ] Reading speed adjustment

## Selection guide

| Project type | Target tier |
|---|---|
| Solo / first game | Basic |
| Indie aiming for niche | Basic + selected Intermediate |
| Indie aiming wide | Intermediate |
| Funded / studio | Intermediate + selected Advanced |
| AAA / sponsored | Advanced (where mechanically possible) |

## What to ship in v1

ALWAYS:
- Subtitles
- Remappable controls
- Color contrast
- Reduced motion option
- Volume sliders (4)
- Pause anywhere

These are table stakes. Ship without them = launch with a known excluded audience.

## Cross-reference

`wcag-game-checklist.md` for the WCAG 2.1 AA mapping. Both used together.
