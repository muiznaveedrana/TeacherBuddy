import { test, expect } from '@playwright/test'

// Mental Strategies - All 3 Worksheets Test

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

test.describe('Mental Strategies - All 3 Worksheets', () => {

  // WS1: Foundation
  // Q1: Doubles - 10, 14, 18
  // Q2: Add ones/tens - 27, 56, 48, 82, 19, 74
  // Q3: Picture - 12, 8, 12, 8, 20
  // Q4: Word problem - 39, 39
  // Q5: True/False - True, False, True
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/mental-maths-foundation-251216-141209/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "10", "14", "18",
      "27", "56", "48", "82", "19", "74",
      "12", "8", "12", "8", "20",
      "39", "39",
      "True", "False", "True"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS2: Practice
  // Q1: Missing numbers - 6, 7, 7
  // Q2: Subtraction - 43, 38, 68, 45, 59, 64
  // Q3: Cookies - 15, 6, 15, 6, 9
  // Q4: Two-step - 37, 37, 32
  // Q5: Odd one out - C, 19
  test('WS2 Practice - should achieve 100%', async ({ page }) => {
    await page.goto('/library/mental-maths-strategies-practice-practice-mental-maths/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "6", "7", "7",
      "43", "38", "68", "45", "59", "64",
      "15", "6", "15", "6", "9",
      "37", "37", "32",
      "C", "19"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS3: Challenge
  // Q1: Near doubles - 13, 17, 31
  // Q2: Mixed - 64, 63, 78, 41, 72, 56
  // Q3: Fact family - 15, 15, 8, 7
  // Q4: Multi-step - 68, 68, 53
  // Q5: Always/Sometimes/Never - Sometimes, 5
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/mental-maths-challenge-251216-141221/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "13", "17", "31",
      "64", "63", "78", "41", "72", "56",
      "15", "15", "8", "7",
      "68", "68", "53",
      "Sometimes", "5"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // NEW Mixed Layout Worksheets (December 2024)

  // WS4: Foundation Mixed Layout
  // Q1: 10, 14, 18
  // Q2: 27, 55, 48, 82, 19, 74
  // Q3: 12, 8, 12, 8, 20
  // Q4: 39, 39
  // Q5: True, False, True
  test('WS4 Foundation Mixed Layout - should achieve 100%', async ({ page }) => {
    await page.goto('/library/mental-strategies-foundation-vfoundation/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "10", "14", "18",                         // Q1
      "27", "55", "48", "82", "19", "74",       // Q2
      "12", "8", "12", "8", "20",               // Q3
      "39", "39",                               // Q4
      "True", "False", "True"                   // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS5: Practice Mixed Layout
  // Q1: 6, 7, 7, 7
  // Q2: 43, 38, 68, 45, 59, 64
  // Q3: 15, 6, 15, 6, 9
  // Q4: 57, 57, 52
  // Q5: C, 29
  test('WS5 Practice Mixed Layout - should achieve 100%', async ({ page }) => {
    await page.goto('/library/mental-strategies-practice-vpractice/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "6", "7", "7", "7",                       // Q1
      "43", "38", "68", "45", "59", "64",       // Q2
      "15", "6", "15", "6", "9",                // Q3
      "57", "57", "52",                         // Q4
      "C", "29"                                 // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS6: Challenge Mixed Layout
  // Q1: 13, 17, 31
  // Q2: 64, 63, 78, 41, 72, 56
  // Q3: 15, 15, 7, 8
  // Q4: 68, 45
  // Q5: Never, 45, 5
  test('WS6 Challenge Mixed Layout - should achieve 100%', async ({ page }) => {
    await page.goto('/library/mental-strategies-challenge-vchallenge/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "13", "17", "31",                         // Q1
      "64", "63", "78", "41", "72", "56",       // Q2
      "15", "15", "7", "8",                     // Q3
      "68", "45",                               // Q4
      "Never", "45", "5"                        // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
