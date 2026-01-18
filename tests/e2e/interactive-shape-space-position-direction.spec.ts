import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = 'shape-space-position-direction'
const WORKSHEET_ANSWERS = ['above', 'inside', 'A', 'B', 'above']

async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: 'Decline cookies' }).click()
}

test.describe(`Interactive: ${WORKSHEET_SLUG}`, () => {
  test('should complete with 100% score', async ({ page }) => {
    // Navigate to the interactive position and direction worksheet
    await page.goto(`/library/${WORKSHEET_SLUG}/interactive`)
    
    // Dismiss cookie consent by clicking reject button
    await dismissCookieConsent(page)
    
    // Verify worksheet container is visible
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(`Found ${inputCount} inputs`)

    // Fill in answer for question 1: above
    await inputs.nth(0).click()
    await inputs.nth(0).pressSequentially(WORKSHEET_ANSWERS[0], { delay: 50 })

    // Fill in answer for question 2: inside
    await inputs.nth(1).click()
    await inputs.nth(1).pressSequentially(WORKSHEET_ANSWERS[1], { delay: 50 })

    // Fill in answer for question 3: A
    await inputs.nth(2).click()
    await inputs.nth(2).pressSequentially(WORKSHEET_ANSWERS[2], { delay: 50 })

    // Fill in answer for question 4: B
    await inputs.nth(3).click()
    await inputs.nth(3).pressSequentially(WORKSHEET_ANSWERS[3], { delay: 50 })

    // Fill in answer for question 5: above
    await inputs.nth(4).click()
    await inputs.nth(4).pressSequentially(WORKSHEET_ANSWERS[4], { delay: 50 })

    // Submit the completed worksheet
    const submitButton = page.getByRole('button', { name: 'Submit Answers 📝' })
    await submitButton.click()

    // Verify celebration overlay appears
    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    // Verify 100% score
    const scoreElement = page.locator('text=/\\d+%/').first()
    await expect(scoreElement).toBeVisible()
    const scoreText = await scoreElement.textContent()
    console.log(`Score: ${scoreText}`)
    expect(scoreText).toBe('100%')
  })
})
