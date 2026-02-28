#!/bin/bash

# ClawSentinel Official Installation Script
set -e

SKILLS_DIR="$HOME/.openclaw/skills"
REPO_DIR="$SKILLS_DIR/clawsentinel-repo"

echo "🦅 ClawSentinel: Starting official installation..."

# 1. Clean up old installation if exists
rm -rf "$REPO_DIR"

# 2. Clone the repository
echo "⏬ Cloning repository..."
git clone https://github.com/liekkasfc/ClawSentinel.git "$REPO_DIR"

# 3. Create symlinks for each skill
echo "🔗 Linking skills to OpenClaw..."
for skill_path in "$REPO_DIR"/skills/*; do
    if [ -d "$skill_path" ]; then
        skill_name=$(basename "$skill_path")
        ln -sf "$skill_path" "$SKILLS_DIR/$skill_name"
        echo "   - Linked: $skill_name"
    fi
done

# 4. Install dependencies
echo "📦 Installing dependencies..."
cd "$REPO_DIR" && npm install

echo "✅ Installation complete!"
echo "👉 Next steps: Configure your .env in $REPO_DIR and register skills in openclaw.json"
