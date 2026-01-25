import { test, expect } from '@playwright/test'

/**
 * Interactive Worksheet Test: Measurement - Time Weekend
 * Year Group: Year 2
 * Topic: measurement
 * Subtopic: time-weekend
 *
 * Auto-generated test that verifies 100% score
 */

const WORKSHEET_SLUG = 'measurement-time-weekend'
const WORKSHEET_ANSWERS = ["8:00","9","30","12","30","4","00","10:00","3","2","1","3:30","Yes"];

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
    // Q1: Clock shows 11:20 (answer provided: 11:20)
  // Q2: Clocks A=6:30, B=12:30, C=3:15 (answers: 6,30,12,30,3,15)
  // Q3: 3:00 + 45min = 3:45 (answer: 3:45)
  // Q4: Order 7:30,10:15,4:45 earliest to latest = 1,3,2 (answers: 1,3,2)
  // Q5a: 11:00 + 30min = 11:30 (answer: 11:30)
  // Q5b: Emma says short hand=minutes, long hand=hours (incorrect, answer: No)
  test('should complete with 100% score', async ({ page }) => {
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
      await dismissCookieConsent(page)
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.fill(WORKSHEET_ANSWERS[i])
    }

    await dismissCookieConsent(page)
    const submitButton = page.locator('.sticky.bottom-0 button').first()
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
