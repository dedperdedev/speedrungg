---
name: web-audio-procedural
description: "Use when implementing SFX procedurally with Web Audio API — blip/coin/jump/boom recipes, iOS audio unlock, ZzFX option. Skip when the work is recorded-audio mixing or music composition (defer to dynamic-music-systems) or DSP on the audio thread (defer to audio-worklet-modern)."
---

# Web Audio — Procedural SFX Patterns

Generating sound in code. Zero file size, infinite variation, perfect for arcade/retro/jam games.

## Core building blocks (Web Audio API)

```js
const ctx = new AudioContext();

// 1. Oscillators (tones)
const osc = ctx.createOscillator();
osc.type = 'square';        // sine | square | sawtooth | triangle
osc.frequency.value = 440;
osc.connect(ctx.destination);
osc.start();
osc.stop(ctx.currentTime + 0.1);

// 2. Noise (percussion, explosions)
const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
const data = buffer.getChannelData(0);
for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

// 3. Envelopes (shape over time)
const gain = ctx.createGain();
gain.gain.setValueAtTime(0, ctx.currentTime);
gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);  // attack
gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);  // decay
```

## Waveform vocabulary

| Wave | Sound character | Use for |
|---|---|---|
| `sine` | Soft, pure | UI confirm, menu beeps |
| `triangle` | Mellow, pleasant | Lead tones, melodic SFX |
| `square` | Retro, aggressive | 8-bit/16-bit effects |
| `sawtooth` | Gritty, brassy | Power-ups, alarms |
| White noise | Hiss | Wind, percussion attack |
| Filtered noise | Tonal | Hi-hats (highpass), rain (lowpass+reverb) |

## ADSR envelope template

```js
function adsr(gain, ctx, { a = 0.01, d = 0.1, s = 0.3, r = 0.2, peak = 0.3 }) {
  const t = ctx.currentTime;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(peak, t + a);                  // attack
  gain.gain.linearRampToValueAtTime(peak * s, t + a + d);          // decay to sustain
  return () => {
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + r); // release
  };
}
```

A = attack (rise). D = decay. S = sustain level. R = release (fall after note off).

## Recipe: blip (laser, click)

```js
function blip(freq = 440, durationMs = 80) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + durationMs / 1000);
  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + durationMs / 1000);
}
```

## Recipe: explosion / boom

```js
function boom(durationMs = 500) {
  const sampleRate = ctx.sampleRate;
  const buffer = ctx.createBuffer(1, sampleRate * durationMs / 1000, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const src = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1000, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + durationMs / 1000);
  src.buffer = buffer;
  src.connect(filter).connect(ctx.destination);
  src.start();
}
```

## Recipe: coin pickup (rising blip pair)

```js
function coin() {
  blip(988, 80);
  setTimeout(() => blip(1319, 120), 60);
}
```

## Recipe: jump (pitch sweep up)

```js
function jump() {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}
```

## Variation patterns

### Pitch variance ±5% on repeat (avoid ear fatigue)
```js
blip(freq * (1 + (Math.random() - 0.5) * 0.1), durationMs);
```

### Layering (real SFX = attack + body + tail)
```js
function impact() {
  // attack: short noise burst
  noise(50, 'highpass');
  // body: low tone
  setTimeout(() => blip(80, 100, 'sine'), 5);
  // tail: long decay reverb-like
  setTimeout(() => boom(300), 10);
}
```

### Parametric binding (sound reflects state)
```js
// pitch rises with combo
blip(220 * Math.pow(1.06, comboCount), 80);

// explosion size scales with damage
boom(Math.min(1000, 200 + damage * 10));
```

## iOS Safari unlock

Audio context starts suspended on iOS. Resume on first user gesture:

```js
let audioCtx = null;
function unlockAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  audioCtx.resume();
}
document.addEventListener('pointerdown', unlockAudio, { once: true });
document.addEventListener('keydown', unlockAudio, { once: true });
```

Without this, your game is silent on iPhone. Top reason for "audio not working" reports.

## ZzFX — micro-library option

If you want code that fits in 3 KB, [ZzFX](https://github.com/KilledByAPixel/ZzFX) is a single-function micro-synth used in many js13k entries. Single function call generates sound. No dependencies.

## When procedural vs recorded

| Game type | Procedural | Recorded |
|---|---|---|
| js13k / size-constrained | YES | NO |
| 8-bit / 16-bit retro aesthetic | YES | NO |
| Cozy / orchestral | NO | YES (or hybrid) |
| Arcade / casual | YES (SFX) + recorded music | Music |
| Cinematic / narrative | NO | YES |

Common pattern: recorded music + procedural SFX. Best of both.

## Cross-reference

`dynamic-music-systems.md` for music-specific patterns.
