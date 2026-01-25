import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'number-counting-early-addition-v4'
const WORKSHEET_ANSWERS = ["5", "7", "6", "7", "B"]

async function dismissCookieConsent(page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') (el as HTMLElement).remove()
    })
  })
}

test.describe(`Interactive: Early Addition Mixed Layout`, () => {
  test('should complete with 100% score', async ({ page }) => {
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container').first()).toBeVisible({ timeout: 10000 })

    await page.waitForTimeout(2000)
    await dismissCookieConsent(page)

    const inputs = page.locator('input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} inputs, have ${WORKSHEET_ANSWERS.length} answers`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await dismissCookieConsent(page)
      await input.click()
      await input.fill('')
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
    }

    await dismissCookieConsent(page)
    const submitButton = page.locator('button:has-text("Answer all"), button:has-text("Check"), .sticky.bottom-0 button').first()
    await submitButton.scrollIntoViewIfNeeded()
    await submitButton.click({ force: true })

    await page.waitForTimeout(3000)
    const scoreLocator = page.locator('text=/\\d+%/')
    await expect(scoreLocator.first()).toBeVisible({ timeout: 10000 })
    const scoreText = await scoreLocator.first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
