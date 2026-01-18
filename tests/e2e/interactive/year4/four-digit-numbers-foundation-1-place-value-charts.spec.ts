import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'four-digit-numbers-foundation-1-place-value-charts'
const WORKSHEET_ANSWERS = ["3456: Th=3","H=4","T=5","O=6. 7829: Th=7","H=8","T=2","O=9","2547 = 2000 + 500 + 40 + 7. b) 6081 = 6000 + 0 + 80 + 1","4 in 4732 = 4000 (4 thousands). 9 in 5916 = 900 (9 hundreds)","4325,","8017,","6509","3×1000 + 5×100 + 4×10 + 7 = 3000 + 500 + 40 + 7 = 3547 books"]

async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') (el as HTMLElement).remove()
    })
  })
}

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }) => {
    test.setTimeout(15000)
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} inputs, have ${WORKSHEET_ANSWERS.length} answers`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      await dismissCookieConsent(page)
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click({ force: true })
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
    }

    await dismissCookieConsent(page)
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
