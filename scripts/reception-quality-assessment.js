#!/usr/bin/env node

/**
 * Reception Worksheet Quality Assessment Script
 *
 * This script conducts a comprehensive 5-iteration quality assessment
 * for Reception level worksheets, evaluating:
 * - Curriculum alignment
 * - Presentation quality
 * - Content-configuration match
 * - Image-question alignment
 * - Content freshness (iterations 2+)
 * - Image diversity (iterations 2+)
 * - Performance metrics
 * - Stability metrics
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  yearGroup: 'Reception',
  yearGroupText: 'Reception (Ages 4-5)',
  topic: 'Number and Counting',
  subtopic: 'Counting to 10',
  numQuestions: 5,
  totalIterations: 5,
  baseUrl: 'http://localhost:3000',
  screenshotsDir: path.join(__dirname, '..', 'worksheet-quality-reports', 'screenshots'),
  reportsDir: path.join(__dirname, '..', 'worksheet-quality-reports'),
  generationTimeout: 120000, // 2 minutes
  imageLoadTimeout: 10000 // 10 seconds per image
};

// Storage for cross-iteration analysis
const iterationData = [];
const performanceMetrics = [];

/**
 * Create necessary directories
 */
function setupDirectories() {
  if (!fs.existsSync(CONFIG.screenshotsDir)) {
    fs.mkdirSync(CONFIG.screenshotsDir, { recursive: true });
  }
  if (!fs.existsSync(CONFIG.reportsDir)) {
    fs.mkdirSync(CONFIG.reportsDir, { recursive: true });
  }
}

/**
 * Generate worksheet using Playwright
 */
async function generateWorksheet(page, iterationNumber) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`ITERATION ${iterationNumber}: Worksheet Generation`);
  console.log('='.repeat(60));

  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  const metrics = {
    iteration: iterationNumber,
    timestamp,
    startTime,
    endTime: null,
    generationTime: null,
    status: 'pending',
    errors: [],
    warnings: [],
    imagesLoaded: 0,
    imagesTotalCount: 0,
    altTextFallbacks: 0
  };

  try {
    // Navigate to dashboard
    console.log('Step 1: Navigating to dashboard...');
    await page.goto(`${CONFIG.baseUrl}/dashboard`, { waitUntil: 'networkidle' });
    await page.waitForSelector('text=Worksheet Configuration', { timeout: 10000 });
    console.log('✓ Dashboard loaded');

    // Select Year Group
    console.log(`Step 2: Selecting year group: ${CONFIG.yearGroupText}...`);
    const topicsResponsePromise = page.waitForResponse(
      response => response.url().includes('/api/curriculum/topics') && response.status() === 200,
      { timeout: 10000 }
    );

    // Find and click the current year group button (might be Year 3 by default)
    const yearGroupButton = page.locator('button[role="combobox"]').first();
    await yearGroupButton.click();
    await page.waitForTimeout(300);

    // Select Reception
    await page.keyboard.press('Home'); // Go to first option
    await page.keyboard.press('Enter');
    await topicsResponsePromise;
    await page.waitForTimeout(500);
    console.log(`✓ ${CONFIG.yearGroupText} selected`);

    // Select Topic
    console.log(`Step 3: Selecting topic: ${CONFIG.topic}...`);
    const subtopicsResponsePromise = page.waitForResponse(
      response => response.url().includes('/api/curriculum/subtopics') && response.status() === 200,
      { timeout: 10000 }
    );

    const topicButton = page.locator('button[role="combobox"]').nth(1);
    await topicButton.click();
    await page.waitForTimeout(300);
    await page.locator(`[role="option"]:has-text("${CONFIG.topic}")`).click();

    await subtopicsResponsePromise;
    await page.waitForTimeout(500);
    console.log(`✓ ${CONFIG.topic} selected`);

    // Select Subtopic
    console.log(`Step 4: Selecting subtopic: ${CONFIG.subtopic}...`);
    const subtopicButton = page.locator('button[role="combobox"]').nth(2);
    await subtopicButton.click();
    await page.waitForTimeout(300);
    await page.locator(`[role="option"]:has-text("${CONFIG.subtopic}")`).click();
    await page.waitForTimeout(500);
    console.log(`✓ ${CONFIG.subtopic} selected`);

    // Take screenshot of configuration
    const configScreenshot = path.join(
      CONFIG.screenshotsDir,
      `iteration-${iterationNumber}-01-configured.png`
    );
    await page.screenshot({ path: configScreenshot, fullPage: true });

    // Click Generate button
    console.log('Step 5: Generating worksheet...');
    const generateButton = page.locator('button:has-text("Generate Worksheet")');
    await generateButton.click();

    const generationStartTime = Date.now();

    // Wait for generation to complete
    await page.waitForSelector('text=Download', { timeout: CONFIG.generationTimeout });

    const generationEndTime = Date.now();
    metrics.generationTime = ((generationEndTime - generationStartTime) / 1000).toFixed(2);
    console.log(`✓ Worksheet generated in ${metrics.generationTime}s`);

    // Wait for images to load
    console.log('Step 6: Waiting for images to load...');
    await page.waitForTimeout(3000); // Give images time to load

    // Count images
    const images = await page.locator('.worksheet-preview img, iframe').all();
    metrics.imagesTotalCount = images.length;
    console.log(`Found ${metrics.imagesTotalCount} image elements`);

    // Check image loading status
    for (let i = 0; i < images.length; i++) {
      try {
        const isVisible = await images[i].isVisible({ timeout: CONFIG.imageLoadTimeout });
        if (isVisible) {
          metrics.imagesLoaded++;
        }

        // Check for alt text (indicates potential image load failure)
        const alt = await images[i].getAttribute('alt');
        if (alt && alt.length > 0) {
          metrics.altTextFallbacks++;
        }
      } catch (err) {
        metrics.warnings.push(`Image ${i + 1} visibility check failed: ${err.message}`);
      }
    }

    console.log(`✓ Images loaded: ${metrics.imagesLoaded}/${metrics.imagesTotalCount}`);
    if (metrics.altTextFallbacks > 0) {
      console.log(`⚠ Alt text fallbacks detected: ${metrics.altTextFallbacks}`);
    }

    // Take screenshot of generated worksheet
    const worksheetScreenshot = path.join(
      CONFIG.screenshotsDir,
      `iteration-${iterationNumber}-02-generated.png`
    );
    await page.screenshot({ path: worksheetScreenshot, fullPage: true });

    // Extract worksheet content for analysis
    const worksheetContent = await extractWorksheetContent(page);

    metrics.endTime = Date.now();
    metrics.status = 'success';

    return {
      metrics,
      content: worksheetContent,
      screenshots: {
        configuration: configScreenshot,
        worksheet: worksheetScreenshot
      }
    };

  } catch (error) {
    metrics.endTime = Date.now();
    metrics.status = 'failed';
    metrics.errors.push(error.message);
    console.error(`✗ Generation failed: ${error.message}`);

    // Take error screenshot
    const errorScreenshot = path.join(
      CONFIG.screenshotsDir,
      `iteration-${iterationNumber}-error.png`
    );
    await page.screenshot({ path: errorScreenshot, fullPage: true });

    return {
      metrics,
      content: null,
      screenshots: {
        error: errorScreenshot
      }
    };
  }
}

/**
 * Extract worksheet content for analysis
 */
async function extractWorksheetContent(page) {
  const content = {
    questions: [],
    images: [],
    layout: {},
    text: ''
  };

  try {
    // Extract all text content
    const textContent = await page.locator('.worksheet-preview').textContent();
    content.text = textContent || '';

    // Extract images
    const images = await page.locator('.worksheet-preview img').all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      const isVisible = await img.isVisible().catch(() => false);

      content.images.push({
        src: src || '',
        alt: alt || '',
        visible: isVisible
      });
    }

    // Extract questions (basic pattern matching)
    const questionMatches = textContent?.match(/\d+[\.\)]\s*.+/g) || [];
    content.questions = questionMatches;

  } catch (err) {
    console.warn(`Warning: Content extraction partial: ${err.message}`);
  }

  return content;
}

/**
 * Assess curriculum alignment
 */
function assessCurriculumAlignment(content, iterationNumber) {
  console.log('\nAssessing Curriculum Alignment...');

  let score = 10;
  const feedback = [];

  // Reception expectations:
  // - Counting to 10
  // - Visual representations
  // - Simple, concrete tasks
  // - Large, clear numbers

  // Check if content includes numbers 1-10
  const hasRelevantNumbers = content.text.match(/[1-9]|10/g);
  if (!hasRelevantNumbers || hasRelevantNumbers.length < 3) {
    score -= 2;
    feedback.push('Limited number content for counting to 10');
  }

  // Check for visual support (essential for Reception)
  if (content.images.length === 0) {
    score -= 3;
    feedback.push('CRITICAL: No visual support for Reception learners');
  } else if (content.images.length < content.questions.length) {
    score -= 1;
    feedback.push('Insufficient visual support for all questions');
  }

  // Check question appropriateness for Reception (ages 4-5)
  const questionsCount = content.questions.length;
  if (questionsCount > 7) {
    score -= 1;
    feedback.push('Too many questions for Reception attention span');
  } else if (questionsCount < 3) {
    score -= 1;
    feedback.push('Too few questions for meaningful practice');
  }

  // Check for complex language (inappropriate for Reception)
  const complexWords = content.text.match(/\b\w{10,}\b/g);
  if (complexWords && complexWords.length > 2) {
    score -= 1;
    feedback.push('Language may be too complex for Reception');
  }

  const justification = feedback.length > 0
    ? feedback.join('. ') + '.'
    : 'Content appropriately aligned with Reception curriculum for Counting to 10. Visual support present, numbers within range, age-appropriate language.';

  return {
    score: Math.max(0, score),
    justification,
    feedback
  };
}

/**
 * Assess presentation quality
 */
function assessPresentationQuality(content, iterationNumber) {
  console.log('Assessing Presentation Quality...');

  let score = 10;
  const feedback = [];

  // Reception needs:
  // - Large font sizes
  // - Clear spacing
  // - Organized layout
  // - Engaging visuals

  // Check for spacing indicators (multiple spaces/newlines in content)
  const hasSpacing = content.text.includes('\n\n') || content.text.match(/\s{2,}/);
  if (!hasSpacing) {
    score -= 1;
    feedback.push('Layout may lack adequate spacing');
  }

  // Check for structured content (numbered questions)
  if (content.questions.length === 0) {
    score -= 2;
    feedback.push('Questions not clearly numbered or structured');
  }

  // Check for visual balance (images vs text ratio)
  const textLength = content.text.length;
  const imageCount = content.images.length;
  if (textLength > 1000 && imageCount < 3) {
    score -= 1;
    feedback.push('Text-heavy layout not ideal for Reception');
  }

  // Check for broken images
  const brokenImages = content.images.filter(img => !img.visible).length;
  if (brokenImages > 0) {
    score -= 2;
    feedback.push(`${brokenImages} image(s) failed to load`);
  }

  const justification = feedback.length > 0
    ? feedback.join('. ') + '.'
    : 'Presentation is clear, well-organized, and appropriate for Reception learners. Good visual balance, adequate spacing, and structured layout.';

  return {
    score: Math.max(0, score),
    justification,
    feedback
  };
}

/**
 * Assess content-configuration match
 */
function assessContentConfigurationMatch(content, iterationNumber) {
  console.log('Assessing Content-Configuration Match...');

  let score = 10;
  const feedback = [];

  // Should match: Reception, Number and Counting, Counting to 10

  // Check for counting context
  const countingKeywords = ['count', 'how many', 'number'];
  const hasCountingContext = countingKeywords.some(kw =>
    content.text.toLowerCase().includes(kw)
  );

  if (!hasCountingContext) {
    score -= 2;
    feedback.push('Limited counting context in questions');
  }

  // Check for numbers within 1-10 range
  const numbers = content.text.match(/\b([1-9]|10)\b/g) || [];
  const outOfRangeNumbers = content.text.match(/\b(1[1-9]|[2-9]\d+)\b/g);

  if (outOfRangeNumbers && outOfRangeNumbers.length > 0) {
    score -= 3;
    feedback.push('Contains numbers beyond Reception counting range (>10)');
  }

  if (numbers.length < 3) {
    score -= 2;
    feedback.push('Insufficient number content for counting practice');
  }

  // Check question count matches configuration
  if (content.questions.length !== CONFIG.numQuestions) {
    score -= 1;
    feedback.push(`Question count (${content.questions.length}) differs from configured (${CONFIG.numQuestions})`);
  }

  const justification = feedback.length > 0
    ? feedback.join('. ') + '.'
    : 'Content accurately matches configuration: Reception level, Number and Counting topic, Counting to 10 subtopic. Appropriate difficulty and scope.';

  return {
    score: Math.max(0, score),
    justification,
    feedback
  };
}

/**
 * Assess image-question alignment
 */
function assessImageQuestionAlignment(content, iterationNumber) {
  console.log('Assessing Image-Question Alignment...');

  let score = 10;
  const feedback = [];

  // Reception critical: Every question should have visual support

  const questionCount = content.questions.length;
  const imageCount = content.images.length;
  const visibleImageCount = content.images.filter(img => img.visible).length;

  // Check image presence
  if (imageCount === 0) {
    score = 0;
    feedback.push('CRITICAL: No images present for Reception worksheet');
  } else if (visibleImageCount < questionCount) {
    score -= 3;
    feedback.push(`Only ${visibleImageCount} of ${questionCount} questions have visible images`);
  }

  // Check for alt text (good practice, indicates image intent)
  const imagesWithAlt = content.images.filter(img => img.alt && img.alt.length > 0).length;
  if (imagesWithAlt < imageCount * 0.5) {
    score -= 1;
    feedback.push('Many images lack descriptive alt text');
  }

  // Check for image loading failures
  const failedImages = imageCount - visibleImageCount;
  if (failedImages > 0) {
    score -= 2;
    feedback.push(`${failedImages} image(s) failed to load`);
  }

  // Check for image relevance (basic - presence near questions)
  if (imageCount > questionCount * 1.5) {
    score -= 1;
    feedback.push('Excessive images may clutter worksheet');
  }

  const justification = feedback.length > 0
    ? feedback.join('. ') + '.'
    : 'Images are well-aligned with questions. Each question has appropriate visual support, images loaded successfully, and visual aids are clear and relevant.';

  return {
    score: Math.max(0, score),
    justification,
    feedback
  };
}

/**
 * Assess content freshness (iterations 2+)
 */
function assessContentFreshness(content, iterationNumber, previousContents) {
  console.log('Assessing Content Freshness...');

  if (iterationNumber === 1) {
    return {
      score: 'N/A',
      justification: 'Content freshness assessed from iteration 2 onwards.',
      feedback: []
    };
  }

  let score = 10;
  const feedback = [];

  // Compare with previous iterations
  for (let i = 0; i < previousContents.length; i++) {
    const prevContent = previousContents[i];

    // Check question similarity
    const similarity = calculateTextSimilarity(
      content.questions.join(' '),
      prevContent.questions.join(' ')
    );

    if (similarity > 0.7) {
      score -= 3;
      feedback.push(`High similarity (${(similarity * 100).toFixed(0)}%) with iteration ${i + 1}`);
    } else if (similarity > 0.5) {
      score -= 1;
      feedback.push(`Moderate similarity (${(similarity * 100).toFixed(0)}%) with iteration ${i + 1}`);
    }

    // Check image reuse (same src)
    const reusedImages = content.images.filter(img =>
      prevContent.images.some(prevImg => prevImg.src === img.src && img.src !== '')
    ).length;

    if (reusedImages > content.images.length * 0.5) {
      score -= 2;
      feedback.push(`${reusedImages} images reused from iteration ${i + 1}`);
    }
  }

  const justification = feedback.length > 0
    ? feedback.join('. ') + '.'
    : 'Content is fresh and novel. Questions show good variety, new problem contexts, and different visual representations compared to previous iterations.';

  return {
    score: Math.max(0, score),
    justification,
    feedback
  };
}

/**
 * Assess image diversity (iterations 2+)
 */
function assessImageDiversity(content, iterationNumber, previousContents) {
  console.log('Assessing Image Diversity...');

  if (iterationNumber === 1) {
    return {
      score: 'N/A',
      justification: 'Image diversity assessed from iteration 2 onwards.',
      feedback: []
    };
  }

  let score = 10;
  const feedback = [];

  // Check for unique image sources
  const currentImageSrcs = content.images.map(img => img.src).filter(src => src !== '');
  const uniqueSrcs = new Set(currentImageSrcs);

  if (uniqueSrcs.size < currentImageSrcs.length * 0.8) {
    score -= 1;
    feedback.push('Some images are duplicated within the worksheet');
  }

  // Compare with previous iterations
  for (let i = 0; i < previousContents.length; i++) {
    const prevContent = previousContents[i];
    const prevImageSrcs = prevContent.images.map(img => img.src).filter(src => src !== '');

    const reusedCount = currentImageSrcs.filter(src => prevImageSrcs.includes(src)).length;
    const reusePercentage = currentImageSrcs.length > 0
      ? (reusedCount / currentImageSrcs.length)
      : 0;

    if (reusePercentage > 0.5) {
      score -= 3;
      feedback.push(`${(reusePercentage * 100).toFixed(0)}% images recycled from iteration ${i + 1}`);
    } else if (reusePercentage > 0.2) {
      score -= 1;
      feedback.push(`${(reusePercentage * 100).toFixed(0)}% images reused from iteration ${i + 1}`);
    }
  }

  // Check for visual variety in alt text (if available)
  const altTexts = content.images.map(img => img.alt).filter(alt => alt !== '');
  const uniqueAlts = new Set(altTexts);

  if (altTexts.length > 0 && uniqueAlts.size < altTexts.length * 0.6) {
    score -= 1;
    feedback.push('Limited variety in image contexts (based on alt text)');
  }

  const justification = feedback.length > 0
    ? feedback.join('. ') + '.'
    : 'Images show good diversity. New visual representations used, variety in contexts, and no excessive recycling from previous iterations.';

  return {
    score: Math.max(0, score),
    justification,
    feedback
  };
}

/**
 * Calculate text similarity (simple Jaccard similarity)
 */
function calculateTextSimilarity(text1, text2) {
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

  let totalScore = 0;
  let totalWeight = 0;

  for (const [key, assessment] of Object.entries(assessments)) {
    if (assessment.score !== 'N/A' && weights[key]) {
      totalScore += assessment.score * weights[key];
      totalWeight += weights[key];
    }
  }

  return totalWeight > 0 ? (totalScore / totalWeight) * 10 : 0;
}

/**
 * Generate iteration report
 */
function generateIterationReport(iterationNumber, result, assessments, overallScore) {
  const timestamp = new Date().toISOString();
  const reportPath = path.join(
    CONFIG.reportsDir,
    `iteration-${iterationNumber}-${timestamp.replace(/[:.]/g, '-')}.md`
  );

  let report = `# Worksheet Quality Assessment Report - Iteration ${iterationNumber}\n\n`;
  report += `## Configuration\n`;
  report += `- Year Group: ${CONFIG.yearGroup}\n`;
  report += `- Topic: ${CONFIG.topic}\n`;
  report += `- Subtopic: ${CONFIG.subtopic}\n`;
  report += `- Questions: ${CONFIG.numQuestions}\n`;
  report += `- Timestamp: ${timestamp}\n\n`;

  report += `## Generation Metrics\n`;
  report += `- Generation Time: ${result.metrics.generationTime || 'N/A'}s\n`;
  report += `- Status: ${result.metrics.status}\n`;
  report += `- Images Loaded: ${result.metrics.imagesLoaded}/${result.metrics.imagesTotalCount}\n`;
  report += `- Alt Text Fallbacks: ${result.metrics.altTextFallbacks}\n`;

  if (result.metrics.errors.length > 0) {
    report += `- Errors: ${result.metrics.errors.join('; ')}\n`;
  }
  if (result.metrics.warnings.length > 0) {
    report += `- Warnings: ${result.metrics.warnings.join('; ')}\n`;
  }
  report += `\n`;

  report += `## Quality Assessment Scores\n\n`;

  report += `### Iteration 1 Criteria\n`;
  report += `1. **Curriculum Alignment**: ${assessments.curriculumAlignment.score}/10\n`;
  report += `   - ${assessments.curriculumAlignment.justification}\n\n`;

  report += `2. **Presentation Quality**: ${assessments.presentationQuality.score}/10\n`;
  report += `   - ${assessments.presentationQuality.justification}\n\n`;

  report += `3. **Content-Configuration Match**: ${assessments.contentConfigMatch.score}/10\n`;
  report += `   - ${assessments.contentConfigMatch.justification}\n\n`;

  report += `4. **Image-Question Alignment**: ${assessments.imageQuestionAlignment.score}/10\n`;
  report += `   - ${assessments.imageQuestionAlignment.justification}\n\n`;

  if (iterationNumber > 1) {
    report += `### Iteration 2+ Additional Criteria\n`;
    report += `5. **Content Freshness**: ${assessments.contentFreshness.score}/10\n`;
    report += `   - ${assessments.contentFreshness.justification}\n\n`;

    report += `6. **Image Diversity**: ${assessments.imageDiversity.score}/10\n`;
    report += `   - ${assessments.imageDiversity.justification}\n\n`;
  }

  report += `**Overall Score: ${overallScore.toFixed(2)}/100**\n\n`;

  report += `## Pedagogical Assessment\n\n`;
  report += `### Strengths\n`;
  const strengths = generateStrengths(assessments);
  strengths.forEach(s => report += `- ${s}\n`);
  report += `\n`;

  report += `### Areas for Improvement\n`;
  const improvements = generateImprovements(assessments);
  improvements.forEach(i => report += `- ${i}\n`);
  report += `\n`;

  report += `### Teacher's Recommendation\n`;
  report += generateTeacherRecommendation(overallScore, assessments);
  report += `\n\n`;

  report += `## Performance Trends (Cumulative)\n`;
  if (performanceMetrics.length > 0) {
    const avgTime = performanceMetrics
      .filter(m => m.generationTime)
      .reduce((sum, m) => sum + parseFloat(m.generationTime), 0) / performanceMetrics.length;
    const successRate = (performanceMetrics.filter(m => m.status === 'success').length / performanceMetrics.length) * 100;

    report += `- Average Generation Time: ${avgTime.toFixed(2)}s\n`;
    report += `- Success Rate: ${successRate.toFixed(0)}%\n`;
    report += `- Quality Trend: ${determineQualityTrend()}\n`;
    report += `- Consistency Score: ${calculateConsistencyScore()}/10\n`;
  }
  report += `\n`;

  report += `## Next Steps\n`;
  report += generateNextSteps(iterationNumber, assessments, overallScore);
  report += `\n`;

  fs.writeFileSync(reportPath, report);
  console.log(`\n✓ Report saved: ${reportPath}`);

  return reportPath;
}

/**
 * Generate strengths from assessments
 */
function generateStrengths(assessments) {
  const strengths = [];

  for (const [key, assessment] of Object.entries(assessments)) {
    if (assessment.score >= 8 && assessment.score !== 'N/A') {
      const aspect = key.replace(/([A-Z])/g, ' $1').toLowerCase();
      strengths.push(`Strong ${aspect} (${assessment.score}/10)`);
    }
  }

  if (strengths.length === 0) {
    strengths.push('Worksheet provides basic counting practice');
  }

  return strengths;
}

/**
 * Generate improvements from assessments
 */
function generateImprovements(assessments) {
  const improvements = [];

  for (const [key, assessment] of Object.entries(assessments)) {
    if (assessment.feedback && assessment.feedback.length > 0) {
      improvements.push(...assessment.feedback);
    }
  }

  if (improvements.length === 0) {
    improvements.push('Minor refinements could enhance visual appeal');
  }

  return improvements;
}

/**
 * Generate teacher recommendation
 */
function generateTeacherRecommendation(overallScore, assessments) {
  let recommendation = '';

  if (overallScore >= 80) {
    recommendation = 'YES - I would confidently use this worksheet in my Reception classroom. ';
    recommendation += 'The content is age-appropriate, well-presented, and provides good learning value. ';
    recommendation += 'Visual support is strong and the tasks are achievable for 4-5 year olds.';
  } else if (overallScore >= 60) {
    recommendation = 'WITH MODIFICATIONS - This worksheet has potential but needs some improvements. ';
    recommendation += 'I would use it after addressing the areas identified above. ';
    recommendation += 'The core content is sound but presentation or alignment needs refinement.';
  } else {
    recommendation = 'NO - This worksheet needs significant revision before classroom use. ';
    recommendation += 'Critical issues with curriculum alignment, visual support, or age-appropriateness prevent effective use. ';
    recommendation += 'Recommend regenerating with clearer constraints.';
  }

  return recommendation;
}

/**
 * Determine quality trend
 */
function determineQualityTrend() {
  if (iterationData.length < 2) {
    return 'Insufficient data';
  }

  const scores = iterationData.map(d => d.overallScore);
  const recent = scores.slice(-3);
  const earlier = scores.slice(0, -3);

  if (earlier.length === 0) {
    return 'Establishing baseline';
  }

  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;

  if (recentAvg > earlierAvg + 5) {
    return 'Improving';
  } else if (recentAvg < earlierAvg - 5) {
    return 'Degrading';
  } else {
    return 'Stable';
  }
}

/**
 * Calculate consistency score
 */
function calculateConsistencyScore() {
  if (iterationData.length < 2) {
    return 10;
  }

  const scores = iterationData.map(d => d.overallScore);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);

  const consistencyScore = Math.max(0, 10 - (stdDev * 0.2));
  return consistencyScore.toFixed(1);
}

/**
 * Generate next steps
 */
function generateNextSteps(iterationNumber, assessments, overallScore) {
  let steps = '';

  if (iterationNumber < CONFIG.totalIterations) {
    steps += `Continue to iteration ${iterationNumber + 1} with `;

    if (overallScore < 60) {
      steps += 'significant prompt improvements focusing on:\n';
      const lowestScore = Object.entries(assessments)
        .filter(([k, v]) => v.score !== 'N/A')
        .sort(([, a], [, b]) => a.score - b.score)[0];
      steps += `- Addressing ${lowestScore[0]} issues\n`;
      steps += `- Strengthening visual support for Reception learners\n`;
      steps += `- Ensuring strict curriculum alignment\n`;
    } else if (overallScore < 80) {
      steps += 'targeted improvements in:\n';
      const needsWork = Object.entries(assessments)
        .filter(([k, v]) => v.score !== 'N/A' && v.score < 7)
        .map(([k]) => k);
      needsWork.forEach(area => {
        steps += `- ${area.replace(/([A-Z])/g, ' $1').toLowerCase()}\n`;
      });
    } else {
      steps += 'current approach, maintaining quality while testing consistency.\n';
    }
  } else {
    steps += 'Assessment cycle complete. Generate comprehensive summary report and present findings.';
  }

  return steps;
}

/**
 * Generate comprehensive summary report
 */
function generateSummaryReport() {
  const timestamp = new Date().toISOString();
  const reportPath = path.join(
    CONFIG.reportsDir,
    `summary-${timestamp.replace(/[:.]/g, '-')}.md`
  );

  const scores = iterationData.map(d => d.overallScore);
  const startingScore = scores[0];
  const finalScore = scores[scores.length - 1];
  const improvement = finalScore - startingScore;

  const avgGenTime = performanceMetrics
    .filter(m => m.generationTime)
    .reduce((sum, m) => sum + parseFloat(m.generationTime), 0) / performanceMetrics.length;

  const successRate = (performanceMetrics.filter(m => m.status === 'success').length / performanceMetrics.length) * 100;

  let report = `# Comprehensive Quality Assessment Summary\n\n`;
  report += `## Assessment Configuration\n`;
  report += `- Year Group: ${CONFIG.yearGroup}\n`;
  report += `- Topic: ${CONFIG.topic}\n`;
  report += `- Subtopic: ${CONFIG.subtopic}\n`;
  report += `- Total Iterations: ${CONFIG.totalIterations}\n`;
  report += `- Assessment Period: ${performanceMetrics[0].timestamp} to ${performanceMetrics[performanceMetrics.length - 1].timestamp}\n\n`;

  report += `## Executive Summary\n\n`;
  report += `| Metric | Value |\n`;
  report += `|--------|-------|\n`;
  report += `| Starting Quality Score | ${startingScore.toFixed(2)}/100 |\n`;
  report += `| Final Quality Score | ${finalScore.toFixed(2)}/100 |\n`;
  report += `| Improvement | ${improvement >= 0 ? '+' : ''}${improvement.toFixed(2)} points |\n`;
  report += `| Average Generation Time | ${avgGenTime.toFixed(2)}s |\n`;
  report += `| Success Rate | ${successRate.toFixed(0)}% |\n`;
  report += `| Consistency Score | ${calculateConsistencyScore()}/10 |\n\n`;

  report += `## Quality Progression\n\n`;
  report += `| Iteration | Overall Score | Generation Time | Status |\n`;
  report += `|-----------|---------------|-----------------|--------|\n`;
  iterationData.forEach((data, idx) => {
    const metric = performanceMetrics[idx];
    report += `| ${idx + 1} | ${data.overallScore.toFixed(2)}/100 | ${metric.generationTime || 'N/A'}s | ${metric.status} |\n`;
  });
  report += `\n`;

  report += `## Assessment Breakdown by Dimension\n\n`;

  const dimensions = ['curriculumAlignment', 'presentationQuality', 'contentConfigMatch',
                     'imageQuestionAlignment', 'contentFreshness', 'imageDiversity'];

  dimensions.forEach(dim => {
    const scores = iterationData
      .map(d => d.assessments[dim])
      .filter(a => a && a.score !== 'N/A')
      .map(a => a.score);

    if (scores.length > 0) {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const min = Math.min(...scores);
      const max = Math.max(...scores);

      report += `### ${dim.replace(/([A-Z])/g, ' $1')}\n`;
      report += `- Average: ${avg.toFixed(2)}/10\n`;
      report += `- Range: ${min}/10 - ${max}/10\n`;
      report += `- Trend: ${scores[scores.length - 1] > scores[0] ? 'Improving' : scores[scores.length - 1] < scores[0] ? 'Declining' : 'Stable'}\n\n`;
    }
  });

  report += `## Best Performing Iteration\n\n`;
  const bestIdx = scores.indexOf(Math.max(...scores));
  report += `**Iteration ${bestIdx + 1}** achieved the highest score of ${scores[bestIdx].toFixed(2)}/100\n\n`;
  report += `Key strengths:\n`;
  const bestData = iterationData[bestIdx];
  Object.entries(bestData.assessments).forEach(([key, assessment]) => {
    if (assessment.score >= 8 && assessment.score !== 'N/A') {
      report += `- ${key}: ${assessment.score}/10\n`;
    }
  });
  report += `\n`;

  report += `## Worst Performing Iteration\n\n`;
  const worstIdx = scores.indexOf(Math.min(...scores));
  report += `**Iteration ${worstIdx + 1}** had the lowest score of ${scores[worstIdx].toFixed(2)}/100\n\n`;
  report += `Key challenges:\n`;
  const worstData = iterationData[worstIdx];
  Object.entries(worstData.assessments).forEach(([key, assessment]) => {
    if (assessment.score < 6 && assessment.score !== 'N/A') {
      report += `- ${key}: ${assessment.score}/10 - ${assessment.feedback.join('; ')}\n`;
    }
  });
  report += `\n`;

  report += `## Key Insights and Patterns\n\n`;

  // Image loading analysis
  const imageLoadRates = performanceMetrics.map(m =>
    m.imagesTotalCount > 0 ? (m.imagesLoaded / m.imagesTotalCount) * 100 : 0
  );
  const avgImageLoadRate = imageLoadRates.reduce((a, b) => a + b, 0) / imageLoadRates.length;

  report += `### Image Loading Performance\n`;
  report += `- Average image load rate: ${avgImageLoadRate.toFixed(0)}%\n`;
  report += `- Iterations with 100% load rate: ${imageLoadRates.filter(r => r === 100).length}/${CONFIG.totalIterations}\n\n`;

  // Content freshness analysis
  if (iterationData.length > 1) {
    const freshnessScores = iterationData
      .slice(1)
      .map(d => d.assessments.contentFreshness.score)
      .filter(s => s !== 'N/A');

    if (freshnessScores.length > 0) {
      const avgFreshness = freshnessScores.reduce((a, b) => a + b, 0) / freshnessScores.length;
      report += `### Content Variety\n`;
      report += `- Average freshness score: ${avgFreshness.toFixed(2)}/10\n`;
      report += `- Assessment: ${avgFreshness >= 7 ? 'Good variety across iterations' : 'Limited variety, content may be repetitive'}\n\n`;
    }
  }

  report += `## Prompt Evolution Summary\n\n`;
  report += `This assessment used the default worksheet generation prompts without modifications.\n`;
  report += `No prompt engineering was performed during this baseline assessment cycle.\n\n`;

  report += `## Performance and Stability Summary\n\n`;
  report += `### Generation Performance\n`;
  const genTimes = performanceMetrics.filter(m => m.generationTime).map(m => parseFloat(m.generationTime));
  report += `- Average: ${avgGenTime.toFixed(2)}s\n`;
  report += `- Fastest: ${Math.min(...genTimes).toFixed(2)}s\n`;
  report += `- Slowest: ${Math.max(...genTimes).toFixed(2)}s\n`;
  report += `- Target: <10s (${avgGenTime < 10 ? 'MET' : 'NOT MET'})\n\n`;

  report += `### Stability Metrics\n`;
  report += `- Success rate: ${successRate.toFixed(0)}%\n`;
  report += `- Failed generations: ${performanceMetrics.filter(m => m.status === 'failed').length}\n`;
  report += `- Consistency: ${calculateConsistencyScore()}/10\n\n`;

  report += `## Overall Assessment\n\n`;

  if (finalScore >= 80) {
    report += `The worksheet generation system demonstrates **STRONG** performance for Reception level content. `;
    report += `Quality is consistently high, with good curriculum alignment and appropriate visual support. `;
  } else if (finalScore >= 60) {
    report += `The worksheet generation system shows **ADEQUATE** performance for Reception level content. `;
    report += `Quality is acceptable but improvements are needed in specific areas. `;
  } else {
    report += `The worksheet generation system requires **SIGNIFICANT IMPROVEMENT** for Reception level content. `;
    report += `Quality issues prevent confident classroom use without manual review and editing. `;
  }

  report += `\n\n`;

  report += `## Recommendations\n\n`;

  if (avgImageLoadRate < 90) {
    report += `1. **Critical**: Investigate image loading failures. ${(100 - avgImageLoadRate).toFixed(0)}% of images fail to load.\n`;
  }

  if (avgGenTime > 15) {
    report += `1. **Performance**: Generation times (${avgGenTime.toFixed(2)}s avg) exceed acceptable range. Optimize generation pipeline.\n`;
  }

  const consistencyScore = parseFloat(calculateConsistencyScore());
  if (consistencyScore < 7) {
    report += `1. **Consistency**: Quality varies significantly across iterations (consistency: ${consistencyScore}/10). Implement quality gates.\n`;
  }

  // Dimension-specific recommendations
  const dimensionAvgs = {};
  dimensions.forEach(dim => {
    const scores = iterationData
      .map(d => d.assessments[dim])
      .filter(a => a && a.score !== 'N/A')
      .map(a => a.score);
    if (scores.length > 0) {
      dimensionAvgs[dim] = scores.reduce((a, b) => a + b, 0) / scores.length;
    }
  });

  const weakDimensions = Object.entries(dimensionAvgs)
    .filter(([k, v]) => v < 7)
    .sort(([, a], [, b]) => a - b);

  if (weakDimensions.length > 0) {
    report += `1. **Content Quality**: Focus improvements on:\n`;
    weakDimensions.forEach(([dim, score]) => {
      report += `   - ${dim.replace(/([A-Z])/g, ' $1')} (avg: ${score.toFixed(2)}/10)\n`;
    });
  }

  report += `\n`;

  fs.writeFileSync(reportPath, report);
  console.log(`\n✓ Summary report saved: ${reportPath}`);

  return {
    reportPath,
    summary: {
      startingScore,
      finalScore,
      improvement,
      avgGenTime,
      successRate,
      consistency: consistencyScore
    }
  };
}

/**
 * Main assessment loop
 */
async function runQualityAssessment() {
  console.log('\n' + '='.repeat(80));
  console.log('RECEPTION WORKSHEET QUALITY ASSESSMENT');
  console.log('5-Iteration Comprehensive Evaluation');
  console.log('='.repeat(80));

  setupDirectories();

  const browser = await chromium.launch({
    headless: false,
    slowMo: 100
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Set up error monitoring
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`Browser console error: ${msg.text()}`);
    }
  });

  try {
    for (let i = 1; i <= CONFIG.totalIterations; i++) {
      console.log(`\n\n${'#'.repeat(80)}`);
      console.log(`ITERATION ${i} OF ${CONFIG.totalIterations}`);
      console.log('#'.repeat(80));

      // Generate worksheet
      const result = await generateWorksheet(page, i);

      if (result.metrics.status === 'failed') {
        console.error(`\n✗ Iteration ${i} failed. Continuing to next iteration...\n`);
        performanceMetrics.push(result.metrics);
        continue;
      }

      performanceMetrics.push(result.metrics);

      // Assess quality
      console.log('\n' + '-'.repeat(60));
      console.log('QUALITY ASSESSMENT');
      console.log('-'.repeat(60));

      const previousContents = iterationData.map(d => d.content);

      const assessments = {
        curriculumAlignment: assessCurriculumAlignment(result.content, i),
        presentationQuality: assessPresentationQuality(result.content, i),
        contentConfigMatch: assessContentConfigurationMatch(result.content, i),
        imageQuestionAlignment: assessImageQuestionAlignment(result.content, i),
        contentFreshness: assessContentFreshness(result.content, i, previousContents),
        imageDiversity: assessImageDiversity(result.content, i, previousContents)
      };

      const overallScore = calculateOverallScore(assessments, i);

      console.log('\n' + '-'.repeat(60));
      console.log('ASSESSMENT RESULTS');
      console.log('-'.repeat(60));
      console.log(`Overall Score: ${overallScore.toFixed(2)}/100`);

      Object.entries(assessments).forEach(([key, assessment]) => {
        console.log(`${key}: ${assessment.score}/10`);
      });

      // Store iteration data
      iterationData.push({
        iteration: i,
        result,
        assessments,
        overallScore,
        content: result.content
      });

      // Generate iteration report
      generateIterationReport(i, result, assessments, overallScore);

      // Wait before next iteration
      if (i < CONFIG.totalIterations) {
        console.log(`\nWaiting 5 seconds before iteration ${i + 1}...`);
        await page.waitForTimeout(5000);
      }
    }

    // Generate summary report
    console.log('\n\n' + '='.repeat(80));
    console.log('ASSESSMENT CYCLE COMPLETE');
    console.log('='.repeat(80));

    const summary = generateSummaryReport();

    console.log('\n' + '='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`Starting Quality Score: ${summary.summary.startingScore.toFixed(2)}/100`);
    console.log(`Final Quality Score: ${summary.summary.finalScore.toFixed(2)}/100`);
    console.log(`Improvement: ${summary.summary.improvement >= 0 ? '+' : ''}${summary.summary.improvement.toFixed(2)} points`);
    console.log(`Average Generation Time: ${summary.summary.avgGenTime.toFixed(2)}s`);
    console.log(`Success Rate: ${summary.summary.successRate.toFixed(0)}%`);
    console.log(`Consistency: ${summary.summary.consistency}/10`);
    console.log('='.repeat(80));

    console.log(`\n✓ Full summary report: ${summary.reportPath}`);
    console.log(`✓ Individual iteration reports: ${CONFIG.reportsDir}`);
    console.log(`✓ Screenshots: ${CONFIG.screenshotsDir}`);

  } catch (error) {
    console.error('\n✗ Assessment failed:', error);
    throw error;
  } finally {
    await browser.close();
    console.log('\n✓ Assessment complete');
  }
}

// Run assessment
runQualityAssessment().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
