import { GoogleGenerativeAI } from '@google/generative-ai'
import { 
  WorksheetConfig, 
  GeneratedWorksheet, 
  GenerationMetrics
} from '@/lib/types/worksheet'
import { validateGeneratedHTML, validateStudentNames } from '@/lib/utils/validation'

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
  const { topic, subtopic, difficulty, questionCount, studentNames } = config
  
  // Get curriculum-specific context
  const curriculumContext = getCurriculumContext(topic, subtopic)
  
  // Create name pool for personalization
  const namePool = studentNames.length > 0 
    ? studentNames 
    : ['Emma', 'Oliver', 'Sophie', 'James', 'Lily', 'Thomas', 'Grace', 'Harry', 'Charlotte', 'William']
  
  const prompt = `You are a UK primary school mathematics teacher creating a professional worksheet that aligns with the UK National Curriculum. 

**CURRICULUM REQUIREMENTS:**
- Topic: ${curriculumContext.topicName}
- Subtopic: ${curriculumContext.subtopicName}
- Difficulty Level: ${difficulty}
- Learning Objectives: ${curriculumContext.learningObjectives.join(', ')}
- Age Group: ${curriculumContext.ageGroup}

**WORKSHEET SPECIFICATIONS:**
- Generate exactly ${questionCount} questions
- Use UK mathematical terminology and contexts
- Include varied question types: word problems (60%), calculations (30%), visual problems (10%)
- Integrate student names naturally: ${namePool.join(', ')}
- Ensure progressive difficulty within the worksheet
- Include clear instructions and working space

**QUALITY STANDARDS:**
- Age-appropriate language and contexts
- UK-specific scenarios (pounds, metres, etc.)
- Avoid cultural bias
- Educational quality with proper mathematical reasoning
- Clear, printable formatting

**OUTPUT FORMAT:**
Return your response as a structured HTML document with the following format:

<div class="worksheet-container">
  <header class="worksheet-header">
    <h1>Mathematics Worksheet</h1>
    <h2>${curriculumContext.topicName} - ${curriculumContext.subtopicName}</h2>
    <div class="worksheet-info">
      <p>Name: _________________  Date: _________________</p>
      <p>Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} | ${questionCount} Questions</p>
    </div>
  </header>
  
  <section class="instructions">
    <h3>Instructions:</h3>
    <p>Show all your working out. Use the space provided for each question. Read each question carefully.</p>
  </section>
  
  <section class="questions">
    [Generate ${questionCount} questions here with proper HTML structure]
    Each question should be in this format:
    <div class="question">
      <p class="question-number"><strong>1.</strong> [Question text with student name integration]</p>
      <div class="working-space"></div>
    </div>
  </section>
</div>

Generate the worksheet now, ensuring all ${questionCount} questions are mathematically sound, curriculum-aligned, and engaging for primary school students.`

  return prompt
}

/**
 * Gets curriculum-specific context for prompt generation
 */
function getCurriculumContext(topic: string, subtopic: string) {
  const topicMapping: Record<string, {
    topicName: string
    ageGroup: string
    subtopics: Record<string, {
      subtopicName: string
      learningObjectives: string[]
    }>
  }> = {
    'number-operations': {
      topicName: 'Number and Operations',
      ageGroup: 'Primary Years 1-6',
      subtopics: {
        'addition-subtraction': {
          subtopicName: 'Addition and Subtraction',
          learningObjectives: [
            'Add and subtract numbers using formal written methods',
            'Solve addition and subtraction word problems',
            'Estimate and check answers using inverse operations'
          ]
        },
        'multiplication-division': {
          subtopicName: 'Multiplication and Division',
          learningObjectives: [
            'Recall multiplication and division facts',
            'Use written methods for multiplication and division',
            'Solve problems involving multiplication and division'
          ]
        },
        'place-value': {
          subtopicName: 'Place Value',
          learningObjectives: [
            'Understand the value of digits in different positions',
            'Compare and order numbers',
            'Round numbers to the nearest 10, 100, or 1000'
          ]
        },
        'mental-maths': {
          subtopicName: 'Mental Mathematics',
          learningObjectives: [
            'Use mental strategies for calculations',
            'Estimate answers before calculating',
            'Use known facts to derive new facts'
          ]
        }
      }
    },
    'fractions-decimals': {
      topicName: 'Fractions and Decimals',
      ageGroup: 'Primary Years 3-6',
      subtopics: {
        'equivalent-fractions': {
          subtopicName: 'Equivalent Fractions',
          learningObjectives: [
            'Recognize equivalent fractions',
            'Find equivalent fractions using multiplication and division',
            'Compare fractions with different denominators'
          ]
        },
        'adding-fractions': {
          subtopicName: 'Adding Fractions',
          learningObjectives: [
            'Add fractions with the same denominator',
            'Add fractions with different denominators',
            'Solve word problems involving fraction addition'
          ]
        }
      }
    }
  }

  const topicData = topicMapping[topic]
  const subtopicData = topicData?.subtopics[subtopic]
  
  return {
    topicName: topicData?.topicName || 'Mathematics',
    subtopicName: subtopicData?.subtopicName || 'Problem Solving',
    ageGroup: topicData?.ageGroup || 'Primary School',
    learningObjectives: subtopicData?.learningObjectives || ['Solve mathematical problems', 'Show working clearly']
  }
}

/**
 * Parses the generated content from Gemini AI
 */
function parseGeneratedContent(content: string, config: WorksheetConfig): GeneratedWorksheet {
  // Clean and validate the HTML content
  let html = content.trim()
  
  // If the content is wrapped in markdown code blocks, extract it
  if (html.startsWith('```html') && html.endsWith('```')) {
    html = html.slice(7, -3).trim()
  } else if (html.startsWith('```') && html.endsWith('```')) {
    html = html.slice(3, -3).trim()
  }
  
  // Ensure we have valid HTML structure
  if (!html.includes('<div class="worksheet-container">')) {
    throw new Error('Generated content does not contain valid worksheet HTML structure')
  }
  
  // Create metadata
  const curriculumContext = getCurriculumContext(config.topic, config.subtopic)
  
  return {
    title: `${curriculumContext.topicName} - ${curriculumContext.subtopicName} Worksheet`,
    html: html,
    metadata: {
      topic: curriculumContext.topicName,
      subtopic: curriculumContext.subtopicName,
      difficulty: config.difficulty,
      questionCount: config.questionCount,
      curriculum: 'UK National Curriculum',
      generatedAt: new Date().toISOString()
    }
  }
}