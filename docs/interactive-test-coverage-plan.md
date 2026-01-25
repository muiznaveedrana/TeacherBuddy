# Interactive Worksheet Test Coverage Plan

**Last Updated**: 2026-01-22
**Total Tests**: 491 tests in 456 files (organized by year group)

## Summary by Year Group

| Year Group | Tests | Files | Location |
|------------|-------|-------|----------|
| Reception  | 51    | 47    | `tests/e2e/interactive/reception/` |
| Year 1     | 62    | 42    | `tests/e2e/interactive/year1/` |
| Year 2     | 70    | 59    | `tests/e2e/interactive/year2/` |
| Year 3     | 217   | 217   | `tests/e2e/interactive/year3/` |
| Year 4     | 61    | 61    | `tests/e2e/interactive/year4/` |
| Year 5     | 30    | 30    | `tests/e2e/interactive/year5/` |
| **TOTAL**  | **491** | **456** | |

**Note**: Reorganized 2026-01-22 (35 unmapped tests deleted, all year groups in subdirectories).

## Test File Organization (STANDARDIZED 2026-01-22)

```
tests/e2e/
├── interactive-*.spec.ts    # 14 legacy files (coins, fractions, money, time, etc.)
└── interactive/
    ├── reception/           # 51 tests (47 files)
    │   └── *.spec.ts
    ├── year1/               # 62 tests (42 files)
    │   └── *.spec.ts
    ├── year2/               # 70 tests (59 files)
    │   └── *.spec.ts
    ├── year3/               # 217 tests (217 files)
    │   └── *.spec.ts
    ├── year4/               # 61 tests (61 files)
    │   └── *.spec.ts
    └── year5/               # 30 tests (30 files)
        └── *.spec.ts
```

**Total: 491 tests in 456 files** (+ 14 legacy files)

**Changes made 2026-01-22:**
- Moved Reception, Year 1, Year 2 tests into dedicated subdirectories
- Deleted 35 unmapped/orphan tests
- All year groups now use identical directory structure

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

## Missing Tests - Detailed List

### Priority 1: Year 2 (6 missing) - DATA QUALITY ISSUES
**These worksheets have broken answer keys and need database fixes before tests can be created:**

**Time worksheets** (answer key has "00" instead of proper time format):
- `time-sports-day-251218-200107`
- `time-weekend-fun-251218-200054`
- `time-school-day-251218-200041`
- **Issue**: Q5a answer key shows "00" but should be proper time like "2:00"

**Movement worksheets** (duplicate variants with timestamp suffixes):
- `movement-which-way-basic-practice-251218-220008`
- `movement-which-way-basic-practice-251218-214625`
- `movement-which-way-basic-practice-251218-213659`
- **Issue**: These appear to be duplicate/variant worksheets with timestamp suffixes

**ACTION REQUIRED**: Review and potentially delete duplicate worksheets, fix answer key format

### Priority 2: Year 3 (5 missing) - SPECIFIC WORKSHEETS
These specific worksheets need tests created:

1. `number-place-value-counting-4s-8s-50s-100s-mixed-layout-v6`
   - Topic: number-place-value > counting-4s-8s-50s-100s
   - Note: v1-v5 tests exist, only v6 missing

2. `hundreds-tens-and-ones-practice-4-default-practice`
   - Topic: number-place-value > hundreds-tens-ones

3. `hundreds-tens-and-ones-practice-1-default-practice`
   - Topic: number-place-value > hundreds-tens-ones

4. `representing-numbers-to-1000-challenge-default`
   - Topic: number-place-value > representing-to-1000

5. `representing-numbers-to-1000-practice-3-default`
   - Topic: number-place-value > representing-to-1000

### Priority 3: year4 (6 missing) - NEW WORKSHEETS
**Note**: These are in a separate `year4` (lowercase) category, NOT the main `Year 4` group:

1. `factor-pairs-challenge-practice-4-mixed-mixed`
2. `factor-pairs-practice-3-sports-theme-sports`
3. `factor-pairs-and-arrays-practice-2-party-theme-party`
4. `factor-pairs-practice-1-bakery-theme-bakery`
5. `commutativity-foundation-2-classroom-theme-classroom`
6. `factor-pairs-foundation-1-garden-theme-garden`

- Topic: multiplication-division > factor-pairs-commutativity
- **ACTION REQUIRED**: Create tests OR fix year_group categorization to `Year 4`

## Test Generation Workflow

1. **Fetch worksheet details**: `GET /api/library/worksheets/{slug}`
2. **Extract answers from HTML**: Parse answer-key section
3. **Generate test file**: Use template above
4. **Run test**: `npx playwright test tests/e2e/interactive/{test-file}.spec.ts --project=chromium-desktop`
5. **If fails**: Use playwright-test-healer agent to debug and fix
6. **Verify 100% score**: Confirm test passes with full marks

## Key Test Learnings

1. **Use 30-second test timeouts** - Allows complex worksheets with many inputs to complete.
2. **Run with `--workers=4`** for speed - Parallel execution is fast and reliable for most worksheets.
3. **Use `--headed`** to see browser - Helps debug visually when tests fail.
4. **Always verify answers** - Extract from HTML carefully and split comma-separated values.
5. **Standardized directory structure** - All year groups in `tests/e2e/interactive/{year-group}/` subdirectories.

## Running Tests

```bash
# All interactive tests
npx playwright test tests/e2e/interactive/ --project=chromium-desktop --workers=4 --timeout=30000

# By year group (STANDARDIZED - all use same pattern)
npx playwright test tests/e2e/interactive/reception/ --project=chromium-desktop --workers=4 --timeout=30000
npx playwright test tests/e2e/interactive/year1/ --project=chromium-desktop --workers=4 --timeout=30000
npx playwright test tests/e2e/interactive/year2/ --project=chromium-desktop --workers=4 --timeout=30000
npx playwright test tests/e2e/interactive/year3/ --project=chromium-desktop --workers=4 --timeout=30000
npx playwright test tests/e2e/interactive/year4/ --project=chromium-desktop --workers=4 --timeout=30000
npx playwright test tests/e2e/interactive/year5/ --project=chromium-desktop --workers=4 --timeout=30000

# Specific worksheet
npx playwright test tests/e2e/interactive/year3/worksheet-slug.spec.ts --project=chromium-desktop
```

## Scripts

- `scripts/analyze-test-coverage.js` - Generate coverage report (Note: needs fix to scan subdirectories)
- `scripts/generate-interactive-tests.js` - Auto-generate test files (basic)

## Progress Tracking

- [x] Reception: 54/54 (100%) - COMPLETE
- [x] Year 1: 78/78 (100%) - COMPLETE
- [ ] Year 2: 128/134 (95.5%) - 6 remaining (data quality issues)
- [ ] Year 3: 217/222 (97.7%) - 5 remaining
- [x] Year 4: 61/61 (100%) - COMPLETE
- [x] Year 5: 30/30 (100%) - COMPLETE
- [ ] year4 (misc): 0/6 (0%) - 6 new worksheets need tests

## Remaining Work Summary

| Issue Type | Count | Action Required |
|------------|-------|-----------------|
| Data quality (Year 2 Time) | 3 | Fix answer key format in database |
| Duplicate worksheets (Year 2 Movement) | 3 | Review and potentially delete |
| Missing tests (Year 3) | 5 | Create tests |
| New worksheets (year4 misc) | 6 | Create tests OR fix categorization |
| **Total Remaining** | **17** | |

## Quick Commands

```bash
# Run all interactive tests
npx playwright test tests/e2e/interactive/ --project=chromium-desktop --workers=4 --timeout=30000

# Run specific year group (ALL use same pattern)
npx playwright test tests/e2e/interactive/reception/ --project=chromium-desktop --workers=4 --timeout=30000
npx playwright test tests/e2e/interactive/year1/ --project=chromium-desktop --workers=4 --timeout=30000
npx playwright test tests/e2e/interactive/year2/ --project=chromium-desktop --workers=4 --timeout=30000
npx playwright test tests/e2e/interactive/year3/ --project=chromium-desktop --workers=4 --timeout=30000
npx playwright test tests/e2e/interactive/year4/ --project=chromium-desktop --workers=4 --timeout=30000
npx playwright test tests/e2e/interactive/year5/ --project=chromium-desktop --workers=4 --timeout=30000

# Count test files by directory
find tests/e2e/interactive -name "*.spec.ts" | sed 's/\/[^\/]*$//' | sort | uniq -c
```

## Get Test Slug List

```bash
# List all test slugs
find tests/e2e/interactive -name "*.spec.ts" -exec basename {} .spec.ts \; | sort > test-slugs.txt

# Count by year group
find tests/e2e/interactive -type d -mindepth 1 -maxdepth 1 -exec sh -c 'echo "$(basename "$1"): $(find "$1" -name "*.spec.ts" | wc -l)"' _ {} \;
```
