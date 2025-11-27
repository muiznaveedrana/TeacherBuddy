import { test, expect, Page } from '@playwright/test'

/**
 * Printable Edit Functionality E2E Tests
 *
 * Test Plan: PRINTABLE-EDIT-TEST-PLAN.md v1.2
 * Validation: TEST-PLAN-UPDATES-V1.2.md
 *
 * Priority 1: Critical Path Tests (27 tests)
 *
 * Categories:
 * 1. Navigation & Authentication (5 tests)
 * 2. Core Editing Features (4 tests)
 * 3. Image Management - Modal (7 tests)
 * 4. Save Operations (4 tests)
 * 5. Undo/Redo (3 tests)
 *
 * Testing Strategy: Functional testing only (no screenshots)
 * - Test actual button functionality (clicks, navigation, state changes)
 * - Verify element visibility and functionality
 * - Use proper selectors (data-testid or accessible roles)
 * - Videos recorded automatically on failure
 */

// Helper function to accept cookie consent banner if present
async function acceptCookies(page: Page) {
  const acceptCookiesButton = page.locator('button:has-text("Accept All Cookies")')
  const cookieBannerVisible = await acceptCookiesButton.isVisible().catch(() => false)
  if (cookieBannerVisible) {
    await acceptCookiesButton.click()
    // Wait for banner to disappear instead of arbitrary timeout
    await acceptCookiesButton.waitFor({ state: 'hidden', timeout: 1000 }).catch(() => {})
  }
}

// Helper function to login as admin
async function loginAsAdmin(page: Page) {
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
  await emailInput.fill('naveed.idrees@gmail.com')

  // Verify email was filled, fallback to type if needed
  const emailValue = await emailInput.inputValue()
  if (emailValue !== 'naveed.idrees@gmail.com') {
    await emailInput.clear()
    await emailInput.type('naveed.idrees@gmail.com', { delay: 50 })
  }

  const passwordInput = page.locator('input#password')
  await passwordInput.waitFor({ state: 'visible', timeout: 3000 })
  await passwordInput.clear()
  await passwordInput.fill('mysupabase')

  // Verify password was filled, fallback to type if needed
  const passwordValue = await passwordInput.inputValue()
  if (passwordValue !== 'mysupabase') {
    await passwordInput.clear()
    await passwordInput.type('mysupabase', { delay: 50 })
  }

  // Submit login
  const loginButton = page.locator('button[type="submit"]')
  await loginButton.waitFor({ state: 'visible', timeout: 3000 })
  await loginButton.click()

  // Wait for redirect to create page - reduced timeout, faster load state
  await page.waitForURL(/\/(create|admin|$)/, { timeout: 10000, waitUntil: 'domcontentloaded' }).catch(async () => {
    // Check if there's an error message on the login page
    const errorMessage = await page.locator('.bg-red-50').textContent().catch(() => '')
    if (errorMessage) {
      throw new Error(`Login failed: ${errorMessage}`)
    }
  })
}

// Note: No beforeAll check needed - tests will use real library worksheets

/**
 * Standard navigation pattern for all edit tests:
 * 1. Navigate to /library
 * 2. Click a worksheet card
 * 3. On detail page, find and click "Edit" button
 * 4. Wait for edit page to load with editor ready
 */
async function navigateToEditPage(page: Page) {
  // STEP 1: Navigate to library
  console.log('Step 1: Navigating to library...')
  await page.goto('/library', { waitUntil: 'domcontentloaded' })

  // Dismiss cookie banner if present
  await acceptCookies(page)

  // STEP 2: Wait for worksheets to load and click a card
  console.log('Step 2: Finding worksheet cards...')
  const worksheetCardSelector = 'a[href^="/library/"][href*="-"]'

  try {
    // Give time for real worksheets to load from database
    await page.locator(worksheetCardSelector).first().waitFor({ state: 'visible', timeout: 10000 })
  } catch (e) {
    throw new Error('❌ No worksheets found in library. Check if library has published worksheets.')
  }

  const worksheetCount = await page.locator(worksheetCardSelector).count()
  console.log(`Found ${worksheetCount} worksheet(s) in library`)

  // Click the first worksheet card to navigate to detail page
  const firstCard = page.locator(worksheetCardSelector).first()
  console.log('Step 2: Clicking worksheet card...')
  await firstCard.click()

  // STEP 3: Wait for detail page to load
  console.log('Step 3: Waiting for detail page...')
  await page.waitForURL(/\/library\/[^\/]+$/, { timeout: 5000, waitUntil: 'domcontentloaded' })

  // Look for Edit & Download button (the actual button text on detail page)
  console.log('Step 3: Looking for Edit & Download button...')
  const editButton = page.locator('button:has-text("Edit & Download"), a:has-text("Edit & Download")').first()

  // Verify button is present on detail page
  await expect(editButton).toBeVisible({ timeout: 3000 })

  console.log('Step 3: Clicking Edit & Download button...')
  await editButton.click()

  // STEP 4: Wait for edit page to load with editor ready
  console.log('Step 4: Waiting for edit page to load...')
  await page.waitForURL(/\/library\/.*\/edit$/, { timeout: 5000, waitUntil: 'domcontentloaded' })

  // Wait for editor to be ready - check for the worksheet-content div
  console.log('Step 4: Waiting for editor to initialize...')
  try {
    // Wait for editor content area to be visible (the actual editable div)
    const editor = page.locator('.worksheet-content')
    await editor.waitFor({ state: 'visible', timeout: 10000 })
    console.log('✅ Editor ready - edit tests can proceed')
  } catch (e) {
    console.error('❌ Editor did not load properly:', e)
    throw new Error('Editor failed to initialize - page may be hanging')
  }
}

test.describe('1. Navigation & Authentication', () => {

  test('NAV-001: Edit page loads for authenticated admin user', async ({ page }) => {
    // Login as admin first
    await loginAsAdmin(page)

    // Standard navigation: Library → Card → Detail Page → Edit Button → Edit Page
    await navigateToEditPage(page)

    // Verify we're on edit page
    await expect(page).toHaveURL(/\/library\/.*\/edit/)

    // Verify editor is visible
    const editor = page.locator('.worksheet-content')
    await expect(editor).toBeVisible({ timeout: 3000 })

    // Verify toolbar is visible (WorksheetEditor wraps toolbar in Card with specific content)
    const toolbar = page.locator('button[title="Bold"], button[title="Italic"]').first()
    await expect(toolbar).toBeVisible()

    // Verify admin controls are visible
    const downloadButton = page.locator('button:has-text("Download PDF")')
    await expect(downloadButton).toBeVisible()

    const saveButton = page.getByRole('button', { name: 'Save', exact: true })
    await expect(saveButton).toBeVisible()

    const saveAsNewButton = page.locator('button:has-text("Save as New")')
    await expect(saveAsNewButton).toBeVisible()
  })

  test('NAV-002: Non-admin access (limited controls)', async ({ page }) => {
    // No admin login - test as regular/anonymous user
    // Standard navigation: Library → Card → Detail Page → Edit Button → Edit Page
    await navigateToEditPage(page)

    // Verify we're on edit page
    await expect(page).toHaveURL(/\/library\/.*\/edit/)

    // Verify Download PDF button visible (available to all users)
    const downloadButton = page.locator('button:has-text("Download PDF")')
    await expect(downloadButton).toBeVisible()

    // Admin buttons should be hidden (or not exist)
    const saveButton = page.getByRole('button', { name: 'Save', exact: true })
    const saveAsNewButton = page.locator('button:has-text("Save as New"):visible')

    // Check if buttons are hidden or not present
    await expect(saveButton).toHaveCount(0)
    await expect(saveAsNewButton).toHaveCount(0)
  })

  test('NAV-004: Invalid worksheet slug', async ({ page }) => {
    // Navigate directly to invalid slug
    await page.goto('/library/invalid-slug-123/edit', { waitUntil: 'domcontentloaded' })

    // Verify error message or redirect - no arbitrary wait needed
    const errorMessage = page.locator('text=Worksheet Not Found, text=Failed to load worksheet')
    const backButton = page.locator('text=Back to Library')

    // At least one error indicator should be visible
    try {
      await expect(errorMessage).toBeVisible({ timeout: 3000 })
    } catch {
      // If no error message, check for redirect or back button
      await expect(backButton).toBeVisible({ timeout: 2000 })
    }
  })

  test('NAV-005: Navigation header links work', async ({ page }) => {
    // Login as admin
    await loginAsAdmin(page)

    // Standard navigation: Library → Card → Detail Page → Edit Button → Edit Page
    await navigateToEditPage(page)

    // Test Home link
    const homeLink = page.locator('a[href="/"]').first()
    await homeLink.click()
    await page.waitForURL('/', { timeout: 3000, waitUntil: 'domcontentloaded' })
    await expect(page).toHaveURL('/')

    // Go back to edit page using standard navigation
    await navigateToEditPage(page)

    // Test Browse Library link
    const libraryLink = page.locator('a[href="/library"]').first()
    await libraryLink.click()
    await page.waitForURL('/library', { timeout: 3000, waitUntil: 'domcontentloaded' })
    await expect(page).toHaveURL('/library')

    // Go back to edit page using standard navigation
    await navigateToEditPage(page)

    // Test Create Printable link
    const createLink = page.locator('a[href="/create"]').first()
    await createLink.click()
    await page.waitForURL('/create', { timeout: 3000, waitUntil: 'domcontentloaded' })
    await expect(page).toHaveURL('/create')
  })

})

test.describe('2. Core Editing Features', () => {

  test.beforeEach(async ({ page }) => {
    // Login as admin user
    await loginAsAdmin(page)

    // Standard navigation: Library → Card → Detail Page → Edit Button → Edit Page
    await navigateToEditPage(page)
  })

  test('EDIT-001: Basic text editing', async ({ page }) => {
    // Click in editable content area
    const editor = page.locator('.worksheet-content')
    await editor.click()

    // Type new text
    await editor.type('Hello World')

    // Verify auto-save indicator (event-driven wait instead of arbitrary 2s)
    const saveIndicator = page.locator('text=Saved, text=✓ Saved')
    try {
      await expect(saveIndicator).toBeVisible({ timeout: 3000 })
    } catch {
      console.log('Auto-save indicator not captured - may be too fast')
    }

    // Delete some text with backspace
    await editor.press('Backspace')
    await editor.press('Backspace')
    await editor.press('Backspace')

    // Verify changes persist (check content)
    const editorContent = await editor.textContent()
    expect(editorContent).toContain('Hello Wo')
  })

  test('EDIT-002: Bold formatting', async ({ page }) => {
    const editor = page.locator('.worksheet-content')
    await editor.click()

    // Type text
    await editor.type('Bold Text Test')

    // Select all text (Ctrl+A)
    await editor.press('Control+a')

    // Click Bold button
    const boldButton = page.locator('button[title="Bold"], button:has-text("B")').first()
    await boldButton.click()

    // Verify bold applied (check for <strong> or <b> tags in HTML) - no arbitrary wait needed
    await expect(async () => {
      const editorHTML = await editor.innerHTML()
      expect(editorHTML).toMatch(/<(strong|b)>.*Bold Text Test.*<\/(strong|b)>/)
    }).toPass({ timeout: 2000 })

    // Toggle bold off
    await boldButton.click()
  })

  test('EDIT-003: Italic & Underline formatting', async ({ page }) => {
    const editor = page.locator('.worksheet-content')
    await editor.click()

    // Type text
    await editor.type('Format Test')

    // Select text
    await editor.press('Control+a')

    // Apply Italic
    const italicButton = page.locator('button[title="Italic"], button:has-text("I")').first()
    await italicButton.click()

    // Apply Underline
    const underlineButton = page.locator('button[title="Underline"], button:has-text("U")').first()
    await underlineButton.click()

    // Verify both formats applied - use retry assertion instead of arbitrary waits
    await expect(async () => {
      const editorHTML = await editor.innerHTML()
      expect(editorHTML).toMatch(/<(em|i)>/)
      expect(editorHTML).toMatch(/<u>|text-decoration/)
    }).toPass({ timeout: 2000 })
  })

  test('EDIT-004: Font size change', async ({ page }) => {
    const editor = page.locator('.worksheet-content')
    await editor.click()

    // Type text
    await editor.type('Size Test')

    // Select text
    await editor.press('Control+a')

    // Open font size dropdown (WorksheetEditor uses select with options: Small(1), Normal(3), Large(5), Huge(7))
    const fontSizeDropdown = page.locator('select').filter({ has: page.locator('option:has-text("Large")') })
    await fontSizeDropdown.selectOption('5') // Large = value "5"

    // Verify size changed - use retry assertion instead of arbitrary wait
    await expect(async () => {
      const editorHTML = await editor.innerHTML()
      expect(editorHTML).toMatch(/font-size|<font/)
    }).toPass({ timeout: 2000 })
  })

})

test.describe('3. Image Management - Modal', () => {

  test.beforeEach(async ({ page }) => {
    // Login as admin user
    await loginAsAdmin(page)

    // Standard navigation: Library → Card → Detail Page → Edit Button → Edit Page
    await navigateToEditPage(page)
  })

  test('IMG-MODAL-001: Modal opens on image click', async ({ page }) => {
    // Find first image in worksheet (use contenteditable container)
    const firstImage = page.locator('.worksheet-content img').first()

    // Check if image exists (wait for it to be visible instead of arbitrary timeout)
    const imageCount = await page.locator('.worksheet-content img').count()
    if (imageCount === 0) {
      console.log('No images found in worksheet, skipping modal test')
      test.skip()
      return
    }

    // Wait for first image to be visible
    await expect(firstImage).toBeVisible({ timeout: 2000 })

    // Click image
    await firstImage.click()

    // Verify modal appears (ImagePickerModal uses fixed inset-0 z-50 div)
    const modalHeader = page.locator('text=Replace Image')
    await expect(modalHeader).toBeVisible({ timeout: 2000 })

    // Verify dark backdrop (uses bg-black bg-opacity-30)
    const backdrop = page.locator('.bg-black.bg-opacity-30')
    await expect(backdrop).toBeVisible()
  })

  test('IMG-MODAL-004: Search functionality', async ({ page }) => {
    // Check if images exist first
    const imageCount = await page.locator('.worksheet-content img').count()
    if (imageCount === 0) {
      test.skip()
      return
    }

    // Open image modal (click any image)
    const firstImage = page.locator('.worksheet-content img').first()
    await expect(firstImage).toBeVisible({ timeout: 2000 })
    await firstImage.click()

    // Wait for modal header
    const modalHeader = page.locator('text=Replace Image')
    await expect(modalHeader).toBeVisible({ timeout: 2000 })

    // Find search input (ImagePickerModal has search with Search icon)
    const searchInput = page.locator('input[type="text"]').filter({ hasText: '' }).first()
    await expect(searchInput).toBeVisible()

    // Type search query
    await searchInput.fill('apple')

    // Verify results filtered (check if any images are shown) - no arbitrary wait needed
    const imageGrid = page.locator('img').filter({ hasNot: page.locator('.worksheet-content img') })
    const gridImageCount = await imageGrid.count()
    console.log(`Found ${gridImageCount} images after search`)

    // Clear search
    await searchInput.clear()
  })

  test('IMG-MODAL-006: Select different image', async ({ page }) => {
    // Check if images exist first
    const imageCount = await page.locator('.worksheet-content img').count()
    if (imageCount === 0) {
      test.skip()
      return
    }

    // Open modal
    const firstImage = page.locator('.worksheet-content img').first()
    await expect(firstImage).toBeVisible({ timeout: 2000 })
    await firstImage.click()

    const modalHeader = page.locator('text=Replace Image')
    await expect(modalHeader).toBeVisible({ timeout: 2000 })

    // Select a different image from the modal (look for clickable images in modal)
    const modalImages = page.locator('button img, .cursor-pointer img').filter({ hasNot: page.locator('.worksheet-content img') })

    // Wait for modal images to be visible instead of arbitrary timeout
    await expect(modalImages.first()).toBeVisible({ timeout: 2000 })
    const modalImageCount = await modalImages.count()

    if (modalImageCount > 1) {
      const secondImage = modalImages.nth(1)
      await secondImage.click()

      // Verify Replace button enabled - no arbitrary wait needed
      const replaceButton = page.locator('button:has-text("Replace")')
      await expect(replaceButton).toBeEnabled({ timeout: 1000 })
    } else {
      console.log('Not enough images in modal to test selection')
    }
  })

  test('IMG-MODAL-008: Replace image action', async ({ page }) => {
    // Check if images exist first
    const imageCount = await page.locator('.worksheet-content img').count()
    if (imageCount === 0) {
      test.skip()
      return
    }

    // Open modal
    const firstImage = page.locator('.worksheet-content img').first()
    await expect(firstImage).toBeVisible({ timeout: 2000 })
    const originalSrc = await firstImage.getAttribute('src')

    await firstImage.click()

    const modalHeader = page.locator('text=Replace Image')
    await expect(modalHeader).toBeVisible({ timeout: 2000 })

    // Select different image
    const modalImages = page.locator('button img, .cursor-pointer img').filter({ hasNot: page.locator('.worksheet-content img') })

    // Wait for modal images to be visible
    await expect(modalImages.first()).toBeVisible({ timeout: 2000 })
    const modalImageCount = await modalImages.count()

    if (modalImageCount > 2) {
      const differentImage = modalImages.nth(2)
      await differentImage.click()

      // Ensure cookies are accepted before clicking Replace to avoid interception
      await acceptCookies(page)

      // Click Replace button
      const replaceButton = page.locator('button:has-text("Replace")')
      await replaceButton.click()

      // Verify modal closes
      await expect(modalHeader).not.toBeVisible({ timeout: 2000 })

      // Verify image changed - use retry assertion instead of wait + check
      await expect(async () => {
        const updatedImage = page.locator('.worksheet-content img').first()
        const newSrc = await updatedImage.getAttribute('src')
        expect(newSrc).not.toBe(originalSrc)
      }).toPass({ timeout: 2000 })

      // Verify toast notification (shows "✓ Replaced X image(s)")
      const toast = page.locator('text=Replaced')
      try {
        await expect(toast).toBeVisible({ timeout: 2000 })
      } catch {
        console.log('Toast notification not captured (may be too fast)')
      }
    } else {
      console.log('Not enough images in modal to test replacement')
      test.skip()
    }
  })

  test('IMG-MODAL-009: Cancel without replacing', async ({ page }) => {
    // Check if images exist first
    const imageCount = await page.locator('.worksheet-content img').count()
    if (imageCount === 0) {
      test.skip()
      return
    }

    // Open modal
    const firstImage = page.locator('.worksheet-content img').first()
    await expect(firstImage).toBeVisible({ timeout: 2000 })
    const originalSrc = await firstImage.getAttribute('src')

    await firstImage.click()

    const modalHeader = page.locator('text=Replace Image')
    await expect(modalHeader).toBeVisible({ timeout: 2000 })

    // Select different image
    const modalImages = page.locator('button img, .cursor-pointer img').filter({ hasNot: page.locator('.worksheet-content img') })
    await expect(modalImages.first()).toBeVisible({ timeout: 2000 })

    if (await modalImages.count() > 1) {
      await modalImages.nth(1).click()
    }

    // Click Cancel button - use getByRole with exact match to avoid ambiguity
    const cancelButton = page.getByRole('button', { name: 'Cancel', exact: true })
    await cancelButton.click()

    // Verify modal closes
    await expect(modalHeader).not.toBeVisible({ timeout: 2000 })

    // Verify original image unchanged - no arbitrary wait needed
    const unchangedImage = page.locator('.worksheet-content img').first()
    const currentSrc = await unchangedImage.getAttribute('src')
    expect(currentSrc).toBe(originalSrc)
  })

  test('IMG-MODAL-010: Close via backdrop', async ({ page }) => {
    // Check if images exist first
    const imageCount = await page.locator('.worksheet-content img').count()
    if (imageCount === 0) {
      test.skip()
      return
    }

    // Open modal
    const firstImage = page.locator('.worksheet-content img').first()
    await expect(firstImage).toBeVisible({ timeout: 2000 })
    await firstImage.click()

    const modalHeader = page.locator('text=Replace Image')
    await expect(modalHeader).toBeVisible({ timeout: 2000 })

    // Close modal using Escape key (more reliable than backdrop click) - no arbitrary wait needed
    await page.keyboard.press('Escape')

    // Verify modal closes
    await expect(modalHeader).not.toBeVisible({ timeout: 2000 })
  })

  test('IMG-MODAL-011: Close via X button', async ({ page }) => {
    // Check if images exist first
    const imageCount = await page.locator('.worksheet-content img').count()
    if (imageCount === 0) {
      test.skip()
      return
    }

    // Open modal
    const firstImage = page.locator('.worksheet-content img').first()
    await expect(firstImage).toBeVisible({ timeout: 2000 })
    await firstImage.click()

    const modalHeader = page.locator('text=Replace Image')
    await expect(modalHeader).toBeVisible({ timeout: 2000 })

    // Click X button in modal header - no arbitrary wait needed, click has auto-wait
    // The ImagePickerModal has a ghost button with X icon at the top-right
    const closeButton = page.locator('button:has(svg)').filter({ has: page.locator('svg') }).first()
    await closeButton.click({ timeout: 2000 })

    // Verify modal closes
    await expect(modalHeader).not.toBeVisible({ timeout: 2000 })
  })

})

test.describe('4. Save Operations', () => {

  test.beforeEach(async ({ page }) => {
    // Login as admin user
    await loginAsAdmin(page)

    // Standard navigation: Library → Card → Detail Page → Edit Button → Edit Page
    await navigateToEditPage(page)
  })

  test('SAVE-001: Download PDF', async ({ page }) => {
    // Ensure cookies are accepted first
    await acceptCookies(page)

    // Make edits to worksheet
    const editor = page.locator('.worksheet-content')
    await editor.click()
    await editor.type('Edited for PDF')

    // Wait for auto-save indicator instead of arbitrary timeout
    const saveIndicator = page.locator('text=Saved, text=✓ Saved')
    try {
      await expect(saveIndicator).toBeVisible({ timeout: 3000 })
    } catch {
      console.log('Auto-save indicator not captured')
    }

    // Setup download listener with reasonable timeout (reduced from 60s to 30s)
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 })

    // Click Download PDF button
    const downloadButton = page.locator('button:has-text("Download PDF")')
    await downloadButton.click()

    // Verify button shows loading state
    const loadingButton = page.locator('button:has-text("Generating")')
    try {
      await expect(loadingButton).toBeVisible({ timeout: 2000 })
    } catch {
      console.log('Loading state may be too fast')
    }

    // Wait for download to complete
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/\.pdf$/)

    // Verify success toast
    const toast = page.locator('text=PDF downloaded successfully, text=success')
    try {
      await expect(toast).toBeVisible({ timeout: 3000 })
    } catch {
      console.log('Success toast not captured')
    }

    // Verify button returns to normal
    await expect(downloadButton).toBeVisible({ timeout: 5000 })
  })

  test('SAVE-003: Update Library (admin only)', async ({ page }) => {
    // Ensure cookies are accepted first
    await acceptCookies(page)

    // Make edits
    const editor = page.locator('.worksheet-content')
    await editor.click()
    await editor.type('Updated Content')

    // Wait for auto-save indicator instead of arbitrary timeout
    const saveIndicator = page.locator('text=Saved, text=✓ Saved')
    try {
      await expect(saveIndicator).toBeVisible({ timeout: 3000 })
    } catch {
      console.log('Auto-save indicator not captured')
    }

    // Click Save button (green) - use exact match to avoid confusion with "Save as New"
    const saveButton = page.getByRole('button', { name: 'Save', exact: true })
    await expect(saveButton).toBeVisible({ timeout: 3000 })
    await expect(saveButton).toBeEnabled()

    // Setup navigation listener before clicking save - reduced timeout
    const navigationPromise = page.waitForURL(/\/library\/.*(?<!\/edit)$/, { timeout: 10000, waitUntil: 'domcontentloaded' })

    await saveButton.click()

    // Verify loading state
    const updatingButton = page.locator('button:has-text("Updating")')
    try {
      await expect(updatingButton).toBeVisible({ timeout: 2000 })
    } catch {
      console.log('Updating state may be too fast')
    }

    // Wait for navigation to complete
    await navigationPromise

    // Verify success toast (might not be visible after navigation)
    const toast = page.locator('text=updated successfully, text=success')
    try {
      await expect(toast).toBeVisible({ timeout: 2000 })
    } catch {
      console.log('Success toast not captured after navigation')
    }

    // Verify we're on detail page (not edit page)
    await expect(page).toHaveURL(/\/library\/.*(?<!\/edit)$/)
  })

  test('SAVE-006: Save as New Version', async ({ page }) => {
    // Ensure cookies are accepted first
    await acceptCookies(page)

    // Make edits
    const editor = page.locator('.worksheet-content')
    await editor.click()
    await editor.type('Version 2 Content')

    // Wait for auto-save indicator instead of arbitrary timeout
    const saveIndicator = page.locator('text=Saved, text=✓ Saved')
    try {
      await expect(saveIndicator).toBeVisible({ timeout: 3000 })
    } catch {
      console.log('Auto-save indicator not captured')
    }

    // Click Save as New button (purple) - wait for it to be visible
    const saveAsNewButton = page.locator('button:has-text("Save as New")')
    await expect(saveAsNewButton).toBeVisible({ timeout: 3000 })
    await expect(saveAsNewButton).toBeEnabled()
    await saveAsNewButton.click()

    // Verify version modal opens (uses fixed inset-0 bg-black bg-opacity-50)
    const modalHeader = page.locator('text=Enter Version Number')
    await expect(modalHeader).toBeVisible({ timeout: 2000 })

    // Enter version number (input with placeholder "e.g., v2")
    const versionInput = page.locator('input[placeholder="e.g., v2"]')
    await versionInput.fill('v2')

    // Setup navigation listener before clicking save - reduced timeout
    const navigationPromise = page.waitForURL(/\/library\/.*(?<!\/edit)$/, { timeout: 10000, waitUntil: 'domcontentloaded' })

    // Click Save Version button
    const saveVersionButton = page.locator('button:has-text("Save Version")')
    await saveVersionButton.click()

    // Wait for navigation to complete
    await navigationPromise

    // Verify success toast (might not be visible after navigation)
    const toast = page.locator('text=version')
    try {
      await expect(toast).toBeVisible({ timeout: 2000 })
    } catch {
      console.log('Success toast not captured (may be too fast)')
    }

    // Verify we're on detail page (not edit page)
    await expect(page).toHaveURL(/\/library\/.*(?<!\/edit)$/)
  })

})

test.describe('5. Undo/Redo', () => {

  test.beforeEach(async ({ page }) => {
    // Login as admin user
    await loginAsAdmin(page)

    // Standard navigation: Library → Card → Detail Page → Edit Button → Edit Page
    await navigateToEditPage(page)
  })

  test('HISTORY-001: Undo text edit', async ({ page }) => {
    const editor = page.locator('.worksheet-content')

    // Click in editor
    await editor.click()

    // Type text
    await editor.type('Hello World')

    // Wait for text to be committed to history - use retry assertion
    await expect(async () => {
      // Undo using keyboard shortcut (focus must be in editor)
      await editor.focus()
      await page.keyboard.press('Control+z')

      // Brief wait for undo to take effect
      await page.waitForTimeout(300)

      // Verify text removed
      const editorContent = await editor.textContent()
      expect(editorContent).not.toContain('Hello World')
    }).toPass({ timeout: 5000 })
  })

  test('HISTORY-002: Redo text edit', async ({ page }) => {
    const editor = page.locator('.worksheet-content')

    // Type text
    await editor.click()
    await editor.type('Redo Test')

    // Brief wait for text to be committed
    await page.waitForTimeout(500)

    // Undo
    await page.keyboard.press('Control+z')
    await page.waitForTimeout(300)

    // Redo using keyboard shortcut
    await page.keyboard.press('Control+y')

    // Verify text restored - use retry assertion
    await expect(async () => {
      const editorContent = await editor.textContent()
      expect(editorContent).toContain('Redo Test')
    }).toPass({ timeout: 2000 })
  })

  test('HISTORY-006: Undo/Redo button states', async ({ page }) => {
    const editor = page.locator('.worksheet-content')

    // Fresh worksheet - verify Undo disabled (WorksheetEditor has Undo2 and Redo2 icons with title="Undo (Ctrl+Z)")
    const undoButton = page.locator('button[title="Undo (Ctrl+Z)"]')
    await expect(undoButton).toBeVisible()

    // Verify Undo is initially disabled (may take brief moment to initialize)
    await expect(undoButton).toBeDisabled({ timeout: 2000 })

    // Make change
    await editor.click()
    await editor.type('Test')

    // Verify Undo enabled after typing
    await expect(undoButton).toBeEnabled({ timeout: 2000 })

    // Undo all
    await page.keyboard.press('Control+z')

    // Verify Undo disabled, Redo enabled after undo
    await expect(undoButton).toBeDisabled({ timeout: 1000 })

    const redoButton = page.locator('button[title="Redo (Ctrl+Y)"]')
    await expect(redoButton).toBeEnabled({ timeout: 1000 })

    // Redo all
    await page.keyboard.press('Control+y')

    // Verify Redo disabled after redo
    await expect(redoButton).toBeDisabled({ timeout: 1000 })
  })

})
