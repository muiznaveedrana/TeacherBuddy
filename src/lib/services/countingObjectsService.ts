/**
 * Counting Objects Service
 *
 * Integrates the counting objects metadata with worksheet generation
 * Provides contextual object suggestions for AI-driven SVG generation
 */

import { promises as fs } from 'fs';
import * as path from 'path';
import scrappingDoodleService from './scrappingDoodleService';

export interface CountingObjectMetadata {
  id: string;
  filename: string;
  path: string;
  name: string;
  color: string;
  type: string;
  size: string;
  theme: string;
  visualComplexity: 'low' | 'medium' | 'high';
  countingRange: string;
  suggestedQuestions: string[];
  hybridSupport?: {
    canRepeat: boolean;
    maxRepeats: number;
    arrangement: {
      linear: boolean;
      grid: boolean;
      cluster: boolean;
    };
    spacing: {
      horizontal: string;
      vertical: string;
    };
  };
}

export interface CountingCategory {
  name: string;
  description: string;
  educationalUse: string[];
  ageGroups: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  objects: CountingObjectMetadata[];
}

export interface CountingObjectsMetadata {
  version: string;
  lastUpdated: string;
  description: string;
  categories: Record<string, CountingCategory>;
  worksheetIntegration: {
    supportedPresets: string[];
    layoutSupport: string[];
    generationTips: {
      bestPractices: string[];
      accessibility: string[];
    };
  };
  expansionPlan: {
    nextCategories: string[];
    targetCounts: {
      perCategory: number;
      totalObjects: number;
      diversityGoal: string;
    };
    currentProgress: {
      categoriesImplemented: number;
      totalObjects: number;
      completedCategories: string[];
    };
  };
  usage: {
    apiAccess: string;
    directPath: string;
    worksheetEngine: string;
  };
}

export interface ObjectSuggestion {
  category: string;
  object: CountingObjectMetadata;
  promptEnhancement: string;
  visualGuidance: string;
}

class CountingObjectsService {
  private metadata: CountingObjectsMetadata | null = null;
  private initialized = false;

  /**
   * Initialize the service by loading counting objects metadata
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const metadataPath = path.join(process.cwd(), 'public', 'images', 'educational', 'counting-objects', 'metadata.json');
      const metadataContent = await fs.readFile(metadataPath, 'utf-8');
      this.metadata = JSON.parse(metadataContent);
      this.initialized = true;
      console.log(`✅ Counting objects service initialized: ${this.metadata?.expansionPlan.currentProgress.totalObjects} objects in ${this.metadata?.expansionPlan.currentProgress.categoriesImplemented} categories`);
    } catch (error) {
      console.warn('⚠️ Counting objects metadata not available:', error instanceof Error ? error.message : 'Unknown error');
      this.metadata = null;
      this.initialized = true;
    }
  }

  /**
   * Check if the counting objects metadata is available
   */
  isAvailable(): boolean {
    return this.metadata !== null;
  }

  /**
   * Get all available counting object categories
   */
  getCategories(): string[] {
    if (!this.metadata) return [];
    return Object.keys(this.metadata.categories);
  }

  /**
   * Get objects for a specific category
   */
  getCategoryObjects(category: string): CountingObjectMetadata[] {
    if (!this.metadata || !this.metadata.categories[category]) {
      return [];
    }
    return this.metadata.categories[category].objects;
  }

  /**
   * Get object suggestion with variety strategy for worksheet diversity
   * NEW: Prioritizes SCRAPPING DOODLE collections for contextually appropriate images
   */
  async getObjectWithVarietyStrategy(
    topic: string,
    subtopic: string,
    yearGroup: string,
    questionIndex: number,
    totalQuestions: number,
    context?: string
  ): Promise<ObjectSuggestion | null> {
    // PRIORITY 1: Try SCRAPPING DOODLE collections first
    await scrappingDoodleService.initialize();

    if (scrappingDoodleService.isAvailable()) {
      const scrappingResult = await scrappingDoodleService.getBestImageForContext(
        topic,
        subtopic,
        yearGroup,
        questionIndex,
        'color' // Default to color images
      );

      if (scrappingResult) {
        console.log(`🎨 Question ${questionIndex + 1}: Using SCRAPPING DOODLE collection: ${scrappingResult.collection.name}`);

        // Convert SCRAPPING DOODLE result to ObjectSuggestion format
        return {
          category: 'scrapping-doodle',
          object: {
            id: `${scrappingResult.collection.name}-${questionIndex}`,
            filename: path.basename(scrappingResult.imagePath),
            path: scrappingResult.imagePath,
            name: scrappingResult.collection.name,
            color: scrappingResult.colorVariation === 'color' ? 'multicolor' : 'black-white',
            type: 'educational-illustration',
            size: 'medium',
            theme: scrappingResult.collection.topics[0],
            visualComplexity: this.getVisualComplexityForAge(yearGroup),
            countingRange: this.getCountingRangeForAge(yearGroup),
            suggestedQuestions: [
              `Count the objects in this ${scrappingResult.collection.topics[0]} image`,
              `How many items do you see?`,
              `Add/subtract using these objects`
            ]
          },
          promptEnhancement: `Use images from ${scrappingResult.collection.name} collection. Focus on ${scrappingResult.collection.topics.join(', ')} themes. Educational context: ${yearGroup} level.`,
          visualGuidance: `Select educational illustrations from ${scrappingResult.imagePath}. Style: Professional educational artwork with clear, countable objects.`
        };
      }
    }

    // FALLBACK 1: Try existing counting objects metadata
    if (this.metadata) {
      console.log(`📚 Question ${questionIndex + 1}: Using counting objects metadata as fallback`);
      return this.getBestObjectForContext(topic, subtopic, yearGroup, context);
    }

    // FALLBACK 2: AI generation with enhanced context
    console.log(`🤖 Question ${questionIndex + 1}: Using AI generation as final fallback`);
    return null;
  }

  /**
   * Helper: Get visual complexity based on age group
   */
  private getVisualComplexityForAge(yearGroup: string): 'low' | 'medium' | 'high' {
    const complexityMap: Record<string, 'low' | 'medium' | 'high'> = {
      'Reception': 'low',
      'Year 1': 'low',
      'Year 2': 'medium',
      'Year 3': 'medium',
      'Year 4': 'medium',
      'Year 5': 'high',
      'Year 6': 'high'
    };
    return complexityMap[yearGroup] || 'medium';
  }

  /**
   * Helper: Get counting range based on age group
   */
  private getCountingRangeForAge(yearGroup: string): string {
    const rangeMap: Record<string, string> = {
      'Reception': '1-10',
      'Year 1': '1-20',
      'Year 2': '1-50',
      'Year 3': '1-100',
      'Year 4': '1-1000',
      'Year 5': '1-10000',
      'Year 6': '1-100000'
    };
    return rangeMap[yearGroup] || '1-20';
  }

  /**
   * Get the best object suggestion for a worksheet context
   * Enhanced with weighted scoring and curriculum alignment
   */
  getBestObjectForContext(
    topic: string,
    subtopic: string,
    yearGroup: string,
    context?: string
  ): ObjectSuggestion | null {
    if (!this.metadata) return null;

    const topicLower = topic.toLowerCase();
    const subtopicLower = subtopic.toLowerCase();
    const contextLower = context?.toLowerCase() || '';

    // Enhanced checking for counting objects relevance
    const relevanceScore = this.calculateRelevanceScore(topicLower, subtopicLower, contextLower);

    if (relevanceScore > 0) {
      // Get all available objects with scoring
      const scoredObjects: Array<{
        category: string;
        object: CountingObjectMetadata;
        score: number
      }> = [];

      for (const [categoryName, category] of Object.entries(this.metadata.categories)) {
        // Filter by age group appropriateness
        if (category.ageGroups.includes(yearGroup)) {
          category.objects.forEach(object => {
            const score = this.scoreObjectForContext(
              object,
              categoryName,
              topicLower,
              subtopicLower,
              contextLower,
              yearGroup
            );
            if (score > 0) {
              scoredObjects.push({ category: categoryName, object, score });
            }
          });
        }
      }

      if (scoredObjects.length === 0) return null;

      // Sort by score and select best match with some randomness for variety
      scoredObjects.sort((a, b) => b.score - a.score);
      const topScore = scoredObjects[0].score;
      const topMatches = scoredObjects.filter(item => item.score >= topScore * 0.8);
      const selected = topMatches[Math.floor(Math.random() * topMatches.length)];

      // Generate enhanced prompt based on the selected object
      const promptEnhancement = this.generatePromptEnhancement(selected.object, selected.category);
      const visualGuidance = this.generateVisualGuidance(selected.object);

      return {
        category: selected.category,
        object: selected.object,
        promptEnhancement,
        visualGuidance
      };
    }

    // Fallback for general math topics that could benefit from counting objects
    if (topicLower.includes('number') || topicLower.includes('count') || topicLower.includes('addition') || topicLower.includes('subtraction')) {
      // Return a random appropriate object
      const availableCategories = Object.entries(this.metadata.categories)
        .filter(([, category]) => category.ageGroups.includes(yearGroup));

      if (availableCategories.length > 0) {
        const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        const [categoryName, category] = randomCategory;

        if (category.objects.length > 0) {
          const randomObject = category.objects[0]; // Use first object for consistency

          return {
            category: categoryName,
            object: randomObject,
            promptEnhancement: this.generatePromptEnhancement(randomObject, categoryName),
            visualGuidance: this.generateVisualGuidance(randomObject)
          };
        }
      }
    }

    return null;
  }

  /**
   * Calculate relevance score for counting objects usage
   */
  private calculateRelevanceScore(topic: string, subtopic: string, context: string): number {
    let score = 0;

    // High relevance indicators
    const highRelevanceTerms = ['counting-objects', 'three-digit', 'addition', 'subtraction', 'counting'];
    const mediumRelevanceTerms = ['number', 'mathematics', 'visual', 'concrete'];
    const lowRelevanceTerms = ['quantity', 'amount', 'total', 'sum'];

    const allText = `${topic} ${subtopic} ${context}`.toLowerCase();

    for (const term of highRelevanceTerms) {
      if (allText.includes(term)) score += 10;
    }
    for (const term of mediumRelevanceTerms) {
      if (allText.includes(term)) score += 5;
    }
    for (const term of lowRelevanceTerms) {
      if (allText.includes(term)) score += 2;
    }

    return score;
  }

  /**
   * Score object relevance for specific context
   */
  private scoreObjectForContext(
    object: CountingObjectMetadata,
    category: string,
    topic: string,
    subtopic: string,
    context: string,
    yearGroup: string
  ): number {
    let score = 1; // Base score

    const allContext = `${topic} ${subtopic} ${context}`.toLowerCase();

    // Theme matching
    if (allContext.includes(object.theme.toLowerCase())) score += 8;
    if (allContext.includes(object.name.toLowerCase())) score += 10;
    if (allContext.includes(category.toLowerCase())) score += 5;

    // Visual complexity appropriateness
    const yearGroupComplexity = {
      'Reception': 'low',
      'Year 1': 'low',
      'Year 2': 'medium',
      'Year 3': 'medium',
      'Year 4': 'medium',
      'Year 5': 'high',
      'Year 6': 'high'
    };

    if (object.visualComplexity === yearGroupComplexity[yearGroup as keyof typeof yearGroupComplexity]) {
      score += 5;
    }

    // Subject-specific bonuses
    if (topic.includes('addition') && object.name.includes('apple')) score += 3;
    if (topic.includes('subtraction') && ['toy', 'ball'].some(t => object.name.includes(t))) score += 3;

    return score;
  }

  /**
   * Generate enhanced prompt enhancement text based on object metadata
   */
  private generatePromptEnhancement(object: CountingObjectMetadata, category: string): string {
    const suggestions = object.suggestedQuestions;
    const exampleQuestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    const countingRange = object.countingRange;

    return `ENHANCED COUNTING CONTEXT: Use ${object.name.toLowerCase()} as primary counting objects. Theme: ${object.theme}. Optimal counting range: ${countingRange}. Example educational question: "${exampleQuestion}". Visual complexity: ${object.visualComplexity} (age-appropriate). Primary color: ${object.color}. Educational focus: ${category} with concrete visual learning. Size guidance: ${object.size}.`;
  }

  /**
   * Generate visual guidance for AI SVG generation
   */
  private generateVisualGuidance(object: CountingObjectMetadata): string {
    const complexityGuidance = {
      low: 'Simple, clean design with minimal details',
      medium: 'Balanced detail level with clear recognizable features',
      high: 'Rich detail level while maintaining clarity for young learners'
    };

    return `VISUAL GUIDANCE: Create ${object.name.toLowerCase()} in ${object.color} color. ${complexityGuidance[object.visualComplexity]}. Style: ${object.theme} theme. Ensure objects are clearly separable for counting exercises. Target size: ${object.countingRange} for age-appropriate counting activities.`;
  }

  /**
   * Get contextual suggestions for prompt enhancement
   */
  getPromptEnhancements(topic: string, subtopic: string, yearGroup: string): string[] {
    if (!this.metadata) return [];

    const suggestion = this.getBestObjectForContext(topic, subtopic, yearGroup);
    if (!suggestion) return [];

    const enhancements = [
      suggestion.promptEnhancement,
      suggestion.visualGuidance
    ];

    // Add best practices if available
    if (this.metadata.worksheetIntegration.generationTips.bestPractices.length > 0) {
      enhancements.push(
        `COUNTING BEST PRACTICES: ${this.metadata.worksheetIntegration.generationTips.bestPractices.slice(0, 2).join(' ')}`
      );
    }

    return enhancements;
  }

  /**
   * Get statistics about available counting objects
   */
  getStats(): { categories: number; totalObjects: number; byCategory: Record<string, number> } | null {
    if (!this.metadata) return null;

    const byCategory: Record<string, number> = {};
    for (const [name, category] of Object.entries(this.metadata.categories)) {
      byCategory[name] = category.objects.length;
    }

    return {
      categories: this.metadata.expansionPlan.currentProgress.categoriesImplemented,
      totalObjects: this.metadata.expansionPlan.currentProgress.totalObjects,
      byCategory
    };
  }
}

// Singleton instance
const countingObjectsService = new CountingObjectsService();

export default countingObjectsService;