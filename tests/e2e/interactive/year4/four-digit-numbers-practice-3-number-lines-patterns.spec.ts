import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'four-digit-numbers-practice-3-number-lines-patterns'
// Q1: 4 boxes, Q2: 2 boxes, Q3: 1 box, Q4: 5 boxes, Q5: 6 boxes = 18 total
const WORKSHEET_ANSWERS = [
  // Q1: sequence numbers (2000, 3000, [4000], 5000, [6000], 7000) and (1500, 2500, [3500], [4500], 5500)
  "4000", "6000", "3500", "4500",
  // Q2: number line points
  "4000", "6000",
  // Q3: number from clues
  "6485",
  // Q4: rounding (4532≈5000, 3687≈4000) and total (5000+4000=9000)
  "5000", "4000", "5000", "4000", "9000",
  // Q5: "This statement is [always] true", 1000, 999, 1000>999, "[always] true"
  "always", "1000", "999", "1000", "999", "always"
]

async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') (el as HTMLElement).remove()
    })
  })
}

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }) => {
    test.setTimeout(30000)
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} inputs, have ${WORKSHEET_ANSWERS.length} answers`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      await dismissCookieConsent(page)
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click({ force: true })
      await input.fill(WORKSHEET_ANSWERS[i])
    }

    await dismissCookieConsent(page)
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await page.screenshot({ path: `test-results/quality-screenshots/four-digit-numbers-practice-3-number-lines-patterns.png`, fullPage: true })

    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
