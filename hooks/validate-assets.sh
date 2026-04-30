#!/usr/bin/env bash
# Validates assets before write — size, format, naming.
set -u
FILE="${1:-}"
[ -z "$FILE" ] && exit 0

case "$FILE" in
  *.png|*.jpg|*.jpeg|*.webp)
    # Size soft-cap 500KB (hard rejection at 2MB)
    if [ -f "$FILE" ]; then
      SIZE=$(wc -c < "$FILE")
      if [ "$SIZE" -gt 2097152 ]; then
        echo "BLOCKED: $FILE is over 2MB. Compress or use an atlas."
        exit 1
      elif [ "$SIZE" -gt 512000 ]; then
        echo "WARN: $FILE is over 500KB. Consider compression."
      fi
    fi
    ;;
  *.mp3|*.ogg|*.wav)
    if [ -f "$FILE" ] && [ "$(wc -c < "$FILE")" -gt 5242880 ]; then
      echo "WARN: $FILE is over 5MB. Stream or compress."
    fi
    ;;
esac

# Naming — kebab-case in assets/
BASENAME=$(basename "$FILE")
if echo "$BASENAME" | grep -qE "[A-Z_ ]"; then
  echo "WARN: $BASENAME — prefer kebab-case for asset filenames."
fi
exit 0
