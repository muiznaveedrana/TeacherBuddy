import { test, expect } from '@playwright/test'

/**
 * Interactive Worksheet Test: Fractions - Recognising Fractions Test
 * Year Group: Year 2
 * Auto-generated test that verifies 100% score
 */

const WORKSHEET_SLUG = 'fractions-recognising-fractions-test'
// Same structure as fractions-recognising-fractions
// Q1: 1/2 (one half of the circle is shaded)
// Q2: A (Shape A shows 1/2)
// Q3: a) 2  b) 1 (Rectangle has 2 equal parts, 1 is shaded)
// Q4: a) 1/2  b) 1/2  c) 1/4  d) 3/4
// Q5: a) 1  b) 1/4 (Emma ate 1 slice out of 4, which is 1/4 of the pizza)
const WORKSHEET_ANSWERS = [
  "1/2",
  "A",
  "2", "1",
  "1/2", "1/2", "1/4", "3/4",
  "1"
]

async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="overlay"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') el.remove()
    })
  })
}

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }, testInfo) => {
    testInfo.setTimeout(60000)

    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} input fields, have ${WORKSHEET_ANSWERS.length} answers`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
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
