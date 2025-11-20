/**
 * Structured Worksheet Parser for Controlled Components
 *
 * This parser extracts worksheet data into a structured format that can be
 * rendered using controlled React components, eliminating the need for
 * dangerouslySetInnerHTML and preventing all focus/flash issues.
 */

export interface InputField {
  subId: string // e.g., "1" or "4-0", "4-1" for multi-input questions
  placeholder: string
  label?: string
  inputType: 'text' | 'textarea'
  style?: {
    width?: string
    borderStyle?: 'solid' | 'underline'
  }
}

export interface StructuredQuestion {
  id: number
  questionHTML: string // Cleaned HTML without input fields (for rendering static content)
  inputs: InputField[] // All input fields for this question
  correctAnswer: string | string[] // Single value or array for multi-input
  questionType: 'counting' | 'number-line' | 'ten-frame' | 'one-more-less' | 'matching' | 'equation' | 'word-problem' | 'generic'
}

export interface StructuredWorksheet {
  questions: StructuredQuestion[]
  stylesheet: string
  metadata: {
    totalQuestions: number
    hasAnswerKey: boolean
    yearGroup?: string
  }
}

export function parseWorksheetStructured(html: string): StructuredWorksheet {
  // 1. Extract stylesheet
  const stylesheet = extractStylesheet(html)

  // 2. Parse answer key
  const answerKey = extractAnswerKey(html)

  // 3. Find all question divs
  const questionDivs = extractQuestions(html)

  // 4. Parse each question into structured format
  const questions = questionDivs.map((qDiv, index) =>
    parseQuestionStructure(qDiv, index + 1, answerKey[index + 1] || '')
  )

  return {
    questions,
    stylesheet,
    metadata: {
      totalQuestions: questions.length,
      hasAnswerKey: Object.keys(answerKey).length > 0
    }
  }
}

function extractStylesheet(html: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const styleTags = doc.querySelectorAll('style')
  let combinedStyles = ''

  styleTags.forEach(styleTag => {
    combinedStyles += styleTag.textContent || ''
  })

  console.log('📐 Extracted stylesheet:', combinedStyles.length, 'characters')
  return combinedStyles
}

function extractAnswerKey(html: string): Record<number, string> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // Enhanced debugging
  console.log('🔍 extractAnswerKey: HTML length:', html.length)
  console.log('🔍 extractAnswerKey: Contains "answer-key":', html.includes('answer-key'))
  console.log('🔍 extractAnswerKey: Contains "answer-key-content":', html.includes('answer-key-content'))

  // Try multiple selectors to find answer key content
  let answerKeyDiv = doc.querySelector('.answer-key-content')

  // Fallback 1: Try without the hyphen (in case of HTML parsing issues)
  if (!answerKeyDiv) {
    console.warn('⚠️ .answer-key-content not found, trying alternative selectors...')
    answerKeyDiv = doc.querySelector('[class*="answer-key-content"]')
  }

  // Fallback 2: Try to find the parent .answer-key div and then get content
  if (!answerKeyDiv) {
    const answerKeyParent = doc.querySelector('.answer-key')
    if (answerKeyParent) {
      console.log('🔍 Found .answer-key parent, searching for content div...')
      answerKeyDiv = answerKeyParent.querySelector('div[class*="content"]')
    }
  }

  // Fallback 3: Look for any div containing answer key paragraphs
  if (!answerKeyDiv) {
    const allDivs = doc.querySelectorAll('div')
    for (const div of Array.from(allDivs)) {
      const firstP = div.querySelector('p')
      if (firstP && /^1\.\s*/.test(firstP.textContent || '')) {
        console.log('🔍 Found potential answer key div by pattern matching')
        answerKeyDiv = div
        break
      }
    }
  }

  if (!answerKeyDiv) {
    console.error('❌ Answer key content div not found! HTML snippet:')
    console.error(html.substring(0, Math.min(1000, html.length)))
    return {}
  }

  console.log('✅ Answer key content div found!')

  const answers: Record<number, string> = {}
  const paragraphs = answerKeyDiv.querySelectorAll('p')

  console.log(`🔍 Found ${paragraphs.length} paragraphs in answer key`)

  paragraphs.forEach((p, index) => {
    const textContent = p.textContent || ''
    console.log(`🔍 Paragraph ${index + 1}: "${textContent}"`)

    // Try different patterns to extract answers
    // Pattern 1: "1. answer" (with period)
    let match = textContent.match(/^(\d+)\.\s*(.+)$/)

    // Pattern 2: "1: answer" (with colon)
    if (!match) {
      match = textContent.match(/^(\d+):\s*(.+)$/)
    }

    // Pattern 3: "1 answer" (with space)
    if (!match) {
      match = textContent.match(/^(\d+)\s+(.+)$/)
    }

    if (match) {
      const [, questionId, answer] = match
      answers[parseInt(questionId)] = answer.trim()
      console.log(`  ✅ Extracted Q${questionId}: "${answer.trim()}"`)
    } else {
      console.warn(`  ⚠️ Could not extract answer from: "${textContent}"`)
    }
  })

  console.log('🔑 Extracted answer key:', Object.keys(answers).length, 'answers')
  return answers
}

function extractQuestions(html: string): string[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const questionDivs = doc.querySelectorAll('.question')

  return Array.from(questionDivs).map(div => div.outerHTML)
}

function parseQuestionStructure(
  questionHTML: string,
  questionId: number,
  correctAnswer: string
): StructuredQuestion {
  const inputs: InputField[] = []
  let cleanedHTML = questionHTML

  console.log(`🔍 Parsing question ${questionId}...`)

  // Pattern 1: Answer line (e.g., <p class="answer-line">Answer:</p>)
  const answerLineMatches = cleanedHTML.match(/<p class="answer-line">.*?<\/p>/gi) || []
  if (answerLineMatches.length > 0) {
    answerLineMatches.forEach((match, idx) => {
      const subId = answerLineMatches.length > 1 ? `${questionId}-${idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: 'Type your answer',
        inputType: 'text',
        style: {
          width: '300px',
          borderStyle: 'solid'
        }
      })
    })
    // Remove answer-line elements from HTML
    cleanedHTML = cleanedHTML.replace(/<p class="answer-line">.*?<\/p>/gi, `<div data-input-placeholder="${questionId}"></div>`)
    console.log(`✅ Found ${answerLineMatches.length} answer-line pattern(s)`)
  }

  // Pattern 2: Answer box (e.g., <div class="answer-box"></div> OR <span class="answer-box"></span>)
  const answerBoxPattern = /<(div|span) class="answer-box"><\/\1>/gi
  const answerBoxMatches = cleanedHTML.match(answerBoxPattern) || []
  if (answerBoxMatches.length > 0) {
    answerBoxMatches.forEach((match, idx) => {
      const subId = answerBoxMatches.length > 1 ? `${questionId}-${idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: 'Answer',
        inputType: 'text',
        style: {
          width: '150px',
          borderStyle: 'solid'
        }
      })
    })
    // Replace answer-box with placeholder
    let boxCounter = 0
    cleanedHTML = cleanedHTML.replace(answerBoxPattern, () => {
      const subId = answerBoxMatches.length > 1 ? `${questionId}-${boxCounter++}` : `${questionId}`
      return `<span data-input-placeholder="${subId}"></span>`
    })
    console.log(`✅ Found ${answerBoxMatches.length} answer-box pattern(s)`)
  }

  // Pattern 3: Underscores (3 or more) - e.g., _________
  const underscoreMatches = cleanedHTML.match(/_{3,}/g) || []
  if (underscoreMatches.length > 0) {
    underscoreMatches.forEach((match, idx) => {
      const subId = underscoreMatches.length > 1 ? `${questionId}-${idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: '...',
        inputType: 'text',
        style: {
          width: `${Math.max(match.length * 12, 100)}px`,
          borderStyle: 'underline'
        }
      })
    })
    // Replace underscores with placeholder
    let underscoreCounter = 0
    cleanedHTML = cleanedHTML.replace(/_{3,}/g, (match) => {
      const subId = underscoreMatches.length > 1 ? `${questionId}-${underscoreCounter++}` : `${questionId}`
      return `<span data-input-placeholder="${subId}"></span>`
    })
    console.log(`✅ Found ${underscoreMatches.length} underscore pattern(s)`)
  }

  // Pattern 4: FALLBACK - If no patterns found
  if (inputs.length === 0) {
    console.warn(`⚠️ No answer patterns found in question ${questionId}! Using fallback`)

    // Check if this is a matching question
    const isMatchingQuestion = cleanedHTML.includes('Match') || cleanedHTML.includes('match') ||
                               (cleanedHTML.match(/<(?:div|p)[^>]*>\s*\d+\s*<\/(?:div|p)>/gi) || []).length >= 3

    if (isMatchingQuestion) {
      inputs.push({
        subId: `${questionId}`,
        placeholder: 'Example: 11-eleven, 14-fourteen, 16-sixteen, 20-twenty',
        label: 'Your Answer (enter pairs like: 11-sixteen, 14-eleven):',
        inputType: 'textarea'
      })
    } else {
      inputs.push({
        subId: `${questionId}`,
        placeholder: 'Type your answer here',
        label: 'Your Answer:',
        inputType: 'text',
        style: {
          width: '250px',
          borderStyle: 'solid'
        }
      })
    }

    // Add placeholder at end of question
    const lastContentMatch = cleanedHTML.match(/(<\/div>|<\/p>)(?![\s\S]*<\/div>)(?![\s\S]*<\/p>)/i)
    if (lastContentMatch) {
      const insertIndex = cleanedHTML.lastIndexOf(lastContentMatch[0])
      cleanedHTML = cleanedHTML.slice(0, insertIndex + lastContentMatch[0].length) +
        `<div data-input-placeholder="${questionId}"></div>` +
        cleanedHTML.slice(insertIndex + lastContentMatch[0].length)
    }
  }

  // Detect question type
  const questionType = detectQuestionType(cleanedHTML)

  // Handle multi-input questions with array answers
  let answerArray: string | string[] = correctAnswer

  if (inputs.length > 1) {
    // Split by comma and extract numbers from each part
    const parts = correctAnswer.split(',').map(a => a.trim())

    // Extract numbers from patterns like "1 less: 14" or just "14"
    answerArray = parts.map(part => {
      // Check if there's a colon - if so, extract number AFTER the colon
      if (part.includes(':')) {
        const afterColon = part.split(':')[1].trim()
        const numberMatch = afterColon.match(/^(\d+(?:[.\/]\d+)?)/)
        return numberMatch ? numberMatch[1] : afterColon
      }
      // Otherwise, extract any number from the part
      const numberMatch = part.match(/\b(\d+(?:[.\/]\d+)?)\b/)
      return numberMatch ? numberMatch[1] : part
    })

    console.log(`🔢 Multi-input Q${questionId}: Split "${correctAnswer}" into:`, answerArray)
  }

  return {
    id: questionId,
    questionHTML: cleanedHTML,
    inputs,
    correctAnswer: answerArray,
    questionType
  }
}

function detectQuestionType(questionHTML: string): StructuredQuestion['questionType'] {
  if (questionHTML.includes('Match') || questionHTML.includes('match')) {
    return 'matching'
  }
  if (questionHTML.includes('one more') || questionHTML.includes('one less')) {
    return 'one-more-less'
  }
  if (questionHTML.includes('ten-frame')) {
    return 'ten-frame'
  }
  if (questionHTML.includes('number-line')) {
    return 'number-line'
  }
  if (questionHTML.includes('column-container') || questionHTML.includes('equation')) {
    return 'equation'
  }
  if (questionHTML.includes('word-problem')) {
    return 'word-problem'
  }
  if (questionHTML.match(/count|how many/i)) {
    return 'counting'
  }
  return 'generic'
}
