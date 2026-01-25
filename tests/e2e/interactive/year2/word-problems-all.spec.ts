import { test, expect } from '@playwright/test'

// Word Problems - All 3 Worksheets Test

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
    await input.fill(answers[i])
  }

  await dismissCookieConsent(page)
  const submitButton = page.locator('.sticky.bottom-0 button').first()
  await submitButton.click({ force: true })

  const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
  await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

  const scoreText = await page.locator('text=/\\d+%/').first().textContent()
  console.log(`Score: ${scoreText}`)
  return scoreText
}

test.describe('Word Problems - All 3 Worksheets', () => {

  // WS1: Foundation
  // Q1: 20 (12 + 8)
  // Q2: 16 (25 - 9)
  // Q3: 27 (15 + 12)
  // Q4: 25 (18 + 7)
  // Q5: 10 (24 - 6 - 8)
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/word-problems-foundation-vfoundation/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "20",   // Q1
      "16",   // Q2
      "27",   // Q3
      "25",   // Q4
      "10"    // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS2: Varied
  // Q1: 45 (28 + 17)
  // Q2: 25 (43 - 18)
  // Q3: 13 (32 - 19)
  // Q4: 36 (24 + 12)
  // Q5: 42 (45 - 18 + 15)
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/word-problems-varied-vvaried/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "45",   // Q1
      "25",   // Q2
      "13",   // Q3
      "36",   // Q4
      "42"    // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS3: Challenge
  // Q1: 94 (56 + 38)
  // Q2: 44 (73 - 29)
  // Q3: 37 (65 - 28)
  // Q4: 21 (68 - 47)
  // Q5: 48 (54 - 19 + 25 - 12)
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/word-problems-challenge-vchallenge/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "94",   // Q1
      "44",   // Q2
      "37",   // Q3
      "21",   // Q4
      "48"    // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
