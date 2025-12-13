import { test, expect } from '@playwright/test'

test.describe('Interactive Worksheet: number-counting-more-or-less (Farm Animals)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the interactive worksheet
    await page.goto('http://localhost:3000/library/number-counting-more-or-less/interactive')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Remove cookie consent if present
    const cookieConsent = page.locator('.cookie-consent-container')
    if (await cookieConsent.isVisible()) {
      await cookieConsent.evaluate(el => el.remove())
    }
  })

  test('should complete worksheet and achieve 100% score', async ({ page }) => {
    // Answer key from V1: B, A, Emma, A, Oliver
    const answers = ['B', 'A', 'Emma', 'A', 'Oliver']

    // Wait for interactive worksheet to load
    await page.waitForSelector('.question', { timeout: 10000 })

    // Get all input fields
    const inputs = await page.locator('input[type="text"]').all()
    console.log(`Found ${inputs.length} input fields`)

    // Fill in all answers
    for (let i = 0; i < Math.min(answers.length, inputs.length); i++) {
      const answer = answers[i]
      const input = inputs[i]

      // Wait for input to be visible
      await input.waitFor({ state: 'visible', timeout: 5000 })

      // Fill the answer
      await input.fill('')
      await input.pressSequentially(answer, { delay: 50 })

      console.log(`Q${i + 1}: Filled "${answer}"`)
    }

    // Remove cookie consent again before clicking submit
    await page.evaluate(() => {
      document.querySelector('.cookie-consent-container')?.remove()
    })

    // Click Submit button
    const submitButton = page.locator('button:has-text("Submit Answers"), button:has-text("Check Answers")')
    await submitButton.waitFor({ state: 'visible', timeout: 5000 })
    await submitButton.click({ force: true })

    // Wait for results - celebration overlay appears with score
    await page.waitForSelector('.fixed.inset-0.z-50', { timeout: 10000 })

    // Check score from celebration overlay
    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log('Score:', scoreText)

    // Verify 100% score
    expect(scoreText).toMatch(/100%|5\/5|5 out of 5/)
  })
})