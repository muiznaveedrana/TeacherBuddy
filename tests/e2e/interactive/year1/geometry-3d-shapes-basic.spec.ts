import { test, expect } from '@playwright/test'

/**
 * Interactive Worksheet Test: Geometry - 3D Shapes Basic
 * Year Group: Year 1
 * Auto-generated test that verifies 100% score
 */

const WORKSHEET_SLUG = 'geometry-3d-shapes-basic'
// Q1: cube, sphere, cylinder, cone
// Q2: 6, 6, 2, 0, 1, 5
// Q3: sphere, cuboid, cone
// Q4: 6, 6, 6, 6, 18
// Q5: No, 0, curved
const WORKSHEET_ANSWERS = [
  "cube", "sphere", "cylinder", "cone",
  "6", "6", "2", "0", "1", "5",
  "sphere", "cuboid", "cone",
  "6", "6", "6", "6", "18",
  "No", "0", "curved"
]

async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="overlay"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') el.remove()
    })
  })
}

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }, testInfo) => {
    testInfo.setTimeout(90000) // Extended timeout for many inputs

    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} input fields, have ${WORKSHEET_ANSWERS.length} answers`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 40 })
    }

    await dismissCookieConsent(page)
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await page.screenshot({ path: `test-results/quality-screenshots/geometry-3d-shapes-basic.png`, fullPage: true })

    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\d+%/').first().textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
