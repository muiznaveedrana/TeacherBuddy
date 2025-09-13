#!/bin/bash

echo "🚀 Sequential Baseline Generation (Unified)"
echo "==========================================="
echo "This script has been updated to use the Node.js version"
echo "for better integration with the API endpoints."
echo ""
echo "Starting Node.js Sequential Baseline Generator..."
echo ""

# Check if Node.js version exists
if [ ! -f "scripts/sequential-baseline-generation.js" ]; then
    echo "❌ Node.js script not found!"
    echo "   Expected: scripts/sequential-baseline-generation.js"
    exit 1
fi

# Load environment variables
if [ -f ".env.local" ]; then
    source .env.local
    export GEMINI_API_KEY
    echo "✅ Environment variables loaded"
else
    echo "❌ .env.local not found!"
    exit 1
fi

# Check if Next.js is running
if ! curl -s http://localhost:3001/api/generate-worksheet > /dev/null 2>&1; then
    echo "⚠️  Next.js server not detected on port 3001"
    echo "   Starting Next.js development server..."
    npm run dev &

    # Wait for server to start
    echo "   Waiting for server startup..."
    sleep 8

    if ! curl -s http://localhost:3001/api/generate-worksheet > /dev/null 2>&1; then
        echo "❌ Failed to start Next.js server"
        echo "   Please manually run: npm run dev"
        echo "   Then run this script again"
        exit 1
    fi

    echo "✅ Next.js server started successfully"
fi

echo ""
echo "🎯 Launching unified Node.js baseline generator..."
echo ""

# Run the Node.js script
node scripts/sequential-baseline-generation.js

echo ""
echo "🏁 Sequential baseline generation script completed!"