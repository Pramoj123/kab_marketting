#!/usr/bin/env bash
# Runs a node script with the Node version pinned in .nvmrc, so hooks work in
# non-interactive shells. Usage: run.sh <script.mjs> [args...]. stdin is passed through.
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$project_root"

if [ -n "${NVM_DIR:-}" ] && [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$NVM_DIR/nvm.sh" >/dev/null 2>&1
  nvm use >/dev/null 2>&1 || true
fi

exec node "$@"
