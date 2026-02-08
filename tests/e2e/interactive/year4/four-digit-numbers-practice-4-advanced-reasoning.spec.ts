import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'four-digit-numbers-practice-4-advanced-reasoning'
// Q1: 10/100/1000 more/less (5688,4202,9999,2990) = 4 inputs
// Q2: order largest to smallest (7823,7328,7283,7238) = 4 inputs
// Q3: table with 1000 less/more (4432,6432,7789,8789,2000,1000) = 6 inputs
// Q4: word problem (2845) = 1 input
// Q5: investigation (9753,3579,9753,3579,6174) = 5 inputs
// Total: 20 inputs
const WORKSHEET_ANSWERS = ["5688", "4202", "9999", "2990", "7823", "7328", "7283", "7238", "4432", "6432", "7789", "8789", "2000", "4000", "2845", "9753", "3579", "9753", "3579", "6174"]

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
    await page.screenshot({ path: `test-results/quality-screenshots/four-digit-numbers-practice-4-advanced-reasoning.png`, fullPage: true })

    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
