import { test, expect } from '@playwright/test'

const WORKSHEETS = [
  {
    slug: 'block-diagrams-favorite-colors-color-practice',
    name: 'Easy - Favorite Colors',
    answers: ["5", "3", "4", "2", "3", "1", "15", "6", "No"]
  },
  {
    slug: 'block-diagrams-snack-time-food-practice',
    name: 'Average - Snack Time',
    answers: ["8", "5", "2", "2", "3", "1", "23", "7", "No"]
  },
  {
    slug: 'block-diagrams-outdoor-fun-sports-practice',
    name: 'Hard - Outdoor Fun',
    answers: ["9", "6", "6", "2", "3", "1", "27", "8", "No"]
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
  test.describe(`Interactive: Block Diagrams Mixed - ${ws.name}`, () => {
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
