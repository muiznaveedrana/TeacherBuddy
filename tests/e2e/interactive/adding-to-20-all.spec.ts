import { test, expect } from '@playwright/test'

// Adding to 20 - All 3 Worksheets Test

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

  const scoreText = await page.locator('text=/\\d+%/').first().textContent()
  console.log(`Score: ${scoreText}`)
  return scoreText
}

test.describe('Adding to 20 - All 3 Worksheets', () => {

  // Worksheet 1: Foundation - Picture Practice
  // Q1: Picture addition (1 answer): 8
  // Q2: Addition grid (6 answers): 9, 10, 12, 11, 12, 14
  // Q3: Number line (1 answer): 13
  // Q4: Word problems (2 answers): 15, 15
  // Q5: True/False (3 answers): True, False, True
  // Total: 13
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/adding-to-20-picture-practice-mixed/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "8",
      "9", "10", "12", "11", "12", "14",
      "13",
      "15", "15",
      "True", "False", "True"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // Worksheet 2: Varied - Doubles and Missing Numbers
  // Q1: Doubles (6 answers): 10, 12, 14, 16, 18, 20
  // Q2: Missing addend (4 answers): 7, 6, 9, 7
  // Q3: Ten-frame (2 answers): 13, 13
  // Q4: Two-part word problem (2 answers): 15, 10
  // Q5: Odd one out (2 answers): B, 14
  // Total: 16
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/adding-to-20-doubles-missing-numbers/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "10", "12", "14", "16", "18", "20",
      "7", "6", "9", "7",
      "13", "13",
      "15", "10",
      "B", "14"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // Worksheet 3: Challenge
  // Q1: Fact family (3 answers): 14, 14, 14
  // Q2: Part-whole (2 answers): 8, 12
  // Q3: Compare (2 answers): same, A
  // Q4: Multi-step (3 answers): 14, 19, Amy
  // Q5: Always/Sometimes/Never (2 answers): Sometimes, Always
  // Total: 12
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/adding-to-20-challenge-mixed/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "14", "14", "14",
      "8", "12",
      "same", "A",
      "14", "19", "Amy",
      "Sometimes", "Always"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
