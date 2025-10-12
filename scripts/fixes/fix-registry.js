#!/usr/bin/env node

/**
 * Fix Registry - Plugin System for Autonomous Fixes
 *
 * Allows easy addition of new automatic fixes without modifying core code
 */

const fs = require('fs').promises;
const path = require('path');

class FixRegistry {
  constructor() {
    this.fixes = new Map();
  }

  /**
   * Register a new fix
   */
  register(fixId, fixDefinition) {
    if (!fixDefinition.name) fixDefinition.name = fixId;
    if (!fixDefinition.priority) fixDefinition.priority = 5;

    this.fixes.set(fixId, {
      id: fixId,
      ...fixDefinition
    });

    console.log(`✅ Registered fix: ${fixId} (priority: ${fixDefinition.priority})`);
  }

  /**
   * Detect and apply all applicable fixes
   */
  async detectAndApply(assessmentResult, catalogPath, configId) {
    const applicableFixes = [];

    // Sort fixes by priority (higher first)
    const sortedFixes = Array.from(this.fixes.values()).sort((a, b) => b.priority - a.priority);

    // Detect phase
    for (const fix of sortedFixes) {
      try {
        const shouldApply = await fix.detect(assessmentResult, configId);
        if (shouldApply) {
          applicableFixes.push(fix);
        }
      } catch (error) {
        console.error(`❌ Error detecting fix ${fix.id}:`, error.message);
      }
    }

    if (applicableFixes.length === 0) {
      return [];
    }

    console.log(`\n🔍 Detected ${applicableFixes.length} applicable fix(es):`);
    applicableFixes.forEach(fix => console.log(`   - ${fix.name}`));

    // Load catalog
    const catalog = JSON.parse(await fs.readFile(catalogPath, 'utf8'));
    const appliedFixes = [];

    // Apply phase
    for (const fix of applicableFixes) {
      try {
        console.log(`\n🔧 Applying fix: ${fix.name}...`);
        const result = await fix.apply(catalog, assessmentResult, configId);

        if (result && result.changes && result.changes.length > 0) {
          appliedFixes.push({
            type: fix.id,
            name: fix.name,
            action: 'APPLIED',
            message: result.message,
            changes: result.changes
          });

          console.log(`   ✅ ${result.message}`);
          result.changes.forEach(change => console.log(`      - ${change}`));
        } else {
          console.log(`   ℹ️  No changes needed`);
        }
      } catch (error) {
        console.error(`   ❌ Error applying fix ${fix.id}:`, error.message);
        appliedFixes.push({
          type: fix.id,
          name: fix.name,
          action: 'FAILED',
          message: `Error: ${error.message}`,
          changes: []
        });
      }
    }

    // Save updated catalog
    if (appliedFixes.some(f => f.action === 'APPLIED')) {
      await fs.writeFile(catalogPath, JSON.stringify(catalog, null, 2));
      console.log(`\n💾 Catalog updated: ${catalogPath}`);
    }

    return appliedFixes;
  }

  /**
   * Get all registered fixes
   */
  getAll() {
    return Array.from(this.fixes.values());
  }

  /**
   * Get fix by ID
   */
  get(fixId) {
    return this.fixes.get(fixId);
  }
}

// Create singleton instance
const fixRegistry = new FixRegistry();

// ============================================================================
// CATALOG FIXES
// ============================================================================

/**
 * FIX 1: Football-Sailor Mismatch
 */
fixRegistry.register('football-sailor-mismatch', {
  name: 'Football→Sailor Catalog Priority Fix',
  priority: 10,
  category: 'catalog',

  detect: async (result) => {
    const text = result.rawText.toLowerCase();
    return text.includes('football') && text.includes('sailor');
  },

  apply: async (catalog) => {
    const changes = [];

    if (catalog['Sailor_Kids_School_byScrappinDoodles']) {
      const sailor = catalog['Sailor_Kids_School_byScrappinDoodles'];

      if (sailor.priority !== 5) {
        sailor.priority = 5;
        changes.push('Sailor_Kids_School priority: 9 → 5');
      }

      if (sailor.curriculumTopics && sailor.curriculumTopics.includes('counting-to-10')) {
        sailor.curriculumTopics = sailor.curriculumTopics.filter(t => t !== 'counting-to-10');
        changes.push("Removed 'counting-to-10' from Sailor topics");
      }
    }

    if (catalog['Football_Kids_by_ScrappinDoodles']) {
      if (catalog['Football_Kids_by_ScrappinDoodles'].priority !== 9) {
        catalog['Football_Kids_by_ScrappinDoodles'].priority = 9;
        changes.push('Football_Kids priority: 8 → 9');
      }
    }

    return {
      message: 'Adjusted football/sailor catalog priorities',
      changes
    };
  }
});

/**
 * FIX 2: Generic Object Mismatch (Vision AI-based)
 */
fixRegistry.register('vision-ai-object-mismatch', {
  name: 'Vision AI Object Mismatch Fix',
  priority: 9,
  category: 'catalog',

  detect: async (result) => {
    // Check if vision validation issues exist
    return result.visionIssues && result.visionIssues.length > 0;
  },

  apply: async (catalog, result) => {
    const changes = [];

    if (!result.visionIssues) return { message: 'No vision issues', changes: [] };

    // Group issues by mismatch pattern
    const mismatches = new Map();
    for (const issue of result.visionIssues) {
      const questionKeyword = issue.questionKeywords?.[0];
      const imageLabel = issue.imageLabels?.[0];

      if (questionKeyword && imageLabel) {
        const key = `${questionKeyword}-${imageLabel}`;
        mismatches.set(key, { questionKeyword, imageLabel });
      }
    }

    // Adjust catalog priorities based on mismatches
    for (const [key, mismatch] of mismatches) {
      const { questionKeyword, imageLabel } = mismatch;

      // Find collection showing wrong image
      for (const [collectionKey, entry] of Object.entries(catalog)) {
        const keywords = entry.educationalKeywords || [];
        const primaryObjects = entry.primaryObjects || [];

        // If this collection contains the wrong object, lower its priority
        if (keywords.includes(imageLabel) || primaryObjects.includes(imageLabel)) {
          if (entry.priority > 5) {
            const oldPriority = entry.priority;
            entry.priority = Math.max(5, entry.priority - 2);
            changes.push(`${entry.name} priority: ${oldPriority} → ${entry.priority} (was showing ${imageLabel} for ${questionKeyword} questions)`);
          }
        }

        // If this collection contains the correct object, boost its priority
        if (keywords.includes(questionKeyword) || primaryObjects.includes(questionKeyword)) {
          if (entry.priority < 10) {
            const oldPriority = entry.priority;
            entry.priority = Math.min(10, entry.priority + 1);
            changes.push(`${entry.name} priority: ${oldPriority} → ${entry.priority} (correct object: ${questionKeyword})`);
          }
        }
      }
    }

    return {
      message: `Adjusted priorities based on ${mismatches.size} vision AI mismatch(es)`,
      changes
    };
  }
});

/**
 * FIX 3: Low-Priority Counting Collections
 */
fixRegistry.register('boost-counting-collections', {
  name: 'Boost Counting Collection Priorities',
  priority: 7,
  category: 'catalog',

  detect: async (result, configId) => {
    // Only apply for counting configs
    const isCounting = configId.includes('counting');
    const hasImageIssues = result.rawText.toLowerCase().includes('image') &&
                          (result.rawText.toLowerCase().includes('failed') ||
                           result.rawText.toLowerCase().includes('low score'));
    return isCounting && hasImageIssues;
  },

  apply: async (catalog) => {
    const changes = [];
    const countingKeywords = ['apple', 'fruit', 'vegetable', 'flower', 'ball', 'book', 'pencil'];

    for (const [key, entry] of Object.entries(catalog)) {
      const keywords = entry.educationalKeywords || [];
      const topics = entry.curriculumTopics || [];

      // Boost if contains counting keywords and is relevant to counting
      const hasCountingKeywords = keywords.some(kw => countingKeywords.includes(kw));
      const hasCountingTopic = topics.includes('counting');

      if (hasCountingKeywords && hasCountingTopic && entry.priority < 9) {
        const oldPriority = entry.priority;
        entry.priority = Math.min(9, entry.priority + 1);
        changes.push(`${entry.name} priority: ${oldPriority} → ${entry.priority}`);
      }
    }

    return {
      message: `Boosted ${changes.length} counting-appropriate collections`,
      changes
    };
  }
});

/**
 * FIX 4: Remove Broken Image Paths
 */
fixRegistry.register('remove-broken-image-paths', {
  name: 'Remove Broken Image Paths',
  priority: 8,
  category: 'catalog',

  detect: async (result) => {
    const text = result.rawText.toLowerCase();
    return text.includes('failed to load') || text.includes('broken image') || text.includes('image.*?0');
  },

  apply: async (catalog) => {
    const changes = [];

    for (const [key, entry] of Object.entries(catalog)) {
      if (entry.imageFiles && entry.imageFiles.length > 0) {
        const validFiles = [];

        // Check each file
        for (const file of entry.imageFiles) {
          try {
            const filePath = path.join(process.cwd(), 'public', entry.path, file);
            await fs.access(filePath);
            validFiles.push(file);
          } catch (error) {
            changes.push(`${entry.name}: Removed broken path ${file}`);
          }
        }

        if (validFiles.length !== entry.imageFiles.length) {
          entry.imageFiles = validFiles;
          entry.totalImages = validFiles.length;

          // Update color/BW file lists
          if (entry.colorFiles) {
            entry.colorFiles = validFiles.filter(f => !f.startsWith('BW_'));
          }
          if (entry.bwFiles) {
            entry.bwFiles = validFiles.filter(f => f.startsWith('BW_'));
          }
        }
      }
    }

    return {
      message: `Cleaned up broken image paths in catalog`,
      changes
    };
  }
});

// ============================================================================
// PROMPT FIXES (Return suggested changes, not automatic)
// ============================================================================

/**
 * FIX 5: Question Count Mismatch (Prompt suggestion)
 */
fixRegistry.register('question-count-mismatch-prompt', {
  name: 'Question Count Mismatch (Prompt Suggestion)',
  priority: 6,
  category: 'prompt-suggestion',

  detect: async (result) => {
    return result.rawText.match(/question count.*?expected (\d+).*?got (\d+)/i);
  },

  apply: async (catalog, result) => {
    const match = result.rawText.match(/question count.*?expected (\d+).*?got (\d+)/i);
    if (!match) return { message: 'No match found', changes: [] };

    const expected = match[1];
    const got = match[2];

    return {
      message: `Prompt suggestion: Emphasize "${expected} questions" constraint`,
      changes: [
        `Current: Expected ${expected}, got ${got}`,
        `Suggestion: Add more explicit counting instruction in prompt`,
        `Example: "COUNT YOUR QUESTIONS: ${Array.from({length: expected}, (_, i) => i+1).join(', ')} - THEN STOP!"`,
        `⚠️ This requires manual prompt editing (auto-versioning coming soon)`
      ]
    };
  }
});

/**
 * FIX 6: Numbers Out of Range (Prompt suggestion)
 */
fixRegistry.register('numbers-out-of-range-prompt', {
  name: 'Numbers Out of Range (Prompt Suggestion)',
  priority: 6,
  category: 'prompt-suggestion',

  detect: async (result) => {
    return result.rawText.match(/numbers beyond range.*?(\d+)/i);
  },

  apply: async (catalog, result) => {
    const match = result.rawText.match(/numbers beyond.*?(\d+)-(\d+)/i) ||
                   result.rawText.match(/numbers beyond.*?(\d+)/i);

    return {
      message: `Prompt suggestion: Add explicit forbidden numbers list`,
      changes: [
        `Suggestion: Add FORBIDDEN NUMBERS section to prompt`,
        `Example: "DO NOT USE: 11, 12, 13, 14, 15, 20, 50, 100, 333, 666, 999"`,
        `Add visual separators: 🚨🚨🚨 FORBIDDEN NUMBERS 🚨🚨🚨`,
        `⚠️ This requires manual prompt editing (auto-versioning coming soon)`
      ]
    };
  }
});

module.exports = fixRegistry;
