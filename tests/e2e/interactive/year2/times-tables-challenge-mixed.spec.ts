import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'times-tables-2-5-10-challenge-mixed-problem-solving'
// Q1: 20, 20, 5, 4
// Q2: 12, 6, 40, 8, 70, 7
// Q3: =, > (9x2=18 > 3x5=15)
// Q4: 30, 20, Emma, 10
// Q5: Always, Sometimes
const WORKSHEET_ANSWERS = [
  "20", "20", "5", "4",
  "12", "6", "40", "8", "70", "7",
  "=", ">",
  "30", "20", "Emma", "10",
  "Always", "Sometimes"
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
    testInfo.setTimeout(120000)
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} inputs, have ${WORKSHEET_ANSWERS.length} answers`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.fill(WORKSHEET_ANSWERS[i])
    }

    await dismissCookieConsent(page)
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await page.screenshot({ path: `test-results/quality-screenshots/times-tables-2-5-10-challenge-mixed-problem-solving.png`, fullPage: true })

    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
