#!/bin/bash

# Walfred Installation Script
# Sets up the walfred command for global access and installs dependencies

echo "🏛️  Installing Walfred - City Council Template Editor"
echo "=================================================="

# Get the current directory
WALFRED_DIR="$(pwd)"
WALFRED_PATH="$WALFRED_DIR/walfred"

# Check if walfred script exists
if [ ! -f "$WALFRED_PATH" ]; then
    echo "❌ Error: walfred script not found in current directory"
    echo "   Please run this from the wordHtmlGenDemo directory"
    exit 1
fi

# Check if requirements.txt exists
if [ ! -f "$WALFRED_DIR/requirements.txt" ]; then
    echo "❌ Error: requirements.txt not found in current directory"
    echo "   Please run this from the wordHtmlGenDemo directory"
    exit 1
fi

# Make sure walfred is executable
chmod +x "$WALFRED_PATH"

echo "🔍 Checking system dependencies..."

# Check for Python
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
    echo "✅ Found Python 3: $(which python3)"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
    echo "✅ Found Python: $(which python)"
else
    echo "❌ Error: Python is not installed"
    echo "   Please install Python from https://python.org"
    exit 1
fi

# Check for pip
if command -v pip3 &> /dev/null; then
    PIP_CMD="pip3"
    echo "✅ Found pip3: $(which pip3)"
elif command -v pip &> /dev/null; then
    PIP_CMD="pip"
    echo "✅ Found pip: $(which pip)"
else
    echo "❌ Error: pip is not installed"
    echo "   Please install pip package manager"
    exit 1
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
$PIP_CMD install -r "$WALFRED_DIR/requirements.txt"

if [ $? -eq 0 ]; then
    echo "✅ Python dependencies installed successfully"
else
    echo "⚠️  Some packages may have failed to install"
    echo "   You can run walfred anyway - it will check and install missing packages"
fi

# Check for LibreOffice
echo "🔍 Checking for LibreOffice..."
if command -v soffice &> /dev/null; then
    echo "✅ LibreOffice found: $(which soffice)"
elif command -v libreoffice &> /dev/null; then
    echo "✅ LibreOffice found: $(which libreoffice)"
else
    echo "⚠️  LibreOffice not found - PDF generation may fail"
    echo "   Install with one of these commands:"
    echo "   • macOS: brew install libreoffice"
    echo "   • Ubuntu: sudo apt install libreoffice"
    echo "   • Or download from: https://libreoffice.org"
fi

# Detect shell and add to appropriate config file
if [ -n "$ZSH_VERSION" ]; then
    SHELL_CONFIG="$HOME/.zshrc"
    SHELL_NAME="zsh"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_CONFIG="$HOME/.bashrc"
    SHELL_NAME="bash"
else
    SHELL_CONFIG="$HOME/.profile"
    SHELL_NAME="shell"
fi

echo "📝 Detected $SHELL_NAME shell, updating $SHELL_CONFIG"

# Create alias entry
ALIAS_LINE="alias walfred='$WALFRED_PATH'"

# Check if alias already exists
if grep -q "alias walfred=" "$SHELL_CONFIG" 2>/dev/null; then
    echo "⚠️  Walfred alias already exists in $SHELL_CONFIG"
    echo "   Updating existing alias..."
    # Remove old alias and add new one
    sed -i.bak '/alias walfred=/d' "$SHELL_CONFIG"
fi

# Add the alias
echo "" >> "$SHELL_CONFIG"
echo "# Walfred - City Council Template Editor" >> "$SHELL_CONFIG"
echo "$ALIAS_LINE" >> "$SHELL_CONFIG"

echo "✅ Walfred alias added to $SHELL_CONFIG"
echo ""
echo "🎯 Installation Complete!"
echo "=================================================="
echo "Walfred will automatically:"
echo "• Check and install missing Python packages"
echo "• Find available ports (8000-8010)"
echo "• Start the template editor server"
echo "• Open with font customization and section breaks"
echo ""
echo "To use walfred from anywhere, either:"
echo ""
echo "1. Restart your terminal, then run:"
echo "   walfred"
echo ""
echo "2. Or reload your shell config:"
echo "   source $SHELL_CONFIG"
echo "   walfred"
echo ""
echo "3. Or run directly from this directory:"
echo "   $WALFRED_PATH"
echo ""
echo "🚀 Ready to create professional city council agendas!" 