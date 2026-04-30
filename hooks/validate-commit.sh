#!/usr/bin/env bash
# Pre-commit safety checks.
set -u
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

FAIL=0
STAGED=$(git -C "$ROOT" diff --cached --name-only 2>/dev/null || true)
[ -z "$STAGED" ] && exit 0

# 1. Secrets check
if git -C "$ROOT" diff --cached | grep -iE "(api[_-]?key|secret|password|token|bearer)[^a-z]*[:=]" | grep -viE "(example|placeholder|TODO|XXX|your_)"; then
  echo "BLOCKED: possible secret in staged diff."
  echo "If false positive, bypass with: git commit --no-verify"
  FAIL=1
fi

# 2. .env files
if echo "$STAGED" | grep -E "^\.env($|\..*)"; then
  echo "BLOCKED: .env file in staged changes."
  FAIL=1
fi

# 3. Node modules / build artifacts
if echo "$STAGED" | grep -E "(node_modules|dist|build|\.cache)/"; then
  echo "BLOCKED: build artifacts in staged changes. Check .gitignore."
  FAIL=1
fi

exit $FAIL
