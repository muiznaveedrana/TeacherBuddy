import { test, expect } from '@playwright/test'

// Halves and Quarters - All 3 Worksheets Test

async function dismissCookieConsent(page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') (el as HTMLElement).remove()
    })
  })
}

async function fillAndSubmit(page, answers: string[]) {
  const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
  const inputCount = await inputs.count()
  console.log(`Found ${inputCount} inputs, have ${answers.length} answers`)

  for (let i = 0; i < inputCount && i < answers.length; i++) {
    const input = inputs.nth(i)
    await input.scrollIntoViewIfNeeded()
    await input.click()
    await input.pressSequentially(answers[i], { delay: 40 })
  }

  await dismissCookieConsent(page)
  const submitButton = page.locator('.sticky.bottom-0 button').first()
  await submitButton.click({ force: true })

  const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
  await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

  const scoreText = await celebrationOverlay.locator('text=/\\d+%/').textContent()
  console.log(`Score: ${scoreText}`)
  return scoreText
}

test.describe('Halves and Quarters - All 3 Worksheets', () => {

  // WS1: Foundation
  // Q1: 1/2, 1/4
  // Q2: 2, 3, 4, 5
  // Q3: 6, 3
  // Q4: 4, 3
  // Q5: Yes, 6
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/halves-and-quarters-foundation-vfoundation/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "1/2", "1/4",           // Q1
      "2", "3", "4", "5",     // Q2
      "6", "3",               // Q3
      "4", "3",               // Q4
      "Yes", "6"              // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS2: Varied
  // Q1: 2/4, 1/2, 1/4
  // Q2: 6, 7, 2, 3
  // Q3: 4, 2
  // Q4: 6, 1
  // Q5: Yes, 2
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/halves-and-quarters-varied-vvaried/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "2/4", "1/2", "1/4",    // Q1
      "6", "7", "2", "3",     // Q2
      "4", "2",               // Q3
      "6", "1",               // Q4
      "Yes", "2"              // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS3: Challenge
  // Q1: 3/4, 2/4, 1/4
  // Q2: 8, 10, 4, 5
  // Q3: 6, 3
  // Q4: 4, 10
  // Q5: Yes, 4
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/halves-and-quarters-challenge-vchallenge/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "3/4", "2/4", "1/4",    // Q1
      "8", "10", "4", "5",    // Q2
      "6", "3",               // Q3
      "4", "10",              // Q4
      "Yes", "4"              // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
