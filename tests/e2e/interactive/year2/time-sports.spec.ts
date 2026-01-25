import { test, expect } from '@playwright/test'

/**
 * Interactive Worksheet Test: Measurement - Time Sports
 * Year Group: Year 2
 * Topic: measurement
 * Subtopic: time-sports
 *
 * Auto-generated test that verifies 100% score
 */

const WORKSHEET_SLUG = 'measurement-time-sports'
const WORKSHEET_ANSWERS = ["9:00","10","00","1","00","5","30","11:30","3","2","1","4:15","Yes"];

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
    // Q1: Clock shows 12:00 (answer: 12:00)
  // Q2: Clocks A=12:30, B=1:30, C=3:15 (answers: 12,30,1,30,3,15)
  // Q3: 1:15 + 30min = 1:45 (answer: 1:45)
  // Q4: Order 3:15,11:00,8:45 earliest to latest = 1,3,2 (answers: 1,3,2)
  // Q5a: 12:30 + 45min = 1:15 (answer: 1:15)
  // Q5b: Sam says minute hand on 3 means 3 o'clock (incorrect, answer: No)
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
