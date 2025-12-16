import { test, expect } from '@playwright/test'

// 3D Shapes Basic - All 3 Worksheets Test

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

test.describe('3D Shapes Basic - All 3 Worksheets', () => {

  // WS1: Foundation
  // Q1: Name shapes - sphere, cuboid, cone, cylinder
  // Q2: Count vertices - 8, 8, 5, 0, 1, 0
  // Q3: Toys - sphere, cube, pyramid
  // Q4: Word problem - 8, 8, 8, 16
  // Q5: True/False - Yes, 6, 5
  test('WS1 Foundation - should achieve 100%', async ({ page }) => {
    await page.goto('/library/geometry-3d-shapes-basic-v2/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "sphere", "cuboid", "cone", "cylinder",
      "8", "8", "5", "0", "1", "0",
      "sphere", "cube", "pyramid",
      "8", "8", "8", "16",
      "Yes", "6", "5"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS2: Varied (Shape Riddles)
  // Q1: Riddles - cube, sphere, cylinder
  // Q2: Count edges - 12, 8, 12, 0, 1, 2
  // Q3: Buildings - cylinders, cuboids, pyramid
  // Q4: Stacked cylinders - 2, 2
  // Q5: Odd one out - C, 0
  test('WS2 Varied - should achieve 100%', async ({ page }) => {
    await page.goto('/library/geometry-3d-shapes-basic-v3/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "cube", "sphere", "cylinder",
      "12", "8", "12", "0", "1", "2",
      "cylinders", "cuboids", "pyramid",
      "2", "2",
      "C", "0"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS3: Challenge
  // Q1: Table - 6, 12, 8, 5, 8, 5
  // Q2: Compare - more, fewer, same
  // Q3: Sort by rolling - sphere, cylinder, cube, cuboid, cone
  // Q4: Two-step - 6, 6, 12, 5, 12, 5, 17
  // Q5: Explain - No, 2, face
  test('WS3 Challenge - should achieve 100%', async ({ page }) => {
    await page.goto('/library/geometry-3d-shapes-basic-v4/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "6", "12", "8", "5", "8", "5",
      "more", "fewer", "same",
      "sphere", "cylinder", "cube", "cuboid", "cone",
      "6", "6", "12", "5", "12", "5", "17",
      "No", "2", "face"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
