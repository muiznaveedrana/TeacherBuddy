# Interactive Worksheet Test Generation Prompt

## Overview
Generate a Playwright E2E test for an interactive worksheet that:
1. Navigates to the worksheet's interactive mode
2. Extracts correct answers from the worksheet HTML
3. Fills all inputs with correct answers
4. Submits and verifies 100% score

## Input Required
When requesting a test, provide:
- **Worksheet URL**: e.g., `http://localhost:3000/library/{slug}/interactive`
- **Worksheet slug**: e.g., `number-counting-counting-to-10-v2`

## Worksheet Architecture

### Page Structure
The interactive worksheet page uses these components:
- **Container**: `.interactive-worksheet-container`
- **Questions**: `.question-interactive` (one per question)
- **Inputs**: `input[type="text"]` within the container
- **Submit Button**: `.sticky.bottom-0 button` with text "Submit Answers" or "Answer all questions (X remaining)"
- **Celebration Overlay**: `.fixed.inset-0.z-50` appears after submission showing score

### Answer Key Location
The worksheet HTML (stored in `html_content` field in Supabase `worksheets` table) contains:
```html
<div class="answer-key">
  <div class="answer-key-content">
    <p><strong>1.</strong> 7</p>
    <p><strong>2.</strong> 3</p>
    ...
  </div>
</div>
```

### How to Extract Answers
**Option 1: From Supabase directly**
```typescript
// Use Supabase client to fetch worksheet
const { data: worksheet } = await supabase
  .from('worksheets')
  .select('html_content')
  .eq('slug', WORKSHEET_SLUG)
  .single()

// Parse answer key from HTML
const matches = worksheet.html_content.matchAll(/<p><strong>(\d+)\.<\/strong>\s*(.+?)<\/p>/g)
for (const match of matches) {
  answers[parseInt(match[1]) - 1] = match[2].trim()
}
```

**Option 2: From page content (if rendered)**
```typescript
const correctAnswers = await page.evaluate(() => {
  const answers: string[] = []
  const answerKeyDiv = document.querySelector('.answer-key-content')
  if (answerKeyDiv) {
    answerKeyDiv.querySelectorAll('p').forEach(p => {
      const text = p.textContent || ''
      const match = text.match(/(\d+)[.:\s]+(.+)/)
      if (match) {
        answers[parseInt(match[1]) - 1] = match[2].trim()
      }
    })
  }
  return answers
})
```

## Test Template

Create file: `tests/e2e/interactive-{slug}.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = '{slug}'
const WORKSHEET_ANSWERS = ['{answer1}', '{answer2}', ...] // Extract from HTML

// Remove cookie consent overlay
async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') el.remove()
    })
  })
}

test.describe(`Interactive Worksheet: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }) => {
    // Navigate
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)

    // Wait for container
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    // Fill inputs with correct answers
    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      const answer = WORKSHEET_ANSWERS[i] || String(i + 1)
      await input.pressSequentially(answer, { delay: 50 })
    }

    // Wait for submit button to be enabled
    await page.waitForFunction(() => {
      const btn = document.querySelector('.sticky.bottom-0 button')
      return btn?.textContent?.includes('Submit')
    }, { timeout: 5000 }).catch(() => {})

    await dismissCookieConsent(page)

    // Submit
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.click({ force: true })

    // Verify 100% score
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible()

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    expect(scoreText).toBe('100%')

    console.log(`Test passed: ${WORKSHEET_SLUG} - Score: ${scoreText}`)
  })
})
```

## Input Types to Handle

### 1. Simple Text Input (most common)
```html
<input type="text" data-sub-id="1" placeholder="Type your answer">
```
Fill with: `await input.pressSequentially(answer, { delay: 50 })`

### 2. Number Sequence Questions
Multiple inputs in a row (e.g., "Fill in: 2, 4, __, 8, __")
- Each blank has its own input
- Answers may be comma-separated in answer key: "6, 10"

### 3. Equation Questions
Format: "3 + __ = 7"
- Input embedded in equation
- Answer is the missing number

### 4. Multi-part Questions
One question with multiple inputs (e.g., matching)
- Answer key format: "A, B, C, D" or "1-A, 2-B, 3-C"

## Cookie Consent Handling
ALWAYS dismiss cookie consent before any click:
```typescript
await dismissCookieConsent(page)
```

## Verification Steps
1. **Page Load**: `.interactive-worksheet-container` visible
2. **Questions Found**: `.question-interactive` count > 0
3. **Inputs Filled**: All inputs have values
4. **Submit Enabled**: Button text includes "Submit Answers"
5. **Score Display**: Celebration overlay shows "100%"

## Common Issues & Fixes

### Issue: Inputs not filling
- Use `pressSequentially` instead of `fill` for React controlled inputs
- Add `delay: 50` for reliable state updates

### Issue: Submit button blocked
- Call `dismissCookieConsent(page)` before clicking
- Use `click({ force: true })` to bypass overlays

### Issue: Celebration not appearing
- Check if all required inputs were filled
- Verify button text was "Submit Answers" not "X remaining"

### Issue: Wrong score
- Verify answer extraction regex matches HTML format
- Check answer order matches input order

## Running the Test
```bash
# Headless (fast)
npx playwright test tests/e2e/interactive-{slug}.spec.ts

# Headed (visible browser)
npx playwright test tests/e2e/interactive-{slug}.spec.ts --headed

# Debug mode
npx playwright test tests/e2e/interactive-{slug}.spec.ts --debug
```

## Example Workflow

**User Request:**
> Create test for http://localhost:3000/library/early-addition-simple-addition-v1/interactive

**Agent Steps:**
1. Extract slug: `early-addition-simple-addition-v1`
2. Fetch worksheet HTML from Supabase or navigate and extract
3. Parse answer key from HTML
4. Generate test file with extracted answers
5. Run test to verify 100% score
6. Fix any issues using playwright-test-healer

## File Naming Convention
- Test file: `tests/e2e/interactive-{worksheet-slug}.spec.ts`
- One file per worksheet
- Descriptive test names including worksheet topic
