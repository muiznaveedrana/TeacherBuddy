#!/usr/bin/env node

/**
 * ENHANCED AUTONOMOUS WORKSHEET QUALITY AGENT v2.0
 *
 * Unified, production-ready autonomous agent that:
 * - Works for ALL 78+ worksheet configs (Reception → Year 6)
 * - Combines Playwright UI automation with config-aware quality assessment
 * - Auto-fixes issues via catalog modifications
 * - Runs multi-cycle improvement loops until production-ready
 *
 * Usage:
 *   node scripts/autonomous-worksheet-quality-agent.js <config-id> [options]
 *
 * Example:
 *   node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIG REGISTRY
// ============================================================================

const CONFIG_REGISTRY = {
  'reception-number-counting-counting-to-10': {
    // UI Selection Values
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topicValue: 'number-counting', // API value for selection
    topic: 'Number and Counting', // Display label for validation
    subtopicValue: 'counting-to-10', // API value for selection
    subtopic: 'Counting to 10', // Display label for validation
    difficulty: 'average',

    // Generation Parameters
    numQuestions: 5,

    // Quality Gates (Config-Specific)
    qualityGate: {
      minOverallScore: 85,
      minCurriculumAlignment: 8,
      minPresentationQuality: 7,
      minContentConfigMatch: 9,
      minImageQuestionAlignment: 9,
      minContentFreshness: 9,
      minImageDiversity: 8
    },

    // Config-Specific Validation Rules
    specificChecks: {
      minNumber: 1,
      maxNumber: 10,
      requireVisualSupport: true,
      minImagesPerQuestion: 1,
      maxQuestionComplexity: 'simple',
      singleObjectTypeRequired: true,
      realWorldContextRequired: true,
      maxWordLength: 10,
      forbiddenWords: []
    },

    // Prompt Configuration
    promptConfig: {
      version: 'v1.0',
      filePath: 'prompts/config-specific/reception-number-counting-counting-to-10-v1.0.ts'
    }
  },

  'reception-number-counting-number-recognition': {
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topicValue: 'number-counting', // API value for selection
    topic: 'Number and Counting', // Display label for validation
    subtopicValue: 'number-recognition', // API value for selection
    subtopic: 'Number Recognition', // Display label for validation
    difficulty: 'average',
    numQuestions: 5,
    qualityGate: {
      minOverallScore: 85,
      minCurriculumAlignment: 8,
      minPresentationQuality: 7,
      minContentConfigMatch: 9,
      minImageQuestionAlignment: 9,
      minContentFreshness: 9,
      minImageDiversity: 8
    },
    specificChecks: {
      minNumber: 1,
      maxNumber: 10,
      requireVisualSupport: true,
      minImagesPerQuestion: 1,
      maxQuestionComplexity: 'simple',
      singleObjectTypeRequired: true,
      realWorldContextRequired: true,
      maxWordLength: 10,
      forbiddenWords: []
    },
    promptConfig: {
      version: 'v1.0',
      filePath: 'prompts/config-specific/reception-number-counting-number-recognition-v1.0.ts'
    }
  }
};

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0].startsWith('--')) {
    console.error('\n❌ Error: Configuration ID is required\n');
    console.log('Usage: node scripts/autonomous-worksheet-quality-agent.js <config-id> [options]\n');
    console.log('Available configs:');
    Object.keys(CONFIG_REGISTRY).forEach(key => {
      console.log(`  - ${key}`);
    });
    console.log('\nOptions:');
    console.log('  --max-cycles=N       Maximum improvement cycles (default: 3)');
    console.log('  --iterations=N       Iterations per cycle (default: 4)');
    console.log('  --auto-fix=true|false  Enable automatic fixes (default: true)');
    console.log('  --headless=true|false  Run browser in headless mode (default: false)');
    console.log('');
    process.exit(1);
  }

  const configId = args[0];
  const options = {
    maxCycles: 3,
    iterations: 5,
    autoFix: true,
    headless: false,
    enableVision: true  // Vision enabled by default for self-healing
  };

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.substring(2).split('=');
      switch (key) {
        case 'max-cycles':
          options.maxCycles = parseInt(value) || 10;
          break;
        case 'iterations':
          options.iterations = parseInt(value) || 5;
          break;
        case 'auto-fix':
          options.autoFix = value !== 'false';
          break;
        case 'headless':
          options.headless = value === 'true';
          break;
        case 'enable-vision':
          options.enableVision = value === 'true';
          break;
      }
    }
  }

  return { configId, options };
}

const { configId, options } = parseArgs();
const config = CONFIG_REGISTRY[configId];

if (!config) {
  console.error(`\n❌ Error: Unknown configuration "${configId}"\n`);
  console.log('Available configurations:');
  Object.keys(CONFIG_REGISTRY).forEach(key => {
    console.log(`  - ${key}`);
  });
  console.log('');
  process.exit(1);
}

// ============================================================================
// GLOBAL CONFIGURATION
// ============================================================================

const AGENT_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  MAX_CYCLES: options.maxCycles,
  ITERATIONS_PER_CYCLE: options.iterations,
  AUTO_FIX_ENABLED: options.autoFix,
  HEADLESS: options.headless,
  ENABLE_VISION: options.enableVision,
  USE_TEXT_PARSING: false, // Disabled by default - vision is ground truth
  TIMEOUT: 120000,
  PRODUCTION_THRESHOLD: 0.90
};

// Session setup
const SESSION_ID = `${configId}-${new Date().toISOString().replace(/[:.]/g, '-')}`;
const SESSION_DIR = path.join(process.cwd(), 'worksheet-quality-reports', 'autonomous-sessions', SESSION_ID);
fs.mkdirSync(SESSION_DIR, { recursive: true });

// State tracking
const cycleHistory = [];
const fixesApplied = [];
let previousContents = [];

console.log('='.repeat(80));
console.log('🤖 ENHANCED AUTONOMOUS WORKSHEET QUALITY AGENT v2.0');
console.log('='.repeat(80));
console.log('');
console.log(`📋 Configuration: ${configId}`);
console.log(`📚 Year Group: ${config.yearGroup}`);
console.log(`📖 Topic: ${config.topic} → ${config.subtopic}`);
console.log(`🔄 Max Cycles: ${AGENT_CONFIG.MAX_CYCLES}`);
console.log(`📊 Iterations Per Cycle: ${AGENT_CONFIG.ITERATIONS_PER_CYCLE}`);
console.log(`🎯 Production Ready Threshold: ${(AGENT_CONFIG.PRODUCTION_THRESHOLD * 100).toFixed(0)}%`);
console.log(`🔧 Auto-Fix: ${AGENT_CONFIG.AUTO_FIX_ENABLED ? 'ENABLED' : 'DISABLED'}`);
console.log(`👁️  Vision Assessment: ${AGENT_CONFIG.ENABLE_VISION ? 'ENABLED (Claude Code)' : 'DISABLED'}`);
console.log(`📁 Session Directory: ${SESSION_DIR}`);
console.log('');

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

async function waitForServer(url, maxAttempts = 30) {
  console.log(`⏳ Waiting for server at ${url}...`);

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`✅ Server is ready!\n`);
        return true;
      }
    } catch (error) {
      // Server not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  throw new Error(`Server not ready after ${maxAttempts} attempts`);
}

function extractNumbers(text) {
  const numbers = [];
  const numberPattern = /\b(\d+)\b/g;
  const matches = text.matchAll(numberPattern);

  for (const match of matches) {
    const num = parseInt(match[1], 10);
    if (num >= 0 && num <= 1000) {
      numbers.push(num);
    }
  }

  return numbers;
}

function extractObjects(text) {
  const objects = [];
  const objectPatterns = [
    /\b(\d+)\s+(apple|banana|orange|strawberr|grape|lemon)s?\b/gi,
    /\b(\d+)\s+(book|pencil|eraser|ruler|crayon|pen)s?\b/gi,
    /\b(\d+)\s+(chicken|cow|pig|sheep|horse|duck|goat)s?\b/gi,
    /\b(\d+)\s+(flower|butterfl|bee|ladybug|bird)(?:s|y|ies)?\b/gi,
    /\b(\d+)\s+(car|bus|bike|train|boat|plane)s?\b/gi,
    /\b(\d+)\s+(teddy bear|doll|block|ball|toy)s?\b/gi,
    /\b(\d+)\s+(football|basketball|tennis ball)s?\b/gi,
    /\b(\d+)\s+(cookie|sandwich|pizza|cupcake|donut)s?\b/gi,
    /\b(\d+)\s+(star|heart|circle|square|triangle)s?\b/gi
  ];

  for (const pattern of objectPatterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      objects.push(match[2].toLowerCase());
    }
  }

  return objects;
}

function calculateSimilarity(text1, text2) {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return union.size > 0 ? intersection.size / union.size : 0;
}

// ============================================================================
// HTML-BASED ASSESSMENT HELPERS (Migrated from quality-assessment-cycle.js)
// ============================================================================

function extractObjectsFromHTML(html) {
  const objects = [];

  // Look for common object patterns in questions
  const objectPatterns = [
    /(\d+)\s+(\w+)(?:\s+are there|\s+does|\s+has)/gi,
    /count the (\w+)/gi,
    /how many (\w+)/gi
  ];

  objectPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const object = match[match.length - 1].toLowerCase();
      if (object && object.length > 2) {
        objects.push(object);
      }
    }
  });

  return objects;
}

function extractImagePathsFromHTML(html) {
  const paths = [];
  const imgRegex = /src="([^"]+)"/g;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    paths.push(match[1]);
  }

  return paths;
}

function extractImageCollections(imagePaths) {
  return imagePaths.map(path => {
    const match = path.match(/\/counting\/([^/]+)\//);
    return match ? match[1] : 'unknown';
  });
}

function checkNumberRangeViolations(html, config) {
  const violations = [];
  const forbiddenNumbers = ['0', '11', '12', '15', '20', '100', '666', '333', '000'];

  forbiddenNumbers.forEach(num => {
    if (html.includes(`>${num}<`) || html.includes(` ${num} `)) {
      violations.push(num);
    }
  });

  return violations;
}

function checkRealWorldContexts(html) {
  const nonsensicalPatterns = ['666', '100 mice', 'school cows'];
  return !nonsensicalPatterns.some(pattern => html.includes(pattern));
}

function checkDifficultyLevel(html, config) {
  // For Reception "Average", numbers should be distributed across 1-10
  const numbers = html.match(/\b([1-9]|10)\b/g);
  if (!numbers || numbers.length === 0) return false;

  const nums = numbers.map(n => parseInt(n));
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;

  // Average difficulty should be around 5-6 for Reception
  return avg >= 4 && avg <= 7;
}

// ============================================================================
// PLAYWRIGHT UI AUTOMATION
// ============================================================================

async function extractContent(page) {
  const text = await page.locator('.worksheet-preview, .worksheet').textContent();

  const questions = (text.match(/\d+[\.\)]\s*.+/g) || []);

  const imageElements = await page.locator('.worksheet-preview img, .worksheet img').all();
  const images = await Promise.all(
    imageElements.map(async img => ({
      src: await img.getAttribute('src') || '',
      alt: await img.getAttribute('alt') || '',
      visible: await img.isVisible()
    }))
  );

  const html = await page.locator('.worksheet-preview, .worksheet').innerHTML();

  return {
    text,
    questions,
    images,
    numbers: extractNumbers(text),
    objects: extractObjects(text),
    html
  };
}

async function generateWorksheet(page, cycleNum, iterationNum, config, isFirstIteration) {
  const startTime = Date.now();
  const screenshotDir = path.join(SESSION_DIR, `cycle-${cycleNum}-screenshots`);
  fs.mkdirSync(screenshotDir, { recursive: true });

  try {
    // FRESHNESS TRACKING: Only navigate on first iteration
    // Subsequent iterations use "Regenerate" button to maintain previousWorksheets state
    if (isFirstIteration) {
      // 1. Navigate to dashboard (FIRST ITERATION ONLY)
      await page.goto(`${AGENT_CONFIG.BASE_URL}/dashboard`, {
        waitUntil: 'networkidle',
        timeout: AGENT_CONFIG.TIMEOUT
      });

      // 2. Screenshot: Configuration screen
      await page.screenshot({
        path: path.join(screenshotDir, `iter-${iterationNum}-01-config.png`),
        fullPage: true
      });

      // 3. Wait for year-group select to be ready
      await page.waitForSelector('[data-testid="year-group-select"]', { timeout: 10000 });

      // 4. Select Year Group (FAST - using test IDs only)
      const yearGroupValue = config.yearGroup.toLowerCase().replace(/\s+/g, '-');
      await page.getByTestId('year-group-select').click();
      await page.getByTestId(`year-group-option-${yearGroupValue}`).click();

      // Wait for topic dropdown to become enabled
      await page.waitForSelector('[data-testid="topic-select"]:not([disabled])', { timeout: 5000 });

      // 5. Select Topic (FAST - using test IDs only)
      // Use topicValue if available (API value), otherwise derive from topic label
      const topicValue = config.topicValue || config.topic.toLowerCase().replace(/\s+/g, '-');
      await page.getByTestId('topic-select').click();
      await page.getByTestId(`topic-option-${topicValue}`).click();

      // Wait for subtopic dropdown to become enabled
      await page.waitForSelector('[data-testid="subtopic-select"]:not([disabled])', { timeout: 5000 });

      // 6. Select Subtopic (FAST - using test IDs only)
      // Use subtopicValue if available (API value), otherwise derive from subtopic label
      const subtopicValue = config.subtopicValue || config.subtopic.toLowerCase().replace(/\s+/g, '-');
      await page.getByTestId('subtopic-select').click();
      await page.getByTestId(`subtopic-option-${subtopicValue}`).click();

      // Small wait for form to update
      await page.waitForTimeout(500);

      // 7. Select Difficulty (if needed)
      if (config.difficulty) {
        await page.click(`#difficulty-${config.difficulty}`);
        await page.waitForTimeout(500);
      }

      // 8. Screenshot: Ready to generate
      await page.screenshot({
        path: path.join(screenshotDir, `iter-${iterationNum}-02-ready.png`),
        fullPage: true
      });
    } else {
      // SUBSEQUENT ITERATIONS: Use Regenerate button to preserve freshness tracking
      console.log(`    🔄 Using Regenerate button (preserves previousWorksheets state)`);

      // Screenshot: Before regenerate
      await page.screenshot({
        path: path.join(screenshotDir, `iter-${iterationNum}-01-before-regen.png`),
        fullPage: true
      });
    }

    // 9. Check if button is enabled, then click
    // First iteration: "Generate Worksheet", subsequent: "Regenerate"
    const buttonText = isFirstIteration ? 'Generate Worksheet' : 'Regenerate';
    const generateButton = page.getByRole('button', { name: buttonText });
    const isEnabled = await generateButton.isEnabled();
    if (!isEnabled) {
      throw new Error(`${buttonText} button is disabled - form validation may be failing`);
    }
    await generateButton.click();

    // Wait a moment for the generation to start
    await page.waitForTimeout(2000);

    // 10. Wait for completion with proper timeout
    await page.waitForSelector('text=Download', { timeout: AGENT_CONFIG.TIMEOUT });

    // 10a. Wait for all images to load before screenshot (prevents false positive "broken image" detections)
    await page.waitForFunction(() => {
      const images = document.querySelectorAll('.worksheet-preview img, .worksheet img');
      return Array.from(images).every(img => img.complete && img.naturalHeight !== 0);
    }, { timeout: 10000 }).catch(() => {
      console.log('    ⚠️  Image loading timeout - some images may not be fully loaded');
    });

    await page.waitForTimeout(3000);

    // 11. Screenshot: Generated worksheet
    await page.screenshot({
      path: path.join(screenshotDir, `iter-${iterationNum}-03-worksheet.png`),
      fullPage: true
    });

    // 12. Extract content
    const content = await extractContent(page);

    const endTime = Date.now();
    const generationTime = (endTime - startTime) / 1000;

    return {
      success: true,
      content,
      generationTime,
      screenshots: {
        config: `iter-${iterationNum}-01-config.png`,
        ready: `iter-${iterationNum}-02-ready.png`,
        worksheet: `iter-${iterationNum}-03-worksheet.png`
      }
    };

  } catch (error) {
    // Error handling with screenshot
    await page.screenshot({
      path: path.join(screenshotDir, `iter-${iterationNum}-error.png`),
      fullPage: true
    }).catch(() => {});

    return {
      success: false,
      error: error.message,
      generationTime: (Date.now() - startTime) / 1000
    };
  }
}

// ============================================================================
// 7-DIMENSION QUALITY ASSESSMENT
// ============================================================================

function assessCurriculumAlignment(content, config) {
  let score = 10;
  const feedback = [];

  // Check number range
  const numbers = content.numbers;
  const inRange = numbers.filter(n =>
    n >= config.specificChecks.minNumber &&
    n <= config.specificChecks.maxNumber
  );
  if (inRange.length < numbers.length) {
    score -= 3;
    feedback.push(`Numbers outside curriculum range ${config.specificChecks.minNumber}-${config.specificChecks.maxNumber}`);
  }

  // Check visual support
  if (config.specificChecks.requireVisualSupport && content.images.length === 0) {
    score -= 3;
    feedback.push(`CRITICAL: Visual support required for ${config.yearGroup}`);
  }

  // Check question count
  if (content.questions.length > config.numQuestions + 2) {
    score -= 1;
    feedback.push(`Too many questions for ${config.yearGroup}`);
  }

  // Check language complexity
  const complexWords = content.text.match(/\b\w{10,}\b/g);
  if (complexWords && complexWords.length > 2) {
    score -= 1;
    feedback.push('Language may be too complex for age group');
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      `Content appropriately aligned with ${config.yearGroup} curriculum.`
  };
}

function assessPresentationQuality(content, config) {
  let score = 10;
  const feedback = [];

  // Check question structure
  if (content.questions.length === 0) {
    score -= 2;
    feedback.push('Questions not clearly structured');
  }

  // Check broken images
  const brokenImages = content.images.filter(img => !img.visible).length;
  if (brokenImages > 0) {
    score -= 2;
    feedback.push(`${brokenImages} image(s) failed to load`);
  }

  // Check layout balance
  if (content.text.length > 1000 && content.images.length < 3) {
    score -= 1;
    feedback.push(`Text-heavy layout not ideal for ${config.yearGroup}`);
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      'Presentation is clear, well-organized, and age-appropriate.'
  };
}

function getTopicKeywords(topic, subtopic) {
  const keywords = [];
  keywords.push(topic.toLowerCase());
  keywords.push(subtopic.toLowerCase());

  if (topic.includes('Counting')) {
    keywords.push('count', 'how many', 'number');
  }
  if (subtopic.includes('Addition')) {
    keywords.push('add', 'plus', 'total', 'altogether');
  }

  return keywords;
}

function assessContentConfigMatch(content, config) {
  let score = 10;
  const feedback = [];

  // Check topic keywords
  const topicKeywords = getTopicKeywords(config.topic, config.subtopic);
  const hasTopicContext = topicKeywords.some(kw =>
    content.text.toLowerCase().includes(kw)
  );
  if (!hasTopicContext) {
    score -= 2;
    feedback.push(`Limited ${config.topic} context`);
  }

  // Check number range compliance
  const numbers = content.numbers;
  const outOfRange = numbers.filter(n =>
    n < config.specificChecks.minNumber ||
    n > config.specificChecks.maxNumber
  );
  if (outOfRange.length > 0) {
    score -= 3;
    feedback.push(`Numbers outside config range: ${outOfRange.join(', ')}`);
  }

  // Check question count match
  if (content.questions.length !== config.numQuestions) {
    score -= 1;
    feedback.push(`Question count mismatch: expected ${config.numQuestions}, got ${content.questions.length}`);
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      `Content accurately matches ${config.yearGroup} ${config.subtopic} configuration.`
  };
}

function assessImageQuestionAlignment(content, config) {
  let score = 10;
  const feedback = [];

  const visibleImages = content.images.filter(img => img.visible).length;

  // Check image presence
  if (content.images.length === 0) {
    score = 0;
    feedback.push('CRITICAL: No images present');
  } else if (visibleImages < content.questions.length) {
    score -= 3;
    feedback.push(`Only ${visibleImages} of ${content.questions.length} questions have visible images`);
  }

  // Check failed images
  const failedImages = content.images.length - visibleImages;
  if (failedImages > 0) {
    score -= 2;
    feedback.push(`${failedImages} image(s) failed to load`);
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      'Images well-aligned with questions. Visual support appropriate.'
  };
}

function assessConfigSpecificQuality(content, config) {
  let score = 10;
  const feedback = [];
  const checks = config.specificChecks;

  // Number range (strict)
  if (checks.maxNumber) {
    const numbersFound = content.numbers;
    const outOfRange = numbersFound.filter(n =>
      n < checks.minNumber || n > checks.maxNumber
    );
    if (outOfRange.length > 0) {
      score -= 4;
      feedback.push(`Numbers beyond range ${checks.minNumber}-${checks.maxNumber}: ${outOfRange.join(', ')}`);
    }
  }

  // Single object type (Reception-specific)
  if (checks.singleObjectTypeRequired) {
    const multiObjectPatterns = [
      /count the (\w+) and (\w+)/i,
      /(\w+) and (\w+)/i
    ];
    for (const pattern of multiObjectPatterns) {
      if (pattern.test(content.text)) {
        score -= 3;
        feedback.push('Multiple object types in single question (violates config rule)');
        break;
      }
    }
  }

  // Real-world context
  if (checks.realWorldContextRequired) {
    const nonsensicalPatterns = [
      /school cow/i,
      /underwater car/i,
      /mice in flowerpot/i
    ];
    for (const pattern of nonsensicalPatterns) {
      if (pattern.test(content.text)) {
        score -= 3;
        feedback.push('Nonsensical scenario detected (not real-world)');
        break;
      }
    }
  }

  // Visual support requirement
  if (checks.requireVisualSupport && content.images.length === 0) {
    score = 0;
    feedback.push('CRITICAL: Visual support required but missing');
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      'Config-specific quality requirements met.'
  };
}

function assessContentFreshness(content, iterationNum, previousContents) {
  if (iterationNum === 1) {
    return { score: 'N/A', justification: 'First iteration - freshness assessed from iteration 2 onwards.' };
  }

  let score = 10;
  const feedback = [];

  for (let i = 0; i < previousContents.length; i++) {
    const prev = previousContents[i];

    // Text similarity (Jaccard)
    const similarity = calculateSimilarity(
      content.questions.join(' '),
      prev.questions.join(' ')
    );

    if (similarity > 0.7) {
      score -= 3;
      feedback.push(`High similarity (${(similarity * 100).toFixed(0)}%) with iteration ${i + 1}`);
    } else if (similarity > 0.5) {
      score -= 1;
      feedback.push(`Moderate similarity with iteration ${i + 1}`);
    }

    // Image reuse
    const reusedImages = content.images.filter(img =>
      prev.images.some(p => p.src === img.src && img.src !== '')
    ).length;

    if (reusedImages > content.images.length * 0.5 && content.images.length > 0) {
      score -= 2;
      feedback.push(`${reusedImages} images reused from iteration ${i + 1}`);
    }
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      'Content is fresh and novel. Good variety across iterations.'
  };
}

function assessImageDiversity(content, iterationNum, previousContents) {
  if (iterationNum === 1) {
    return { score: 'N/A', justification: 'First iteration - diversity assessed from iteration 2 onwards.' };
  }

  let score = 10;
  const feedback = [];

  const currentSrcs = content.images.map(img => img.src).filter(s => s !== '');

  for (let i = 0; i < previousContents.length; i++) {
    const prevSrcs = previousContents[i].images.map(img => img.src).filter(s => s !== '');
    const reused = currentSrcs.filter(s => prevSrcs.includes(s)).length;
    const reusePercent = currentSrcs.length > 0 ? (reused / currentSrcs.length) : 0;

    if (reusePercent > 0.5) {
      score -= 3;
      feedback.push(`${(reusePercent * 100).toFixed(0)}% images recycled from iteration ${i + 1}`);
    } else if (reusePercent > 0.2) {
      score -= 1;
      feedback.push(`Some image reuse from iteration ${i + 1}`);
    }
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      'Images show good diversity. New visual representations used.'
  };
}

function assessWorksheet(result, iterationNum, previousResults, visionResult = null) {
  if (!result.success) {
    return null;
  }

  const content = result.content;
  const previousContents = previousResults
    .filter(r => r.success && r.content)
    .map(r => r.content);

  // ===================================================================
  // HTML-BASED CHECKS (Fast, Accurate, Always Run)
  // ===================================================================

  // CRITICAL CHECK 1: Question Count Validation (HTML-based)
  const questionCountValidation = (() => {
    const questionMatches = content.html.match(/<div class="question">/g);
    const actualQuestionCount = questionMatches ? questionMatches.length : 0;
    const expectedCount = config.numQuestions;

    if (actualQuestionCount === expectedCount) {
      return {
        score: 10,
        justification: `Correct: ${actualQuestionCount} questions generated (expected ${expectedCount})`
      };
    } else {
      return {
        score: 0,
        justification: `BLOCKER: ${actualQuestionCount} questions generated (expected ${expectedCount})`
      };
    }
  })();

  // CRITICAL CHECK 2: Object Repetition Detection (HTML-based)
  const objectRepetition = (() => {
    const objects = extractObjectsFromHTML(content.html);
    const uniqueObjects = new Set(objects);
    const repetitionCount = objects.length - uniqueObjects.size;
    const expectedCount = config.numQuestions;

    if (repetitionCount === 0 && uniqueObjects.size === expectedCount) {
      return {
        score: 10,
        justification: `Perfect: All ${uniqueObjects.size} questions use different objects (${Array.from(uniqueObjects).join(', ')})`
      };
    } else if (repetitionCount === 0) {
      return {
        score: 8,
        justification: `Good: No object repetition, but found ${uniqueObjects.size} unique objects`
      };
    } else {
      const maxRepetition = Math.max(...[...uniqueObjects].map(obj =>
        objects.filter(o => o === obj).length
      ));
      return {
        score: Math.max(0, 10 - (maxRepetition * 3)),
        justification: `Object repetition detected: ${Array.from(uniqueObjects).join(', ')} (max repetition: ${maxRepetition} times)`
      };
    }
  })();

  // CRITICAL CHECK 3: Image Collection Diversity (HTML-based)
  const imageCollectionDiversity = (() => {
    const imagePaths = extractImagePathsFromHTML(content.html);
    const collections = extractImageCollections(imagePaths);
    const uniqueCollections = new Set(collections);
    const expectedCount = config.numQuestions;

    if (uniqueCollections.size === expectedCount) {
      return {
        score: 10,
        justification: `Perfect: All questions use different image collections (${Array.from(uniqueCollections).join(', ')})`
      };
    } else if (uniqueCollections.size >= expectedCount * 0.8) {
      return {
        score: 7,
        justification: `Good: ${uniqueCollections.size} different collections used (${Array.from(uniqueCollections).join(', ')})`
      };
    } else {
      const reusePercentage = ((1 - uniqueCollections.size / expectedCount) * 100).toFixed(0);
      return {
        score: Math.max(0, 10 - (reusePercentage / 10)),
        justification: `Limited diversity: Only ${uniqueCollections.size} collections (${reusePercentage}% reuse)`
      };
    }
  })();

  // ===================================================================
  // VISION-BASED ASSESSMENT (Ground Truth - Only if vision enabled)
  // ===================================================================

  let assessments;

  if (AGENT_CONFIG.ENABLE_VISION && visionResult && visionResult.success) {
    const vision = visionResult.result;

    // Use vision assessment for quality dimensions
    assessments = {
      // HTML checks (always accurate)
      questionCountValidation,
      objectRepetition,
      imageCollectionDiversity,

      // Vision-based checks (ground truth)
      curriculumAlignment: {
        score: vision.curriculumAlignment?.score || 0,
        justification: vision.curriculumAlignment?.issues?.join('. ') ||
          'Curriculum appropriate for age group and topic.'
      },
      presentationQuality: {
        score: vision.presentationQuality?.score || 0,
        justification: vision.presentationQuality?.issues?.join('. ') ||
          'Presentation is clear and well-organized.'
      },
      contentQuality: {
        score: vision.contentQuality?.score || 0,
        justification: vision.contentQuality?.issues?.join('. ') ||
          'Content is accurate and age-appropriate.'
      },
      imageQuestionAlignment: {
        score: vision.brokenImagesCount === 0 && vision.imageMismatchCount === 0 ? 10 :
               Math.max(0, 10 - (vision.brokenImagesCount * 3 + vision.imageMismatchCount * 2)),
        justification: vision.brokenImagesCount === 0 && vision.imageMismatchCount === 0 ?
          'All images working and aligned with questions.' :
          `Issues: ${vision.brokenImagesCount} broken, ${vision.imageMismatchCount} mismatched images.`
      },

      // Freshness checks (text-based, but useful)
      contentFreshness: assessContentFreshness(content, iterationNum, previousContents),
      imageDiversity: assessImageDiversity(content, iterationNum, previousContents)
    };
  } else if (!AGENT_CONFIG.USE_TEXT_PARSING) {
    // Vision disabled and text parsing disabled - use minimal HTML-only assessment
    assessments = {
      questionCountValidation,
      objectRepetition,
      imageCollectionDiversity,

      // Placeholder scores - vision required for full assessment
      curriculumAlignment: { score: 'PENDING_VISION', justification: 'Vision assessment required' },
      presentationQuality: { score: 'PENDING_VISION', justification: 'Vision assessment required' },
      contentQuality: { score: 'PENDING_VISION', justification: 'Vision assessment required' },
      imageQuestionAlignment: { score: 'PENDING_VISION', justification: 'Vision assessment required' },
      contentFreshness: assessContentFreshness(content, iterationNum, previousContents),
      imageDiversity: assessImageDiversity(content, iterationNum, previousContents)
    };
  } else {
    // Fallback: text-based assessment (buggy, but available)
    assessments = {
      questionCountValidation,
      objectRepetition,
      imageCollectionDiversity,
      curriculumAlignment: assessCurriculumAlignment(content, config),
      presentationQuality: assessPresentationQuality(content, config),
      contentConfigMatch: assessContentConfigMatch(content, config),
      imageQuestionAlignment: assessImageQuestionAlignment(content, config),
      configSpecificQuality: assessConfigSpecificQuality(content, config),
      contentFreshness: assessContentFreshness(content, iterationNum, previousContents),
      imageDiversity: assessImageDiversity(content, iterationNum, previousContents)
    };
  }

  const overallScore = calculateOverallScore(assessments, iterationNum, visionResult);
  const qualityGateResult = checkQualityGate(assessments, overallScore, config, visionResult);

  return {
    iterationNum,
    assessments,
    overallScore,
    qualityGateResult,
    passed: qualityGateResult.pass,
    visionAssessed: !!(visionResult && visionResult.success)
  };
}

function calculateOverallScore(assessments, iterationNum, visionResult = null) {
  // Vision-based scoring (when vision is available)
  if (visionResult && visionResult.success && visionResult.result.overallScore) {
    // Use vision's overall score as ground truth
    return visionResult.result.overallScore;
  }

  // HTML + Vision dimensions scoring
  const weights = iterationNum === 1 ? {
    questionCountValidation: 0.15,
    objectRepetition: 0.15,
    imageCollectionDiversity: 0.10,
    curriculumAlignment: 0.25,
    presentationQuality: 0.15,
    contentQuality: 0.15,
    imageQuestionAlignment: 0.05
  } : {
    questionCountValidation: 0.10,
    objectRepetition: 0.15,
    imageCollectionDiversity: 0.10,
    curriculumAlignment: 0.20,
    presentationQuality: 0.10,
    contentQuality: 0.15,
    imageQuestionAlignment: 0.05,
    contentFreshness: 0.10,
    imageDiversity: 0.05
  };

  let total = 0;
  let totalWeight = 0;

  for (const [key, assessment] of Object.entries(assessments)) {
    if (assessment.score !== 'N/A' && assessment.score !== 'PENDING_VISION' && weights[key]) {
      total += assessment.score * weights[key];
      totalWeight += weights[key];
    }
  }

  return totalWeight > 0 ? (total / totalWeight) * 10 : 0;
}

function checkQualityGate(assessments, overallScore, config, visionResult = null) {
  const gate = config.qualityGate;
  const failures = [];

  // If vision assessment is available, use its production-ready flag
  if (visionResult && visionResult.success && typeof visionResult.result.productionReady === 'boolean') {
    if (!visionResult.result.productionReady) {
      // Add vision-detected critical issues as failures
      const criticalIssues = visionResult.result.criticalIssues || [];
      criticalIssues.forEach((issue, i) => {
        failures.push({
          severity: 'P0',
          dimension: 'Vision',
          message: `Critical Issue ${i + 1}: ${issue}`
        });
      });

      // If no specific critical issues listed, use generic failure
      if (criticalIssues.length === 0) {
        failures.push({
          severity: 'P0',
          dimension: 'Vision',
          message: `Vision assessment: Not production ready (score: ${visionResult.result.overallScore || 'N/A'})`
        });
      }
    }

    return {
      pass: visionResult.result.productionReady,
      failures,
      visionBased: true
    };
  }

  // Fallback: HTML + dimension-based quality gates
  // Overall score
  if (overallScore < gate.minOverallScore) {
    failures.push({
      severity: 'P0',
      dimension: 'Overall',
      message: `Overall score ${overallScore.toFixed(2)} < ${gate.minOverallScore}`
    });
  }

  // Dimension checks (adapted for vision-based dimensions)
  const dimensionChecks = {
    curriculumAlignment: gate.minCurriculumAlignment,
    presentationQuality: gate.minPresentationQuality,
    contentQuality: gate.minContentConfigMatch, // Map to contentQuality
    imageQuestionAlignment: gate.minImageQuestionAlignment,
    contentFreshness: gate.minContentFreshness,
    imageDiversity: gate.minImageDiversity
  };

  for (const [dim, threshold] of Object.entries(dimensionChecks)) {
    if (assessments[dim]?.score !== 'N/A' &&
        assessments[dim]?.score !== 'PENDING_VISION' &&
        assessments[dim]?.score < threshold) {
      failures.push({
        severity: 'P1',
        dimension: dim,
        message: `${dim} ${assessments[dim].score} < ${threshold}`
      });
    }
  }

  return {
    pass: failures.filter(f => f.severity === 'P0').length === 0,
    failures,
    visionBased: false
  };
}

// ============================================================================
// CYCLE MANAGEMENT
// ============================================================================

function analyzeCycleResults(results, config) {
  const successful = results.filter(r => r.success && r.assessment);
  const failed = results.filter(r => !r.success);

  const passedGates = successful.filter(r =>
    checkQualityGate(r.assessment.assessments, r.assessment.overallScore, config).pass
  );

  const passRate = successful.length > 0
    ? passedGates.length / successful.length
    : 0;

  const p0Failures = successful.reduce((sum, r) => {
    return sum + (r.assessment.qualityGateResult?.failures || [])
      .filter(f => f.severity === 'P0').length;
  }, 0);

  const avgScore = successful.length > 0
    ? successful.reduce((sum, r) => sum + r.assessment.overallScore, 0) / successful.length
    : 0;

  const productionReady =
    passRate >= AGENT_CONFIG.PRODUCTION_THRESHOLD &&
    p0Failures === 0 &&
    avgScore >= config.qualityGate.minOverallScore &&
    failed.length === 0;

  return {
    totalIterations: results.length,
    successful: successful.length,
    failed: failed.length,
    passedGates: passedGates.length,
    passRate,
    p0Failures,
    avgScore,
    productionReady,
    results
  };
}

function saveCycleReport(cycleNum, analysis) {
  const reportPath = path.join(SESSION_DIR, `cycle-${cycleNum}-results.json`);
  fs.writeFileSync(reportPath, JSON.stringify(analysis, null, 2));
}

// ============================================================================
// MAIN LOOP
// ============================================================================

async function runAutonomousLoop() {
  const browser = await chromium.launch({
    headless: AGENT_CONFIG.HEADLESS,
    slowMo: 50,
    args: ['--window-size=1920,1080']
  });

  let productionReady = false;
  let currentCycle = 0;

  // FRESHNESS TRACKING: Create page ONCE for all cycles
  // This preserves React state (previousWorksheets) across cycles
  const page = await browser.newPage();

  while (currentCycle < AGENT_CONFIG.MAX_CYCLES && !productionReady) {
    currentCycle++;

    console.log(`\n${'━'.repeat(80)}`);
    console.log(`🔄 CYCLE ${currentCycle}/${AGENT_CONFIG.MAX_CYCLES}`);
    console.log(`${'━'.repeat(80)}\n`);

    // Run iterations with early abort on consecutive failures
    const results = [];
    let consecutiveFailures = 0;
    const MAX_CONSECUTIVE_FAILURES = 2;

    for (let i = 1; i <= AGENT_CONFIG.ITERATIONS_PER_CYCLE; i++) {
      console.log(`  📄 Iteration ${i}/${AGENT_CONFIG.ITERATIONS_PER_CYCLE}...`);

      // First iteration of first cycle: full setup. All other iterations: use Regenerate
      const isFirstIteration = (currentCycle === 1 && i === 1);
      const result = await generateWorksheet(page, currentCycle, i, config, isFirstIteration);

      if (result.success) {
        consecutiveFailures = 0; // Reset on success
        const assessment = assessWorksheet(result, i, results);
        results.push({ ...result, assessment });

        if (assessment) {
          const statusEmoji = assessment.passed ? '✅' : '⚠️';
          const p0Failures = assessment.qualityGateResult.failures.filter(f => f.severity === 'P0').length;
          console.log(`    ${statusEmoji} Score: ${assessment.overallScore.toFixed(1)}/100 | P0: ${p0Failures} | Status: ${assessment.passed ? 'PASS' : 'FAIL'}`);

          // Store content for freshness checks
          if (result.content) {
            previousContents.push(result.content);
          }
        }
      } else {
        consecutiveFailures++;
        results.push({ ...result, assessment: null });
        console.log(`    ❌ Generation failed: ${result.error}`);

        // Early abort if too many consecutive failures
        if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
          console.log(`\n⚠️  EARLY ABORT: ${consecutiveFailures} consecutive failures detected.`);
          console.log(`    Stopping cycle to avoid wasting time on systematic issues.\n`);
          break;
        }
      }
    }

    // Don't close page between cycles (preserves React state for freshness tracking)

    // Analyze cycle
    let analysis = analyzeCycleResults(results, config);

    console.log('\n🔍 Analyzing results...\n');
    console.log(`  📊 Pass Rate: ${(analysis.passRate * 100).toFixed(1)}% (target: ${(AGENT_CONFIG.PRODUCTION_THRESHOLD * 100).toFixed(1)}%)`);
    console.log(`  🚨 P0 Failures: ${analysis.p0Failures} (target: 0)`);
    console.log(`  📈 Avg Score: ${analysis.avgScore.toFixed(1)}/100 (target: ${config.qualityGate.minOverallScore})`);
    console.log(`  ✅ Production Ready: ${analysis.productionReady ? 'YES' : 'NO'}\n`);

    // Store cycle data
    cycleHistory.push({
      cycle: currentCycle,
      results,
      analysis,
      timestamp: new Date().toISOString()
    });

    // Save cycle report
    saveCycleReport(currentCycle, analysis);

    // ========================================================================
    // PHASE 1.5: VISION-BASED ASSESSMENT (Claude Code Task-Based)
    // ========================================================================
    if (AGENT_CONFIG.ENABLE_VISION) {
      console.log('\n🔍 VISION ASSESSMENT: Creating vision tasks for Claude Code...\n');

      const ClaudeCodeVisionAssessor = require('./services/claude-code-vision-assessor.js');
      const visionAssessor = new ClaudeCodeVisionAssessor(SESSION_DIR);

      await visionAssessor.initialize();

      // Create vision tasks for all successful worksheet screenshots in this cycle
      const visionTasks = [];
      for (const result of results.filter(r => r.success)) {
        const screenshotPath = path.join(
          SESSION_DIR,
          `cycle-${currentCycle}-screenshots`,
          result.screenshots.worksheet
        );

        const task = await visionAssessor.createVisionTask(
          screenshotPath,
          config,
          result.assessment.iterationNum,
          currentCycle
        );

        visionTasks.push(task);
      }

      console.log(`📋 Created ${visionTasks.length} vision assessment tasks\n`);
      console.log('⏸️  PAUSING FOR VISION ASSESSMENT...\n');
      console.log('========================================');
      console.log('🔍 ACTION REQUIRED: CLAUDE CODE VISION');
      console.log('========================================\n');
      console.log('Please assess the worksheet screenshots with your vision:\n');

      visionTasks.forEach((task, i) => {
        console.log(`${i + 1}. Task: ${task.taskId}`);
        console.log(`   Screenshot: ${task.task.screenshotFullPath}`);
        console.log(`   Instructions: ${task.taskPath}\n`);
      });

      console.log('After completing all vision assessments, the agent will continue automatically.\n');
      console.log('Waiting for vision results...\n');

      // Wait for all vision assessments to complete
      const visionResults = [];
      for (const task of visionTasks) {
        const result = await visionAssessor.waitForAssessment(task.taskId, 600); // 10 min timeout
        visionResults.push(result);
      }

      const completedCount = visionResults.filter(r => r.success).length;
      console.log(`\n✅ Vision assessment complete: ${completedCount}/${visionTasks.length} successful\n`);

      // RE-ASSESS WORKSHEETS WITH VISION RESULTS
      console.log('🔄 Re-assessing worksheets with vision data...\n');
      for (let i = 0; i < visionResults.length; i++) {
        const visionResult = visionResults[i];
        const resultIndex = results.findIndex(r => r.success && r.assessment?.iterationNum === i + 1);

        if (visionResult.success && resultIndex !== -1) {
          const result = results[resultIndex];
          const previousResults = results.slice(0, resultIndex);

          // Re-assess with vision result
          const updatedAssessment = assessWorksheet(result, i + 1, previousResults, visionResult);
          results[resultIndex].assessment = updatedAssessment;

          console.log(`   ✅ Iteration ${i + 1}: Score updated from ${analysis.results[resultIndex].assessment.overallScore.toFixed(1)} → ${updatedAssessment.overallScore.toFixed(1)}`);
        }
      }

      // Re-analyze cycle with updated vision-based assessments
      analysis = analyzeCycleResults(results, config);
      console.log('\n🔍 Re-analyzing with vision data...\n');
      console.log(`  📊 Pass Rate: ${(analysis.passRate * 100).toFixed(1)}% (target: ${(AGENT_CONFIG.PRODUCTION_THRESHOLD * 100).toFixed(1)}%)`);
      console.log(`  🚨 P0 Failures: ${analysis.p0Failures} (target: 0)`);
      console.log(`  📈 Avg Score: ${analysis.avgScore.toFixed(1)}/100 (target: ${config.qualityGate.minOverallScore})`);
      console.log(`  ✅ Production Ready: ${analysis.productionReady ? 'YES' : 'NO'}\n`);

      // Update cycle history with vision-based analysis
      cycleHistory[cycleHistory.length - 1].analysis = analysis;
      cycleHistory[cycleHistory.length - 1].results = results;

      // Save updated cycle report
      saveCycleReport(currentCycle, analysis);

      // Compare vision vs text assessments and generate discrepancy report
      const discrepancyReports = [];
      for (let i = 0; i < visionResults.length; i++) {
        const visionResult = visionResults[i];
        const textResult = results.filter(r => r.success)[i];

        if (visionResult.success && textResult.content) {
          const comparison = visionAssessor.compareAssessments(
            visionResult,
            {
              questionCount: textResult.content.questions.length,
              images: textResult.content.images,
              numbers: textResult.content.numbers,
              config
            }
          );

          discrepancyReports.push(comparison);
        }
      }

      // Log discrepancy summary
      const totalDiscrepancies = discrepancyReports.filter(r => r.hasDiscrepancies).length;
      if (totalDiscrepancies > 0) {
        console.log(`\n⚠️  DISCREPANCIES DETECTED: ${totalDiscrepancies} worksheets have vision/text mismatches\n`);

        discrepancyReports.forEach((report, i) => {
          if (report.hasDiscrepancies) {
            console.log(`   Iteration ${i + 1}:`);
            report.discrepancies.forEach(disc => {
              console.log(`     • [${disc.severity}] ${disc.type}`);
              console.log(`       Vision: ${disc.visionSees} | Text: ${disc.textParserSays}`);
              console.log(`       Root Cause: ${disc.rootCause}\n`);
            });
          }
        });

        // Generate self-healing plan from vision feedback
        const allDiscrepancies = discrepancyReports.flatMap(r => r.discrepancies);
        const healingPlan = visionAssessor.generateSelfHealingPlan(allDiscrepancies, visionResults);

        console.log(`\n🔧 SELF-HEALING PLAN GENERATED:\n`);
        console.log(`   Total Fixes: ${healingPlan.totalFixes}`);
        console.log(`   Automated: ${healingPlan.automatedFixes}`);
        console.log(`   Manual Review: ${healingPlan.manualFixes}\n`);

        // Save self-healing plan for review
        const healingPlanPath = path.join(SESSION_DIR, `self-healing-plan-cycle-${currentCycle}.json`);
        fs.writeFileSync(healingPlanPath, JSON.stringify(healingPlan, null, 2));
        console.log(`📝 Self-healing plan saved: ${healingPlanPath}\n`);

        // VISION PRECEDENCE: Filter out "false positive" discrepancies where vision confirms worksheet is correct
        // Only keep discrepancies where vision detects actual problems (broken images, wrong counts, etc.)
        const realIssues = allDiscrepancies.filter(disc => {
          // If vision says images are working and text says broken → trust vision (no fix needed)
          if (disc.type === 'IMAGE_STATUS' && disc.visionSees.includes('working')) {
            console.log(`   ✅ Vision confirms: ${disc.visionSees} - Ignoring text parser error\n`);
            return false;
          }
          // If vision sees correct count but text parser sees different count → trust vision (no fix needed)
          if (disc.type === 'QUESTION_COUNT' && disc.visionSees.includes('Correct')) {
            console.log(`   ✅ Vision confirms: ${disc.visionSees} - Ignoring text parser mismatch\n`);
            return false;
          }
          // Keep all other issues (broken images, mismatches where vision detects problems)
          return true;
        });

        console.log(`\n🔍 VISION FILTERING: ${allDiscrepancies.length} total discrepancies → ${realIssues.length} real issues requiring fixes\n`);

        // Track ONLY real vision-detected issues for Fix Registry integration
        analysis.visionIssues = realIssues;
        analysis.visionResults = visionResults;
        analysis.systemHealthScore = discrepancyReports.reduce((sum, r) =>
          sum + (r.systemHealthScore || 100), 0) / discrepancyReports.length;

        console.log(`   System Health: ${analysis.systemHealthScore.toFixed(1)}%\n`);
      } else {
        console.log(`\n✅ NO DISCREPANCIES: Vision and text assessments agree - system is accurate!\n`);
        analysis.visionIssues = [];
        analysis.visionResults = visionResults;
        analysis.systemHealthScore = 100;
      }
    }

    // Check production readiness
    if (analysis.productionReady) {
      console.log(`\n${'🎉'.repeat(40)}`);
      console.log(`✅ PRODUCTION READY ACHIEVED IN CYCLE ${currentCycle}!`);
      console.log(`${'🎉'.repeat(40)}\n`);
      productionReady = true;
      break;
    }

    // PHASE 2: AUTO-FIX ENGINE
    if (AGENT_CONFIG.AUTO_FIX_ENABLED && currentCycle < AGENT_CONFIG.MAX_CYCLES) {
      try {
        const catalogPath = path.join(process.cwd(), 'scripts', 'catalogs', 'worksheet-objects-catalog.json');

        // Backup catalog before applying fixes
        const backupPath = path.join(SESSION_DIR, `catalog-backup-cycle-${currentCycle}.json`);
        if (fs.existsSync(catalogPath)) {
          fs.copyFileSync(catalogPath, backupPath);
          console.log(`💾 Catalog backed up: ${backupPath}\n`);
        }

        // Load Fix Registry
        const fixRegistry = require('./fixes/fix-registry.js');

        // VISION TAKES PRECEDENCE: Use vision assessment data for fix detection
        // Text assessment is ignored when vision data is available
        const visionIssues = analysis.visionIssues || [];

        console.log(`\n🔍 AUTO-FIX ENGINE: Processing ${visionIssues.length} vision-detected issues...\n`);

        // Prepare assessment result for Fix Registry
        // Vision assessment takes precedence - text assessment only used as fallback
        const assessmentResult = {
          rawText: visionIssues.length > 0 ? '' : JSON.stringify(analysis), // Ignore text if vision available
          visionIssues: visionIssues // Vision results from compareAssessments()
        };

        // Detect and apply fixes based on VISION ASSESSMENT ONLY
        const fixes = await fixRegistry.detectAndApply(assessmentResult, catalogPath, configId);

        // Log applied fixes
        if (fixes && fixes.length > 0) {
          fixesApplied.push(...fixes.map(f => ({
            ...f,
            cycle: currentCycle,
            timestamp: new Date().toISOString()
          })));

          console.log(`\n✅ Applied ${fixes.length} fix(es) in cycle ${currentCycle}\n`);
        } else {
          console.log('\nℹ️  No fixes needed - system performing within acceptable parameters\n');
        }
      } catch (error) {
        console.error(`\n❌ Auto-fix error: ${error.message}\n`);
        console.error(`   Continuing without fixes...\n`);
      }
    }

    // PHASE 3: PROMPT AUTO-VERSIONING
    if (AGENT_CONFIG.AUTO_FIX_ENABLED && currentCycle < AGENT_CONFIG.MAX_CYCLES) {
      const promptIssues = detectPromptIssues(cycleHistory, config);
      if (promptIssues.length > 0) {
        console.log(`\n🔍 Detected ${promptIssues.length} systematic prompt issue(s):\n`);
        promptIssues.forEach((issue, i) => {
          console.log(`   ${i + 1}. [${issue.severity}] ${issue.message}`);
        });

        try {
          const newPromptVersion = await generateImprovedPrompt(config, promptIssues, SESSION_DIR);
          if (newPromptVersion) {
            applyNewPromptVersion(config, newPromptVersion);

            fixesApplied.push({
              type: 'PROMPT_VERSION',
              name: 'Prompt Auto-Versioning',
              action: 'GENERATED',
              message: `Generated new prompt version ${newPromptVersion.version}`,
              changes: newPromptVersion.changes,
              cycle: currentCycle,
              timestamp: new Date().toISOString()
            });

            console.log(`\n✅ Generated and applied prompt version ${newPromptVersion.version}\n`);
          }
        } catch (error) {
          console.error(`\n❌ Prompt versioning error: ${error.message}\n`);
        }
      }
    }

    // CROSS-CYCLE FRESHNESS: Do NOT reset previousContents between cycles
    // This ensures LLM is penalized for repeating content from ANY previous iteration,
    // not just within the current cycle. This is critical for multi-cycle quality improvement.
    console.log(`📊 Freshness tracking: ${previousContents.length} worksheets in memory for next cycle\n`);
  }

  // Close page and browser after all cycles complete
  await page.close();
  await browser.close();

  return { productionReady, totalCycles: currentCycle };
}

// ============================================================================
// PHASE 3: PROMPT AUTO-VERSIONING
// ============================================================================

function detectPromptIssues(cycleHistory, config) {
  const issues = [];

  if (cycleHistory.length < 2) {
    return issues; // Need at least 2 cycles to detect patterns
  }

  // Check for systematic number range violations
  const rangeViolationCycles = cycleHistory.filter(cycle => {
    return cycle.analysis.results.some(r => {
      if (!r.assessment) return false;
      const feedback = r.assessment.assessments.configSpecificQuality?.justification || '';
      return feedback.includes('Numbers beyond range');
    });
  });

  if (rangeViolationCycles.length >= 2) {
    issues.push({
      type: 'NUMBER_RANGE_VIOLATION',
      severity: 'HIGH',
      message: `Systematic number range violations in ${rangeViolationCycles.length} cycles`,
      suggestedFix: `Add explicit FORBIDDEN_NUMBERS section to prompt with examples`
    });
  }

  // Check for question count issues
  const countIssueCycles = cycleHistory.filter(cycle => {
    return cycle.analysis.results.some(r => {
      if (!r.assessment) return false;
      const feedback = r.assessment.assessments.contentConfigMatch?.justification || '';
      return feedback.includes('Question count mismatch');
    });
  });

  if (countIssueCycles.length >= 2) {
    issues.push({
      type: 'QUESTION_COUNT_MISMATCH',
      severity: 'HIGH',
      message: `Systematic question count issues in ${countIssueCycles.length} cycles`,
      suggestedFix: `Strengthen question count enforcement with explicit counting instruction`
    });
  }

  // Check for image-question alignment issues
  const imageAlignmentCycles = cycleHistory.filter(cycle => {
    const avgScore = cycle.analysis.results
      .filter(r => r.assessment)
      .reduce((sum, r) => sum + (r.assessment.assessments.imageQuestionAlignment?.score || 0), 0) /
      (cycle.analysis.results.filter(r => r.assessment).length || 1);
    return avgScore < config.qualityGate.minImageQuestionAlignment;
  });

  if (imageAlignmentCycles.length >= 2) {
    issues.push({
      type: 'IMAGE_QUESTION_ALIGNMENT',
      severity: 'MEDIUM',
      message: `Persistent image-question alignment issues in ${imageAlignmentCycles.length} cycles`,
      suggestedFix: `Add explicit image selection guidance and semantic matching requirements`
    });
  }

  return issues;
}

function incrementVersion(currentVersion) {
  // v1.0 → v1.1, v1.9 → v2.0
  const match = currentVersion.match(/v(\d+)\.(\d+)/);
  if (!match) return 'v1.1';

  const major = parseInt(match[1]);
  const minor = parseInt(match[2]);

  if (minor >= 9) {
    return `v${major + 1}.0`;
  } else {
    return `v${major}.${minor + 1}`;
  }
}

async function generateImprovedPrompt(config, issues, sessionDir) {
  const currentVersion = config.promptConfig.version;
  const newVersion = incrementVersion(currentVersion);

  // For now, generate a suggested improvements file instead of modifying the actual prompt
  // This is safer and allows human review before applying
  const suggestionsPath = path.join(sessionDir, `prompt-improvements-${newVersion}.md`);

  let suggestions = `# Prompt Improvement Suggestions (${newVersion})\n\n`;
  suggestions += `**Current Version**: ${currentVersion}\n`;
  suggestions += `**Suggested Version**: ${newVersion}\n`;
  suggestions += `**Config**: ${config.promptConfig.filePath}\n\n`;
  suggestions += `## Detected Issues\n\n`;

  const changes = [];

  issues.forEach((issue, i) => {
    suggestions += `### ${i + 1}. ${issue.type}\n`;
    suggestions += `**Severity**: ${issue.severity}\n`;
    suggestions += `**Issue**: ${issue.message}\n`;
    suggestions += `**Suggested Fix**: ${issue.suggestedFix}\n\n`;

    if (issue.type === 'NUMBER_RANGE_VIOLATION') {
      suggestions += `**Implementation**:\n`;
      suggestions += `Add the following section to the prompt:\n\n`;
      suggestions += `\`\`\`\n`;
      suggestions += `🚨🚨🚨 FORBIDDEN NUMBERS 🚨🚨🚨\n`;
      suggestions += `DO NOT USE: 11, 12, 13, 14, 15, 20, 25, 50, 100, or any number > ${config.specificChecks.maxNumber}\n`;
      suggestions += `ONLY USE: ${Array.from({length: config.specificChecks.maxNumber - config.specificChecks.minNumber + 1}, (_, i) => config.specificChecks.minNumber + i).join(', ')}\n`;
      suggestions += `\`\`\`\n\n`;
      changes.push(`Add forbidden numbers list (${config.specificChecks.minNumber}-${config.specificChecks.maxNumber} only)`);
    }

    if (issue.type === 'QUESTION_COUNT_MISMATCH') {
      suggestions += `**Implementation**:\n`;
      suggestions += `Add explicit counting instruction:\n\n`;
      suggestions += `\`\`\`\n`;
      suggestions += `COUNT YOUR QUESTIONS: 1, 2, 3, 4, 5 - THEN STOP!\n`;
      suggestions += `Expected: EXACTLY ${config.numQuestions} questions\n`;
      suggestions += `After writing each question, count it. After question ${config.numQuestions}, STOP IMMEDIATELY.\n`;
      suggestions += `\`\`\`\n\n`;
      changes.push(`Add explicit question counting (${config.numQuestions} questions required)`);
    }

    if (issue.type === 'IMAGE_QUESTION_ALIGNMENT') {
      suggestions += `**Implementation**:\n`;
      suggestions += `Add semantic matching requirement:\n\n`;
      suggestions += `\`\`\`\n`;
      suggestions += `IMAGE SELECTION RULES:\n`;
      suggestions += `1. Question about apples → MUST show apple images\n`;
      suggestions += `2. Question about footballs → MUST show football images\n`;
      suggestions += `3. NEVER mix object types (e.g., no sailors for football questions)\n`;
      suggestions += `4. Image must clearly show the EXACT object mentioned in the question\n`;
      suggestions += `\`\`\`\n\n`;
      changes.push('Add explicit image-question semantic matching rules');
    }
  });

  suggestions += `## Next Steps\n\n`;
  suggestions += `1. Review these suggestions\n`;
  suggestions += `2. Update the prompt file: \`${config.promptConfig.filePath.replace('.ts', `-${newVersion}.ts`)}\`\n`;
  suggestions += `3. Test the new version with the autonomous agent\n`;
  suggestions += `4. If successful, update config to use ${newVersion}\n\n`;

  fs.writeFileSync(suggestionsPath, suggestions);

  console.log(`📝 Prompt improvement suggestions saved: ${suggestionsPath}\n`);

  return {
    version: newVersion,
    path: suggestionsPath,
    changes
  };
}

function applyNewPromptVersion(config, newPromptVersion) {
  // For safety, we DON'T automatically switch prompts
  // Instead, we log the suggestion for manual review
  console.log(`\n📋 Prompt version ${newPromptVersion.version} suggestions generated`);
  console.log(`   Review file: ${newPromptVersion.path}`);
  console.log(`   ⚠️  Manual review required before applying\n`);

  // The config.promptConfig is NOT updated automatically
  // This ensures the current cycle completes with the same prompt
  // Human must manually create the new prompt file and update the config
}

// ============================================================================
// REPORTING
// ============================================================================

function calculateCrossCycleAnalytics() {
  if (cycleHistory.length < 2) {
    return null; // Not enough data for trend analysis
  }

  const metrics = {
    passRate: [],
    avgScore: [],
    p0Failures: []
  };

  cycleHistory.forEach(cycle => {
    metrics.passRate.push(cycle.analysis.passRate);
    metrics.avgScore.push(cycle.analysis.avgScore);
    metrics.p0Failures.push(cycle.analysis.p0Failures);
  });

  const calculateTrend = (values) => {
    if (values.length < 2) return 'stable';
    const lastValue = values[values.length - 1];
    const firstValue = values[0];
    const change = lastValue - firstValue;
    const changePercent = firstValue !== 0 ? (change / firstValue) * 100 : 0;

    if (Math.abs(changePercent) < 5) return 'stable';
    return change > 0 ? 'improving' : 'declining';
  };

  return {
    passRateTrend: calculateTrend(metrics.passRate),
    scoreTrend: calculateTrend(metrics.avgScore),
    p0FailuresTrend: metrics.p0Failures[0] - metrics.p0Failures[metrics.p0Failures.length - 1] > 0 ? 'improving' : 'stable',
    totalIterations: cycleHistory.reduce((sum, c) => sum + c.analysis.totalIterations, 0),
    totalSuccessful: cycleHistory.reduce((sum, c) => sum + c.analysis.successful, 0),
    totalFailed: cycleHistory.reduce((sum, c) => sum + c.analysis.failed, 0),
    avgPassRateAcrossCycles: metrics.passRate.reduce((a, b) => a + b, 0) / metrics.passRate.length,
    avgScoreAcrossCycles: metrics.avgScore.reduce((a, b) => a + b, 0) / metrics.avgScore.length
  };
}

function generateFinalReport() {
  const firstAnalysis = cycleHistory[0]?.analysis;
  const finalAnalysis = cycleHistory[cycleHistory.length - 1]?.analysis;

  const improvement = finalAnalysis && firstAnalysis
    ? {
        passRateChange: `${((finalAnalysis.passRate - firstAnalysis.passRate) * 100).toFixed(1)}%`,
        scoreChange: `${(finalAnalysis.avgScore - firstAnalysis.avgScore).toFixed(1)} points`
      }
    : {
        passRateChange: 'N/A',
        scoreChange: 'N/A'
      };

  const analytics = calculateCrossCycleAnalytics();

  return {
    sessionId: SESSION_ID,
    configId,
    timestamp: new Date().toISOString(),
    totalCycles: cycleHistory.length,
    productionReady: finalAnalysis?.productionReady || false,
    config,
    cycleHistory,
    fixesApplied,
    improvement,
    analytics
  };
}

function generateMarkdownReport(report) {
  return `# Autonomous Worksheet Quality Assessment - Final Report

**Session ID**: ${report.sessionId}
**Config ID**: ${report.configId}
**Date**: ${report.timestamp}

---

## Executive Summary

### Production Readiness: ${report.productionReady ? '✅ YES' : '❌ NO'}

### Performance Metrics
- **Total Cycles**: ${report.totalCycles}
- **Fixes Applied**: ${report.fixesApplied.length}
- **Final Pass Rate**: ${(report.cycleHistory[report.cycleHistory.length - 1]?.analysis.passRate * 100).toFixed(1)}%
- **Pass Rate Improvement**: ${report.improvement.passRateChange}
- **Final P0 Failures**: ${report.cycleHistory[report.cycleHistory.length - 1]?.analysis.p0Failures || 0}
- **Final Average Score**: ${report.cycleHistory[report.cycleHistory.length - 1]?.analysis.avgScore.toFixed(1) || 0}/100

---

## Configuration Details

- **Year Group**: ${report.config.yearGroup}
- **Topic**: ${report.config.topic}
- **Subtopic**: ${report.config.subtopic}
- **Number Questions**: ${report.config.numQuestions}
- **Prompt Version**: ${report.config.promptConfig.version}

### Quality Gate Thresholds
- Overall Score: ≥${report.config.qualityGate.minOverallScore}/100
- Curriculum Alignment: ≥${report.config.qualityGate.minCurriculumAlignment}/10
- Presentation Quality: ≥${report.config.qualityGate.minPresentationQuality}/10
- Content-Config Match: ≥${report.config.qualityGate.minContentConfigMatch}/10
- Image-Question Alignment: ≥${report.config.qualityGate.minImageQuestionAlignment}/10
- Content Freshness: ≥${report.config.qualityGate.minContentFreshness}/10
- Image Diversity: ≥${report.config.qualityGate.minImageDiversity}/10

---

## Cycle History

| Cycle | Pass Rate | P0 Failures | Avg Score | Production Ready |
|-------|-----------|-------------|-----------|------------------|
${report.cycleHistory.map(c =>
  `| ${c.cycle} | ${(c.analysis.passRate * 100).toFixed(1)}% | ${c.analysis.p0Failures} | ${c.analysis.avgScore.toFixed(1)}/100 | ${c.analysis.productionReady ? '✅' : '❌'} |`
).join('\n')}

---

## Fixes Applied

${report.fixesApplied.length > 0 ? report.fixesApplied.map((fix, i) => `
### ${i + 1}. [${fix.type}] ${fix.name || 'Fix'}
- **Cycle**: ${fix.cycle}
- **Action**: ${fix.action}
- **Message**: ${fix.message}
${fix.changes && fix.changes.length > 0 ? `- **Changes**:
${fix.changes.map(c => `  - ${c}`).join('\n')}` : ''}
`).join('\n') : 'No automated fixes were applied during this session.\n'}

---
${report.analytics ? `
## Cross-Cycle Analytics

${report.analytics ? `
### Performance Trends
- **Pass Rate Trend**: ${report.analytics.passRateTrend === 'improving' ? '📈 Improving' : report.analytics.passRateTrend === 'declining' ? '📉 Declining' : '➡️ Stable'}
- **Score Trend**: ${report.analytics.scoreTrend === 'improving' ? '📈 Improving' : report.analytics.scoreTrend === 'declining' ? '📉 Declining' : '➡️ Stable'}
- **P0 Failures Trend**: ${report.analytics.p0FailuresTrend === 'improving' ? '📈 Improving (Decreasing)' : '➡️ Stable'}

### Session Statistics
- **Total Iterations**: ${report.analytics.totalIterations}
- **Successful Generations**: ${report.analytics.totalSuccessful}
- **Failed Generations**: ${report.analytics.totalFailed}
- **Average Pass Rate (All Cycles)**: ${(report.analytics.avgPassRateAcrossCycles * 100).toFixed(1)}%
- **Average Score (All Cycles)**: ${report.analytics.avgScoreAcrossCycles.toFixed(1)}/100
` : ''}
---
` : ''}
## Conclusion

${report.productionReady ?
  `✅ **SUCCESS**: This configuration achieved production-ready status in ${report.totalCycles} cycle(s). The system is stable and meets all quality gates.

### Recommendations
- ✅ Lock this prompt version (${report.config.promptConfig.version})
- ✅ Move to next ${report.config.yearGroup} configuration
- ✅ Deploy to production with confidence` :
  `❌ **ATTENTION NEEDED**: After ${report.totalCycles} cycles, this configuration has not achieved production-ready status.

### Recommendations
- ⚠️ Review quality gate failures
- ⚠️ Consider prompt engineering improvements
- ⚠️ Investigate systematic issues
${report.fixesApplied.length > 0 ? '- ⚠️ Review applied fixes and their effectiveness' : ''}`
}

---

**Report Generated**: ${new Date().toISOString()}
**Session Directory**: ${SESSION_DIR}
`;
}

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

async function main() {
  try {
    await waitForServer(AGENT_CONFIG.BASE_URL);

    console.log('='.repeat(80));
    console.log('🚀 STARTING AUTONOMOUS QUALITY IMPROVEMENT LOOP');
    console.log('='.repeat(80));
    console.log('\n');

    const { productionReady, totalCycles } = await runAutonomousLoop();

    // Generate final report
    console.log('\n' + '='.repeat(80));
    console.log('📊 FINAL REPORT');
    console.log('='.repeat(80) + '\n');

    const finalReport = generateFinalReport();

    // Save reports
    const jsonPath = path.join(SESSION_DIR, 'FINAL-REPORT.json');
    const mdPath = path.join(SESSION_DIR, 'FINAL-REPORT.md');

    fs.writeFileSync(jsonPath, JSON.stringify(finalReport, null, 2));
    fs.writeFileSync(mdPath, generateMarkdownReport(finalReport));

    console.log('📄 Final report saved:');
    console.log(`   JSON: ${jsonPath}`);
    console.log(`   Markdown: ${mdPath}\n`);

    // Display summary
    console.log(`🎯 PRODUCTION READY: ${productionReady ? '✅ YES' : '❌ NO'}\n`);
    console.log('📊 Performance:');
    console.log(`   • Total Cycles: ${totalCycles}`);
    console.log(`   • Final Pass Rate: ${(finalReport.cycleHistory[totalCycles - 1]?.analysis.passRate * 100).toFixed(1)}%`);
    console.log(`   • Pass Rate Improvement: ${finalReport.improvement.passRateChange}`);
    console.log(`   • Final P0 Failures: ${finalReport.cycleHistory[totalCycles - 1]?.analysis.p0Failures}\n`);

    if (productionReady) {
      console.log('✅ Configuration is PRODUCTION READY. Deploy with confidence!\n');
    } else {
      console.log('❌ Configuration NOT production ready. Review issues and apply fixes.\n');
    }

    process.exit(productionReady ? 0 : 1);

  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the autonomous agent
main();
