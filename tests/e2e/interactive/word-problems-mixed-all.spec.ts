import { test, expect } from '@playwright/test'

const WORKSHEETS = [
  {
    slug: 'addition-subtraction-word-problems-mixed',
    name: 'Easy - Toy Shop Theme',
    answers: ["39","39","33","33","25","55","55","40","40","No","Subtract","22"]
  },
  {
    slug: 'addition-subtraction-word-problems-mixed-average',
    name: 'Average - Garden Theme',
    answers: ["65","65","37","37","Rose","7","7","43","43","58","58","Yes","away","37"]
  },
  {
    slug: 'addition-subtraction-word-problems-mixed-hard',
    name: 'Hard - Sports Theme',
    answers: ["85","85","48","48","43","43","57","57","82","82","No","Add","85"]
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
  test.describe(`Interactive: Word Problems Mixed - ${ws.name}`, () => {
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
