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

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not configured')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.7, // Balanced creativity vs consistency
    maxOutputTokens: 4096, // Reasonable limit for worksheet content
    topP: 0.8,
    topK: 40
  }
})

/**
 * Generates a curriculum-aligned math worksheet using Google Gemini AI
 * Enhanced with comprehensive validation, error handling, and performance tracking
 */
export async function generateWorksheet(config: WorksheetConfig): Promise<GeneratedWorksheet> {
  const metrics: GenerationMetrics = {
    startTime: Date.now(),
    endTime: 0,
    duration: 0,
    promptLength: 0,
    responseLength: 0,
    success: false
  }

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

    const prompt = createPrompt(config)
    metrics.promptLength = prompt.length
    
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()
    metrics.responseLength = text.length
    
    // Parse and validate the generated content
    const worksheet = parseGeneratedContent(text, config)
    
    // Validate the generated HTML structure
    const htmlValidation = validateGeneratedHTML(worksheet.html)
    if (!htmlValidation.isValid) {
      throw new Error(`Invalid HTML structure: ${htmlValidation.errors.map(e => e.message).join(', ')}`)
    }
    
    metrics.endTime = Date.now()
    metrics.duration = metrics.endTime - metrics.startTime
    metrics.success = true
    
    // Log performance metrics for monitoring
    console.log('Worksheet generation metrics:', {
      duration: metrics.duration,
      promptLength: metrics.promptLength,
      responseLength: metrics.responseLength,
      topic: config.topic,
      subtopic: config.subtopic,
      questionCount: config.questionCount
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
 */
function parseGeneratedContent(content: string, config: WorksheetConfig): GeneratedWorksheet {
  // Clean the content
  let cleanContent = content.trim()
  
  // If the content is wrapped in markdown code blocks, extract it
  if (cleanContent.startsWith('```json') && cleanContent.endsWith('```')) {
    cleanContent = cleanContent.slice(7, -3).trim()
  } else if (cleanContent.startsWith('```') && cleanContent.endsWith('```')) {
    cleanContent = cleanContent.slice(3, -3).trim()
  }
  
  // Parse the JSON questions
  let questions: WorksheetQuestion[]
  try {
    questions = JSON.parse(cleanContent)
    if (!Array.isArray(questions)) {
      throw new Error('Response is not an array of questions')
    }
    
    // Validate questions structure
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].text || typeof questions[i].text !== 'string') {
        throw new Error(`Question ${i + 1} does not have valid text property`)
      }
    }
    
    // Validate question count
    if (questions.length !== config.questionCount) {
      console.warn(`Expected ${config.questionCount} questions, got ${questions.length}`)
    }
    
  } catch (error) {
    console.error('Failed to parse questions JSON:', cleanContent.substring(0, 200) + '...')
    throw new Error(`Invalid question format: ${error instanceof Error ? error.message : 'Unknown parsing error'}`)
  }
  
  // Create metadata and render context
  const curriculumContext = getCurriculumContext(config.topic, config.subtopic, config.yearGroup)
  
  const renderContext = {
    title: `${curriculumContext.topicName} - ${curriculumContext.subtopicName} Worksheet`,
    content: '', // Will be filled by template renderer
    difficulty: config.difficulty,
    yearGroup: config.yearGroup,
    topic: curriculumContext.topicName,
    subtopic: curriculumContext.subtopicName,
    questionCount: questions.length,
    generatedAt: new Date().toISOString()
  }
  
  // Render using layout template system
  const html = renderLayout(config.layout, questions, renderContext)
  
  return {
    title: renderContext.title,
    html: html,
    metadata: {
      topic: curriculumContext.topicName,
      subtopic: curriculumContext.subtopicName,
      difficulty: config.difficulty,
      questionCount: questions.length,
      curriculum: 'UK National Curriculum',
      generatedAt: renderContext.generatedAt
    }
  }
}