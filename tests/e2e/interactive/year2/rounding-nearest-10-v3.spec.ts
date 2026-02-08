import { test, expect } from '@playwright/test'

/**
 * Interactive Worksheet Test: Rounding to Nearest 10 - Space
 * Year Group: Year 2
 * Topic: number-place-value
 * Subtopic: rounding-nearest-10
 *
 * Auto-generated test that verifies 100% score
 */

const WORKSHEET_SLUG = 'number-place-value-rounding-nearest-10-v3'
// Q1: 78 between 70 and 80, rounds to 80 (8>5)
// Q2: 84 closer to 80, rounds to 80 (4<5)
// Q3: 73→70, 86→90, 95→100, 61→60, 82→80, 97→100
// Q4: 92 rocks → 90
// Q5: 95 rounds to 90? No, rounds to 100 (5 rounds up)
const WORKSHEET_ANSWERS = ["40","50","40","50","50","30","50","50","40","50","50","60","No","50"];

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
      await input.fill('')
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
      await page.waitForTimeout(100)
    }

    // Wait for submit button
    await page.waitForFunction(() => {
      const btn = document.querySelector('.sticky.bottom-0 button')
      return btn?.textContent?.includes('Submit')
    }, { timeout: 5000 }).catch(() => {})

    await dismissCookieConsent(page)

    // Submit
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await page.screenshot({ path: `test-results/quality-screenshots/number-place-value-rounding-nearest-10-v3.png`, fullPage: true })

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
