# Event catalog

Every event dispatched to the store is documented here.

## Format

```
TYPE_NAME
  Payload: { field: type, ... }
  Fired when: <condition>
  Effect: <what changes in state>
```

## Core events

```
GAME_INIT
  Payload: { seed: number }
  Fired when: game starts
  Effect: initializes state, seeds RNG

GAME_PAUSE
  Payload: { reason: 'user' | 'visibility' | 'focus' }
  Fired when: user pauses, tab hidden, window blurred
  Effect: state.paused = true

GAME_RESUME
  Payload: { reason: ... }
  Fired when: user resumes, tab visible, window focused
  Effect: state.paused = false

TICK
  Payload: { dt: number }   // seconds
  Fired when: simulation advances one step
  Effect: state.clock.now += dt
```

Add game-specific events below as they're introduced.
