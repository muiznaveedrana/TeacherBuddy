import { test, expect } from '@playwright/test'

const WORKSHEETS = [
  {
    slug: 'finding-fractions-fruit-theme',
    name: 'Easy - Fruit Theme',
    answers: ["4","12","3","6","4","8","half","4"]
  },
  {
    slug: 'finding-fractions-shape-theme',
    name: 'Average - Shape Theme',
    answers: ["3","16","8","4","5","10","half","9"]
  },
  {
    slug: 'finding-fractions-party-theme',
    name: 'Hard - Party Theme',
    answers: ["4","20","15","15","6","12","half","12"]
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
  test.describe(`Interactive: Finding Fractions Mixed - ${ws.name}`, () => {
    test(`should complete with 100% score`, async ({ page }) => {
      await page.goto(`/library/${ws.slug}/interactive`)
      await dismissCookieConsent(page)
      await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

      const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
      const inputCount = await inputs.count()
      console.log(`[${ws.name}] Found ${inputCount} inputs, have ${ws.answers.length} answers`)

      for (let i = 0; i < inputCount && i < ws.answers.length; i++) {
        const input = inputs.nth(i)
        await input.scrollIntoViewIfNeeded()
        await input.click()
        await input.pressSequentially(ws.answers[i], { delay: 50 })
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
