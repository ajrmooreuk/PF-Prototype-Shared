#!/bin/bash

# Script to copy Agentic-01 contents to AIRL repository
# Source: PF-Prototype-Shared/1 Architecture/0.2 Agentic-Engineer/Agentic-01
# Target: AIRL/3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline

set -e

SOURCE_DIR="1 Architecture/0.2 Agentic-Engineer/Agentic-01"
TARGET_REPO="https://github.com/ajrmooreuk/AIRL"
TARGET_PATH="3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline"

echo "=================================================="
echo "Agentic-01 Copy Script"
echo "=================================================="
echo ""
echo "This script will copy Agentic-01 contents to the AIRL repository"
echo ""
echo "Source: $SOURCE_DIR"
echo "Target Repository: $TARGET_REPO"
echo "Target Path: $TARGET_PATH"
echo ""
echo "=================================================="
echo ""

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory '$SOURCE_DIR' not found"
    exit 1
fi

# Count files to be copied
FILE_COUNT=$(find "$SOURCE_DIR" -type f | wc -l)
echo "Files to be copied: $FILE_COUNT"
echo ""

# Instructions for manual process
echo "MANUAL COPY INSTRUCTIONS:"
echo "========================="
echo ""
echo "1. Clone the target repository:"
echo "   git clone $TARGET_REPO"
echo "   cd AIRL"
echo ""
echo "2. Create the target directory if it doesn't exist:"
echo "   mkdir -p \"$TARGET_PATH\""
echo ""
echo "3. Copy the Agentic-01 contents:"
echo "   cp -r \"<path-to-this-repo>/$SOURCE_DIR\"/* \"$TARGET_PATH/\""
echo ""
echo "4. Commit and push the changes:"
echo "   git add \"$TARGET_PATH\""
echo "   git commit -m \"Add Agentic-01 framework files\""
echo "   git push origin main"
echo ""
echo "=================================================="
echo ""

# Option to create a tar archive for easy transfer
read -p "Would you like to create a tar archive for easy transfer? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    ARCHIVE_NAME="agentic-01-export-$(date +%Y%m%d-%H%M%S).tar.gz"
    echo "Creating archive: $ARCHIVE_NAME"
    tar -czf "$ARCHIVE_NAME" -C "1 Architecture/0.2 Agentic-Engineer" "Agentic-01"
    echo "Archive created successfully: $ARCHIVE_NAME"
    echo ""
    echo "To extract in target repository:"
    echo "  tar -xzf $ARCHIVE_NAME -C \"3-PF-Core/CI-CD-PaaS-DevStageProd Pipeline\" --strip-components=1"
    echo ""
fi

echo "Script completed."
