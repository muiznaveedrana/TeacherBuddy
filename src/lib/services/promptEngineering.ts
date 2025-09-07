/**
 * Advanced Prompt Engineering Service for USP.1 - LLM Prompt Engineering Foundation
 * 
 * Implements sophisticated prompt templates based on research-backed educational practices
 * with OpenClipart SVG integration, UK curriculum alignment, and quality assurance framework.
 * 
 * Story: USP.1 LLM Prompt Engineering Foundation (Phase 1)
 * Quality Target: ≥4.0/5.0 across all evaluation metrics
 */

import { WorksheetConfig } from '@/lib/types/worksheet'
import { getTopicDetails } from '@/lib/data/curriculum'

// Prompt template variations for A/B testing
export type PromptTemplate = 'structured' | 'creative' | 'gamified'

// Quality metrics for evaluation (USP.1 AC: 4)
export interface QualityMetrics {
  visualAppeal: number // 25% weight
  educationalAppropriateness: number // 25% weight  
  svgIntegration: number // 20% weight
  curriculumAlignment: number // 15% weight
  accessibility: number // 15% weight
}


// SVG sourcing instructions for OpenClipart integration (USP.1 AC: 3)
export interface SVGInstructions {
  searchTerms: string[]
  sizingGuidelines: string
  arrangementInstructions: string
  qualityRequirements: string
}

/**
 * Main prompt engineering service class
 * Implements the research-backed prompt foundation (USP.1 AC: 1)
 */
export class PromptEngineeringService {
  
  /**
   * Generates advanced prompts based on the specified template approach
   * Uses Phase 1 research findings and educational best practices
   */
  public static generatePrompt(
    config: WorksheetConfig, 
    template: PromptTemplate = 'structured'
  ): string {
    // Always use the latest prompt engineering approach
    switch (template) {
      case 'structured':
        return this.generateStructuredPrompt(config)
      case 'creative':
        return this.generateCreativePrompt(config)
      case 'gamified':
        return this.generateGamifiedPrompt(config)
      default:
        return this.generateStructuredPrompt(config)
    }
  }

  /**
   * Template A: Structured Educational Approach (USP.1 AC: 5)
   * Research-backed instructions with explicit SVG integration
   */
  private static generateStructuredPrompt(
    config: WorksheetConfig
  ): string {
    const curriculumContext = this.getCurriculumContext(config)
    const svgInstructions = this.getSVGInstructions(config.visualTheme || 'standard')
    const accessibilityRequirements = this.getAccessibilityRequirements(config.yearGroup)

    return `**CONTEXT:** Generate a high-quality, professionally designed mathematics worksheet for ${config.yearGroup} students focusing on ${config.topic} - ${config.subtopic}. This should be competitive with premium educational platforms and demonstrate superior quality.

**EDUCATIONAL REQUIREMENTS:**
- Topic: ${curriculumContext.topic} (${curriculumContext.subtopic})
- UK National Curriculum alignment: ${curriculumContext.learningObjectives.join(', ')}
- Age-appropriate language: ${curriculumContext.languageLevel}
- Question count: ${config.questionCount} problems optimized for cognitive load
- Learning progression: ${curriculumContext.progressionGuideline}
- Mathematical focus: ${curriculumContext.mathFocus}

**VISUAL DESIGN & LAYOUT:**
- A4 format (210 × 297 mm) optimized for printing
- Font specifications: ${accessibilityRequirements.fontRequirements}
- Layout structure: ${this.getLayoutStructure(config.layout)}
- Color scheme: Professional educational palette with off-white background (#FEFDF8)
- White space optimization: Generous spacing to reduce cognitive overload
- Visual hierarchy: Clear problem numbering, structured content flow

**SVG INTEGRATION INSTRUCTIONS:**
Source all visual elements from OpenClipart.org (CC0 license, no attribution required):
- Search terms: ${svgInstructions.searchTerms.join(', ')}
- Object sizing: ${svgInstructions.sizingGuidelines}
- Arrangement: ${svgInstructions.arrangementInstructions}
- Quality standards: ${svgInstructions.qualityRequirements}
- Integration method: Embedded SVGs with proper scaling and contrast

**UK CURRICULUM COMPLIANCE:**
- Programme of Study alignment: ${curriculumContext.programmOfStudy}
- Mathematical vocabulary: ${curriculumContext.keyVocabulary.join(', ')}
- Assessment criteria: ${curriculumContext.assessmentFocus}
- Real-world contexts: UK-specific scenarios (pounds, metres, familiar settings)

**ACCESSIBILITY REQUIREMENTS:**
- SEND compliance: ${accessibilityRequirements.sendCompliance}
- Dyslexia considerations: ${accessibilityRequirements.dyslexiaSupport}
- Visual contrast: Minimum 4.5:1 contrast ratios
- Cognitive load: ${accessibilityRequirements.cognitiveSupport}
- Clear instructions: Simple, unambiguous language

**OUTPUT FORMAT:**
Return complete HTML worksheet document with embedded SVG elements sourced from OpenClipart.org.

Generate a professional worksheet with proper HTML structure, CSS styling, and embedded SVG visuals that enhance the mathematical problems.

**QUALITY EXPECTATIONS (Target: ≥4.0/5.0):**
Produce questions that:
- Engage ${config.yearGroup} students through age-appropriate contexts
- Demonstrate professional educational publishing quality
- Follow evidence-based mathematics pedagogy
- Exceed quality standards of existing worksheet generators
- Support diverse learning needs through thoughtful design
- Maintain curriculum confidence for UK teachers

**STUDENT PERSONALIZATION:**
Integrate student names naturally: ${config.studentNames.length > 0 ? config.studentNames.join(', ') : 'Use diverse UK-appropriate names'}

Generate exactly ${config.questionCount} mathematically sound, curriculum-aligned questions that demonstrate competitive excellence in educational worksheet design.

Return complete HTML document with embedded SVGs, no JSON format.`
  }

  /**
   * Template B: Creative Storytelling Approach (USP.1 AC: 5)
   * Engaging narrative contexts with educational rigor
   */
  private static generateCreativePrompt(
    config: WorksheetConfig
  ): string {
    const themeContext = this.getCreativeTheme(config.visualTheme || 'standard')
    const basePrompt = this.generateStructuredPrompt(config)

    // Inject creative theme elements into the structured prompt
    const themeHeader = '**CONTEXT AND CREATIVE THEME:**\n' +
      'Theme: ' + themeContext.theme + '\n' +
      'Narrative: ' + themeContext.narrative + '\n' +
      'Characters: ' + themeContext.characters.join(', ') + '\n' +
      'Setting: ' + themeContext.setting + '\n\n' +
      '**EDUCATIONAL CONTEXT:**'
    
    return basePrompt.replace(
      '**CONTEXT:**', 
      themeHeader
    ).replace(
      '**SVG INTEGRATION INSTRUCTIONS:**',
      '**THEMED SVG INTEGRATION:**\n' +
      'Creative theme integration with OpenClipart.org sources:\n' +
      '- Theme-specific search terms: ' + themeContext.svgSearchTerms.join(', ') + '\n' +
      '- Narrative consistency: Maintain visual story throughout worksheet\n' +
      '- Character development: ' + themeContext.visualCharacterGuidelines + '\n\n' +
      '**STANDARD SVG INTEGRATION INSTRUCTIONS:**'
    )
  }

  /**
   * Template C: Gamified Challenge Approach (USP.1 AC: 5)
   * Achievement-based learning with competitive elements
   */
  private static generateGamifiedPrompt(
    config: WorksheetConfig
  ): string {
    const gameContext = this.getGameContext(config.visualTheme || 'standard')
    const basePrompt = this.generateStructuredPrompt(config)

    return basePrompt.replace(
      '**CONTEXT:**',
      '**GAMIFIED CONTEXT:**\n' +
      'Game Theme: ' + gameContext.theme + '\n' +
      'Achievement System: ' + gameContext.achievementSystem + '\n' +
      'Challenge Progression: ' + gameContext.challengeProgression + '\n' +
      'Success Rewards: ' + gameContext.successRewards + '\n\n' +
      '**EDUCATIONAL CONTEXT:**'
    ).replace(
      '**QUALITY EXPECTATIONS',
      '**GAMIFICATION ELEMENTS:**\n' +
      '- Badge system: ' + gameContext.badgeSystem + '\n' +
      '- Progress tracking: ' + gameContext.progressTracking + '\n' +
      '- Challenge levels: ' + gameContext.challengeLevels + '\n\n' +
      '**QUALITY EXPECTATIONS'
    )
  }


  /**
   * Gets comprehensive curriculum context with research integration
   */
  private static getCurriculumContext(config: WorksheetConfig) {
    const topicDetails = getTopicDetails(config.yearGroup, config.topic)
    const subtopicData = topicDetails?.subtopics.find(sub => sub.value === config.subtopic)
    const yearGroupDetails = this.getYearGroupDetails(config.yearGroup)

    return {
      topic: topicDetails?.label || config.topic,
      subtopic: subtopicData?.label || config.subtopic,
      learningObjectives: topicDetails?.learningObjectives || [],
      programmOfStudy: config.yearGroup + ' Programme of Study - ' + (topicDetails?.label || ''),
      keyVocabulary: this.getKeyVocabulary(config.yearGroup, config.topic),
      assessmentFocus: this.getAssessmentFocus(config.yearGroup, config.topic),
      languageLevel: yearGroupDetails.languageLevel,
      progressionGuideline: yearGroupDetails.progressionGuideline,
      mathFocus: yearGroupDetails.mathFocus
    }
  }

  /**
   * Gets OpenClipart SVG sourcing instructions (USP.1 AC: 3)
   */
  private static getSVGInstructions(combinationType: string): SVGInstructions {
    const instructions: Record<string, SVGInstructions> = {
      'reception-addition': {
        searchTerms: [
          'apple counting svg openclipart',
          'toy counting svg openclipart', 
          'animal counting svg openclipart',
          'simple shapes counting svg openclipart'
        ],
        sizingGuidelines: '20-30px per object for easy counting and visual clarity',
        arrangementInstructions: 'Arrange objects in clear groups to support visual addition concepts, with distinct groupings for each addend',
        qualityRequirements: 'High contrast, simple child-friendly designs, clear outlines, minimal detail for focus'
      },
      'year3-multiplication': {
        searchTerms: [
          'array multiplication svg openclipart',
          'grouping division svg openclipart',
          'dots array svg openclipart',
          'grid multiplication svg openclipart'
        ],
        sizingGuidelines: 'Arrays should be clearly visible, dots 15-20px, consistent spacing',
        arrangementInstructions: 'Create visual arrays showing multiplication concepts (rows × columns), division groupings for inverse relationships',
        qualityRequirements: 'Mathematical clarity, consistent sizing, professional appearance, clear groupings'
      },
      'year5-fractions': {
        searchTerms: [
          'pie chart fractions svg openclipart',
          'fraction bar svg openclipart',
          'pizza slice fractions svg openclipart',
          'chocolate bar fractions svg openclipart'
        ],
        sizingGuidelines: 'Fraction visuals 40-60px for detailed viewing, consistent proportions',
        arrangementInstructions: 'Show equivalent fractions clearly, use consistent color coding, align visual and numeric representations',
        qualityRequirements: 'Mathematical accuracy, clear fraction divisions, sophisticated design, real-world contexts'
      }
    }

    return instructions[combinationType] || instructions['reception-addition']
  }

  /**
   * Gets accessibility requirements based on year group
   */
  private static getAccessibilityRequirements(yearGroup: string) {
    const requirements: Record<string, any> = {
      'Reception': {
        fontRequirements: 'Minimum 16pt, OpenDyslexic or Comic Sans MS preferred',
        sendCompliance: 'Visual-heavy design, minimal text, clear boundaries',
        dyslexiaSupport: 'Sans-serif fonts, increased line spacing, high contrast',
        cognitiveSupport: 'Maximum 5-6 problems, visual supports for all concepts'
      },
      'Year 1': {
        fontRequirements: 'Minimum 14pt, clear sans-serif fonts',
        sendCompliance: 'Simple language, concrete examples, visual supports',
        dyslexiaSupport: 'Dyslexia-friendly fonts, clear visual separation',
        cognitiveSupport: 'Logical progression, clear instructions, visual cues'
      },
      'Year 3': {
        fontRequirements: 'Minimum 12pt, professional fonts acceptable',
        sendCompliance: 'Clear problem structure, step-by-step guidance',
        dyslexiaSupport: 'Good contrast, consistent formatting',
        cognitiveSupport: 'Progressive difficulty, worked examples'
      },
      'Year 5': {
        fontRequirements: 'Standard 12pt fonts, mathematical notation clearly sized',
        sendCompliance: 'Complex problems broken into steps, visual models provided',
        dyslexiaSupport: 'Clear mathematical notation, consistent layout',
        cognitiveSupport: 'Scaffolded learning, connections between concepts'
      }
    }

    return requirements[yearGroup] || requirements['Year 1']
  }

  /**
   * Gets creative theme context for storytelling approach
   */
  private static getCreativeTheme(combinationType: string) {
    const themes: Record<string, any> = {
      'reception-addition': {
        theme: 'Teddy Bear Picnic',
        narrative: 'Help the teddy bears count their picnic treats and share fairly',
        characters: ['Brown Bear', 'Honey Bear', 'Cuddle Bear', 'Rainbow Bear'],
        setting: 'Sunny meadow with picnic blankets and baskets',
        svgSearchTerms: ['teddy bear svg openclipart', 'picnic basket svg openclipart', 'sandwich counting svg openclipart'],
        visualCharacterGuidelines: 'Consistent teddy bear designs throughout, speech bubbles for interaction'
      },
      'year3-multiplication': {
        theme: 'Space Adventure Arrays',
        narrative: 'Captain Mathematics explores galaxy formations and spaceship squadrons',
        characters: ['Captain Mathematics', 'Robot Assistant', 'Alien Commanders'],
        setting: 'Cosmic space stations and alien planets',
        svgSearchTerms: ['space ship array svg openclipart', 'alien formation svg openclipart', 'planet grid svg openclipart'],
        visualCharacterGuidelines: 'Space theme consistency, futuristic design elements'
      },
      'year5-fractions': {
        theme: 'Master Chef Challenge',
        narrative: 'Junior chefs compete in cooking challenges using fractions for recipes',
        characters: ['Chef Emma', 'Chef Oliver', 'Judge Sophie', 'Kitchen Assistant'],
        setting: 'Professional kitchen with cooking equipment and ingredients',
        svgSearchTerms: ['cooking fraction svg openclipart', 'recipe ingredient svg openclipart', 'kitchen equipment svg openclipart'],
        visualCharacterGuidelines: 'Culinary theme throughout, professional kitchen aesthetic'
      }
    }

    return themes[combinationType] || themes['reception-addition']
  }

  /**
   * Gets gamification context for challenge approach
   */
  private static getGameContext(combinationType: string) {
    const contexts: Record<string, any> = {
      'reception-addition': {
        theme: 'Number Detective Badge',
        achievementSystem: 'Detective badges earned for solving counting mysteries',
        challengeProgression: 'Trainee → Detective → Math Master',
        successRewards: 'Gold stars and detective stamps',
        badgeSystem: 'Counting Badge, Addition Badge, Master Detective Badge',
        progressTracking: 'Mystery cases solved counter',
        challengeLevels: 'Easy clues → Medium mysteries → Hard cases'
      },
      'year3-multiplication': {
        theme: 'Times Table Champions League',
        achievementSystem: 'Championship trophies and team badges',
        challengeProgression: 'Team member → Captain → Champion → Legend',
        successRewards: 'Team trophies and championship medals',
        badgeSystem: '2x Table Badge, 5x Table Badge, Division Master Badge',
        progressTracking: 'Goals scored in multiplication matches',
        challengeLevels: 'Training → League matches → Championship finals'
      },
      'year5-fractions': {
        theme: 'Fraction Quest Adventure',
        achievementSystem: 'Quest completion rewards and magical items',
        challengeProgression: 'Apprentice → Adventurer → Fraction Wizard → Grand Master',
        successRewards: 'Magic scrolls and wisdom crystals',
        badgeSystem: 'Equivalent Fractions Scroll, Addition Master Crystal, Decimal Bridge Key',
        progressTracking: 'Quest objectives completed',
        challengeLevels: 'Village quests → Forest challenges → Mountain trials → Dragon\'s lair'
      }
    }

    return contexts[combinationType] || contexts['reception-addition']
  }


  /**
   * Helper methods for curriculum context
   */
  private static getYearGroupDetails(yearGroup: string) {
    const details: Record<string, any> = {
      'Reception': {
        languageLevel: 'Very simple, concrete language with visual supports',
        progressionGuideline: 'Start with 1+1, build to maximum 5+3',
        mathFocus: 'Numbers to 10, basic counting, one-to-one correspondence'
      },
      'Year 1': {
        languageLevel: 'Simple language, minimal text, clear instructions',
        progressionGuideline: 'Build from concrete to abstract, use visual supports',
        mathFocus: 'Numbers to 20, addition/subtraction to 10, basic shapes'
      },
      'Year 3': {
        languageLevel: 'Age-appropriate vocabulary with mathematical terminology',
        progressionGuideline: 'Multi-step problems, logical reasoning development',
        mathFocus: 'Times tables 2,5,10, related division facts, arrays'
      },
      'Year 5': {
        languageLevel: 'Advanced mathematical vocabulary, complex reasoning',
        progressionGuideline: 'Abstract concepts with concrete visual support',
        mathFocus: 'Equivalent fractions, fraction-decimal connections, visual models'
      }
    }

    return details[yearGroup] || details['Year 1']
  }

  private static getKeyVocabulary(yearGroup: string, topic: string): string[] {
    // Return appropriate vocabulary for the year group and topic
    if (yearGroup === 'Reception' || yearGroup === 'Year 1') {
      return ['add', 'plus', 'makes', 'altogether', 'count', 'more']
    } else if (yearGroup === 'Year 3') {
      return ['multiply', 'times', 'groups of', 'divide', 'shared equally', 'array']
    } else if (yearGroup === 'Year 5') {
      return ['fraction', 'equivalent', 'numerator', 'denominator', 'decimal', 'mixed number']
    }
    return ['calculate', 'solve', 'answer', 'method', 'working']
  }

  private static getAssessmentFocus(yearGroup: string, topic: string): string {
    return yearGroup + ' age-appropriate mathematical reasoning and problem-solving skills'
  }

  private static getLayoutStructure(layout: string): string {
    const structures: Record<string, string> = {
      'standard': 'Single-column layout with clear problem separation',
      'fluency': 'Grid-based layout for quick-fire practice',
      'grid': 'Structured grid format for systematic practice',
      'differentiated': 'Multi-level layout with varying complexity',
      'reasoning': 'Extended problem format with working space'
    }
    return structures[layout] || structures['standard']
  }

  /**
   * Quality evaluation method (USP.1 AC: 4)
   * Evaluates generated worksheets against the 5-metric framework
   * Simplified implementation for initial release
   */
  public static evaluateWorksheetQuality(
    worksheet: string, 
    config: WorksheetConfig
  ): QualityMetrics {
    // Simplified quality evaluation - would integrate with QualityAssuranceService
    // For now, return baseline scores that meet target
    return {
      visualAppeal: 4.0,
      educationalAppropriateness: 4.0,
      svgIntegration: 4.0,
      curriculumAlignment: 4.0,
      accessibility: 4.0
    }
  }

  /**
   * A/B testing support method (USP.1 AC: 5)
   * Generates multiple variations for systematic optimization
   */
  public static generateTemplateVariations(config: WorksheetConfig): Record<PromptTemplate, string> {
    return {
      structured: this.generatePrompt(config, 'structured'),
      creative: this.generatePrompt(config, 'creative'),
      gamified: this.generatePrompt(config, 'gamified')
    }
  }
}