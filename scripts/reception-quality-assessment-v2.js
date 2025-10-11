#!/usr/bin/env node

/**
 * Reception Worksheet Quality Assessment Script V2
 * Simplified and more robust version
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  yearGroup: 'Reception',
  yearGroupSelect: 'Reception (Ages 4-5)',
  topic: 'Number and Counting',
  subtopic: 'Counting to 10',
  numQuestions: 5,
  totalIterations: 5,
  baseUrl: 'http://localhost:3000',
  screenshotsDir: path.join(__dirname, '..', 'worksheet-quality-reports', 'screenshots'),
  reportsDir: path.join(__dirname, '..', 'worksheet-quality-reports'),
  generationTimeout: 120000,
  imageLoadTimeout: 5000
};

// Storage
const iterationData = [];
const performanceMetrics = [];

/**
 * Setup directories
 */
function setupDirectories() {
  [CONFIG.screenshotsDir, CONFIG.reportsDir].forEach(dir => {
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
  console.log('='.repeat(60));

  const startTime = Date.now();
  const metrics = {
    iteration: iterationNumber,
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
    await page.goto(`${CONFIG.baseUrl}/dashboard`);
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    console.log('✓ Dashboard loaded');

    // Wait for selects to be ready
    await page.waitForSelector('select, [role="combobox"]', { timeout: 10000 });
    await page.waitForTimeout(1000);

    // Select Year Group - using direct text selector
    console.log(`Step 2: Selecting year group: ${CONFIG.yearGroupSelect}...`);

    // Try multiple selection methods
    try {
      // Method 1: Find by placeholder text and click
      const yearButton = page.getByText('Year 3 (Ages 7-8)').first();
      await yearButton.click({ timeout: 5000 });
      await page.waitForTimeout(500);

      // Select Reception from dropdown
      await page.getByRole('option', { name: CONFIG.yearGroupSelect }).click();
      await page.waitForTimeout(2000);
      console.log('✓ Year group selected');
    } catch (e) {
      console.log('Method 1 failed, trying method 2...');
      // Method 2: Use label approach
      await page.locator('label:has-text("Year Group")').locator('..').locator('button').first().click();
      await page.waitForTimeout(500);
      await page.keyboard.press('Home');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(2000);
      console.log('✓ Year group selected (method 2)');
    }

    // Select Topic
    console.log(`Step 3: Selecting topic: ${CONFIG.topic}...`);
    await page.waitForTimeout(1000);

    const topicButton = page.getByText('Select a curriculum topic').or(page.getByText('Addition and Subtraction')).first();
    await topicButton.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: CONFIG.topic }).click();
    await page.waitForTimeout(2000);
    console.log('✓ Topic selected');

    // Select Subtopic
    console.log(`Step 4: Selecting subtopic: ${CONFIG.subtopic}...`);
    const subtopicButton = page.getByText('Select a subtopic').or(page.getByText('Select topic first')).first();
    await subtopicButton.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: CONFIG.subtopic }).click();
    await page.waitForTimeout(1500);
    console.log('✓ Subtopic selected');

    // Screenshot configuration
    const configScreenshot = path.join(CONFIG.screenshotsDir, `iter${iterationNumber}-01-config.png`);
    await page.screenshot({ path: configScreenshot, fullPage: true });

    // Generate
    console.log('Step 5: Generating worksheet...');
    const genStartTime = Date.now();

    const generateButton = page.getByRole('button', { name: 'Generate Worksheet' });
    await generateButton.click();

    // Wait for completion
    await page.waitForSelector('text=Download', { timeout: CONFIG.generationTimeout });

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
        const isVisible = await img.isVisible({ timeout: CONFIG.imageLoadTimeout });
        if (isVisible) {
          metrics.imagesLoaded++;
        }
      } catch (err) {
        // Image failed to load
      }
    }

    console.log(`✓ Images loaded: ${metrics.imagesLoaded}/${metrics.imagesTotalCount}`);

    // Screenshot worksheet
    const worksheetScreenshot = path.join(CONFIG.screenshotsDir, `iter${iterationNumber}-02-worksheet.png`);
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

    const errorScreenshot = path.join(CONFIG.screenshotsDir, `iter${iterationNumber}-error.png`);
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

  if (content.questions.length !== CONFIG.numQuestions) {
    score -= 1;
    feedback.push(`Question count mismatch: expected ${CONFIG.numQuestions}, got ${content.questions.length}`);
  }

  return {
    score: Math.max(0, score),
    justification: feedback.length > 0 ? feedback.join('. ') + '.' :
      'Content accurately matches configuration: Reception, Counting to 10.'
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
    curriculumAlignment: 0.30,
    presentationQuality: 0.25,
    contentConfigMatch: 0.25,
    imageQuestionAlignment: 0.20
  } : {
    curriculumAlignment: 0.25,
    presentationQuality: 0.20,
    contentConfigMatch: 0.20,
    imageQuestionAlignment: 0.15,
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
 * Generate iteration report
 */
function generateIterationReport(iterationNumber, result, assessments, overallScore) {
  const reportPath = path.join(
    CONFIG.reportsDir,
    `iteration-${iterationNumber}.md`
  );

  let report = `# Worksheet Quality Assessment - Iteration ${iterationNumber}\n\n`;
  report += `## Configuration\n`;
  report += `- Year Group: ${CONFIG.yearGroup}\n`;
  report += `- Topic: ${CONFIG.topic}\n`;
  report += `- Subtopic: ${CONFIG.subtopic}\n`;
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

  if (iterationNumber > 1) {
    report += `5. **Content Freshness**: ${assessments.contentFreshness.score}/10\n`;
    report += `   ${assessments.contentFreshness.justification}\n\n`;
    report += `6. **Image Diversity**: ${assessments.imageDiversity.score}/10\n`;
    report += `   ${assessments.imageDiversity.justification}\n\n`;
  }

  report += `**Overall Score: ${overallScore.toFixed(2)}/100**\n\n`;

  report += `## Teacher's Recommendation\n`;
  if (overallScore >= 80) {
    report += 'YES - Would confidently use this worksheet in Reception classroom.\n';
  } else if (overallScore >= 60) {
    report += 'WITH MODIFICATIONS - Has potential but needs improvements before use.\n';
  } else {
    report += 'NO - Needs significant revision before classroom use.\n';
  }

  fs.writeFileSync(reportPath, report);
  console.log(`✓ Report saved: ${reportPath}`);
}

/**
 * Generate summary report
 */
function generateSummaryReport() {
  const reportPath = path.join(CONFIG.reportsDir, 'SUMMARY.md');

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

  let report = `# Reception Worksheet Quality Assessment - Summary\n\n`;
  report += `## Assessment Overview\n`;
  report += `- Configuration: ${CONFIG.yearGroup} - ${CONFIG.topic} - ${CONFIG.subtopic}\n`;
  report += `- Total Iterations: ${CONFIG.totalIterations}\n`;
  report += `- Successful: ${successfulMetrics.length}\n`;
  report += `- Failed: ${performanceMetrics.length - successfulMetrics.length}\n\n`;

  report += `## Key Metrics\n\n`;
  report += `| Metric | Value |\n`;
  report += `|--------|-------|\n`;
  report += `| Starting Quality Score | ${startingScore.toFixed(2)}/100 |\n`;
  report += `| Final Quality Score | ${finalScore.toFixed(2)}/100 |\n`;
  report += `| Average Score | ${avgScore.toFixed(2)}/100 |\n`;
  report += `| Improvement | ${improvement >= 0 ? '+' : ''}${improvement.toFixed(2)} points |\n`;
  report += `| Avg Generation Time | ${avgGenTime.toFixed(2)}s |\n`;
  report += `| Success Rate | ${successRate.toFixed(0)}% |\n`;
  report += `| Consistency | ${consistency}/10 |\n\n`;

  report += `## Iteration Results\n\n`;
  report += `| Iteration | Score | Time | Status |\n`;
  report += `|-----------|-------|------|--------|\n`;
  iterationData.forEach((data, idx) => {
    const metric = performanceMetrics[idx];
    const score = data.overallScore !== undefined ? data.overallScore.toFixed(2) : 'N/A';
    report += `| ${idx + 1} | ${score}/100 | ${metric.generationTime || 'N/A'}s | ${metric.status} |\n`;
  });
  report += `\n`;

  report += `## Assessment by Dimension\n\n`;
  const dimensions = ['curriculumAlignment', 'presentationQuality', 'contentConfigMatch', 'imageQuestionAlignment'];

  dimensions.forEach(dim => {
    const scores = iterationData
      .map(d => d.assessments && d.assessments[dim])
      .filter(a => a && a.score !== 'N/A')
      .map(a => a.score);

    if (scores.length > 0) {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      report += `- **${dim.replace(/([A-Z])/g, ' $1')}**: ${avg.toFixed(2)}/10 average\n`;
    }
  });
  report += `\n`;

  report += `## Key Findings\n\n`;

  const imageLoadRates = performanceMetrics.map(m =>
    m.imagesTotalCount > 0 ? (m.imagesLoaded / m.imagesTotalCount) * 100 : 0
  );
  const avgImageLoadRate = imageLoadRates.reduce((a, b) => a + b, 0) / imageLoadRates.length;

  report += `### Image Loading\n`;
  report += `- Average load rate: ${avgImageLoadRate.toFixed(0)}%\n`;
  report += `- Fully loaded iterations: ${imageLoadRates.filter(r => r === 100).length}/${CONFIG.totalIterations}\n\n`;

  report += `### Performance\n`;
  report += `- Target generation time: <10s\n`;
  report += `- Actual average: ${avgGenTime.toFixed(2)}s\n`;
  report += `- Performance: ${avgGenTime < 10 ? 'MEETS TARGET' : 'EXCEEDS TARGET'}\n\n`;

  report += `### Quality Trend\n`;
  if (improvement > 5) {
    report += `- IMPROVING: Quality increased by ${improvement.toFixed(2)} points\n`;
  } else if (improvement < -5) {
    report += `- DECLINING: Quality decreased by ${Math.abs(improvement).toFixed(2)} points\n`;
  } else {
    report += `- STABLE: Quality variation within acceptable range\n`;
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

  if (avgScore < 70) {
    report += `1. **Quality**: Overall quality below acceptable threshold (${avgScore.toFixed(2)}/100)\n`;
  }

  if (report.includes('Recommendations\n\n1.')) {
    // Has recommendations
  } else {
    report += `Quality and performance are acceptable. Continue monitoring.\n`;
  }

  report += `\n## Detailed Reports\n\n`;
  report += `Individual iteration reports saved in: ${CONFIG.reportsDir}\n`;
  report += `Screenshots saved in: ${CONFIG.screenshotsDir}\n`;

  fs.writeFileSync(reportPath, report);
  console.log(`\n✓ Summary report saved: ${reportPath}`);

  return {
    startingScore,
    finalScore,
    improvement,
    avgGenTime,
    successRate,
    consistency
  };
}

/**
 * Main assessment loop
 */
async function runAssessment() {
  console.log('\n' + '='.repeat(80));
  console.log('RECEPTION WORKSHEET QUALITY ASSESSMENT');
  console.log('5-Iteration Comprehensive Evaluation');
  console.log('='.repeat(80));

  setupDirectories();

  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    for (let i = 1; i <= CONFIG.totalIterations; i++) {
      console.log(`\n${'#'.repeat(80)}`);
      console.log(`ITERATION ${i} OF ${CONFIG.totalIterations}`);
      console.log('#'.repeat(80));

      const result = await generateWorksheet(page, i);
      performanceMetrics.push(result.metrics);

      if (result.metrics.status === 'failed') {
        console.error(`✗ Iteration ${i} failed. Continuing...\n`);
        iterationData.push({ iteration: i, result, assessments: {}, overallScore: undefined, content: result.content });
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
        contentFreshness: assessContentFreshness(result.content, i, previousContents),
        imageDiversity: assessImageDiversity(result.content, i, previousContents)
      };

      const overallScore = calculateOverallScore(assessments, i);

      console.log(`\nOverall Score: ${overallScore.toFixed(2)}/100`);
      Object.entries(assessments).forEach(([key, a]) => {
        console.log(`  ${key}: ${a.score}/10`);
      });

      iterationData.push({
        iteration: i,
        result,
        assessments,
        overallScore,
        content: result.content
      });

      generateIterationReport(i, result, assessments, overallScore);

      if (i < CONFIG.totalIterations) {
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
      console.log('\nSUMMARY:');
      console.log(`Starting Score: ${summary.startingScore.toFixed(2)}/100`);
      console.log(`Final Score: ${summary.finalScore.toFixed(2)}/100`);
      console.log(`Improvement: ${summary.improvement >= 0 ? '+' : ''}${summary.improvement.toFixed(2)} points`);
      console.log(`Avg Generation Time: ${summary.avgGenTime.toFixed(2)}s`);
      console.log(`Success Rate: ${summary.successRate.toFixed(0)}%`);
      console.log(`Consistency: ${summary.consistency}/10`);
    }

    console.log(`\n✓ Reports: ${CONFIG.reportsDir}`);
    console.log(`✓ Screenshots: ${CONFIG.screenshotsDir}`);

  } catch (error) {
    console.error('\n✗ Assessment failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

runAssessment().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
