import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'y5-fractions-p1'
// Q1: 4 inputs | Q2: 4 inputs | Q3: 2 inputs | Q4: 4 inputs | Q5: 4 inputs = 18 total
const WORKSHEET_ANSWERS = ["2⅚", "4⅖", "3⅛", "3¹/₁₀", "23", "22", "23", "51", "13", "13", "4¼", "9/4", "26/4", "6½", "3 × 8", "24", "24 + 5", "29/8"]

async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') (el as HTMLElement).remove()
    })
  })
}

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }) => {
    test.setTimeout(60000)
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`, { waitUntil: 'domcontentloaded' })

    // Wait for the worksheet to load (dismiss cookie consent early)
    await dismissCookieConsent(page)

    // Wait for loading to complete and inputs to appear
    await page.waitForSelector('.interactive-worksheet-container input[type="text"]:not([disabled])', { timeout: 30000 })
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} inputs, have ${WORKSHEET_ANSWERS.length} answers`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.fill(WORKSHEET_ANSWERS[i])
    }

    await dismissCookieConsent(page)
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
