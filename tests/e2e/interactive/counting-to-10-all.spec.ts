import { test, expect } from '@playwright/test'

// Counting to 10 - All 3 Worksheets Test

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

test.describe('Counting to 10 - All 3 Worksheets', () => {

  // WS1: Foundation
  // Q1: 3, 5
  // Q2: 4, 2
  // Q3: 6, 3
  // Q4: 7, 8
  // Q5: Yes, 4
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/counting-to-10-foundation-vfoundation/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "3", "5",           // Q1
      "4", "2",           // Q2
      "6", "3",           // Q3
      "7", "8",           // Q4
      "Yes", "4"          // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS2: Varied
  // Q1: 6, 4
  // Q2: 7, 9
  // Q3: 8, 5
  // Q4: 10, 6
  // Q5: No, 9
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/counting-to-10-varied-vvaried/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "6", "4",           // Q1
      "7", "9",           // Q2
      "8", "5",           // Q3
      "10", "6",          // Q4
      "No", "9"           // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS3: Challenge
  // Q1: 9, 10
  // Q2: 8, 7
  // Q3: 10, 9
  // Q4: 10, 8
  // Q5: No, 10
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/counting-to-10-challenge-vchallenge/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "9", "10",          // Q1
      "8", "7",           // Q2
      "10", "9",          // Q3
      "10", "8",          // Q4
      "No", "10"          // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
