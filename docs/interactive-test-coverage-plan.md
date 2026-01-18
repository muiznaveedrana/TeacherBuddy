# Interactive Worksheet Test Coverage Plan

**Last Updated**: 2026-01-17
**Current Coverage**: 97.1% (575/592 worksheets tested)

## Summary by Year Group

| Year Group | Total Worksheets | Tests Created | Missing | Coverage | Status |
|------------|------------------|---------------|---------|----------|--------|
| Reception  | 54               | 54            | 0       | 100%     | Complete |
| Year 1     | 78               | 78            | 0       | 100%     | Complete |
| Year 2     | 134              | 124           | 10      | 92.5%    | Data Issues |
| Year 3     | 222              | 217           | 5       | 97.7%    | Nearly Complete |
| Year 4     | 61               | 61            | 0       | 100%     | Complete |
| Year 5     | 30               | 30            | 0       | 100%     | Complete |
| **TOTAL**  | **579**          | **564**       | **15**  | **97.4%**| |

## Test File Organization

```
tests/e2e/interactive/
├── *.spec.ts           # 183 files (Reception, Year 1, Year 2)
├── year3/              # 217 files
│   └── *.spec.ts
├── year4/              # 61 files
│   └── *.spec.ts
└── year5/              # 30 files
    └── *.spec.ts
```

**Total Test Files: 491**

## Test File Convention

```typescript
import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'worksheet-slug-here'
const WORKSHEET_ANSWERS = ["answer1", "answer2", ...]

async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="overlay"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') el.remove()
    })
  })
}

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }) => {
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
    }

    await dismissCookieConsent(page)
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    expect(scoreText).toBe('100%')
  })
})
```

## Key Learnings & Patterns

### 1. Answer Extraction from HTML
Answers are embedded in worksheet `html_content` field in the Answer Key section:
```html
<div class="answer-key">
  <h2>Answer Key</h2>
  <p><strong>1.</strong> answer1, answer2, answer3</p>
  <p><strong>2.</strong> answer4</p>
</div>
```

Regex pattern: `/<p><strong>(\d+)\.<\/strong>\s*(.+?)<\/p>/g`

### 2. Input Types
- **Text inputs**: `input[type="text"]` - fill with `pressSequentially(answer, { delay: 50 })`
- **Disabled inputs**: Skip with `:not([disabled])` selector
- **Multiple per question**: Answers may be comma-separated (e.g., "2, 3, 4, 5")

### 3. Cookie Consent Handling
Always dismiss before clicking buttons:
```typescript
await dismissCookieConsent(page)
```

### 4. Submit Button Location
```typescript
const submitButton = page.locator('.sticky.bottom-0 button').first()
await submitButton.click({ force: true })
```

### 5. Success Verification
```typescript
const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })
```

### 6. Playwright Project
Always use `--project=chromium-desktop` (not just `chromium`)

## Missing Tests by Priority

### Priority 1: Year 2 (10 missing) - DATA QUALITY ISSUES
**⚠️ These worksheets have broken answer keys and need database fixes before tests can be created:**

**Time worksheets** (answer key has "00" instead of proper time format):
- `time-sports-day`, `time-sports-day-251218-200107`
- `time-weekend-fun`, `time-weekend-fun-251218-200054`
- `time-school-day`, `time-school-day-251218-200041`
- **Issue**: Q5a answer key shows "00" but should be proper time like "2:00"

**Movement worksheets** (some have "a) b)" format instead of individual values):
- `movement-which-way-basic-practice`, variants with timestamps
- **Issue**: Answer key not split into individual input values

**ACTION REQUIRED**: Fix worksheet answer keys in database before creating tests

### Priority 2: Year 3 (5 missing) - NEARLY COMPLETE
217/222 tests created. Missing tests:
- 5 worksheets with potential data quality or slug issues
- Run `node scripts/analyze-test-coverage.js` to identify specific missing slugs

### ~~Priority 3: Year 4~~ - COMPLETE
**All 61 tests created**

### ~~Priority 4: Year 5~~ - COMPLETE
**All 30 tests created**

## Test Generation Workflow

1. **Fetch worksheet details**: `GET /api/library/worksheets/{slug}`
2. **Extract answers from HTML**: Parse answer-key section
3. **Generate test file**: Use template above
4. **Run test**: `npx playwright test tests/e2e/interactive/{test-file}.spec.ts --project=chromium-desktop`
5. **If fails**: Use playwright-test-healer agent to debug and fix
6. **Verify 100% score**: Confirm test passes with full marks

## Key Test Learnings

1. **Use 15-second test timeouts** - Long timeouts waste time when debugging. 15s is enough for most interactive worksheets.
2. **Run with `--workers=1`** for reliability - Multiple parallel workers can cause resource contention and timeouts.
3. **Use `--headed`** to see browser - Helps debug visually when tests fail.
4. **Always verify answers** - Extract from HTML carefully and split comma-separated values.

## Running Tests

```bash
# All interactive tests (recommended)
npx playwright test tests/e2e/interactive/ --project=chromium-desktop --workers=1

# Specific year group
npx playwright test tests/e2e/interactive/ --grep "Reception" --project=chromium-desktop

# Specific worksheet
npx playwright test tests/e2e/interactive/worksheet-slug.spec.ts --project=chromium-desktop

# Update coverage report
node scripts/analyze-test-coverage.js
```

## Scripts

- `scripts/analyze-test-coverage.js` - Generate coverage report
- `scripts/generate-interactive-tests.js` - Auto-generate test files (basic)

## Progress Tracking

- [x] Reception: 54/54 (100%) - COMPLETE
- [x] Year 1: 78/78 (100%) - COMPLETE
- [ ] Year 2: 124/134 (92.5%) - 10 remaining (data quality issues)
- [ ] Year 3: 217/222 (97.7%) - 5 remaining
- [x] Year 4: 61/61 (100%) - COMPLETE
- [x] Year 5: 30/30 (100%) - COMPLETE

## Remaining Work Summary

| Issue Type | Count | Action Required |
|------------|-------|-----------------|
| Data quality (Year 2 Time) | 6 | Fix answer key format in database |
| Data quality (Year 2 Movement) | 4 | Split answer key into individual values |
| Missing tests (Year 3) | 5 | Create tests or fix data |
| **Total Remaining** | **15** | |

## Quick Commands

```bash
# Run all interactive tests
npx playwright test tests/e2e/interactive/ --project=chromium-desktop --workers=1

# Run specific year group
npx playwright test tests/e2e/interactive/year3/ --project=chromium-desktop
npx playwright test tests/e2e/interactive/year4/ --project=chromium-desktop
npx playwright test tests/e2e/interactive/year5/ --project=chromium-desktop

# Update coverage report (regenerate JSON)
node scripts/analyze-test-coverage.js
```
