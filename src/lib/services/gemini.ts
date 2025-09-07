import { GoogleGenerativeAI } from '@google/generative-ai'
import { 
  WorksheetConfig, 
  GeneratedWorksheet, 
  GenerationMetrics
} from '@/lib/types/worksheet'
import { renderLayout, validateLayoutQuestionCount, WorksheetQuestion } from '@/lib/templates/layouts'
import { LAYOUT_TEMPLATES } from '@/lib/data/layouts'
import { validateGeneratedHTML, validateStudentNames } from '@/lib/utils/validation'
import { getTopicDetails } from '@/lib/data/curriculum'
import { PromptService, IterativeImprovementMetadata, PromptVariation } from '@/lib/services/promptService'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not configured')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.5-flash',
  generationConfig: {
    temperature: 0.7, // Balanced creativity vs consistency
    maxOutputTokens: 4096, // Reasonable limit for worksheet content
    topP: 0.8,
    topK: 40
  }
})

/**
 * Generates exceptional math worksheets using unified prompt service
 * Consolidated USP.1 + USP.2 + USP.Integration for iterative quality improvement
 * Features smart defaults, advanced prompt templates, and continuous refinement
 * Target: ≥4.5 quality score through iterative prompt improvement
 */
export async function generateWorksheet(
  config: WorksheetConfig, 
  options: { forceEnhanced?: boolean; iterativeCycle?: number } = {}
): Promise<GeneratedWorksheet> {
  const metrics: GenerationMetrics = {
    startTime: Date.now(),
    endTime: 0,
    duration: 0,
    promptLength: 0,
    responseLength: 0,
    success: false
  }

  let improvementMetadata: IterativeImprovementMetadata | undefined

  try {
    // Validate layout and question count compatibility
    if (!validateLayoutQuestionCount(config.layout, config.questionCount)) {
      const layoutTemplate = LAYOUT_TEMPLATES[config.layout]
      const range = layoutTemplate.questionRange
      throw new Error(`Question count ${config.questionCount} is not suitable for ${layoutTemplate.name} layout (range: ${range?.min}-${range?.max})`)
    }
    
    // Validate student names only if array is not empty (empty arrays use fallback names)
    if (config.studentNames.length > 0) {
      const nameValidation = validateStudentNames(config.studentNames)
      if (!nameValidation.isValid) {
        throw new Error(`Invalid student names: ${nameValidation.errors.map(e => e.message).join(', ')}`)
      }
    }

    // Unified Prompt Service: Consolidated USP.1 + USP.2 + USP.Integration
    // "Configuration → Smart Defaults → Optimal Prompt → Gemini 2.5 Flash → HTML with embedded SVGs"
    console.log('🚀 USING UNIFIED PROMPT SERVICE - Consolidated USP System')
    
    const promptResult = PromptService.generatePrompt(config, options)
    const prompt = promptResult.prompt
    improvementMetadata = promptResult.metadata
    
    console.log('🎨 Unified Prompt Service Generated (first 500 chars):', prompt.substring(0, 500))
    console.log('Unified Prompt Generation:', {
      promptVersion: improvementMetadata.promptVersion,
      qualityScore: improvementMetadata.qualityScore,
      templateVariation: improvementMetadata.templateVariation,
      targetQualityAchieved: improvementMetadata.targetQualityAchieved,
      generationTime: improvementMetadata.generationTime
    })
    
    metrics.promptLength = prompt.length
    
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()
    metrics.responseLength = text.length
    
    // Parse and validate the generated content
    const worksheet = parseGeneratedContent(text, config, improvementMetadata)
    
    // Validate the generated HTML structure
    const htmlValidation = validateGeneratedHTML(worksheet.html)
    if (!htmlValidation.isValid) {
      throw new Error(`Invalid HTML structure: ${htmlValidation.errors.map(e => e.message).join(', ')}`)
    }
    
    // Unified Quality Assurance - evaluate against iterative improvement framework
    const averageScore = improvementMetadata.qualityScore
    const targetScore = 4.5 // Elevated target for iterative improvement
    
    console.log('Quality Metrics (Unified Service):', {
      qualityScore: averageScore,
      targetScore,
      meetsTarget: averageScore >= targetScore,
      unifiedSystem: true,
      iterativeCycle: improvementMetadata.improvementCycle,
      enhancementsApplied: improvementMetadata.enhancementsApplied,
      targetQualityAchieved: improvementMetadata.targetQualityAchieved
    })
    
    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime
    metrics.success = true
    
    // Unified performance logging
    console.log('Worksheet generation metrics (Unified Service):', {
      duration: metrics.duration,
      promptLength: metrics.promptLength,
      responseLength: metrics.responseLength,
      topic: config.topic,
      subtopic: config.subtopic,
      questionCount: config.questionCount,
      systemUsed: 'Unified PromptService',
      qualityTarget: targetScore,
      iterativeCycle: improvementMetadata.improvementCycle
    })
    
    return worksheet
  } catch (error) {
    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime
    metrics.errorType = error instanceof Error ? error.constructor.name : 'UnknownError'
    
    console.error('Error generating worksheet with Gemini AI:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      metrics,
      config: { ...config, studentNames: `[${config.studentNames.length} names]` } // Don't log personal data
    })
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Authentication failed. Please check your API configuration.')
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        throw new Error('Service temporarily unavailable. Please try again in a few moments.')
      } else if (error.message.includes('Invalid')) {
        throw error // Re-throw validation errors as-is
      }
    }
    
    throw new Error('Failed to generate worksheet. Please try again.')
  }
}


/**
 * Creates a sophisticated prompt for generating UK National Curriculum aligned worksheets
 * @deprecated This function has been replaced by PromptEngineeringService.generatePrompt
 */
function createPrompt(config: WorksheetConfig): string {
  const { layout, topic, subtopic, difficulty, questionCount, yearGroup, studentNames } = config
  
  // Get curriculum-specific context with year group
  const curriculumContext = getCurriculumContext(topic, subtopic, yearGroup)
  
  // Get layout-specific context
  const layoutTemplate = LAYOUT_TEMPLATES[layout]
  
  // Create name pool for personalization
  const namePool = studentNames.length > 0 
    ? studentNames 
    : ['Emma', 'Oliver', 'Sophie', 'James', 'Lily', 'Thomas', 'Grace', 'Harry', 'Charlotte', 'William']
  
  const prompt = `You are a UK primary school mathematics teacher creating a professional worksheet that aligns with the UK National Curriculum. 

**CURRICULUM REQUIREMENTS:**
- Topic: ${curriculumContext.topicName}
- Subtopic: ${curriculumContext.subtopicName}
- Year Group: ${curriculumContext.yearGroup}
- Age Group: ${curriculumContext.ageGroup}
- Difficulty Level: ${difficulty}
- Learning Objectives: ${curriculumContext.learningObjectives.join(', ')}
- Mathematical Focus: ${curriculumContext.mathFocus}
- Complexity Level: ${curriculumContext.complexity}

**LAYOUT SPECIFICATIONS:**
- Layout Type: ${layoutTemplate.name} (${layoutTemplate.description})
- Layout Features: ${layoutTemplate.features.join(', ')}
- Suitable for: ${layoutTemplate.suitable.join(', ')}
- Question Count: ${questionCount} (optimized for this layout)

**WORKSHEET SPECIFICATIONS:**
- Generate exactly ${questionCount} questions optimized for ${layoutTemplate.name} layout
- Use UK mathematical terminology and contexts
- Include varied question types appropriate for ${layoutTemplate.name}
- Integrate student names naturally: ${namePool.join(', ')}
- Ensure progressive difficulty within the worksheet
- Follow ${layoutTemplate.name} layout conventions and formatting

**QUALITY STANDARDS:**
- Age-appropriate language and contexts
- UK-specific scenarios (pounds, metres, etc.)
- Avoid cultural bias
- Educational quality with proper mathematical reasoning
- Clear, printable formatting

**OUTPUT FORMAT:**
Return your response as a JSON object containing only the questions array. Each question should be an object with a 'text' property containing the question text. Do NOT include HTML formatting, headers, or styling - just the mathematical questions.

Example format:
[
  {"text": "Emma has 12 apples. She gives 5 to her friend Oliver. How many apples does Emma have left?"},
  {"text": "Calculate: 7 × 8 = ?"},
  {"text": "Sophie buys a book for £4.50 and a pencil for £1.25. How much change does she get from £10?"}
]

Generate exactly ${questionCount} mathematically sound, curriculum-aligned questions that are:
- Appropriate for ${layoutTemplate.name} layout style
- Suitable for ${curriculumContext.yearGroup} students
- Using student names from: ${namePool.join(', ')}
- Following UK National Curriculum for ${curriculumContext.topicName} - ${curriculumContext.subtopicName}
- Progressive in difficulty from ${difficulty} level

Return only the JSON array of questions, no additional text or formatting.`

  return prompt
}

/**
 * Gets year group specific details for curriculum alignment
 */
function getYearGroupDetails(yearGroup: string) {
  const yearGroupMapping: Record<string, {
    ageDescription: string
    ageRange: string
    mathFocus: string
    complexity: string
  }> = {
    'Reception': {
      ageDescription: 'Reception (Ages 4-5)',
      ageRange: '4-5 years',
      mathFocus: 'Numbers to 10, basic counting, simple shapes',
      complexity: 'Very simple language, visual-heavy, concrete examples'
    },
    'Year 1': {
      ageDescription: 'Year 1 (Ages 5-6)',
      ageRange: '5-6 years',
      mathFocus: 'Numbers to 20, addition/subtraction to 10, basic shapes',
      complexity: 'Simple language, concrete examples, minimal text'
    },
    'Year 2': {
      ageDescription: 'Year 2 (Ages 6-7)',
      ageRange: '6-7 years',
      mathFocus: 'Numbers to 100, times tables 2/5/10, money, measurement',
      complexity: 'Basic word problems, simple reasoning, clear instructions'
    },
    'Year 3': {
      ageDescription: 'Year 3 (Ages 7-8)',
      ageRange: '7-8 years',
      mathFocus: 'Numbers to 1000, multiplication/division, fractions (halves, quarters)',
      complexity: 'Multi-step problems, logical reasoning, varied question types'
    },
    'Year 4': {
      ageDescription: 'Year 4 (Ages 8-9)',
      ageRange: '8-9 years',
      mathFocus: 'Numbers to 10,000, times tables to 12x12, decimal tenths',
      complexity: 'Complex word problems, multiple operations, problem-solving strategies'
    },
    'Year 5': {
      ageDescription: 'Year 5 (Ages 9-10)',
      ageRange: '9-10 years',
      mathFocus: 'Large numbers, fractions/decimals, percentages, area/perimeter',
      complexity: 'Advanced reasoning, multi-step calculations, real-world contexts'
    },
    'Year 6': {
      ageDescription: 'Year 6 (Ages 10-11)',
      ageRange: '10-11 years',
      mathFocus: 'All four operations, advanced fractions, algebra basics, ratio',
      complexity: 'SATs preparation level, complex reasoning, independent problem-solving'
    }
  }
  
  return yearGroupMapping[yearGroup] || {
    ageDescription: 'Primary School',
    ageRange: '5-11 years',
    mathFocus: 'General mathematics',
    complexity: 'Age-appropriate content'
  }
}

/**
 * Gets curriculum-specific context for prompt generation with year group specificity
 * Now uses centralized curriculum data for consistency
 */
function getCurriculumContext(topic: string, subtopic: string, yearGroup: string) {
  const yearDetails = getYearGroupDetails(yearGroup)
  const topicDetails = getTopicDetails(yearGroup, topic)
  
  // Find the specific subtopic in the topic's subtopics array
  const subtopicData = topicDetails?.subtopics.find(sub => sub.value === subtopic)
  
  return {
    topicName: topicDetails?.label || 'Mathematics',
    subtopicName: subtopicData?.label || 'Problem Solving',
    ageGroup: yearDetails.ageDescription,
    learningObjectives: topicDetails?.learningObjectives || ['Solve mathematical problems', 'Show working clearly'],
    yearGroup: yearGroup,
    complexity: yearDetails.complexity,
    mathFocus: yearDetails.mathFocus
  }
}

/**
 * Parses the generated content from Gemini AI and renders using layout templates
 * Enhanced for USP.Integration: USP.1 + USP.2 integrated system with metadata tracking
 */
function parseGeneratedContent(content: string, config: WorksheetConfig, improvementMetadata?: IterativeImprovementMetadata): GeneratedWorksheet {
  // Unified Prompt Service: Handle complete HTML worksheets with embedded SVGs
  console.log('🚀 Processing Unified Service HTML+SVG content...')
  
  // Clean the content
  let cleanContent = content.trim()
  
  // Clean various formats that LLM might return
  if (cleanContent.startsWith('```html') && cleanContent.endsWith('```')) {
    cleanContent = cleanContent.slice(7, -3).trim()
  } else if (cleanContent.startsWith('```json') && cleanContent.endsWith('```')) {
    cleanContent = cleanContent.slice(7, -3).trim()
  } else if (cleanContent.startsWith('```') && cleanContent.endsWith('```')) {
    cleanContent = cleanContent.slice(3, -3).trim()
  } else if (cleanContent.startsWith('json\n')) {
    // Handle case where LLM prefixes with "json"
    cleanContent = cleanContent.slice(5).trim()
  } else if (cleanContent.startsWith('html\n')) {
    // Handle case where LLM prefixes with "html"
    cleanContent = cleanContent.slice(5).trim()
  }
  
  // Check if we received HTML from the LLM (USP.1 LLM-Native format)
  if (cleanContent.includes('<!DOCTYPE html>') || cleanContent.includes('<html')) {
    console.log('✅ Received complete HTML worksheet from LLM - USP.1 LLM-Native Architecture')
    
    // Validate basic HTML structure
    if (!cleanContent.includes('<head>') || !cleanContent.includes('<body>')) {
      throw new Error('Generated HTML is missing required structure (head/body)')
    }
    
    // Extract questions count for validation (count number of .question divs)
    const questionMatches = cleanContent.match(/class="question[^"]*"/g)
    const questionCount = questionMatches ? questionMatches.length : 0
    
    console.log(`📊 HTML Questions Generated: ${questionCount} (expected: ${config.questionCount})`)
    
    // Return the complete HTML as-is (USP.1 LLM-Native)
    return {
      questions: [], // Questions are embedded in HTML
      html: cleanContent,
      metadata: {
        generatedAt: new Date().toISOString(),
        questionCount: questionCount,
        expectedQuestionCount: config.questionCount,
        systemUsed: 'USP.1 LLM-Native',
        improvementMetadata,
        format: 'HTML+SVG'
      }
    }
  }
  
  // If we reach here, the content is not in the expected HTML+SVG format
  throw new Error('Generated content must be in HTML format with embedded SVGs. Please try again.')
}

/**
 * Helper function to identify Phase 1 combinations for USP.1
 */
function isPhase1Combination(config: WorksheetConfig): boolean {
  const { yearGroup, topic } = config

  // Reception/Year 1 addition with counting objects
  if ((yearGroup === 'Reception' || yearGroup === 'Year 1') && 
      topic.toLowerCase().includes('addition')) {
    return true
  }

  // Year 3 multiplication/division
  if (yearGroup === 'Year 3' && 
      (topic.toLowerCase().includes('multiplication') || topic.toLowerCase().includes('division'))) {
    return true
  }

  // Year 5 fractions with visual representations
  if (yearGroup === 'Year 5' && topic.toLowerCase().includes('fraction')) {
    return true
  }

  return false
}

/**
 * Calculates weighted average quality score for USP.1 metrics
 * Visual Appeal (25%), Educational Appropriateness (25%), SVG Integration (20%), 
 * Curriculum Alignment (15%), Accessibility (15%)
 */
function calculateAverageQualityScore(metrics: QualityMetrics): number {
  const weights = {
    visualAppeal: 0.25,
    educationalAppropriateness: 0.25,
    svgIntegration: 0.20,
    curriculumAlignment: 0.15,
    accessibility: 0.15
  }

  return (
    metrics.visualAppeal * weights.visualAppeal +
    metrics.educationalAppropriateness * weights.educationalAppropriateness +
    metrics.svgIntegration * weights.svgIntegration +
    metrics.curriculumAlignment * weights.curriculumAlignment +
    metrics.accessibility * weights.accessibility
  )
}

/**
 * Enhanced worksheet generation function with A/B testing support
 * Supports USP.1 Template A, B, C variations for systematic optimization
 */
export async function generateWorksheetWithABTesting(
  config: WorksheetConfig
): Promise<Record<PromptTemplate, GeneratedWorksheet>> {
  const templates: PromptTemplate[] = ['structured', 'creative', 'gamified']
  const results: Record<string, GeneratedWorksheet> = {}

  for (const template of templates) {
    try {
      console.log(`Generating worksheet with ${template} template...`)
      results[template] = await generateWorksheet(config, template)
    } catch (error) {
      console.error(`Failed to generate ${template} template:`, error)
      // Continue with other templates even if one fails
    }
  }

  return results as Record<PromptTemplate, GeneratedWorksheet>
}