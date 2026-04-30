#!/usr/bin/env bash
# Runs at session end. Reminds to update session state.
set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
STATE="$ROOT/production/session-state/latest.md"

echo "== Session end =="
if [ -f "$STATE" ]; then
  # Check mtime — if not updated in last 10 minutes, nudge
  if [ -n "$(find "$STATE" -mmin +10 2>/dev/null)" ]; then
    echo "WARN: production/session-state/latest.md not updated this session."
    echo "Project-manager should append status update."
  fi
fi
exit 0
