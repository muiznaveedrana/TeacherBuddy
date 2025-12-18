import { test, expect } from '@playwright/test'

// Numbers to 20 Mixed Layout worksheets - Year 1
const WORKSHEETS = [
  {
    slug: 'number-place-value-numbers-to-20',
    title: 'Numbers to 20 Mixed Layout - Foundation',
    answers: ['9', '11', '13', '8', '17', 'True', 'False', 'True']
  },
  {
    slug: 'number-place-value-numbers-to-20-v2',
    title: 'Numbers to 20 Mixed Layout - Varied',
    answers: ['14', '12', '14', '12', 'Ben', '19']
  },
  {
    slug: 'number-place-value-numbers-to-20-v3',
    title: 'Numbers to 20 Mixed Layout - Challenge',
    answers: ['17', '15', '17', '16', '14', '17', '19', 'No', '18']
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

test.describe('Numbers to 20 - Mixed Layout Interactive Tests', () => {
  for (const worksheet of WORKSHEETS) {
    test(`${worksheet.title} should complete with 100% score`, async ({ page }) => {
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
