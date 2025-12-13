import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'addition-subtraction-word-problems-v3'
// Q1-Q3: 1 input each, Q4: 4 inputs, Q5: 6 inputs = 13 total
// Q4: 60-18=[42]p, [42]p-25=[17]p, Jack has [17]p
// Q5: 27-18=[9], 18+14=[32] cookies, [32]+27=[59] treats, more cupcakes=[9], treats=[59]
const ANSWERS = ['35', '27', '21', '42', '42', '17', '17', '9', '32', '32', '59', '9', '59']

async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="overlay"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') el.remove()
    })
  })
}

test.describe('Interactive Worksheet: Word Problems Y2 V3', () => {
  test('should complete worksheet and achieve 100% score', async ({ page }) => {
    test.setTimeout(30000)

    // Navigate to interactive mode
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)

    // Wait for container
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 10000 })

    // Fill all text inputs with correct answers
    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} input fields`)

    for (let i = 0; i < inputCount && i < ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.pressSequentially(ANSWERS[i], { delay: 50 })
    }

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

    expect(scoreText).toBe('100%')
  })
})
