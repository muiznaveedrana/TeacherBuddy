const fs = require('fs');
const path = require('path');
const API = 'http://localhost:3000';

// Decode HTML entities
function decodeHtmlEntities(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// Parse answers - some worksheets have comma-separated multiple answers
function parseAnswers(rawAnswers) {
  const answers = [];
  for (const raw of rawAnswers) {
    let decoded = decodeHtmlEntities(raw);

    // Handle sub-parts like "a) 6   b) 15   c) 12" (can have 2-4 sub-parts)
    const multiSubPartMatch = decoded.match(/a\)\s*(\S+)\s*(?:&nbsp;|\s)+b\)\s*(\S+)(?:\s*(?:&nbsp;|\s)+c\)\s*(\S+))?(?:\s*(?:&nbsp;|\s)+d\)\s*(\S+))?/i);
    if (multiSubPartMatch) {
      answers.push(multiSubPartMatch[1]);
      answers.push(multiSubPartMatch[2]);
      if (multiSubPartMatch[3]) answers.push(multiSubPartMatch[3]);
      if (multiSubPartMatch[4]) answers.push(multiSubPartMatch[4]);
      continue;
    }

    // Handle "a) answer" format (single sub-part)
    const singleSubPart = decoded.match(/^[a-z]\)\s*(.+)$/i);
    if (singleSubPart) {
      decoded = singleSubPart[1].trim();
    }

    // Split comma-separated answers (both numeric and text like "<, =, >" or "False, True")
    if (decoded.includes(', ')) {
      // Don't split if it's a decimal number like "2.5"
      if (!decoded.match(/^\d+\.\d+$/)) {
        answers.push(...decoded.split(', ').map(s => s.trim()));
        continue;
      }
    }

    answers.push(decoded);
  }
  return answers;
}

// Generate test file content
function generateTestFile(slug, answers) {
  return `import { test, expect } from '@playwright/test'

const WORKSHEET_SLUG = '${slug}'
const WORKSHEET_ANSWERS = ${JSON.stringify(answers)}

async function dismissCookieConsent(page: import('@playwright/test').Page) {
  await page.evaluate(() => {
    document.querySelector('.cookie-consent-container')?.remove()
    document.querySelectorAll('[class*="cookie"], [class*="consent"]').forEach(el => {
      if ((el as HTMLElement).style?.position === 'fixed') (el as HTMLElement).remove()
    })
  })
}

test.describe(\`Interactive: \${WORKSHEET_SLUG}\`, () => {
  test('should complete with 100% score', async ({ page }) => {
    test.setTimeout(15000)
    await page.goto(\`/library/\${WORKSHEET_SLUG}/interactive\`)
    await dismissCookieConsent(page)
    await expect(page.locator('.interactive-worksheet-container')).toBeVisible()

    const inputs = page.locator('.interactive-worksheet-container input[type="text"]:not([disabled])')
    const inputCount = await inputs.count()
    console.log(\`Found \${inputCount} inputs, have \${WORKSHEET_ANSWERS.length} answers\`)

    for (let i = 0; i < inputCount && i < WORKSHEET_ANSWERS.length; i++) {
      await dismissCookieConsent(page)
      const input = inputs.nth(i)
      await input.scrollIntoViewIfNeeded()
      await input.click({ force: true })
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

async function main() {
  const yearGroup = process.argv[2] || 'Year 3';
  const dirName = yearGroup.toLowerCase().replace(' ', '');

  console.log(`Generating tests for ${yearGroup}...`);

  const response = await fetch(`${API}/api/library/browse?year_group=${encodeURIComponent(yearGroup)}&limit=300`);
  const data = await response.json();

  const testDir = path.join(__dirname, '..', 'tests', 'e2e', 'interactive', dirName);

  // Create directory if it doesn't exist
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  let created = 0;
  let skipped = 0;
  const errors = [];

  for (const ws of data.worksheets) {
    const html = ws.html_content || '';
    const keyMatch = html.match(/<div[^>]*class="[^"]*answer-key[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

    if (!keyMatch) {
      skipped++;
      errors.push({ slug: ws.slug, error: 'NO_ANSWER_KEY' });
      continue;
    }

    const rawAnswers = [...keyMatch[1].matchAll(/<p><strong>\d+\.<\/strong>\s*(.+?)<\/p>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim());

    if (rawAnswers.length === 0) {
      skipped++;
      errors.push({ slug: ws.slug, error: 'EMPTY_ANSWERS' });
      continue;
    }

    const answers = parseAnswers(rawAnswers);
    const testContent = generateTestFile(ws.slug, answers);
    const testFilePath = path.join(testDir, `${ws.slug}.spec.ts`);

    fs.writeFileSync(testFilePath, testContent);
    created++;

    if (created % 20 === 0) {
      console.log(`Created ${created} test files...`);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Created: ${created} test files`);
  console.log(`Skipped: ${skipped} worksheets`);
  console.log(`Location: ${testDir}`);

  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`);
    for (const e of errors) {
      console.log(`  ${e.slug}: ${e.error}`);
    }
  }
}

main().catch(console.error);
