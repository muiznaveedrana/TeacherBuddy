import { test, expect } from '@playwright/test'

const WORKSHEETS = [
  {
    slug: 'length-and-height-school-theme',
    name: 'Easy - School Theme',
    answers: ["12","pen","7","3","2","1","1","16"]
  },
  {
    slug: 'length-and-height-garden-theme',
    name: 'Average - Garden Theme',
    answers: ["25","flower","7","2","1","3","2","63"]
  },
  {
    slug: 'length-and-height-household-theme',
    name: 'Hard - Household Theme',
    answers: ["28","table","30","1","2","3","1","50","45"]
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
  test.describe(`Interactive: Length Height Mixed - ${ws.name}`, () => {
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
