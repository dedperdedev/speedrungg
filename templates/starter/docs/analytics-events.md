# Analytics Events Catalog

Owned by `analytics-engineer`. Privacy-reviewed by `security-engineer`.

## Schema for every event

```
event_name
  When fired: <condition>
  Payload: { field: type, ... }
  PII?: yes/no (must be no for default events)
  Why we track it: <product question this answers>
  Owner: <product-owner / specific lead>
```

## Core events

```
game.start
  When fired: player begins a session
  Payload: { build_version: string, platform: 'desktop' | 'mobile' }
  PII: no
  Why: session count, retention denominator
  Owner: product-owner

game.end
  When fired: session ends (close, route away, win, lose, idle timeout)
  Payload: { cause: string, duration_seconds: number }
  PII: no
  Why: session length distribution
  Owner: product-owner

settings.changed
  When fired: user changes a setting
  Payload: { key: string, value_type: 'bool' | 'number' | 'enum' }
  PII: no — note: value_type, NOT value (don't log content)
  Why: which settings get touched
  Owner: ux-designer
```

Add game-specific events as features ship. Every new event needs a row above before merging.
