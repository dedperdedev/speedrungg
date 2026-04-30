---
name: audio-worklet-modern
description: "Use when ScriptProcessorNode would have been the answer (deprecated). AudioWorklet patterns + Wasm Audio Worklet for high-perf DSP."
---

# AudioWorklet — Modern Web Audio Processing

The `ScriptProcessorNode` has been deprecated for years; production-grade web audio in 2026 uses `AudioWorklet`. For high-performance / DSP-heavy game audio, **WebAssembly Audio Worklets** (Emscripten) bring near-native DSP performance with no GC pauses. Babylon 8's new audio engine is built on this foundation.

## What's deprecated

`ScriptProcessorNode`:
- Runs on main thread (audio glitches when game is busy)
- High latency (buffer-size-dependent)
- Officially deprecated in spec since 2017; functional but discouraged
- Browsers may remove in future

**Don't use ScriptProcessorNode in new code.**

## What replaces it

### AudioWorklet (audio thread)

Runs on a dedicated audio rendering thread — isolated from main thread game loop. No GC competing with audio. Perfect for:

- Procedural SFX synthesis at game loop pace
- Real-time pitch / time / filter modulation
- Spatial audio with custom HRTF
- Reactive music systems (see `dynamic-music-systems.md`)

```javascript
// audio-thread/sfx-processor.js (separate module)
class SFXProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      { name: 'pitch', defaultValue: 1.0, automationRate: 'a-rate' },
    ];
  }

  process(inputs, outputs, parameters) {
    const output = outputs[0];
    for (let channel = 0; channel < output.length; channel++) {
      const out = output[channel];
      const pitchParam = parameters.pitch;
      for (let i = 0; i < out.length; i++) {
        const pitch = pitchParam.length > 1 ? pitchParam[i] : pitchParam[0];
        // Synthesize sample here
        out[i] = Math.sin(this.phase) * 0.3;
        this.phase += pitch * 0.01;
      }
    }
    return true;  // keep alive
  }
}
registerProcessor('sfx-processor', SFXProcessor);
```

```javascript
// main thread
await audioCtx.audioWorklet.addModule('audio-thread/sfx-processor.js');
const sfxNode = new AudioWorkletNode(audioCtx, 'sfx-processor');
sfxNode.connect(audioCtx.destination);
sfxNode.parameters.get('pitch').value = 2.0;
```

## When to use AudioWorklet vs Web Audio nodes

### Built-in Web Audio nodes (OscillatorNode, GainNode, BiquadFilterNode, etc.)
- For most game SFX recipes from `web-audio-procedural.md`
- Lower complexity, browser-optimized
- **Default for blip / coin / boom / jump recipes**

### AudioWorklet
- Custom DSP that built-ins can't express
- Long-running audio sources (procedural music, generative sound)
- Complex modulation chains
- Spatial / HRTF audio
- When ScriptProcessorNode would have been the answer

### WebAssembly Audio Worklet (Wasm Audio Worklet, via Emscripten)
- Near-native DSP performance
- Use when: porting existing C/C++ audio code; running heavy SDP per sample (FM synthesis, physical modeling)
- Babylon 8's new audio engine path

## iOS audio unlock (still required)

AudioWorklet doesn't change iOS Safari's gesture-required audio context. Still must unlock on first user interaction:

```javascript
let audioCtx = null;
function unlockAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audioCtx.resume().then(() => {
    // After unlock, AudioWorklet is available
    audioCtx.audioWorklet.addModule('...');
  });
}
document.addEventListener('pointerdown', unlockAudio, { once: true });
document.addEventListener('keydown', unlockAudio, { once: true });
```

See `web-audio-procedural.md` for the broader iOS unlock pattern.

## Communication with main thread

AudioWorklet runs in isolated thread — pass data via:

### AudioParam (continuous values, sample-accurate)
```javascript
sfxNode.parameters.get('pitch').setValueAtTime(2.0, audioCtx.currentTime + 0.5);
```

### MessagePort (one-shot events)
```javascript
sfxNode.port.postMessage({ type: 'play', sound: 'coin' });

// In processor:
this.port.onmessage = (e) => {
  if (e.data.type === 'play') this.triggerSound(e.data.sound);
};
```

Don't try to mutate processor state from main thread directly; use messages.

## Migration recipe (if you have ScriptProcessorNode code)

1. Move processor logic into a class extending `AudioWorkletProcessor`
2. Move static config to `parameterDescriptors`
3. Replace event-callback `onaudioprocess` with `process(inputs, outputs, parameters)`
4. Replace direct property mutation with `port.postMessage`
5. Load via `audioWorklet.addModule()` instead of `createScriptProcessor()`
6. Connect like any other AudioNode

## Performance notes

- **AudioWorklet processor runs every 128-sample block** at sample rate (typically 48000 Hz → ~370 calls/sec)
- **Each `process()` call must be < ~2.6ms** (128 samples / 48000 Hz) or you get audio glitches
- **No allocation in `process()`** — pre-allocate buffers in constructor; pool reusable objects
- **No imports / DOM access** in worklet thread

## Wasm Audio Worklet (Emscripten)

For C/C++ audio code (e.g., porting an existing synth library, FAUST output):

```bash
emcc audio_synth.c -o audio_synth.js \
  -sAUDIO_WORKLET=1 \
  -sWASM_WORKERS=1 \
  -O3
```

Then load the generated module in your AudioWorklet processor. See Emscripten docs for full pattern.

For most indie web games, this is overkill — the built-in Web Audio nodes + a thin AudioWorklet for custom DSP is plenty.

## Honest cautions

- **AudioWorklet is more complex than ScriptProcessorNode** — the threading model trips people up
- **Debugging is harder** — `console.log` in worklet thread works but DevTools breakpoints need extra setup
- **Browser support is good** but feature-detect for old browsers; provide ScriptProcessorNode fallback only if you must support 2018-era Safari

## Cross-reference

- `web-audio-procedural.md` — for SFX recipes that mostly don't need AudioWorklet
- `dynamic-music-systems.md` — reactive music often benefits from AudioWorklet
- `bundle-budget-strategy.md` — Wasm Audio Worklet adds bundle weight
- `rail-model.md` — audio thread is separate; doesn't compete with frame budget

## Sources

- developer.mozilla.org/en-US/docs/Web/API/AudioWorklet
- emscripten.org/docs/api_reference/wasm_audio_worklets.html
- doc.babylonjs.com — Babylon 8 audio engine
- web.dev/articles/audio-worklet — Google introductory guide
