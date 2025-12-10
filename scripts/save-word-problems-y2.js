/**
 * Save Year 2 word-problems worksheets to library
 * Run: node scripts/save-word-problems-y2.js
 */

const fs = require('fs');
const path = require('path');

const WORKSHEETS = [
  {
    file: 'preview-worksheet-word-problems-y2-1.html',
    slug: 'word-problems-school-playground-v1',
    title: 'Word Problems - School & Playground',
    theme: 'School supplies and playground (pencils, books, cars, erasers, balls)',
    difficulty: 'average'
  },
  {
    file: 'preview-worksheet-word-problems-y2-2.html',
    slug: 'word-problems-farm-animals-v2',
    title: 'Word Problems - Farm Animals',
    theme: 'Farm visit and fruit picking (chickens, sheep, apples, bananas)',
    difficulty: 'average'
  },
  {
    file: 'preview-worksheet-word-problems-y2-3.html',
    slug: 'word-problems-bakery-money-v3',
    title: 'Word Problems - Bakery & Money',
    theme: 'Bakery shop with money problems (cookies, cupcakes, coins)',
    difficulty: 'average'
  }
];

async function saveWorksheet(worksheetData) {
  const { file, slug, title, theme, difficulty } = worksheetData;

  // Read HTML content
  const filePath = path.join(__dirname, '../public', file);
  const htmlContent = fs.readFileSync(filePath, 'utf-8');

  // Prepare payload
  const payload = {
    worksheetHtml: htmlContent,
    metadata: {
      title,
      slug,
      year_group: 'Year 2',
      topic: 'addition-subtraction',
      subtopic: 'word-problems',
      question_count: 5,
      difficulty,
      visual_theme: theme,
      activity_type: 'word-problems',
      layout_type: 'interactive',
      quality_score: 95,
      region: 'UK'
    }
  };

  console.log(`\n🔵 Saving: ${title}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Theme: ${theme}`);
  console.log(`   Difficulty: ${difficulty}`);

  try {
    const response = await fetch('http://localhost:3000/api/library/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      console.log(`   ✅ SAVED successfully! ID: ${result.id}`);
      console.log(`   📄 View at: /library/${slug}`);
      return { success: true, slug, id: result.id };
    } else {
      console.error(`   ❌ FAILED:`, result.error || response.statusText);
      return { success: false, slug, error: result.error };
    }
  } catch (error) {
    console.error(`   ❌ ERROR:`, error.message);
    return { success: false, slug, error: error.message };
  }
}

async function main() {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('📚 YEAR 2 WORD PROBLEMS - LIBRARY SAVE');
  console.log('════════════════════════════════════════════════════════════');
  console.log(`Year Group: Year 2`);
  console.log(`Topic: Addition & Subtraction > Word Problems`);
  console.log(`Total Worksheets: ${WORKSHEETS.length}`);

  const results = [];

  for (const worksheet of WORKSHEETS) {
    const result = await saveWorksheet(worksheet);
    results.push(result);

    // Wait between saves
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Summary
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('📊 SUMMARY');
  console.log('════════════════════════════════════════════════════════════');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`✅ Successful: ${successful}/${WORKSHEETS.length}`);
  console.log(`❌ Failed: ${failed}/${WORKSHEETS.length}`);

  if (successful > 0) {
    console.log('\n📋 Saved worksheets:');
    results.filter(r => r.success).forEach(r => {
      console.log(`   - ${r.slug} (ID: ${r.id})`);
    });
  }

  if (failed > 0) {
    console.log('\n⚠️  Failed worksheets:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.slug}: ${r.error}`);
    });
  }

  console.log('\n════════════════════════════════════════════════════════════\n');
  process.exit(failed > 0 ? 1 : 0);
}

main();
