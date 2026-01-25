import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'fractions-greater-than-1-practice-4-advanced-reasoning'
// Q1: Division to mixed (14÷5=2r4=2 4/5, (3×3)+2=11/3, 19/6=3 1/6) → 9 inputs
// Q2: Equivalents (1½=6/4=9/6, 2⅓=7/3=14/6, 1¾=7/4=14/8) → 6 inputs
// Q3: Add fractions (8/4=2, 9/3=3, 11/5=2 1/5) → 7 inputs
// Q4: Word problem (21/4, 21/4, 5 1/4) → 4 inputs
// Q5: Create equations (3/2+2/2, 6/4+4/4, 9/6+6/6) → 8 inputs
// Total: 34 inputs
const WORKSHEET_ANSWERS = ["2", "4", "2", "4", "3", "2", "11", "3", "1", "6", "9", "7", "14", "7", "14", "8", "2", "9", "3", "11", "2", "1", "21", "21", "5", "1", "3", "2", "6", "4", "9", "6", "6", "6"]

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
    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
