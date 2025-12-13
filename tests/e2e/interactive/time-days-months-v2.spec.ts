import { test, expect } from '@playwright/test'

test.describe('Interactive Worksheet: measurement-time-days-months-v2 (V2 - Easy)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the interactive worksheet
    await page.goto('http://localhost:3000/library/measurement-time-days-months-v2/interactive')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Remove cookie consent if present
    const cookieConsent = page.locator('.cookie-consent-container')
    if (await cookieConsent.isVisible()) {
      await cookieConsent.evaluate(el => el.remove())
    }
  })

  test('should complete worksheet and achieve 100% score', async ({ page }) => {
    // Answer key from V2 - 5 inputs (Q1 duplicate removed from database)
    // Q1: Sunday (missing day in sequence)
    // Q2: Tuesday (yesterday)
    // Q3: May (month after April)
    // Q4: Winter (season for December)
    // Q5: September (Tom's birthday - 2 months after July)
    const answers = [
      'Sunday',
      'Tuesday',
      'May',
      'Winter',
      'September'
    ]

    // Wait for interactive worksheet to fully load (React hydration)
    await page.waitForTimeout(5000)

    // Wait for interactive worksheet container
    await page.waitForSelector('.interactive-worksheet-container', { timeout: 15000 })

    // Get ALL text inputs in the worksheet
    const inputs = await page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])').all()
    console.log(`Found ${inputs.length} inputs`)

    // Fill in all answers
    for (let i = 0; i < Math.min(answers.length, inputs.length); i++) {
      const answer = answers[i]
      const input = inputs[i]

      await input.scrollIntoViewIfNeeded()
      await input.click({ force: true })
      await input.fill('')
      await input.pressSequentially(answer, { delay: 50 })

      console.log(`Q${i + 1}: Filled "${answer}"`)
    }

    // Remove cookie consent again before clicking submit
    await page.evaluate(() => {
      document.querySelector('.cookie-consent-container')?.remove()
    })

    // Click Submit button
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.waitFor({ state: 'visible', timeout: 5000 })
    await submitButton.click({ force: true })

    // Wait for celebration overlay
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log('Score:', scoreText)

    // Verify 100% score
    expect(scoreText).toBe('100%')
  })
})
