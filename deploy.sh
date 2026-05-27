#!/bin/bash
# ─────────────────────────────────────────────
#  Moratia Games — Build & Deploy to Bluehost
#  Usage: ./deploy.sh
# ─────────────────────────────────────────────

set -e  # stop immediately if any command fails

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

echo ""
echo "🔨 Building production bundle..."
NODE_OPTIONS=--openssl-legacy-provider yarn build

echo ""
echo "🚀 Deploying to Bluehost..."
rsync -avz --delete build/ bluehost:~/public_html/

echo ""
echo "🔒 Setting file permissions..."
ssh bluehost "find ~/public_html -type d -exec chmod 755 {} \; && find ~/public_html -type f -exec chmod 644 {} \;"

echo ""
echo "✅ Done! Live at https://moratiagames.com"
echo ""
