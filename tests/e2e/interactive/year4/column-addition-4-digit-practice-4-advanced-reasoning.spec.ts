import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'column-addition-4-digit-practice-4-advanced-reasoning'
const WORKSHEET_ANSWERS = ["8765 + 1357 = 10122","b) 9876 + 1234 = 11110","Missing digit: 6 (4667 + 3218 = 7885)","b) Missing digit: 5 (5432 + 2589 = 8021)","Estimate: £4000 + £5000 = £9000. Exact: £3876 + £4589 = £8465","Total: 4567 + 3898 = 8465. Team A scored more by 669 points (4567 - 3898)","Emma's way: 6000 + 6000 = 12000","subtract 2","gives 11998. Column: 5999 + 5999 = 11998. Emma is correct."]

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
