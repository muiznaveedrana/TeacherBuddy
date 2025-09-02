import { GoogleGenerativeAI } from '@google/generative-ai'
import { 
  WorksheetConfig, 
  GeneratedWorksheet, 
  GenerationMetrics
} from '@/lib/types/worksheet'
import { validateGeneratedHTML, validateStudentNames } from '@/lib/utils/validation'
import { CURRICULUM_MAPPING, getTopicDetails } from '@/lib/data/curriculum'

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
  const { topic, subtopic, difficulty, questionCount, yearGroup, studentNames } = config
  
  // Get curriculum-specific context with year group
  const curriculumContext = getCurriculumContext(topic, subtopic, yearGroup)
  
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
    <h2>${curriculumContext.yearGroup} Mathematics: ${curriculumContext.topicName} - ${curriculumContext.subtopicName}</h2>
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
  const curriculumContext = getCurriculumContext(config.topic, config.subtopic, config.yearGroup)
  
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