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

  // NEW Mixed Layout Worksheets (December 2024)

  // WS4: Foundation Mixed Layout
  // Q1: circle, triangle, square, rectangle
  // Q2: 0, 3, 4, 4
  // Q3: circle, triangle, square
  // Q4: 3, 3, 3, 6
  // Q5: Yes, 0
  test('WS4 Foundation Mixed Layout - should achieve 100%', async ({ page }, testInfo) => {
    testInfo.setTimeout(60000)
    await page.goto('/library/2d-shapes-basic-foundation-vfoundation/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "circle", "triangle", "square", "rectangle",  // Q1
      "0", "3", "4", "4",                           // Q2
      "circle", "triangle", "square",               // Q3
      "3", "3", "3", "6",                           // Q4
      "Yes", "0"                                    // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS5: Varied Mixed Layout
  // Q1: square, circle, rectangle, triangle
  // Q2: 3, 4, 4, 0
  // Q3: rectangle, circle, rectangle
  // Q4: 4, 4, 4, 4, 12
  // Q5: A, 0
  test('WS5 Varied Mixed Layout - should achieve 100%', async ({ page }, testInfo) => {
    testInfo.setTimeout(60000)
    await page.goto('/library/2d-shapes-basic-varied-vvaried/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "square", "circle", "rectangle", "triangle",  // Q1
      "3", "4", "4", "0",                           // Q2
      "rectangle", "circle", "rectangle",           // Q3
      "4", "4", "4", "4", "12",                     // Q4
      "A", "0"                                      // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS6: Challenge Mixed Layout
  // Q1: rectangle, triangle, circle, square
  // Q2: 3, 3, 4, 4
  // Q3: 0, 3, 4
  // Q4: 3, 3, 6, 4, Yes
  // Q5: No, 4, 4
  test('WS6 Challenge Mixed Layout - should achieve 100%', async ({ page }, testInfo) => {
    testInfo.setTimeout(60000)
    await page.goto('/library/2d-shapes-basic-challenge-vchallenge/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "rectangle", "triangle", "circle", "square",  // Q1
      "3", "3", "4", "4",                           // Q2
      "0", "3", "4",                                // Q3
      "3", "3", "6", "4", "Yes",                    // Q4
      "No", "4", "4"                                // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
