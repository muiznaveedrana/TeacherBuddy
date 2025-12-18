import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'measurement-capacity-v2'
const WORKSHEET_ANSWERS = ['A', 'B', 'A', 'C', 'B']

test.describe(`Interactive: Capacity Mixed Layout`, () => {
  test('should complete with 100% score', async ({ page }) => {
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await page.waitForLoadState('networkidle')

    // Remove cookie consent if present
    await page.evaluate(() => {
      document.querySelector('.cookie-consent-container')?.remove()
    })

    // Fill in answers
    const inputs = page.locator('input[type="text"]')
    const inputCount = await inputs.count()

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      await inputs.nth(i).click()
      await inputs.nth(i).pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
    }

    // Remove cookie consent again before submit
    await page.evaluate(() => {
      document.querySelector('.cookie-consent-container')?.remove()
    })

    // Submit worksheet
    const submitButton = page.locator('button:has-text("Submit"), button:has-text("Check Answers")')
    await submitButton.click({ force: true })

    // Wait for score popup
    const scoreElement = page.locator('.fixed.inset-0 >> text=/\\d+%/')
      .first()
      .or(page.locator('text=/\\d+%/').first())

    await expect(scoreElement).toBeVisible({ timeout: 10000 })

    const scoreText = await scoreElement.textContent()
    expect(scoreText).toBe('100%')
  })
})
