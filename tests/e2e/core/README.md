# Core E2E Tests - Simplified Strategy

## 🎯 Philosophy: Less is More

Instead of 8+ fragmented tests, we focus on **3 core business journeys** that provide maximum coverage with minimum maintenance.

## ✅ Core Tests

### 1. **New User Complete Journey** 
`new-user-complete-journey.spec.ts`
- **Coverage**: Landing → Sign Up → Profile Setup → First Worksheet → Success
- **Value**: Tests entire onboarding funnel + core functionality
- **Status**: ✅ Working (recently fixed route and selector issues)

### 2. **Returning User Workflow**
`returning-user-workflow.spec.ts`
- **Coverage**: Login → Dashboard → Multiple Worksheet Types → Export/Share → Success  
- **Value**: Tests daily user workflow + all worksheet features
- **Status**: 🚧 Template created, needs completion

### 3. **Cross-Browser Critical Paths**
`cross-browser-critical.spec.ts`
- **Coverage**: Key screens across Chrome/Firefox/Safari
- **Value**: Ensures compatibility on teacher devices (UK classroom focus)
- **Status**: 🚧 Template created, needs completion

## 🚀 Quick Commands

```bash
# Run all core tests
npx playwright test tests/e2e/core/

# Run specific journey
npx playwright test tests/e2e/core/new-user-complete-journey.spec.ts

# Cross-browser testing
npx playwright test tests/e2e/core/ --project=firefox-desktop
npx playwright test tests/e2e/core/ --project=webkit-desktop

# Mobile testing
npx playwright test tests/e2e/core/ --project=chromium-mobile

# Update visual baselines
npx playwright test tests/e2e/core/ --update-snapshots
```

## 📊 Coverage Strategy

- **User Journeys**: Complete end-to-end business flows
- **Visual Regression**: Key screens only (not micro-components) 
- **Cross-Browser**: Chrome, Firefox, Safari compatibility
- **Responsive**: Mobile, tablet, desktop, ultrawide
- **Maintenance**: 3 focused tests vs 8+ fragmented ones

## 🗑️ What We Removed (Noise)

- Component-level visual tests → Move to unit tests
- Fragmented navigation tests → Covered in journeys
- Accessibility-specific tests → Use automated a11y tools
- Baseline capture tests → Redundant with journeys
- Multiple authentication tests → Consolidated into journeys

This simplified approach provides **80% of the value with 20% of the complexity**.