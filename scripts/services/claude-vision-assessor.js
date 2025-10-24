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
    return `You are an EXPERT PRIMARY SCHOOL TEACHER with 15+ years of experience teaching UK National Curriculum mathematics to ${config.yearGroup} students (ages 4-11). You specialize in curriculum design, pedagogical assessment, and creating age-appropriate learning materials.

**YOUR TASK**: Conduct a comprehensive pedagogical assessment of this worksheet screenshot using professional teacher expertise.

## ASSESSMENT FRAMEWORK (UK CURRICULUM STANDARDS)

### 1. QUESTION-IMAGE COHERENCE & QUALITY (CRITICAL - 30 points)

**Mathematical Reasoning & Logic:**
- Does each question make LOGICAL SENSE mathematically?
- Are the images DIRECTLY RELATED to the question text?
- Do images provide appropriate VISUAL SUPPORT for mathematical understanding?
- Is there semantic alignment between question wording and visual representation?

**Image Quality & Appropriateness:**
- Are images high-quality, clear, and age-appropriate?
- Do images accurately represent the mathematical concepts?
- Are images culturally appropriate and inclusive?
- Are images at correct scale/size for visual discrimination (especially for ages 4-5)?

**Check for each question:**
- ✅ Question text is mathematically logical and correct
- ✅ Images match the question context perfectly
- ✅ Images show actual content (not broken/alt text/placeholder)
- ✅ Visual-textual coherence supports learning
- ✅ No confusing or misleading visual representations

**Red Flags:**
- Image shows apples but question asks about oranges
- Question asks to count cars, image shows indistinct blobs
- Mathematical operation doesn't make sense (e.g., "subtract 5 from 2" for Reception)
- Images are too similar to distinguish (e.g., size comparison where objects look identical)

### 2. CURRICULUM ALIGNMENT & AGE-APPROPRIATENESS (CRITICAL - 35 points)

**Language & Readability (${config.yearGroup} level):**
- Is vocabulary appropriate for ${config.yearGroup} (ages ${this.getAgeRange(config.yearGroup)})?
- Are sentences SHORT and SIMPLE for this age group?
- Is mathematical terminology correct and age-appropriate?
- Can children at this level READ and UNDERSTAND the questions independently?

**Curriculum Standards:**
- Does content align with UK National Curriculum for ${config.yearGroup}?
- Are "ready-to-progress" criteria being addressed?
- Is the mathematical progression developmentally appropriate?
- Number range: ${config.specificChecks?.minNumber || 1} to ${config.specificChecks?.maxNumber || 10} (check ALL questions)

**Cognitive Load:**
- Is the complexity suitable for ${config.yearGroup} cognitive development?
- Are there too many steps/operations for this age group?
- Is the worksheet scaffolded appropriately (easier → harder)?

**Age-Specific Checks for ${config.yearGroup}:**
${this.getAgeSpecificCriteria(config)}

### 3. QUESTION TYPES & PRESENTATION QUALITY (25 points)

**Question Variety & Pedagogical Value:**
- Is there good variety in question types (counting, comparison, word problems)?
- Do questions build mathematical reasoning skills?
- Are questions open-ended or too prescriptive?
- Do questions encourage problem-solving or just rote recall?

**Visual Presentation & Layout:**
- Font size: Large enough for ${config.yearGroup} to read easily?
- Spacing: Adequate white space between questions?
- Layout: Clear visual hierarchy and organization?
- Colors: Appropriate contrast and not overwhelming?
- Answer spaces: Clearly marked and appropriately sized?

**Accessibility & Inclusivity:**
- Can all children access the content (visual impairments, dyslexia)?
- Are instructions clear and unambiguous?
- Is the worksheet visually appealing and engaging for young learners?

### 4. TECHNICAL ACCURACY (10 points)

**Question Count Verification:**
- Count ONLY main questions (numbered 1, 2, 3, etc.)
- DO NOT count: Answer key, instructions, headers, examples
- **Expected**: ${config.numQuestions} questions
- **Actual count you see**: _____

**Answer Key:**
- Is answer key present and correct?
- Are answers mathematically accurate?
- Is answer key clearly separated from questions?

### 5. ROOT CAUSE ANALYSIS (If Issues Found)
If you notice problems, diagnose the ROOT CAUSE:
- Is it a content generation issue (wrong objects selected)?
- Is it a layout/CSS problem (spacing, sizing)?
- Is it a pedagogical error (inappropriate for age group)?
- Is it a technical failure (broken images, wrong count)?

## OUTPUT FORMAT (MUST BE VALID JSON):

\`\`\`json
{
  "visualQuestionCount": <actual_number_you_see>,
  "expectedQuestionCount": ${config.numQuestions},
  "questionCountMatch": <true/false>,
  "questionCountDiscrepancy": "<explanation if mismatch>",

  "questionImageCoherence": {
    "score": <0-30 points>,
    "issues": ["<list specific issues per question>"],
    "strengths": ["<what works well>"],
    "details": [
      {
        "questionNumber": 1,
        "logicallyCorrect": <true/false>,
        "imageMatchesText": <true/false>,
        "imageQuality": "<high/medium/low>",
        "semanticAlignment": <true/false>,
        "issue": "<specific issue if any>",
        "objectShown": "<what you see>",
        "objectExpected": "<what question asks for>"
      }
    ]
  },

  "curriculumAlignment": {
    "score": <0-35 points>,
    "issues": ["<list curriculum/age-appropriateness issues>"],
    "strengths": ["<curriculum alignment strengths>"],
    "languageAppropriate": <true/false>,
    "vocabularyLevel": "<too simple/appropriate/too complex>",
    "readabilityForAgeGroup": <true/false>,
    "curriculumStandards": "<aligned/partially aligned/not aligned>",
    "cognitiveLoadAppropriate": <true/false>,
    "numberRangeViolations": [
      {
        "number": <number_outside_range>,
        "questionNumber": <which_question>,
        "severity": "<critical/moderate/minor>"
      }
    ]
  },

  "questionQualityPresentation": {
    "score": <0-25 points>,
    "issues": ["<presentation and quality issues>"],
    "strengths": ["<presentation strengths>"],
    "questionVariety": "<good/adequate/poor>",
    "pedagogicalValue": "<high/medium/low>",
    "visualPresentation": {
      "fontReadable": <true/false>,
      "spacingAdequate": <true/false>,
      "layoutClear": <true/false>,
      "colorsAppropriate": <true/false>,
      "visuallyEngaging": <true/false>
    },
    "accessibility": "<excellent/good/needs improvement>"
  },

  "technicalAccuracy": {
    "score": <0-10 points>,
    "totalImagesExpected": ${config.numQuestions},
    "totalImagesWorking": <count>,
    "brokenImages": <count>,
    "answerKeyPresent": <true/false>,
    "answerKeyCorrect": <true/false>,
    "technicalIssues": ["<list any technical problems>"]
  },

  "overallAssessment": {
    "totalScore": <0-100 (sum of all section scores)>,
    "productionReady": <true/false>,
    "teacherWouldUse": <true/false>,
    "criticalIssues": ["<blockers that prevent use in classroom>"],
    "recommendations": ["<specific improvements needed>"],
    "pedagogicalSummary": "<1-2 sentence expert teacher assessment>"
  },

  "rootCauseAnalysis": "<if issues found, diagnose the root cause: content generation, layout, pedagogy, or technical>"
}
\`\`\`

**SCORING GUIDANCE:**
- Question-Image Coherence: 0-30 points (deduct for mismatches, poor quality, illogical questions)
- Curriculum Alignment: 0-35 points (deduct for inappropriate language, wrong difficulty, curriculum mismatch)
- Question Quality & Presentation: 0-25 points (deduct for poor variety, bad layout, poor pedagogy)
- Technical Accuracy: 0-10 points (deduct for broken images, wrong count, missing answer key)

**PRODUCTION READY** = totalScore >= 85 AND no critical issues

Return ONLY the JSON, no markdown formatting or explanations outside the JSON.`;
  }

  /**
   * Get age range for year group
   */
  getAgeRange(yearGroup) {
    const ageRanges = {
      'Reception': '4-5',
      'Year 1': '5-6',
      'Year 2': '6-7',
      'Year 3': '7-8',
      'Year 4': '8-9',
      'Year 5': '9-10',
      'Year 6': '10-11'
    };
    return ageRanges[yearGroup] || '4-11';
  }

  /**
   * Get age-specific assessment criteria
   */
  getAgeSpecificCriteria(config) {
    const yearGroup = config.yearGroup;

    if (yearGroup === 'Reception') {
      return `- **Ages 4-5**: Concrete visual support ESSENTIAL for every question
- Maximum 1-2 operations per question
- Real-world contexts children can relate to (home, playground, pets)
- Large, bold fonts (minimum 16pt)
- Bright, engaging visuals
- Very simple sentence structure (max 8 words)
- Numbers 0-10 only (no larger numbers)
- Focus on: counting, recognition, more/less, basic shapes`;
    } else if (yearGroup === 'Year 1') {
      return `- **Ages 5-6**: Visual support highly recommended
- Can handle 2-step problems with support
- Number bonds to 10, counting to 20
- Introduction to simple addition/subtraction
- Font size 14-16pt
- Can read simple instructions with support`;
    } else if (yearGroup === 'Year 2') {
      return `- **Ages 6-7**: Visual support still beneficial
- Can work with numbers to 100
- 2-step problems appropriate
- Introduction to multiplication (2, 5, 10 tables)
- Can read independently with some support
- Font size 12-14pt`;
    } else {
      return `- **Ages ${this.getAgeRange(yearGroup)}**: Check curriculum progression for ${yearGroup}
- Ensure mathematical concepts match year group objectives
- Language should be age-appropriate and curriculum-aligned`;
    }
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

      // Extract scores from new comprehensive format
      const questionImageScore = parsed.questionImageCoherence?.score || 0;
      const curriculumScore = parsed.curriculumAlignment?.score || 0;
      const presentationScore = parsed.questionQualityPresentation?.score || 0;
      const technicalScore = parsed.technicalAccuracy?.score || 0;
      const totalScore = parsed.overallAssessment?.totalScore ||
                        (questionImageScore + curriculumScore + presentationScore + technicalScore);

      // Backward compatibility: map new structure to old fields for existing code
      const legacyMapping = {
        visualQuestionCount: parsed.visualQuestionCount,
        expectedQuestionCount: parsed.expectedQuestionCount,
        questionCountMatch: parsed.questionCountMatch,
        totalImagesWorking: parsed.technicalAccuracy?.totalImagesWorking || 0,
        totalImagesExpected: parsed.technicalAccuracy?.totalImagesExpected || 0,
        brokenImagesCount: parsed.technicalAccuracy?.brokenImages || 0,
        imageMismatchCount: parsed.questionImageCoherence?.details?.filter(d => !d.imageMatchesText).length || 0,
        numberRangeViolations: parsed.curriculumAlignment?.numberRangeViolations || [],

        // New comprehensive fields
        questionImageCoherence: parsed.questionImageCoherence,
        curriculumAlignment: parsed.curriculumAlignment,
        questionQualityPresentation: parsed.questionQualityPresentation,
        technicalAccuracy: parsed.technicalAccuracy,

        // Overall assessment with new scoring
        overallAssessment: {
          score: totalScore,
          productionReady: parsed.overallAssessment?.productionReady || false,
          teacherWouldUse: parsed.overallAssessment?.teacherWouldUse || false,
          criticalIssues: parsed.overallAssessment?.criticalIssues || [],
          recommendations: parsed.overallAssessment?.recommendations || [],
          pedagogicalSummary: parsed.overallAssessment?.pedagogicalSummary || ''
        },

        // Detailed scoring breakdown
        comprehensiveScores: {
          questionImageCoherence: questionImageScore,
          curriculumAlignment: curriculumScore,
          questionQualityPresentation: presentationScore,
          technicalAccuracy: technicalScore,
          total: totalScore
        },

        rootCauseAnalysis: parsed.rootCauseAnalysis || ''
      };

      return {
        ...parsed,
        ...legacyMapping
      };

    } catch (error) {
      // Fallback: return raw analysis if JSON parsing fails
      return {
        parseError: true,
        rawAnalysis,
        error: error.message,
        overallAssessment: {
          score: 0,
          productionReady: false,
          teacherWouldUse: false,
          criticalIssues: [`JSON Parse Error: ${error.message}`],
          recommendations: ['Fix JSON response format'],
          pedagogicalSummary: 'Assessment failed due to technical error'
        }
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
