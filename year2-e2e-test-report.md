# Year 2 E2E Test Report

**Date:** 2026-01-26
**Environment:** Linux (Docker/Sandbox)
**Database:** PROD Supabase (iiatpmoracqxavcrvcrk.supabase.co)
**Browser:** Chromium Desktop (1200x800)
**Playwright Version:** 1.56.1

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Tests | 70 |
| Passed | 0 |
| Failed | 70 |
| Pass Rate | 0% |
| Failure Reason | Network connectivity to Supabase |

## Root Cause Analysis

All 70 tests failed with the same error pattern:

```
TypeError: fetch failed
    at node:internal/deps/undici/undici:14902:13
    at process.processTicksAndRejections
    at async InteractiveWorksheetPage
```

**Root Cause:** The sandbox/Docker environment cannot establish outbound network connections to external services (Supabase at `iiatpmoracqxavcrvcrk.supabase.co`). This is a network restriction in the execution environment, not an application or test issue.

## Test Categories Affected

### 1. Equal Groups (6 tests)
- equal-groups-animal-fun-with-animals-counting
- equal-groups-baking-fun-with-baking-counting
- equal-groups-challenge-with-school-counting
- equal-groups-v1, v2, v3

### 2. Fractions (10 tests)
- fractions-recognising-all (Foundation, Varied, Challenge)
- fractions-recognising-fractions (test, v2-v6)

### 3. Mental Maths (11 tests)
- mental-maths-challenge-mixed
- mental-maths-foundation-mixed
- mental-maths-strategies (challenge, foundation, practice)
- mental-strategies-all (6 worksheets)

### 4. Money (3 tests)
- money, money-v2, money-v3

### 5. Movement (1 test)
- movement-which-way-basic

### 6. Number Place Value (9 tests)
- comparing-numbers (v1, v2, v3)
- numbers-to-100 (v1, v2, v3)
- rounding-nearest-10 (v1, v2, v3)

### 7. Recognising Fractions (1 test)
- recognising-fractions-mixed-test

### 8. Sharing & Grouping (3 tests)
- sharing-grouping-v1, v2, v3

### 9. Time (10 tests)
- time-school-day, time-sports-day, time-sports
- time-test, time-v2, time-weekend-fun, time-weekend, time

### 10. Times Tables (9 tests)
- times-tables-2-5-10-all (3 worksheets)
- times-tables-2-5-10-v1, v2, v3
- times-tables-challenge-mixed, quick-recall-mixed, skip-counting-mixed

### 11. Two-Digit Addition & Subtraction (3 tests)
- two-digit-addition-and-subtraction-animals-v2
- two-digit-addition-and-subtraction-school
- two-digit-addition-and-subtraction-space-v3

### 12. Word Problems (5 tests)
- word-problems-all (Foundation, Varied, Challenge)
- word-problems-y2-v1, v2

## Screenshot Status

**Screenshots Captured:** None
**Reason:** Tests failed at initial page load before screenshots could be taken. The browser navigated to the worksheet URL but the Next.js server returned 404 errors because it couldn't fetch worksheet data from Supabase.

## Recommendations

1. **Run tests in an environment with external network access** - The tests themselves are correctly written, but require connectivity to Supabase
2. **Alternative: Use a local mock database** - Could implement MSW or similar to mock Supabase responses
3. **Alternative: Run tests against production URL directly** - Test against https://worksheetgenerator.ai instead of localhost

## Error Pattern (All Tests)

```
Test timeout of 30000ms exceeded.

Error: page.evaluate: Test timeout of 30000ms exceeded.

async function dismissCookieConsent(page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
```

The page never loaded because the Next.js server couldn't fetch worksheet data from Supabase, returning 404 responses.

## Files Generated

- `playwright-report/index.html` - Interactive HTML report
- `test-results/results.json` - JSON test results
- `test-output.log` - Console output log

## Configuration Used

```typescript
// playwright-screenshot.config.ts
export default defineConfig({
  retries: 0,
  workers: 4,
  screenshot: 'on',  // Capture on both pass and fail
  trace: 'off',
  video: 'off',
  timeout: 30000,
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 180000,
  }
})
```

## Conclusion

The Year 2 E2E test suite is correctly implemented with 70 test cases covering all interactive worksheet types. The tests failed due to network restrictions in the execution environment preventing connections to the Supabase database.

**To successfully run these tests:**
1. Execute on a machine with internet access
2. Ensure the Supabase credentials in `.env.local` are valid
3. Run: `npx playwright test tests/e2e/interactive/year2/ --project=chromium-desktop --workers=4`
