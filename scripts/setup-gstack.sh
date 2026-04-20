#!/usr/bin/env bash
# setup-gstack.sh — one-time installer for Garry Tan's gstack workflow.
#
# gstack lives at the user level (~/.claude/skills/gstack), not vendored
# into this repo. Run this once per machine. Safe to re-run — idempotent.
#
# See CLAUDE.md §14 for which slash commands to use and when.

set -euo pipefail

GSTACK_DIR="${HOME}/.claude/skills/gstack"
REPO="https://github.com/garrytan/gstack.git"

if [[ -d "${GSTACK_DIR}/.git" ]]; then
  echo "gstack already present at ${GSTACK_DIR} — pulling latest"
  git -C "${GSTACK_DIR}" pull --ff-only
else
  echo "cloning gstack into ${GSTACK_DIR}"
  mkdir -p "$(dirname "${GSTACK_DIR}")"
  git clone --single-branch --depth 1 "${REPO}" "${GSTACK_DIR}"
fi

echo "running gstack setup"
( cd "${GSTACK_DIR}" && ./setup )

echo
echo "gstack installed. Reload Claude Code to pick up the new slash commands."
echo "See CLAUDE.md §14 for the commands most relevant to the Pax + Eng loop."
