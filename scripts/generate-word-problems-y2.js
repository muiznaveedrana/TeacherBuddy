/**
 * Generate 3 Year 2 word-problems worksheets with different themes
 */

const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:3000/api/worksheet/generate';

const worksheets = [
  {
    name: 'word-problems-y2-1',
    config: {
      yearGroup: 'Year 2',
      topic: 'addition-subtraction',
      subtopic: 'word-problems',
      difficulty: 'average',
      questionCount: 5,
      mode: 'interactive',
      // Theme: School supplies and playground
      customInstructions: 'Use school context (pencils, books, erasers, crayons) and toy context (balls, cars, dolls, teddies). Make it about a classroom and playground scenario.'
    }
  },
  {
    name: 'word-problems-y2-2',
    config: {
      yearGroup: 'Year 2',
      topic: 'addition-subtraction',
      subtopic: 'word-problems',
      difficulty: 'average',
      questionCount: 5,
      mode: 'interactive',
      // Theme: Farm animals and food
      customInstructions: 'Use animals context (chickens, cows, sheep, pigs) and food-fruits context (apples, bananas, oranges). Make it about a farm visit and fruit picking.'
    }
  },
  {
    name: 'word-problems-y2-3',
    config: {
      yearGroup: 'Year 2',
      topic: 'addition-subtraction',
      subtopic: 'word-problems',
      difficulty: 'average',
      questionCount: 5,
      mode: 'interactive',
      // Theme: Treats and money
      customInstructions: 'Use food-treats context (cookies, cupcakes) and money-pence context. Make it about a bakery shop and spending pocket money. Include at least 1 money problem with coin images.'
    }
  }
];

async function generateWorksheet(config, name) {
  console.log(`\nGenerating ${name}...`);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();

    if (!data.html_content) {
      throw new Error('No HTML content in response');
    }

    const filePath = path.join(__dirname, '..', 'public', `preview-worksheet-${name}.html`);
    fs.writeFileSync(filePath, data.html_content);

    console.log(`✅ Generated: ${filePath}`);
    console.log(`   Model: ${data.model_used || 'unknown'}`);
    console.log(`   Tokens: ${data.tokens_used || 'unknown'}`);

    return { success: true, filePath, data };
  } catch (error) {
    console.error(`❌ Failed to generate ${name}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('GENERATING YEAR 2 WORD PROBLEMS WORKSHEETS');
  console.log('='.repeat(60));

  const results = [];

  for (const worksheet of worksheets) {
    const result = await generateWorksheet(worksheet.config, worksheet.name);
    results.push({ name: worksheet.name, ...result });

    // Wait 2 seconds between requests
    if (worksheets.indexOf(worksheet) < worksheets.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));

  results.forEach((r, i) => {
    console.log(`${i + 1}. ${r.name}: ${r.success ? '✅ SUCCESS' : '❌ FAILED'}`);
    if (!r.success) {
      console.log(`   Error: ${r.error}`);
    }
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\n${successCount}/${results.length} worksheets generated successfully`);
}

main().catch(console.error);
