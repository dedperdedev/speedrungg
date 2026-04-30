// Fixed-timestep simulation + variable-timestep render.
// Never use setInterval. Never raw requestAnimationFrame in gameplay.

export function createGameLoop({
  simulationHz = 60,
  maxFrameMs = 250,
  onTick,
  onRender,
}) {
  const dt = 1000 / simulationHz;
  let accumulator = 0;
  let last = 0;
  let running = false;
  let rafId = 0;

  function frame(now) {
    if (!running) return;
    if (last === 0) last = now;
    let delta = now - last;
    if (delta > maxFrameMs) delta = maxFrameMs; // spiral-of-death guard
    last = now;
    accumulator += delta;
    while (accumulator >= dt) {
      onTick(dt / 1000);
      accumulator -= dt;
    }
    const alpha = accumulator / dt;
    onRender(alpha);
    rafId = requestAnimationFrame(frame);
  }

  return {
    start() {
      if (running) return;
      running = true;
      last = 0;
      rafId = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(rafId);
    },
    get running() { return running; },
  };
}
