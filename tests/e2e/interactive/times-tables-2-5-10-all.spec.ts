import { test, expect } from '@playwright/test'

// Times Tables 2, 5, 10 - All 3 Worksheets Test

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

test.describe('Times Tables 2, 5, 10 - All 3 Worksheets', () => {

  // Worksheet 1: Foundation - Quick Recall
  // Q1: Times table grid (9 answers): 6, 15, 30, 8, 20, 40, 12, 30, 60
  // Q2: Missing numbers (6 answers): 10, 35, 80, 18, 30, 40
  // Q3: Array multiplication (6 answers): 2, 5, 10, 4, 2, 8
  // Q4: Word problems (2 answers): 50, 12
  // Q5: True/False (3 answers): True, True, True
  // Total: 26
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/times-tables-2-5-10-quick-recall-mixed-fill-in-the-blan-251215-213805/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "6", "15", "30", "8", "20", "40", "12", "30", "60",
      "10", "35", "80", "18", "30", "40",
      "2", "5", "10", "4", "2", "8",
      "50", "12",
      "True", "True", "True"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // Worksheet 2: Varied - Skip Counting
  // Q1: Skip counting (12 answers): 6, 8, 10, 12, 15, 20, 25, 30, 30, 40, 50, 60
  // Q2: Missing factors (4 answers): 5, 2, 7, 5
  // Q3: Equal groups (6 answers): 3, 5, 15, 5, 2, 10
  // Q4: Two-step (2 answers): 20, 10
  // Q5: Odd one out (2 answers): C, 25
  // Total: 26
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/times-tables-2-5-10-skip-counting-mixed-patterns-251215-213818/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "6", "8", "10", "12", "15", "20", "25", "30", "30", "40", "50", "60",
      "5", "2", "7", "5",
      "3", "5", "15", "5", "2", "10",
      "20", "10",
      "C", "25"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // Worksheet 3: Challenge
  // Q1: Fact family (4 answers): 20, 20, 5, 4
  // Q2: Table completion (6 answers): 12, 6, 40, 8, 70, 7
  // Q3: Compare (2 answers): same, A
  // Q4: Multi-step (4 answers): 30, 20, Emma, 10
  // Q5: Always/Sometimes/Never (2 answers): Always, Sometimes
  // Total: 18
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/times-tables-2-5-10-challenge-mixed-problem-solving-251215-213829/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "20", "20", "5", "4",
      "12", "6", "40", "8", "70", "7",
      "same", "A",
      "30", "20", "Emma", "10",
      "Always", "Sometimes"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
