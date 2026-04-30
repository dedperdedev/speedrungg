#!/usr/bin/env bash
# Runs at session start. Prints status and loads context.
set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
STATE="$ROOT/production/session-state/latest.md"
REVIEW_MODE="$ROOT/production/review-mode.txt"

echo "== Speedrungg — session start =="
[ -f "$REVIEW_MODE" ] && echo "Review mode: $(cat "$REVIEW_MODE")"

if [ -f "$STATE" ]; then
  echo "-- Previous session state --"
  head -30 "$STATE"
else
  echo "No previous session state. First run?"
  mkdir -p "$(dirname "$STATE")"
  echo "# Session state" > "$STATE"
fi
exit 0
