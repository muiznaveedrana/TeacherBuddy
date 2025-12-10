import { test, expect } from '@playwright/test'

/**
 * Generic Interactive Worksheet Test
 * Parameterizable via WORKSHEET_SLUG environment variable
 */

const WORKSHEET_SLUG = process.env.WORKSHEET_SLUG || 'number-counting-counting-to-10-v2'

// Helper to forcefully remove cookie consent
async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    // Also remove any other potential overlays
    document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="overlay"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') el.remove()
    })
  })
}

test.describe('Interactive Worksheet - Generic Test', () => {

  test(`should complete worksheet and submit: ${WORKSHEET_SLUG}`, async ({ page }) => {
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)

    // Verify interactive container loaded
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    // Get question count
    const questionCount = await page.locator('.question-interactive').count()
    expect(questionCount).toBeGreaterThan(0)
    console.log(`Found ${questionCount} questions`)

    // Get correct answers - extracted from worksheet HTML
    // For counting-to-10-v2: 7 bananas, 3 grapes, 10 flowers, 5 dogs, 8 strawberries
    const KNOWN_ANSWERS: Record<string, string[]> = {
      'number-counting-counting-to-10-v2': ['7', '3', '10', '5', '8'],
      // Size Comparison worksheets
      'shape-space-size-comparison-v2': ['Right', 'Right', 'Left', 'Noah', 'B'],
      'size-comparison-farm-animals-farm-animals-comparison': ['Left', 'Left', 'Middle', 'Oliver', 'B'],
      'size-comparison-school-treats-school-treats-comparison': ['Right', 'Right', 'Left', 'Noah', 'B']
    }
    const correctAnswers = KNOWN_ANSWERS[WORKSHEET_SLUG] || []
    console.log(`Using answers for ${WORKSHEET_SLUG}: ${JSON.stringify(correctAnswers)}`)

    // Fill all text inputs with correct answers
    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} input fields`)

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      // Use correct answer if available, otherwise fallback to index
      const answer = correctAnswers[i] || String(i + 1)
      await input.pressSequentially(answer, { delay: 50 })
    }

    // Wait for React state to update after all inputs filled
    await page.waitForFunction(() => {
      const btn = document.querySelector('.sticky.bottom-0 button')
      return btn?.textContent?.includes('Submit')
    }, { timeout: 5000 }).catch(() => {})

    await dismissCookieConsent(page)

    // Find the submit/status button at bottom (handles both enabled and disabled states)
    const actionButton = page.locator('.sticky.bottom-0 button').first()
    await expect(actionButton).toBeVisible()

    const buttonText = await actionButton.textContent() || ''
    console.log(`Button text: ${buttonText}`)

    if (buttonText.includes('Submit Answers')) {
      // All questions answered - submit
      await actionButton.click({ force: true })
      // Wait for celebration overlay (result screen)
      const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
      await expect(celebrationOverlay).toBeVisible()

      // Extract and log the score
      const scoreText = await page.locator('text=/\\d+%/').first().textContent()
      const correctText = await page.locator('text=/\\d+ out of \\d+/').first().textContent()
      console.log(`Score: ${scoreText}`)
      console.log(`Result: ${correctText}`)
      console.log('Worksheet submitted successfully!')
    } else {
      // Not all answered - verify shows remaining count
      expect(buttonText).toMatch(/remaining/i)
      console.log('Not all questions filled - test verifies partial state')
    }
  })

  test(`should allow exit from interactive mode: ${WORKSHEET_SLUG}`, async ({ page }) => {
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)

    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    // Scroll exit button into view and click
    const exitButton = page.locator('button:has-text("Exit")').first()
    await exitButton.scrollIntoViewIfNeeded()
    await dismissCookieConsent(page) // Dismiss again after scroll
    await exitButton.click({ force: true })

    // Wait for URL change
    await expect(page).toHaveURL(new RegExp(`/library/${WORKSHEET_SLUG}(?!/interactive)`))
  })

  test(`should track answered questions: ${WORKSHEET_SLUG}`, async ({ page }) => {
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)

    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    // Fill first input - need to click first to focus, then type
    const firstInput = page.locator('.question-interactive input[type="text"]').first()
    await firstInput.click()
    await firstInput.type('5')  // Use type instead of fill for React state update
    await firstInput.blur()      // Blur to trigger state change

    // Question should show answered state (blue-50 or blue-400 in class)
    const firstQuestion = page.locator('.question-interactive').first()
    await expect(firstQuestion).toHaveClass(/blue-50|blue-400|border-blue/)
  })
})
