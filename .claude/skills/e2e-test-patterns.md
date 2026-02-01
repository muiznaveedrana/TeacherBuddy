---
name: E2E Test Patterns
description: Project-specific E2E testing patterns and conventions
---

# E2E Test Patterns for Worksheet Generator

This skill documents the specific testing patterns used in this project.

## Test Structure

```
tests/e2e/
├── interactive/
│   ├── reception/     # 51 tests
│   ├── year1/         # 62 tests
│   ├── year2/         # 70 tests
│   ├── year3/         # 217 tests
│   ├── year4/         # 61 tests
│   └── year5/         # 30 tests
├── library-*.spec.ts  # Library feature tests
└── new-user-flow.spec.ts  # Auth flow tests
```

## File Naming Convention
```
tests/e2e/interactive/{year-group}/{worksheet-slug}.spec.ts
```

## Standard Test Command
```bash
npx playwright test tests/e2e/interactive/{year-group}/ --project=chromium-desktop --workers=4 --timeout=30000
```

## Critical Patterns

### 1. Cookie Consent Removal (ALWAYS DO THIS)
```typescript
// Remove cookie consent BEFORE clicking any buttons
await page.evaluate(() => {
  document.querySelector('.cookie-consent-container')?.remove();
});
```

### 2. Input Filling (Use fill, NOT pressSequentially)
```typescript
// GOOD - Fast
await inputField.fill(answer);

// BAD - Slow
await inputField.pressSequentially(answer);
```

### 3. Test Success Criteria
- Test must achieve 100% score by filling correct answers
- All interactive elements must be functional (clicks, inputs)
- NO screenshots - only functional testing
- Videos recorded automatically on failure

### 4. Button Functionality Testing
```typescript
// E2E tests MUST test actual button functionality
await button.click();
await expect(page).toHaveURL(/expected-path/);
// NOT just visibility checks
```

## Playwright Agent Workflow

Use agents in this order:
1. **playwright-test-planner** - Explore app, create test scenarios
2. **playwright-test-generator** - Generate test code from plan
3. **playwright-test-healer** - Debug and fix failing tests

## Before Running Tests
```bash
npx kill-port 3000 && npx kill-port 3001 && npx kill-port 3002
```

## Test Configuration
- Project: `chromium-desktop` only
- Workers: 4 (parallel execution)
- Timeout: 30000ms (30 seconds)
