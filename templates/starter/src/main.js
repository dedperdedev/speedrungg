// src/main.js
// Bootstrap. Wires store, loop, rendering, UI, and visibility handling.
// Engine-specific rendering plugs in via src/rendering/<engine>/adapter.js.

import { createStore } from './core/store.js';
import { createRng } from './core/rng.js';
import { createClock, advanceClock } from './core/clock.js';
import { createGameLoop } from './core/game-loop.js';

// --- Initial state --------------------------------------------------------

function initialState(seed) {
  return {
    version: 1,
    paused: false,
    clock: createClock(),
    rng: createRng(seed),
    seed,
  };
}

// --- Reducer --------------------------------------------------------------

function reducer(state, event) {
  switch (event.type) {
    case 'GAME_INIT':
      return initialState(event.payload.seed);
    case 'GAME_PAUSE':
      return state.paused ? state : { ...state, paused: true };
    case 'GAME_RESUME':
      return !state.paused ? state : { ...state, paused: false };
    case 'TICK':
      if (state.paused) return state;
      return { ...state, clock: advanceClock(state.clock, event.payload.dt) };
    default:
      return state;
  }
}

// --- Boot -----------------------------------------------------------------

const canvas = document.getElementById('game');
const loadingEl = document.getElementById('loading');

const store = createStore(initialState(Math.floor(Math.random() * 2 ** 32)), reducer);

// Visibility API — pause on hide, resume on show.
document.addEventListener('visibilitychange', () => {
  if (document.hidden) store.dispatch({ type: 'GAME_PAUSE', payload: { reason: 'visibility' } });
  else store.dispatch({ type: 'GAME_RESUME', payload: { reason: 'visibility' } });
});

// Rendering adapter will be injected by the engine specialist after /setup-engine.
// For now, a placeholder that draws "engine not set up yet".
function renderPlaceholder() {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = '#0b0b0f';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#e8e8f0';
  ctx.font = '16px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Speedrungg starter', width / 2, height / 2 - 10);
  ctx.fillStyle = '#888';
  ctx.font = '13px system-ui, sans-serif';
  ctx.fillText('Run /setup-engine <name> to install a rendering engine.', width / 2, height / 2 + 14);
}

const loop = createGameLoop({
  simulationHz: 60,
  maxFrameMs: 250,
  onTick: (dt) => store.dispatch({ type: 'TICK', payload: { dt } }),
  onRender: () => renderPlaceholder(),
});

loop.start();
loadingEl.remove();

// Expose ONE well-known entry point for debugging.
// Path rules forbid arbitrary globals — this is the single exception.
window.__game = { store, loop };
