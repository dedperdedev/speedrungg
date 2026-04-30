# Dynamic Music Systems

Music that responds to gameplay. Layered, vertical, horizontal — three classic techniques.

## Vertical (layered) re-mixing

Multiple stems play simultaneously, you fade them in/out based on game state.

```
Layer 1 (always): ambient pad
Layer 2 (combat): drums + bass
Layer 3 (boss):   orchestral hits
Layer 4 (low HP): tense strings
```

When combat starts, fade in Layer 2. When boss appears, fade in Layer 3. When player is dying, fade in Layer 4.

```js
// Web Audio implementation
const layers = {
  ambient: { source: null, gain: null, target: 1 },
  combat:  { source: null, gain: null, target: 0 },
  boss:    { source: null, gain: null, target: 0 },
  tension: { source: null, gain: null, target: 0 },
};

// On state change:
layers.combat.target = state.inCombat ? 1 : 0;

// In tick:
for (const [name, layer] of Object.entries(layers)) {
  const current = layer.gain.gain.value;
  const target = layer.target;
  if (Math.abs(current - target) > 0.01) {
    layer.gain.gain.linearRampToValueAtTime(target, ctx.currentTime + 0.5);
  }
}
```

**Pros:** smooth, no music interruption, expressive.
**Cons:** authoring is 4x the work; mixing must be perfect.

## Horizontal (state machine) sequencing

Different tracks play depending on state. Transitions handled at musical boundaries.

```
Idle → Combat → Victory or Defeat
       ↓
       Boss → ...
```

Each transition crossfades, OR waits for the next bar / phrase, then jumps.

**Pros:** simple to author (separate tracks).
**Cons:** transitions feel less organic; jumps audible if not handled at musical boundaries.

## Stinger insertion

A short musical "stinger" plays over (or briefly replaces) the main track on key events: enemy spawned, item picked up, level cleared.

```js
function playStinger(stingerName) {
  const stinger = stingers[stingerName];
  // Duck main music briefly
  mainGain.gain.setValueAtTime(mainGain.gain.value, ctx.currentTime);
  mainGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
  mainGain.gain.linearRampToValueAtTime(1, ctx.currentTime + stinger.duration);

  // Play stinger
  stinger.play();
}
```

**Pros:** punchy, cinematic.
**Cons:** can feel obtrusive; pace carefully.

## Adaptive tempo / pitch

Game state drives playback rate, pitch, or filter on the music.

- Player low HP → music slows + lowpass filter (muffled)
- Combo building → music gets brighter (highpass / EQ tilt)
- Time slowdown → playback rate halves

Powerful but requires authoring the music with this in mind.

## Loop construction

For seamless loops:

- Compose with a DAW that shows seamless boundaries
- Test the loop point — fade out the original music's end, crossfade into start
- 30-60 second loops feel natural; < 30 = repetitive; > 90 = bandwidth heavy

## Web Audio implementation tips

- Decode audio off the main thread: `decodeAudioData` is async
- For seamless loops: use AudioBufferSourceNode with `loop = true`
- Schedule transitions ahead with `ctx.currentTime + offset`, not setTimeout (precise)
- For multi-layer: connect each layer's GainNode to a master GainNode

## Music budget

Game music is the heaviest single asset class:

- 3 minutes stereo OGG @ 192kbps: ~4 MB
- For web games, that's a lot

Strategies:
- Stream via `<audio>` tag (browser handles streaming)
- Or chunk: load intro first, stream rest while game starts
- Lower bitrate for ambient, higher for prominent music
- Mono where appropriate (UI, retro)

## Cross-reference

`web-audio-procedural.md` for SFX. `bundle-budget-strategy.md` for asset loading patterns.
