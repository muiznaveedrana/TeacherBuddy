import { test, expect } from '@playwright/test'

// Word Problems Simple Mixed Layout worksheets - Year 1
const WORKSHEETS = [
  {
    slug: 'addition-subtraction-word-problems-simple-v4',
    title: 'Word Problems Simple Mixed - Foundation',
    answers: ['8', '5', '9', '6', 'True', 'False', 'True']
  },
  {
    slug: 'addition-subtraction-word-problems-simple-v5',
    title: 'Word Problems Simple Mixed - Varied',
    answers: ['5', '6', '13', '8', 'No', '15']
  },
  {
    slug: 'addition-subtraction-word-problems-simple-v6',
    title: 'Word Problems Simple Mixed - Challenge',
    answers: ['7', '12', '8', '9', '12', '6', '15']
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

test.describe('Word Problems Simple - Mixed Layout Interactive Tests', () => {
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
