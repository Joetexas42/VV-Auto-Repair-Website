#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push

if [ -n "$GITHUB_TOKEN_1" ]; then
  GITHUB_URL="https://x-access-token:${GITHUB_TOKEN_1}@github.com/Joetexas42/VV-Auto-Repair-Website.git"
  if git remote get-url origin &>/dev/null; then
    git remote set-url origin "$GITHUB_URL"
  else
    git remote add origin "$GITHUB_URL"
  fi
  git push --force origin HEAD:main
else
  echo "GITHUB_TOKEN_1 is not set — skipping GitHub push"
fi
