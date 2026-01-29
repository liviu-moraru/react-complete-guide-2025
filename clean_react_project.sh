#!/usr/bin/env bash
set -euo pipefail

# Check if a directory argument is provided
if [[ $# -eq 0 ]]; then
  echo "Usage: $0 <project-directory>"
  exit 1
fi

TARGET_DIR="$1"

# Check if the target directory exists
if [[ ! -d "$TARGET_DIR" ]]; then
  echo "Error: Directory '$TARGET_DIR' does not exist."
  exit 1
fi

cd "$TARGET_DIR"

echo "Cleaning...."

# 1) Remove all files from public (keep the folder itself)
if [[ -d "public" ]]; then
  find "public" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  echo "✓ Emptied public/"
else
  echo "⚠ public/ not found, skipping"
fi

# 2) Remove all files from src/assets (keep the folder itself)
if [[ -d "src/assets" ]]; then
  find "src/assets" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  echo "✓ Emptied src/assets/"
else
  echo "⚠ src/assets/ not found, skipping"
fi

# 3) Delete src/App.css
rm -f "src/App.css"
echo "✓ Deleted src/App.css (if it existed)"

# 4) Clear all code in src/App.jsx
if [[ -f "src/App.jsx" ]]; then
  : > "src/App.jsx"
  echo "✓ Cleared src/App.jsx"
else
  echo "⚠ src/App.jsx not found, skipping"
fi

# 5) Clear all content of src/index.css
if [[ -f "src/index.css" ]]; then
  : > "src/index.css"
  echo "✓ Cleared src/index.css"
else
  echo "⚠ src/index.css not found, skipping"
fi

echo "Done."
