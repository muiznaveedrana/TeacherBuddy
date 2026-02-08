import { test, expect } from '@playwright/test'

/**
 * Interactive Worksheet Test: Measurement - Time
 * Year Group: Year 2
 * Topic: measurement
 * Subtopic: time
 *
 * Auto-generated test that verifies 100% score
 */

const WORKSHEET_SLUG = 'measurement-time'
// Q1: 8:30 (time shown on clock)
// Q2: Clock A (9:00), Clock B (12:00), Clock C (3:30) → 9, 00, 12, 00, 3, 30
// Q3: 9:00 + 30 minutes = 9:30
// Q4: Order times earliest to latest (11:45, 8:15, 2:30) → 3, 2, 1
// Q5: a) PE end time: 2:15, b) Is Tom correct? No
const WORKSHEET_ANSWERS = ["8:30","9","00","12","00","3","30","9:30","3","2","1","2:15","No"];

// Remove cookie consent overlay
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
    // FIXME: Database answer keys are corrupted for this worksheet
    // Q4: Database has "2" but should have "3, 2, 1" (ordering times earliest to latest: 2:30=1, 8:15=2, 11:45=3)
    // Q5: Database has "a) 2:15, a) 2:15" but should have "2:15, No" (PE end time and Tom's correctness)
    // Test answers are logically correct (3, 2, 1 for Q4 and 2:15, No for Q5)
    // Issue is in worksheet data quality, not test logic
    test.setTimeout(30000)

    // Navigate to interactive mode
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)

    // Wait for container
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 10000 })

    // Fill all text inputs with correct answers
    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} input fields`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.fill(WORKSHEET_ANSWERS[i])
    }

    // Wait for submit button
    await page.waitForFunction(() => {
      const btn = document.querySelector('.sticky.bottom-0 button')
      return btn?.textContent?.includes('Submit')
    }, { timeout: 5000 }).catch(() => {})

    await dismissCookieConsent(page)

    // Submit
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await page.screenshot({ path: `test-results/quality-screenshots/measurement-time.png`, fullPage: true })

    await submitButton.click({ force: true })

    // Verify celebration overlay and 100% score
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)

    // FAIL if not 100%
    expect(scoreText).toBe('100%')
  })
})
