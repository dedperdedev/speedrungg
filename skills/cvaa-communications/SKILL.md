---
name: cvaa-communications
description: "Use when implementing chat features (text/voice/video). CVAA US compliance: visual indicators, mute/block, captions, FCC 2025 guidance."
---

# CVAA — Communications in Video Games

The 21st Century Communications and Video Accessibility Act (US, 2010) requires accessible communication in interactive products. The FCC updated its guidance specifically for video games in **April 2025**. Applies to any web game offering Advanced Communication Services (ACS) — text, voice, or video chat — to US users.

## What ACS means in this context

- **Text chat** — in-game messaging, lobby chat, party chat
- **Voice chat** — VoIP within the game
- **Video chat** — rare in games; same rules apply
- **Email-like communication** — mail systems, message boards

## What CVAA requires

For each ACS feature your game offers, you must provide:

### Text alternatives for voice
If you have voice chat → must offer text alternative. The reverse is also encouraged but less strict.

### Captions for any spoken content
- In-game spoken dialog
- Voice chat from other players (if technically feasible — open-mic chat is hard, but pre-recorded voice lines can be captioned)
- Cutscenes with audio

### Volume controls per category
- Voice chat volume independent of music/SFX
- Master mute distinct from voice mute

### Visual indicators of audio
- Speaker indicator showing who's currently talking
- Visual notification when voice chat starts/stops

### Compatibility with assistive tech
- Game UI works with screen readers (see `screen-reader-game-patterns.md`)
- Keyboard navigation throughout chat features
- Compatible with hearing aids / cochlear implant audio profiles

### Mute / block functionality
- Easy to mute individual players
- Easy to block (no further communication)
- Visible UI affordance

## Who's exempt

- **Games with no chat** — entirely out of scope
- **Pre-launch / beta** — limited scope; full requirements at GA
- **Customizable products where accessibility was offered as setup option** — narrow exception

The FCC has discretion. Don't bet on exemption; design accessibly.

## Practical implementation

For a typical web game with chat:

```
Game UI
├── Voice chat
│   ├── Push-to-talk option (configurable hotkey)
│   ├── Voice volume slider (independent)
│   ├── Speaker indicator (visual: who's talking)
│   └── Mute / block per player (always visible affordance)
├── Text chat
│   ├── Type with keyboard
│   ├── Resizable text
│   ├── Color blind safe (don't rely on red/green)
│   └── Mute / block per player
└── Settings
    ├── Audio profile (mono / stereo / hearing aid optimized)
    ├── Subtitles for in-game audio
    └── Visual indicators toggles
```

## US enforcement

CVAA complaints go to the FCC Disability Rights Office. Penalties for violations can reach $100K+. Indie devs are rarely the target of high-profile enforcement, but:

- US distribution of any game with chat technically triggers CVAA
- Larger-scale games or those with school/government deployment face higher scrutiny
- "We didn't know" is not a defense

## Honest cautions

- **CVAA enforcement against indie web games has been minimal historically**, but the 2025 FCC guidance update suggests increased attention. Don't assume past patterns continue.
- **Most CVAA requirements are also good UX** — visual speaker indicators, mute buttons, text chat alongside voice are standard expectations. You're probably doing most of this anyway.
- **CVAA is US-specific**; EAA (`eaa-baseline.md`) covers similar ground for EU. Build accessibility once; satisfy multiple regimes.

## Operational checklist

For any web game with chat features:

- [ ] Voice chat has visible speaker indicator
- [ ] Voice volume independent slider
- [ ] Text chat available alongside voice
- [ ] Text chat resizable
- [ ] Mute per-player UI affordance
- [ ] Block per-player UI affordance
- [ ] Captions for in-game spoken content
- [ ] Mono audio output option
- [ ] Hearing aid compatibility (avoid frequencies cochlear implants struggle with — high-pitched UI sounds especially)
- [ ] Settings persist across sessions
- [ ] Tested with screen reader (NVDA + VoiceOver minimum)

## Sources

- 21st Century Communications and Video Accessibility Act (Public Law 111-260, 2010)
- FCC video games accessibility guidance, updated 22 April 2025 (fcc.gov/consumers/guides/accessibility-communications-video-games)
- ACS definitions: 47 U.S.C. § 153

## Cross-reference

- `wcag-game-checklist.md` — broader accessibility WCAG mapping
- `gameaccessibilityguidelines.md` — game-specific tier system
- `screen-reader-game-patterns.md` — UI screen reader support
- `eaa-baseline.md` — EU equivalent for chat features (covered under EAA's communications scope)
