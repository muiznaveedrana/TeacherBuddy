/**
 * Unified Prompt Service - Consolidated USP Implementation
 * 
 * Single service combining USP.1 (LLM Prompt Engineering), USP.2 (Enhanced Configuration),
 * and USP.Integration for superior worksheet generation through iterative prompt refinement.
 * 
 * Epic: USP Professional Worksheet Generation Enhancement
 * Quality Target: ≥4.5/5.0 through iterative prompt improvement (elevated from 4.0)
 * Focus: Iterative quality refinement and production-scale excellence
 */

import { 
  WorksheetConfig,
  VisualTheme,
  ProblemType,
  EngagementStyle,
  PromptTemplate
} from '@/lib/types/worksheet'
import { getSmartDefaults } from '@/lib/config/enhanced-options'
import { getTopicDetails } from '@/lib/data/curriculum'

// Unified prompt approach for optimal results
export type PromptVariation = 'optimal'

// Enhanced configuration type for unified service
export interface EnhancedPromptConfig extends WorksheetConfig {
  // USP.2 Enhanced options with smart defaults applied
  visualTheme: VisualTheme
  problemTypes: ProblemType[]
  engagementStyle: EngagementStyle
  promptTemplate: PromptTemplate
}

// Quality metrics for iterative improvement (USP.3 focus)
export interface QualityMetrics {
  visualAppeal: number // 25% weight
  educationalAppropriateness: number // 25% weight  
  svgIntegration: number // 20% weight
  curriculumAlignment: number // 15% weight
  accessibility: number // 15% weight
  totalScore: number
  meetsTargetThreshold: boolean // ≥4.5 for iterative improvement
}

// Iterative improvement metadata for USP.3/USP.4 
export interface IterativeImprovementMetadata {
  promptVersion: string
  qualityScore: number
  improvementCycle: number
  enhancementsApplied: string[]
  usedSmartDefaults: boolean
  templateVariation: PromptVariation
  visualTheme: VisualTheme
  generationTime: number
  targetQualityAchieved: boolean // ≥4.5 target
}

// SVG sourcing instructions for OpenClipart integration
export interface SVGInstructions {
  searchTerms: string[]
  sizingGuidelines: string
  arrangementInstructions: string
  qualityRequirements: string
}

/**
 * Unified Prompt Service
 * Single point of excellence for all worksheet prompt generation
 */
export class PromptService {
  private static readonly SERVICE_VERSION = '2.0.0-unified'
  private static readonly QUALITY_TARGET = 4.5 // Elevated target for competitive excellence

  /**
   * Main prompt generation method with iterative improvement focus
   * Generates superior prompts through integrated USP.1 + USP.2 + iterative refinement
   */
  public static generatePrompt(
    config: WorksheetConfig,
    options: { 
      forceEnhanced?: boolean
      iterativeCycle?: number 
      targetQuality?: number 
    } = {}
  ): { prompt: string; metadata: IterativeImprovementMetadata } {
    const startTime = Date.now()
    
    // Step 1: Apply USP.2 smart defaults for optimal configuration
    const enhancedConfig = this.applySmartDefaults(config, options.forceEnhanced)
    
    // Step 2: Select optimal prompt variation based on configuration
    const promptVariation = this.selectOptimalVariation(enhancedConfig)
    
    // Step 3: Generate prompt using best approach from USP.1 + USP.Integration
    const basePrompt = this.generateVariationPrompt(enhancedConfig, promptVariation)
    
    // Step 4: Apply iterative improvements for quality enhancement
    const refinedPrompt = this.applyIterativeImprovements(
      basePrompt, 
      enhancedConfig, 
      options.iterativeCycle || 1
    )
    
    // Step 5: Create metadata for continuous improvement tracking
    const qualityScore = this.estimateQualityScore(enhancedConfig, promptVariation)
    const metadata: IterativeImprovementMetadata = {
      promptVersion: this.SERVICE_VERSION,
      qualityScore,
      improvementCycle: options.iterativeCycle || 1,
      enhancementsApplied: this.getAppliedEnhancements(enhancedConfig),
      usedSmartDefaults: this.wasSmartDefaultsApplied(config, enhancedConfig),
      templateVariation: promptVariation,
      visualTheme: enhancedConfig.visualTheme,
      generationTime: Date.now() - startTime,
      targetQualityAchieved: qualityScore >= (options.targetQuality || this.QUALITY_TARGET)
    }

    return {
      prompt: refinedPrompt,
      metadata
    }
  }

  /**
   * Apply USP.2 smart defaults for optimal worksheet configuration
   */
  private static applySmartDefaults(
    config: WorksheetConfig, 
    forceEnhanced: boolean = false
  ): EnhancedPromptConfig {
    const smartDefaults = getSmartDefaults(config.yearGroup, config.topic, config.layout)
    
    return {
      ...config,
      visualTheme: config.visualTheme || smartDefaults.visualTheme,
      problemTypes: config.problemTypes || ['word-problems'],
      engagementStyle: config.engagementStyle || 'structured',
      promptTemplate: config.promptTemplate || 'optimal' // Single optimal template
    }
  }

  /**
   * Always use optimal prompt approach (no variations needed)
   */
  private static selectOptimalVariation(config: EnhancedPromptConfig): PromptVariation {
    return 'optimal'
  }

  /**
   * Generate optimal prompt combining best elements from all approaches
   */
  private static generateVariationPrompt(
    config: EnhancedPromptConfig, 
    variation: PromptVariation
  ): string {
    return this.generateOptimalPrompt(config)
  }



  /**
   * Generate optimal prompt combining the best elements from all approaches
   * Combines professional structure, creative engagement, and motivational elements
   */
  private static generateOptimalPrompt(config: EnhancedPromptConfig): string {
    const curriculumContext = this.getCurriculumContext(config)
    const svgInstructions = this.getSVGInstructions(config.visualTheme)
    const accessibilityRequirements = this.getAccessibilityRequirements(config.yearGroup)
    const themeContext = this.getThemeContext(config.visualTheme, config.yearGroup)

    return `Create a ${config.yearGroup} ${config.topic} worksheet: "${config.subtopic}" (${config.difficulty} level, ${config.questionCount} questions).

**Requirements:**
- UK National Curriculum aligned
- Age-appropriate vocabulary with mathematical precision
- Use names: Emma, Oliver, Sophie, James, Lily, Thomas, Grace, Harry
- Theme: ${themeContext}

**Format:** Complete HTML with embedded SVG icons (small, simple shapes from OpenClipart.org: ${svgInstructions.searchTerms.join(', ')}).

**CRITICAL - HTML STRUCTURE MUST BE:**
<!DOCTYPE html>
<html>
<head>
    <title>${config.topic} - ${config.subtopic}</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: ${accessibilityRequirements.fontRequirements.includes('16-18pt') ? '16pt' : '14pt'}; line-height: 1.6; margin: 20px; }
        .worksheet-header { text-align: center; margin-bottom: 20px; }
        .worksheet-content { margin: 20px 0; }
        .question { margin: 15px 0; }
        svg { width: 40px; height: 40px; vertical-align: middle; }
    </style>
</head>
<body>
    <div class="worksheet-header">
        <h1>${config.topic}: ${config.subtopic}</h1>
        <div class="student-info">Name: _____________ Date: _____________</div>
    </div>
    <div class="worksheet-content">
        [Generate exactly ${config.questionCount} questions here with embedded SVG elements]
    </div>
</body>
</html>

IMPORTANT: The HTML MUST contain these exact CSS classes: "worksheet-header" and "worksheet-content" or it will be rejected.`
  }

  /**
   * Apply iterative improvements for continuous quality enhancement
   */
  private static applyIterativeImprovements(
    basePrompt: string, 
    config: EnhancedPromptConfig, 
    cycle: number
  ): string {
    let improvedPrompt = basePrompt

    // Cycle-based improvements for iterative refinement
    if (cycle > 1) {
      // Add quality refinement instructions
      improvedPrompt = improvedPrompt.replace(
        '**OUTPUT FORMAT:**',
        `**ITERATIVE QUALITY ENHANCEMENTS (Cycle ${cycle}):**
- Enhanced visual appeal through refined SVG placement
- Improved educational value with clearer learning progression
- Optimized cognitive load through better spacing and structure
- Strengthened curriculum alignment with explicit connections
- Advanced accessibility features for inclusive learning

**OUTPUT FORMAT:**`
      )
    }

    return improvedPrompt
  }

  /**
   * Get curriculum context for educational accuracy
   */
  private static getCurriculumContext(config: EnhancedPromptConfig) {
    const topicDetails = getTopicDetails(config.yearGroup, config.topic, config.subtopic)
    
    return {
      topic: config.topic,
      subtopic: config.subtopic,
      learningObjectives: topicDetails?.learningObjectives || [`${config.topic} understanding`],
      languageLevel: this.getLanguageLevel(config.yearGroup),
      progressionGuideline: topicDetails?.progressionGuideline || 'Sequential skill development',
      mathFocus: topicDetails?.mathFocus || config.topic,
      programmOfStudy: topicDetails?.programmOfStudy || `Year ${config.yearGroup} mathematics`
    }
  }

  /**
   * Get SVG instructions based on visual theme
   */
  private static getSVGInstructions(theme: VisualTheme): SVGInstructions {
    const themeInstructions = {
      'animals': {
        searchTerms: ['cartoon animals', 'cute pets', 'farm animals', 'zoo animals'],
        sizingGuidelines: '40-60px height, maintain aspect ratio',
        arrangementInstructions: 'Animals integrated with mathematical problems as counting objects or story elements',
        qualityRequirements: 'Clear, simple designs suitable for educational use'
      },
      'food': {
        searchTerms: ['fruits', 'vegetables', 'healthy food', 'kitchen items'],
        sizingGuidelines: '35-50px height, consistent sizing across food items',
        arrangementInstructions: 'Food items used for counting, fractions, or measurement problems',
        qualityRequirements: 'Colorful, recognizable food illustrations'
      },
      'sports': {
        searchTerms: ['sports equipment', 'balls', 'athletic gear', 'playground'],
        sizingGuidelines: '40-55px height, proportional to real-world sizes',
        arrangementInstructions: 'Sports items for counting, scoring, or measurement exercises',
        qualityRequirements: 'Dynamic, engaging sports-themed illustrations'
      },
      'space': {
        searchTerms: ['planets', 'rockets', 'stars', 'astronauts'],
        sizingGuidelines: '45-65px height, varying sizes for celestial objects',
        arrangementInstructions: 'Space elements for counting, patterns, or mathematical exploration',
        qualityRequirements: 'Inspiring, scientifically appropriate space imagery'
      },
      'standard': {
        searchTerms: ['geometric shapes', 'mathematical symbols', 'educational icons'],
        sizingGuidelines: '30-45px height, clean geometric proportions',
        arrangementInstructions: 'Mathematical symbols and shapes supporting problem concepts',
        qualityRequirements: 'Professional, curriculum-aligned mathematical graphics'
      }
    }

    return themeInstructions[theme] || themeInstructions.standard
  }

  /**
   * Get accessibility requirements for age group
   */
  private static getAccessibilityRequirements(yearGroup: string) {
    return {
      fontRequirements: yearGroup <= 'Year 2' 
        ? 'Large, clear fonts (16-18pt) with high contrast'
        : 'Professional fonts (14-16pt) with excellent readability'
    }
  }

  /**
   * Get layout structure based on configuration
   */
  private static getLayoutStructure(layout: string): string {
    const layoutStructures = {
      'visual-heavy': 'SVG-rich design with visual elements supporting each problem',
      'balanced': 'Equal balance of text and visual elements for optimal engagement',
      'text-focused': 'Text-primary with strategic visual enhancements'
    }
    
    return layoutStructures[layout] || layoutStructures.balanced
  }

  /**
   * Get unified theme context for optimal prompts
   */
  private static getThemeContext(theme: VisualTheme, yearGroup: string): string {
    const themeContexts = {
      'animals': 'Animal friends and nature scenarios that connect mathematical concepts to the natural world',
      'food': 'Cooking, sharing, and food-related contexts that make mathematical problems practical and relatable',
      'sports': 'Sports activities and team challenges that integrate mathematical problem-solving with physical activities',
      'space': 'Space exploration and cosmic adventures that inspire curiosity while teaching mathematical concepts',
      'standard': 'Everyday situations and real-world contexts that demonstrate the practical value of mathematics'
    }
    
    return themeContexts[theme] || themeContexts.standard
  }

  /**
   * Get language level for age group
   */
  private static getLanguageLevel(yearGroup: string): string {
    const yearNum = parseInt(yearGroup.replace('Year ', '').replace('Reception', '0'))
    
    if (yearNum <= 1) return 'Simple, clear language with visual support'
    if (yearNum <= 3) return 'Age-appropriate vocabulary with mathematical precision'
    return 'Confident language with mathematical terminology'
  }

  /**
   * Estimate quality score for metadata tracking
   */
  private static estimateQualityScore(config: EnhancedPromptConfig, variation: PromptVariation): number {
    // Base quality estimation for iterative improvement tracking
    let baseScore = 4.2 // Start above USP.1 target
    
    // Enhancements based on configuration
    if (config.visualTheme !== 'standard') baseScore += 0.1
    if (variation === 'creative') baseScore += 0.1
    if (config.engagementStyle === 'storytelling') baseScore += 0.1
    
    return Math.min(baseScore, 5.0)
  }

  /**
   * Get applied enhancements for metadata
   */
  private static getAppliedEnhancements(config: EnhancedPromptConfig): string[] {
    const enhancements: string[] = []
    
    if (config.visualTheme !== 'standard') enhancements.push(`Visual theme: ${config.visualTheme}`)
    if (config.engagementStyle !== 'structured') enhancements.push(`Engagement: ${config.engagementStyle}`)
    if (config.problemTypes?.length > 0) enhancements.push(`Problem types: ${config.problemTypes.join(', ')}`)
    
    return enhancements
  }

  /**
   * Check if smart defaults were applied
   */
  private static wasSmartDefaultsApplied(original: WorksheetConfig, enhanced: EnhancedPromptConfig): boolean {
    return !original.visualTheme || !original.engagementStyle || !original.problemTypes
  }
}