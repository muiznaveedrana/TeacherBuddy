import { test } from '@playwright/test'

/**
 * Helper test to extract answers from worksheets by inspecting data-answer attributes
 * Run this to get the correct answers for updating test files
 */

const worksheets = [
  { slug: 'time-days-and-months-foundation-vfoundation', testFile: 'time-days-months-foundation-mixed.spec.ts' },
  { slug: 'time-days-and-months-varied-vvaried', testFile: 'time-days-months-varied-mixed.spec.ts' },
  { slug: 'time-days-and-months-challenge-vchallenge', testFile: 'time-days-months-challenge-mixed.spec.ts' },
  { slug: 'time-days-and-months-foundation-vfoundation-251216-174443', testFile: 'time-days-months-foundation-251216-174443.spec.ts' },
  { slug: 'time-days-and-months-varied-vvaried-251216-174454', testFile: 'time-days-months-varied-251216-174454.spec.ts' },
  { slug: 'time-days-and-months-challenge-vchallenge-251216-174504', testFile: 'time-days-months-challenge-251216-174504.spec.ts' }
];

for (const ws of worksheets) {
  test(`Extract ${ws.slug}`, async ({ page }) => {
    console.log(`\n${'='.repeat(90)}`)
    console.log(`WORKSHEET: ${ws.slug}`)
    console.log(`TEST FILE: ${ws.testFile}`)
    console.log('='.repeat(90))

    // Navigate to worksheet
    await page.goto(`/library/${ws.slug}/interactive`)
    await page.waitForSelector('.interactive-worksheet-container', { timeout: 30000 })

    // Count inputs
    const inputCount = await page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])').count()
    console.log(`Inputs found: ${inputCount}`)

    // Extract data-answer attributes
    const answers = await page.$$eval(
      '.interactive-worksheet-container input[type="text"]:not([disabled])',
      (inputs) => inputs.map(input => input.getAttribute('data-answer') || '')
    )

    console.log(`Answers found: ${answers.length}\n`)

    answers.forEach((ans, idx) => {
      console.log(`Q${idx + 1}: "${ans}"`)
    })

    console.log(`\n✅ Update test file with:`)
    console.log(`const WORKSHEET_ANSWERS = [${answers.map(a => `"${a}"`).join(', ')}]`)

    if (inputCount !== answers.length) {
      console.log(`\n⚠️  WARNING: Input count (${inputCount}) != Answer count (${answers.length})`)
    }
  })
}
