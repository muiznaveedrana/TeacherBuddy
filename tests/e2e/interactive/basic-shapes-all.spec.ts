import { test, expect } from '@playwright/test'

// Basic Shapes - All 3 Worksheets Test

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

test.describe('Basic Shapes - All 3 Worksheets', () => {

  // WS1: Foundation
  // Q1: B (circle)
  // Q2: 3 (squares)
  // Q3: 4 (triangles)
  // Q4: C (heart)
  // Q5: B (round shape - circle)
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/basic-shapes-foundation-vfoundation/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "B",    // Q1
      "3",    // Q2
      "4",    // Q3
      "C",    // Q4
      "B"     // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS2: Varied
  // Q1: C (star)
  // Q2: 5 (hearts)
  // Q3: 6 (stars)
  // Q4: A (triangle)
  // Q5: B (3 corners - triangle)
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/basic-shapes-varied-vvaried/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "C",    // Q1
      "5",    // Q2
      "6",    // Q3
      "A",    // Q4
      "B"     // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS3: Challenge
  // Q1: A (triangle)
  // Q2: 4 (circles)
  // Q3: 7 (squares)
  // Q4: C (square)
  // Q5: C (4 corners - square)
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/basic-shapes-challenge-vchallenge/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "A",    // Q1
      "4",    // Q2
      "7",    // Q3
      "C",    // Q4
      "C"     // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
