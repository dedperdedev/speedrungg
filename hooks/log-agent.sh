#!/usr/bin/env bash
# Logs agent spawns for the session transcript.
set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
LOG="$ROOT/production/session-state/agent-spawns.log"
mkdir -p "$(dirname "$LOG")"
echo "[$(date -Iseconds)] agent spawn: ${AGENT_NAME:-unknown} task: ${AGENT_TASK:-unspecified}" >> "$LOG"
exit 0
