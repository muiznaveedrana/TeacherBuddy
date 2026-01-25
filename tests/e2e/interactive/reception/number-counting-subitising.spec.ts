import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'number-counting-subitising'
// Answer key extracted from worksheet database:
// Q1: How many dots can you see? = 5
// Q2: How many stars? = 4
// Q3: How many apples? = 3
// Q4: Which shows 3? = B
// Q5: How many dots altogether? = 4
const WORKSHEET_ANSWERS = ["5", "4", "3", "B", "4"]

async function dismissCookieConsent(page: any) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach((el: any) => {
      if (el.style?.position === 'fixed') el.remove()
    })
  })
}

test.describe(`Interactive: ${WORKSHEET_SLUG} (Reception Subitising)`, () => {
  test('should complete with 100% score', async ({ page }) => {
    // Navigate to the interactive worksheet
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    
    // Wait for interactive container to be visible
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    // Get all input fields
    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} inputs, have ${WORKSHEET_ANSWERS.length} answers`)

    // Fill in all answers with 50ms delay
    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
    }

    // Dismiss cookie consent again before clicking submit
    await dismissCookieConsent(page)
    
    // Click Submit button
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.click({ force: true })

    // Wait for celebration overlay (result screen)
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    // Verify 100% score
    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
