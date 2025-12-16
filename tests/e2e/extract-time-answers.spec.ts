import { test } from '@playwright/test'

/**
 * Helper test to extract answers from time-days-months worksheets
 * This test navigates to each worksheet and extracts the answer key
 */

const worksheets = [
  { slug: 'time-days-and-months-foundation-vfoundation', file: 'time-days-months-foundation-mixed.spec.ts' },
  { slug: 'time-days-and-months-varied-vvaried', file: 'time-days-months-varied-mixed.spec.ts' },
  { slug: 'time-days-and-months-challenge-vchallenge', file: 'time-days-months-challenge-mixed.spec.ts' },
  { slug: 'time-days-and-months-foundation-vfoundation-251216-174443', file: 'time-days-months-foundation-251216-174443.spec.ts' },
  { slug: 'time-days-and-months-varied-vvaried-251216-174454', file: 'time-days-months-varied-251216-174454.spec.ts' },
  { slug: 'time-days-and-months-challenge-vchallenge-251216-174504', file: 'time-days-months-challenge-251216-174504.spec.ts' }
];

for (const ws of worksheets) {
  test(`Extract answers for ${ws.slug}`, async ({ page }) => {
    await page.goto(`/library/${ws.slug}/interactive`)
    await page.waitForSelector('.interactive-worksheet-container', { timeout: 30000 })

    // Count inputs
    const inputs = await page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])').count()
    console.log(`\n${'='.repeat(80)}`)
    console.log(`WORKSHEET: ${ws.slug}`)
    console.log(`TEST FILE: ${ws.file}`)
    console.log('='.repeat(80))
    console.log(`INPUT COUNT: ${inputs}`)

    // Try to extract answer key from page HTML
    const html = await page.content()
    const answerKeyMatch = html.match(/<div class="answer-key"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*$/)

    if (answerKeyMatch) {
      const answers: string[] = []
      const regex = /<p><strong>(\d+)\.<\/strong>\s*([^<]+)/g
      let match

      while ((match = regex.exec(answerKeyMatch[1])) !== null) {
        answers.push(match[2].trim())
        console.log(`Q${match[1]}: ${match[2].trim()}`)
      }

      console.log(`\nArray for test file:`)
      console.log(`const WORKSHEET_ANSWERS = [${answers.map(a => `"${a}"`).join(', ')}]`)
      console.log(`\nAnswers found: ${answers.length}, Inputs found: ${inputs}`)

      if (answers.length !== inputs) {
        console.log(`⚠️  WARNING: Mismatch between answers (${answers.length}) and inputs (${inputs})`)
      }
    } else {
      console.log('ERROR: Could not find answer key in page HTML')
    }
  })
}
