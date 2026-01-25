import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'fractions-greater-than-1-practice-2-comparing-convertin'
// Q1: Convert improper to mixed (10/3=3 1/3, 15/4=3 3/4, 17/5=3 2/5) → 6 inputs
// Q2: Comparison symbols (7/4<2, 3½<15/4, 9/3=3) → 3 inputs
// Q3: Table (2 1/4, 8/3, 2 1/5, Two and one fifth) → 6 inputs
// Q4: Word problem (12/6=2 0/6=2 rolls) → 4 inputs
// Q5: Error correction ((3×4)+1=13, 13/4) → 5 inputs
// Total: 24 inputs
const WORKSHEET_ANSWERS = ["3", "1", "3", "3", "3", "2", "<", "<", "=", "2", "1", "8", "2", "1", "Two and one fifth", "12", "2", "0", "2", "3", "4", "1", "13", "13"]

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
