import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createGameLoop } from '../../src/core/game-loop.js';

// Provide a controllable raf stub
function setupRaf() {
  let nextId = 1;
  let queued = null;
  globalThis.requestAnimationFrame = (cb) => {
    queued = cb;
    return nextId++;
  };
  globalThis.cancelAnimationFrame = () => { queued = null; };
  return {
    triggerNextFrame(t) {
      const cb = queued;
      queued = null;
      if (cb) cb(t);
    },
    queued: () => queued !== null,
  };
}

test('game-loop schedules next frame via requestAnimationFrame', () => {
  const raf = setupRaf();
  const loop = createGameLoop({
    simulationHz: 60,
    onTick: () => {},
    onRender: () => {},
  });

  loop.start();
  assert.ok(raf.queued(), 'should schedule first frame on start');
  loop.stop();
});

test('game-loop calls onTick at fixed timestep', () => {
  const raf = setupRaf();
  let tickCount = 0;
  const loop = createGameLoop({
    simulationHz: 60,
    onTick: () => { tickCount += 1; },
    onRender: () => {},
  });

  loop.start();
  raf.triggerNextFrame(1000); // first frame; last gets set to 1000
  raf.triggerNextFrame(1100); // 100ms later
  loop.stop();

  // 100ms / (1000/60) ≈ 6 ticks expected
  assert.ok(tickCount >= 5 && tickCount <= 7, `expected ~6 ticks, got ${tickCount}`);
});

test('game-loop survives spiral-of-death by clamping max frame', () => {
  const raf = setupRaf();
  let tickCount = 0;
  const loop = createGameLoop({
    simulationHz: 60,
    maxFrameMs: 250,
    onTick: () => { tickCount += 1; },
    onRender: () => {},
  });

  loop.start();
  raf.triggerNextFrame(1000);
  raf.triggerNextFrame(11000); // 10s delta — should be clamped to 250ms
  loop.stop();

  // 250ms / (1000/60) = ~15 ticks max
  assert.ok(tickCount <= 16, `expected ≤ 16 ticks (clamped), got ${tickCount}`);
});

test('game-loop running flag tracks state', () => {
  setupRaf();
  const loop = createGameLoop({
    simulationHz: 60,
    onTick: () => {},
    onRender: () => {},
  });

  assert.equal(loop.running, false, 'initially not running');
  loop.start();
  assert.equal(loop.running, true, 'running after start');
  loop.stop();
  assert.equal(loop.running, false, 'not running after stop');
});
