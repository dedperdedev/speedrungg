#!/usr/bin/env bash
# SubagentStop summary — captures what each subagent accomplished + any blockers.
# Helps the orchestrator (and the user) understand what happened in delegated work.
#
# Triggered by: SubagentStop event

set -euo pipefail

PROJECT_ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
LOG_DIR="$PROJECT_ROOT/production/session-state/subagents"
mkdir -p "$LOG_DIR"

AGENT_NAME="${CLAUDE_SUBAGENT_NAME:-unknown}"
TIMESTAMP=$(date -Iseconds)
DURATION_MS="${CLAUDE_TOOL_DURATION_MS:-0}"

LOG_FILE="$LOG_DIR/$(date +%Y-%m-%d).jsonl"

# Append a line to today's log file
cat >> "$LOG_FILE" <<EOF
{"timestamp":"$TIMESTAMP","agent":"$AGENT_NAME","duration_ms":$DURATION_MS,"status":"completed"}
EOF

echo "[subagent-stop] $AGENT_NAME completed in ${DURATION_MS}ms (logged to $LOG_FILE)"

exit 0
