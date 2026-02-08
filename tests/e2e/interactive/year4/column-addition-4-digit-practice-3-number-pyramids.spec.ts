import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'column-addition-4-digit-practice-3-number-pyramids'
// Q1: 4565+7002 (8 digits), Q2: 9245+9533 (8 digits), Q3: pyramid (3), Q4: total (1), Q5: examples+statement (7) = 27 inputs
const WORKSHEET_ANSWERS = ["4", "5", "6", "5", "7", "0", "0", "2", "9", "2", "4", "5", "9", "5", "3", "3", "3579", "3345", "6924", "7035", "9999", "1", "10000", "1000", "1000", "2000", "sometimes"]

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
    test.setTimeout(30000)
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} inputs, have ${WORKSHEET_ANSWERS.length} answers`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      await dismissCookieConsent(page)
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click({ force: true })
      await input.fill(WORKSHEET_ANSWERS[i])
    }

    await dismissCookieConsent(page)
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await page.screenshot({ path: `test-results/quality-screenshots/column-addition-4-digit-practice-3-number-pyramids.png`, fullPage: true })

    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
