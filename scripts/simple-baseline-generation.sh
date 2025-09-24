#!/bin/bash

echo "🚀 Simple Baseline Generation (2 worksheets per year group)"
echo "=========================================================="
echo "This script generates exactly 2 worksheets per year group"
echo "for a quick baseline sample across all year groups."
echo ""

# Check if Node.js version exists
if [ ! -f "scripts/simple-baseline-generation.js" ]; then
    echo "❌ Node.js script not found!"
    echo "   Expected: scripts/simple-baseline-generation.js"
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
if ! curl -s http://localhost:3000/api/generate-worksheet > /dev/null 2>&1; then
    echo "⚠️  Next.js server not detected on port 3000"
    echo "   Starting Next.js development server..."
    npm run dev &

    # Wait for server to start
    echo "   Waiting for server startup..."
    sleep 8

    if ! curl -s http://localhost:3000/api/generate-worksheet > /dev/null 2>&1; then
        echo "❌ Failed to start Next.js server"
        echo "   Please manually run: npm run dev"
        echo "   Then run this script again"
        exit 1
    fi

    echo "✅ Next.js server started successfully"
fi

echo ""
echo "🎯 Launching simple baseline generator..."
echo ""

# Run the Node.js script
node scripts/simple-baseline-generation.js

echo ""
echo "🏁 Simple baseline generation script completed!"