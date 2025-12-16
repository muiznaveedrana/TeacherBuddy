import { test, expect } from '@playwright/test'

// 2D Shapes Basic - All 3 Worksheets Test

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

test.describe('2D Shapes Basic - All 3 Worksheets', () => {

  // Worksheet 1: Foundation - Name and Count
  // Q1: circle, triangle, square, rectangle (4)
  // Q2: 3, 4, 4, 5, 6, 0 (6)
  // Q3: 3, 1, 1 (3)
  // Q4: 5, 1 (2)
  // Q5: No, 4, 4 (3)
  // Total: 18
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/2d-shapes-name-and-count-shapes-fill-in-the-blank-251215-213726/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "circle", "triangle", "square", "rectangle",
      "3", "4", "4", "5", "6", "0",
      "3", "1", "1",
      "5", "1",
      "No", "4", "4"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // Worksheet 2: Varied - Shape Riddles
  // Q1: triangle, circle, square, rectangle (4)
  // Q2: 4, 3, 0, 4, 5, 6 (6)
  // Q3: 2, 4, 1 (3)
  // Q4: 6, 2 (2)
  // Q5: C, 0 (2)
  // Total: 17
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/2d-shapes-shape-riddles-shapes-riddles-251215-213740/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "triangle", "circle", "square", "rectangle",
      "4", "3", "0", "4", "5", "6",
      "2", "4", "1",
      "6", "2",
      "C", "0"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // Worksheet 3: Challenge
  // Q1: 0, 3, 4, 5 (4)
  // Q2: 6, 6, 4, 4, 3, 3 (6)
  // Q3: 5, 3, 2 (3)
  // Q4: 7, 2 (2)
  // Q5: No, rectangle (2)
  // Total: 17
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/2d-shapes-shape-challenge-shapes-problem-solving/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "0", "3", "4", "5",
      "6", "6", "4", "4", "3", "3",
      "5", "3", "2",
      "7", "2",
      "No", "rectangle"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
