import { test, expect } from '@playwright/test'

/**
 * Interactive Worksheet Test: Number Place Value - Number Bonds 10
 * Year Group: Year 1
 * Topic: number-place-value
 * Subtopic: number-bonds-10
 *
 * Auto-generated test that verifies 100% score
 */

const WORKSHEET_SLUG = 'number-place-value-number-bonds-10-v3'
// 11 inputs for this worksheet - each input is a number bond component
const WORKSHEET_ANSWERS = ["2", "3", "7", "8", "5", "5", "8", "3", "10", "5", "2"]

// Remove cookie consent overlay
async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="overlay"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') el.remove()
    })
  })
}

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }) => {
    // Navigate to interactive mode
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)

    // Wait for container
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    // Wait for all content to load
    await page.waitForTimeout(2000)

    // Try multiple selectors to find ALL inputs (including those in bond grids, rainbow bonds, etc.)
    let inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    let inputCount = await inputs.count()
    console.log(`Found ${inputCount} input fields with main selector`)

    // If we don't have enough inputs, try alternative selector
    if (inputCount < WORKSHEET_ANSWERS.length) {
      console.log(`Looking for more inputs...`)
      inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([readonly])')
      inputCount = await inputs.count()
      console.log(`Found ${inputCount} input fields with alternative selector`)
    }

    console.log(`Final count: ${inputCount} input fields, have ${WORKSHEET_ANSWERS.length} answers`)

    // Log details about all found inputs
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)
      const value = await input.inputValue()
      const placeholder = await input.getAttribute('placeholder')
      const visible = await input.isVisible()
      console.log(`Input ${i}: value="${value}", placeholder="${placeholder}", visible=${visible}`)
    }

    // Fill each input with the corresponding answer (use only as many answers as there are inputs)
    const answersToUse = Math.min(inputCount, WORKSHEET_ANSWERS.length)
    console.log(`Will fill ${answersToUse} inputs`)

    for (let i = 0; i < answersToUse; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.waitFor({ state: 'visible', timeout: 5000 })
      await input.click()
      await input.fill(WORKSHEET_ANSWERS[i])
      await page.waitForTimeout(200)
      console.log(`Filled input ${i + 1}/${answersToUse}: "${WORKSHEET_ANSWERS[i]}"`)
    }

    // Check if there are more inputs after filling
    await page.waitForTimeout(1000)
    const inputCountAfter = await page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])').count()
    console.log(`Input count after filling: ${inputCountAfter}`)

    // Verify all inputs were filled
    const buttonText = await page.locator('.sticky.bottom-0 button').first().textContent()
    console.log(`Button text after filling: "${buttonText}"`)

    // Wait for submit button
    await page.waitForFunction(() => {
      const btn = document.querySelector('.sticky.bottom-0 button')
      return btn?.textContent?.includes('Submit')
    }, { timeout: 5000 }).catch(() => {})

    await dismissCookieConsent(page)

    // Submit
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.click({ force: true })

    // Verify celebration overlay and 100% score
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)

    // FAIL if not 100%
    expect(scoreText).toBe('100%')
  })
})
