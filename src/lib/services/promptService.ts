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
import imageLibraryService from './imageLibraryService'
import countingObjectsService from './countingObjectsService'
import hybridSVGService from './hybridSVGService'
import scrappingDoodleService from './scrappingDoodleService'
import { loadConfigSpecificPrompt, generateConfigId } from './configSpecificPromptLoader'

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

  // PHASE 1 OPTIMIZATION: In-memory cache for prompt files
  // Eliminates disk I/O overhead on subsequent requests (2-5s savings per worksheet)
  private static promptCache = new Map<string, string>();

  // PHASE 2 OPTIMIZATION: Base template cache for compression
  // Shared template loaded once, cached for all requests (30-40% token reduction)
  private static baseTemplateCache: string | null = null;

  /**
   * Main prompt generation method with iterative improvement focus
   * Generates superior prompts through integrated USP.1 + USP.2 + iterative refinement
   */
  public static async generatePrompt(
    config: WorksheetConfig,
    options: {
      forceEnhanced?: boolean
      iterativeCycle?: number
      targetQuality?: number
      previousWorksheets?: Array<{ questions: string[]; images: string[] }>
    } = {}
  ): Promise<{ prompt: string; metadata: IterativeImprovementMetadata }> {
    const startTime = Date.now()

    // Step 0: Initialize services if not already done
    await imageLibraryService.initialize()
    await countingObjectsService.initialize()
    await hybridSVGService.initialize()
    await scrappingDoodleService.initialize()

    // Step 1: Transform and validate configuration
    const enhancedConfig = this.createEnhancedConfig(config)

    // Step 2: Generate the core prompt
    const prompt = await this.generateCorePrompt(enhancedConfig, options)

    // Step 3: Create comprehensive metadata
    const metadata = this.createGenerationMetadata(enhancedConfig, options, startTime)

    return { prompt, metadata }
  }
  
  /**
   * Load configuration-specific prompt if available
   * Returns the complete prompt as a replacement for generic prompt
   *
   * PRODUCTION PATH: src/lib/prompts/configurations/{year}/{topic}/{subtopic}.md
   * Uses WORKSHEET_OBJECTS image system (proven 97.7% quality)
   */
  private static async loadConfigSpecificPrompt(
    config: EnhancedPromptConfig,
    previousWorksheets?: Array<{ questions: string[]; images: string[] }>
  ): Promise<string | null> {
    const fs = require('fs')
    const path = require('path')

    try {
      // Normalize year group (e.g., "Reception" → "reception", "Year 1" → "year1")
      const normalizedYear = config.yearGroup.toLowerCase().replace(/\s+/g, '')

      // Normalize topic (e.g., "Number and Counting" → "number-counting")
      const normalizedTopic = config.topic.toLowerCase().replace(/\s+/g, '-')

      // Normalize subtopic (e.g., "Counting to 10" → "counting-to-10")
      const normalizedSubtopic = config.subtopic.toLowerCase().replace(/\s+/g, '-')

      // Check production location for config-specific .md file
      const configPromptPath = path.join(
        process.cwd(),
        'src',
        'lib',
        'prompts',
        'configurations',
        normalizedYear,
        normalizedTopic,
        `${normalizedSubtopic}.md`
      )

      // PHASE 2 OPTIMIZATION: Check for compressed prompt first if enabled
      const useCompression = process.env.USE_PROMPT_COMPRESSION === 'true';
      const compressedPromptPath = configPromptPath.replace('.md', '-COMPRESSED.md');

      // Determine which prompt file to load
      const promptPathToUse = useCompression && fs.existsSync(compressedPromptPath)
        ? compressedPromptPath
        : configPromptPath;

      // PHASE 1 OPTIMIZATION: Check cache first
      const cacheKey = promptPathToUse;
      let rawPrompt: string;

      if (this.promptCache.has(cacheKey)) {
        // Cache HIT - use cached raw prompt
        rawPrompt = this.promptCache.get(cacheKey)!;
        console.log(`💾 Prompt cache HIT: ${path.basename(promptPathToUse)} (saved ~2-5s)`);
      } else if (fs.existsSync(promptPathToUse)) {
        // Cache MISS - load from disk and cache it
        rawPrompt = fs.readFileSync(promptPathToUse, 'utf-8');
        this.promptCache.set(cacheKey, rawPrompt);
        console.log(`📁 Prompt cache MISS - loaded and cached: ${path.basename(promptPathToUse)}`);

        // PHASE 2: If using compression, also load and cache base template
        if (useCompression && promptPathToUse === compressedPromptPath) {
          if (!this.baseTemplateCache) {
            const baseTemplatePath = path.join(
              process.cwd(),
              'src',
              'lib',
              'prompts',
              'shared',
              'base-worksheet-template.md'
            );
            if (fs.existsSync(baseTemplatePath)) {
              this.baseTemplateCache = fs.readFileSync(baseTemplatePath, 'utf-8');
              console.log(`📦 Base template cached (compression enabled - 30-40% token reduction)`);
            }
          }
        }
      } else {
        return null; // File doesn't exist
      }

      // Process the raw prompt (freshness + placeholders)
      let configPrompt = rawPrompt;

      // Inject lean freshness instructions from previous worksheets
      // LEAN FRESHNESS is now the permanent default (simpler, faster, proven effective)
      const freshnessInstructions = this.buildFreshnessInstructionsLean(previousWorksheets);

      // PHASE 2 COMPRESSION: Compose base template + config if compression enabled
      if (useCompression && this.baseTemplateCache && promptPathToUse === compressedPromptPath) {
        // Compose: Freshness + Base Template + Config Specifics
        const parts = [];

        if (freshnessInstructions) {
          parts.push(freshnessInstructions);
          console.log(`🔄 Freshness tracking enabled: ${previousWorksheets?.length || 0} previous worksheet(s) excluded`);
        }

        parts.push(this.baseTemplateCache); // Shared HTML/CSS template
        parts.push(configPrompt);             // Config-specific rules

        configPrompt = parts.join('\n\n---\n\n');
        console.log(`✅ Loaded COMPRESSED prompt: ${path.basename(promptPathToUse)}`);
        console.log(`   Mode: COMPRESSION (base template + config)`);
      } else {
        // Standard mode: Freshness + Config
        if (freshnessInstructions) {
          configPrompt = `${freshnessInstructions}\n\n---\n\n${configPrompt}`;
          console.log(`🔄 Freshness tracking enabled: ${previousWorksheets?.length || 0} previous worksheet(s) excluded`);
        }
        console.log(`✅ Loaded config-specific prompt (STANDARD): ${path.basename(promptPathToUse)}`);
      }

      // Replace placeholders with actual config values
      configPrompt = configPrompt
        .replace(/\{\{questionCount\}\}/g, config.questionCount.toString())
        .replace(/\{\{difficulty\}\}/g, config.difficulty)
        .replace(/\{\{topic\}\}/g, config.topic)
        .replace(/\{\{subtopic\}\}/g, config.subtopic)
        .replace(/\{\{yearGroup\}\}/g, config.yearGroup);

      console.log(`   Location: src/lib/prompts/configurations/${normalizedYear}/${normalizedTopic}/`);
      console.log(`   Image system: WORKSHEET_OBJECTS (proven 97.7% quality)`)
      console.log(`   Freshness: ${freshnessInstructions ? 'ENABLED' : 'DISABLED'}`);
      console.log(`   Compression: ${useCompression && promptPathToUse === compressedPromptPath ? 'ENABLED' : 'DISABLED'}`);

      return configPrompt;
    } catch (error) {
      console.warn(`⚠️ Error loading config-specific prompt:`, error)
      return null
    }
  }

  /**
   * Generate the core prompt with all enhancements applied
   */
  private static async generateCorePrompt(
    config: EnhancedPromptConfig,
    options: { iterativeCycle?: number; previousWorksheets?: Array<{ questions: string[]; images: string[] }> }
  ): Promise<string> {
    // Check for config-specific prompt first (complete replacement with freshness tracking)
    const configSpecificPrompt = await this.loadConfigSpecificPrompt(config, options.previousWorksheets)
    if (configSpecificPrompt) {
      // Config-specific prompt loaded successfully (logs already printed in loadConfigSpecificPrompt)
      return configSpecificPrompt // Return config-specific prompt as-is (no generic prompt)
    }

    // Fall back to generic prompt if no config-specific prompt exists
    console.log(`⚠️ No config-specific prompt found - using GENERIC FALLBACK`)
    console.log(`   Config: ${config.yearGroup}-${config.topic}-${config.subtopic}`)
    console.log(`   Location checked: src/lib/prompts/configurations/`)
    console.log(`   Image system: SCRAPPING DOODLE (untested with this config)`)
    console.log(`   Note: Create config-specific .md file for better results`)

    const promptVariation = this.selectOptimalVariation(config)
    const basePrompt = await this.generateVariationPrompt(config, promptVariation, options.previousWorksheets)

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
   * Convert string to proper case (first letter of each word capitalized)
   */
  private static toProperCase(str: string): string {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
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
  private static async generateVariationPrompt(
    config: EnhancedPromptConfig,
    variation: PromptVariation,
    previousWorksheets?: Array<{ questions: string[]; images: string[] }>
  ): Promise<string> {
    return await this.generateOptimalPrompt(config, previousWorksheets)
  }



  /**
   * Generate optimal prompt - OPTIMIZED VERSION (60% smaller, same quality)
   * Removed redundant warnings, consolidated rules, streamlined instructions
   */
  private static async generateOptimalPrompt(
    config: EnhancedPromptConfig,
    previousWorksheets?: Array<{ questions: string[]; images: string[] }>
  ): Promise<string> {
    const shouldApplyTheme = config.visualTheme && config.visualTheme !== 'none'
    const svgInstructions = shouldApplyTheme && config.visualTheme ? this.getSVGInstructions(config.visualTheme) : this.getContextualSVGInstructions()
    const themeContext = shouldApplyTheme && config.visualTheme ? this.getThemeContext(config.visualTheme, config.yearGroup) : null

    // Get suggested images from our pre-curated library
    const imageLibraryInstructions = await this.getImageLibraryInstructions(config)

    // Get counting objects guidance if relevant
    const countingObjectsGuidance = this.getCountingObjectsGuidance(config)

    // Get hybrid SVG guidance
    const hybridSVGGuidance = await this.getHybridSVGGuidance(config)

    // Get SCRAPPING DOODLE guidance (NEW!) - pass previousWorksheets for exclusion
    const scrappingDoodleGuidance = await this.getScrappingDoodleGuidance(config, { previousWorksheets })

    // Get subtopic-specific guidance
    const subtopicGuidance = this.getSubtopicGuidance(config)

    // Build lean freshness instructions if we have previous worksheets
    // LEAN FRESHNESS is now the permanent default (simpler, faster, proven effective)
    const freshnessInstructions = this.buildFreshnessInstructionsLean(previousWorksheets)

    // 🔍 FRESHNESS DEBUG: Log freshness instructions generation
    console.log('🔍 Freshness instructions generated:', freshnessInstructions ? 'YES' : 'NO')
    if (freshnessInstructions) {
      console.log('🔍 Freshness instructions preview (first 300 chars):', freshnessInstructions.substring(0, 300))
    }

    return `Create a ${config.yearGroup} ${config.topic} worksheet: "${config.subtopic}" (${config.difficulty}, ${config.questionCount} questions).

${freshnessInstructions}

**CRITICAL: Generate EXACTLY ${config.questionCount} questions - no more, no less.**

${subtopicGuidance}

**IMAGE REQUIREMENTS:**
- Use SCRAPPING DOODLE paths from contextual suggestions below
- OLD paths (/images/educational/counting-objects/) are DELETED and return 404
${scrappingDoodleGuidance}

**CRITICAL AGE-BASED IMAGE RULES FOR ${config.yearGroup}:**
${this.getAgeBasedImageRules(config.yearGroup)}

**CORE REQUIREMENTS:**
- UK National Curriculum aligned for ${config.subtopic}
- Age-appropriate vocabulary for ${config.yearGroup}
- Names: Emma, Oliver, Sophie, James, Lily, Thomas, Grace, Harry (vary order)${themeContext ? `\n- Theme: ${themeContext}` : ''}
- Complete HTML document starting with <!DOCTYPE html>

**OBJECT VARIETY RULE (CRITICAL):**
Each question must use a DIFFERENT object from DIFFERENT categories. Never repeat object types.
✅ Good: Q1=Fruits, Q2=School, Q3=Vehicles, Q4=Farm, Q5=Garden
❌ Bad: Q1=apples, Q2=apples, Q3=bananas (repeated fruit category)

Available categories: Fruits, Vegetables, School Items, Farm Animals, Garden, Vehicles, Toys, Sports, Food, Shapes
- Rotate image files within collections (flower.png, flower2.png, flower3.png)
- Vary scenarios: picking, buying, finding, collecting, sharing, eating
- Vary quantities: use 3, 7, 11, 15, 19 - not always 9-14

**🎨 SCRAPPING DOODLE PREMIUM COLLECTIONS (CHECK AVAILABLE DIVERSE COLLECTIONS BELOW):**
${scrappingDoodleGuidance}

**IMAGE-TO-KEYWORD MATCHING:**
Match images to question keywords exactly:
- flowers → Spring_Garden collection
- fruits → Fruit_by_ScrappinDoodles
- vegetables → FoodGroup_Vegetables
- school items → SchoolSupplies
- sports/balls → SportsBalls
- farm animals → FarmAnimalsAndBabies

${imageLibraryInstructions}

${countingObjectsGuidance}

${hybridSVGGuidance}

**IMAGE PLACEMENT BY AGE & QUANTITY:**

| Year Group | First Number ≤20 | First Number >20 |
|------------|------------------|------------------|
| Reception/Y1/Y2 | counting-objects-grid (below text) | Single image (right, class="question-svg-side") |
| Year 3+ | Single image (right) | Single image (right) |

**Visual Quantity Rule:** Show the FIRST number mentioned in question (or items-per-group for multiplication groups like "3 groups of 5" → show 5).

${config.yearGroup === 'Year 1' || config.yearGroup === 'Reception' ? `
**${config.yearGroup} Rule:** For quantities ≤20, MUST use <div class="counting-objects-grid"> with images BELOW text (NOT beside).
` : ''}

**Layout:** counting-objects-grid must be BELOW question text (not beside) to avoid squished text. Always include proper alt text.

**SVG GUIDELINES (when needed):**
- Use width="180" height="180" viewBox="0 0 180 180" for single objects
- Add class="question-svg-side" for right placement
- Use child-friendly colors: #FF69B4 pink, #FFD700 gold, #32CD32 green, #4169E1 blue
- Match question context exactly (flowers=flowers, books=books)
- Skip images for abstract math

**HTML TEMPLATE:**
<!DOCTYPE html>
<html>
<head>
    <title>${config.topic} - ${config.subtopic}</title>
    <style>
        body {
            font-family: ${this.getFontFamily(config.yearGroup)};
            font-size: ${this.getFontSize(config.yearGroup)};
            line-height: ${this.getLineHeight(config.yearGroup)};
            margin: 0;
            padding: ${this.getPadding(config.yearGroup)};
            background: white;
            color: #000;
        }
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
            letter-spacing: 0.5px;
        }
        .subtitle {
            font-size: 12pt;
            font-weight: normal;
            color: #666;
        }
        .student-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 8px 0 15px 0;
            font-size: 11pt;
            font-weight: bold;
            gap: 20px;
        }
        .worksheet-content {
            margin-top: 10px;
        }
        .question {
            margin: 15px 0;
            padding: 15px;
            border-radius: 8px;
            background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            page-break-inside: avoid;
        }
        .question-right {
            display: flex;
            align-items: flex-start;
            gap: 20px;
        }
        .question-content {
            flex: 1;
            min-width: 0;
        }
        .question-number {
            font-size: ${this.getQuestionFontSize(config.yearGroup)};
            font-weight: bold;
            color: #2c3e50;
            margin-right: 10px;
            display: inline-block;
        }
        .question-text {
            font-size: ${this.getFontSize(config.yearGroup)};
            line-height: ${this.getLineHeight(config.yearGroup)};
            margin: 0;
            display: inline;
        }
        .question-svg-side {
            width: 180px;
            height: 180px;
            margin: 15px;
            flex-shrink: 0;
            object-fit: contain;
            border-radius: 8px;
        }
        .counting-objects-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: center;
            align-items: center;
            margin: 20px auto;
            padding: 16px;
            background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            max-width: 100%;
        }
        .counting-objects-grid img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.12));
            transition: transform 0.2s ease;
        }
        .question-svg-below {
            width: 100%;
            height: 120px;
            margin: 10px 0;
            display: block;
            object-fit: contain;
            border-radius: 8px;
        }
        .question-image-side {
            width: 150px;
            height: 150px;
            margin: 10px;
            flex-shrink: 0;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #ddd;
        }
        .question-image-below {
            width: 100%;
            max-width: 500px;
            height: 120px;
            margin: 10px 0;
            display: block;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #ddd;
        }
        .answer-space {
            margin: 15px 0 10px 0;
            height: 35px;
            background: white;
            border-bottom: 2px solid #333;
            position: relative;
        }
    </style>
</head>
<body>
    <div class="student-info">
        <div>Name: _____________</div>
        <div>Date: _____________</div>
    </div>
    <div class="worksheet-header">
        <h1 class="worksheet-title">${this.toProperCase(config.topic.replace('-', ' '))}${config.subtopic ? ` - <span class="subtitle">${this.toProperCase(config.subtopic.replace('-', ' '))}</span>` : ''}</h1>
    </div>
    <div class="worksheet-content">
        <!-- 🚨 CRITICAL: Generate exactly ${config.questionCount} questions here - NOT ${config.questionCount + 1}, NOT ${config.questionCount - 1}, EXACTLY ${config.questionCount} 🚨 -->
    </div>
</body>
</html>

**🔥 FINAL INSTRUCTION FOR LLM - READ CAREFULLY 🔥**
**QUESTION COUNT: ${config.questionCount}**
**YOU MUST GENERATE EXACTLY ${config.questionCount} QUESTIONS**
**COUNT: 1, 2, 3, 4, 5 = ${config.questionCount} questions total**
**DO NOT GENERATE ${config.questionCount + 1} QUESTIONS**
**DO NOT GENERATE ${config.questionCount - 1} QUESTIONS**
**STOP AFTER QUESTION NUMBER ${config.questionCount}**

**⚠️ MANDATORY PRE-GENERATION PLANNING - DO THIS BEFORE WRITING ANY QUESTIONS ⚠️**

**STEP 1: PLAN YOUR ${config.questionCount} DIFFERENT OBJECTS (CHOOSE NOW!):**
Before generating any HTML, mentally select ${config.questionCount} COMPLETELY DIFFERENT objects:

Example valid plan for 5 questions:
- Q1 object: strawberries (Fruits category)
- Q2 object: rulers (School category)
- Q3 object: buses (Vehicles category)
- Q4 object: butterflies (Garden category)
- Q5 object: teddy bears (Toys category)

Example INVALID plan (DO NOT DO THIS):
- Q1 object: apples ❌
- Q2 object: apples ❌ (SAME AS Q1!)
- Q3 object: apples ❌ (SAME AS Q1 AND Q2!)

**STEP 2: VERIFY YOUR PLAN:**
- [ ] All ${config.questionCount} objects are DIFFERENT ✓
- [ ] No object appears twice ✓
- [ ] Using varied categories (not all animals, not all fruits) ✓

**STEP 3: ONLY THEN generate the HTML with your planned objects**

Generate EXACTLY ${config.questionCount} questions with embedded SVG images when questions mention specific objects:

FOR EVERY question that mentions specific objects (stickers, crayons, flowers, books, biscuits, toys, etc.):
- Questions 1-2: Use class="question-svg-side" for side placement
- Questions 3-4: Use class="question-svg-below" for below placement
- Question 5: Use class="question-svg-side" for side placement

MANDATORY SVG CREATION for these objects:
- Stickers: Colorful star/circle shapes with bright colors
- Crayons: Elongated colorful cylinders with pointed tips
- Flowers: Central circles with radiating petals and green stems
- Books: Rectangular shapes with spine details and varied colors
- Biscuits/cookies: Brown circles with texture details
- Any other specific objects mentioned in questions

Each question should be wrapped in proper HTML structure using the classes defined above.

**CRITICAL IMAGE-QUESTION MATCHING REQUIREMENTS:**
Before adding any image, read the question text carefully and ensure:
1. Image objects match exactly what's mentioned (flowers=flowers, books=books, animals=animals)
2. Images support the mathematics without revealing answers
3. Use searchPixabayImages only when specific objects are mentioned
4. NO images for abstract math or pure calculations
5. Each image must educationally enhance the question, not distract from it

**CRITICAL OUTPUT REQUIREMENTS - SYSTEM WILL FAIL IF NOT FOLLOWED:**
- Return ONLY the complete HTML document
- Must start with <!DOCTYPE html>
- Must end with </html>
- NO explanatory text before or after the HTML
- NO markdown formatting around the HTML
- NO code blocks or backticks
- NO "Here is the worksheet..." or similar prefixes
- NO "I hope this helps..." or similar suffixes
- NO language identifiers (html, HTML, xml, XML)
- NO conversational responses or explanations
- NO JSON format responses
- JUST the raw HTML document - nothing else

**FORBIDDEN PATTERNS - DO NOT USE:**
❌ Code blocks with backticks
❌ Here is the worksheet:
❌ I've created a worksheet for you:
❌ html
❌ HTML
❌ Based on your requirements:
❌ I hope this helps!
❌ Let me know if you need changes.

**REQUIRED START PATTERN:**
✅ <!DOCTYPE html>

**EXAMPLE OF CORRECT FORMAT:**
<!DOCTYPE html>
<html>
<head>
    <title>...</title>
    <style>...</style>
</head>
<body>
    ...
</body>
</html>

**SYSTEM ERROR PREVENTION:**
Your response must be parseable as HTML. Start immediately with <!DOCTYPE html> and end with </html>. Any deviation will cause generation failure and user disappointment.

**FINAL REMINDER: Your first character must be "<" and your response must be PURE HTML. The system expects HTML only - no explanations, no code blocks, no prefixes.**`
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
        sizingGuidelines: '120-140px height, maintain aspect ratio with detailed features and professional vector quality',
        arrangementInstructions: 'Animals integrated with mathematical problems as counting objects or story elements, following modern flat design principles',
        qualityRequirements: 'Freepik-level quality: Clean modern animal designs with vibrant colors (#E74C3C, #3498DB, #2ECC71, #F39C12, #9B59B6), 2-3px stroke weights, rounded corners (2-4px), high contrast ratios. Educational clarity with recognizable features, scalable vector precision, no backgrounds or containers. FLOWERS: Must have realistic petal shapes (5-8 petals around center), not geometric diamonds or abstract shapes.'
      },
      'food': {
        searchTerms: ['fruits', 'vegetables', 'healthy food', 'kitchen items'],
        sizingGuidelines: '120-140px height, appetizing proportions with detailed textures and professional vector clarity',
        arrangementInstructions: 'Food items used for counting, fractions, or measurement problems. For fractions, show exactly the fractional parts with clear boundaries and contrasting colors. For measurements, show accurate portions or weights with readable labels.',
        qualityRequirements: 'Professional food illustrations: Contemporary flat design style, harmonious color palette, sharp vector lines, proper scaling. APPLES: Red/green with leaf and slight highlight, never cut off. SWEETS: Detailed candy shapes (gummy bears, lollipops, wrapped sweets) with gradients and textures - NOT simple circles. All items must fit completely within containers with 10px margins. Accurate mathematical representation with clear visual hierarchy, optimized SVG markup, and educational appropriateness.'
      },
      'sports': {
        searchTerms: ['sports equipment', 'balls', 'athletic gear', 'playground'],
        sizingGuidelines: '120-140px height, dynamic proportions with action details and crisp vector quality',
        arrangementInstructions: 'Sports items for counting, scoring, or measurement exercises. For comparisons, show accurate score differences with clear visual indicators. For fractions, represent exact team/player portions with distinct colors.',
        qualityRequirements: 'Dynamic sports graphics: Modern flat design with subtle gradients, consistent stroke weights (2-3px), vibrant but balanced colors. High contrast for educational clarity, scalable precision, clean bezier curves, and mathematically accurate representations.'
      },
      'space': {
        searchTerms: ['planets', 'rockets', 'stars', 'astronauts'],
        sizingGuidelines: '120-140px height, cosmic proportions with detailed elements and vector precision',
        arrangementInstructions: 'Space elements for counting, patterns, or mathematical exploration with scientific accuracy and visual appeal',
        qualityRequirements: 'Inspiring space imagery: Professional vector quality with clean modern design, appropriate color schemes, sharp edges, rounded corners where suitable. Scientifically accurate with educational value, optimized for scaling, and high visual contrast.'
      },
      'standard': {
        searchTerms: ['geometric shapes', 'mathematical symbols', 'educational icons'],
        sizingGuidelines: '120-140px height, clean geometric proportions with precise details and perfect vector alignment',
        arrangementInstructions: 'Mathematical symbols and shapes supporting problem concepts. For fractions, show exact fractional divisions with clear boundaries. For measurements, display accurate scales and units with readable typography. For comparisons, represent precise numerical relationships.',
        qualityRequirements: 'Professional mathematical graphics: Curriculum-aligned designs with Freepik-level quality standards. Perfect geometric precision, consistent stroke weights, high contrast ratios (4.5:1+), optimized SVG paths, and educational clarity. Modern flat design aesthetic with technical excellence.'
      },
      'none': {
        searchTerms: ['geometric shapes', 'mathematical symbols', 'educational icons'],
        sizingGuidelines: '120-140px height, clean geometric proportions with precise details and professional vector quality',
        arrangementInstructions: 'Mathematical symbols and shapes supporting problem concepts. For fractions, show exact fractional divisions with clear boundaries. For measurements, display accurate scales and units with proper labeling. For comparisons, represent precise numerical relationships.',
        qualityRequirements: 'Professional curriculum-aligned graphics: Modern flat design principles, sharp vector lines (2-3px), harmonious colors, high educational value. Technical excellence with optimized markup, proper scaling, and mathematical accuracy. Clean contemporary aesthetic without backgrounds or decorative elements.'
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
      sizingGuidelines: '120-140px for side placement, full-width × 100px for below placement (increased height to prevent cutoff of tall objects like books), maintain crisp quality with professional vector precision',
      arrangementInstructions: 'CRITICAL: SVG MUST MATCH QUESTION CONTEXT EXACTLY. If question mentions "flowers", show flowers. If "books", show books. If "3 rows of 4", show exactly 3 rows with exactly 4 objects each. CONTAINER-FREE SVG INTEGRATION: Use class="question-svg-side" (150×150px) for 1-4 objects. Use class="question-svg-below" (500×160px) for 5+ objects in arrays/groups to prevent cutoff of tall objects like books. MANDATORY SPACING: 8-12px horizontal gaps, 6-10px vertical gaps between ALL objects - objects must NEVER touch or overlap. MATHEMATICAL ACCURACY: Arrays must show correct rows×columns, division must show correct groupings, counting must show exact quantities mentioned. NO generic shapes - use contextually appropriate objects that match the problem story.',
      qualityRequirements: 'TARGET 4.5+ FREEPIK-LEVEL QUALITY: Professional container-free illustrations with VIBRANT harmonious colors (#E74C3C red, #3498DB blue, #2ECC71 green, #F39C12 orange, #9B59B6 purple, #FF6B6B coral, #4ECDC4 teal), sharp 2-3px stroke weights, perfectly aligned vector paths. MODERN FLAT DESIGN: Clean contemporary style with subtle gradients, rounded corners (2-4px radius), high contrast ratios (minimum 4.5:1). CRITICAL QUALITY RULES: NO solid black fills, NO basic geometric shapes for real objects, NO overly simplified designs. SPECIFIC EXAMPLES: FLOWERS must look like real flowers - central yellow circle with 5-8 separate teardrop petals radiating outward, green stem below. BANNED: diamond shapes, geometric patterns. BOOKS must look like real books - main rectangle with visible spine line, title lines on spine, 3D depth shadow, book proportions (taller than wide). CRITICAL: Books must fit completely within containers with 15px margins - NEVER cut off at bottom. BANNED: plain colored rectangles without book details. PENCILS must be THIN and elongated (6:1 ratio minimum, 100px long × 12px wide max) with 8-12px gaps between each - yellow wooden body, silver ferrule, pink eraser, sharp tip. Never thick/fat like markers or touching each other. SWEETS must be detailed candy shapes (gummy bears with limb details, lollipops with sticks, wrapped candies with crinkles) with 8-12px spacing - NEVER simple circles or touching objects. APPLES must be red/green with leaf and highlight, NEVER cut off - ensure 10px margins. POSITIONING: All objects must fit completely within their containers with minimum 10px margins from all edges. Make every SVG visually appealing and child-friendly. NO backgrounds, shadows, containers, or decorative elements. TECHNICAL EXCELLENCE: Optimized SVG markup, proper viewBox scaling, clean bezier curves, minimal anchor points. Each SVG must be contextually perfect, educationally valuable, scalable at all sizes, and meet minimum age-appropriate size requirements. CRITICAL: Elements smaller than age-appropriate minimums must be SKIPPED entirely.'
    }
  }

  /**
   * Get font family based on year group
   */
  private static getFontFamily(yearGroup: string): string {
    const yearNum = this.extractYearNumber(yearGroup)
    if (yearGroup.toLowerCase().includes('reception') || yearNum <= 2) {
      return "'Comic Sans MS', Arial, sans-serif"
    }
    return "'Arial', 'Times New Roman', serif"
  }

  /**
   * Get font size based on year group
   */
  private static getFontSize(yearGroup: string): string {
    const yearNum = this.extractYearNumber(yearGroup)
    if (yearGroup.toLowerCase().includes('reception')) return '18pt'
    if (yearNum === 1) return '16pt'
    if (yearNum === 2) return '14pt'
    return '12pt'
  }

  /**
   * Get question font size based on year group
   */
  private static getQuestionFontSize(yearGroup: string): string {
    const yearNum = this.extractYearNumber(yearGroup)
    if (yearGroup.toLowerCase().includes('reception')) return '20pt'
    if (yearNum === 1) return '18pt'
    if (yearNum === 2) return '16pt'
    return '14pt'
  }

  /**
   * Get line height based on year group
   */
  private static getLineHeight(yearGroup: string): string {
    const yearNum = this.extractYearNumber(yearGroup)
    if (yearGroup.toLowerCase().includes('reception')) return '1.9'
    if (yearNum === 1) return '1.7'
    if (yearNum === 2) return '1.6'
    return '1.5'
  }

  /**
   * Get padding based on year group
   */
  private static getPadding(yearGroup: string): string {
    const yearNum = this.extractYearNumber(yearGroup)
    if (yearGroup.toLowerCase().includes('reception')) return '8mm 10mm'
    if (yearNum === 1) return '9mm 11mm'
    return '10mm 12mm'
  }

  /**
   * Get answer space height based on year group
   */
  private static getAnswerHeight(yearGroup: string): string {
    const yearNum = this.extractYearNumber(yearGroup)
    if (yearGroup.toLowerCase().includes('reception') || yearNum === 1) return '55px'
    return '40px'
  }

  /**
   * Convert to proper case
   */
  private static toProperCase(str: string): string {
    return str.replace(/\b\w/g, l => l.toUpperCase())
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
   * Get age-based image rules for the specific year group
   */
  private static getAgeBasedImageRules(yearGroup: string): string {
    const yearNum = parseInt(yearGroup.replace('Year ', '').replace('Reception', '0'))

    if (yearNum >= 4) {
      return `**🚨 MANDATORY FOR YEAR 4+ (${yearGroup}):**
- **ONLY use SINGLE REPRESENTATIVE images** - never multiple counting objects
- Use class="question-svg-side" for symbolic representation
- Example: "324 books" → show 1 book image, NOT 324 books
- **ABSOLUTELY NO scrollable containers or counting arrays**
- **NO <div class="counting-container"> for large numbers**
- Focus on symbolic/representative imagery, not literal counting`
    } else {
      return `**📏 FOR YOUNGER STUDENTS (${yearGroup}):**
- Small quantities (≤8): Use counting objects with class="counting-container"
- Large quantities (>8): Use single representative image with class="question-svg-side"
- **Maximum 400px container width - NO horizontal scrolling allowed**
- Keep visual counting aids simple and clear`
    }
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

  /**
   * Get image library instructions for professional image integration
   */
  private static async getImageLibraryInstructions(config: EnhancedPromptConfig): Promise<string> {
    // Check if image library is available
    if (!imageLibraryService.isAvailable()) {
      return `**PRE-CURATED IMAGE LIBRARY NOT AVAILABLE - USE EMBEDDED SVG ONLY**
- Professional image library not initialized
- Fall back to embedded SVG strategy for all images
- Follow the embedded SVG guidelines below for visual content`
    }

    // Get library statistics and available categories
    const stats = imageLibraryService.getStats()
    const categories = imageLibraryService.getCategories()

    // Generate contextual image suggestions based on topic/theme
    const topicContext = `${config.topic} ${config.subtopic}`.toLowerCase()
    let suggestedImages: string[] = []

    // Get contextually relevant images
    const contextualImage = await imageLibraryService.getContextualImage(topicContext)
    if (contextualImage) {
      suggestedImages.push(`- PRIMARY SUGGESTED IMAGE: ${contextualImage.path} (${contextualImage.tags.join(', ')})`)
    }

    // Get category-specific suggestions
    for (const category of categories.slice(0, 3)) { // Top 3 categories
      const randomImage = imageLibraryService.getRandomImageFromCategory(category)
      if (randomImage) {
        suggestedImages.push(`- ${category.toUpperCase()}: ${randomImage.path} (${randomImage.tags.join(', ')})`)
      }
    }

    return `**PRE-CURATED PROFESSIONAL IMAGE LIBRARY AVAILABLE:**
- ${stats?.total_images || 0} professional educational images available
- Categories: ${categories.join(', ')}
- License: CC0 (Creative Commons Zero) - No attribution required
- Quality: Professional stock photos from Pixabay, curated for education

**PRIORITY 1: USE PRE-CURATED PROFESSIONAL IMAGES**
**AVAILABLE IMAGES FOR THIS WORKSHEET:**
${suggestedImages.join('\n')}

**HOW TO USE PRE-CURATED IMAGES:**
- Include images using: <img src="/images/educational/[category]/[subcategory]/[filename]" class="question-image-side" alt="[description]">
- For side placement: class="question-image-side" (150×150px)
- For below placement: class="question-image-below" (500×120px)
- ALWAYS include descriptive alt text for accessibility
- Images are locally hosted - no CORS issues, fast loading
- Choose images that match question context exactly

**CSS FOR PROFESSIONAL IMAGES:**
        .question-image-side {
            width: 150px;
            height: 150px;
            margin: 10px;
            flex-shrink: 0;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #ddd;
        }
        .question-image-below {
            width: 100%;
            max-width: 500px;
            height: 120px;
            margin: 10px 0;
            display: block;
            object-fit: cover;
            border-radius: 8px;
            border: 2px solid #ddd;
        }

**INTEGRATION PRIORITY:**
1. FIRST: Check if question content matches available pre-curated images
2. Use professional images when available and contextually appropriate
3. FALLBACK: Use embedded SVG only when no suitable pre-curated image exists
4. NEVER mix both - use EITHER professional image OR embedded SVG per question

**NO ATTRIBUTION REQUIRED:**
- All images are CC0 (Creative Commons Zero) or copyright-free
- No attribution text needed in worksheets
- Images cleared for commercial educational use`
  }

  /**
   * Get counting objects guidance for enhanced SVG generation
   */
  private static getCountingObjectsGuidance(config: EnhancedPromptConfig): string {
    // Provide guidance for counting-related topics AND topics that benefit from visual counting objects
    const isCountingTopic = config.subtopic.toLowerCase().includes('counting') ||
                           config.topic.toLowerCase().includes('number') ||
                           config.topic.toLowerCase().includes('count') ||
                           config.topic.toLowerCase().includes('addition') ||
                           config.topic.toLowerCase().includes('subtraction') ||
                           config.subtopic.toLowerCase().includes('addition') ||
                           config.subtopic.toLowerCase().includes('subtraction')

    if (!isCountingTopic || !countingObjectsService.isAvailable()) {
      return ''
    }

    // Get enhancement suggestions from our counting objects metadata
    const enhancements = countingObjectsService.getPromptEnhancements(
      config.topic,
      config.subtopic,
      config.yearGroup
    )

    if (enhancements.length === 0) {
      return ''
    }

    const stats = countingObjectsService.getStats()

    return `**COUNTING OBJECTS ENHANCEMENT (METADATA-DRIVEN):**
- Available counting objects: ${stats?.totalObjects || 0} objects in ${stats?.categories || 0} categories
- Metadata-enhanced suggestions: ${Object.keys(stats?.byCategory || {}).join(', ')}

**ENHANCED GUIDANCE:**
${enhancements.map(enhancement => `- ${enhancement}`).join('\n')}

**COUNTING OBJECTS BEST PRACTICES:**
- Use our curated counting objects (flowers, pencils, books) when possible
- Ensure objects are clearly separated for easy counting
- Match object selection to question context (e.g., school supplies for classroom themes)
- Objects should be age-appropriate for ${config.yearGroup}
- Maintain visual consistency within each question`
  }

  /**
   * Get hybrid SVG guidance for intelligent static/AI selection
   */
  private static async getHybridSVGGuidance(config: EnhancedPromptConfig): Promise<string> {
    // Provide guidance for visual content topics including addition/subtraction
    const hasVisualContent = config.subtopic.toLowerCase().includes('counting') ||
                            config.topic.toLowerCase().includes('number') ||
                            config.topic.toLowerCase().includes('addition') ||
                            config.topic.toLowerCase().includes('subtraction') ||
                            config.subtopic.toLowerCase().includes('addition') ||
                            config.subtopic.toLowerCase().includes('subtraction') ||
                            config.layout === 'visual-heavy'

    if (!hasVisualContent) {
      return ''
    }

    const stats = hybridSVGService.getStats()

    // Check what static SVGs are available
    const availableObjects = Object.keys(stats.staticCapabilities)

    if (availableObjects.length === 0) {
      return `**HYBRID SVG SERVICE:**
- Static SVG library not available
- Falling back to AI-generated SVGs only
- Following enhanced prompt guidance for quality`
    }

    return `**HYBRID SVG STRATEGY (STATIC-FIRST APPROACH):**
- Available static objects: ${availableObjects.join(', ')} (${stats.availableObjects} total)
- Static SVG limits: 1-20 objects per type
- Supported arrangements: linear, grid, cluster

**MANDATORY STATIC SVG USAGE:**
- **MUST USE STATIC SVGs** for: flowers, pencils, books (quantities 1-20)
- **NEVER generate embedded SVGs** when static files are available
- **IMMEDIATE DETECTION**: If question mentions flowers/pencils/books, use static SVGs

**STATIC SVG TEMPLATES (COPY EXACTLY):**

**❌ OLD STATIC PATHS REMOVED - DO NOT USE!**
**These paths are DEPRECATED and should NOT be used:**
- /images/educational/counting-objects/flower/
- /images/educational/counting-objects/pencil/
- /images/educational/counting-objects/book/

**✅ USE SCRAPPING DOODLE PATHS FROM CONTEXTUAL SUGGESTIONS ABOVE ONLY!**

**REQUIRED CSS (include always):**
\`\`\`css
/* Single image placement - RIGHT side for space efficiency */
.question-svg-side, .question-image-side, img.question-svg-side, svg.question-svg-side {
  width: 180px !important;
  height: 180px !important;
  max-width: 180px !important;
  max-height: 180px !important;
  min-width: 180px !important;
  min-height: 180px !important;
  float: right !important;
  margin: 0 0 15px 20px !important;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  padding: 10px;
  background: #fafafa;
  display: block !important;
  object-fit: contain;
}

/* 2-row layout for Reception/Year 1/Year 2 quantities ≤20 */
.counting-container-two-row {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 15px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  align-content: flex-start;
}

.counting-object-large {
  width: 50px !important;
  height: 50px !important;
  border-radius: 6px;
  flex-shrink: 0;
  margin: 2px;
}

/* Legacy container for backwards compatibility */
.counting-container {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.counting-object {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  flex-shrink: 0;
}

/* Ensure no horizontal scrolling */
* {
  max-width: 100%;
  box-sizing: border-box;
}
\`\`\`

**AI GENERATION TRIGGERS:**
- Quantity > 20 objects
- Complex mathematical arrangements (specific rows × columns)
- Mixed object types in single visual
- Custom spacing or special layouts
- Objects not in our static library

**🎯 SMART DECISION LOGIC:**
1. **PRIORITIZE PREMIUM OBJECTS**: When creating counting questions, prefer flowers, pencils, or books
2. **USE STATIC TEMPLATES**: For flowers/pencils/books, use the premium static templates above
3. **FALLBACK TO EMBEDDED**: For other objects (crayons, stickers, toys), create embedded SVGs
4. **OPTIMAL STRATEGY**: Mix of premium static objects + embedded SVGs for variety

**RECOMMENDED QUESTION DISTRIBUTION:**
- 60% premium objects (flowers, pencils, books) using static templates
- 40% other objects (crayons, stickers, toys) using embedded SVGs
- This provides the best balance of quality and variety

**EXAMPLE QUESTIONS:**
- "How many flowers are in the garden?" → Use flower static template
- "Count Sophie's pencils" → Use pencil static template
- "How many books on the shelf?" → Use book static template
- "Count the colorful crayons" → Use embedded SVG (variety object)

**QUALITY ASSURANCE:**
- Static SVGs = Guaranteed high quality and consistency
- AI SVGs = Use enhanced prompts with our metadata guidance
- Never mix static and AI SVGs in same question`
  }

  /**
   * Get subtopic-specific question guidance
   */
  private static getSubtopicGuidance(config: EnhancedPromptConfig): string {
    const subtopic = config.subtopic.toLowerCase()
    
    //  Comparison subtopics (more-or-less, size-comparison)
    if (subtopic.includes('more') || subtopic.includes('less') || subtopic.includes('comparison')) {
      return `**📊 SUBTOPIC: ${config.subtopic.toUpperCase()} - COMPARISON QUESTIONS**

**CRITICAL: These are COMPARISON questions, NOT basic counting!**

**✅ CORRECT Question Types:**
- "Which group has MORE {objects}?"
- "Are there MORE {object1} or MORE {object2}?"
- "Circle the group with FEWER {objects}."
- "Which has LESS: the {objects1} or the {objects2}?"
- "Compare the groups. Which is BIGGER/SMALLER?"

**✅ CORRECT Visual Format:**
Show TWO groups side by side for comparison:
\`\`\`html
<p>Which group has more flowers?</p>
<div class="counting-objects-grid">
  <div style="display:inline-block; margin-right: 20px;">
    <p>Group A:</p>
    <img src="..." /> <img src="..." /> <img src="..." />
  </div>
  <div style="display:inline-block;">
    <p>Group B:</p>
    <img src="..." /> <img src="..." /> <img src="..." /> <img src="..." />
  </div>
</div>
\`\`\`

**❌ WRONG - DON'T DO THIS:**
- "Count the flowers. How many?" ← This is COUNTING, not COMPARISON!
- "Emma has 5 flowers" ← This is ADDITION/SUBTRACTION!
- Single group shown ← Need TWO groups to compare!

**EXAMPLES:**
1. "There are 3 red apples and 5 green apples. Which color has more?"
2. "Look at the two groups of pencils. Circle the group with fewer pencils."
3. "Compare the butterflies and bees. Which group is bigger?"`
    }
    
    // Addition subtopics
    if (subtopic.includes('addition') || subtopic.includes('adding') || subtopic.includes('combining')) {
      return `**➕ SUBTOPIC: ${config.subtopic.toUpperCase()} - ADDITION QUESTIONS**

**✅ CORRECT Question Types:**
- "Emma has {n} {objects}. Oliver gives her {n} more. How many {objects} does Emma have now?"
- "There are {n} {objects} and {n} more {objects}. How many {objects} in total?"
- "{n} + {n} = ?"
- "What is {n} add {n}?"

**❌ WRONG:**
- "Count the flowers" ← This is COUNTING!
- "Which has more?" ← This is COMPARISON!
- "Emma had 5 and gave away 2" ← This is SUBTRACTION!`
    }
    
    // Subtraction subtopics
    if (subtopic.includes('subtraction') || subtopic.includes('taking') || subtopic.includes('subtracting')) {
      return `**➖ SUBTOPIC: ${config.subtopic.toUpperCase()} - SUBTRACTION QUESTIONS**

**✅ CORRECT Question Types:**
- "Emma had {n} {objects}. She gave away {n}. How many {objects} does she have left?"
- "There were {n} {objects}. {n} flew away. How many {objects} are left?"
- "{n} - {n} = ?"
- "What is {n} take away {n}?"

**❌ WRONG:**
- "Count the flowers" ← This is COUNTING!
- "Emma has 3 and gets 2 more" ← This is ADDITION!`
    }
    
    // Counting/number recognition - basic
    if (subtopic.includes('counting') || subtopic.includes('number') || subtopic.includes('recognition')) {
      return `**🔢 SUBTOPIC: ${config.subtopic.toUpperCase()} - COUNTING QUESTIONS**

**✅ CORRECT Question Types:**
- "Count the {objects}. How many are there?"
- "How many {objects} can you see?"
- "Circle {n} {objects}."
- "Write the number of {objects}."

**❌ WRONG:**
- "Which has more?" ← This is COMPARISON!
- "Emma has 3 and gets 2 more" ← This is ADDITION!`
    }
    
    // Default: No specific guidance
    return `**📝 SUBTOPIC: ${config.subtopic}**\nCreate questions appropriate for this specific subtopic.`
  }

  /**
   * Get SCRAPPING DOODLE specific guidance and collection suggestions
   *
   * ⚠️ STATUS: FALLBACK ONLY - NOT USED FOR CONFIGS WITH .MD FILES
   *
   * This method is part of the generic prompt system and is ONLY executed when:
   * - No config-specific .md file exists for the year/topic/subtopic
   * - System falls back to generic prompt generation
   *
   * PRODUCTION USAGE:
   * - Reception counting: NOT USED (has config-specific .md file with WORKSHEET_OBJECTS)
   * - Other configs: MAY BE USED (if no .md file exists)
   *
   * See ARCHITECTURE.md for details on production vs fallback systems.
   */
  private static async getScrappingDoodleGuidance(
    config: EnhancedPromptConfig,
    options?: { previousWorksheets?: Array<{ questions: string[]; images: string[] }> }
  ): Promise<string> {
    if (!scrappingDoodleService.isAvailable()) {
      return `**SCRAPPING DOODLE SERVICE NOT AVAILABLE**
- Premium SCRAPPING DOODLE collections not initialized
- Fall back to static templates below`
    }

    // Extract recently used collections from previous worksheets
    const recentlyUsedCollections = new Set<string>();
    if (options.previousWorksheets && options.previousWorksheets.length > 0) {
      // Get collections from last 2 iterations to avoid
      const recentWorksheets = options.previousWorksheets.slice(-2);
      recentWorksheets.forEach(ws => {
        ws.images.forEach(imgPath => {
          const match = imgPath.match(/SCRAPPING DOODLE\/([^\/]+)/i);
          if (match) {
            recentlyUsedCollections.add(match[1]);
          }
        });
      });

      if (recentlyUsedCollections.size > 0) {
        console.log(`🚫 Excluding ${recentlyUsedCollections.size} recently used collections:`, Array.from(recentlyUsedCollections));
      }
    }

    // Get MULTIPLE diverse collections for variety across questions
    // INCREASED from 6 to 30 to provide much more variety and prevent repetition
    let diverseCollections = scrappingDoodleService.getTopDiverseCollectionsForTopic(
      config.topic,
      config.subtopic,
      config.yearGroup,
      50  // Get 50 collections (increased to account for filtering)
    )

    // FILTER OUT recently used collections
    if (recentlyUsedCollections.size > 0) {
      const beforeCount = diverseCollections.length;
      diverseCollections = diverseCollections.filter(collection =>
        !recentlyUsedCollections.has(collection.name)
      );
      console.log(`✂️ Filtered collections: ${beforeCount} → ${diverseCollections.length} (removed ${beforeCount - diverseCollections.length} recent)`);

      // Take top 30 after filtering
      diverseCollections = diverseCollections.slice(0, 30);
    } else {
      // No previous worksheets, just take top 30
      diverseCollections = diverseCollections.slice(0, 30);
    }

    if (diverseCollections.length === 0) {
      return `**NO MATCHING SCRAPPING DOODLE COLLECTIONS FOUND**
- No suitable collections for topic: ${config.topic} ${config.subtopic}
- Use generic static templates below`
    }

    // RANDOMIZE collection order to prevent same patterns across iterations
    // Fisher-Yates shuffle algorithm for true randomization
    for (let i = diverseCollections.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [diverseCollections[i], diverseCollections[j]] = [diverseCollections[j], diverseCollections[i]];
    }

    // Build a comprehensive guide showing ALL available collections
    let collectionsGuide = '**🎨 AVAILABLE DIVERSE SCRAPPING DOODLE COLLECTIONS:**\n\n'
    collectionsGuide += '**🔥 CRITICAL: USE DIFFERENT COLLECTIONS FOR EACH QUESTION! 🔥**\n'
    collectionsGuide += '**⚡ FRESHNESS RULE: Pick collections from DIFFERENT positions in the list below for variety! ⚡**\n'
    collectionsGuide += '**MANDATORY: Question 1 = Collection A, Question 2 = Collection B, Question 3 = Collection C, etc.**\n'
    collectionsGuide += '**FORBIDDEN: DO NOT use the same collection category (animals/plants/school) for multiple questions!**\n'
    collectionsGuide += `**💡 TIP: We have ${diverseCollections.length} collections below - explore beyond the first few!**\n\n`
    
    for (let i = 0; i < diverseCollections.length; i++) {
      const collection = diverseCollections[i]
      const sampleImage1 = await scrappingDoodleService.getImageFromCollection(collection, 'color', 0)
      const sampleImage2 = await scrappingDoodleService.getImageFromCollection(collection, 'color', 1)

      // Build keyword-to-filename mapping for this collection
      let keywordMappingSection = ''
      if (collection.imageFiles && collection.imageFiles.length > 0) {
        // Get color files only (exclude BW_ prefix files)
        const colorFiles = collection.imageFiles.filter(f => !f.startsWith('BW_'))
        
        // Show keyword mappings for collections with reasonable size (increased limit to 20)
        if (colorFiles.length > 0 && colorFiles.length <= 20) {
          keywordMappingSection = `\n**Available images:**\n${colorFiles.slice(0, 15).map(filename => {
            // Extract keyword from filename
            const keyword = filename
              .replace(/^(vegetable_|fruit_|animal_|flower)/i, '')
              .replace(/\d+\.png$/, '')
              .replace(/\.png$/, '')
              .toLowerCase()
            
            return `  - ${keyword} → ${collection.path}/${filename}`
          }).join('\n')}`
        } else if (colorFiles.length > 20) {
          // For large collections, show a sampling of key vegetables/fruits/items
          keywordMappingSection = `\n**Sample images (${colorFiles.length} total available):**\n${colorFiles.slice(0, 10).map(filename => {
            const keyword = filename
              .replace(/^(vegetable_|fruit_|animal_|flower)/i, '')
              .replace(/\d+\.png$/, '')
              .replace(/\.png$/, '')
              .toLowerCase()
            
            return `  - ${keyword} → ${collection.path}/${filename}`
          }).join('\n')}\n  - (+ ${colorFiles.length - 10} more images available)`
        }
      }

      // Determine collection category for diversity guidance
      const name = collection.name.toLowerCase()
      let categoryLabel = 'General'
      if (name.includes('farm') || name.includes('animal')) categoryLabel = '🐔 ANIMALS'
      else if (name.includes('garden') || name.includes('flower') || name.includes('spring')) categoryLabel = '� PLANTS/GARDEN'
      else if (name.includes('school') || name.includes('supplies')) categoryLabel = '📚 SCHOOL SUPPLIES'
      else if (name.includes('fruit')) categoryLabel = '🍎 FRUITS'
      else if (name.includes('vegetable') || name.includes('food')) categoryLabel = '🥕 VEGETABLES/FOOD'
      else if (name.includes('sport') || name.includes('ball')) categoryLabel = '⚽ SPORTS'

      collectionsGuide += `**${i + 1}. ${categoryLabel}: ${collection.name}**
- Path: ${collection.path}
- Topics: ${collection.topics.slice(0, 4).join(', ')}
- Images: ${collection.imageCount} available${keywordMappingSection}
- Example 1: ${sampleImage1}
- Example 2: ${sampleImage2}

`
    }

    collectionsGuide += `\n**📋 USAGE STRATEGY FOR MAXIMUM VARIETY:**
1. **Question 1** → Use Collection 1 (${diverseCollections[0].name.split('_')[0]} theme)
2. **Question 2** → Use Collection 2 (${diverseCollections[1].name.split('_')[0]} theme)
3. **Question 3** → Use Collection 3 (${diverseCollections[2].name.split('_')[0]} theme)
4. **Question 4** → Use Collection 4 (${diverseCollections[3] ? diverseCollections[3].name.split('_')[0] : diverseCollections[0].name.split('_')[0]} theme)
5. **Question 5** → Use Collection 5 (${diverseCollections[4] ? diverseCollections[4].name.split('_')[0] : diverseCollections[1].name.split('_')[0]} theme)

**EXAMPLES OF GOOD VARIETY:**
✅ Q1: Flowers (Spring Garden) → Q2: Books (School Supplies) → Q3: Chickens (Farm Animals) → Q4: Apples (Fruits) → Q5: Pencils (School Supplies)
✅ Q1: Butterflies (Garden) → Q2: Carrots (Vegetables) → Q3: School bus (School) → Q4: Cow (Farm) → Q5: Balls (Sports)

**EXAMPLES OF BAD VARIETY (DO NOT DO THIS):**
❌ Q1: Chickens → Q2: Cows → Q3: Pigs → Q4: Sheep → Q5: Horses (ALL ANIMALS - BORING!)
❌ Q1: Flowers → Q2: Flowers → Q3: Flowers (REPETITIVE!)
❌ Q1: Football Frogs → Q2: Garden Frogs (SAME SUBJECT - frogs!)

**🚨 CRITICAL RULES - READ CAREFULLY! 🚨**

**1. NEVER USE DECORATIVE COLLECTIONS FOR COUNTING:**
- ❌ FORBIDDEN: FlowerBorders, FlowerDividers, DecorativeFrames, etc.
- ❌ DO NOT ask children to count "borders" or "dividers" - these terms don't make sense to kids!
- ✅ INSTEAD: Use individual objects (flowers, bees, butterflies, etc.)
- **Why**: Borders/dividers are long repeating patterns for decoration, not countable objects

**2. USE CONSISTENT IMAGES FOR EACH QUESTION:**
- ❌ WRONG: Show 6 frogs + 1 different image (visual confusion!)
- ✅ RIGHT: Show 7 identical or similar frog images (visual consistency!)
- **Rule**: If asking to count 7 frogs, show 7 FROG images (not 6 frogs + 1 random thing!)

**3. AVOID DUPLICATE SUBJECTS ACROSS QUESTIONS:**
- ❌ WRONG: Q3 about "Football Frogs" + Q5 about "Garden Frogs" (both are frogs!)
- ✅ RIGHT: Q3 about "Frogs" + Q5 about "Chickens" (different animals!)

**🚨 CRITICAL FILENAME RULES - READ THIS! 🚨**
**Many collections use PREFIXED filenames - you MUST include the prefix!**

**COMMON FILENAME PATTERNS:**
- **Vegetables**: vegetable_carrot.png, vegetable_corn.png, vegetable_tomato.png (NOT carrot.png!)
- **Fruits**: fruit_apple.png, fruit_banana.png, fruit_orange.png (NOT apple.png!)
- **Animals**: Use exact names from "Available images" list above

**WRONG vs RIGHT:**
❌ WRONG: <img src="/images/.../carrot.png" /> (File doesn't exist!)
✅ RIGHT: <img src="/images/.../vegetable_carrot.png" /> (Correct filename!)

❌ WRONG: <img src="/images/.../apple.png" /> (File doesn't exist!)
✅ RIGHT: <img src="/images/.../fruit_apple.png" /> (Correct filename!)

**HOW TO GET IT RIGHT:**
1. Look at the "Available images" list for your collection above
2. Copy the EXACT filename shown (including prefixes like vegetable_, fruit_, etc.)
3. DO NOT guess or simplify filenames!

**CRITICAL: Match question keywords to appropriate collections!**
- Question about "flowers" → Use Spring Garden collection
- Question about "books" → Use School Supplies collection  
- Question about "apples" → Use Fruits collection with fruit_apple.png
- Question about "carrots" → Use Vegetables collection with vegetable_carrot.png
- Question about "chickens" → Use Farm Animals collection`

    return collectionsGuide
  }

  /**
   * Category pools for vocabulary rotation
   */
  private static readonly CATEGORY_POOLS = {
    Fruits: ['apple', 'banana', 'orange', 'strawberry', 'grape', 'pear', 'cherry', 'watermelon', 'lemon', 'peach', 'plum'],
    Vegetables: ['carrot', 'tomato', 'corn', 'pea', 'broccoli', 'cucumber', 'pepper', 'lettuce', 'potato', 'onion'],
    SchoolItems: ['book', 'pencil', 'eraser', 'ruler', 'crayon', 'marker', 'scissor', 'glue', 'notebook', 'backpack'],
    FarmAnimals: ['chicken', 'cow', 'pig', 'sheep', 'horse', 'duck', 'goat', 'rabbit', 'goose', 'turkey'],
    Garden: ['flower', 'butterfly', 'bee', 'ladybug', 'snail', 'caterpillar', 'worm', 'bird', 'tree', 'grass'],
    Vehicles: ['car', 'bus', 'bike', 'train', 'boat', 'plane', 'truck', 'scooter', 'helicopter', 'tractor'],
    Toys: ['teddy bear', 'doll', 'block', 'ball', 'toy car', 'puzzle', 'kite', 'yo-yo', 'drum', 'robot'],
    Sports: ['football', 'basketball', 'tennis ball', 'bat', 'racket', 'goal', 'hoop', 'net', 'cone', 'medal'],
    Food: ['cookie', 'burger', 'pizza', 'cupcake', 'donut', 'ice cream', 'bread', 'cheese', 'milk', 'egg'],
    Shapes: ['star', 'heart', 'circle', 'square', 'triangle', 'diamond', 'moon', 'sun', 'cloud', 'rainbow']
  }

  /**
   * Get category for a given object
   */
  private static getObjectCategory(object: string): string | null {
    for (const [category, objects] of Object.entries(this.CATEGORY_POOLS)) {
      if (objects.includes(object)) {
        return category
      }
    }
    return null
  }

  /**
   * Track category usage history from previous worksheets
   */
  private static trackCategoryHistory(
    previousWorksheets: Array<{ questions: string[]; images: string[] }>
  ): Record<string, number> {
    const categoryCount: Record<string, number> = {}

    // Initialize all categories to 0
    Object.keys(this.CATEGORY_POOLS).forEach(cat => {
      categoryCount[cat] = 0
    })

    // Count usage from previous worksheets
    previousWorksheets.forEach(worksheet => {
      worksheet.questions.forEach(q => {
        const objectMatches = q.match(/\b(apples?|pears?|oranges?|bananas?|grapes?|strawberr(?:y|ies)|cherr(?:y|ies)|watermelons?|lemons?|peaches?|plums?|flowers?|roses?|tulips?|daisies?|sunflowers?|butterfl(?:y|ies)|bees?|ladybugs?|ants?|spiders?|birds?|chickens?|cows?|pigs?|sheep|horses?|dogs?|cats?|frogs?|fish|ducks?|rabbits?|bears?|elephants?|lions?|tigers?|monkeys?|giraffes?|cars?|trucks?|buses?|trains?|planes?|boats?|bicycles?|pencils?|pens?|crayons?|markers?|books?|scissors?|rulers?|erasers?|balls?|blocks?|toys?|dolls?|teddy bears?|stars?|hearts?|circles?|squares?|triangles?|diamonds?|cookies?|cupcakes?|candies?|lollipops?|carrots?|tomatoes?|potatoes?|corn|broccoli|peas?|balloons?|presents?|candles?|hats?|shoes?|socks?|shirts?|buttons?|leaves?|trees?|acorns?|shells?|rocks?|feathers?|goats?)\b/gi)

        if (objectMatches) {
          objectMatches.forEach(obj => {
            const normalized = obj.toLowerCase().replace(/ies$/, 'y').replace(/s$/, '')
            const category = this.getObjectCategory(normalized)
            if (category) {
              categoryCount[category]++
            }
          })
        }
      })
    })

    return categoryCount
  }

  /**
   * Select fresh categories with lowest usage
   */
  private static selectFreshCategories(
    categoryHistory: Record<string, number>,
    count: number
  ): Array<{ category: string; usageCount: number }> {
    // Sort categories by usage (least used first)
    const sorted = Object.entries(categoryHistory)
      .map(([category, usageCount]) => ({ category, usageCount }))
      .sort((a, b) => a.usageCount - b.usageCount)

    // Return top N least used categories
    return sorted.slice(0, count)
  }

  /**
   * Build rotation pool from selected fresh categories
   */
  private static buildRotationPool(
    freshCategories: Array<{ category: string; usageCount: number }>,
    usedObjects: Set<string>
  ): Array<{ category: string; objects: string[] }> {
    return freshCategories.map(({ category }) => {
      // Get all objects in this category
      const allObjects = this.CATEGORY_POOLS[category as keyof typeof this.CATEGORY_POOLS] || []

      // Filter out already used objects
      const availableObjects = allObjects.filter(obj => !usedObjects.has(obj))

      return {
        category,
        objects: availableObjects
      }
    })
  }

  /**
   * Build content freshness instructions with active vocabulary rotation
   */
  private static buildFreshnessInstructions(
    previousWorksheets?: Array<{ questions: string[]; images: string[] }>
  ): string {
    // FIRST WORKSHEET: Provide randomization instructions to avoid defaults
    if (!previousWorksheets || previousWorksheets.length === 0) {
      const allCategories = [
        { category: 'Fruits', objects: ['apples', 'bananas', 'oranges', 'strawberries', 'grapes', 'pears', 'lemons', 'watermelons', 'peaches', 'pineapples'] },
        { category: 'Vegetables', objects: ['carrots', 'tomatoes', 'broccoli', 'cucumbers', 'peppers', 'potatoes'] },
        { category: 'School', objects: ['books', 'pencils', 'erasers', 'crayons', 'markers', 'scissors', 'rulers', 'glue', 'backpacks'] },
        { category: 'FarmAnimals', objects: ['chickens', 'cows', 'sheep', 'pigs', 'horses', 'ducks', 'goats', 'geese', 'turkeys'] },
        { category: 'Garden', objects: ['flowers', 'butterflies', 'bees', 'birds', 'trees', 'leaves', 'mushrooms', 'worms', 'acorns'] },
        { category: 'Vehicles', objects: ['cars', 'buses', 'bikes', 'trains', 'planes'] },
        { category: 'Toys', objects: ['balls', 'cars', 'dolls', 'kites', 'blocks'] },
        { category: 'Sports', objects: ['footballs', 'basketballs', 'tennis balls', 'bats', 'medals'] },
        { category: 'Food', objects: ['cookies', 'cupcakes'] },
        { category: 'Shapes', objects: ['stars', 'hearts', 'circles', 'squares', 'diamonds', 'suns', 'moons'] }
      ];

      // Randomly shuffle categories to provide different starting suggestions each time
      const shuffledCategories = [...allCategories].sort(() => Math.random() - 0.5);
      const selectedCategories = shuffledCategories.slice(0, 5);

      // Create randomized priority pool
      const priorityPoolLines = selectedCategories
        .map(pool => {
          const shuffledObjects = [...pool.objects].sort(() => Math.random() - 0.5);
          const objectsPreview = shuffledObjects.slice(0, 8).join(', ');
          const hasMore = shuffledObjects.length > 8 ? ', ...' : '';
          return `  ${pool.category}: ${objectsPreview}${hasMore}`;
        })
        .join('\n');

      // Format per-question guidance with randomized categories
      const questionGuidanceLines = selectedCategories
        .map((pool, idx) => `  Q${idx + 1}: Select from ${pool.category} category (randomly choose an object)`)
        .join('\n');

      return `
╔═══════════════════════════════════════════════════════════════════╗
║  🎲 FIRST WORKSHEET - RANDOMIZATION REQUIRED                      ║
║                                                                     ║
║  ✅ PRIORITY CATEGORIES (Randomly Selected for You):              ║
${priorityPoolLines}
║                                                                     ║
║  🎯 RANDOMIZATION STRATEGY FOR THIS WORKSHEET:                    ║
${questionGuidanceLines}
║                                                                     ║
║  📋 CRITICAL RULES:                                                ║
║     1. Each question MUST use a DIFFERENT object                   ║
║     2. Each question should use a DIFFERENT category               ║
║     3. Randomly select objects within each category                ║
║     4. DO NOT default to: pears, butterflies, markers              ║
║     5. Explore the full vocabulary pool creatively                 ║
║                                                                     ║
║  🎲 EXAMPLE OF GOOD RANDOMIZATION:                                ║
║     Q1: watermelons (Fruits) → Q2: rulers (School) →              ║
║     Q3: ducks (FarmAnimals) → Q4: trains (Vehicles) →             ║
║     Q5: hearts (Shapes)                                            ║
╚═══════════════════════════════════════════════════════════════════╝

**🎲 RANDOMIZATION IS MANDATORY - DO NOT USE DEFAULT PATTERNS:**
- **FORBIDDEN**: Always starting with pears, butterflies, markers
- **REQUIRED**: Randomly select from the priority categories above
- **STRATEGY**: Each question uses different category + different object
- **GOAL**: Maximize variety and engagement across all categories

`;
    }

    // 🔄 SLIDING WINDOW: Keep only last N worksheets to prevent vocabulary exhaustion
    const WINDOW_SIZE = 5;
    const recentWorksheets = previousWorksheets.length > WINDOW_SIZE
      ? previousWorksheets.slice(-WINDOW_SIZE)
      : previousWorksheets;

    // 🔍 FRESHNESS DEBUG: Log received data
    console.log('🔍 buildFreshnessInstructions: Received', previousWorksheets?.length || 0, 'previous worksheets')
    console.log(`🔄 Using ${WINDOW_SIZE}-worksheet sliding window: tracking last ${recentWorksheets.length} worksheets`)

    // Extract previously used objects (forbidden list) from recent worksheets only
    const allPreviousQuestions = recentWorksheets.flatMap(w => w.questions)
    const usedObjects = new Set<string>()

    allPreviousQuestions.forEach(q => {
      const objectMatches = q.match(/\b(apples?|pears?|oranges?|bananas?|grapes?|strawberr(?:y|ies)|cherr(?:y|ies)|watermelons?|lemons?|peaches?|plums?|flowers?|roses?|tulips?|daisies?|sunflowers?|butterfl(?:y|ies)|bees?|ladybugs?|ants?|spiders?|birds?|chickens?|cows?|pigs?|sheep|horses?|dogs?|cats?|frogs?|fish|ducks?|rabbits?|bears?|elephants?|lions?|tigers?|monkeys?|giraffes?|cars?|trucks?|buses?|trains?|planes?|boats?|bicycles?|pencils?|pens?|crayons?|markers?|books?|scissors?|rulers?|erasers?|balls?|blocks?|toys?|dolls?|teddy bears?|stars?|hearts?|circles?|squares?|triangles?|diamonds?|cookies?|cupcakes?|candies?|lollipops?|carrots?|tomatoes?|potatoes?|corn|broccoli|peas?|balloons?|presents?|candles?|hats?|shoes?|socks?|shirts?|buttons?|leaves?|trees?|acorns?|shells?|rocks?|feathers?|goats?)\b/gi)
      if (objectMatches) {
        objectMatches.forEach(obj => {
          const normalized = obj.toLowerCase().replace(/ies$/, 'y').replace(/s$/, '')
          usedObjects.add(normalized)
        })
      }
    })

    console.log('🔍 Total previous questions:', allPreviousQuestions.length)
    console.log('🔍 Forbidden objects:', Array.from(usedObjects))

    // Track category usage history from recent worksheets only
    const categoryHistory = this.trackCategoryHistory(recentWorksheets)
    console.log('🔍 Category history:', categoryHistory)

    // Select 5 fresh categories with lowest usage
    const freshCategories = this.selectFreshCategories(categoryHistory, 5)
    console.log('🔍 Fresh categories:', freshCategories.map(c => c.category))

    // Build rotation pool
    const rotationPool = this.buildRotationPool(freshCategories, usedObjects)

    // Format forbidden list
    const forbiddenArray = Array.from(usedObjects)
    const forbiddenList = forbiddenArray.join(', ')

    // Format priority pool (limit to 8 objects per category for readability)
    const priorityPoolLines = rotationPool
      .map(pool => {
        const objectsPreview = pool.objects.slice(0, 8).join(', ')
        const hasMore = pool.objects.length > 8 ? ', ...' : ''
        return `  ${pool.category}: ${objectsPreview}${hasMore}`
      })
      .join('\n')

    // Format per-question guidance
    const questionGuidanceLines = rotationPool
      .slice(0, 5)
      .map((pool, idx) => `  Q${idx + 1}: Select from ${pool.category} category`)
      .join('\n')

    // Format category usage history
    const historyLines = Object.entries(categoryHistory)
      .map(([cat, count]) => `- ${cat}: ${count} uses`)
      .join('\n')

    // Split forbidden list into multiple lines if too long
    const forbiddenLine1 = forbiddenArray.slice(0, 8).join(', ')
    const forbiddenLine2 = forbiddenArray.length > 8 ? forbiddenArray.slice(8, 16).join(', ') : ''
    const forbiddenLine3 = forbiddenArray.length > 16 ? forbiddenArray.slice(16, 24).join(', ') : ''

    return `
╔═══════════════════════════════════════════════════════════════════╗
║  🔄 VOCABULARY ROTATION - ITERATION #${previousWorksheets.length} (Window: ${recentWorksheets.length})          ║
║                                                                     ║
║  ❌ FORBIDDEN (Already Used):                                     ║
║     ${forbiddenLine1.padEnd(61)}║
${forbiddenLine2 ? `║     ${forbiddenLine2.padEnd(61)}║` : ''}
${forbiddenLine3 ? `║     ${forbiddenLine3.padEnd(61)}║` : ''}
║                                                                     ║
║  ✅ PRIORITY POOL (Use These First - Least Used Categories):      ║
${priorityPoolLines}
║                                                                     ║
║  🎲 RANDOMIZATION REQUIRED (Select Different Object Each Q):       ║
${questionGuidanceLines}
║                                                                     ║
║  📊 FRESHNESS TARGET: 80%+ new vocabulary (MANDATORY)              ║
║  🎯 GOAL: True randomization - explore full vocabulary pool       ║
║  ⚠️  LAST TIME: 66% reuse - UNACCEPTABLE                          ║
╚═══════════════════════════════════════════════════════════════════╝

**🔄 ACTIVE VOCABULARY ROTATION SYSTEM:**
- **FORBIDDEN objects** (${usedObjects.size} total): ${forbiddenList}
- **PRIORITY categories**: ${freshCategories.map(c => c.category).join(', ')}
- **STRATEGY**: Select from priority pool first, then explore other categories
- **ENFORCEMENT**: Each question MUST use different object from different category
- **PENALTY**: Using forbidden object = INSTANT FAILURE AND 0/10 FRESHNESS SCORE
- **MINIMUM REQUIREMENT**: At least 80% (4 out of 5 questions) must use NEW objects

**CATEGORY USAGE HISTORY:**
${historyLines}

**EXPLICIT INSTRUCTIONS FOR THIS WORKSHEET:**
1. Review the PRIORITY POOL above - these categories have lowest usage
2. For each question, select an object from a DIFFERENT category
3. Within each category, choose objects you haven't used yet
4. FORBIDDEN to reuse any object from the forbidden list above
5. Goal: Maximum vocabulary diversity - use ALL 10 categories across iterations

`
  }


  /**
   * Build lean freshness instructions - OPTIMIZED VERSION
   * 66% reduction in tokens while maintaining functionality
   *
   * IMPROVEMENTS:
   * - Removed ASCII box borders (~100 tokens saved)
   * - Removed emojis from headers (~10 tokens)
   * - Condensed redundant text (~50 tokens)
   * - Removed verbose penalty descriptions (~30 tokens)
   * - Streamlined formatting (~40 tokens)
   *
   * RESULT: ~350-420 tokens → ~120-150 tokens (64-68% reduction)
   */
  private static buildFreshnessInstructionsLean(
    previousWorksheets?: Array<{ questions: string[]; images: string[] }>
  ): string {
    // PHASE 2 OPTIMIZATION: Lazy Freshness - Skip freshness on first worksheet
    // FIRST WORKSHEET: Return empty string (let LLM use natural randomness)
    // Token savings: ~180-220 tokens per first worksheet
    // Time savings: ~1-2s (no processing + smaller prompt to send)
    if (!previousWorksheets || previousWorksheets.length === 0) {
      console.log('🔍 [LAZY FRESHNESS] First worksheet - skipping freshness instructions (natural randomness)');
      return ''; // Empty string = no freshness overhead on first generation
    }

    // SLIDING WINDOW: Keep only last N worksheets
    const WINDOW_SIZE = 5;
    const recentWorksheets = previousWorksheets.length > WINDOW_SIZE
      ? previousWorksheets.slice(-WINDOW_SIZE)
      : previousWorksheets;

    console.log('🔍 [LEAN] buildFreshnessInstructions: Received', previousWorksheets?.length || 0, 'previous worksheets')
    console.log(`🔄 [LEAN] Using ${WINDOW_SIZE}-worksheet sliding window: tracking last ${recentWorksheets.length} worksheets`)

    // Extract forbidden objects from recent worksheets
    const allPreviousQuestions = recentWorksheets.flatMap(w => w.questions)
    const usedObjects = new Set<string>()

    allPreviousQuestions.forEach(q => {
      const objectMatches = q.match(/\b(apples?|pears?|oranges?|bananas?|grapes?|strawberr(?:y|ies)|cherr(?:y|ies)|watermelons?|lemons?|peaches?|plums?|flowers?|roses?|tulips?|daisies?|sunflowers?|butterfl(?:y|ies)|bees?|ladybugs?|ants?|spiders?|birds?|chickens?|cows?|pigs?|sheep|horses?|dogs?|cats?|frogs?|fish|ducks?|rabbits?|bears?|elephants?|lions?|tigers?|monkeys?|giraffes?|cars?|trucks?|buses?|trains?|planes?|boats?|bicycles?|pencils?|pens?|crayons?|markers?|books?|scissors?|rulers?|erasers?|balls?|blocks?|toys?|dolls?|teddy bears?|stars?|hearts?|circles?|squares?|triangles?|diamonds?|cookies?|cupcakes?|candies?|lollipops?|carrots?|tomatoes?|potatoes?|corn|broccoli|peas?|balloons?|presents?|candles?|hats?|shoes?|socks?|shirts?|buttons?|leaves?|trees?|acorns?|shells?|rocks?|feathers?|goats?)\b/gi)
      if (objectMatches) {
        objectMatches.forEach(obj => {
          const normalized = obj.toLowerCase().replace(/ies$/, 'y').replace(/s$/, '')
          usedObjects.add(normalized)
        })
      }
    })

    console.log('🔍 [LEAN] Forbidden objects:', Array.from(usedObjects))

    // Track category usage
    const categoryHistory = this.trackCategoryHistory(recentWorksheets)
    console.log('🔍 [LEAN] Category history:', categoryHistory)

    // Select fresh categories
    const freshCategories = this.selectFreshCategories(categoryHistory, 5)
    console.log('🔍 [LEAN] Fresh categories:', freshCategories.map(c => c.category))

    // Build rotation pool
    const rotationPool = this.buildRotationPool(freshCategories, usedObjects)

    // PHASE 2 OPTIMIZATION: Compress forbidden list format
    // BEFORE: "FORBIDDEN: apple, banana, orange, ..." (verbose)
    // AFTER: "AVOID: apple,banana,orange,..." (compact - no spaces)
    // Token savings: ~20-30% on forbidden list
    const forbiddenArray = Array.from(usedObjects)
    const forbiddenList = forbiddenArray.join(',') // No spaces = fewer tokens

    // PHASE 2 OPTIMIZATION: Compress priority pool format
    // Reduce from 8 objects preview to 5 (still enough context)
    const priorityPoolLines = rotationPool
      .map(pool => {
        const objectsPreview = pool.objects.slice(0, 5).join(',') // Compact format
        return `${pool.category}: ${objectsPreview}` // Remove "- " prefix
      })
      .join('\n')

    // PHASE 2 OPTIMIZATION: Compress assignments format
    const assignments = rotationPool
      .slice(0, 5)
      .map((pool, idx) => `Q${idx + 1}:${pool.category}`) // Remove spaces
      .join('|') // Compact separator

    // PHASE 2 OPTIMIZATION: Ultra-compact freshness format
    // Token savings: ~60-80 tokens per iteration (from ~150 tokens to ~70-90 tokens)
    return `**ITER ${previousWorksheets.length} (Track ${recentWorksheets.length}):**
AVOID: ${forbiddenList}
PRIORITY: ${priorityPoolLines}
ASSIGN: ${assignments}
RULE: NEW objects only, 80%+ fresh.
`;
  }

  /**
   * Suggest fresh object categories based on what's been used
   */
  private static suggestFreshCategories(usedObjects: string[]): string {
    const allCategories = [
      'fruits (apples, bananas, oranges)',
      'vegetables (carrots, tomatoes, corn)',
      'school items (books, pencils, erasers, rulers)',
      'farm animals (chickens, cows, pigs, sheep)',
      'garden items (flowers, butterflies, bees)',
      'sports equipment (balls, bats, goals)',
      'vehicles (cars, buses, bikes)',
      'toys (teddy bears, dolls, blocks)',
      'stationery (crayons, markers, stickers)',
      'food items (cookies, sweets, burgers)'
    ]

    // Filter out categories that match used objects
    const freshCategories = allCategories.filter(category => {
      return !usedObjects.some(obj => category.toLowerCase().includes(obj))
    })

    return freshCategories.slice(0, 5).join(', ')
  }

}