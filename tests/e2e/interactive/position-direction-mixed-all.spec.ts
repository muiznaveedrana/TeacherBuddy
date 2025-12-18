import { test, expect } from '@playwright/test'

const WORKSHEETS = [
  {
    slug: 'position-where-is-it-basic-practice',
    name: 'Easy - Where Is It?',
    answers: ["above", "below", "1", "1", "2", "3", "box", "above", "No"]
  },
  {
    slug: 'position-left-and-right-direction-practice',
    name: 'Average - Left and Right',
    answers: ["right", "right", "2", "1", "2", "3", "banana", "left", "No"]
  },
  {
    slug: 'position-follow-the-path-path-practice',
    name: 'Hard - Follow the Path',
    answers: ["right", "right", "3", "1", "2", "3", "school", "middle", "No"]
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
  test.describe(`Interactive: Position Direction Mixed - ${ws.name}`, () => {
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
