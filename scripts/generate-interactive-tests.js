/**
 * Generate Interactive Worksheet Tests
 *
 * Extracts answers from worksheet html_content and generates E2E test files
 *
 * Usage:
 *   node scripts/generate-interactive-tests.js                    # Generate for all missing
 *   node scripts/generate-interactive-tests.js --year="Year 1"    # Generate for specific year
 *   node scripts/generate-interactive-tests.js --slug="some-slug" # Generate for specific worksheet
 *   node scripts/generate-interactive-tests.js --dry-run          # Preview without writing files
 */

const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3000';

async function fetchWorksheets() {
  const response = await fetch(`${API_BASE}/api/library/browse?limit=1000`);
  const data = await response.json();
  return data.worksheets || [];
}

async function fetchWorksheetDetails(slug) {
  const response = await fetch(`${API_BASE}/api/library/worksheets/${slug}`);
  return response.json();
}

function extractAnswersFromHtml(htmlContent) {
  if (!htmlContent) return null;

  // Pattern 1: Answer key with numbered answers
  // <p><strong>1.</strong> answer</p>
  const pattern1 = /<p><strong>(\d+)\.<\/strong>\s*(.+?)<\/p>/g;

  // Pattern 2: Answer key list items
  // <li>1. answer</li> or <li>answer</li>
  const pattern2 = /<li>(?:\d+\.\s*)?(.+?)<\/li>/g;

  // Pattern 3: Comma-separated in answer-key div
  const answerKeyMatch = htmlContent.match(/<div[^>]*class="[^"]*answer-key[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

  let answers = [];

  // Try pattern 1 first
  let match;
  while ((match = pattern1.exec(htmlContent)) !== null) {
    answers.push(match[2].trim());
  }

  if (answers.length === 0 && answerKeyMatch) {
    // Try extracting from answer-key div
    const keyContent = answerKeyMatch[1];
    while ((match = pattern2.exec(keyContent)) !== null) {
      answers.push(match[1].trim());
    }
  }

  // Clean answers (remove HTML tags)
  answers = answers.map(a => a.replace(/<[^>]+>/g, '').trim());

  return answers.length > 0 ? answers : null;
}

function generateTestCode(slug, answers, yearGroup) {
  const answersStr = answers.map(a => `"${a.replace(/"/g, '\\"')}"`).join(', ');

  return `import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = '${slug}'
const WORKSHEET_ANSWERS = [${answersStr}]

async function dismissCookieConsent(page: any) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach((el: any) => {
      if (el.style?.position === 'fixed') el.remove()
    })
  })
}

test.describe(\`Interactive: \${WORKSHEET_SLUG} (${yearGroup})\`, () => {
  test('should complete with 100% score', async ({ page }) => {
    await page.goto(\`/library/\${WORKSHEET_SLUG}/interactive\`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(\`Found \${inputCount} inputs, have \${WORKSHEET_ANSWERS.length} answers\`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click()
      await input.pressSequentially(WORKSHEET_ANSWERS[i], { delay: 50 })
    }

    await dismissCookieConsent(page)
    const submitButton = page.locator('.sticky.bottom-0 button').first()
    await submitButton.click({ force: true })

    const celebrationOverlay = page.locator('.fixed.inset-0.z-50')
    await expect(celebrationOverlay).toBeVisible({ timeout: 10000 })

    const scoreText = await page.locator('text=/\\\\d+%/').first().textContent()
    console.log(\`Score: \${scoreText}\`)
    expect(scoreText).toBe('100%')
  })
})
`;
}

function getExistingTests() {
  const testDir = path.join(__dirname, '..', 'tests', 'e2e');
  const files = fs.readdirSync(testDir).filter(f => f.startsWith('interactive-') && f.endsWith('.spec.ts'));

  const testedSlugs = new Set();
  files.forEach(file => {
    const content = fs.readFileSync(path.join(testDir, file), 'utf8');
    const match = content.match(/WORKSHEET_SLUG\s*=\s*['"]([^'"]+)['"]/);
    if (match) testedSlugs.add(match[1]);

    // Also check for goto patterns
    const gotoMatches = content.matchAll(/goto\([`'"]\/library\/([^\/]+)\/interactive/g);
    for (const m of gotoMatches) {
      testedSlugs.add(m[1]);
    }
  });

  return testedSlugs;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const yearFilter = args.find(a => a.startsWith('--year='))?.split('=')[1];
  const slugFilter = args.find(a => a.startsWith('--slug='))?.split('=')[1];

  console.log('Fetching worksheets from localhost...');
  const worksheets = await fetchWorksheets();
  console.log(`Found ${worksheets.length} worksheets\n`);

  const existingTests = getExistingTests();
  console.log(`Found ${existingTests.size} existing test slugs\n`);

  let filtered = worksheets;
  if (yearFilter) {
    filtered = filtered.filter(w => w.year_group === yearFilter);
    console.log(`Filtered to ${filtered.length} worksheets for ${yearFilter}\n`);
  }
  if (slugFilter) {
    filtered = filtered.filter(w => w.slug === slugFilter);
  }

  // Find missing tests
  const missing = filtered.filter(w => !existingTests.has(w.slug));
  console.log(`Missing tests: ${missing.length}\n`);

  if (missing.length === 0) {
    console.log('All worksheets have tests!');
    return;
  }

  const results = { success: 0, failed: 0, skipped: 0 };

  for (const ws of missing) {
    process.stdout.write(`Processing ${ws.slug}... `);

    try {
      const details = await fetchWorksheetDetails(ws.slug);
      const answers = extractAnswersFromHtml(details.html_content);

      if (!answers || answers.length === 0) {
        console.log('SKIPPED (no answers found)');
        results.skipped++;
        continue;
      }

      const testCode = generateTestCode(ws.slug, answers, ws.year_group);
      const fileName = `interactive-${ws.slug}.spec.ts`;
      const filePath = path.join(__dirname, '..', 'tests', 'e2e', fileName);

      if (dryRun) {
        console.log(`DRY RUN - would create ${fileName} with ${answers.length} answers`);
      } else {
        fs.writeFileSync(filePath, testCode);
        console.log(`CREATED ${fileName} (${answers.length} answers)`);
      }
      results.success++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      results.failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`SUMMARY: ${results.success} created, ${results.failed} failed, ${results.skipped} skipped`);
}

main().catch(console.error);
