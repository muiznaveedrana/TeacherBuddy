import { test, expect } from '@playwright/test'

// Answer arrays for all 3 worksheets
const WORKSHEETS = [
  {
    slug: 'addition-subtraction-two-digit-numbers-mixed',
    name: 'Easy - School Theme',
    answers: ["37","56","58","37","57","59","24","43","43","33","32","32","59","33","No","59"]
  },
  {
    slug: 'addition-subtraction-two-digit-numbers-mixed-average',
    name: 'Average - Pet Shop Theme',
    answers: ["65","81","63","75","81","81","35","38","35","35","35","35","65","38","No","35"]
  },
  {
    slug: 'addition-subtraction-two-digit-numbers-mixed-hard',
    name: 'Hard - Space Theme',
    answers: ["93","93","95","93","93","93","37","36","36","35","36","36","93","37","No","37"]
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
  test.describe(`Interactive: Two-Digit Numbers Mixed - ${ws.name}`, () => {
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
