import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'column-addition-4-digit-practice-1-multiple-carrying'
const WORKSHEET_ANSWERS = ["2789 + 4356 = 7145","b) 5678 + 2897 = 8575","3999 + 4567 = 8566","b) 6785 + 1999 = 8784","Missing digit: 4 (3446 + 2187 = 5653)","b) Missing digit: 3 (4567 + 3234 = 7801)","Step 1: 2456 + 3789 = 6245. Step 2: 6245 + 1234 = 7479. Total: 7479 sheep","4999 + 1 = 5000. Adding 1 to 9 makes 10","carry repeats 3 times (ones→tens→hundreds→thousands)"]

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
    test.setTimeout(15000)
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
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
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
