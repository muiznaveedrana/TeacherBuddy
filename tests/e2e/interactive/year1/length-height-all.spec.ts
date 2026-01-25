import { test, expect } from '@playwright/test'

// Length and Height - All 3 Worksheets Test

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

test.describe('Length and Height - All 3 Worksheets', () => {

  // WS1: Foundation
  // Q1: A, B
  // Q2: 5, 7
  // Q3: Ben, 2
  // Q4: B, C, A
  // Q5: No, ribbon
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/length-and-height-foundation-vfoundation/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "A", "B",           // Q1
      "5", "7",           // Q2
      "Ben", "2",         // Q3
      "B", "C", "A",      // Q4
      "No", "ribbon"      // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS2: Varied
  // Q1: A, B
  // Q2: 6, 8
  // Q3: Lily, 4
  // Q4: C, A, B
  // Q5: Yes, book
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/length-and-height-varied-vvaried/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "A", "B",           // Q1
      "6", "8",           // Q2
      "Lily", "4",        // Q3
      "C", "A", "B",      // Q4
      "Yes", "book"       // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS3: Challenge
  // Q1: B, C
  // Q2: 9, 11
  // Q3: Leo, 4
  // Q4: B, D, A, C
  // Q5: Yes, 4
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/length-and-height-challenge-vchallenge/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "B", "C",           // Q1
      "9", "11",          // Q2
      "Leo", "4",         // Q3
      "B", "D", "A", "C", // Q4
      "Yes", "4"          // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
