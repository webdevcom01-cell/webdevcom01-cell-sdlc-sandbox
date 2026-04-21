#!/bin/sh
TASK='dashboard-card'
RUN='8d4a3e7c'
BRANCH="sdlc/$TASK-$RUN"
REPO='webdevcom01-cell/webdevcom01-cell-sdlc-sandbox'
TOKEN="$GITHUB_TOKEN"

if ! command -v curl > /dev/null 2>&1; then
  echo '{"success":false,"error":"curl not available","branch":"'$BRANCH'"}'
  exit 0
fi

if [ -z "$TOKEN" ]; then
  echo '{"success":false,"error":"GITHUB_TOKEN not set","branch":"'$BRANCH'","manualUrl":"https://github.com/webdevcom01-cell/webdevcom01-cell-sdlc-sandbox/compare/'$BRANCH'?expand=1"}'
  exit 0
fi

DATA='{"title":"feat('$TASK'): autonomous SDLC ['$RUN']","body":"Automated PR from SDLC Pipeline","head":"'$BRANCH'","base":"main"}'
RESULT=$(curl -s -X POST "https://api.github.com/repos/$REPO/pulls" -H 'Authorization: Bearer '$TOKEN -H 'Accept: application/vnd.github+json' -H 'Content-Type: application/json' -d "$DATA")
echo "$RESULT"
