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
import { APIError, ValidationError as AppValidationError, GenerationError, standardizeError, logError } from '@/lib/utils/errorHandling'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not configured')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  // Temporarily disable function calling to test basic HTML generation
  // tools: [{
  //   functionDeclarations: [{
  //     name: "searchPixabayImages",
  //     description: "Search for professional educational images on Pixabay API to enhance worksheet visual quality",
  //     parameters: {
  //       type: "object",
  //       properties: {
  //         query: {
  //           type: "string",
  //           description: "Search terms for images (e.g., 'red flowers', 'children books', 'cute animals', 'healthy food')"
  //         },
  //         category: {
  //           type: "string",
  //           description: "Image category: education, animals, food, nature, sports, science, business",
  //           enum: ["education", "animals", "food", "nature", "sports", "science", "business", "backgrounds"]
  //         },
  //         imageType: {
  //           type: "string",
  //           description: "Type of image needed",
  //           enum: ["photo", "illustration", "vector"]
  //         },
  //         count: {
  //           type: "number",
  //           description: "Number of images needed (1-5)",
  //           minimum: 1,
  //           maximum: 5
  //         }
  //       },
  //       required: ["query", "count"]
  //     }
  //   }]
  // }],
  systemInstruction: {
    role: "system",
    parts: [{
      text: `You are a UK National Curriculum worksheet generator. Your ONLY task is to generate complete HTML worksheets.

CRITICAL FORMAT REQUIREMENTS:
- Your response MUST start with: <!DOCTYPE html>
- Your response MUST end with: </html>
- NO explanatory text before or after HTML
- NO markdown code blocks or backticks
- NO conversational responses
- NO "Here is..." or "I've created..." prefixes
- NO "Hope this helps!" or similar suffixes

FORBIDDEN: Any response that doesn't start with <!DOCTYPE html> will cause system failure.

You generate only pure HTML content - nothing else.`
    }]
  },
  generationConfig: {
    temperature: 0.7, // Balanced creativity vs consistency
    maxOutputTokens: 4096, // Optimized for worksheet content (~2000-3000 tokens typical)
    topP: 0.9, // Optimized for better token selection
    topK: 40
  }
})

/**
 * Generates exceptional math worksheets using unified prompt service
 * Consolidated USP.1 + USP.2 + USP.Integration for iterative quality improvement
 * Features smart defaults, advanced prompt templates, and continuous refinement
 * Target: ≥4.5 quality score through iterative prompt improvement
 */
/**
 * Handle Pixabay API search function calls
 */
async function handlePixabaySearch(args: any): Promise<any> {
  const { query, category = 'education', imageType = 'illustration', count = 1 } = args

  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&category=${category}&image_type=${imageType}&per_page=${count}&safesearch=true&min_width=400`
    )

    if (!response.ok) {
      throw new Error(`Pixabay API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      images: data.hits.map((hit: any) => ({
        id: hit.id,
        webURL: hit.webformatURL,      // 640px width - perfect for worksheets
        largeURL: hit.largeImageURL,   // 1280px width - high quality
        previewURL: hit.previewURL,    // 150px - thumbnails
        tags: hit.tags,
        width: hit.webformatWidth,
        height: hit.webformatHeight,
        alt: `${query} - ${hit.tags.split(',').slice(0, 3).join(', ')}`
      }))
    }
  } catch (error) {
    console.error('Pixabay search error:', error)
    return {
      images: [],
      error: `Failed to search for "${query}": ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Call Gemini API with function calling support and retry logic
 */
async function callGeminiWithRetry(prompt: string, metrics: GenerationMetrics, maxRetries: number = 3): Promise<string> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt)
      const response = result.response

      if (!response) {
        throw new APIError('Empty response from Gemini API', true)
      }

      return response.text()
    } catch (error) {
      lastError = error as Error

      // Determine if error is retryable
      const isRetryableError = (
        error instanceof Error && (
          error.message.includes('503') || // Service unavailable
          error.message.includes('502') || // Bad gateway
          error.message.includes('504') || // Gateway timeout
          error.message.includes('timeout') ||
          error.message.includes('network') ||
          error.message.includes('ECONNRESET') ||
          error.message.includes('ENOTFOUND')
        )
      )

      if (!isRetryableError || attempt === maxRetries) {
        break
      }

      // Exponential backoff: wait 2^attempt seconds
      const delayMs = Math.pow(2, attempt) * 1000
      const standardError = standardizeError(error, 'API request failed')
      logError(standardError, { attempt, maxRetries, retryDelayMs: delayMs })

      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }

  // All retries exhausted
  if (lastError) {
    throw new APIError(`Failed after ${maxRetries} attempts: ${lastError.message}`, false, {
      attempts: maxRetries,
      lastError: lastError.message
    })
  }

  throw new APIError('Unknown API error occurred', false)
}

export async function generateWorksheet(
  config: WorksheetConfig,
  options: {
    forceEnhanced?: boolean;
    iterativeCycle?: number;
    previousWorksheets?: Array<{ questions: string[]; images: string[] }>
  } = {}
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
    if (!validateLayoutQuestionCount(config.layout, config.questionCount, { topic: config.topic, subtopic: config.subtopic })) {
      const layoutTemplate = LAYOUT_TEMPLATES[config.layout]
      const range = layoutTemplate.questionRange
      throw new AppValidationError(
        `Question count ${config.questionCount} is not suitable for ${layoutTemplate.name} layout (range: ${range?.min}-${range?.max})`,
        { layout: config.layout, questionCount: config.questionCount, range }
      )
    }
    
    // Validate student names only if array is not empty (empty arrays use fallback names)
    if (config.studentNames.length > 0) {
      const nameValidation = validateStudentNames(config.studentNames)
      if (!nameValidation.isValid) {
        throw new AppValidationError(
          `Invalid student names: ${nameValidation.errors.map(e => e.message).join(', ')}`,
          { errors: nameValidation.errors }
        )
      }
    }

    // Special case: Grid layout with three-digit calculations uses direct template
    if (config.layout === 'grid' && 
        config.topic === 'addition-subtraction' && 
        config.subtopic === 'three-digit-numbers') {
      
      // Generate dummy questions for template rendering
      const questions: WorksheetQuestion[] = Array.from({length: config.questionCount}, (_, i) => ({
        text: `Question ${i + 1}` // Template will generate actual problems
      }))
      
      const renderContext = {
        title: `Year 3 Maths: Three-Digit Addition`,
        content: '',
        difficulty: config.difficulty,
        yearGroup: config.yearGroup,
        topic: config.topic,
        subtopic: config.subtopic,
        questionCount: config.questionCount,
        generatedAt: new Date().toISOString()
      }
      
      // Use direct template rendering instead of LLM
      const html = renderLayout(config.layout, questions, renderContext)
      
      metrics.promptLength = 0 // No LLM prompt needed
      metrics.responseLength = html.length
      
      const worksheet: GeneratedWorksheet = {
        title: renderContext.title,
        html,
        metadata: {
          topic: config.topic,
          subtopic: config.subtopic,
          difficulty: config.difficulty,
          questionCount: config.questionCount,
          curriculum: 'UK National Curriculum',
          generatedAt: renderContext.generatedAt,
          promptTemplate: 'direct-template',
          qualityScore: 5.0,
          isPhase1Combination: false
        }
      }
      
      metrics.endTime = Date.now()
      metrics.duration = metrics.endTime - metrics.startTime
      metrics.success = true
      
      return worksheet
    }
    
    // Unified Prompt Service: Consolidated USP.1 + USP.2 + USP.Integration
    // "Configuration → Smart Defaults → Optimal Prompt → Gemini 2.5 Flash → HTML with embedded SVGs"
    
    const promptResult = await PromptService.generatePrompt(config, options)
    const prompt = promptResult.prompt
    improvementMetadata = promptResult.metadata
    
    metrics.promptLength = prompt.length
    
    // Enhanced API call with retry logic and proper error handling
    const text = await callGeminiWithRetry(prompt, metrics)
    metrics.responseLength = text.length
    
    // Parse and validate the generated content
    const worksheet = parseGeneratedContent(text, config, improvementMetadata)
    
    // Validate the generated HTML structure
    const htmlValidation = validateGeneratedHTML(worksheet.html)
    if (!htmlValidation.isValid) {
      throw new GenerationError(
        `Invalid HTML structure: ${htmlValidation.errors.map(e => e.message).join(', ')}`,
        false,
        { htmlErrors: htmlValidation.errors }
      )
    }
    
    // Unified Quality Assurance - evaluate against iterative improvement framework
    const averageScore = improvementMetadata.qualityScore
    const targetScore = 4.5 // Elevated target for iterative improvement
    
    // Quality metrics tracking (removed console.log for production)
    
    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime
    metrics.success = true
    
    // Performance metrics tracking (removed console.log for production)
    // Metrics available in the metrics object for monitoring systems
    
    return worksheet
  } catch (error) {
    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime
    metrics.errorType = error instanceof Error ? error.constructor.name : 'UnknownError'
    
    // Standardize and log the error
    const standardError = standardizeError(error, 'Failed to generate worksheet')
    logError(standardError, {
      metrics,
      config: { 
        ...config, 
        studentNames: `[${config.studentNames.length} names]` // Don't log personal data
      }
    })
    
    // Re-throw standardized errors or create new ones
    if (error instanceof AppValidationError || error instanceof APIError || error instanceof GenerationError) {
      throw error
    }
    
    // Convert unknown errors to GenerationError
    throw new GenerationError(
      `Worksheet generation failed: ${standardError.message}`,
      standardError.isRetryable,
      { originalError: standardError }
    )
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
  // Processing Unified Service HTML+SVG content
  
  // Clean the content
  let cleanContent = content.trim()
  
  // Enhanced cleaning for various LLM output formats
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

  // Handle additional edge cases
  const codeBlockPatterns = [
    /^```[\w]*\n([\s\S]*?)```$/,  // Any code block
    /^\s*html\s*\n([\s\S]*)$/i,   // HTML prefix
    /^\s*<!DOCTYPE[\s\S]*$/i      // Standalone DOCTYPE detection
  ]

  for (const pattern of codeBlockPatterns) {
    const match = cleanContent.match(pattern)
    if (match) {
      cleanContent = match[1] ? match[1].trim() : cleanContent
      break
    }
  }

  // Remove language identifiers that LLMs sometimes add
  const languageIdentifiers = ['html', 'HTML', 'xml', 'XML']
  for (const identifier of languageIdentifiers) {
    if (cleanContent.startsWith(identifier + '\n')) {
      cleanContent = cleanContent.slice(identifier.length + 1).trim()
      break
    }
  }

  // Handle common prefixes that LLMs sometimes add (expanded list)
  const commonPrefixes = [
    'Here is the worksheet:',
    'Here is your worksheet:',
    'Here\'s the worksheet:',
    'Here\'s your worksheet:',
    'Below is the worksheet:',
    'The worksheet is:',
    'I\'ve created a worksheet:',
    'I\'ve generated a worksheet:',
    'Here\'s the HTML worksheet:',
    'Here is the HTML:',
    'Here\'s the complete worksheet:',
    'The complete worksheet is:',
    'Here is the complete HTML:',
    'I\'ll create a worksheet for you:',
    'Based on your requirements:',
    'Here\'s what I created:',
    'The worksheet you requested:',
    'Your worksheet is ready:',
    'I\'ve prepared the following:'
  ]

  for (const prefix of commonPrefixes) {
    if (cleanContent.toLowerCase().startsWith(prefix.toLowerCase())) {
      cleanContent = cleanContent.slice(prefix.length).trim()
      break
    }
  }

  // Handle common suffixes that LLMs sometimes add (expanded list)
  const commonSuffixes = [
    'I hope this helps!',
    'Hope this helps!',
    'Let me know if you need any adjustments.',
    'Feel free to modify as needed.',
    'This worksheet should meet your requirements.',
    'Let me know if you need any changes.',
    'I hope this meets your needs!',
    'Please let me know if you need modifications.',
    'This should work well for your students.',
    'Feel free to adjust as needed.',
    'Hope this works for your class!',
    'Let me know if you want any changes.',
    'This worksheet is now ready for use.',
    'The worksheet is complete.',
    'I\'ve completed your worksheet.',
    'Your worksheet is ready!'
  ]

  for (const suffix of commonSuffixes) {
    if (cleanContent.toLowerCase().endsWith(suffix.toLowerCase())) {
      cleanContent = cleanContent.slice(0, -suffix.length).trim()
      break
    }
  }
  
  // Enhanced debugging: Log more content details
  console.log('Content cleaning completed. Length:', cleanContent.length)
  console.log('Content start (300 chars):', cleanContent.substring(0, 300))
  console.log('Content end (200 chars):', cleanContent.substring(Math.max(0, cleanContent.length - 200)))

  // Additional cleaning: Remove extra whitespace and normalize line endings
  cleanContent = cleanContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
  cleanContent = cleanContent.replace(/^\n+/, '').replace(/\n+$/, '')

  // Enhanced HTML detection with better pattern matching
  const htmlIndicators = {
    doctype: /<!doctype\s+html[^>]*>/i.test(cleanContent),
    htmlTag: /<html[^>]*>/i.test(cleanContent),
    htmlClose: /<\/html>/i.test(cleanContent),
    headAndBody: cleanContent.includes('<head>') && cleanContent.includes('<body>'),
    titleAndDiv: cleanContent.includes('<title>') && cleanContent.includes('<div'),
    styleAndDiv: cleanContent.includes('<style>') && cleanContent.includes('<div'),
    worksheetPattern: cleanContent.includes('<div class="worksheet') && cleanContent.includes('<span class="question-number">'),
    basicStructure: cleanContent.includes('<div') && cleanContent.includes('</')
  }

  console.log('HTML detection indicators:', htmlIndicators)

  const isLikelyHTML = (
    htmlIndicators.doctype ||
    htmlIndicators.htmlTag ||
    htmlIndicators.htmlClose ||
    htmlIndicators.headAndBody ||
    htmlIndicators.titleAndDiv ||
    htmlIndicators.styleAndDiv ||
    htmlIndicators.worksheetPattern ||
    htmlIndicators.basicStructure
  )

  if (isLikelyHTML) {
    // Received complete HTML worksheet from LLM - USP.1 LLM-Native Architecture
    
    // Validate basic HTML structure - more lenient validation
    const hasMinimalStructure = (
      cleanContent.includes('<head>') ||
      cleanContent.includes('<title>') ||
      cleanContent.includes('<style>') ||
      cleanContent.includes('<div class="worksheet')
    ) && (
      cleanContent.includes('<body>') ||
      cleanContent.includes('<div') || // Might be fragment HTML
      cleanContent.includes('<span class="question-number">')
    )

    if (!hasMinimalStructure) {
      console.warn('Generated HTML may be missing standard structure, but attempting to proceed')
      // Don't throw error - let it continue and see if questions can be found
    }
    
    // Extract questions count for validation (count actual question containers)
    // Look for multiple possible question indicators (more flexible matching)
    let questionCount = 0
    
    // Try multiple patterns to detect questions
    const questionNumberMatches = cleanContent.match(/<span class="question-number">\d+\.<\/span>/g)
    console.log('🔍 Question detection - question-number spans:', questionNumberMatches ? questionNumberMatches.length : 0)
    
    if (questionNumberMatches) {
      questionCount = questionNumberMatches.length
    } else {
      // Fallback: Look for answer lines/spaces which indicate questions
      const answerMatches = cleanContent.match(/<div class="answer-(line|space)">/g)
      console.log('🔍 Question detection - answer divs:', answerMatches ? answerMatches.length : 0)
      
      if (answerMatches) {
        questionCount = answerMatches.length
      } else {
        // Fallback: Look for question-container divs
        const containerMatches = cleanContent.match(/<div class="question(-container)?"/g)
        console.log('🔍 Question detection - question containers:', containerMatches ? containerMatches.length : 0)
        
        if (containerMatches) {
          questionCount = containerMatches.length
        } else {
          // Last resort: Look for paragraph tags that likely contain questions
          const paragraphMatches = cleanContent.match(/<p[^>]*class="question/g)
          console.log('🔍 Question detection - question paragraphs:', paragraphMatches ? paragraphMatches.length : 0)
          
          if (paragraphMatches) {
            questionCount = paragraphMatches.length
          }
        }
      }
    }

    console.log(`✅ Question detection: Found ${questionCount} questions using flexible matching`)

    // Flexible question count validation with retry logic
    if (questionCount !== config.questionCount) {
      // If we have 3+ questions, accept the worksheet
      if (questionCount >= 3) {
        console.warn(`Generated worksheet has ${questionCount} questions but ${config.questionCount} were requested. Accepting partial worksheet with ${questionCount} questions.`)
      } else if (questionCount > 0) {
        // If we have some questions but less than 3, make it retryable but include partial worksheet data
        const partialWorksheetData = {
          title: `${config.yearGroup} ${config.topic} - ${config.subtopic} (${config.difficulty})`,
          html: cleanContent,
          metadata: {
            topic: config.topic,
            subtopic: config.subtopic,
            difficulty: config.difficulty,
            questionCount: questionCount,
            curriculum: 'UK National Curriculum',
            generatedAt: new Date().toISOString(),
            promptTemplate: improvementMetadata?.templateVariation || 'unified-optimal',
            qualityScore: improvementMetadata?.qualityScore || 4.2,
            isPhase1Combination: improvementMetadata?.targetQualityAchieved || false,
            isPartialWorksheet: true
          }
        }

        throw new GenerationError(
          `Generated worksheet has ${questionCount} questions but ${config.questionCount} were requested. Need at least 3 questions for a useful worksheet.`,
          true, // Retryable - will attempt one more time
          {
            generatedCount: questionCount,
            expectedCount: config.questionCount,
            configuredSubject: `${config.yearGroup} ${config.topic} - ${config.subtopic}`,
            minAcceptableQuestions: 3,
            partialWorksheet: partialWorksheetData
          }
        )
      } else {
        // No questions found at all
        throw new GenerationError(
          `Generated worksheet has no questions. Unable to create worksheet.`,
          true, // Retryable
          {
            generatedCount: 0,
            expectedCount: config.questionCount,
            configuredSubject: `${config.yearGroup} ${config.topic} - ${config.subtopic}`
          }
        )
      }
    }
    
    // Return the complete HTML as-is (USP.1 LLM-Native)
    return {
      title: `${config.yearGroup} ${config.topic} - ${config.subtopic} (${config.difficulty})`,
      html: cleanContent,
      metadata: {
        topic: config.topic,
        subtopic: config.subtopic,
        difficulty: config.difficulty,
        questionCount: questionCount,
        curriculum: 'UK National Curriculum',
        generatedAt: new Date().toISOString(),
        promptTemplate: improvementMetadata?.templateVariation || 'unified-optimal',
        qualityScore: improvementMetadata?.qualityScore || 4.2,
        isPhase1Combination: improvementMetadata?.targetQualityAchieved || false
      }
    }
  }
  
  // If we reach here, the content is not in the expected HTML+SVG format
  console.error('Unexpected content format. Content preview:', cleanContent.substring(0, 500))

  // Check if it looks like JSON or other formats
  if (cleanContent.startsWith('{') || cleanContent.startsWith('[')) {
    throw new Error('LLM generated JSON instead of HTML. The prompt may need adjustment for HTML worksheet generation.')
  }

  if (cleanContent.includes('I cannot') || cleanContent.includes('I apologize')) {
    throw new Error('LLM refused to generate worksheet content. Please try again with different configuration.')
  }

  // Enhanced error logging with comprehensive content analysis
  const contentPreview = cleanContent.substring(0, 500) // Increased from 200 to 500 chars
  const lines = cleanContent.split('\n')
  const errorDetails = {
    contentLength: cleanContent.length,
    lineCount: lines.length,
    startsWithHtml: cleanContent.toLowerCase().includes('<!doctype') || cleanContent.toLowerCase().includes('<html'),
    containsHtmlTags: cleanContent.includes('<') && cleanContent.includes('>'),
    firstLine: lines[0],
    firstFiveLines: lines.slice(0, 5),
    lastThreeLines: lines.slice(-3),
    contentPreview,
    htmlIndicators: htmlIndicators,
    possibleIssues: {
      startsWithJson: cleanContent.startsWith('{') || cleanContent.startsWith('['),
      startsWithMarkdown: cleanContent.startsWith('#') || cleanContent.startsWith('**'),
      containsRefusal: cleanContent.includes('I cannot') || cleanContent.includes('I apologize'),
      hasCodeBlocks: cleanContent.includes('```'),
      hasExplanations: cleanContent.includes('Here is') || cleanContent.includes('I\'ve created')
    }
  }

  console.error('HTML parsing failed. Comprehensive analysis:', JSON.stringify(errorDetails, null, 2))

  // Log full content if reasonably sized for debugging
  if (cleanContent.length < 2000) {
    console.error('Full content for debugging:', cleanContent)
  } else {
    console.error('Content too large for full logging. First 1000 chars:', cleanContent.substring(0, 1000))
    console.error('Last 500 chars:', cleanContent.substring(cleanContent.length - 500))
  }

  throw new GenerationError(
    `Generated content is not in HTML format. Content starts with: "${contentPreview}..."`,
    true, // Make this retryable since LLM output can be inconsistent
    {
      contentType: 'non-html',
      contentLength: cleanContent.length,
      startsWithHtml: errorDetails.startsWithHtml,
      containsHtmlTags: errorDetails.containsHtmlTags,
      firstLine: errorDetails.firstLine
    }
  )
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
 * 
 * NOTE: Currently unused - commented out to fix TypeScript compilation
 */
// function calculateAverageQualityScore(metrics: QualityMetrics): number {
//   const weights = {
//     visualAppeal: 0.25,
//     educationalAppropriateness: 0.25,
//     svgIntegration: 0.20,
//     curriculumAlignment: 0.15,
//     accessibility: 0.15
//   }

//   return (
//     metrics.visualAppeal * weights.visualAppeal +
//     metrics.educationalAppropriateness * weights.educationalAppropriateness +
//     metrics.svgIntegration * weights.svgIntegration +
//     metrics.curriculumAlignment * weights.curriculumAlignment +
//     metrics.accessibility * weights.accessibility
//   )
// }

/**
 * Enhanced worksheet generation function with A/B testing support
 * Supports USP.1 Template A, B, C variations for systematic optimization
 */

/**
 * DUAL-LLM ARCHITECTURE: Generate questions only (without answers)
 * This reduces output token count and speeds up generation
 * Used in progressive rendering workflow
 */
export async function generateWorksheetQuestionsOnly(
  config: WorksheetConfig,
  options: {
    forceEnhanced?: boolean;
    iterativeCycle?: number;
  } = {}
): Promise<{ html: string; metadata: any; questionsData: any }> {
  const metrics: GenerationMetrics = {
    startTime: Date.now(),
    endTime: 0,
    duration: 0,
    promptLength: 0,
    responseLength: 0,
    success: false
  }

  try {
    // Generate prompt for questions only
    const promptResult = await PromptService.generatePrompt(config, options)
    let prompt = promptResult.prompt

    // Modify prompt to ONLY generate questions (no answer key)
    prompt += `\n\nIMPORTANT: Generate the complete worksheet HTML with questions, BUT DO NOT include the answer key section. We will add answers separately.`

    metrics.promptLength = prompt.length

    // Call Gemini API
    const text = await callGeminiWithRetry(prompt, metrics)
    metrics.responseLength = text.length

    // Parse content
    const worksheet = parseGeneratedContent(text, config, promptResult.metadata)

    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime
    metrics.success = true

    console.log(`✅ Questions generated in ${(metrics.duration / 1000).toFixed(2)}s (no answers)`)

    return {
      html: worksheet.html,
      metadata: worksheet.metadata,
      questionsData: {
        count: config.questionCount,
        duration: metrics.duration
      }
    }
  } catch (error) {
    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime

    console.error('❌ Questions-only generation failed:', error)
    throw error
  }
}

/**
 * DUAL-LLM ARCHITECTURE: Generate answers only (based on questions)
 * Small, focused LLM call that's very fast (~3-5s)
 * Matches answers to the questions from first call
 */
export async function generateWorksheetAnswersOnly(
  config: WorksheetConfig,
  questionsHtml: string
): Promise<string> {
  const metrics: GenerationMetrics = {
    startTime: Date.now(),
    endTime: 0,
    duration: 0,
    promptLength: 0,
    responseLength: 0,
    success: false
  }

  try {
    // Extract questions from HTML for context
    const questionMatches = questionsHtml.match(/<div class="question"[\s\S]*?<\/div>/g) || []
    const questionCount = questionMatches.length

    // Create focused prompt for answer generation
    const prompt = `Generate ONLY the answer key section for a ${config.yearGroup} ${config.topic} worksheet.

Configuration:
- Year Group: ${config.yearGroup}
- Topic: ${config.topic}
- Subtopic: ${config.subtopic}
- Question Count: ${questionCount}

Questions HTML:
${questionMatches.slice(0, 3).join('\n')}
${questionCount > 3 ? `... (${questionCount - 3} more questions)` : ''}

Generate ONLY this HTML structure (nothing else):

<div class="answer-key">
    <h2 class="answer-key-title">Answer Key</h2>
    <div class="answer-key-content">
        <p><strong>1.</strong> [answer for question 1]</p>
        <p><strong>2.</strong> [answer for question 2]</p>
        ... (${questionCount} total answers)
    </div>
</div>

CRITICAL: Output ONLY the answer-key div above. No explanatory text, no other HTML.`

    metrics.promptLength = prompt.length

    // Call Gemini API (much smaller/faster call)
    const text = await callGeminiWithRetry(prompt, metrics)
    metrics.responseLength = text.length

    // Clean the response
    let answerKeyHtml = text.trim()

    // Remove code blocks if present
    if (answerKeyHtml.startsWith('```html')) {
      answerKeyHtml = answerKeyHtml.slice(7, -3).trim()
    } else if (answerKeyHtml.startsWith('```')) {
      answerKeyHtml = answerKeyHtml.slice(3, -3).trim()
    }

    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime
    metrics.success = true

    console.log(`✅ Answers generated in ${(metrics.duration / 1000).toFixed(2)}s`)

    return answerKeyHtml
  } catch (error) {
    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime

    console.error('❌ Answers-only generation failed:', error)
    throw error
  }
}

/**
 * PROGRESSIVE GENERATION: Wrapper function that uses dual-LLM for better UX
 * Generates questions first, then answers, allowing progressive display
 */
export async function generateWorksheetProgressive(
  config: WorksheetConfig,
  options: {
    forceEnhanced?: boolean;
    iterativeCycle?: number;
    onQuestionsReady?: (questionsHtml: string) => void;
  } = {}
): Promise<GeneratedWorksheet> {
  console.log('🚀 Progressive generation started...')
  const overallStart = Date.now()

  try {
    // Step 1: Generate questions (~20-22s)
    console.log('📝 Step 1: Generating questions...')
    const questionsResult = await generateWorksheetQuestionsOnly(config, options)

    // Notify caller that questions are ready
    if (options.onQuestionsReady) {
      options.onQuestionsReady(questionsResult.html)
    }

    // Step 2: Generate answers (~3-5s)
    console.log('✅ Step 2: Generating answers...')
    const answersHtml = await generateWorksheetAnswersOnly(config, questionsResult.html)

    // Step 3: Merge questions + answers
    console.log('🔄 Step 3: Merging worksheet...')
    const completeHtml = questionsResult.html.replace('</body>', `${answersHtml}\n</body>`)

    const overallDuration = (Date.now() - overallStart) / 1000

    console.log(`✨ Progressive generation complete in ${overallDuration.toFixed(2)}s`)
    console.log(`   - Questions: ${(questionsResult.questionsData.duration / 1000).toFixed(2)}s`)
    console.log(`   - Answers: ~3-5s`)
    console.log(`   - Total: ${overallDuration.toFixed(2)}s`)

    return {
      title: `${config.yearGroup} ${config.topic} - ${config.subtopic} (${config.difficulty})`,
      html: completeHtml,
      metadata: {
        ...questionsResult.metadata,
        generationMethod: 'progressive-dual-llm',
        questionsTime: questionsResult.questionsData.duration,
        totalTime: Date.now() - overallStart
      }
    }

  } catch (error) {
    console.error('❌ Progressive generation failed, falling back to single call')
    // Fallback to standard single-call generation
    return generateWorksheet(config, options)
  }
}

/**
 * SIMPLE CACHING: Store base template cache ID (in-memory, resets on restart)
 * Cache the HTML/CSS template that NEVER changes across all worksheets
 */
let baseTemplateCacheName: string | null = null

/**
 * Get or create the base template cache
 * This caches the static HTML/CSS template (1,800 tokens) that's identical for ALL worksheets
 * Saves 1-2s generation time + 90% cost on cached tokens
 */
async function getBaseTemplateCache(): Promise<string | null> {
  try {
    // If already cached, return it
    if (baseTemplateCacheName) {
      console.log('✅ Using existing base template cache:', baseTemplateCacheName)
      return baseTemplateCacheName
    }

    // Load base template (one-time)
    const fs = require('fs')
    const path = require('path')
    const templatePath = path.join(
      process.cwd(),
      'src/lib/prompts/shared/base-worksheet-template.md'
    )

    // Check if file exists
    if (!fs.existsSync(templatePath)) {
      console.warn('⚠️ Base template not found, skipping cache')
      return null
    }

    const baseTemplate = fs.readFileSync(templatePath, 'utf-8')

    // Gemini cache requires minimum 2,048 tokens
    if (baseTemplate.length < 2000) {
      console.warn('⚠️ Base template too small for caching (< 2048 tokens)')
      return null
    }

    // Create Gemini cache (one-time)
    console.log('📦 Creating base template cache...')
    const cache = await genAI.cacheManager.create({
      model: 'gemini-2.5-flash',
      contents: [{
        role: 'user',
        parts: [{ text: baseTemplate }]
      }],
      ttl: 3600, // 1 hour (auto-refreshes when used)
    })

    baseTemplateCacheName = cache.name
    console.log('✅ Created base template cache:', cache.name)

    return cache.name
  } catch (error) {
    console.warn('⚠️ Cache creation failed, will use standard API:', error)
    return null
  }
}

/**
 * STREAMING GENERATION: Generate worksheet with progressive token delivery
 * User sees content in 8-10s instead of waiting full 30s
 * Same quality, just better UX
 */
export async function generateWorksheetStreaming(
  config: WorksheetConfig,
  options: {
    forceEnhanced?: boolean;
    iterativeCycle?: number;
    onProgress?: (partialHtml: string) => void;
  } = {}
): Promise<GeneratedWorksheet> {
  console.log('🌊 Starting streaming generation...')
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
    // Step 1: Generate prompt (same as standard generation)
    const promptResult = await PromptService.generatePrompt(config, options)
    const prompt = promptResult.prompt
    improvementMetadata = promptResult.metadata
    metrics.promptLength = prompt.length

    console.log(`📝 Prompt ready (${prompt.length} chars), starting stream...`)

    // Step 2: Try to use cached template (optional optimization)
    const cacheName = await getBaseTemplateCache()

    // Step 3: Call streaming API
    const streamResult = cacheName
      ? await model.generateContentStream({
          cachedContent: cacheName,
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
            topP: 0.9,
            topK: 40
          }
        })
      : await model.generateContentStream({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 4096,
            topP: 0.9,
            topK: 40
          }
        })

    // Step 4: Collect chunks and send to UI progressively
    let fullHtml = ''
    let chunkCount = 0
    const startStreamTime = Date.now()

    for await (const chunk of streamResult.stream) {
      const chunkText = chunk.text()
      fullHtml += chunkText
      chunkCount++

      // Send partial HTML to UI (if callback provided)
      if (options.onProgress && chunkCount % 5 === 0) {
        // Send every 5th chunk to avoid overwhelming UI
        options.onProgress(fullHtml)
      }

      // Log first chunk time (user sees content)
      if (chunkCount === 1) {
        const timeToFirstChunk = (Date.now() - startStreamTime) / 1000
        console.log(`✨ First chunk arrived in ${timeToFirstChunk.toFixed(2)}s`)
      }
    }

    metrics.responseLength = fullHtml.length
    console.log(`✅ Streaming complete: ${chunkCount} chunks, ${fullHtml.length} chars`)

    // Step 5: Parse and validate (same as standard generation)
    const worksheet = parseGeneratedContent(fullHtml, config, improvementMetadata)

    // Validate HTML
    const htmlValidation = validateGeneratedHTML(worksheet.html)
    if (!htmlValidation.isValid) {
      throw new GenerationError(
        `Invalid HTML structure: ${htmlValidation.errors.map(e => e.message).join(', ')}`,
        false,
        { htmlErrors: htmlValidation.errors }
      )
    }

    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime
    metrics.success = true

    console.log(`🎉 Streaming generation complete in ${(metrics.duration / 1000).toFixed(2)}s`)

    return worksheet

  } catch (error) {
    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime
    metrics.errorType = error instanceof Error ? error.constructor.name : 'UnknownError'

    console.error('❌ Streaming generation failed, falling back to standard:', error)

    // Fallback to standard generation if streaming fails
    return generateWorksheet(config, options)
  }
}
