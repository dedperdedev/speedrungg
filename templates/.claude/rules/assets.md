# Rules: assets/**

## Naming

- **kebab-case.** `player-idle.png`, not `PlayerIdle.png` or `player_idle.png`
- Hierarchical folders: `assets/sprites/enemies/`, `assets/audio/sfx/ui/`
- No spaces. No capitals. No non-ASCII.

## Sizes (soft caps — warn; hard caps — block)

| Type | Warn | Block |
| --- | --- | --- |
| Single sprite | 500 KB | 2 MB |
| Atlas | 2 MB | 4 MB |
| Audio clip | 2 MB | 5 MB |
| JSON data | 100 KB | 1 MB |

Going over: use atlas packing (sprites) or streaming (audio).

## Formats

- Sprites: PNG (pixel art), WebP (photo-like). SVG for UI vectors.
- Audio: OGG + MP3 fallback. Max 44.1 kHz / 192 kbps.
- Data: JSON (not YAML, not TOML — keep it one format).
- Shaders: GLSL for WebGL, WGSL for WebGPU.

## Required

- Atlas metadata JSON next to every atlas PNG
- Shader files comment every uniform

## Refuse

- Uppercase filenames
- Spaces in filenames
- PSDs / AIs / large source files (archive elsewhere)
- Raw WAV in production bundle
