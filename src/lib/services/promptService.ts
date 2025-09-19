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
  VisualTheme
} from '@/lib/types/worksheet'
import { getTopicDetails } from '@/lib/data/curriculum'

// Unified prompt approach for optimal results
export type PromptVariation = 'optimal'

// Enhanced configuration type for unified service
export interface EnhancedPromptConfig extends WorksheetConfig {
  // USP.2 Enhanced options with smart defaults applied
  visualTheme?: VisualTheme // Optional - let LLM decide when undefined
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
  templateVariation: PromptVariation
  visualTheme?: VisualTheme // Optional - undefined when not selected
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
    
    // Step 1: Transform and validate configuration
    const enhancedConfig = this.createEnhancedConfig(config)
    
    // Step 2: Generate the core prompt
    const prompt = this.generateCorePrompt(enhancedConfig, options)
    
    // Step 3: Create comprehensive metadata
    const metadata = this.createGenerationMetadata(enhancedConfig, options, startTime)

    return { prompt, metadata }
  }
  
  /**
   * Generate the core prompt with all enhancements applied
   */
  private static generateCorePrompt(
    config: EnhancedPromptConfig,
    options: { iterativeCycle?: number }
  ): string {
    const promptVariation = this.selectOptimalVariation(config)
    const basePrompt = this.generateVariationPrompt(config, promptVariation)
    
    return this.applyIterativeImprovements(
      basePrompt, 
      config, 
      options.iterativeCycle || 1
    )
  }
  
  /**
   * Create comprehensive metadata for tracking and improvement
   */
  private static createGenerationMetadata(
    config: EnhancedPromptConfig,
    options: { iterativeCycle?: number; targetQuality?: number },
    startTime: number
  ): IterativeImprovementMetadata {
    const promptVariation = this.selectOptimalVariation(config)
    const qualityScore = this.estimateQualityScore(config, promptVariation)
    
    return {
      promptVersion: this.SERVICE_VERSION,
      qualityScore,
      improvementCycle: options.iterativeCycle || 1,
      enhancementsApplied: this.getAppliedEnhancements(config),
      templateVariation: promptVariation,
      visualTheme: config.visualTheme,
      generationTime: Date.now() - startTime,
      targetQualityAchieved: qualityScore >= (options.targetQuality || this.QUALITY_TARGET)
    }
  }

  /**
   * Convert WorksheetConfig to EnhancedPromptConfig with safe defaults
   */
  private static createEnhancedConfig(config: WorksheetConfig): EnhancedPromptConfig {
    return {
      ...config,
      visualTheme: config.visualTheme // Keep as-is (undefined if not selected)
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
    const shouldApplyTheme = config.visualTheme && config.visualTheme !== 'none'
    const svgInstructions = shouldApplyTheme && config.visualTheme ? this.getSVGInstructions(config.visualTheme) : this.getContextualSVGInstructions()
    const accessibilityRequirements = this.getAccessibilityRequirements(config.yearGroup)
    const themeContext = shouldApplyTheme && config.visualTheme ? this.getThemeContext(config.visualTheme, config.yearGroup) : null

    return `Create a ${config.yearGroup} ${config.topic} worksheet: "${config.subtopic}" (${config.difficulty} level, ${config.questionCount} questions).

**Requirements:**
- UK National Curriculum aligned
- Age-appropriate vocabulary with mathematical precision
- Use names: Emma, Oliver, Sophie, James, Lily, Thomas, Grace, Harry${themeContext ? `\n- Theme: ${themeContext}` : ''}

**Format:** Complete HTML with embedded SVG icons (small, simple shapes from OpenClipart.org: ${svgInstructions.searchTerms.join(', ')}).

**SVG Instructions:**
- Create VERY LARGE, colorful, contextual SVG icons (100x100px) that relate to each word problem
- Icons should be placed in the .question-icon div on the right side of each question
- Use bright, engaging colors and clear, simple shapes (cupcakes, buses, money, books, etc.)
- Each SVG should be self-contained and relevant to the problem context
- NO background circles or containers - just the pure SVG icon for maximum visual impact
- ${svgInstructions.arrangementInstructions}
- ${svgInstructions.qualityRequirements}

**CRITICAL - SIMPLIFIED UX HTML STRUCTURE:**
<!DOCTYPE html>
<html>
<head>
    <title>${config.topic} - ${config.subtopic}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.4;
            margin: 0;
            padding: 10mm 12mm; /* Minimal margins for space efficiency */
            background: white;
            color: #000;
        }

        /* Simplified header - reduced to 10% of page height */
        .worksheet-header {
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 6px;
            border-bottom: 3px solid #000;
        }

        .worksheet-title {
            font-size: 16pt;
            font-weight: bold;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        /* Simplified student info */
        .student-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 8px 0 15px 0;
            font-size: 11pt;
            font-weight: bold;
            gap: 20px; /* Add space between Name and Date */
        }

        .worksheet-content {
            margin-top: 10px;
        }

        /* Clean, simplified question layout */
        .question {
            margin: 10px 0 0 0; /* Minimal top margin, no bottom margin */
            padding: 0;
        }

        .question:first-child {
            margin-top: 0; /* No top margin for first question */
        }

        .question-number {
            font-size: 12pt;
            font-weight: bold;
            margin-right: 10px;
            display: inline;
        }

        .question-text {
            font-size: 12pt;
            line-height: 1.5;
            display: inline;
        }

        /* Clean empty space for student work with subtle grey line */
        .answer-space {
            margin: 15px 0 0 0; /* Space above answer area, NO space below */
            min-height: 60px; /* Space for student writing */
            background: white;
            border-bottom: 1px solid #999; /* Thin grey answer line */
        }

        .question-icon {
            width: 80px;
            height: 80px;
            margin-left: 15px;
            float: right;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .question-icon svg {
            width: 80px;
            height: 80px;
        }
    </style>
</head>
<body>
    <!-- Simplified student info positioned above header -->
    <div class="student-info">
        <div>Name: _____________</div>
        <div>Date: _____________</div>
    </div>

    <!-- Simplified header with title only -->
    <div class="worksheet-header">
        <h1 class="worksheet-title">${config.topic.replace('-', ' ')}</h1>
    </div>

    <div class="worksheet-content">
        [Generate exactly ${config.questionCount} questions using this CLEAN format - NO complex boxes, NO "Show your work" labels, NO "Final Answer" labels:
        <div class="question">
            <span class="question-number">1.</span>
            <span class="question-text">[Question text here]</span>
            <div class="question-icon">
                [Large contextual SVG icon here - 80x80px]
            </div>
            <div class="answer-space"></div>
        </div>]
    </div>
</body>
</html>

CRITICAL REQUIREMENTS:
- NO instructional text in header
- NO "Show your work" labels or dashed containers
- NO "Final Answer:" labels or answer boxes
- Clean empty space naturally guides student writing
- Minimal margins for maximum space utilization
- The HTML MUST contain "worksheet-header" and "worksheet-content" classes`
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
      progressionGuideline: 'Sequential skill development', // Simplified - removed undefined property
      mathFocus: config.topic, // Simplified - use config topic
      programmOfStudy: `Year ${config.yearGroup} mathematics` // Simplified - removed undefined property
    }
  }

  /**
   * Get SVG instructions based on visual theme
   */
  private static getSVGInstructions(theme: VisualTheme): SVGInstructions {
    const themeInstructions: Record<VisualTheme, SVGInstructions> = {
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
      },
      'none': {
        searchTerms: ['geometric shapes', 'mathematical symbols', 'educational icons'],
        sizingGuidelines: '30-45px height, clean geometric proportions',
        arrangementInstructions: 'Mathematical symbols and shapes supporting problem concepts',
        qualityRequirements: 'Professional, curriculum-aligned mathematical graphics'
      }
    }

    return themeInstructions[theme] || themeInstructions.standard
  }

  /**
   * Get contextual SVG instructions when no theme is selected
   * LLM should choose appropriate SVGs based on question content
   */
  private static getContextualSVGInstructions(): SVGInstructions {
    return {
      searchTerms: ['mathematical objects', 'educational icons', 'contextual illustrations', 'relevant objects'],
      sizingGuidelines: '30-50px height, maintain aspect ratio and visual consistency',
      arrangementInstructions: 'Choose SVG elements that directly relate to each question context (e.g., coins for money problems, shapes for geometry, objects for counting). Each question should have contextually relevant visual support.',
      qualityRequirements: 'Select clear, educational illustrations that enhance mathematical understanding and match the specific context of each problem'
    }
  }

  /**
   * Get accessibility requirements for age group
   */
  private static getAccessibilityRequirements(yearGroup: string): { fontRequirements: string } {
    // Extract year number for proper comparison
    const yearNum = this.extractYearNumber(yearGroup)
    
    return {
      fontRequirements: yearNum <= 2 
        ? 'Large, clear fonts (16-18pt) with high contrast'
        : 'Professional fonts (14-16pt) with excellent readability'
    }
  }
  
  /**
   * Extract numeric year from year group string for comparison
   */
  private static extractYearNumber(yearGroup: string): number {
    if (yearGroup === 'Reception') return 0
    const match = yearGroup.match(/Year (\d+)/)
    return match ? parseInt(match[1], 10) : 0
  }

  /**
   * Get layout structure based on configuration
   */
  private static getLayoutStructure(layout: string): string {
    const layoutStructures: Record<string, string> = {
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
    const themeContexts: Record<VisualTheme, string> = {
      'animals': 'Animal friends and nature scenarios that connect mathematical concepts to the natural world',
      'food': 'Cooking, sharing, and food-related contexts that make mathematical problems practical and relatable',
      'sports': 'Sports activities and team challenges that integrate mathematical problem-solving with physical activities',
      'space': 'Space exploration and cosmic adventures that inspire curiosity while teaching mathematical concepts',
      'standard': 'Everyday situations and real-world contexts that demonstrate the practical value of mathematics',
      'none': 'Mixed contexts and varied scenarios that demonstrate practical mathematics applications'
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
    if (config.visualTheme && config.visualTheme !== 'standard' && config.visualTheme !== 'none') {
      baseScore += 0.1
    }
    
    // Note: variation is always 'optimal' in current implementation
    // This is future-proofing for when variations are re-introduced
    if (variation === 'optimal') {
      baseScore += 0.05 // Small boost for using optimal template
    }
    
    return Math.min(baseScore, 5.0)
  }

  /**
   * Get applied enhancements for metadata
   */
  private static getAppliedEnhancements(config: EnhancedPromptConfig): string[] {
    const enhancements: string[] = []
    
    if (config.visualTheme && config.visualTheme !== 'standard' && config.visualTheme !== 'none') {
      enhancements.push(`Visual theme: ${config.visualTheme}`)
    }
    
    return enhancements
  }

}