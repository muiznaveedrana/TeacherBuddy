/**
 * Detailed Worksheet Analysis Script
 *
 * Analyzes generated HTML worksheets to extract:
 * - Actual question text
 * - Numbers mentioned in questions
 * - Objects used in each question
 * - Image collections and paths
 * - Answer key presence and correctness
 */

const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, '..', 'worksheet-quality-reports');

/**
 * Extract question text from HTML
 */
function extractQuestions(html) {
  const questions = [];

  // Match question divs
  const questionRegex = /<div class="question">([\s\S]*?)<\/div>\s*(?=<div class="question">|<div class="answer-key">|<\/div>\s*<div class="answer-key">)/g;
  let match;

  while ((match = questionRegex.exec(html)) !== null) {
    const questionHtml = match[1];

    // Extract question number and text
    const textMatch = questionHtml.match(/<p class="question-text">[\s\S]*?<span class="question-number">(\d+)\.<\/span>\s*(.*?)<\/p>/);

    if (textMatch) {
      const questionNumber = parseInt(textMatch[1]);
      const questionText = textMatch[2].trim();

      // Extract images
      const imageRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
      const images = [];
      let imgMatch;

      while ((imgMatch = imageRegex.exec(questionHtml)) !== null) {
        images.push(imgMatch[1]);
      }

      questions.push({
        number: questionNumber,
        text: questionText,
        images: images,
        imageCount: images.length
      });
    }
  }

  return questions;
}

/**
 * Extract answer key from HTML
 */
function extractAnswerKey(html) {
  const answerKeyMatch = html.match(/<div class="answer-key">([\s\S]*?)<\/div>\s*<\/body>/);

  if (!answerKeyMatch) {
    return null;
  }

  const answerKeyHtml = answerKeyMatch[1];
  const answers = [];

  // Extract individual answers
  const answerRegex = /<p><strong>(\d+)\.<\/strong>\s*(.*?)<\/p>/g;
  let match;

  while ((match = answerRegex.exec(answerKeyHtml)) !== null) {
    answers.push({
      questionNumber: parseInt(match[1]),
      answer: match[2].trim()
    });
  }

  return answers;
}

/**
 * Extract object mentioned in question text
 */
function extractObjectFromQuestion(questionText) {
  const lowerText = questionText.toLowerCase();

  // Common counting object patterns
  const patterns = [
    /how many (\w+)s?/i,
    /count the (\w+)s?/i,
    /(\w+)s? (are there|can you see|does \w+ have)/i,
    /has \d+ (\w+)s?/i
  ];

  for (const pattern of patterns) {
    const match = lowerText.match(pattern);
    if (match) {
      // Normalize object name (singular form)
      let object = match[1].toLowerCase();
      // Remove trailing 's' if plural
      if (object.endsWith('s') && !['glass', 'class', 'grass'].includes(object)) {
        object = object.slice(0, -1);
      }
      return object;
    }
  }

  return null;
}

/**
 * Extract collection from image path
 */
function extractCollection(imagePath) {
  // Example: /images/WORKSHEET_OBJECTS/counting/fruits/pear.png -> fruits
  const match = imagePath.match(/WORKSHEET_OBJECTS\/counting\/([^\/]+)\//);
  return match ? match[1] : null;
}

/**
 * Analyze a single worksheet
 */
function analyzeWorksheet(htmlPath, iterationNumber) {
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const questions = extractQuestions(html);
  const answerKey = extractAnswerKey(html);

  const analysis = {
    iteration: iterationNumber,
    totalQuestions: questions.length,
    questions: [],
    answerKey: answerKey,
    metrics: {
      questionCountCorrect: false,
      allNumbersInRange: true,
      hasAnswerKey: answerKey !== null && answerKey.length > 0,
      answerKeyComplete: false,
      objectsUnique: true,
      objectsUsed: [],
      collectionsUsed: [],
      allImagesCorrectPath: true,
      singleObjectPerQuestion: true
    },
    issues: []
  };

  // Analyze each question
  const objectCounts = {};
  const collections = [];

  questions.forEach(q => {
    const object = extractObjectFromQuestion(q.text);
    const numbers = q.text.match(/\d+/g) || [];
    const collection = q.images.length > 0 ? extractCollection(q.images[0]) : null;

    const questionAnalysis = {
      number: q.number,
      text: q.text,
      object: object,
      numbers: numbers.map(Number),
      imageCount: q.imageCount,
      collection: collection,
      images: q.images
    };

    analysis.questions.push(questionAnalysis);

    // Track objects
    if (object) {
      objectCounts[object] = (objectCounts[object] || 0) + 1;
      analysis.metrics.objectsUsed.push(object);
    }

    // Track collections
    if (collection) {
      collections.push(collection);
    }

    // Check if numbers are in range 1-10
    numbers.forEach(num => {
      const n = Number(num);
      if (n < 1 || n > 10) {
        analysis.metrics.allNumbersInRange = false;
        analysis.issues.push(`Question ${q.number}: Number ${n} is outside 1-10 range`);
      }
    });

    // Check image paths
    q.images.forEach(img => {
      if (!img.includes('WORKSHEET_OBJECTS')) {
        analysis.metrics.allImagesCorrectPath = false;
        analysis.issues.push(`Question ${q.number}: Image path incorrect: ${img}`);
      }
    });
  });

  analysis.metrics.collectionsUsed = [...new Set(collections)];

  // Check question count
  analysis.metrics.questionCountCorrect = questions.length === 5;
  if (!analysis.metrics.questionCountCorrect) {
    analysis.issues.push(`Expected 5 questions, found ${questions.length}`);
  }

  // Check object diversity
  const repeatedObjects = Object.entries(objectCounts).filter(([_, count]) => count > 1);
  if (repeatedObjects.length > 0) {
    analysis.metrics.objectsUnique = false;
    repeatedObjects.forEach(([obj, count]) => {
      analysis.issues.push(`Object "${obj}" used ${count} times (should be unique)`);
    });
  }

  // Check answer key completeness
  if (answerKey) {
    analysis.metrics.answerKeyComplete = answerKey.length === questions.length;
    if (!analysis.metrics.answerKeyComplete) {
      analysis.issues.push(`Answer key has ${answerKey.length} answers, but ${questions.length} questions`);
    }
  } else {
    analysis.issues.push('Answer key is missing');
  }

  return analysis;
}

/**
 * Generate comprehensive report
 */
function generateComprehensiveReport() {
  console.log('\n========================================');
  console.log('DETAILED WORKSHEET ANALYSIS');
  console.log('========================================\n');

  const worksheetFiles = [];
  for (let i = 1; i <= 5; i++) {
    const filePath = path.join(reportsDir, `iteration-${i}-worksheet.html`);
    if (fs.existsSync(filePath)) {
      worksheetFiles.push({ iteration: i, path: filePath });
    }
  }

  if (worksheetFiles.length === 0) {
    console.log('No worksheet files found in', reportsDir);
    return;
  }

  const allAnalyses = [];
  const allObjects = [];

  worksheetFiles.forEach(({ iteration, path }) => {
    console.log(`\n--- ITERATION ${iteration} DETAILED ANALYSIS ---\n`);

    const analysis = analyzeWorksheet(path, iteration);
    allAnalyses.push(analysis);

    console.log(`Questions Found: ${analysis.totalQuestions}/5`);
    console.log(`Answer Key: ${analysis.metrics.hasAnswerKey ? '✓' : '✗'}`);
    console.log(`Answer Key Complete: ${analysis.metrics.answerKeyComplete ? '✓' : '✗'}`);
    console.log(`Objects Unique: ${analysis.metrics.objectsUnique ? '✓' : '✗'}`);
    console.log(`Numbers in Range (1-10): ${analysis.metrics.allNumbersInRange ? '✓' : '✗'}`);
    console.log(`Correct Image Paths: ${analysis.metrics.allImagesCorrectPath ? '✓' : '✗'}`);

    console.log('\nQuestions:');
    analysis.questions.forEach(q => {
      console.log(`  ${q.number}. "${q.text}"`);
      console.log(`     Object: ${q.object || 'NOT DETECTED'}`);
      console.log(`     Numbers: ${q.numbers.join(', ') || 'none'}`);
      console.log(`     Images: ${q.imageCount}`);
      console.log(`     Collection: ${q.collection || 'unknown'}`);
    });

    if (analysis.metrics.hasAnswerKey) {
      console.log('\nAnswer Key:');
      analysis.answerKey.forEach(a => {
        console.log(`  ${a.questionNumber}. ${a.answer}`);
      });
    }

    console.log('\nObjects Used:', analysis.metrics.objectsUsed.join(', '));
    console.log('Collections Used:', analysis.metrics.collectionsUsed.join(', '));

    if (analysis.issues.length > 0) {
      console.log('\nIssues:');
      analysis.issues.forEach(issue => console.log(`  - ${issue}`));
    }

    allObjects.push(...analysis.metrics.objectsUsed);
  });

  // Cross-iteration analysis
  console.log('\n\n========================================');
  console.log('CROSS-ITERATION ANALYSIS');
  console.log('========================================\n');

  // Object freshness
  const objectFrequency = {};
  allObjects.forEach(obj => {
    objectFrequency[obj] = (objectFrequency[obj] || 0) + 1;
  });

  console.log('Object Frequency Across All Iterations:');
  Object.entries(objectFrequency)
    .sort((a, b) => b[1] - a[1])
    .forEach(([obj, count]) => {
      const status = count === 1 ? '✓ Fresh' : count <= 2 ? '⚠ Reused' : '✗ Overused';
      console.log(`  ${status}: "${obj}" used ${count} time(s)`);
    });

  const uniqueObjects = Object.keys(objectFrequency).length;
  const totalObjectMentions = allObjects.length;
  const freshnessScore = Math.round((uniqueObjects / totalObjectMentions) * 100);

  console.log(`\nObject Diversity: ${uniqueObjects} unique objects / ${totalObjectMentions} total mentions`);
  console.log(`Freshness Score: ${freshnessScore}%`);

  // Summary metrics
  console.log('\n========================================');
  console.log('SUMMARY METRICS');
  console.log('========================================\n');

  const metrics = {
    questionCountAccurate: allAnalyses.filter(a => a.metrics.questionCountCorrect).length,
    numberRangeCompliant: allAnalyses.filter(a => a.metrics.allNumbersInRange).length,
    hasAnswerKey: allAnalyses.filter(a => a.metrics.hasAnswerKey).length,
    answerKeyComplete: allAnalyses.filter(a => a.metrics.answerKeyComplete).length,
    objectsUnique: allAnalyses.filter(a => a.metrics.objectsUnique).length,
    correctImagePaths: allAnalyses.filter(a => a.metrics.allImagesCorrectPath).length
  };

  const total = allAnalyses.length;

  console.log(`Question Count (exactly 5): ${metrics.questionCountAccurate}/${total} (${Math.round(metrics.questionCountAccurate/total*100)}%)`);
  console.log(`Number Range (1-10): ${metrics.numberRangeCompliant}/${total} (${Math.round(metrics.numberRangeCompliant/total*100)}%)`);
  console.log(`Answer Key Present: ${metrics.hasAnswerKey}/${total} (${Math.round(metrics.hasAnswerKey/total*100)}%)`);
  console.log(`Answer Key Complete: ${metrics.answerKeyComplete}/${total} (${Math.round(metrics.answerKeyComplete/total*100)}%)`);
  console.log(`Objects Unique (within worksheet): ${metrics.objectsUnique}/${total} (${Math.round(metrics.objectsUnique/total*100)}%)`);
  console.log(`Correct Image Paths: ${metrics.correctImagePaths}/${total} (${Math.round(metrics.correctImagePaths/total*100)}%)`);
  console.log(`Object Freshness (across iterations): ${freshnessScore}%`);

  // Final assessment
  console.log('\n========================================');
  console.log('FINAL ASSESSMENT');
  console.log('========================================\n');

  const criticalIssues = [];

  if (metrics.questionCountAccurate < total) {
    criticalIssues.push(`❌ Question count not always 5 (${total - metrics.questionCountAccurate} failures)`);
  } else {
    console.log('✓ Question count accuracy: 100%');
  }

  if (metrics.numberRangeCompliant < total) {
    criticalIssues.push(`❌ Numbers outside 1-10 range detected (${total - metrics.numberRangeCompliant} failures)`);
  } else {
    console.log('✓ Number range compliance: 100%');
  }

  if (metrics.hasAnswerKey < total) {
    criticalIssues.push(`❌ Answer key missing in some worksheets (${total - metrics.hasAnswerKey} failures)`);
  } else {
    console.log('✓ Answer key present: 100%');
  }

  if (metrics.answerKeyComplete < total) {
    criticalIssues.push(`❌ Answer key incomplete (${total - metrics.answerKeyComplete} failures)`);
  } else {
    console.log('✓ Answer key completeness: 100%');
  }

  if (metrics.objectsUnique < total) {
    criticalIssues.push(`❌ Object repetition within worksheets (${total - metrics.objectsUnique} failures)`);
  } else {
    console.log('✓ Object uniqueness: 100%');
  }

  if (freshnessScore < 80) {
    criticalIssues.push(`⚠ Low object freshness across iterations (${freshnessScore}% - target: 80%+)`);
  } else {
    console.log(`✓ Object freshness: ${freshnessScore}% (excellent)`);
  }

  if (metrics.correctImagePaths < total) {
    criticalIssues.push(`❌ Incorrect image paths detected (${total - metrics.correctImagePaths} failures)`);
  } else {
    console.log('✓ Image paths: 100% correct');
  }

  if (criticalIssues.length > 0) {
    console.log('\n❌ CRITICAL ISSUES FOUND:\n');
    criticalIssues.forEach(issue => console.log(`  ${issue}`));
  } else {
    console.log('\n✅ ALL QUALITY METRICS PASSED!');
  }

  // Save detailed report
  const reportContent = {
    timestamp: new Date().toISOString(),
    configuration: {
      yearGroup: 'Reception',
      topic: 'number-counting',
      subtopic: 'counting-to-10',
      difficulty: 'average',
      questionCount: 5,
      iterations: 5
    },
    analyses: allAnalyses,
    summary: {
      metrics,
      objectFrequency,
      freshnessScore,
      criticalIssues
    }
  };

  const reportPath = path.join(reportsDir, `detailed-analysis-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(reportContent, null, 2));
  console.log(`\n📄 Detailed analysis saved to: ${reportPath}`);
}

// Run analysis
generateComprehensiveReport();
