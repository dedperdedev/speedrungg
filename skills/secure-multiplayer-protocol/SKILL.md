---
name: secure-multiplayer-protocol
description: "Use when designing multiplayer or leaderboard protocols. Server-authoritative, schema validation, rate limiting, replay verification."
---

# Secure Multiplayer Protocol Design

For any web game with multiplayer, even leaderboards. Client is hostile until proven otherwise.

## First principles

1. **Server is source of truth.** Always.
2. **Client sends INPUTS, server sends STATE.** Not the reverse.
3. **Every message versioned, validated, rate-limited.**
4. **No client-side trust for anything that affects other players or revenue.**

## Message schema

Every message:

```json
{
  "v": 1,           // protocol version
  "type": "INPUT",  // event type from a fixed enum
  "tick": 1234,     // simulation tick (for ordering)
  "payload": {...}  // type-specific, schema-validated
}
```

Server:

- Reject unknown `v` (graceful: send `UPGRADE_REQUIRED` event)
- Reject unknown `type`
- Validate payload against schema for `type`
- Validate `tick` is within tolerance of current server tick

## Versioning strategy

When you change the protocol:

- Bump `v`
- Server supports current and prev for grace period (e.g., 30 days)
- Old clients get `UPGRADE_REQUIRED`
- New clients reject `v < current`

Never break old clients without warning. Never rely on client to be on latest.

## Authority model

```
Client:
  - Read input
  - Send input (with prediction for responsiveness)
  - Receive authoritative state
  - Reconcile prediction with authority
  - Render

Server:
  - Receive input
  - Validate (rate, schema, plausibility)
  - Apply to authoritative simulation
  - Send state to clients
```

For real-time games: client predicts immediately for responsiveness, but server's word is final. When server contradicts prediction → reconcile (rewind, replay).

For turn-based: no prediction needed. Send input, await authoritative state.

## Validation depth

| Layer | What it catches |
|---|---|
| Schema | Wrong types, missing fields |
| Range | Negative scores, impossible values |
| Plausibility | "Player teleported across the map in 1 tick" |
| Cross-state | "Player used ability they don't have" |

All four required for hostile-client environment.

## Rate limiting

Per connection:
- N messages/second cap
- Burst tolerance
- Disconnect after threshold

Per IP:
- N connections per IP
- N new connections / min

Per account:
- N actions of certain types per minute (chat, trade, score submit)

## Security: cheat-proof leaderboards

For "submit your score" web games:

### Bad (trust client)
```
Client → server: { score: 99999 }
Server: leaderboard.add(99999)
```

### Better (validation)
```
Client → server: { score: 1234, sessionToken: "..." }
Server: validate session, plausibility-check score, rate-limit
```

### Best (replay verification)
```
Client → server: { events: [...], seed: 42, finalScore: 1234 }
Server: replay events with seed → verify final state matches → accept
```

The third needs deterministic core (see `deterministic-game-loop.md` and `pure-reducers.md`).

## Reconnect logic

- Detect disconnect (ping timeout)
- Pause local sim, show "reconnecting..."
- Exponential backoff with jitter
- On reconnect: request state snapshot from server
- Resume

## Anti-patterns

- "Encrypting" client messages with a key in the client (it's not encryption, just obfuscation)
- Trusting client timestamps
- Client-only physics for multiplayer (everyone disagrees on what happened)
- Logging full message content with PII
- Sending state from client to server "to sync" (server has authority, no need)

## Cross-reference

`owasp-top-10-for-games.md` for broader threat model. `deterministic-game-loop.md` for replay verification basis.
