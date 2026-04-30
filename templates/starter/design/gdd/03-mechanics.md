# 03 — Mechanics

> Every verb the player can do. Input → effect → state change.
> If a mechanic isn't here, it doesn't exist in the game.

## Mechanic catalog

For each verb in `02-core-loop.md`:

### `<mechanic name>`

- **Input**: `<key/touch/click/etc>`
- **Pre-conditions**: <state required>
- **Effect**: <change to state>
- **Post-conditions**: <new state>
- **Feedback**: <visual/audio/haptic within 100ms>
- **Failure**: <what happens if pre-conditions not met>
- **Test**: how do we know this mechanic works as intended?

## Interaction matrix

Which mechanics combine? Which conflict?

| Mechanic A | Mechanic B | Interaction |
|---|---|---|
| | | |

## Cross-references

- `costikyan-choice-taxonomy` skill — every mechanic offers a choice; test it
- `pure-reducers` skill — mechanic effects are pure functions
- `deterministic-game-loop` skill — mechanic timing is deterministic
