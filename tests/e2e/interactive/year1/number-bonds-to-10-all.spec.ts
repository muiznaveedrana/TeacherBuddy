import { test, expect } from '@playwright/test'

// Number Bonds to 10 - All 3 Worksheets Test

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

test.describe('Number Bonds to 10 - All 3 Worksheets', () => {

  // Worksheet 1: Foundation - Learn the Pairs
  // Q1: Number bond diagrams (4 answers): 7, 4, 8, 9
  // Q2: Missing numbers (6 answers): 5, 7, 2, 10, 4, 1
  // Q3: Ten frame (2 answers): 4, 6
  // Q4: Word problems (2 answers): 3, 6
  // Q5: True/False (3 answers): True, True, False
  // Total: 17
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/number-bonds-to-10-learn-the-pairs-mixed-fill-in-the-bl/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "7", "4", "8", "9",
      "5", "7", "2", "10", "4", "1",
      "4", "6",
      "3", "6",
      "True", "True", "False"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // Worksheet 2: Varied - Match and Complete
  // Q1: Matching (6 answers): 2, 7, 4, 9, 5, 1
  // Q2: Dominoes (4 answers): 6, 3, 8, 10
  // Q3: Counting objects (6 answers): 6, 6, 4, 3, 3, 7
  // Q4: Word problems (2 answers): 6, 2
  // Q5: Odd one out (2 answers): B, 9
  // Total: 20
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/number-bonds-to-10-match-and-complete-mixed-matching/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "2", "7", "4", "9", "5", "1",
      "6", "3", "8", "10",
      "6", "6", "4", "3", "3", "7",
      "6", "2",
      "B", "9"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // Worksheet 3: Challenge
  // Q1: Fact family (4 answers): 10, 3, 10, 7
  // Q2: Missing numbers (6 answers): 4, 6, 9, 1, 5, 8
  // Q3: Compare (2 answers): A, same
  // Q4: Multi-step (3 answers): 6, 8, 2
  // Q5: Always/Sometimes/Never (2 answers): Sometimes, Always
  // Total: 17
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/number-bonds-to-10-challenge-mixed-problem-solving/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "10", "3", "10", "7",
      "4", "6", "9", "1", "5", "8",
      "A", "same",
      "6", "8", "2",
      "Sometimes", "Always"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
