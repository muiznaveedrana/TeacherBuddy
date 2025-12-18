import { test, expect } from '@playwright/test'

// Counting Forwards & Backwards Mixed Layout worksheets - Year 1
const WORKSHEETS = [
  {
    slug: 'number-place-value-counting-forwards-backwards',
    title: 'Counting Forwards & Backwards Mixed - Foundation',
    answers: ['7', '9', '14', '15', '7', '6', '5', 'True', 'True', 'False']
  },
  {
    slug: 'number-place-value-counting-forwards-backwards-v2',
    title: 'Counting Forwards & Backwards Mixed - Varied',
    answers: ['16', '14', '13', '13', '11', '13']
  },
  {
    slug: 'number-place-value-counting-forwards-backwards-v3',
    title: 'Counting Forwards & Backwards Mixed - Challenge',
    answers: ['18', '16', '16', '18', '10', 'Same', 'Yes', '11']
  }
]

// Remove cookie consent overlay
async function dismissCookieConsent(page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') (el as HTMLElement).remove()
    })
  })
}

test.describe('Counting Forwards & Backwards - Mixed Layout Interactive Tests', () => {
  for (const worksheet of WORKSHEETS) {
    test(`${worksheet.title} should complete with 100% score`, async ({ page }) => {
      test.setTimeout(60000)
      await page.goto(`/library/${worksheet.slug}/interactive`)
      await dismissCookieConsent(page)

      // Wait for the interactive container
      await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 10000 })

      // Fill all text inputs
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

      // Submit
      const submitButton = page.locator('.sticky.bottom-0 button').first()
      await submitButton.scrollIntoViewIfNeeded()
      await submitButton.click({ force: true })

      // Verify 100% score
      const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
      await expect(celebrationOverlay).toBeVisible({ timeout: 15000 })

      const scoreText = await page.locator('text=/\\d+%/').first().textContent()
      expect(scoreText).toBe('100%')
    })
  }
})
