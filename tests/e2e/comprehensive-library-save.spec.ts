import { test, expect } from '@playwright/test'

/**
 * COMPREHENSIVE LIBRARY SAVE TEST
 * Tests worksheet generation and save for ALL configurations across:
 * - Reception (2 topics × 6 subtopics)
 * - Year 1 (3 topics × 9 subtopics)
 * - Year 2 (5 topics × 15 subtopics)
 */

// Login credentials
const LOGIN_EMAIL = 'naveed.idrees@gmail.com'
const LOGIN_PASSWORD = 'mysupabase'

/**
 * Helper function to login before tests
 */
async function loginUser(page) {
  console.log('🔐 Logging in...')

  // Navigate to login page
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle' })

  // Fill in credentials
  const emailInput = page.locator('input[type="email"], input[name="email"]').first()
  await emailInput.fill(LOGIN_EMAIL)

  const passwordInput = page.locator('input[type="password"], input[name="password"]').first()
  await passwordInput.fill(LOGIN_PASSWORD)

  // Submit login form
  const loginButton = page.locator('button[type="submit"]').or(page.locator('button:has-text("Sign In")')).or(page.locator('button:has-text("Log In")')).first()
  await loginButton.click()

  // Wait for navigation to complete (either redirect to dashboard or create page)
  await page.waitForURL(/\/(create|dashboard|$)/, { timeout: 10000 }).catch(() => {
    console.log('⚠️ Login redirect timeout - checking if already on create page')
  })

  // Wait a moment for auth state to settle
  await page.waitForTimeout(1000)

  console.log('✅ Login complete')
}

// Test configurations - using same structure as parallel agent's CONFIG_REGISTRY
const TEST_CONFIGURATIONS = [
  // ========== RECEPTION (Ages 4-5) ==========
  { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'counting-to-10', subtopic: 'Counting to 10' },
  { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'number-recognition', subtopic: 'Number Recognition' },
  { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'more-or-less', subtopic: 'More or Less' },
  { yearGroup: 'Reception', topicValue: 'shape-space', topic: 'Shape and Space', subtopicValue: 'basic-shapes', subtopic: 'Basic Shapes' },
  { yearGroup: 'Reception', topicValue: 'shape-space', topic: 'Shape and Space', subtopicValue: 'patterns', subtopic: 'Simple Patterns' },
  { yearGroup: 'Reception', topicValue: 'shape-space', topic: 'Shape and Space', subtopicValue: 'size-comparison', subtopic: 'Size Comparison' },

  // ========== YEAR 1 (Ages 5-6) ==========
  { yearGroup: 'Year 1', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'numbers-to-20', subtopic: 'Numbers to 20' },
  { yearGroup: 'Year 1', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'counting-forwards-backwards', subtopic: 'Counting Forwards and Backwards' },
  { yearGroup: 'Year 1', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'number-bonds-10', subtopic: 'Number Bonds to 10' },
  { yearGroup: 'Year 1', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'adding-to-20', subtopic: 'Adding within 20' },
  { yearGroup: 'Year 1', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'subtracting-within-20', subtopic: 'Subtracting within 20' },
  { yearGroup: 'Year 1', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'word-problems-simple', subtopic: 'Simple Word Problems' },
  { yearGroup: 'Year 1', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'length-height', subtopic: 'Length and Height' },
  { yearGroup: 'Year 1', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'weight-capacity', subtopic: 'Weight and Capacity' },
  { yearGroup: 'Year 1', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'time-days-months', subtopic: 'Time - Days and Months' },

  // ========== YEAR 2 (Ages 6-7) ==========
  { yearGroup: 'Year 2', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'numbers-to-100', subtopic: 'Numbers to 100' },
  { yearGroup: 'Year 2', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'comparing-numbers', subtopic: 'Comparing Numbers' },
  { yearGroup: 'Year 2', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'rounding-nearest-10', subtopic: 'Rounding to Nearest 10' },
  { yearGroup: 'Year 2', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'two-digit-numbers', subtopic: 'Two-digit Number Operations' },
  { yearGroup: 'Year 2', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'mental-strategies', subtopic: 'Mental Calculation Strategies' },
  { yearGroup: 'Year 2', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'word-problems', subtopic: 'Word Problems' },
  { yearGroup: 'Year 2', topicValue: 'multiplication-division', topic: 'Multiplication and Division', subtopicValue: 'times-tables-2-5-10', subtopic: 'Times Tables 2, 5, 10' },
  { yearGroup: 'Year 2', topicValue: 'multiplication-division', topic: 'Multiplication and Division', subtopicValue: 'equal-groups', subtopic: 'Equal Groups' },
  { yearGroup: 'Year 2', topicValue: 'multiplication-division', topic: 'Multiplication and Division', subtopicValue: 'sharing-grouping', subtopic: 'Sharing and Grouping' },
  { yearGroup: 'Year 2', topicValue: 'fractions', topic: 'Fractions', subtopicValue: 'recognising-fractions', subtopic: 'Recognising Fractions' },
  { yearGroup: 'Year 2', topicValue: 'fractions', topic: 'Fractions', subtopicValue: 'finding-fractions', subtopic: 'Finding Fractions' },
  { yearGroup: 'Year 2', topicValue: 'fractions', topic: 'Fractions', subtopicValue: 'equivalent-fractions-simple', subtopic: 'Simple Equivalent Fractions' },
  { yearGroup: 'Year 2', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'length-and-height', subtopic: 'Length and Height (cm, m)' },
  { yearGroup: 'Year 2', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'mass-and-weight', subtopic: 'Mass and Weight (g, kg)' },
  { yearGroup: 'Year 2', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'temperature', subtopic: 'Temperature (°C)' }
]

test.describe('Comprehensive Library Save - All Configurations', () => {
  // Increase timeout for this test suite (each worksheet can take 60-90s)
  test.setTimeout(120000)

  // Generate a test for each configuration
  for (const config of TEST_CONFIGURATIONS) {
    test(`should generate and save: ${config.yearGroup} > ${config.topic} > ${config.subtopic}`, async ({ page }) => {
      const testId = `${config.yearGroup}-${config.topicValue}-${config.subtopicValue}`.replace(/\s+/g, '-').toLowerCase()

      console.log(`\n${'='.repeat(60)}`)
      console.log(`🧪 Testing: ${config.yearGroup} > ${config.topic} > ${config.subtopic}`)
      console.log(`${'='.repeat(60)}\n`)

        // ========== STEP 0: Login ==========
        await loginUser(page)

        // ========== STEP 1: Navigate to Create Page ==========
        await page.goto('http://localhost:3000/create', { waitUntil: 'networkidle' })
        await page.waitForSelector('[data-testid="year-group-select"]', { timeout: 10000 })
        console.log('✅ Step 1: Create page loaded')

        // ========== STEP 2: Select Year Group ==========
        const yearGroupValue = config.yearGroup.toLowerCase().replace(/\s+/g, '-')
        await page.getByTestId('year-group-select').click()
        await page.waitForTimeout(300) // Dropdown animation
        await page.getByTestId(`year-group-option-${yearGroupValue}`).click()
        await page.waitForSelector('[data-testid="topic-select"]:not([disabled])', { timeout: 10000 })
        console.log(`✅ Step 2: Selected year group: ${config.yearGroup}`)

        // ========== STEP 3: Select Topic ==========
        await page.getByTestId('topic-select').click()
        await page.waitForTimeout(1000) // Wait for dropdown to populate
        await page.waitForSelector(`[data-testid="topic-option-${config.topicValue}"]`, { timeout: 15000, state: 'visible' })
        await page.getByTestId(`topic-option-${config.topicValue}`).click()
        await page.waitForSelector('[data-testid="subtopic-select"]:not([disabled])', { timeout: 15000 })
        console.log(`✅ Step 3: Selected topic: ${config.topic}`)

        // ========== STEP 4: Select Subtopic ==========
        console.log(`      🔍 Selecting subtopic: ${config.subtopicValue}`)
        await page.getByTestId('subtopic-select').click()
        await page.waitForTimeout(500) // Longer delay for dropdown animation
        await page.waitForSelector(`[data-testid="subtopic-option-${config.subtopicValue}"]`, { timeout: 10000, state: 'visible' })
        await page.getByTestId(`subtopic-option-${config.subtopicValue}`).click()
        await page.waitForTimeout(500) // Wait for state to update

        const selectedSubtopic = await page.getByTestId('subtopic-select').textContent()
        console.log(`✅ Step 4: Selected subtopic: ${selectedSubtopic}`)

        // ========== STEP 5: Generate Worksheet ==========
        const generateButton = page.getByRole('button', { name: 'Generate Worksheet' })
        const isEnabled = await generateButton.isEnabled()
        if (!isEnabled) {
          throw new Error('Generate button is disabled')
        }

        await generateButton.click()
        console.log('⏳ Step 5: Generating worksheet (this may take 60-90 seconds)...')

        // Wait for Download button to appear
        await page.waitForSelector('text=Download', { timeout: 90000 })
        await page.waitForTimeout(500) // React state update

        // Wait for worksheet preview to be visible
        console.log('⏳ Step 5: Waiting for worksheet preview...')
        await page.waitForSelector('.worksheet-preview, .worksheet', {
          timeout: 10000,
          state: 'visible'
        })

        // Wait for network idle (all images loaded)
        console.log('⏳ Step 5: Waiting for all images to load...')
        await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {
          console.log('⚠️ Network idle timeout - continuing anyway')
        })

        // Wait for images to be loaded
        await page.waitForFunction(() => {
          const images = document.querySelectorAll('img')
          return Array.from(images).every(img => img.complete && img.naturalHeight > 0)
        }, { timeout: 15000 }).catch(() => {
          console.log('⚠️ Some images may not be loaded - continuing anyway')
        })

        // Scroll to bottom to ensure answer key is rendered
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        await page.waitForTimeout(2000)

        // Scroll back to top
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.waitForTimeout(1000)

        console.log('✅ Step 5: Worksheet generated and rendered')

        // ========== STEP 6: Open Save to Library Modal ==========
        const saveButton = page.locator('button:has-text("Save to Library")').or(
          page.locator('text=💾 Save to Library')
        )

        await expect(saveButton).toBeVisible({ timeout: 5000 })
        await saveButton.click()

        await expect(page.getByRole('heading', { name: 'Save to Library' })).toBeVisible({ timeout: 5000 })
        console.log('✅ Step 6: Save to Library modal opened')

        // ========== STEP 7: Verify Title is Generated ==========
        const titleInput = page.getByRole('textbox', { name: 'Title *' })
        const titleValue = await titleInput.inputValue()

        expect(titleValue).toBeTruthy()
        expect(titleValue).not.toBe('Generating...')
        console.log(`✅ Step 7: Title generated: "${titleValue}"`)

        // ========== STEP 8: Fill Additional Fields ==========
        const seoTitleInput = page.getByLabel('SEO Title')
        if (await seoTitleInput.isVisible()) {
          await seoTitleInput.fill(`${config.yearGroup} ${config.topic} - ${config.subtopic} | E2E Test`)
        }

        const tagsInput = page.getByLabel('Tags (comma-separated)')
        if (await tagsInput.isVisible()) {
          await tagsInput.fill(`e2e-test, ${config.yearGroup.toLowerCase()}, ${testId}`)
        }
        console.log('✅ Step 8: Additional fields filled')

        // ========== STEP 9: Submit to Library ==========
        const submitButton = page.locator('button:has-text("Save to Library")').last()
        await submitButton.click()
        console.log('⏳ Step 9: Submitting to library...')

        // Wait for success or error (increased timeout for thumbnail generation)
        const successMessage = page.locator('text=Published to Library').or(page.locator('text=Saved to Library')).or(page.locator('text=✅'))
        const errorMessage = page.locator('text=Error').or(page.locator('text=Failed'))

        const result = await Promise.race([
          successMessage.waitFor({ state: 'visible', timeout: 60000 }).then(() => 'success'),
          errorMessage.waitFor({ state: 'visible', timeout: 60000 }).then(() => 'error'),
        ]).catch(() => 'timeout')

        if (result === 'success') {
          console.log('✅ Step 9: Worksheet saved successfully!')

          // Modal should close
          await expect(page.locator('text=Save to Library')).toBeHidden({ timeout: 5000 })

          console.log(`\n✨ SUCCESS: ${config.yearGroup} > ${config.topic} > ${config.subtopic}\n`)
        } else if (result === 'error') {
          const errorText = await page.locator('text=Error').or(page.locator('text=Failed')).textContent()
          console.log(`⚠️ Step 9: Save failed with error: ${errorText}`)

          // Fail the test if save fails
          throw new Error(`Save to library failed: ${errorText}`)
        } else {
          console.log('⏳ Step 9: Request timeout - investigating...')
          throw new Error('Save to library timed out')
        }
    })
  }
})

test.describe('Quick Smoke Test - Sample Configurations', () => {
  // Quick test with just one config from each year group
  test.setTimeout(120000)

  const SMOKE_CONFIGS = [
    { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'counting-to-10', subtopic: 'Counting to 10' },
    { yearGroup: 'Year 1', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'numbers-to-20', subtopic: 'Numbers to 20' },
    { yearGroup: 'Year 2', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'two-digit-numbers', subtopic: 'Two-digit Number Operations' }
  ]

  for (const config of SMOKE_CONFIGS) {
    test(`[SMOKE] ${config.yearGroup} > ${config.topic} > ${config.subtopic}`, async ({ page }) => {
      console.log(`\n🔥 SMOKE TEST: ${config.yearGroup} > ${config.topic} > ${config.subtopic}\n`)

      // Login first
      await loginUser(page)

      // Navigate to create page
      await page.goto('http://localhost:3000/create', { waitUntil: 'networkidle' })
      await page.waitForSelector('[data-testid="year-group-select"]', { timeout: 10000 })

      // Select year group
      const yearGroupValue = config.yearGroup.toLowerCase().replace(/\s+/g, '-')
      await page.getByTestId('year-group-select').click()
      await page.waitForTimeout(300)
      await page.getByTestId(`year-group-option-${yearGroupValue}`).click()
      await page.waitForSelector('[data-testid="topic-select"]:not([disabled])', { timeout: 10000 })

      // Select topic
      await page.getByTestId('topic-select').click()
      await page.waitForTimeout(1000) // Wait for dropdown to populate
      await page.waitForSelector(`[data-testid="topic-option-${config.topicValue}"]`, { timeout: 15000, state: 'visible' })
      await page.getByTestId(`topic-option-${config.topicValue}`).click()
      await page.waitForSelector('[data-testid="subtopic-select"]:not([disabled])', { timeout: 15000 })

      // Select subtopic
      await page.getByTestId('subtopic-select').click()
      await page.waitForTimeout(500)
      await page.waitForSelector(`[data-testid="subtopic-option-${config.subtopicValue}"]`, { timeout: 10000, state: 'visible' })
      await page.getByTestId(`subtopic-option-${config.subtopicValue}`).click()
      await page.waitForTimeout(500)

      // Generate
      const generateButton = page.getByRole('button', { name: 'Generate Worksheet' })
      if (!(await generateButton.isEnabled())) {
        throw new Error('Generate button is disabled')
      }
      await generateButton.click()

      // Wait for Download button
      await page.waitForSelector('text=Download', { timeout: 90000 })
      await page.waitForTimeout(500)

      // Wait for worksheet preview
      await page.waitForSelector('.worksheet-preview, .worksheet', { timeout: 10000, state: 'visible' })

      // Wait for images to load
      await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {})
      await page.waitForFunction(() => {
        const images = document.querySelectorAll('img')
        return Array.from(images).every(img => img.complete && img.naturalHeight > 0)
      }, { timeout: 15000 }).catch(() => {})

      // Scroll to render answer key
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(2000)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(1000)

      // Save to library
      const saveButton = page.locator('button:has-text("Save to Library")')
      await saveButton.click()

      await expect(page.getByRole('heading', { name: 'Save to Library' })).toBeVisible({ timeout: 5000 })

      const titleInput = page.getByRole('textbox', { name: 'Title *' })
      const titleValue = await titleInput.inputValue()
      expect(titleValue).toBeTruthy()

      const submitButton = page.locator('button:has-text("Save to Library")').last()
      await submitButton.click()

      // Wait for success message (increased timeout for thumbnail generation)
      const successMessage = page.locator('text=Published to Library').or(page.locator('text=Saved to Library'))
      await expect(successMessage).toBeVisible({ timeout: 60000 })

      console.log(`✅ SMOKE TEST PASSED: ${config.yearGroup} > ${config.topic} > ${config.subtopic}\n`)
    })
  }
})
