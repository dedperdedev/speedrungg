---
name: object-pooling
description: "Use when allocation in tight loops causes GC pauses (bullets, particles, damage numbers). Pooling pattern with common bugs and web-game specifics."
---

# Object Pooling — Web Game Specific

Allocation in tight loops = GC pauses = jank. Pool everything that's created/destroyed at runtime.

## What to pool

| Object type | Pool? | Why |
|---|---|---|
| Bullets / projectiles | YES | Hundreds spawned/despawned/sec |
| Particles | YES | Even more |
| Damage numbers | YES | Spawn on hits |
| Enemies | Sometimes | If respawn rate is high |
| Sound effect instances | YES | iOS especially |
| Vector / point objects in math | Sometimes | Profile first |
| Event objects | Rarely | Modern V8 handles these well |

## What NOT to pool

- One-off objects (player, world)
- Large objects with complex lifecycle
- Anything you're tempted to pool "just in case" — measure first

## Basic pattern

```js
class Pool {
  constructor(factory, reset, initialSize = 32) {
    this.factory = factory;     // create new instance
    this.reset = reset;          // reset state for reuse
    this.available = [];
    for (let i = 0; i < initialSize; i++) {
      this.available.push(this.factory());
    }
  }

  acquire() {
    return this.available.pop() || this.factory();
  }

  release(obj) {
    this.reset(obj);
    this.available.push(obj);
  }
}

// Usage
const bulletPool = new Pool(
  () => ({ x: 0, y: 0, vx: 0, vy: 0, alive: false }),
  (b) => { b.x = 0; b.y = 0; b.vx = 0; b.vy = 0; b.alive = false; }
);

const bullet = bulletPool.acquire();
bullet.x = player.x;
// ... use bullet
bulletPool.release(bullet);
```

## Common bugs

### Forgot to reset
Pool returns object with stale state. Symptom: ghost bullets, wrong colors.

**Fix:** always reset on release, OR on acquire. Pick one, do it.

### Holding references
External code holds reference to pooled object. After release, that reference points to a "different" object now.

**Fix:** release immediately after use; never store pooled objects in long-lived structures.

### Pool grows unbounded
Spawning faster than releasing → pool fills with allocated objects.

**Fix:** cap pool size, drop oldest, or fix the upstream rate.

## Web-specific notes

- **Use `Float32Array` for vector pools** — typed arrays are GC-friendly
- **Don't pool DOM elements** in web games — DOM has its own lifecycle, browsers handle it
- **For Phaser/Pixi** — they have their own pooling utilities; use those instead of rolling your own
- **Profile in Chrome Performance tab** — look for "GC" yellow bars during gameplay; if you see them, pool more

## When to start pooling

NOT premature. Profile first. Add pools when:
- Performance budget shows GC pauses
- You're creating > 100 objects/sec of the same type
- You see stuttering correlated with object spawn

Otherwise, modern V8 is fast enough — don't pool reflexively.
