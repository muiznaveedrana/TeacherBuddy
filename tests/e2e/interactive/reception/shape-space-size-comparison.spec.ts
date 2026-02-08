import { test, expect } from '@playwright/test'

/**
 * Interactive Worksheet Test: Shape Space - Size Comparison
 * Year Group: Reception
 * Topic: shape-space
 * Subtopic: size-comparison
 * 
 * Auto-generated test that verifies 100% score
 */

const WORKSHEET_SLUG = 'shape-space-size-comparison'
const WORKSHEET_ANSWERS = ['B', 'B', 'B', 'A', 'B, C, A']

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

    // 1. Navigate to the shape-space-size-comparison interactive worksheet
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    
    // 2. Dismiss cookie consent before interacting with inputs
    await page.getByRole('button', { name: 'Decline cookies' }).click()

    // Wait for container
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 10000 })

    // Fill all text inputs with correct answers
    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} input fields`)

    // 3. Fill in answer for question 1: B (bigger apple)
    await inputs.nth(0).click()
    await inputs.nth(0).pressSequentially(WORKSHEET_ANSWERS[0], { delay: 50 })

    // 4. Fill in answer for question 2: B (smaller star)
    await inputs.nth(1).click()
    await inputs.nth(1).pressSequentially(WORKSHEET_ANSWERS[1], { delay: 50 })

    // 5. Fill in answer for question 3: B (biggest ball)
    await inputs.nth(2).click()
    await inputs.nth(2).pressSequentially(WORKSHEET_ANSWERS[2], { delay: 50 })

    // 6. Fill in answer for question 4: A (smallest flower)
    await inputs.nth(3).click()
    await inputs.nth(3).pressSequentially(WORKSHEET_ANSWERS[3], { delay: 50 })

    // 7. Fill in answer for question 5: B, C, A (order from smallest to biggest)
    await inputs.nth(4).click()
    await inputs.nth(4).pressSequentially(WORKSHEET_ANSWERS[4], { delay: 50 })

    // Wait for submit button
    await page.waitForFunction(() => {
      const btn = document.querySelector('.sticky.bottom-0 button')
      return btn?.textContent?.includes('Submit')
    }, { timeout: 5000 }).catch(() => {})

    await dismissCookieConsent(page)

    // 8. Submit the completed worksheet to verify 100% score
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await page.screenshot({ path: `test-results/quality-screenshots/shape-space-size-comparison.png`, fullPage: true })

    await submitButton.click({ force: true })

    // 9. Wait for celebration overlay
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    // 10. Verify 100% score is displayed
    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)

    // FAIL if not 100%
    expect(scoreText).toBe('100%')
  })
})
