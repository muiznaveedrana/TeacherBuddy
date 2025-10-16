#!/usr/bin/env node

/**
 * CLAUDE CODE VISION ASSESSOR
 *
 * Uses Claude Code's built-in vision capabilities (Task agent) to analyze worksheet screenshots.
 * This runs during development in Claude Code - no API keys needed!
 *
 * HOW IT WORKS:
 * 1. After each worksheet is generated, save the assessment task to a JSON file
 * 2. Claude Code (the assistant) reads the task file and uses its vision to analyze the screenshot
 * 3. Claude Code writes the assessment results back to a JSON file
 * 4. The agent reads the results and continues with the next iteration
 *
 * This is a "human-in-the-loop" system where Claude Code provides the vision intelligence.
 */

const fs = require('fs').promises;
const path = require('path');

class ClaudeCodeVisionAssessor {
  constructor(sessionDir) {
    this.sessionDir = sessionDir;
    this.visionTasksDir = path.join(sessionDir, 'vision-tasks');
    this.visionResultsDir = path.join(sessionDir, 'vision-results');
  }

  /**
   * Initialize directories for vision tasks
   */
  async initialize() {
    await fs.mkdir(this.visionTasksDir, { recursive: true });
    await fs.mkdir(this.visionResultsDir, { recursive: true });
  }

  /**
   * Create a vision assessment task for Claude Code to execute
   */
  async createVisionTask(screenshotPath, config, iterationNum, cycleNum) {
    const taskId = `cycle-${cycleNum}-iter-${iterationNum}`;

    const task = {
      taskId,
      cycleNum,
      iterationNum,
      screenshotPath,
      screenshotFullPath: path.isAbsolute(screenshotPath)
        ? screenshotPath
        : path.join(process.cwd(), screenshotPath),
      config: {
        yearGroup: config.yearGroup,
        topic: config.topic,
        subtopic: config.subtopic,
        expectedQuestions: config.numQuestions,
        numberRange: {
          min: config.specificChecks?.minNumber || 1,
          max: config.specificChecks?.maxNumber || 10
        }
      },
      instructions: this.createVisionInstructions(config),
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    const taskPath = path.join(this.visionTasksDir, `${taskId}.json`);
    await fs.writeFile(taskPath, JSON.stringify(task, null, 2));

    return {
      taskId,
      taskPath,
      task
    };
  }

  /**
   * Create detailed instructions for Claude Code's vision assessment
   */
  createVisionInstructions(config) {
    return `
# VISION ASSESSMENT TASK

You are reviewing a worksheet screenshot for ${config.yearGroup} students.

## INSTRUCTIONS:

1. **READ THE IMAGE**: Open and view the screenshot using your vision capabilities

2. **COUNT QUESTIONS**: Count ONLY the numbered questions (1, 2, 3, etc.)
   - Expected: ${config.numQuestions} questions
   - DO NOT count: Answer keys, headers, instructions

3. **VERIFY IMAGES**: For each question, check:
   - Is there an image present?
   - Does it show actual content (not broken/alt text)?
   - Does it match the question text?
   - Count how many images per question

4. **CHECK NUMBERS**: List any numbers OUTSIDE the range ${config.specificChecks?.minNumber || 1}-${config.specificChecks?.maxNumber || 10}
   - Only count numbers IN QUESTIONS, not page numbers or CSS
   - Check answer key numbers too

5. **CURRICULUM ALIGNMENT** (${config.yearGroup} - ${config.topic}):
   - Are numbers appropriate for ${config.yearGroup}? (Range: ${config.specificChecks?.minNumber || 1}-${config.specificChecks?.maxNumber || 10})
   - Is language simple enough for ${config.yearGroup}?
   - Are contexts real-world and age-appropriate?
   - Does it match "${config.subtopic}" topic?
   - Visual support adequate for age group?

6. **CONTENT QUALITY**:
   - Questions clear and unambiguous?
   - Each question uses ONE object type (no mixing)?
   - Images diverse across questions?
   - Answer key correct?

7. **PRESENTATION QUALITY**:
   - Font readable for ${config.yearGroup}?
   - Layout clear and organized?
   - Images high quality?
   - Spacing appropriate?

## OUTPUT (Save as vision-results/[taskId].json):

\`\`\`json
{
  "taskId": "[taskId]",
  "visualQuestionCount": <number_you_counted>,
  "questionCountMatch": <true/false>,
  "questionCountIssue": "<explain if mismatch>",

  "images": [
    {
      "questionNumber": 1,
      "imagePresent": <true/false>,
      "imageWorking": <true/false>,
      "imageMatches": <true/false>,
      "imageCount": <number>,
      "issue": "<any problem>",
      "objectSeen": "<what you see in images>",
      "questionText": "<actual question text>"
    }
  ],
  "brokenImagesCount": <number>,
  "imageMismatchCount": <number>,

  "numberViolations": [
    {"number": <num>, "questionNum": <q>, "context": "<where>"}
  ],

  "curriculumAlignment": {
    "score": <0-10>,
    "numbersAppropriate": <true/false>,
    "languageAppropriate": <true/false>,
    "contextsRealWorld": <true/false>,
    "topicMatch": <true/false>,
    "visualSupportAdequate": <true/false>,
    "issues": ["<list any issues>"]
  },

  "contentQuality": {
    "score": <0-10>,
    "questionsClean": <true/false>,
    "singleObjectPerQuestion": <true/false>,
    "imageDiversity": <true/false>,
    "answerKeyCorrect": <true/false>,
    "issues": ["<list any issues>"]
  },

  "presentationQuality": {
    "score": <0-10>,
    "fontReadable": <true/false>,
    "layoutClear": <true/false>,
    "imagesHighQuality": <true/false>,
    "spacingAppropriate": <true/false>,
    "issues": ["<list any issues>"]
  },

  "overallScore": <0-100>,
  "productionReady": <true/false>,
  "criticalIssues": ["<P0 blockers>"],
  "recommendations": ["<improvements>"],

  "rootCauseAnalysis": "<if something looks wrong, explain why>",

  "assessedAt": "<timestamp>",
  "assessedBy": "claude-code-vision"
}
\`\`\`

## SCORING GUIDE:
- **Production Ready = true** if:
  - Question count matches expected
  - 0 broken images
  - 0 number violations
  - All scores ≥7/10
  - 0 critical issues
`;
  }

  /**
   * Check if vision assessment is complete for a task
   */
  async isAssessmentComplete(taskId) {
    const resultPath = path.join(this.visionResultsDir, `${taskId}.json`);
    try {
      await fs.access(resultPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Read vision assessment results
   */
  async readAssessmentResult(taskId) {
    const resultPath = path.join(this.visionResultsDir, `${taskId}.json`);
    try {
      const content = await fs.readFile(resultPath, 'utf-8');
      return {
        success: true,
        result: JSON.parse(content)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Wait for Claude Code to complete vision assessment
   * (In practice, the agent will pause and prompt user)
   */
  async waitForAssessment(taskId, timeoutSeconds = 300) {
    const startTime = Date.now();
    const timeoutMs = timeoutSeconds * 1000;

    while (Date.now() - startTime < timeoutMs) {
      if (await this.isAssessmentComplete(taskId)) {
        return await this.readAssessmentResult(taskId);
      }
      await new Promise(resolve => setTimeout(resolve, 2000)); // Check every 2 seconds
    }

    return {
      success: false,
      error: 'Vision assessment timeout',
      timeout: true
    };
  }

  /**
   * Get all pending vision tasks
   */
  async getPendingTasks() {
    const taskFiles = await fs.readdir(this.visionTasksDir);
    const pending = [];

    for (const file of taskFiles) {
      if (!file.endsWith('.json')) continue;

      const taskId = file.replace('.json', '');
      const isComplete = await this.isAssessmentComplete(taskId);

      if (!isComplete) {
        const taskPath = path.join(this.visionTasksDir, file);
        const content = await fs.readFile(taskPath, 'utf-8');
        const task = JSON.parse(content);
        pending.push({ taskId, task, taskPath });
      }
    }

    return pending;
  }

  /**
   * Compare vision assessment with text-based assessment
   */
  compareAssessments(visionResult, textAssessment) {
    if (!visionResult.success) {
      return {
        hasDiscrepancies: false,
        discrepancies: [],
        error: 'Vision assessment failed or incomplete'
      };
    }

    const vision = visionResult.result;
    const discrepancies = [];

    // Question count discrepancy
    if (vision.visualQuestionCount !== textAssessment.questionCount) {
      discrepancies.push({
        type: 'QUESTION_COUNT_MISMATCH',
        severity: 'CRITICAL',
        visionSees: vision.visualQuestionCount,
        textParserSays: textAssessment.questionCount,
        difference: Math.abs(vision.visualQuestionCount - textAssessment.questionCount),
        rootCause: vision.questionCountIssue ||
          'Text parser may be counting answer keys, headers, or CSS elements as questions',
        fix: 'Update extractContent() to count only .question elements, exclude .answer-key sections',
        automated: true,
        priority: 10
      });
    }

    // Image discrepancy
    const visionWorkingImages = vision.images?.filter(img => img.imageWorking).length || 0;
    const textVisibleImages = textAssessment.images?.filter(img => img.visible).length || 0;

    if (visionWorkingImages !== textVisibleImages) {
      discrepancies.push({
        type: 'IMAGE_COUNT_MISMATCH',
        severity: 'HIGH',
        visionSees: visionWorkingImages,
        textParserSays: textVisibleImages,
        difference: Math.abs(visionWorkingImages - textVisibleImages),
        rootCause: 'Images reported as "visible" by isVisible() but actually show alt text or broken',
        fix: 'Add img.evaluate(el => el.complete && el.naturalHeight !== 0) to verify actual rendering',
        automated: true,
        priority: 9
      });
    }

    // Number violations discrepancy
    const visionViolations = vision.numberViolations?.length || 0;
    const textViolations = textAssessment.numbers?.filter(n =>
      n < textAssessment.config.specificChecks.minNumber ||
      n > textAssessment.config.specificChecks.maxNumber
    ).length || 0;

    if (visionViolations !== textViolations && textViolations > visionViolations) {
      discrepancies.push({
        type: 'FALSE_NUMBER_VIOLATIONS',
        severity: 'MEDIUM',
        visionSees: visionViolations,
        textParserSays: textViolations,
        difference: textViolations - visionViolations,
        rootCause: 'Text parser extracting numbers from CSS (line-height, font-size) or metadata',
        fix: 'Update extractNumbers() to only parse text from .question elements, not entire HTML',
        automated: true,
        priority: 8
      });
    }

    const systemHealth = discrepancies.length === 0 ? 100 :
      Math.max(0, 100 - (discrepancies.length * 15));

    return {
      hasDiscrepancies: discrepancies.length > 0,
      discrepancies,
      systemHealthScore: systemHealth,
      recommendation: discrepancies.length === 0
        ? '✅ Text parser and vision agree - system is accurate'
        : `⚠️ ${discrepancies.length} discrepancy(ies) detected - text parser has bugs that vision reveals`
    };
  }

  /**
   * Generate self-healing plan from discrepancies
   */
  generateSelfHealingPlan(discrepancies, visionResults) {
    const fixes = [];
    const seenTypes = new Set();

    // Generate unique fixes based on discrepancy types
    for (const disc of discrepancies) {
      if (seenTypes.has(disc.type)) continue;
      seenTypes.add(disc.type);

      fixes.push({
        priority: disc.priority,
        type: 'CODE_FIX',
        issueType: disc.type,
        severity: disc.severity,
        issue: disc.rootCause,
        fix: disc.fix,
        automated: disc.automated,
        file: 'scripts/autonomous-worksheet-quality-agent.js',
        evidence: {
          visionSees: disc.visionSees,
          textParserSays: disc.textParserSays,
          difference: disc.difference
        }
      });
    }

    // Add prompt improvements if worksheets aren't production-ready
    const notReadyCount = visionResults.filter(v =>
      v.success && !v.result.productionReady
    ).length;

    if (notReadyCount > 0) {
      const criticalIssues = visionResults
        .filter(v => v.success && v.result.criticalIssues)
        .flatMap(v => v.result.criticalIssues);

      if (criticalIssues.length > 0) {
        fixes.push({
          priority: 7,
          type: 'PROMPT_IMPROVEMENT',
          issue: `${notReadyCount} worksheets not production-ready`,
          criticalIssues: [...new Set(criticalIssues)],
          fix: 'Generate prompt improvements based on visual feedback',
          automated: false,
          requiresHumanReview: true
        });
      }
    }

    return {
      totalFixes: fixes.length,
      automatedFixes: fixes.filter(f => f.automated).length,
      manualFixes: fixes.filter(f => !f.automated).length,
      fixes: fixes.sort((a, b) => b.priority - a.priority)
    };
  }

  /**
   * Create a consolidated vision assessment report for Claude Code
   */
  async createConsolidatedReport(cycleNum) {
    const taskFiles = await fs.readdir(this.visionTasksDir);
    const cycleTasks = taskFiles.filter(f =>
      f.startsWith(`cycle-${cycleNum}-`) && f.endsWith('.json')
    );

    const report = {
      cycleNum,
      totalIterations: cycleTasks.length,
      completedAssessments: 0,
      pendingAssessments: 0,
      visionResults: [],
      textAssessments: [],
      discrepancies: [],
      overallSystemHealth: 0
    };

    for (const taskFile of cycleTasks) {
      const taskId = taskFile.replace('.json', '');
      const isComplete = await this.isAssessmentComplete(taskId);

      if (isComplete) {
        const result = await this.readAssessmentResult(taskId);
        if (result.success) {
          report.completedAssessments++;
          report.visionResults.push(result.result);
        }
      } else {
        report.pendingAssessments++;
      }
    }

    // Calculate overall system health
    if (report.visionResults.length > 0) {
      const avgScore = report.visionResults.reduce((sum, r) =>
        sum + (r.overallScore || 0), 0) / report.visionResults.length;

      const productionReadyCount = report.visionResults.filter(r =>
        r.productionReady).length;

      report.visionPassRate = productionReadyCount / report.visionResults.length;
      report.avgVisionScore = avgScore;
    }

    const reportPath = path.join(this.sessionDir, `vision-cycle-${cycleNum}-report.json`);
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    return report;
  }
}

module.exports = ClaudeCodeVisionAssessor;
