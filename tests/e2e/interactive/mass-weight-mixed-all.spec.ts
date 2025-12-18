import { test, expect } from '@playwright/test'

const WORKSHEETS = [
  {
    slug: 'mass-and-weight-kitchen-fun-kitchen-practice',
    name: 'Easy - Kitchen Fun',
    answers: ["apple", "30", "500", "1", "3", "2", "500", "1000", "No"]
  },
  {
    slug: 'mass-and-weight-at-the-shop-shopping-practice',
    name: 'Average - At the Shop',
    answers: ["bread", "150", "750", "2", "1", "3", "1000", "2000", "No"]
  },
  {
    slug: 'mass-and-weight-science-lab-science-practice',
    name: 'Hard - Science Lab',
    answers: ["rock", "230", "1250", "1", "3", "2", "1500", "3000", "No"]
  }
]

async function dismissCookieConsent(page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') (el as HTMLElement).remove()
    })
  })
}

for (const ws of WORKSHEETS) {
  test.describe(`Interactive: Mass and Weight Mixed - ${ws.name}`, () => {
    test(`should complete with 100% score`, async ({ page }) => {
      test.setTimeout(60000)
      await page.goto(`/library/${ws.slug}/interactive`)
      await dismissCookieConsent(page)
      await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

      const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
      const inputCount = await inputs.count()
      console.log(`[${ws.name}] Found ${inputCount} inputs, have ${ws.answers.length} answers`)

      for (let i = 0; i < inputCount && i < ws.answers.length; i++) {
        const input = inputs.nth(i)
        await input.scrollIntoViewIfNeeded()
        await input.click({ force: true })
        await input.fill(ws.answers[i])
      }

      await dismissCookieConsent(page)
      const submitButton = page.locator('.sticky.bottom-0 button').first()
      await submitButton.click({ force: true })

      const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
      await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

      const scoreText = await page.locator('text=/\\d+%/').first().textContent()
      console.log(`[${ws.name}] Score: ${scoreText}`)
      expect(scoreText).toBe('100%')
    })
  })
}
