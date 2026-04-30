#!/usr/bin/env bash
# Pre-install audit — runs before any new skill/MCP-server is installed.
# Defends against supply-chain attacks (655 malicious skills found in early 2026).
#
# Triggered by: PreToolUse hook on commands matching 'install', 'add' for skills/MCP

set -euo pipefail

SUSPICIOUS_PATTERNS=(
  # Known malicious patterns
  'eval *\(.*atob\('               # base64 eval
  'curl.*\| *bash'                  # pipe-to-shell
  'wget.*\| *sh'                    # pipe-to-shell
  'process\.env\.[A-Z_]*_KEY'      # env-var exfiltration
  'rm -rf /'                        # destructive
  'crypto\.subtle.*sign.*navigator' # crypto wallet drainer
  '\.git/config.*remote'            # git creds theft
  'AKIA[0-9A-Z]{16}'               # hardcoded AWS key (looks like)
  'ghp_[a-zA-Z0-9]{36}'            # GitHub PAT
  'sk-[a-zA-Z0-9]{40,}'            # OpenAI / Anthropic API key
)

TARGET="${1:-}"
if [ -z "$TARGET" ]; then
  echo "[pre-install-audit] no target specified — skipping"
  exit 0
fi

if [ ! -e "$TARGET" ]; then
  echo "[pre-install-audit] target $TARGET not found — skipping"
  exit 0
fi

echo "[pre-install-audit] scanning $TARGET..."

# Recursively scan if directory
if [ -d "$TARGET" ]; then
  FILES=$(find "$TARGET" -type f \( -name "*.md" -o -name "*.json" -o -name "*.js" -o -name "*.mjs" -o -name "*.ts" -o -name "*.sh" \))
else
  FILES="$TARGET"
fi

VIOLATIONS=0

for f in $FILES; do
  for pattern in "${SUSPICIOUS_PATTERNS[@]}"; do
    if grep -E "$pattern" "$f" > /dev/null 2>&1; then
      echo "  ⚠ SUSPICIOUS PATTERN: '$pattern' found in $f"
      VIOLATIONS=$((VIOLATIONS + 1))
    fi
  done
done

if [ $VIOLATIONS -gt 0 ]; then
  echo ""
  echo "[pre-install-audit] FOUND $VIOLATIONS suspicious pattern(s)."
  echo "Refusing to install. Review the file(s) above before proceeding."
  echo ""
  echo "If you've reviewed and accept the risk, override with:"
  echo "  PRE_INSTALL_AUDIT_OVERRIDE=1 <your install command>"
  if [ "${PRE_INSTALL_AUDIT_OVERRIDE:-0}" != "1" ]; then
    exit 1
  fi
  echo "[pre-install-audit] override active — proceeding (logged)"
fi

echo "[pre-install-audit] ✓ no suspicious patterns found"
exit 0
