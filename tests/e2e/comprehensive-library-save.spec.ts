import { test, expect, Page, BrowserContext } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

/**
 * COMPREHENSIVE LIBRARY SAVE TEST
 * Tests printable generation and save for ALL configurations across:
 * - Reception (3 topics × 15 subtopics)
 * - Year 1 (5 topics × 13 subtopics)
 * - Year 2 (8 topics × 26 subtopics)
 * Total: 54 configurations
 */

// Login credentials
const LOGIN_EMAIL = 'naveed.idrees@gmail.com'
const LOGIN_PASSWORD = 'mysupabase'

// Auth state file path
const AUTH_STATE_PATH = path.join(__dirname, '.auth-state.json')

/**
 * Helper function to accept cookie consent banner if present
 */
async function acceptCookies(page: Page) {
  // Wait a bit for cookie banner to appear (it might load after page)
  await page.waitForTimeout(500)

  // Try multiple selectors for cookie banner
  const acceptCookiesButton = page.locator('button:has-text("Accept All Cookies")')
    .or(page.locator('button:has-text("Accept Cookies")'))
    .or(page.locator('button:has-text("Accept All")'))
    .first()

  const cookieBannerVisible = await acceptCookiesButton.isVisible().catch(() => false)
  if (cookieBannerVisible) {
    await acceptCookiesButton.click()
    // Wait for banner to disappear
    await acceptCookiesButton.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {
      console.log('⚠️ Cookie banner did not disappear, but continuing...')
    })
  }
}

/**
 * Helper function to select an option from a Radix UI Select dropdown
 * Handles the Portal rendering and timing issues
 */
async function selectRadixOption(
  page: Page,
  triggerTestId: string,
  optionTestId: string,
  optionLabel: string
): Promise<void> {
  console.log(`      🔍 Opening dropdown: ${triggerTestId}`)

  // Click the select trigger
  const trigger = page.getByTestId(triggerTestId)
  await trigger.click()

  // Wait for dropdown animation
  await page.waitForTimeout(500)

  // Find the dropdown content (it's in a Portal)
  const dropdownTestId = triggerTestId.replace('-select', '-dropdown')
  const dropdown = page.locator(`[data-testid="${dropdownTestId}"]`)

  // Wait for dropdown to be visible
  await dropdown.waitFor({ state: 'visible', timeout: 5000 }).catch(async (e) => {
    console.error(`      ❌ Dropdown ${dropdownTestId} not visible:`, e.message)
    // Take a screenshot for debugging
    await page.screenshot({ path: `debug-dropdown-${Date.now()}.png`, fullPage: true })
    throw new Error(`Dropdown ${dropdownTestId} did not become visible`)
  })

  console.log(`      ✅ Dropdown opened`)

  // Wait for content to load (API calls might be in progress)
  await page.waitForTimeout(1500)

  // Log all available options - try to get all option elements
  const allOptionElements = await page.locator(`[data-testid^="${optionTestId.replace(/-[^-]+$/, '-')}"]`).all()
  const allOptions = await Promise.all(allOptionElements.map(async (el) => {
    const testId = await el.getAttribute('data-testid')
    const text = await el.textContent()
    return { testId, text }
  }))
  console.log(`      📋 Available options (${allOptions.length}):`, allOptions.slice(0, 10))

  // Wait for specific option to be visible
  console.log(`      🔍 Looking for option: ${optionTestId}`)
  const option = page.locator(`[data-testid="${optionTestId}"]`)

  await option.waitFor({ state: 'visible', timeout: 15000 }).catch(async (e) => {
    console.error(`      ❌ Option ${optionTestId} not found:`, e.message)
    // Log the actual HTML structure for debugging
    const html = await dropdown.innerHTML()
    console.error(`      📄 Dropdown HTML:`, html.substring(0, 500))
    throw new Error(`Option ${optionTestId} (${optionLabel}) not found in dropdown`)
  })

  console.log(`      ✅ Option found: ${optionLabel}`)

  // Scroll into view if needed
  await option.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)

  // Click the option
  await option.click()
  console.log(`      ✅ Option clicked: ${optionLabel}`)
}

/**
 * Helper function to login before tests
 * (Exact copy of working pattern from edit.spec.ts)
 */
async function loginUser(page: Page) {
  console.log('🔐 Logging in...')

  // Navigate to login page
  await page.goto('/login')
  await page.waitForLoadState('domcontentloaded')

  // Accept cookies first
  await acceptCookies(page)

  // Wait for the login form to be ready
  await page.waitForSelector('input#email', { state: 'visible', timeout: 5000 })

  // Fill in admin credentials using more reliable method with ID selectors
  const emailInput = page.locator('input#email')
  await emailInput.waitFor({ state: 'visible', timeout: 3000 })
  await emailInput.clear()
  await emailInput.fill(LOGIN_EMAIL)

  // Verify email was filled, fallback to type if needed
  const emailValue = await emailInput.inputValue()
  if (emailValue !== LOGIN_EMAIL) {
    await emailInput.clear()
    await emailInput.type(LOGIN_EMAIL, { delay: 50 })
  }

  const passwordInput = page.locator('input#password')
  await passwordInput.waitFor({ state: 'visible', timeout: 3000 })
  await passwordInput.clear()
  await passwordInput.fill(LOGIN_PASSWORD)

  // Verify password was filled, fallback to type if needed
  const passwordValue = await passwordInput.inputValue()
  if (passwordValue !== LOGIN_PASSWORD) {
    await passwordInput.clear()
    await passwordInput.type(LOGIN_PASSWORD, { delay: 50 })
  }

  console.log('✅ Credentials entered')

  // Submit login
  const loginButton = page.locator('button[type="submit"]')
  await loginButton.waitFor({ state: 'visible', timeout: 3000 })
  await loginButton.click()

  console.log('⏳ Waiting for login to complete...')

  // Wait for redirect to create page - reduced timeout, faster load state
  await page.waitForURL(/\/(create|admin|$)/, { timeout: 10000, waitUntil: 'domcontentloaded' }).catch(async () => {
    // Check if there's an error message on the login page
    const errorMessage = await page.locator('.bg-red-50').textContent().catch(() => '')
    if (errorMessage) {
      throw new Error(`Login failed: ${errorMessage}`)
    }
  })

  console.log('✅ Login complete - redirected successfully')
}

/**
 * Setup: Login once and save auth state for all tests
 * This runs before all tests and persists the session
 */
async function setupAuthState(context: BrowserContext): Promise<void> {
  // Check if we already have valid auth state
  if (fs.existsSync(AUTH_STATE_PATH)) {
    console.log('🔐 Found existing auth state, verifying...')
    try {
      const state = JSON.parse(fs.readFileSync(AUTH_STATE_PATH, 'utf-8'))
      // Check if state has cookies (simple validation)
      if (state.cookies && state.cookies.length > 0) {
        console.log('✅ Using cached auth state')
        await context.addCookies(state.cookies)
        return
      }
    } catch (e) {
      console.log('⚠️ Auth state invalid, re-authenticating...')
    }
  }

  // Login fresh and save state
  console.log('🔐 No valid auth state found, logging in...')
  const page = await context.newPage()
  await loginUser(page)

  // Save the auth state
  const state = await context.storageState()
  fs.writeFileSync(AUTH_STATE_PATH, JSON.stringify(state, null, 2))
  console.log('✅ Auth state saved to', AUTH_STATE_PATH)

  await page.close()
}

// Test configurations - Complete curriculum mapping
const TEST_CONFIGURATIONS = [
  // ========== RECEPTION (Ages 4-5) - 15 subtopics ==========
  // Number and Counting (7)
  { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'counting-to-10', subtopic: 'Counting to 10' },
  { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'number-recognition', subtopic: 'Number Recognition' },
  { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'more-or-less', subtopic: 'More or Less' },
  { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'early-addition', subtopic: 'Early Addition' },
  { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'early-subtraction', subtopic: 'Early Subtraction' },
  { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'number-bonds', subtopic: 'Number Bonds' },
  { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'subitising', subtopic: 'Subitising' },

  // Shape and Space (4)
  { yearGroup: 'Reception', topicValue: 'shape-space', topic: 'Shape and Space', subtopicValue: 'basic-shapes', subtopic: 'Basic Shapes' },
  { yearGroup: 'Reception', topicValue: 'shape-space', topic: 'Shape and Space', subtopicValue: 'patterns', subtopic: 'Simple Patterns' },
  { yearGroup: 'Reception', topicValue: 'shape-space', topic: 'Shape and Space', subtopicValue: 'size-comparison', subtopic: 'Size Comparison' },
  { yearGroup: 'Reception', topicValue: 'shape-space', topic: 'Shape and Space', subtopicValue: 'position-direction', subtopic: 'Position and Direction' },

  // Measurement (4)
  { yearGroup: 'Reception', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'length-comparison', subtopic: 'Length Comparison' },
  { yearGroup: 'Reception', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'weight-comparison', subtopic: 'Weight Comparison' },
  { yearGroup: 'Reception', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'capacity', subtopic: 'Capacity' },
  { yearGroup: 'Reception', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'time-concepts', subtopic: 'Time Concepts' },

  // ========== YEAR 1 (Ages 5-6) - 13 subtopics ==========
  // Number and Place Value (3)
  { yearGroup: 'Year 1', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'numbers-to-20', subtopic: 'Numbers to 20' },
  { yearGroup: 'Year 1', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'counting-forwards-backwards', subtopic: 'Counting Forwards and Backwards' },
  { yearGroup: 'Year 1', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'number-bonds-10', subtopic: 'Number Bonds to 10' },

  // Addition and Subtraction (3)
  { yearGroup: 'Year 1', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'adding-to-20', subtopic: 'Adding within 20' },
  { yearGroup: 'Year 1', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'subtracting-within-20', subtopic: 'Subtracting within 20' },
  { yearGroup: 'Year 1', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'word-problems-simple', subtopic: 'Simple Word Problems' },

  // Measurement (4)
  { yearGroup: 'Year 1', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'length-height', subtopic: 'Length and Height' },
  { yearGroup: 'Year 1', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'weight-capacity', subtopic: 'Weight and Capacity' },
  { yearGroup: 'Year 1', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'time-days-months', subtopic: 'Time - Days and Months' },
  { yearGroup: 'Year 1', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'coins-recognition', subtopic: 'Money - Coins Recognition' },

  // Geometry: Shapes (2)
  { yearGroup: 'Year 1', topicValue: 'geometry-shapes', topic: 'Geometry: Shapes', subtopicValue: '2d-shapes-basic', subtopic: '2D Shapes (Basic)' },
  { yearGroup: 'Year 1', topicValue: 'geometry-shapes', topic: 'Geometry: Shapes', subtopicValue: '3d-shapes-basic', subtopic: '3D Shapes (Basic)' },

  // Fractions (1)
  { yearGroup: 'Year 1', topicValue: 'fractions', topic: 'Fractions', subtopicValue: 'halves-and-quarters', subtopic: 'Halves and Quarters' },

  // ========== YEAR 2 (Ages 6-7) - 26 subtopics ==========
  // Number and Place Value (3)
  { yearGroup: 'Year 2', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'numbers-to-100', subtopic: 'Numbers to 100' },
  { yearGroup: 'Year 2', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'comparing-numbers', subtopic: 'Comparing Numbers' },
  { yearGroup: 'Year 2', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'rounding-nearest-10', subtopic: 'Rounding to Nearest 10' },

  // Addition and Subtraction (3)
  { yearGroup: 'Year 2', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'two-digit-numbers', subtopic: 'Two-digit Number Operations' },
  { yearGroup: 'Year 2', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'mental-strategies', subtopic: 'Mental Calculation Strategies' },
  { yearGroup: 'Year 2', topicValue: 'addition-subtraction', topic: 'Addition and Subtraction', subtopicValue: 'word-problems', subtopic: 'Word Problems' },

  // Multiplication and Division (3)
  { yearGroup: 'Year 2', topicValue: 'multiplication-division', topic: 'Multiplication and Division', subtopicValue: 'times-tables-2-5-10', subtopic: 'Times Tables 2, 5, 10' },
  { yearGroup: 'Year 2', topicValue: 'multiplication-division', topic: 'Multiplication and Division', subtopicValue: 'equal-groups', subtopic: 'Equal Groups' },
  { yearGroup: 'Year 2', topicValue: 'multiplication-division', topic: 'Multiplication and Division', subtopicValue: 'sharing-grouping', subtopic: 'Sharing and Grouping' },

  // Fractions (3)
  { yearGroup: 'Year 2', topicValue: 'fractions', topic: 'Fractions', subtopicValue: 'recognising-fractions', subtopic: 'Recognising Fractions' },
  { yearGroup: 'Year 2', topicValue: 'fractions', topic: 'Fractions', subtopicValue: 'finding-fractions', subtopic: 'Finding Fractions' },
  { yearGroup: 'Year 2', topicValue: 'fractions', topic: 'Fractions', subtopicValue: 'equivalent-fractions-simple', subtopic: 'Simple Equivalent Fractions' },

  // Measurement (5)
  { yearGroup: 'Year 2', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'length-and-height', subtopic: 'Length and Height (cm, m)' },
  { yearGroup: 'Year 2', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'mass-and-weight', subtopic: 'Mass and Weight (g, kg)' },
  { yearGroup: 'Year 2', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'capacity-and-volume', subtopic: 'Capacity and Volume (ml, l)' },
  { yearGroup: 'Year 2', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'money', subtopic: 'Money (pence and pounds)' },
  { yearGroup: 'Year 2', topicValue: 'measurement', topic: 'Measurement', subtopicValue: 'time', subtopic: 'Time (o\'clock, half past, quarter to/past)' },

  // Statistics (3)
  { yearGroup: 'Year 2', topicValue: 'statistics', topic: 'Statistics', subtopicValue: 'pictograms', subtopic: 'Pictograms' },
  { yearGroup: 'Year 2', topicValue: 'statistics', topic: 'Statistics', subtopicValue: 'tally-charts', subtopic: 'Tally Charts' },
  { yearGroup: 'Year 2', topicValue: 'statistics', topic: 'Statistics', subtopicValue: 'block-diagrams-tables', subtopic: 'Block Diagrams and Tables' },

  // Geometry: Properties of Shapes (3)
  { yearGroup: 'Year 2', topicValue: 'geometry-shapes', topic: 'Geometry: Properties of Shapes', subtopicValue: '2d-shapes-properties', subtopic: '2D Shapes and Properties' },
  { yearGroup: 'Year 2', topicValue: 'geometry-shapes', topic: 'Geometry: Properties of Shapes', subtopicValue: '3d-shapes-properties', subtopic: '3D Shapes and Properties' },
  { yearGroup: 'Year 2', topicValue: 'geometry-shapes', topic: 'Geometry: Properties of Shapes', subtopicValue: 'sorting-shapes', subtopic: 'Sorting and Classifying Shapes' },

  // Geometry: Position and Direction (3)
  { yearGroup: 'Year 2', topicValue: 'geometry-position', topic: 'Geometry: Position and Direction', subtopicValue: 'position-direction', subtopic: 'Position and Direction' },
  { yearGroup: 'Year 2', topicValue: 'geometry-position', topic: 'Geometry: Position and Direction', subtopicValue: 'movement', subtopic: 'Movement and Patterns' },
  { yearGroup: 'Year 2', topicValue: 'geometry-position', topic: 'Geometry: Position and Direction', subtopicValue: 'turns', subtopic: 'Turns (Whole, Half, Quarter)' }
]

test.describe('Comprehensive Library Save - All Configurations', () => {
  // Increase timeout: generation (60-90s) + save to library (up to 120s)
  test.setTimeout(180000)

  // Track if auth has been set up in this test run
  let authSetupComplete = false

  // Setup auth state once before first test runs
  test.beforeEach(async ({ context, page }) => {
    if (!authSetupComplete) {
      await setupAuthState(context)
      authSetupComplete = true
    } else if (fs.existsSync(AUTH_STATE_PATH)) {
      // Load saved state for subsequent tests
      const state = JSON.parse(fs.readFileSync(AUTH_STATE_PATH, 'utf-8'))
      if (state.cookies) {
        await context.addCookies(state.cookies)
      }
    }
  })

  // Generate a test for each configuration
  for (const config of TEST_CONFIGURATIONS) {
    test(`should generate and save: ${config.yearGroup} > ${config.topic} > ${config.subtopic}`, async ({ page }) => {
      const testId = `${config.yearGroup}-${config.topicValue}-${config.subtopicValue}`.replace(/\s+/g, '-').toLowerCase()

      console.log(`\n${'='.repeat(60)}`)
      console.log(`🧪 Testing: ${config.yearGroup} > ${config.topic} > ${config.subtopic}`)
      console.log(`${'='.repeat(60)}\n`)

        // ========== STEP 1: Navigate to Create Page (already logged in via storageState) ==========
        await page.goto('http://localhost:3000/create')
        await page.waitForLoadState('domcontentloaded')

        // Accept cookies again (banner may reappear on create page)
        await acceptCookies(page)

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
        await selectRadixOption(
          page,
          'topic-select',
          `topic-option-${config.topicValue}`,
          config.topic
        )
        await page.waitForSelector('[data-testid="subtopic-select"]:not([disabled])', { timeout: 15000 })
        console.log(`✅ Step 3: Selected topic: ${config.topic}`)

        // ========== STEP 4: Select Subtopic ==========
        await selectRadixOption(
          page,
          'subtopic-select',
          `subtopic-option-${config.subtopicValue}`,
          config.subtopic
        )
        await page.waitForTimeout(500) // Wait for state to update
        console.log(`✅ Step 4: Selected subtopic: ${config.subtopic}`)

        // ========== STEP 5: Generate Printable ==========
        // Wait for Generate button to be visible and enabled
        const generateButton = page.getByRole('button', { name: 'Generate Printable' })
        await generateButton.waitFor({ state: 'visible', timeout: 10000 })

        // Scroll the button into view if needed
        await generateButton.scrollIntoViewIfNeeded()

        const isEnabled = await generateButton.isEnabled()
        if (!isEnabled) {
          throw new Error('Generate button is disabled')
        }

        await generateButton.click()
        console.log('⏳ Step 5: Generating printable (this may take 60-90 seconds)...')

        // Wait for Download button to appear
        await page.waitForSelector('text=Download', { timeout: 90000 })
        await page.waitForTimeout(500) // React state update

        // Wait for printable preview to be visible
        console.log('⏳ Step 5: Waiting for printable preview...')
        await page.waitForSelector('.worksheet-preview, .worksheet', {
          timeout: 10000,
          state: 'visible'
        })

        // Wait for images to load
        console.log('⏳ Step 5: Waiting for all images to load...')
        await page.waitForTimeout(2000)

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

        console.log('✅ Step 5: Printable generated and rendered')

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

        // ========== STEP 8: Submit to Library (use auto-generated title, no extra fields) ==========
        const submitButton = page.locator('button:has-text("Save to Library")').last()
        await submitButton.click()
        console.log('⏳ Step 8: Submitting to library...')

        // Wait for redirect to /library (most reliable success indicator) or error
        // The app shows "Published to Library!" then "Opening library..." then navigates
        try {
          await page.waitForURL(/\/library/, { timeout: 120000 })
          console.log('✅ Step 8: Printable saved successfully - redirected to library!')
          console.log(`\n✨ SUCCESS: ${config.yearGroup} > ${config.topic} > ${config.subtopic}\n`)
        } catch (e) {
          // Check if there was an error message
          const errorVisible = await page.locator('text=Error').or(page.locator('text=Failed')).isVisible()
          if (errorVisible) {
            const errorText = await page.locator('text=Error').or(page.locator('text=Failed')).textContent()
            console.log(`⚠️ Step 8: Save failed with error: ${errorText}`)
            throw new Error(`Save to library failed: ${errorText}`)
          } else {
            console.log('⏳ Step 8: Request timeout - investigating...')
            throw new Error('Save to library timed out - no redirect to /library')
          }
        }
    })
  }
})

test.describe('Quick Smoke Test - Sample Configurations', () => {
  // Quick test with just one config from each year group
  // Timeout: generation (60-90s) + save to library (up to 120s)
  test.setTimeout(180000)

  // Track if auth has been set up in this test run
  let authSetupComplete = false

  // Setup auth state once before first test runs
  test.beforeEach(async ({ context, page }) => {
    if (!authSetupComplete) {
      await setupAuthState(context)
      authSetupComplete = true
    } else if (fs.existsSync(AUTH_STATE_PATH)) {
      // Load saved state for subsequent tests
      const state = JSON.parse(fs.readFileSync(AUTH_STATE_PATH, 'utf-8'))
      if (state.cookies) {
        await context.addCookies(state.cookies)
      }
    }
  })

  const SMOKE_CONFIGS = [
    { yearGroup: 'Reception', topicValue: 'number-counting', topic: 'Number and Counting', subtopicValue: 'counting-to-10', subtopic: 'Counting to 10' },
    { yearGroup: 'Year 1', topicValue: 'number-place-value', topic: 'Number and Place Value', subtopicValue: 'numbers-to-20', subtopic: 'Numbers to 20' },
    { yearGroup: 'Year 2', topicValue: 'multiplication-division', topic: 'Multiplication and Division', subtopicValue: 'times-tables-2-5-10', subtopic: 'Times Tables 2, 5, 10' }
  ]

  for (const config of SMOKE_CONFIGS) {
    test(`[SMOKE] ${config.yearGroup} > ${config.topic} > ${config.subtopic}`, async ({ page }) => {
      console.log(`\n🔥 SMOKE TEST: ${config.yearGroup} > ${config.topic} > ${config.subtopic}\n`)

      // Listen for API calls to debug what topics are being loaded
      page.on('response', async (response) => {
        const url = response.url()
        if (url.includes('/api/curriculum/topics')) {
          const status = response.status()
          console.log(`      📡 API Call: ${url} - Status: ${status}`)
          if (status === 200) {
            try {
              const data = await response.json()
              console.log(`      📦 API Response:`, JSON.stringify(data, null, 2))
            } catch (e) {
              console.log(`      ⚠️ Could not parse API response`)
            }
          }
        }
      })

      // Navigate directly to create page (already logged in via storageState)
      await page.goto('http://localhost:3000/create')
      await page.waitForLoadState('domcontentloaded')

      // Accept cookies if banner appears
      await acceptCookies(page)

      await page.waitForSelector('[data-testid="year-group-select"]', { timeout: 10000 })

      // Select year group using Radix helper for consistency
      const yearGroupValue = config.yearGroup.toLowerCase().replace(/\s+/g, '-')
      console.log(`      🔍 Selecting year group: ${config.yearGroup} (value: ${yearGroupValue})`)

      // Click the year group select trigger
      await page.getByTestId('year-group-select').click()

      // Wait for dropdown to open and option to be visible
      const yearOption = page.getByTestId(`year-group-option-${yearGroupValue}`)
      await yearOption.waitFor({ state: 'visible', timeout: 5000 })
      await yearOption.click()
      console.log(`      ✅ Year group clicked: ${config.yearGroup}`)

      // Verify year group was actually selected by checking the trigger text
      await page.waitForTimeout(500)
      const selectedYearGroupText = await page.getByTestId('year-group-select').innerText()
      console.log(`      ✅ Year group confirmed selected: "${selectedYearGroupText}"`)

      // Wait for topics to load
      await page.waitForSelector('[data-testid="topic-select"]:not([disabled])', { timeout: 10000 })
      console.log(`      ✅ Topic dropdown is now enabled`)

      // Extra wait for API response to complete
      await page.waitForTimeout(1500)
      console.log(`      ⏳ Topics should be fully loaded now`)

      // Select topic
      await selectRadixOption(
        page,
        'topic-select',
        `topic-option-${config.topicValue}`,
        config.topic
      )
      await page.waitForSelector('[data-testid="subtopic-select"]:not([disabled])', { timeout: 15000 })
      console.log(`      ✅ Topic selected: ${config.topic}`)

      // Select subtopic
      await selectRadixOption(
        page,
        'subtopic-select',
        `subtopic-option-${config.subtopicValue}`,
        config.subtopic
      )
      await page.waitForTimeout(500)

      // Generate
      const generateButton = page.getByRole('button', { name: 'Generate Printable' })
      await generateButton.waitFor({ state: 'visible', timeout: 10000 })
      await generateButton.scrollIntoViewIfNeeded()

      if (!(await generateButton.isEnabled())) {
        throw new Error('Generate button is disabled')
      }
      await generateButton.click()

      // Wait for Download button
      await page.waitForSelector('text=Download', { timeout: 90000 })
      await page.waitForTimeout(500)

      // Wait for printable preview
      await page.waitForSelector('.worksheet-preview, .worksheet', { timeout: 10000, state: 'visible' })

      // Wait for images to load
      await page.waitForTimeout(2000)
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

      // Wait for redirect to library page OR success message (whichever comes first)
      // The save triggers navigation to /library after success (120s timeout)
      await Promise.race([
        page.waitForURL(/\/library/, { timeout: 120000 }),
        expect(page.locator('text=Published to Library!').or(page.locator('text=Opening library'))).toBeVisible({ timeout: 120000 })
      ])

      // Verify we're on the library page (confirms save worked)
      await expect(page).toHaveURL(/\/library/, { timeout: 15000 })

      console.log(`✅ SMOKE TEST PASSED: ${config.yearGroup} > ${config.topic} > ${config.subtopic}\n`)
    })
  }
})
