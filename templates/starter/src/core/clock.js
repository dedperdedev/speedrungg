// Injectable clock. Reducers never call Date.now() or performance.now().
// They read state.clock.now, which the game loop advances.

export function createClock() {
  return { now: 0 };
}

export function advanceClock(clock, dt) {
  return { ...clock, now: clock.now + dt };
}
