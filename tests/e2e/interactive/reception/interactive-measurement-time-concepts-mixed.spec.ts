import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'measurement-time-concepts'
const WORKSHEET_ANSWERS = ['A', 'A', 'B', 'A', 'C']

async function dismissCookieConsent(page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') (el as HTMLElement).remove()
    })
  })
}

test.describe(`Interactive: Time Concepts Mixed Layout`, () => {
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

    // Click submit button
    const submitButton = page.locator('button:has-text("Answer all"), button:has-text("Check Answers"), .sticky.bottom-0 button').first()
    await submitButton.scrollIntoViewIfNeeded()
    await page.screenshot({ path: `test-results/quality-screenshots/measurement-time-concepts.png`, fullPage: true })

    await submitButton.click({ force: true })

    // Wait for celebration modal or score display
    await page.waitForTimeout(2000)

    // Try to find score in celebration popup or page
    const scoreElement = page.locator('.fixed.inset-0 >> text=/\\d+%/').first()
      .or(page.locator('text=/\\d+%/').first())

    await expect(scoreElement).toBeVisible({ timeout: 15000 })
    const scoreText = await scoreElement.textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
