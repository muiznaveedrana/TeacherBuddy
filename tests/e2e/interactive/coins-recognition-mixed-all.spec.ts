import { test, expect } from '@playwright/test'

// Coins Recognition Mixed Layout worksheets - Year 1
const WORKSHEETS = [
  {
    slug: 'measurement-coins-recognition-v4',
    title: 'Coins Recognition Mixed - Foundation',
    answers: ['5', '8', '15', '7', 'True', 'False', 'True']
  },
  {
    slug: 'measurement-coins-recognition-v5',
    title: 'Coins Recognition Mixed - Varied',
    answers: ['10', '15', '17', 'Banana', 'Yes']
  },
  {
    slug: 'measurement-coins-recognition-v6',
    title: 'Coins Recognition Mixed - Challenge',
    answers: ['20', '1', '17', '18', '10', '5', 'Same']
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

test.describe('Coins Recognition - Mixed Layout Interactive Tests', () => {
  for (const worksheet of WORKSHEETS) {
    test(`${worksheet.title} should complete with 100% score`, async ({ page }) => {
      test.setTimeout(60000)
      await page.goto(`/library/${worksheet.slug}/interactive`)
      await dismissCookieConsent(page)

      await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 10000 })

      const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
      const inputCount = await inputs.count()

      for (let i = 0; i < inputCount && i < worksheet.answers.length; i++) {
        const input = inputs.nth(i)
        await input.scrollIntoViewIfNeeded()
        await input.click()
        await input.fill('')
        await input.pressSequentially(worksheet.answers[i], { delay: 30 })
      }

      await dismissCookieConsent(page)

      const submitButton = page.locator('.sticky.bottom-0 button').first()
      await submitButton.scrollIntoViewIfNeeded()
      await submitButton.click({ force: true })

      const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
      await expect(celebrationOverlay).toBeVisible({ timeout: 15000 })

      const scoreText = await page.locator('text=/\\d+%/').first().textContent()
      expect(scoreText).toBe('100%')
    })
  }
})
