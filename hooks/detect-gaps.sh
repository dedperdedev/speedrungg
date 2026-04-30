#!/usr/bin/env bash
# Checks for missing critical files and reports gaps.
set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
GAPS=()

[ -f "$ROOT/design/vision/pillars.md" ]        || GAPS+=("design/vision/pillars.md missing — creative-director")
[ -f "$ROOT/design/gdd/01-vision.md" ]         || GAPS+=("design/gdd/01-vision.md missing — game-designer")
[ -f "$ROOT/production/budgets.md" ]           || GAPS+=("production/budgets.md missing — technical-director")
[ -f "$ROOT/production/backlog.md" ]           || GAPS+=("production/backlog.md missing — product-owner")
[ -f "$ROOT/docs/security.md" ]                || GAPS+=("docs/security.md missing — security-engineer")

if [ ${#GAPS[@]} -gt 0 ]; then
  echo "== Project gaps =="
  for g in "${GAPS[@]}"; do echo "  - $g"; done
  echo "These aren't errors — they're hints about what to work on."
fi
exit 0
