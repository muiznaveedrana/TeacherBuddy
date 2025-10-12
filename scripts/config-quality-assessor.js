#!/usr/bin/env node

/**
 * Configuration-Specific Worksheet Quality Assessor
 * Enhanced version with config tracking, prompt versioning, and parallel support
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name, defaultValue) => {
  const index = args.indexOf(`--${name}`);
  return index > -1 && args[index + 1] ? args[index + 1] : defaultValue;
};

// Configuration from command line or defaults
const CONFIG_ID = getArg('config', 'reception-number-counting-counting-to-10');
const PROMPT_VERSION = getArg('promptVersion', 'baseline');
const MODE = getArg('mode', 'standard'); // standard, baseline, quality-gate
const ITERATIONS = parseInt(getArg('iterations', '5'));
const COMPARE_WITH = getArg('compare', null); // baseline, v1.0, etc.
const ASYNC_MODE = args.includes('--async');

// Config registry mapping
const CONFIG_REGISTRY = {
  'reception-number-counting-counting-to-10': {
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Number and Counting',
    subtopic: 'Counting to 10',
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
      maxNumberRange: 10,
      requireVisualSupport: true,
      maxQuestionComplexity: 'simple',
      singleObjectTypeRequired: true,
      realWorldContextRequired: true
    }
  },
  'reception-number-counting-number-recognition': {
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Number and Counting',
    subtopic: 'Number Recognition',
    numQuestions: 5,
    qualityGate: {
      minOverallScore: 85,
      minCurriculumAlignment: 8,
      minPresentationQuality: 7,
      minContentConfigMatch: 9,
      minImageQuestionAlignment: 8,
      minContentFreshness: 9,
      minImageDiversity: 8
    },
    specificChecks: {
      maxNumberRange: 10,
      requireVisualSupport: true,
      maxQuestionComplexity: 'simple',
      numeralRecognitionRequired: true
    }
  }
  // Add more configs as needed
};

const config = CONFIG_REGISTRY[CONFIG_ID];

if (!config) {
  console.error(`❌ Unknown config ID: ${CONFIG_ID}`);
  console.log('\nAvailable configs:');
  Object.keys(CONFIG_REGISTRY).forEach(id => console.log(`  - ${id}`));
  process.exit(1);
}

// Runtime configuration
const RUNTIME_CONFIG = {
  configId: CONFIG_ID,
  promptVersion: PROMPT_VERSION,
  mode: MODE,
  iterations: ITERATIONS,
  compareWith: COMPARE_WITH,
  async: ASYNC_MODE,
  baseUrl: 'http://localhost:3000',
  screenshotsDir: path.join(__dirname, '..', 'worksheet-quality-reports', CONFIG_ID, PROMPT_VERSION, 'screenshots'),
  reportsDir: path.join(__dirname, '..', 'worksheet-quality-reports', CONFIG_ID, PROMPT_VERSION),
  generationTimeout: 120000,
  imageLoadTimeout: 5000,
  ...config
};

// Storage
const iterationData = [];
const performanceMetrics = [];

/**
 * Setup directories
 */
function setupDirectories() {
  [RUNTIME_CONFIG.screenshotsDir, RUNTIME_CONFIG.reportsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

/**
 * Generate worksheet
 */
async function generateWorksheet(page, iterationNumber) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`ITERATION ${iterationNumber}: Worksheet Generation`);
  console.log(`Config: ${RUNTIME_CONFIG.configId}`);
  console.log(`Prompt Version: ${RUNTIME_CONFIG.promptVersion}`);
  console.log('='.repeat(60));

  const startTime = Date.now();
  const metrics = {
    iteration: iterationNumber,
    configId: RUNTIME_CONFIG.configId,
    promptVersion: RUNTIME_CONFIG.promptVersion,
    timestamp: new Date().toISOString(),
    startTime,
    generationTime: null,
    status: 'pending',
    errors: [],
    warnings: [],
    imagesLoaded: 0,
    imagesTotalCount: 0
  };

  try {
    // Navigate
    console.log('Step 1: Navigating to dashboard...');
    await page.goto(`${RUNTIME_CONFIG.baseUrl}/dashboard`);
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    console.log('✓ Dashboard loaded');

    // Wait for selects to be ready
    await page.waitForSelector('select, [role="combobox"]', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Select Year Group
    console.log(`Step 2: Selecting year group: ${RUNTIME_CONFIG.yearGroupSelect}...`);

    try {
      const yearButton = page.getByText('Year 3 (Ages 7-8)').first();
      await yearButton.click({ timeout: 5000 });
      await page.waitForTimeout(500);
      await page.getByRole('option', { name: RUNTIME_CONFIG.yearGroupSelect }).click();
      await page.waitForTimeout(2000);
      console.log('✓ Year group selected');
    } catch (e) {
      console.log('Method 1 failed, trying method 2...');
      await page.locator('label:has-text("Year Group")').locator('..').locator('button').first().click();
      await page.waitForTimeout(500);
      await page.keyboard.press('Home');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(2000);
      console.log('✓ Year group selected (method 2)');
    }

    // Select Topic
    console.log(`Step 3: Selecting topic: ${RUNTIME_CONFIG.topic}...`);
    await page.waitForTimeout(1000);

    const topicButton = page.getByText('Select a curriculum topic').or(page.getByText('Addition and Subtraction')).first();
    await topicButton.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: RUNTIME_CONFIG.topic }).click();
    await page.waitForTimeout(2000);
    console.log('✓ Topic selected');

    // Select Subtopic
    console.log(`Step 4: Selecting subtopic: ${RUNTIME_CONFIG.subtopic}...`);
    const subtopicButton = page.getByText('Select a subtopic').or(page.getByText('Select topic first')).first();
    await subtopicButton.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: RUNTIME_CONFIG.subtopic }).click();
    await page.waitForTimeout(1500);
    console.log('✓ Subtopic selected');

    // Screenshot configuration
    const configScreenshot = path.join(RUNTIME_CONFIG.screenshotsDir, `iter${iterationNumber}-01-config.png`);
    await page.screenshot({ path: configScreenshot, fullPage: true });

    // Generate
    console.log('Step 5: Generating worksheet...');
    const genStartTime = Date.now();

    const generateButton = page.getByRole('button', { name: 'Generate Worksheet' });
    await generateButton.click();

    // Wait for completion
    await page.waitForSelector('text=Download', { timeout: RUNTIME_CONFIG.generationTimeout });

    const genEndTime = Date.now();
    metrics.generationTime = ((genEndTime - genStartTime) / 1000).toFixed(2);
    console.log(`✓ Worksheet generated in ${metrics.generationTime}s`);

    // Wait for images
    await page.waitForTimeout(3000);

    // Count and check images
    const imageElements = await page.locator('.worksheet-preview img').all();
    metrics.imagesTotalCount = imageElements.length;
    console.log(`Found ${metrics.imagesTotalCount} image elements`);

    for (const img of imageElements) {
      try {
        const isVisible = await img.isVisible({ timeout: RUNTIME_CONFIG.imageLoadTimeout });
        if (isVisible) {
          metrics.imagesLoaded++;
        }
      } catch (err) {
        // Image failed to load
      }
    }

    console.log(`✓ Images loaded: ${metrics.imagesLoaded}/${metrics.imagesTotalCount}`);

    // Screenshot worksheet
    const worksheetScreenshot = path.join(RUNTIME_CONFIG.screenshotsDir, `iter${iterationNumber}-02-worksheet.png`);
    await page.screenshot({ path: worksheetScreenshot, fullPage: true });

    // Extract content
    const content = await extractContent(page);

    metrics.status = 'success';
    return {
      metrics,
      content,
      screenshots: { config: configScreenshot, worksheet: worksheetScreenshot }
    };

  } catch (error) {
    metrics.status = 'failed';
    metrics.errors.push(error.message);
    console.error(`✗ Generation failed: ${error.message}`);

    const errorScreenshot = path.join(RUNTIME_CONFIG.screenshotsDir, `iter${iterationNumber}-error.png`);
    await page.screenshot({ path: errorScreenshot, fullPage: true }).catch(() => {});

    return {
      metrics,
      content: { text: '', questions: [], images: [] },
      screenshots: { error: errorScreenshot }
    };
  }
}

/**
 * Extract worksheet content
 */
async function extractContent(page) {
  const content = { text: '', questions: [], images: [] };

  try {
    const textContent = await page.locator('.worksheet-preview').textContent();
    content.text = textContent || '';

    const questionMatches = textContent?.match(/\d+[\.\)]\s*.+/g) || [];
    content.questions = questionMatches;

    const images = await page.locator('.worksheet-preview img').all();
    for (const img of images) {
      const src = await img.getAttribute('src').catch(() => '');
      const alt = await img.getAttribute('alt').catch(() => '');
      const visible = await img.isVisible().catch(() => false);
      content.images.push({ src, alt, visible });
    }
  } catch (err) {
    console.warn(`Warning: Content extraction partial: ${err.message}`);
  }

  return content;
}

/**
 * Assess curriculum alignment
 */
function assessCurriculumAlignment(content) {
  let score = 10;
  const feedback = [];

  const hasNumbers = content.text.match(/[1-9]|10/g);
  if (!hasNumbers || hasNumbers.length < 3) {
    score -= 2;
    feedback.push('Limited number content for counting to 10');
  }

  if (content.images.length === 0) {
    score -= 3;
    feedback.push('CRITICAL: No visual support for Reception learners');
  } else if (content.images.length < content.questions.length) {
    score -= 1;
    feedback.push('Insufficient visual support');
  }

  if (content.questions.length > 7) {
    score -= 1;
    feedback.push('Too many questions for Reception');
  }

  const complexWords = content.text.match(/\b\w{10,}\b/g);
  if (complexWords && complexWords.length > 2) {
    score -= 1;
    feedback.push('Language may be too complex');
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      'Content appropriately aligned with Reception curriculum. Visual support present, numbers within range, age-appropriate language.'
  };
}

/**
 * Assess presentation quality
 */
function assessPresentationQuality(content) {
  let score = 10;
  const feedback = [];

  if (content.questions.length === 0) {
    score -= 2;
    feedback.push('Questions not clearly structured');
  }

  const brokenImages = content.images.filter(img => !img.visible).length;
  if (brokenImages > 0) {
    score -= 2;
    feedback.push(`${brokenImages} image(s) failed to load`);
  }

  if (content.text.length > 1000 && content.images.length < 3) {
    score -= 1;
    feedback.push('Text-heavy layout not ideal for Reception');
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      'Presentation is clear, well-organized, and appropriate for Reception learners.'
  };
}

/**
 * Assess content-configuration match
 */
function assessContentConfigMatch(content) {
  let score = 10;
  const feedback = [];

  const countingKeywords = ['count', 'how many', 'number'];
  const hasCountingContext = countingKeywords.some(kw => content.text.toLowerCase().includes(kw));
  if (!hasCountingContext) {
    score -= 2;
    feedback.push('Limited counting context');
  }

  const outOfRange = content.text.match(/\b(1[1-9]|[2-9]\d+)\b/g);
  if (outOfRange && outOfRange.length > 0) {
    score -= 3;
    feedback.push('Contains numbers beyond Reception range (>10)');
  }

  if (content.questions.length !== RUNTIME_CONFIG.numQuestions) {
    score -= 1;
    feedback.push(`Question count mismatch: expected ${RUNTIME_CONFIG.numQuestions}, got ${content.questions.length}`);
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      `Content accurately matches configuration: ${RUNTIME_CONFIG.yearGroup}, ${RUNTIME_CONFIG.subtopic}.`
  };
}

/**
 * Assess image-question alignment
 */
function assessImageQuestionAlignment(content) {
  let score = 10;
  const feedback = [];

  const visibleImages = content.images.filter(img => img.visible).length;

  if (content.images.length === 0) {
    score = 0;
    feedback.push('CRITICAL: No images present');
  } else if (visibleImages < content.questions.length) {
    score -= 3;
    feedback.push(`Only ${visibleImages} of ${content.questions.length} questions have visible images`);
  }

  const failedImages = content.images.length - visibleImages;
  if (failedImages > 0) {
    score -= 2;
    feedback.push(`${failedImages} image(s) failed to load`);
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      'Images well-aligned with questions. Visual support appropriate and loaded successfully.'
  };
}

/**
 * NEW: Reception-specific quality checks
 */
function assessReceptionSpecificQuality(content) {
  let score = 10;
  const feedback = [];
  const checks = RUNTIME_CONFIG.specificChecks;

  if (checks.maxNumberRange) {
    const numbersFound = content.text.match(/\b\d+\b/g) || [];
    const outOfRange = numbersFound.filter(n => parseInt(n) > checks.maxNumberRange);
    if (outOfRange.length > 0) {
      score -= 4;
      feedback.push(`Numbers beyond range 1-${checks.maxNumberRange}: ${outOfRange.join(', ')}`);
    }
  }

  if (checks.singleObjectTypeRequired) {
    const multiObjectPatterns = [
      /count the (\w+) and (\w+)/i,
      /(\w+) playing (\w+)/i,
      /(\w+) with (\w+)/i
    ];
    for (const pattern of multiObjectPatterns) {
      if (pattern.test(content.text)) {
        score -= 3;
        feedback.push('Multiple object types in single question (violates one-object rule)');
        break;
      }
    }
  }

  if (checks.realWorldContextRequired) {
    const nonsensicalPatterns = [
      /school cow/i,
      /mice in flowerpot/i,
      /underwater car/i
    ];
    for (const pattern of nonsensicalPatterns) {
      if (pattern.test(content.text)) {
        score -= 3;
        feedback.push('Nonsensical scenario detected (not real-world)');
        break;
      }
    }
  }

  if (checks.requireVisualSupport && content.images.length === 0) {
    score = 0;
    feedback.push('CRITICAL: Visual support required for Reception but missing');
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      'Reception-specific quality requirements met. Age-appropriate, single-object, real-world contexts.'
  };
}

/**
 * Assess content freshness (iter 2+)
 */
function assessContentFreshness(content, iterationNumber, previousContents) {
  if (iterationNumber === 1) {
    return { score: 'N/A', justification: 'First iteration - freshness assessed from iteration 2 onwards.' };
  }

  let score = 10;
  const feedback = [];

  for (let i = 0; i < previousContents.length; i++) {
    const prev = previousContents[i];
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

/**
 * Assess image diversity (iter 2+)
 */
function assessImageDiversity(content, iterationNumber, previousContents) {
  if (iterationNumber === 1) {
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

/**
 * Calculate text similarity (Jaccard)
 */
function calculateSimilarity(text1, text2) {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  const intersection = new Set([...words1].filter(w => words2.has(w)));
  const union = new Set([...words1, ...words2]);
  return union.size > 0 ? intersection.size / union.size : 0;
}

/**
 * Calculate overall score
 */
function calculateOverallScore(assessments, iterationNumber) {
  const weights = iterationNumber === 1 ? {
    curriculumAlignment: 0.25,
    presentationQuality: 0.20,
    contentConfigMatch: 0.25,
    imageQuestionAlignment: 0.20,
    receptionSpecificQuality: 0.10
  } : {
    curriculumAlignment: 0.20,
    presentationQuality: 0.15,
    contentConfigMatch: 0.20,
    imageQuestionAlignment: 0.15,
    receptionSpecificQuality: 0.10,
    contentFreshness: 0.12,
    imageDiversity: 0.08
  };

  let total = 0;
  let totalWeight = 0;

  for (const [key, assessment] of Object.entries(assessments)) {
    if (assessment.score !== 'N/A' && weights[key]) {
      total += assessment.score * weights[key];
      totalWeight += weights[key];
    }
  }

  return totalWeight > 0 ? (total / totalWeight) * 10 : 0;
}

/**
 * NEW: Quality gate check
 */
function checkQualityGate(assessments, overallScore) {
  const gate = RUNTIME_CONFIG.qualityGate;
  const failures = [];

  if (overallScore < gate.minOverallScore) {
    failures.push(`Overall score ${overallScore.toFixed(2)} < ${gate.minOverallScore}`);
  }

  if (assessments.curriculumAlignment.score !== 'N/A' &&
      assessments.curriculumAlignment.score < gate.minCurriculumAlignment) {
    failures.push(`Curriculum alignment ${assessments.curriculumAlignment.score} < ${gate.minCurriculumAlignment}`);
  }

  if (assessments.presentationQuality.score !== 'N/A' &&
      assessments.presentationQuality.score < gate.minPresentationQuality) {
    failures.push(`Presentation quality ${assessments.presentationQuality.score} < ${gate.minPresentationQuality}`);
  }

  if (assessments.contentConfigMatch.score !== 'N/A' &&
      assessments.contentConfigMatch.score < gate.minContentConfigMatch) {
    failures.push(`Content-config match ${assessments.contentConfigMatch.score} < ${gate.minContentConfigMatch}`);
  }

  if (assessments.imageQuestionAlignment.score !== 'N/A' &&
      assessments.imageQuestionAlignment.score < gate.minImageQuestionAlignment) {
    failures.push(`Image-question alignment ${assessments.imageQuestionAlignment.score} < ${gate.minImageQuestionAlignment}`);
  }

  if (assessments.contentFreshness?.score !== 'N/A' &&
      assessments.contentFreshness?.score < gate.minContentFreshness) {
    failures.push(`Content freshness ${assessments.contentFreshness.score} < ${gate.minContentFreshness}`);
  }

  if (assessments.imageDiversity?.score !== 'N/A' &&
      assessments.imageDiversity?.score < gate.minImageDiversity) {
    failures.push(`Image diversity ${assessments.imageDiversity.score} < ${gate.minImageDiversity}`);
  }

  return {
    pass: failures.length === 0,
    failures
  };
}

/**
 * Generate iteration report
 */
function generateIterationReport(iterationNumber, result, assessments, overallScore, qualityGateResult) {
  const reportPath = path.join(
    RUNTIME_CONFIG.reportsDir,
    `iteration-${iterationNumber}.md`
  );

  let report = `# Worksheet Quality Assessment - Iteration ${iterationNumber}\n\n`;
  report += `## Configuration\n`;
  report += `- Config ID: ${RUNTIME_CONFIG.configId}\n`;
  report += `- Year Group: ${RUNTIME_CONFIG.yearGroup}\n`;
  report += `- Topic: ${RUNTIME_CONFIG.topic}\n`;
  report += `- Subtopic: ${RUNTIME_CONFIG.subtopic}\n`;
  report += `- Prompt Version: ${RUNTIME_CONFIG.promptVersion}\n`;
  report += `- Timestamp: ${result.metrics.timestamp}\n\n`;

  report += `## Generation Metrics\n`;
  report += `- Generation Time: ${result.metrics.generationTime || 'N/A'}s\n`;
  report += `- Status: ${result.metrics.status}\n`;
  report += `- Images Loaded: ${result.metrics.imagesLoaded}/${result.metrics.imagesTotalCount}\n`;
  if (result.metrics.errors.length > 0) {
    report += `- Errors: ${result.metrics.errors.join('; ')}\n`;
  }
  report += `\n`;

  report += `## Quality Scores\n\n`;
  report += `1. **Curriculum Alignment**: ${assessments.curriculumAlignment.score}/10\n`;
  report += `   ${assessments.curriculumAlignment.justification}\n\n`;
  report += `2. **Presentation Quality**: ${assessments.presentationQuality.score}/10\n`;
  report += `   ${assessments.presentationQuality.justification}\n\n`;
  report += `3. **Content-Configuration Match**: ${assessments.contentConfigMatch.score}/10\n`;
  report += `   ${assessments.contentConfigMatch.justification}\n\n`;
  report += `4. **Image-Question Alignment**: ${assessments.imageQuestionAlignment.score}/10\n`;
  report += `   ${assessments.imageQuestionAlignment.justification}\n\n`;
  report += `5. **Reception-Specific Quality**: ${assessments.receptionSpecificQuality.score}/10\n`;
  report += `   ${assessments.receptionSpecificQuality.justification}\n\n`;

  if (iterationNumber > 1) {
    report += `6. **Content Freshness**: ${assessments.contentFreshness.score}/10\n`;
    report += `   ${assessments.contentFreshness.justification}\n\n`;
    report += `7. **Image Diversity**: ${assessments.imageDiversity.score}/10\n`;
    report += `   ${assessments.imageDiversity.justification}\n\n`;
  }

  report += `**Overall Score: ${overallScore.toFixed(2)}/100**\n\n`;

  // Quality Gate Result
  report += `## Quality Gate: ${qualityGateResult.pass ? '✅ PASS' : '❌ FAIL'}\n\n`;
  if (!qualityGateResult.pass) {
    report += `### Failures:\n`;
    qualityGateResult.failures.forEach(f => {
      report += `- ${f}\n`;
    });
    report += `\n`;
  }

  report += `## Teacher's Recommendation\n`;
  if (overallScore >= 85) {
    report += '✅ YES - Would confidently use this worksheet in Reception classroom.\n';
  } else if (overallScore >= 70) {
    report += '⚠️ WITH MODIFICATIONS - Has potential but needs improvements before use.\n';
  } else {
    report += '❌ NO - Needs significant revision before classroom use.\n';
  }

  report += `\n## Screenshots\n`;
  if (result.screenshots.config) {
    report += `- Configuration: ${path.basename(result.screenshots.config)}\n`;
  }
  if (result.screenshots.worksheet) {
    report += `- Worksheet: ${path.basename(result.screenshots.worksheet)}\n`;
  }

  fs.writeFileSync(reportPath, report);
  console.log(`✓ Report saved: ${reportPath}`);
}

/**
 * Generate summary report
 */
function generateSummaryReport() {
  const reportPath = path.join(RUNTIME_CONFIG.reportsDir, 'SUMMARY.md');

  const scores = iterationData.filter(d => d.overallScore !== undefined).map(d => d.overallScore);

  if (scores.length === 0) {
    console.error('No successful iterations to summarize');
    return;
  }

  const startingScore = scores[0];
  const finalScore = scores[scores.length - 1];
  const improvement = finalScore - startingScore;
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;

  const successfulMetrics = performanceMetrics.filter(m => m.status === 'success');
  const avgGenTime = successfulMetrics.length > 0 ?
    successfulMetrics.reduce((sum, m) => sum + parseFloat(m.generationTime), 0) / successfulMetrics.length : 0;
  const successRate = (successfulMetrics.length / performanceMetrics.length) * 100;

  // Calculate consistency
  const mean = avgScore;
  const variance = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);
  const consistency = Math.max(0, 10 - (stdDev * 0.2)).toFixed(1);

  // Quality gate pass rate
  const passCount = iterationData.filter(d => d.qualityGateResult?.pass).length;
  const passRate = (passCount / iterationData.length) * 100;

  let report = `# Configuration Quality Assessment - Summary\n\n`;
  report += `## Configuration Details\n`;
  report += `- **Config ID**: ${RUNTIME_CONFIG.configId}\n`;
  report += `- **Year Group**: ${RUNTIME_CONFIG.yearGroup}\n`;
  report += `- **Topic**: ${RUNTIME_CONFIG.topic}\n`;
  report += `- **Subtopic**: ${RUNTIME_CONFIG.subtopic}\n`;
  report += `- **Prompt Version**: ${RUNTIME_CONFIG.promptVersion}\n`;
  report += `- **Mode**: ${RUNTIME_CONFIG.mode}\n`;
  report += `- **Total Iterations**: ${RUNTIME_CONFIG.iterations}\n`;
  report += `- **Successful**: ${successfulMetrics.length}\n`;
  report += `- **Failed**: ${performanceMetrics.length - successfulMetrics.length}\n\n`;

  report += `## Key Metrics\n\n`;
  report += `| Metric | Value |\n`;
  report += `|--------|-------|\n`;
  report += `| Starting Quality Score | ${startingScore.toFixed(2)}/100 |\n`;
  report += `| Final Quality Score | ${finalScore.toFixed(2)}/100 |\n`;
  report += `| Average Score | ${avgScore.toFixed(2)}/100 |\n`;
  report += `| Improvement | ${improvement >= 0 ? '+' : ''}${improvement.toFixed(2)} points |\n`;
  report += `| Quality Gate Pass Rate | ${passRate.toFixed(0)}% (${passCount}/${iterationData.length}) |\n`;
  report += `| Avg Generation Time | ${avgGenTime.toFixed(2)}s |\n`;
  report += `| Success Rate | ${successRate.toFixed(0)}% |\n`;
  report += `| Consistency | ${consistency}/10 |\n\n`;

  // Quality Gate Thresholds
  report += `## Quality Gate Thresholds\n\n`;
  report += `| Dimension | Threshold |\n`;
  report += `|-----------|----------|\n`;
  report += `| Overall Score | ≥${RUNTIME_CONFIG.qualityGate.minOverallScore}/100 |\n`;
  report += `| Curriculum Alignment | ≥${RUNTIME_CONFIG.qualityGate.minCurriculumAlignment}/10 |\n`;
  report += `| Presentation Quality | ≥${RUNTIME_CONFIG.qualityGate.minPresentationQuality}/10 |\n`;
  report += `| Content-Config Match | ≥${RUNTIME_CONFIG.qualityGate.minContentConfigMatch}/10 |\n`;
  report += `| Image-Question Alignment | ≥${RUNTIME_CONFIG.qualityGate.minImageQuestionAlignment}/10 |\n`;
  report += `| Content Freshness | ≥${RUNTIME_CONFIG.qualityGate.minContentFreshness}/10 |\n`;
  report += `| Image Diversity | ≥${RUNTIME_CONFIG.qualityGate.minImageDiversity}/10 |\n\n`;

  report += `## Iteration Results\n\n`;
  report += `| Iteration | Score | Quality Gate | Time | Status |\n`;
  report += `|-----------|-------|--------------|------|--------|\n`;
  iterationData.forEach((data, idx) => {
    const metric = performanceMetrics[idx];
    const score = data.overallScore !== undefined ? data.overallScore.toFixed(2) : 'N/A';
    const gate = data.qualityGateResult?.pass ? '✅ PASS' : '❌ FAIL';
    report += `| ${idx + 1} | ${score}/100 | ${gate} | ${metric.generationTime || 'N/A'}s | ${metric.status} |\n`;
  });
  report += `\n`;

  report += `## Assessment by Dimension\n\n`;
  const dimensions = [
    'curriculumAlignment',
    'presentationQuality',
    'contentConfigMatch',
    'imageQuestionAlignment',
    'receptionSpecificQuality'
  ];

  dimensions.forEach(dim => {
    const scores = iterationData
      .map(d => d.assessments && d.assessments[dim])
      .filter(a => a && a.score !== 'N/A')
      .map(a => a.score);

    if (scores.length > 0) {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const displayName = dim.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      report += `- **${displayName}**: ${avg.toFixed(2)}/10 average\n`;
    }
  });
  report += `\n`;

  report += `## Final Verdict\n\n`;
  if (avgScore >= RUNTIME_CONFIG.qualityGate.minOverallScore && passRate >= 80) {
    report += `### ✅ APPROVED FOR PRODUCTION\n`;
    report += `This configuration meets quality standards and can proceed to deployment.\n\n`;
  } else if (avgScore >= 70 && passRate >= 50) {
    report += `### ⚠️ NEEDS REFINEMENT\n`;
    report += `Quality is acceptable but improvements needed before production.\n\n`;
  } else {
    report += `### ❌ REQUIRES SIGNIFICANT WORK\n`;
    report += `This configuration does not meet quality standards. Major revisions required.\n\n`;
  }

  report += `## Key Findings\n\n`;

  const imageLoadRates = performanceMetrics.map(m =>
    m.imagesTotalCount > 0 ? (m.imagesLoaded / m.imagesTotalCount) * 100 : 0
  );
  const avgImageLoadRate = imageLoadRates.reduce((a, b) => a + b, 0) / imageLoadRates.length;

  report += `### Image Loading\n`;
  report += `- Average load rate: ${avgImageLoadRate.toFixed(0)}%\n`;
  report += `- Fully loaded iterations: ${imageLoadRates.filter(r => r === 100).length}/${RUNTIME_CONFIG.iterations}\n\n`;

  report += `### Performance\n`;
  report += `- Target generation time: <10s\n`;
  report += `- Actual average: ${avgGenTime.toFixed(2)}s\n`;
  report += `- Performance: ${avgGenTime < 10 ? 'MEETS TARGET ✅' : 'EXCEEDS TARGET ⚠️'}\n\n`;

  report += `### Quality Trend\n`;
  if (improvement > 5) {
    report += `- ✅ IMPROVING: Quality increased by ${improvement.toFixed(2)} points\n`;
  } else if (improvement < -5) {
    report += `- ⚠️ DECLINING: Quality decreased by ${Math.abs(improvement).toFixed(2)} points\n`;
  } else {
    report += `- ℹ️ STABLE: Quality variation within acceptable range\n`;
  }
  report += `\n`;

  report += `## Recommendations\n\n`;

  if (avgImageLoadRate < 90) {
    report += `1. **CRITICAL**: Image loading issues detected (${(100 - avgImageLoadRate).toFixed(0)}% failure rate)\n`;
  }

  if (avgGenTime > 15) {
    report += `1. **Performance**: Generation times too high (${avgGenTime.toFixed(2)}s avg)\n`;
  }

  if (parseFloat(consistency) < 7) {
    report += `1. **Consistency**: Quality varies significantly (consistency: ${consistency}/10)\n`;
  }

  if (avgScore < RUNTIME_CONFIG.qualityGate.minOverallScore) {
    report += `1. **Quality**: Overall quality below threshold (${avgScore.toFixed(2)} < ${RUNTIME_CONFIG.qualityGate.minOverallScore})\n`;
  }

  if (passRate < 80) {
    report += `1. **Quality Gate**: Only ${passRate.toFixed(0)}% of iterations pass quality gate (target: ≥80%)\n`;
  }

  if (!report.includes('Recommendations\n\n1.')) {
    report += `Quality and performance are acceptable. Continue monitoring.\n`;
  }

  report += `\n## Next Steps\n\n`;
  if (avgScore >= RUNTIME_CONFIG.qualityGate.minOverallScore && passRate >= 80) {
    report += `- ✅ Lock this prompt version\n`;
    report += `- ✅ Move to next configuration\n`;
    report += `- ✅ Document learnings for similar configs\n`;
  } else {
    report += `- 📝 Review failed quality dimensions\n`;
    report += `- 🔧 Create improved prompt version (v${parseFloat(RUNTIME_CONFIG.promptVersion.replace('v', '') || '1.0') + 0.1})\n`;
    report += `- 🔄 Re-run assessment with updated prompt\n`;
  }

  report += `\n## Detailed Reports\n\n`;
  report += `Individual iteration reports saved in: ${RUNTIME_CONFIG.reportsDir}\n`;
  report += `Screenshots saved in: ${RUNTIME_CONFIG.screenshotsDir}\n`;

  fs.writeFileSync(reportPath, report);
  console.log(`\n✓ Summary report saved: ${reportPath}`);

  return {
    startingScore,
    finalScore,
    improvement,
    avgGenTime,
    successRate,
    consistency,
    passRate
  };
}

/**
 * Main assessment loop
 */
async function runAssessment() {
  console.log('\n' + '='.repeat(80));
  console.log('CONFIGURATION-SPECIFIC WORKSHEET QUALITY ASSESSMENT');
  console.log('='.repeat(80));
  console.log(`Config: ${RUNTIME_CONFIG.configId}`);
  console.log(`Prompt Version: ${RUNTIME_CONFIG.promptVersion}`);
  console.log(`Mode: ${RUNTIME_CONFIG.mode}`);
  console.log(`Iterations: ${RUNTIME_CONFIG.iterations}`);
  console.log('='.repeat(80));

  setupDirectories();

  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    for (let i = 1; i <= RUNTIME_CONFIG.iterations; i++) {
      console.log(`\n${'#'.repeat(80)}`);
      console.log(`ITERATION ${i} OF ${RUNTIME_CONFIG.iterations}`);
      console.log('#'.repeat(80));

      const result = await generateWorksheet(page, i);
      performanceMetrics.push(result.metrics);

      if (result.metrics.status === 'failed') {
        console.error(`✗ Iteration ${i} failed. Continuing...\n`);
        iterationData.push({
          iteration: i,
          result,
          assessments: {},
          overallScore: undefined,
          qualityGateResult: { pass: false, failures: ['Generation failed'] },
          content: result.content
        });
        continue;
      }

      // Assess
      console.log('\n' + '-'.repeat(60));
      console.log('QUALITY ASSESSMENT');
      console.log('-'.repeat(60));

      const previousContents = iterationData.filter(d => d.content).map(d => d.content);

      const assessments = {
        curriculumAlignment: assessCurriculumAlignment(result.content),
        presentationQuality: assessPresentationQuality(result.content),
        contentConfigMatch: assessContentConfigMatch(result.content),
        imageQuestionAlignment: assessImageQuestionAlignment(result.content),
        receptionSpecificQuality: assessReceptionSpecificQuality(result.content),
        contentFreshness: assessContentFreshness(result.content, i, previousContents),
        imageDiversity: assessImageDiversity(result.content, i, previousContents)
      };

      const overallScore = calculateOverallScore(assessments, i);
      const qualityGateResult = checkQualityGate(assessments, overallScore);

      console.log(`\nOverall Score: ${overallScore.toFixed(2)}/100`);
      console.log(`Quality Gate: ${qualityGateResult.pass ? '✅ PASS' : '❌ FAIL'}`);
      if (!qualityGateResult.pass) {
        console.log('Failures:');
        qualityGateResult.failures.forEach(f => console.log(`  - ${f}`));
      }

      Object.entries(assessments).forEach(([key, a]) => {
        console.log(`  ${key}: ${a.score}/10`);
      });

      iterationData.push({
        iteration: i,
        result,
        assessments,
        overallScore,
        qualityGateResult,
        content: result.content
      });

      generateIterationReport(i, result, assessments, overallScore, qualityGateResult);

      if (i < RUNTIME_CONFIG.iterations) {
        console.log(`\nWaiting 5 seconds before iteration ${i + 1}...`);
        await page.waitForTimeout(5000);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('ASSESSMENT COMPLETE');
    console.log('='.repeat(80));

    const summary = generateSummaryReport();

    if (summary) {
      console.log('\n📊 SUMMARY:');
      console.log(`Starting Score: ${summary.startingScore.toFixed(2)}/100`);
      console.log(`Final Score: ${summary.finalScore.toFixed(2)}/100`);
      console.log(`Improvement: ${summary.improvement >= 0 ? '+' : ''}${summary.improvement.toFixed(2)} points`);
      console.log(`Quality Gate Pass Rate: ${summary.passRate.toFixed(0)}%`);
      console.log(`Avg Generation Time: ${summary.avgGenTime.toFixed(2)}s`);
      console.log(`Success Rate: ${summary.successRate.toFixed(0)}%`);
      console.log(`Consistency: ${summary.consistency}/10`);

      console.log(`\n📁 Reports: ${RUNTIME_CONFIG.reportsDir}`);
      console.log(`📸 Screenshots: ${RUNTIME_CONFIG.screenshotsDir}`);
    }

  } catch (error) {
    console.error('\n✗ Assessment failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run assessment
runAssessment().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
