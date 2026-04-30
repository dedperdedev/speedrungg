// Seeded RNG. Mulberry32 — small, fast, good enough for games.
// Use this, not Math.random(). Deterministic = replay-able = testable.

export function createRng(seed = 1) {
  let s = seed >>> 0;
  return {
    next() {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    int(min, max) {
      return min + Math.floor(this.next() * (max - min));
    },
    pick(arr) {
      return arr[Math.floor(this.next() * arr.length)];
    },
    get seed() { return s; },
  };
}
