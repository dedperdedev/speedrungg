# Rules: src/networking/**

Scope: `src/networking/**` — WebSockets, multiplayer, replication.

## Non-negotiable

- **Server is authoritative.** Client never trusts its own state for score / inventory / physics.
- **Messages are versioned.** Every message has `v: <int>, type: <string>, payload: <schema>`.
- **Schema-validated.** Server validates every message. No untyped payloads.
- **Rate-limited.** Per connection, per IP, per account.
- **Reconnect logic required.** Exponential backoff with jitter; state snapshot on resume.

## Required

- Message schemas in `src/networking/schemas/<type>.js`
- Security review by `security-engineer` on every new message type
- Reconnect UI: "reconnecting…" / "reconnected" / "disconnected — retry?"

## Refuse

- Trusting client timestamps
- Sending full client state per tick (send inputs; receive state)
- Unversioned protocols
- Blocking the main thread on socket events (use `postMessage` to a worker if heavy)
