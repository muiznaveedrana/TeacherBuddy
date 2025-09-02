#!/bin/bash

# Visual Testing Execution Script
# Runs comprehensive visual regression tests for WorksheetGenerator.AI

echo "🎯 Starting Visual Testing Suite for WorksheetGenerator.AI"
echo "=================================================="

# Function to check if dev server is running
check_dev_server() {
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ Dev server is running"
        return 0
    else
        echo "❌ Dev server is not running"
        return 1
    fi
}

# Function to start dev server if needed
start_dev_server() {
    echo "🚀 Starting development server..."
    npm run dev &
    DEV_SERVER_PID=$!
    
    # Wait for server to be ready
    echo "⏳ Waiting for dev server to be ready..."
    for i in {1..30}; do
        if check_dev_server; then
            echo "✅ Dev server ready after ${i} seconds"
            return 0
        fi
        sleep 1
    done
    
    echo "❌ Dev server failed to start after 30 seconds"
    return 1
}

# Function to cleanup
cleanup() {
    if [[ ! -z "$DEV_SERVER_PID" ]]; then
        echo "🧹 Stopping dev server..."
        kill $DEV_SERVER_PID 2>/dev/null || true
    fi
}

# Set trap for cleanup on exit
trap cleanup EXIT

# Check if dev server is running, start if needed
if ! check_dev_server; then
    start_dev_server || exit 1
else
    echo "✅ Dev server already running"
fi

# Create screenshots directory
mkdir -p test-results/screenshots

# Run visual tests in order of importance
echo ""
echo "👤 Running User Authentication Flow Tests..."
npx playwright test tests/e2e/user-authentication-flows.spec.ts --project=chromium-desktop --reporter=line

echo ""
echo "📸 Running Navigation Visual Tests..."
npx playwright test tests/e2e/navigation-visual.spec.ts --project=chromium-desktop --reporter=line

echo ""
echo "🎭 Running User Journey Visual Tests..."
npx playwright test tests/e2e/user-journeys-visual.spec.ts --project=chromium-desktop --reporter=line

echo ""
echo "🔧 Running Component States Visual Tests..."
npx playwright test tests/e2e/component-states-visual.spec.ts --project=chromium-desktop --reporter=line

echo ""
echo "♿ Running Accessibility Visual Tests..."
npx playwright test tests/e2e/accessibility-visual.spec.ts --project=chromium-desktop --reporter=line

# Run cross-browser tests
echo ""
echo "🌐 Running Cross-Browser Tests..."
echo "  Firefox..."
npx playwright test tests/e2e/navigation-visual.spec.ts --project=firefox-desktop --reporter=line
echo "  WebKit..."
npx playwright test tests/e2e/navigation-visual.spec.ts --project=webkit-desktop --reporter=line

# Run mobile/tablet tests
echo ""
echo "📱 Running Mobile/Tablet Tests..."
echo "  User Flows Mobile..."
npx playwright test tests/e2e/user-authentication-flows.spec.ts --project=chromium-mobile --reporter=line
echo "  Tablet Portrait..."
npx playwright test tests/e2e/navigation-visual.spec.ts --project=chromium-tablet-portrait --reporter=line
echo "  Mobile Navigation..."
npx playwright test tests/e2e/user-journeys-visual.spec.ts --project=chromium-mobile --reporter=line

# Run ultrawide tests
echo ""
echo "🖥️ Running Ultrawide Display Tests..."
npx playwright test tests/e2e/navigation-visual.spec.ts --project=chromium-ultrawide --reporter=line

echo ""
echo "📊 Generating HTML Report..."
npx playwright show-report

echo ""
echo "✅ Visual Testing Suite Complete!"
echo "=================================================="
echo "📝 Results:"
echo "  - Screenshots: test-results/screenshots/"
echo "  - HTML Report: test-results/html/"
echo "  - Test artifacts: test-results/"
echo ""
echo "🔍 To update baseline screenshots, run:"
echo "  npx playwright test --update-snapshots"
echo ""
echo "🚀 To run specific tests:"
echo "  npx playwright test tests/e2e/user-authentication-flows.spec.ts"
echo "  npx playwright test tests/e2e/navigation-visual.spec.ts"
echo "  npx playwright test tests/e2e/user-journeys-visual.spec.ts"
echo "  npx playwright test tests/e2e/component-states-visual.spec.ts"
echo "  npx playwright test tests/e2e/accessibility-visual.spec.ts"