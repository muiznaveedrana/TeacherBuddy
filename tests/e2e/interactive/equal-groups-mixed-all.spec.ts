import { test, expect } from '@playwright/test'

const WORKSHEETS = [
  {
    slug: 'equal-groups-baking-theme',
    name: 'Easy - Baking Theme',
    answers: ["12","12","5","2","10","15","12","40","24","Yes","15","15"]
  },
  {
    slug: 'equal-groups-farm-theme',
    name: 'Average - Farm Theme',
    answers: ["20","20","4","5","20","20","14","30","30","Yes","12","12"]
  },
  {
    slug: 'equal-groups-school-theme',
    name: 'Hard - School Theme',
    answers: ["30","30","3","6","18","25","16","60","40","Yes","40","40"]
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
  test.describe(`Interactive: Equal Groups Mixed - ${ws.name}`, () => {
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
