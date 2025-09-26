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
  private static generateVariationPrompt(
    config: EnhancedPromptConfig, 
    variation: PromptVariation
  ): string {
    return this.generateOptimalPrompt(config)
  }



  /**
   * Generate optimal prompt - streamlined version with consolidated instructions
   */
  private static generateOptimalPrompt(config: EnhancedPromptConfig): string {
    const shouldApplyTheme = config.visualTheme && config.visualTheme !== 'none'
    const svgInstructions = shouldApplyTheme && config.visualTheme ? this.getSVGInstructions(config.visualTheme) : this.getContextualSVGInstructions()
    const themeContext = shouldApplyTheme && config.visualTheme ? this.getThemeContext(config.visualTheme, config.yearGroup) : null

    return `Create a ${config.yearGroup} ${config.topic} worksheet: "${config.subtopic}" (${config.difficulty}, ${config.questionCount} questions).

**QUALITY TARGET: 4.5/5.0** - Evaluated on: Accuracy (30%), Visual Clarity (25%), Educational Value (20%), Age Appropriateness (15%), Answer Protection (10%)

**CORE REQUIREMENTS:**
- UK National Curriculum aligned for ${config.subtopic}
- Age-appropriate vocabulary for ${config.yearGroup}
- Names: Emma, Oliver, Sophie, James, Lily, Thomas, Grace, Harry${themeContext ? `\n- Theme: ${themeContext}` : ''}
- NO markdown formatting - plain text only
- Normal capitalization ("smaller", "bigger") - NEVER "SMALLER"
- Complete HTML document starting with <!DOCTYPE html>

**SVG STRATEGY - CONTEXTUAL ACCURACY FIRST:**
**MANDATORY SVG CONTEXTUAL MATCHING:**
- SVG objects MUST exactly match question context (flowers for flower problems, books for book problems)
- SVG quantities MUST exactly match question numbers (if problem mentions 12 objects, show exactly 12 objects)
- SVG arrangements MUST reflect mathematical concepts (3 rows × 4 objects = show 3 rows with 4 objects each)
- NO generic shapes when specific objects are mentioned in questions

**WHEN TO USE SVGs:**
- Counting/grouping problems (show exact objects mentioned: cars, apples, stickers, books, flowers, THIN pencils with proper proportions)
- Multiplication arrays (show rows × columns arrangements that match problem)
- Division/sharing (show objects grouped as described in problem)
- Fractions (show exact parts shaded of the specific object mentioned)
- Measurements (rulers with accurate scales matching problem units)
- Money (UK coins/notes matching amounts in problem)
- Place value (show exact blocks/objects for the specific numbers mentioned)

**SKIP SVGs:**
- Abstract math ("think of a number", pure calculations)
- Questions where visuals would reveal answers directly
- Multi-step word problems where visualization is complex

**SVG PLACEMENT RULES:**
- **1-4 objects:** Side placement (150×150px)
- **5+ objects:** Below text (500×120px full width)
- **No containers/backgrounds** - direct SVG integration only

**CRITICAL SPACING REQUIREMENTS:**
- **Horizontal spacing:** Minimum 8-12px gaps between adjacent objects
- **Vertical spacing:** Minimum 6-10px gaps between rows when stacked
- **Edge margins:** 10-15px padding from SVG container edges
- **Multi-row layouts:** Ensure all objects fit within viewBox, no cutoffs
- **Object arrangement:** Use proper grid layout with consistent spacing

**PROFESSIONAL SVG QUALITY STANDARDS (Freepik-Level):**
- **Clean Modern Design:** Flat design style with subtle gradients, minimal shadows, attractive visual details
- **Sharp Vector Lines:** 2-3px stroke weights, perfectly aligned paths, crisp edges
- **Professional Color Palette:** Vibrant but harmonious colors (#E74C3C red, #3498DB blue, #2ECC71 green, #F39C12 orange, #9B59B6 purple, #FF6B6B coral, #4ECDC4 teal)
- **High Contrast:** Strong contrast ratios for educational clarity (minimum 4.5:1)
- **Consistent Style:** Unified design language across all elements, matching stroke weights
- **Scalable Precision:** Vector-perfect at all sizes, no pixelation or blurriness
- **Educational Clarity:** Clear, recognizable shapes with distinct visual hierarchy
- **Modern Aesthetics:** Contemporary icon style, rounded corners (2-4px radius), balanced proportions
- **Visual Appeal Requirements:** NO solid black fills, NO overly simple shapes. Use colorful, detailed, attractive designs that children will find engaging

**SPECIFIC OBJECT DESIGN GUIDELINES:**
- **Flowers:** Realistic flower appearance with 5-8 rounded/oval petals arranged around a circular center, green stems with small leaves, varied petal shapes (daisy-like, rose-like). Should clearly look like actual flowers, not abstract geometric shapes
- **Books:** Colorful covers with different hues, visible spines, slight 3D perspective, maybe simple patterns or text lines
- **Animals:** Friendly faces, proper proportions, natural colors, expressive eyes
- **Food Items:** Realistic colors, appetizing appearance, proper textures and details
- **Sports Items:** Dynamic appearance, proper colors (orange basketballs, yellow tennis balls), brand-appropriate designs
- **Geometric Shapes:** When needed, use colorful fills with subtle gradients, not just outlines

**SVG TECHNICAL REQUIREMENTS:**
- **Optimized Code:** Clean SVG markup, minimal file size, no unnecessary elements
- **Proper Scaling:** viewBox="0 0 width height" for perfect scaling
- **Accessibility:** Descriptive titles and semantic structure
- **Color Management:** Consistent hex codes, no transparency issues
- **Path Optimization:** Smooth curves, minimal anchor points, professional bezier handles

**AGE ADAPTATIONS:**
- **Reception/Year 1:** 50px min object size, 12px horizontal + 10px vertical spacing, max 5 objects, extra bold strokes (3px)
- **Year 2-3:** 40px min object size, 10px horizontal + 8px vertical spacing, max 12 objects, medium strokes (2.5px)
- **Year 4-6:** 35px min object size, 8px horizontal + 6px vertical spacing, max 20 objects, standard strokes (2px)

**LAYOUT CALCULATIONS:**
- **For 5-15 objects:** Use 2-3 rows maximum, calculate proper spacing to fit within viewBox
- **Grid arrangement:** Objects arranged in neat rows/columns with consistent gaps
- **Prevent cutoffs:** Always ensure bottom row is fully visible with proper margins

**CRITICAL ACCURACY:**
- Visual quantities MUST match question text exactly
- No calculations/answers visible in SVGs
- Fractions show correct shaded portions with clear boundaries
- Measurements display accurate values with readable labels

**SVG CONTEXTUAL ACCURACY AND QUALITY ENFORCEMENT:**
**CONTEXTUAL MATCHING (HIGHEST PRIORITY):**
- ❌ NEVER use generic shapes when specific objects are mentioned (NO rectangles for books, NO circles for flowers)
- ❌ NEVER mismatch quantities (if problem says 12 items, show exactly 12 items)
- ❌ NEVER ignore mathematical arrangements (3 rows × 4 = show 3 clear rows with 4 items each)
- ✅ ALWAYS match SVG objects to exact question context (books for book problems, flowers for flower problems)
- ✅ ALWAYS show correct quantities and arrangements that support the mathematics

**SPECIFIC CONTEXTUAL REQUIREMENTS:**
- ✅ MULTIPLICATION ARRAYS: "3 rows of 4 flowers" = show exactly 3 rows with exactly 4 flowers in each row
- ✅ DIVISION PROBLEMS: "share 24 sweets among 8 friends" = show 24 sweet objects arranged in 8 groups
- ✅ PLACE VALUE: "hundreds, tens, ones" = show proper place value blocks in correct proportions
- ✅ COUNTING: "Emma has 12 stickers" = show exactly 12 sticker objects, not random shapes

**VISUAL QUALITY (SECONDARY TO CONTEXT):**
- ❌ NEVER use solid black fills for real objects (flowers, books, animals, food)
- ❌ NEVER create geometric diamond shapes for flowers - flowers must have rounded oval petals in a circle
- ❌ NEVER create plain rectangles for books - books must have spine details, covers, 3D effect
- ❌ NEVER create short/thick pencils - pencils must be long and thin (6:1 ratio minimum)
- ❌ NEVER let objects touch each other - always maintain minimum 8-12px gaps between all objects
- ❌ NEVER create overlapping objects - each item must have clear separation and breathing space
- ❌ NEVER cut off objects at container edges - ensure full visibility with adequate margins (minimum 10px from any edge)
- ❌ NEVER let objects overflow their containers - all SVG elements must fit completely within their designated space
- ✅ POSITIONING: Leave sufficient margin space around all visual elements to prevent truncation or overlap
- ✅ FLOWERS: CRITICAL - Must look like real flowers with individual petals visible. Create 5-8 distinct oval-shaped petals radiating from a central yellow circle. Each petal should be separate and clearly defined, not merged together. Add thin green stem extending downward. Use bright colors (pink, red, purple, yellow, white) for petals. Each flower must look like a child's drawing of a flower - simple but realistic with visible individual petals around center
- ✅ BOOKS: CRITICAL - Must look like real books, NOT plain rectangles. Include: visible spine with title lines, cover details, slight 3D perspective showing thickness, binding edge, varied heights. Use book-specific proportions (taller than wide). Add visual details like author lines on spine, cover graphics, realistic shadows. NEVER just solid colored rectangles
- ✅ STICKERS: Circular or star-shaped colorful stickers, not generic rectangles
- ✅ PENCILS: CRITICAL - Must be thin and elongated (6:1 length-to-width ratio minimum). Yellow wooden body with silver ferrule band and pink eraser, sharp pointed graphite tip. Each pencil must have 8-12px spacing from others - NEVER touching or overlapping. NOT thick markers or crayons. Use hexagonal or round cross-section, never rectangular. Typical proportions: 100px long × 12px wide maximum with proper gaps between each pencil
- ✅ SWEETS: CRITICAL - Must be recognizable candy shapes, NOT simple circles. Create gummy bears with visible limbs, lollipops with stick handles, wrapped candies with crinkle textures, or chocolate pieces with surface details. Each sweet must have 8-12px spacing from others. Use bright candy colors (red, green, purple, orange, yellow) with gradients and highlights. NEVER plain circles - add identifying candy features

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
            width: 150px;
            height: 150px;
            margin: 10px;
            flex-shrink: 0;
        }
        .question-svg-below {
            width: 100%;
            height: 120px;
            margin: 10px 0;
            display: block;
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
Generate EXACTLY ${config.questionCount} questions following alternating pattern:
1. Question with SVG below text
2. Question with SVG on side
3. Question text-only
4. Repeat pattern

Each question should be wrapped in proper HTML structure using the classes defined above.

**CRITICAL SVG-QUESTION MATCHING REQUIREMENTS:**
Before creating any SVG, read the question text carefully and ensure:
1. SVG objects match exactly what's mentioned (flowers=flowers, books=books, pencils=THIN realistic pencils NOT thick markers)
2. SVG quantities match exactly what's stated (12 items=show 12 items, not 2 or 8)
3. SVG arrangements reflect the mathematics (3×4 array=show 3 rows with 4 items each)
4. NO generic shapes when specific objects are mentioned
5. Each SVG must educationally support the question, not confuse it

**CRITICAL OUTPUT REQUIREMENTS:**
- Return ONLY the complete HTML document
- Must start with <!DOCTYPE html>
- Must end with </html>
- NO explanatory text before or after the HTML
- NO markdown formatting around the HTML
- NO code blocks or backticks
- NO "Here is the worksheet..." or similar prefixes
- NO "I hope this helps..." or similar suffixes
- JUST the raw HTML document - nothing else

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

**FINAL REMINDER: Your response should be PURE HTML starting with <!DOCTYPE html> and ending with </html>. Any other content will cause system errors.**`
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
      sizingGuidelines: '120-140px for side placement, full-width × 80px for below placement (increased height to prevent cutoff), maintain crisp quality with professional vector precision',
      arrangementInstructions: 'CRITICAL: SVG MUST MATCH QUESTION CONTEXT EXACTLY. If question mentions "flowers", show flowers. If "books", show books. If "3 rows of 4", show exactly 3 rows with exactly 4 objects each. CONTAINER-FREE SVG INTEGRATION: Use class="question-svg-side" (150×150px) for 1-4 objects. Use class="question-svg-below" (500×140px) for 5+ objects in arrays/groups to prevent cutoff. MANDATORY SPACING: 8-12px horizontal gaps, 6-10px vertical gaps between ALL objects - objects must NEVER touch or overlap. MATHEMATICAL ACCURACY: Arrays must show correct rows×columns, division must show correct groupings, counting must show exact quantities mentioned. NO generic shapes - use contextually appropriate objects that match the problem story.',
      qualityRequirements: 'TARGET 4.5+ FREEPIK-LEVEL QUALITY: Professional container-free illustrations with VIBRANT harmonious colors (#E74C3C red, #3498DB blue, #2ECC71 green, #F39C12 orange, #9B59B6 purple, #FF6B6B coral, #4ECDC4 teal), sharp 2-3px stroke weights, perfectly aligned vector paths. MODERN FLAT DESIGN: Clean contemporary style with subtle gradients, rounded corners (2-4px radius), high contrast ratios (minimum 4.5:1). CRITICAL QUALITY RULES: NO solid black fills, NO basic geometric shapes for real objects, NO overly simplified designs. SPECIFIC EXAMPLES: FLOWERS must look like real flowers with 5-8 distinct oval petals around yellow center, green stem - each petal separate and visible, NEVER geometric ovals or merged shapes. BOOKS must look like real books with spine details, cover graphics, 3D thickness, binding edge, title lines - NEVER plain colored rectangles. PENCILS must be THIN and elongated (6:1 ratio minimum, 100px long × 12px wide max) with 8-12px gaps between each - yellow wooden body, silver ferrule, pink eraser, sharp tip. Never thick/fat like markers or touching each other. SWEETS must be detailed candy shapes (gummy bears with limb details, lollipops with sticks, wrapped candies with crinkles) with 8-12px spacing - NEVER simple circles or touching objects. APPLES must be red/green with leaf and highlight, NEVER cut off - ensure 10px margins. POSITIONING: All objects must fit completely within their containers with minimum 10px margins from all edges. Make every SVG visually appealing and child-friendly. NO backgrounds, shadows, containers, or decorative elements. TECHNICAL EXCELLENCE: Optimized SVG markup, proper viewBox scaling, clean bezier curves, minimal anchor points. Each SVG must be contextually perfect, educationally valuable, scalable at all sizes, and meet minimum age-appropriate size requirements. CRITICAL: Elements smaller than age-appropriate minimums must be SKIPPED entirely.'
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