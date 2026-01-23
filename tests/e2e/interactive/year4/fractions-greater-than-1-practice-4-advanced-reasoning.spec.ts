import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'fractions-greater-than-1-practice-4-advanced-reasoning'
const WORKSHEET_ANSWERS = ["14 ÷ 5 = 2 remainder 4 = 2 4/5","b) (3 × 3) + 2 = 11/3","c) 19/6 = 3 1/6","1½ = 6/4 = 9/6","b) 2⅓ = 7/3 = 14/6","c) 1¾ = 7/4 = 14/8","5/4 + 3/4 = 8/4 = 2","b) 7/3 + 2/3 = 9/3 = 3","c) 7/5 + 4/5 = 11/5 = 2 1/5","7/4 + 9/4 + 5/4 = 21/4 boxes","b) 21/4 = 5 1/4 boxes","Examples: 3/2 + 2/2 = 5/2","6/4 + 4/4 = 10/4","1 + 1½ = 2½ (or 9/6 + 6/6","etc.)"]

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
    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
