import { test, expect } from '@playwright/test'

// Recognising Fractions - All 3 Worksheets Test

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

  const scoreText = await celebrationOverlay.locator('text=/\\d+%/').textContent()
  console.log(`Score: ${scoreText}`)
  return scoreText
}

test.describe('Recognising Fractions - All 3 Worksheets', () => {

  // WS1: Foundation (Easy)
  // Q1: 1/2, 1/2
  // Q2: 1/4, 2/2, 2/4, 4/4
  // Q3: 3, 2
  // Q4: 1/2, 1/4
  // Q5: True, True
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/recognising-fractions-foundation/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "1/2", "1/2",                    // Q1
      "1/4", "2/2", "2/4", "4/4",     // Q2
      "3", "2",                        // Q3
      "1/2", "1/4",                    // Q4
      "True", "True"                   // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS2: Varied (Average)
  // Q1: 1/4, 1/3, 1/2
  // Q2: 2/3, 3/4, 2/4, 1/2, 3/3, 2/4
  // Q3: 5, 2
  // Q4: 2/4, 3
  // Q5: Yes, 1/2
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/recognising-fractions-varied/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "1/4", "1/3", "1/2",                          // Q1
      "2/3", "3/4", "2/4", "1/2", "3/3", "2/4",    // Q2
      "5", "2",                                      // Q3
      "2/4", "3",                                    // Q4
      "Yes", "1/2"                                   // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS3: Challenge (Hard)
  // Q1: 3/4, 2/3, 1/4
  // Q2: 3/4, 1/3, 1/4, 2/2, 3/3, 1/2
  // Q3: 4, 4
  // Q4: 3/4, 6
  // Q5: No, 2
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/recognising-fractions-challenge/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "3/4", "2/3", "1/4",                          // Q1
      "3/4", "1/3", "1/4", "2/2", "3/3", "1/2",    // Q2
      "4", "4",                                      // Q3
      "3/4", "6",                                    // Q4
      "No", "2"                                      // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
