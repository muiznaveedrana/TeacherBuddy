import { test, expect } from '@playwright/test'

test.describe('Interactive Worksheet: measurement-time-days-months-v3 (V3 - Hard)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the interactive worksheet
    await page.goto('http://localhost:3000/library/measurement-time-days-months-v3/interactive')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Remove cookie consent if present
    const cookieConsent = page.locator('.cookie-consent-container')
    if (await cookieConsent.isVisible()) {
      await cookieConsent.evaluate(el => el.remove())
    }
  })

  test('should complete worksheet and achieve 100% score', async ({ page }) => {
    // Answer key from V3 - Note: Q5 needs just "3" not full text
    const answers = [
      'The missing day is Wednesday',
      'Yesterday was Saturday',
      'The month after August is September',
      'January is in the Winter season.',
      '3'  // Just the number, as span wraps only this part
    ]

    // Wait for interactive worksheet to fully load (React hydration)
    await page.waitForTimeout(5000)

    // Wait for input fields to be ready
    await page.waitForSelector('input[type="text"]', { timeout: 15000 })

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

    // Scroll to find submit button
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)

    // Click Submit button
    const submitButton = page.locator('button:has-text("Submit Answers"), button:has-text("Check Answers"), button:has-text("Submit")')
    await submitButton.waitFor({ state: 'visible', timeout: 10000 })
    await submitButton.click()

    // Wait for results to appear
    await page.waitForTimeout(2000)

    // Look for score text - it might be in different formats
    const scoreElement = page.locator('text=/Score:|Your Score|\\d+\\/5|\\d+%/').first()
    await scoreElement.waitFor({ state: 'visible', timeout: 10000 })

    const scoreText = await scoreElement.textContent()
    console.log('Score:', scoreText)

    // Verify 100% score (5/5 or 100%)
    expect(scoreText).toMatch(/5\/5|100%|5 out of 5/)
  })
})
