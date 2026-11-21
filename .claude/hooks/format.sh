#!/bin/sh
# Format the file Claude just edited. Reads the hook payload on stdin; never fails the edit.
file=$(sed -n 's/.*"file_path"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n 1)
[ -n "$file" ] && [ -f "$file" ] || exit 0
case "$file" in
  *.ts|*.tsx|*.js|*.mjs|*.json|*.css|*.md) pnpm exec oxfmt "$file" >/dev/null 2>&1 ;;
esac
exit 0
