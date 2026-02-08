import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'equivalent-fractions-practice-3-ordering-reasoning'
const WORKSHEET_ANSWERS = ["3","4","3","4","3","4","4","5","6","12","6","12","6","8","9","1","2","2","3","3","4","16","2","3","wrong","2","5","3","5","3"]

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
    await page.screenshot({ path: `test-results/quality-screenshots/equivalent-fractions-practice-3-ordering-reasoning.png`, fullPage: true })

    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
