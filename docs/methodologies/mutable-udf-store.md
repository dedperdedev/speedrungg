# Mutable UDF Store + Event Log

Single store. All state. All mutations through events. Event log enables replay, time-travel, multiplayer lockstep.

## The shape

```
        ┌─────────────────────────────────────┐
        │  state (one mutable root object)    │
        └──────────┬──────────────────────────┘
                   │ read
                   ▼
        ┌──────────────────────────┐
        │  systems / renderers / UI │
        └──────────────────────────┘
                   │ dispatch(event)
                   ▼
        ┌──────────────────────────┐
        │  reducer(state, event)   │
        └──────────────────────────┘
                   │ logs event
                   ▼
        ┌──────────────────────────┐
        │  event log (ring buffer) │
        └──────────────────────────┘
```

## Rules

1. **One store per game.** No parallel state in classes, globals, singletons.
2. **All state in store.** If it's not in store, it's not state — it's local UI cache or render.
3. **All mutations via dispatch.** No direct writes. No `state.player.x = 5`.
4. **Reducers are pure.** `(state, event) → state`. No I/O. No side effects.
5. **Events are plain objects.** `{ type: string, payload: ... }`. Serializable.
6. **No async reducers.** Async work happens outside; dispatches event with result.
7. **State is JSON-serializable.** Round-trippable. No DOM nodes, no Phaser objects.

## Why "mutable UDF" not Redux/Immer

- Web-game performance: copying a 10k-entity world per frame = GC death
- Mutate the state object internally; immutability comes from reducer discipline
- Subscribe pattern fires when state changes; subscribers diff what they care about

## Event log uses

- **Replay** — record events, replay produces identical state (with seeded RNG)
- **Save** — serialize state OR last N events from a checkpoint
- **Multiplayer lockstep** — all clients receive same events in same order
- **Debug** — scrub through events to find when bug appeared
- **Analytics** — funnel events flow naturally from existing event log

## Anti-patterns

- "Quick singleton" for music/audio state (separate from store) — now multiplayer can't sync
- Mutation in render code (`if (state.score > x) state.score = x`) — state corruption
- Async actions that "eventually update state" (Redux thunks) — non-deterministic
- Storing references to engine objects (Phaser sprites, Three meshes) in state — breaks serialization

## Worked example — bad → good

### Bad
```js
class Player {
  constructor() {
    this.x = 0;
    this.hp = 100;
  }
  takeDamage(n) {
    this.hp -= n;
    audioManager.play('hit');  // side effect inside class
    if (this.hp <= 0) gameOverScene.start();  // direct mutation
  }
}
```

### Good
```js
// gameplay/damage.js (pure reducer)
function applyDamage(state, event) {
  if (event.type !== 'DAMAGE_DEALT') return state;
  const newHp = state.player.hp - event.payload.amount;
  return {
    ...state,
    player: { ...state.player, hp: newHp },
    flags: { ...state.flags, gameOver: newHp <= 0 ? true : state.flags.gameOver },
  };
}

// effects/audio.js (subscribed, not in reducer)
store.subscribe((state, event) => {
  if (event?.type === 'DAMAGE_DEALT') audio.play('hit');
});
```

Note: audio plays from the **event observation**, not from the reducer. Reducer stays pure.
