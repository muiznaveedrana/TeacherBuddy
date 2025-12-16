import { test, expect } from '@playwright/test'

// Length Comparison - School Objects (Reception)

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

test.describe('Length Comparison - School Objects', () => {

  // Q1: Which crayon is longer? A (red 120px) vs B (yellow 220px) → B
  // Q2: Which is shorter? A (pencil 240px) vs B (green crayon 130px) → B
  // Q3: Which is longest? A (caterpillar 180px), B (spoon 120px), C (red crayon 280px) → C
  // Q4: Which is shortest? A (yellow 200px), B (green 100px), C (red 160px) → B
  // Q5: Same length? A (yellow 180px), B (red 260px), C (green 180px) → A and C
  test('should achieve 100%', async ({ page }) => {
    await page.goto('/library/length-comparison-longer-and-shorter-school-objects/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const answers = [
      "B",
      "B",
      "C",
      "B",
      "A and C"
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
