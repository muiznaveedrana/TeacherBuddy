import { test, expect } from '@playwright/test'

// Time Days and Months - All 3 Worksheets Test

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

test.describe('Time Days and Months - All 3 Worksheets', () => {

  // WS1: Foundation
  // Q1: Wednesday (missing day)
  // Q2: Sunday (tomorrow after Saturday)
  // Q3: April (after March)
  // Q4: Winter (December)
  // Q5: Tomorrow (swimming on Tuesday, today is Monday)
  test('WS1 Foundation - should achieve 100%', async ({ page }, testInfo) => {
    testInfo.setTimeout(60000)
    await page.goto('/library/time-days-and-months-foundation-vfoundation-251216-174736/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "Wednesday",    // Q1
      "Sunday",       // Q2
      "April",        // Q3
      "Winter",       // Q4
      "Tomorrow"      // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS2: Varied
  // Q1: Saturday (missing day)
  // Q2: Tuesday (yesterday before Wednesday)
  // Q3: October (after September)
  // Q4: Summer (July)
  // Q5: Tomorrow (piano on Friday, today is Thursday)
  test('WS2 Varied - should achieve 100%', async ({ page }, testInfo) => {
    testInfo.setTimeout(60000)
    await page.goto('/library/time-days-and-months-varied-vvaried-251216-174747/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "Saturday",     // Q1
      "Tuesday",      // Q2
      "October",      // Q3
      "Summer",       // Q4
      "Tomorrow"      // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })

  // WS3: Challenge
  // Q1: Sunday (missing day)
  // Q2: Sunday (yesterday before Monday)
  // Q3: December (after November)
  // Q4: Autumn (October)
  // Q5: 6 (days until Saturday from Sunday)
  test('WS3 Challenge - should achieve 100%', async ({ page }, testInfo) => {
    testInfo.setTimeout(60000)
    await page.goto('/library/time-days-and-months-challenge-vchallenge-251216-174757/interactive')
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible({ timeout: 30000 })

    const answers = [
      "Sunday",       // Q1
      "Sunday",       // Q2
      "December",     // Q3
      "Autumn",       // Q4
      "6"             // Q5
    ]

    const score = await fillAndSubmit(page, answers)
    expect(score).toBe('100%')
  })
})
