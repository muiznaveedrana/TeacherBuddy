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
   * Generate optimal prompt combining the best elements from all approaches
   * Combines professional structure, creative engagement, and motivational elements
   */
  private static generateOptimalPrompt(config: EnhancedPromptConfig): string {
    const curriculumContext = this.getCurriculumContext(config)
    const shouldApplyTheme = config.visualTheme && config.visualTheme !== 'none'
    const svgInstructions = shouldApplyTheme && config.visualTheme ? this.getSVGInstructions(config.visualTheme) : this.getContextualSVGInstructions()
    const accessibilityRequirements = this.getAccessibilityRequirements(config.yearGroup)
    const themeContext = shouldApplyTheme && config.visualTheme ? this.getThemeContext(config.visualTheme, config.yearGroup) : null

    return `Create a ${config.yearGroup} ${config.topic} worksheet focusing specifically on "${config.subtopic}" (${config.difficulty} level, ${config.questionCount} questions).

**Requirements:**
- UK National Curriculum aligned for ${config.subtopic} specifically
- Age-appropriate vocabulary with mathematical precision
- Content must directly address the subtopic "${config.subtopic}" learning objectives
- Use names: Emma, Oliver, Sophie, James, Lily, Thomas, Grace, Harry${themeContext ? `\n- Theme: ${themeContext}` : ''}
- NO markdown formatting (*bold*, _italic_) in question text - use plain text only
- For emphasis, use CAPITAL LETTERS or simple quotation marks

**Format:** Complete HTML document ONLY (no markdown, no code blocks, no triple-backtick html tags). Start directly with <!DOCTYPE html> and embedded SVG icons (high-quality, detailed shapes inspired by OpenClipart.org: ${svgInstructions.searchTerms.join(', ')}).

**ADVANCED SVG LAYOUT INSTRUCTIONS (Target: 4.7/5 Quality):**

**HORIZONTAL-FIRST SVG STRATEGY (Clean & Spacious):**
- **PREFER horizontal wide SVGs** - they look cleaner and less congested
- **DEFAULT PLACEMENT: BELOW text** (full width × 80-120px height)
- USE side placement ONLY for simple objects (single items, icons)
- SVGs are NOT mandatory for every question
- SKIP SVGs for abstract concepts (e.g., "think of a number", pure calculation)

**HORIZONTAL SVG ADVANTAGES:**
- More space for multiple objects without crowding
- Can use two rows for large counts (e.g., 10 items per row)
- Number lines and timelines fit naturally
- Visual comparisons side-by-side
- Reduces cutoff issues with maximum width available

**ENHANCED SVG SIZING (Cutoff Prevention):**
- **Horizontal SVGs**: 100% container width × 120px height with 10px internal margins
- **Side SVGs**: 150×150px usable area with 10px internal margins
- **Safe content area**: Use 95% of SVG dimensions for actual content
- **Multiple objects**: Maximum 6 objects per row, use 2 rows with 20px spacing if needed
- **Text in SVGs**: Maximum 12pt font size for readability

**PREVENT CONGESTION & CUTOFF:**
- Use MAXIMUM available width for horizontal SVGs with minimal margins
- **Large counts strategy**: 6 objects per row maximum, then start new row
- 15px minimum spacing between all objects horizontally
- **CRITICAL: ROW SPACING**: 25px minimum spacing between rows vertically
- 10px minimum margin from all SVG edges
- **No cramming**: If objects don't fit cleanly, use fewer per row
- Text within SVGs: 12pt maximum for readability

**INTELLIGENT CONTENT MATCHING & SPACING:**
- **QUANTITY-BASED LAYOUT SELECTION (STRICTLY ENFORCED)**:
  - 1-4 objects: Side container (160×160px) with single arrangement
  - 5-8 objects: Horizontal container (single row)
  - 9+ objects: **MANDATORY** horizontal container (multi-row layout)
  - **CRITICAL**: Questions with 9, 10, 11, 12, 13, 14, 15, 16, 17, 18+ objects MUST use horizontal layout
  - **NEVER** use side containers for quantities of 9 or more objects
  - Examples requiring horizontal layout: 18 sweets, 13 balloons, 16 pencils, 11 stickers
- For HORIZONTAL objects (buses, trains, timelines, number lines): ALWAYS place BELOW text
- For VERTICAL objects (people, trees, tall containers): Place on SIDES only if ≤8 objects
- For COUNTING objects: Arrange in CLEAR GRIDS with 15px minimum spacing between items
- **MULTI-ROW HORIZONTAL LAYOUTS**: First row at y=30, second row at y=70 (25px+ spacing)
- For FRACTIONS: Show clear divisions with contrasting colors
- For MEASUREMENTS: Include accurate scales with readable numbers
- For GROUPED OBJECTS: Use distinct color coding (red group, blue group, etc.)
- For MATHEMATICAL OPERATIONS: Show clear before/after states with visual separation

**MATHEMATICAL OPERATION VISUALIZATION:**
- MULTIPLICATION: Show grouped arrays (3×4 = 3 rows of 4 objects each)
- DIVISION: Show total amount split into equal groups with separators
- COMPARISON: Show both quantities side by side with clear labels
- ADDITION: Show distinct groups coming together (red apples + green apples)
- For LARGE NUMBERS: Use base-10 groupings (tens grouped separately from ones)
- MONEY PROBLEMS: Show actual coins/notes with correct UK denominations

**VISUAL APPEAL ENHANCEMENTS:**
- Add subtle drop shadows: filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.2))"
- Use gradient fills for depth: linear-gradient for engaging visuals
- Ensure 15px minimum spacing between SVG and text elements
- Create visual hierarchy with different sizes for emphasis

${svgInstructions.arrangementInstructions}
${svgInstructions.qualityRequirements}

**CRITICAL: 4.7/5 QUALITY STANDARDS:**
- Every SVG must be CONTEXTUALLY PERFECT (not generic circles/squares)
- Alternating layout prevents monotony and boredom
- Professional presentation with consistent spacing
- Educational value enhanced through visual storytelling

**ENHANCED CONTEXTUAL ACCURACY (4.7/5 Target):**
- COUNTING problems: Show EXACT COUNT mentioned (14 cars = 14 visible car shapes)
- ADDITION: Visual groups that clearly show the mathematical operation
- PLACE VALUE: Use base-10 blocks, ten-frames, or number lines with exact values
- MULTIPLICATION: Show arrays, groups, or repeated patterns that match the problem
- SHAPES: Use real-world objects (houses, windows, wheels) not abstract shapes
- MONEY: Show actual UK coins and notes with correct colors and features
- NO generic geometric shapes unless specifically teaching geometry

**WHEN TO INCLUDE SVGs (Educational Value):**
- COUNTING problems with specific objects (cars, apples, stickers)
- GROUPING/ARRAYS for multiplication (visual groups help understanding)
- COMPARISON problems (side-by-side visual comparison)
- MONEY problems (show actual coins/notes)
- SHAPES and geometry (visual identification needed)
- FRACTIONS (visual parts of wholes)

**WHEN TO SKIP SVGs (Clean Layout Better):**
- "Think of a number" problems (abstract mental math)
- Pure calculation questions (847 + 293 = ?)
- Word problems about time, distance, or abstract concepts
- Division with large numbers where grouping isn't practical
- Questions asking for written explanations or methods

**SVG CREATION & CUTOFF PREVENTION REQUIREMENTS:**
- MANDATORY: Set viewBox="0 0 WIDTH HEIGHT" on every SVG to utilize full space
- MANDATORY: Use minimal 10px margins from all edges for safety
- For side SVGs: viewBox="0 0 150 150" with content in 130×130 usable area
- For horizontal SVGs: viewBox="0 0 500 120" with content in 480×100 usable area
- Position content with 10px minimum margin from viewBox edges
- If complex SVG fails, use simple circles/squares as counting objects
- Example side SVG: <svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="65" fill="red"/></svg>
- Example horizontal multi-row: <svg viewBox="0 0 500 120"><rect x="20" y="20" width="30" height="20" fill="blue"/><rect x="70" y="20" width="30" height="20" fill="blue"/><rect x="20" y="70" width="30" height="20" fill="orange"/></svg>
- Utilize MAXIMUM available space while maintaining 10px safety margins

**CRITICAL: NO ANSWER REVEALS IN SVGs:**
- NEVER show calculations, totals, or final answers in visuals
- NEVER label quantities that give away solutions
- For multiplication/division: Show context WITHOUT revealing math
- Example: "6 shelves × 10 cars" → Show shelves with cars but no quantity labels
- Use appropriate objects and visual representations without revealing answers

**ENHANCED SVG CUTOFF PREVENTION:**
- CRITICAL: 10px minimum margins from ALL SVG edges
- For horizontal SVGs: Use 95% of container width with 10px margins
- For vertical SVGs: Use 95% of container height with 10px margins
- Test fit: If objects don't fit cleanly, reduce count per row
- Use optimized container dimensions: 150×150px for side, 120px height for horizontal
- NEVER exceed viewBox boundaries - ensure all content fits within safe area

**AGE-APPROPRIATE SVG STRATEGY:**
- RECEPTION/YEAR 1: Show exact counts for learning (apples to count)
- YEAR 2: Show mathematical relationships (groupings, comparisons)
- YEAR 3+: Show appropriate visual contexts with proper SVG objects, NOT person avatars or name characters

**RECEPTION-SPECIFIC REQUIREMENTS (Age 4-5):**
- NO asterisk formatting (*word*) - use simple text only
- Shapes must be CLEARLY SEPARATED with 30px minimum spacing
- NO overlapping or clustered elements
- Large, simple shapes with bold outlines (4px stroke minimum)
- Maximum 4-5 shapes per SVG to avoid confusion
- Use primary colors only: red, blue, green, yellow, orange
- Questions must use simple vocabulary: "first", "last", "big", "small"

**VISUAL-TEXT ALIGNMENT REQUIREMENTS:**
- All SVG images MUST directly relate to and support the question text
- For fractions: Visual representations must show the exact fractions mentioned (e.g., if question asks about 3/4, show 3 out of 4 parts shaded)
- For measurements: Scales, rulers, containers must display the actual values referenced in the question
- For comparisons: Charts and graphs must accurately represent the specific data mentioned
- For word problems: Images should depict the exact scenario described, not generic representations
- Ensure visual elements enhance understanding rather than confuse or contradict the mathematical content

**CRITICAL - ENHANCED HTML STRUCTURE FOR 4.7/5 QUALITY:**
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
            letter-spacing: 0.5px;
        }

        .subtitle {
            font-size: 12pt;
            font-weight: normal;
            color: #666;
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

        /* ENHANCED ALTERNATING LAYOUT FOR 4.7/5 QUALITY */
        .question {
            margin: 15px 0;
            padding: 15px;
            border-radius: 8px;
            background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            page-break-inside: avoid;
        }

        .question:first-child {
            margin-top: 0;
        }

        /* ALTERNATING LAYOUTS */
        .question-right {
            display: flex;
            align-items: flex-start;
            gap: 20px;
        }

        .question-left {
            display: flex;
            align-items: flex-start;
            gap: 20px;
            flex-direction: row-reverse;
        }

        .question-below {
            display: block;
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

        /* SIDE ICONS (160x160px) */
        .question-icon-side {
            width: 160px;
            height: 160px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border-radius: 12px;
            box-shadow: 0 3px 12px rgba(0,0,0,0.15);
            padding: 5px;
        }

        .question-icon-side svg {
            width: 150px;
            height: 150px;
            filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
        }

        /* BELOW ICONS (Full width × 130px) */
        .question-icon-below {
            width: 100%;
            height: 130px;
            margin: 15px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 5px;
        }

        .question-icon-below svg {
            width: auto;
            height: 120px;
            max-width: 95%;
            filter: drop-shadow(1px 1px 3px rgba(0,0,0,0.2));
        }

        /* ANSWER SPACE */
        .answer-space {
            margin: 20px 0;
            min-height: ${this.getAnswerHeight(config.yearGroup)};
            background: white;
            border: 2px dashed #e0e0e0;
            border-radius: 6px;
            position: relative;
        }

        .answer-space::before {
            content: '';
            position: absolute;
            bottom: 8px;
            left: 20px;
            right: 20px;
            height: 1px;
            background: #ccc;
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
        <h1 class="worksheet-title">${this.toProperCase(config.topic.replace('-', ' '))}${config.subtopic ? ` - <span class="subtitle">${this.toProperCase(config.subtopic.replace('-', ' '))}</span>` : ''}</h1>
    </div>

    <div class="worksheet-content">
        [Generate exactly ${config.questionCount} questions using HORIZONTAL-FIRST SVG STRATEGY:

        <!-- PREFER: Question with horizontal SVG below text (clean & spacious) -->
        <div class="question question-below">
            <div class="question-content">
                <span class="question-number">1.</span>
                <span class="question-text">[Question with countable objects/comparisons]</span>
            </div>
            <div class="question-icon-below">
                [Wide horizontal SVG - full width × 80-120px - Clean layout with proper spacing]
            </div>
        </div>
        <div class="answer-space"></div>

        <!-- ALTERNATIVE: Question without SVG (abstract thinking) -->
        <div class="question">
            <div class="question-content">
                <span class="question-number">2.</span>
                <span class="question-text">[Abstract math question]</span>
            </div>
            <!-- NO SVG - clean text-only layout -->
        </div>
        <div class="answer-space"></div>

        <!-- Use horizontal SVGs for multiple objects, number lines, comparisons -->
        <!-- Use side SVGs ONLY for simple single objects -->]

        CRITICAL 4.7/5 REQUIREMENTS:
        - PERFECT alternating pattern eliminates monotony
        - VIBRANT colors: #E74C3C, #3498DB, #2ECC71, #F39C12, #9B59B6
        - Sharp 2-3px stroke weights, NO pixelation
        - Contextually PERFECT SVGs (no generic shapes)
        - Professional shadows and gradients for depth]
    </div>
</body>
</html>

CRITICAL REQUIREMENTS:
- NO instructional text in header
- NO "Show your work" labels or dashed containers
- NO "Final Answer:" labels or answer boxes
- Clean empty space naturally guides student writing
- Minimal margins for maximum space utilization
- The HTML MUST contain "worksheet-header" and "worksheet-content" classes
- CRITICAL: Question text MUST start immediately next to the question number (1., 2., etc.) with consistent 8px spacing - NO large gaps or line breaks between number and text

**CRITICAL: MANDATORY QUALITY REQUIREMENTS:**
- ALWAYS generate EXACTLY ${config.questionCount} complete questions
- EVERY counting/grouping question MUST include visual SVG representation
- If you cannot create a proper SVG, use simple geometric shapes as fallback
- NO INCOMPLETE WORKSHEETS - better simple than broken
- Return ONLY the complete HTML document
- Start directly with <!DOCTYPE html> and end with </html>

**QUALITY VALIDATION CHECKLIST:**
- ✓ ${config.questionCount} questions present?
- ✓ Every question has educational value?
- ✓ SVGs support the mathematical concept?
- ✓ Layout is clean and uncluttered?
- ✓ Age-appropriate language used?`
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
        sizingGuidelines: '120-140px height, maintain aspect ratio with detailed features',
        arrangementInstructions: 'Animals integrated with mathematical problems as counting objects or story elements',
        qualityRequirements: 'Clear, simple designs suitable for educational use'
      },
      'food': {
        searchTerms: ['fruits', 'vegetables', 'healthy food', 'kitchen items'],
        sizingGuidelines: '120-140px height, appetizing proportions with detailed textures',
        arrangementInstructions: 'Food items used for counting, fractions, or measurement problems. For fractions, show exactly the fractional parts mentioned (e.g., pizza with correct slices). For measurements, show accurate portions or weights.',
        qualityRequirements: 'Colorful, recognizable food illustrations that accurately represent the mathematical content'
      },
      'sports': {
        searchTerms: ['sports equipment', 'balls', 'athletic gear', 'playground'],
        sizingGuidelines: '120-140px height, dynamic proportions with action details',
        arrangementInstructions: 'Sports items for counting, scoring, or measurement exercises. For comparisons, show accurate score differences or measurement scales. For fractions, represent exact team/player portions.',
        qualityRequirements: 'Dynamic, engaging sports-themed illustrations that accurately reflect the mathematical data'
      },
      'space': {
        searchTerms: ['planets', 'rockets', 'stars', 'astronauts'],
        sizingGuidelines: '120-140px height, cosmic proportions with detailed elements',
        arrangementInstructions: 'Space elements for counting, patterns, or mathematical exploration',
        qualityRequirements: 'Inspiring, scientifically appropriate space imagery'
      },
      'standard': {
        searchTerms: ['geometric shapes', 'mathematical symbols', 'educational icons'],
        sizingGuidelines: '120-140px height, clean geometric proportions with precise details',
        arrangementInstructions: 'Mathematical symbols and shapes supporting problem concepts. For fractions, show exact fractional divisions. For measurements, display accurate scales and units. For comparisons, represent precise numerical relationships.',
        qualityRequirements: 'Professional, curriculum-aligned mathematical graphics that accurately represent the mathematical content'
      },
      'none': {
        searchTerms: ['geometric shapes', 'mathematical symbols', 'educational icons'],
        sizingGuidelines: '120-140px height, clean geometric proportions with precise details',
        arrangementInstructions: 'Mathematical symbols and shapes supporting problem concepts. For fractions, show exact fractional divisions. For measurements, display accurate scales and units. For comparisons, represent precise numerical relationships.',
        qualityRequirements: 'Professional, curriculum-aligned mathematical graphics that accurately represent the mathematical content'
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
      sizingGuidelines: '120-140px for side placement, full-width × 60px for below placement, maintain crisp quality',
      arrangementInstructions: 'ALTERNATING LAYOUT MASTERY: Side SVGs (140×140px) for questions 1,3,5. Below SVGs (full-width × 60px) for questions 2,4. Choose contextually PERFECT elements: detailed coins for money, geometric shapes for geometry, countable objects for numbers. Each must be visually engaging and mathematically precise. For fractions: exact divisions with contrasting colors. For measurements: accurate scales with readable numbers. For comparisons: clear visual data representation.',
      qualityRequirements: 'TARGET 4.7/5 QUALITY: Professional illustrations with VIBRANT colors (#E74C3C, #3498DB, #2ECC71, #F39C12, #9B59B6), sharp 2-3px strokes, subtle drop shadows. NO pixelation, NO generic shapes. Each SVG must be contextually perfect, educationally valuable, and visually stunning. Side SVGs: detailed and engaging. Below SVGs: wide and informative.'
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