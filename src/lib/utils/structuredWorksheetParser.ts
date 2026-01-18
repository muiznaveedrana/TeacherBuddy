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
  expectedAnswer?: string // For inputs with data-answer attribute - used for validation
  style?: {
    width?: string
    minWidth?: string
    height?: string
    borderStyle?: 'solid' | 'underline'
    border?: string
    borderRadius?: string
    backgroundColor?: string
    textAlign?: 'left' | 'center' | 'right'
    fontSize?: string
    fontWeight?: string
    // Flag to indicate this should look like the worksheet's answer-box
    isAnswerBox?: boolean
    isAnswerBoxSmall?: boolean
    // Flag to indicate this came from an existing <input data-answer> in the HTML
    isExistingInput?: boolean
  }
}

export interface StructuredQuestion {
  id: number
  questionHTML: string // Cleaned HTML without input fields (for rendering static content)
  inputs: InputField[] // All input fields for this question
  correctAnswer: string | string[] // Single value or array for multi-input
  questionType: 'counting' | 'number-line' | 'ten-frame' | 'one-more-less' | 'matching' | 'equation' | 'word-problem' | 'number-sequence' | 'rainbow-bonds' | 'bond-grid' | 'generic'
  // For number-sequence questions: parsed sequence data for inline input rendering
  sequenceData?: {
    type: 'number-sequence' | 'caterpillar'
    direction: 'forward' | 'backward'
    items: Array<{ value: string | null; isFilled: boolean; inputIndex?: number }>
  }
  // For rainbow-bonds questions: rainbow number sequence with missing numbers
  rainbowData?: {
    items: Array<{ value: string | null; isFilled: boolean; inputIndex?: number }>
  }
  // For bond-grid questions: equations like "3 + ○ = 10"
  bondGridData?: {
    equations: Array<{ num1: string; num2: string | null; result: string; inputIndex?: number }>
  }
  // For equation-row questions: single equation like "6 + ○ = 10" or "○ + ○ = 10"
  equationRowData?: {
    items: Array<{ value: string | null; type: 'num' | 'op' | 'answer'; inputIndex?: number }>
  }
  // For fact family questions: multiple related equations
  factFamilyData?: {
    equations: Array<{
      items: Array<{ value: string | null; type: 'num' | 'op' | 'answer'; inputIndex?: number }>
    }>
  }
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
      // First try to find inner content div
      answerKeyDiv = answerKeyParent.querySelector('div[class*="content"]')
      // If no inner content div, use the .answer-key div directly (paragraphs might be direct children)
      if (!answerKeyDiv) {
        console.log('🔍 No inner content div, using .answer-key directly')
        answerKeyDiv = answerKeyParent
      }
    }
  }

  // Fallback 3: Look for any div containing answer key paragraphs
  if (!answerKeyDiv) {
    const allDivs = doc.querySelectorAll('div')
    for (const div of Array.from(allDivs)) {
      const firstP = div.querySelector('p')
      if (firstP && /^(1\.|Q1|Answer\s*1)/i.test(firstP.textContent || '')) {
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
    // Pattern 0: "1a. answer" or "1b. answer" (with letter suffix) - most specific first
    let match = textContent.match(/^(\d+[a-z])\.\s*(.+)$/i)

    // Pattern 1: "1. answer" (with period)
    if (!match) {
      match = textContent.match(/^(\d+)\.\s*(.+)$/)
    }

    // Pattern 2: "1: answer" (with colon)
    if (!match) {
      match = textContent.match(/^(\d+):\s*(.+)$/)
    }

    // Pattern 3: "1) answer" (with parenthesis)
    if (!match) {
      match = textContent.match(/^(\d+)\)\s*(.+)$/)
    }

    // Pattern 4: "Q1: answer" or "Q1. answer" or "Q1) answer"
    if (!match) {
      match = textContent.match(/^Q(\d+)[:.)\s]\s*(.+)$/i)
    }

    // Pattern 5: "Answer 1: value" or "Answer 1. value"
    if (!match) {
      match = textContent.match(/^Answer\s*(\d+)[:.)\s]\s*(.+)$/i)
    }

    // Pattern 6: "Question 1: answer"
    if (!match) {
      match = textContent.match(/^Question\s*(\d+)[:.)\s]\s*(.+)$/i)
    }

    // Pattern 7: "1 answer" (with space, last resort)
    if (!match) {
      match = textContent.match(/^(\d+)\s+(.+)$/)
    }

    if (match) {
      const [, questionId, rawAnswer] = match
      let answer = rawAnswer.trim()

      // Check if paragraph contains answer-line span - extract just the value from it
      // This handles cases like "The missing day is <span class="answer-line">Sunday</span>"
      let answerLineSpan = p.querySelector('.answer-line, span[class*="answer-line"]')

      // Also check for styled spans (font-weight:normal or font-weight:bold)
      // This handles V1/V3 format: <span style="font-weight:normal;">Tuesday</span>
      if (!answerLineSpan) {
        answerLineSpan = p.querySelector('span[style*="font-weight"]')
      }

      if (answerLineSpan) {
        const spanValue = answerLineSpan.textContent?.trim()
        if (spanValue) {
          answer = spanValue
          console.log(`  📍 Extracted value from span: "${answer}"`)
        }
      }

      answers[parseInt(questionId)] = answer
      console.log(`  ✅ Extracted Q${questionId}: "${answer}"`)
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

  // Pattern 0: Detect existing <input> elements with data-answer attribute
  // These are already interactive inputs embedded in the HTML - we should use them directly
  // and NOT create additional mystery box inputs
  const existingInputPattern = /<input[^>]*data-answer="([^"]*)"[^>]*>/gi
  const existingInputMatches = cleanedHTML.match(existingInputPattern) || []
  if (existingInputMatches.length > 0) {
    console.log(`✅ Q${questionId}: Found ${existingInputMatches.length} existing <input data-answer> element(s) - using directly`)
    // Parse each existing input and register it
    existingInputMatches.forEach((match, idx) => {
      const dataAnswer = match.match(/data-answer="([^"]*)"/)?.[1] || ''
      const subId = existingInputMatches.length > 1 ? `${questionId}-${idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: '?',
        inputType: 'text',
        expectedAnswer: dataAnswer, // Store expected answer for validation
        style: {
          width: '95px',
          minWidth: '95px',
          height: '37px',
          border: '2px solid #333',
          borderRadius: '5px',
          backgroundColor: '#FFF9C4',
          textAlign: 'center',
          fontSize: '13pt',
          fontWeight: 'bold',
          borderStyle: 'solid',
          isExistingInput: true // Flag that this is an existing input
        }
      })
    })
    // Replace existing inputs with placeholders so we can inject React-controlled inputs
    let inputCounter = 0
    cleanedHTML = cleanedHTML.replace(existingInputPattern, () => {
      const subId = existingInputMatches.length > 1 ? `${questionId}-${inputCounter++}` : `${questionId}`
      return `<span data-input-placeholder="${subId}"></span>`
    })
    console.log(`✅ Found ${existingInputMatches.length} existing input element(s)`)
  }

  // Pattern 1a: Inline answer-line SPAN (e.g., <span class="answer-line"></span>) - for inline inputs
  const inlineAnswerLinePattern = /<span[^>]*class="[^"]*answer-line[^"]*"[^>]*>[\s\S]*?<\/span>/gi
  const inlineAnswerLineMatches = cleanedHTML.match(inlineAnswerLinePattern) || []
  if (inlineAnswerLineMatches.length > 0) {
    let inlineCounter = 0
    inlineAnswerLineMatches.forEach((match, idx) => {
      const subId = inlineAnswerLineMatches.length > 1 ? `${questionId}-${idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: '?',
        inputType: 'text',
        style: {
          width: '95px',
          minWidth: '95px',
          height: '37px',
          border: '2px solid #333',
          borderRadius: '5px',
          backgroundColor: '#FFF9C4',
          textAlign: 'center',
          fontSize: '13pt',
          fontWeight: 'bold',
          borderStyle: 'solid'
        }
      })
    })
    // Replace inline answer-line spans with inline input placeholders
    cleanedHTML = cleanedHTML.replace(inlineAnswerLinePattern, () => {
      const subId = inlineAnswerLineMatches.length > 1 ? `${questionId}-${inlineCounter++}` : `${questionId}`
      return `<span data-input-placeholder="${subId}"></span>`
    })
    console.log(`✅ Found ${inlineAnswerLineMatches.length} INLINE answer-line span(s)`)
  }

  // Pattern 1b: Answer line P tag (e.g., <p class="answer-line">Answer:</p>)
  const answerLineMatches = cleanedHTML.match(/<p class="answer-line">.*?<\/p>/gi) || []
  if (answerLineMatches.length > 0 && inputs.length === 0) {
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
    console.log(`✅ Found ${answerLineMatches.length} answer-line P pattern(s)`)
  }

  // IMPORTANT: Pattern order matters for input ordering!
  // Patterns that appear FIRST in DOM should be detected FIRST
  // For Q3 (symbol comparison): symbol-box appears before answer-box-small
  // For Q4 (ordering): order-answer appears before other inputs

  // Pattern 2a: Symbol box (for < > = comparison questions) - DETECT FIRST
  const symbolBoxPattern = /<(div|span)[^>]*class="[^"]*symbol-box[^"]*"[^>]*>[\s\S]*?<\/\1>/gi
  const symbolBoxMatches = cleanedHTML.match(symbolBoxPattern) || []
  if (symbolBoxMatches.length > 0) {
    const startIdx = inputs.length
    const totalInputs = startIdx + symbolBoxMatches.length
    symbolBoxMatches.forEach((match, idx) => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: '<>=',
        inputType: 'text',
        style: {
          width: '50px',
          borderStyle: 'solid'
        }
      })
    })
    // Replace symbol-box with placeholder
    let symbolCounter = 0
    cleanedHTML = cleanedHTML.replace(symbolBoxPattern, () => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + symbolCounter++}` : `${questionId}`
      return `<span data-input-placeholder="${subId}"></span>`
    })
    console.log(`✅ Found ${symbolBoxMatches.length} symbol-box pattern(s)`)
  }

  // Pattern 2b: Order answer (for ordering questions smallest to largest)
  const orderAnswerPattern = /<(div|span)[^>]*class="[^"]*order-answer[^"]*"[^>]*>[\s\S]*?<\/\1>/gi
  const orderAnswerMatches = cleanedHTML.match(orderAnswerPattern) || []
  if (orderAnswerMatches.length > 0) {
    const startIdx = inputs.length
    const totalInputs = startIdx + orderAnswerMatches.length
    orderAnswerMatches.forEach((match, idx) => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: '?',
        inputType: 'text',
        style: {
          width: '60px',
          borderStyle: 'solid'
        }
      })
    })
    // Replace order-answer with placeholder
    let orderCounter = 0
    cleanedHTML = cleanedHTML.replace(orderAnswerPattern, () => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + orderCounter++}` : `${questionId}`
      return `<span data-input-placeholder="${subId}"></span>`
    })
    console.log(`✅ Found ${orderAnswerMatches.length} order-answer pattern(s)`)
  }

  // Pattern 2c: Answer slot (for open-ended questions with multiple answers)
  const answerSlotPattern = /<(div|span)[^>]*class="[^"]*answer-slot[^"]*"[^>]*>[\s\S]*?<\/\1>/gi
  const answerSlotMatches = cleanedHTML.match(answerSlotPattern) || []
  if (answerSlotMatches.length > 0) {
    const startIdx = inputs.length
    const totalInputs = startIdx + answerSlotMatches.length
    answerSlotMatches.forEach((match, idx) => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: `#${idx + 1}`,
        inputType: 'text',
        style: {
          width: '60px',
          borderStyle: 'solid'
        }
      })
    })
    // Replace answer-slot with placeholder
    let slotCounter = 0
    cleanedHTML = cleanedHTML.replace(answerSlotPattern, () => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + slotCounter++}` : `${questionId}`
      return `<span data-input-placeholder="${subId}"></span>`
    })
    console.log(`✅ Found ${answerSlotMatches.length} answer-slot pattern(s)`)
  }

  // Pattern 2d: Bond answer (e.g., <span class="bond-answer"></span> for number bonds grid)
  const bondAnswerPattern = /<(div|span)[^>]*class="[^"]*bond-answer[^"]*"[^>]*>[\s\S]*?<\/\1>/gi
  const bondAnswerMatches = cleanedHTML.match(bondAnswerPattern) || []
  if (bondAnswerMatches.length > 0) {
    const startIdx = inputs.length
    const totalInputs = startIdx + bondAnswerMatches.length
    bondAnswerMatches.forEach((match, idx) => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: '?',
        inputType: 'text',
        style: {
          width: '50px',
          borderStyle: 'solid'
        }
      })
    })
    // Replace bond-answer with placeholder
    let bondCounter = 0
    cleanedHTML = cleanedHTML.replace(bondAnswerPattern, () => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + bondCounter++}` : `${questionId}`
      return `<span data-input-placeholder="${subId}"></span>`
    })
    console.log(`✅ Found ${bondAnswerMatches.length} bond-answer pattern(s)`)
  }

  // Pattern 2e: Answer cell (for place value tables like "tens" and "ones")
  const answerCellPattern = /<td[^>]*class="[^"]*answer-cell[^"]*"[^>]*>[\s\S]*?<\/td>/gi
  const answerCellMatches = cleanedHTML.match(answerCellPattern) || []
  if (answerCellMatches.length > 0) {
    const startIdx = inputs.length
    const totalInputs = startIdx + answerCellMatches.length
    answerCellMatches.forEach((match, idx) => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: '?',
        inputType: 'text',
        style: {
          width: '50px',
          borderStyle: 'solid'
        }
      })
    })
    // Replace answer-cell with placeholder
    let cellCounter = 0
    cleanedHTML = cleanedHTML.replace(answerCellPattern, () => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + cellCounter++}` : `${questionId}`
      return `<td class="answer-cell"><span data-input-placeholder="${subId}"></span></td>`
    })
    console.log(`✅ Found ${answerCellMatches.length} answer-cell pattern(s)`)
  }

  // Pattern 2f-special: Answer box inside bond-part (number bond diagrams) - needs smaller size
  const bondPartAnswerPattern = /<div[^>]*class="[^"]*bond-part[^"]*"[^>]*>[\s\S]*?<span[^>]*class="[^"]*answer-box-small[^"]*"[^>]*>[\s\S]*?<\/span>[\s\S]*?<\/div>/gi
  const bondPartAnswerMatches = cleanedHTML.match(bondPartAnswerPattern) || []
  if (bondPartAnswerMatches.length > 0) {
    const startIdx = inputs.length
    const totalInputs = startIdx + bondPartAnswerMatches.length
    bondPartAnswerMatches.forEach((match, idx) => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: '?',
        inputType: 'text',
        style: {
          // Smaller size for bond-part circles
          minWidth: '36px',
          width: '36px',
          height: '28px',
          border: '2px solid #333',
          borderRadius: '6px',
          backgroundColor: '#FFF9C4',
          textAlign: 'center',
          fontSize: '14pt',
          fontWeight: 'bold',
          borderStyle: 'solid',
          isAnswerBoxSmall: true
        }
      })
    })
    // Replace bond-part answer boxes with placeholder
    let bondPartCounter = 0
    cleanedHTML = cleanedHTML.replace(bondPartAnswerPattern, (match) => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + bondPartCounter++}` : `${questionId}`
      // Keep the bond-part div structure but replace inner answer-box with placeholder
      return match.replace(/<span[^>]*class="[^"]*answer-box-small[^"]*"[^>]*>[\s\S]*?<\/span>/i,
        `<span data-input-placeholder="${subId}"></span>`)
    })
    console.log(`✅ Found ${bondPartAnswerMatches.length} bond-part answer-box pattern(s)`)
  }

  // Pattern 2f: Answer box (e.g., <div class="answer-box"></div> OR <span class="answer-box"></span>)
  // DETECT LAST - this catches answer-box and answer-box-small in reasoning boxes
  const answerBoxPattern = /<(div|span)[^>]*class="[^"]*answer-box[^"]*"[^>]*>[\s\S]*?<\/\1>/gi
  const answerBoxMatches = cleanedHTML.match(answerBoxPattern) || []
  if (answerBoxMatches.length > 0) {
    const startIdx = inputs.length
    const totalInputs = startIdx + answerBoxMatches.length
    answerBoxMatches.forEach((match, idx) => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + idx}` : `${questionId}`
      // Detect if this is answer-box-small or regular answer-box
      const isSmall = match.includes('answer-box-small')
      inputs.push({
        subId,
        placeholder: '?',
        inputType: 'text',
        style: {
          // Match the worksheet's .answer-box / .answer-box-small CSS exactly
          // Regular answer-box: 140px min-width (+20px from 120), small: 90px (+20px from 70)
          minWidth: isSmall ? '90px' : '140px',
          width: isSmall ? '90px' : '140px',
          height: '42px',
          border: '3px solid #333',
          borderRadius: '8px',
          backgroundColor: '#FFF9C4', // Yellow background from worksheet CSS
          textAlign: 'center',
          fontSize: '16pt',
          fontWeight: 'bold',
          borderStyle: 'solid',
          isAnswerBox: !isSmall,
          isAnswerBoxSmall: isSmall
        }
      })
    })
    // Replace answer-box with placeholder
    let boxCounter = 0
    cleanedHTML = cleanedHTML.replace(answerBoxPattern, () => {
      const subId = totalInputs > 1 ? `${questionId}-${startIdx + boxCounter++}` : `${questionId}`
      return `<span data-input-placeholder="${subId}"></span>`
    })
    console.log(`✅ Found ${answerBoxMatches.length} answer-box pattern(s)`)
  }

  // Pattern 3: Underscores (3 or more) - e.g., _________
  const underscoreMatches = cleanedHTML.match(/_{3,}/g) || []
  if (underscoreMatches.length > 0 && inputs.length === 0) {
    underscoreMatches.forEach((match, idx) => {
      const subId = underscoreMatches.length > 1 ? `${questionId}-${idx}` : `${questionId}`
      inputs.push({
        subId,
        placeholder: '...',
        inputType: 'text',
        style: {
          width: `${Math.max(match.length * 12, 120)}px`,
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
    console.warn(`⚠️ Q${questionId}: No answer patterns found! Using fallback`)
    console.log(`⚠️ Q${questionId}: correctAnswer = "${correctAnswer}"`)

    // Check if this is a matching question
    const isMatchingQuestion = cleanedHTML.includes('Match') || cleanedHTML.includes('match') ||
                               (cleanedHTML.match(/<(?:div|p)[^>]*>\s*\d+\s*<\/(?:div|p)>/gi) || []).length >= 3

    console.log(`⚠️ Q${questionId}: isMatchingQuestion = ${isMatchingQuestion}`)

    if (isMatchingQuestion) {
      // Parse the correct answer to find which items need inputs
      // Format: "5-five, 10-ten" or "five, ten" (for items that need answers)
      const answerPairs = correctAnswer.split(',').map(p => p.trim()).filter(p => p)

      if (answerPairs.length > 0) {
        // Create individual inputs for each answer needed
        answerPairs.forEach((pair, idx) => {
          const subId = answerPairs.length > 1 ? `${questionId}-${idx}` : `${questionId}`

          // Extract number from pair if present (e.g., "5-five" -> "5")
          const numMatch = pair.match(/^(\d+)[-:]/)
          const numberLabel = numMatch ? numMatch[1] : `Item ${idx + 1}`

          inputs.push({
            subId,
            placeholder: `Answer for ${numberLabel}`,
            inputType: 'text',
            style: {
              width: '140px',
              borderStyle: 'solid'
            }
          })
        })

        // Try to inject placeholders at answer positions
        // Multiple patterns to match different HTML structures
        let inputIdx = 0

        // Pattern A: Empty match-answer divs (e.g., <div class="match-answer"></div>)
        cleanedHTML = cleanedHTML.replace(/<div[^>]*class="[^"]*match-answer[^"]*"[^>]*><\/div>/gi, () => {
          if (inputIdx < inputs.length) {
            const subId = inputs[inputIdx].subId
            inputIdx++
            return `<div class="match-answer"><span data-input-placeholder="${subId}"></span></div>`
          }
          return '<div class="match-answer"></div>'
        })

        // Pattern B: Arrow followed by underscores (→ _____ or -> _____)
        if (inputIdx === 0) {
          cleanedHTML = cleanedHTML.replace(/(→|->|&#8594;)\s*(_{3,})/gi, (match, arrow) => {
            if (inputIdx < inputs.length) {
              const subId = inputs[inputIdx].subId
              inputIdx++
              return `${arrow} <span data-input-placeholder="${subId}"></span>`
            }
            return match
          })
        }

        // Pattern C: Just underscores
        if (inputIdx === 0) {
          cleanedHTML = cleanedHTML.replace(/_{3,}/g, () => {
            if (inputIdx < inputs.length) {
              const subId = inputs[inputIdx].subId
              inputIdx++
              return `<span data-input-placeholder="${subId}"></span>`
            }
            return '_____'
          })
        }

        // Pattern D: Blank spans
        if (inputIdx === 0) {
          cleanedHTML = cleanedHTML.replace(/<span[^>]*class="[^"]*blank[^"]*"[^>]*>[^<]*<\/span>/gi, () => {
            if (inputIdx < inputs.length) {
              const subId = inputs[inputIdx].subId
              inputIdx++
              return `<span data-input-placeholder="${subId}"></span>`
            }
            return ''
          })
        }

        console.log(`✅ Q${questionId} Matching: created ${inputs.length} inputs, injected ${inputIdx} placeholders`)
        console.log(`✅ Q${questionId} cleanedHTML has placeholder:`, cleanedHTML.includes('data-input-placeholder'))
      } else {
        // Fallback: single textarea if we can't parse answer pairs
        inputs.push({
          subId: `${questionId}`,
          placeholder: 'Example: 11-eleven, 14-fourteen, 16-sixteen, 20-twenty',
          label: 'Your Answer (enter pairs like: 11-sixteen, 14-eleven):',
          inputType: 'textarea'
        })
      }
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

    // Add placeholder at end of question if no inline placeholders were added
    if (!cleanedHTML.includes('data-input-placeholder')) {
      const lastContentMatch = cleanedHTML.match(/(<\/div>|<\/p>)(?![\s\S]*<\/div>)(?![\s\S]*<\/p>)/i)
      if (lastContentMatch) {
        const insertIndex = cleanedHTML.lastIndexOf(lastContentMatch[0])
        cleanedHTML = cleanedHTML.slice(0, insertIndex + lastContentMatch[0].length) +
          `<div data-input-placeholder="${questionId}"></div>` +
          cleanedHTML.slice(insertIndex + lastContentMatch[0].length)
      }
    }
  }

  // Detect question type
  const questionType = detectQuestionType(cleanedHTML)

  // Parse sequence data for number-sequence questions
  let sequenceData: StructuredQuestion['sequenceData'] = undefined
  if (questionType === 'number-sequence') {
    sequenceData = parseSequenceData(cleanedHTML, inputs)
    console.log(`🔢 Q${questionId} Sequence data:`, sequenceData)
  }

  // Parse rainbow data for rainbow-bonds questions
  let rainbowData: StructuredQuestion['rainbowData'] = undefined
  if (questionType === 'rainbow-bonds') {
    // Use original questionHTML so rainbow-num elements are still intact (before answer-box replacement)
    rainbowData = parseRainbowData(questionHTML, inputs)
    console.log(`🌈 Q${questionId} Rainbow data:`, rainbowData)
  }

  // Parse bond grid data for bond-grid questions
  let bondGridData: StructuredQuestion['bondGridData'] = undefined
  if (questionType === 'bond-grid') {
    bondGridData = parseBondGridData(cleanedHTML, inputs)
    console.log(`🔗 Q${questionId} Bond grid data:`, bondGridData)
  }

  // Parse equation-row data for any question with equation-row, addition-equation, or subtraction-equation
  // IMPORTANT: Use original questionHTML (not cleanedHTML) because answer-boxes get replaced with placeholders
  let equationRowData: StructuredQuestion['equationRowData'] = undefined
  let factFamilyData: StructuredQuestion['factFamilyData'] = undefined
  const hasEquationRow = questionHTML.includes('equation-row') ||
                         questionHTML.includes('addition-equation') ||
                         questionHTML.includes('subtraction-equation')
  const isFactFamily = questionHTML.toLowerCase().includes('fact family') ||
                       questionHTML.includes('fact-family')

  if (isFactFamily && inputs.length > 1) {
    // Parse fact family with multiple equations
    factFamilyData = parseFactFamilyData(questionHTML, inputs)
    console.log(`👨‍👩‍👧‍👦 Q${questionId} Fact family data:`, factFamilyData)
  } else if (hasEquationRow && questionType !== 'bond-grid' && inputs.length === 1) {
    // Single equation with inline input
    equationRowData = parseEquationRowData(questionHTML, inputs)
    console.log(`➕ Q${questionId} Equation row data:`, equationRowData)
  }

  // Handle answers - extract just the number/value from answer text like "12 (6 + 6, doubles)"
  let answerArray: string | string[] = correctAnswer

  // Special handling for word-problem questions with 2 inputs but 1 answer
  // These have answer-box (for equation result) and answer-line (for sentence completion)
  // Both expect the SAME numeric answer (e.g., "14" for both "8 + 6 = 14" and "Ben has 14 teddy-bears")
  // Detect by: answer-box AND answer-line in HTML (works for both word-problem-visual and comparison-visual)
  const hasAnswerBox = questionHTML.includes('answer-box')
  const hasAnswerLine = questionHTML.includes('answer-line')
  if (hasAnswerBox && hasAnswerLine && inputs.length === 2 && correctAnswer) {
    // Extract just the leading number from answer like "14 teddy-bears (8 + 6 = 14)"
    const numberMatch = correctAnswer.match(/^(\d+)/)
    if (numberMatch) {
      const numAnswer = numberMatch[1]
      answerArray = [numAnswer, numAnswer] // Both inputs get the same answer
      console.log(`📝 Word-problem Q${questionId}: Duplicated answer "${numAnswer}" for 2 inputs from "${correctAnswer}"`)
    }
  }
  // For single-input questions, extract just the number from the answer
  else if (inputs.length === 1 && correctAnswer) {
    // Extract leading number from answer like "12 (6 + 6, doubles)" -> "12"
    // Also handles time format like "8:30" and fractions like "1/2"
    const numberMatch = correctAnswer.match(/^(\d+(?:[:./]\d+)?)/)
    if (numberMatch) {
      answerArray = numberMatch[1]
      console.log(`🔢 Single-input Q${questionId}: Extracted "${answerArray}" from "${correctAnswer}"`)
    }
  }
  // Special handling for multi-step word problems with "Working:" section
  // Format: "17 erasers Working: 30 - 8 = 22, then 22 - 5 = 17"
  // Extract all equation results from the Working section to fill multiple inputs
  else if (!hasAnswerBox && hasAnswerLine && inputs.length > 2 && correctAnswer && correctAnswer.includes('Working:')) {
    const workingMatch = correctAnswer.match(/Working:\s*(.+)$/i)
    if (workingMatch) {
      const workingText = workingMatch[1]
      // Extract all "= X" results from the working section (e.g., "30 - 8 = 22, then 22 - 5 = 17")
      const equationResults: string[] = []
      const resultMatches = workingText.matchAll(/=\s*(\d+)/g)
      for (const m of resultMatches) {
        equationResults.push(m[1])
      }
      // Also extract the final answer (first number in the answer text)
      const finalAnswerMatch = correctAnswer.match(/^(\d+)/)
      const finalAnswer = finalAnswerMatch ? finalAnswerMatch[1] : ''

      // Build answer array: intermediate results followed by final answer (repeated as needed)
      // For multi-step problems, inputs are typically:
      // - Step 1 result(s)
      // - Step 2 result(s)
      // - Final answer sentence (may appear multiple times)
      if (equationResults.length > 0 && finalAnswer) {
        // Start with equation results, then repeat final answer to fill remaining inputs
        answerArray = []
        for (const result of equationResults) {
          answerArray.push(result)
        }
        // Fill remaining inputs with the final answer
        while (answerArray.length < inputs.length) {
          answerArray.push(finalAnswer)
        }
        console.log(`📝 Multi-step Q${questionId}: Extracted working values from "${workingText}":`, answerArray)
      }
    }
  }
  else if (inputs.length > 1) {
    // First, check for "X tens and Y ones" format (place value questions)
    const tensOnesMatch = correctAnswer.match(/(\d+)\s*tens?\s+and\s+(\d+)\s*ones?/i)
    if (tensOnesMatch) {
      answerArray = [tensOnesMatch[1], tensOnesMatch[2]]
      console.log(`🔢 Multi-input Q${questionId} (tens/ones format): Extracted from "${correctAnswer}":`, answerArray)
    }
    // Check for equation format like "5 + 5 = 10" or "3 + 7 = 10"
    // These need to extract the operands, not treat "=" as a comparison symbol
    else {
      const equationFormatMatch = correctAnswer.match(/^(\d+)\s*[+−\-]\s*(\d+)\s*=\s*\d+$/)
      if (equationFormatMatch) {
        answerArray = [equationFormatMatch[1], equationFormatMatch[2]]
        console.log(`➕ Multi-input Q${questionId} (equation format): Extracted from "${correctAnswer}":`, answerArray)
      } else {
    // EARLY CHECK: Simple comma-separated word answers without a), b), c) prefixes
    // Handles answers like "up, right, down" or "forwards, backwards" for movement/direction questions
    const hasAbcPrefix = /[a-f]\)\s*/i.test(correctAnswer)
    const commaParts = correctAnswer.split(',').map(p => p.trim()).filter(p => p.length > 0)
    const allWordsNoNumbers = commaParts.every(part => /^[a-zA-Z]+$/.test(part))

    if (!hasAbcPrefix && commaParts.length >= inputs.length && allWordsNoNumbers) {
      answerArray = commaParts.slice(0, inputs.length)
      console.log(`🔤 Multi-input Q${questionId} (word list): Direct split from "${correctAnswer}":`, answerArray)
    } else {
    // Simple extraction for "a) X b) Y c) Z d) W" format using individual regex matches
    const abcdMatches: string[] = []

    // Extract a) value - number, Yes/No, or "X and Y" patterns
    const aMatch = correctAnswer.match(/a\)\s*(.+?)(?:\s+b\)|$)/i)
    if (aMatch) {
      let val = aMatch[1].trim()
      // Check for "X and Y" pattern (e.g., "30 and 40")
      const andMatch = val.match(/^(\d+)\s+and\s+(\d+)/)
      if (andMatch) {
        abcdMatches.push(andMatch[1])
        abcdMatches.push(andMatch[2])
      }
      // Check for Yes/No (for reasoning questions)
      else if (/^(Yes|No)$/i.test(val)) {
        abcdMatches.push(val)
      }
      else {
        // Check for symbol pattern like "63 > 58"
        const symMatch = val.match(/\d+\s*([<>=])\s*\d+/)
        if (symMatch) val = symMatch[1]
        else {
          // Support time format like "2:15", fractions like "3/4", and regular numbers
          const numMatch = val.match(/^(\d+(?:[:/]\d+)?)/)
          if (numMatch) val = numMatch[1]
        }
        abcdMatches.push(val)
      }
    }

    // Extract b) value - Yes/No, number (including time/fractions), symbol, expanded form "X + Y", or direction words
    const bMatch = correctAnswer.match(/b\)\s*(Yes|No|\d+(?:[:/]\d+)?(?:\s*[+\-<>=]\s*\d+)?|[a-zA-Z]+)(?:\s+c\)|$)/i)
    if (bMatch) {
      let val = bMatch[1].trim()
      // Check for expanded form "X + Y" (e.g., "90 + 5" -> ["90", "5"])
      const expandedMatch = val.match(/^(\d+)\s*\+\s*(\d+)$/)
      if (expandedMatch) {
        abcdMatches.push(expandedMatch[1])
        abcdMatches.push(expandedMatch[2])
      }
      // Check for symbol pattern like "63 > 58"
      else {
        const symMatch = val.match(/\d+\s*([<>=])\s*\d+/)
        if (symMatch) val = symMatch[1]
        else {
          // Support time format like "2:15", fractions like "3/4", and regular numbers
          const numMatch = val.match(/^(\d+(?:[:/]\d+)?)/)
          if (numMatch) val = numMatch[1]
        }
        abcdMatches.push(val)
      }
    }

    // Extract c) value - Yes/No, number (including time/fractions), or direction words
    const cMatch = correctAnswer.match(/c\)\s*(Yes|No|\d+(?:[:/]\d+)?|[a-zA-Z]+)(?:\s+d\)|$)/i)
    if (cMatch) {
      abcdMatches.push(cMatch[1])
    }

    // Extract d) value - symbol or number (including time/fractions)
    const dMatch = correctAnswer.match(/d\)\s*(\d+\s*[<>=]\s*\d+|\d+(?:[:/]\d+)?)/i)
    if (dMatch) {
      let val = dMatch[1].trim()
      const symMatch = val.match(/\d+\s*([<>=])\s*\d+/)
      if (symMatch) val = symMatch[1]
      else {
        // Support time format like "2:15", fractions like "3/4", and regular numbers
        const numMatch = val.match(/^(\d+(?:[:/]\d+)?)/)
        if (numMatch) val = numMatch[1]
      }
      abcdMatches.push(val)
    }

    // Extract e) value - number (including time/fractions)
    const eMatch = correctAnswer.match(/e\)\s*(\d+(?:[:/]\d+)?)/i)
    if (eMatch) {
      abcdMatches.push(eMatch[1])
    }

    // Extract f) value - number (including time/fractions)
    const fMatch = correctAnswer.match(/f\)\s*(\d+(?:[:/]\d+)?)/i)
    if (fMatch) {
      abcdMatches.push(fMatch[1])
    }

    console.log(`🔤 Multi-input Q${questionId}: a/b/c/d extraction from "${correctAnswer}":`, abcdMatches)

    if (abcdMatches.length >= inputs.length) {
      answerArray = abcdMatches.slice(0, inputs.length)
      console.log(`✅ Multi-input Q${questionId} (a/b/c/d format): Final answers:`, answerArray)
    } else if (correctAnswer.includes('<') || correctAnswer.includes('>') || correctAnswer.includes('=')) {
      // Special handling for comparison questions with format "63 > 48, 55 = 55, c) No d) 67 < 76"
      const comparisonAnswers: string[] = []

      // First extract symbols from "X > Y" or "X < Y" or "X = Y" patterns
      const compPatterns = correctAnswer.match(/\d+\s*([<>=])\s*\d+/g) || []
      compPatterns.forEach(pattern => {
        const symbol = pattern.match(/[<>=]/)
        if (symbol) comparisonAnswers.push(symbol[0])
      })

      // Then extract c) Yes/No and d) symbol patterns
      const cMatch = correctAnswer.match(/c\)\s*(Yes|No)/i)
      if (cMatch) comparisonAnswers.push(cMatch[1])

      const dMatch = correctAnswer.match(/d\)\s*\d+\s*([<>=])\s*\d+/)
      if (dMatch) comparisonAnswers.push(dMatch[1])

      if (comparisonAnswers.length >= inputs.length) {
        answerArray = comparisonAnswers.slice(0, inputs.length)
        console.log(`🔣 Multi-input Q${questionId} (comparison format): Extracted from "${correctAnswer}":`, answerArray)
      }
    } else {
      // Fallback: Split by comma but remove parenthetical content first
      const cleanedAnswer = correctAnswer.replace(/\([^)]*\)/g, '')
      const parts = cleanedAnswer.split(',').map(a => a.trim()).filter(a => a)

      // For matching questions (e.g., "5-five, 10-ten"), extract just the word part
      if (questionType === 'matching') {
        answerArray = parts.map(part => {
          // Pattern: "5-five" or "5:five" or "5 - five" -> extract "five"
          const matchingMatch = part.match(/^\d+\s*[-:→]\s*(.+)$/)
          if (matchingMatch) {
            return matchingMatch[1].trim()
          }
          // If no number prefix, just return the word
          return part
        })
        console.log(`🔤 Matching Q${questionId}: Extracted words from "${correctAnswer}":`, answerArray)
      } else {
        // For other multi-input questions, extract numbers/symbols/words
        // Common direction/position words that should be kept as-is
        const directionWords = /^(up|down|left|right|forwards?|backwards?|above|below|behind|beside|between|inside|outside|over|under|north|south|east|west|n|s|e|w|tree|school|house|park|shop|hospital|library|treasure|box|circle|square|triangle)$/i

        answerArray = parts.map(part => {
          const trimmedPart = part.trim()

          // Check for direction/position words first - return as-is
          if (directionWords.test(trimmedPart)) {
            return trimmedPart
          }
          // Check for symbols (for comparison questions)
          const symbolMatch = trimmedPart.match(/([<>=])/)
          if (symbolMatch) {
            return symbolMatch[1]
          }
          // Check for Yes/No
          const yesNoMatch = trimmedPart.match(/\b(Yes|No)\b/i)
          if (yesNoMatch) {
            return yesNoMatch[1]
          }
          // Check for time format first (e.g., "2:00", "11:30") - keep the full time
          const timeMatch = trimmedPart.match(/^(\d{1,2}:\d{2})$/)
          if (timeMatch) {
            return timeMatch[1] // Return full time like "2:00"
          }
          // Check if there's a colon that's a label separator (e.g., "Answer: 5")
          // Only split if colon is followed by space and non-digit, or colon is not between digits
          if (trimmedPart.includes(':') && !trimmedPart.match(/^\d{1,2}:\d{2}/)) {
            const afterColon = trimmedPart.split(':')[1].trim()
            const numberMatch = afterColon.match(/^(\d+(?:[.\/]\d+)?)/)
            return numberMatch ? numberMatch[1] : afterColon
          }
          // Otherwise, extract any number (including time format) from the part, or return as-is if no number
          const numberMatch = trimmedPart.match(/\b(\d+(?:[:.\/]\d+)?)\b/)
          return numberMatch ? numberMatch[1] : trimmedPart
        })
        console.log(`🔢 Multi-input Q${questionId}: Split "${correctAnswer}" into:`, answerArray)
      }
    }
    } // Close the else block for early word list check
    } // Close the else block for equationFormatMatch check (line 635)
    } // Close the else block for tensOnesMatch check (line 630)
  }

  // PRIORITY CHECK: If inputs have expectedAnswer from data-answer attributes, use those directly
  // This handles worksheets that have embedded <input data-answer="x"> elements
  const inputsWithExpectedAnswer = inputs.filter(inp => inp.expectedAnswer !== undefined)
  if (inputsWithExpectedAnswer.length > 0 && inputsWithExpectedAnswer.length === inputs.length) {
    // All inputs have expectedAnswer - use these values directly
    answerArray = inputs.map(inp => inp.expectedAnswer || '')
    console.log(`✅ Q${questionId}: Using expectedAnswer from data-answer attributes:`, answerArray)
  }

  // Fallback: if there are multiple inputs but only a single answer string,
  // duplicate the answer for all inputs (e.g., Q2 has 2 inputs both expecting "Sunday")
  // But NOT if the answer already contains commas (indicating multiple values like "C, 19")
  else if (inputs.length > 1 && typeof answerArray === 'string' && !Array.isArray(answerArray)) {
    // Extract just the main answer (before any parenthetical explanation)
    const mainAnswer = answerArray.split('(')[0].trim()
    // Check if the answer already has multiple comma-separated values
    const commaSeparatedValues = mainAnswer.split(',').map(v => v.trim()).filter(v => v.length > 0)
    if (commaSeparatedValues.length >= inputs.length) {
      // Answer already has enough comma-separated values, use them as-is
      answerArray = commaSeparatedValues.slice(0, inputs.length)
      console.log(`📋 Q${questionId} Using comma-separated values: ${answerArray.join(', ')}`)
    } else if (commaSeparatedValues.length === 1) {
      // Truly a single value - duplicate for all inputs
      answerArray = Array(inputs.length).fill(mainAnswer)
      console.log(`📋 Q${questionId} Fallback: Duplicated "${mainAnswer}" for ${inputs.length} inputs`)
    } else {
      // Partial match - use what we have and warn
      answerArray = commaSeparatedValues
      console.log(`⚠️ Q${questionId} Partial match: ${commaSeparatedValues.length} values for ${inputs.length} inputs`)
    }
  }

  return {
    id: questionId,
    questionHTML: cleanedHTML,
    inputs,
    correctAnswer: answerArray,
    questionType,
    sequenceData,
    rainbowData,
    bondGridData,
    equationRowData,
    factFamilyData
  }
}

function detectQuestionType(questionHTML: string): StructuredQuestion['questionType'] {
  // Rainbow bonds (rainbow with numbers 0-10) - check early
  if (questionHTML.includes('rainbow-container') || questionHTML.includes('rainbow-num')) {
    return 'rainbow-bonds'
  }
  // Bond grid (equations like "3 + ○ = 10" in a grid)
  if (questionHTML.includes('bonds-grid') || questionHTML.includes('bond-row')) {
    return 'bond-grid'
  }
  // Number sequence detection (stepping stones, caterpillar, river stones, etc.) - check FIRST
  if (questionHTML.includes('number-sequence') ||
      questionHTML.includes('sequence-box') ||
      questionHTML.includes('caterpillar-segment') ||
      questionHTML.includes('caterpillar-container') ||
      (questionHTML.includes('river') && questionHTML.includes('stone'))) {
    return 'number-sequence'
  }
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

/**
 * Parse sequence data from number-sequence questions
 * Extracts items from sequence-box, caterpillar-segment, or stone elements
 */
function parseSequenceData(
  questionHTML: string,
  inputs: InputField[]
): StructuredQuestion['sequenceData'] {
  const isCaterpillar = questionHTML.includes('caterpillar')
  const isRiverStone = questionHTML.includes('river') && questionHTML.includes('stone')
  const isBackward = questionHTML.includes('backwards') || questionHTML.includes('backward')

  const items: Array<{ value: string | null; isFilled: boolean; inputIndex?: number }> = []
  let inputIndex = 0

  // Determine which pattern to use based on question type
  let regex: RegExp
  if (isCaterpillar) {
    regex = /<div[^>]*class="([^"]*caterpillar-segment[^"]*)"[^>]*>([^<]*)<\/div>/gi
  } else if (isRiverStone) {
    regex = /<div[^>]*class="([^"]*stone[^"]*)"[^>]*>([^<]*)<\/div>/gi
  } else {
    regex = /<div[^>]*class="([^"]*sequence-box[^"]*)"[^>]*>([^<]*)<\/div>/gi
  }

  // Find all sequence items
  let match
  while ((match = regex.exec(questionHTML)) !== null) {
    const classNames = match[1]
    const content = match[2].trim()

    const isFilled = classNames.includes('filled')
    const isEmpty = classNames.includes('empty')

    if (isFilled) {
      items.push({
        value: content,
        isFilled: true
      })
    } else if (isEmpty) {
      items.push({
        value: null,
        isFilled: false,
        inputIndex: inputIndex
      })
      inputIndex++
    }
  }

  // Return undefined if no sequence items found
  if (items.length === 0) {
    return undefined
  }

  // Determine sequence type for styling
  let sequenceType: 'number-sequence' | 'caterpillar' = 'number-sequence'
  if (isCaterpillar) {
    sequenceType = 'caterpillar'
  }

  return {
    type: sequenceType,
    direction: isBackward ? 'backward' : 'forward',
    items
  }
}

/**
 * Parse rainbow data for rainbow-bonds questions
 * Extracts numbers 0-10 from rainbow-num elements
 */
function parseRainbowData(
  questionHTML: string,
  inputs: InputField[]
): StructuredQuestion['rainbowData'] {
  const items: Array<{ value: string | null; isFilled: boolean; inputIndex?: number }> = []
  let inputIndex = 0

  // Find all rainbow-num elements
  const regex = /<div[^>]*class="([^"]*rainbow-num[^"]*)"[^>]*>([^<]*)<\/div>/gi
  let match

  while ((match = regex.exec(questionHTML)) !== null) {
    const classNames = match[1]
    const content = match[2].trim()

    // Check if this is an answer box (missing number)
    const isAnswerBox = classNames.includes('answer-box-small') || classNames.includes('answer-box')

    if (isAnswerBox || content === '') {
      items.push({
        value: null,
        isFilled: false,
        inputIndex: inputIndex
      })
      inputIndex++
    } else {
      items.push({
        value: content,
        isFilled: true
      })
    }
  }

  if (items.length === 0) {
    return undefined
  }

  return { items }
}

/**
 * Parse bond grid data for bond-grid questions
 * Extracts equations like "3 + ○ = 10" from bond-row elements
 */
function parseBondGridData(
  questionHTML: string,
  inputs: InputField[]
): StructuredQuestion['bondGridData'] {
  const equations: Array<{ num1: string; num2: string | null; result: string; inputIndex?: number }> = []
  let inputIndex = 0

  // Find all bond-row elements
  const rowRegex = /<div[^>]*class="[^"]*bond-row[^"]*"[^>]*>([\s\S]*?)<\/div>/gi
  let rowMatch

  while ((rowMatch = rowRegex.exec(questionHTML)) !== null) {
    const rowContent = rowMatch[1]

    // Extract bond-num (first number)
    const num1Match = rowContent.match(/<span[^>]*class="[^"]*bond-num[^"]*"[^>]*>(\d+)<\/span>/i)
    // Extract bond-ten or result (last number, usually 10)
    const resultMatch = rowContent.match(/<span[^>]*class="[^"]*bond-ten[^"]*"[^>]*>(\d+)<\/span>/i)
    // Check if there's a bond-answer (the missing number)
    // Note: bond-answer elements are replaced with data-input-placeholder by the parser
    const hasAnswer = rowContent.includes('bond-answer') || rowContent.includes('data-input-placeholder')

    if (num1Match && resultMatch) {
      equations.push({
        num1: num1Match[1],
        num2: hasAnswer ? null : '?',
        result: resultMatch[1],
        inputIndex: hasAnswer ? inputIndex++ : undefined
      })
    }
  }

  if (equations.length === 0) {
    return undefined
  }

  return { equations }
}

/**
 * Parse equation-row data for inline equation rendering
 * Extracts items like "6 + ○ = 10" from equation-row or addition-equation elements
 * Supports two HTML patterns:
 * 1. equation-row with .num, .op classes
 * 2. addition-equation with .number, .operator classes
 */
function parseEquationRowData(
  questionHTML: string,
  inputs: InputField[]
): StructuredQuestion['equationRowData'] {
  const items: Array<{ value: string | null; type: 'num' | 'op' | 'answer'; inputIndex?: number }> = []
  let inputIndex = 0

  // Try to find equation-row, addition-equation, or subtraction-equation
  let rowMatch = questionHTML.match(/<div[^>]*class="[^"]*equation-row[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
  if (!rowMatch) {
    rowMatch = questionHTML.match(/<div[^>]*class="[^"]*addition-equation[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
  }
  if (!rowMatch) {
    rowMatch = questionHTML.match(/<div[^>]*class="[^"]*subtraction-equation[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
  }
  if (!rowMatch) {
    return undefined
  }

  const rowContent = rowMatch[1]

  // We need to parse in order, so find all span elements and their positions
  const allElements: Array<{ index: number; type: 'num' | 'op' | 'answer'; value: string | null }> = []

  let match

  // Find nums - support both .num and .number classes
  const numPattern = /<span[^>]*class="[^"]*\b(?:num|number)\b[^"]*"[^>]*>(\d+)<\/span>/gi
  while ((match = numPattern.exec(rowContent)) !== null) {
    allElements.push({ index: match.index, type: 'num', value: match[1] })
  }

  // Find ops - support both .op and .operator classes
  // Match: + - = × ÷ and Unicode variants (− minus sign, – en dash)
  const opPattern = /<span[^>]*class="[^"]*\b(?:op|operator)\b[^"]*"[^>]*>([+\-−–=×÷])<\/span>/gi
  while ((match = opPattern.exec(rowContent)) !== null) {
    allElements.push({ index: match.index, type: 'op', value: match[1] })
  }

  // Find answer-boxes (both span and div)
  const answerPattern = /<(?:span|div)[^>]*class="[^"]*answer-box[^"]*"[^>]*>/gi
  while ((match = answerPattern.exec(rowContent)) !== null) {
    allElements.push({ index: match.index, type: 'answer', value: null })
  }

  // Sort by position in HTML
  allElements.sort((a, b) => a.index - b.index)

  // Convert to items array with input indices
  for (const el of allElements) {
    if (el.type === 'answer') {
      items.push({
        value: null,
        type: 'answer',
        inputIndex: inputIndex++
      })
    } else {
      items.push({
        value: el.value,
        type: el.type
      })
    }
  }

  if (items.length === 0) {
    return undefined
  }

  return { items }
}

/**
 * Parse fact family data for multi-equation questions
 * Handles both structured spans AND plain text equations
 */
function parseFactFamilyData(
  questionHTML: string,
  inputs: InputField[]
): StructuredQuestion['factFamilyData'] {
  const equations: Array<{
    items: Array<{ value: string | null; type: 'num' | 'op' | 'answer'; inputIndex?: number }>
  }> = []
  let globalInputIndex = 0

  // Find fact-row divs (fact family style) or equation divs
  const factRowPattern = /<div[^>]*class="[^"]*fact-row[^"]*"[^>]*>([\s\S]*?)<\/div>/gi
  let rowMatch

  while ((rowMatch = factRowPattern.exec(questionHTML)) !== null) {
    const rowContent = rowMatch[1]
    const items: Array<{ value: string | null; type: 'num' | 'op' | 'answer'; inputIndex?: number }> = []

    // Get text content by stripping HTML tags (except answer boxes)
    // First, mark answer boxes with a placeholder
    const contentWithPlaceholders = rowContent.replace(
      /<span[^>]*class="[^"]*answer-box[^"]*"[^>]*>[\s\S]*?<\/span>/gi,
      '{{ANSWER_BOX}}'
    )

    // Strip remaining HTML tags to get plain text equation like "7 + 6 = {{ANSWER_BOX}}"
    const textContent = contentWithPlaceholders
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()

    // Parse the text content to extract numbers, operators, and answer boxes
    // Pattern: numbers, operators (+, -, −, –, =, ×, ÷), and answer placeholders
    const tokenPattern = /(\d+)|([+\-−–=×÷])|(\{\{ANSWER_BOX\}\})/g
    let tokenMatch

    while ((tokenMatch = tokenPattern.exec(textContent)) !== null) {
      if (tokenMatch[1]) {
        // Number
        items.push({ value: tokenMatch[1], type: 'num' })
      } else if (tokenMatch[2]) {
        // Operator
        items.push({ value: tokenMatch[2], type: 'op' })
      } else if (tokenMatch[3]) {
        // Answer box
        items.push({
          value: null,
          type: 'answer',
          inputIndex: globalInputIndex++
        })
      }
    }

    if (items.length > 0) {
      equations.push({ items })
    }
  }

  if (equations.length === 0) {
    return undefined
  }

  return { equations }
}
