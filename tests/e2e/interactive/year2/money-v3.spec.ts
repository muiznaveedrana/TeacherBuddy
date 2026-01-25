import { test, expect } from '@playwright/test'

/**
 * Interactive Worksheet Test: Measurement - Money
 * Year Group: Year 2
 * Topic: measurement
 * Subtopic: money
 *
 * Auto-generated test that verifies 100% score
 */

const WORKSHEET_SLUG = 'measurement-money-v3'
const WORKSHEET_ANSWERS = ["97","85","Ruby","32","75"]

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
    test.setTimeout(60000)

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
