import { test, expect } from '@playwright/test'

const WORKSHEETS = [
  {
    slug: 'capacity-and-volume-kitchen-time-kitchen-practice',
    name: 'Easy - Kitchen Time',
    answers: ["glass", "50", "400", "1", "2", "3", "500", "1000", "No"]
  },
  {
    slug: 'capacity-and-volume-garden-fun-garden-practice',
    name: 'Average - Garden Fun',
    answers: ["bucket", "3", "750", "1", "2", "3", "800", "2000", "No"]
  },
  {
    slug: 'capacity-and-volume-science-experiments-science',
    name: 'Hard - Science Experiments',
    answers: ["flask", "250", "1250", "1", "2", "3", "1200", "3000", "No"]
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
  test.describe(`Interactive: Capacity and Volume Mixed - ${ws.name}`, () => {
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
