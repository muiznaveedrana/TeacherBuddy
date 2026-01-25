import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'multiplication-division-times-tables-2-5-10'
// Answers: Q1(1), Q2a(1), Q2b(1), Q3a-f(6), Q4(1), Q5a(1), Q5b(1) = 12 total
const WORKSHEET_ANSWERS = ["6","15","15","4","20","30","10","10","40","40","No","15"];

async function dismissCookieConsent(page: any) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach((el: any) => {
      if (el.style?.position === 'fixed') el.remove()
    })
  })
}

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  // FIXME: Database answer key issue - Q5 multi-part answer incomplete
  // Pattern similar to other Year 2 worksheets with Yes/No questions
  test('should complete with 100% score', async ({ page }) => {
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 15000 })

    // Fill all text inputs
    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()

    console.log(`Found ${inputCount} inputs, have ${WORKSHEET_ANSWERS.length} answers`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.fill(WORKSHEET_ANSWERS[i])
    }

    await dismissCookieConsent(page)

    // Submit
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.click({ force: true })

    // Verify 100% score
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    expect(scoreText).toBe('100%')
  })
})
