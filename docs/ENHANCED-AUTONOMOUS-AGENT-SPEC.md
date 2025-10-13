# Enhanced Autonomous Worksheet Quality Agent - Implementation Specification

**Version**: 2.0
**Date**: 2025-10-12
**Status**: APPROVED - Ready for Implementation
**Target File**: `scripts/autonomous-worksheet-quality-agent.js`

---

## Executive Summary

This specification defines a unified, production-ready autonomous agent that:
- Works for ALL 78+ worksheet configs (Reception → Year 6)
- Combines Playwright UI automation with config-aware quality assessment
- Integrates Claude Code vision for semantic image validation
- Auto-fixes issues via catalog modifications and prompt versioning
- Runs multi-cycle improvement loops until production-ready

**Single Entry Point**: `node scripts/autonomous-worksheet-quality-agent.js <config-id>`

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│  ENHANCED AUTONOMOUS WORKSHEET QUALITY AGENT                        │
│  File: scripts/autonomous-worksheet-quality-agent.js                │
└─────────────────────────────────────────────────────────────────────┘

[1] CONFIG REGISTRY (Embedded, ~78 configs)
    ├── Reception: counting-to-10, number-recognition, etc.
    ├── Year 1: addition-within-20, subtraction, etc.
    ├── Year 2-6: Various topics
    └── Each config: metadata, quality gates, specific checks

[2] PLAYWRIGHT UI AUTOMATION
    ├── Visible browser (headless: false)
    ├── Navigate → Select dropdowns → Generate → Capture
    └── Screenshots: config, ready, worksheet (3 per iteration)

[3] 7-DIMENSION QUALITY ASSESSMENT (Config-Adaptive)
    ├── 1. Curriculum Alignment (25% weight)
    ├── 2. Presentation Quality (20% weight)
    ├── 3. Content-Config Match (25% weight)
    ├── 4. Image-Question Alignment (20% weight)
    ├── 5. Config-Specific Quality (10% weight) ← Adapts per config
    ├── 6. Content Freshness (iter 2+)
    └── 7. Image Diversity (iter 2+)

[4] CLAUDE CODE VISION ANALYSIS (Phase 2)
    ├── Reads worksheet screenshot via Read tool
    ├── Semantic validation: image-question alignment
    ├── Age-appropriateness check
    └── Curriculum context validation

[5] QUALITY GATE SYSTEM
    ├── Config-specific thresholds
    ├── Reception: Overall ≥85, dimensions ≥7-9
    ├── Year 1-6: Overall ≥80, dimensions ≥7-8
    └── Production Ready: 90% pass rate + 0 P0 failures

[6] AUTO-FIX ENGINE
    ├── Integrates external Fix Registry (scripts/fixes/fix-registry.js)
    ├── Catalog backup before modifications
    ├── Applies: catalog priority fixes, image path fixes, etc.
    └── Logs all changes with rollback capability

[7] PROMPT AUTO-VERSIONING (Phase 2)
    ├── Detects systematic issues (e.g., wrong number range)
    ├── Auto-generates improved prompt (v1.0 → v1.1)
    ├── Saves to prompts/config-specific/<config-id-v1.1.ts>
    └── Auto-applies in next cycle

[8] MULTI-CYCLE IMPROVEMENT LOOP
    ├── Max 10 cycles (configurable)
    ├── 5 iterations per cycle (configurable)
    ├── Early exit on production-ready
    └── Tracks improvement cycle-over-cycle

[9] COMPREHENSIVE REPORTING
    ├── Cycle-by-cycle JSON + Markdown
    ├── Screenshots organized by cycle/iteration
    ├── Final report with production verdict
    └── Recommendations for next steps
```

---

## 1. Config Registry Structure

### 1.1 Registry Schema

```javascript
const CONFIG_REGISTRY = {
  'reception-number-counting-counting-to-10': {
    // UI Selection Values
    yearGroup: 'Reception',
    yearGroupSelect: 'Reception (Ages 4-5)',
    topic: 'Number and Counting',
    subtopic: 'Counting to 10',
    difficulty: 'average', // or 'easy', 'hard'

    // Generation Parameters
    numQuestions: 5,

    // Quality Gates (Config-Specific)
    qualityGate: {
      minOverallScore: 85,              // Reception: 85, Year 1-6: 80
      minCurriculumAlignment: 8,
      minPresentationQuality: 7,
      minContentConfigMatch: 9,
      minImageQuestionAlignment: 9,
      minContentFreshness: 9,
      minImageDiversity: 8
    },

    // Config-Specific Validation Rules
    specificChecks: {
      // Number range
      minNumber: 1,
      maxNumber: 10,

      // Visual requirements
      requireVisualSupport: true,       // All questions need images?
      minImagesPerQuestion: 1,

      // Content complexity
      maxQuestionComplexity: 'simple',  // simple, moderate, complex
      singleObjectTypeRequired: true,   // One object type per question
      realWorldContextRequired: true,   // No nonsensical scenarios

      // Language
      maxWordLength: 10,                // Age-appropriate vocabulary
      forbiddenWords: [],               // Optional

      // Custom validators (optional)
      customValidators: []
    },

    // Prompt Configuration
    promptConfig: {
      version: 'v1.0',
      filePath: 'prompts/config-specific/reception-number-counting-counting-to-10-v1.0.ts'
    }
  },

  'reception-number-counting-number-recognition': { /* ... */ },

  // Template for Year 1-6
  'year1-addition-within-20': {
    yearGroup: 'Year 1',
    yearGroupSelect: 'Year 1 (Ages 5-6)',
    topic: 'Addition',
    subtopic: 'Addition within 20',
    difficulty: 'average',
    numQuestions: 5,
    qualityGate: {
      minOverallScore: 80,              // Lower threshold for Year 1-6
      minCurriculumAlignment: 7,
      minPresentationQuality: 7,
      minContentConfigMatch: 8,
      minImageQuestionAlignment: 7,
      minContentFreshness: 8,
      minImageDiversity: 7
    },
    specificChecks: {
      minNumber: 0,
      maxNumber: 20,
      requireVisualSupport: true,       // May vary by year group
      maxQuestionComplexity: 'moderate',
      singleObjectTypeRequired: false,  // Year 1+ can have multi-object
      realWorldContextRequired: true
    },
    promptConfig: {
      version: 'v1.0',
      filePath: 'prompts/config-specific/year1-addition-within-20-v1.0.ts'
    }
  }

  // Add all 78 configs following this pattern
};
```

### 1.2 Config Registration Priority

**Phase 1 (Implement First)**:
1. `reception-number-counting-counting-to-10` ← START HERE
2. `reception-number-counting-number-recognition`

**Phase 2 (After Phase 1 validated)**:
3. All other Reception configs
4. Year 1 configs
5. Year 2-6 configs

---

## 2. Command-Line Interface

### 2.1 Usage

```bash
node scripts/autonomous-worksheet-quality-agent.js <config-id> [options]
```

### 2.2 Arguments

| Argument | Required | Description | Example |
|----------|----------|-------------|---------|
| `config-id` | YES | Configuration identifier | `reception-number-counting-counting-to-10` |

### 2.3 Options

| Option | Default | Description |
|--------|---------|-------------|
| `--max-cycles=N` | 10 | Maximum improvement cycles |
| `--iterations=N` | 5 | Iterations per cycle |
| `--auto-fix` | true | Enable automatic fixes |
| `--prompt-version=X` | latest | Test specific prompt version |
| `--headless` | false | Run browser in headless mode |
| `--enable-vision` | false | Enable Claude Code vision analysis |

### 2.4 Examples

```bash
# Basic usage (uses all defaults)
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10

# Custom cycles and iterations
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10 --max-cycles=3 --iterations=10

# Disable auto-fix (manual mode)
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10 --auto-fix=false

# Test specific prompt version
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10 --prompt-version=v1.1

# Enable vision analysis
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10 --enable-vision
```

---

## 3. Playwright UI Automation

### 3.1 Browser Configuration

```javascript
const browser = await chromium.launch({
  headless: HEADLESS,               // Default: false (visible)
  slowMo: 50,                       // Slow down for visibility
  args: ['--window-size=1920,1080'] // Full HD resolution
});
```

### 3.2 Worksheet Generation Flow

```javascript
async function generateWorksheet(page, cycleNum, iterationNum, config) {
  const startTime = Date.now();

  try {
    // 1. Navigate to dashboard
    await page.goto(`${BASE_URL}/dashboard`, {
      waitUntil: 'networkidle',
      timeout: 120000
    });

    // 2. Screenshot: Configuration screen
    await page.screenshot({
      path: `${screenshotDir}/iter-${iterationNum}-01-config.png`,
      fullPage: true
    });

    // 3. Select Year Group
    await page.getByTestId('year-group-select').click();
    await page.waitForTimeout(500);
    const yearGroupValue = config.yearGroup.toLowerCase().replace(/\s+/g, '-');
    await page.getByTestId(`year-group-option-${yearGroupValue}`).click();
    await page.waitForTimeout(2000);

    // 4. Select Topic
    const topicButton = page.locator('label:has-text("Topic")').locator('..').locator('button').first();
    await topicButton.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: config.topic }).click();
    await page.waitForTimeout(2000);

    // 5. Select Subtopic
    const subtopicButton = page.locator('label:has-text("Subtopic")').locator('..').locator('button').first();
    await subtopicButton.click();
    await page.waitForTimeout(500);
    await page.getByRole('option', { name: config.subtopic }).click();
    await page.waitForTimeout(1500);

    // 6. Select Difficulty (if needed)
    if (config.difficulty) {
      await page.click(`#difficulty-${config.difficulty}`);
      await page.waitForTimeout(500);
    }

    // 7. Screenshot: Ready to generate
    await page.screenshot({
      path: `${screenshotDir}/iter-${iterationNum}-02-ready.png`,
      fullPage: true
    });

    // 8. Click Generate
    const generateButton = page.getByRole('button', { name: 'Generate Worksheet' });
    await generateButton.click();

    // 9. Wait for completion
    await page.waitForSelector('text=Download', { timeout: 120000 });
    await page.waitForTimeout(3000); // Wait for images to load

    // 10. Screenshot: Generated worksheet
    await page.screenshot({
      path: `${screenshotDir}/iter-${iterationNum}-03-worksheet.png`,
      fullPage: true
    });

    // 11. Extract HTML content
    const html = await page.locator('.worksheet-preview').innerHTML();

    // 12. Extract metadata
    const content = await extractContent(page);

    const endTime = Date.now();
    const generationTime = (endTime - startTime) / 1000;

    return {
      success: true,
      html,
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
      path: `${screenshotDir}/iter-${iterationNum}-error.png`,
      fullPage: true
    }).catch(() => {});

    return {
      success: false,
      error: error.message,
      generationTime: (Date.now() - startTime) / 1000
    };
  }
}
```

### 3.3 Content Extraction

```javascript
async function extractContent(page) {
  return {
    text: await page.locator('.worksheet-preview').textContent(),

    questions: (await page.locator('.worksheet-preview').textContent())
      .match(/\d+[\.\)]\s*.+/g) || [],

    images: await Promise.all(
      (await page.locator('.worksheet-preview img').all()).map(async img => ({
        src: await img.getAttribute('src'),
        alt: await img.getAttribute('alt'),
        visible: await img.isVisible()
      }))
    ),

    numbers: extractNumbers(textContent),
    objects: extractObjects(textContent),
    collections: extractImageCollections(html)
  };
}
```

---

## 4. Quality Assessment System

### 4.1 Assessment Dimensions

#### 4.1.1 Curriculum Alignment (25% weight)

**Purpose**: Verify content matches curriculum requirements for the year group

```javascript
function assessCurriculumAlignment(content, config) {
  let score = 10;
  const feedback = [];

  // Check number range
  const numbers = extractNumbers(content.text);
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
```

#### 4.1.2 Presentation Quality (20% weight)

```javascript
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
```

#### 4.1.3 Content-Config Match (25% weight)

```javascript
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
  const numbers = extractNumbers(content.text);
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
```

#### 4.1.4 Image-Question Alignment (20% weight)

```javascript
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
```

#### 4.1.5 Config-Specific Quality (10% weight)

**KEY**: This adapts based on config's `specificChecks`

```javascript
function assessConfigSpecificQuality(content, config) {
  let score = 10;
  const feedback = [];
  const checks = config.specificChecks;

  // Number range (strict)
  if (checks.maxNumber) {
    const numbersFound = extractNumbers(content.text);
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
```

#### 4.1.6 Content Freshness (iteration 2+)

```javascript
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
```

#### 4.1.7 Image Diversity (iteration 2+)

```javascript
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
```

### 4.2 Overall Score Calculation

```javascript
function calculateOverallScore(assessments, iterationNum) {
  // Iteration 1: 5 dimensions
  // Iteration 2+: 7 dimensions
  const weights = iterationNum === 1 ? {
    curriculumAlignment: 0.25,
    presentationQuality: 0.20,
    contentConfigMatch: 0.25,
    imageQuestionAlignment: 0.20,
    configSpecificQuality: 0.10
  } : {
    curriculumAlignment: 0.20,
    presentationQuality: 0.15,
    contentConfigMatch: 0.20,
    imageQuestionAlignment: 0.15,
    configSpecificQuality: 0.10,
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
```

### 4.3 Quality Gate Check

```javascript
function checkQualityGate(assessments, overallScore, config) {
  const gate = config.qualityGate;
  const failures = [];

  // Overall score
  if (overallScore < gate.minOverallScore) {
    failures.push({
      severity: 'P0',
      dimension: 'Overall',
      message: `Overall score ${overallScore.toFixed(2)} < ${gate.minOverallScore}`
    });
  }

  // Dimension checks
  const dimensionChecks = {
    curriculumAlignment: gate.minCurriculumAlignment,
    presentationQuality: gate.minPresentationQuality,
    contentConfigMatch: gate.minContentConfigMatch,
    imageQuestionAlignment: gate.minImageQuestionAlignment,
    contentFreshness: gate.minContentFreshness,
    imageDiversity: gate.minImageDiversity
  };

  for (const [dim, threshold] of Object.entries(dimensionChecks)) {
    if (assessments[dim]?.score !== 'N/A' &&
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
    failures
  };
}
```

---

## 5. Claude Code Vision Analysis (Phase 2)

### 5.1 Implementation Strategy

**NOTE**: Claude Code has built-in vision via the Read tool. We DON'T need Gemini API.

```javascript
async function assessWithClaudeVision(screenshotPath, content, config) {
  // This will be implemented by Claude Code in the agent context
  // The autonomous script will output a structured JSON that Claude reads

  return {
    enabled: false, // Set to true when --enable-vision flag is used
    placeholder: true,
    message: 'Claude Code vision analysis will be performed by the agent context',

    // Expected output structure:
    expectedOutput: {
      visionScore: 0, // 0-10
      imageQuestionAlignment: {
        score: 0,
        issues: []
      },
      ageAppropriateness: {
        score: 0,
        feedback: ''
      },
      semanticMatching: {
        score: 0,
        mismatches: []
      }
    }
  };
}
```

### 5.2 Vision Analysis Prompt Template

When `--enable-vision` is enabled, the script outputs:

```json
{
  "visionAnalysisRequest": {
    "screenshotPath": "cycle-1-screenshots/iter-1-03-worksheet.png",
    "config": {
      "yearGroup": "Reception",
      "topic": "Number and Counting",
      "subtopic": "Counting to 10"
    },
    "extractedContent": {
      "questions": ["Count the apples", "How many footballs?"],
      "numbers": [3, 5, 7],
      "objects": ["apples", "footballs"]
    },
    "prompt": "Analyze this Reception worksheet screenshot. Check: 1) Do images match questions semantically? 2) Are images age-appropriate? 3) Do images clearly show correct quantities? 4) Are contexts real-world appropriate? Provide scores 0-10 and specific issues."
  }
}
```

Claude Code agent will:
1. Read the screenshot using Read tool
2. Analyze visually
3. Write vision assessment to `vision-assessment.json`
4. Script reads results and incorporates into quality score

---

## 6. Auto-Fix Engine

### 6.1 Fix Registry Integration

The script integrates with external `scripts/fixes/fix-registry.js`:

```javascript
async function applyAutoFixes(analysis, catalogPath, configId) {
  if (!AUTO_FIX_ENABLED) {
    return [];
  }

  const fixRegistry = require('./fixes/fix-registry.js');

  // Backup catalog
  const backupPath = path.join(sessionDir, 'catalog-backup.json');
  fs.copyFileSync(catalogPath, backupPath);

  // Detect and apply fixes
  const fixes = await fixRegistry.detectAndApply(
    analysis,
    catalogPath,
    configId
  );

  return fixes;
}
```

### 6.2 Fix Types

The Fix Registry handles:

1. **Catalog Priority Fixes**
   - Adjust collection priorities
   - Remove topics from collections
   - Boost appropriate collections

2. **Image Path Fixes**
   - Remove broken image paths
   - Validate file existence

3. **Vision AI Fixes** (Phase 2)
   - Fix semantic mismatches
   - Replace inappropriate images

4. **Prompt Suggestions**
   - Generate improved prompts
   - Save to `prompt-suggestions/`

### 6.3 Rollback Capability

```javascript
function rollbackCatalog(backupPath, catalogPath) {
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, catalogPath);
    console.log('✅ Catalog rolled back to pre-fix state');
  }
}
```

---

## 7. Prompt Auto-Versioning (Phase 2)

### 7.1 Detection Logic

```javascript
function detectPromptIssues(cycleHistory) {
  const issues = [];

  // Check for systematic number range violations
  const rangeViolations = cycleHistory.filter(c =>
    c.analysis.results.some(r =>
      r.assessment.issues.some(i => i.type === 'FORBIDDEN_NUMBER_RANGE')
    )
  );

  if (rangeViolations.length >= 2) {
    issues.push({
      type: 'NUMBER_RANGE_VIOLATION',
      severity: 'HIGH',
      message: 'Systematic number range violations detected',
      suggestedFix: 'Add explicit FORBIDDEN_NUMBERS list to prompt'
    });
  }

  // Check for question count issues
  const countIssues = cycleHistory.filter(c =>
    c.analysis.results.some(r =>
      r.assessment.questionCount !== config.numQuestions
    )
  );

  if (countIssues.length >= 3) {
    issues.push({
      type: 'QUESTION_COUNT_MISMATCH',
      severity: 'HIGH',
      message: 'Systematic question count issues',
      suggestedFix: 'Strengthen question count enforcement in prompt'
    });
  }

  return issues;
}
```

### 7.2 Auto-Generation

```javascript
async function generateImprovedPrompt(config, issues, currentVersion) {
  const newVersion = incrementVersion(currentVersion); // v1.0 → v1.1

  // Read current prompt
  const currentPromptPath = config.promptConfig.filePath;
  const currentPrompt = fs.readFileSync(currentPromptPath, 'utf8');

  // Generate improvements based on issues
  let improvedPrompt = currentPrompt;

  for (const issue of issues) {
    if (issue.type === 'NUMBER_RANGE_VIOLATION') {
      // Add forbidden numbers section
      improvedPrompt = addForbiddenNumbersSection(
        improvedPrompt,
        config.specificChecks.minNumber,
        config.specificChecks.maxNumber
      );
    }

    if (issue.type === 'QUESTION_COUNT_MISMATCH') {
      // Strengthen count enforcement
      improvedPrompt = strengthenQuestionCountEnforcement(
        improvedPrompt,
        config.numQuestions
      );
    }
  }

  // Save new version
  const newPromptPath = currentPromptPath.replace(
    currentVersion,
    newVersion
  );
  fs.writeFileSync(newPromptPath, improvedPrompt);

  console.log(`✅ Generated improved prompt: ${newPromptPath}`);

  return {
    version: newVersion,
    path: newPromptPath,
    changes: issues.map(i => i.suggestedFix)
  };
}
```

### 7.3 Auto-Application

```javascript
async function applyNewPromptVersion(config, newPromptVersion) {
  // Update config to use new prompt
  config.promptConfig.version = newPromptVersion.version;
  config.promptConfig.filePath = newPromptVersion.path;

  console.log(`🔄 Switching to prompt version: ${newPromptVersion.version}`);

  // Next cycle will use the new prompt automatically
  return true;
}
```

---

## 8. Multi-Cycle Improvement Loop

### 8.1 Main Loop Structure

```javascript
async function runAutonomousLoop() {
  const browser = await chromium.launch({ headless: HEADLESS });

  let productionReady = false;
  let currentCycle = 0;

  while (currentCycle < MAX_CYCLES && !productionReady) {
    currentCycle++;

    console.log(`\n${'━'.repeat(80)}`);
    console.log(`🔄 CYCLE ${currentCycle}/${MAX_CYCLES}`);
    console.log(`${'━'.repeat(80)}\n`);

    // Run 5 iterations
    const results = [];
    for (let i = 1; i <= ITERATIONS_PER_CYCLE; i++) {
      const result = await generateWorksheet(browser, currentCycle, i, config);
      if (result.success) {
        const assessment = await assessWorksheet(result, i, results);
        results.push({ ...result, assessment });
      } else {
        results.push({ ...result, assessment: null });
      }
    }

    // Analyze cycle
    const analysis = analyzeCycleResults(results, config);

    // Check production readiness
    productionReady = analysis.productionReady;

    // Store cycle data
    cycleHistory.push({
      cycle: currentCycle,
      results,
      analysis,
      timestamp: new Date().toISOString()
    });

    // Save cycle report
    saveCycleReport(currentCycle, analysis);

    if (productionReady) {
      console.log(`\n${'🎉'.repeat(40)}`);
      console.log(`✅ PRODUCTION READY ACHIEVED IN CYCLE ${currentCycle}!`);
      console.log(`${'🎉'.repeat(40)}\n`);
      break;
    }

    // Apply fixes
    if (AUTO_FIX_ENABLED && currentCycle < MAX_CYCLES) {
      const fixes = await applyAutoFixes(analysis, catalogPath, configId);
      fixesApplied.push(...fixes);

      // Check for prompt issues
      const promptIssues = detectPromptIssues(cycleHistory);
      if (promptIssues.length > 0) {
        const newPrompt = await generateImprovedPrompt(
          config,
          promptIssues,
          config.promptConfig.version
        );
        await applyNewPromptVersion(config, newPrompt);
      }
    }
  }

  await browser.close();

  // Generate final report
  const finalReport = generateFinalReport();

  return finalReport;
}
```

### 8.2 Cycle Analysis

```javascript
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
    passRate >= 0.90 &&
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
```

---

## 9. Reporting System

### 9.1 Directory Structure

```
worksheet-quality-reports/
└── autonomous-sessions/
    └── reception-number-counting-counting-to-10-2025-10-12T21-30-45-123Z/
        ├── catalog-backup.json
        ├── cycle-1-results.json
        ├── cycle-1-screenshots/
        │   ├── iter-1-01-config.png
        │   ├── iter-1-02-ready.png
        │   ├── iter-1-03-worksheet.png
        │   ├── iter-2-01-config.png
        │   └── ... (15 screenshots)
        ├── cycle-2-results.json
        ├── cycle-2-screenshots/
        │   └── ...
        ├── FINAL-REPORT.json
        └── FINAL-REPORT.md
```

### 9.2 Final Report Format

**JSON**:
```json
{
  "sessionId": "reception-number-counting-counting-to-10-2025-10-12T21-30-45-123Z",
  "configId": "reception-number-counting-counting-to-10",
  "timestamp": "2025-10-12T21:35:00.000Z",
  "totalCycles": 2,
  "productionReady": true,
  "config": { /* full config object */ },
  "cycleHistory": [
    {
      "cycle": 1,
      "analysis": {
        "passRate": 0.6,
        "p0Failures": 2,
        "avgScore": 75.4,
        "productionReady": false
      },
      "timestamp": "2025-10-12T21:30:45.000Z"
    },
    {
      "cycle": 2,
      "analysis": {
        "passRate": 1.0,
        "p0Failures": 0,
        "avgScore": 92.3,
        "productionReady": true
      },
      "timestamp": "2025-10-12T21:33:20.000Z"
    }
  ],
  "fixesApplied": [
    {
      "type": "CATALOG_PRIORITY",
      "target": "Football_Kids",
      "action": "Increased priority to 9",
      "cycle": 1
    }
  ],
  "improvement": {
    "passRateChange": "+40.0%",
    "scoreChange": "+16.9 points"
  }
}
```

**Markdown** (see section 9.3)

### 9.3 Markdown Report Template

```markdown
# Autonomous Worksheet Quality Assessment - Final Report

**Session ID**: reception-number-counting-counting-to-10-2025-10-12T21-30-45-123Z
**Config ID**: reception-number-counting-counting-to-10
**Date**: 2025-10-12T21:35:00.000Z

---

## Executive Summary

### Production Readiness: ✅ YES

### Performance Metrics
- **Total Cycles**: 2
- **Fixes Applied**: 1
- **Final Pass Rate**: 100.0%
- **Pass Rate Improvement**: +40.0%
- **Final P0 Failures**: 0
- **Final Average Score**: 92.3/100

---

## Configuration Details

- **Year Group**: Reception
- **Topic**: Number and Counting
- **Subtopic**: Counting to 10
- **Number Questions**: 5
- **Prompt Version**: v1.0

### Quality Gate Thresholds
- Overall Score: ≥85/100
- Curriculum Alignment: ≥8/10
- Presentation Quality: ≥7/10
- Content-Config Match: ≥9/10
- Image-Question Alignment: ≥9/10
- Content Freshness: ≥9/10
- Image Diversity: ≥8/10

---

## Cycle History

| Cycle | Pass Rate | P0 Failures | Avg Score | Production Ready |
|-------|-----------|-------------|-----------|------------------|
| 1 | 60.0% | 2 | 75.4/100 | ❌ |
| 2 | 100.0% | 0 | 92.3/100 | ✅ |

---

## Fixes Applied

### 1. [CATALOG_PRIORITY] Increased Football_Kids priority
- **Cycle**: 1
- **Action**: Adjusted catalog priority from 5 to 9
- **Target**: Football_Kids_by_ScrappinDoodles collection
- **Reason**: Address image-question mismatch (footballs appearing for non-football questions)

---

## Improvement Analysis

### Pass Rate Trend
- Cycle 1: 60.0%
- Cycle 2: 100.0%
- **Improvement**: +40.0 percentage points

### Quality Score Trend
- Cycle 1: 75.4/100
- Cycle 2: 92.3/100
- **Improvement**: +16.9 points

### P0 Failures
- Cycle 1: 2 failures
- Cycle 2: 0 failures
- **Resolution**: All critical issues resolved

---

## Conclusion

✅ **SUCCESS**: This configuration achieved production-ready status in 2 cycles. The system is stable and meets all quality gates.

### Key Achievements
- Zero P0 (critical) failures
- 100% pass rate achieved
- All quality dimensions above thresholds
- Catalog fixes successfully applied
- System ready for production deployment

### Recommendations
- ✅ Lock this prompt version (v1.0)
- ✅ Move to next Reception configuration
- ✅ Use catalog fixes as baseline for similar configs

---

**Report Generated**: 2025-10-12T21:35:00.000Z
**Session Directory**: M:\ClaudeCodeProjects\worksheetgenerator-ai\worksheet-quality-reports\autonomous-sessions\reception-number-counting-counting-to-10-2025-10-12T21-30-45-123Z
```

---

## 10. Implementation Checklist

### Phase 1: Core System (Priority 1)
- [ ] Config registry with Reception configs
- [ ] Command-line argument parsing
- [ ] Playwright UI automation
- [ ] 7-dimension quality assessment
- [ ] Quality gate checking
- [ ] Multi-cycle loop
- [ ] Basic reporting (JSON + Markdown)
- [ ] Screenshot capture

### Phase 2: Auto-Fix Integration (Priority 2)
- [ ] Fix Registry integration
- [ ] Catalog backup/restore
- [ ] Auto-fix application
- [ ] Fix logging and tracking

### Phase 3: Advanced Features (Priority 3)
- [ ] Claude Code vision analysis
- [ ] Prompt auto-versioning
- [ ] Vision-based assessment
- [ ] Cross-cycle analytics

### Phase 4: Documentation & Testing (Priority 4)
- [ ] Update agent .md file
- [ ] Update quickstart guide
- [ ] Test with reception-number-counting-counting-to-10
- [ ] Validate all features work end-to-end

---

## 11. Agent .md File Specification

File: `.claude/agents/worksheet-quality-assessor.md`

```markdown
---
name: worksheet-quality-assessor
description: Autonomous Playwright UI testing agent with config-aware quality assessment, auto-fix, and production readiness validation for ALL 78+ worksheet configurations
model: sonnet
color: red
---

## THE ONLY SCRIPT TO USE

**CRITICAL**: ALWAYS use this script - no exceptions:

```bash
node scripts/autonomous-worksheet-quality-agent.js <config-id> [options]
```

## Available Configurations

**Reception** (Start Here):
- `reception-number-counting-counting-to-10` ← TEST WITH THIS FIRST
- `reception-number-counting-number-recognition`

**Year 1-6**: (78+ total configs supported)
- All other configs follow same pattern

## Default Usage

```bash
# Basic (recommended for first test)
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10

# With options
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10 --max-cycles=3 --iterations=5
```

## What Happens Automatically

1. **Playwright opens visible browser** (you can watch it work!)
2. **Navigates to dashboard** → selects config options
3. **Generates 5 worksheets per cycle** (with screenshots)
4. **Assesses quality** using 7 dimensions
5. **Checks quality gates** (config-specific thresholds)
6. **Auto-fixes issues** (catalog modifications)
7. **Re-tests in next cycle** until production-ready
8. **Generates reports** (JSON + Markdown + Screenshots)

## Production Ready Criteria

✅ Pass Rate ≥90% (9/10 worksheets pass)
✅ Zero P0 (critical) failures
✅ Average score ≥85 (Reception) or ≥80 (Year 1-6)
✅ All config-specific checks pass

## Output Location

```
worksheet-quality-reports/autonomous-sessions/<session-id>/
├── FINAL-REPORT.md       ← Read this for verdict
├── FINAL-REPORT.json     ← Machine-readable data
├── catalog-backup.json   ← Pre-fix catalog state
├── cycle-1-results.json
├── cycle-1-screenshots/
│   ├── iter-1-01-config.png
│   ├── iter-1-02-ready.png
│   ├── iter-1-03-worksheet.png
│   └── ... (15 screenshots per cycle)
└── cycle-2-results.json
```

## When User Requests

**"Test reception counting to 10"** → Run:
```bash
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10
```

**"Run quality assessment for Year 1 addition"** → Run:
```bash
node scripts/autonomous-worksheet-quality-agent.js year1-addition-within-20
```

## Important Notes

- **DO NOT** use any other QA scripts
- **DO NOT** create temporary testing scripts
- **DO** wait for script to complete all cycles
- **DO** review FINAL-REPORT.md for verdict
- **DO** check screenshots if issues occur

## Prerequisites

```bash
# Ensure server is running first!
npm run dev

# Then run agent in separate terminal
```

## Documentation

- **Implementation Spec**: `docs/ENHANCED-AUTONOMOUS-AGENT-SPEC.md`
- **Quick Start**: `docs/AUTONOMOUS-AGENT-QUICKSTART.md`
- **Quality Metrics**: `docs/WORKSHEET-QUALITY-METRICS.md`

---

**Last Updated**: 2025-10-12
**Version**: 2.0
**Script**: `scripts/autonomous-worksheet-quality-agent.js`
```

---

## 12. Next Session Implementation Guide

When you start the next session, follow these steps:

### Step 1: Review This Spec
```bash
# Read the specification
cat docs/ENHANCED-AUTONOMOUS-AGENT-SPEC.md
```

### Step 2: Implement Phase 1 (Core System)
Create `scripts/autonomous-worksheet-quality-agent.js` with:
1. Config registry (Reception configs only initially)
2. CLI argument parsing
3. Playwright automation
4. 7-dimension assessment
5. Quality gates
6. Multi-cycle loop
7. Basic reporting

### Step 3: Test Phase 1
```bash
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10 --max-cycles=1
```

### Step 4: Implement Phase 2 (Auto-Fix)
Add:
1. Fix Registry integration
2. Catalog backup/restore
3. Auto-fix application

### Step 5: Test Phase 2
```bash
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10 --max-cycles=3
```

### Step 6: Implement Phase 3 (Advanced)
Add:
1. Claude vision placeholders
2. Prompt auto-versioning
3. Vision-based assessment

### Step 7: Update Documentation
1. Update `.claude/agents/worksheet-quality-assessor.md`
2. Update `docs/AUTONOMOUS-AGENT-QUICKSTART.md`
3. Update `docs/worksheet-quality-assessor.md`

### Step 8: Final Testing
```bash
# Full end-to-end test
node scripts/autonomous-worksheet-quality-agent.js reception-number-counting-counting-to-10
```

---

## 13. Key Design Decisions Summary

| Decision | Rationale |
|----------|-----------|
| **Single script** | No confusion about which script to use |
| **Config-driven** | Works for ALL 78+ configs, not just Reception |
| **Playwright visible** | User can watch and debug issues |
| **7 dimensions** | Comprehensive quality assessment |
| **Config-specific checks** | Adapts rules per year group/topic |
| **90% pass rate** | High bar for production readiness |
| **Auto-fix enabled by default** | Autonomous improvement |
| **Catalog backup** | Safety net for modifications |
| **Prompt versioning** | Systematic improvement over time |
| **Claude vision (Phase 2)** | No external API needed |

---

## 14. Success Criteria

**Phase 1 Success**:
- [ ] Script runs without errors
- [ ] Generates 5 worksheets per cycle
- [ ] Captures 15 screenshots per cycle
- [ ] Calculates all 7 quality dimensions
- [ ] Checks quality gates correctly
- [ ] Runs multi-cycle loop
- [ ] Generates FINAL-REPORT.md

**Phase 2 Success**:
- [ ] Auto-fixes catalog issues
- [ ] Backs up catalog before changes
- [ ] Applies fixes between cycles
- [ ] Logs all fixes in report

**Phase 3 Success**:
- [ ] Claude vision analysis works
- [ ] Prompt auto-versioning generates new prompts
- [ ] New prompts are applied and tested
- [ ] Vision scores integrated into overall assessment

**Final Success**:
- [ ] Works for reception-number-counting-counting-to-10
- [ ] Achieves production-ready status
- [ ] Agent .md file is clear and unambiguous
- [ ] Documentation is complete
- [ ] Ready to scale to all 78+ configs

---

**END OF SPECIFICATION**

This specification is complete and ready for implementation in the next session.
