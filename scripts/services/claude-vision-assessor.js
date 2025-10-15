#!/usr/bin/env node

/**
 * CLAUDE VISION WORKSHEET ASSESSOR
 *
 * Uses Claude's native vision capabilities to visually inspect worksheet screenshots
 * and provide accurate, ground-truth quality assessment.
 *
 * This is the KEY to self-healing quality improvement:
 * - Sees what humans see (actual rendered worksheet)
 * - Detects discrepancies between HTML count and visual count
 * - Identifies broken images (shows alt text instead of image)
 * - Validates image-question alignment visually
 * - Provides actionable feedback for prompt improvements
 *
 * WHY VISION IS CRITICAL:
 * - Text parsing may say "8 questions" but screenshot shows only 5
 * - Vision can see the root cause: answer key is being counted as questions
 * - Vision can detect broken images that passed HTML validation
 * - Vision validates the END RESULT that teachers will see
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs').promises;
const path = require('path');

class ClaudeVisionAssessor {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY
    });

    if (!this.anthropic.apiKey) {
      console.warn('⚠️ ANTHROPIC_API_KEY not set - vision assessment disabled');
      console.warn('   Set ANTHROPIC_API_KEY or CLAUDE_API_KEY environment variable');
    }
  }

  /**
   * Convert image file to base64 for Claude API
   */
  async imageToBase64(imagePath) {
    const fullPath = path.isAbsolute(imagePath)
      ? imagePath
      : path.join(process.cwd(), imagePath);

    const imageBuffer = await fs.readFile(fullPath);
    return imageBuffer.toString('base64');
  }

  /**
   * CORE VISION ASSESSMENT: Analyze worksheet screenshot with Claude
   *
   * This is the ground truth - what Claude sees is what teachers/students see
   */
  async assessWorksheetVisually(screenshotPath, config) {
    if (!this.anthropic.apiKey) {
      return {
        success: false,
        error: 'Claude API key not configured',
        assessmentSkipped: true
      };
    }

    try {
      // Read screenshot as base64
      const imageBase64 = await this.imageToBase64(screenshotPath);

      // Prepare assessment prompt based on config
      const assessmentPrompt = this.createAssessmentPrompt(config);

      // Call Claude Vision API
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: imageBase64
              }
            },
            {
              type: 'text',
              text: assessmentPrompt
            }
          ]
        }]
      });

      // Parse Claude's response
      const visionAnalysis = response.content[0].text;

      // Extract structured assessment from Claude's response
      const structuredAssessment = this.parseVisionAnalysis(visionAnalysis, config);

      return {
        success: true,
        rawAnalysis: visionAnalysis,
        ...structuredAssessment,
        screenshotPath,
        model: 'claude-3-5-sonnet',
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        screenshotPath
      };
    }
  }

  /**
   * Create comprehensive assessment prompt for Claude Vision
   */
  createAssessmentPrompt(config) {
    return `You are an expert educational quality assessor reviewing a UK Primary School worksheet for ${config.yearGroup} students.

**CRITICAL TASK**: Visually inspect this worksheet screenshot and provide ACCURATE counts based on what you SEE.

## VISUAL INSPECTION CHECKLIST:

### 1. QUESTION COUNT (CRITICAL)
- Count ONLY the main questions (numbered 1, 2, 3, etc.)
- DO NOT count:
  * Answer key sections
  * Instructions
  * Headers/footers
  * Example questions
- **Expected**: ${config.numQuestions} questions
- **Actual count you see**: _____

### 2. IMAGE VERIFICATION (CRITICAL)
For EACH question, check:
- ✅ Is there an image present?
- ✅ Does the image show actual content (not broken/alt text)?
- ✅ Does the image match the question context?

List any issues:
- "Question X: No image shown"
- "Question X: Shows alt text instead of image"
- "Question X: Image shows [object] but question asks about [different object]"

### 3. NUMBER RANGE VALIDATION
- Acceptable range: ${config.specificChecks?.minNumber || 1} to ${config.specificChecks?.maxNumber || 10}
- List any numbers OUTSIDE this range that appear in questions
- Exclude: page numbers, dates, headers

### 4. VISUAL PRESENTATION
- Font size: Readable for ${config.yearGroup}?
- Layout: Clear spacing and organization?
- Images: High quality and appropriate?
- Answer key: Present and correct?

### 5. ROOT CAUSE ANALYSIS
If you notice ANY discrepancy between:
- Number of question divs in HTML vs. visual question count
- Number of <img> tags vs. visible images
- Text says "correct" but visually looks wrong

Explain the ROOT CAUSE you observe.

## OUTPUT FORMAT (MUST BE VALID JSON):

\`\`\`json
{
  "visualQuestionCount": <actual_number_you_see>,
  "expectedQuestionCount": ${config.numQuestions},
  "questionCountMatch": <true/false>,
  "questionCountDiscrepancy": "<explanation if mismatch>",

  "images": [
    {
      "questionNumber": 1,
      "imagePresent": <true/false>,
      "imageWorking": <true/false>,
      "imageMatchesQuestion": <true/false>,
      "issue": "<description if any>",
      "objectShown": "<what you see in image>",
      "objectExpected": "<what question asks for>"
    }
  ],
  "totalImagesExpected": ${config.numQuestions},
  "totalImagesWorking": <count>,
  "brokenImages": <count>,

  "numberRangeViolations": [
    {
      "number": <number_outside_range>,
      "questionNumber": <which_question>,
      "context": "<where it appears>"
    }
  ],

  "visualQuality": {
    "fontReadable": <true/false>,
    "layoutClear": <true/false>,
    "imagesHighQuality": <true/false>,
    "ageAppropriate": <true/false>
  },

  "overallAssessment": {
    "productionReady": <true/false>,
    "score": <0-100>,
    "teacherWouldUse": <true/false>,
    "criticalIssues": ["<list of blockers>"],
    "recommendations": ["<list of improvements>"]
  },

  "rootCauseAnalysis": "<if HTML parsing shows different results than visual inspection, explain why>"
}
\`\`\`

Return ONLY the JSON, no markdown formatting or explanations outside the JSON.`;
  }

  /**
   * Parse Claude's vision analysis into structured format
   */
  parseVisionAnalysis(rawAnalysis, config) {
    try {
      // Extract JSON from response (handle markdown code blocks)
      let jsonStr = rawAnalysis;
      const jsonMatch = rawAnalysis.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }

      const parsed = JSON.parse(jsonStr);

      // Calculate vision-based scores
      const questionCountScore = parsed.questionCountMatch ? 10 : 0;
      const imageScore = parsed.totalImagesWorking === parsed.totalImagesExpected ? 10 :
                        (parsed.totalImagesWorking / parsed.totalImagesExpected) * 10;
      const numberRangeScore = parsed.numberRangeViolations.length === 0 ? 10 :
                              Math.max(0, 10 - parsed.numberRangeViolations.length * 3);
      const visualQualityScore = Object.values(parsed.visualQuality).filter(Boolean).length / 4 * 10;

      return {
        ...parsed,
        visionScores: {
          questionCount: questionCountScore,
          images: imageScore,
          numberRange: numberRangeScore,
          visualQuality: visualQualityScore,
          overall: (questionCountScore + imageScore + numberRangeScore + visualQualityScore) / 4
        }
      };

    } catch (error) {
      // Fallback: return raw analysis if JSON parsing fails
      return {
        parseError: true,
        rawAnalysis,
        error: error.message
      };
    }
  }

  /**
   * Compare vision assessment with text-based assessment
   * This reveals parsing bugs and helps self-heal the system
   */
  compareAssessments(visionAssessment, textAssessment) {
    const discrepancies = [];

    // Question count discrepancy
    if (visionAssessment.visualQuestionCount !== textAssessment.questionCount) {
      discrepancies.push({
        type: 'QUESTION_COUNT_MISMATCH',
        severity: 'CRITICAL',
        visionSays: visionAssessment.visualQuestionCount,
        textParsingSays: textAssessment.questionCount,
        rootCause: visionAssessment.questionCountDiscrepancy ||
                  'Text parser may be counting answer keys or non-question elements',
        fix: 'Update text parser to exclude answer key sections from question count'
      });
    }

    // Image discrepancy
    const textImageCount = textAssessment.images?.filter(img => img.visible).length || 0;
    if (visionAssessment.totalImagesWorking !== textImageCount) {
      discrepancies.push({
        type: 'IMAGE_COUNT_MISMATCH',
        severity: 'HIGH',
        visionSays: visionAssessment.totalImagesWorking,
        textParsingSays: textImageCount,
        rootCause: 'Text parser reports images as "visible" but they show alt text or broken links',
        fix: 'Enhance image validation to actually load images and verify rendering'
      });
    }

    // Number range violations
    if (visionAssessment.numberRangeViolations.length > 0 &&
        textAssessment.numbers?.length > 0) {
      const textViolations = textAssessment.numbers.filter(n =>
        n < textAssessment.config.specificChecks.minNumber ||
        n > textAssessment.config.specificChecks.maxNumber
      );

      if (visionAssessment.numberRangeViolations.length !== textViolations.length) {
        discrepancies.push({
          type: 'NUMBER_EXTRACTION_MISMATCH',
          severity: 'MEDIUM',
          visionSays: visionAssessment.numberRangeViolations,
          textParsingSays: textViolations,
          rootCause: 'Text parser extracting numbers from CSS, metadata, or non-question content',
          fix: 'Update number extraction to only parse question text, not HTML/CSS'
        });
      }
    }

    return {
      hasDiscrepancies: discrepancies.length > 0,
      discrepancies,
      systemHealthScore: discrepancies.length === 0 ? 100 :
                        Math.max(0, 100 - discrepancies.length * 20),
      recommendation: discrepancies.length === 0
        ? 'Text parser and vision assessment agree - system is accurate'
        : 'Text parser has bugs - vision reveals ground truth'
    };
  }

  /**
   * Generate self-healing fixes based on vision feedback
   */
  generateSelfHealingPlan(visionAssessment, discrepancyAnalysis) {
    const fixes = [];

    for (const discrepancy of discrepancyAnalysis.discrepancies) {
      switch (discrepancy.type) {
        case 'QUESTION_COUNT_MISMATCH':
          fixes.push({
            priority: 10,
            type: 'CODE_FIX',
            file: 'scripts/autonomous-worksheet-quality-agent.js',
            function: 'extractContent',
            issue: 'Counting answer keys as questions',
            fix: 'Exclude elements with class="answer-key" from question count',
            code: `
// Before: counts all elements matching /\\d+[.\\)]\\s*.+/g
const questions = (text.match(/\\d+[\\.\\)]\\s*.+/g) || []);

// After: count only .question divs
const questions = await page.locator('.worksheet .question').all();
const questionTexts = await Promise.all(questions.map(q => q.textContent()));
`,
            automated: true,
            estimatedTime: '10 minutes'
          });
          break;

        case 'IMAGE_COUNT_MISMATCH':
          fixes.push({
            priority: 9,
            type: 'CODE_FIX',
            file: 'scripts/autonomous-worksheet-quality-agent.js',
            function: 'extractContent',
            issue: 'Reporting broken images as "visible"',
            fix: 'Add actual image loading verification',
            code: `
// After getting images, verify they actually loaded
const images = await Promise.all(
  imageElements.map(async img => {
    const src = await img.getAttribute('src') || '';
    const alt = await img.getAttribute('alt') || '';
    const visible = await img.isVisible();

    // NEW: Check if image actually rendered (not just alt text)
    const actuallyLoaded = await img.evaluate(el => {
      return el.complete && el.naturalHeight !== 0;
    });

    return { src, alt, visible: visible && actuallyLoaded };
  })
);
`,
            automated: true,
            estimatedTime: '15 minutes'
          });
          break;

        case 'NUMBER_EXTRACTION_MISMATCH':
          fixes.push({
            priority: 8,
            type: 'CODE_FIX',
            file: 'scripts/autonomous-worksheet-quality-agent.js',
            function: 'extractNumbers',
            issue: 'Extracting numbers from CSS and metadata',
            fix: 'Only extract numbers from .question elements, not entire HTML',
            code: `
// Before: extracts from entire page text
function extractNumbers(text) {
  const numbers = [];
  const numberPattern = /\\b(\\d+)\\b/g;
  // ... extracts from ALL text including CSS

// After: extract only from question content
async function extractNumbers(page) {
  const questionElements = await page.locator('.worksheet .question').all();
  const numbers = [];

  for (const question of questionElements) {
    const text = await question.textContent();
    const matches = text.matchAll(/\\b(\\d+)\\b/g);
    for (const match of matches) {
      numbers.push(parseInt(match[1], 10));
    }
  }
  return numbers;
}
`,
            automated: true,
            estimatedTime: '15 minutes'
          });
          break;
      }
    }

    // Add prompt improvement if needed
    if (!visionAssessment.overallAssessment.productionReady) {
      fixes.push({
        priority: 7,
        type: 'PROMPT_IMPROVEMENT',
        file: visionAssessment.config?.promptConfig?.filePath,
        issue: visionAssessment.overallAssessment.criticalIssues.join(', '),
        recommendations: visionAssessment.overallAssessment.recommendations,
        automated: false,
        estimatedTime: '30 minutes',
        requiresHumanReview: true
      });
    }

    return {
      totalFixes: fixes.length,
      automatedFixes: fixes.filter(f => f.automated).length,
      manualFixes: fixes.filter(f => !f.automated).length,
      estimatedTotalTime: fixes.reduce((sum, f) => {
        const minutes = parseInt(f.estimatedTime) || 30;
        return sum + minutes;
      }, 0),
      fixes: fixes.sort((a, b) => b.priority - a.priority)
    };
  }
}

// Export singleton
module.exports = new ClaudeVisionAssessor();
