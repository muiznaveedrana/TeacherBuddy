import { test, expect } from '@playwright/test'

const WORKSHEETS = [
  {
    slug: 'time-school-day-251218-201747',
    name: 'Easy - School Day',
    answers: ["8","30","3","0","9","30","2","1","3","2","0","No"]
  },
  {
    slug: 'time-weekend-fun-251218-201758',
    name: 'Average - Weekend Fun',
    answers: ["10","15","1","45","3","45","1","2","3","3","15","No"]
  },
  {
    slug: 'time-sports-day-251218-201810',
    name: 'Hard - Sports Day',
    answers: ["11","45","9","15","1","45","3","2","1","1","15","No"]
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
  test.describe(`Interactive: Time Mixed - ${ws.name}`, () => {
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
