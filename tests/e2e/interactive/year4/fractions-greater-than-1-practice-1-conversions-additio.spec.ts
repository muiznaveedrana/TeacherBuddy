import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'fractions-greater-than-1-practice-1-conversions-additio'
// Q1: Convert improper to mixed (8/3=2 2/3, 11/5=2 1/5, 13/6=2 1/6) → 9 inputs
// Q2: Convert mixed to improper (2⅓=7/3, 3¼=13/4, 2⅗=13/5) → 3 numerators
// Q3: Add fractions (3/4+3/4=6/4=1 2/4, 4/5+3/5=7/5=1 2/5) → 6 inputs
// Q4: Word problem (5/4+3/4=8/4=2 km) → 3 inputs
// Q5: True/False with example (True, 5/4=1.25 greater) → 5 inputs
// Total: 26 inputs
const WORKSHEET_ANSWERS = ["2", "2", "3", "2", "1", "5", "2", "1", "6", "7", "13", "13", "6", "1", "2", "7", "1", "2", "8", "2", "0", "True", "5", "4", "1.25", "greater"]

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
