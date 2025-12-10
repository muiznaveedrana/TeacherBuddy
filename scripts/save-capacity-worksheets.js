/**
 * Save capacity worksheets to library
 * Run: node scripts/save-capacity-worksheets.js
 */

const fs = require('fs');
const path = require('path');

const WORKSHEETS = [
  {
    file: 'preview-worksheet-capacity-1.html',
    slug: 'measurement-capacity-v1',
    title: 'Capacity - Kitchen Theme',
    theme: 'Kitchen (drinks for the family)',
    difficulty: 'easy'
  },
  {
    file: 'preview-worksheet-capacity-2.html',
    slug: 'measurement-capacity-v2',
    title: 'Capacity - Garden Theme',
    theme: 'Garden (watering plants)',
    difficulty: 'average'
  },
  {
    file: 'preview-worksheet-capacity-3.html',
    slug: 'measurement-capacity-v3',
    title: 'Capacity - Party Theme',
    theme: 'Party (getting ready)',
    difficulty: 'hard'
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
      year_group: 'Reception',
      topic: 'measurement',
      subtopic: 'capacity',
      question_count: 5,
      difficulty,
      visual_theme: theme,
      activity_type: 'comparison',
      layout_type: 'static',
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
  console.log('📚 CAPACITY WORKSHEETS - LIBRARY SAVE');
  console.log('════════════════════════════════════════════════════════════');
  console.log(`Year Group: Reception`);
  console.log(`Topic: Measurement > Capacity`);
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