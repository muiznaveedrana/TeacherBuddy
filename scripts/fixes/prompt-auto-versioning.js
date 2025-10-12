#!/usr/bin/env node

/**
 * Prompt Auto-Versioning System
 *
 * Automatically creates improved prompt versions based on detected quality issues
 * Requires human approval before deployment
 */

const fs = require('fs').promises;
const path = require('path');

class PromptAutoVersioning {
  constructor() {
    this.promptsDir = path.join(process.cwd(), 'prompts', 'config-specific');
    this.suggestionsDir = path.join(process.cwd(), 'prompt-suggestions');
  }

  /**
   * Analyze assessment results and generate prompt improvement suggestions
   */
  async analyzeFailed Assessment(assessmentResult, configId, currentVersion) {
    const issues = this.detectIssues(assessmentResult);

    if (issues.length === 0) {
      return null;
    }

    const suggestions = await this.generateSuggestions(issues, configId, currentVersion);
    return suggestions;
  }

  /**
   * Detect specific issues from assessment result
   */
  detectIssues(assessmentResult) {
    const issues = [];
    const text = assessmentResult.rawText;

    // Issue 1: Question count mismatch
    const questionCountMatch = text.match(/question count.*?expected (\d+).*?got (\d+)/i);
    if (questionCountMatch) {
      issues.push({
        type: 'QUESTION_COUNT_MISMATCH',
        severity: 'P0',
        expected: parseInt(questionCountMatch[1]),
        actual: parseInt(questionCountMatch[2]),
        description: `Expected ${questionCountMatch[1]} questions, got ${questionCountMatch[2]}`
      });
    }

    // Issue 2: Numbers out of range
    const numbersMatch = text.match(/numbers beyond range.*?([\d\-, ]+)/i);
    if (numbersMatch) {
      issues.push({
        type: 'NUMBERS_OUT_OF_RANGE',
        severity: 'P0',
        numbers: numbersMatch[1],
        description: `Numbers exceed allowed range: ${numbersMatch[1]}`
      });
    }

    // Issue 3: Multiple object types
    if (text.toLowerCase().includes('multiple object types')) {
      issues.push({
        type: 'MULTIPLE_OBJECT_TYPES',
        severity: 'P1',
        description: 'Multiple object types in single question detected'
      });
    }

    // Issue 4: Complex language
    if (text.toLowerCase().includes('language.*?complex') ||
        text.toLowerCase().includes('complexity')) {
      issues.push({
        type: 'LANGUAGE_COMPLEXITY',
        severity: 'P2',
        description: 'Language may be too complex for age group'
      });
    }

    // Issue 5: Missing visual support
    if (text.toLowerCase().includes('no images') ||
        text.toLowerCase().includes('missing.*?visual')) {
      issues.push({
        type: 'MISSING_VISUAL_SUPPORT',
        severity: 'P1',
        description: 'Visual support missing or insufficient'
      });
    }

    return issues;
  }

  /**
   * Generate improvement suggestions for each issue
   */
  async generateSuggestions(issues, configId, currentVersion) {
    const suggestions = {
      configId,
      currentVersion,
      nextVersion: this.calculateNextVersion(currentVersion),
      issues,
      improvements: [],
      timestamp: new Date().toISOString()
    };

    for (const issue of issues) {
      switch (issue.type) {
        case 'QUESTION_COUNT_MISMATCH':
          suggestions.improvements.push({
            issueType: issue.type,
            severity: issue.severity,
            changes: [
              {
                section: 'ABSOLUTE REQUIREMENT #1',
                action: 'AMPLIFY',
                before: `**ABSOLUTE REQUIREMENT #1: EXACTLY ${issue.expected} QUESTIONS**`,
                after: `**🚨🚨🚨 ABSOLUTE REQUIREMENT #1: EXACTLY ${issue.expected} QUESTIONS 🚨🚨🚨**\n- YOU GENERATED ${issue.actual} QUESTIONS LAST TIME - THIS IS WRONG!\n- COUNT THEM OUT LOUD: ${Array.from({length: issue.expected}, (_, i) => (i+1).toString()).join(', ')}\n- AFTER QUESTION #${issue.expected}, YOU MUST STOP IMMEDIATELY!\n- DO NOT GENERATE QUESTION #${issue.expected + 1}!`
              },
              {
                section: 'End of prompt',
                action: 'ADD',
                after: `\n\n**FINAL VERIFICATION BEFORE SUBMITTING:**\n✅ Count your questions: Do you see EXACTLY ${issue.expected} question numbers?\n✅ If you see question #${issue.expected + 1}, DELETE IT IMMEDIATELY!\n✅ Remember: ${issue.expected} questions ONLY!`
              }
            ]
          });
          break;

        case 'NUMBERS_OUT_OF_RANGE':
          suggestions.improvements.push({
            issueType: issue.type,
            severity: issue.severity,
            changes: [
              {
                section: 'ABSOLUTE REQUIREMENT #2',
                action: 'ADD_FORBIDDEN_LIST',
                after: `\n\n**❌ FORBIDDEN NUMBERS (DO NOT USE THESE!):**\n${this.generateForbiddenNumbersList(issue.numbers)}\n\n**IF YOU WRITE ANY OF THESE NUMBERS, THE WORKSHEET FAILS AUTOMATICALLY!**`
              },
              {
                section: 'Examples',
                action: 'ADD_WRONG_EXAMPLES',
                after: `\n\n**RECENT MISTAKES TO AVOID:**\n❌ "${issue.numbers}" - These numbers are TOO BIG!\n✅ Use only: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10`
              }
            ]
          });
          break;

        case 'MULTIPLE_OBJECT_TYPES':
          suggestions.improvements.push({
            issueType: issue.type,
            severity: issue.severity,
            changes: [
              {
                section: 'ABSOLUTE REQUIREMENT #3',
                action: 'ADD_EXAMPLES',
                after: `\n\n**MORE WRONG EXAMPLES (DON'T DO THIS!):**\n❌ "Count the apples and bananas" ← TWO object types!\n❌ "How many balls and toys?" ← TWO object types!\n❌ "Flowers and trees in the garden" ← TWO object types!\n❌ "Dogs playing with balls" ← TWO object types!\n\n**CORRECT EXAMPLES:**\n✅ "Count the apples" ← ONE object type\n✅ "How many balls?" ← ONE object type\n✅ "Count the flowers" ← ONE object type`
              }
            ]
          });
          break;

        case 'LANGUAGE_COMPLEXITY':
          suggestions.improvements.push({
            issueType: issue.type,
            severity: issue.severity,
            changes: [
              {
                section: 'Language Level',
                action: 'SIMPLIFY',
                after: `\n\n**MAXIMUM SENTENCE LENGTH: 5 WORDS**\n- ✅ "Count the apples." (3 words)\n- ✅ "How many stars?" (3 words)\n- ❌ "How many red apples are in the basket?" (8 words - TOO LONG!)\n- ❌ "Count all the balls on the table." (7 words - TOO LONG!)`
              }
            ]
          });
          break;

        case 'MISSING_VISUAL_SUPPORT':
          suggestions.improvements.push({
            issueType: issue.type,
            severity: issue.severity,
            changes: [
              {
                section: 'Visual Requirements',
                action: 'EMPHASIZE',
                after: `\n\n**🖼️ IMAGES ARE MANDATORY 🖼️**\n- EVERY question needs images\n- NO EXCEPTIONS\n- If you forget images, the worksheet FAILS\n- Use Scrapping Doodle images (path: /images/SCRAPPING DOODLE/...)`
              }
            ]
          });
          break;
      }
    }

    return suggestions;
  }

  /**
   * Generate list of forbidden numbers
   */
  generateForbiddenNumbersList(detectedNumbers) {
    const forbidden = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 30, 50, 100, 200, 333, 500, 666, 999, 1000];
    return forbidden.join(', ');
  }

  /**
   * Calculate next version number
   */
  calculateNextVersion(currentVersion) {
    const match = currentVersion.match(/v?(\d+)\.(\d+)/);
    if (!match) return 'v1.1';

    const major = parseInt(match[1]);
    const minor = parseInt(match[2]);

    return `v${major}.${minor + 1}`;
  }

  /**
   * Apply suggestions to create new prompt version
   */
  async applyS uggestions(suggestions) {
    const currentPromptPath = path.join(
      this.promptsDir,
      `${suggestions.configId}-${suggestions.currentVersion}.ts`
    );

    // Read current prompt
    let promptContent = await fs.readFile(currentPromptPath, 'utf8');

    // Apply each improvement
    for (const improvement of suggestions.improvements) {
      for (const change of improvement.changes) {
        switch (change.action) {
          case 'AMPLIFY':
            // Replace existing section with emphasized version
            promptContent = promptContent.replace(change.before, change.after);
            break;

          case 'ADD':
          case 'ADD_FORBIDDEN_LIST':
          case 'ADD_WRONG_EXAMPLES':
          case 'ADD_EXAMPLES':
          case 'EMPHASIZE':
            // Add new section at end of main prompt (before metadata export)
            const metadataIndex = promptContent.indexOf('export const configMetadata');
            if (metadataIndex > -1) {
              const beforeMetadata = promptContent.substring(0, metadataIndex);
              const metadata = promptContent.substring(metadataIndex);
              promptContent = beforeMetadata + change.after + '\n\n' + metadata;
            } else {
              promptContent += change.after;
            }
            break;

          case 'SIMPLIFY':
            // Add simplification guidance
            promptContent = promptContent.replace(
              /\*\*Language Level\*\*:/,
              `**Language Level**:\n${change.after}\n\nOriginal guidance:`
            );
            break;
        }
      }
    }

    // Update metadata
    promptContent = promptContent.replace(
      /version: ['"]([^'"]+)['"]/,
      `version: '${suggestions.nextVersion}'`
    );
    promptContent = promptContent.replace(
      /baselineScore: ([\d.]+)/,
      (match, score) => {
        const improvement = suggestions.improvements.some(i => i.severity === 'P0') ? 5 : 2;
        return `baselineScore: ${parseFloat(score)}`; // Keep same, will be updated after test
      }
    );

    return {
      content: promptContent,
      version: suggestions.nextVersion
    };
  }

  /**
   * Save suggestion for human review
   */
  async saveSuggestion(suggestions, generatedPrompt) {
    // Create suggestions directory
    await fs.mkdir(this.suggestionsDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const suggestionFile = path.join(
      this.suggestionsDir,
      `${suggestions.configId}-${suggestions.nextVersion}-${timestamp}.json`
    );

    await fs.writeFile(
      suggestionFile,
      JSON.stringify({
        ...suggestions,
        generatedPrompt: {
          version: generatedPrompt.version,
          preview: generatedPrompt.content.substring(0, 500) + '...'
        },
        status: 'AWAITING_REVIEW'
      }, null, 2)
    );

    // Save full prompt file (not yet deployed)
    const promptPreviewPath = path.join(
      this.suggestionsDir,
      `${suggestions.configId}-${suggestions.nextVersion}-PREVIEW.ts`
    );
    await fs.writeFile(promptPreviewPath, generatedPrompt.content);

    console.log(`\n📝 Prompt improvement suggestion saved:`);
    console.log(`   Suggestion: ${suggestionFile}`);
    console.log(`   Preview: ${promptPreviewPath}`);
    console.log(`\n⚠️  Human review required before deployment`);

    return {
      suggestionPath: suggestionFile,
      previewPath: promptPreviewPath
    };
  }

  /**
   * Deploy approved suggestion
   */
  async deploySuggestion(suggestionPath) {
    const suggestion = JSON.parse(await fs.readFile(suggestionPath, 'utf8'));

    if (suggestion.status !== 'APPROVED') {
      throw new Error(`Suggestion not approved. Current status: ${suggestion.status}`);
    }

    const previewPath = suggestionPath.replace('.json', '-PREVIEW.ts');
    const deployPath = path.join(
      this.promptsDir,
      `${suggestion.configId}-${suggestion.nextVersion}.ts`
    );

    // Copy preview to production
    const content = await fs.readFile(previewPath, 'utf8');
    await fs.writeFile(deployPath, content);

    // Update suggestion status
    suggestion.status = 'DEPLOYED';
    suggestion.deployedAt = new Date().toISOString();
    await fs.writeFile(suggestionPath, JSON.stringify(suggestion, null, 2));

    console.log(`\n✅ Prompt ${suggestion.nextVersion} deployed successfully!`);
    console.log(`   Location: ${deployPath}`);

    return deployPath;
  }
}

module.exports = new PromptAutoVersioning();
