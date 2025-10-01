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
  public static async generatePrompt(
    config: WorksheetConfig,
    options: {
      forceEnhanced?: boolean
      iterativeCycle?: number
      targetQuality?: number
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
   * Generate the core prompt with all enhancements applied
   */
  private static async generateCorePrompt(
    config: EnhancedPromptConfig,
    options: { iterativeCycle?: number }
  ): Promise<string> {
    const promptVariation = this.selectOptimalVariation(config)
    const basePrompt = await this.generateVariationPrompt(config, promptVariation)

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
    variation: PromptVariation
  ): Promise<string> {
    return await this.generateOptimalPrompt(config)
  }



  /**
   * Generate optimal prompt - streamlined version with consolidated instructions
   */
  private static async generateOptimalPrompt(config: EnhancedPromptConfig): Promise<string> {
    const shouldApplyTheme = config.visualTheme && config.visualTheme !== 'none'
    const svgInstructions = shouldApplyTheme && config.visualTheme ? this.getSVGInstructions(config.visualTheme) : this.getContextualSVGInstructions()
    const themeContext = shouldApplyTheme && config.visualTheme ? this.getThemeContext(config.visualTheme, config.yearGroup) : null

    // Get suggested images from our pre-curated library
    const imageLibraryInstructions = await this.getImageLibraryInstructions(config)

    // Get counting objects guidance if relevant
    const countingObjectsGuidance = this.getCountingObjectsGuidance(config)

    // Get hybrid SVG guidance
    const hybridSVGGuidance = await this.getHybridSVGGuidance(config)

    // Get SCRAPPING DOODLE guidance (NEW!)
    const scrappingDoodleGuidance = await this.getScrappingDoodleGuidance(config)

    return `Create a ${config.yearGroup} ${config.topic} worksheet: "${config.subtopic}" (${config.difficulty}, ${config.questionCount} questions).

**🔥🔥🔥 YEAR 1 ABSOLUTE RULE - READ THIS FIRST! 🔥🔥🔥**
**THIS IS ${config.yearGroup} - FOR ALL QUANTITIES ≤20:**
**MANDATORY: USE <div class="counting-objects-grid"> with multiple images BELOW the question text**
**FORBIDDEN: DO NOT use class="question-svg-side" for quantities ≤20 in Year 1**
**FORBIDDEN: DO NOT float images beside text - images MUST be centered BELOW text**
**CORRECT PATTERN FOR YEAR 1 (≤20 objects):**
  <p class="question-text">Question here...</p>
  <div class="counting-objects-grid">
    <!-- Multiple keyword-matched Scrapping Doodle images here -->
  </div>
  <div class="answer-line">Answer: ___</div>

**🚨🚨🚨 CRITICAL: OLD IMAGE PATHS DELETED - WILL RETURN 404 ERROR! 🚨🚨🚨**

**❌ DELETED PATHS (THESE WILL BREAK THE WORKSHEET):**
\`\`\`
/images/educational/counting-objects/flower/  ← DELETED
/images/educational/counting-objects/pencil/  ← DELETED
/images/educational/counting-objects/book/    ← DELETED
\`\`\`

**✅ REQUIRED: USE SCRAPPING DOODLE PATHS ONLY:**
${scrappingDoodleGuidance}

**EXAMPLE OF CORRECT USAGE (COPY THIS PATTERN):**
\`\`\`html
<!-- ✅ CORRECT - SCRAPPING DOODLE paths work -->
<img src="/images/SCRAPPING DOODLE/FarmAnimalsAndBabies_byScrappinDoodles/Cow.png" class="question-svg-side" width="180" height="180" alt="Farm Cow" />

<!-- ❌ WRONG - These paths return 404 error -->
<img src="/images/educational/counting-objects/book/book-438935.svg" /> ← BROKEN!
\`\`\`

**🎨 SCRAPPING DOODLE PREMIUM LIBRARY - HIGHEST PRIORITY! 🎨**
**CRITICAL: Use SCRAPPING DOODLE images when available from contextual suggestions below**
**These are superior, professionally curated educational images**
- ALWAYS check contextual image suggestions below FIRST
- Use suggested SCRAPPING DOODLE paths when provided
- Only use fallback static templates if no SCRAPPING DOODLE match available
- SCRAPPING DOODLE images are context-aware and age-appropriate

**QUALITY TARGET: 4.5/5.0** - Evaluated on: Accuracy (30%), Visual Clarity (25%), Educational Value (20%), Age Appropriateness (15%), Answer Protection (10%)

**CRITICAL AGE-BASED IMAGE RULES FOR ${config.yearGroup}:**
${this.getAgeBasedImageRules(config.yearGroup)}

**CORE REQUIREMENTS:**
- UK National Curriculum aligned for ${config.subtopic}
- Age-appropriate vocabulary for ${config.yearGroup}
- Names: Emma, Oliver, Sophie, James, Lily, Thomas, Grace, Harry${themeContext ? `\n- Theme: ${themeContext}` : ''}
- NO markdown formatting - plain text only
- Normal capitalization ("smaller", "bigger") - NEVER "SMALLER"
- Complete HTML document starting with <!DOCTYPE html>

**🎲 MANDATORY QUESTION VARIETY & CREATIVITY:**
- **RANDOMIZE scenarios**: Use different activities (picking, buying, finding, collecting, giving away, sharing, eating, etc.)
- **RANDOMIZE names**: Don't always use Emma first - vary the order (Thomas first, then Lily, then Oliver, etc.)
- **RANDOMIZE objects**: Use variety from fruits, vegetables, school items, sports (apples, carrots, books, footballs, etc.)
- **RANDOMIZE numbers**: Vary the starting quantities and operations (use 3, 7, 11, 15, 19 - not always 9-14)
- **MIX contexts**: School, home, park, shop, garden, playground
- **CREATIVE scenarios**: "found in the garden", "bought at the shop", "collected from the beach", "received as gifts"

**🎨 SCRAPPING DOODLE PREMIUM COLLECTIONS:**
${scrappingDoodleGuidance}

**PROFESSIONAL IMAGE INTEGRATION STRATEGY:**
${imageLibraryInstructions}

${countingObjectsGuidance}

${hybridSVGGuidance}

**🔥🔥🔥 CRITICAL: MATCH IMAGES TO QUESTION KEYWORDS! 🔥🔥🔥**

**THE #1 RULE: Question about FLOWERS → Show FLOWER images (NOT random animals!)**
**THE #1 RULE: Question about APPLES → Show APPLE images (NOT random animals!)**
**THE #1 RULE: Question about BOOKS → Show BOOK images (NOT random animals!)**

**KEYWORD-TO-IMAGE MATCHING (MANDATORY):**

**STEP 1: Extract keyword from question**
- If question mentions "flowers" → keyword = "flowers"
- If question mentions "apples" → keyword = "apples"
- If question mentions "pencils" → keyword = "pencils"
- If question mentions "books" → keyword = "books"

**STEP 2: Use Scrapping Doodle collections that match the keyword**

**AVAILABLE KEYWORD COLLECTIONS:**
- **FLOWERS** → Use: /images/SCRAPPING DOODLE/Spring_Garden_by_ScrappinDoodles/ (flower.png, flower2.png, flower3.png)
- **FRUITS** (apples, bananas, oranges, berries, grapes) → Use: /images/SCRAPPING DOODLE/Fruit_by_ScrappinDoodles/
- **VEGETABLES** (carrots, tomatoes, potatoes, corn, peas) → Use: /images/SCRAPPING DOODLE/FoodGroup_Vegetables_byScrappinDoodles/
- **SCHOOL ITEMS** (books, pencils, erasers, rulers, scissors) → Use: /images/SCRAPPING DOODLE/SchoolSupplies_byScrappinDoodles/
- **SPORTS/BALLS** (footballs, basketballs, soccer balls) → Use: /images/SCRAPPING DOODLE/SportsBalls_byScrappinDoodles/
- **FARM ANIMALS** (cows, pigs, chickens, sheep) → Use: /images/SCRAPPING DOODLE/FarmAnimalsAndBabies_byScrappinDoodles/

**EXAMPLE - CORRECT PATTERN:**
Question: "Emma had 7 flowers. She got 6 more. How many flowers does Emma have now?"

<!-- ✅ CORRECT: Use actual FLOWER images (NOT frogs!) -->
<div class="counting-objects-grid">
  <img src="/images/SCRAPPING DOODLE/Spring_Garden_by_ScrappinDoodles/flower.png" width="80" height="80" alt="Flower" />
  <img src="/images/SCRAPPING DOODLE/Spring_Garden_by_ScrappinDoodles/flower2.png" width="80" height="80" alt="Flower" />
  <img src="/images/SCRAPPING DOODLE/Spring_Garden_by_ScrappinDoodles/flower3.png" width="80" height="80" alt="Flower" />
  <!-- ... repeat to show 7 total flowers -->
</div>

<!-- ❌ WRONG: Do NOT use frogs/animals for flower questions! -->

**EXAMPLE - SCHOOL ITEMS:**
\`\`\`html
Question: "Oliver had 12 pencils. He gave 4 away. How many pencils does Oliver have left?"

<!-- ✅ CORRECT: Use PENCIL images because question mentions "pencils" -->
<div class="counting-objects-grid">
  <img src="/images/SCRAPPING DOODLE/SchoolSupplies_byScrappinDoodles/pencil.png" width="80" height="80" alt="Pencil" />
  <img src="/images/SCRAPPING DOODLE/SchoolSupplies_byScrappinDoodles/pencil2.png" width="80" height="80" alt="Pencil" />
  <!-- ... repeat to show 12 pencils -->
</div>
\`\`\`

**EXAMPLE - FRUITS:**
\`\`\`html
Question: "Sophie has 5 apples. Thomas gives her 3 more apples. How many apples does Sophie have now?"

<!-- ✅ CORRECT: Use APPLE images because question mentions "apples" -->
<div class="counting-objects-grid">
  <img src="/images/SCRAPPING DOODLE/Fruit_by_ScrappinDoodles/apple.png" width="80" height="80" alt="Apple" />
  <img src="/images/SCRAPPING DOODLE/Fruit_by_ScrappinDoodles/apple.png" width="80" height="80" alt="Apple" />
  <!-- ... repeat to show 5 apples -->
</div>
\`\`\`

**🎯 MANDATORY OBJECT VARIETY STRATEGY:**
**CRITICAL REQUIREMENT - DIVERSE QUESTION OBJECTS:**
- **MAXIMUM 1 question per object type** - Never repeat object types (pencils, books, flowers, etc.)
- **MANDATORY MIX:** Use both static library objects AND AI-generated objects across the worksheet
- **Pattern to follow:** Question 1 = Library object (pencil/book/flower), Question 2 = AI-generated (crayons/toys/animals), Question 3 = Different library object, Question 4 = Different AI-generated, etc.
- **NO REPETITION:** If you use pencils in Q1, use completely different objects for all other questions

**FALLBACK STATIC OBJECTS (ONLY if no SCRAPPING DOODLE available):**
- FLOWERS → Use fallback static template below ONLY if no SCRAPPING DOODLE flowers found
- PENCILS → Use fallback static template below ONLY if no SCRAPPING DOODLE school items found
- BOOKS → Use fallback static template below ONLY if no SCRAPPING DOODLE books found
**PRIORITY ORDER: 1st SCRAPPING DOODLE → 2nd Static fallbacks → 3rd AI-generated**
**CRITICAL: Copy templates EXACTLY when using fallbacks - do not modify class names or attributes**

**ENCOURAGED AI-GENERATED OBJECTS (for variety):**
- CRAYONS, STICKERS, TOYS, ANIMALS, FOOD, BALLS, STARS, CARS, etc.
- Use embedded SVG templates provided below
- These add visual variety and keep worksheets engaging

**🚨 CRITICAL: YOU MUST USE SCRAPPING DOODLE IMAGES FROM CONTEXTUAL SUGGESTIONS BELOW! 🚨**
**THE CONTEXTUAL SUGGESTIONS SECTION CONTAINS YOUR ACTUAL IMAGE PATHS**
**SCROLL DOWN TO "🎨 SCRAPPING DOODLE PREMIUM COLLECTIONS" FOR YOUR SPECIFIC IMAGES**

**⚠️ DO NOT USE THESE OLD FALLBACK PATHS - THEY ARE DEPRECATED:**
- ❌ /images/educational/counting-objects/ (OLD - DO NOT USE)
- ❌ pink-flower-7373871.svg (OLD - DO NOT USE)
- ❌ pencil-32276.svg (OLD - DO NOT USE)

**✅ INSTEAD, USE THE SCRAPPING DOODLE PATHS PROVIDED IN CONTEXTUAL SUGGESTIONS BELOW**

**💡 MANDATORY VARIETY ENFORCEMENT:**
- **CRITICAL: EACH QUESTION MUST USE DIFFERENT OBJECTS** - NO repetition of object types
- **REQUIRED PATTERN:** Alternate between static objects (flowers, pencils, books) and AI-generated objects (crayons, stickers, toys, animals, food, cars, etc.)
- **ENFORCEMENT RULE:** If Q1 uses pencils, Q2 MUST use AI-generated objects (like crayons), Q3 MUST use different static object (like flowers), Q4 MUST use different AI-generated object (like toys)
- **VALIDATION:** Before generating, check that no two questions use the same object type

**EMBEDDED SVG STRATEGY FOR VARIETY:**
**FOR DIVERSE OBJECTS (stickers, crayons, animals, toys, food, cars, etc.):**
- Create professional-quality embedded SVG illustrations that EXACTLY match question context
- All SVGs are embedded directly in HTML to avoid CORS and loading issues
- Use clean, modern, child-friendly design with educational focus
- Images should support mathematical concepts without revealing answers

**WHEN TO USE EMBEDDED SVGS:**
- For variety and engagement: stickers, crayons, animals, toys, food, cars, balls, etc.
- To complement static objects (flowers, pencils, books) for visual diversity
- SKIP images for abstract math problems and pure calculations

**SVG DESIGN GUIDELINES:**
- **CRITICAL: ALWAYS use width="180" height="180" viewBox="0 0 180 180" for all embedded SVGs**
- **CRITICAL: Add class="question-svg-side" for single images (RIGHT placement)**
- **CRITICAL: Add class="counting-container" for multiple images (CENTERED underneath)**
- **SIZING ENFORCEMENT: SVG elements must fill the full 180x180 canvas**
- **PLACEMENT: Single images on RIGHT side, multiple images centered below question text**
- Use clean, simple geometric shapes with rounded edges
- Bright, child-friendly colors (#FF69B4 pink, #FFD700 gold, #32CD32 green, #4169E1 blue, #D2691E brown, #FF6B6B red)
- Clear, recognizable objects that match the question context exactly
- Educational focus - images should enhance learning, not distract

**SKIP IMAGES:**
- Abstract math ("think of a number", pure calculations)
- Questions where visuals would reveal answers directly
- Complex word problems where images might confuse rather than help

**AGE-APPROPRIATE IMAGE PLACEMENT RULES:**

**🚨 MANDATORY INTELLIGENT VISUAL QUANTITY SYSTEM 🚨**
**THIS SYSTEM OVERRIDES ALL OTHER PLACEMENT RULES**

**CRITICAL RULE: VISUAL QUANTITY = FIRST NUMBER IN QUESTION**
- **Educational Purpose**: Visual shows starting amount for mental math operations
- **Pedagogical Benefit**: Students see the initial quantity and then calculate from there
- **ENFORCEMENT**: Ignore any conflicting rules below - ONLY follow this system

**QUANTITY EXTRACTION RULES:**
1. **Addition**: "Emma had **8** flowers, got 7 more" → Show **8** flowers
2. **Subtraction**: "Oliver had **18** crayons, gave 5 away" → Show **18** crayons
3. **Regular Multiplication**: "Sophie had **12** pencils, bought 6 more" → Show **12** pencils
4. **Multiplication Groups**: "3 groups of **5** apples" → Show **5** items (children multiply this by 3 mentally)
5. **Division**: "Thomas had **16** stickers, shared equally" → Show **16** stickers

**MULTIPLICATION GROUP CASES (Show items per group for mental math):**
- **"3 groups of 5 apples"** → Visual shows **5** apples (child thinks: 5 + 5 + 5)
- **"4 rows of 6 pencils"** → Visual shows **6** pencils (child thinks: 6 × 4)
- **"5 bags with 3 sweets each"** → Visual shows **3** sweets (child thinks: 3 × 5)
- **"2 boxes of 8 crayons"** → Visual shows **8** crayons (child thinks: 8 × 2)

**REASONING**: Children can see the **unit quantity** and mentally multiply, rather than trying to understand abstract grouping concepts.

**All other cases** → Visual shows the **first number mentioned**

**⚠️ ABSOLUTE PRIORITY: AGE GROUP + QUANTITY LOGIC BELOW CANNOT BE OVERRIDDEN ⚠️**

**PLACEMENT BY AGE GROUP AND FIRST NUMBER:**

**Reception/Year 1 (Ages 4-6):**
- **First number ≤20**: Show ACTUAL QUANTITY using class="counting-objects-grid" (keyword-matched Scrapping Doodle images)
- **First number >20**: Show SINGLE representative image using class="question-svg-side" → RIGHT

**Year 2 (Ages 6-7):**
- **First number ≤20**: Show ACTUAL QUANTITY using class="counting-objects-grid" (keyword-matched Scrapping Doodle images)
- **First number >20**: Show SINGLE representative image using class="question-svg-side" → RIGHT

**Year 3+ (Ages 7+):**
- **ALL quantities**: Show SINGLE representative image using class="question-svg-side" → RIGHT
- Focus on calculation, not counting
- Exception: If quantity ≤10 and involves concrete objects (flowers, pencils), MAY use counting-objects-grid for visual support

**🔒 CRITICAL LAYOUT RULE: counting-objects-grid MUST be BELOW question text (NOT beside it) to avoid squished text!**

**Year 1 Layout Pattern (≤20 objects):**
1. Question text FIRST (full width, no floating images beside it)
2. counting-objects-grid BELOW the question
3. Answer line at bottom

**Year 2+ Layout Pattern (>20 objects):**
1. Question text with SINGLE image floating right (class="question-svg-side")
2. Answer line at bottom

**STEP-BY-STEP VISUAL QUANTITY PROCESS:**
1. **Read the question text**
2. **Check for multiplication groups** (e.g., "3 groups of 5")
   - If found: Extract the **items per group** number (5 in this example)
   - If not found: Extract the **first number mentioned**
3. **Check the year group** (Reception/Year 1/Year 2 vs Year 3+)
4. **Apply placement rules**:
   - Young + ≤20: 2-row layout with actual quantity
   - Young + >20: Single image on RIGHT
   - Year 3+: Always single image on RIGHT
5. **Create visual showing the extracted number for optimal mental math support**

**CRITICAL**: Visual supports mental math - show the quantity children can work with mentally!

**🔒 FINAL ENFORCEMENT PRIORITY SYSTEM 🔒**
**THESE RULES OVERRIDE ALL OTHER INSTRUCTIONS IN THIS ENTIRE PROMPT:**

**FOR ${config.yearGroup} SPECIFICALLY:**
${config.yearGroup === 'Year 1' || config.yearGroup === 'Reception' ? `
**🚨 YEAR 1 IRON-CLAD RULE 🚨**
- ≤20 objects → MUST use <div class="counting-objects-grid"> (images BELOW text, NOT beside)
- >20 objects → MAY use single image with class="question-svg-side"
- FORBIDDEN: class="question-svg-side" for quantities ≤20
- FORBIDDEN: Floating images beside text for ≤20 quantities
- MANDATORY: All ≤20 quantities show counting-objects-grid centered BELOW question text
` : ''}

1. **Year 1/Year 2 with ≤20 quantities MUST use counting-objects-grid** with keyword-matched Scrapping Doodle images
2. **Year 1/Year 2 with >20 quantities MUST use single image** (class="question-svg-side")
3. **Year 3+ MUST use single image** (class="question-svg-side") - calculation focus, not counting
4. **ALWAYS match keyword to image collection** (flowers→flowers, pencils→pencils, NOT random animals!)
5. **NO EXCEPTIONS to the age group + quantity logic above**
6. **The INTELLIGENT VISUAL QUANTITY SYSTEM is the FINAL AUTHORITY**
7. **IF IN DOUBT FOR YEAR 1 ≤20: USE counting-objects-grid BELOW TEXT**

**FOR YEAR 4 AND ABOVE (Year 4, 5, 6):**
- **ALWAYS use SINGLE REPRESENTATIVE images only**
- Use class="question-svg-side" (180×180px, positioned on RIGHT side)
- Example: For "324 books" → show 1 book image only
- NO counting arrays, NO multiple objects, NO scrollable containers
- Focus on symbolic representation, not literal counting

**LEGACY SECTION REMOVED - FOLLOW NEW INTELLIGENT SYSTEM ABOVE**
- **All placement decisions now use the INTELLIGENT VISUAL QUANTITY SYSTEM above**
- **NO conflicting rules - follow age group + quantity logic only**

**UNIVERSAL RULES:**
- Always include proper alt text for accessibility
- NO horizontal scrollbars ever - worksheet must be printable
- Position images to complement text, not obstruct it

**EMBEDDED SVG EXAMPLES - USE THESE PATTERNS:**

**For flower problems (SINGLE FLOWER - RIGHT PLACEMENT):**
\`\`\`html
<svg width="180" height="180" viewBox="0 0 180 180" class="question-svg-side" role="img" aria-label="Colorful flower">
  <!-- Flower petals -->
  <ellipse cx="90" cy="50" rx="12" ry="20" fill="#FF69B4" stroke="#E555AB" stroke-width="1"/>
  <ellipse cx="90" cy="110" rx="12" ry="20" fill="#FF69B4" stroke="#E555AB" stroke-width="1"/>
  <ellipse cx="60" cy="80" rx="20" ry="12" fill="#FF69B4" stroke="#E555AB" stroke-width="1"/>
  <ellipse cx="120" cy="80" rx="20" ry="12" fill="#FF69B4" stroke="#E555AB" stroke-width="1"/>

  <!-- Diagonal petals -->
  <ellipse cx="70" cy="60" rx="15" ry="12" fill="#FF1493" stroke="#E555AB" stroke-width="1" transform="rotate(-45 70 60)"/>
  <ellipse cx="110" cy="60" rx="15" ry="12" fill="#FF1493" stroke="#E555AB" stroke-width="1" transform="rotate(45 110 60)"/>
  <ellipse cx="70" cy="100" rx="15" ry="12" fill="#FF1493" stroke="#E555AB" stroke-width="1" transform="rotate(45 70 100)"/>
  <ellipse cx="110" cy="100" rx="15" ry="12" fill="#FF1493" stroke="#E555AB" stroke-width="1" transform="rotate(-45 110 100)"/>

  <!-- Center -->
  <circle cx="90" cy="80" r="18" fill="#FFD700" stroke="#FFC700" stroke-width="2"/>
  <circle cx="90" cy="80" r="8" fill="#FF8C00"/>

  <!-- Stem -->
  <rect x="86" y="110" width="8" height="50" fill="#32CD32" stroke="#28A428" stroke-width="1"/>

  <!-- Leaves -->
  <ellipse cx="75" cy="130" rx="8" ry="15" fill="#228B22" stroke="#1F7A1F" stroke-width="1" transform="rotate(-30 75 130)"/>
  <ellipse cx="105" cy="140" rx="8" ry="15" fill="#228B22" stroke="#1F7A1F" stroke-width="1" transform="rotate(30 105 140)"/>
</svg>
\`\`\`

**For book problems (SINGLE BOOK - RIGHT PLACEMENT):**
\`\`\`html
<svg width="180" height="180" viewBox="0 0 180 180" class="question-svg-side" role="img" aria-label="Colorful books">
  <!-- Blue book -->
  <rect x="60" y="50" width="35" height="50" fill="#4169E1" stroke="#2E4BC7" stroke-width="2"/>
  <rect x="60" y="50" width="5" height="50" fill="#1E3A8A"/>
  <line x1="68" y1="65" x2="88" y2="65" stroke="#E6F3FF" stroke-width="1"/>
  <line x1="68" y1="70" x2="88" y2="70" stroke="#E6F3FF" stroke-width="1"/>
  <line x1="68" y1="75" x2="88" y2="75" stroke="#E6F3FF" stroke-width="1"/>

  <!-- Red book -->
  <rect x="80" y="40" width="35" height="50" fill="#FF6B6B" stroke="#E55353" stroke-width="2"/>
  <rect x="80" y="40" width="5" height="50" fill="#CC4444"/>
  <line x1="88" y1="55" x2="108" y2="55" stroke="#FFE6E6" stroke-width="1"/>
  <line x1="88" y1="60" x2="108" y2="60" stroke="#FFE6E6" stroke-width="1"/>
  <line x1="88" y1="65" x2="108" y2="65" stroke="#FFE6E6" stroke-width="1"/>

  <!-- Green book -->
  <rect x="100" y="60" width="35" height="50" fill="#32CD32" stroke="#28A428" stroke-width="2"/>
  <rect x="100" y="60" width="5" height="50" fill="#228B22"/>
  <line x1="108" y1="75" x2="128" y2="75" stroke="#E6FFE6" stroke-width="1"/>
  <line x1="108" y1="80" x2="128" y2="80" stroke="#E6FFE6" stroke-width="1"/>
  <line x1="108" y1="85" x2="128" y2="85" stroke="#E6FFE6" stroke-width="1"/>
</svg>
\`\`\`

**For sticker problems (MULTIPLE STICKERS - 2-ROW LAYOUT):**
\`\`\`html
<div class="counting-container-two-row">
<svg width="50" height="50" viewBox="0 0 50 50" class="counting-object-large" role="img" aria-label="Star sticker">
  <polygon points="25,2 30,18 46,18 33,28 38,44 25,34 12,44 17,28 4,18 20,18" fill="#FFD700"/>
</svg>
<svg width="50" height="50" viewBox="0 0 50 50" class="counting-object-large" role="img" aria-label="Circle sticker">
  <circle cx="25" cy="25" r="18" fill="#FF69B4"/>
</svg>
<svg width="50" height="50" viewBox="0 0 50 50" class="counting-object-large" role="img" aria-label="Heart sticker">
  <path d="M25,42 C17,32 8,22 12,12 C17,8 22,12 25,18 C28,12 33,8 37,12 C42,22 33,32 25,42 Z" fill="#FF6B6B"/>
</svg>
<svg width="50" height="50" viewBox="0 0 50 50" class="counting-object-large" role="img" aria-label="Square sticker">
  <rect x="8" y="8" width="34" height="34" fill="#32CD32" rx="4"/>
</svg>
<!-- Add more stickers as needed for exact quantity -->
</div>
\`\`\`

**For crayon problems (MULTIPLE CRAYONS - 2-ROW LAYOUT):**
\`\`\`html
<div class="counting-container-two-row">
<svg width="50" height="50" viewBox="0 0 50 50" class="counting-object-large" role="img" aria-label="Yellow crayon">
  <rect x="18" y="8" width="14" height="34" fill="#FFD700" stroke="#E6C200" stroke-width="2"/>
  <polygon points="18,4 32,4 25,0" fill="#FFA500"/>
</svg>
<svg width="50" height="50" viewBox="0 0 50 50" class="counting-object-large" role="img" aria-label="Blue crayon">
  <rect x="18" y="8" width="14" height="34" fill="#4169E1" stroke="#2E4BC7" stroke-width="2"/>
  <polygon points="18,4 32,4 25,0" fill="#1E3A8A"/>
</svg>
<svg width="50" height="50" viewBox="0 0 50 50" class="counting-object-large" role="img" aria-label="Green crayon">
  <rect x="18" y="8" width="14" height="34" fill="#32CD32" stroke="#28A428" stroke-width="2"/>
  <polygon points="18,4 32,4 25,0" fill="#228B22"/>
</svg>
<svg width="50" height="50" viewBox="0 0 50 50" class="counting-object-large" role="img" aria-label="Red crayon">
  <rect x="18" y="8" width="14" height="34" fill="#FF6B6B" stroke="#E55353" stroke-width="2"/>
  <polygon points="18,4 32,4 25,0" fill="#CC4444"/>
</svg>
<!-- Add more crayons as needed for exact quantity -->
</div>
\`\`\`

**CRITICAL INSTRUCTION FOR LLM:**
When a question mentions specific objects (stickers, crayons, flowers, books, biscuits, etc.), you MUST create an appropriate embedded SVG using the patterns above. Adapt the colors and shapes as needed for the specific context while maintaining the clean, educational style.

**PROFESSIONAL SVG INTEGRATION:**
- Create clean, simple SVG illustrations directly in the HTML
- Use bright, child-friendly colors (#FF69B4 pink, #FFD700 gold, #32CD32 green, #4169E1 blue, #D2691E brown)
- Maintain educational focus - images should enhance learning, not distract
- Ensure images are culturally appropriate and clearly recognizable
- Use consistent styling across all SVG elements

**SVG DESIGN GUIDELINES FOR COMMON OBJECTS:**

**Educational Objects:**
- Books: Blue/red rectangles with visible spine lines and title marks
- Pencils: Yellow elongated hexagons with pink erasers and silver bands
- Rulers: Rectangular shapes with measurement marks
- Crayons: Colorful cylindrical shapes with pointed tips

**Nature & Animals:**
- Flowers: Circles (centers) with elliptical petals, green stems and leaves
- Trees: Brown trunk rectangles with green circular/oval canopies
- Animals: Simple geometric shapes with recognizable features (ears, tails)
- Butterflies: Symmetrical wing patterns with thin body lines

**Food & Kitchen:**
- Fruits: Circles/ovals in natural colors (red apples, orange oranges)
- Vegetables: Appropriate shapes and colors (orange carrots, green broccoli)
- Sweets: Circles with texture details (chocolate chips on cookies)
- Baked goods: Brown shapes with decorative elements

**SVG BEST PRACTICES:**
- Use simple geometric shapes that children can easily recognize
- Apply bright, saturated colors that print well and engage young learners
- Keep designs clean and uncluttered to avoid distracting from math content
- Ensure consistent stroke widths (2-3px) and styling across all elements
- Size appropriately for the designated containers (150×150px or 500×120px)

**SVG INTEGRATION WORKFLOW:**

1. **Identify Visual Needs:** When creating a question, determine if an SVG would enhance learning
2. **Design Contextually:** Create SVG illustrations that match the specific question content
3. **Apply Design Guidelines:** Use the object-specific design guidelines above
4. **Integrate Properly:** Use appropriate CSS classes and sizing for optimal presentation

**CONTEXTUAL SVG MATCHING:**
- ✅ ALWAYS match SVGs to exact question context (flowers for flower problems, books for book problems)
- ✅ Create images that support mathematical concepts without revealing answers
- ✅ Use age-appropriate, colorful, engaging designs
- ✅ Maintain consistent visual style throughout the worksheet
- ❌ NEVER use generic shapes when specific objects are mentioned
- ❌ NEVER create images that directly show the answer to the problem

**HTML STRUCTURE:**
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
        <!-- Generate exactly ${config.questionCount} questions here -->
    </div>
</body>
</html>

**INSTRUCTIONS FOR LLM:**
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
   * Get SCRAPPING DOODLE specific guidance and collection suggestions
   */
  private static async getScrappingDoodleGuidance(config: EnhancedPromptConfig): Promise<string> {
    if (!scrappingDoodleService.isAvailable()) {
      return `**SCRAPPING DOODLE SERVICE NOT AVAILABLE**
- Premium SCRAPPING DOODLE collections not initialized
- Fall back to static templates below`
    }

    // Get the best collection for this topic
    const collection = scrappingDoodleService.getCollectionForTopic(
      config.topic,
      config.subtopic,
      config.yearGroup
    )

    if (!collection) {
      return `**NO MATCHING SCRAPPING DOODLE COLLECTION FOUND**
- No suitable collection for topic: ${config.topic} ${config.subtopic}
- Use generic static templates below`
    }

    // Get some sample images from the collection
    const sampleImage1 = await scrappingDoodleService.getImageFromCollection(collection, 'color', 0)
    const sampleImage2 = await scrappingDoodleService.getImageFromCollection(collection, 'color', 1)

    return `**🎨 MATCHED SCRAPPING DOODLE COLLECTION: ${collection.name}**
- **PRIORITY 1**: Use images from this collection for educational content
- **Collection path**: ${collection.path}
- **Topics covered**: ${collection.topics.join(', ')}
- **Age groups**: ${collection.ageGroups.join(', ')}
- **Available images**: ${collection.imageCount} high-quality images

**RECOMMENDED SCRAPPING DOODLE IMAGES FOR THIS WORKSHEET:**
\`\`\`html
<!-- Primary recommended image -->
<img src="${sampleImage1}" class="question-svg-side" width="180" height="180" alt="${collection.name} Image" />

<!-- Secondary option -->
<img src="${sampleImage2}" class="question-svg-side" width="180" height="180" alt="${collection.name} Image" />
\`\`\`

**CRITICAL: Use these SCRAPPING DOODLE images instead of any static fallback templates!**`
  }

}