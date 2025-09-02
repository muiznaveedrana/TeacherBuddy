#!/bin/bash

# User Authentication Flow Testing Script
# Focused testing for new user and existing user E2E journeys

echo "👤 Starting User Authentication Flow Tests"
echo "============================================="

# Function to check if dev server is running
check_dev_server() {
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ Dev server is running"
        return 0
    else
        echo "❌ Dev server is not running - please start it first with 'npm run dev'"
        return 1
    fi
}

# Check dev server
if ! check_dev_server; then
    echo ""
    echo "💡 Run 'npm run dev' in another terminal first"
    exit 1
fi

# Create screenshots directory
mkdir -p test-results/screenshots

echo ""
echo "🆕 Testing New User Flow (Landing → Start Creating → Login → Profile → Dashboard)..."
npx playwright test tests/e2e/user-authentication-flows.spec.ts --grep="New User Complete Journey" --project=chromium-desktop --reporter=line

echo ""
echo "👤 Testing Existing User Flow (Direct Login → Dashboard)..."
npx playwright test tests/e2e/user-authentication-flows.spec.ts --grep="Existing User Direct Access" --project=chromium-desktop --reporter=line

echo ""
echo "❌ Testing Authentication Error States..."
npx playwright test tests/e2e/user-authentication-flows.spec.ts --grep="Authentication Error States" --project=chromium-desktop --reporter=line

echo ""
echo "📱 Testing Mobile Authentication Flows..."
npx playwright test tests/e2e/user-authentication-flows.spec.ts --grep="New User Complete Journey.*mobile" --project=chromium-mobile --reporter=line

echo ""
echo "🔧 Testing Cross-Viewport Authentication Consistency..."
npx playwright test tests/e2e/user-authentication-flows.spec.ts --grep="Cross-Viewport Authentication" --project=chromium-desktop --reporter=line

echo ""
echo "📊 Generating HTML Report..."
npx playwright show-report

echo ""
echo "✅ User Authentication Flow Testing Complete!"
echo "============================================="
echo "📝 Results:"
echo "  - Screenshots: test-results/screenshots/"
echo "  - HTML Report: test-results/html/"
echo ""
echo "🔍 User Flow Screenshots Captured:"
echo "  - New User: Landing → CTA → Login → Profile → Dashboard"
echo "  - Existing User: Login → Dashboard (direct)"
echo "  - Mobile Flows: Responsive authentication UX"
echo "  - Error States: Failed authentication handling"
echo ""
echo "📱 Tested Viewports:"
echo "  - Mobile (375x667) - Teacher phones"
echo "  - Tablet (768x1024) - Classroom devices"  
echo "  - Desktop (1200x800) - Staff computers"
echo ""
echo "🚀 To run just authentication tests:"
echo "  bash scripts/run-auth-flow-tests.sh"
echo ""
echo "🔄 To update auth flow screenshots:"
echo "  npx playwright test tests/e2e/user-authentication-flows.spec.ts --update-snapshots"