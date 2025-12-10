const fs = require('fs');
const path = require('path');

// Read the prompt configuration
const promptPath = path.join(__dirname, '../src/lib/prompts/configurations/year1/measurement/time-days-months-COMPRESSED.md');
const promptContent = fs.readFileSync(promptPath, 'utf8');

// Three different themed worksheets with different difficulties
const themes = [
  { name: 'School Week', seed: 'school-week-theme', difficulty: 'average' },
  { name: 'Birthday Party', seed: 'birthday-party-theme', difficulty: 'easy' },
  { name: 'Holiday Planning', seed: 'holiday-planning-theme', difficulty: 'hard' }
];

async function generateWorksheet(theme, index) {
  const url = 'http://localhost:3000/api/generate-worksheet';

  const payload = {
    yearGroup: 'Year 1',
    topic: 'measurement',
    subtopic: 'time-days-months',
    questionCount: 5,
    mode: 'interactive',
    layout: 'standard',
    difficulty: theme.difficulty,
    customPrompt: promptContent,
    seed: theme.seed
  };

  console.log(`\nGenerating worksheet ${index + 1}: ${theme.name}...`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (!data.worksheet || !data.worksheet.html) {
      throw new Error(`No HTML content in response. Data: ${JSON.stringify(data)}`);
    }

    // Save to file
    const outputPath = path.join(__dirname, `../public/preview-worksheet-time-days-months-${index + 1}.html`);
    fs.writeFileSync(outputPath, data.worksheet.html, 'utf8');

    console.log(`✅ Worksheet ${index + 1} saved: ${outputPath}`);
    console.log(`   Theme: ${theme.name}`);

    return { success: true, path: outputPath, theme: theme.name };
  } catch (error) {
    console.error(`❌ Error generating worksheet ${index + 1}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('=== Generating Time Days & Months Worksheets ===');
  console.log('Year Group: Year 1');
  console.log('Topic: measurement');
  console.log('Subtopic: time-days-months');
  console.log('Count: 5 questions per worksheet');
  console.log('Mode: interactive\n');

  const results = [];

  // Generate worksheets sequentially to avoid overwhelming the API
  for (let i = 0; i < themes.length; i++) {
    const result = await generateWorksheet(themes[i], i);
    results.push(result);

    // Wait a bit between requests
    if (i < themes.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n=== Generation Summary ===');
  const successful = results.filter(r => r.success);
  console.log(`✅ Successful: ${successful.length}/${themes.length}`);

  if (successful.length < themes.length) {
    console.log('\n❌ Failed worksheets:');
    results.filter(r => !r.success).forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.error}`);
    });
    process.exit(1);
  } else {
    console.log('\n🎉 All worksheets generated successfully!');
    console.log('\nNext steps:');
    console.log('1. Open each HTML file in a browser');
    console.log('2. Take screenshots for visual verification');
    console.log('3. Verify all questions are visible and images load correctly');
  }
}

main();
