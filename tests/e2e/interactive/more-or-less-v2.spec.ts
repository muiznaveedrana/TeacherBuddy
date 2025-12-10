import { test, expect } from '@playwright/test'

test.describe('Interactive Worksheet: number-counting-more-or-less-v2 (School Supplies)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the interactive worksheet
    await page.goto('http://localhost:3000/worksheets/number-counting-more-or-less-v2')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Remove cookie consent if present
    const cookieConsent = page.locator('.cookie-consent-container')
    if (await cookieConsent.isVisible()) {
      await cookieConsent.evaluate(el => el.remove())
    }
  })

  test('should complete worksheet and achieve 100% score', async ({ page }) => {
    // Answer key from V2: B, A, Ava, A, Ben
    const answers = ['B', 'A', 'Ava', 'A', 'Ben']

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

    // Click Submit button
    const submitButton = page.locator('button:has-text("Submit Answers"), button:has-text("Check Answers")')
    await submitButton.waitFor({ state: 'visible', timeout: 5000 })
    await submitButton.click()

    // Wait for results
    await page.waitForSelector('.score-display, [class*="score"], text=/Score:|Your Score/', { timeout: 10000 })

    // Check score
    const scoreText = await page.locator('.score-display, [class*="score"], text=/Score:|Your Score/').first().textContent()
    console.log('Score:', scoreText)

    // Verify 100% score
    expect(scoreText).toMatch(/100%|5\/5|5 out of 5/)
  })
})